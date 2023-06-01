package com.vti.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.vti.dto.filter.BookingFilter;
import com.vti.entity.Booking;

public class BookingSpecificationBuilder {
	private BookingFilter filter;
	private String search;

	public BookingSpecificationBuilder(BookingFilter filter, String search) {
		this.filter = filter;
		this.search = search;
	}
	
	@SuppressWarnings("deprecation")
	public Specification<Booking> build() {

		SearchCriteria seachCriteria = new SearchCriteria("name", "Like", search);

		Specification<Booking> where = null;

		// search
		if (!StringUtils.isEmpty(search)) {
			where = new BookingSpecification(seachCriteria);
		}


		return where;
	}
}
