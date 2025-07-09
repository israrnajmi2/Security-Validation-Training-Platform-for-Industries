package com.ss.pojo.restservice;

import java.util.List;

public class EditShieldElementGroupRequest {

    private Integer elementId;
    private String name;
    private String description;
    private Integer organizationalUnitId;
    private List<Integer> groupMemberShieldElementIds;

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

    public Integer getOrganizationalUnitId() {
        return organizationalUnitId;
    }

    public void setOrganizationalUnitId(Integer organizationalUnitId) {
        this.organizationalUnitId = organizationalUnitId;
    }

    public List<Integer> getGroupMemberShieldElementIds() {
        return groupMemberShieldElementIds;
    }

    public void setGroupMemberShieldElementIds(List<Integer> groupMemberShieldElementIds) {
        this.groupMemberShieldElementIds = groupMemberShieldElementIds;
    }
}
