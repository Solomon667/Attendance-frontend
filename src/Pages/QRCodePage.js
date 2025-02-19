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
useEffect(() => {
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      if (!token) throw new Error("No token available");

      const response = await axios.get(
        "http://localhost:5000/api/courses/teacher",
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
        `http://localhost:5000/api/attendance/create/${courseId}`,
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
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Generate Attendance QR Code
        </h1>

        {/* Error message */}
        {error && (
          <div className="bg-red-500 text-white p-3 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        {/* QR Code Generation Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="courseId"
                className="text-lg font-semibold text-gray-700 mb-2 block"
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
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate QR Code"}
            </button>
          </form>
        </div>

        {/* QR Code Display Section */}
        {qrCode && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Attendance QR Code
            </h2>
            <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
              <img src={qrCode} alt="Attendance QR Code" className="mx-auto" />
            </div>

            {/* Download QR Code Button */}
            <div className="mt-6">
              <a
                href={qrCode}
                download="attendance-qr-code.png"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
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
