import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WeatherInfo.css";

function WeatherInfo(city) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiKey = "1dbe9f877272778db7c55f57407ee60c";
    const city = "London"; // TODO: Update to the selected
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},uk&appid=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Weather response", response);
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  if (weatherData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="centerStyle">
      <p>{weatherData?.weather[0]?.icon}</p>
      <p>{weatherData?.weather[0]?.description}</p>
      <p>temperature:{weatherData.main.temp}</p>
      {/* <p>temperature_min:{weatherData.main.temp_min}</p>
      <p>temperature_max:{weatherData.main.temp_max}</p> */}
      <p>sunrise:{weatherData.sys.sunrise}</p>
      <p>sunset:{weatherData.sys.sunset}</p>
    </div>
  );
}

export default WeatherInfo;
