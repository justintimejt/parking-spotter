import "../styles/homepage.css";
import { useEffect, useRef, useState } from "react";
import { KeyStatistics } from "../components/KeyStatistics";
import { ParkingPreview } from "../components/ParkingPreview";
import { FileUploader } from "../components/FileUploader";
import { UploadButton } from "../components/FileChooser";

const Homepage = () => {
  const statisticsRef = useRef<{updateStatistics: (stats: { statisticNum: string; statisticDescription: string }[]) => void;}>(null);
  const previewImgRef = useRef<{updatePreviewImgURL: (newPreviewImgURL: string) => void}>(null);
  const [detectionResults, setDetectionResults] = useState(""); // State for <p> content

  useEffect(() => {
    statisticsRef.current?.updateStatistics([
      { statisticNum: "5000", statisticDescription: "Total Available Spots" },
      { statisticNum: "1200", statisticDescription: "Currently Occupied" },
    ]);
  }, [])

  const analyzeParkingLot = async (imageDataURL: string) => {
    console.log("Fetching")
    const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageDataURL }), // Send base64 string in request body
    });

    const data = await response.json(); // Parse JSON response from Flask
    console.log(data); // Display the prediction result

    // Upload display
    previewImgRef.current?.updatePreviewImgURL(data.image);

    // Update key statistics
    statisticsRef.current?.updateStatistics([
      { statisticNum: data.empty_count.toString(), statisticDescription: "Empty Spots" },
      { statisticNum: data.occupied_count.toString(), statisticDescription: "Occupied Spots" },
      { statisticNum: Math.round((data.empty_count / data.occupied_count) * 100) + "%", statisticDescription: "Chance of getting a spot" },
      { statisticNum: Math.round((data.empty_count / data.occupied_count) * 100) + "%", statisticDescription: "Chance of getting a spot" },
    ]);

    setDetectionResults(data.detection_results);
  }
  

  return (
    <>
      <section className="above-the-fold-container">
        <div className="above-the-fold-main-info-container">
          <div className="above-the-fold-main-info-container-tag">Track parking lot availability anytime!</div>
          <h1 className="above-the-fold-main-info-title">Parking Lot <br></br> <span style={{color: "#67FF90"}}>Spotter.</span></h1>
          <p className="above-the-fold-main-info-subtitle">Upload and access parking lot <br></br> availability in a instant!</p>
          <div className="above-the-fold-action-button-container">
            <UploadButton onImageUpload={analyzeParkingLot}></UploadButton>
            <a className="above-the-fold-learn-more-button">Learn More</a>
          </div>
        </div>
        <div className="above-the-fold-drag-and-drop-files-container">
          <FileUploader onImageUpload={(imageDataURL: string) => {
            analyzeParkingLot(imageDataURL)
          }}></FileUploader>
        </div>
      </section>

      <KeyStatistics ref={statisticsRef}></KeyStatistics>
      <ParkingPreview ref={previewImgRef}></ParkingPreview>
      <p className="detection-results-container">{detectionResults}</p>
    </>
  )
}

export { Homepage };