package com.vti.dto.tour;

import com.vti.entity.Tour;


public class TourFormForCreating {
    private String name;

    private String duration;

    private short numOfPeople;

    private double price;

    private Tour.Type type;

    private String details;

    private double saleRate;

    public Tour toEntity(){return new Tour(name,price,duration,numOfPeople,type);}
}
