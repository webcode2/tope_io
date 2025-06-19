import React from 'react';

export default function MessageLogs() {
    const logs = [
        { id: 1, message: 'System Maintenance Notice', time: '08:30 AM', status: 'Sent', board: 'Admin Block' },
        { id: 2, message: 'Class Canceled', time: '07:15 AM', status: 'Pending', board: 'Science Board' },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-blue-700">Message Logs</h1>
            <div className="overflow-x-auto bg-white shadow rounded-xl">
                <table className="min-w-full text-sm">
                    <thead className="bg-blue-50 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Time</th>
                            <th className="px-6 py-3">Message</th>
                            <th className="px-6 py-3">Board</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.id} className="border-t hover:bg-gray-50">
                                <td className="px-6 py-4">{log.time}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{log.message}</td>
                                <td className="px-6 py-4">{log.board}</td>
                                <td className={`px-6 py-4 font-semibold ${log.status === 'Sent' ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {log.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
