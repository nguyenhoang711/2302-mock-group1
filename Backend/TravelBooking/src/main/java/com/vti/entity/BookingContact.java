package com.vti.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@Table(name = "`BookingContact`")
public class BookingContact implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private short id;

    @Column(name = "`fullName`", nullable = false, length = 50)
    private String fullName;

    @Column(name = "`email`", nullable = false, length = 100, unique = true)
    private String email;

    @Column(name = "`phoneNumber`", nullable = false, length = 15)
    private String phoneNumber;

    @Column(name = "`address`", length = 100)
    private String address;

    public BookingContact(String fullName, String email, String phoneNumber, String address) {
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}
