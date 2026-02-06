import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = () => {
  return (
    <MapContainer 
      center={[14.4426, 79.9865]}     // Nellore Coordinates
      zoom={13}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "400px", borderRadius: "15px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[14.4426, 79.9865]}>
        <Popup>Nellore City</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
