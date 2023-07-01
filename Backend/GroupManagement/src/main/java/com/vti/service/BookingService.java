package com.vti.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vti.dto.booking.BookingFormForCreating;
import com.vti.dto.booking.BookingFormForUpdateStatus;
import com.vti.dto.booking.BookingFormForUpdating;
import com.vti.entity.Booking;
import com.vti.repository.BookingRepository;
import com.vti.specification.BookingSpecificationBuilder;

@Service
public class BookingService implements IBookingService {
	@Autowired
	private BookingRepository repository;

	@Override
	public Page<Booking> getAllBookings(Pageable pageable, String search) {
		BookingSpecificationBuilder specification = new BookingSpecificationBuilder(search);

		return repository.findAll(specification.build(), pageable);
	}

	@Override
	public boolean isBookingExistsById(short id) {
		return repository.existsById(id);
	}

	@Override
	public void createBooking(BookingFormForCreating form) {
		repository.save(form.toEntity());
	}

	@Override
	public Booking getBookingByID(short id) {
		return repository.findById(id).get();
	}

	@Override
	public void updateBooking(short id, BookingFormForUpdating form) {
		Booking entity = repository.findById(id).get();
		entity.setTripId(form.getTripId());
		entity.setUserId(form.getUserId());
		entity.setNumOfPeople(form.getNumOfPeople());
		entity.setTotalPrice(form.getTotalPrice());
		entity.setDetails(form.getDetails());
		repository.save(entity);
	}

	@Override
	public void updateBookingStatus(short id, BookingFormForUpdateStatus form) {
		Booking entity = repository.findById(id).get();
		entity.setBookingStatus(form.getBookingStatus());
		entity.setAmountPaid(form.getAmountPaid());
		repository.save(entity);
	}

	@Transactional
	public void deleteBookings(List<Short> ids) {
		repository.deleteByIdIn(ids);
	}

}
