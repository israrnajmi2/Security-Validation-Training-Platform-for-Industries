package com.ss.pojo.restservice;

import java.util.List;

public class GetAssetDeliversAttributesAndRatingsRequest {

    private List<Integer> perspectiveIds;
    private Integer assetDeliversLinkId;

    public List<Integer> getPerspectiveIds() {
        return perspectiveIds;
    }

    public void setPerspectiveIds(List<Integer> perspectiveIds) {
        this.perspectiveIds = perspectiveIds;
    }

    public Integer getAssetDeliversLinkId() {
        return assetDeliversLinkId;
    }

    public void setAssetDeliversLinkId(Integer assetDeliversLinkId) {
        this.assetDeliversLinkId = assetDeliversLinkId;
    }
}
