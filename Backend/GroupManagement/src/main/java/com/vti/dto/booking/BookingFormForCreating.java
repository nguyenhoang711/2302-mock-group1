package com.vti.dto.booking;
import java.util.Date;

import com.vti.entity.Booking;

public class BookingFormForCreating {
	private short tripId;
	private short userId;
	private short numOfPeople;
	private int totalPrice;
	private Date timeBooking;
	private int amountPaid;

	public int getAmountPaid() {
		return amountPaid;
	}

	public void setAmountPaid(int amountPaid) {
		this.amountPaid = amountPaid;
	}

	private String bookingStatus;

	public String getBookingStatus() {
		return bookingStatus;
	}

	public void setBookingStatus(String bookingStatus) {
		this.bookingStatus = bookingStatus;
	}

	private String details;

	public Date getTimeBooking() {
		return timeBooking;
	}

	public void setTimeBooking(Date timeBooking) {
		this.timeBooking = timeBooking;
	}

	public short getTripId() {
		return tripId;
	}

	public void setTripId(short tripId) {
		this.tripId = tripId;
	}

	public short getUserId() {
		return userId;
	}

	public void setUserId(short userId) {
		this.userId = userId;
	}

	public short getNumOfPeople() {
		return numOfPeople;
	}

	public void setNumOfPeople(short numOfPeople) {
		this.numOfPeople = numOfPeople;
	}

	public int getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public Booking toEntity() {
		return new Booking(tripId, userId, numOfPeople, totalPrice, timeBooking, amountPaid, bookingStatus, details);
	}
}
