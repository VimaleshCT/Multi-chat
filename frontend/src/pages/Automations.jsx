import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import TemplateSelection from "../components/TemplateSelection";
import "../Styles/Automation.css";

const Automations = () => {
  const [automations, setAutomations] = useState([
    { name: "Untitled", created: "15 hours ago" },
    { name: "Sequence Message 1", created: "4 days ago" },
    { name: "Instagram Default Reply", created: "4 weeks ago" },
    { name: "Untitled", created: "1 month ago" },
  ]);
  const [isCreatingNewAutomation, setIsCreatingNewAutomation] = useState(false);

  useEffect(() => {
    const socket = socketIOClient("http://localhost:5000");

    socket.on("broadcastStatusUpdate", (data) => {
      setAutomations((prevAutomations) => [
        ...prevAutomations,
        { name: `Broadcast ${data.id}`, created: new Date().toLocaleString() },
      ]);
    });

    return () => socket.disconnect();
  }, []);

  const handleNewAutomation = () => {
    setIsCreatingNewAutomation(true);
  };

  return (
    <div className="automation-container p-6">
      {!isCreatingNewAutomation ? (
        <div className="automation-list">
          <div className="header flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Automations</h1>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleNewAutomation}
            >
              + New Automation
            </button>
          </div>

          <div className="search mb-6">
            <input
              type="text"
              className="border p-2 w-full rounded-md"
              placeholder="Search all Automations"
            />
          </div>

          <div className="folders mb-6">
            <button className="bg-gray-200 p-3 rounded-md">+ New Folder</button>
          </div>

          <div className="automation-cards">
            <h2 className="text-lg font-bold mb-2">Automations</h2>
            <ul>
              {automations.map((automation, index) => (
                <li
                  key={index}
                  className="automation-card border p-4 rounded-md mb-2 flex justify-between items-center bg-white shadow-sm"
                >
                  <span>{automation.name}</span>
                  <span className="text-gray-500">{automation.created}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <TemplateSelection /> // Render TemplateSelection when "New Automation" is clicked
      )}
    </div>
  );
};

export default Automations;
