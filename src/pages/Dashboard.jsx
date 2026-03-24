import { getForecast } from "../services/weatherService";
import { useState, useEffect } from "react";
import { useGlobalLocation } from "../context/LocationContext";

function Dashboard() {
  const [forecast, setForecast] = useState([]);
  const { location, crop, soil, water,advisoryMode ,sowingDate} = useGlobalLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (!location) return;

      const forecastData = await getForecast(location.lat, location.lon);

      setForecast(forecastData);
    };

    fetchData();
  }, [location]);

  const getRecommendation = () => {
    if (!location || !crop || forecast.length === 0) return null;

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

    // Forecast-based trend
    let avgTempForecast = null;
    if (forecast.length > 0) {
      avgTempForecast =
        forecast.reduce((sum, d) => sum + d.avgTemp, 0) / forecast.length;
    }

    // Forecast-based humidity trend
    let avgHumidityForecast = null;
    if (forecast.length > 0) {
      avgHumidityForecast =
        forecast.reduce((sum, d) => sum + d.avgHumidity, 0) / forecast.length;
    }

    // Weather analysis
    if (avgTempForecast && avgTempForecast > 35) {
      analysis.push("High temperature trend (next days) → Heat stress risk ⚠️");
    } else if (avgTempForecast >= 20 && avgTempForecast <= 32) {
      analysis.push("Temperature is suitable for crop growth ✅");
    }

    if (avgHumidityForecast && avgHumidityForecast < 40) {
      analysis.push("Low humidity trend (next days) → Water stress risk ⚠️");
    } else if (avgHumidityForecast && avgHumidityForecast > 70) {
      analysis.push("High humidity trend (next days) → Disease risk ⚠️");
    }

    // Crop-specific logic
    if (crop === "Rice") {
      if (avgTempForecast > 35 && avgHumidityForecast < 40) {
        advice.push("High heat + low humidity → urgent irrigation required 🚨");
      } else if (avgHumidityForecast < 40) {
        advice.push("Increase irrigation / maintain standing water in field");
      }

      if (stage.includes("Vegetative")) {
        advice.push("Apply nitrogen fertilizer (urea)");
      }
    }

    if (crop === "Wheat") {
      if (avgTempForecast > 30 && avgHumidityForecast < 40) {
        advice.push("High heat + dry conditions → risk to wheat yield ⚠️");
      } else if (avgTempForecast > 30) {
        advice.push("High temperature trend may affect wheat yield");
      }

      if (stage.includes("Vegetative")) {
        advice.push("Apply urea fertilizer for better growth");
      }
    }

    return { days, stage, advice, analysis };
  };

  const rec = getRecommendation();

  return (
    <div>
      {!location && (
        <p style={{ padding: "20px" }}>
          Please select a field from Advisory page.
        </p>
      )}

      {forecast.length > 0 && (
        <div style={{ padding: "20px" }}>
          <h2>Weather Information</h2>
          <h3 style={{ marginTop: "16px" }}>Selected Advisory Inputs</h3>
          <p>Crop: {crop || "Not selected"}</p>
          <p>Soil Type: {soil || "Not selected"}</p>
          <p>Water Availability: {water || "Not selected"}</p>
          <p>Advisory Mode: {advisoryMode || "Not selected"}</p>
          <p>Sowing Date: {sowingDate || "Not Applicable"}</p>

          <h3 style={{ marginTop: "16px" }}>Average Forecast (Used as Current)</h3>
          <p>
            Temperature:{" "}
            {(forecast.reduce((sum, d) => sum + d.avgTemp, 0) / forecast.length).toFixed(1)} °C
          </p>
          <p>
            Humidity:{" "}
            {(forecast.reduce((sum, d) => sum + d.avgHumidity, 0) / forecast.length).toFixed(1)} %
          </p>

          <h3 style={{ marginTop: "16px" }}>Upcoming Temperature Trend</h3>
          {forecast.slice(0, 5).map((d, i) => (
            <p key={i}>{d.date}: {d.avgTemp.toFixed(1)} °C</p>
          ))}

          {rec && (
            <div style={{ marginTop: "20px" }}>
              <h3>Crop Analysis & Recommendation</h3>

              <p>Stage: {rec.stage}</p>
              {rec.days !== null && (
                <p>Days since sowing: {rec.days}</p>
              )}

              <h4>Weather Impact</h4>
              {rec.analysis.map((item, idx) => (
                <p key={idx}>- {item}</p>
              ))}

              <h4>Recommended Actions</h4>
              {rec.advice.length > 0 ? (
                rec.advice.map((item, idx) => (
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