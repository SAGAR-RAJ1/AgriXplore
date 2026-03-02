import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useRef } from "react";


//Code hmko v nhi pta tumko v nhi pata bhul jao
// bs kaam kr rha that matters

const MapSelector = ({ onFieldSelect }) => {
  const featureGroupRef = useRef(null);

  const handleCreated = (e) => {
    const layer = e.layer;
    const geoJSON = layer.toGeoJSON();
    
    console.log("Selected Field Coordinates:", geoJSON);

    if (onFieldSelect) {
      onFieldSelect(geoJSON);
    }
  };

  return (
    <MapContainer
      center={[25.4321, 81.8390]} // Default center (you can change)
      zoom={13}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={handleCreated}
          draw={{
            rectangle: true,
            polygon: true,
            circle: false,
            marker: false,
            polyline: false,
            circlemarker: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default MapSelector;