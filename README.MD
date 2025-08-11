# 📍 YOCAHI: AI-Powered Crowd Monitoring & Facial Recognition System

## 📌 YOCAHI System Design Flow

[Client-Side](https://jmp.sh/DKMan5rz)

[Admin-Side](https://jmp.sh/xistxURm)

## 📌 Demonstration Video 
[Demonstration Video with Complete Working Project](https://drive.google.com/file/d/1CxwUkfZn7jl81dY7S79m5Obxm3GG-qH5/view?usp=drive_link)


## Overview 💡

*YOCAHI* is an AI-driven surveillance and crowd-monitoring system that leverages computer vision to detect and track individuals in real time. Designed to ensure safety, prevent stampedes, enhance security, and support strategic decision-making, the system uses live camera feeds or video uploads to accurately count people and verify identities through facial recognition.

---

## Key Features 🛠️

- **Crowd Detection & Live Headcount**  
  Real-time person detection with high accuracy using YOLOv8, even under occlusions or varying illumination.👥

- **Facial Recognition & Logging**  
  Face embeddings are generated and matched using a vector space stored in MongoDB for identity verification.👤

- **Admin Dashboard**  
  A secure dashboard to add new faces, view logs, and analyze visitor statistics over time.📊

- **Client Interface**  
  An intuitive frontend where users can upload videos and monitor live detections frame-by-frame.📹

---

## Tech Stack 🧰

| Component        | Technology Used                  |
|------------------|----------------------------------|
| Model Training   | YOLOv8 (Ultralytics), Google Colab |
| Backend          | Flask, HTTP Live Streaming (HLS) |
| Frontend         | HTML/CSS, JS , React , Tailwind |
| Database         | MongoDB                          |
| Authentication   | JWT Tokens                       |
| Deployment       | Localhost / Cloud-compatible  
DataSet            | Kaggle

---

## System Workflow 🔄

### 1. Model Training 📚
- Custom dataset from Kaggle with *12,800+ images* including occluded faces, non-human objects, and varied lighting.
- Trained YOLOv8 on this dataset using *Google Colab with CUDA GPU acceleration*.
- Optimized for bounding box accuracy, object confidence score, and robustness.

### Results of model testing 📸
![Images of the model test result](/readmeImages/val_batch2_pred.jpg)

### Accuracy Metric 📊
![Images of Accuracy metric](/readmeImages/Screenshot%202025-04-12%20193833.png)

[Visualisation of the Neural Network of the model](https://lavender-michelle-67.tiiny.site/png/web_database_yolov8n-onnx)



### 2. Client-Side Flow 🎬
- User accesses the web interface and uploads a video.
- Video frames are streamed to the Flask server using *HTTP Live Streaming (HLS)*.
- Server detects individuals and performs face recognition.
- Live headcount is updated on the client interface.

### 3. Server-Side Flow ⚙️
- Faces are extracted from each frame and vectorized via facial embeddings.
- Embeddings are compared with the MongoDB face collection.
- If a match is found, the entry is logged in the database.

### 4. Admin Dashboard 🖥️
- Admin logs in via a secure JWT-authenticated route.
- Can:
  - Upload new faces for recognition.
  - View statistics (date-wise, person-wise).
  - Check already logged-in individuals.

---

## Purpose & Impact 🌍

> *YOCAHI* was built with the mission of leveraging AI for crowd safety. In scenarios such as religious gatherings, large-scale events, or campus environments, monitoring real-time footfall is critical. This system helps:
- Prevent overcrowding and stampedes.  🚶‍♂️🚶‍♀️
- Improve emergency response. 🚑
- Support planning and resource management.📅
- Enhance overall site security and surveillance. 🛡️

---

## Dependencies 📦

If using different tech stacks, ensure the following are covered:

- **Detection**: YOLOv8, custom-trained on a Kaggle dataset of 12,800 images
- **Embedding**: Facial embeddings (FaceNet / Dlib / DeepFace or custom embedding method) 👤
- **Streaming**: HTTP Live Streaming (HLS)🎥
- **Backend**: Flask with Flask dependencies +JWT 🔐
- **Database**: MongoDB 🗄️

---
## Setup Instructions 🛠️

```bash
# Clone the repo
git clone https://github.com/your-username/YOCAHI.git
cd YOCAHI
```

Before running the application, it is highly recommended to set up a Python virtual environment to avoid package conflicts:

# Create a virtual environment  💻
```bash
python -m venv .venv
```

# Activate it ⚙️
# On Windows:
```bash
.venv\Scripts\activate
```
# On Unix or MacOS:
```bash
source .venv/bin/activate
```

# Upgrade pip 🔄
```bash
pip install --upgrade pip
```

# Install all required packages 📦
```bash
pip install -r requirements.txt
```

To deactivate the environment later:
```bash
deactivate
```

# For Admin-Interface/  🖥️
#### Start the Flask server (backend)
/api
```bash
python index.py
```
### Run the react dev server(frontend)
/frontend
```bash
npx create-react-app frontend
npm start
```
# Access Admin Panel
http://localhost:5000/admin

# For Client/ 🎥
### Start the Flask server (backend)
/backend
```bash
python server.py
```
### Run the react dev server(frontend)
/frontend
```bash
npx create-react-app frontend
npm start
```


# Access Admin Panel
http://localhost:5000/admin
# Access Client Interface
http://localhost:3000


## Folder Structure 📂
```bash
YOCAHI/
│
├── .venv/                # Python virtual environment
├── .vscode/              # VS Code config
├── Admin_Interface/
│   ├── api/              # Flask backend
│   └── frontend/         # React dashboard
│
├── Client/
│   ├── backend/          # Flask video processing
│   └── frontend/         # Client video uploader
│
├── database/             # kaggle dataset and training and validation images
├── kaggleapi/            # Dataset fetcher
├── test/                 # Testing scripts and mock videos
├── main.py               # Entry script
└── README.md             # Project documentation
```



