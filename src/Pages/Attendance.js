import React, { useState, useEffect } from "react";
import axios from "axios";

const Attendance = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token available");

        const response = await axios.get(
          "http://localhost:5000/api/courses/teacher",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourses(response.data); // Populate courses for the teacher
      } catch (err) {
        setError(err.message || "Failed to fetch courses.");
      }
    };
    fetchCourses();
  }, []);

  // Step 2: Fetch attendance history based on the selected courseId
  useEffect(() => {
    if (!selectedCourseId) return;

    const fetchAttendanceHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token available");

        const response = await axios.get(
          `http://localhost:5000/api/attendance/teacher/history/${selectedCourseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAttendanceData(response.data); // Populate attendance data
      } catch (err) {
        setError(err.message || "Failed to fetch attendance history.");
      }
    };

    fetchAttendanceHistory();
  }, [selectedCourseId]); // This effect runs when the selectedCourseId changes

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Attendance History
        </h1>

        {/* Error message */}
        {error && (
          <div className="bg-red-500 text-white p-3 mb-6 rounded-md shadow-md">
            <p>{error}</p>
          </div>
        )}

        {/* Course Selection Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <label
            htmlFor="courseSelect"
            className="text-lg font-semibold text-gray-700 mb-2 block"
          >
            Select Course:
          </label>
          <select
            id="courseSelect"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
          >
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name} ({course.code})
              </option>
            ))}
          </select>
        </div>

        {/* Attendance Data Table */}
        {attendanceData.length > 0 ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Student Name</th>
                  <th className="px-6 py-4 text-left">Attendance Status</th>
                  <th className="px-6 py-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((entry, index) => (
                  <tr key={index} className="border-t hover:bg-gray-100">
                    <td className="px-6 py-4">{entry.studentName}</td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        entry.status === "Present"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {entry.status}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(entry.lectureDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-700 py-6">
            No attendance data available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
