import React, { useState } from 'react';

const ButtonInput = ({ buttons, setButtons }) => {
  const [buttonText, setButtonText] = useState('');
  const [buttonLink, setButtonLink] = useState('');

  const addButton = () => {
    setButtons([...buttons, { text: buttonText, link: buttonLink }]);
    setButtonText('');
    setButtonLink('');
  };

  return (
    <div className="border p-4 border-dashed border-gray-300 rounded-md mb-4">
      <input
        type="text"
        placeholder="Button Text"
        value={buttonText}
        onChange={(e) => setButtonText(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full mb-2"
      />
      <input
        type="text"
        placeholder="Button Link"
        value={buttonLink}
        onChange={(e) => setButtonLink(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full mb-2"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={addButton}>
        Add Button
      </button>

      <div className="mt-4">
        {buttons.map((btn, index) => (
          <div key={index}>
            <a href={btn.link} target="_blank" className="text-blue-500">
              {btn.text}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonInput;
