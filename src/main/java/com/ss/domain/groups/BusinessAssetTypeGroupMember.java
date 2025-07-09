package com.ss.domain.groups;

import com.ss.domain.businessasset.BusinessAssetType;

import javax.persistence.*;

/**
 * Created by chandrakanth on 8/8/18.
 */

@Entity
@Table(name = "business_asset_type_group_members")
public class BusinessAssetTypeGroupMember {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "business_asset_type_group_fk", referencedColumnName = "id")
    private BusinessAssetTypeGroup businessAssetTypeGroup;

    @ManyToOne
    @JoinColumn(name = "business_asset_type_fk", referencedColumnName = "id")
    private BusinessAssetType businessAssetType;

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

    public BusinessAssetTypeGroup getBusinessAssetTypeGroup() {
        return businessAssetTypeGroup;
    }

    public void setBusinessAssetTypeGroup(BusinessAssetTypeGroup businessAssetTypeGroup) {
        this.businessAssetTypeGroup = businessAssetTypeGroup;
    }

    public BusinessAssetType getBusinessAssetType() {
        return businessAssetType;
    }

    public void setBusinessAssetType(BusinessAssetType businessAssetType) {
        this.businessAssetType = businessAssetType;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
