package com.ss.domain.groups;

import com.ss.domain.usermanagement.OrganizationalUnit;

import javax.persistence.*;
import java.util.List;

/**
 * Created by chandrakanth on 8/8/18.
 */

@Entity
@Table(name = "business_provider_group")
public class BusinessProviderGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "is_archived")
    private boolean isArchived;

    @ManyToOne
    @JoinColumn(name = "organizational_unit_fk", referencedColumnName = "id")
    private OrganizationalUnit organizationalUnit;

    @OneToMany(mappedBy = "businessProviderGroup", targetEntity = BusinessProviderGroupMember.class)
    private List<BusinessProviderGroupMember> businessProviderGroupMembers;

    public List<BusinessProviderGroupMember> getBusinessProviderGroupMembers() {
        return businessProviderGroupMembers;
    }

    public void setBusinessProviderGroupMembers(List<BusinessProviderGroupMember> businessProviderGroupMembers) {
        this.businessProviderGroupMembers = businessProviderGroupMembers;
    }

    public OrganizationalUnit getOrganizationalUnit() {
        return organizationalUnit;
    }

    public void setOrganizationalUnit(OrganizationalUnit organizationalUnit) {
        this.organizationalUnit = organizationalUnit;
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

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
