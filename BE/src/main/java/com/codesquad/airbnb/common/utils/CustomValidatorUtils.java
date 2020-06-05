package com.codesquad.airbnb.common.utils;

import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import java.util.stream.Collectors;

public class CustomValidatorUtils {

    public static String getErrorMessage(BindingResult result) {
        return result.getAllErrors().stream().map(ObjectError::getCode).collect(Collectors.joining(", "));
    }
}
