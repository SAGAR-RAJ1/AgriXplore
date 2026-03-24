import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useRef } from "react";
import L from "leaflet";
import { useGlobalLocation } from "../../context/LocationContext";

const MapSelector = () => {
  const featureGroupRef = useRef(null);
  const { setLocation } = useGlobalLocation();

  const handleCreated = (e) => {
    const layer = e.layer;

    if (featureGroupRef.current) {
      featureGroupRef.current.clearLayers();
    }

    const geoJSON = layer.toGeoJSON();
    const coordinates = geoJSON.geometry.coordinates[0];

    let latSum = 0;
    let lonSum = 0;

    coordinates.forEach((coord) => {
      lonSum += coord[0];
      latSum += coord[1];
    });

    const centerLon = lonSum / coordinates.length;
    const centerLat = latSum / coordinates.length;

    const latlngs = layer.getLatLngs()[0];
    const area = L.GeometryUtil.geodesicArea(latlngs);
    const areaText = `${area.toFixed(2)} m²`;

    const selectedData = {
      lat: centerLat,
      lon: centerLon,
      area: areaText,
    };

    setLocation(selectedData);
  };

  return (
    <MapContainer
      center={[23.8413, 78.7393]}
      zoom={13}
      style={{ height: "75vh", width: "100%" }}
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
