import * as types from "../constants";
import storage from "../../Storage/Storage";

const initialState = {
  tripInfo: localStorage.getItem('tripInfo') ? JSON.parse(localStorage.getItem('tripInfo')) : []
  // tourName: localStorage.tourName,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_TRIP_BY_ID_SUCCESS:
      localStorage.setItem('tripInfo', JSON.stringify(actions.payload));
      // localStorage.setItem('tourName', actions.payload.tourName);

      return {
        ...state,
        tripInfo: actions.payload,
        // tourName: actions.payload.tourName,
      };
    default:
      return state;
  }
}
