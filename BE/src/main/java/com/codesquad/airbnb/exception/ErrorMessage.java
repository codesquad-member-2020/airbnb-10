package com.codesquad.airbnb.exception;

public enum ErrorMessage {

    ENTITY_NOT_FOUND("존재하지 않는 엔티티입니다.");

    private String message;

    ErrorMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
