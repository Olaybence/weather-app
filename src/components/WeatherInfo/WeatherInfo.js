import React, { Component } from "react";
import axios from "axios";
import "./WeatherInfo.css";
import { BiArrowBack } from "react-icons/bi";
import { FaTemperatureHigh } from "react-icons/fa";
import { TbSunrise, TbSunset, TbTemperatureCelsius } from "react-icons/tb";
import { CITY_LIST_PAGE } from "../../constants/actionTypes";
import Clock from "../Clock/Clock";

class WeatherInfo extends Component {
  state = {
    weatherData: null,
  };

  componentDidMount() {
    console.log("The current city:", this.props.city);
    if (this.props.currentCity && this.props.currentISO3166) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.props.currentCity},${this.props.currentISO3166},uk&appid=${this.props.apiKey}`;
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

  render() {
    if (this.state.weatherData === null) {
      return <div>Loading...</div>;
    }

    const sunset = new Date(this.state.weatherData.sys.sunset);
    const sunrise = new Date(this.state.weatherData.sys.sunrise);
    return (
      <div className="centerStyle">
        <p>{this.props.currentCity}</p>
        <Clock />
        <div>{this.state.weatherData?.weather[0]?.icon}</div>
        <div className="data">
          {this.state.weatherData?.weather[0]?.description}
        </div>
        <div className="data">
          <FaTemperatureHigh />
          {Math.round(this.state.weatherData.main.temp - 273.15)} <TbTemperatureCelsius />
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
