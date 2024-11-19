import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Newbroadcast from "../components/Newbroadcast"; // Import the new component

const Broadcasts = () => {
  const [isBroadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [isNewBroadcastModalOpen, setNewBroadcastModalOpen] = useState(false);
  const [isAutomationModalOpen, setAutomationModalOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcastHistory, setBroadcastHistory] = useState([]);
  const [drafts] = useState([
    {
      type: "Content",
      name: "Content",
      lastEdit: "6 Sep 2024, 11:40 (UTC +05:30)",
    },
    {
      type: "Content",
      name: "Content",
      lastEdit: "6 Sep 2024, 11:37 (UTC +05:30)",
    },
    {
      type: "Content",
      name: "Content",
      lastEdit: "3 Sep 2024, 22:14 (UTC +05:30)",
    },
    {
      type: "Content",
      name: "Content",
      lastEdit: "30 Aug 2024, 16:28 (UTC +05:30)",
    },
  ]);

  const handleBroadcastModalOpen = () => {
    setBroadcastModalOpen(true); // Open the Send Broadcast modal
  };

  const handleNewBroadcastModalOpen = () => {
    setNewBroadcastModalOpen(true); // Open the New Broadcast modal
  };

  const handleAutomationModalOpen = () => {
    setAutomationModalOpen(true); // Open the Broadcast Automation modal
  };

  const handleSendBroadcast = async () => {
    if (!broadcastMessage) {
      toast.error("Please enter a message to broadcast.");
      return;
    }

    try {
      // Ensure the contacts are correctly passed from the frontend (e.g., through form or predefined list)
      const response = await axios.post("http://localhost:5000/api/broadcast", {
        message: broadcastMessage, // Ensure message is sent
      });

      const { successfulContacts, failedContacts } = response.data;

      toast.success("Broadcast sent successfully.");
      successfulContacts.forEach((contact) => {
        toast.success(`Message sent to ${contact.phone}`);
      });

      failedContacts.forEach((contact) => {
        toast.error(`Failed to send to ${contact.phone}: ${contact.error}`);
      });

      setBroadcastHistory((prevHistory) => [
        ...prevHistory,
        {
          message: broadcastMessage,
          timestamp: new Date().toLocaleString(),
          status: failedContacts.length === 0 ? "Success" : "Partial Success",
        },
      ]);

      setBroadcastModalOpen(false);
      setBroadcastMessage("");
    } catch (error) {
      console.error("Error broadcasting message:", error);
      toast.error(
        `Failed to broadcast message: ${
          error.response?.data?.error || "Unknown error"
        }`
      );

      setBroadcastHistory((prevHistory) => [
        ...prevHistory,
        {
          message: broadcastMessage,
          timestamp: new Date().toLocaleString(),
          status: "Failed",
        },
      ]);
    }
  };

  return (
    <div className="p-8">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Broadcasts</h1>
        <div className="flex space-x-2">
          {/* "Send Broadcast" button placed at the top */}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow-sm"
            onClick={handleBroadcastModalOpen} // Open modal to send broadcast
          >
            Send Broadcast
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-sm"
            onClick={handleNewBroadcastModalOpen} // Open New Broadcast modal
          >
            New Broadcast
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 shadow-sm"
            onClick={handleAutomationModalOpen} // Open Broadcast Automation modal
          >
            Broadcast From Automation
          </button>
        </div>
      </div>
      {/* Drafts Section */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">Drafts</h2>
        <div className="overflow-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                  Type
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                  Last Edit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {drafts.map((draft, index) => (
                <tr key={index}>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {draft.type}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {draft.name}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {draft.lastEdit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* History Section */}
      <div>
        <h2 className="text-lg font-bold mb-4">History</h2>
        {broadcastHistory.length === 0 ? (
          <div className="py-4 text-center text-gray-500">Nothing is here</div>
        ) : (
          <div>
            <table className="min-w-full bg-white border border-gray-200 shadow-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                    Message
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                    Timestamp
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {broadcastHistory.map((entry, index) => (
                  <tr key={index}>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {entry.message}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {entry.timestamp}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {entry.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Broadcast Modal for sending message */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Send Broadcast Message</h2>
            <textarea
              rows="4"
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)} // Update state as the user types
              className="border border-gray-300 rounded p-2 w-full mb-4"
              placeholder="Enter your broadcast message here..."
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setBroadcastModalOpen(false)} // Close modal without sending
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSendBroadcast} // Trigger the broadcast function
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Send Broadcast
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Broadcast Modal (This can be the Newbroadcast component or custom modal) */}
      {isNewBroadcastModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">New Broadcast</h2>
            <Newbroadcast /> {/* Use the Newbroadcast component here */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setNewBroadcastModalOpen(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => setNewBroadcastModalOpen(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Broadcast
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Automation Modal */}
      {isAutomationModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Broadcast From Automation
            </h2>
            <p className="mb-4">
              Automation is running. This will automatically send messages.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setAutomationModalOpen(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Broadcasts;
