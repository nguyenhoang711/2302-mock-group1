package com.vti.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.dto.booking.BookingFormForCreating;
import com.vti.dto.booking.BookingFormForUpdateStatus;
import com.vti.dto.booking.BookingFormForUpdating;
import com.vti.entity.Booking;

public interface IBookingService {

	Page<Booking> getAllBookings(Pageable pageable, String search);

	boolean isBookingExistsById(short id);

	void createBooking(BookingFormForCreating form);

	Booking getBookingByID(short id);

	void updateBooking(short id, BookingFormForUpdating form);

	void updateBookingStatus(short id, BookingFormForUpdateStatus form);

	void deleteBookings(List<Short> ids);

	void confirmBookingTour(String email, short id);

}