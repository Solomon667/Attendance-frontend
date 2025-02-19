import React, { useState, useEffect } from "react";
import axios from "axios";

const SettingsPage = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token available");
        const response = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUser(response.data);
      } catch (err) {
        setError("Failed to load user profile.");
      }
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token available");

      const response = await axios.put(
        "http://localhost:5000/api/auth/profile",
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

        {error && (
          <div className="bg-red-500 text-white p-3 mb-6 rounded">{error}</div>
        )}
        {success && (
          <div className="bg-green-500 text-white p-3 mb-6 rounded">
            Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="w-full p-3 border rounded-lg"
              value={user.firstName || ""}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="w-full p-3 border rounded-lg"
              value={user.lastName || ""}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full p-3 border rounded-lg"
              value={user.email || ""}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="uniqueId"
              className="block text-sm font-medium text-gray-700"
            >
              Unique ID
            </label>
            <input
              id="uniqueId"
              name="uniqueId"
              type="text"
              className="w-full p-3 border rounded-lg"
              value={user.uniqueId || ""}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <input
              id="department"
              name="department"
              type="text"
              className="w-full p-3 border rounded-lg"
              value={user.department?.name || ""}
              onChange={handleInputChange}
              disabled
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
