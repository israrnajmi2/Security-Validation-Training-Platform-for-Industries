package com.ss.domain.groups;

import com.ss.domain.asset.ProviderInfo;

import javax.persistence.*;

@Entity
@Table(name = "provider_group_members")
public class ProviderGroupMember {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "provider_group_fk", referencedColumnName = "id")
    private ProviderGroup providerGroup;

    @ManyToOne
    @JoinColumn(name = "provider_fk", referencedColumnName = "id")
    private ProviderInfo providerInfo;

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

    public ProviderGroup getProviderGroup() {
        return providerGroup;
    }

    public void setProviderGroup(ProviderGroup providerGroup) {
        this.providerGroup = providerGroup;
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
}
