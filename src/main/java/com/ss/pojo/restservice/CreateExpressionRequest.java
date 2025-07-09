package com.ss.pojo.restservice;

public class CreateExpressionRequest {

    private String description;
    private Integer objectiveParameterId;
    private Integer methodParameterId;
    private Integer contentParameterId;
    private Integer subjectParameterId;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getObjectiveParameterId() {
        return objectiveParameterId;
    }

    public void setObjectiveParameterId(Integer objectiveParameterId) {
        this.objectiveParameterId = objectiveParameterId;
    }

    public Integer getMethodParameterId() {
        return methodParameterId;
    }

    public void setMethodParameterId(Integer methodParameterId) {
        this.methodParameterId = methodParameterId;
    }

    public Integer getContentParameterId() {
        return contentParameterId;
    }

    public void setContentParameterId(Integer contentParameterId) {
        this.contentParameterId = contentParameterId;
    }

    public Integer getSubjectParameterId() {
        return subjectParameterId;
    }

    public void setSubjectParameterId(Integer subjectParameterId) {
        this.subjectParameterId = subjectParameterId;
    }
}
