package com.ss.pojo.restservice;

public class ContentParameterInfo {
    private Integer elementId;
    private String description;
    private String name;
    private Integer parentContentParameterId;
    private String parentContentParameterName;

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

    public Integer getParentContentParameterId() {
        return parentContentParameterId;
    }

    public void setParentContentParameterId(Integer parentContentParameterId) {
        this.parentContentParameterId = parentContentParameterId;
    }

    public String getParentContentParameterName() {
        return parentContentParameterName;
    }

    public void setParentContentParameterName(String parentContentParameterName) {
        this.parentContentParameterName = parentContentParameterName;
    }
}
