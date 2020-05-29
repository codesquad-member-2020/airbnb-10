package com.codesquad.airbnb.domain.model;

public class City {

    private Integer id;

    private String name;

    private String country;

    public City() {}

    public City(String name, String country) {
        this.name = name;
        this.country = country;
    }

    public String getName() {
        return name;
    }
}
