import React, { useState } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "react-flow-renderer";
import PhonePreview from "./PhonePreview";
import axios from "axios";

const FlowBuilder = () => {
  const [elements, setElements] = useState([]);
  const [contentBlocks, setContentBlocks] = useState([]);

  const addNode = (type) => {
    const newNode = {
      id: `${elements.length + 1}`,
      type,
      position: { x: Math.random() * 200, y: Math.random() * 200 },
      data: { label: `${type} Block`, contentBlocks: [] },
    };
    setElements((prevElements) => [...prevElements, newNode]);
  };

  const handleAddBlock = (type) => {
    const newBlock = { type, content: "" };
    setContentBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  };

  const handleTextChange = (index, text) => {
    const updatedBlocks = contentBlocks.map((block, i) =>
      i === index ? { ...block, content: text } : block
    );
    setContentBlocks(updatedBlocks);
  };

  const handleImageUpload = async (event, index) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const imageUrl = response.data.imagePath;
      const updatedBlocks = contentBlocks.map((block, i) =>
        i === index ? { ...block, content: imageUrl } : block
      );
      setContentBlocks(updatedBlocks);
      console.log("Image uploaded:", imageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const saveFlow = async () => {
    try {
      await axios.post("http://localhost:5000/api/save-flow", { elements });
      alert("Flow saved successfully!");
    } catch (error) {
      console.error("Error saving flow:", error);
    }
  };

  const handleNodesChange = (changes) => {
    setElements((els) =>
      els.map((el) => changes.find((change) => change.id === el.id) || el)
    );
  };

  const handleEdgesChange = (changes) => {
    setElements((els) =>
      els.map((el) => changes.find((change) => change.id === el.id) || el)
    );
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/3 border-r-2 p-6 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Flow Builder</h3>
        <div className="space-x-2 mb-6">
          <button
            onClick={() => addNode("Send Message")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Send Message
          </button>
          <button
            onClick={() => addNode("Condition")}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Add Condition
          </button>
          <button
            onClick={() => addNode("Trigger")}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Add Trigger
          </button>
        </div>

        <ReactFlow
          elements={elements}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          style={{ height: "80%" }}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
        <button
          onClick={saveFlow}
          className="mt-6 px-4 py-2 bg-indigo-500 text-white rounded"
        >
          Save Flow
        </button>
      </div>

      <div className="w-1/3 p-6">
        <h4 className="text-lg font-semibold mb-4">Phone Preview</h4>
        <PhonePreview contentBlocks={contentBlocks} />

        <div className="mt-4">
          <button
            onClick={() => handleAddBlock("text")}
            className="px-4 py-2 mr-2 bg-gray-200 rounded"
          >
            Text
          </button>
          <button
            onClick={() => handleAddBlock("image")}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Image
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {contentBlocks.map((block, index) => (
            <div key={index}>
              {block.type === "text" && (
                <textarea
                  placeholder="Enter text"
                  value={block.content}
                  onChange={(e) => handleTextChange(index, e.target.value)}
                  className="w-full border border-gray-300 rounded p-2"
                />
              )}
              {block.type === "image" && (
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e, index)}
                  className="w-full border border-gray-300 rounded p-2"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowBuilder;
