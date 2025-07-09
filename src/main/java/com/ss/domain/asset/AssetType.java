package com.ss.domain.asset;

import com.ss.domain.groups.AssetTypeGroupMember;
import com.ss.domain.usermanagement.OrganizationalUnit;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by chandrakanth on 23/10/17.
 */

@Entity
@Table(name = "asset_type")
public class AssetType {

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
    @JoinColumn(name = "asset_type_parent_fk", referencedColumnName = "id")
    private AssetType parentAssetType;

    @Column(name = "level")
    private Integer level;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Column(name = "sort_order")
    private Integer sortOrder;

    @OneToMany(mappedBy = "assetType", targetEntity = AssetTypeProtectedBySce.class)
    private List<AssetTypeProtectedBySce> assetTypeProtectedBySceList;

    @OneToMany(mappedBy = "assetType", targetEntity = Asset.class)
    private List<Asset> assetList;

    @OneToMany(mappedBy = "parentAssetType", targetEntity = AssetType.class)
    private List<AssetType> childrenAssetTypeList;

    @OneToMany(mappedBy = "assetType", targetEntity = AssetTypeGroupMember.class)
    private List<AssetTypeGroupMember> assetTypeGroupMembers;

    @OneToMany(mappedBy = "assetType", targetEntity = AssetTypeToShieldElementMap.class)
    private List<AssetTypeToShieldElementMap> assetTypeToShieldElementMapList;

    @Column(name = "is_default")
    private boolean isDefault;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_datetime")
    private Date modifiedDateTime;

    @Column(name = "can_deliver")
    private boolean canDeliver;

    public List<AssetTypeToShieldElementMap> getAssetTypeToShieldElementMapList() {
        return assetTypeToShieldElementMapList;
    }

    public void setAssetTypeToShieldElementMapList(List<AssetTypeToShieldElementMap> assetTypeToShieldElementMapList) {
        this.assetTypeToShieldElementMapList = assetTypeToShieldElementMapList;
    }

    public Date getModifiedDateTime() {
        return modifiedDateTime;
    }

    public void setModifiedDateTime(Date modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
    }

    public boolean isCanDeliver() {
        return canDeliver;
    }

    public void setCanDeliver(boolean canDeliver) {
        this.canDeliver = canDeliver;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean aDefault) {
        isDefault = aDefault;
    }

    public List<AssetType> getChildrenAssetTypeList() {
        return childrenAssetTypeList;
    }

    public void setChildrenAssetTypeList(List<AssetType> childrenAssetTypeList) {
        this.childrenAssetTypeList = childrenAssetTypeList;
    }

    public List<AssetTypeGroupMember> getAssetTypeGroupMembers() {
        return assetTypeGroupMembers;
    }

    public void setAssetTypeGroupMembers(List<AssetTypeGroupMember> assetTypeGroupMembers) {
        this.assetTypeGroupMembers = assetTypeGroupMembers;
    }

    public List<Asset> getAssetList() {
        return assetList;
    }

    public void setAssetList(List<Asset> assetList) {
        this.assetList = assetList;
    }

    public List<AssetTypeProtectedBySce> getAssetTypeProtectedBySceList() {
        return assetTypeProtectedBySceList;
    }

    public void setAssetTypeProtectedBySceList(List<AssetTypeProtectedBySce> assetTypeProtectedBySceList) {
        this.assetTypeProtectedBySceList = assetTypeProtectedBySceList;
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

    public AssetType getParentAssetType() {
        return parentAssetType;
    }

    public void setParentAssetType(AssetType parentAssetType) {
        this.parentAssetType = parentAssetType;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
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
