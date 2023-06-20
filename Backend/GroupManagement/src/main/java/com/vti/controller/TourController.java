package com.vti.controller;


import com.vti.dto.filter.TourFilter;
import com.vti.dto.tour.TourFormForCreating;
import com.vti.dto.tour.TourFormForUpdating;
import com.vti.entity.Tour;
import com.vti.service.ITourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tours")
public class TourController {
    @Autowired
    private ITourService service;

    @GetMapping()
    public ResponseEntity<?> getAllTours(
            Pageable pageable,
            TourFilter filter,
            @RequestParam(required = false)
                    String search) {
        Page<Tour> entities = service.getAllTours(pageable, filter, search);
        return new ResponseEntity<>(entities, HttpStatus.OK);
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<?> existsTourById(@PathVariable(name = "id") short id) {
        return new ResponseEntity<>(service.isTourExistsById(id), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> createTour(@RequestBody TourFormForCreating form) {
        service.createTour(form);
        return new ResponseEntity<String>("Create tour successfully!", HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getTourByID(@PathVariable(name = "id") short id) {
        return new ResponseEntity<>(service.getTourByID(id), HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<?> updateTour(@PathVariable(name = "id") short id, @RequestBody TourFormForUpdating form) {
        service.updateTour(id, form);
        return new ResponseEntity<String>("Update tour successfully!", HttpStatus.OK);
    }

    @DeleteMapping(value = "/{ids}")
    public ResponseEntity<?> deleteTours(@PathVariable(name = "ids") List<Short> ids) {
        service.deleteTours(ids);
        return new ResponseEntity<String>("Delete tour successfully!", HttpStatus.OK);
    }
}
