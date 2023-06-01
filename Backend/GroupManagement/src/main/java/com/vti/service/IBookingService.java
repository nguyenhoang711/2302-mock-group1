package com.vti.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.dto.booking.BookingFormForCreating;
import com.vti.dto.booking.BookingFormForUpdating;
import com.vti.dto.filter.BookingFilter;
import com.vti.entity.Booking;

public interface IBookingService {

	Page<Booking> getAllBookings(Pageable pageable, BookingFilter filter, String search);

	boolean isBookingExistsById(short id);

	void createBooking(BookingFormForCreating form);

	Booking getBookingByID(short id);

	void updateBooking(short id, BookingFormForUpdating form);

	void deleteBookings(List<Short> ids);

}