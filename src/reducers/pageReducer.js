import { CHANGE_PAGE, CITY_LIST_PAGE } from "../constants/pageTypes";

const initialState = {
  currentPage: CITY_LIST_PAGE,
};

const pageReducer = (state = initialState, action) => {
  console.log("pageReducer state", state, " action", action);
  switch (action.type) {
    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      };
    default:
      return state;
  }
};

export default pageReducer;
