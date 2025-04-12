import axios from "axios";
import { useEffect, useState } from "react";
import LineChart from "./LineChart";

function Statistics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/getStats", { withCredentials: true });
        console.log("📍Fetched Data:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("❌ Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <LineChart data={data} />
    </div>
  );
}

export default Statistics;
