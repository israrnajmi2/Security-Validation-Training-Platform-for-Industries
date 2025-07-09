package com.ss.pojo.restservice.sce;

import java.util.List;

public class ExpressionFulfillsMappingSaveRequest {

    private List<Integer> associatedExpressions;

    private Integer elementId;

    public List<Integer> getAssociatedExpressions() {
        return associatedExpressions;
    }

    public void setAssociatedExpressions(List<Integer> associatedExpressions) {
        this.associatedExpressions = associatedExpressions;
    }

    public Integer getElementId() {
        return elementId;
    }

    public void setElementId(Integer elementId) {
        this.elementId = elementId;
    }
}
