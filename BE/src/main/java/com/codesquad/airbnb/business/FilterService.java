package com.codesquad.airbnb.business;

import com.codesquad.airbnb.dao.AccommodationDAO;
import com.codesquad.airbnb.domain.dto.AccommodationDTO;
import com.codesquad.airbnb.domain.model.Accommodation;
import com.codesquad.airbnb.domain.model.Filter;
import com.codesquad.airbnb.util.CurrencyConvertor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FilterService {

    private static final Logger log = LoggerFactory.getLogger(FilterService.class);
    private AccommodationDAO accommodationDAO;

    public FilterService(AccommodationDAO accommodationDAO) {
        this.accommodationDAO = accommodationDAO;
    }

    public List<AccommodationDTO> getAccommodations(Filter filter) {
        return findUsingFilter(filter)
                .stream()
                .map(model -> new AccommodationDTO.Builder(model.getId())
                        .name(model.getName())
                        .pricePerNight(CurrencyConvertor.calculateCurrency(model.getPricePerNight()))
                        .pricePerNightDiscounted(CurrencyConvertor.calculateCurrency(model.getPricePerNightDiscounted()))
                        .totalPrice(CurrencyConvertor.calculateCurrency(model.getTotalPrice() * filter.getPeriod()))
                        .isSuperHost(model.isSuperHost())
                        .city(model.getCity().getName())
                        .scoresRating(model.getScoresRating())
                        .images(model.getImages())
                        .build()).collect(Collectors.toList());
    }

    public List<Accommodation> findUsingFilter(Filter filter) {
        log.debug("period: {}", filter.getPeriod());
        return accommodationDAO.findUsingFilter(filter.getPeople(),
                filter.getPriceMin(),
                filter.getPriceMax(),
                CurrencyConvertor.EXCHANGE_RATE_FROM_USD_TO_KRW,
                filter.getPeriod(),
                filter.getItemsOffset());
    }
}
