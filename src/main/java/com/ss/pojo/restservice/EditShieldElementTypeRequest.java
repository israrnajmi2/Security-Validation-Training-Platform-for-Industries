package com.ss.pojo.restservice;

public class EditShieldElementTypeRequest {

    private Integer elementId;
    private String name;
    private String description;
    private boolean isMappableToExpression;

    public Integer getElementId() {
        return elementId;
    }

    public void setElementId(Integer elementId) {
        this.elementId = elementId;
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

    public boolean isMappableToExpression() {
        return isMappableToExpression;
    }

    public void setMappableToExpression(boolean mappableToExpression) {
        isMappableToExpression = mappableToExpression;
    }
}
