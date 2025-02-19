import React, { useState, useEffect } from "react";
import axios from "axios";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
          const token = localStorage.getItem("token"); // Retrieve the token from local storage
          if (!token) throw new Error("No token available");
        const response = await axios.get(
          "http://localhost:5000/api/courses/teacher",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCourses(response.data);
      } catch (err) {
        setError("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Courses</h1>
        {loading ? (
          <div className="flex justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500 text-white p-4 rounded-lg">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white shadow-lg rounded-lg p-5 hover:shadow-2xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-700">
                  {course.name}
                </h2>
                <p className="text-gray-600">Code: {course.code}</p>
                <p className="text-gray-500 mt-2">
                  Classes:
                  <ul className="list-disc ml-5 mt-1">
                    {course.schedule.map((classItem) => (
                      <li key={classItem._id}>
                        {classItem.day}: {classItem.startTime} -{" "}
                        {classItem.endTime}
                      </li>
                    ))}
                  </ul>
                </p>
                <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300">
                  Manage Course
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
