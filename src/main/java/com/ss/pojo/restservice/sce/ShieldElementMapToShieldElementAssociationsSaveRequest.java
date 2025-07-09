package com.ss.pojo.restservice.sce;

import java.util.List;

public class ShieldElementMapToShieldElementAssociationsSaveRequest {

    private List<Integer> associatedElements;

    private Integer shieldElementId;

    private Integer shieldId;

    public List<Integer> getAssociatedElements() {
        return associatedElements;
    }

    public void setAssociatedElements(List<Integer> associatedElements) {
        this.associatedElements = associatedElements;
    }

    public Integer getShieldElementId() {
        return shieldElementId;
    }

    public void setShieldElementId(Integer shieldElementId) {
        this.shieldElementId = shieldElementId;
    }

    public Integer getShieldId() {
        return shieldId;
    }

    public void setShieldId(Integer shieldId) {
        this.shieldId = shieldId;
    }
}
