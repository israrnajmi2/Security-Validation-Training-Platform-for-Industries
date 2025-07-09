package com.ss.pojo.restservice;

public class CreateShieldElementRequest {

    private String name;
    private String description;
    private Integer parentElementId;
    private Integer organizationalUnitId;
    private String referenceId;
    private Integer shieldId;

    public Integer getShieldId() {
        return shieldId;
    }

    public void setShieldId(Integer shieldId) {
        this.shieldId = shieldId;
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

    public Integer getParentElementId() {
        return parentElementId;
    }

    public void setParentElementId(Integer parentElementId) {
        this.parentElementId = parentElementId;
    }

    public Integer getOrganizationalUnitId() {
        return organizationalUnitId;
    }

    public void setOrganizationalUnitId(Integer organizationalUnitId) {
        this.organizationalUnitId = organizationalUnitId;
    }

    public String getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(String referenceId) {
        this.referenceId = referenceId;
    }
}
