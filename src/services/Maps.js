import React, { useState } from "react";
import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api";

function Maps({ zoom, destination, origin }) {
  var markers = [];
  const [direction, setDirection] = useState(null);
  const directionsService = new window.google.maps.DirectionsService();
  console.log(destination, origin);

  // if (props.value.length > 0) {
  //   markers = props.value.map((x, i) => {
  //     return {
  //       id: i,
  //       name: x.username,
  //       position: {
  //         lat: x.address?.latitude || -32.7509684,
  //         lng: x.address?.longitude || 145.5622894,
  //       },
  //     };
  //   });
  // }

  const changeDirection = (origin, destination) => {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          //changing the state of directions to the result of direction service
          setDirection(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  const handleOnLoad = (map) => {
    changeDirection(origin, destination);
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(destination);
    bounds.extend(origin);
    markers.push({ id: 1, name: "Lahore", position: origin });
    markers.push({ id: 2, name: "Mianwali", position: destination });
    map.fitBounds(bounds);
  };

  return (
    <GoogleMap
      onLoad={handleOnLoad}
      zoom={4}
      // onClick={() => setActiveMarker(null)}
      mapContainerStyle={
        zoom
          ? { width: "200", height: "560px" }
          : { width: "100", height: "200px" }
      }
    >
      {direction !== null && <DirectionsRenderer directions={direction} />}
    </GoogleMap>
  );
}

export default Maps;
