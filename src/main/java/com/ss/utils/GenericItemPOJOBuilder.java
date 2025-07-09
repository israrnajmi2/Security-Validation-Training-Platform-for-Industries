package com.ss.utils;

import com.ss.common.ExecException;
import com.ss.constants.ObjectTypeConstants;
import com.ss.constants.ProtectionType;
import com.ss.constants.ShieldTypeConstants;
import com.ss.domain.artifact.Artifact;
import com.ss.domain.asset.*;
import com.ss.domain.businessasset.*;
import com.ss.domain.groups.*;
import com.ss.domain.parametertree.ContentParameterWord;
import com.ss.domain.parametertree.MethodParameterWord;
import com.ss.domain.parametertree.ObjectiveParameterWord;
import com.ss.domain.parametertree.SubjectParameterWord;
import com.ss.domain.perspective.CustomPerspective;
import com.ss.domain.perspective.attribute.*;
import com.ss.domain.perspective.rating.AssetDeliversSceRTRating;
import com.ss.domain.perspective.rating.AssetImplementsElementRTRating;
import com.ss.domain.perspective.rating.ShieldElementRTRating;
import com.ss.domain.sce.SceFulfillsShieldElement;
import com.ss.domain.sce.SecurityControlExpression;
import com.ss.domain.shieldclassification.*;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.domain.usermanagement.SphericUser;
import com.ss.domain.usermanagement.UserRole;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.helper.IdNameObject;
import com.ss.pojo.restservice.GenericItem;
import com.ss.pojo.restservice.LinkElementInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service("GenericItemPOJOBuilder")
public class GenericItemPOJOBuilder {

    @Autowired
    private ParameterTreeChainBuilder parameterTreeChainBuilder;

    @Autowired
    private HaveArtifactCheckingService haveArtifactCheckingService;

    public GenericItem buildGenericPOJO(ShieldType shieldType) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(shieldType.getId());
        genericItem.setName(shieldType.getName());
        genericItem.setObjectType(ObjectTypeConstants.SHIELD_TYPE);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    private void updateHaveArtifactBooleanFlag(GenericItem genericItem) {
        /*boolean haveArtifact = haveArtifactCheckingService.isHaveArtifact(genericItem.getElementId(), genericItem.getObjectType());
        Integer booleanFlags = genericItem.getBooleanFlags();
        if(booleanFlags == null)
            booleanFlags = 0;
        booleanFlags = getBooleanFlagsWithArtifactFlagUpdated(booleanFlags, haveArtifact);
        genericItem.setBooleanFlags(booleanFlags);*/
    }

    private Integer getBooleanFlagsWithArtifactFlagUpdated(Integer booleanFlags, boolean haveArtifact) {
        int index = 2;
        if (haveArtifact)
            return setBit(booleanFlags, index);
        else
            return resetBit(booleanFlags, index);
    }

    public Integer getBooleanFlagsWithGroupItemFlagUpdated(Integer booleanFlags, boolean isGroupItem) {
        int index = 1;
        if (isGroupItem)
            return setBit(booleanFlags, index);
        else
            return resetBit(booleanFlags, index);
    }

    private Integer resetBit(Integer booleanFlags, int index) {
        booleanFlags = booleanFlags & ~(1 << index);
        return booleanFlags;
    }

    private Integer setBit(Integer booleanFlags, int index) {
        booleanFlags = booleanFlags | (1 << index);
        return booleanFlags;
    }


    public GenericItem buildGenericPOJO(Shield shield) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(shield.getId());
        genericItem.setName(shield.getName());
        ShieldType shieldType = shield.getShieldType();
        genericItem.setShieldTypeName(shieldType.getName());
        genericItem.setDescription(shield.getDescription());
        genericItem.setAuthor(shield.getAuthor());
        genericItem.setVersion(shield.getVersion());
        genericItem.setShieldTypeId(shieldType.getId());
        if (shield.getShieldType().getName().equals(ShieldTypeConstants.SHIELD))
            genericItem.setObjectType(ObjectTypeConstants.SHIELD);
        else if (shield.getShieldType().getName().equals(ShieldTypeConstants.STANDARD))
            genericItem.setObjectType(ObjectTypeConstants.STANDARD);
        else if (shield.getShieldType().getName().equals(ShieldTypeConstants.BUSINESS))
            genericItem.setObjectType(ObjectTypeConstants.BUSINESS_FRAMEWORK);
        else if (shield.getShieldType().getName().equals(ShieldTypeConstants.THREAT))
            genericItem.setObjectType(ObjectTypeConstants.THREAT_FRAMEWORK);
        else
            throw new ExecException("Unknown shield type: " + shield.getShieldType().getName());

        if (shield.getAcronym() != null)
            genericItem.setAcronym(shield.getAcronym().trim());

        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildLevelZeroGenericPOJOForShieldElementType(Shield shield) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(0);
        genericItem.setName("Cross Level");
        genericItem.setShieldName(shield.getName());
        genericItem.setShieldId(shield.getId());
        ShieldType shieldType = shield.getShieldType();
        genericItem.setShieldTypeName(shieldType.getName());
        genericItem.setShieldTypeId(shieldType.getId());
        genericItem.setMappableToSce(false);
        genericItem.setDescription("");
        genericItem.setLevel(0);
        if (shield.getShieldType().getName().equals(ShieldTypeConstants.SHIELD))
            genericItem.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_TYPE);
        else if (shield.getShieldType().getName().equals(ShieldTypeConstants.STANDARD))
            genericItem.setObjectType(ObjectTypeConstants.STANDARD_ELEMENT_TYPE);
        else if (shield.getShieldType().getName().equals(ShieldTypeConstants.BUSINESS))
            genericItem.setObjectType(ObjectTypeConstants.BUSINESS_CONTROL_TYPE);
        else if (shield.getShieldType().getName().equals(ShieldTypeConstants.THREAT))
            genericItem.setObjectType(ObjectTypeConstants.THREAT_ELEMENT_TYPE);
        else
            throw new ExecException("Unknown Shield Type: " + shield.getShieldType().getName());
        return genericItem;
    }

    public GenericItem buildGenericPOJO(ShieldElementType shieldElementType) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(shieldElementType.getId());
        genericItem.setName(shieldElementType.getName());
        Shield shield = shieldElementType.getShield();
        genericItem.setShieldName(shield.getName());
        genericItem.setShieldId(shield.getId());
        ShieldType shieldType = shield.getShieldType();
        genericItem.setShieldTypeName(shieldType.getName());
        genericItem.setShieldTypeId(shieldType.getId());
        genericItem.setMappableToSce(shieldElementType.isMappableToSce());
        genericItem.setDescription(shieldElementType.getDescription());
        genericItem.setLevel(shieldElementType.getLevel());
        if (shieldElementType.getShield().getShieldType().getName().equals(ShieldTypeConstants.SHIELD))
            genericItem.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_TYPE);
        else if (shieldElementType.getShield().getShieldType().getName().equals(ShieldTypeConstants.STANDARD))
            genericItem.setObjectType(ObjectTypeConstants.STANDARD_ELEMENT_TYPE);
        else if (shieldElementType.getShield().getShieldType().getName().equals(ShieldTypeConstants.BUSINESS))
            genericItem.setObjectType(ObjectTypeConstants.BUSINESS_CONTROL_TYPE);
        else if (shieldElementType.getShield().getShieldType().getName().equals(ShieldTypeConstants.THREAT))
            genericItem.setObjectType(ObjectTypeConstants.THREAT_ELEMENT_TYPE);
        else
            throw new ExecException("Unknown Shield Type: " + shieldElementType.getShield().getShieldType().getName());

        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(ShieldElement shieldElement) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(shieldElement.getId());
        genericItem.setName(shieldElement.getName());
        genericItem.setDescription(shieldElement.getDescription());
        ShieldElementType shieldElementType = shieldElement.getShieldElementType();
        genericItem.setShieldElementTypeName(shieldElementType.getName());
        genericItem.setShieldElementTypeId(shieldElementType.getId());
        Shield shield = shieldElementType.getShield();
        genericItem.setShieldName(shield.getName());
        genericItem.setShieldId(shield.getId());
        ShieldType shieldType = shield.getShieldType();
        genericItem.setShieldTypeName(shieldType.getName());
        genericItem.setShieldTypeId(shieldType.getId());
        genericItem.setRefId(shieldElement.getAbbreviation());
        genericItem.setSortOrder(shieldElement.getSortOrder());
        OrganizationalUnit orgUnit = shieldElement.getOrganizationalUnit();
        if (orgUnit != null) {
            genericItem.setOrgUnitName(orgUnit.getName());
            genericItem.setOrgUnitId(orgUnit.getId());
        }
        genericItem.setDefaultElement(shieldElement.isDefault());
        genericItem.setMappableToSce(shieldElement.getShieldElementType().isMappableToSce());
        genericItem.setLevel(shieldElementType.getLevel());
        if (shieldType.getName().equals(ShieldTypeConstants.SHIELD))
            genericItem.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT);
        else if (shieldType.getName().equals(ShieldTypeConstants.STANDARD))
            genericItem.setObjectType(ObjectTypeConstants.STANDARD_ELEMENT);
        else if (shieldType.getName().equals(ShieldTypeConstants.BUSINESS))
            genericItem.setObjectType(ObjectTypeConstants.BUSINESS_CONTROL);
        else if (shieldType.getName().equals(ShieldTypeConstants.THREAT))
            genericItem.setObjectType(ObjectTypeConstants.THREAT_ELEMENT);
        else
            throw new ExecException("UnIdentified Shield Type " + shieldType.getName() + " for element with id " + shieldElement.getId());

        updateHaveArtifactBooleanFlag(genericItem);

        return genericItem;
    }

    public GenericItem buildGenericPOJO(SecurityControlExpression sce) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(sce.getId());
        genericItem.setName("");
        genericItem.setDescription(sce.getDescription());
        updateOnlyExpressionChains(genericItem, sce);

        genericItem.setObjectType(ObjectTypeConstants.SCE);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(ObjectiveParameterWord objectiveParameterWord) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(objectiveParameterWord.getId());
        genericItem.setDescription(objectiveParameterWord.getDescription());
        genericItem.setName(objectiveParameterWord.getWord());
        //genericItem.setOdosChain(parameterTreeChainBuilder.getOdosArrayListChain(objectiveParameterWord));
        genericItem.setLevel(objectiveParameterWord.getLevel());
        genericItem.setObjectType(ObjectTypeConstants.OBJECTIVE_PARAMETER);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJOWithParent(ObjectiveParameterWord objectiveParameterWord) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(objectiveParameterWord.getId());
        genericItem.setDescription(objectiveParameterWord.getDescription());
        genericItem.setName(objectiveParameterWord.getWord());

        ObjectiveParameterWord parent = objectiveParameterWord.getParentObjectiveParameterWord();
        if (parent == null || parent.isArchived()) {
            genericItem.setParentElementName("");
            genericItem.setParentElementId(0);
        } else {
            genericItem.setParentElementId(parent.getId());
            genericItem.setParentElementName(parent.getWord());
        }
        //genericItem.setOdosChain(parameterTreeChainBuilder.getOdosArrayListChain(objectiveParameterWord));
        genericItem.setLevel(objectiveParameterWord.getLevel());
        genericItem.setObjectType(ObjectTypeConstants.OBJECTIVE_PARAMETER);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(MethodParameterWord methodParameterWord) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(methodParameterWord.getId());
        genericItem.setDescription(methodParameterWord.getDescription());
        //genericItem.setMdosChain(parameterTreeChainBuilder.getMdosColonSeparatedChain(methodParameterWord));
        genericItem.setName(methodParameterWord.getWord());
        genericItem.setLevel(methodParameterWord.getLevel());
        genericItem.setObjectType(ObjectTypeConstants.METHOD_PARAMETER);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJOWithParent(MethodParameterWord methodParameterWord) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(methodParameterWord.getId());
        genericItem.setDescription(methodParameterWord.getDescription());
        //genericItem.setMdosChain(parameterTreeChainBuilder.getMdosColonSeparatedChain(methodParameterWord));
        MethodParameterWord parent = methodParameterWord.getParentMethodParameterWord();
        if (parent == null || parent.isArchived()) {
            genericItem.setParentElementName("");
            genericItem.setParentElementId(0);
        } else {
            genericItem.setParentElementId(parent.getId());
            genericItem.setParentElementName(parent.getWord());
        }
        genericItem.setName(methodParameterWord.getWord());
        genericItem.setLevel(methodParameterWord.getLevel());
        genericItem.setObjectType(ObjectTypeConstants.METHOD_PARAMETER);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(ContentParameterWord contentParameterWord) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(contentParameterWord.getId());
        genericItem.setDescription(contentParameterWord.getDescription());
        //genericItem.setCdosChain(parameterTreeChainBuilder.getCdosColonSeparatedChain(contentParameterWord));
        genericItem.setName(contentParameterWord.getWord());
        genericItem.setLevel(contentParameterWord.getLevel());
        genericItem.setObjectType(ObjectTypeConstants.CONTENT_PARAMETER);

        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJOWithParent(ContentParameterWord contentParameterWord) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(contentParameterWord.getId());
        genericItem.setDescription(contentParameterWord.getDescription());
        //genericItem.setCdosChain(parameterTreeChainBuilder.getCdosColonSeparatedChain(contentParameterWord));
        ContentParameterWord parent = contentParameterWord.getParentContentParameterWord();
        if (parent == null || parent.isArchived()) {
            genericItem.setParentElementName("");
            genericItem.setParentElementId(0);
        } else {
            genericItem.setParentElementId(parent.getId());
            genericItem.setParentElementName(parent.getWord());
        }
        genericItem.setName(contentParameterWord.getWord());
        genericItem.setLevel(contentParameterWord.getLevel());
        genericItem.setObjectType(ObjectTypeConstants.CONTENT_PARAMETER);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(SubjectParameterWord subjectParameterWord) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(subjectParameterWord.getId());
        genericItem.setDescription(subjectParameterWord.getDescription());
        //genericItem.setSdosChain(parameterTreeChainBuilder.getSdosColonSeparatedChain(subjectParameterWord));
        genericItem.setName(subjectParameterWord.getWord());
        genericItem.setLevel(subjectParameterWord.getLevel());
        genericItem.setObjectType(ObjectTypeConstants.SUBJECT_PARAMETER);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJOWithParent(SubjectParameterWord subjectParameterWord) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(subjectParameterWord.getId());
        genericItem.setDescription(subjectParameterWord.getDescription());
        //genericItem.setSdosChain(parameterTreeChainBuilder.getSdosColonSeparatedChain(subjectParameterWord));
        SubjectParameterWord parent = subjectParameterWord.getParentSubjectParameterWord();
        if (parent == null || parent.isArchived()) {
            genericItem.setParentElementName("");
            genericItem.setParentElementId(0);
        } else {
            genericItem.setParentElementId(parent.getId());
            genericItem.setParentElementName(parent.getWord());
        }
        genericItem.setName(subjectParameterWord.getWord());
        genericItem.setLevel(subjectParameterWord.getLevel());
        genericItem.setObjectType(ObjectTypeConstants.SUBJECT_PARAMETER);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(AssetType assetType) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(assetType.getId());
        genericItem.setName(assetType.getName());
        genericItem.setDescription(assetType.getDescription());
        genericItem.setSortOrder(assetType.getSortOrder());
        OrganizationalUnit orgUnit = assetType.getOrganizationalUnit();
        if (orgUnit != null) {
            genericItem.setOrgUnitName(orgUnit.getName());
            genericItem.setOrgUnitId(orgUnit.getId());
        }

        genericItem.setLevel(assetType.getLevel());
        genericItem.setObjectType(ObjectTypeConstants.ASSET_TYPE);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(BusinessAssetType assetType) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(assetType.getId());
        genericItem.setName(assetType.getName());
        genericItem.setDescription(assetType.getDescription());
        genericItem.setSortOrder(assetType.getSortOrder());
        OrganizationalUnit orgUnit = assetType.getOrganizationalUnit();
        if (orgUnit != null) {
            genericItem.setOrgUnitName(orgUnit.getName());
            genericItem.setOrgUnitId(orgUnit.getId());
        }

        genericItem.setLevel(assetType.getLevel());
        genericItem.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_TYPE);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJOWithParent(AssetType assetType) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(assetType.getId());
        genericItem.setName(assetType.getName());
        genericItem.setDescription(assetType.getDescription());
        AssetType parent = assetType.getParentAssetType();
        if (parent == null || parent.isArchived()) {
            genericItem.setParentElementName("");
            genericItem.setParentElementId(0);
        } else {
            genericItem.setParentElementId(parent.getId());
            genericItem.setParentElementName(parent.getName());
        }

        OrganizationalUnit orgUnit = assetType.getOrganizationalUnit();
        if (orgUnit != null) {
            genericItem.setOrgUnitName(orgUnit.getName());
            genericItem.setOrgUnitId(orgUnit.getId());
        }

        genericItem.setLevel(assetType.getLevel());
        genericItem.setObjectType(ObjectTypeConstants.ASSET_TYPE);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJOWithParent(BusinessAssetType assetType) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(assetType.getId());
        genericItem.setName(assetType.getName());
        genericItem.setDescription(assetType.getDescription());
        BusinessAssetType parent = assetType.getParentBusinessAssetType();
        if (parent == null || parent.isArchived()) {
            genericItem.setParentElementName("");
            genericItem.setParentElementId(0);
        } else {
            genericItem.setParentElementId(parent.getId());
            genericItem.setParentElementName(parent.getName());
        }

        OrganizationalUnit orgUnit = assetType.getOrganizationalUnit();
        if (orgUnit != null) {
            genericItem.setOrgUnitName(orgUnit.getName());
            genericItem.setOrgUnitId(orgUnit.getId());
        }

        genericItem.setLevel(assetType.getLevel());
        genericItem.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_TYPE);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(Asset asset) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(asset.getId());
        genericItem.setName(asset.getName());
        genericItem.setDescription(asset.getDescription());
        genericItem.setSortOrder(asset.getSortOrder());
        /*OrganizationalUnit orgUnit = asset.getOrganizationalUnit();
        if(orgUnit != null) {
            genericItem.setOrgUnitName(orgUnit.getName());
            genericItem.setOrgUnitId(orgUnit.getId());
        }
        genericItem.setProviderName(asset.getProviderInfo().getName());*/

        genericItem.setObjectType(ObjectTypeConstants.ASSET);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;

    }

    public GenericItem buildGenericPOJO(BusinessAsset asset) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(asset.getId());
        genericItem.setName(asset.getName());
        genericItem.setDescription(asset.getDescription());
        genericItem.setSortOrder(asset.getSortOrder());
        /*OrganizationalUnit orgUnit = asset.getOrganizationalUnit();
        if(orgUnit != null) {
            genericItem.setOrgUnitName(orgUnit.getName());
            genericItem.setOrgUnitId(orgUnit.getId());
        }
        genericItem.setProviderName(asset.getProviderInfo().getName());*/

        genericItem.setObjectType(ObjectTypeConstants.BUSINESS_ASSET);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;

    }

    public GenericItem buildGenericPOJO(ProviderInfo providerInfo) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(providerInfo.getId());
        genericItem.setName(providerInfo.getName());
        genericItem.setDescription(providerInfo.getDescription());
        genericItem.setSortOrder(providerInfo.getSortOrder());
        OrganizationalUnit orgUnit = providerInfo.getOrganizationalUnit();
        if (orgUnit != null) {
            genericItem.setOrgUnitName(orgUnit.getName());
            genericItem.setOrgUnitId(orgUnit.getId());
        }

        genericItem.setObjectType(ObjectTypeConstants.PROVIDER);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(BusinessProvider providerInfo) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(providerInfo.getId());
        genericItem.setName(providerInfo.getName());
        genericItem.setDescription(providerInfo.getDescription());
        genericItem.setSortOrder(providerInfo.getSortOrder());
        OrganizationalUnit orgUnit = providerInfo.getOrganizationalUnit();
        if (orgUnit != null) {
            genericItem.setOrgUnitName(orgUnit.getName());
            genericItem.setOrgUnitId(orgUnit.getId());
        }

        genericItem.setObjectType(ObjectTypeConstants.BUSINESS_PROVIDER);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(TechnicalSupport technicalSupport) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(technicalSupport.getId());
        genericItem.setName(technicalSupport.getName());
        genericItem.setDescription(technicalSupport.getDescription());
        genericItem.setProviderName(technicalSupport.getProviderInfo().getName());

        genericItem.setObjectType(ObjectTypeConstants.TECHNICAL_SUPPORT_PEOPLE);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(TechnicalSupportContactInfo technicalSupportContactInfo) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(technicalSupportContactInfo.getId());
        genericItem.setName(technicalSupportContactInfo.getContactNumber());

        genericItem.setObjectType(ObjectTypeConstants.TECHNICAL_SUPPORT_CONTACT_INFO);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public String buildUniqueId(GenericItem genericItem, String uniqueObjectTypeId) {
        if (genericItem == null)
            throw new ExecException("genericItem parameter to buildUniqeId is null");
        if (genericItem.getObjectType() == null)
            throw new ExecException("buildUniqueId: objectType parameter of genericItem object is null");
        if (genericItem.getElementId() == null)
            throw new ExecException("buildUniqueId: elementId parameter of genericItem object is null");

        return "" + uniqueObjectTypeId + genericItem.getElementId();
    }

    public GenericItem buildGenericPOJO(OrganizationalUnit organizationalUnit) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(organizationalUnit.getId());
        genericItem.setName(organizationalUnit.getName());
        genericItem.setDescription(organizationalUnit.getDescription());

        genericItem.setLevel(organizationalUnit.getLevel());
        genericItem.setObjectType(ObjectTypeConstants.ORGANIZATIONAL_UNIT);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJOWithParent(OrganizationalUnit organizationalUnit) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(organizationalUnit.getId());
        genericItem.setName(organizationalUnit.getName());
        genericItem.setDescription(organizationalUnit.getDescription());
        OrganizationalUnit parentOu = organizationalUnit.getParentOrganizationalUnit();
        if (parentOu == null || parentOu.isArchived()) {
            genericItem.setParentElementName("");
            genericItem.setParentElementId(0);
        } else {
            genericItem.setParentElementId(parentOu.getId());
            genericItem.setParentElementName(parentOu.getName());
        }
        genericItem.setLevel(organizationalUnit.getLevel());
        genericItem.setObjectType(ObjectTypeConstants.ORGANIZATIONAL_UNIT);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(String objectType) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(0);
        genericItem.setObjectType(objectType);
        return genericItem;
    }

    public PerspectiveGroupInfo handleIsIncludedInGroup(PerspectiveGroupInfo perspectiveGroupInfo, GenericItem genericItem) {
        if (perspectiveGroupInfo.getGroupItems() == null) {
            genericItem.setGroupItemFound(true);
            perspectiveGroupInfo = getCopyOfPerspectiveGroupInfoWithIncludeAllTrue(perspectiveGroupInfo);
        } else if (containInGroup(genericItem, perspectiveGroupInfo.getGroupItems())) {
            genericItem.setGroupItemFound(true);

            //here set boolean flags true for group item.
            Integer booleanFlags = genericItem.getBooleanFlags();
            if (booleanFlags == null)
                booleanFlags = 0;

            booleanFlags = getBooleanFlagsWithGroupItemFlagUpdated(booleanFlags, true);
            genericItem.setBooleanFlags(booleanFlags);

            perspectiveGroupInfo = getCopyOfPerspectiveGroupInfoWithIncludeAllTrue(perspectiveGroupInfo);
        }
        return perspectiveGroupInfo;
    }

    public PerspectiveGroupInfo getCopyOfPerspectiveGroupInfoWithIncludeAllTrue(PerspectiveGroupInfo perspectiveGroupInfo) {
        PerspectiveGroupInfo response = new PerspectiveGroupInfo();
        response.setDate(perspectiveGroupInfo.getDate());
        response.setGroupFoundAndIncludeAllChildren(true);
        response.setGroupItems(perspectiveGroupInfo.getGroupItems());
        response.setLevelOfEvaluation(perspectiveGroupInfo.getLevelOfEvaluation());
        response.setPerspectiveIds(perspectiveGroupInfo.getPerspectiveIds());
        response.setRated(perspectiveGroupInfo.isRated());
        response.setRulerType(perspectiveGroupInfo.getRulerType());

        return response;
    }

    public boolean containInGroup(GenericItem genericItem, List<IdNameObject> groupItems) {

        if (groupItems == null)
            return true;

        Integer id = genericItem.getElementId();
        if (id == null)
            id = 0;
        String objectType = genericItem.getObjectType();
        if (objectType == null)
            throw new ExecException("In containInGroup method : Object Type cannot be null");
        for (IdNameObject obj : groupItems) {
            if (obj.getElementId().equals(id) && obj.getObjectType().equals(objectType))
                return true;
        }
        return false;
    }

    public GenericItem buildGenericPOJO(ShieldElementGroup shieldElementGroup) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(shieldElementGroup.getId());
        genericItem.setName(shieldElementGroup.getName());
        genericItem.setDescription(shieldElementGroup.getDescription());
        if(shieldElementGroup.getShieldElementType() != null) {
            genericItem.setShieldElementTypeId(shieldElementGroup.getShieldElementType().getId());
            genericItem.setShieldElementTypeName(shieldElementGroup.getShieldElementType().getName());
        }
        if (shieldElementGroup.getOrganizationalUnit() != null) {
            genericItem.setOrgUnitId(shieldElementGroup.getOrganizationalUnit().getId());
            genericItem.setOrgUnitName(shieldElementGroup.getOrganizationalUnit().getName());
        }
        genericItem.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_GROUP);
        genericItem.setLevel(shieldElementGroup.getLevel());
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(SceGroup sceGroup) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(sceGroup.getId());
        genericItem.setName(sceGroup.getName());
        genericItem.setDescription(sceGroup.getDescription());
        genericItem.setOrgUnitId(sceGroup.getOrganizationalUnit().getId());
        genericItem.setOrgUnitName(sceGroup.getOrganizationalUnit().getName());
        genericItem.setObjectType(ObjectTypeConstants.SCE_GROUP);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(AssetGroup assetGroup) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(assetGroup.getId());
        genericItem.setName(assetGroup.getName());
        genericItem.setDescription(assetGroup.getDescription());
        genericItem.setOrgUnitId(assetGroup.getOrganizationalUnit().getId());
        genericItem.setOrgUnitName(assetGroup.getOrganizationalUnit().getName());
        genericItem.setObjectType(ObjectTypeConstants.ASSET_GROUP);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(AssetTypeGroup assetTypeGroup) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(assetTypeGroup.getId());
        genericItem.setName(assetTypeGroup.getName());
        genericItem.setDescription(assetTypeGroup.getDescription());
        genericItem.setLevel(assetTypeGroup.getLevel());
        genericItem.setOrgUnitId(assetTypeGroup.getOrganizationalUnit().getId());
        genericItem.setOrgUnitName(assetTypeGroup.getOrganizationalUnit().getName());
        genericItem.setObjectType(ObjectTypeConstants.ASSET_TYPE_GROUP);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(ProviderGroup providerGroup) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(providerGroup.getId());
        genericItem.setName(providerGroup.getName());
        genericItem.setDescription(providerGroup.getDescription());
        genericItem.setOrgUnitId(providerGroup.getOrganizationalUnit().getId());
        genericItem.setOrgUnitName(providerGroup.getOrganizationalUnit().getName());
        genericItem.setObjectType(ObjectTypeConstants.PROVIDER_GROUP);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(BusinessAssetGroup assetGroup) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(assetGroup.getId());
        genericItem.setName(assetGroup.getName());
        genericItem.setDescription(assetGroup.getDescription());
        genericItem.setOrgUnitId(assetGroup.getOrganizationalUnit().getId());
        genericItem.setOrgUnitName(assetGroup.getOrganizationalUnit().getName());
        genericItem.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_GROUP);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(BusinessAssetTypeGroup assetTypeGroup) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(assetTypeGroup.getId());
        genericItem.setName(assetTypeGroup.getName());
        genericItem.setDescription(assetTypeGroup.getDescription());
        genericItem.setLevel(assetTypeGroup.getLevel());
        genericItem.setOrgUnitId(assetTypeGroup.getOrganizationalUnit().getId());
        genericItem.setOrgUnitName(assetTypeGroup.getOrganizationalUnit().getName());
        genericItem.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_TYPE_GROUP);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(BusinessProviderGroup providerGroup) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(providerGroup.getId());
        genericItem.setName(providerGroup.getName());
        genericItem.setDescription(providerGroup.getDescription());
        genericItem.setOrgUnitId(providerGroup.getOrganizationalUnit().getId());
        genericItem.setOrgUnitName(providerGroup.getOrganizationalUnit().getName());
        genericItem.setObjectType(ObjectTypeConstants.BUSINESS_PROVIDER_GROUP);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public ResponseEntity<GenericItem> buildGIErrorResponse(String errorMessage, HttpStatus httpStatus) {
        GenericItem response = new GenericItem();
        response.setErrorMessage(errorMessage);
        return new ResponseEntity(response, httpStatus);
    }

    public ResponseEntity<GenericItem> buildAccessDeniedResponse() {
        GenericItem response = new GenericItem();
        response.setErrorMessage("Access Denied. Please check with administrator for permissions.");
        return new ResponseEntity(response, HttpStatus.UNAUTHORIZED);
    }

    public ResponseEntity<LinkElementInfoResponse> buildGIErrorResponseForLink(String errorMessage, HttpStatus httpStatus) {
        LinkElementInfoResponse response = new LinkElementInfoResponse();
        response.setErrorMessage(errorMessage);
        return new ResponseEntity(response, httpStatus);
    }

    public GenericItem buildGenericPOJO(CustomPerspective perspective) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(perspective.getId());
        genericItem.setName(perspective.getName());
        genericItem.setDescription(perspective.getDescription());
        genericItem.setObjectType(ObjectTypeConstants.PERSPECTIVE);
        genericItem.setColor(perspective.getColor());
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;

    }

    public GenericItem buildGenericPOJO(AssetDeliversSceRTAttribute attribute) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(attribute.getId());
        genericItem.setName(attribute.getName());
        genericItem.setDescription(attribute.getDescription());
        genericItem.setObjectType(ObjectTypeConstants.ASSET_DELIVERS_ATTRIBUTE);
        genericItem.setFiveRatingDesc(attribute.getFiveRatingDescription());
        genericItem.setFourRatingDesc(attribute.getFourRatingDescription());
        genericItem.setThreeRatingDesc(attribute.getThreeRatingDescription());
        genericItem.setTwoRatingDesc(attribute.getTwoRatingDescription());
        genericItem.setOneRatingDesc(attribute.getOneRatingDescription());
        genericItem.setCoefficient(attribute.getCoefficient());
        genericItem.setActivated(attribute.isActivated());
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(AssetImplementsElementRTAttribute attribute) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(attribute.getId());
        genericItem.setName(attribute.getName());
        genericItem.setDescription(attribute.getDescription());
        genericItem.setObjectType(ObjectTypeConstants.ASSET_IMPLEMENTS_ATTRIBUTE);
        genericItem.setFiveRatingDesc(attribute.getFiveRatingDescription());
        genericItem.setFourRatingDesc(attribute.getFourRatingDescription());
        genericItem.setThreeRatingDesc(attribute.getThreeRatingDescription());
        genericItem.setTwoRatingDesc(attribute.getTwoRatingDescription());
        genericItem.setOneRatingDesc(attribute.getOneRatingDescription());
        genericItem.setCoefficient(attribute.getCoefficient());
        genericItem.setActivated(attribute.isActivated());
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(AssetDeliversSceRTRating rating) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(rating.getId());
        genericItem.setJustificationReason(rating.getJustificationReason());
        genericItem.setName(rating.getAssetDeliversSceRTAttribute().getName() + " " + rating.getRating());
        genericItem.setRating(rating.getRating());
        genericItem.setObjectType(ObjectTypeConstants.ASSET_DELIVERS_ATTRIBUTE_RATING);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(AssetImplementsElementRTRating rating) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(rating.getId());
        genericItem.setJustificationReason(rating.getJustificationReason());
        genericItem.setName(rating.getAssetImplementsElementRTAttribute().getName() + " " + rating.getRating());
        genericItem.setRating(rating.getRating());
        genericItem.setObjectType(ObjectTypeConstants.ASSET_IMPLEMENTS_ATTRIBUTE_RATING);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJOWithParentElement(ShieldElement shieldElement) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(shieldElement.getId());
        genericItem.setName(shieldElement.getName());
        genericItem.setDescription(shieldElement.getDescription());
        ShieldElementType shieldElementType = shieldElement.getShieldElementType();
        genericItem.setShieldElementTypeName(shieldElementType.getName());
        genericItem.setShieldElementTypeId(shieldElementType.getId());
        Shield shield = shieldElementType.getShield();
        genericItem.setShieldName(shield.getName());
        genericItem.setShieldId(shield.getId());
        ShieldType shieldType = shield.getShieldType();
        genericItem.setShieldTypeName(shieldType.getName());
        genericItem.setShieldTypeId(shieldType.getId());
        genericItem.setRefId(shieldElement.getAbbreviation());


        ShieldElement parentShieldElement = shieldElement.getParentShieldElement();
        if (parentShieldElement == null || parentShieldElement.isArchived()) {
            genericItem.setParentElementId(0);
            genericItem.setParentElementName("");
        } else {
            genericItem.setParentElementId(parentShieldElement.getId());
            genericItem.setParentElementName(parentShieldElement.getName());
        }

        OrganizationalUnit orgUnit = shieldElement.getOrganizationalUnit();
        if (orgUnit != null) {
            genericItem.setOrgUnitName(orgUnit.getName());
            genericItem.setOrgUnitId(orgUnit.getId());
        }
        genericItem.setDefaultElement(shieldElement.isDefault());
        genericItem.setMappableToSce(shieldElement.getShieldElementType().isMappableToSce());
        genericItem.setLevel(shieldElementType.getLevel());
        if (shieldType.getName().equals(ShieldTypeConstants.SHIELD))
            genericItem.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT);
        else if (shieldType.getName().equals(ShieldTypeConstants.STANDARD))
            genericItem.setObjectType(ObjectTypeConstants.STANDARD_ELEMENT);
        else if (shieldType.getName().equals(ShieldTypeConstants.BUSINESS))
            genericItem.setObjectType(ObjectTypeConstants.BUSINESS_CONTROL);
        else if (shieldType.getName().equals(ShieldTypeConstants.THREAT))
            genericItem.setObjectType(ObjectTypeConstants.THREAT_ELEMENT);
        else
            throw new ExecException("UnIdentified Shield Type " + shieldType.getName() + " for element with id " + shieldElement.getId());
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(ShieldElementRTAttribute attribute) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(attribute.getId());
        genericItem.setName(attribute.getName());
        genericItem.setDescription(attribute.getDescription());
        genericItem.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_RT_ATTRIBUTE);
        genericItem.setFiveRatingDesc(attribute.getFiveRatingDescription());
        genericItem.setFourRatingDesc(attribute.getFourRatingDescription());
        genericItem.setThreeRatingDesc(attribute.getThreeRatingDescription());
        genericItem.setTwoRatingDesc(attribute.getTwoRatingDescription());
        genericItem.setOneRatingDesc(attribute.getOneRatingDescription());
        genericItem.setCoefficient(attribute.getCoefficient());
        genericItem.setActivated(attribute.isActivated());
        updateHaveArtifactBooleanFlag(genericItem);

        return genericItem;
    }

    public GenericItem buildGenericPOJO(ShieldElementRTRating rating) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(rating.getId());
        genericItem.setJustificationReason(rating.getJustificationReason());
        genericItem.setName(rating.getShieldElementRTAttribute().getName() + " " + rating.getRating());
        genericItem.setRating(rating.getRating());
        genericItem.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_RT_ATTRIBUTE_RATING);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(AssetDeliversSceRTLibraryAttribute attribute) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(attribute.getId());
        genericItem.setName(attribute.getName());
        genericItem.setDescription(attribute.getDescription());
        genericItem.setObjectType(ObjectTypeConstants.ASSET_DELIVERS_LIBRARY_ATTRIBUTE);
        genericItem.setFiveRatingDesc(attribute.getFiveRatingDescription());
        genericItem.setFourRatingDesc(attribute.getFourRatingDescription());
        genericItem.setThreeRatingDesc(attribute.getThreeRatingDescription());
        genericItem.setTwoRatingDesc(attribute.getTwoRatingDescription());
        genericItem.setOneRatingDesc(attribute.getOneRatingDescription());
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(AssetImplementsElementRTLibraryAttribute attribute) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(attribute.getId());
        genericItem.setName(attribute.getName());
        genericItem.setDescription(attribute.getDescription());
        genericItem.setObjectType(ObjectTypeConstants.ASSET_IMPLEMENTS_LIBRARY_ATTRIBUTE);
        genericItem.setFiveRatingDesc(attribute.getFiveRatingDescription());
        genericItem.setFourRatingDesc(attribute.getFourRatingDescription());
        genericItem.setThreeRatingDesc(attribute.getThreeRatingDescription());
        genericItem.setTwoRatingDesc(attribute.getTwoRatingDescription());
        genericItem.setOneRatingDesc(attribute.getOneRatingDescription());
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(ShieldElementRTLibraryAttribute attribute) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(attribute.getId());
        genericItem.setName(attribute.getName());
        genericItem.setDescription(attribute.getDescription());
        genericItem.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_LIBRARY_ATTRIBUTE);
        genericItem.setFiveRatingDesc(attribute.getFiveRatingDescription());
        genericItem.setFourRatingDesc(attribute.getFourRatingDescription());
        genericItem.setThreeRatingDesc(attribute.getThreeRatingDescription());
        genericItem.setTwoRatingDesc(attribute.getTwoRatingDescription());
        genericItem.setOneRatingDesc(attribute.getOneRatingDescription());
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(SceFulfillsShieldElement sceFulfillsShieldElement) {
        GenericItem genericItem = new GenericItem();

        if (sceFulfillsShieldElement.getShieldElement() == null || sceFulfillsShieldElement.getSce() == null)
            throw new ExecException("Shield Element or expression is null for sce fulfills shield element link with id " + sceFulfillsShieldElement.getId());

        genericItem = buildGenericPOJO(sceFulfillsShieldElement.getShieldElement());

        genericItem.setElementId(sceFulfillsShieldElement.getId());
        genericItem.setObjectType(ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK);

        SecurityControlExpression sce = sceFulfillsShieldElement.getSce();

        updateOnlyExpressionChains(genericItem, sce);
        updateHaveArtifactBooleanFlag(genericItem);

        return genericItem;
    }

    private void updateOnlyExpressionChains(GenericItem genericItem, SecurityControlExpression sce) {
        ObjectiveParameterWord odos = sce.getObjectiveParameterWord();
        if (odos != null && !odos.isArchived()) {
            genericItem.setOdosChain(parameterTreeChainBuilder.getOdosArrayListChain(odos));
        }
        MethodParameterWord mdos = sce.getMethodParameterWord();
        if (mdos != null && !mdos.isArchived()) {
            genericItem.setMdosChain(parameterTreeChainBuilder.getMdosColonSeparatedChain(mdos));
        }
        ContentParameterWord cdos = sce.getContentParameterWord();
        if (cdos != null && !cdos.isArchived()) {
            genericItem.setCdosChain(parameterTreeChainBuilder.getCdosColonSeparatedChain(cdos));
        }
        SubjectParameterWord sdos = sce.getSubjectParameterWord();
        if (sdos != null) {
            genericItem.setSdosChain(parameterTreeChainBuilder.getSdosColonSeparatedChain(sdos));
        }
    }

    public GenericItem buildGenericPOJO(AssetDeliversSce assetDeliversSce) {
        GenericItem genericItem = new GenericItem();

        if (assetDeliversSce.getAsset() == null || assetDeliversSce.getSce() == null)
            throw new ExecException("Asset or expression is null for asset delivers sce link with id " + assetDeliversSce.getId());

        genericItem = buildGenericPOJO(assetDeliversSce.getAsset());

        genericItem.setElementId(assetDeliversSce.getId());

        if (assetDeliversSce.getShallCould().equals(ProtectionType.SHALL))
            genericItem.setObjectType(ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK);
        else if (assetDeliversSce.getShallCould().equals(ProtectionType.COULD))
            genericItem.setObjectType(ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK_COULD);
        else
            throw new ExecException("Unknown protection type " + assetDeliversSce.getShallCould());

        SecurityControlExpression sce = assetDeliversSce.getSce();

        updateOnlyExpressionChains(genericItem, sce);

        updateHaveArtifactBooleanFlag(genericItem);

        return genericItem;
    }

    public GenericItem buildGenericPOJO(AssetTypeProtectedBySce assetTypeProtectedBySce) {
        GenericItem genericItem = new GenericItem();

        if (assetTypeProtectedBySce.getAssetType() == null || assetTypeProtectedBySce.getSce() == null)
            throw new ExecException("AssetType or expression is null for asset type protected by sce link with id " + assetTypeProtectedBySce.getId());

        genericItem = buildGenericPOJO(assetTypeProtectedBySce.getAssetType());

        genericItem.setElementId(assetTypeProtectedBySce.getId());

        if (assetTypeProtectedBySce.getShallCouldIs().equals(ProtectionType.SHALL))
            genericItem.setObjectType(ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK);
        else if (assetTypeProtectedBySce.getShallCouldIs().equals(ProtectionType.COULD))
            genericItem.setObjectType(ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK_COULD);
        else
            throw new ExecException("Unknown protection type " + assetTypeProtectedBySce.getShallCouldIs());

        SecurityControlExpression sce = assetTypeProtectedBySce.getSce();

        updateOnlyExpressionChains(genericItem, sce);
        updateHaveArtifactBooleanFlag(genericItem);

        return genericItem;
    }

    public GenericItem buildGenericPOJO(Artifact artifact) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(artifact.getId());
        genericItem.setName(artifact.getName());
        genericItem.setDescription(artifact.getDescription());
        genericItem.setObjectType(ObjectTypeConstants.ARTIFACT);
        genericItem.setFileName(artifact.getOriginalFileName());
        updateHaveArtifactBooleanFlag(genericItem);

        return genericItem;
    }

    public GenericItem buildGenericPOJO(AssetTypeToShieldElementMap assetTypeToShieldElementMap) {
        GenericItem genericItem = new GenericItem();

        if (assetTypeToShieldElementMap.getAssetType() == null || assetTypeToShieldElementMap.getShieldElement() == null)
            throw new ExecException("AssetType or Shield Element is null for assetTypeToShieldElementMap link with id " + assetTypeToShieldElementMap.getId());

        genericItem.setElementId(assetTypeToShieldElementMap.getId());
        genericItem.setObjectType(ObjectTypeConstants.ASSET_TYPE_TO_SHIELD_ELEMENT_LINK);

        updateHaveArtifactBooleanFlag(genericItem);

        return genericItem;
    }

    public GenericItem buildGenericPOJO(AssetToShieldElementMap assetToShieldElementMap) {
        GenericItem genericItem = new GenericItem();

        if (assetToShieldElementMap.getAsset() == null || assetToShieldElementMap.getShieldElement() == null)
            throw new ExecException("Asset or Shield Element is null for assetToShieldElementMap link with id " + assetToShieldElementMap.getId());

        genericItem.setElementId(assetToShieldElementMap.getId());
        genericItem.setObjectType(ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK);

        updateHaveArtifactBooleanFlag(genericItem);

        return genericItem;
    }

    public GenericItem buildGenericPOJO(ShieldElementToShieldElementMap shieldElementToShieldElementMap) {
        GenericItem genericItem = new GenericItem();

        if (shieldElementToShieldElementMap.getShieldElementOne() == null || shieldElementToShieldElementMap.getShieldElementTwo() == null)
            throw new ExecException("Shield Element One or Shield Element Two is null for shieldElementToShieldElementMap link with id " + shieldElementToShieldElementMap.getId());

        genericItem.setElementId(shieldElementToShieldElementMap.getId());
        genericItem.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_TO_SHIELD_ELEMENT_LINK);

        updateHaveArtifactBooleanFlag(genericItem);

        return genericItem;
    }

    public GenericItem buildGenericPOJO(SphericUser user) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(user.getId());
        genericItem.setName(user.getFirstName() + " " + user.getLastName() + " (" + user.getEmail() + ")");
        genericItem.setEmail(user.getEmail());
        genericItem.setDescription(user.getDescription());

        genericItem.setObjectType(ObjectTypeConstants.USER);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(UserRole userRole) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(userRole.getId());
        genericItem.setName(userRole.getName());
        genericItem.setDescription(userRole.getDescription());
        genericItem.setObjectType(ObjectTypeConstants.USER_ROLE);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(IngestSource ingestSource) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(ingestSource.getId());
        genericItem.setName(ingestSource.getName());
        genericItem.setDescription(ingestSource.getDescription());
        genericItem.setObjectType(ObjectTypeConstants.INGEST_SOURCE);
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(TestProcedure testProcedure) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(testProcedure.getId());
        genericItem.setName(testProcedure.getDescription());
        genericItem.setDescription("");
        genericItem.setObjectType(ObjectTypeConstants.TEST_PROCEDURE);
        genericItem.setRefId(testProcedure.getReferenceId());

        IngestSource source = testProcedure.getIngestSource();
        if (source != null) {
            genericItem.setSourceName(source.getName());
            genericItem.setSourceId(source.getId());
        } else {
            genericItem.setSourceName("");
            genericItem.setSourceId(0);
        }
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(Guidance guidance) {
        GenericItem genericItem = new GenericItem();
        genericItem.setElementId(guidance.getId());
        genericItem.setName(guidance.getDescription());
        genericItem.setDescription("");
        genericItem.setObjectType(ObjectTypeConstants.GUIDANCE);
        IngestSource source = guidance.getIngestSource();
        if (source != null) {
            genericItem.setSourceName(source.getName());
            genericItem.setSourceId(source.getId());
        } else {
            genericItem.setSourceName("");
            genericItem.setSourceId(0);
        }
        updateHaveArtifactBooleanFlag(genericItem);
        return genericItem;
    }

    public GenericItem buildGenericPOJO(BusinessAssetToExpressionLink businessAssetToExpressionLink) {
        GenericItem genericItem = new GenericItem();

        if (businessAssetToExpressionLink.getBusinessAsset() == null || businessAssetToExpressionLink.getSce() == null)
            throw new ExecException("Asset or expression is null for businessAssetToExpressionLink with id " + businessAssetToExpressionLink.getId());

        genericItem = buildGenericPOJO(businessAssetToExpressionLink.getBusinessAsset());

        genericItem.setElementId(businessAssetToExpressionLink.getId());

        if (businessAssetToExpressionLink.getShallCould().equals(ProtectionType.SHALL))
            genericItem.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_TO_EXPRESSION_LINK);
        else if (businessAssetToExpressionLink.getShallCould().equals(ProtectionType.COULD))
            genericItem.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_TO_EXPRESSION_LINK_COULD);
        else
            throw new ExecException("Unknown protection type " + businessAssetToExpressionLink.getShallCould());

        SecurityControlExpression sce = businessAssetToExpressionLink.getSce();

        updateOnlyExpressionChains(genericItem, sce);

        updateHaveArtifactBooleanFlag(genericItem);

        return genericItem;
    }

    public GenericItem buildGenericPOJO(BusinessAssetTypeToExpressionLink businessAssetTypeToExpressionLink) {
        GenericItem genericItem = new GenericItem();

        if (businessAssetTypeToExpressionLink.getBusinessAssetType() == null || businessAssetTypeToExpressionLink.getSce() == null)
            throw new ExecException("AssetType or expression is null for BusinessAssetTypeToExpressionLink with id " + businessAssetTypeToExpressionLink.getId());

        genericItem = buildGenericPOJO(businessAssetTypeToExpressionLink.getBusinessAssetType());

        genericItem.setElementId(businessAssetTypeToExpressionLink.getId());

        if (businessAssetTypeToExpressionLink.getShallCouldIs().equals(ProtectionType.SHALL))
            genericItem.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_EXPRESSION_LINK);
        else if (businessAssetTypeToExpressionLink.getShallCouldIs().equals(ProtectionType.COULD))
            genericItem.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_EXPRESSION_LINK_COULD);
        else
            throw new ExecException("Unknown protection type " + businessAssetTypeToExpressionLink.getShallCouldIs());

        SecurityControlExpression sce = businessAssetTypeToExpressionLink.getSce();

        updateOnlyExpressionChains(genericItem, sce);
        updateHaveArtifactBooleanFlag(genericItem);

        return genericItem;
    }

    public GenericItem buildGenericPOJO(BusinessAssetTypeToShieldElementMap assetTypeToShieldElementMap) {
        GenericItem genericItem = new GenericItem();

        if (assetTypeToShieldElementMap.getBusinessAssetType() == null || assetTypeToShieldElementMap.getShieldElement() == null)
            throw new ExecException("AssetType or Shield Element is null for B AssetTypeToShieldElementMap link with id " + assetTypeToShieldElementMap.getId());

        genericItem.setElementId(assetTypeToShieldElementMap.getId());
        genericItem.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_SHIELD_ELEMENT_LINK);

        updateHaveArtifactBooleanFlag(genericItem);

        return genericItem;
    }

    public GenericItem buildGenericPOJO(BusinessAssetToShieldElementMap assetToShieldElementMap) {
        GenericItem genericItem = new GenericItem();

        if (assetToShieldElementMap.getBusinessAsset() == null || assetToShieldElementMap.getShieldElement() == null)
            throw new ExecException("Asset or Shield Element is null for B assetToShieldElementMap link with id " + assetToShieldElementMap.getId());

        genericItem.setElementId(assetToShieldElementMap.getId());
        genericItem.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_TO_SHIELD_ELEMENT_LINK);

        updateHaveArtifactBooleanFlag(genericItem);

        return genericItem;
    }

    public void keepOnlyGivenObjectTypeInChildren(GenericItem genericItem, String objectType) {
        if(genericItem == null)
            return;
        if(genericItem.getChildren() == null || genericItem.getChildren().size() == 0)
            return;
        List<GenericItem> filteredChildren = genericItem.getChildren().stream().
                filter(item -> item.getObjectType().equals(objectType)).collect(Collectors.toList());
        genericItem.setChildren(filteredChildren);
        for(GenericItem item: filteredChildren) {
            keepOnlyGivenObjectTypeInChildren(item, objectType);
        }
    }
}
