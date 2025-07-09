package com.ss.pojo.restservice;

import com.ss.pojo.ViewDescriptorWithLabel;

public class PivotRequest {

    private Integer elementId;
    private String objectType;
    private ViewDescriptorWithLabel viewDescriptorWithLabel;

    public Integer getElementId() {
        return elementId;
    }

    public void setElementId(Integer elementId) {
        this.elementId = elementId;
    }

    public String getObjectType() {
        return objectType;
    }

    public void setObjectType(String objectType) {
        this.objectType = objectType;
    }

    public ViewDescriptorWithLabel getViewDescriptorWithLabel() {
        return viewDescriptorWithLabel;
    }

    public void setViewDescriptorWithLabel(ViewDescriptorWithLabel viewDescriptorWithLabel) {
        this.viewDescriptorWithLabel = viewDescriptorWithLabel;
    }
}
