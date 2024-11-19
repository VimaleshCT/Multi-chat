import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // For handling navigation and passed state

const TemplateName = () => {
  const { state } = useLocation(); // Get the selected template from the previous step
  const [templateName, setTemplateName] = useState("");
  const [isProtected, setIsProtected] = useState(false);
  const navigate = useNavigate();

  const handleCreateTemplate = () => {
    if (!templateName) {
      alert("Please provide a template name.");
      return;
    }

    // Here you would create the template with the selected content and name.
    // You can implement API calls to save the new template if needed.
    alert("Template created successfully!");

    // Redirect to success page or show success message.
    navigate("/template-created"); // You can change this route as needed
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Create New Template
        </h1>

        <div className="mb-4">
          <label className="block mb-2">Template Name</label>
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="p-2 border rounded w-full"
            placeholder="Enter template name"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={isProtected}
              onChange={() => setIsProtected(!isProtected)}
            />
            Protect template
          </label>
        </div>

        <button
          onClick={handleCreateTemplate}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Template
        </button>
      </div>
    </div>
  );
};

export default TemplateName;
