package com.vti.specification;

public class SearchCriteria {
	private String key;
	private String operator;
	private Object value;

	public SearchCriteria(String key, String operator, Object value) {
		this.key = key;
		this.operator = operator;
		this.value = value;
	}

	public String getKey() {
		return key;
	}

	public String getOperator() {
		return operator;
	}

	public Object getValue() {
		return value;
	}

}
