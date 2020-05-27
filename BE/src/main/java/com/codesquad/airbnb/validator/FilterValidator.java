package com.codesquad.airbnb.validator;

import com.codesquad.airbnb.domain.Filter;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class FilterValidator implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return Filter.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {

        Filter filter = (Filter)target;
        if (filter.getCheckIn() == null || filter.getCheckOut() == null) {
            errors.reject("체크인, 체크아웃 값을 넣어주세요.");
            return;
        }

        if (filter.getPeriod() <= 0) {
            errors.reject("체크인, 체크아웃을 다시 확인해주세요.");
        }
    }
}
