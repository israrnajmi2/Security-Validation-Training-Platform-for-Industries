package com.ss.pojo.restservice;

import java.util.List;

public class ShieldElementGroupInfo {
    private Integer elementId;
    private String name;
    private Integer shieldElementTypeId;
    private String shieldElementTypeName;
    private String description;
    private Integer organizationalUnitId;
    private String organizationalUnitName;
    private Integer level;
    private List<Integer> shieldElementGroupMemberIds;

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

    public Integer getShieldElementTypeId() {
        return shieldElementTypeId;
    }

    public void setShieldElementTypeId(Integer shieldElementTypeId) {
        this.shieldElementTypeId = shieldElementTypeId;
    }

    public String getShieldElementTypeName() {
        return shieldElementTypeName;
    }

    public void setShieldElementTypeName(String shieldElementTypeName) {
        this.shieldElementTypeName = shieldElementTypeName;
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

    public String getOrganizationalUnitName() {
        return organizationalUnitName;
    }

    public void setOrganizationalUnitName(String organizationalUnitName) {
        this.organizationalUnitName = organizationalUnitName;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public List<Integer> getShieldElementGroupMemberIds() {
        return shieldElementGroupMemberIds;
    }

    public void setShieldElementGroupMemberIds(List<Integer> shieldElementGroupMemberIds) {
        this.shieldElementGroupMemberIds = shieldElementGroupMemberIds;
    }
}
