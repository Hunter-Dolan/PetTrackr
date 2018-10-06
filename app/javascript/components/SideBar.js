/*
 *  SideBar
 *  Sidebar renders the sidebar on the MapViewFull component
 */

import React from "react"
import PropTypes from "prop-types"

import HeaderBox from './HeaderBox';
import FilterBar from './FilterBar';

// Define the styles
const style = {
  sidebar: {
    margin: 8,
  }
}

// Define the class
class SideBar extends React.Component {
  //
  // renderPet(pet: Object)
  // Renders a given pet for the sidebar
  //
  renderPet({id, emoji, name}) {
    return (<div id={"pet_list_pet" + id} key={"pet_list_pet" + id}>
      <span>{emoji} {name}</span>
    </div>)
  }

  //
  // renderUserControls()
  // Renders the bottom links for users to login, logout, edit account, and more
  //
  renderUserControls() {
    // Get our base vars
    let {currentUser, pathToLogin, pathToRegister, pathToEditAccount, pathToLogout, pathToAddPet} = this.props;
    
    // If the user is not logged in, give them the option to login and register
    if(currentUser === null) {
      return (
        <div>
          <div>
            <a id="login_link" href={pathToLogin}>Login</a>
          </div>

          <div>
            <a id="register_link" href={pathToRegister}>Register</a>
          </div>
        </div>
      )
    }

    // If they are logged in, give them the option to track a new pet
    return (
      <div>
        <h5 id="greeting">Hey, {currentUser.name.split(" ")[0]}</h5>
        <div>
          <a id="add_pet_link" href={pathToAddPet}>+Track A New Pet</a>
        </div>
        <br />
        <div>
          <a id="update_account_link" href={pathToEditAccount}>Update Account</a>
        </div>

        <div>
          <a id="logout_link" href={pathToLogout} data-method="delete">Logout</a>
        </div>
    </div>
    )
  }

  //
  // render()
  // Base render method
  //
  render () {
    let {pets, width, onFilterSet} = this.props;

    return (
      <div style={{width}}>
        <HeaderBox />
        <div style={style.sidebar}>
          <div>
            <h4>Filter</h4>
            <FilterBar onFilterSet={onFilterSet} />
          </div>
          <div>
            <h4>Active Pets</h4>
            <div>
              {pets.map((pet) => this.renderPet(pet))}
            </div>
          </div>

          <div style={{marginTop: 48}}>
            {this.renderUserControls()}
          </div>
        </div>

      </div>
    );
  }
}

SideBar.propTypes = {
  pets: PropTypes.array
};
export default SideBar
