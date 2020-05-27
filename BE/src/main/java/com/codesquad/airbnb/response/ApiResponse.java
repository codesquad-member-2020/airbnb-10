package com.codesquad.airbnb.response;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class ApiResponse {

    public enum Status {
        SUCCESS, ERROR
    }

    private Status status;
    private Object content;

    public ApiResponse(Status status, Object content) {
        this.status = status;
        this.content = content;
    }
}
