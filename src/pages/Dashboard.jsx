const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-green-700 mb-8">
        Agriculture Dashboard
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-gray-700">Weather</h3>
          <p className="text-2xl mt-2">28°C</p>
          <p className="text-gray-500">Partly Cloudy</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-gray-700">Recommended Crop</h3>
          <p className="text-2xl mt-2">Rice</p>
          <p className="text-gray-500">High yield potential</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-gray-700">Yield Estimate</h3>
          <p className="text-2xl mt-2">4.5 tons/hectare</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;