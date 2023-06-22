import * as types from "../constants";

export function getListBookingAction(bookings) {
  return {
    type: types.GET_LIST_BOOKING,
    payload: bookings
  };
}
