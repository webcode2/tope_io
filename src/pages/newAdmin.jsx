import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import {
    Home,
    PencilLine,
    ClipboardList,
    Monitor,
    Settings,
    LogOut,
    Menu,
    X,
} from 'lucide-react';
import { Link, Outlet } from "react-router-dom";

const navItems = [
    { label: 'Dashboard', to: "", icon: <Home size={18} /> },
    { label: 'Post Message', to: "new-post", icon: <PencilLine size={18} /> },
    { label: 'Message Logs', to: "logs", icon: <ClipboardList size={18} /> },
    { label: 'Board Status', to: "status", icon: <Monitor size={18} /> },
    { label: 'Settings', to: "settings", icon: <Settings size={18} /> },
];

export default function UserDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-white">
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
            <aside className="w-64 hidden md:flex flex-col justify-between bg-white shadow-lg px-6 py-8 border-r border-gray-200">
                <div>
                    <h2 className="text-xl font-bold text-blue-600 mb-8">IoT Admin Panel</h2>
                    <nav className="space-y-5">
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
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 md:p-10 relative w-full">
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
                    className="mb-6"
                >
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome, Admin</h1>
                    <p className="text-sm text-gray-500">Last login: June 18, 2025</p>
                </motion.div>

                <Outlet />

            </main>
        </div>
    );
}
