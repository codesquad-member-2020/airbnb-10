package com.codesquad.airbnb.web.mock;

import com.codesquad.airbnb.domain.model.Accommodation;
import com.codesquad.airbnb.domain.model.Filter;
import com.codesquad.airbnb.domain.model.Image;
import com.codesquad.airbnb.domain.validator.FilterValidator;
import com.codesquad.airbnb.web.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/mock/rooms")
public class MockBookController {

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getReservationInformation(@PathVariable Integer id, Filter filter) {

        Accommodation accommodation = MockAccommodationUtil.createAccommodation(
                1,
                null,
                false,
                "Washington", "United States",
                38.91139f, -77.0208f,
                4, 2, 1125, 4.75f,
                129, 0.14f, 60,
                Arrays.asList(
                        new Image(1,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/0/img_0.jpg", 1),
                        new Image(601,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/1/img_0.jpg", 1),
                        new Image(1201,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/2/img_0.jpg", 1),
                        new Image(1801,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/3/img_0.jpg", 1),
                        new Image(2401,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/4/img_0.jpg", 1))
        );

        return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.SUCCESS, MockAccommodationUtil.parseAccommodationDTO(filter, accommodation, true)), HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public ResponseEntity<ApiResponse> bookRoom(@PathVariable Integer id, Filter filter, BindingResult result) {

        new FilterValidator().validate(filter, result);
        if (result.hasErrors()) {
            return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.FAIL, getErrorMessage(result)), HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.SUCCESS, null), HttpStatus.OK);
    }

    private String getErrorMessage(BindingResult result) {
        return result.getAllErrors().stream().map(ObjectError::getCode).collect(Collectors.joining(", "));
    }
}
