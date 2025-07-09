package com.ss.pojo.restservice.sce;

import java.util.List;

public class AssetDirectMappedToShieldElementSaveRequest {

    private List<Integer> associatedAssets;

    private Integer shieldElementId;

    public List<Integer> getAssociatedAssets() {
        return associatedAssets;
    }

    public void setAssociatedAssets(List<Integer> associatedAssets) {
        this.associatedAssets = associatedAssets;
    }

    public Integer getShieldElementId() {
        return shieldElementId;
    }

    public void setShieldElementId(Integer shieldElementId) {
        this.shieldElementId = shieldElementId;
    }
}
