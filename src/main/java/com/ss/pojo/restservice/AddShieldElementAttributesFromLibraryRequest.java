package com.ss.pojo.restservice;

import java.util.List;

public class AddShieldElementAttributesFromLibraryRequest {

    private Integer perspectiveId;
    private Integer shieldElementId;
    private List<Integer> libraryAttributeIdsList;

    public Integer getPerspectiveId() {
        return perspectiveId;
    }

    public void setPerspectiveId(Integer perspectiveId) {
        this.perspectiveId = perspectiveId;
    }

    public Integer getShieldElementId() {
        return shieldElementId;
    }

    public void setShieldElementId(Integer shieldElementId) {
        this.shieldElementId = shieldElementId;
    }

    public List<Integer> getLibraryAttributeIdsList() {
        return libraryAttributeIdsList;
    }

    public void setLibraryAttributeIdsList(List<Integer> libraryAttributeIdsList) {
        this.libraryAttributeIdsList = libraryAttributeIdsList;
    }
}
