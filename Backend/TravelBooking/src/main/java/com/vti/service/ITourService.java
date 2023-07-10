package com.vti.service;


import com.vti.dto.filter.TourFilter;
import com.vti.dto.tour.TourFormForCreating;
import com.vti.dto.tour.TourFormForUpdating;
import com.vti.entity.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ITourService {
    Page<Tour> getAllTours(Pageable pageable, TourFilter filter, String search);

    boolean isTourExistsById(short id);

    boolean isTourExistsByName(String name);

    void createTour(TourFormForCreating form);

    Tour getTourByID(short id);

    void updateTour(short id, TourFormForUpdating form);

    void deleteTours(List<Short> ids);
}
