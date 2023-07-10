package com.vti.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.vti.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Short>, JpaSpecificationExecutor<Booking> {

	public Booking findByid(Short id);

	public boolean existsById(Short id);

	public void deleteByIdIn(List<Short> ids);
}
