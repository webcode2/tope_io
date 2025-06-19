import React, { useState } from 'react';

export default function PostMessage() {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Send message to board
        console.log('Message submitted:', message);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-blue-700">Post Message</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message Content
                    </label>
                    <textarea
                        id="message"
                        rows={4}
                        required
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Enter your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}
