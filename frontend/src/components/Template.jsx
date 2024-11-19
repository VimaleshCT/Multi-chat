import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For handling redirection

const TemplateSelection = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (!selectedTemplate) {
      alert("Please select a template.");
      return;
    }
    navigate("/template-name", { state: { selectedTemplate } }); // Navigate to template name screen
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Select Template Content
        </h1>

        {/* Template Selection */}
        <div className="mb-8">
          <div className="mb-4">
            <input
              type="checkbox"
              onChange={() => setSelectedTemplate("Messenger Main Menu")}
            />
            <span>Messenger Main Menu</span>
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              onChange={() => setSelectedTemplate("Messenger Welcome Message")}
            />
            <span>Messenger Welcome Message</span>
          </div>
          {/* Add more checkboxes for other templates as per your requirement */}

          {/* Next Button */}
          <button
            onClick={handleNextStep}
            className="bg-indigo-600 text-white px-4 py-2 rounded mt-4"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
