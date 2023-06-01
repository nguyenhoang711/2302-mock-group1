package com.vti.dto.booking;

import java.math.BigDecimal;

import com.vti.entity.Trip;
import com.vti.entity.User;

public class BookingFormForUpdating {
	private short tripId;
	private short userId;
	private short numOfPeople;
	private BigDecimal totalPrice;
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

	public BigDecimal getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}
}
