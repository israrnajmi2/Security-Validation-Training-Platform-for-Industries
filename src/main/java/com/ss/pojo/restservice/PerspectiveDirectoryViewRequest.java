package com.ss.pojo.restservice;

public class PerspectiveDirectoryViewRequest {
    private Integer perspectiveId;
    private Integer evaluationPeriodId;
    private String rulerTypeName;

    private String startingPoint;
    private Integer staringPointIdIfExist;
    private Integer evaluationLevel;

    public Integer getPerspectiveId() {
        return perspectiveId;
    }

    public void setPerspectiveId(Integer perspectiveId) {
        this.perspectiveId = perspectiveId;
    }

    public Integer getEvaluationPeriodId() {
        return evaluationPeriodId;
    }

    public void setEvaluationPeriodId(Integer evaluationPeriodId) {
        this.evaluationPeriodId = evaluationPeriodId;
    }

    public String getRulerTypeName() {
        return rulerTypeName;
    }

    public void setRulerTypeName(String rulerTypeName) {
        this.rulerTypeName = rulerTypeName;
    }

    public String getStartingPoint() {
        return startingPoint;
    }

    public void setStartingPoint(String startingPoint) {
        this.startingPoint = startingPoint;
    }

    public Integer getStaringPointIdIfExist() {
        return staringPointIdIfExist;
    }

    public void setStaringPointIdIfExist(Integer staringPointIdIfExist) {
        this.staringPointIdIfExist = staringPointIdIfExist;
    }

    public Integer getEvaluationLevel() {
        return evaluationLevel;
    }

    public void setEvaluationLevel(Integer evaluationLevel) {
        this.evaluationLevel = evaluationLevel;
    }
}
