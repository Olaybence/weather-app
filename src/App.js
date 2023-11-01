import React from "react";
import CityList from "./components/CityList/CityList";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import "react-autocomplete-input/dist/bundle.css";
import AddToList from "./components/AddToList/AddToList";
import Papa from "papaparse";
import {
  ADD_CITY_PAGE,
  CITY_LIST_PAGE,
  WEATHER_PAGE,
} from "./constants/actionTypes";
import { BiArrowBack } from "react-icons/bi";

class App extends React.Component {
  state = {
    currentPage: CITY_LIST_PAGE, // Initialize the current page to the first page
    currentCity: null,
    currentISO3166: null,
    capitalCities: [],
    favoriteCapitalCities: [{ city: "Budapest", ISO3166: "hun" }],
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
              console.log("CSV result length:", result.data.length);
              this.setState({
                capitalCities: result.data,
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

  changePage = (newPage) => {
    this.setState({ currentPage: newPage });
  };

  selectCity = (selectCity) => {
    this.setState({ currentCity: selectCity?.city });
    this.setState({ currentISO3166: selectCity?.ISO3166 });
    this.changePage(WEATHER_PAGE);
    console.log("selectCity", selectCity);
    console.log("currentCity", this.state.currentCity);
    console.log("currentISO3166", this.state.currentISO3166);
  };

  addCity = (city) => {
    this.setState({
      favoriteCapitalCities: [...this.state.favoriteCapitalCities, city],
    });
  };

  renderPage(apiKey) {
    switch (this.state.currentPage) {
      case CITY_LIST_PAGE:
        return (
          <div>
            <CityList
              favoriteCapitalCities={this.state.favoriteCapitalCities}
              changePage={this.changePage}
              selectCity={this.selectCity}
            />
          </div>
        );
      case ADD_CITY_PAGE:
        return (
          <div>
            <AddToList
              addCity={this.addCity}
              cities={this.state.capitalCities}
              changePage={this.changePage}
            />
          </div>
        );
      case WEATHER_PAGE:
        return (
          <div>
            <WeatherInfo
              currentCity={this.state.currentCity}
              currentISO3166={this.state.currentISO3166}
              apiKey={apiKey}
              changePage={this.changePage}
            />
          </div>
        );
      default:
        return (
          <div>
            <h1>Non existing page!</h1>
          </div>
        ); // Handle other cases as needed
    }
  }

  render() {
    const apiKey = "1dbe9f877272778db7c55f57407ee60c";
    return (
      <div className="App-body">
        { this.state.currentPage !== CITY_LIST_PAGE ? ( <BiArrowBack className="back" onClick={() => this.changePage(CITY_LIST_PAGE)} /> ) : null}
        <h1>Stay Weather Informed!</h1>
        {this.renderPage(apiKey)}
      </div>
    );
  }
}

export default App;
