package com.codesquad.airbnb.business;

import com.codesquad.airbnb.domain.model.Accommodation;
import com.codesquad.airbnb.domain.model.Filter;
import com.codesquad.airbnb.util.CurrencyConvertor;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;
import static org.assertj.core.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FilterServiceTest {

    private static final Logger log = LoggerFactory.getLogger(FilterServiceTest.class);

    @Autowired
    private FilterService filterService;

    @Test
    public void 숙소_필터링() throws Exception {
        // given
        Filter filter = new Filter();
        // 1. 날짜 조건
        filter.setCheckIn(LocalDate.parse("2020-05-23"));
        filter.setCheckOut(LocalDate.parse("2020-05-24"));
        // 2. 요금 조건
        filter.setPriceMin(100000);
        filter.setPriceMax(200000);
        // 3. 인원 조건
        filter.setAdults(4);
        filter.setChildren(3);
        // 4. 페이징
        filter.setItemsOffset(0);

        // when
        List<Accommodation> accommodations = filterService.findUsingFilter(filter);

        // then
        assertThat(accommodations).isNotNull();
        // 최소 요금 검사
        assertThat(accommodations).allMatch(a -> (CurrencyConvertor.calculateCurrency(a.getTotalPrice())) >= filter.getPriceMin());
        // 최대 요금 검사
        assertThat(accommodations).allMatch(a -> (CurrencyConvertor.calculateCurrency(a.getTotalPrice())) <= filter.getPriceMax());
        // 인원 검사
        assertThat(accommodations).allMatch(a -> a.getMaximumCapacity() >= filter.getPeople());
        // 페이징 검사
        assertThat(accommodations.size()).isEqualTo(4);
    }
}
