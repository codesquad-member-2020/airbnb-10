package com.codesquad.airbnb.web.mock;

import com.codesquad.airbnb.domain.dto.AccommodationDTO;
import com.codesquad.airbnb.domain.model.*;

import java.util.List;
import java.util.stream.Collectors;

public class MockAccommodationUtil {

    private static final int PRICE_MAX = 3200;
    private static final int PRICE_MIN = 65;
    private static final float CURRENCY_CONVERSION_FROM_USD_TO_KRW = 1231.54f;
    private static final FeePolicy feePolicy = new FeePolicy(0.2f, 0.1f);

    public static Accommodation createAccommodation(Integer id,
                                                    String name,
                                                    boolean isSuperHost,
                                                    String cityName, String cityCountry,
                                                    float latitude, float longitude,
                                                    int maximumCapacity,
                                                    int minimumNights, int maximumNights,
                                                    float scoresRating,
                                                    int price, float discountRate, int cleaningFee,
                                                    List<Image> images
                                                    ) {
        return new Accommodation(
                id,
                name,
                isSuperHost,
                new City(cityName, cityCountry),
                latitude, longitude,
                maximumCapacity, minimumNights, maximumNights, scoresRating,
                (int)(price * CURRENCY_CONVERSION_FROM_USD_TO_KRW), discountRate, (int)(cleaningFee * CURRENCY_CONVERSION_FROM_USD_TO_KRW),
                images
        );
    }

    public static AccommodationDTO parseAccommodationDTO(Filter filter, Accommodation accommodation, boolean isForBooking) {

        int priceDuringPeriod = accommodation.getPriceDuringPeriod(filter);
        int serviceTax = accommodation.getServiceTax((int)((PRICE_MAX - PRICE_MIN) * CURRENCY_CONVERSION_FROM_USD_TO_KRW), feePolicy.getServiceFeeMaxRate());
        int accommodationTax = (int)(serviceTax * feePolicy.getAccommodationTaxRate());

        if (isForBooking) {
            return new AccommodationDTO.Builder(accommodation.getId())
                    .name(accommodation.getName())
                    .pricePerNight(accommodation.getPrice())
                    .pricePerNightDiscounted(accommodation.getDiscountedPrice())
                    .priceDuringPeriod(priceDuringPeriod)
                    .cleaningFee(accommodation.getCleaningFee())
                    .serviceTax(serviceTax)
                    .accommodationTax(accommodationTax)
                    .totalPrice(accommodation.getTotalPrice(priceDuringPeriod, serviceTax, accommodationTax))
                    .build();
        }

        return new AccommodationDTO.Builder(accommodation.getId())
                .name(accommodation.getName())
                .pricePerNight(accommodation.getPrice())
                .pricePerNightDiscounted(accommodation.getDiscountedPrice())
                .totalPrice(accommodation.getTotalPrice(priceDuringPeriod, serviceTax, accommodationTax))
                .isSuperHost(accommodation.isSuperHost())
                .city(accommodation.getCity().getName())
                .scoresRating(accommodation.getScoresRating())
                .images(accommodation.getImages().stream().map(Image::getUrl).collect(Collectors.toList()))
                .build();
    }
}
