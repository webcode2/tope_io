import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useDispatch, } from "react-redux";
import { toggleNewMessageModal } from "../store/slice/themeSlice";
import Card from "../components/card";

export default function PostMessage() {
    const dispatch = useDispatch()

    return (
        <div className="">
            {/* Message Log Table */}


            <Card>                <div className="flex justify-between items-center mb-20">
                <p className="title font-bold text-2xl text-gray-600  py-4 text-center ">Message</p>

                <button onClick={() => { dispatch(toggleNewMessageModal(true)) }} className="bg-blue-300 text-blue-700 px-4 py-3 rounded-lg mb-3  place-self-end cursor-pointer">
                    Add new Message
                </button>
                </div>
                <motion.div
                    className=" overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Time</th>
                                <th className="px-6 py-3">Message</th>
                                <th className="px-6 py-3">Board</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { time: '10:34 AM', message: 'Welcome to RSU', board: 'Main Gate', status: 'Sent' },
                                { time: '9:20 AM', message: 'Exam Timetable Uploaded', board: 'Faculty Board', status: 'Sent' },
                            ].map((log, i) => (
                                <tr key={i} className="border-t border-gray-300 hover:bg-gray-50">
                                    <td className="px-6 py-4">{log.time}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{log.message}</td>
                                    <td className="px-6 py-4 text-gray-700">{log.board}</td>
                                    <td className="px-6 py-4 text-green-600 font-semibold">{log.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </Card>
        </div>
    );
}
