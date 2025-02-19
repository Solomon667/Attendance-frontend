import React, { useState, useEffect } from "react";
import axios from "axios";

const ErrorBanner = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="fixed z-50 px-4 py-2 text-white transform -translate-x-1/2 bg-red-500 rounded shadow-lg top-4 left-1/2">
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          className="px-2 py-1 ml-4 text-white bg-red-700 rounded hover:bg-red-800"
          onClick={onDismiss}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all courses for the student
  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("studentToken");
      if (!token) {
        setError("No student token available.");
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/courses/student",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCourses(response.data.courses);
      } catch (err) {
        setError("Failed to fetch courses. Please try again.");
        console.error("Error fetching courses:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="relative min-h-screen p-4 bg-gray-100">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-16 h-16 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      )}

      {/* Error Banner */}
      <ErrorBanner message={error} onDismiss={() => setError("")} />

      <h1 className="mb-6 text-2xl font-bold text-gray-800">My Courses</h1>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.length === 0 ? (
          <div className="text-xl text-center text-gray-600 col-span-full">
            No courses found.
          </div>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className="p-6 transition-all bg-white rounded-lg shadow-xl cursor-pointer hover:shadow-2xl hover:bg-purple-50"
            >
              <h2 className="mb-3 text-xl font-semibold text-purple-600">
                {course.name}
              </h2>
              <p className="text-gray-700">Course Code: {course.code}</p>
              <p className="text-gray-600">
                Scheduled Days: {course.schedule.map((s) => s.day).join(", ")}
              </p>
              <button
                className="px-6 py-2 mt-4 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                onClick={() => alert(`Viewing details for ${course.name}`)}
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentCourses;
