package com.ss.domain.businessasset;

import com.ss.domain.groups.BusinessProviderGroupMember;
import com.ss.domain.usermanagement.OrganizationalUnit;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by chandrakanth on 7/8/18.
 */

@Entity
@Table(name = "business_provider")
public class BusinessProvider {

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

    @Column(name = "is_archived")
    private boolean isArchived;

    @Column(name = "is_default")
    private boolean isDefault;

    @Column(name = "sort_order")
    private Integer sortOrder;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_datetime")
    private Date modifiedDateTime;

    @OneToMany(mappedBy = "businessProvider", targetEntity = BusinessAsset.class)
    private List<BusinessAsset> businessAssetList;

    @OneToMany(mappedBy = "businessProvider", targetEntity = BusinessProviderGroupMember.class)
    private List<BusinessProviderGroupMember> businessProviderGroupMembers;

    public List<BusinessAsset> getBusinessAssetList() {
        return businessAssetList;
    }

    public void setBusinessAssetList(List<BusinessAsset> businessAssetList) {
        this.businessAssetList = businessAssetList;
    }

    public List<BusinessProviderGroupMember> getBusinessProviderGroupMembers() {
        return businessProviderGroupMembers;
    }

    public void setBusinessProviderGroupMembers(List<BusinessProviderGroupMember> businessProviderGroupMembers) {
        this.businessProviderGroupMembers = businessProviderGroupMembers;
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
