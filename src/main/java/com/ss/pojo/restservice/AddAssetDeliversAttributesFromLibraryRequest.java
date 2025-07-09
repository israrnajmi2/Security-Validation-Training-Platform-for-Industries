package com.ss.pojo.restservice;

import java.util.List;

public class AddAssetDeliversAttributesFromLibraryRequest {

    private Integer perspectiveId;
    private Integer assetDeliversLinkId;
    private List<Integer> libraryAttributeIdsList;

    public Integer getPerspectiveId() {
        return perspectiveId;
    }

    public void setPerspectiveId(Integer perspectiveId) {
        this.perspectiveId = perspectiveId;
    }

    public Integer getAssetDeliversLinkId() {
        return assetDeliversLinkId;
    }

    public void setAssetDeliversLinkId(Integer assetDeliversLinkId) {
        this.assetDeliversLinkId = assetDeliversLinkId;
    }

    public List<Integer> getLibraryAttributeIdsList() {
        return libraryAttributeIdsList;
    }

    public void setLibraryAttributeIdsList(List<Integer> libraryAttributeIdsList) {
        this.libraryAttributeIdsList = libraryAttributeIdsList;
    }
}
