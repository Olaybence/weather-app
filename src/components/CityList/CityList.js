import React, { Component } from "react";
import { connect } from "react-redux";
import { addCity, removeCity } from "../../actions/cityActions";
import "./CityList.css";
import Papa from "papaparse";

class CityList extends Component {
  state = {
    city: "",
    capitalCities: [],
    selectedCapitalCities: ["TODO-MyLocation"],
  };

  componentDidMount() {
    this.fetchAndParseCSV("./capitalCityList.csv");
  }

  fetchAndParseCSV = (filePath) => {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true, // Treat the first row as header
          complete: (result) => {
            if (result.errors.length === 0) {
              // Access the parsed CSV data here
              console.log("CSV result:", result.data);
              this.setState({
                capitalCities: result.data.map((item) => item.capital),
              });
            } else {
              console.error("Error parsing CSV:", result.errors);
            }
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching CSV:", error);
      });
  };

  handleAddCity() {
    this.props.addCity(this.state.city);
    this.setState({ city: "" });
  }

  handleRemoveCity(city) {
    this.props.removeCity(city);
  }

  switchToAddCity() {
    console.log("switchToAddCity");
  }

  render() {
    console.log("RENDERING CityList");
    return (
      <div>
        <ul className="no-left-padding">
          {this.state.selectedCapitalCities.map((city, index) => (
            <li className="list-style" key={index}>
              <button className="city-button-style" onClick={this.switchToAddCity()}>
                {city}
              </button>
            </li>
          ))}
        </ul>
        <button className="add-button-style" onClick={this.switchToAddCity()}>
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
