package com.ss.domain.shieldclassification;

import com.ss.domain.groups.ShieldElementGroup;
import com.ss.domain.perspective.attribute.ShieldElementRTAttribute;
import com.ss.domain.perspective.attribute.ShieldElementRTLibraryAttribute;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by chandrakanth on 23/10/17.
 */

@Entity
@Table(name = "shield_element_type")
public class ShieldElementType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "element_type_parent_fk", referencedColumnName = "id")
    private ShieldElementType parentShieldElementType;

    @ManyToOne
    @JoinColumn(name = "shield_fk", referencedColumnName = "id")
    private Shield shield;

    @Column(name = "level")
    private Integer level;

    @Column(name = "is_mappable_to_sce")
    private boolean isMappableToSce;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Column(name = "is_default")
    private boolean isDefault;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_datetime")
    private Date modifiedDateTime;

    @OneToMany(mappedBy = "shieldElementType", targetEntity = ShieldElement.class)
    private List<ShieldElement> shieldElementList;

    @OneToMany(mappedBy = "parentShieldElementType", targetEntity = ShieldElementType.class)
    private List<ShieldElementType> childrenShieldElementTypeList;

    @OneToMany(mappedBy = "shieldElementType", targetEntity = ShieldElementGroup.class)
    private List<ShieldElementGroup> shieldElementGroups;

    @OneToMany(mappedBy = "shieldElementType", targetEntity = ShieldElementRTAttribute.class)
    private List<ShieldElementRTAttribute> shieldElementRTAttributeList;

    @OneToMany(mappedBy = "shieldElementType", targetEntity = ShieldElementRTLibraryAttribute.class)
    private List<ShieldElementRTLibraryAttribute> shieldElementRTLibraryAttributeList;

    public List<ShieldElementRTLibraryAttribute> getShieldElementRTLibraryAttributeList() {
        return shieldElementRTLibraryAttributeList;
    }

    public void setShieldElementRTLibraryAttributeList(List<ShieldElementRTLibraryAttribute> shieldElementRTLibraryAttributeList) {
        this.shieldElementRTLibraryAttributeList = shieldElementRTLibraryAttributeList;
    }

    public List<ShieldElementRTAttribute> getShieldElementRTAttributeList() {
        return shieldElementRTAttributeList;
    }

    public void setShieldElementRTAttributeList(List<ShieldElementRTAttribute> shieldElementRTAttributeList) {
        this.shieldElementRTAttributeList = shieldElementRTAttributeList;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean aDefault) {
        isDefault = aDefault;
    }

    public List<ShieldElementGroup> getShieldElementGroups() {
        return shieldElementGroups;
    }

    public void setShieldElementGroups(List<ShieldElementGroup> shieldElementGroups) {
        this.shieldElementGroups = shieldElementGroups;
    }

    public List<ShieldElement> getShieldElementList() {
        return shieldElementList;
    }

    public void setShieldElementList(List<ShieldElement> shieldElementList) {
        this.shieldElementList = shieldElementList;
    }

    public List<ShieldElementType> getChildrenShieldElementTypeList() {
        return childrenShieldElementTypeList;
    }

    public void setChildrenShieldElementTypeList(List<ShieldElementType> childrenShieldElementTypeList) {
        this.childrenShieldElementTypeList = childrenShieldElementTypeList;
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

    public ShieldElementType getParentShieldElementType() {
        return parentShieldElementType;
    }

    public void setParentShieldElementType(ShieldElementType parentShieldElementType) {
        this.parentShieldElementType = parentShieldElementType;
    }

    public Shield getShield() {
        return shield;
    }

    public void setShield(Shield shield) {
        this.shield = shield;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public boolean isMappableToSce() {
        return isMappableToSce;
    }

    public void setMappableToSce(boolean mappableToSce) {
        isMappableToSce = mappableToSce;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
