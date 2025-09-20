import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';
import {
    Home,
    PencilLine,
    LogOut,
    Menu,
    X,
    UserCog,
} from 'lucide-react';
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import PostMessageModal from "../components/newPostModal";
import { Bounce, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { checkIfAuthenticated, updateDeviceStatus } from "../store/slice/authSlice";
import getWebSocketClient from '../websocket/websocketClient';

const navItems = [
    { label: 'Dashboard', to: "", icon: <Home size={18} /> },
    { label: 'Post Message', to: "new-post", icon: <PencilLine size={18} /> },
    { label: 'Profile', to: "profile", icon: <UserCog size={18} /> },

];

export default function UserDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { items } = useSelector((state) => state.auth.devices);


    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const [wsMessages, setWsMessages] = useState([]);
    const [wsStatus, setWsStatus] = useState('disconnected');

    const wsUrl = `ws://localhost:4000/ws?token=${user.details?.token || ''}`;
    const wsClientRef = useRef(null);
    const pingIntervalRef = useRef(null);


    useEffect(() => {
        // Dispatch and wait for the check to finish
        dispatch(checkIfAuthenticated()).finally(() => setAuthChecked(true));
    }, [dispatch]);



    useEffect(() => {
        if (authChecked && !isAuthenticated) {
            navigate('/auth/login');
        }
    }, [isAuthenticated, authChecked, navigate]);

    useEffect(() => {
        if (!isAuthenticated) return;

        let wsClient = null;
        let retryTimeout = null;
        let isConnected = false;

        const connectWebSocket = () => {
            console.log('Attempting WebSocket connection...');
            wsClient = getWebSocketClient(wsUrl);
            wsClientRef.current = wsClient;
            wsClient.connect();

            wsClient.on('open', () => {
                console.log("WebSocket connected");
                isConnected = true;
                setWsStatus('connected');

                if (retryTimeout) {
                    clearTimeout(retryTimeout);
                    retryTimeout = null;
                }
            });

            wsClient.on('close', () => {
                console.log("WebSocket closed");
                isConnected = false;
                setWsStatus('disconnected');
                scheduleReconnect();
            });

            wsClient.on('error', (err) => {
                console.error("WebSocket error", err);
                setWsStatus('error');
                isConnected = false;
                scheduleReconnect();
            });

            wsClient.on('message', (msg) => {
                const { event, data } = msg;

                switch (event) {
                    case "direct_message":
                        // handle direct message
                        break;
                    case "heart_beat":
                        dispatch(updateDeviceStatus(data));
                        break;
                    default:
                        break;
                }
            });
        };

        const scheduleReconnect = () => {
            if (!isConnected && !retryTimeout) {
                retryTimeout = setTimeout(() => {
                    connectWebSocket();
                }, 3000);
            }
        };

        connectWebSocket();

        return () => {
            if (wsClient) wsClient.close();
            if (retryTimeout) clearTimeout(retryTimeout);
        };
    }, [wsUrl, user.details?.id, user.details?.account_id]);

    // Resposible for checkmating gthe devices

    useEffect(() => {
        const ids = items.map((device) => device.id)
        pingIntervalRef.current = setInterval(() => {
            const data = { ...user.details, token: undefined, registeredAt: undefined }
            wsClientRef.current.send({
                "event": "heart_beat",
                "data": { user: data, devices: ids }
            })
        }, 10000); // every 10 seconds
        return () => {
            clearInterval(pingIntervalRef.current);
        }
    }, [items])






    // Don't render anything until auth check is complete

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-100 to-white">
            {/* Mobile Sidebar (Drawer) */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.aside
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 p-6 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-blue-600">IoT Admin</h2>
                                <button onClick={() => setSidebarOpen(false)}>
                                    <X className="text-gray-500 hover:text-red-500" />
                                </button>
                            </div>
                            <nav className="space-y-4">
                                {navItems.map(({ label, icon, to }) => (
                                    <Link
                                        key={label}
                                        to={to}
                                        className="flex items-center space-x-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md transition-all"
                                    >
                                        <span className="text-blue-500">{icon}</span>
                                        <span className="text-sm font-medium">{label}</span>
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 text-sm">
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <aside className="w-56 hidden md:flex flex-col justify-between bg-white shadow-lg px-6 py-8 border-r border-gray-300">
                <div>
                    <h2 className="text-xl font-bold text-blue-600 mb-8">IoT Admin Panel</h2>
                    <nav className="space-y-5">
                        {navItems.map(({ label, icon, to }) => (
                            <NavLink
                                key={label}
                                to={to}

                                className={({ isActive }) =>
                                    `
          flex items-center space-x-3 px-3 py-2 rounded-md transition-all
          ${isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
        `
                                }
                                end={to === ""}                            >
                                <span className="text-blue-500">{icon}</span>
                                <span className="text-sm font-medium">{label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 text-sm">
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 sm:p-6 p-5 relative w-full">
                {/* Mobile Top Bar */}
                <div className="md:hidden flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold text-gray-800">IoT Admin Panel</h1>
                    <button onClick={() => setSidebarOpen(true)}>
                        <Menu size={24} className="text-blue-600" />
                    </button>
                </div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6 flex justify-between"
                >
                    <div className="">
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome {user.details?.name}</h1>
                        <p className="text-sm text-gray-500">{user.details?.registeredAt}</p>
                    </div>
                    {/* Example: Display WebSocket status and messages */}
                    <div className="mt-4">
                        <div>Status: {wsStatus}</div>
                        <ul>{wsMessages.map((m, i) => <li key={i}>{JSON.stringify(m)}</li>)}</ul>
                    </div>
                </motion.div>

                <Outlet />


            </main>
            < ToastContainer position="top-right" autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />


            <PostMessageModal />
        </div>
    );
}
