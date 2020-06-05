package com.codesquad.airbnb.web;

import com.codesquad.airbnb.domain.model.Filter;
import com.codesquad.airbnb.web.response.ApiResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URI;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BookingControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    private Filter filter;

    private Integer id;

    @BeforeEach
    public void 세팅() {
        id = 18;

        filter = new Filter();
        filter.setCheckIn(LocalDate.parse("2020-06-04"));
        filter.setCheckOut(LocalDate.parse("2020-06-07"));
    }

    @Test
    public void 숙소_예약_모달창() {
        // given
        URI uri = UriComponentsBuilder.fromHttpUrl("http://localhost")
                .port(port)
                .path("/rooms/" + id)
                .queryParam("checkIn", filter.getCheckIn())
                .queryParam("checkOut", filter.getCheckOut())
                .build()
                .toUri();

        // when
        ResponseEntity<ApiResponse> response = restTemplate.getForEntity(uri, ApiResponse.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getStatus()).isEqualTo(ApiResponse.Status.SUCCESS);

        LinkedHashMap<String, Object> data = (LinkedHashMap)response.getBody().getContent();

        assertThat(data).isNotNull();
        assertThat(data.get("id")).isEqualTo(18);
    }

    @Test
    public void 예약() {
        // given
        URI uri = UriComponentsBuilder.fromHttpUrl("http://localhost")
                .port(port)
                .path("/rooms/" + id)
                .queryParam("checkIn", filter.getCheckIn())
                .queryParam("checkOut", filter.getCheckOut())
                .build()
                .toUri();

        // when
        ResponseEntity<ApiResponse> response = restTemplate.postForEntity(uri, null, ApiResponse.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getStatus()).isEqualTo(ApiResponse.Status.SUCCESS);
    }

    @Test
    public void 숙소_리스트에서_예약된_숙소_확인() {
        // given
        URI uri = UriComponentsBuilder.fromHttpUrl("http://localhost")
                .port(port)
                .path("/rooms")
                .queryParam("checkIn", filter.getCheckIn())
                .queryParam("checkOut", filter.getCheckOut())
                .build()
                .toUri();

        // when
        ResponseEntity<ApiResponse> response = restTemplate.getForEntity(uri, ApiResponse.class);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getStatus()).isEqualTo(ApiResponse.Status.SUCCESS);

        LinkedHashMap<String, Object> data = (LinkedHashMap)response.getBody().getContent();
        List<Object> accommodations = (ArrayList<Object>)data.get("accommodations");

        assertThat((int) accommodations.stream().filter(map -> ((LinkedHashMap) map).get("id") == id).count()).isEqualTo(0);
    }
}
