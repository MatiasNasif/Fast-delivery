import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  DirectionsRenderer,
  DirectionsService,
} from '@react-google-maps/api';

interface LatitudeAndLongitude {
  lat: number;
  lng: number;
}

interface Props {
  destination: string;
}

const containerStyle = {
  width: '287px',
  height: '212px',
};

const options = {
  disableDefaultUI: true,
  zoomControl: false,
};

const GoogleMaps = ({ destination }: Props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBBEGS2JcixdKHGrrkKWUxVn6GoZW13G6E',
  });

  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [origin, setOrigin] = useState<LatitudeAndLongitude | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latLng: LatitudeAndLongitude = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setOrigin(latLng);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const directionsCallback = (res: google.maps.DirectionsResult | null) => {
    if (res !== null) {
      setResponse(res);
    }
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          center={origin || undefined}
          zoom={15}
          mapContainerStyle={containerStyle}
          options={options}
        >
          {origin && <Marker position={origin} />}
          {origin !== null && (
            <DirectionsService
              options={{
                destination,
                origin,
                travelMode: google.maps.TravelMode.DRIVING,
              }}
              callback={directionsCallback}
            />
          )}
          {response !== null && <DirectionsRenderer options={{ directions: response }} />}
        </GoogleMap>
      ) : (
        <p>{loadError?.toString() || 'No se pudo cargar el mapa'}</p>
      )}
    </>
  );
};

export default GoogleMaps;
