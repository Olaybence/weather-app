import { UPDATE_DATA } from "../constants/actionTypes";

export const removeCity = (city) => {
  return {
    type: UPDATE_DATA,
    city,
  };
};
