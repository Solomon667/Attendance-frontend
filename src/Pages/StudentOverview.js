import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentOverview = () => {
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
//   const [totalLate, setTotalLate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("studentToken");
        if (!token) throw new Error("No token available");

        const attendanceResponse = await axios.get(
          "http://localhost:5000/api/attendance/attendance-summary/student",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
          );
          console.log(attendanceResponse.data);

        setTotalClasses(attendanceResponse.data.totalClasses);
        setTotalPresent(attendanceResponse.data.totalPresent);
        setTotalAbsent(attendanceResponse.data.totalAbsent);
    
      } catch (error) {
        console.error("Error fetching student dashboard data", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ["Total Present", "Total Absent", "Total Late"],
    datasets: [
      {
        label: "Attendance Summary",
        data: [totalPresent, totalAbsent],
        backgroundColor: ["#4CAF50", "#FF5252", "#FF9800"],
        borderColor: ["#388E3C", "#D32F2F", "#F57C00"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-semibold text-gray-800">
          Your Attendance Overview
        </h1>
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Total Attendance */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Total Attendance
            </h2>
            <p className="text-2xl font-bold text-purple-600">{totalClasses}</p>
          </div>

          {/* Total Present */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Total Present
            </h2>
            <p className="text-2xl font-bold text-green-600">{totalPresent}</p>
          </div>

          {/* Total Absent */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Total Absent
            </h2>
            <p className="text-2xl font-bold text-red-600">{totalAbsent}</p>
          </div>

          {/* Total Late */}
         
        </div>

        {/* Chart Section */}
        <div className="p-6 mt-5 bg-white rounded-lg shadomax-w-md">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Attendance Trends
          </h2>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentOverview;
