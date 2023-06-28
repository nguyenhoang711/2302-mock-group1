package com.vti.dto.tour;

import com.vti.entity.Tour;

public class TourFormForUpdating {
    private String name;

    private double price;

//    private String duration;

    private short day;

    private short night;

    private short numOfPeople;

    private Tour.Type type;

    private String details;

    private double saleRate;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

//    public String getDuration() {
//        return duration;
//    }
//
//    public void setDuration(String duration) {
//        this.duration = duration;
//    }


    public short getDay() {
        return day;
    }

    public void setDay(short day) {
        this.day = day;
    }

    public short getNight() {
        return night;
    }

    public void setNight(short night) {
        this.night = night;
    }

    public short getNumOfPeople() {
        return numOfPeople;
    }

    public void setNumOfPeople(short numOfPeople) {
        this.numOfPeople = numOfPeople;
    }

    public Tour.Type getType() {
        return type;
    }

    public void setType(Tour.Type type) {
        this.type = type;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public double getSaleRate() {
        return saleRate;
    }

    public void setSaleRate(double saleRate) {
        this.saleRate = saleRate;
    }
}
