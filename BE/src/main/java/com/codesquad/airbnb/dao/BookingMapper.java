package com.codesquad.airbnb.dao;

import com.codesquad.airbnb.domain.model.Booking;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.SelectKey;

@Mapper
public interface BookingMapper {

    @Insert("INSERT INTO booking (user, accommodation, check_in, check_out) VALUES (#{user}, #{accommodation}, #{checkIn}, #{checkOut})")
    @SelectKey(statement = "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'airbnb' AND TABLE_NAME = 'booking'", keyProperty = "id", before = false, resultType = int.class)
    public int insertBooking(Booking booking);
}
