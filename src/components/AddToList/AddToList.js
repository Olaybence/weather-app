import React, { Component } from "react";
import Select from "react-select";
import "./AddToList.css";
import { CITY_LIST_PAGE } from "../../constants/pageTypes";
import { connect } from "react-redux";
import { addCity,removeCity } from "../../actions/cityActions";
import { changePage } from "../../actions/pageActions";

/**
 * Add cities to the favorite list.
 * 
 * @state selectedOption - A capital city that was selected from the list
 * and will be added to the favorite list
 */
class AddToList extends Component {
  state = {
    selectedOption: ""
  }

  handleInputChange = (newValue) => {
    console.log("handleInputChange", newValue);
    if (newValue) {
      this.setState({ selectedOption: newValue });
    } else {
      this.setState({ selectedOption: "" });
    }
  };

  handleSelectChange = (selectedOption) => {
    console.log("handleSelectChange", selectedOption);
    this.props.addCity(selectedOption.value);
    this.props.changePage(CITY_LIST_PAGE);
  };

  render() {
    console.log("this.props",this.props);
    console.log("BENCE Cities",this.props.allCities);
    const cities = this.props.allCities;
    return (
      <div style={{width: '300px'}}>
        <Select
          onChange={this.handleSelectChange}
          onInputChange={this.handleInputChange}
          options={cities.map(item => ({label: item.city, value: item}))}
          isClearable={true}
          isSearchable={true}
          placeholder="Type to search..."
          width="200px"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("AddToList - mapStateToProps state", state);
  return {
  allCities: state.cities.allCities,
  favoriteCities: state.cities.favoriteCities,
}
};

const mapDispatchToProps = {
  addCity,
  removeCity,
  changePage
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToList);
