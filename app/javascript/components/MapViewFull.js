/*
 * MapViewFull is a composite component that renders both 
 * the Map and the SideBar components. It also includes the
 * refresh loop to auto update the pets
 */
import React from "react"
import PropTypes from "prop-types"

import Map from './Map';

import SideBar from "./SideBar";

// Define the style
const style = {
  container: {
    flex: 1,
  }
}

// Define constants
const sidebarWidth = 250;
const refreshInterval = 5 * 1000; // seconds

// Define Controller
class MapViewFull extends React.Component {
  constructor(props) {
    super(props);

    let {pets} = props;
    // Right away set the pets and filteredPets state objects
    this.state = {pets, filteredPets: pets}
  }
  
  //
  // componentDidMount()
  // Called after the component has mounted
  //
  componentDidMount() {
    // Start the refresh loop after the component has mounted
    this.startRefreshLoop();
  }

  //
  // componentWillUnmount()
  // Called right before the component unmounts
  //
  componentWillUnmount() {
    // Stop the refresh loop so it's not running after the component
    // unmounts
    this.endRefreshLoop();
  }

  //
  // startRefreshLoop()
  // Starts the marker refresh loop
  //
  startRefreshLoop() {
    // Clear the previous timeout (if any)
    clearTimeout(this.refreshTimeout);

    // Set a new timeout that will refresh the pets and start a new timeout
    // at the designated refresh interval
    this.refreshTimeout = setTimeout(()=> {
      this.refreshPets();
      this.startRefreshLoop();
    }, refreshInterval)
  }

  //
  // endRefreshLoop()
  // Cancels the timeout of the next refresh, killing the loop
  //
  endRefreshLoop() {
    clearTimeout(this.refreshTimeout);
  }

  //
  // refreshPets()
  // An async method that polls the latest pet info from the server
  //
  async refreshPets() {
    let petsObj = await fetch("/pets.json");
    let pets = await petsObj.json();
    this.setPets(pets);
  }

  //
  // setPets(pets: Array)
  // Set pets is an access method to filter and set pets to the state
  //
  setPets(pets) {
    let filteredPets = this.filterPets(pets);
    this.setState({pets, filteredPets})
  }

  //
  // setFilter(filter: Object)
  // Set filter sets a new filter object and refilters the 
  // pets / updates markers
  //
  setFilter(filter) {
    this.setState({filter}, ()=>{
      console.log("Set filter", filter)
      let filteredPets = this.filterPets(this.state.pets);
      this.setState({filteredPets})
    });
  }

  //
  // filterPets(pets: Array)
  // Filters pets to make sure they meet the filter conditions
  //
  filterPets(pets) {
    let {filter} = this.state;
    
    // If there is no filter, return all of the pets
    if(filter === undefined) {
      return pets;
    }

    // If there is a type filter, ensure the pet type matches the filter
    if(filter.types !== undefined) {
      pets = pets.filter((pet) => {
        return filter.types.indexOf(pet.pet_type) !== -1
      })
    }

    // Return the filtered pets
    return pets;
  }

  // 
  // render()
  // The base render method for this class
  //
  render () {
    // Get our variables out of the state and props vars
    let {filteredPets} = this.state;
    let {path_to_login, path_to_register, path_to_logout, path_to_add_pet, path_to_edit_account, current_user} = this.props;

    return (
      <div style={style.container}>
        <Map marginLeft={sidebarWidth} pets={filteredPets} />
        <SideBar 
          width={sidebarWidth} 
          pets={filteredPets}
          pathToLogin={path_to_login}
          pathToRegister={path_to_register}
          pathToLogout={path_to_logout}
          pathToAddPet={path_to_add_pet}
          pathToEditAccount={path_to_edit_account}
          currentUser={current_user}
          onFilterSet={(filter)=>{this.setFilter(filter)}} />
      </div>
    );
  }
}

MapViewFull.propTypes = {
  pets: PropTypes.array,
  path_to_login: PropTypes.string,
  path_to_register: PropTypes.string,
  path_to_logout: PropTypes.string,
  path_to_add_pet: PropTypes.string,
  current_user: PropTypes.any,
};
export default MapViewFull
