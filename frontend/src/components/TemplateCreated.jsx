import React from "react";
import { Link } from "react-router-dom";

const TemplateCreated = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="flex-1 p-8 text-center">
        <h1 className="text-3xl font-bold text-green-500 mb-4">Success!</h1>
        <p className="text-xl mb-4">The template was successfully created.</p>
        <Link
          to="/settings"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Settings
        </Link>
      </div>
    </div>
  );
};

export default TemplateCreated;
