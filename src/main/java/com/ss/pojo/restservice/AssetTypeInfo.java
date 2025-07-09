package com.ss.pojo.restservice;

public class AssetTypeInfo {
    private Integer elementId;
    private String description;
    private String name;


    private Integer parentAssetTypeId;
    private String parentAssetTypeName;
    private boolean canDeliver;
    private Integer organizationalUnitId;
    private String organizationalUnitName;

    public Integer getElementId() {
        return elementId;
    }

    public void setElementId(Integer elementId) {
        this.elementId = elementId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getParentAssetTypeId() {
        return parentAssetTypeId;
    }

    public void setParentAssetTypeId(Integer parentAssetTypeId) {
        this.parentAssetTypeId = parentAssetTypeId;
    }

    public String getParentAssetTypeName() {
        return parentAssetTypeName;
    }

    public void setParentAssetTypeName(String parentAssetTypeName) {
        this.parentAssetTypeName = parentAssetTypeName;
    }

    public boolean isCanDeliver() {
        return canDeliver;
    }

    public void setCanDeliver(boolean canDeliver) {
        this.canDeliver = canDeliver;
    }

    public Integer getOrganizationalUnitId() {
        return organizationalUnitId;
    }

    public void setOrganizationalUnitId(Integer organizationalUnitId) {
        this.organizationalUnitId = organizationalUnitId;
    }

    public String getOrganizationalUnitName() {
        return organizationalUnitName;
    }

    public void setOrganizationalUnitName(String organizationalUnitName) {
        this.organizationalUnitName = organizationalUnitName;
    }
}
