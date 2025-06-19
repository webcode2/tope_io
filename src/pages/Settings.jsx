import React, { useState } from 'react';

export default function Settings() {
    const [notifications, setNotifications] = useState(true);

    return (
        <div className="p-6 max-w-xl">
            <h1 className="text-2xl font-bold mb-4 text-blue-700">Settings</h1>

            <div className="space-y-6">
                {/* Toggle Notifications */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 font-medium">Email Notifications</span>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications}
                            onChange={() => setNotifications(!notifications)}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition relative">
                            <div className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition" />
                        </div>
                    </label>
                </div>

                {/* Other settings... */}
                <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                        Timezone
                    </label>
                    <select
                        id="timezone"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:border-blue-500"
                    >
                        <option>Africa/Lagos (WAT)</option>
                        <option>UTC</option>
                        <option>Europe/London</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
