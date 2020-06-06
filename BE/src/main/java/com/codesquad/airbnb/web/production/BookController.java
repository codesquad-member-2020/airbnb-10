package com.codesquad.airbnb.web.production;

import com.codesquad.airbnb.business.BookService;
import com.codesquad.airbnb.business.LoginService;
import com.codesquad.airbnb.common.utils.CustomValidatorUtils;
import com.codesquad.airbnb.domain.model.Filter;
import com.codesquad.airbnb.domain.model.User;
import com.codesquad.airbnb.domain.validator.FilterValidator;
import com.codesquad.airbnb.web.response.ApiResponse;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import java.util.Optional;

@RestController
@RequestMapping("/rooms")
public class BookController {

    private BookService bookService;

    private LoginService loginService;

    public BookController(BookService bookService, LoginService loginService) {
        this.bookService = bookService;
        this.loginService = loginService;
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
                                               BindingResult result,
                                               @CookieValue(value = "jwt") Cookie cookie) {
        new FilterValidator().validate(filter, result);
        if (result.hasErrors()) {
            return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.FAIL,
                    CustomValidatorUtils.getErrorMessage(result)),
                    HttpStatus.FORBIDDEN);
        }

        User loginUser = loginService.getUserFromJWT(cookie.getValue());

        if (bookService.booking(id, filter, loginUser)) {
            return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.SUCCESS,
                    null),
                    HttpStatus.OK);
        }

        return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.FAIL,
                "이미 예약된 숙소입니다."),
                HttpStatus.FORBIDDEN);
    }
}
