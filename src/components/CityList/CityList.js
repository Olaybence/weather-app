// React
import React, { Component } from "react";
import { connect } from "react-redux";

// CSS
import "./CityList.css";

import { ADD_CITY_PAGE, WEATHER_PAGE } from "../../constants/pageTypes";

// Actions
import { changePage } from "../../actions/pageActions";
import { updateCurrentCity } from "../../actions/weatherActions";
import { addCity, removeCity } from "../../actions/cityActions";

/**
 * The list of the favorite capital cities.
 */
class CityList extends Component {

  loadWeather(city) {
    console.log("loadWeather city", city);
    this.props.updateCurrentCity(city);
    this.props.changePage(WEATHER_PAGE);
  }

  handlePageChange = () => {
    console.log("handlePageChange ADD_CITY_PAGE");
    this.props.changePage(ADD_CITY_PAGE); // Change the page to the second page
  };

  render() {
    console.log("CityList props:",this.props);
    return (
      <div>
        <ul className="no-left-padding">
          {this.props.favoriteCities.map((city) => (
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

const mapStateToProps = (state) => {
  return {
    allCities: state.cities.allCities,
    favoriteCities: state.cities.favoriteCities,

    page: state.page.page
  };
};

const mapDispatchToProps = {
  changePage,
  addCity,
  removeCity,
  updateCurrentCity
};

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
