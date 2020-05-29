package com.codesquad.airbnb.business;

import com.codesquad.airbnb.domain.model.Accommodation;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FilterServiceTest {

    @Autowired
    private FilterService filterService;

    @Test
    public void 숙소_리스트() throws Exception {
        // when
        List<Accommodation> accommodations = filterService.findAll();

        // then
        assertThat(accommodations).isNotNull();
        assertThat(accommodations.size()).isEqualTo(600);
    }
}
