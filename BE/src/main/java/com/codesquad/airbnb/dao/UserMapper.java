package com.codesquad.airbnb.dao;

import com.codesquad.airbnb.domain.model.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {

    @Insert("INSERT INTO user(email) VALUES (#{email})")
    public void insertUser(User user);

    @Select("SELECT id, email FROM user WHERE email = #{email}")
    public User findByEmail(User user);
}
