package com.ss.pojo.restservice;

public class CreateParameterRequest {

    private String name;
    private String description;
    private Integer parentParameterId;

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

    public Integer getParentParameterId() {
        return parentParameterId;
    }

    public void setParentParameterId(Integer parentParameterId) {
        this.parentParameterId = parentParameterId;
    }
}
