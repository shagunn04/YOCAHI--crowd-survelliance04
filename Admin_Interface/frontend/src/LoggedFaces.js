import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const LoggedFaces = () => {
  const [faces, setFaces] = useState(null);
  const [waitingIndex, setIndex] = useState(0);
  const scrollRef = useRef(null);
  const messages = ["Fetching Faces from Database...", "Hold on...", "We are working on it..."];

  useEffect(() => {
    // Interval to cycle through loading messages
    const intervalId = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    // Fetch faces from the server
    const fetchFaces = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/view-faces", {
          withCredentials: true,
        });
        console.log(res.data);
        setFaces(res.data);
      } catch (err) {
        console.error("Failed to fetch faces:", err);
        setFaces([]);
      }
    };
    fetchFaces();

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 380; // Adjusted for smooth scrolling per card
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full p-6">
      {faces === null ? (
        <div className="flex justify-center items-center h-64 flex-col gap-y-6 bg-slate-600 w-80 rounded-2xl mx-auto p-6 shadow-lg">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="font-raleway text-white">{messages[waitingIndex]}</p>
        </div>
      ) : (
        <>
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-4 rounded-full shadow-md hover:bg-gray-600 focus:outline-none z-10"
          >
            <FaChevronLeft size={32} />
          </button>

          {/* Scrollable Container */}
          <div className="overflow-x-auto scrollbar-hide px-16" ref={scrollRef}>
            <div className="flex space-x-12 w-[1200px]">
              {faces.map((face) => (
                <div
                  key={face.name}
                  className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-white transition transform hover:scale-105 min-w-[350px] h-[480px]"
                >
                  <img
                    src={face.image}
                    alt={face.name}
                    className="w-[300px] h-[350px] object-cover rounded-lg border-2 border-gray-500"
                  />
                  <p className="mt-5 text-xl font-semibold">{face.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-4 rounded-full shadow-md hover:bg-gray-600 focus:outline-none z-10"
          >
            <FaChevronRight size={32} />
          </button>
        </>
      )}
    </div>
  );
};

export default LoggedFaces;
