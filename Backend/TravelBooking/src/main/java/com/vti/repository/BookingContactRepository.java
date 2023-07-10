package com.vti.repository;

import com.vti.entity.BookingContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BookingContactRepository extends JpaRepository<BookingContact, Short>, JpaSpecificationExecutor<BookingContact> {
	public BookingContact findByEmail(String email);
	
	public boolean existsByEmail(String email);
}
