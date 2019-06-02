import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow
} from "react-google-maps";
import { compose, withProps, withStateHandlers } from "recompose";

const MapWithPlaces = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key= YOUR-API-KEY,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: "100vh", width: "100%" }} />,
    mapElement: <div style={{ height: "100%" }} />
  }),
  withStateHandlers(
    props => ({
      infoWindows: props.places.map(p => {
        return { isOpen: false };
      })
    }),
    {
      onToggleOpen: ({ infoWindows }) => selectedIndex => ({
        infoWindows: infoWindows.map((iw, i) => {
          iw.isOpen = selectedIndex === i;
          return iw;
        })
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={2} defaultCenter={props.center} addLong={props.long} addLat={props.lat}>
    {props.places && props.long != 17.060816 &&
      props.places.map((place, i) => {
        let lat = parseFloat(place.latitude, 10);
        let lng = parseFloat(place.longitude, 10);

        return (
          <Marker
            id={place.id}
            key={place.id}
            position={{ lat: lat, lng: lng }}
            title="Click to zoom"
            onClick={props.onToggleOpen.bind(this, i)}
          >
            {props.infoWindows[i].isOpen && (
              <InfoWindow onCloseClick={props.onToggleOpen.bind(i)}>
                <div>{place.name}</div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}

      {
          <Marker 
            visible={props.long != 17.060816}
            position={{ lat: props.long, lng: props.lat }}
            title="Click to zoom"
          >
          </Marker>
      }

  </GoogleMap>
));

export default MapWithPlaces;
