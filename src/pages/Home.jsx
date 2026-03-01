import React from "react";
import "../css/Home.css";
const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative home">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-6">
        <h1 className="text-5xl font-bold mb-6">
          Smart Agriculture Intelligence
        </h1>

        <p className="max-w-2xl text-lg mb-8 text-gray-200">
          Get crop recommendations, weather insights and yield predictions
          powered by data and AI.
        </p>

        <div className="flex gap-4">
          <a
            href="/advisory"
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium"
          >
            Get Advisory
          </a>

          <a
            href="/dashboard"
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
          >
            View Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;