package com.codesquad.airbnb.exception;


import com.auth0.jwt.exceptions.JWTVerificationException;
import com.codesquad.airbnb.exception.custom.EntityNotFoundException;
import com.codesquad.airbnb.web.response.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingRequestCookieException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomGlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(CustomGlobalExceptionHandler.class);

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiResponse> handleEntityNotFoundException(EntityNotFoundException e) {
        log.error("handleEntityNotFoundException");
        return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.FAIL,
                e.getMessage()),
                HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(MissingRequestCookieException.class)
    public ResponseEntity<ApiResponse> handleMissingRequestCookieException(MissingRequestCookieException e) {
        log.error("handleMissingRequestCookieException");
        return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.FAIL,
                ErrorMessage.UNAUTHORIZED.getMessage()),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(JWTVerificationException.class)
    public ResponseEntity<ApiResponse> handleJWTVerificationException(JWTVerificationException e) {
        log.error("handleJWTVerificationException");
        return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.FAIL,
                e.getMessage()),
                HttpStatus.FORBIDDEN);
    }
}
