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
    advisoryMode,
    setAdvisoryMode,
    sowingDate,
    setSowingDate,
    clearAdvisoryInputs,
  } = useGlobalLocation();
  const navigate = useNavigate();

  const isMonitoring = advisoryMode === "monitoring";
  const canProceed =
    !!crop &&
    !!soil &&
    !!water &&
    !!advisoryMode &&
    (!isMonitoring || !!sowingDate);

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

          <div style={{ marginTop: "10px" }}>
            <label style={{ marginRight: "10px" }}>Advisory Type:</label>
            <label style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name="advisoryMode"
                value="suggest"
                checked={advisoryMode === "suggest"}
                onChange={(e) => {
                  setAdvisoryMode(e.target.value);
                  setSowingDate("");
                }}
              />{" "}
              Suggest
            </label>
            <label>
              <input
                type="radio"
                name="advisoryMode"
                value="monitoring"
                checked={advisoryMode === "monitoring"}
                onChange={(e) => setAdvisoryMode(e.target.value)}
              />{" "}
              Monitoring
            </label>
          </div>

          {isMonitoring && (
            <div style={{ marginTop: "10px" }}>
              <label>Date Sowed:</label>
              <input
                type="date"
                value={sowingDate}
                onChange={(e) => setSowingDate(e.target.value)}
              />
            </div>
          )}

          <button
            style={{
              marginTop: "20px",
              padding: "10px 15px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard")}
            disabled={!canProceed}
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