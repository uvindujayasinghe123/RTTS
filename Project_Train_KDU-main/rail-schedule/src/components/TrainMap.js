import React, { useState, useEffect } from "react";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Polyline,
} from "google-maps-react";
import { Paper } from "@material-ui/core";
import { useLocation } from "react-router-dom";

const TrainMap = (props) => {
  const [selectedPlace, setSelectedPlace] = useState({ name: "asdw" });
  const [loading, setLoading] = useState(true);
  const [polyline, setPolyline] = useState();
  const [train, setTrain] = useState();
  const params = useLocation().state.data;

  useEffect(() => {
    if (loading) {
      const DirectionsService = new props.google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: new props.google.maps.LatLng(params.lat, params.lng),
          destination: params.from + " railway station",
          travelMode: "TRANSIT",
          transitOptions: {
            modes: ["TRAIN"],
          },
        },
        (result, status) => {
          setLoading(false);
          if (status === props.google.maps.DirectionsStatus.OK) {
            console.log(result.routes[0]);
            setPolyline(
              props.google.maps.geometry.encoding.decodePath(
                result.routes[0].overview_polyline
              )
            );
            setTrain(result.routes[0].legs[0]);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [props, polyline, loading, params]);

  return (
    <Paper>
      {train ? (
        <div>
          <h1>Distance: {train.distance.text}</h1>
          <h1>Duration (Estimated): {train.duration.text}</h1>
        </div>
      ) : (
        "Loading"
      )}
      {polyline ? (
        <Map
          google={props.google}
          zoom={14}
          initialCenter={{
            lat: 6.932011,
            lng: 79.865997,
          }}
        >
          <Marker
            name="SOMA"
            position={polyline[0]}
            title="The marker`s title will appear as a tooltip."
          />
          <Polyline
            fillColor="#0000FF"
            fillOpacity={0.35}
            path={polyline}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
          />
        </Map>
      ) : (
        "Loading"
      )}
    </Paper>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBPzui67Qr2WsXCDqfA2XGxaOOu-yDMJfs",
})(TrainMap);
