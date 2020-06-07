package com.codesquad.airbnb.web.mock;

import com.codesquad.airbnb.domain.model.*;
import com.codesquad.airbnb.domain.dto.AccommodationDTO;
import com.codesquad.airbnb.web.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/mock/rooms")
public class MockFilterController {

    @GetMapping("")
    public ResponseEntity<ApiResponse> rooms(Filter filter) {
        Map<String, Object> contents = new HashMap<>();
        List<AccommodationDTO> accommodations = new ArrayList<>();

        AccommodationDTO accommodation = new AccommodationDTO.Builder(1)
                .name("Downtown DC Private Carriage House")
                .pricePerNight(158868)
                .pricePerNightDiscounted(136627)
                .totalPrice(211581)
                .isSuperHost(false)
                .city("Washington")
                .scoresRating(4.75f)
                .images(Arrays.asList("https://codesquad-project.s3.ap-northeast-2.amazonaws.com/0/img_0.jpg",
                        "https://codesquad-project.s3.ap-northeast-2.amazonaws.com/1/img_0.jpg",
                        "https://codesquad-project.s3.ap-northeast-2.amazonaws.com/2/img_0.jpg",
                        "https://codesquad-project.s3.ap-northeast-2.amazonaws.com/3/img_0.jpg",
                        "https://codesquad-project.s3.ap-northeast-2.amazonaws.com/4/img_0.jpg"))
                .build();

        accommodations.add(accommodation);

        accommodation = new AccommodationDTO.Builder(2)
                .name("Room in Logan")
                .pricePerNight(116996)
                .pricePerNightDiscounted(116996)
                .totalPrice(117775)
                .isSuperHost(false)
                .city("Washington")
                .images(Arrays.asList("https://codesquad-project.s3.ap-northeast-2.amazonaws.com/0/img_1.jpg",
                        "https://codesquad-project.s3.ap-northeast-2.amazonaws.com/1/img_1.jpg",
                        "https://codesquad-project.s3.ap-northeast-2.amazonaws.com/2/img_1.jpg",
                        "https://codesquad-project.s3.ap-northeast-2.amazonaws.com/3/img_1.jpg",
                        "https://codesquad-project.s3.ap-northeast-2.amazonaws.com/4/img_1.jpg"))
                .build();

        accommodations.add(accommodation);

        accommodation = new AccommodationDTO.Builder(3)
                .name("Eastern Market 1BR Condo - walk to everything!")
                .pricePerNight(145321)
                .pricePerNightDiscounted(145321)
                .totalPrice(232730)
                .isSuperHost(true)
                .city("Washington")
                .scoresRating(5.0f)
                .images(Arrays.asList("https://codesquad-project.s3.ap-northeast-2.amazonaws.com/0/img_2.jpg",
                        "https://codesquad-project.s3.ap-northeast-2.amazonaws.com/1/img_2.jpg",
                        "https://codesquad-project.s3.ap-northeast-2.amazonaws.com/2/img_2.jpg",
                        "https://codesquad-project.s3.ap-northeast-2.amazonaws.com/3/img_2.jpg",
                        "https://codesquad-project.s3.ap-northeast-2.amazonaws.com/4/img_2.jpg"))
                .build();

        accommodations.add(accommodation);

        contents.put("accommodations", accommodations);
        contents.put("total", accommodations.size());

        return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.SUCCESS, contents), HttpStatus.OK);
    }
}
