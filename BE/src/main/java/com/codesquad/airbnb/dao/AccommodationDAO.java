package com.codesquad.airbnb.dao;

import com.codesquad.airbnb.domain.model.Accommodation;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class AccommodationDAO {

    private static final String NAMESPACE = "accommodationMapper.";

    @Autowired
    private SqlSession sqlSession;

    public List<Accommodation> findUsingFilter(int people,
                                               int priceMin, int priceMax,
                                               float exchangeRate,
                                               long period,
                                               int itemsOffset) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("people", people);
        parameters.put("priceMin", priceMin);
        parameters.put("priceMax", priceMax);
        parameters.put("exchangeRate", exchangeRate);
        parameters.put("period", period);
        parameters.put("itemsOffset", itemsOffset);
        return sqlSession.selectList(NAMESPACE + "findUsingFilter", parameters);
    }
}
