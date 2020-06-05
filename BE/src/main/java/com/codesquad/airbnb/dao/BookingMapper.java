package com.codesquad.airbnb.dao;

import com.codesquad.airbnb.domain.model.Booking;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface BookingMapper {

    @Insert("INSERT INTO booking (user, accommodation, check_in, check_out) VALUES (#{user}, #{accommodation}, #{checkIn}, #{checkOut})")
    public void insertBooking(Booking booking);

    @Select("SELECT COUNT(accommodation)" +
            " FROM  booking" +
            " WHERE accommodation = #{accommodation}" +
            " AND   ((check_in <= #{checkIn} AND check_out > #{checkIn})" +
            "       OR (check_in < #{checkOut} AND check_out > #{checkOut})" +
            "       OR ((check_in BETWEEN #{checkIn} AND #{checkOut})" +
            "          AND (check_out BETWEEN #{checkIn} AND #{checkOut})))")
    public int countByAccommodationIdAndPeriod(Booking booking);
}
