package com.ss.pojo.restservice;

public class AssetTypeMapRequestInfo {

    private Integer dropDownOneLevelOfInterest;

    private String dropDownOneProtectionType;

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

    public String getDropDownTwoProtectionType() {
        return dropDownTwoProtectionType;
    }

    public void setDropDownTwoProtectionType(String dropDownTwoProtectionType) {
        this.dropDownTwoProtectionType = dropDownTwoProtectionType;
    }

    public Integer getDropDownOneLevelOfInterest() {
        return dropDownOneLevelOfInterest;
    }

    public void setDropDownOneLevelOfInterest(Integer dropDownOneLevelOfInterest) {
        this.dropDownOneLevelOfInterest = dropDownOneLevelOfInterest;
    }

    public String getDropDownOneProtectionType() {
        return dropDownOneProtectionType;
    }

    public void setDropDownOneProtectionType(String dropDownOneProtectionType) {
        this.dropDownOneProtectionType = dropDownOneProtectionType;
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
}
