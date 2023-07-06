import * as types from "../constants";

export function getListTourAction(tours, page, totalSize,
  //  minPrice, maxPrice,
    search) {
  return {
    type: types.GET_LIST_TOUR,
    payload: {
      tours,
      page,
      totalSize,
      // filter
      // minPrice,
      // maxPrice,
      // search
      search
    }
  };
};

export function updateSelectedRowsAction(selectedRows) {
  return {
    type: types.GET_LIST_TOUR_SELECTED_ROWS,
    payload: selectedRows
  };
};