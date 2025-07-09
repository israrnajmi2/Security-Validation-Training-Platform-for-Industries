package com.ss.pojo.restservice;

public class LinkToPrefsRequest {
    private Integer shieldIdOne;
    private String objectTypeOne;
    private Integer shieldIdTwo;
    private String objectTypeTwo;
    private boolean directMode;
    private boolean related;

    public Integer getShieldIdOne() {
        return shieldIdOne;
    }

    public void setShieldIdOne(Integer shieldIdOne) {
        this.shieldIdOne = shieldIdOne;
    }

    public String getObjectTypeOne() {
        return objectTypeOne;
    }

    public void setObjectTypeOne(String objectTypeOne) {
        this.objectTypeOne = objectTypeOne;
    }

    public Integer getShieldIdTwo() {
        return shieldIdTwo;
    }

    public void setShieldIdTwo(Integer shieldIdTwo) {
        this.shieldIdTwo = shieldIdTwo;
    }

    public String getObjectTypeTwo() {
        return objectTypeTwo;
    }

    public void setObjectTypeTwo(String objectTypeTwo) {
        this.objectTypeTwo = objectTypeTwo;
    }

    public boolean isDirectMode() {
        return directMode;
    }

    public void setDirectMode(boolean directMode) {
        this.directMode = directMode;
    }

    public boolean isRelated() {
        return related;
    }

    public void setRelated(boolean related) {
        this.related = related;
    }
}

