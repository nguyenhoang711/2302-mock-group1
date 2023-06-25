package com.vti.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.vti.entity.Trip;


public interface ITripRepository extends JpaRepository<Trip, Short>, JpaSpecificationExecutor<Trip> {

	boolean existsById(Short id);
	
	Trip findByid(Short id);
}
