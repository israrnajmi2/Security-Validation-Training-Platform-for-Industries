package com.ss.pojo.restservice;

public class MethodParameterInfo {
    private Integer elementId;
    private String description;
    private String name;
    private Integer parentMethodParameterId;
    private String parentMethodParameterName;

    public Integer getElementId() {
        return elementId;
    }

    public void setElementId(Integer elementId) {
        this.elementId = elementId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getParentMethodParameterId() {
        return parentMethodParameterId;
    }

    public void setParentMethodParameterId(Integer parentMethodParameterId) {
        this.parentMethodParameterId = parentMethodParameterId;
    }

    public String getParentMethodParameterName() {
        return parentMethodParameterName;
    }

    public void setParentMethodParameterName(String parentMethodParameterName) {
        this.parentMethodParameterName = parentMethodParameterName;
    }
}
