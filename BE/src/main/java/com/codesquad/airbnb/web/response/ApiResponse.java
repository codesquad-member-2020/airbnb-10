package com.codesquad.airbnb.web.response;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class ApiResponse {

    public enum Status {
        SUCCESS, FAIL
    }

    private Status status;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object content;

    public ApiResponse(Status status, Object content) {
        this.status = status;
        this.content = content;
    }

    public Status getStatus() {
        return status;
    }

    public Object getContent() {
        return content;
    }
}
