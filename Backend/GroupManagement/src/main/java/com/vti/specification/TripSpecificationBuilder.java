package com.vti.specification;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import org.springframework.util.StringUtils;


import com.vti.entity.Trip;

public class TripSpecificationBuilder {
	public String search;

	public TripSpecificationBuilder(String search) {
		this.search = search;
	}
	
	public Specification<Trip> build() {
		SearchCriteria seachCriteria = new SearchCriteria("name", "Like", search);
		
		Specification<Trip> where = null;

		// search
		if (!StringUtils.isEmpty(search)) {
			where = new TripSpecification(seachCriteria);
		}
		
		return where;
	}
}
