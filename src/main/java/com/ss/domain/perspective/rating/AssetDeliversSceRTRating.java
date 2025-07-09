package com.ss.domain.perspective.rating;

import com.ss.domain.perspective.attribute.AssetDeliversSceRTAttribute;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by chandrakanth on 6/11/17.
 */

@Entity
@Table(name = "asset_delivers_sce_ratings")
public class AssetDeliversSceRTRating {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "rating")
    private Float rating;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_datetime")
    private Date createdDateTime;

    @ManyToOne
    @JoinColumn(name = "asset_delivers_sce_attributes_fk", referencedColumnName = "id")
    private AssetDeliversSceRTAttribute assetDeliversSceRTAttribute;

    @Column(name = "justification_reason")
    private String justificationReason;

    public String getJustificationReason() {
        return justificationReason;
    }

    public void setJustificationReason(String justificationReason) {
        this.justificationReason = justificationReason;
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

    public Date getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(Date createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public AssetDeliversSceRTAttribute getAssetDeliversSceRTAttribute() {
        return assetDeliversSceRTAttribute;
    }

    public void setAssetDeliversSceRTAttribute(AssetDeliversSceRTAttribute assetDeliversSceRTAttribute) {
        this.assetDeliversSceRTAttribute = assetDeliversSceRTAttribute;
    }


}
