package com.vti.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
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
	
	@ManyToOne
	@JoinColumn(name = "bookingContactId", referencedColumnName = "id", nullable = false)
	private BookingContact bookingContact;
	

	@Column(name = "numOfPeople", nullable = false)
	private short numOfPeople;

	@Column(name = "totalPrice", nullable = false)
	private int totalPrice;

	@Column(name = "timeBooking")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date timeBooking;

	@Column(name = "amountPaid", nullable = false)
	private int amountPaid;

	@Column(name = "`bookingStatus`", nullable = false, columnDefinition = "NVARCHAR(50) DEFAULT 'Chưa thanh toán'")
	private String bookingStatus;

	@Column(name = "details", columnDefinition = "TEXT")
	private String details;

	public Booking(short tripId, short userId, short bookingContactId, short numOfPeople, int totalPrice, Date timeBooking, int amountPaid,
				   String bookingStatus, String details) {
		super();
		this.trip = new Trip();
		this.trip.setId(tripId);
		this.user = new User();
		this.user.setId(userId);
		this.bookingContact = new BookingContact();
		this.bookingContact.setId(bookingContactId);
		this.numOfPeople = numOfPeople;
		this.totalPrice = totalPrice;
		this.timeBooking = timeBooking;
		this.amountPaid = amountPaid;
		this.bookingStatus = bookingStatus;
		this.details = details;
	}
	
	public void setTripId(short tripId) {
		this.trip = new Trip();
		this.trip.setId(tripId);
	}
	
	public void setUserId(short userId) {
		this.user = new User();
		this.user.setId(userId);
	}
	
	public void setBookingContactId(short bookingContactId) {
		this.bookingContact = new BookingContact();
		this.bookingContact.setId(bookingContactId);
	}

}
