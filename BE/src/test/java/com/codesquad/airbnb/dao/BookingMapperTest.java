package com.codesquad.airbnb.dao;

import com.codesquad.airbnb.domain.model.Booking;
import com.codesquad.airbnb.domain.model.Filter;
import com.codesquad.airbnb.domain.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

// MyBatis tests are transactional and rollback at the end of each test by default
@MybatisTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class BookingMapperTest {

    @Autowired
    private BookingMapper bookingMapper;

    private Integer accommodation = 1;

    @BeforeEach
    public void 기존_예약_정보_세팅() {
        // given
        Filter filter = new Filter();
        filter.setCheckIn(LocalDate.parse("2020-06-03"));
        filter.setCheckOut(LocalDate.parse("2020-06-06"));

        User user = new User(3, "beginin15@gmail.com");

        bookingMapper.insertBooking(new Booking(user, accommodation, filter));

        filter.setCheckIn(LocalDate.parse("2020-06-10"));
        filter.setCheckOut(LocalDate.parse("2020-06-15"));

        bookingMapper.insertBooking(new Booking(user, accommodation, filter));
    }

    @Test
    public void 숙소_예약_전_검사() {
        // given
        Filter filter = new Filter();
        // 1. 체크인이 미포함, 체크아웃이 포함
        filter.setCheckIn(LocalDate.parse("2020-06-01"));
        filter.setCheckOut(LocalDate.parse("2020-06-05"));

        User user = new User(3, "beginin15@gmail.com");

        // when
        int id = bookingMapper.countByAccommodationIdAndPeriod(
                new Booking(user, accommodation, filter));

        // then
        assertThat(id).isEqualTo(1);

        // given
        // 2. 체크인이 포함, 체크아웃이 미포함
        filter.setCheckIn(LocalDate.parse("2020-06-05"));
        filter.setCheckOut(LocalDate.parse("2020-06-10"));

        // when
        id = bookingMapper.countByAccommodationIdAndPeriod(
                new Booking(user, accommodation, filter));

        // then
        assertThat(id).isEqualTo(1);

        // given
        // 3. 체크인이 포함, 체크아웃이 포함
        filter.setCheckIn(LocalDate.parse("2020-06-04"));
        filter.setCheckOut(LocalDate.parse("2020-06-05"));

        // when
        id = bookingMapper.countByAccommodationIdAndPeriod(
                new Booking(user, accommodation, filter));

        // then
        assertThat(id).isEqualTo(1);

        // given
        // 4. 체크인이 미포함, 체크아웃이 미포함
        filter.setCheckIn(LocalDate.parse("2020-06-01"));
        filter.setCheckOut(LocalDate.parse("2020-06-02"));

        // when
        id = bookingMapper.countByAccommodationIdAndPeriod(
                new Booking(user, accommodation, filter));

        // then
        assertThat(id).isEqualTo(0);

        // given
        // 5. 체크인이 미포함, 체크아웃이 기존 체크일과 동일
        filter.setCheckIn(LocalDate.parse("2020-06-01"));
        filter.setCheckOut(LocalDate.parse("2020-06-03"));

        // when
        id = bookingMapper.countByAccommodationIdAndPeriod(
                new Booking(user, accommodation, filter));

        // then
        assertThat(id).isEqualTo(0);

        // given
        // 6. 체크인이 기존 체크 아웃과 동일, 체크아웃이 미포함
        filter.setCheckIn(LocalDate.parse("2020-06-06"));
        filter.setCheckOut(LocalDate.parse("2020-06-10"));

        // when
        id = bookingMapper.countByAccommodationIdAndPeriod(
                new Booking(user, accommodation, filter));

        // then
        assertThat(id).isEqualTo(0);

        // given
        // 7. 체크인과 체크아웃이 기존 예약된 날짜를 완전히 포함할 때
        filter.setCheckIn(LocalDate.parse("2020-06-01"));
        filter.setCheckOut(LocalDate.parse("2020-06-10"));

        // when
        id = bookingMapper.countByAccommodationIdAndPeriod(
                new Booking(user, accommodation, filter));

        // then
        assertThat(id).isEqualTo(1);

        // given
        // 8. 서로 다른 예약 날짜를 모두 포함된 경우
        filter.setCheckIn(LocalDate.parse("2020-06-01"));
        filter.setCheckOut(LocalDate.parse("2020-06-20"));

        // when
        id = bookingMapper.countByAccommodationIdAndPeriod(
                new Booking(user, accommodation, filter));

        // then
        assertThat(id).isEqualTo(2);

        // given
        // 9. 서로 다른 예약 날짜 사이에 포함된 경우
        filter.setCheckIn(LocalDate.parse("2020-06-04"));
        filter.setCheckOut(LocalDate.parse("2020-06-13"));

        // when
        id = bookingMapper.countByAccommodationIdAndPeriod(
                new Booking(user, accommodation, filter));

        // then
        assertThat(id).isEqualTo(2);

        // given
        // 10. 여러 예약 날짜보다 모두 이전
        filter.setCheckIn(LocalDate.parse("2020-06-01"));
        filter.setCheckOut(LocalDate.parse("2020-06-02"));

        // when
        id = bookingMapper.countByAccommodationIdAndPeriod(
                new Booking(user, accommodation, filter));

        // then
        assertThat(id).isEqualTo(0);

        // given
        // 11. 여러 예약 날짜보다 모두 이후
        filter.setCheckIn(LocalDate.parse("2020-06-15"));
        filter.setCheckOut(LocalDate.parse("2020-06-20"));

        // when
        id = bookingMapper.countByAccommodationIdAndPeriod(
                new Booking(user, accommodation, filter));

        // then
        assertThat(id).isEqualTo(0);

        // given
        // 12. 여러 예약 날짜 사이 빈 날 (인, 아웃 겹칠 때)
        filter.setCheckIn(LocalDate.parse("2020-06-06"));
        filter.setCheckOut(LocalDate.parse("2020-06-10"));

        // when
        id = bookingMapper.countByAccommodationIdAndPeriod(
                new Booking(user, accommodation, filter));

        // then
        assertThat(id).isEqualTo(0);

        // given
        // 13. 여러 예약 날짜 사이 빈 날
        filter.setCheckIn(LocalDate.parse("2020-06-07"));
        filter.setCheckOut(LocalDate.parse("2020-06-09"));

        // when
        id = bookingMapper.countByAccommodationIdAndPeriod(
                new Booking(user, accommodation, filter));

        // then
        assertThat(id).isEqualTo(0);
    }
}

