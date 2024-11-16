import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Broadcasts = () => {
  const [isBroadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");

  const handleBroadcastModalOpen = () => {
    setBroadcastModalOpen(true);
  };

  const handleSendBroadcast = async () => {
    if (!broadcastMessage) {
      toast.error("Please enter a message to broadcast.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/broadcast", {
        message: broadcastMessage, // Ensure the correct message variable is sent
      });

      toast.success(response.data.message);
      setBroadcastModalOpen(false);
      setBroadcastMessage("");
    } catch (error) {
      console.error("Error broadcasting message:", error);
      const errorMessage =
        error.response?.data?.error || "Unknown error occurred.";
      toast.error(`Failed to broadcast message: ${errorMessage}`);
    }
  };

  return (
    <div className="p-8">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Broadcasts</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow-sm"
          onClick={handleBroadcastModalOpen}
        >
          Send Broadcast
        </button>
      </div>

      {isBroadcastModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Send Broadcast Message</h2>
            <textarea
              rows="4"
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mb-4"
              placeholder="Enter your broadcast message here..."
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setBroadcastModalOpen(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSendBroadcast}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Broadcasts;
