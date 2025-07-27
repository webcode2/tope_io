import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessageModalUpdate, toggleNewMessageModal } from "../store/slice/themeSlice";
import { UploadCloud } from "lucide-react";
import { sendMessage, updateMessage } from "../store/slice/messageSlice";
import { motion } from "framer-motion";

export default function PostMessageModal() {
  const { newMessageModal, newMessageModalUpdate } = useSelector(state => state.theme);



  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  useEffect(() => {
    if (newMessageModalUpdate) { setMessage(newMessageModalUpdate?.message) }

  }, [newMessageModalUpdate, dispatch])


  if (!newMessageModal) return null;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.length < 5 || message.length > 30) {
      setError("Message must be between 5 and 30 characters.");
      return;
    }
    setError("");
    if (newMessageModalUpdate) {
      // Handle update logic here if needed
      dispatch(updateMessage({ id: newMessageModalUpdate.id, message }));
    } else {
      dispatch(sendMessage(message));

    }
    dispatch(toggleNewMessageModal(false));
    dispatch(clearMessageModalUpdate())
    setMessage(""); // Optionally clear the message
  };

  return (
    <motion.div
      className="overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={() => { dispatch(toggleNewMessageModal(false)); dispatch(clearMessageModalUpdate()); setMessage("") }}
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
            {error && (
              <p className="text-red-600 bg-red-100 py-2 px-4  w-fit rounded text-xs mt-1">{error}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className=" text-blue-700 px-5 py-2 rounded bg-blue-100 transition flex"
            >{newMessageModalUpdate ? "Update Message" : "Post Message"}
              <UploadCloud className="w-6 h-6 ml-3" />
            </button>
          </div>
        </form>
      </div>
      </div></motion.div>
  );
}
