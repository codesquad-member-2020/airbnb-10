package com.codesquad.airbnb.domain;

import java.util.List;

public class User {

    private Integer id;

    private String email;

    private List<Booking> bookings;

    private List<Accommodation> accommodations;

    public User(Integer id, String email) {
        this.id = id;
        this.email = email;
    }

    public Integer getId() {
        return id;
    }
}
