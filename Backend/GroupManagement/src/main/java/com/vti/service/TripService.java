package com.vti.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.vti.specification.TripSpecificationBuilder;


import com.vti.entity.Trip;
import com.vti.repository.ITripRepository;


@Service
public class TripService implements ITripService{
	@Autowired
	private ITripRepository repository;
	
	
	@Override
	public Page<Trip> getAllTrips(Pageable pageable, String search) {
		TripSpecificationBuilder specification = new TripSpecificationBuilder(search);

		return repository.findAll(specification.build(), pageable);
	}
	
	@Override
	public boolean isTripExistsById(short id) {
		return repository.existsById(id);
	}
	
	@Override
	public Trip getTripByID(short id) {
		return repository.findById(id).get();
	}
}
