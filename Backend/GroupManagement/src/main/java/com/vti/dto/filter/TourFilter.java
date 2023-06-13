package com.vti.dto.filter;

public class TourFilter {
    private double minPrice;

    private double maxPrice;

    private short minNumOfPeople;

    private short maxNumOfPeople;

    public TourFilter() {
    }

    public double getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(double minPrice) {
        this.minPrice = minPrice;
    }

    public double getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(double maxPrice) {
        this.maxPrice = maxPrice;
    }

    public short getMinNumOfPeople() {
        return minNumOfPeople;
    }

    public void setMinNumOfPeople(short minNumOfPeople) {
        this.minNumOfPeople = minNumOfPeople;
    }

    public short getMaxNumOfPeople() {
        return maxNumOfPeople;
    }

    public void setMaxNumOfPeople(short maxNumOfPeople) {
        this.maxNumOfPeople = maxNumOfPeople;
    }
}
