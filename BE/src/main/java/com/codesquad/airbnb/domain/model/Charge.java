package com.codesquad.airbnb.domain.model;

public class Charge {

    private float pricePerNight;

    private float pricePerNightDiscounted;

    private float cleaningFee;

    private float serviceTax;

    private float totalPricePerNight;

    public Charge() {}

    public float getPricePerNight() {
        return pricePerNight;
    }

    public float getPricePerNightDiscounted() {
        return pricePerNightDiscounted;
    }

    public float getCleaningFee() {
        return cleaningFee;
    }

    public float getServiceTax() {
        return serviceTax;
    }

    public float getTotalPricePerNight() {
        return totalPricePerNight;
    }
}
