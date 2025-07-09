package com.ss.pojo.restservice;

import java.util.List;

public class AssetDeliversDvRequest {

    private Integer shieldId;
    private Integer level;
    private Integer shieldElementGroupId;
    private List<Integer> perspectiveIds;

    public Integer getShieldId() {
        return shieldId;
    }

    public void setShieldId(Integer shieldId) {
        this.shieldId = shieldId;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getShieldElementGroupId() {
        return shieldElementGroupId;
    }

    public void setShieldElementGroupId(Integer shieldElementGroupId) {
        this.shieldElementGroupId = shieldElementGroupId;
    }

    public List<Integer> getPerspectiveIds() {
        return perspectiveIds;
    }

    public void setPerspectiveIds(List<Integer> perspectiveIds) {
        this.perspectiveIds = perspectiveIds;
    }
}
