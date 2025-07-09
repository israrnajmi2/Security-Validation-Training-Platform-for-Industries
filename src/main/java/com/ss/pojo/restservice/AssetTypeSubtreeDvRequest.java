package com.ss.pojo.restservice;

public class AssetTypeSubtreeDvRequest {
    private Integer level;
    private Integer assetTypeGroupId;
    private boolean showAsset;
    private boolean showExpression;
    private String protectionType;

    private String objectType;
    private Integer elementId;

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

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getAssetTypeGroupId() {
        return assetTypeGroupId;
    }

    public void setAssetTypeGroupId(Integer assetTypeGroupId) {
        this.assetTypeGroupId = assetTypeGroupId;
    }

    public boolean isShowAsset() {
        return showAsset;
    }

    public void setShowAsset(boolean showAsset) {
        this.showAsset = showAsset;
    }

    public boolean isShowExpression() {
        return showExpression;
    }

    public void setShowExpression(boolean showExpression) {
        this.showExpression = showExpression;
    }

    public String getProtectionType() {
        return protectionType;
    }

    public void setProtectionType(String protectionType) {
        this.protectionType = protectionType;
    }
}
