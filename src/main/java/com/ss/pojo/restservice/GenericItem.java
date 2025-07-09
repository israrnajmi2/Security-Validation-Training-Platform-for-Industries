package com.ss.pojo.restservice;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ss.pojo.helper.IdNameObject;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class GenericItem {
    private Integer elementId;
    private Integer sortOrder;
    private String name;
    private String description;
    /* for later */
    private List<IdNameObject> chain;

    private Integer linkId;
    private String linkName;
    private String linkType;

    private List<IdNameObject> odosChain;
    private GenericItem odosTree;

    private List<IdNameObject> mdosChain;
    private GenericItem mdosTree;

    private List<IdNameObject> cdosChain;
    private GenericItem cdosTree;

    private List<IdNameObject> sdosChain;
    private GenericItem sdosTree;

    private String shieldTypeName;
    private Integer shieldTypeId;
    private String shieldName;
    private Integer shieldId;
    private String shieldElementTypeName;
    private Integer shieldElementTypeId;
    private Boolean isMappableToSce;
    private Boolean isDefaultElement;
    private String refId;

    private List<GenericItem> children;

    //only applicable for shield type
    private String author;
    private String version;

    private Integer level;
    private String objectType;

    private String orgUnitName;
    private Integer orgUnitId;

    private String providerName;

    private Float index;
    private Float rating;

    private Boolean isGroupItemFound;

    private String errorMessage;

    //SCE fulfills Shield Element Association checkmark
    private Boolean isFulfillsMapped;

    private String protectionType;

    private Boolean isAssociationMapped;

    private String color;

    //these are for attribute response
    private String oneRatingDesc;
    private String twoRatingDesc;
    private String threeRatingDesc;
    private String fourRatingDesc;
    private String fiveRatingDesc;
    private Float coefficient;
    private Boolean isActivated;


    //these are for attribute rating
    private Integer ratingId;
    private String justificationReason;
    private String ratingObjectType;

    //extras for element info
    private Integer parentElementId;
    private String parentElementName;

    private Integer booleanFlags;

    //used only in case of artifact
    private String fileName;
    private List<GenericItem> artifacts;

    private Object debugInfo;

    //used for user
    private String email;

    //for test procedure & guidance
    private Integer sourceId;
    private String sourceName;

    private String acronym;

    private Boolean dragged;

    /*
    //ruler details in case of perspectives
    private float index;
    private boolean isTechnologyExist;
    private String fillColor;

    private char labelLetter;
    private boolean isMappedItem;

    private boolean canAddRuler;
    private boolean hasRuler;
    private Integer rulerId;
    private String rulerName;

    private boolean isMappable;
    private boolean isCheckMarked;
    private boolean haveAtleastOneMapping;

    private boolean isAtleastOneArtifactExist;
    */

    public Boolean getDragged() {
        return dragged;
    }

    public void setDragged(Boolean dragged) {
        this.dragged = dragged;
    }

    public String getAcronym() {
        return acronym;
    }

    public void setAcronym(String acronym) {
        this.acronym = acronym;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Object getDebugInfo() {
        return debugInfo;
    }

    public void setDebugInfo(Object debugInfo) {
        this.debugInfo = debugInfo;
    }

    public Boolean getAssociationMapped() {
        return isAssociationMapped;
    }

    public void setAssociationMapped(Boolean associationMapped) {
        isAssociationMapped = associationMapped;
    }

    public String getRatingObjectType() {
        return ratingObjectType;
    }

    public void setRatingObjectType(String ratingObjectType) {
        this.ratingObjectType = ratingObjectType;
    }

    public List<GenericItem> getArtifacts() {
        return artifacts;
    }

    public void setArtifacts(List<GenericItem> artifacts) {
        this.artifacts = artifacts;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Integer getBooleanFlags() {
        return booleanFlags;
    }

    public void setBooleanFlags(Integer booleanFlags) {
        this.booleanFlags = booleanFlags;
    }

    public Integer getParentElementId() {
        return parentElementId;
    }

    public void setParentElementId(Integer parentElementId) {
        this.parentElementId = parentElementId;
    }

    public String getParentElementName() {
        return parentElementName;
    }

    public void setParentElementName(String parentElementName) {
        this.parentElementName = parentElementName;
    }

    public Integer getRatingId() {
        return ratingId;
    }

    public void setRatingId(Integer ratingId) {
        this.ratingId = ratingId;
    }

    public String getJustificationReason() {
        return justificationReason;
    }

    public void setJustificationReason(String justificationReason) {
        this.justificationReason = justificationReason;
    }

    public String getOneRatingDesc() {
        return oneRatingDesc;
    }

    public void setOneRatingDesc(String oneRatingDesc) {
        this.oneRatingDesc = oneRatingDesc;
    }

    public String getTwoRatingDesc() {
        return twoRatingDesc;
    }

    public void setTwoRatingDesc(String twoRatingDesc) {
        this.twoRatingDesc = twoRatingDesc;
    }

    public String getThreeRatingDesc() {
        return threeRatingDesc;
    }

    public void setThreeRatingDesc(String threeRatingDesc) {
        this.threeRatingDesc = threeRatingDesc;
    }

    public String getFourRatingDesc() {
        return fourRatingDesc;
    }

    public void setFourRatingDesc(String fourRatingDesc) {
        this.fourRatingDesc = fourRatingDesc;
    }

    public String getFiveRatingDesc() {
        return fiveRatingDesc;
    }

    public void setFiveRatingDesc(String fiveRatingDesc) {
        this.fiveRatingDesc = fiveRatingDesc;
    }

    public Float getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(Float coefficient) {
        this.coefficient = coefficient;
    }

    public Boolean getActivated() {
        return isActivated;
    }

    public void setActivated(Boolean activated) {
        isActivated = activated;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public GenericItem getOdosTree() {
        return odosTree;
    }

    public void setOdosTree(GenericItem odosTree) {
        this.odosTree = odosTree;
    }

    public GenericItem getMdosTree() {
        return mdosTree;
    }

    public void setMdosTree(GenericItem mdosTree) {
        this.mdosTree = mdosTree;
    }

    public GenericItem getCdosTree() {
        return cdosTree;
    }

    public void setCdosTree(GenericItem cdosTree) {
        this.cdosTree = cdosTree;
    }

    public GenericItem getSdosTree() {
        return sdosTree;
    }

    public void setSdosTree(GenericItem sdosTree) {
        this.sdosTree = sdosTree;
    }

    public String getRefId() {
        return refId;
    }

    public void setRefId(String refId) {
        this.refId = refId;
    }

    public String getProtectionType() {
        return protectionType;
    }

    public void setProtectionType(String protectionType) {
        this.protectionType = protectionType;
    }

    public Boolean getFulfillsMapped() {
        return isFulfillsMapped;
    }

    public void setFulfillsMapped(Boolean fulfillsMapped) {
        isFulfillsMapped = fulfillsMapped;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getLinkType() {
        return linkType;
    }

    public void setLinkType(String linkType) {
        this.linkType = linkType;
    }

    public Float getIndex() {
        return index;
    }

    public void setIndex(Float index) {
        this.index = index;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public Integer getShieldTypeId() {
        return shieldTypeId;
    }

    public void setShieldTypeId(Integer shieldTypeId) {
        this.shieldTypeId = shieldTypeId;
    }

    public Integer getShieldId() {
        return shieldId;
    }

    public void setShieldId(Integer shieldId) {
        this.shieldId = shieldId;
    }

    public Integer getShieldElementTypeId() {
        return shieldElementTypeId;
    }

    public void setShieldElementTypeId(Integer shieldElementTypeId) {
        this.shieldElementTypeId = shieldElementTypeId;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }


    public String getOrgUnitName() {
        return orgUnitName;
    }

    public void setOrgUnitName(String orgUnitName) {
        this.orgUnitName = orgUnitName;
    }

    public Integer getOrgUnitId() {
        return orgUnitId;
    }

    public void setOrgUnitId(Integer orgUnitId) {
        this.orgUnitId = orgUnitId;
    }

    public Boolean getMappableToSce() {
        return isMappableToSce;
    }

    public void setMappableToSce(Boolean mappableToSce) {
        isMappableToSce = mappableToSce;
    }

    public Boolean getDefaultElement() {
        return isDefaultElement;
    }

    public void setDefaultElement(Boolean defaultElement) {
        isDefaultElement = defaultElement;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public Integer getElementId() {
        return elementId;
    }

    public void setElementId(Integer elementId) {
        this.elementId = elementId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getShieldTypeName() {
        return shieldTypeName;
    }

    public void setShieldTypeName(String shieldTypeName) {
        this.shieldTypeName = shieldTypeName;
    }

    public String getShieldName() {
        return shieldName;
    }

    public void setShieldName(String shieldName) {
        this.shieldName = shieldName;
    }

    public List<IdNameObject> getChain() {
        return chain;
    }

    public void setChain(List<IdNameObject> chain) {
        this.chain = chain;
    }

    public List<IdNameObject> getOdosChain() {
        return odosChain;
    }

    public void setOdosChain(List<IdNameObject> odosChain) {
        this.odosChain = odosChain;
    }

    public List<IdNameObject> getMdosChain() {
        return mdosChain;
    }

    public void setMdosChain(List<IdNameObject> mdosChain) {
        this.mdosChain = mdosChain;
    }

    public List<IdNameObject> getCdosChain() {
        return cdosChain;
    }

    public void setCdosChain(List<IdNameObject> cdosChain) {
        this.cdosChain = cdosChain;
    }

    public List<IdNameObject> getSdosChain() {
        return sdosChain;
    }

    public void setSdosChain(List<IdNameObject> sdosChain) {
        this.sdosChain = sdosChain;
    }

    public String getShieldElementTypeName() {
        return shieldElementTypeName;
    }

    public void setShieldElementTypeName(String shieldElementTypeName) {
        this.shieldElementTypeName = shieldElementTypeName;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getObjectType() {
        return objectType;
    }

    public void setObjectType(String objectType) {
        this.objectType = objectType;
    }

    public List<GenericItem> getChildren() {
        return children;
    }

    public void setChildren(List<GenericItem> children) {
        this.children = children;
    }

    public Integer getLinkId() {
        return linkId;
    }

    public void setLinkId(Integer linkId) {
        this.linkId = linkId;
    }

    public String getLinkName() {
        return linkName;
    }

    public void setLinkName(String linkName) {
        this.linkName = linkName;
    }

    public Boolean getGroupItemFound() {
        return isGroupItemFound;
    }

    public void setGroupItemFound(Boolean groupItemFound) {
        isGroupItemFound = groupItemFound;
    }

    public Integer getSourceId() {
        return sourceId;
    }

    public void setSourceId(Integer sourceId) {
        this.sourceId = sourceId;
    }

    public String getSourceName() {
        return sourceName;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }
}
