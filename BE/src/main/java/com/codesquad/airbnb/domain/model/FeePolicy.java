package com.codesquad.airbnb.domain.model;

public class FeePolicy {

    private float serviceFeeMaxRate;

    private float accommodationTaxRate;

    public FeePolicy(float serviceFeeMaxRate, float accommodationTaxRate) {
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
