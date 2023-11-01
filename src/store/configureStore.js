// store/configureStore.js
import { combineReducers, createStore } from "redux";
import cityReducer from "../reducers/cityReducer";
import weatherReducer from "../reducers/weatherReducer";

const rootReducer = combineReducers({
  cities: cityReducer,
  weather: weatherReducer
});

const store = createStore(rootReducer);

export default store;
