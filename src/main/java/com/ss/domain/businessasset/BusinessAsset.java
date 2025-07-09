package com.ss.domain.businessasset;

import com.ss.domain.groups.BusinessAssetGroupMember;
import com.ss.domain.usermanagement.OrganizationalUnit;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by chandrakanth on 7/8/18.
 */

@Entity
@Table(name = "business_asset")
public class BusinessAsset {

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
    @JoinColumn(name = "business_asset_type_fk", referencedColumnName = "id")
    private BusinessAssetType businessAssetType;

    @ManyToOne
    @JoinColumn(name = "business_provider_fk", referencedColumnName = "id")
    private BusinessProvider businessProvider;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Column(name = "is_default")
    private boolean isDefault;

    @Column(name = "sort_order")
    private Integer sortOrder;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_datetime")
    private Date modifiedDateTime;

    @OneToMany(mappedBy = "businessAsset", targetEntity = BusinessAssetToExpressionLink.class)
    private List<BusinessAssetToExpressionLink> businessAssetToExpressionLinks;

    @OneToMany(mappedBy = "businessAsset", targetEntity = BusinessAssetGroupMember.class)
    private List<BusinessAssetGroupMember> businessAssetGroupMembers;

    @OneToMany(mappedBy = "businessAsset", targetEntity = BusinessAssetToShieldElementMap.class)
    private List<BusinessAssetToShieldElementMap> businessAssetToShieldElementMapList;

    public List<BusinessAssetGroupMember> getBusinessAssetGroupMembers() {
        return businessAssetGroupMembers;
    }

    public void setBusinessAssetGroupMembers(List<BusinessAssetGroupMember> businessAssetGroupMembers) {
        this.businessAssetGroupMembers = businessAssetGroupMembers;
    }

    public List<BusinessAssetToExpressionLink> getBusinessAssetToExpressionLinks() {
        return businessAssetToExpressionLinks;
    }

    public void setBusinessAssetToExpressionLinks(List<BusinessAssetToExpressionLink> businessAssetToExpressionLinks) {
        this.businessAssetToExpressionLinks = businessAssetToExpressionLinks;
    }

    public List<BusinessAssetToShieldElementMap> getBusinessAssetToShieldElementMapList() {
        return businessAssetToShieldElementMapList;
    }

    public void setBusinessAssetToShieldElementMapList(List<BusinessAssetToShieldElementMap> businessAssetToShieldElementMapList) {
        this.businessAssetToShieldElementMapList = businessAssetToShieldElementMapList;
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

    public BusinessAssetType getBusinessAssetType() {
        return businessAssetType;
    }

    public void setBusinessAssetType(BusinessAssetType businessAssetType) {
        this.businessAssetType = businessAssetType;
    }

    public BusinessProvider getBusinessProvider() {
        return businessProvider;
    }

    public void setBusinessProvider(BusinessProvider businessProvider) {
        this.businessProvider = businessProvider;
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
