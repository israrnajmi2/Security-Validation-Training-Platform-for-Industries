package com.ss.pojo.restservice.sce;

import java.util.List;

public class AssetTypeDirectMappedToShieldElementSaveRequest {

    private List<Integer> associatedAssetTypes;

    private Integer shieldElementId;

    public List<Integer> getAssociatedAssetTypes() {
        return associatedAssetTypes;
    }

    public void setAssociatedAssetTypes(List<Integer> associatedAssetTypes) {
        this.associatedAssetTypes = associatedAssetTypes;
    }

    public Integer getShieldElementId() {
        return shieldElementId;
    }

    public void setShieldElementId(Integer shieldElementId) {
        this.shieldElementId = shieldElementId;
    }
}
