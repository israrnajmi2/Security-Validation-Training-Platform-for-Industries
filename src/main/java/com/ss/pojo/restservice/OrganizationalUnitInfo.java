package com.ss.pojo.restservice;

public class OrganizationalUnitInfo {
    private Integer elementId;
    private String description;
    private String name;
    private Integer parentOrganizationalUnitId;
    private String parentOrganizationalUnitName;

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

    public Integer getParentOrganizationalUnitId() {
        return parentOrganizationalUnitId;
    }

    public void setParentOrganizationalUnitId(Integer parentOrganizationalUnitId) {
        this.parentOrganizationalUnitId = parentOrganizationalUnitId;
    }

    public String getParentOrganizationalUnitName() {
        return parentOrganizationalUnitName;
    }

    public void setParentOrganizationalUnitName(String parentOrganizationalUnitName) {
        this.parentOrganizationalUnitName = parentOrganizationalUnitName;
    }
}
