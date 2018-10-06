/*
 * Map renders a Mapbox Map
 */

import React from "react"
import PropTypes from "prop-types"

import ReactMapboxGl, { Marker } from "react-mapbox-gl";

// Set the Mapbox Token
const MapboxToken = "pk.eyJ1IjoiaHVudGVybW9jaGEiLCJhIjoiY2prc2txemRvNDVnODNwbnhrdWJzcWZzdCJ9.twAho6_Q8dmTaX8TUoIHbw";

// Define the Mapbox object
const MapboxMap = ReactMapboxGl({
  accessToken: MapboxToken,
});

// Define the controller
class Map extends React.Component {
  // Set the initial state
  state = {
    markers: []
  };

  //
  // setMap(map: Object)
  // Should only be called when the mapbox object is ready
  // Sets the mapbox object to a class variable and updates the markers
  //
  setMap(map) {
    // If we've already loaded, there is no reason to run again
    if(this.state.mapLoaded === true) {
      return;
    }

    this.map = map;
    this.setState({mapLoaded: true}, () => {
      // Update the markers and fit to bounds
      this.updateMarkers(this.props, true);
    })
  }

  //
  // componentWillRecieveProps(props: Object)
  // Called when the component recieves new props
  //
  componentWillReceiveProps(props) {
    if(this.state.mapLoaded) {
      // If we have recieved new props and the map is loaded
      // reload the markers to reflect the new state
      this.updateMarkers(props);
    }
  }

  //
  // updateMarkers(props: Object, fit: Boolean) 
  // Refreshes the markers. Setting fit to true will
  // zoom the map to fit every single marker
  //

  updateMarkers(props, fit) {
    // Get the pets from the props
    let {pets} = props;
    let coordinates = [];

    // Create a marker for every pet
    let markers = pets.map(({id, latitude, longitude, emoji}) => {
      // Store the coordinates incase we need to fit
      coordinates.push({lat: latitude, lng: longitude});

      return (
        <Marker
          key={"pet_" + id}
          id={"pet_" + id}
          coordinates={[longitude, latitude]}
          anchor="bottom">
          <span>{emoji}</span>
        </Marker>
      )

    })

    console.log(markers, fit, pets)

    // Set the markers in the state
    this.setState({markers})

    // If we are fitting, pass the collected coorindates
    // to the fit method
    if(fit) {
      this.fitCoordinates(coordinates)
    }
  }

  //
  // fitCoordinates(coordinates: Array)
  // fitCoordinates will take a list of coordinates and zoom
  // the map to fit each and every one
  //
  fitCoordinates(coordinates) {

    // Set our base vars
    let maxLat = -180;
    let maxLng = -180;

    let minLat = 180;
    let minLng = 180;

    // Loop through each coordinate and determine if it is a
    // local extreme
    for(var i in coordinates) {
      var {lat, lng} = coordinates[i];

      maxLat = Math.max(maxLat, lat);
      maxLng = Math.max(maxLng, lng);
      
      minLat = Math.min(minLat, lat);
      minLng = Math.min(minLng, lng);
    }

    // Pad the edge of the result so that markes don't run right
    // to the edge of the zoom
    const pad = 0.005;

    // Set the new bounds that we'll send to the map
    let bounds = [
      {lat: maxLat+pad, lng: maxLng+pad}, 
      {lat: minLat-pad, lng: minLng-pad}
    ];

    // Send those bounds to the mapbox object
    this.map.fitBounds(bounds);
  }
  
  //
  // render()
  // The render method for this class
  //
  render() {
    // Determines how far left the map should be positioned
    let {marginLeft} = this.props;

    // These variables are used on first load to position the map
    // but afterwards cause problems
    let center, zoom;
    if(!this.state.mapLoaded) {
      center = [0,0];
      zoom = [1];
    }
  
    // Return the mapbox object with the markers
    return (<MapboxMap
      onStyleLoad={(map) => {this.setMap(map)}}
      style="mapbox://styles/huntermocha/cjksksu8g9j0l2rogjy4yya8c"
      containerStyle={{left: marginLeft}}
      className={"map"}
      center={center}
      zoom={zoom}
      >
        {this.state.markers}
    </MapboxMap>)
  }

}

Map.propTypes = {
  pets: PropTypes.array
};
export default Map
