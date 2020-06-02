package com.codesquad.airbnb.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface FeePolicyMapper {

    @Select("SELECT accommodation_tax FROM fee_policy")
    public float findAccommodationTax();
}
