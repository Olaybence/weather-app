import { CHANGE_PAGE } from "../constants/pageTypes";

export const changePage = (page) => {
  console.log("changePage called", page);
  return {
    type: CHANGE_PAGE,
    currentPage: page,
  };
};