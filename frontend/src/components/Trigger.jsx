import React, { useState } from "react";

const TriggerSetup = () => {
  const [selectedTrigger, setSelectedTrigger] = useState("");

  return (
    <div>
      <h2>Set Trigger</h2>
      <div className="trigger-options">
        <button
          onClick={() => setSelectedTrigger("User replies to your Story")}
        >
          User replies to your Story
        </button>
        <button
          onClick={() => setSelectedTrigger("User comments on your Post")}
        >
          User comments on your Post
        </button>
      </div>

      {selectedTrigger && <p>Selected Trigger: {selectedTrigger}</p>}
    </div>
  );
};

export default TriggerSetup;
