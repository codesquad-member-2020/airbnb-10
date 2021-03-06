package com.codesquad.airbnb.business;

import com.codesquad.airbnb.common.utils.DAOUtils;
import com.codesquad.airbnb.dao.AccommodationMapper;
import com.codesquad.airbnb.dao.FeePolicyMapper;
import com.codesquad.airbnb.domain.dto.AccommodationDTO;
import com.codesquad.airbnb.domain.dto.FeeFilterDTO;
import com.codesquad.airbnb.domain.model.Filter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FilterService {

    private static final Logger log = LoggerFactory.getLogger(FilterService.class);
    private AccommodationMapper accommodationMapper;
    private FeePolicyMapper feePolicyMapper;

    public FilterService(AccommodationMapper accommodationMapper, FeePolicyMapper feePolicyMapper) {
        this.accommodationMapper = accommodationMapper;
        this.feePolicyMapper = feePolicyMapper;
    }

    public Map<String, Object> getFilteringResult(Filter filter) {
        log.debug("period: {}", filter.getPeriod());

        Map<String, Object> parameters = DAOUtils.createParameters(filter);
        Map<String, Object> result = new HashMap<>();

        float accommodationTax = feePolicyMapper.findAccommodationTax();

        result.put("accommodations", accommodationMapper.findUsingFilter(parameters)
                .stream()
                .map(model -> new AccommodationDTO.Builder(model.getId())
                        .name(model.getName())
                        .pricePerNight(model.getPricePerNight(accommodationTax))
                        .pricePerNightDiscounted(model.getPricePerNightDiscounted(accommodationTax))
                        .totalPrice(model.getTotalPrice(filter, accommodationTax))
                        .isSuperHost(model.isSuperHost())
                        .city(model.getCity().getName())
                        .scoresRating(model.getScoresRating())
                        .images(model.getImages())
                        .build())
                .collect(Collectors.toList()));

        result.put("total", accommodationMapper.countOfFilterResult(parameters));

        result.put("fee", createFeeFilter(parameters));

        return result;
    }

    private FeeFilterDTO createFeeFilter(Map<String, Object> parameters) {
        Map<String, Integer> fee = accommodationMapper.findMinAndMaxOfFee(parameters);
        return new FeeFilterDTO(fee.get("min"),
                fee.get("max"),
                accommodationMapper.findFeeUsingFilter(parameters));
    }
}
