package com.codesquad.airbnb.dao;

import com.codesquad.airbnb.business.BookService;
import com.codesquad.airbnb.domain.model.Booking;
import com.codesquad.airbnb.domain.model.Filter;
import com.codesquad.airbnb.domain.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql(scripts = "classpath:schema.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
public class BookingTest {

    @Autowired
    private BookService bookService;

   @Test
    public void 숙소_예약() {
        //given
        Filter filter = new Filter();
        filter.setCheckIn(LocalDate.parse("2020-06-03"));
        filter.setCheckOut(LocalDate.parse("2020-06-06"));

        User user = new User(2, "beginin15@gmail.com");

        // when
        int id = bookService.booking(1, filter, user);

        // then
        assertThat(id).isEqualTo(1);
    }
}
