package com.vti.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.*;

@Entity
@Table(name = "`Booking`")
public class Booking implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private short id;

	@ManyToOne
	@JoinColumn(name = "tripId", referencedColumnName = "id", nullable = false)
	private Trip trip;

	@ManyToOne
	@JoinColumn(name = "userId", referencedColumnName = "id", nullable = false)
	private User user;

	@Column(name = "numOfPeople", nullable = false)
	private short numOfPeople;

	@Column(name = "totalPrice", nullable = false)
	private int totalPrice;

	@Column(name = "details", columnDefinition = "TEXT")
	private String details;

	public Booking() {
	}

	public Booking(short tripId, short userId, short numOfPeople, int totalPrice, String details) {
		super();
		this.trip = new Trip();
		this.trip.setId(tripId);
		this.user = new User();
		this.user.setId(userId);
		this.numOfPeople = numOfPeople;
		this.totalPrice = totalPrice;
		this.details = details;
	}

	public short getId() {
		return id;
	}

	public void setId(short id) {
		this.id = id;
	}

	public Trip getTrip() {
		return trip;
	}

	public void setTrip(Trip trip) {
		this.trip = trip;
	}

	public void setTripId(short tripId) {
		this.trip = new Trip();
		this.trip.setId(tripId);
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void setUserId(short userId) {
		this.user = new User();
		this.user.setId(userId);
	}

	public short getNumOfPeople() {
		return numOfPeople;
	}

	public void setNumOfPeople(short numOfPeople) {
		this.numOfPeople = numOfPeople;
	}

	public int getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

}
