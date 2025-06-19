import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';


function DashBoardIndex() {
    return (
        <div>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                    { label: 'Active Boards', value: 3, color: 'bg-blue-100 text-blue-600' },
                    { label: 'Messages Sent', value: 128, color: 'bg-green-100 text-green-600' },
                    { label: 'Pending Alerts', value: 2, color: 'bg-yellow-100 text-yellow-600' },
                    { label: 'System Uptime', value: '99.9%', color: 'bg-purple-100 text-purple-600' },
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        className={`rounded-xl p-5 shadow hover:shadow-lg transition ${card.color}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                        <h3 className="text-sm font-medium mb-2 text-gray-600">{card.label}</h3>
                        <p className="text-2xl font-bold">{card.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Message Log Table */}
            <motion.div
                className="bg-white rounded-xl shadow overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b text-gray-600 uppercase text-xs">
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
                            <tr key={i} className="border-t hover:bg-gray-50">
                                <td className="px-6 py-4">{log.time}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{log.message}</td>
                                <td className="px-6 py-4 text-gray-700">{log.board}</td>
                                <td className="px-6 py-4 text-green-600 font-semibold">{log.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    )
}

export default DashBoardIndex