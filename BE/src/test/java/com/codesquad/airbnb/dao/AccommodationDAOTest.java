package com.codesquad.airbnb.dao;

import com.codesquad.airbnb.domain.model.Accommodation;
import com.codesquad.airbnb.domain.model.Filter;
import com.codesquad.airbnb.common.utils.CurrencyConvertor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.context.annotation.Import;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.*;

@MybatisTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(AccommodationDAO.class)
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
    public void 세팅() {
        // given
        filter = new Filter();
        // 1. 날짜 조건
        filter.setCheckIn(LocalDate.parse("2020-08-19"));
        filter.setCheckOut(LocalDate.parse("2020-09-18"));
        // 2. 요금 조건
        filter.setPriceMin(0);
        filter.setPriceMax(800000);
        // 3. 인원 조건
        filter.setAdults(3);
        filter.setChildren(2);
        // 4. 페이징
        filter.setItemsOffset(140);

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
        if (filter.getPriceMax() != 0) {
            assertThat(accommodations).allMatch(a -> (a.getPricePerNightDiscounted(accommodationTaxRate)) <= filter.getPriceMax());
        }
        // 인원 검사
        assertThat(accommodations).allMatch(a -> a.getMaximumCapacity() >= filter.getPeople());
        // 페이징 검사
        assertThat(accommodations.size()).isEqualTo(12);
    }

    @Test
    public void 숙소_필터링_총_개수() {
        // when
        int total = accommodationDAO.countOfFilterResult(parameters);

        // then
        assertThat(total).isEqualTo(152);
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
        parameters = new HashMap<>();
        parameters.put("people", filter.getPeople());
        parameters.put("priceMin", filter.getPriceMin());
        parameters.put("priceMax", filter.getPriceMax());
        parameters.put("exchangeRate", CurrencyConvertor.EXCHANGE_RATE_FROM_USD_TO_KRW);
        parameters.put("period", filter.getPeriod());
        parameters.put("itemsOffset", filter.getItemsOffset());

        // when
        List<Accommodation> accommodations = accommodationDAO.findUsingFilter(parameters);
        Integer id = 593;
        parameters.put("id", id);
        Accommodation accommodationForBooking = accommodationDAO.findAccommodationChargeInfoById(parameters);

        // then
        Accommodation accommodationFiltered = null;
        for (Accommodation a : accommodations) {
            if (a.getId().equals(id)) {
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

    @Test
    public void 숙소_요금_리스트_비교() {
        // when
        List<Accommodation> accommodations = accommodationDAO.findUsingFilter(parameters);
        List<Map<String, Integer>> feeList = accommodationDAO.findFeeUsingFilterTest(parameters);

        // then
        for (Accommodation a : accommodations) {
            for (Map<String, Integer> result : feeList) {
                if (a.getId().equals(result.get("id"))) {
                    log.debug("filter list id: {}, price: {} / price list id: {}, price: {}", a.getId(), a.getPricePerNightDiscounted(accommodationTaxRate), result.get("id"), result.get("price"));
                    assertThat(a.getPricePerNightDiscounted(accommodationTaxRate)).isEqualTo(result.get("price"));
                }
            }
        }

        assertThat(feeList.size()).isEqualTo(206);
    }

    @Test
    public void 최소_최대_금액() {
        // when
        Map<String, Integer> prices = accommodationDAO.findMinAndMaxOfFee(parameters);

        // then
        assertThat(prices.get("min")).isEqualTo(26446);
        assertThat(prices.get("max")).isEqualTo(3940928);
    }
}
