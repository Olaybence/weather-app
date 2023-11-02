import React, { Component } from "react";
import axios from "axios";
import "./WeatherInfo.css";
import { FaTemperatureHigh } from "react-icons/fa";
import { TbSunrise, TbSunset, TbTemperatureCelsius } from "react-icons/tb";
import Clock from "../Clock/Clock";
import {
  updateCurrentCity,
  updateWeatherData,
} from "../../actions/weatherActions";
import { connect } from "react-redux";

class WeatherInfo extends Component {
  successfulFetch = true;

  componentDidMount() {
    console.log("The current props:", this.props);
    console.log("The current state:", this.state);
    if (this.props.city && this.props.ISO3166) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.props.city},${this.props.ISO3166}&appid=${this.props.apiKey}`;
      console.log("Tries fetch from URL: ", apiUrl);
      this.fetchWeatherData(apiUrl);
    } else {
      console.warn("Weather data was not updated!");
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    this.successfulFetch = true;
  }

  fetchWeatherData(apiUrl) {
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Weather response", response);
        this.props.updateWeatherData(response);
      })
      .catch((error) => {
        this.successfulFetch = false;
        this.props.updateWeatherData(null);
        console.error("Error fetching weather data:", error);
        console.error("The used URL:", apiUrl);
      });
  }

  getIcon = (iconCode) => {
    // Define the base URL for OpenWeatherMap icons
    const iconBaseUrl = "http://openweathermap.org/img/wn/";

    // Construct the full URL for the weather icon
    const iconUrl = `${iconBaseUrl}${iconCode}@2x.png`;
    console.log("iconUrl:", iconUrl);

    return <img src={iconUrl} alt="Weather Icon" />;
  };

  render() {
    console.log("this.props", this.props);
    if (!this.successfulFetch) {
      return (
        <div className="centerStyle">
          <div>{this.props.city}</div>
          <div className="data">Something went wrong</div>
        </div>
      );
    }

    const sunset = new Date(this.props.sunset * 1000);
    const sunrise = new Date(this.props.sunrise * 1000);
    return (
      <div className="centerStyle">
        <div>{this.props.city}</div>
        <Clock />
        {this.getIcon(this.props.icon)}
        <div className="data" style={{ marginBottom: "20px" }}>
          {this.props.description}
        </div>
        <div className="data">
          <FaTemperatureHigh />
          {Math.round(this.props.temp - 273.15)} <TbTemperatureCelsius />
        </div>
        {/* <p>temperature_min:{this.state.weatherData.main.temp_min}</p>
      <p>temperature_max:{this.state.weatherData.main.temp_max}</p> */}
        <div className="data">
          <TbSunrise />
          {sunset.getHours()}:{sunset.getMinutes()}
        </div>
        <div className="data">
          <TbSunset />
          {sunrise.getHours()}:{sunrise.getMinutes()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("WeatherInfo - mapStateToProps state", state);
  return {
    sunset: state.weather.sunset,
    sunrise: state.weather.sunrise,
    icon: state.weather.icon,
    description: state.weather.description,
    temp: state.weather.temp,
    city: state.weather.city,
    ISO3166: state.weather.ISO3166,
    apiKey: state.weather.apiKey,
  };
};

const mapDispatchToProps = {
  updateCurrentCity,
  updateWeatherData,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherInfo);
