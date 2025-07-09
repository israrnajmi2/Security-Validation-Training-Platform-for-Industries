package com.ss.domain.perspective.attribute;

import com.ss.domain.perspective.CustomPerspective;
import com.ss.domain.perspective.rating.ShieldElementFulfilledBySceRTRating;
import com.ss.domain.sce.SceFulfillsShieldElement;

import javax.persistence.*;
import java.util.List;

/**
 * Created by chandrakanth on 6/11/17.
 */

@Entity
@Table(name = "shield_element_fulfilled_by_sce_attributes")
public class ShieldElementFulfilledBySceRTAttribute {

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

    @ManyToOne
    @JoinColumn(name = "custom_perspective_fk", referencedColumnName = "id")
    private CustomPerspective customPerspective;

    @ManyToOne
    @JoinColumn(name = "shield_element_fulfilled_by_sce_fk", referencedColumnName = "id")
    private SceFulfillsShieldElement sceFulfillsShieldElement;

    @Column(name = "coefficient")
    private Float coefficient;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Column(name = "is_activated")
    private boolean isActivated;

    @OneToMany(mappedBy = "shieldElementFulfilledBySceRTAttribute", targetEntity = ShieldElementFulfilledBySceRTRating.class)
    private List<ShieldElementFulfilledBySceRTRating> shieldElementFulfilledBySceRTRatingList;

    public List<ShieldElementFulfilledBySceRTRating> getShieldElementFulfilledBySceRTRatingList() {
        return shieldElementFulfilledBySceRTRatingList;
    }

    public void setShieldElementFulfilledBySceRTRatingList(List<ShieldElementFulfilledBySceRTRating> shieldElementFulfilledBySceRTRatingList) {
        this.shieldElementFulfilledBySceRTRatingList = shieldElementFulfilledBySceRTRatingList;
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

    public SceFulfillsShieldElement getSceFulfillsShieldElement() {
        return sceFulfillsShieldElement;
    }

    public void setSceFulfillsShieldElement(SceFulfillsShieldElement sceFulfillsShieldElement) {
        this.sceFulfillsShieldElement = sceFulfillsShieldElement;
    }

    public Float getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(Float coefficient) {
        this.coefficient = coefficient;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
