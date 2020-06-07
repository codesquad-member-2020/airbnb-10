package com.codesquad.airbnb.dao;

import com.codesquad.airbnb.domain.model.Accommodation;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface AccommodationDAO {

    public List<Accommodation> findUsingFilter(Map<String, Object> parameters);

    public int countOfFilterResult(Map<String, Object> parameters);

    public List<Integer> findFeeUsingFilter(Map<String, Object> parameters);

    public List<Map<String, Integer>> findFeeUsingFilterTest(Map<String, Object> parameters);

    public Accommodation findAccommodationChargeInfoById(Map<String, Object> parameters);

    public Map<String, Integer> findMinAndMaxOfFee(Map<String, Object> parameters);
}
