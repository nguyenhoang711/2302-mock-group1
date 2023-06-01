package com.vti.entity;

import java.io.Serializable;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Entity
@Table(name = "Trip")
public class Trip implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "`id`", unique = true, nullable = false)
	private short id;

	@Column(name = "`name`", nullable = false, length = 50, unique = true)
	private String name;

	@ManyToOne
	@JoinColumn(name = "TourID")
	private Tour tour;

	@Column(name = "startDate")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createDate;

	@Column(name = "endDate")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date endDate;

	@Column(name = "`startPoint`", nullable = false, length = 50)
	private String startPoint;

	@Column(name = "gatherDate")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date gatherDate;

	@Column(name = "`hotel`", nullable = false, length = 50)
	private String hotel;
	
    
}
