import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const tourSelector = (state) => state.Tour;

const selectTourSelector = createSelector(
    tourSelector,
    state => state.tours);

const selectPageSelector = createSelector(
    tourSelector,
    state => state.page);

const selectSizeSelector = createSelector(
    tourSelector,
    state => state.size);

const selectTotalSizeSelector = createSelector(
    tourSelector,
    state => state.totalSize);

const selectMinPriceSelector = createSelector(
    tourSelector,
    state => state.minPrice);

const selectMaxPriceSelector = createSelector(
    tourSelector,
    state => state.maxPrice);

const selectSearchSelector = createSelector(
    tourSelector,
    state => state.search);

const selectSelectedRowsSelector = createSelector(
    tourSelector,
    state => state.selectedRows);

/** function */
export const selectTours = (state) => {
    return selectTourSelector(state);
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

export const selectMinPrice = (state) => {
    return selectMinPriceSelector(state);
}

export const selectMaxPrice = (state) => {
    return selectMaxPriceSelector(state);
}

export const selectSearch = (state) => {
    return selectSearchSelector(state);
}

export const selectSelectedRows = (state) => {
    return selectSelectedRowsSelector(state);
}