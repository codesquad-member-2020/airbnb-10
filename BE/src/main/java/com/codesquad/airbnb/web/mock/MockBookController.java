package com.codesquad.airbnb.web.mock;

import com.codesquad.airbnb.common.CustomValidatorUtils;
import com.codesquad.airbnb.domain.dto.AccommodationDTO;
import com.codesquad.airbnb.domain.model.Filter;
import com.codesquad.airbnb.domain.validator.FilterValidator;
import com.codesquad.airbnb.web.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mock/rooms")
public class MockBookController {

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getReservationInfo(@PathVariable Integer id, Filter filter) {
        AccommodationDTO accommodation = new AccommodationDTO.Builder(1)
                .pricePerNight(158868)
                .pricePerNightDiscounted(136627)
                .priceDuringPeriod(136627)
                .cleaningFee(73892)
                .serviceTax(966)
                .accommodationTax(96)
                .totalPrice(211581)
                .build();

        return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.SUCCESS, accommodation), HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public ResponseEntity<ApiResponse> bookRoom(@PathVariable Integer id, Filter filter, BindingResult result) {
        new FilterValidator().validate(filter, result);
        if (result.hasErrors()) {
            return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.FAIL, CustomValidatorUtils.getErrorMessage(result)), HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.SUCCESS, null), HttpStatus.OK);
    }
}
