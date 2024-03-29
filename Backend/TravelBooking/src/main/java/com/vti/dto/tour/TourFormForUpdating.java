package com.vti.dto.tour;

import com.vti.entity.Tour;

public class TourFormForUpdating {
    private String name;

    private double price;

//    private String duration;

    private short day;

    private short night;

    private short numOfPeople;

    private String type;

    private String thumbnail;

    private String image1;

    private String image2;

    private String image3;

    private String image4;

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
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

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getImage1() {
        return image1;
    }

    public void setImage1(String image1) {
        this.image1 = image1;
    }

    public String getImage2() {
        return image2;
    }

    public void setImage2(String image2) {
        this.image2 = image2;
    }

    public String getImage3() {
        return image3;
    }

    public void setImage3(String image3) {
        this.image3 = image3;
    }

    public String getImage4() {
        return image4;
    }

    public void setImage4(String image4) {
        this.image4 = image4;
    }
}
