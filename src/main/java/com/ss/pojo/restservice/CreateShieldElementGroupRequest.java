package com.ss.pojo.restservice;

import java.util.List;

public class CreateShieldElementGroupRequest {

    private String name;
    private String description;
    private Integer organizationalUnitId;
    private List<Integer> groupMemberShieldElementIds;
    private Integer shieldElementTypeId;
    private Integer shieldId;

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
