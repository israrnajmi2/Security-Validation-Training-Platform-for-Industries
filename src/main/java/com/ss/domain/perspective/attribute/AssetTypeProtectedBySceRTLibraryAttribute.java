package com.ss.domain.perspective.attribute;

import com.ss.domain.perspective.CustomPerspective;

import javax.persistence.*;

/**
 * Created by chandrakanth on 6/11/17.
 */

@Entity
@Table(name = "asset_type_protected_by_sce_attribute_library")
public class AssetTypeProtectedBySceRTLibraryAttribute {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "one_rating_desc")
    private String oneRatingDescription;

    @Column(name = "two_rating_desc")
    private String twoRatingDescription;

    @Column(name = "three_rating_desc")
    private String threeRatingDescription;

    @Column(name = "four_rating_desc")
    private String fourRatingDescription;

    @Column(name = "five_rating_desc")
    private String fiveRatingDescription;

    @Column(name = "is_archived")
    private boolean isArchived;

    @ManyToOne
    @JoinColumn(name = "custom_perspective_fk", referencedColumnName = "id")
    private CustomPerspective customPerspective;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }

    public CustomPerspective getCustomPerspective() {
        return customPerspective;
    }

    public void setCustomPerspective(CustomPerspective customPerspective) {
        this.customPerspective = customPerspective;
    }
}
