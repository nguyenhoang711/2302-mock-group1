package com.vti.service;

import com.vti.dto.filter.TourFilter;
import com.vti.dto.tour.TourFormForCreating;
import com.vti.dto.tour.TourFormForUpdating;
import com.vti.entity.Tour;
import com.vti.repository.ITourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class TourService implements ITourService{
    @Autowired
    private ITourRepository repository;

    @Override
    public Page<Tour> getAllTours(Pageable pageable, TourFilter filter, String search) {
        return null;
    }

    @Override
    public boolean isTourExistsById(short id) {
        return false;
    }

    @Override
    public void createTour(TourFormForCreating form) {

    }

    @Override
    public Tour getTourByID(short id) {
        return null;
    }

    @Override
    public void updateTour(short id, TourFormForUpdating form) {

    }

    @Override
    public void deleteTours(List<Short> ids) {

    }
}
