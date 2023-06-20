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

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;


@Data
@Getter
@Setter
@Entity
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
	@JoinColumn(name = "tourID")
	private Tour tour;

	@Column(name = "startDate")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createDate;

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
	
	public Trip() {
		super();
	}
}
