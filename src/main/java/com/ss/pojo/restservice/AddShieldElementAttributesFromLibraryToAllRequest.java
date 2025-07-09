package com.ss.pojo.restservice;

import java.util.List;

public class AddShieldElementAttributesFromLibraryToAllRequest {

    private Integer perspectiveId;
    private Integer shieldElementTypeId;
    private List<Integer> libraryAttributeIdsList;
    private boolean replaceAllExistingAttributes;

    public boolean isReplaceAllExistingAttributes() {
        return replaceAllExistingAttributes;
    }

    public void setReplaceAllExistingAttributes(boolean replaceAllExistingAttributes) {
        this.replaceAllExistingAttributes = replaceAllExistingAttributes;
    }

    public Integer getPerspectiveId() {
        return perspectiveId;
    }

    public void setPerspectiveId(Integer perspectiveId) {
        this.perspectiveId = perspectiveId;
    }

    public Integer getShieldElementTypeId() {
        return shieldElementTypeId;
    }

    public void setShieldElementTypeId(Integer shieldElementTypeId) {
        this.shieldElementTypeId = shieldElementTypeId;
    }

    public List<Integer> getLibraryAttributeIdsList() {
        return libraryAttributeIdsList;
    }

    public void setLibraryAttributeIdsList(List<Integer> libraryAttributeIdsList) {
        this.libraryAttributeIdsList = libraryAttributeIdsList;
    }
}
