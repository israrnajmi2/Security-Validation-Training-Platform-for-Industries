package com.ss.pojo.restservice;

public class SaveAssetImplementsAttributeRatingRequest {

    private Integer assetImplementsAttributeId;
    private Float rating;
    private String justificationReason;

    public Integer getAssetImplementsAttributeId() {
        return assetImplementsAttributeId;
    }

    public void setAssetImplementsAttributeId(Integer assetImplementsAttributeId) {
        this.assetImplementsAttributeId = assetImplementsAttributeId;
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
