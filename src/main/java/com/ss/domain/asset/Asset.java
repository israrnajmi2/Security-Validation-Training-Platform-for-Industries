package com.ss.domain.asset;

import com.ss.domain.groups.AssetGroupMember;
import com.ss.domain.usermanagement.OrganizationalUnit;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by chandrakanth on 23/10/17.
 */

@Entity
@Table(name = "asset")
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "organizational_unit_fk", referencedColumnName = "id")
    private OrganizationalUnit organizationalUnit;

    @ManyToOne
    @JoinColumn(name = "asset_type_fk", referencedColumnName = "id")
    private AssetType assetType;

    @ManyToOne
    @JoinColumn(name = "provider_info_fk", referencedColumnName = "id")
    private ProviderInfo providerInfo;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Column(name = "is_default")
    private boolean isDefault;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_datetime")
    private Date modifiedDateTime;

    @Column(name = "sort_order")
    private Integer sortOrder;

    @OneToMany(mappedBy = "asset", targetEntity = AssetDeliversSce.class)
    private List<AssetDeliversSce> assetDeliversSceList;

    @OneToMany(mappedBy = "asset", targetEntity = AssetGroupMember.class)
    private List<AssetGroupMember> assetGroupMembers;

    @OneToMany(mappedBy = "asset", targetEntity = AssetToShieldElementMap.class)
    private List<AssetToShieldElementMap> assetToShieldElementMapList;

    public List<AssetGroupMember> getAssetGroupMembers() {
        return assetGroupMembers;
    }

    public void setAssetGroupMembers(List<AssetGroupMember> assetGroupMembers) {
        this.assetGroupMembers = assetGroupMembers;
    }

    public List<AssetDeliversSce> getAssetDeliversSceList() {
        return assetDeliversSceList;
    }

    public void setAssetDeliversSceList(List<AssetDeliversSce> assetDeliversSceList) {
        this.assetDeliversSceList = assetDeliversSceList;
    }

    public List<AssetToShieldElementMap> getAssetToShieldElementMapList() {
        return assetToShieldElementMapList;
    }

    public void setAssetToShieldElementMapList(List<AssetToShieldElementMap> assetToShieldElementMapList) {
        this.assetToShieldElementMapList = assetToShieldElementMapList;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean aDefault) {
        isDefault = aDefault;
    }

    public Date getModifiedDateTime() {
        return modifiedDateTime;
    }

    public void setModifiedDateTime(Date modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
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

    public OrganizationalUnit getOrganizationalUnit() {
        return organizationalUnit;
    }

    public void setOrganizationalUnit(OrganizationalUnit organizationalUnit) {
        this.organizationalUnit = organizationalUnit;
    }

    public AssetType getAssetType() {
        return assetType;
    }

    public void setAssetType(AssetType assetType) {
        this.assetType = assetType;
    }

    public ProviderInfo getProviderInfo() {
        return providerInfo;
    }

    public void setProviderInfo(ProviderInfo providerInfo) {
        this.providerInfo = providerInfo;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }
}
