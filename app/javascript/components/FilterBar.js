/*
  * Filter Bar
  * The filter displays the different pet categories as toggle-able buttons
*/

import React from "react"

// Define Styles
const style = {
    container: {
        marginVertical: 24,
        textAlign: 'center',
    },

    filterButton: {
      display: 'inline-block',
      padding: 8,
      margin: 10,
      opacity: 0.8,
      backgroundColor: "#EDCFCF",
      borderRadius: 4,
      transition: 'all 0.5s',
    },

    filterButtonSelected: {
      display: 'inline-block',
      padding: 8,
      margin: 10,
      backgroundColor: "#4A6AED",
      borderRadius: 4,
      transition: 'all 0.5s',
    },
}

// Define the categories
const filters = [
  {
    emoji: "😸",
    key: "cat",
  },
  {
    emoji: "🐶",
    key: "dog",
  },
  {
    emoji: "🐢",
    key: "turtle",
  },
  {
    emoji: "🐰",
    key: "bunny",
  }
]

// Define the class
export default class FilterBar extends React.Component {
  // Set the intial state
  state = {
    filter: {
      types: filters.map(({key}) => key)
    }
  }

  // 
  // toggleFilterKey(key: String)
  // Used to turn on or off a category filter
  //

  toggleFilterKey(key) {
    // Retrieve the filter object from the state
    let {filter} = this.state;

    // Determine if the given key is selected
    let index = filter.types.indexOf(key)
    let selected = index !== -1;

    // If so, remove it from the filter
    // If not, add it to the filter
    if(selected) {
      filter.types.splice(index, 1);
    } else {
      filter.types.push(key);
    }

    // Set the state to the new filter and update
    // our callback
    this.setState({filter}, () =>{
      this.props.onFilterSet(filter);
    });
  }

  //
  // renderFilterCell({emoji: String, key: String})
  // Renders a filter toggle button
  //
  renderFilterCell({emoji, key}) {
    // Get the filter object from the state, determine if the
    // key we are representing is selected
    let {filter} = this.state;
    let selected = filter.types.indexOf(key) !== -1;

    // If it is selected give it a selected style otherwise give it the regular style
    // Return the object
    return (<div style={selected ? style.filterButtonSelected : style.filterButton} onClick={()=>{this.toggleFilterKey(key)}} key={key}>
      <span>{emoji}</span>
    </div>)
  }

  //
  // render()
  // The class's render method
  //
  render () {
    // Return the filters 
    return (
      <div>
        {filters.map((filter) => this.renderFilterCell(filter))}
      </div>
    );
  }
}
