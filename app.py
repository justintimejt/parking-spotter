from flask import Flask, request, jsonify
from ultralytics import YOLO
import cv2
import numpy as np

app = Flask(__name__)

# Load the trained YOLO model
model = YOLO('./best.pt')  # Update with the correct model path

@app.route('/predict', methods=['POST'])
def predict():
    # Get the image from the POST request
    file = request.files['image']
    img_bytes = file.read()
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Run inference on the image using the YOLO model
    results = model(img)

    print(results[0].boxes)

    # Process results (you can customize the response as needed)
    response = {
        "boxes": results[0].boxes.xyxy.tolist(),  # List of bounding boxes
        "confidence": results[0].boxes.conf.tolist(),  # Confidence scores
        "class": results[0].boxes.cls.tolist(),  # Detected class labels
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
