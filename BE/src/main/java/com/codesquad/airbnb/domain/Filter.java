package com.codesquad.airbnb.domain;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

public class Filter {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate checkIn;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate checkOut;

    private int adults;

    private int children;

    private int infants;

    private int priceMin;

    private int priceMax;

    private int itemsOffset;

    public void setCheckIn(LocalDate checkIn) {
        this.checkIn = checkIn;
    }

    public void setCheckOut(LocalDate checkOut) {
        this.checkOut = checkOut;
    }

    public void setAdults(int adults) {
        this.adults = adults;
    }

    public void setChildren(int children) {
        this.children = children;
    }

    public void setInfants(int infants) {
        this.infants = infants;
    }

    public void setPriceMin(int priceMin) {
        this.priceMin = priceMin;
    }

    public void setPriceMax(int priceMax) {
        this.priceMax = priceMax;
    }

    public void setItemsOffset(int itemsOffset) {
        this.itemsOffset = itemsOffset;
    }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public int getPeriod() {
        return checkIn.until(checkOut).getDays();
    }
}
