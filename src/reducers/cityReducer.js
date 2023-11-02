import { ADD_CITY, FETCH_DATA, REMOVE_CITY } from "../constants/cityActionTypes";

const initialState = () => {
  // Try to load in from cache
  const loaded = loadData();
  console.log("loaded data", loaded);
  if(loaded) return loaded;
  
  // Default values
  return {
    allCities: [], // Do not include the favorites
    favoriteCities: [{ city: "Budapest", ISO3166: "hun" }], // Selected that is listed on the page
  };
};

const cityReducer = (state = initialState(), action) => {
  console.log("cityReducer state", state, " action", action);
  let res;
  switch (action.type) {
    case ADD_CITY:
       res = {
        ...state,
        favoriteCities: [...state.favoriteCities, action],
        allCities: state.allCities.filter((item) => item.city !== action.city),
      };
      saveData(res);
      return res;
    case REMOVE_CITY:
      return {
        ...state,
        favoriteCities: state.favoriteCities.filter(
          (item) => item.city !== action.city
        ),
        allCities: sortObjectArray([...state.allCities, action.city]),
      };
    case FETCH_DATA:
      res = {
        ...state,
        allCities: sortObjectArray(action.cities),
      };
      saveData(res);
      return res;
    default:
      return state;
  }
};

function sortObjectArray(array) {
  return array.slice().sort((a, b) => {
    return a.city.localeCompare(b.city);
  });
}

/**
 * Save data to local storage
 * 
 * Note that if the database would be much bigger, the favorites should be saved only.
 *  */
function saveData(data) {
  // Save data to a cookie
  console.log("save data:",data);
  if(data) {
    localStorage.setItem('initialState', JSON.stringify(data));
  } else localStorage.removeItem('initialState');
}

/**
 * Retrieve data from local storage
 * 
 * Note that if the database would be much bigger, the favorites should be saved only.
 * Then, this part should also remove the favorites from the all list
 *  */
function loadData() {
  // Retrieve data from a cookie
  const savedData = localStorage.getItem('initialState');
  return savedData ? JSON.parse(savedData) : null;
}

export default cityReducer;
