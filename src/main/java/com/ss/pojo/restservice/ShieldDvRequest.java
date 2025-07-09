package com.ss.pojo.restservice;

public class ShieldDvRequest {

    private Integer shieldId;
    private Integer level;
    private Integer shieldElementGroupId;
    private boolean showExpression;

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
}
