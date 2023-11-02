// React
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { connect } from "react-redux";
import Papa from "papaparse";

// CSS
import "react-autocomplete-input/dist/bundle.css";

// Components
import CityList from "./components/CityList/CityList";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import AddToList from "./components/AddToList/AddToList";

// Actions
import {
  ADD_CITY_PAGE,
  CITY_LIST_PAGE,
  WEATHER_PAGE,
} from "./constants/pageTypes";
import { addCity, fetchData, removeCity } from "./actions/cityActions";
import { changePage } from "./actions/pageActions";

class App extends React.Component {
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
              console.log("CSV result length:", result.data);
              this.props.fetchData(result.data);
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

  selectCity = (selectCity) => {
    console.log("selectCity", selectCity);
    this.props.updateCurrentCity(selectCity);
    this.props.changePage(WEATHER_PAGE);
  };

  renderPage() {
    console.log("Current page: ", this.props.page);
    console.log("FavoriteCities: ", this.props.favoriteCities);
    switch (this.props.page) {
      case CITY_LIST_PAGE:
        return (
          <div>
            <CityList />
          </div>
        );
      case ADD_CITY_PAGE:
        return (
          <div>
            <AddToList />
          </div>
        );
      case WEATHER_PAGE:
        return (
          <div>
            <WeatherInfo />
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
    return (
      <div className="App-body">
        {this.props.page !== CITY_LIST_PAGE ? (
          <BiArrowBack
            className="back"
            onClick={() => this.props.changePage(CITY_LIST_PAGE)}
          />
        ) : null}
        <h1>Stay Weather Informed!</h1>
        {this.renderPage()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("App - mapStateToProps state", state);
  console.log(
    "App - mapStateToProps state.cities.favoriteCities",
    state.cities.favoriteCities
  );
  return {
    allCities: state.cities.allCities,
    favoriteCities: state.cities.favoriteCities,

    page: state.page.page,
  };
};

const mapDispatchToProps = {
  addCity,
  removeCity,
  changePage,
  fetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
