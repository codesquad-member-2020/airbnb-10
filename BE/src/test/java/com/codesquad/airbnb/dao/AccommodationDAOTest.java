package com.codesquad.airbnb.dao;

import com.codesquad.airbnb.domain.model.Accommodation;
import com.codesquad.airbnb.domain.model.Filter;
import com.codesquad.airbnb.util.CurrencyConvertor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AccommodationDAOTest {

    private static final Logger log = LoggerFactory.getLogger(AccommodationDAOTest.class);

    @Autowired
    private AccommodationDAO accommodationDAO;

    @Autowired
    private FeePolicyMapper feePolicyMapper;

    private Filter filter;

    private Map<String, Object> parameters;

    private float accommodationTaxRate;

    @BeforeEach
    public void setParameters() {
        // given
        filter = new Filter();
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

        parameters = new HashMap<>();
        parameters.put("people", filter.getPeople());
        parameters.put("priceMin", filter.getPriceMin());
        parameters.put("priceMax", filter.getPriceMax());
        parameters.put("exchangeRate", CurrencyConvertor.EXCHANGE_RATE_FROM_USD_TO_KRW);
        parameters.put("period", filter.getPeriod());
        parameters.put("itemsOffset", filter.getItemsOffset());

        accommodationTaxRate = feePolicyMapper.findAccommodationTax();
    }

    @Test
    public void 숙소_필터링() {

        // when
        List<Accommodation> accommodations = accommodationDAO.findUsingFilter(parameters);

        // then
        assertThat(accommodations).isNotNull();
        // 최소 요금 검사
        assertThat(accommodations).allMatch(a -> (a.getPricePerNightDiscounted(accommodationTaxRate)) >= filter.getPriceMin());
        // 최대 요금 검사
        assertThat(accommodations).allMatch(a -> (a.getPricePerNightDiscounted(accommodationTaxRate)) <= filter.getPriceMax());
        // 인원 검사
        assertThat(accommodations).allMatch(a -> a.getMaximumCapacity() >= filter.getPeople());
        // 페이징 검사
        assertThat(accommodations.size()).isEqualTo(2);
    }

    @Test
    public void 숙소_필터링_총_개수() {
        // when
        int total = accommodationDAO.countOfFilterResult(parameters);

        // then
        assertThat(total).isEqualTo(2);
    }

    @Test
    public void 숙소_예약_모달창() {
        // given
        parameters.put("id", 2);

        // when
        Accommodation accommodation = accommodationDAO.findAccommodationChargeInfoById(parameters);

        // then
        assertThat(accommodation.getId()).isEqualTo(2);
        assertThat(accommodation).isNotNull();
        assertThat(accommodation.getOriginalPricePerNight()).isEqualTo(116996);
        assertThat(accommodation.getDiscountedPricePerNight()).isEqualTo(116996);
        assertThat(accommodation.getCleaningFee()).isEqualTo(0);
        assertThat(accommodation.getServiceTax(filter)).isEqualTo(22847);
        assertThat(accommodation.getAccommodationTax(filter, accommodationTaxRate)).isEqualTo(2284);
        assertThat(accommodation.getTotalPrice(filter, accommodationTaxRate)).isEqualTo(142127);
    }

    @Test
    public void 숙소_필터링과_예약_모달창_비교() {
        // given
        filter = new Filter();
        // 1. 날짜 조건
        filter.setCheckIn(LocalDate.parse("2020-05-23"));
        filter.setCheckOut(LocalDate.parse("2020-05-25"));
        // 2. 페이징
        filter.setItemsOffset(0);

        parameters = new HashMap<>();
        parameters.put("people", filter.getPeople());
        parameters.put("priceMin", filter.getPriceMin());
        parameters.put("priceMax", filter.getPriceMax());
        parameters.put("exchangeRate", CurrencyConvertor.EXCHANGE_RATE_FROM_USD_TO_KRW);
        parameters.put("period", filter.getPeriod());
        parameters.put("itemsOffset", filter.getItemsOffset());
        // when
        List<Accommodation> accommodations = accommodationDAO.findUsingFilter(parameters);
        Integer id = 1;
        parameters.put("id", id);
        Accommodation accommodationForBooking = accommodationDAO.findAccommodationChargeInfoById(parameters);

        // then
        Accommodation accommodationFiltered = null;
        for (Accommodation a : accommodations) {
            if (a.getId() == id) {
                accommodationFiltered = a;
            }
        }

        assertThat(accommodationForBooking.getOriginalPricePerNight()).isEqualTo(accommodationFiltered.getOriginalPricePerNight());
        assertThat(accommodationForBooking.getDiscountedPricePerNight()).isEqualTo(accommodationFiltered.getDiscountedPricePerNight());
        assertThat(accommodationForBooking.getCleaningFee()).isEqualTo(accommodationFiltered.getCleaningFee());
        assertThat(accommodationForBooking.getServiceTax(filter)).isEqualTo(accommodationFiltered.getServiceTax(filter));
        assertThat(accommodationForBooking.getAccommodationTax(filter, accommodationTaxRate)).isEqualTo(accommodationFiltered.getAccommodationTax(filter, accommodationTaxRate));
        assertThat(accommodationForBooking.getOriginalPricePerNight()).isEqualTo(accommodationFiltered.getOriginalPricePerNight());
        assertThat(accommodationForBooking.getDiscountedPricePerNight()).isEqualTo(accommodationFiltered.getDiscountedPricePerNight());
        assertThat(accommodationForBooking.getTotalPrice(filter, accommodationTaxRate)).isEqualTo(accommodationFiltered.getTotalPrice(filter, accommodationTaxRate));
    }
}
