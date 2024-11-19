import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Automation.css"; // Import the correct styling for Automation

const TemplateSelection = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateName) => {
    navigate(`/automations/flow-builder/${templateName}`);
  };

  const templates = [
    {
      name: "Auto-reply to comment in DM",
      description: "Send a product lineup in Instagram DMs",
    },
    {
      name: "Generate leads with stories",
      description: "Use limited-time offers in your Stories to convert leads",
    },
    {
      name: "Recognize questions in DM with AI",
      description: "Identify and respond to common user inquiries",
    },
  ];

  return (
    <div className="template-selection-container">
      <h2 className="text-xl font-semibold mb-4">
        Select a Template for Automation
      </h2>
      {templates.map((template, index) => (
        <div
          key={index}
          onClick={() => handleTemplateSelect(template.name)}
          className="template-card p-4 mb-4 cursor-pointer hover:bg-gray-200 rounded-md shadow-sm"
        >
          <h3 className="font-bold text-lg">{template.name}</h3>
          <p className="text-gray-600">{template.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TemplateSelection;
