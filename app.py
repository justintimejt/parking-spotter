from flask import Flask, request, jsonify
from ultralytics import YOLO
import cv2
import numpy as np
import base64
from io import BytesIO


app = Flask(__name__)

# Load the trained YOLO model
model = YOLO('./best.pt')  # Update with the correct model path

@app.after_request
def add_cors_headers(response):
    # Allow all origins (for development purposes)
    response.headers['Access-Control-Allow-Origin'] = '*'  # You can restrict this to specific domains in production
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response

@app.route('/predict', methods=['POST'])
def predict():
    # Get the base64 string from the POST request
    data = request.get_json()
    image_data = data['image']  # The base64 string of the image

    # Decode the base64 string to bytes
    img_data = base64.b64decode(image_data.split(',')[1])  # Remove the data URL prefix, if present

    # Convert the bytes to a numpy array
    nparr = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Run inference on the image using the YOLO model
    results = model(img)

    print(results[0].boxes)

    # Get the classes (empty and occupied) and count them
    class_labels = results[0].boxes.cls.tolist()  # List of class labels detected in the image
    empty_count = class_labels.count(0)  # Assuming '0' represents "empty"
    occupied_count = class_labels.count(1)  # Assuming '1' represents "occupied"

    # Initialize an empty result string
    result_string = ""

    for box, conf, cls in zip(results[0].boxes.xyxy.tolist(), results[0].boxes.conf.tolist(), results[0].boxes.cls.tolist()):
        # Define class mapping (assuming 0 = empty, 1 = occupied)
        class_id = 1 if cls == 0 else 2  # 1 → Empty Parking Space, 2 → Occupied Parking Space

        # Extract bounding box coordinates (x_min, y_min, x_max, y_max)
        x_min, y_min, x_max, y_max = box

        # Append the formatted result to the result string
        result_string += f"{"processed_img"} {class_id} {conf} {x_min} {y_min} {x_max} {y_max}\n"

    # Visualize the results
    im = results[0].plot()  # Plot the detections on the image
    
    # Convert the image to a byte stream
    _, buffer = cv2.imencode('.jpg', im)  # Convert to jpg (you can change this format if needed)
    img_byte_arr = BytesIO(buffer)  # Convert to a byte array
    img_base64 = base64.b64encode(img_byte_arr.getvalue()).decode('utf-8')  # Convert to base64

    # Process results and send them in the response
    response = {
        "empty_count": empty_count,  # Number of empty spots
        "occupied_count": occupied_count,  # Number of occupied spots
        "detection_results": result_string, 
        "image": f"data:image/jpeg;base64,{img_base64}"  # Include the processed image as base64
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
