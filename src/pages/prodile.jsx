import React from 'react';
import { motion } from 'framer-motion';
import Card from "../components/card";
import { Pencil, Users } from 'lucide-react';


function Profile() {
    const user = {
        name: "ABS Johnson",
        email: "abs@example.com",
        role: "Administrator",
        joined: "January 15, 2024",
        location: "Port Harcourt, Nigeria",
    };



    const activities = [
        { date: 'July 24, 2025', activity: 'Updated profile picture' },
        { date: 'July 20, 2025', activity: 'Changed password' },
        { date: 'July 18, 2025', activity: 'Sent a message to RSU Board' },
    ];

    return (
        <div className="space-y-7">
            <Card title="Profile Information">
                <motion.div
                    className="flex gap-6 "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Avatar on the left */}
                    <div className="flex-col justify-center md:justify-start">
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
                            ABS
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2 mt-2">{user.name}</h3>

                    </div>

                    {/* Profile details in the middle */}
                    <div className="place-self-center">
                        <p className="text-gray-600 mb-1">{user.email}</p>
                        <p className="text-gray-600 mb-1">Role: {user.role}</p>
                        <p className="text-gray-600 mb-1">Joined: {user.joined}</p>
                        <p className="text-gray-600">Location: {user.location}</p>
                    </div>

                    {/* Action buttons on the right */}
                    <div className="flex gap-6 ml-auto items-start">
                        <button
                            className="inline-flex items-center bg-blue-300 text-blue-800 px-4 py-2 rounded active:scale-105 transition text-sm"
                        >
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit Profile
                        </button>
                        <button
                            className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded hover:bg-gray-200 transition text-sm border border-gray-300"
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Staff
                        </button>
                    </div>
                </motion.div>
            </Card>


            <Card title="Recent Activity">
                <motion.div
                    className="bg-white overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50 border-b text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map((activity, i) => (
                                <tr key={i} className="border-t hover:bg-gray-50">
                                    <td className="px-6 py-4">{activity.date}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{activity.activity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </Card>
        </div>
    );
}

export default Profile;
