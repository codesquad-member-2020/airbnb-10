package com.codesquad.airbnb.domain;

public class City {

    private String name;

    private String country;

    public City(String name, String country) {
        this.name = name;
        this.country = country;
    }

    public String getName() {
        return name;
    }
}
