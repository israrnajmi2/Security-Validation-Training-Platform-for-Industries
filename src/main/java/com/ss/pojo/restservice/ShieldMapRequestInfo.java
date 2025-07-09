package com.ss.pojo.restservice;

public class ShieldMapRequestInfo {

    private Integer dropDownOneShieldId;

    private Integer dropDownOneLevelOfInterest;

    private Integer dropDownOneGroupId;

    private String dropDownTwoStartingPoint;

    private Integer dropDownTwoShieldId;

    private String dropDownTwoProtectionType;

    private boolean isDirect;

    private boolean showDirectLinksInExpressionMode;

    public boolean isShowDirectLinksInExpressionMode() {
        return showDirectLinksInExpressionMode;
    }

    public void setShowDirectLinksInExpressionMode(boolean showDirectLinksInExpressionMode) {
        this.showDirectLinksInExpressionMode = showDirectLinksInExpressionMode;
    }

    public boolean isDirect() {
        return isDirect;
    }

    public void setDirect(boolean direct) {
        isDirect = direct;
    }

    public Integer getDropDownOneShieldId() {
        return dropDownOneShieldId;
    }

    public void setDropDownOneShieldId(Integer dropDownOneShieldId) {
        this.dropDownOneShieldId = dropDownOneShieldId;
    }

    public Integer getDropDownOneLevelOfInterest() {
        return dropDownOneLevelOfInterest;
    }

    public void setDropDownOneLevelOfInterest(Integer dropDownOneLevelOfInterest) {
        this.dropDownOneLevelOfInterest = dropDownOneLevelOfInterest;
    }

    public Integer getDropDownOneGroupId() {
        return dropDownOneGroupId;
    }

    public void setDropDownOneGroupId(Integer dropDownOneGroupId) {
        this.dropDownOneGroupId = dropDownOneGroupId;
    }

    public String getDropDownTwoStartingPoint() {
        return dropDownTwoStartingPoint;
    }

    public void setDropDownTwoStartingPoint(String dropDownTwoStartingPoint) {
        this.dropDownTwoStartingPoint = dropDownTwoStartingPoint;
    }

    public Integer getDropDownTwoShieldId() {
        return dropDownTwoShieldId;
    }

    public void setDropDownTwoShieldId(Integer dropDownTwoShieldId) {
        this.dropDownTwoShieldId = dropDownTwoShieldId;
    }

    public String getDropDownTwoProtectionType() {
        return dropDownTwoProtectionType;
    }

    public void setDropDownTwoProtectionType(String dropDownTwoProtectionType) {
        this.dropDownTwoProtectionType = dropDownTwoProtectionType;
    }
}
