package com.vti.dto.tour;

import com.vti.entity.Tour;
import lombok.Data;

@Data
public class TourFormForCreating {
    private String name;

//    private String duration;

    private short day;

    private short night;

    private short numOfPeople;

    private double price;

    private String type;

    private double saleRate;

    private String startDest;

    private String details;

    private String thumbnail;

    private String image1;

    private String image2;

    private String image3;

    private String image4;

//    public Tour toEntity(){return new Tour(name,price,duration,numOfPeople, Tour.Type.toEnum(type),startDest,details,saleRate);}

    public Tour toEntity(){return new Tour(name,price,day,night,numOfPeople, Tour.Type.toEnum(type), startDest,
            thumbnail, image1,image2,image3,image4,
            details,saleRate);}
}
