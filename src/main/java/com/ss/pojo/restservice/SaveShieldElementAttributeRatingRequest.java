package com.ss.pojo.restservice;

public class SaveShieldElementAttributeRatingRequest {

    private Integer shieldElementAttributeId;
    private Float rating;
    private String justificationReason;

    public Integer getShieldElementAttributeId() {
        return shieldElementAttributeId;
    }

    public void setShieldElementAttributeId(Integer shieldElementAttributeId) {
        this.shieldElementAttributeId = shieldElementAttributeId;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public String getJustificationReason() {
        return justificationReason;
    }

    public void setJustificationReason(String justificationReason) {
        this.justificationReason = justificationReason;
    }
}
