package com.codesquad.airbnb.web.production;

import com.codesquad.airbnb.business.BookService;
import com.codesquad.airbnb.domain.model.Filter;
import com.codesquad.airbnb.web.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rooms")
public class BookController {

    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getReservationInfo(@PathVariable Integer id, Filter filter) {
        return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.SUCCESS, bookService.getAccommodation(id, filter)), HttpStatus.OK);
    }
}
