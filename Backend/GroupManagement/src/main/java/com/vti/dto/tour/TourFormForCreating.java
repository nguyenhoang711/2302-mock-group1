package com.vti.dto.tour;

import com.vti.entity.Tour;
import lombok.Data;

@Data
public class TourFormForCreating {
    private String name;

    private String duration;

    private short numOfPeople;

    private double price;

    private String type;

    private double saleRate;

    private String startDest;

    private String details;

    public Tour toEntity(){return new Tour(name,price,duration,numOfPeople, Tour.Type.toEnum(type),startDest,details,saleRate);}

    @Override
    public String toString() {
        return "TourFormForCreating{" +
                "name='" + name + '\'' +
                ", duration='" + duration + '\'' +
                ", numOfPeople=" + numOfPeople +
                ", price=" + price +
                ", type='" + type + '\'' +
                ", saleRate=" + saleRate +
                ", startDest='" + startDest + '\'' +
                ", details='" + details + '\'' +
                '}';
    }
}
