// components/ConditionNode.js
import React, { useState } from "react";

const ConditionNode = ({ data }) => {
  const [condition, setCondition] = useState("");

  return (
    <div className="bg-blue-500 text-white p-4 rounded">
      <h3>Condition</h3>
      <input
        type="text"
        placeholder="Define Condition"
        value={condition}
        onChange={(e) => {
          setCondition(e.target.value);
          data.onChange(e.target.value);
        }}
        className="w-full bg-white text-black p-2 mt-2 rounded"
      />
    </div>
  );
};

export default ConditionNode;
