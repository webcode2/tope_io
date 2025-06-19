import React from 'react';

export default function BoardStatus() {
    const boards = [
        { name: 'Main Gate', status: 'Online', lastUpdated: '2 min ago' },
        { name: 'Library Entrance', status: 'Offline', lastUpdated: '20 min ago' },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-blue-700">Board Status</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {boards.map((board, i) => (
                    <div
                        key={i}
                        className={`rounded-lg p-5 shadow bg-white border-l-4 ${board.status === 'Online' ? 'border-green-500' : 'border-red-500'
                            }`}
                    >
                        <h2 className="text-lg font-semibold text-gray-800">{board.name}</h2>
                        <p className={`text-sm mt-1 ${board.status === 'Online' ? 'text-green-600' : 'text-red-600'}`}>
                            {board.status}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Last updated: {board.lastUpdated}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
