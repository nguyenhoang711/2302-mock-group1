package com.vti.repository;


import com.vti.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.vti.entity.Trip;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ITripRepository extends JpaRepository<Trip, Short>, JpaSpecificationExecutor<Trip> {

	boolean existsById(Short id);
	
	Trip findByid(Short id);

	@Query("SELECT o FROM Trip o WHERE o.tour.id = :tourId")
	Trip findByTourId(@Param("tourId") Short tourId);
}
