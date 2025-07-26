import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleNewMessageModal } from "../store/slice/themeSlice";
import Card from "../components/card";
import { fetchMessages } from "../store/slice/messageSlice";
import MessageTable from "../components/MessageTable";

export default function PostMessage() {
    const dispatch = useDispatch();
    // Get messages from Redux store
    const messages = useSelector(state => state.message.messages);
    const isLoading = useSelector(state => state.message.isLoading);
    useEffect(() => {

        // Fetch messages or perform any side effects here
        if (!messages.length && !isLoading) {
            // Optionally dispatch an action to fetch messages
            dispatch(fetchMessages());
        }
    }, [dispatch, messages.length, isLoading]);
    console.log(messages)
    return (
        <div className="">
            <Card>
                <div className="flex justify-between items-center mb-20">
                    <p className="title font-bold text-2xl text-gray-600 py-4 text-center">Message</p>
                    <button
                        onClick={() => { dispatch(toggleNewMessageModal(true)) }}
                        className="bg-blue-300 text-blue-700 px-4 py-3 rounded-lg mb-3 place-self-end cursor-pointer"
                    >
                        Add new Message
                    </button>
                </div>

                {/* <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Time</th>
                                <th className="px-6 py-3">Message</th>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Status</th>
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
                                        <td className="px-6 py-4 text-gray-700">{log.staff_id || log.developerId && "You" || "N/A"}</td>
                                        <td className="px-6 py-4">
                                            {log.isActive
                                                ? <span className="text-green-600 font-semibold">Sent</span>
                                                : <span className="text-gray-400">Pending</span>}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-400">No messages found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table> */}
                <MessageTable />
            </Card>
        </div>
    );
}
