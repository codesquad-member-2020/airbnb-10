package com.codesquad.airbnb.domain;

public class Image {

    private Integer id;

    private String url;

    private Integer accommodation;

    public Image(Integer id, String url, Integer accommodation) {
        this.id = id;
        this.url = url;
        this.accommodation = accommodation;
    }

    public String getUrl() {
        return url;
    }
}
