import MapSelector from "../components/Map/MapSelector";
import { useGlobalLocation } from "../context/LocationContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Advisory = () => {
  const { location } = useGlobalLocation();
  const navigate = useNavigate();

useEffect(() => {
  if (location) {
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000); // 1 second delay
  }
}, [location, navigate]);

  return (
    <div>
     {!location && <h1 className="m-5">Select Your Field</h1>}

      {!location && <MapSelector />}
      {location && <p style={{ padding: "20px" }}>Processing your field... 🌾</p>}
    </div>
  );
};

export default Advisory;