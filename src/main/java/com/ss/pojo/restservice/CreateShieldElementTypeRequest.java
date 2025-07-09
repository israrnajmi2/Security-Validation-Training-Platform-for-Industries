package com.ss.pojo.restservice;

public class CreateShieldElementTypeRequest {

    private String name;
    private String description;
    private Integer parentElementTypeId;
    private boolean isMappableToExpression;
    private Integer shieldId;

    public Integer getShieldId() {
        return shieldId;
    }

    public void setShieldId(Integer shieldId) {
        this.shieldId = shieldId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getParentElementTypeId() {
        return parentElementTypeId;
    }

    public void setParentElementTypeId(Integer parentElementTypeId) {
        this.parentElementTypeId = parentElementTypeId;
    }

    public boolean isMappableToExpression() {
        return isMappableToExpression;
    }

    public void setMappableToExpression(boolean mappableToExpression) {
        isMappableToExpression = mappableToExpression;
    }
}
