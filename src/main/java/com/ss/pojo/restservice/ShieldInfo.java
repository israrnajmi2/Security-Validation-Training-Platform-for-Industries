package com.ss.pojo.restservice;

public class ShieldInfo {

    private Integer elementId;
    private String name;
    private String description;
    private String author;
    private String version;
    private String acronym;
    private String shieldTypeName;
    private Integer shieldTypeId;

    public String getShieldTypeName() {
        return shieldTypeName;
    }

    public void setShieldTypeName(String shieldTypeName) {
        this.shieldTypeName = shieldTypeName;
    }

    public Integer getShieldTypeId() {
        return shieldTypeId;
    }

    public void setShieldTypeId(Integer shieldTypeId) {
        this.shieldTypeId = shieldTypeId;
    }

    public String getAcronym() {
        return acronym;
    }

    public void setAcronym(String acronym) {
        this.acronym = acronym;
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
}
