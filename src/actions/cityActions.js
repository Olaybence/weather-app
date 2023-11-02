import { ADD_CITY, FETCH_DATA, REMOVE_CITY } from "../constants/cityActionTypes";

export const addCity = (city) => {
  console.log("addCity called", city);
  return {
    type: ADD_CITY,
    city: city.city,
    ISO3166: city.ISO3166,
  };
};

export const removeCity = (city) => {
  console.log("removeCity called", city);
  return {
    type: REMOVE_CITY,
    city: city,
  };
};

export const fetchData = (cities) => {
  console.log("fetchData called", cities.length);
  return {
    type: FETCH_DATA,
    cities: cities,
  };
};
