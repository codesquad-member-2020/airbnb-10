package com.codesquad.airbnb.domain;

import java.time.LocalDate;

public class Booking {

    private Integer id;

    private Integer accommodation;

    private LocalDate checkIn;

    private LocalDate checkOut;

    public Booking(Integer accommodation, LocalDate checkIn, LocalDate checkOut) {
        this.accommodation = accommodation;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
    }
}
