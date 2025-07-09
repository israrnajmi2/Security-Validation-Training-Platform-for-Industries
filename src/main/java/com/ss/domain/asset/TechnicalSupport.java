package com.ss.domain.asset;

import javax.persistence.*;
import java.util.List;

/**
 * Created by chandrakanth on 23/10/17.
 */

@Entity
@Table(name = "technical_support_info")
public class TechnicalSupport {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "provider_info_fk", referencedColumnName = "id")
    private ProviderInfo providerInfo;

    @Column(name = "is_archived")
    private boolean isArchived;

    @OneToMany(mappedBy = "technicalSupport", targetEntity = TechnicalSupportContactInfo.class)
    private List<TechnicalSupportContactInfo> technicalSupportContactInfoList;

    public List<TechnicalSupportContactInfo> getTechnicalSupportContactInfoList() {
        return technicalSupportContactInfoList;
    }

    public void setTechnicalSupportContactInfoList(List<TechnicalSupportContactInfo> technicalSupportContactInfoList) {
        this.technicalSupportContactInfoList = technicalSupportContactInfoList;
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
