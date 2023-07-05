package com.vti.service;

import com.vti.dto.bookingContact.BookingContactFormForCreating;
import com.vti.dto.bookingContact.BookingContactFormForUpdating;
import com.vti.entity.BookingContact;


public interface IBookingContactService {
    void createBookingContact(BookingContactFormForCreating form);
    
    BookingContact findByEmail(String email);
    
	boolean existByEmail(String email);
	
	void updateBookingContact(short id, BookingContactFormForUpdating form);
}
