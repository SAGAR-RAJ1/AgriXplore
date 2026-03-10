import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useRef } from "react";
import L from "leaflet";


//Code hmko v nhi pta tumko v nhi pata bhul jao
// bs kaam kr rha that matters

const MapSelector = ({ onFieldSelect }) => {
  const featureGroupRef = useRef(null);

  // const handleCreated = (e) => {
  //   const layer = e.layer;
  //   const geoJSON = layer.toGeoJSON();
    
  //   console.log("Selected Field Coordinates:", geoJSON);

  //   if (onFieldSelect) {
  //     onFieldSelect(geoJSON);
  //   }
  // };
  const handleCreated = (e) => {
  const layer = e.layer;
  const geoJSON = layer.toGeoJSON();

  const coordinates = geoJSON.geometry.coordinates[0];

  let latSum = 0;
  let lonSum = 0;

  coordinates.forEach(coord => {
    lonSum += coord[0];
    latSum += coord[1];
  });

  const centerLon = lonSum / coordinates.length;
  const centerLat = latSum / coordinates.length;

  // Get polygon latlngs from leaflet layer
  const latlngs = layer.getLatLngs()[0];

  // Calculate geodesic area (in square meters)
  const area = L.GeometryUtil.geodesicArea(latlngs);
  const areaText = `${area.toFixed(2)} m²`;

  console.log("Center:", centerLat, centerLon);
  console.log("Area:", areaText);

  if (onFieldSelect) {
    onFieldSelect({
      "Centre-latitude": centerLat,
      "Centre-longitude": centerLon,
      "Area": areaText
    });
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