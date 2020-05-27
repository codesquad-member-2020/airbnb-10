package com.codesquad.airbnb.api.mock;

import com.codesquad.airbnb.domain.*;
import com.codesquad.airbnb.dto.AccommodationDTO;
import com.codesquad.airbnb.response.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/mock/rooms")
public class MockAccommodationController {

    private static final Logger log = LoggerFactory.getLogger(MockAccommodationController.class);

    private static final int PRICE_MAX = 3200;
    private static final int PRICE_MIN = 65;
    private static final float CURRENCY_CONVERSION_FROM_USD_TO_KRW = 1231.54f;
    private static final FeePolicy feePolicy = new FeePolicy(0.2f, 0.1f);

    @GetMapping("")
    public ResponseEntity<ApiResponse> rooms(Filter filter) {

        Map<String, Object> contents = new HashMap<>();
        List<AccommodationDTO> accommodations = new ArrayList<>();

        Accommodation accommodation = new Accommodation(
                1,
                "Downtown DC Private Carriage House",
                false,
                new City("Washington", "United States"),
                38.91139f, -77.0208f,
                4, 2, 1125, 4.75f,
                (int)(129 * CURRENCY_CONVERSION_FROM_USD_TO_KRW), 0.14f, (int)(60 * CURRENCY_CONVERSION_FROM_USD_TO_KRW),
                Arrays.asList(
                        new Image(1,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/0/img_0.jpg", 1),
                        new Image(601,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/1/img_0.jpg", 1),
                        new Image(1201,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/2/img_0.jpg", 1),
                        new Image(1801,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/3/img_0.jpg", 1),
                        new Image(2401,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/4/img_0.jpg", 1))
        );

        accommodations.add(parseAccommodationDTOForRooms(filter, accommodation));

        accommodation = new Accommodation(
                2,
                "Room in Logan",
                false,
                new City("Washington", "United States"),
                38.91227f, -77.03041f,
                1, 1, 1125, 0.f,
                (int)(95 * CURRENCY_CONVERSION_FROM_USD_TO_KRW), 0.f, 0,
                Arrays.asList(
                        new Image(2,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/0/img_1.jpg", 2),
                        new Image(602,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/1/img_1.jpg", 2),
                        new Image(1202,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/2/img_1.jpg", 2),
                        new Image(1802,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/3/img_1.jpg", 2),
                        new Image(2402,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/4/img_1.jpg", 2))
        );

        accommodations.add(parseAccommodationDTOForRooms(filter, accommodation));

        accommodation = new Accommodation(
                3,
                "Eastern Market 1BR Condo - walk to everything!",
                true,
                new City("Washington", "United States"),
                38.88591f, -76.99364f,
                4, 2, 1125, 5.f,
                (int)(118 * CURRENCY_CONVERSION_FROM_USD_TO_KRW), 0.f, (int)(70 * CURRENCY_CONVERSION_FROM_USD_TO_KRW),
                Arrays.asList(
                        new Image(3,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/0/img_2.jpg", 3),
                        new Image(603,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/1/img_2.jpg", 3),
                        new Image(1203,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/2/img_2.jpg", 3),
                        new Image(1803,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/3/img_2.jpg", 3),
                        new Image(2403,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/4/img_2.jpg", 3))
        );

        accommodations.add(parseAccommodationDTOForRooms(filter, accommodation));

        contents.put("accommodations", accommodations);
        contents.put("total", accommodations.size());

        return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.SUCCESS, contents), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getReservationInformation(@PathVariable Integer id, Filter filter) {

        Accommodation accommodation = new Accommodation(
                1,
                null,
                false,
                new City("Washington", "United States"),
                38.91139f, -77.0208f,
                4, 2, 1125, 4.75f,
                (int)(129 * CURRENCY_CONVERSION_FROM_USD_TO_KRW), 0.14f, (int)(60 * CURRENCY_CONVERSION_FROM_USD_TO_KRW),
                Arrays.asList(
                        new Image(1,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/0/img_0.jpg", 1),
                        new Image(601,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/1/img_0.jpg", 1),
                        new Image(1201,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/2/img_0.jpg", 1),
                        new Image(1801,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/3/img_0.jpg", 1),
                        new Image(2401,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/4/img_0.jpg", 1))
        );

        return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.SUCCESS, parseAccommodationDTOForBooking(filter, accommodation)), HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public ResponseEntity<ApiResponse> bookRoom(@PathVariable Integer id, Filter filter) {

        log.debug("check In: {}, check Out: {}, period: {}", filter.getCheckIn(), filter.getCheckOut(), filter.getPeriod());

        if (filter.getPeriod() <= 0) {
            return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.FAIL, "체크인, 체크아웃을 다시 확인해주세요."), HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.SUCCESS, null), HttpStatus.OK);
    }

    private AccommodationDTO parseAccommodationDTOForRooms(Filter filter, Accommodation accommodation) {

        int priceDuringPeriod = accommodation.getPriceDuringPeriod(filter);
        int serviceTax = accommodation.getServiceTax((int)((PRICE_MAX - PRICE_MIN) * CURRENCY_CONVERSION_FROM_USD_TO_KRW), feePolicy.getServiceFeeMaxRate());
        int accommodationTax = (int)(serviceTax * feePolicy.getAccommodationTaxRate());

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

    private AccommodationDTO parseAccommodationDTOForBooking(Filter filter, Accommodation accommodation) {

        int priceDuringPeriod = accommodation.getPriceDuringPeriod(filter);
        int serviceTax = accommodation.getServiceTax((int)((PRICE_MAX - PRICE_MIN) * CURRENCY_CONVERSION_FROM_USD_TO_KRW), feePolicy.getServiceFeeMaxRate());
        int accommodationTax = (int)(serviceTax * feePolicy.getAccommodationTaxRate());

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
}
