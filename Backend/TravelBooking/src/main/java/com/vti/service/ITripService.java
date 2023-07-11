package com.vti.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.entity.Trip;

public interface ITripService {
	
	Page<Trip> getAllTrips(Pageable pageable, String search);
	
	boolean isTripExistsById(short id);
	
	Trip getTripByID(short id);

	List<Trip> getTripByTourId(short id);
}
