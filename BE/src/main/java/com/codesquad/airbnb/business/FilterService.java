package com.codesquad.airbnb.business;

import com.codesquad.airbnb.dao.AccommodationDAO;
import com.codesquad.airbnb.domain.dto.AccommodationDTO;
import com.codesquad.airbnb.domain.model.Filter;
import com.codesquad.airbnb.util.CurrencyConvertor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FilterService {

    private static final Logger log = LoggerFactory.getLogger(FilterService.class);
    private AccommodationDAO accommodationDAO;

    public FilterService(AccommodationDAO accommodationDAO) {
        this.accommodationDAO = accommodationDAO;
    }

    public Map<String, Object> getAccommodations(Filter filter) {
        log.debug("period: {}", filter.getPeriod());

        Map<String, Object> parameters = createParameters(filter);
        Map<String, Object> result = new HashMap<>();

        result.put("accommodations", accommodationDAO.findUsingFilter(parameters)
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
                        .build()).collect(Collectors.toList()));

        result.put("total", accommodationDAO.countOfFilterResult(parameters));

        return result;
    }

    private Map<String, Object> createParameters(Filter filter) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("people", filter.getPeople());
        parameters.put("priceMin", filter.getPriceMin());
        parameters.put("priceMax", filter.getPriceMax());
        parameters.put("exchangeRate", CurrencyConvertor.EXCHANGE_RATE_FROM_USD_TO_KRW);
        parameters.put("period", filter.getPeriod());
        parameters.put("itemsOffset", filter.getItemsOffset());
        return parameters;
    }
}
