package com.ss.pojo.restservice;

public class CreateOrganizationalUnitRequest {

    private String name;
    private String description;
    private Integer parentOrganizationalUnitId;

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

    public Integer getParentOrganizationalUnitId() {
        return parentOrganizationalUnitId;
    }

    public void setParentOrganizationalUnitId(Integer parentOrganizationalUnitId) {
        this.parentOrganizationalUnitId = parentOrganizationalUnitId;
    }
}
