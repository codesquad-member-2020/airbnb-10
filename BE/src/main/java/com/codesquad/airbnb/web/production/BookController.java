package com.codesquad.airbnb.web.production;

import com.codesquad.airbnb.business.BookService;
import com.codesquad.airbnb.common.utils.CustomValidatorUtils;
import com.codesquad.airbnb.domain.model.Filter;
import com.codesquad.airbnb.domain.model.User;
import com.codesquad.airbnb.domain.validator.FilterValidator;
import com.codesquad.airbnb.web.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rooms")
public class BookController {

    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getReservationInfo(@PathVariable Integer id,
                                                          Filter filter,
                                                          BindingResult result) {
        new FilterValidator().validate(filter, result);
        if (result.hasErrors()) {
            return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.FAIL,
                    CustomValidatorUtils.getErrorMessage(result)),
                    HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.SUCCESS,
                bookService.getAccommodation(id, filter)), HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public ResponseEntity<ApiResponse> booking(@PathVariable Integer id,
                                               Filter filter,
                                               BindingResult result) {
        new FilterValidator().validate(filter, result);
        if (result.hasErrors()) {
            return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.FAIL,
                    CustomValidatorUtils.getErrorMessage(result)),
                    HttpStatus.FORBIDDEN);
        }

        if (bookService.booking(id, filter, new User(2, "beginin@gmail.com"))) {
            return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.SUCCESS,
                    null),
                    HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.FAIL,
                "이미 예약된 숙소입니다."),
                HttpStatus.FORBIDDEN);
    }
}
