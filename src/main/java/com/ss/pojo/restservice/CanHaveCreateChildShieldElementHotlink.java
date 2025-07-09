package com.ss.pojo.restservice;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CanHaveCreateChildShieldElementHotlink {

    private String objectType;
    private Integer shieldElementTypeId;
    private String shieldElementTypeName;
    //private boolean canHaveCreateChildShieldElementHotlink;
    private String childElementType;
    private String label;

    public String getChildElementType() {
        return childElementType;
    }

    public void setChildElementType(String childElementType) {
        this.childElementType = childElementType;
    }

    public String getShieldElementTypeName() {
        return shieldElementTypeName;
    }

    public void setShieldElementTypeName(String shieldElementTypeName) {
        this.shieldElementTypeName = shieldElementTypeName;
    }

    public String getObjectType() {
        return objectType;
    }

    public void setObjectType(String objectType) {
        this.objectType = objectType;
    }

    public Integer getShieldElementTypeId() {
        return shieldElementTypeId;
    }

    public void setShieldElementTypeId(Integer shieldElementTypeId) {
        this.shieldElementTypeId = shieldElementTypeId;
    }

    /*public boolean isCanHaveCreateChildShieldElementHotlink() {
        return canHaveCreateChildShieldElementHotlink;
    }

    public void setCanHaveCreateChildShieldElementHotlink(boolean canHaveCreateChildShieldElementHotlink) {
        this.canHaveCreateChildShieldElementHotlink = canHaveCreateChildShieldElementHotlink;
    }*/

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}