package com.vti.entity;

import java.io.Serializable;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;


@Entity
@Getter
@Setter
@Table(name = "Trip")
//xóa bỏ thuộc tính điểm xuất phát
//bổ sung thông tin người phụ trách
//dùng thuộc tính 'name' thay là tên người phụ trách
public class Trip implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "`id`", unique = true, nullable = false)
	private short id;

	@ManyToOne
	@JoinColumn(name = "tourId")
	private Tour tour;

	@Column(name = "`curatorName`", nullable = false, length = 50)
	private String curatorName;

	@Column(name = "startDate")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date startDate;

	@Column(name = "endDate")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date endDate;

	@Column(name = "gatherDate")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date gatherDate;

	@Column(name = "`hotel`", nullable = false, length = 50)
	private String hotel;

//	@OneToMany(mappedBy = "trip")
//	private List<Booking> bookings;

	public Trip() {

	}

}
