import * as types from "../constants";

export function getListContactAction(contacts, page, totalSize) {
  return {
    type: types.GET_LIST_CONTACT,
    payload: {
      contacts,
      page,
      totalSize
    }
  };
};

export function updateSelectedRowsAction(selectedRows) {
  return {
    type: types.GET_LIST_CONTACT_SELECTED_ROWS,
    payload: selectedRows
  };
};