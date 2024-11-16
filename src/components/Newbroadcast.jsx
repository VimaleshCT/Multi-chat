import React, { useState } from 'react';

const Newbroadcast = () => {
  const [contentBlocks, setContentBlocks] = useState([]);
  const [buttonBlocks, setButtonBlocks] = useState([]);

  const [buttonText, setButtonText] = useState('');
  const [buttonLink, setButtonLink] = useState('');


  const handleAddBlock = (type) => {
    setContentBlocks([...contentBlocks, type]);
  };

  const handleAddButtonClick = () => {
    if (buttonText && buttonLink) {
      setButtonBlocks([...buttonBlocks, { text: buttonText, link: buttonLink }]);
      setButtonText('');
      setButtonLink('');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Broadcasts &gt; Drafts &gt; Content</h1>
        <div className="flex space-x-2">
          <button className="bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100">
            Preview
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-sm">
            Send Now
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Send Message</h2>
        <p className="text-sm mb-4">Add one of the content blocks:</p>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <button
            className="w-full p-4 border-dashed border-2 border-gray-300 rounded-md text-left"
            onClick={() => handleAddBlock('text')}
          >
            <span className="font-bold">Text</span>
            <p className="text-gray-500">Add simple text and buttons</p>
          </button>
          <button
            className="w-full p-4 border-dashed border-2 border-gray-300 rounded-md text-left"
            onClick={() => handleAddBlock('image')}
          >
            <span className="font-bold">Image</span>
            <p className="text-gray-500">Boost engagement with visuals</p>
          </button>
          <button
            className="w-full p-4 border-dashed border-2 border-gray-300 rounded-md text-left"
            onClick={() => handleAddBlock('gallery')}
          >
            <span className="font-bold">Gallery</span>
            <p className="text-gray-500">Add up to 10 images with buttons</p>
          </button>
        </div>

        {/* Render the content blocks dynamically */}
        {contentBlocks.map((block, index) => (
          <div key={index} className="mb-4">
            {block === 'text' && (
              <div className="border p-4 border-dashed border-gray-300 rounded-md">
                <textarea
                  placeholder="Enter your text..."
                  className="w-full border-none focus:outline-none"
                  rows="3"
                ></textarea>
                <button className="mt-2 text-blue-500" onClick={() => handleAddBlock('button')}>
                  + Add Button
                </button>

                {/* If button block is clicked */}
                {contentBlocks.includes('button') && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Enter Button Text"
                      className="p-2 border border-gray-300 rounded-md w-full mb-2"
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Enter Button Link"
                      className="p-2 border border-gray-300 rounded-md w-full mb-2"
                      value={buttonLink}
                      onChange={(e) => setButtonLink(e.target.value)}
                    />
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      onClick={handleAddButtonClick}
                    >
                      Add Button
                    </button>
                  </div>
                )}

                {/* Display Added Buttons */}
                {buttonBlocks.map((btn, i) => (
                  <div key={i} className="mt-2">
                    <a href={btn.link} target="_blank" className="text-blue-500">
                      {btn.text}
                    </a>
                  </div>
                ))}
              </div>
            )}

            {block === 'image' && (
              <div className="border p-4 border-dashed border-gray-300 rounded-md">
                <div className="text-center p-4 bg-gray-100 border rounded-lg">
                  <span className="block text-gray-500">Image</span>
                </div>
                <button className="mt-2 text-blue-500">Upload Image</button>
              </div>
            )}

            {block === 'gallery' && (
              <div className="border p-4 border-dashed border-gray-300 rounded-md">
                <div className="text-center p-4 bg-gray-100 border rounded-lg">
                  <span className="block text-gray-500">Gallery</span>
                </div>
                <button className="mt-2 text-blue-500">Upload Images</button>
              </div>
            )}
          </div>
        ))}

        {/* Preview WhatsApp-like message */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Preview</h3>
          <div className="border rounded-lg p-4 bg-gray-100">
            <div className="flex space-x-2 items-center">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
              <div className="p-2 bg-white border rounded-lg">
                <p>Sample WhatsApp message:</p>
                {buttonBlocks.map((btn, i) => (
                  <div key={i} className="mt-2">
                    <a href={btn.link} className="text-blue-500 underline">
                      {btn.text}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newbroadcast;
