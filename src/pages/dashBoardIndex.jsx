import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Card from "../components/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../store/slice/messageSlice";
import MessageTable from "../components/MessageTable";


function DashBoardIndex() {

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
    }, [dispatch,]);

    
    return (
        <div className="space-y-7">
            <Card title="Summary">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                        { label: 'Active Boards', value: 3, color: 'bg-white text-black' },
                        { label: 'Messages Sent', value: 128, color: 'bg-white text-black' },
                        { label: 'Pending Alerts', value: 2, color: 'bg-white text-black' },
                        { label: 'System Uptime', value: '99.9%', color: 'bg-white text-black' },
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        className={`rounded-xl p-5 shadow hover:shadow-md border-gray-50 border transition ${card.color}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                        <h3 className="text-sm font-medium mb-2 text-gray-600">{card.label}</h3>
                        <p className="text-2xl font-bold">{card.value}</p>
                    </motion.div>
                ))}
            </div>
            </Card>
            <Card title="Messages">          {/* Message Log Table */}
                <MessageTable />
            </Card>

        </div>
    )
}

export default DashBoardIndex