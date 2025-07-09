package com.ss.pojo.restservice;

import java.util.List;

public class MappingExceptionsInfo {

    List<String> lessThanTwoColumnRows;

    List<String> invalidContentRows;

    public List<String> getLessThanTwoColumnRows() {
        return lessThanTwoColumnRows;
    }

    public void setLessThanTwoColumnRows(List<String> lessThanTwoColumnRows) {
        this.lessThanTwoColumnRows = lessThanTwoColumnRows;
    }

    public List<String> getInvalidContentRows() {
        return invalidContentRows;
    }

    public void setInvalidContentRows(List<String> invalidContentRows) {
        this.invalidContentRows = invalidContentRows;
    }
}
