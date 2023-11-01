import React, { Component } from "react";
import { connect } from "react-redux";
import { addCity, removeCity } from "../../actions/cityActions";
import "./CityList.css";
import { ADD_CITY_PAGE } from "../../constants/actionTypes";

class CityList extends Component {
  handleAddCity() {
    this.props.addCity(this.state.city);
    this.setState({ city: "" });
  }

  handleRemoveCity(city) {
    this.props.removeCity(city);
  }

  loadWeather(city) {
    console.log("city", city);
    this.props.selectCity(city);
  }

  handlePageChange = () => {
    this.props.changePage(ADD_CITY_PAGE); // Change the page to the second page
  }

  render() {
    const { favoriteCapitalCities } = this.props;
    return (
      <div>
        <ul className="no-left-padding">
          {favoriteCapitalCities.map((city) => (
            <li className="list-style" key={city.city}>
              <button
                className="city-button-style"
                onClick={() => this.loadWeather(city)}
              >
                {city.city}
              </button>
            </li>
          ))}
        </ul>
        <button className="add-button-style" onClick={this.handlePageChange}>
          +
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedCapitalCities: state.cities.selectedCapitalCities,
});

const mapDispatchToProps = {
  addCity,
  removeCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
