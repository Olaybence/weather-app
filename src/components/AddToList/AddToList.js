import React, { Component } from "react";
import Select from "react-select";
import { BiArrowBack } from "react-icons/bi";
import "./AddToList.css";
import { CITY_LIST_PAGE } from "../../constants/actionTypes";

class AddToList extends Component {
  state = {
    selectedOption: null
  };

  handleInputChange = (newValue) => {
    console.log("handleInputChange", newValue);
    if (newValue) {
      this.setState({ selectedOption: newValue });
    } else {
      this.setState({ selectedOption: null });
    }
  };

  handleSelectChange = (selectedOption) => {
    console.log("handleSelectChange", selectedOption);
    this.setState({ selectedOption: selectedOption });
    this.props.addCity(selectedOption.value);
    this.back();
  };

  onSelect(selectedOption) {
    console.log("selectedOption", selectedOption);
    this.setState({ selectedOption: selectedOption });
  }

  render() {
    const { cities, changePage } = this.props;
    const cityNames = cities.map(city => city.city);
    this.back = () => changePage(CITY_LIST_PAGE);
    console.log("cities",cities);
    console.log("cityNames",cityNames);
    return (
      <div>
        <Select
          onChange={this.handleSelectChange}
          onInputChange={this.handleInputChange}
          options={cities.map(city => ({label: city.city, value: city}))}
          isClearable={true}
          isSearchable={true}
          placeholder="Type to search..."
        />
      </div>
    );
  }
}

export default AddToList;
