package com.codesquad.airbnb.business;

import com.codesquad.airbnb.domain.model.Accommodation;
import com.codesquad.airbnb.dao.AccommodationDAO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FilterService {

    private AccommodationDAO accommodationDAO;

    public FilterService(AccommodationDAO accommodationDAO) {
        this.accommodationDAO = accommodationDAO;
    }

    public List<Accommodation> findAll() {
        return accommodationDAO.findAll();
    }
}
