import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const SERVER_URL = `http://localhost:4000/`;
const SERVER_URL = `https://iot-server-websocket.onrender.com/`

// Async thunk to send a message
export const sendMessage = createAsyncThunk(
    "message/sendMessage",
    async (message, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.user?.details?.token;
            const res = await axios.post(
                `${SERVER_URL}api/messages`,
                { message },
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                }
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to send message"
            );
        }
    }
);

// Fetch all messages thunk
export const fetchMessages = createAsyncThunk(
    "message/fetchMessages",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.user?.details?.token;
            const res = await axios.get(
                `${SERVER_URL}api/messages`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                }
            );
            return res.data;
        } catch (err) {

            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch messages"
            );
        }
    }
);

// Delete message thunk
export const deleteMessage = createAsyncThunk(
    "message/deleteMessage",
    async (messageId, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.user?.details?.token;
            await axios.delete(
                `${SERVER_URL}api/messages/${messageId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                }
            );
            return messageId;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to delete message"
            );
        }
    }
);

// Update message thunk
export const updateMessage = createAsyncThunk(
    "message/updateMessage",
    async ({ id, message }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.user?.details?.token;
            const res = await axios.put(
                `${SERVER_URL}api/messages/${id}`,
                { message },
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                }
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to update message"
            );
        }
    }
);

const messageSlice = createSlice({
    name: "message",
    initialState: {
        isSending: false,
        error: null,
        success: false,
        isLoading: false,
        messages: [],
    },
    reducers: {
        clearMessageStatus: (state) => {
            state.isSending = false;
            state.error = null;
            state.success = false;
        },
     
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.isSending = true;
                state.error = null;
                state.success = false;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.isSending = false;
                state.success = true;
                state.messages.unshift({ ...action.payload });
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isSending = false;
                state.error = action.payload || "Failed to send message";
                state.success = false;
            })

            // Fetch all messages
            .addCase(fetchMessages.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to fetch messages";
            })

            // Delete message
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.messages = state.messages.filter(msg => msg.id !== action.payload);
            })
            .addCase(deleteMessage.rejected, (state, action) => {
                state.error = action.payload || "Failed to delete message";
            })

            // Update message
            .addCase(updateMessage.fulfilled, (state, action) => {
                const idx = state.messages.findIndex(msg => msg.id === action.payload.id);
                if (idx !== -1) {
                    state.messages[idx] = action.payload;
                }
            })
            .addCase(updateMessage.rejected, (state, action) => {
                state.error = action.payload || "Failed to update message";
            });
    },
});

export const { clearMessageStatus } = messageSlice.actions;
export default messageSlice.reducer;