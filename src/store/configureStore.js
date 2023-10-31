// store/configureStore.js
import { combineReducers, createStore } from "redux";
import cityReducer from "../reducers/cityReducer";

const rootReducer = combineReducers({
  cities: cityReducer,
});

const store = createStore(rootReducer);

export default store;
