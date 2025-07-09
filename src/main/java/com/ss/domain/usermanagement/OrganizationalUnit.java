package com.ss.domain.usermanagement;

import com.ss.domain.asset.Asset;
import com.ss.domain.asset.AssetType;
import com.ss.domain.asset.ProviderInfo;
import com.ss.domain.groups.*;
import com.ss.domain.shieldclassification.ShieldElement;

import javax.persistence.*;
import java.util.List;

/**
 * Created by chandrakanth on 23/10/17.
 */

@Entity
@Table(name = "organizational_unit")
public class OrganizationalUnit {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "organizational_unit_parent_fk", referencedColumnName = "id")
    private OrganizationalUnit parentOrganizationalUnit;

    @Column(name = "level")
    private Integer level;

    @Column(name = "is_archived")
    private boolean isArchived;

    @OneToMany(mappedBy = "organizationalUnit", targetEntity = AssetType.class)
    private List<AssetType> allLinkedAssetTypes;

    @OneToMany(mappedBy = "organizationalUnit", targetEntity = Asset.class)
    private List<Asset> allLinkedAssets;

    @OneToMany(mappedBy = "organizationalUnit", targetEntity = ProviderInfo.class)
    private List<ProviderInfo> allLinkedProviders;

    @OneToMany(mappedBy = "organizationalUnit", targetEntity = ShieldElement.class)
    private List<ShieldElement> allLinkedShieldElements;

    @OneToMany(mappedBy = "organizationalUnit", targetEntity = ShieldElementGroup.class)
    private List<ShieldElementGroup> shieldElementGroups;

    @OneToMany(mappedBy = "organizationalUnit", targetEntity = SceGroup.class)
    private List<SceGroup> sceGroups;

    @OneToMany(mappedBy = "organizationalUnit", targetEntity = AssetGroup.class)
    private List<AssetGroup> assetGroups;

    @OneToMany(mappedBy = "organizationalUnit", targetEntity = AssetTypeGroup.class)
    private List<AssetTypeGroup> assetTypeGroups;

    @OneToMany(mappedBy = "organizationalUnit", targetEntity = ProviderGroup.class)
    private List<ProviderGroup> providerGroups;

    @OneToMany(mappedBy = "parentOrganizationalUnit", targetEntity = OrganizationalUnit.class)
    private List<OrganizationalUnit> childrenOrganizationalUnits;

    @OneToMany(mappedBy = "organizationalUnit", targetEntity = SphericUser.class)
    private List<SphericUser> sphericUserList;

    public List<SphericUser> getSphericUserList() {
        return sphericUserList;
    }

    public void setSphericUserList(List<SphericUser> sphericUserList) {
        this.sphericUserList = sphericUserList;
    }

    public List<OrganizationalUnit> getChildrenOrganizationalUnits() {
        return childrenOrganizationalUnits;
    }

    public void setChildrenOrganizationalUnits(List<OrganizationalUnit> childrenOrganizationalUnits) {
        this.childrenOrganizationalUnits = childrenOrganizationalUnits;
    }

    public List<AssetType> getAllLinkedAssetTypes() {
        return allLinkedAssetTypes;
    }

    public void setAllLinkedAssetTypes(List<AssetType> allLinkedAssetTypes) {
        this.allLinkedAssetTypes = allLinkedAssetTypes;
    }

    public List<Asset> getAllLinkedAssets() {
        return allLinkedAssets;
    }

    public void setAllLinkedAssets(List<Asset> allLinkedAssets) {
        this.allLinkedAssets = allLinkedAssets;
    }

    public List<ProviderInfo> getAllLinkedProviders() {
        return allLinkedProviders;
    }

    public void setAllLinkedProviders(List<ProviderInfo> allLinkedProviders) {
        this.allLinkedProviders = allLinkedProviders;
    }

    public List<ShieldElement> getAllLinkedShieldElements() {
        return allLinkedShieldElements;
    }

    public void setAllLinkedShieldElements(List<ShieldElement> allLinkedShieldElements) {
        this.allLinkedShieldElements = allLinkedShieldElements;
    }

    public List<ShieldElementGroup> getShieldElementGroups() {
        return shieldElementGroups;
    }

    public void setShieldElementGroups(List<ShieldElementGroup> shieldElementGroups) {
        this.shieldElementGroups = shieldElementGroups;
    }

    public List<SceGroup> getSceGroups() {
        return sceGroups;
    }

    public void setSceGroups(List<SceGroup> sceGroups) {
        this.sceGroups = sceGroups;
    }

    public List<AssetGroup> getAssetGroups() {
        return assetGroups;
    }

    public void setAssetGroups(List<AssetGroup> assetGroups) {
        this.assetGroups = assetGroups;
    }

    public List<AssetTypeGroup> getAssetTypeGroups() {
        return assetTypeGroups;
    }

    public void setAssetTypeGroups(List<AssetTypeGroup> assetTypeGroups) {
        this.assetTypeGroups = assetTypeGroups;
    }

    public List<ProviderGroup> getProviderGroups() {
        return providerGroups;
    }

    public void setProviderGroups(List<ProviderGroup> providerGroups) {
        this.providerGroups = providerGroups;
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

    public OrganizationalUnit getParentOrganizationalUnit() {
        return parentOrganizationalUnit;
    }

    public void setParentOrganizationalUnit(OrganizationalUnit parentOrganizationalUnit) {
        this.parentOrganizationalUnit = parentOrganizationalUnit;
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
}
