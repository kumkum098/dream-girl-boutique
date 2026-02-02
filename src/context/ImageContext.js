import { createContext, useState, useEffect } from 'react';

export const ImageContext = createContext();

export function ImageProvider({ children }) {
  const [uploadedImages, setUploadedImages] = useState([]);

  // Load images from localStorage on mount
  useEffect(() => {
    const savedImages = localStorage.getItem('uploadedImages');
    if (savedImages) {
      setUploadedImages(JSON.parse(savedImages));
    }
  }, []);

  const addImages = (newImages) => {
    const updatedImages = [...uploadedImages, ...newImages];
    setUploadedImages(updatedImages);
    localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
  };

  const removeImage = (id) => {
    const updatedImages = uploadedImages.filter((img) => img.id !== id);
    setUploadedImages(updatedImages);
    localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
  };

  return (
    <ImageContext.Provider
      value={{ uploadedImages, addImages, removeImage }}
    >
      {children}
    </ImageContext.Provider>
  );
}
