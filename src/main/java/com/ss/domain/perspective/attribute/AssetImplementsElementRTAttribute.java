package com.ss.domain.perspective.attribute;

import com.ss.domain.asset.AssetDeliversSce;
import com.ss.domain.asset.AssetToShieldElementMap;
import com.ss.domain.perspective.CustomPerspective;
import com.ss.domain.perspective.rating.AssetDeliversSceRTRating;
import com.ss.domain.perspective.rating.AssetImplementsElementRTRating;

import javax.persistence.*;
import java.util.List;

/**
 * Created by chandrakanth on 20/01/19.
 */

@Entity
@Table(name = "asset_implements_element_attributes")
public class AssetImplementsElementRTAttribute {

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

    @ManyToOne
    @JoinColumn(name = "asset_implements_element_fk", referencedColumnName = "id")
    private AssetToShieldElementMap assetToShieldElementMap;

    @Column(name = "coefficient")
    private Float coefficient;

    @Column(name = "is_activated")
    private boolean isActivated;

    @OneToMany(mappedBy = "assetImplementsElementRTAttribute", targetEntity = AssetImplementsElementRTRating.class)
    private List<AssetImplementsElementRTRating> assetImplementsElementRTRatingList;

    public List<AssetImplementsElementRTRating> getAssetImplementsElementRTRatingList() {
        return assetImplementsElementRTRatingList;
    }

    public void setAssetImplementsElementRTRatingList(List<AssetImplementsElementRTRating> assetImplementsElementRTRatingList) {
        this.assetImplementsElementRTRatingList = assetImplementsElementRTRatingList;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }

    public boolean isActivated() {
        return isActivated;
    }

    public void setActivated(boolean activated) {
        isActivated = activated;
    }

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

    public CustomPerspective getCustomPerspective() {
        return customPerspective;
    }

    public void setCustomPerspective(CustomPerspective customPerspective) {
        this.customPerspective = customPerspective;
    }

    public AssetToShieldElementMap getAssetToShieldElementMap() {
        return assetToShieldElementMap;
    }

    public void setAssetToShieldElementMap(AssetToShieldElementMap assetToShieldElementMap) {
        this.assetToShieldElementMap = assetToShieldElementMap;
    }

    public Float getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(Float coefficient) {
        this.coefficient = coefficient;
    }

}
