import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

// const SERVER_URL = `http://localhost:4000/`
const SERVER_URL = `https://iot-server-websocket.onrender.com/`


// Thunk to fetch data from API
export const loginAccount = createAsyncThunk(
    'auth/loginAccount',
    async (data, { rejectWithValue }) => {
        try {
            const user = await axios.post(`${SERVER_URL}api/auth/login`, data, {
                headers: { "Content-Type": "application/json" }
            })
            return user.status === 200 ? user.data : rejectWithValue("something Went wrong")
        } catch (err) {

            return rejectWithValue(err.response.data);
        }
    }
);
export const registerAccount = createAsyncThunk(
    'auth/registerAccount',
    async (data, { rejectWithValue }) => {

        try {
            const user = await axios.post(`${SERVER_URL}api/auth/register/`, { ...data, name: data.username }, {
                headers: { "Content-Type": "application/json" }
            })
            return user.status === 201 ? user.data : rejectWithValue("something Went wrong")
        } catch (err) {

            return rejectWithValue(err.response.data);
        }
    }
);

export const checkIfAuthenticated = createAsyncThunk(
    "auth/checkIfAuthenticated", async (_, { rejectWithValue }) => {
        const details = localStorage.getItem("userDetails") || null
        if (details) {
            try {
                const userDetails = JSON.parse(details);
                if (userDetails) {
                    return userDetails;
                } else {
                    return rejectWithValue("user not login");
                }
            } catch (err) {
                return rejectWithValue(err.message);
            }
        } else { return rejectWithValue("user not logged in") }

    }
)

// Thunk to fetch devices for the authenticated user
export const fetchDevices = createAsyncThunk(
    'auth/fetchDevices',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.user?.details?.token;
            if (!token) return rejectWithValue("No authentication token found");
            const res = await axios.get(`${SERVER_URL}api/iot/devices`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.status === 200 ? res.data : rejectWithValue("Failed to fetch devices");
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch devices");
        }
    }
);

const saveToLocalStorage = ({ name, _ }) => {
    localStorage.setItem(name, JSON.stringify(_))
}

const deleteLocalStorage = (name) => {
    localStorage.removeItem(name)
}


const initialState = {
    isAuthenticated: false,
    user: { details: null, device: [] }, // <-- Ensure device is in user
    devices: {

        items: [],
        isLoading: false,
        error: null
    },
    isLoading: false,
    error: null,

}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        busyAccount: (state, action) => { action.payload === undefined ? state.isLoading = true : state.isLoading = action.payload },
        setUser: (state, action) => { state.user = action.payload },

        logOut: (state,) => {
            deleteLocalStorage("userDetails")
            return state = initialState
        },      

        clearError: (state) => { state.error = null },

        updateDeviceStatus: (state, action) => {

            const devicesToUpdate = action.payload; // [{ deviceId, status }]

            devicesToUpdate.forEach(({ deviceId, status }) => {
                const deviceIndex = state.devices.items.findIndex((d) => d.id === deviceId);

                if (deviceIndex !== -1) {
                    state.devices.items[deviceIndex].status = status;
                } else {
                    // Optional: add device if not present
                    state.devices.items.push({ id: deviceId, status });
                }


                console.log("::::::::::::::::::::::::::::::::::::")
                console.log(state.devices)
                console.log("::::::::::::::::::::::::::::::::::::")
            });
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAccount.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginAccount.fulfilled, (state, action) => {

                state.isAuthenticated = true
                state.isLoading = false;
                state.user.details = {
                    email: action.payload.email,
                    registeredAt: action.payload.createdAt,
                    name: action.payload.name,
                    id: action.payload.id,
                    token: action.payload.jwt_token

                }
                saveToLocalStorage({ _: state.user.details, name: "userDetails" })

            })
            .addCase(loginAccount.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Login failed. Please check your credentials and try again.";
            })
            // Check if authenticated cases
            .addCase(checkIfAuthenticated.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkIfAuthenticated.fulfilled, (state, action) => {
                state.isAuthenticated = true
                state.isLoading = false;
                state.user.details = action.payload;
            })
            .addCase(checkIfAuthenticated.rejected, (state, action) => {
                state.isLoading = false;
                // Only store a string message, not the whole object
                if (typeof action.payload === "string") {
                    state.error = action.payload;
                } else if (action.payload && typeof action.payload === "object" && action.payload.message) {
                    state.error = action.payload.message;
                } else {
                    state.error = "Authentication check failed.";
                }
            })
            //  For Registration
            .addCase(registerAccount.pending, (state) => {
                state.isLoading = true
                state.error = null
            }).addCase(registerAccount.fulfilled, (state, action) => {
                console.log(action)
                state.isAuthenticated = true
                state.isLoading = false
                state.user.details = {
                    email: action.payload.email,
                    registeredAt: action.payload.createdAt,
                    name: action.payload.name,
                    id: action.payload.id,
                    token: action.payload.jwt_token

                }
                state.user.device = { id: action.payload.device.id, name: action.payload.device.name }

                saveToLocalStorage({ _: state.user.details, name: "userDeails" })
            })
            .addCase(registerAccount.rejected, (state, action) => {
                state.error = action.payload || "Registration failed. Please try again.";
                state.isLoading = false;
            })
            // Fetch Devices
            .addCase(fetchDevices.pending, (state) => {
                state.devices.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDevices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.devices.items = action.payload; // 
            })
            .addCase(fetchDevices.rejected, (state, action) => {
                state.isLoading = false;
                state.devices.error = action.payload || "Failed to fetch devices";
            })

    }
});

export const { setUser, logOut, clearError, updateDeviceStatus } = authSlice.actions;
export default authSlice.reducer;
