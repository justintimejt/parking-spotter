import { useState, forwardRef, useImperativeHandle } from "react";
import "../styles/parkingPreview.css";

interface ParkingPreviewHandle {
  updatePreviewImgURL: (newPreviewImgURL: string) => void;
}

const ParkingPreview = forwardRef<ParkingPreviewHandle>((_, ref) => {
  const [previewImgURL, setPreviewImgURL] = useState("");

  // Expose the function to the parent via ref
  useImperativeHandle(ref, () => ({
    updatePreviewImgURL: (newPreviewImgURL: string) => {
      setPreviewImgURL(newPreviewImgURL);
    },
  }));

  return (
    <section className="parking-preview-container">
      <div className="parking-preview">
        {previewImgURL ? (
          <img src={previewImgURL} alt="Parking Preview" className="parking-preview-image" />
        ) : (
          <p>No preview available</p>
        )}
      </div>
      <p className="parking-preview-label">Image of open and closed parking spots.</p>
    </section>
  );
});

export { ParkingPreview };