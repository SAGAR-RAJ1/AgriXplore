import MapSelector from "../components/Map/MapSelector";
import { useGlobalLocation } from "../context/LocationContext";
import { useNavigate } from "react-router-dom";

const Advisory = () => {
  const {
    location,
    setLocation,
    crop,
    setCrop,
    soil,
    setSoil,
    water,
    setWater,
    clearAdvisoryInputs,
  } = useGlobalLocation();
  const navigate = useNavigate();

  return (
    <div>
      {!location && <h1 className="m-5">Select Your Field</h1>}

      {!location && <MapSelector />}

      {location && (
        <div style={{ padding: "20px" }}>
          <h3>Field Selected ✅</h3>

          <div style={{ marginTop: "15px" }}>
            <label>Crop:</label>
            <select value={crop} onChange={(e) => setCrop(e.target.value)}>
              <option value="">Select</option>
              <option>Rice</option>
              <option>Wheat</option>
              <option>Maize</option>
            </select>
          </div>

          <div style={{ marginTop: "10px" }}>
            <label>Soil Type:</label>
            <select value={soil} onChange={(e) => setSoil(e.target.value)}>
              <option value="">Select</option>
              <option>Clay</option>
              <option>Sandy</option>
              <option>Loamy</option>
            </select>
          </div>

          <div style={{ marginTop: "10px" }}>
            <label>Water Availability:</label>
            <select value={water} onChange={(e) => setWater(e.target.value)}>
              <option value="">Select</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <button
            style={{
              marginTop: "20px",
              padding: "10px 15px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard")}
            disabled={!crop || !soil || !water}
          >
            Get Advisory
          </button>

          <button
            onClick={() => {
              setLocation(null);
              clearAdvisoryInputs();
            }}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              cursor: "pointer",
              border: "black 1px solid",
            }}
          >
            Change Location
          </button>
        </div>
      )}
    </div>
  );
};

export default Advisory;