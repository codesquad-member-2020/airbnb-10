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

    public float getPricePerNight() {
        return charge.getPricePerNight();
    }

    public float getPricePerNightDiscounted() {
        return charge.getPricePerNightDiscounted();
    }

    public float getTotalPrice() {
        return charge.getTotalPricePerNight();
    }

    public List<String> getImages() {
        return images;
    }
}
