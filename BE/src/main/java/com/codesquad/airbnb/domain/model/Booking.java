package com.codesquad.airbnb.domain.model;

import java.time.LocalDate;

public class Booking {

    private Integer id;

    private Integer user;

    private Integer accommodation;

    private LocalDate checkIn;

    private LocalDate checkOut;

    public Booking(User user, Integer accommodation, Filter filter) {
        this.user = user.getId();
        this.accommodation = accommodation;
        this.checkIn = filter.getCheckIn();
        this.checkOut = filter.getCheckOut();
    }

    public Integer getId() {
        return id;
    }
}
