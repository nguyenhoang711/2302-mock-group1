package com.vti.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.vti.dto.filter.GroupFilter;
import com.vti.entity.Group;

public class GroupSpecificationBuilder {

	private GroupFilter filter;
	private String search;

	public GroupSpecificationBuilder(GroupFilter filter, String search) {
		this.filter = filter;
		this.search = search;
	}

	@SuppressWarnings("deprecation")
	public Specification<Group> build() {

		SearchCriteria seachCriteria = new SearchCriteria("name", "Like", search);
		SearchCriteria minTotalMemberCriteria = new SearchCriteria("totalMember", ">=", filter.getMinTotalMember());
		SearchCriteria maxTotalMemberCriteria = new SearchCriteria("totalMember", "<=", filter.getMaxTotalMember());

		Specification<Group> where = null;

		// search
		if (!StringUtils.isEmpty(search)) {
			where = new GroupSpecification(seachCriteria);
		}

		// min totalMember filter
		if (filter.getMinTotalMember() != 0) {
			if (where != null) {
				where = where.and(new GroupSpecification(minTotalMemberCriteria));
			} else {
				where = new GroupSpecification(minTotalMemberCriteria);
			}
		}

		// max totalMember filter
		if (filter.getMaxTotalMember() != 0) {
			if (where != null) {
				where = where.and(new GroupSpecification(maxTotalMemberCriteria));
			} else {
				where = new GroupSpecification(maxTotalMemberCriteria);
			}
		}

		return where;
	}
}
