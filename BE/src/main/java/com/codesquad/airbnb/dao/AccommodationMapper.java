package com.codesquad.airbnb.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface AccommodationMapper {

    @Select("SELECT COUNT(id)" +
            " FROM   accommodation" +
            " WHERE  id = #{id}")
    public int countById(Integer id);
}
