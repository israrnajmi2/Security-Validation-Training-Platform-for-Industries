package com.ss.pojo.restservice;

public class EditUserRoleRequest {

    private Integer elementId;
    private String name;
    private String description;
    private String modeDirectExpressionOrBoth;
    private boolean isApprovalRequired;
    private boolean canApprove;

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

    public String getModeDirectExpressionOrBoth() {
        return modeDirectExpressionOrBoth;
    }

    public void setModeDirectExpressionOrBoth(String modeDirectExpressionOrBoth) {
        this.modeDirectExpressionOrBoth = modeDirectExpressionOrBoth;
    }

    public boolean isApprovalRequired() {
        return isApprovalRequired;
    }

    public void setApprovalRequired(boolean approvalRequired) {
        isApprovalRequired = approvalRequired;
    }

    public boolean isCanApprove() {
        return canApprove;
    }

    public void setCanApprove(boolean canApprove) {
        this.canApprove = canApprove;
    }
}
