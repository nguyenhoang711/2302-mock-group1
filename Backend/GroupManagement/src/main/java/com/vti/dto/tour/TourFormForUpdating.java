package com.vti.dto.tour;

import com.vti.entity.Type;

public class TourFormForUpdating {
    private String name;

    private double price;

    private String duration;

    private short numOfPeople;

    private Type type;

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

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public short getNumOfPeople() {
        return numOfPeople;
    }

    public void setNumOfPeople(short numOfPeople) {
        this.numOfPeople = numOfPeople;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
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
