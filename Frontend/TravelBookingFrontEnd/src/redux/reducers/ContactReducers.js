import * as types from "../constants";

const initialState = {
  contacts: [],
  page: 1,
  size: 5,
  totalSize: 0,

  // selected rows
  selectedRows: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_CONTACT:
      return {
        ...state,
        contacts: actions.payload.contacts,
        page: actions.payload.page,
        totalSize: actions.payload.totalSize
      };

    case types.GET_LIST_CONTACT_SELECTED_ROWS:
      return {
        ...state,
        selectedRows: actions.payload,
      };
    default:
      return state;
  }
}
