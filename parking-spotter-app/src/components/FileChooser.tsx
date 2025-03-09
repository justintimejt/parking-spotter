import { useRef } from "react";

interface UploadButtonProps {
  onImageUpload?: (imageDataURL: string) => void; // Callback function when an image is uploaded
}

const UploadButton: React.FC<UploadButtonProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger file input
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageUrl = reader.result as string;
            onImageUpload?.(imageUrl); // Call parent function with the image URL
        };

        reader.readAsDataURL(selectedFile); // Convert image to base64 data URL
    }
  };

  return (
    <>
      <button
        className="above-the-fold-upload-image-button px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleButtonClick}
      >
        Upload image of a parking lot.
      </button>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};

export { UploadButton };
