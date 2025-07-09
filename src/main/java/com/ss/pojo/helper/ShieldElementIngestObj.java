package com.ss.pojo.helper;

import java.util.HashMap;
import java.util.Map;

public class ShieldElementIngestObj {

    private String name;
    private String description;
    private String referenceId;
    private String indentationId;
    private Map<Integer, ShieldElementIngestObj> shieldTreeMap = new HashMap<>();

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

    public String getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(String referenceId) {
        this.referenceId = referenceId;
    }

    public Map<Integer, ShieldElementIngestObj> getShieldTreeMap() {
        return shieldTreeMap;
    }

    public void setShieldTreeMap(Map<Integer, ShieldElementIngestObj> shieldTreeMap) {
        this.shieldTreeMap = shieldTreeMap;
    }

    public String getIndentationId() {
        return indentationId;
    }

    public void setIndentationId(String indentationId) {
        this.indentationId = indentationId;
    }
}
