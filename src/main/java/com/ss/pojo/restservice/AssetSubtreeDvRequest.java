package com.ss.pojo.restservice;

public class AssetSubtreeDvRequest {
    private Integer assetGroupId;
    private boolean showExpression;
    private String objectType;
    private Integer elementId;
    private String protectionType;

    public String getProtectionType() {
        return protectionType;
    }

    public void setProtectionType(String protectionType) {
        this.protectionType = protectionType;
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

    public Integer getAssetGroupId() {
        return assetGroupId;
    }

    public void setAssetGroupId(Integer assetGroupId) {
        this.assetGroupId = assetGroupId;
    }

    public boolean isShowExpression() {
        return showExpression;
    }

    public void setShowExpression(boolean showExpression) {
        this.showExpression = showExpression;
    }
}
