import {
  UPDATE_CURRENT_CITY,
  UPDATE_WEATHER_DATA,
} from "../constants/weatherActionTypes";

export const updateCurrentCity = (city) => {
  console.log("updateCurrentCity city",city);
  return {
    type: UPDATE_CURRENT_CITY,
    city: city.city,
    ISO3166: city.ISO3166,
  };
};

export const updateWeatherData = (response) => {
  console.log("openweathermap response: ", response);
  const res = {
    type: UPDATE_WEATHER_DATA,
    sunrise: response?.data?.sys?.sunrise,
    sunset: response?.data?.sys?.sunset,
    icon: response?.data?.weather[0]?.icon,
    description: response?.data?.weather[0]?.description,
    temp: response?.data?.main?.temp,
  };
  console.log("openweathermap res: ", res);
  return res;
};

// TODO: TYPES TYPES TYPES