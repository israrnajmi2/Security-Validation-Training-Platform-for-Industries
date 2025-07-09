package com.ss.pojo.restservice;

public class SubjectParameterInfo {
    private Integer elementId;
    private String description;
    private String name;
    private Integer parentSubjectParameterId;
    private String parentSubjectParameterName;

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

    public Integer getParentSubjectParameterId() {
        return parentSubjectParameterId;
    }

    public void setParentSubjectParameterId(Integer parentSubjectParameterId) {
        this.parentSubjectParameterId = parentSubjectParameterId;
    }

    public String getParentSubjectParameterName() {
        return parentSubjectParameterName;
    }

    public void setParentSubjectParameterName(String parentSubjectParameterName) {
        this.parentSubjectParameterName = parentSubjectParameterName;
    }
}
