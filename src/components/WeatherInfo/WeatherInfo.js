import React, { Component } from "react";
import axios from "axios";
import "./WeatherInfo.css";
import { FaTemperatureHigh } from "react-icons/fa";
import { TbSunrise, TbSunset, TbTemperatureCelsius } from "react-icons/tb";
import Clock from "../Clock/Clock";

class WeatherInfo extends Component {
  state = {
    weatherData: null,
  };

  componentDidMount() {
    console.log("The current city:", this.props.city);
    if (this.props.currentCity && this.props.currentISO3166) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.props.currentCity},${this.props.currentISO3166}&appid=${this.props.apiKey}`;
      console.log("Tries fetch from URL: ", apiUrl);
      this.fetchWeatherData(apiUrl);
    } else {
      console.warn("Weather data was not updated!");
    }
  }

  fetchWeatherData(apiUrl) {
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Weather response", response);
        this.setState({ weatherData: response.data });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }

  getIcon = (iconCode) => {
    // Define the base URL for OpenWeatherMap icons
    const iconBaseUrl = "http://openweathermap.org/img/wn/";

    // Construct the full URL for the weather icon
    const iconUrl = `${iconBaseUrl}${iconCode}@2x.png`;

    console.log("ASD iconBaseUrl", iconBaseUrl);
    console.log("ASD iconUrl", iconUrl);
    return <img src={iconUrl} alt="Weather Icon" />;
  };

  render() {
    if (this.state.weatherData === null) {
      return <div>Loading...</div>;
    }

    const sunset = new Date(this.state.weatherData.sys.sunset);
    const sunrise = new Date(this.state.weatherData.sys.sunrise);
    return (
      <div className="centerStyle">
        <div>{this.props.currentCity}</div>
        <Clock />
        {this.getIcon(this.state.weatherData?.weather[0]?.icon)}
        <div className="data" style={{marginBottom: "20px"}}>
          {this.state.weatherData?.weather[0]?.description}
        </div>
        <div className="data">
          <FaTemperatureHigh />
          {Math.round(this.state.weatherData.main.temp - 273.15)}{" "}
          <TbTemperatureCelsius />
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

export default WeatherInfo;
