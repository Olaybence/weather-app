import { UPDATE_DATA } from '../constants/actionTypes';

const initialState = {
  temperature: "23",
  sunrise: new Date(),
  sunset: new Date()
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
