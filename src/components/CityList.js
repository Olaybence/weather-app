import React, { Component } from "react";
import { connect } from "react-redux";
import { addCity, removeCity } from "../actions/cityActions";

class CityList extends Component {
  state = {
    city: "",
  };

  handleAddCity = () => {
    this.props.addCity(this.state.city);
    this.setState({ city: "" });
  };

  handleRemoveCity = (city) => {
    this.props.removeCity(city);
  };

  render() {
    const { capitalCities } = this.props;
    return (
      <div>
        <ul>
          {capitalCities.map((city, index) => (
            <li key={index}>
              {city}
              <button onClick={() => this.handleRemoveCity(city)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={this.state.city}
          onChange={(e) => this.setState({ city: e.target.value })}
        />
        <button onClick={this.handleAddCity}>Add City</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  capitalCities: state.cities.capitalCities,
});

const mapDispatchToProps = {
  addCity,
  removeCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
