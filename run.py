import os
import cv2
import numpy as np
from ultralytics import YOLO

# Load the trained YOLO model
model = YOLO('./best.pt')  # Update with the correct model path

# Define the folder containing images
image_folder = "./testing"  # Update this with the actual folder path

# Ensure the output directory exists
output_folder = "./output"
os.makedirs(output_folder, exist_ok=True)

# Define the results file path (single file for all images)
results_file = os.path.join(output_folder, "results.txt")

# Open the results file in write mode
with open(results_file, "w") as file:
    # Write a header for clarity
    file.write("Filename Class_ID Confidence X_min Y_min X_max Y_max\n")
    file.write("="*60 + "\n")

    # Loop through all image files in the folder
    for filename in os.listdir(image_folder):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):  # Process only image files
            image_path = os.path.join(image_folder, filename)

            # Read the image
            img = cv2.imread(image_path)

            # Run inference
            results = model(img)

            # Process results
            for box, conf, cls in zip(results[0].boxes.xyxy.tolist(), results[0].boxes.conf.tolist(), results[0].boxes.cls.tolist()):
                # Define class mapping (assuming 0 = empty, 1 = occupied)
                class_id = 1 if cls == 0 else 2  # 1 → Empty Parking Space, 2 → Occupied Parking Space

                # Extract bounding box coordinates (x_min, y_min, x_max, y_max)
                x_min, y_min, x_max, y_max = box

                # Format the detection results into a single line
                result_line = f"{filename} {class_id} {conf:.4f} {x_min:.2f} {y_min:.2f} {x_max:.2f} {y_max:.2f}\n"

                # Write to the single results.txt file
                file.write(result_line)

print(f"Processing complete! All results saved in {results_file}")