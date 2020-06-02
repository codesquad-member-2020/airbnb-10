package com.codesquad.airbnb.domain.model;

import java.io.FileOutputStream;
import java.util.List;

public class Accommodation {

    private Integer id;

    private String name;

    private boolean isSuperHost;

    private float scoresRating;

    private float maximumCapacity;

    private City city;

    private Coordinates coordinates;

    private Charge charge;

    private List<String> images;

    public Accommodation() {}

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public boolean isSuperHost() {
        return isSuperHost;
    }

    public float getScoresRating() {
        return scoresRating;
    }

    public float getMaximumCapacity() {
        return maximumCapacity;
    }

    public City getCity() {
        return city;
    }

    public Coordinates getCoordinates() {
        return coordinates;
    }

    public List<String> getImages() {
        return images;
    }

    public int getOriginalPricePerNight() {
        return charge.getOriginalPrice();
    }

    public int getDiscountedPricePerNight() {
        return charge.getDiscountedPrice();
    }

    public long getServiceTax(Filter filter) {
        return charge.getServiceTax() * filter.getPeriod();
    }

    public long getAccommodationTax(Filter filter, float accommodationTaxRate) {
        long serviceTax = getServiceTax(filter);
        return (int)(serviceTax * accommodationTaxRate);
    }

    public int getCleaningFee() {
        return charge.getCleaningFee();
    }

    public long getPriceDuringPeriod(Filter filter) {
        return charge.getDiscountedPrice() * filter.getPeriod();
    }

    public long getTotalPrice(Filter filter, float accommodationTaxRate) {
        return getPriceDuringPeriod(filter) + charge.getCleaningFee() + getServiceTax(filter) + getAccommodationTax(filter, accommodationTaxRate);
    }

    public int getPricePerNight(float accommodationTaxRate) {
        int serviceTax = charge.getServiceTax();
        return charge.getOriginalPrice() + charge.getCleaningFee() + serviceTax + (int)(serviceTax * accommodationTaxRate);
    }

    public int getPricePerNightDiscounted(float accommodationTaxRate) {
        int serviceTax = charge.getServiceTax();
        return charge.getDiscountedPrice() + charge.getCleaningFee() + serviceTax + (int)(serviceTax * accommodationTaxRate);
    }
}
