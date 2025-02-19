import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch reports for the teacher's courses
  const fetchReports = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token available");
    axios
      .get("http://localhost:5000/api/courses/courses-by-teacher", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }) // Adjusted endpoint
      .then((response) => {
        setReports(response.data.report);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchReports(); // Fetch reports on component mount
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Attendance Reports
      </h1>

      {/* Search / Filters */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by course"
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
        <Link
          to="/dashboard"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Go Back
        </Link>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          {/* Reports Table */}
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg mb-6">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-6 py-3 text-left">Course Name</th>
                  <th className="px-6 py-3 text-left">Course Code</th>
                  <th className="px-6 py-3 text-left">Total Students</th>
                  <th className="px-6 py-3 text-left">Lecture Date</th>
                  <th className="px-6 py-3 text-left">Present</th>
                  <th className="px-6 py-3 text-left">Absent</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <React.Fragment key={index}>
                    {report.attendanceByDate.map((attendance, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="px-6 py-4">{report.courseName}</td>
                        <td className="px-6 py-4">{report.courseCode}</td>
                        <td className="px-6 py-4">{report.totalStudents}</td>
                        <td className="px-6 py-4">
                          {new Date(
                            attendance.lectureDate
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-green-600">
                          {attendance.presentCount}
                        </td>
                        <td className="px-6 py-4 text-red-600">
                          {attendance.absentCount}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
