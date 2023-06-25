import * as types from "../constants";

const initialState = {
  bookings: [],
  page: 1,
  size: 5,
  totalSize: 0,

  // search
  search: null,

  // selected rows
  selectedRows: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_BOOKING:
      return {
        ...state,
        bookings: actions.payload.bookings,
        page: actions.payload.page,
        totalSize: actions.payload.totalSize,
        // search
        search: actions.payload.search
      };

    case types.GET_LIST_BOOKING_SELECTED_ROWS:
      return {
        ...state,
        selectedRows: actions.payload,
      };
    default:
      return state;
  }
}
