import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const contactSelector = (state) => state.Contact;

const selectContactSelector = createSelector(
    contactSelector,
    state => state.contacts);

const selectPageSelector = createSelector(
    contactSelector,
    state => state.page);

const selectSizeSelector = createSelector(
    contactSelector,
    state => state.size);

const selectTotalSizeSelector = createSelector(
    contactSelector,
    state => state.totalSize);

const selectSelectedRowsSelector = createSelector(
    contactSelector,
    state => state.selectedRows);

/** function */
export const selectContacts = (state) => {
    return selectContactSelector(state);
}

export const selectPage = (state) => {
    return selectPageSelector(state);
}

export const selectSize = (state) => {
    return selectSizeSelector(state);
}

export const selectTotalSize = (state) => {
    return selectTotalSizeSelector(state);
}


export const selectSelectedRows = (state) => {
    return selectSelectedRowsSelector(state);
}