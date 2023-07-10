package com.vti.specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;

import com.vti.entity.Tour;
import org.springframework.data.jpa.domain.Specification;
import com.vti.entity.Booking;
import com.vti.entity.Trip;

public class BookingSpecificationBuilder {

	public String search;

	public BookingSpecificationBuilder(String search) {
		this.search = search;
	}

	public Specification<Booking> build() {
		return (root, query, criteriaBuilder) -> {
			Join<Booking, Trip> tripJoin = root.join("trip", JoinType.INNER);
			Join<Trip, Tour> tourJoin = tripJoin.join("tour", JoinType.INNER);

			Predicate tourName = criteriaBuilder.like(tourJoin.get("name"), "%" + search + "%");

			return tourName;
		};
	}

}
