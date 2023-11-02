import { UPDATE_DATA } from '../constants/actionTypes';

// TODO: USE REDUX TO STORE EVERYTHING

const initialState = {
  temperature: null,
  sunrise: null,
  sunset: null
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        ...state,
        weather: {
            temperature: state.temperature,
            sunrise: state.sunrise,
            sunset: state.sunset
        },
      };
    default:
      return state;
  }
};

export default weatherReducer;
