package com.codesquad.airbnb.common.utils;

import com.codesquad.airbnb.domain.model.Filter;

import java.util.HashMap;
import java.util.Map;

public class DAOUtils {

    public static Map<String, Object> createParameters(Filter filter) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("people", filter.getPeople());
        parameters.put("priceMin", filter.getPriceMin());
        parameters.put("priceMax", filter.getPriceMax());
        parameters.put("exchangeRate", CurrencyConvertor.EXCHANGE_RATE_FROM_USD_TO_KRW);
        parameters.put("period", filter.getPeriod());
        parameters.put("checkIn", filter.getCheckIn());
        parameters.put("checkOut", filter.getCheckOut());
        parameters.put("itemsOffset", filter.getItemsOffset());
        return parameters;
    }

    public static Map<String, Object> createParameters(Filter filter, Integer id) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("exchangeRate", CurrencyConvertor.EXCHANGE_RATE_FROM_USD_TO_KRW);
        parameters.put("id", id);
        return parameters;
    }
}
