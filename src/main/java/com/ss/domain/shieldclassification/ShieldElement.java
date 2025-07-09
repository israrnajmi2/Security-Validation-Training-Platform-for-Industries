package com.ss.domain.shieldclassification;

import com.ss.domain.asset.AssetToShieldElementMap;
import com.ss.domain.asset.AssetTypeToShieldElementMap;
import com.ss.domain.businessasset.BusinessAssetToShieldElementMap;
import com.ss.domain.businessasset.BusinessAssetTypeToShieldElementMap;
import com.ss.domain.groups.ShieldElementGroupMember;
import com.ss.domain.perspective.attribute.ShieldElementRTAttribute;
import com.ss.domain.sce.SceFulfillsShieldElement;
import com.ss.domain.usermanagement.OrganizationalUnit;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by chandrakanth on 23/10/17.
 */

@Entity
@Table(name = "shield_element")
public class ShieldElement {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    /*
     * we call abbreviation as Reference Id in UI
     */

    @Column(name = "abbreviation")
    private String abbreviation;

    @ManyToOne
    @JoinColumn(name = "parent_element_fk", referencedColumnName = "id")
    private ShieldElement parentShieldElement;

    @ManyToOne
    @JoinColumn(name = "element_type_fk", referencedColumnName = "id")
    private ShieldElementType shieldElementType;

    @ManyToOne
    @JoinColumn(name = "organizational_unit_fk", referencedColumnName = "id")
    private OrganizationalUnit organizationalUnit;

    @ManyToOne
    @JoinColumn(name = "shield_fk", referencedColumnName = "id")
    private Shield shield;

    @Column(name = "is_default")
    private boolean isDefault;

    @Column(name = "level")
    private Integer level;

    @Column(name = "sort_order")
    private Integer sortOrder;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_datetime")
    private Date modifiedDateTime;

    @OneToMany(mappedBy = "shieldElement", targetEntity = SceFulfillsShieldElement.class)
    private List<SceFulfillsShieldElement> sceFulfillsShieldElementList;

    @OneToMany(mappedBy = "parentShieldElement", targetEntity = ShieldElement.class)
    private List<ShieldElement> childrenShieldElementList;

    @OneToMany(mappedBy = "shieldElement", targetEntity = ShieldElementRTAttribute.class)
    private List<ShieldElementRTAttribute> shieldElementRTAttributeList;

    @OneToMany(mappedBy = "shieldElement", targetEntity = ShieldElementGroupMember.class)
    private List<ShieldElementGroupMember> shieldElementGroupMembers;

    @OneToMany(mappedBy = "shieldElement", targetEntity = AssetTypeToShieldElementMap.class)
    private List<AssetTypeToShieldElementMap> assetTypeToShieldElementMapList;

    @OneToMany(mappedBy = "shieldElement", targetEntity = BusinessAssetTypeToShieldElementMap.class)
    private List<BusinessAssetTypeToShieldElementMap> businessAssetTypeToShieldElementMapList;

    @OneToMany(mappedBy = "shieldElement", targetEntity = AssetToShieldElementMap.class)
    private List<AssetToShieldElementMap> assetToShieldElementMapList;

    @OneToMany(mappedBy = "shieldElement", targetEntity = BusinessAssetToShieldElementMap.class)
    private List<BusinessAssetToShieldElementMap> businessAssetToShieldElementMapList;

    @OneToMany(mappedBy = "shieldElementOne", targetEntity = ShieldElementToShieldElementMap.class)
    private List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapListOne;

    @OneToMany(mappedBy = "shieldElementTwo", targetEntity = ShieldElementToShieldElementMap.class)
    private List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapListTwo;

    @OneToMany(mappedBy = "shieldElement", targetEntity = TestProcedure.class)
    private List<TestProcedure> testProcedureList;

    @OneToMany(mappedBy = "shieldElement", targetEntity = Guidance.class)
    private List<Guidance> guidanceList;

    public List<BusinessAssetTypeToShieldElementMap> getBusinessAssetTypeToShieldElementMapList() {
        return businessAssetTypeToShieldElementMapList;
    }

    public void setBusinessAssetTypeToShieldElementMapList(List<BusinessAssetTypeToShieldElementMap> businessAssetTypeToShieldElementMapList) {
        this.businessAssetTypeToShieldElementMapList = businessAssetTypeToShieldElementMapList;
    }

    public List<BusinessAssetToShieldElementMap> getBusinessAssetToShieldElementMapList() {
        return businessAssetToShieldElementMapList;
    }

    public void setBusinessAssetToShieldElementMapList(List<BusinessAssetToShieldElementMap> businessAssetToShieldElementMapList) {
        this.businessAssetToShieldElementMapList = businessAssetToShieldElementMapList;
    }

    public List<TestProcedure> getTestProcedureList() {
        return testProcedureList;
    }

    public void setTestProcedureList(List<TestProcedure> testProcedureList) {
        this.testProcedureList = testProcedureList;
    }

    public List<Guidance> getGuidanceList() {
        return guidanceList;
    }

    public void setGuidanceList(List<Guidance> guidanceList) {
        this.guidanceList = guidanceList;
    }

    public List<AssetTypeToShieldElementMap> getAssetTypeToShieldElementMapList() {
        return assetTypeToShieldElementMapList;
    }

    public void setAssetTypeToShieldElementMapList(List<AssetTypeToShieldElementMap> assetTypeToShieldElementMapList) {
        this.assetTypeToShieldElementMapList = assetTypeToShieldElementMapList;
    }

    public List<AssetToShieldElementMap> getAssetToShieldElementMapList() {
        return assetToShieldElementMapList;
    }

    public void setAssetToShieldElementMapList(List<AssetToShieldElementMap> assetToShieldElementMapList) {
        this.assetToShieldElementMapList = assetToShieldElementMapList;
    }

    public List<ShieldElementToShieldElementMap> getShieldElementToShieldElementMapListOne() {
        return shieldElementToShieldElementMapListOne;
    }

    public void setShieldElementToShieldElementMapListOne(List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapListOne) {
        this.shieldElementToShieldElementMapListOne = shieldElementToShieldElementMapListOne;
    }

    public List<ShieldElementToShieldElementMap> getShieldElementToShieldElementMapListTwo() {
        return shieldElementToShieldElementMapListTwo;
    }

    public void setShieldElementToShieldElementMapListTwo(List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapListTwo) {
        this.shieldElementToShieldElementMapListTwo = shieldElementToShieldElementMapListTwo;
    }

    public List<ShieldElementGroupMember> getShieldElementGroupMembers() {
        return shieldElementGroupMembers;
    }

    public void setShieldElementGroupMembers(List<ShieldElementGroupMember> shieldElementGroupMembers) {
        this.shieldElementGroupMembers = shieldElementGroupMembers;
    }

    public List<ShieldElementRTAttribute> getShieldElementRTAttributeList() {
        return shieldElementRTAttributeList;
    }

    public void setShieldElementRTAttributeList(List<ShieldElementRTAttribute> shieldElementRTAttributeList) {
        this.shieldElementRTAttributeList = shieldElementRTAttributeList;
    }

    public List<SceFulfillsShieldElement> getSceFulfillsShieldElementList() {
        return sceFulfillsShieldElementList;
    }

    public void setSceFulfillsShieldElementList(List<SceFulfillsShieldElement> sceFulfillsShieldElementList) {
        this.sceFulfillsShieldElementList = sceFulfillsShieldElementList;
    }

    public List<ShieldElement> getChildrenShieldElementList() {
        return childrenShieldElementList;
    }

    public void setChildrenShieldElementList(List<ShieldElement> childrenShieldElementList) {
        this.childrenShieldElementList = childrenShieldElementList;
    }

    public Date getModifiedDateTime() {
        return modifiedDateTime;
    }

    public void setModifiedDateTime(Date modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
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

    public ShieldElement getParentShieldElement() {
        return parentShieldElement;
    }

    public void setParentShieldElement(ShieldElement parentShieldElement) {
        this.parentShieldElement = parentShieldElement;
    }

    public ShieldElementType getShieldElementType() {
        return shieldElementType;
    }

    public void setShieldElementType(ShieldElementType shieldElementType) {
        this.shieldElementType = shieldElementType;
    }

    public OrganizationalUnit getOrganizationalUnit() {
        return organizationalUnit;
    }

    public void setOrganizationalUnit(OrganizationalUnit organizationalUnit) {
        this.organizationalUnit = organizationalUnit;
    }

    public Shield getShield() {
        return shield;
    }

    public void setShield(Shield shield) {
        this.shield = shield;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean aDefault) {
        this.isDefault = aDefault;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
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
