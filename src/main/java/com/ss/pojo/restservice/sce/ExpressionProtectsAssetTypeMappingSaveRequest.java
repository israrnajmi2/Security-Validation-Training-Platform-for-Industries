package com.ss.pojo.restservice.sce;

import java.util.List;

public class ExpressionProtectsAssetTypeMappingSaveRequest {

    private List<Integer> associatedCouldAssetTypes;

    private List<Integer> associatedShallAssetTypes;

    private Integer expressionId;

    public List<Integer> getAssociatedCouldAssetTypes() {
        return associatedCouldAssetTypes;
    }

    public void setAssociatedCouldAssetTypes(List<Integer> associatedCouldAssetTypes) {
        this.associatedCouldAssetTypes = associatedCouldAssetTypes;
    }

    public List<Integer> getAssociatedShallAssetTypes() {
        return associatedShallAssetTypes;
    }

    public void setAssociatedShallAssetTypes(List<Integer> associatedShallAssetTypes) {
        this.associatedShallAssetTypes = associatedShallAssetTypes;
    }

    public Integer getExpressionId() {
        return expressionId;
    }

    public void setExpressionId(Integer expressionId) {
        this.expressionId = expressionId;
    }
}
