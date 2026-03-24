import { getWeather } from "../services/weatherService";
import { useState, useEffect } from "react";
import { useGlobalLocation } from "../context/LocationContext";

function Dashboard() {
  const [weather, setWeather] = useState(null);
  const { location } = useGlobalLocation();

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) return;

      const weatherData = await getWeather(location.lat, location.lon);
      setWeather(weatherData);
    };

    fetchWeather();
  }, [location]);

  return (
    <div>
      {!location && (
        <p style={{ padding: "20px" }}>
          Please select a field from Advisory page.
        </p>
      )}

      {weather && (
        <div style={{ padding: "20px" }}>
          <h2>Weather Information</h2>
          <p>Temperature: {weather.temp} °C</p>
          <p>Humidity: {weather.humidity} %</p>
          <p>Wind Speed: {weather.windSpeed} m/s</p>
          <p>Condition: {weather.condition}</p>
          <p>
            Location: {weather.city}, {weather.country}
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;