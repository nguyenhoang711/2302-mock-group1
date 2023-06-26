package com.vti.entity;


import lombok.*;

import javax.persistence.*;

import java.io.Serializable;
import java.util.List;


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

    @Column(name = "`name`", nullable = false, length = 400, unique = true)
    @NonNull
    private String name;

    @Column(name = "`price`", nullable = false)
    @NonNull
    private double price;

    @Column(name = "`duration`", nullable = false, length = 80)
    @NonNull
    private String duration;

    @Column(name = "`numOfPeople`", nullable = false)
    @NonNull
    private short numOfPeople;

    public enum Type {
        LUXURY,STANDARD, GOOD_PRICE, PAY_LESS;
        public static Tour.Type toEnum(String name) {
            for (Tour.Type item : Tour.Type.values()) {
                if (item.toString().equals(name))
                    return item;
            }
            return null;
        }
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "`type`", nullable = false)
    @NonNull
    private Type type;

    @Column(name = "startDest", nullable = false, length= 50)
    @NonNull
    private String startDest;

    @Column(name = "img1_url", length = 200)
    private String image1;

    @Column(name = "img2_url", length = 200)
    private String image2;

    @Column(name = "img3_url", length = 200)
    private String image3;

    @Column(name = "img4_url", length = 200)
    private String image4;

    @Column(name = "thumbnailUrl", length = 200)
    private String thumbnail;

    @Column(name = "`details`", length = 900, nullable = false)
    @NonNull
    private String details;

    @Column(name = "`saleRate`", nullable = false)
    @NonNull
    private double saleRate;

}
