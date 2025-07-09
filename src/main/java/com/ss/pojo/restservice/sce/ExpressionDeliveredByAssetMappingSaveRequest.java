package com.ss.pojo.restservice.sce;

import java.util.List;

public class ExpressionDeliveredByAssetMappingSaveRequest {

    private List<Integer> associatedCouldAssets;

    private List<Integer> associatedShallAssets;

    private Integer expressionId;

    public List<Integer> getAssociatedCouldAssets() {
        return associatedCouldAssets;
    }

    public void setAssociatedCouldAssets(List<Integer> associatedCouldAssets) {
        this.associatedCouldAssets = associatedCouldAssets;
    }

    public List<Integer> getAssociatedShallAssets() {
        return associatedShallAssets;
    }

    public void setAssociatedShallAssets(List<Integer> associatedShallAssets) {
        this.associatedShallAssets = associatedShallAssets;
    }

    public Integer getExpressionId() {
        return expressionId;
    }

    public void setExpressionId(Integer expressionId) {
        this.expressionId = expressionId;
    }
}
