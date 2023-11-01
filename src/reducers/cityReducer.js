import { ADD_CITY, REMOVE_CITY } from '../constants/actionTypes';

const initialState = {
  selectedCapitalCities: []
};

const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY:
      return {
        ...state,
        selectedCapitalCities: [...state.selectedCapitalCities, action.city],
      };
    case REMOVE_CITY:
      return {
        ...state,
        selectedCapitalCities: state.selectedCapitalCities.filter((city) => city !== action.city),
      };
    default:
      return state;
  }
};

export default cityReducer;
