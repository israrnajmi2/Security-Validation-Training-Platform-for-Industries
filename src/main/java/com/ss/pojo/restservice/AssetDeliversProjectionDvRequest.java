package com.ss.pojo.restservice;

import java.util.List;

public class AssetDeliversProjectionDvRequest {

    private Integer shieldId;
    private Integer level;
    private Integer shieldElementGroupId;
    private List<Integer> perspectiveIds;
    private boolean isDirectMode;

    private Integer projectionShieldId;
    private Integer projectionLevel;
    private Integer projectionShieldElementGroupId;

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

    public Integer getProjectionShieldId() {
        return projectionShieldId;
    }

    public void setProjectionShieldId(Integer projectionShieldId) {
        this.projectionShieldId = projectionShieldId;
    }

    public Integer getProjectionLevel() {
        return projectionLevel;
    }

    public void setProjectionLevel(Integer projectionLevel) {
        this.projectionLevel = projectionLevel;
    }

    public Integer getProjectionShieldElementGroupId() {
        return projectionShieldElementGroupId;
    }

    public void setProjectionShieldElementGroupId(Integer projectionShieldElementGroupId) {
        this.projectionShieldElementGroupId = projectionShieldElementGroupId;
    }

    public boolean isDirectMode() {
        return isDirectMode;
    }

    public void setDirectMode(boolean directMode) {
        isDirectMode = directMode;
    }
}
