import storage from "../../Storage/Storage";
import * as types from "../constants";

const initialState = {
  bookings: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_BOOKING:
      return {
        ...state,
        bookings: actions.payload
      };
    default:
      return state;
  }
}
