package com.ss.pojo.restservice;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class LevelWithLabel {

    private String label;
    private Integer level;
    private Integer elementTypeId;

    public Integer getElementTypeId() {
        return elementTypeId;
    }

    public void setElementTypeId(Integer elementTypeId) {
        this.elementTypeId = elementTypeId;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }
}
