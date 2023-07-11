package com.vti.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.entity.Trip;

import java.util.List;

public interface ITripService {
	
	Page<Trip> getAllTrips(Pageable pageable, String search);
	
	boolean isTripExistsById(short id);
	
	Trip getTripByID(short id);

	Trip getTripByTourId(short id);
	
}
