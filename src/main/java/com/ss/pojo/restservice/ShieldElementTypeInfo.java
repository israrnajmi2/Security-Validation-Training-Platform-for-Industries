package com.ss.pojo.restservice;

public class ShieldElementTypeInfo {

    private Integer elementId;
    private String name;
    private String description;
    private Integer parentElementTypeId;
    private String parentElementTypeName;
    private boolean isMappableToExpression;
    private Integer shieldId;
    private String shieldName;

    public Integer getElementId() {
        return elementId;
    }

    public void setElementId(Integer elementId) {
        this.elementId = elementId;
    }

    public String getParentElementTypeName() {
        return parentElementTypeName;
    }

    public void setParentElementTypeName(String parentElementTypeName) {
        this.parentElementTypeName = parentElementTypeName;
    }

    public String getShieldName() {
        return shieldName;
    }

    public void setShieldName(String shieldName) {
        this.shieldName = shieldName;
    }

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
