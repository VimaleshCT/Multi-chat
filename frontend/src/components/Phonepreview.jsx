import React from "react";

const PhonePreview = ({ message, image, contentBlocks }) => {
  return (
    <div className="border-2 p-4 rounded-lg w-full h-full max-w-xs mx-auto">
      <div className="flex flex-col p-4">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">John Doe</span>
            <span className="text-xs text-gray-500">9:45 AM</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <p>{message}</p>
          {image && (
            <img src={image} alt="Uploaded" className="mt-2 rounded-lg" />
          )}
          {/* Display buttons and images in contentBlocks */}
          {contentBlocks.map((block, index) => {
            if (block.type === "button") {
              return (
                <a
                  key={index}
                  href={block.link}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 block text-center"
                >
                  {block.text}
                </a>
              );
            }
            if (block.type === "image") {
              return (
                <img
                  key={index}
                  src={block.content}
                  alt="Uploaded"
                  className="mt-2 rounded-lg"
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
