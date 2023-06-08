import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const groupSelector = (state) => state.Group;

const selectGroupSelector = createSelector(
    groupSelector,
    state => state.groups);

const selectPageSelector = createSelector(
    groupSelector,
    state => state.page);

const selectSizeSelector = createSelector(
    groupSelector,
    state => state.size);

const selectTotalSizeSelector = createSelector(
    groupSelector,
    state => state.totalSize);

const selectMinTotalMemberSelector = createSelector(
    groupSelector,
    state => state.minTotalMember);

const selectMaxTotalMemberSelector = createSelector(
    groupSelector,
    state => state.maxTotalMember);

const selectSearchSelector = createSelector(
    groupSelector,
    state => state.search);

const selectSelectedRowsSelector = createSelector(
    groupSelector,
    state => state.selectedRows);

/** function */
export const selectGroups = (state) => {
    return selectGroupSelector(state);
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

export const selectMinTotalMember = (state) => {
    return selectMinTotalMemberSelector(state);
}

export const selectMaxTotalMember = (state) => {
    return selectMaxTotalMemberSelector(state);
}

export const selectSearch = (state) => {
    return selectSearchSelector(state);
}

export const selectSelectedRows = (state) => {
    return selectSelectedRowsSelector(state);
}