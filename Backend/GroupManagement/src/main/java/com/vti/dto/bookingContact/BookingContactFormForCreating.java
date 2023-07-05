package com.vti.dto.bookingContact;

import com.vti.entity.BookingContact;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BookingContactFormForCreating {
    private String fullName;
    private String email;
    private String phoneNumber;
    private String address;

    public BookingContact toEntity() {
        return new BookingContact(fullName, email, phoneNumber, address);
    }
}
