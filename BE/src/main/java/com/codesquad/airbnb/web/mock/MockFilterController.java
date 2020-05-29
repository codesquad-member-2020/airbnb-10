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

        Accommodation accommodation = MockAccommodationUtil.createAccommodation(
                1,
                "Downtown DC Private Carriage House",
                false,
                "Washington", "United States",
                38.91139f, -77.0208f,
                4, 2, 1125, 4.75f,
                129, 0.14f, 60,
                Arrays.asList(
                        new Image(1,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/0/img_0.jpg", 1),
                        new Image(601,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/1/img_0.jpg", 1),
                        new Image(1201,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/2/img_0.jpg", 1),
                        new Image(1801,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/3/img_0.jpg", 1),
                        new Image(2401,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/4/img_0.jpg", 1))
        );

        accommodations.add(MockAccommodationUtil.parseAccommodationDTO(filter, accommodation, false));

        accommodation = MockAccommodationUtil.createAccommodation(
                2,
                "Room in Logan",
                false,
                "Washington", "United States",
                38.91227f, -77.03041f,
                1, 1, 1125, 0.f,
                95, 0.f, 0,
                Arrays.asList(
                        new Image(2,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/0/img_1.jpg", 2),
                        new Image(602,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/1/img_1.jpg", 2),
                        new Image(1202,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/2/img_1.jpg", 2),
                        new Image(1802,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/3/img_1.jpg", 2),
                        new Image(2402,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/4/img_1.jpg", 2))
        );

        accommodations.add(MockAccommodationUtil.parseAccommodationDTO(filter, accommodation, false));

        accommodation = MockAccommodationUtil.createAccommodation(
                3,
                "Eastern Market 1BR Condo - walk to everything!",
                true,
                "Washington", "United States",
                38.88591f, -76.99364f,
                4, 2, 1125, 5.f,
                118, 0.f, 70,
                Arrays.asList(
                        new Image(3,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/0/img_2.jpg", 3),
                        new Image(603,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/1/img_2.jpg", 3),
                        new Image(1203,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/2/img_2.jpg", 3),
                        new Image(1803,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/3/img_2.jpg", 3),
                        new Image(2403,"https://codesquad-project.s3.ap-northeast-2.amazonaws.com/4/img_2.jpg", 3))
        );

        accommodations.add(MockAccommodationUtil.parseAccommodationDTO(filter, accommodation, false));

        contents.put("accommodations", accommodations);
        contents.put("total", accommodations.size());

        return new ResponseEntity<>(new ApiResponse(ApiResponse.Status.SUCCESS, contents), HttpStatus.OK);
    }
}
