package com.ss.domain.perspective.rating;

import com.ss.domain.perspective.attribute.AssetTypeProtectedBySceRTAttribute;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by chandrakanth on 6/11/17.
 */

@Entity
@Table(name = "asset_type_protected_by_sce_ratings")
public class AssetTypeProtectedBySceRTRating {

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
    @JoinColumn(name = "asset_type_protected_by_sce_attributes_fk", referencedColumnName = "id")
    private AssetTypeProtectedBySceRTAttribute assetTypeProtectedBySceRTAttribute;

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


    public AssetTypeProtectedBySceRTAttribute getAssetTypeProtectedBySceRTAttribute() {
        return assetTypeProtectedBySceRTAttribute;
    }

    public void setAssetTypeProtectedBySceRTAttribute(AssetTypeProtectedBySceRTAttribute assetTypeProtectedBySceRTAttribute) {
        this.assetTypeProtectedBySceRTAttribute = assetTypeProtectedBySceRTAttribute;
    }


}
