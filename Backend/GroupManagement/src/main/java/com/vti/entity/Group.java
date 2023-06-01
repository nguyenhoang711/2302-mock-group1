package com.vti.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "`Group`")
public class Group implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private short id;

	@Column(name = "`name`", length = 50, nullable = false, unique = true)
	private String name;

	@Column(name = "totalMember")
	private short totalMember;

	public Group() {
	}
	
	public Group(String name) {
		this.name = name;
	}

	public short getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public short getTotalMember() {
		return totalMember;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setTotalMember(short totalMember) {
		this.totalMember = totalMember;
	}
	
}
