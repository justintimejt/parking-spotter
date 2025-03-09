/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from "react";
import "../styles/fileUploader.css"; // Import the external CSS file

interface FileUploaderProps {
    onImageUpload: (imageDataUrl: string) => void; // Define the callback type
}

const FileUploader: React.FC<FileUploaderProps> = ({ onImageUpload }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleNewImage = (image: File) => {
    // Create a data URL for the image
    const reader = new FileReader();
    reader.onloadend = () => {
        const imageUrl = reader.result as string;
        onImageUpload(imageUrl); // Call the parent function with the image URL
    };

    reader.readAsDataURL(image); // Read the image file as a data URL
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        console.log("nice")
        const selectedFile = event.target.files[0]; // Only select the first file
        setFiles([selectedFile]); // Replace any existing files with the new one
        handleNewImage(selectedFile);
    }
  };

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);

      if (event.dataTransfer.files) {
        const droppedFile = event.dataTransfer.files[0]; // Only accept the first dropped file
        setFiles([droppedFile]); // Replace any existing files with the new one
        handleNewImage(droppedFile);
      }
    },
    []
  );

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <>
      {/* Drag and drop area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`drag-drop-area ${isDragging ? 'dragging' : ''}`}
      >
        <p className="drag-drop-text">Or drag and drop files here</p>

        {/* File input */}
        <input
          type="file"
          onChange={handleFileInputChange} // Handle file input change
          style={{ display: "none" }}
          accept=".png,.jpg,.jpeg" // Accept only image and PDF files
          id="file-input"
        />
      </div>

      {/* Display uploaded files */}
      <div className="uploaded-file-name-container">
        {files.length === 0 ? (
          <p className="uploaded-file-names">📁 No files uploaded</p>
        ) : (
          <p className="uploaded-file-names">
            {files[0].name} - {files[0].type} - {(files[0].size / 1024).toFixed(2)} KB
          </p>
        )}
      </div>
    </>
  );
};

export { FileUploader };