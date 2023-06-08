package com.vti.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "Tour")
@Data
@NoArgsConstructor
public class Tour implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`", unique = true)
    private short id;

    @Column(name = "`name`", nullable = false, length = 200, unique = true)
    private String name;

    @Column(name = "`price`", nullable = false)
    private double price;

    @Column(name = "`duration`", nullable = false, length = 800)
    private String duration;

    @Column(name = "`numOfPeople`", nullable = false)
    private short numOfPeople;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "`type`", nullable = false)
    private Type type;

    @Column(name = "`details`", nullable = false, length = 500)
    private String details;

    @Column(name = "`saleRate`")
    private double saleRate;
}
