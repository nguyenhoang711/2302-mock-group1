package com.vti.dto.booking;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingFormForUpdating {
	private short tripId;
	private short userId;
	private short numOfPeople;
	private int totalPrice;
	private String details;
	private String bookingStatus;


}
