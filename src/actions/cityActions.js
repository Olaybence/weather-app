// actions/cityActions.js
import { ADD_CITY, REMOVE_CITY } from '../constants/actionTypes';

export const addCity = (city) => {
  return {
    type: ADD_CITY,
    city,
  };
};

export const removeCity = (city) => {
  return {
    type: REMOVE_CITY,
    city,
  };
};