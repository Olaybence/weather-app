// reducers/cityReducer.js
import { ADD_CITY, REMOVE_CITY } from '../constants/actionTypes';

const initialState = {
  capitalCities: [],
};

const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY:
      return {
        ...state,
        capitalCities: [...state.capitalCities, action.city],
      };
    case REMOVE_CITY:
      return {
        ...state,
        capitalCities: state.capitalCities.filter((city) => city !== action.city),
      };
    default:
      return state;
  }
};

export default cityReducer;
