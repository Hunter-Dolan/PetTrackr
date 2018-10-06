/*
 * HeaderBox gets our emoji branding everywhere
 * It is just a simple reusable component
 */
import React from "react"

// Define styles
const style = {
    container: {
        marginVertical: 24,
        textAlign: 'center',
    },
}

// Define the class
export default class HeaderBox extends React.Component {
  // 
  // render()
  // The render method for this class
  //
  
  render () {
    return (
      <div style={style.container}>
        <h1>😻 PetTrackr</h1>
        <h3>Real Time Pet Tracking</h3>
      </div>
    );
  }
}
