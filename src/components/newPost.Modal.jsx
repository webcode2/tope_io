import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleNewMessageModal } from "../store/slice/themeSlice";

export default function PostMessageModal({ handleSubmit, message, setMessage }) {
  const { newMessageModal } = useSelector(state => state.theme)
  const dispatch = useDispatch()
  console.log(newMessageModal)

  if (!newMessageModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={() => { dispatch(toggleNewMessageModal(false)) }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <h1 className="text-2xl font-bold mb-4 text-blue-700">Post Message</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
