package com.ss.pojo.restservice;

public class ObjectiveParameterInfo {
    private Integer elementId;
    private String description;
    private String name;
    private Integer parentObjectiveParameterId;
    private String parentObjectiveParameterName;

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

    public Integer getParentObjectiveParameterId() {
        return parentObjectiveParameterId;
    }

    public void setParentObjectiveParameterId(Integer parentObjectiveParameterId) {
        this.parentObjectiveParameterId = parentObjectiveParameterId;
    }

    public String getParentObjectiveParameterName() {
        return parentObjectiveParameterName;
    }

    public void setParentObjectiveParameterName(String parentObjectiveParameterName) {
        this.parentObjectiveParameterName = parentObjectiveParameterName;
    }
}
