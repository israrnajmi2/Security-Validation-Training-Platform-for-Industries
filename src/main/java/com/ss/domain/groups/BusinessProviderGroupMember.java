package com.ss.domain.groups;

import com.ss.domain.businessasset.BusinessProvider;

import javax.persistence.*;

/**
 * Created by chandrakanth on 8/8/18.
 */

@Entity
@Table(name = "business_provider_group_members")
public class BusinessProviderGroupMember {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "business_provider_group_fk", referencedColumnName = "id")
    private BusinessProviderGroup businessProviderGroup;

    @ManyToOne
    @JoinColumn(name = "business_provider_fk", referencedColumnName = "id")
    private BusinessProvider businessProvider;

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

    public BusinessProviderGroup getBusinessProviderGroup() {
        return businessProviderGroup;
    }

    public void setBusinessProviderGroup(BusinessProviderGroup businessProviderGroup) {
        this.businessProviderGroup = businessProviderGroup;
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
}
