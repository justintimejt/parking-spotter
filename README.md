# Parking Spotter

Parking Spotter is a web application designed to help users quickly identify available parking spots in a parking lot using a computer vision model. The app leverages a YOLO (You Only Look Once) model trained with OpenCV and NumPy to analyze images of parking lots. Users can upload or drag-and-drop an image of a parking lot, and the app will display the availability of parking spots, confidence scores, and an analyzed image with visual indicators.

Whether you're managing a parking lot or just looking for a spot, Parking Spotter makes it easy to assess parking availability with just a photo!

![Screenshot](https://github.com/justintimejt/parking-spotter/blob/fde2a7cbe3421c4c9a5f14619a3f1dcaf973b461/parking-spotter-app/public/Screen%20Shot%202025-03-10%20at%2012.21.19%20PM.png?raw=true)
---

## Features ✨

- **Image Upload**: Users can drag-and-drop or upload a photo of a parking lot.
- **Parking Spot Analysis**: The app identifies available and occupied parking spots.
- **Confidence Scores**: Displays confidence scores for each parking spot prediction.
- **Parking Availability Score**: Provides an overall score indicating the percentage of available spots.
- **Analyzed Image**: Shows the uploaded image with visual overlays highlighting available and occupied spots.
  
![Screenshot](https://github.com/justintimejt/parking-spotter/blob/a0f3da2bd1747e76a8b6ea1b25b5a04bb4a8191d/parking-spotter-app/public/Screen%20Shot%202025-03-10%20at%2012.22.25%20PM.png?raw=true)
---

## Tech Stack 💻

### Frontend
- **TypeScript**
- **React**
- **CSS**
- **HTML**

### Backend
- **Python**
- **Flask**

### Computer Vision
- **OpenCV**
- **YOLO (You Only Look Once)**
- **NumPy**

---

## How It Works 🛠️

1. **Image Input**: Users upload or drag-and-drop an image of a parking lot into the app.
2. **Model Processing**: The image is sent to the backend, where the YOLO model processes it to detect parking spots.
3. **Analysis**: The model identifies available and occupied spots, calculates confidence scores, and generates an overall parking availability score.
4. **Output**: The analyzed image is displayed with visual indicators, and the results (available spots, confidence scores, and availability score) are shown to the user.

