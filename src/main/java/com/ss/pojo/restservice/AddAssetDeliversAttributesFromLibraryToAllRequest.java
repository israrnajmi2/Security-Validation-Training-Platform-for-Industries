package com.ss.pojo.restservice;

import java.util.List;

public class AddAssetDeliversAttributesFromLibraryToAllRequest {

    private Integer perspectiveId;
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

    public List<Integer> getLibraryAttributeIdsList() {
        return libraryAttributeIdsList;
    }

    public void setLibraryAttributeIdsList(List<Integer> libraryAttributeIdsList) {
        this.libraryAttributeIdsList = libraryAttributeIdsList;
    }
}
