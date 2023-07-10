package com.vti.dto.booking;

import java.util.Date;

import com.vti.entity.Booking;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingFormForCreating {
	private short tripId;
	private short userId;
	private short bookingContactId;
	private short numOfPeople;
	private int totalPrice;
	private Date timeBooking;
	private int amountPaid;
	private String bookingStatus;
	private String details;
	
	public Booking toEntity() {
		return new Booking(tripId, userId, bookingContactId, numOfPeople, totalPrice, timeBooking, amountPaid, bookingStatus, details);
	}
}
