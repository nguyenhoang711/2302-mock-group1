package com.vti.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vti.dto.bookingContact.BookingContactFormForCreating;
import com.vti.dto.bookingContact.BookingContactFormForUpdating;
import com.vti.entity.BookingContact;
import com.vti.repository.BookingContactRepository;

@Service
@Component
@Transactional
public class BookingContactService implements IBookingContactService{
	@Autowired
	private BookingContactRepository repository;
	
	@Override
	public void createBookingContact(BookingContactFormForCreating form) {
		repository.save(form.toEntity());
	}
	
	@Override
	public BookingContact findByEmail(String email) {
		return repository.findByEmail(email);
	}
	
	@Override
	public boolean existByEmail(String email) {
		return repository.existsByEmail(email);
	}
	
	@Override
	public void updateBookingContact(short id, BookingContactFormForUpdating form) {
		BookingContact entity = repository.findById(id).get();
		entity.setFullName(form.getFullName());
		entity.setPhoneNumber(form.getPhoneNumber());
		entity.setAddress(form.getAddress());
		repository.save(entity);
	}
}
