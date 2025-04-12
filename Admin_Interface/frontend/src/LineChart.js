import { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";

const LineChart = ({ data }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ categories: [], counts: [] });
  const [selectedDate,setSelectedDate]=useState([]);
  const [range,setRange]=useState({
    start: data.length > 0 ? data[0].timestamp : null,
    end: data.length > 0 ? data[data.length - 1].timestamp : null
  })
  const [searchedData,setSearchedData]=useState([]);
  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12"
  };
  



  function handleSearch()
  {
    const filteredData=data.filter((entry)=>{
        
        const timeArray=entry.timestamp.split(" ");
       
        const formattedDate=timeArray[3]+"-"+months[timeArray[2]]+"-"+timeArray[1];
        
        return formattedDate===selectedDate
    })
    setSearchedData(filteredData);
    console.log(filteredData)
  }
  useEffect(() => {
    if (data.length === 0) return;



    setRange(()=>({
        start:data[0].timestamp,
        end:data[data.length-1].timestamp
    }))

    const dateCounts = {};
    data.forEach(entry => {
      const date = new Date(entry.timestamp).toISOString().split("T")[0];
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

   
    const xAxisCategories = Object.keys(dateCounts);
    const yAxisCounts = Object.values(dateCounts);

    setChartData({ categories: xAxisCategories, counts: yAxisCounts });
  }, [data]);

  useEffect(() => {
    if (chartData.categories.length > 0 && chartRef.current) {
      
      chartRef.current.innerHTML = ""; 

      const options = {
        chart: {
          type: "line",
          height: 500,
          fontFamily: "Inter, sans-serif",
          dropShadow: { enabled: false },
          toolbar: { show: false },
        },
        tooltip: {
          enabled: true,
          x: { show: false },
        },
        dataLabels: { enabled: false },
        stroke: { width: 6, curve: "smooth" },
        grid: {
          show: true,
          strokeDashArray: 4,
          padding: { left: 2, right: 2, top: -26 },
        },
        series: [
          {
            name: "User Count",
            data: chartData.counts,
            color: "#1A56DB",
          },
        ],
        xaxis: {
          categories: chartData.categories, // X-Axis: Sorted Dates
          labels: {
            show: true,
            style: {
              fontFamily: "Inter, sans-serif",
              cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
            },
          },
          axisBorder: { show: false },
          axisTicks: { show: false },
        },
        yaxis: {
          title: { text: "Number of Entries" },
          labels: {
            style: {
              fontFamily: "Inter, sans-serif",
              cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
            },
          },
        },
      };

      // Render chart inside ref container
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();
    }
  }, [chartData]);

  return (
    <div>
        <div><div ref={chartRef} className="w-full h-80"></div></div>
      
      <div></div>
      <div>
      <div className="flex flex-col items-center justify-start min-h-screen p-6">
  {/* Search Bar Section */}
  <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
    <label htmlFor="selectedDate" className="block text-lg font-semibold text-white-700 mb-2 font-sans">
      Select Date:
    </label>
    <input
      type="date"
      name="selectedDate"
      id="selectedDate"
      onChange={(e) => setSelectedDate(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
    />
    <button 
      onClick={handleSearch} 
      className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
      Search
    </button>
  </div>

  {/* Search Results Section */}

  
  <div className="mt-6 w-full max-w-xlg bg-gray-800 p-4 rounded-lg shadow-3xl min-h-[500px]">
  {searchedData.map((entry, index) => {
    const timeArray = entry.timestamp.split(" ");
    return (
      <div 
        key={index} 
        className="text-white p-3 border-b border-gray-600 flex justify-between items-center"
      >

        <p className="font-light w-1/2">{entry.name}</p>
        <p className="text-sm text-gray-300 w-1/2 text-right">{timeArray[4]}</p>
      </div>
    );
  })}
  
</div>

</div>


      </div>
    </div>
  );
  
};

export default LineChart;
