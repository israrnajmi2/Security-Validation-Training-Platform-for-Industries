package com.ss.domain.asset;

import javax.persistence.*;

/**
 * Created by chandrakanth on 23/10/17.
 */

@Entity
@Table(name = "technical_support_contact_info")
public class TechnicalSupportContactInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "contact_number")
    private String contactNumber;

    @ManyToOne
    @JoinColumn(name = "technical_support_info_fk", referencedColumnName = "id")
    private TechnicalSupport technicalSupport;

    @Column(name = "is_archived")
    private boolean isArchived;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public TechnicalSupport getTechnicalSupport() {
        return technicalSupport;
    }

    public void setTechnicalSupport(TechnicalSupport technicalSupport) {
        this.technicalSupport = technicalSupport;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
