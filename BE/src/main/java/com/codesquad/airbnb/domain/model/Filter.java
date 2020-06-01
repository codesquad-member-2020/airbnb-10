package com.codesquad.airbnb.domain.model;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class Filter {

    @DateTimeFormat(pattern = "yyyy-M-d")
    private LocalDate checkIn;

    @DateTimeFormat(pattern = "yyyy-M-d")
    private LocalDate checkOut;

    private int adults;

    private int children;

    private int infants;

    private int priceMin;

    private int priceMax;

    private int itemsOffset;

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(LocalDate checkIn) {
        this.checkIn = checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(LocalDate checkOut) {
        this.checkOut = checkOut;
    }

    public int getAdults() {
        return adults;
    }

    public void setAdults(int adults) {
        this.adults = adults;
    }

    public int getChildren() {
        return children;
    }

    public void setChildren(int children) {
        this.children = children;
    }

    public int getInfants() {
        return infants;
    }

    public void setInfants(int infants) {
        this.infants = infants;
    }

    public int getPriceMin() {
        return priceMin;
    }

    public void setPriceMin(int priceMin) {
        this.priceMin = priceMin;
    }

    public int getPriceMax() {
        return priceMax;
    }

    public void setPriceMax(int priceMax) {
        this.priceMax = priceMax;
    }

    public int getItemsOffset() {
        return itemsOffset;
    }

    public void setItemsOffset(int itemsOffset) {
        this.itemsOffset = itemsOffset;
    }

    public long getPeriod() {
        return ChronoUnit.DAYS.between(checkIn, checkOut);
    }

    public int getPeople() {
        return adults + children / 2;
    }
}
