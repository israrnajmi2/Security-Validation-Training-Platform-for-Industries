package com.ss.domain.businessasset;

import com.ss.domain.shieldclassification.ShieldElement;

import javax.persistence.*;

/**
 * Created by chandrakanth on 7/8/18.
 */

@Entity
@Table(name = "business_asset_to_shield_element_map")
public class BusinessAssetToShieldElementMap {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "business_asset_fk", referencedColumnName = "id")
    private BusinessAsset businessAsset;

    @ManyToOne
    @JoinColumn(name = "shield_element_fk", referencedColumnName = "id")
    private ShieldElement shieldElement;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Column(name = "is_default")
    private boolean isDefault;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BusinessAsset getBusinessAsset() {
        return businessAsset;
    }

    public void setBusinessAsset(BusinessAsset businessAsset) {
        this.businessAsset = businessAsset;
    }

    public ShieldElement getShieldElement() {
        return shieldElement;
    }

    public void setShieldElement(ShieldElement shieldElement) {
        this.shieldElement = shieldElement;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean aDefault) {
        isDefault = aDefault;
    }
}
