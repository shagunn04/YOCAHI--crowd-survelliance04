from flask import Flask, Response, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS  
import cv2
import torch
import threading
import face_recognition
import numpy as np
import datetime
from ultralytics import YOLO
from src.tracking import DeepSORTTracker
from src.count_manager import CrowdCounter

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
client = MongoClient("mongodb+srv://sarimmalik:35YO98aWug5IMOWq@cluster0.r33mf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["face_recognition"]
users_collection=db["users"]
faces_collection=db['faces']
# Load YOLO model (Use CUDA if available)

device = "cuda" if torch.cuda.is_available() else "cpu"
model = YOLO("database/yolov8n.pt").to(device)

# Load Tracker and Counter
tracker = DeepSORTTracker()
counter = CrowdCounter()

video_path = None  # To store uploaded video path
current_count = 0  # To store real-time count
frame_skip = 3  # Process every 3rd frame for speed

def get_known_faces():
    """ Fetch stored face encodings from MongoDB """
    known_faces = {}
    users = faces_collection.find({}, {"name": 1, "encoding": 1, "_id": 0})
    
    for user in users:
        name = user["name"]
        encoding = np.array(user["encoding"])  # Convert stored list back to NumPy array
        known_faces[name] = encoding

    return known_faces

known_faces = get_known_faces()

def recognize_face(face_image):
    """ Compare detected face with stored encodings """
    face_encodings = face_recognition.face_encodings(face_image)

    if not face_encodings:
        return None  # No face found

    face_encoding = face_encodings[0]
    
    for name, stored_encoding in known_faces.items():
        match = face_recognition.compare_faces([stored_encoding], face_encoding)[0]

        if match:
            return name  # Return matched person's name

    return None  # No match found

def generate_frames():
    """ Generator function to yield processed frames with face recognition """
    global video_path, current_count
    if not video_path:
        return  # No video uploaded yet

    cap = cv2.VideoCapture(video_path)
    frame_id = 0  # Track frame count

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        if frame_id % frame_skip == 0:
            frame = cv2.resize(frame, (640, 480))  # Resize for speed

            # YOLO Detection (Detect only persons)
            results = model(frame)
            detections = [
                (int(box.xyxy[0][0]), int(box.xyxy[0][1]), int(box.xyxy[0][2]), int(box.xyxy[0][3]), float(box.conf[0]))
                for r in results for box in r.boxes
                if int(box.cls[0]) == 0 and float(box.conf[0]) > 0.3
            ]

            # Object Tracking
            tracked_objects = tracker.update(detections, frame)

            # People Counting
            current_count = counter.update(tracked_objects)

            for obj in tracked_objects:
                x1, y1, x2, y2, obj_id = obj

                # Extract face region
                if y2 > y1 and x2 > x1:  # Ensure valid face region
                 face = frame[y1:y2, x1:x2]
                 face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
                 person_name = recognize_face(face)
                else:
                 person_name = None
                if person_name:
                    log_entry(person_name)  # Log entry
                    label = f"{person_name}"
                else:
                    label = "Unknown"

                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

                # Ensure label appears properly above the bounding box
                label_x = x1
                label_y = max(20, y1 - 10)  # Prevent label from going off-screen

                # Add label background for better visibility
                (w, h), _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2)
                cv2.rectangle(frame, (label_x, label_y - h - 5), (label_x + w + 5, label_y + 5), (0, 255, 0), -1)
                
                # Put text on frame
                cv2.putText(frame, label, (label_x, label_y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2)

            cv2.putText(frame, f"Total Count: {current_count}", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        frame_id += 1

        # Encode frame as JPEG
        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    cap.release()

# Dictionary to track last logged timestamps
last_logged_time = {}

def log_entry(name):
    """ Log recognized person's entry into users_collection with cooldown """
    global last_logged_time
    
    current_time = datetime.datetime.now()
    cooldown_seconds = 10  # Set cooldown time (adjust as needed)

    # Check if person was recently logged
    if name in last_logged_time:
        time_since_last_log = (current_time - last_logged_time[name]).total_seconds()
        if time_since_last_log < cooldown_seconds:
            print(f"⏳ {name} was recently logged. Skipping duplicate entry.")
            return  # Skip logging

    # Update last logged time
    last_logged_time[name] = current_time

    # Insert entry into MongoDB
    entry = {
        "name": name,
        "timestamp": current_time
    }
    users_collection.insert_one(entry)
    
    print(f"✅ {name} logged at {current_time}")


@app.route('/upload-video', methods=['POST'])
def upload_video():
    """ Handle video upload """
    global video_path
    file = request.files['video']
    video_path = f"./uploads/{file.filename}"
    file.save(video_path)
    return {"message": "Video uploaded successfully", "stream_url": "/video-feed"}, 200


@app.route('/video-feed')
def video_feed():
    """ Route for live video streaming """
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/get-count')
def get_count():
    """ API to get the current people count """
    return jsonify({"count": current_count})


if __name__ == '__main__':
    app.run(debug=True)
