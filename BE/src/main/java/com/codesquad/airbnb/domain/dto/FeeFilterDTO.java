package com.codesquad.airbnb.domain.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.util.List;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.PUBLIC_ONLY)
public class FeeFilterDTO {

    private int average;

    private int minimum;

    private int maximum;

    private List<Integer> feelist;

    public FeeFilterDTO(int minimum, int maximum, List<Integer> feelist) {
        this.minimum = minimum;
        this.maximum = maximum;
        this.feelist = feelist;
        this.average = calculateAverage();
    }

    public int getAverage() {
        return average;
    }

    public int getMinimum() {
        return minimum;
    }

    public int getMaximum() {
        return maximum;
    }

    public List<Integer> getFeelist() {
        return feelist;
    }

    private int calculateAverage() {
        return (int)feelist.stream().mapToInt(Integer::intValue).average().orElse(0);
    }
}
