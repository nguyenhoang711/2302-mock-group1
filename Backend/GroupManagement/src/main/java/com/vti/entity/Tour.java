package com.vti.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import com.vti.entity.User.Role;

import java.io.Serializable;

@Entity
@Table(name = "Tour")
@Data
@Getter
@Setter
public class Tour implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`", unique = true, nullable = false)
    private short id;

    @Column(name = "`name`", nullable = false, length = 200, unique = true)
    private String name;

    @Column(name = "`price`", nullable = false)
    private double price;

    @Column(name = "`duration`", nullable = false, length = 800)
    private String duration;

    @Column(name = "`numOfPeople`", nullable = false)
    private short numOfPeople;

    @Enumerated(EnumType.STRING)
    @Column(name = "`type`", nullable = false)
    private Type type;

    @Column(name = "`details`", nullable = false, length = 500)
    private String details;

    @Column(name = "`saleRate`", nullable = false)
    private double saleRate;
}
