// components/SendMessageNode.js
import React from 'react';

const SendMessageNode = ({ data }) => {
  return (
    <div className="bg-red-500 text-white p-4 rounded">
      <h3>Send Message</h3>
      <textarea
        placeholder="Enter message"
        onChange={(e) => data.onChange(e.target.value)}
        className="w-full bg-white text-black p-2 mt-2 rounded"
      />
    </div>
  );
};

export default SendMessageNode;
