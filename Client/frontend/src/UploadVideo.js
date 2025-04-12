import React, { useState, useEffect } from "react";
import "./css/upload.css";

function UploadVideo() {
  const [video, setVideo] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [streamUrl, setStreamUrl] = useState(null); // Stream URL state
  const [error, setError] = useState(null);
  const [peopleCount, setPeopleCount] = useState(0); // State for count

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video) {
      alert("Please select a video file");
      return;
    }

    setProcessing(true);
    const formData = new FormData();
    formData.append("video", video);

    try {
      const response = await fetch("http://localhost:5000/upload-video", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert("Video uploaded! Live processing will start.");
        setStreamUrl("http://localhost:5000/video-feed"); // Set stream URL
      } else {
        throw new Error("Video upload failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  // Fetch the real-time people count every second
  useEffect(() => {
    if (streamUrl) {
      const interval = setInterval(async () => {
        try {
          const response = await fetch("http://localhost:5000/get-count");
          if (response.ok) {
            const data = await response.json();
            setPeopleCount(data.count);
          }
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      }, 1000); // Fetch every second

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [streamUrl]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button type="submit" disabled={processing}>Upload & Start Live Stream</button>
      </form>

      {processing && <p>Processing video in real-time...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {streamUrl && (
        <div className="Stream-video">
          <h2>Live Processed Video</h2>
          <img src={streamUrl} alt="Live Stream" width="600" />
          <h3>People Count: {peopleCount}</h3> {/* Display count */}
        </div>
      )}
    </div>
  );
}

export default UploadVideo;
