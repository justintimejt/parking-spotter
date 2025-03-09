import "../styles/homepage.css";
import { useEffect, useRef } from "react";
import { KeyStatistics } from "../components/KeyStatistics";
import { ParkingPreview } from "../components/ParkingPreview";
import { FileUploader } from "../components/FileUploader";

const Homepage = () => {
  const statisticsRef = useRef<{updateStatistics: (stats: { statisticNum: string; statisticDescription: string }[]) => void;}>(null);
  const previewImgRef = useRef<{updatePreviewImgURL: (newPreviewImgURL: string) => void}>(null);

  useEffect(() => {

    // statisticsRef.current?.updateStatistics([
    //   { statisticNum: "5000", statisticDescription: "Total Available Spots" },
    //   { statisticNum: "1200", statisticDescription: "Currently Occupied" },
    // ]);
  }, [])

  

  

  return (
    <>
      <section className="above-the-fold-container">
        <div className="above-the-fold-main-info-container">
          <div className="above-the-fold-main-info-container-tag">Track parking lot availability anytime!</div>
          <h1 className="above-the-fold-main-info-title">Parking Lot <br></br> <span style={{color: "#67FF90"}}>Spotter.</span></h1>
          <p className="above-the-fold-main-info-subtitle">Upload and access parking lot <br></br> availability in a instant!</p>
          <div className="above-the-fold-action-button-container">
            <button className="above-the-fold-upload-image-button">Upload image of a parking lot.</button>
            <button className="above-the-fold-learn-more-button">Learn More</button>
          </div>
        </div>
        <div className="above-the-fold-drag-and-drop-files-container">
          <FileUploader onImageUpload={(imageDataURL: string) => console.log(imageDataURL)}></FileUploader>
        </div>
      </section>

      <KeyStatistics ref={statisticsRef}></KeyStatistics>
      <ParkingPreview ref={previewImgRef}></ParkingPreview>
    </>
  )
}

export { Homepage };