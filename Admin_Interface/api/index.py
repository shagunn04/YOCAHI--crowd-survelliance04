from flask import Flask, request, jsonify ,  make_response
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, JWTManager
from pymongo import MongoClient
import io
import face_recognition
import base64
import datetime

app = Flask(__name__)
CORS(app, supports_credentials=True,origins="http://localhost:3000")  
bcrypt = Bcrypt(app)

app.config['JWT_SECRET_KEY'] = "abdjdfhsfkdbk"
jwt = JWTManager(app)

# Connect to MongoDB Atlas
client = MongoClient("mongodb+srv://sarimmalik:35YO98aWug5IMOWq@cluster0.r33mf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["face_recognition"]
admin_collection = db["admins"]
faces_collection = db["faces"]
users_collection=db["users"]

if not admin_collection.find_one({"username": "Sarim_Malik01"}):
    admin_collection.insert_one({"username": "admin", "password": bcrypt.generate_password_hash("sarim7863").decode('utf-8')})


@app.route('/admin/check-auth',methods=['GET'])
def checkAuth():
  token=request.cookies.get("Admin_cookie")
  if not token:
      return jsonify({"message":"Unauthorized"}),401
  return jsonify({"message":"Welcome Admin!","token":token})


@app.route('/admin/getStats', methods=['GET'])
def getStats():
    print("📍statistics")

    # Fetch data from MongoDB
    data = list(users_collection.find({}, {"_id": 0, "name": 1, "timestamp": 1}))

    print("📍unsorted data", data)

    # Sort data based on timestamp
    sorted_data = sorted(data, key=lambda x: x["timestamp"])

    print("📍sorted data", sorted_data)

    return jsonify(sorted_data) 

@app.route("/admin/logout",methods=["GET"])
def logout():
  response=make_response(jsonify({"message":"cookie cleared successfully"}))
  response.set_cookie("Admin_cookie",'',expires=0,path='/')
  return response


@app.route('/admin/login', methods=['POST'])
def login():
    """ Admin Login """
    data = request.json
    username = data.get("username")
    password = data.get("password")
    print(username+"  "+password)
    admin = admin_collection.find_one({"username": username})
    print(admin)
    if admin and bcrypt.check_password_hash(admin["password"], password):
         print("✅password checked")
         access_token = create_access_token(identity=username)
         print("📍token created : ",access_token)
        
         response = make_response(jsonify({"message": "Login successful"}), 200)
        
        
         response.set_cookie(
            "Admin_cookie", 
            access_token, 
            httponly=True, 
            samesite="lax", 
        )
        
        
         response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
         response.headers["Access-Control-Allow-Credentials"] = "true"

         return response
    return jsonify({"message": "Invalid credentials"}), 401

def handle_options():
    """Handles CORS preflight requests"""
    response = make_response()
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response, 200

@app.route('/admin/add-face', methods=['POST'])
def add_face():
    """ Upload a new face to MongoDB Atlas """
    data = request.json
    name = data.get("name")
    image_data = data.get("image")
    print("📍Adding face of ")
    print("📍 Name:", name)
    

    if "," in image_data:
     image_data = image_data.split(",")[1] 

    print("📍 Received Image Data (Base64):", image_data[:50], "...")

    if not name or not image_data:
        return jsonify({"message": "Name and image are required"}), 400

    try:
        # Decode Base64 image
        image_bytes = base64.b64decode(image_data)
        
        # Convert to file-like object
        image_file = io.BytesIO(image_bytes)
      
        image = face_recognition.load_image_file(image_file)
        # Encode the face
        encodings = face_recognition.face_encodings(image)
        if not encodings:
            print("❌ No face detected")
            return jsonify({"message": "No face detected"}), 400

        face_encoding = encodings[0].tolist()

        # Save to MongoDB
        faces_collection.insert_one({
            "name": name,
            "encoding": face_encoding,
            "image":image_data,
            "timestamp": datetime.datetime.utcnow()
        })

        return jsonify({"message": f"Face for {name} added successfully"}), 201

    except Exception as e:
        return jsonify({"message": "Error processing image", "error": str(e)}), 500


@app.route('/admin/view-faces', methods=['GET'])
def view_faces():
    """ View all stored faces from MongoDB Atlas """
    print("🔥 Request to view faces")

    faces = list(faces_collection.find({}, {"_id": 0, "name": 1, "image": 1, "encoding": 1, "timestamp": 1}))
    
    for face in faces:
        if face.get("image"):  
            face["image"] = f"data:image/jpeg;base64,{face['image']}"
    return jsonify(faces)  


if __name__ == '__main__':
    app.run(debug=True)
