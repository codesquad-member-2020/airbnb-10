package com.codesquad.airbnb.domain.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class AccommodationDTO {

    private Integer id;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private String name;

    private int pricePerNight;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int pricePerNightDiscounted;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private long priceDuringPeriod;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int cleaningFee;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private long serviceTax;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private long accommodationTax;

    private long totalPrice;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Boolean isSuperHost;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private String city;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private float scoresRating;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private List<String> images;

    public AccommodationDTO(Builder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.pricePerNight = builder.pricePerNight;
        this.pricePerNightDiscounted = builder.pricePerNightDiscounted;
        this.priceDuringPeriod = builder.priceDuringPeriod;
        this.cleaningFee = builder.cleaningFee;
        this.serviceTax = builder.serviceTax;
        this.accommodationTax = builder.accommodationTax;
        this.totalPrice = builder.totalPrice;
        this.isSuperHost = builder.isSuperHost;
        this.city = builder.city;
        this.scoresRating = builder.scoresRating;
        this.images = builder.images;
    }

    public int getPricePerNight() {
        return pricePerNight;
    }

    public int getPricePerNightDiscounted() {
        return pricePerNightDiscounted;
    }

    public long getPriceDuringPeriod() {
        return priceDuringPeriod;
    }

    public int getCleaningFee() {
        return cleaningFee;
    }

    public long getServiceTax() {
        return serviceTax;
    }

    public long getAccommodationTax() {
        return accommodationTax;
    }

    public long getTotalPrice() {
        return totalPrice;
    }

    public static class Builder {

        private Integer id;

        private String name;

        private int pricePerNight;

        private int pricePerNightDiscounted;

        private long priceDuringPeriod;

        private int cleaningFee;

        private long serviceTax;

        private long accommodationTax;

        private long totalPrice;

        private Boolean isSuperHost;

        private String city;

        private float scoresRating;

        private List<String> images;

        public Builder(Integer id) {
            this.id = id;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder pricePerNight(int pricePerNight) {
            this.pricePerNight = pricePerNight;
            return this;
        }

        public Builder pricePerNightDiscounted(int pricePerNightDiscounted) {
            this.pricePerNightDiscounted = pricePerNightDiscounted;
            return this;
        }

        public Builder priceDuringPeriod(long priceDuringPeriod) {
            this.priceDuringPeriod = priceDuringPeriod;
            return this;
        }

        public Builder cleaningFee(int cleaningFee) {
            this.cleaningFee = cleaningFee;
            return this;
        }

        public Builder serviceTax(long serviceTax) {
            this.serviceTax = serviceTax;
            return this;
        }

        public Builder accommodationTax(long accommodationTax) {
            this.accommodationTax = accommodationTax;
            return this;
        }

        public Builder totalPrice(long totalPrice) {
            this.totalPrice = totalPrice;
            return this;
        }

        public Builder isSuperHost(Boolean isSuperHost) {
            this.isSuperHost = isSuperHost;
            return this;
        }

        public Builder city(String city) {
            this.city = city;
            return this;
        }

        public Builder scoresRating(float scoresRating) {
            this.scoresRating = scoresRating;
            return this;
        }

        public Builder images(List<String> images) {
            this.images = images;
            return this;
        }

        public AccommodationDTO build() {
            return new AccommodationDTO(this);
        }
    }
}
