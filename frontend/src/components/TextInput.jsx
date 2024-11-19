import React from 'react';

const TextInput = ({ messageText, setMessageText }) => {
  return (
    <div className="border p-4 border-dashed border-gray-300 rounded-md mb-4">
      <textarea
        placeholder="Enter your text..."
        className="w-full border-none focus:outline-none"
        rows="3"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)} // Update the message text
      ></textarea>
    </div>
  );
};

export default TextInput;
