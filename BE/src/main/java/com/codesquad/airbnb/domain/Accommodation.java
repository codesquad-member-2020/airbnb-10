package com.codesquad.airbnb.domain;

import java.util.List;

public class Accommodation {

    private Integer id;

    private String name;

    private boolean isSuperHost;

    private City city;

    private float latitude;

    private float longitude;

    private int maximumCapacity;

    private int minimumNights;

    private int maximumNights;

    private float scoresRating;

    private int price;

    private float discountRate;

    private int cleaningFee;

    private List<Image> images;

    public Accommodation(Integer id,
                         String name,
                         boolean isSuperHost,
                         City city,
                         float latitude, float longitude,
                         int maximumCapacity,
                         int minimumNights, int maximumNights,
                         float scoresRating,
                         int price, float discountRate, int cleaningFee,
                         List<Image> images) {
        this.id = id;
        this.name = name;
        this.isSuperHost = isSuperHost;
        this.city = city;
        this.latitude = latitude;
        this.longitude = longitude;
        this.maximumCapacity = maximumCapacity;
        this.minimumNights = minimumNights;
        this.maximumNights = maximumNights;
        this.scoresRating = scoresRating;
        this.price = price;
        this.discountRate = discountRate;
        this.cleaningFee = cleaningFee;
        this.images = images;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public boolean isSuperHost() {
        return isSuperHost;
    }

    public City getCity() {
        return city;
    }

    public float getLatitude() {
        return latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public int getMaximumCapacity() {
        return maximumCapacity;
    }

    public int getMinimumNights() {
        return minimumNights;
    }

    public int getMaximumNights() {
        return maximumNights;
    }

    public float getScoresRating() {
        return scoresRating;
    }

    public int getPrice() {
        return price;
    }

    public float getDiscountRate() {
        return discountRate;
    }

    public int getCleaningFee() {
        return cleaningFee;
    }

    public List<Image> getImages() {
        return images;
    }

    public int getDiscountedPrice() {
        return discountRate == 0.f ? price : (price - (int)(price * discountRate));
    }

    public int getPriceDuringPeriod(Filter filter) {
        return discountRate == 0.f ? (price * filter.getPeriod()) : (getDiscountedPrice() * filter.getPeriod());
    }

    public int getServiceTax(int totalAmount, float serviceRateMax) {
        return (int)(getDiscountedPrice() * calculateServiceTaxRate(totalAmount, serviceRateMax));
    }

    public int getTotalPrice(int priceDuringPeriod, int serviceTax, int accommodationTax) {
        return priceDuringPeriod + cleaningFee + serviceTax + accommodationTax;
    }

    private float calculateServiceTaxRate(int totalAmount, float serviceRateMax) {
        return getDiscountedPrice() / (float)totalAmount * serviceRateMax;
    }
}
