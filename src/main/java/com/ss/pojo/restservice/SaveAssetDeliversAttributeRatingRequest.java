package com.ss.pojo.restservice;

public class SaveAssetDeliversAttributeRatingRequest {

    private Integer assetDeliversAttributeId;
    private Float rating;
    private String justificationReason;

    public Integer getAssetDeliversAttributeId() {
        return assetDeliversAttributeId;
    }

    public void setAssetDeliversAttributeId(Integer assetDeliversAttributeId) {
        this.assetDeliversAttributeId = assetDeliversAttributeId;
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
