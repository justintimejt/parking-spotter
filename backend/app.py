from flask import Flask, request, jsonify
from flask_ngrok import run_with_ngrok
import cv2
import numpy as np

app = Flask(__name__)
run_with_ngrok(app)  # Start ngrok when the app is run

@app.route('/process_image', methods=['POST'])
def process_image():
    # Check if an image file is provided in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']

    # Read the image file using OpenCV
    image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

    # Check if the image was successfully read
    if image is None:
        return jsonify({'error': 'Invalid image file'}), 400

    # Example: Convert the image to grayscale
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Save the processed image to a file (optional)
    cv2.imwrite('processed_image.jpg', gray_image)

    # Return a success message
    return jsonify({'message': 'Image processed successfully'}), 200

if __name__ == '__main__':
    app.run()