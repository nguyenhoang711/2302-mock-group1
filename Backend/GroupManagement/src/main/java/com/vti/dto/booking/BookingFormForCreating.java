package com.vti.dto.booking;

import java.math.BigDecimal;

import com.vti.entity.Booking;
import com.vti.entity.Trip;
import com.vti.entity.User;

public class BookingFormForCreating {
	private short tripId;
	private short userId;
	private short numOfPeople;
	private int totalPrice;
	private String details;

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
		return new Booking(tripId, userId, numOfPeople, totalPrice, details);
	}

}
