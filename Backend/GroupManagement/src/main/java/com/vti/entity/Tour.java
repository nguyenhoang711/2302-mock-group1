package com.vti.entity;

import javax.persistence.*;
import java.io.Serializable;
import lombok.Data;

@Entity
@Table(name = "Tour")
@Data
public class Tour implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`", unique = true, nullable = false)
    private int id;

    @Column(name = "`name`", nullable = false, length = 200, unique = true)
    private String name;

    @Column(name = "`price`", nullable = false)
    private double price;

    @Column(name = "`duration`", nullable = false, length = 800)
    private String duration;

    @Column(name = "`numOfPeople`", nullable = false)
    private int numOfPeople;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "`type`", nullable = false)
    private Type type;
}
