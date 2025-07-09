package com.ss.pojo.restservice;

public class ShieldSubtreeDvRequest {

    private Integer shieldId;
    private Integer level;
    private Integer shieldElementGroupId;
    private boolean showExpression;

    private String objectType;
    private Integer elementId;

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

    public boolean isShowExpression() {
        return showExpression;
    }

    public void setShowExpression(boolean showExpression) {
        this.showExpression = showExpression;
    }

    public String getObjectType() {
        return objectType;
    }

    public void setObjectType(String objectType) {
        this.objectType = objectType;
    }

    public Integer getElementId() {
        return elementId;
    }

    public void setElementId(Integer elementId) {
        this.elementId = elementId;
    }
}
