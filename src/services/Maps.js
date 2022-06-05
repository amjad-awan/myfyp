import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

function MapsComponent({ position }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB7R4wPyILvLMpGIN8zOCAA52oSPpLdLWQ",
  });

  console.log(position);

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(position);
    // map.fitBounds(bounds);
    setMap(map);
    map.setZoom(14);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={position}></Marker>
        <></>
      </GoogleMap>
    )
  );
}

export default React.memo(MapsComponent);
