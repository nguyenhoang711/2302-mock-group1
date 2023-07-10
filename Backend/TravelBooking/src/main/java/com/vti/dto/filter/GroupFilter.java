package com.vti.dto.filter;

public class GroupFilter {

	private int minTotalMember;

	private int maxTotalMember;

	public GroupFilter() {
	}

	public int getMinTotalMember() {
		return minTotalMember;
	}

	public void setMinTotalMember(int minTotalMember) {
		this.minTotalMember = minTotalMember;
	}

	public int getMaxTotalMember() {
		return maxTotalMember;
	}

	public void setMaxTotalMember(int maxTotalMember) {
		this.maxTotalMember = maxTotalMember;
	}

}
