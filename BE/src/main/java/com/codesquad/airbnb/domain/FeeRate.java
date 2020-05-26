package com.codesquad.airbnb.domain;

public class FeeRate {

    private float serviceFeeMaxRate;

    private float accommodationTaxRate;

    public FeeRate(float serviceFeeMaxRate, float accommodationTaxRate) {
        this.serviceFeeMaxRate = serviceFeeMaxRate;
        this.accommodationTaxRate = accommodationTaxRate;
    }

    public float getServiceFeeMaxRate() {
        return serviceFeeMaxRate;
    }

    public float getAccommodationTaxRate() {
        return accommodationTaxRate;
    }
}
