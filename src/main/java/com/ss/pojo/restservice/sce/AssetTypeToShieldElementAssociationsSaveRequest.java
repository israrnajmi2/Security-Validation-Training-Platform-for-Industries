package com.ss.pojo.restservice.sce;

import java.util.List;

public class AssetTypeToShieldElementAssociationsSaveRequest {

    private List<Integer> associatedElements;

    private Integer assetTypeId;

    private Integer shieldId;

    public List<Integer> getAssociatedElements() {
        return associatedElements;
    }

    public void setAssociatedElements(List<Integer> associatedElements) {
        this.associatedElements = associatedElements;
    }

    public Integer getAssetTypeId() {
        return assetTypeId;
    }

    public void setAssetTypeId(Integer assetTypeId) {
        this.assetTypeId = assetTypeId;
    }

    public Integer getShieldId() {
        return shieldId;
    }

    public void setShieldId(Integer shieldId) {
        this.shieldId = shieldId;
    }
}
