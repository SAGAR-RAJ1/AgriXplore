import MapSelector from "../components/Map/MapSelector";
import { useGlobalLocation } from "../context/LocationContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Advisory = () => {
  const { location, setLocation } = useGlobalLocation();
  const navigate = useNavigate();

useEffect(() => {
  let timer;

  if (location) {
    timer = setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  }

  return () => {
    if (timer) clearTimeout(timer);
  };
}, [location, navigate]);

  return (
    <div>
      {!location && <h1 className="m-5">Select Your Field</h1>}

      {!location && <MapSelector />}

      {location && (
        <div style={{ padding: "20px" }}>
          <p>Processing your field... 🌾</p>
          <button
            onClick={() => {
              setLocation(null);
              navigate("/advisory");
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