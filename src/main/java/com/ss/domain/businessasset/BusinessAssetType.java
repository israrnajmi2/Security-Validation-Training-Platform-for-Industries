package com.ss.domain.businessasset;

import com.ss.domain.groups.BusinessAssetTypeGroupMember;
import com.ss.domain.usermanagement.OrganizationalUnit;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by chandrakanth on 7/8/18.
 */

@Entity
@Table(name = "business_asset_type")
public class BusinessAssetType {

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
    @JoinColumn(name = "business_asset_type_parent_fk", referencedColumnName = "id")
    private BusinessAssetType parentBusinessAssetType;

    @Column(name = "level")
    private Integer level;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Column(name = "is_default")
    private boolean isDefault;

    @Column(name = "sort_order")
    private Integer sortOrder;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_datetime")
    private Date modifiedDateTime;

    @OneToMany(mappedBy = "businessAssetType", targetEntity = BusinessAssetTypeToExpressionLink.class)
    private List<BusinessAssetTypeToExpressionLink> businessAssetTypeToExpressionLinks;

    @OneToMany(mappedBy = "businessAssetType", targetEntity = BusinessAsset.class)
    private List<BusinessAsset> businessAssetList;

    @OneToMany(mappedBy = "parentBusinessAssetType", targetEntity = BusinessAssetType.class)
    private List<BusinessAssetType> childrenBusinessAssetTypeList;

    @OneToMany(mappedBy = "businessAssetType", targetEntity = BusinessAssetTypeGroupMember.class)
    private List<BusinessAssetTypeGroupMember> businessAssetTypeGroupMembers;

    @OneToMany(mappedBy = "businessAssetType", targetEntity = BusinessAssetTypeToShieldElementMap.class)
    private List<BusinessAssetTypeToShieldElementMap> businessAssetTypeToShieldElementMapList;

    public List<BusinessAssetTypeToExpressionLink> getBusinessAssetTypeToExpressionLinks() {
        return businessAssetTypeToExpressionLinks;
    }

    public void setBusinessAssetTypeToExpressionLinks(List<BusinessAssetTypeToExpressionLink> businessAssetTypeToExpressionLinks) {
        this.businessAssetTypeToExpressionLinks = businessAssetTypeToExpressionLinks;
    }

    public List<BusinessAsset> getBusinessAssetList() {
        return businessAssetList;
    }

    public void setBusinessAssetList(List<BusinessAsset> businessAssetList) {
        this.businessAssetList = businessAssetList;
    }

    public List<BusinessAssetType> getChildrenBusinessAssetTypeList() {
        return childrenBusinessAssetTypeList;
    }

    public void setChildrenBusinessAssetTypeList(List<BusinessAssetType> childrenBusinessAssetTypeList) {
        this.childrenBusinessAssetTypeList = childrenBusinessAssetTypeList;
    }

    public List<BusinessAssetTypeGroupMember> getBusinessAssetTypeGroupMembers() {
        return businessAssetTypeGroupMembers;
    }

    public void setBusinessAssetTypeGroupMembers(List<BusinessAssetTypeGroupMember> businessAssetTypeGroupMembers) {
        this.businessAssetTypeGroupMembers = businessAssetTypeGroupMembers;
    }

    public List<BusinessAssetTypeToShieldElementMap> getBusinessAssetTypeToShieldElementMapList() {
        return businessAssetTypeToShieldElementMapList;
    }

    public void setBusinessAssetTypeToShieldElementMapList(List<BusinessAssetTypeToShieldElementMap> businessAssetTypeToShieldElementMapList) {
        this.businessAssetTypeToShieldElementMapList = businessAssetTypeToShieldElementMapList;
    }

    public BusinessAssetType getParentBusinessAssetType() {
        return parentBusinessAssetType;
    }

    public void setParentBusinessAssetType(BusinessAssetType parentBusinessAssetType) {
        this.parentBusinessAssetType = parentBusinessAssetType;
    }

    public Date getModifiedDateTime() {
        return modifiedDateTime;
    }

    public void setModifiedDateTime(Date modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean aDefault) {
        isDefault = aDefault;
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
