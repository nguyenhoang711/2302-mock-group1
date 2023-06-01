package com.vti.entity;

import javax.persistence.*;

@Entity
@Table(name = "Trip")
public class Trip {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private short id;

    @Column(name = "name", nullable = false)
    private String name;

	public short getId() {
		return id;
	}

	public void setId(short id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Trip(String name) {
		super();
		this.name = name;
	}

	public Trip() {

	}
    
	
    
}
