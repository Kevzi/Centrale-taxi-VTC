import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
import iconStart from 'leaflet/dist/images/marker-icon.png';
import iconEnd from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Custom markers for start and end points
const StartIcon = new L.Icon({
  iconUrl: iconStart,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  className: 'start-marker',
});

const EndIcon = new L.Icon({
  iconUrl: iconEnd,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  className: 'end-marker',
});

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface MapProps {
  pickup: Location | null;
  destination: Location | null;
}

// Component to handle map bounds and route drawing
const MapController: React.FC<{ pickup: Location | null; destination: Location | null }> = ({ 
  pickup, 
  destination 
}) => {
  const map = useMap();

  useEffect(() => {
    if (pickup && destination) {
      // Create bounds to include both markers
      const bounds = L.latLngBounds(
        [pickup.lat, pickup.lng],
        [destination.lat, destination.lng]
      );
      
      // Fit map to bounds with padding
      map.fitBounds(bounds, { padding: [50, 50] });

      // Draw route between points
      fetch(`https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`)
        .then(response => response.json())
        .then(data => {
          // Remove existing route layers
          map.eachLayer((layer) => {
            if (layer instanceof L.GeoJSON) {
              map.removeLayer(layer);
            }
          });

          // Add new route
          if (data.routes?.[0]?.geometry) {
            L.geoJSON(data.routes[0].geometry, {
              style: {
                color: '#3B82F6',
                weight: 4,
                opacity: 0.8,
                dashArray: '10, 10'
              }
            }).addTo(map);
          }
        });
    }
  }, [map, pickup, destination]);

  return null;
};

const Map: React.FC<MapProps> = ({ pickup, destination }) => {
  const center = pickup || { lat: 48.8566, lng: 2.3522 }; // Paris coordinates as default

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {pickup && (
          <Marker position={[pickup.lat, pickup.lng]} icon={StartIcon}>
            <Popup>
              <div className="font-semibold">Point de départ</div>
              {pickup.address && (
                <div className="text-sm text-gray-600 mt-1">{pickup.address}</div>
              )}
            </Popup>
          </Marker>
        )}
        
        {destination && (
          <Marker position={[destination.lat, destination.lng]} icon={EndIcon}>
            <Popup>
              <div className="font-semibold">Destination</div>
              {destination.address && (
                <div className="text-sm text-gray-600 mt-1">{destination.address}</div>
              )}
            </Popup>
          </Marker>
        )}

        <MapController pickup={pickup} destination={destination} />
      </MapContainer>
    </div>
  );
};

export default Map;