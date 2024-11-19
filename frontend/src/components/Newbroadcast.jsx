import React, { useState } from "react";
import axios from "axios";
import PhonePreview from "./PhonePreview";

// Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

const Newbroadcast = () => {
  const [contentBlocks, setContentBlocks] = useState([]);
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [message, setMessage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  // Handle adding a new empty text block
  const handleAddTextBlock = () => {
    setContentBlocks([...contentBlocks, { type: "text", content: "" }]);
  };

  // Handle updating the content of a specific text block
  const handleTextChange = (index, text) => {
    const updatedBlocks = contentBlocks.map((block, i) =>
      i === index ? { ...block, content: text } : block
    );
    setContentBlocks(updatedBlocks);

    // Update message for phone preview
    const updatedMessage = updatedBlocks
      .map((block) =>
        block.type === "text" ? block.content : "[Image Uploaded]"
      )
      .join("\n");
    setMessage(updatedMessage);
  };

  // Handle adding button block
  const handleAddButtonClick = () => {
    if (buttonText && buttonLink) {
      const buttonBlock = {
        type: "button",
        text: buttonText,
        link: buttonLink,
      };
      const updatedBlocks = [...contentBlocks, buttonBlock];
      setContentBlocks(updatedBlocks);
      setButtonText("");
      setButtonLink("");
    }
  };

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload-image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const imageUrl = response.data.imagePath;
      setPreviewImage(imageUrl);

      // Add image to content blocks
      const updatedBlocks = [
        ...contentBlocks,
        { type: "image", content: imageUrl },
      ];
      setContentBlocks(updatedBlocks);

      // Update message with placeholder for image
      const updatedMessage = updatedBlocks
        .map((block) =>
          block.type === "text" ? block.content : "[Image Uploaded]"
        )
        .join("\n");
      setMessage(updatedMessage);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  // Save the broadcast to the backend
  const handleSaveAndPreview = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/broadcast/save",
        {
          contentBlocks,
        }
      );
      console.log("Broadcast saved:", response.data);
      alert("Broadcast saved successfully!");

      // Update message to show buttons and preview
      const updatedMessage = contentBlocks
        .map((block) =>
          block.type === "text" ? block.content : "[Image Uploaded]"
        )
        .join("\n");
      setMessage(updatedMessage);
    } catch (error) {
      console.error("Error saving broadcast:", error);
      alert("Failed to save broadcast.");
    }
  };

  // Handle opening and closing of modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="flex gap-4 min-h-screen">
      {/* Broadcast Form */}
      <div className="w-2/3 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">New Broadcast</h1>
        <h2 className="mb-4">Broadcasts &gt; Drafts &gt; Content</h2>
        <button
          onClick={handleSaveAndPreview}
          className="bg-blue-500 text-white px-6 py-3 rounded-md mb-6 w-full"
        >
          Save and Preview
        </button>

        <h3 className="text-lg mb-2">Send Message</h3>
        <p className="mb-4">Add one of the content blocks:</p>
        <button
          onClick={handleAddTextBlock}
          className="bg-gray-200 p-3 w-full rounded-md mb-2"
        >
          Add Text Block
        </button>
        <input type="file" onChange={handleImageUpload} className="mb-4" />

        {/* Render content blocks */}
        {contentBlocks.map((block, index) => (
          <div key={index} className="border p-4 border-dashed mb-4 rounded-md">
            {block.type === "text" && (
              <textarea
                placeholder="Enter your text..."
                rows="3"
                value={block.content}
                onChange={(e) => handleTextChange(index, e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
              />
            )}

            {block.type === "image" && (
              <div>
                <img
                  src={block.content}
                  alt="Uploaded"
                  className="w-full rounded-md"
                />
              </div>
            )}
            {block.type === "button" && (
              <div className="flex space-x-2">
                <a
                  href={block.link}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  {block.text}
                </a>
              </div>
            )}
          </div>
        ))}

        {/* Button Section */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Button Text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full mb-2"
          />
          <input
            type="text"
            placeholder="Enter Button Link"
            value={buttonLink}
            onChange={(e) => setButtonLink(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
          />
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md"
            onClick={handleAddButtonClick}
          >
            Add Button
          </button>
        </div>

        {/* Modal Trigger Button */}
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 text-white px-6 py-3 rounded-md w-full"
        >
          Open Modal
        </button>
      </div>

      {/* Phone Preview */}
      <div className="w-1/3 bg-gray-50 p-4 rounded-lg shadow-md overflow-y-auto">
        <PhonePreview
          message={message}
          image={previewImage}
          contentBlocks={contentBlocks}
        />
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold">Modal Content Here</h2>
        <p>This is a modal that can display any content you want.</p>
      </Modal>
    </div>
  );
};

export default Newbroadcast;
