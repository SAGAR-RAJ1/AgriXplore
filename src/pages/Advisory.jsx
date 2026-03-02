import MapSelector from "../components/Map/MapSelector";
import { useState } from "react";

const Advisory = () => {
  const [fieldData, setFieldData] = useState(null);

  const handleFieldSelect = (geoJSON) => {
    setFieldData(geoJSON);
  };

  return (
    <div>
      <h1 className="m-5">Select Your Field</h1>

      <MapSelector onFieldSelect={handleFieldSelect} />

      {fieldData && (
        <pre>{JSON.stringify(fieldData, null, 2)}</pre>
      )}
    </div>
  );
};

export default Advisory;