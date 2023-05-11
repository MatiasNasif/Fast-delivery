import React, { useState, useEffect } from 'react';
import { useLoadScript, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { Box } from '@mui/material';

const containerStyle = {
  width: '287px',
  height: '212px',
};

const options = {
  disableDefaultUI: true,
  zoomControl: false,
};

const googleMapsApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

const GoogleMaps = ({ destination }: { destination: google.maps.LatLngLiteral }) => {
  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setOrigin({ lat, lng });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocalización no funciona');
    }
  }, []);

  useEffect(() => {
    if (!window.google || !origin) {
      return;
    }

    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error('Geolocalización no funciona');
        }
      }
    );
  }, [isLoaded, origin]);

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          options={options}
          zoom={15}
          center={origin ? origin : { lat: -34.532357, lng: -58.810036 }}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={containerStyle}
        >
          {directions ? <DirectionsRenderer options={{ directions }} /> : <p>Cargando...</p>}
        </GoogleMap>
      ) : (
        <Box width="640px" height="640px" sx={{ backgroundColor: 'primary' }}></Box>
      )}
    </>
  );
};

export default GoogleMaps;
