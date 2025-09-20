import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from "../components/card";
import { Pencil, Users, Copy, WifiIcon, WifiOffIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevices } from "../store/slice/authSlice";
import getWebSocketClient from '../websocket/websocketClient';

function Profile() {
    // Get user details from Redux
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.auth.user?.details);
    const { items, isLoading, error } = useSelector(state => state.auth.devices);

    const wsUrl = `ws://localhost:4000/ws?token=${userDetails?.token || ''}`;
    const wsClient = getWebSocketClient(wsUrl);

    // Sync devices function
    const handleSync = (deviceId) => {
        console.log(deviceId)
        wsClient.send({
            event: "sync_device",
            data: {
                recipientId: deviceId,
                message: { action: "sync_device", }
            }




        });
    };
    const handleReboot = (deviceId) => {
        console.log(deviceId)
        wsClient.send({
            event: "reboot",
            data: {
                recipientId: deviceId,
                message: { action: "reboot", }
            }




        });
    };

    // Fallbacks if details are missing
    const user = {
        name: userDetails?.name || "N/A",
        email: userDetails?.email || "N/A",
        role: "Administrator", // You can update this if role is in your Redux state
        joined: userDetails?.registeredAt
            ? new Date(userDetails.registeredAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
            : "N/A",
        location: userDetails?.location || "Port Harcourt, Nigeria", // Update if you store location
    };



    // Devices array from userDetails, fallback to empty array
    const devices = items || []

    const activities = [
        { date: 'July 24, 2025', activity: 'Updated profile picture' },
        { date: 'July 20, 2025', activity: 'Changed password' },
        { date: 'July 18, 2025', activity: 'Sent a message to RSU Board' },
    ];

    // Copy to clipboard state
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = async (jwt, idx) => {
        try {
            await navigator.clipboard.writeText(jwt);
            setCopiedIndex(idx);
            setTimeout(() => setCopiedIndex(null), 1500);
        } catch (err) {
            // Optionally handle error
        }
    };
    useEffect(() => {
        // Fetch devices if needed, or use the devices from userDetails
        if (!items.length && userDetails?.token) {
            // Dispatch fetchDevices action if no devices are found
            dispatch(fetchDevices());
        }
    }, [items, userDetails, dispatch]);

    return (
        <div className="space-y-7">
            <Card title="Profile Information">
                <motion.div
                    className="lg:flex gap-6 mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Avatar on the left */}
                    <div className="flex-col justify-center md:justify-start">
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
                            {user.name
                                .split(' ')
                                .map(n => n[0])
                                .join('')
                                .toUpperCase()
                                .slice(0, 3)}
                        </div>
                        <h3 className="text-lg font-bold text-center text-gray-800 mb-2 mt-2">{user.name}</h3>
                    </div>

                    {/* Profile details in the middle */}
                    <div className="lg:place-self-center ">
                        <p className="text-gray-600 mb-1">{user.email}</p>
                        <p className="text-gray-600 mb-1">Role: {user.role}</p>
                        <p className="text-gray-600 mb-1">Joined: {user.joined}</p>
                        <p className="text-gray-600">Location: {user.location}</p>
                    </div>

                    {/* Action buttons on the right */}
                    <div className="flex gap-x-6 ml-auto items-start w-full justify-center md:justify-end mt-10">
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

            {/* Devices Section */}
            <Card title="Devices">
                <motion.div
                    className="bg-white overflow-x-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50 border-b text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Device Name</th>
                                <th className="px-6 py-3">Device ID</th>
                                <th className="px-6 py-3">JWT</th>
                                <th className="px-6 py-3">Restart Device</th>

                            </tr>
                        </thead>
                        <tbody>
                            {devices.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-4 text-gray-400 text-center">No devices found.</td>
                                </tr>
                            ) : (
                                devices.map((device, idx) => (
                                    <tr key={device.id || idx} className="border-t hover:bg-gray-50">
                                        <td className="px-6 py-4">{device.name || "N/A"}</td>
                                        <td className="px-6 py-4">{device.id || "N/A"}</td>
                                        <td className="px-6 py-4 flex items-center gap-2">
                                            <span className="truncate max-w-[120px] inline-block" title={device.jwt || device.jwt_token}>
                                                {(device.jwt || device.jwt_token || "N/A").slice(0, 40)}...
                                            </span>
                                            {(device.jwt || device.jwt_token) && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleCopy(device.jwt || device.jwt_token, idx)}
                                                    className="p-1 rounded hover:bg-gray-200 transition"
                                                    title="Copy JWT"
                                                >
                                                    <Copy size={16} className={copiedIndex === idx ? "text-green-600" : "text-gray-500"} />
                                                </button>
                                            )}
                                            {copiedIndex === idx && (
                                                <span className="text-green-600 text-xs ml-1">Copied!</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 ">
                                            <div className="flex">
                                                {!device.status ? (<WifiOffIcon className="text-gray-500 mr-3" />
                                                ) : (
                                                    <WifiIcon className="text-green-500 mr-3" />

                                                )}

                                                <button onClick={() => handleSync(device.id)} className="cursor-pointer py-2 px-2 bg-amber-500   rounded">Sync devices</button>


                                            </div>
                                        </td>
                                        <td className="px-6 py-4 ">
                                            <div className="flex">



                                                <button onClick={() => handleReboot(device.id)} className="cursor-pointer py-2 px-2 bg-red-600  rounded">Reboot Device</button>
                                            </div>
                                        </td>
                                    </tr>
                                )))
                            }
                        </tbody>
                    </table>
                </motion.div>
            </Card>

            {/* TODO uncomment the below and  make it user preference  if the they want it or not  */}

            {/* <Card title="Recent Activity">
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
            </Card> */}
        </div>
    );
}

export default Profile;
