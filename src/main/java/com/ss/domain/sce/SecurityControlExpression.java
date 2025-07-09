package com.ss.domain.sce;

import com.ss.domain.asset.AssetDeliversSce;
import com.ss.domain.asset.AssetTypeProtectedBySce;
import com.ss.domain.businessasset.BusinessAssetToExpressionLink;
import com.ss.domain.businessasset.BusinessAssetTypeToExpressionLink;
import com.ss.domain.groups.SceGroupMember;
import com.ss.domain.parametertree.ContentParameterWord;
import com.ss.domain.parametertree.MethodParameterWord;
import com.ss.domain.parametertree.ObjectiveParameterWord;
import com.ss.domain.parametertree.SubjectParameterWord;
import com.ss.domain.perspective.attribute.SceRTAttribute;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by chandrakanth on 23/10/17.
 */

@Entity
@Table(name = "security_control_expression")
public class SecurityControlExpression {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "objective_expression_chain_fk", referencedColumnName = "id")
    private ObjectiveParameterWord objectiveParameterWord;

    @ManyToOne
    @JoinColumn(name = "method_expression_chain_fk", referencedColumnName = "id")
    private MethodParameterWord methodParameterWord;

    @ManyToOne
    @JoinColumn(name = "content_expression_chain_fk", referencedColumnName = "id")
    private ContentParameterWord contentParameterWord;

    @ManyToOne
    @JoinColumn(name = "subject_expression_chain_fk", referencedColumnName = "id")
    private SubjectParameterWord subjectParameterWord;

    @Column(name = "is_archived")
    private boolean isArchived;

    @OneToMany(mappedBy = "sce", targetEntity = SceFulfillsShieldElement.class)
    private List<SceFulfillsShieldElement> sceFulfillsShieldElementList;

    @OneToMany(mappedBy = "sce", targetEntity = AssetTypeProtectedBySce.class)
    private List<AssetTypeProtectedBySce> assetTypeProtectedBySceList;

    @OneToMany(mappedBy = "sce", targetEntity = BusinessAssetTypeToExpressionLink.class)
    private List<BusinessAssetTypeToExpressionLink> businessAssetTypeToExpressionLinks;

    @OneToMany(mappedBy = "sce", targetEntity = AssetDeliversSce.class)
    private List<AssetDeliversSce> assetDeliversSceList;

    @OneToMany(mappedBy = "sce", targetEntity = BusinessAssetToExpressionLink.class)
    private List<BusinessAssetToExpressionLink> businessAssetToExpressionLinks;

    @OneToMany(mappedBy = "securityControlExpression", targetEntity = SceRTAttribute.class)
    private List<SceRTAttribute> sceRTAttributeList;

    @OneToMany(mappedBy = "sce", targetEntity = SceGroupMember.class)
    private List<SceGroupMember> sceGroupMembers;

    @Column(name = "is_default")
    private boolean isDefault;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_datetime")
    private Date modifiedDateTime;

    public List<BusinessAssetTypeToExpressionLink> getBusinessAssetTypeToExpressionLinks() {
        return businessAssetTypeToExpressionLinks;
    }

    public void setBusinessAssetTypeToExpressionLinks(List<BusinessAssetTypeToExpressionLink> businessAssetTypeToExpressionLinks) {
        this.businessAssetTypeToExpressionLinks = businessAssetTypeToExpressionLinks;
    }

    public List<BusinessAssetToExpressionLink> getBusinessAssetToExpressionLinks() {
        return businessAssetToExpressionLinks;
    }

    public void setBusinessAssetToExpressionLinks(List<BusinessAssetToExpressionLink> businessAssetToExpressionLinks) {
        this.businessAssetToExpressionLinks = businessAssetToExpressionLinks;
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

    public List<SceGroupMember> getSceGroupMembers() {
        return sceGroupMembers;
    }

    public void setSceGroupMembers(List<SceGroupMember> sceGroupMembers) {
        this.sceGroupMembers = sceGroupMembers;
    }

    public List<SceRTAttribute> getSceRTAttributeList() {
        return sceRTAttributeList;
    }

    public void setSceRTAttributeList(List<SceRTAttribute> sceRTAttributeList) {
        this.sceRTAttributeList = sceRTAttributeList;
    }

    public List<AssetTypeProtectedBySce> getAssetTypeProtectedBySceList() {
        return assetTypeProtectedBySceList;
    }

    public void setAssetTypeProtectedBySceList(List<AssetTypeProtectedBySce> assetTypeProtectedBySceList) {
        this.assetTypeProtectedBySceList = assetTypeProtectedBySceList;
    }

    public List<AssetDeliversSce> getAssetDeliversSceList() {
        return assetDeliversSceList;
    }

    public void setAssetDeliversSceList(List<AssetDeliversSce> assetDeliversSceList) {
        this.assetDeliversSceList = assetDeliversSceList;
    }

    public List<SceFulfillsShieldElement> getSceFulfillsShieldElementList() {
        return sceFulfillsShieldElementList;
    }

    public void setSceFulfillsShieldElementList(List<SceFulfillsShieldElement> sceFulfillsShieldElementList) {
        this.sceFulfillsShieldElementList = sceFulfillsShieldElementList;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ObjectiveParameterWord getObjectiveParameterWord() {
        return objectiveParameterWord;
    }

    public void setObjectiveParameterWord(ObjectiveParameterWord objectiveParameterWord) {
        this.objectiveParameterWord = objectiveParameterWord;
    }

    public MethodParameterWord getMethodParameterWord() {
        return methodParameterWord;
    }

    public void setMethodParameterWord(MethodParameterWord methodParameterWord) {
        this.methodParameterWord = methodParameterWord;
    }

    public ContentParameterWord getContentParameterWord() {
        return contentParameterWord;
    }

    public void setContentParameterWord(ContentParameterWord contentParameterWord) {
        this.contentParameterWord = contentParameterWord;
    }

    public SubjectParameterWord getSubjectParameterWord() {
        return subjectParameterWord;
    }

    public void setSubjectParameterWord(SubjectParameterWord subjectParameterWord) {
        this.subjectParameterWord = subjectParameterWord;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
