import { useState } from "react";
import axios from "axios";

const EnterFace = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [enable, setEnable] = useState(true);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
    console.log(name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result);
    console.log("image added ✅");
  };

  const handleAddFace = async () => {
    setEnable(false); // Disable the button while request is being sent
    try {
      console.log("✅ Request for adding face sent");
      await axios.post(
        "http://localhost:5000/admin/add-face",
        { name, image },
        { withCredentials: true }
      );
      alert("Face added successfully!");
    } catch (error) {
      console.error("Failed to add face:", error);
      alert("Failed to add face.");
    } finally {
      setEnable(true); // Re-enable button after request finishes
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20 p-6">
      <div className="bg-gray-800 bg-opacity-30 backdrop-blur-md p-8 rounded-lg shadow-lg w-[400px] border border-gray-600">
        <h3 className="text-2xl font-light text-center mb-6">Add New Face</h3>

        
        <input
          type="text"
          placeholder="Enter Name of Person"
          className="w-full p-3 text-black rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setName(e.target.value)}
        />

        {/* File Upload */}
        <label className="block bg-gray-700 hover:bg-gray-600 text-white font-light py-3 px-4 rounded-lg text-center cursor-pointer mb-4">
          Upload Image of Person
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>

        {/* Upload Button */}
        <button
          onClick={handleAddFace}
          disabled={!enable}
          className={`w-full text-white font-light py-3 rounded-lg transition-all ${
            !enable ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          Encode Face
        </button>
      </div>
    </div>
  );
};

export default EnterFace;
