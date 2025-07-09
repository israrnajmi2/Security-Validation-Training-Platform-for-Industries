package com.ss.pojo.restservice;

import java.util.List;

public class GetAssetImplementsAttributesAndRatingsRequest {

    private List<Integer> perspectiveIds;
    private Integer assetImplementsLinkId;

    public List<Integer> getPerspectiveIds() {
        return perspectiveIds;
    }

    public void setPerspectiveIds(List<Integer> perspectiveIds) {
        this.perspectiveIds = perspectiveIds;
    }

    public Integer getAssetImplementsLinkId() {
        return assetImplementsLinkId;
    }

    public void setAssetImplementsLinkId(Integer assetImplementsLinkId) {
        this.assetImplementsLinkId = assetImplementsLinkId;
    }
}
