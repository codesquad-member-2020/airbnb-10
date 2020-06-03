package com.codesquad.airbnb.domain.model;

import java.util.List;

public class Accommodation {

    private Integer id;

    private String name;

    private boolean isSuperHost;

    private float scoresRating;

    private float maximumCapacity;

    private City city;

    private Coordinates coordinates;

    private Fee fee;

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
        return fee.getOriginalPrice();
    }

    public int getDiscountedPricePerNight() {
        return fee.getDiscountedPrice();
    }

    public long getServiceTax(Filter filter) {
        return fee.getServiceTax() * filter.getPeriod();
    }

    public long getAccommodationTax(Filter filter, float accommodationTaxRate) {
        long serviceTax = getServiceTax(filter);
        return (int)(serviceTax * accommodationTaxRate);
    }

    public int getCleaningFee() {
        return fee.getCleaningFee();
    }

    public long getPriceDuringPeriod(Filter filter) {
        return fee.getDiscountedPrice() * filter.getPeriod();
    }

    public long getTotalPrice(Filter filter, float accommodationTaxRate) {
        return getPriceDuringPeriod(filter) + fee.getCleaningFee() + getServiceTax(filter) + getAccommodationTax(filter, accommodationTaxRate);
    }

    public int getPricePerNight(float accommodationTaxRate) {
        int serviceTax = fee.getServiceTax();
        return fee.getOriginalPrice() + fee.getCleaningFee() + serviceTax + (int)(serviceTax * accommodationTaxRate);
    }

    public int getPricePerNightDiscounted(float accommodationTaxRate) {
        int serviceTax = fee.getServiceTax();
        return fee.getDiscountedPrice() + fee.getCleaningFee() + serviceTax + (int)(serviceTax * accommodationTaxRate);
    }
}
