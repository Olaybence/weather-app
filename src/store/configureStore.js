// store/configureStore.js
import { combineReducers, createStore } from "redux";
import cityReducer from "../reducers/cityReducer";
import weatherReducer from "../reducers/weatherReducer";
import pageReducer from "../reducers/pageReducer";

const rootReducer = combineReducers({
  cities: cityReducer,
  weather: weatherReducer,
  page: pageReducer
});

const store = createStore(rootReducer);

export default store;
