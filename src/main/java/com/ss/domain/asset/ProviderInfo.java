package com.ss.domain.asset;

import com.ss.domain.groups.ProviderGroupMember;
import com.ss.domain.usermanagement.OrganizationalUnit;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by chandrakanth on 23/10/17.
 */

@Entity
@Table(name = "provider_info")
public class ProviderInfo {

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

    @OneToMany(mappedBy = "providerInfo", targetEntity = Asset.class)
    private List<Asset> assetList;

    @OneToMany(mappedBy = "providerInfo", targetEntity = TechnicalSupport.class)
    private List<TechnicalSupport> technicalSupportList;

    @OneToMany(mappedBy = "providerInfo", targetEntity = ProviderGroupMember.class)
    private List<ProviderGroupMember> providerGroupMembers;

    public List<Asset> getAssetList() {
        return assetList;
    }

    public void setAssetList(List<Asset> assetList) {
        this.assetList = assetList;
    }

    public List<TechnicalSupport> getTechnicalSupportList() {
        return technicalSupportList;
    }

    public void setTechnicalSupportList(List<TechnicalSupport> technicalSupportList) {
        this.technicalSupportList = technicalSupportList;
    }

    public List<ProviderGroupMember> getProviderGroupMembers() {
        return providerGroupMembers;
    }

    public void setProviderGroupMembers(List<ProviderGroupMember> providerGroupMembers) {
        this.providerGroupMembers = providerGroupMembers;
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
