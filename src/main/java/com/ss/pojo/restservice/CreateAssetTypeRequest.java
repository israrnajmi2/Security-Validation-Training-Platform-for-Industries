package com.ss.pojo.restservice;

public class CreateAssetTypeRequest {

    private String name;
    private String description;
    private boolean canDeliverExpression;
    private Integer organizationalUnitId;
    private Integer parentAssetTypeId;

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

    public boolean isCanDeliverExpression() {
        return canDeliverExpression;
    }

    public void setCanDeliverExpression(boolean canDeliverExpression) {
        this.canDeliverExpression = canDeliverExpression;
    }

    public Integer getOrganizationalUnitId() {
        return organizationalUnitId;
    }

    public void setOrganizationalUnitId(Integer organizationalUnitId) {
        this.organizationalUnitId = organizationalUnitId;
    }

    public Integer getParentAssetTypeId() {
        return parentAssetTypeId;
    }

    public void setParentAssetTypeId(Integer parentAssetTypeId) {
        this.parentAssetTypeId = parentAssetTypeId;
    }
}
