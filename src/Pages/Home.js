import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-16">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center text-white py-16 px-4"
          style={{
            backgroundImage: `url('/images/hero.png')`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          {/* Content */}
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate__fadeIn">
              Welcome to Benin University Computer Science Attendance Tracker
            </h1>
            <p className="text-lg md:text-xl mb-8 animate__fadeIn animate__delay-1s">
              Manage student attendance efficiently with our QR code solution.
            </p>
            <Link
              to="/register"
              className="bg-white text-purple-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 animate__fadeIn animate__delay-2s"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section
          className="py-16 px-4 relative bg-gray-50 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/features-bg.png')`, // Replace this with a suitable image path
          }}
        >
          <div className="absolute inset-0 bg-white bg-opacity-70"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-12">
              Why Choose Our Attendance System?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white shadow-lg rounded-lg p-6 transition duration-300 animate__fadeIn animate__delay-3s">
                <i className="fas fa-qrcode text-4xl text-purple-600 mb-4"></i>
                <h3 className="text-xl font-semibold mb-4">
                  QR Code Attendance
                </h3>
                <p>Quickly mark attendance with a simple QR code scan.</p>
              </div>
              {/* Feature 2 */}
              <div className="bg-white shadow-lg rounded-lg p-6 transition duration-300 animate__fadeIn animate__delay-4s">
                <i className="fas fa-calendar-check text-4xl text-purple-600 mb-4"></i>
                <h3 className="text-xl font-semibold mb-4">
                  Real-Time Tracking
                </h3>
                <p>
                  Instantly monitor class participation with real-time updates.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-white shadow-lg rounded-lg p-6 transition duration-300 animate__fadeIn animate__delay-5s">
                <i className="fas fa-chart-line text-4xl text-purple-600 mb-4"></i>
                <h3 className="text-xl font-semibold mb-4">
                  Analytics & Reports
                </h3>
                <p>
                  Generate insightful reports to keep track of attendance
                  trends.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-purple-600 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center animate__fadeIn animate__delay-6s">
            <h2 className="text-3xl font-semibold mb-4">
              Ready to Simplify Attendance Tracking?
            </h2>
            <p className="text-lg mb-8">
              Join Benin University’s QR-based system today.
            </p>
            <Link
              to="/register"
              className="bg-white text-purple-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Join Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
