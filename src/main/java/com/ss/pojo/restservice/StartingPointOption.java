package com.ss.pojo.restservice;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class StartingPointOption {

    private String label;
    private String startingPoint;
    private Integer shieldId;
    private String protectionType;
    private String objectTypeForIcon;
    private String linkTypeAttr;
    private String linkNameAttr;

    public String getLinkTypeAttr() {
        return linkTypeAttr;
    }

    public void setLinkTypeAttr(String linkTypeAttr) {
        this.linkTypeAttr = linkTypeAttr;
    }

    public String getLinkNameAttr() {
        return linkNameAttr;
    }

    public void setLinkNameAttr(String linkNameAttr) {
        this.linkNameAttr = linkNameAttr;
    }

    public String getObjectTypeForIcon() {
        return objectTypeForIcon;
    }

    public void setObjectTypeForIcon(String objectTypeForIcon) {
        this.objectTypeForIcon = objectTypeForIcon;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getStartingPoint() {
        return startingPoint;
    }

    public void setStartingPoint(String startingPoint) {
        this.startingPoint = startingPoint;
    }

    public Integer getShieldId() {
        return shieldId;
    }

    public void setShieldId(Integer shieldId) {
        this.shieldId = shieldId;
    }

    public String getProtectionType() {
        return protectionType;
    }

    public void setProtectionType(String protectionType) {
        this.protectionType = protectionType;
    }
}
