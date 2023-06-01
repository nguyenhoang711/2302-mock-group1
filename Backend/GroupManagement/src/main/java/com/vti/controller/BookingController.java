package com.vti.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vti.dto.booking.BookingFormForCreating;
import com.vti.dto.booking.BookingFormForUpdating;
import com.vti.dto.filter.BookingFilter;
import com.vti.entity.Booking;
import com.vti.service.IBookingService;

@RestController
@RequestMapping(value = "api/v1/bookings")
public class BookingController {
	@Autowired
	private IBookingService service;

	@GetMapping()
	public ResponseEntity<?> getAllBookings(
			Pageable pageable, 
			BookingFilter filter,
			@RequestParam(required = false) 
			String search) {
		Page<Booking> entities = service.getAllBookings(pageable, filter, search);
		return new ResponseEntity<>(entities, HttpStatus.OK);
	}

	@GetMapping(value = "/id/{id}")
	public ResponseEntity<?> existsBookingById(@PathVariable(name = "id") short id) {
		return new ResponseEntity<>(service.isBookingExistsById(id), HttpStatus.OK);
	}

	@PostMapping()
	public ResponseEntity<?> createBooking(@RequestBody BookingFormForCreating form) {
		service.createBooking(form);
		return new ResponseEntity<String>("Create successfully!", HttpStatus.OK);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<?> getBookingByID(@PathVariable(name = "id") short id) {
		return new ResponseEntity<>(service.getBookingByID(id), HttpStatus.OK);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<?> updateBooking(@PathVariable(name = "id") short id, @RequestBody BookingFormForUpdating form) {
		service.updateBooking(id, form);
		return new ResponseEntity<String>("Update successfully!", HttpStatus.OK);
	}

	@DeleteMapping(value = "/{ids}")
	public ResponseEntity<?> deleteBookings(@PathVariable(name = "ids") List<Short> ids) {
		service.deleteBookings(ids);
		return new ResponseEntity<String>("Delete successfully!", HttpStatus.OK);
	}
}
