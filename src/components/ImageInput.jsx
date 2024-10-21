import React, { useState } from 'react';

const ImageInput = ({ imageUrl, setImageUrl }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="border p-4 border-dashed border-gray-300 rounded-md mb-4">
      <input type="file" onChange={handleImageUpload} />
      {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-2" />}
    </div>
  );
};

export default ImageInput;
