package com.vti.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vti.dto.booking.BookingFormForUpdating;
import com.vti.dto.bookingContact.BookingContactFormForCreating;
import com.vti.dto.bookingContact.BookingContactFormForUpdating;
import com.vti.entity.BookingContact;
import com.vti.service.IBookingContactService;

@RestController
@RequestMapping(value = "api/v1/bookingContacts")
public class BookingContactController {
	@Autowired
	IBookingContactService service; 
	
	@PostMapping
	public ResponseEntity<?> createBookingContact(@RequestBody BookingContactFormForCreating form) {
		service.createBookingContact(form);
		return new ResponseEntity<String>("Create successfully!", HttpStatus.OK);
	}
	
	@GetMapping(value = "/findByEmail/{email}")
	public ResponseEntity<?> findByEmail(@PathVariable(name = "email") String email) {
		BookingContact result = service.findByEmail(email);

		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping(value = "/email/{email}")
	public ResponseEntity<?> existByEmail(@PathVariable(name = "email") String email) {

		boolean result = service.existByEmail(email);

		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<?> updateBookingContact(@PathVariable(name = "id") short id, @RequestBody BookingContactFormForUpdating form) {
		service.updateBookingContact(id, form);
		return new ResponseEntity<String>("Update successfully!", HttpStatus.OK);
	}
}
