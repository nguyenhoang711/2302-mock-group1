package com.vti.service;

import com.vti.dto.filter.TourFilter;
import com.vti.dto.tour.TourFormForCreating;
import com.vti.dto.tour.TourFormForUpdating;
import com.vti.entity.Tour;
import com.vti.repository.ITourRepository;
import com.vti.specification.TourSpecificationBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TourService implements ITourService{
    @Autowired
    private ITourRepository repository;

    @Override
    public Page<Tour> getAllTours(Pageable pageable, TourFilter filter, String search) {
        TourSpecificationBuilder specification = new TourSpecificationBuilder(filter, search);

        return repository.findAll(specification.build(), pageable);
    }

    @Override
    public boolean isTourExistsById(short id) {
        return repository.existsById(id);
    }

    @Override
    public void createTour(TourFormForCreating tour) {
        repository.save(tour.toEntity());
    }

    @Override
    public Tour getTourByID(short id) {
        return null;
    }

    @Override
    public void updateTour(short id, TourFormForUpdating form) {
        Tour entity = repository.findById(id).get();
        entity.setName(form.getName());
        entity.setPrice(form.getPrice());
        entity.setNumOfPeople(form.getNumOfPeople());
        entity.setDuration(form.getDuration());
        entity.setType(form.getType());
        entity.setDetails(form.getDetails());
        entity.setSaleRate(form.getSaleRate());
        repository.save(entity);
    }

    @Override
    public void deleteTours(List<Short> ids) {
        repository.deleteByIdIn(ids);
    }
}
