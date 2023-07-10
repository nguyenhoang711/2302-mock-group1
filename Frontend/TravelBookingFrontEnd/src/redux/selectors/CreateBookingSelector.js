import { createSelector } from "@reduxjs/toolkit";

const createBookingSelector = (state) => state.CreateBooking;

const selectTourNameSelector = createSelector(
    createBookingSelector,
    state => state.tourName
);

// const selectTourNameSelector = createSelector(
//     createBookingSelector,
//     state => state.tourName);

// const selectTourImgSelector = createSelector(
//     createBookingSelector,
//     state => state.tourImg
// );

// const selectNumOfPeopleSelector = createSelector(
//     createBookingSelector,
//     state => state.numOfPeople
// );

// const selectStartDateSelector = createSelector(
//     createBookingSelector,
//     state => state.startDate
// );

// const selectEndDateSelector = createSelector(
//     createBookingSelector,
//     state => state.endDate
// );

// const selectCountTotalPeopleSelector = createSelector(
//     createBookingSelector,
//     state => state.countTotalPeople
// );

// const selectCountAdultSelector = createSelector(
//     createBookingSelector,
//     state => state.countAdult
// );

// const selectCountChildrenSelector = createSelector(
//     createBookingSelector,
//     state => state.countChildren
// );

// const selectCountSmallChildrenSelector = createSelector(
//     createBookingSelector,
//     state => state.countSmallChildren
// );

// const selectCountBabySelector = createSelector(
//     createBookingSelector,
//     state => state.countBaby
// );

// const selectPriceTourSelector = createSelector(
//     createBookingSelector,
//     state => state.priceTour
// );

// const selectCountTotalPriceSelector = createSelector(
//     createBookingSelector,
//     state => state.countTotalPrice
// );

  /** function */
export const selectTourName = (state) => {
    return selectTourNameSelector(state);
}

// export const selectTourImg = (state) => {
//     return selectTourImgSelector(state);
// }

// export const selectNumOfPeople = (state) => {
//     return selectNumOfPeopleSelector(state);
// }

// export const selectStartDate = (state) => {
//     return selectStartDateSelector(state);
// }

// export const selectEndDate = (state) => {
//     return selectEndDateSelector(state);
// }

// export const selectCountTotalPeople = (state) => {
//     return selectCountTotalPeopleSelector(state);
// }

// export const selectCountAdult = (state) => {
//     return selectCountAdultSelector(state);
// }

// export const selectCountChildren = (state) => {
//     return selectCountChildrenSelector(state);
// }

// export const selectCountSmallChildren = (state) => {
//     return selectCountSmallChildrenSelector(state);
// }

// export const selectCountBaby = (state) => {
//     return selectCountBabySelector(state);
// }

// export const selectPriceTour = (state) => {
//     return selectPriceTourSelector(state);
// }

// export const selectCountTotalPrice = (state) => {
//     return selectCountTotalPriceSelector(state);
// }