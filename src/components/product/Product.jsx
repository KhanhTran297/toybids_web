import React, { useState } from "react";

const Product = (props) => {
  const { mainImage, subImage1, subImage2, subImage3 } = props;
  const smallImages = [mainImage, subImage1, subImage2, subImage3];
  const [selectedImage, setSelectedImage] = useState(smallImages[1]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  return (
    <div className="flex w-[600px] h-[600px] items-center border-[1px] border-[#000] rounded-3xl">
      <div className="w-1/4 p-4">
        {smallImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="w-16 h-16 m-2 cursor-pointer  border-[1px] border-[#000]"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>

      <div className="w-3/4 p-4">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Large Image"
            className="w-full h-auto"
          />
        )}
      </div>
    </div>
  );
};

export default Product;
