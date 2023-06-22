import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const bookingSelector = (state) => state.Booking;

const selectBookingSelector = createSelector(
    bookingSelector,
    state => state.bookings);

/** function */
export const selectBookings = (state) => {
    return selectBookingSelector(state);
}