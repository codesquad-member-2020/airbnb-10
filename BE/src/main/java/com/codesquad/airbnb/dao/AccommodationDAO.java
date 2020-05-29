package com.codesquad.airbnb.dao;

import com.codesquad.airbnb.domain.model.Accommodation;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AccommodationDAO {
    @Select("SELECT a.id as accommodation_id," +
            " a.name as accommodation_name," +
            " a.is_super_host as is_super_host," +
            " c.id as city_id," +
            " c.name as city_name," +
            " c.country as city_country," +
            " a.latitude as latitude," +
            " a.longitude as longitude," +
            " a.maximum_capacity as maximum_capacity," +
            " a.minimum_nights as minimum_nights," +
            " a.maximum_nights as maximum_nights," +
            " a.scores_rating as scores_rating," +
            " a.price as price," +
            " a.discount_rate as discount_rate," +
            " a.cleaning_fee as cleaning_fee," +
            " i.id as image_id," +
            " i.url as image_url," +
            " i.accommodation as image_accommodation" +
            " FROM accommodation a" +
            " LEFT OUTER JOIN city c ON a.city = c.id" +
            " LEFT OUTER JOIN image i ON a.id = i.accommodation")
    @ResultMap("accommodationResult")
    public List<Accommodation> findAll();
}
