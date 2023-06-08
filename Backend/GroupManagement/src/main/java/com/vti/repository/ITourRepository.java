package com.vti.repository;

import com.vti.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ITourRepository extends JpaRepository<Tour, Short>, JpaSpecificationExecutor<Tour> {
    public Tour findByName(String name);

    public boolean existsById(Short id);

    public void deleteByIdIn(List<Short> ids);
}
