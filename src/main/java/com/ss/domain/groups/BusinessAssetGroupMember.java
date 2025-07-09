package com.ss.domain.groups;

import com.ss.domain.businessasset.BusinessAsset;

import javax.persistence.*;

/**
 * Created by chandrakanth on 8/8/18.
 */

@Entity
@Table(name = "business_asset_group_members")
public class BusinessAssetGroupMember {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "business_asset_group_fk", referencedColumnName = "id")
    private BusinessAssetGroup businessAssetGroup;

    @ManyToOne
    @JoinColumn(name = "business_asset_fk", referencedColumnName = "id")
    private BusinessAsset businessAsset;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Column(name = "is_activated")
    private boolean isActivated;

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

    public BusinessAssetGroup getBusinessAssetGroup() {
        return businessAssetGroup;
    }

    public void setBusinessAssetGroup(BusinessAssetGroup businessAssetGroup) {
        this.businessAssetGroup = businessAssetGroup;
    }

    public BusinessAsset getBusinessAsset() {
        return businessAsset;
    }

    public void setBusinessAsset(BusinessAsset businessAsset) {
        this.businessAsset = businessAsset;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
