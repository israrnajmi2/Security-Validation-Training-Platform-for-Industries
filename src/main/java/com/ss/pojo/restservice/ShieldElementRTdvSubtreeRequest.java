package com.ss.pojo.restservice;

import java.util.List;

public class ShieldElementRTdvSubtreeRequest {

    private Integer shieldId;
    private Integer level;
    private Integer shieldElementGroupId;
    private List<Integer> perspectiveIds;
    private Integer elementId;
    private String objectType;

    public Integer getElementId() {
        return elementId;
    }

    public void setElementId(Integer elementId) {
        this.elementId = elementId;
    }

    public String getObjectType() {
        return objectType;
    }

    public void setObjectType(String objectType) {
        this.objectType = objectType;
    }

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
