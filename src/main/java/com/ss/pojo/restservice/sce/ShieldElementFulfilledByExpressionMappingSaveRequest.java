package com.ss.pojo.restservice.sce;

import java.util.List;

public class ShieldElementFulfilledByExpressionMappingSaveRequest {

    private List<Integer> associatedElements;

    private Integer expressionId;

    private Integer shieldId;

    public List<Integer> getAssociatedElements() {
        return associatedElements;
    }

    public void setAssociatedElements(List<Integer> associatedElements) {
        this.associatedElements = associatedElements;
    }

    public Integer getExpressionId() {
        return expressionId;
    }

    public void setExpressionId(Integer expressionId) {
        this.expressionId = expressionId;
    }

    public Integer getShieldId() {
        return shieldId;
    }

    public void setShieldId(Integer shieldId) {
        this.shieldId = shieldId;
    }
}
