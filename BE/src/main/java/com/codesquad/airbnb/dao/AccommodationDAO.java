package com.codesquad.airbnb.dao;

import com.codesquad.airbnb.domain.dto.AccommodationDTO;
import com.codesquad.airbnb.domain.model.Accommodation;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AccommodationDAO {

    private static final String NAMESPACE = "accommodationMapper.";

    @Autowired
    private SqlSession sqlSession;

    public List<Accommodation> findUsingFilter(Map<String, Object> parameters) {
        return sqlSession.selectList(NAMESPACE + "findUsingFilter", parameters);
    }

    public int countOfFilterResult(Map<String, Object> parameters) {
        return sqlSession.selectOne(NAMESPACE + "countOfFilterResult", parameters);
    }

    public Accommodation findAccommodationChargeInfoById(Map<String, Object> parameters) {
        return sqlSession.selectOne(NAMESPACE + "findAccommodationChargeInfoById", parameters);
    }
}