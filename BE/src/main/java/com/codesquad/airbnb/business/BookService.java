package com.codesquad.airbnb.business;

import com.codesquad.airbnb.common.DAOUtils;
import com.codesquad.airbnb.dao.AccommodationDAO;
import com.codesquad.airbnb.dao.BookingMapper;
import com.codesquad.airbnb.dao.FeePolicyMapper;
import com.codesquad.airbnb.domain.dto.AccommodationDTO;
import com.codesquad.airbnb.domain.model.Accommodation;
import com.codesquad.airbnb.domain.model.Booking;
import com.codesquad.airbnb.domain.model.Filter;
import com.codesquad.airbnb.domain.model.User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class BookService {

    private AccommodationDAO accommodationDAO;
    private FeePolicyMapper feePolicyMapper;
    private BookingMapper bookingMapper;

    public BookService(AccommodationDAO accommodationDAO, FeePolicyMapper feePolicyMapper, BookingMapper bookingMapper) {
        this.accommodationDAO = accommodationDAO;
        this.feePolicyMapper = feePolicyMapper;
        this.bookingMapper = bookingMapper;
    }

    public AccommodationDTO getAccommodation(Integer id, Filter filter) {
        Map<String, Object> parameters = DAOUtils.createParameters(filter, id);
        Accommodation accommodation = accommodationDAO.findAccommodationChargeInfoById(parameters);

        float accommodationTaxRate = feePolicyMapper.findAccommodationTax();

        return new AccommodationDTO.Builder(accommodation.getId())
                .pricePerNight(accommodation.getOriginalPricePerNight())
                .pricePerNightDiscounted(accommodation.getDiscountedPricePerNight())
                .priceDuringPeriod(accommodation.getPriceDuringPeriod(filter))
                .cleaningFee(accommodation.getCleaningFee())
                .serviceTax(accommodation.getServiceTax(filter))
                .accommodationTax(accommodation.getAccommodationTax(filter, accommodationTaxRate))
                .totalPrice(accommodation.getTotalPrice(filter, accommodationTaxRate))
                .build();
    }

    public int booking(Integer id, Filter filter, User user) {
        return bookingMapper.insertBooking(new Booking(user, id, filter));
    }
}
