import React, { useState, useEffect, useMemo } from 'react';
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
  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [origin, setOrigin] = useState<LatitudeAndLongitude | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

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
      console.error('Geolocalización no funciona');
    }
  }, [setOrigin]);

  const directionsCallback = (result: google.maps.DirectionsResult | null) => {
    if (result !== null) {
      setResponse(result);
    }
  };

  const memoizedMap = useMemo(() => {
    return (
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
    );
  }, [destination, origin, response]);

  return (
    <>{isLoaded ? memoizedMap : <p>{loadError?.toString() || 'No se pudo cargar el mapa'}</p>}</>
  );
};

export default GoogleMaps;
