package com.ss.pojo.restservice.sce;

import java.util.List;

public class ExpressionProtectedByMappingSaveRequest {

    private List<Integer> associatedCouldExpressions;

    private List<Integer> associatedShallExpressions;

    private Integer elementId;

    public List<Integer> getAssociatedCouldExpressions() {
        return associatedCouldExpressions;
    }

    public void setAssociatedCouldExpressions(List<Integer> associatedCouldExpressions) {
        this.associatedCouldExpressions = associatedCouldExpressions;
    }

    public List<Integer> getAssociatedShallExpressions() {
        return associatedShallExpressions;
    }

    public void setAssociatedShallExpressions(List<Integer> associatedShallExpressions) {
        this.associatedShallExpressions = associatedShallExpressions;
    }

    public Integer getElementId() {
        return elementId;
    }

    public void setElementId(Integer elementId) {
        this.elementId = elementId;
    }
}
