import { getWeather } from "../services/weatherService";
import { useState, useEffect } from "react";
import { useGlobalLocation } from "../context/LocationContext";

function Dashboard() {
  const [weather, setWeather] = useState(null);
  const { location, crop, soil, water,advisoryMode ,sowingDate} = useGlobalLocation();

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) return;

      const weatherData = await getWeather(location.lat, location.lon);
      setWeather(weatherData);
    };

    fetchWeather();
  }, [location]);

  const getRecommendation = () => {
    if (!location || !crop || !weather) return null;

    // Calculate days since sowing (only if monitoring and date exists)
    let days = null;
    let stage = "N/A";

    if (advisoryMode === "monitoring" && sowingDate) {
      const sowDate = new Date(sowingDate);
      const today = new Date();
      days = Math.floor((today - sowDate) / (1000 * 60 * 60 * 24));

      // Simple stage mapping (can be improved per crop)
      if (days < 20) stage = "Germination 🌱";
      else if (days < 60) stage = "Vegetative 🌿";
      else if (days < 100) stage = "Flowering 🌼";
      else stage = "Mature/Harvest 🌾";
    }

    const advice = [];
    const analysis = [];

    // Weather analysis
    if (weather.temp > 35) analysis.push("High temperature → Heat stress risk ⚠️");
    else if (weather.temp >= 20 && weather.temp <= 32)
      analysis.push("Temperature is suitable for crop growth ✅");

    if (weather.humidity < 40) analysis.push("Low humidity → Water stress risk ⚠️");
    else if (weather.humidity > 70) analysis.push("High humidity → Disease risk ⚠️");

    // Crop-specific logic
    if (crop === "Rice") {
      if (weather.humidity < 40) {
        advice.push("Increase irrigation / maintain standing water in field");
      }
      if (stage.includes("Vegetative")) {
        advice.push("Apply nitrogen fertilizer (urea)");
      }
    }

    if (crop === "Wheat") {
      if (weather.temp > 30) {
        advice.push("High temperature may affect wheat yield");
      }
      if (stage.includes("Vegetative")) {
        advice.push("Apply urea fertilizer for better growth");
      }
    }

    return { days, stage, advice, analysis };
  };

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
          <h3 style={{ marginTop: "16px" }}>Selected Advisory Inputs</h3>
          <p>Crop: {crop || "Not selected"}</p>
          <p>Soil Type: {soil || "Not selected"}</p>
          <p>Water Availability: {water || "Not selected"}</p>
          <p>Advisory Mode: {advisoryMode || "Not selected"}</p>
          <p>Sowing Date: {sowingDate || "Not Applicable"}</p>

          <h3 style={{ marginTop: "16px" }}>Current Weather</h3>
          <p>Temperature: {weather.temp} °C</p>
          <p>Humidity: {weather.humidity} %</p>
          <p>Wind Speed: {weather.windSpeed} m/s</p>
          <p>Condition: {weather.condition}</p>
          <p>
            Location: {weather.city}, {weather.country}
          </p>

          {getRecommendation() && (
            <div style={{ marginTop: "20px" }}>
              <h3>Crop Analysis & Recommendation</h3>

              <p>Stage: {getRecommendation().stage}</p>
              {getRecommendation().days !== null && (
                <p>Days since sowing: {getRecommendation().days}</p>
              )}

              <h4>Weather Impact</h4>
              {getRecommendation().analysis.map((item, idx) => (
                <p key={idx}>- {item}</p>
              ))}

              <h4>Recommended Actions</h4>
              {getRecommendation().advice.length > 0 ? (
                getRecommendation().advice.map((item, idx) => (
                  <p key={idx}>- {item}</p>
                ))
              ) : (
                <p>No specific action needed.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;