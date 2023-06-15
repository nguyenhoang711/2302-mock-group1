package com.vti.entity;


import lombok.*;

import javax.persistence.*;

import java.io.Serializable;


@Entity
@Data
@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
@Table(name = "Tour")
public class Tour implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`", unique = true)
    private short id;

    @Column(name = "`name`", nullable = false, length = 200, unique = true)
    @NonNull
    private String name;

    @Column(name = "`price`", nullable = false)
    @NonNull
    private double price;

    @Column(name = "`duration`", nullable = false, length = 800)
    @NonNull
    private String duration;

    @Column(name = "`numOfPeople`", nullable = false)
    @NonNull
    private short numOfPeople;

    @Enumerated(EnumType.STRING)
    @Column(name = "`type`", nullable = false)
    @NonNull
    private Type type;

    @Column(name = "`details`", length = 500)
    private String details;

    @Column(name = "`saleRate`")
    private double saleRate;
}
