package com.vti.entity;

import java.io.Serializable;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Formula;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Entity
@Table(name = "`User`")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "`id`", unique = true, nullable = false)
	private short id;

//	@Column(name = "`username`", nullable = false, length = 50, unique = true)
//	private String userName;
	
	@Column(name = "`name`", nullable = false, length = 50, unique = true)
	private String name;
	
	@Column(name = "`email`", nullable = false, length = 50, unique = true)
	private String email;

	@Column(name = "`password`", nullable = false, length = 800)
	private String password;

//	@Column(name = "`firstName`", nullable = false, length = 50)
//	private String firstName;
//
//	@Column(name = "`lastName`", nullable = false, length = 50)
//	private String lastName;
//
//	@Formula("concat(firstName, ' ', lastName)")
//	private String fullName;

//	@Column(name = "role", nullable = false)
//	private String role = "Employee"
	
	@Column(name = "`address`", nullable = false, length = 50)
	private String address;
	
	@Column(name = "`phoneNumber`", nullable = false)
	private short phoneNumber;
	
	@Column(name = "`role`", nullable = false)
	@Enumerated(EnumType.ORDINAL)
	private UserStatus role = UserStatus.CUSTOMER;
	
	@Column(name = "`supervisor_Id`")
	private short supervisorId;

}