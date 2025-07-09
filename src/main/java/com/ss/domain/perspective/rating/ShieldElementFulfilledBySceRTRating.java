package com.ss.domain.perspective.rating;

import com.ss.domain.perspective.attribute.ShieldElementFulfilledBySceRTAttribute;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by chandrakanth on 6/11/17.
 */

@Entity
@Table(name = "shield_element_fulfilled_by_sce_ratings")
public class ShieldElementFulfilledBySceRTRating {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "rating")
    private Float rating;

    @ManyToOne
    @JoinColumn(name = "shield_element_fulfilled_by_sce_attributes_fk", referencedColumnName = "id")
    private ShieldElementFulfilledBySceRTAttribute shieldElementFulfilledBySceRTAttribute;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_datetime")
    private Date createdDateTime;

    @Column(name = "justification_reason")
    private String justificationReason;

    public String getJustificationReason() {
        return justificationReason;
    }

    public void setJustificationReason(String justificationReason) {
        this.justificationReason = justificationReason;
    }

    public Date getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(Date createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }


    public ShieldElementFulfilledBySceRTAttribute getShieldElementFulfilledBySceRTAttribute() {
        return shieldElementFulfilledBySceRTAttribute;
    }

    public void setShieldElementFulfilledBySceRTAttribute(ShieldElementFulfilledBySceRTAttribute shieldElementFulfilledBySceRTAttribute) {
        this.shieldElementFulfilledBySceRTAttribute = shieldElementFulfilledBySceRTAttribute;
    }


}
