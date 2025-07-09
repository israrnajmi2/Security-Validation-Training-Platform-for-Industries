package com.ss.pojo.restservice;

import java.util.List;

public class AddAssetImplementsAttributesFromLibraryRequest {

    private Integer perspectiveId;
    private Integer assetImplementsElementLinkId;
    private List<Integer> libraryAttributeIdsList;

    public Integer getPerspectiveId() {
        return perspectiveId;
    }

    public void setPerspectiveId(Integer perspectiveId) {
        this.perspectiveId = perspectiveId;
    }

    public Integer getAssetImplementsElementLinkId() {
        return assetImplementsElementLinkId;
    }

    public void setAssetImplementsElementLinkId(Integer assetImplementsElementLinkId) {
        this.assetImplementsElementLinkId = assetImplementsElementLinkId;
    }

    public List<Integer> getLibraryAttributeIdsList() {
        return libraryAttributeIdsList;
    }

    public void setLibraryAttributeIdsList(List<Integer> libraryAttributeIdsList) {
        this.libraryAttributeIdsList = libraryAttributeIdsList;
    }
}
