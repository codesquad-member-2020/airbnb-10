package com.codesquad.airbnb.dao;

import com.codesquad.airbnb.domain.model.Accommodation;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface AccommodationMapper {

    public List<Accommodation> findUsingFilter(Map<String, Object> parameters);

    public int countOfFilterResult(Map<String, Object> parameters);

    public List<Integer> findFeeUsingFilter(Map<String, Object> parameters);

    public List<Map<String, Integer>> findFeeUsingFilterForTest(Map<String, Object> parameters);

    public Accommodation findAccommodationChargeInfoById(Map<String, Object> parameters);

    public Map<String, Integer> findMinAndMaxOfFee(Map<String, Object> parameters);

    @Select("SELECT COUNT(id)" +
            " FROM   accommodation" +
            " WHERE  id = #{id}")
    public int countById(Integer id);
}
