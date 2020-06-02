package com.codesquad.airbnb.domain.model;

public class Charge {

    private int originalPrice;

    private int discountedPrice;

    private int cleaningFee;

    private int serviceTax;

    public Charge() {}

    public int getOriginalPrice() {
        return originalPrice;
    }

    public int getDiscountedPrice() {
        return discountedPrice;
    }

    public int getCleaningFee() {
        return cleaningFee;
    }

    public int getServiceTax() {
        return serviceTax;
    }
}
