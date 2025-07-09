package com.ss.pojo.restservice.sce;

import java.util.List;

public class AssetToShieldElementAssociationsSaveRequest {

    private List<Integer> associatedElements;

    private Integer assetId;

    private Integer shieldId;

    public List<Integer> getAssociatedElements() {
        return associatedElements;
    }

    public void setAssociatedElements(List<Integer> associatedElements) {
        this.associatedElements = associatedElements;
    }

    public Integer getAssetId() {
        return assetId;
    }

    public void setAssetId(Integer assetId) {
        this.assetId = assetId;
    }

    public Integer getShieldId() {
        return shieldId;
    }

    public void setShieldId(Integer shieldId) {
        this.shieldId = shieldId;
    }
}
