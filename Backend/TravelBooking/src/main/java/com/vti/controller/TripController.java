package com.vti.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vti.dto.filter.TripFilter;
import com.vti.entity.Trip;
import com.vti.service.ITripService;



@RestController
@RequestMapping("/api/v1/trips")
public class TripController {
    @Autowired
    private ITripService service;

    @GetMapping()
    public ResponseEntity<?> getAllTrips(
            Pageable pageable,
//            TripFilter filter,
            @RequestParam(required = false)
            String search) {
        Page<Trip> entities = service.getAllTrips(pageable, search);
        return new ResponseEntity<>(entities, HttpStatus.OK);
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<?> existsTripById(@PathVariable(name = "id") short id) {
        return new ResponseEntity<>(service.isTripExistsById(id), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getTripByID(@PathVariable(name = "id") short id){
        return new ResponseEntity<>(service.getTripByID(id), HttpStatus.OK);
    }

    @GetMapping(value = "/{tourId}")
    public ResponseEntity<?> getTripByTourID(@PathVariable(name = "tourId") short id) {
        return new ResponseEntity<>(service.getTripByTourId(id), HttpStatus.OK);
    }
}







