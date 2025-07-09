package com.ss.pojo;

import com.ss.pojo.helper.IdNameObject;

import java.util.Date;
import java.util.List;

public class PerspectiveGroupInfo {

    private boolean isRated;
    private List<Integer> perspectiveIds;
    private Date date;
    private String rulerType;
    //levelOfEvaluation applicable to shield element ruler type
    private Integer levelOfEvaluation;

    private boolean groupFoundAndIncludeAllChildren;

    private List<IdNameObject> groupItems;


    public boolean isRated() {
        return isRated;
    }

    public void setRated(boolean rated) {
        isRated = rated;
    }

    public List<Integer> getPerspectiveIds() {
        return perspectiveIds;
    }

    public void setPerspectiveIds(List<Integer> perspectiveIds) {
        this.perspectiveIds = perspectiveIds;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getRulerType() {
        return rulerType;
    }

    public void setRulerType(String rulerType) {
        this.rulerType = rulerType;
    }

    public Integer getLevelOfEvaluation() {
        return levelOfEvaluation;
    }

    public void setLevelOfEvaluation(Integer levelOfEvaluation) {
        this.levelOfEvaluation = levelOfEvaluation;
    }

    public boolean isGroupFoundAndIncludeAllChildren() {
        return groupFoundAndIncludeAllChildren;
    }

    public void setGroupFoundAndIncludeAllChildren(boolean groupFoundAndIncludeAllChildren) {
        this.groupFoundAndIncludeAllChildren = groupFoundAndIncludeAllChildren;
    }

    public List<IdNameObject> getGroupItems() {
        return groupItems;
    }

    public void setGroupItems(List<IdNameObject> groupItems) {
        this.groupItems = groupItems;
    }
}
