package com.ss.pojo.restservice;

public class CreateAssetDeliversAttributeForAllRateableRequest {

    private String name;
    private String description;
    private String oneRatingDescription;
    private String twoRatingDescription;
    private String threeRatingDescription;
    private String fourRatingDescription;
    private String fiveRatingDescription;
    private Integer perspectiveId;
    private Float coefficient;
    private boolean replaceAllExistingAttributes;

    public boolean isReplaceAllExistingAttributes() {
        return replaceAllExistingAttributes;
    }

    public void setReplaceAllExistingAttributes(boolean replaceAllExistingAttributes) {
        this.replaceAllExistingAttributes = replaceAllExistingAttributes;
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

    public String getOneRatingDescription() {
        return oneRatingDescription;
    }

    public void setOneRatingDescription(String oneRatingDescription) {
        this.oneRatingDescription = oneRatingDescription;
    }

    public String getTwoRatingDescription() {
        return twoRatingDescription;
    }

    public void setTwoRatingDescription(String twoRatingDescription) {
        this.twoRatingDescription = twoRatingDescription;
    }

    public String getThreeRatingDescription() {
        return threeRatingDescription;
    }

    public void setThreeRatingDescription(String threeRatingDescription) {
        this.threeRatingDescription = threeRatingDescription;
    }

    public String getFourRatingDescription() {
        return fourRatingDescription;
    }

    public void setFourRatingDescription(String fourRatingDescription) {
        this.fourRatingDescription = fourRatingDescription;
    }

    public String getFiveRatingDescription() {
        return fiveRatingDescription;
    }

    public void setFiveRatingDescription(String fiveRatingDescription) {
        this.fiveRatingDescription = fiveRatingDescription;
    }

    public Integer getPerspectiveId() {
        return perspectiveId;
    }

    public void setPerspectiveId(Integer perspectiveId) {
        this.perspectiveId = perspectiveId;
    }

    public Float getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(Float coefficient) {
        this.coefficient = coefficient;
    }
}
