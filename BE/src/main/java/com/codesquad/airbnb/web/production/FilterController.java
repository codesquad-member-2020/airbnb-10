package com.codesquad.airbnb.web.production;

import com.codesquad.airbnb.domain.model.Filter;
import com.codesquad.airbnb.web.response.ApiResponse;
import com.codesquad.airbnb.business.FilterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rooms")
public class FilterController {

    private FilterService filterService;

    public FilterController(FilterService filterService) {
        this.filterService = filterService;
    }

    @GetMapping("")
    public ResponseEntity<ApiResponse> rooms(Filter filter) {
        return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.SUCCESS, filterService.findAll()), HttpStatus.OK);
    }
}
