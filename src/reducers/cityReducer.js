import { ADD_CITY, FETCH_DATA, REMOVE_CITY } from "../constants/cityActionTypes";

const initialState = {
  allCities: [], // Do not include the favorites
  favoriteCities: [{ city: "Budapest", ISO3166: "hun" }], // Selected that is listed on the page
};

const cityReducer = (state = initialState, action) => {
  console.log("cityReducer state", state, " action", action);
  console.log(
    "cityReducer state.favoriteCities",
    state.favoriteCities,
    " action.city",
    action.city
  );
  switch (action.type) {
    case ADD_CITY:
      return {
        ...state,
        favoriteCities: [...state.favoriteCities, action.city],
        allCities: state.allCities.filter((item) => item.city !== action.city),
      };
    case REMOVE_CITY:
      return {
        ...state,
        favoriteCities: state.favoriteCities.filter(
          (item) => item.city !== action.city
        ),
        allCities: [...state.allCities, action.city],
      };
    case FETCH_DATA:
      return {
        ...state,
        allCities: action.cities,
      };
    default:
      return state;
  }
};

export default cityReducer;
