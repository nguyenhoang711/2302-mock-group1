package com.vti.specification;

import com.vti.dto.filter.TourFilter;
import com.vti.entity.Tour;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class TourSpecificationBuilder {
    private TourFilter filter;

    private String search;

    public TourSpecificationBuilder(TourFilter filter, String search) {
        this.filter = filter;
        this.search = search;
    }

    @SuppressWarnings("deprecation")
    public Specification<Tour> build() {

        SearchCriteria searchCriteria = new SearchCriteria("name", "Like", search);
        SearchCriteria searchCriteria2 = new SearchCriteria("type", "Like", search);
        SearchCriteria minNumOfPeople = new SearchCriteria("numOfPeople", ">=", filter.getMinNumOfPeople());
        SearchCriteria maxNumOfPeople = new SearchCriteria("numOfPeople", "<=", filter.getMaxNumOfPeople());
        SearchCriteria minPrice = new SearchCriteria("price", ">=", filter.getMinPrice());
        SearchCriteria maxPrice = new SearchCriteria("price", "<=", filter.getMaxPrice());

        Specification<Tour> where = null;

        // search
        if (!StringUtils.isEmpty(search)) {
            where = new TourSpecification(searchCriteria).and(new TourSpecification(searchCriteria2));
        }

//        min price filter
        if(filter.getMinPrice() != 0){
            if(where != null){
                where = where.and(new TourSpecification(minPrice));
            }
            else{
                where = new TourSpecification(minPrice);
            }
        }

//        max price filter
        if(filter.getMaxPrice() != 0){
            if(where != null){
                where = where.and(new TourSpecification(maxPrice));
            }
            else{
                where = new TourSpecification(maxPrice);
            }
        }

        // min num of people filter
        if (filter.getMinNumOfPeople() != 0) {
            if (where != null) {
                where = where.and(new TourSpecification(minNumOfPeople));
            } else {
                where = new TourSpecification(minNumOfPeople);
            }
        }

        // max num of people filter
        if (filter.getMaxNumOfPeople() != 0) {
            if (where != null) {
                where = where.and(new TourSpecification(maxNumOfPeople));
            } else {
                where = new TourSpecification(maxNumOfPeople);
            }
        }

        return where;
    }
}
