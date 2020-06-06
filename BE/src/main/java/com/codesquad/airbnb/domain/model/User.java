package com.codesquad.airbnb.domain.model;

public class User {

    private Integer id;

    private String email;

    public User(String email) {
        this.email = email;
    }

    public User(Integer id, String email) {
        this.id = id;
        this.email = email;
    }

    public Integer getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                '}';
    }
}
