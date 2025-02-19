import React, { useState, useEffect } from "react";
import axios from "axios";

const QRCodePage = () => {
  const [courseId, setCourseId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
    const [courses, setCourses] = useState([]);
    console.log(courses)

  // Fetch courses for the teacher (assuming the teacher is authenticated)
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  
useEffect(() => {
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      if (!token) throw new Error("No token available");

      const response = await axios.get(
        `${API_BASE_URL}/api/courses/teacher`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      console.log(response.data)
      setCourses(response.data); // Populate courses for the teacher
    } catch (err) {
      setError(err.message || "Failed to fetch courses.");
    }
  };
  fetchCourses();
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that a course is selected
    if (!courseId) {
      setError("Please select a course.");
      return;
    }

    setLoading(true);
    setError("");

    try {
        // Send POST request to the backend route for creating the attendance session
           const token = localStorage.getItem("token"); // Retrieve the token from local storage
           if (!token) throw new Error("No token available");
      const response = await axios.post(
        `${API_BASE_URL}/api/attendance/create/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Handle success response
      if (response.status === 201) {
        setQrCode(response.data.qrCode); // Set the returned QR code image
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while creating the session."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-semibold text-gray-800">
          Generate Attendance QR Code
        </h1>

        {/* Error message */}
        {error && (
          <div className="p-3 mb-6 text-white bg-red-500 rounded">
            <p>{error}</p>
          </div>
        )}

        {/* QR Code Generation Form */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="courseId"
                className="block mb-2 text-lg font-semibold text-gray-700"
              >
                Course:
              </label>
              <select
                id="courseId"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              >
                <option value="">Select a Course</option>
                {courses?.map((course) => (
                  <option key={course._id} value={course?._id}>
                    {course?.name} ({course?.code})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate QR Code"}
            </button>
          </form>
        </div>

        {/* QR Code Display Section */}
        {qrCode && (
          <div className="mt-8 text-center">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Your Attendance QR Code
            </h2>
            <div className="p-6 mx-auto bg-white rounded-lg shadow-lg">
              <img src={qrCode} alt="Attendance QR Code" className="mx-auto" />
            </div>

            {/* Download QR Code Button */}
            <div className="mt-6">
              <a
                href={qrCode}
                download="attendance-qr-code.png"
                className="px-6 py-2 text-white transition duration-300 bg-green-600 rounded-lg hover:bg-green-700"
              >
                Download QR Code
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodePage;
