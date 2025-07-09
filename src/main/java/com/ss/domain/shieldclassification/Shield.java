package com.ss.domain.shieldclassification;

import com.ss.domain.groups.ShieldElementGroup;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by chandrakanth on 23/10/17.
 */

@Entity
@Table(name = "shield")
public class Shield {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "shield_type_fk", referencedColumnName = "id")
    private ShieldType shieldType;

    @Column(name = "author")
    private String author;

    @Column(name = "version")
    private String version;

    @Column(name = "acronym")
    private String acronym;

    @Column(name = "is_default")
    private boolean isDefault;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_datetime")
    private Date modifiedDateTime;

    @Column(name = "is_archived")
    private boolean isArchived;

    @OneToMany(mappedBy = "shield", targetEntity = ShieldElementType.class)
    private List<ShieldElementType> shieldElementTypeList;

    @OneToMany(mappedBy = "shield", targetEntity = ShieldElement.class)
    private List<ShieldElement> shieldElementList;

    @OneToMany(mappedBy = "shield", targetEntity = ShieldElementGroup.class)
    private List<ShieldElementGroup> shieldElementGroups;

    public List<ShieldElementType> getShieldElementTypeList() {
        return shieldElementTypeList;
    }

    public void setShieldElementTypeList(List<ShieldElementType> shieldElementTypeList) {
        this.shieldElementTypeList = shieldElementTypeList;
    }

    public List<ShieldElement> getShieldElementList() {
        return shieldElementList;
    }

    public void setShieldElementList(List<ShieldElement> shieldElementList) {
        this.shieldElementList = shieldElementList;
    }

    public List<ShieldElementGroup> getShieldElementGroups() {
        return shieldElementGroups;
    }

    public void setShieldElementGroups(List<ShieldElementGroup> shieldElementGroups) {
        this.shieldElementGroups = shieldElementGroups;
    }

    public String getAcronym() {
        return acronym;
    }

    public void setAcronym(String acronym) {
        this.acronym = acronym;
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

    public ShieldType getShieldType() {
        return shieldType;
    }

    public void setShieldType(ShieldType shieldType) {
        this.shieldType = shieldType;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
