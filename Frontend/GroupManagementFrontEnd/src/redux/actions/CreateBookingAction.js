import * as types from "../constants";
import axios from "axios";

export function setBookingCheckout(numOfPeople) {
  return {
    type: types.GET_BOOKING_CHECKOUT_INFO,
    payload: {
      numOfPeople
    }
  };
};

export const getTripById = (tripId) => {

  return async (dispatch, getState) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/trips/${tripId}`);
      const trip = res.data;
      const tourId = trip.tour.id;
      const tourName = trip.tour.name;
      const startDate = trip.startDate;
      const endDate = trip.endDate;
      const day = trip.tour.day;
      const night = trip.tour.night;
      const duration = day + " ngày " + night + " đêm";
      const startDest = trip.tour.startDest;
      const numOfPeople = trip.tour.numOfPeople;
      const priceTour = trip.tour.price;
      const tourImg = trip.tour.thumbnail;
      dispatch(getTripByIdSuccess(tourId, tourName, tourImg, numOfPeople, duration, startDest, startDate, endDate , priceTour));
    } catch (error) {
      console.log(error);
    }
  }
}

export const getTripByIdSuccess = (tourId, tourName, tourImg, numOfPeople, duration, startDest, startDate, endDate , priceTour) => {
  return {
    type: types.GET_TRIP_BY_ID_SUCCESS,
    payload: {
      tourId,
      tourName,
      tourImg,
      numOfPeople,
      duration,
      startDest,
      startDate,
      endDate,
      priceTour,
    }
  }
}