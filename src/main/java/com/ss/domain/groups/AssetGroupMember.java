package com.ss.domain.groups;

import com.ss.domain.asset.Asset;

import javax.persistence.*;

@Entity
@Table(name = "asset_group_members")
public class AssetGroupMember {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "asset_group_fk", referencedColumnName = "id")
    private AssetGroup assetGroup;

    @ManyToOne
    @JoinColumn(name = "asset_fk", referencedColumnName = "id")
    private Asset asset;

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

    public AssetGroup getAssetGroup() {
        return assetGroup;
    }

    public void setAssetGroup(AssetGroup assetGroup) {
        this.assetGroup = assetGroup;
    }

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
