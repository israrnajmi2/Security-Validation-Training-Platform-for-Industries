package com.ss.pojo.restservice;

public class CreateGuidanceRequest {

    private String description;
    private Integer shieldElementId;
    private Integer sourceId;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getShieldElementId() {
        return shieldElementId;
    }

    public void setShieldElementId(Integer shieldElementId) {
        this.shieldElementId = shieldElementId;
    }

    public Integer getSourceId() {
        return sourceId;
    }

    public void setSourceId(Integer sourceId) {
        this.sourceId = sourceId;
    }
}
