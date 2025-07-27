import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash2 } from "lucide-react";
import { deleteMessage, } from "../store/slice/messageSlice";

import { motion } from "framer-motion";
import { newMessageModalUpdateR, toggleNewMessageModal } from "../store/slice/themeSlice";
export default function MessageTable() {
    const dispatch = useDispatch();
    const messages = useSelector(state => state.message.messages);
    const isLoading = useSelector(state => state.message.isLoading);

    const handleDelete = (id) => {
        dispatch(deleteMessage(id));
    };

    const handleEdit = (msg) => {
        dispatch(newMessageModalUpdateR({ id: msg.id, message: msg.message }));
        dispatch(toggleNewMessageModal(true)); // <-- Open the modal for editing
    };

    if (isLoading) {
        return <div className="text-center py-4">Loading messages...</div>;
    }

    return (
        <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="px-6 py-3">Time</th>
                        <th className="px-6 py-3">Message</th>
                        <th className="px-6 py-3">User</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {messages && messages.length > 0 ? (
                        messages.map((log) => (
                            <tr key={log.id} className="border-t border-gray-300 hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    {log.time
                                        ? new Date(log.time).toLocaleString()
                                        : "N/A"}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{log.message}</td>
                                <td className="px-6 py-4 text-gray-700">{log.staff_id || (log.developerId && "You") || "N/A"}</td>
                                <td className="px-6 py-4">
                                    {log.isActive
                                        ? <span className="text-green-600 font-semibold">Sent</span>
                                        : <span className="text-gray-400">Pending</span>}
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(log)}
                                        className="p-1 rounded hover:bg-blue-100"
                                        title="Edit"
                                    >
                                        <Pencil size={16} className="text-blue-600" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(log.id)}
                                        className="p-1 rounded hover:bg-red-100"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} className="text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-6 py-4 text-center text-gray-400">No messages found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </motion.div>
    );
}