import {
  UPDATE_CURRENT_CITY,
  UPDATE_WEATHER_DATA,
} from "../constants/weatherActionTypes";

// TODO: USE REDUX TO STORE EVERYTHING
// TODO: TYPES

/**
 * @property city (string) - the name of the chosen capital to check its weather
 * @property ISO3166 (string) - the capital's country ID (like UK,HUN,US,etc.)
 * @property sunset (Date) - time of sunset
 * @property sunrise (Date) - time of sunrise
 * @property icon (string - icon ID from openweather) - actual weather described with icon
 * @property description (string) - actual weather description
 * @property temp (number) - actual temperature
 */
const initialState = {
  apiKey: "1dbe9f877272778db7c55f57407ee60c",
  city: null,
  ISO3166: null,
  sunset: null,
  sunrise: null,
  icon: null,
  description: null,
  temp: null,
};

const weatherReducer = (state = initialState, action) => {
  console.log("weatherReducer state", state, " action", action);
  switch (action.type) {
    case UPDATE_WEATHER_DATA:
      return {
        ...state,
        sunset: action.sunset,
        sunrise: action.sunrise,
        icon: action.icon,
        description: action.description,
        temp: action.temp,
      };
    case UPDATE_CURRENT_CITY:
      console.log("GOTHERE")
      return {
        ...state,
        city: action.city,
        ISO3166: action.ISO3166,
      };
    default:
      return state;
  }
};

export default weatherReducer;
