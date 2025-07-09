package com.ss.pojo.restservice;

import java.util.List;

public class GetShieldElementRTAttributesAndRatingsRequest {

    private List<Integer> perspectiveIds;
    private Integer shieldElementId;

    public List<Integer> getPerspectiveIds() {
        return perspectiveIds;
    }

    public void setPerspectiveIds(List<Integer> perspectiveIds) {
        this.perspectiveIds = perspectiveIds;
    }

    public Integer getShieldElementId() {
        return shieldElementId;
    }

    public void setShieldElementId(Integer shieldElementId) {
        this.shieldElementId = shieldElementId;
    }
}
