package com.ss.service.delete;

import com.ss.common.ExecException;
import com.ss.constants.ObjectTypeConstants;
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
import com.ss.domain.perspective.rating.*;
import com.ss.domain.sce.SceFulfillsShieldElement;
import com.ss.domain.sce.SecurityControlExpression;
import com.ss.domain.shieldclassification.*;
import com.ss.domain.usermanagement.*;
import com.ss.repository.artifact.ArtifactRepository;
import com.ss.repository.asset.*;
import com.ss.repository.businessasset.*;
import com.ss.repository.groups.*;
import com.ss.repository.parametertree.ContentParameterWordRepository;
import com.ss.repository.parametertree.MethodParameterWordRepository;
import com.ss.repository.parametertree.ObjectiveParameterWordRepository;
import com.ss.repository.parametertree.SubjectParameterWordRepository;
import com.ss.repository.perspective.CustomPerspectiveRepository;
import com.ss.repository.perspective.attribute.*;
import com.ss.repository.perspective.rating.*;
import com.ss.repository.sce.SceFulfillsShieldElementRepository;
import com.ss.repository.sce.SecurityControlExpressionRepository;
import com.ss.repository.shieldclassification.*;
import com.ss.repository.usermanagement.*;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;

@Service("DeleteHelperService")
public class DeleteHelperService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private ShieldRepository shieldRepository;

    @Autowired
    private ShieldTypeRepository shieldTypeRepository;

    @Autowired
    private ShieldElementRepository shieldElementRepository;

    @Autowired
    private SecurityControlExpressionRepository securityControlExpressionRepository;

    @Autowired
    private OrganizationalUnitRepository organizationalUnitRepository;

    @Autowired
    private ObjectiveParameterWordRepository objectiveParameterWordRepository;

    @Autowired
    private MethodParameterWordRepository methodParameterWordRepository;

    @Autowired
    private ContentParameterWordRepository contentParameterWordRepository;

    @Autowired
    private SubjectParameterWordRepository subjectParameterWordRepository;

    @Autowired
    private AssetTypeRepository assetTypeRepository;

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private TechnicalSupportInfoRepository technicalSupportInfoRepository;

    @Autowired
    private ProviderInfoRepository providerInfoRepository;

    @Autowired
    private TechnicalSupportContactInfoRepository technicalSupportContactInfoRepository;

    @Autowired
    private ShieldElementGroupRepository shieldElementGroupRepository;

    @Autowired
    private SceGroupRepository sceGroupRepository;

    @Autowired
    private AssetGroupRepository assetGroupRepository;

    @Autowired
    private AssetTypeGroupRepository assetTypeGroupRepository;

    @Autowired
    private ProviderGroupRepository providerGroupRepository;

    @Autowired
    private ShieldElementTypeRepository shieldElementTypeRepository;

    @Autowired
    private AssetDeliversSceRepository assetDeliversSceRepository;

    @Autowired
    private AssetDeliversSceRTAttributeRepository assetDeliversSceRTAttributeRepository;

    @Autowired
    private SceRTAttributeRepository sceRTAttributeRepository;

    @Autowired
    private ShieldElementRTAttributeRepository shieldElementRTAttributeRepository;

    @Autowired
    private SceFulfillsShieldElementRepository sceFulfillsShieldElementRepository;

    @Autowired
    private ShieldElementFulfilledBySceRTAttributeRepository shieldElementFulfilledBySceRTAttributeRepository;

    @Autowired
    private ShieldElementFulfilledBySceRTRatingRepository shieldElementFulfilledBySceRTRatingRepository;

    @Autowired
    private CustomPerspectiveRepository customPerspectiveRepository;

    @Autowired
    private AssetTypeProtectedBySceRTAttributeRepository assetTypeProtectedBySceRTAttributeRepository;

    @Autowired
    private AssetTypeProtectedBySceRTRatingRepository assetTypeProtectedBySceRTRatingRepository;

    @Autowired
    private ShieldElementGroupMemberRepository shieldElementGroupMemberRepository;

    @Autowired
    private ShieldElementRTRatingRepository shieldElementRTRatingRepository;

    @Autowired
    private SceRTRatingRepository sceRTRatingRepository;

    @Autowired
    private SceGroupMemberRepository sceGroupMemberRepository;

    @Autowired
    private ProviderGroupMemberRepository providerGroupMemberRepository;

    @Autowired
    private AssetDeliversSceRTRatingRepository assetDeliversSceRTRatingRepository;

    @Autowired
    private AssetGroupMemberRepository assetGroupMemberRepository;

    @Autowired
    private AssetTypeGroupMemberRepository assetTypeGroupMemberRepository;

    @Autowired
    private AssetTypeProtectedBySceRepository assetTypeProtectedBySceRepository;

    @Autowired
    private AssetDeliversSceRTLibraryAttributeRepository assetDeliversSceRTLibraryAttributeRepository;

    @Autowired
    private ShieldElementRTLibraryAttributeRepository shieldElementRTLibraryAttributeRepository;

    @Autowired
    private AssetTypeProtectedBySceRTLibraryAttributeRepository assetTypeProtectedBySceRTLibraryAttributeRepository;

    @Autowired
    private ShieldElementFulfilledBySceRTLibraryAttributeRepository shieldElementFulfilledBySceRTLibraryAttributeRepository;

    @Autowired
    private SceRTLibraryAttributeRepository sceRTLibraryAttributeRepository;

    @Autowired
    private AssetTypeToShieldElementMapRepository assetTypeToShieldElementMapRepository;

    @Autowired
    private ArtifactRepository artifactRepository;

    @Autowired
    private AssetToShieldElementMapRepository assetToShieldElementMapRepository;

    @Autowired
    private ShieldElementToShieldElementMapRepository shieldElementToShieldElementMapRepository;

    @Autowired
    private SphericUserRepository sphericUserRepository;

    @Autowired
    private CoreObjectTypePermissionsMapRepository coreObjectTypePermissionsMapRepository;

    @Autowired
    private MiscellaneousActionPermissionsMapRepository miscellaneousActionPermissionsMapRepository;

    @Autowired
    private TestProcedureRepository testProcedureRepository;

    @Autowired
    private IngestSourceRepository ingestSourceRepository;

    @Autowired
    private GuidanceRepository guidanceRepository;

    @Autowired
    private ApprovalPendingUserRolesMapRepository approvalPendingUserRolesMapRepository;

    @Autowired
    private ApprovedUserRolesMapRepository approvedUserRolesMapRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private DesktopsOfInterestMapRepository desktopsOfInterestMapRepository;

    @Autowired
    private BusinessAssetTypeRepository businessAssetTypeRepository;

    @Autowired
    private BusinessAssetRepository businessAssetRepository;

    @Autowired
    private BusinessProviderRepository businessProviderRepository;

    @Autowired
    private BusinessAssetToExpressionLinkRepository businessAssetToExpressionLinkRepository;

    @Autowired
    private BusinessAssetToShieldElementMapRepository businessAssetToShieldElementMapRepository;

    @Autowired
    private BusinessAssetTypeToExpressionLinkRepository businessAssetTypeToExpressionLinkRepository;

    @Autowired
    private BusinessAssetTypeToShieldElementMapRepository businessAssetTypeToShieldElementMapRepository;

    @Autowired
    private BusinessAssetGroupRepository businessAssetGroupRepository;

    @Autowired
    private BusinessAssetGroupMemberRepository businessAssetGroupMemberRepository;

    @Autowired
    private BusinessAssetTypeGroupRepository businessAssetTypeGroupRepository;

    @Autowired
    private BusinessAssetTypeGroupMemberRepository businessAssetTypeGroupMemberRepository;

    @Autowired
    private BusinessProviderGroupRepository businessProviderGroupRepository;

    @Autowired
    private BusinessProviderGroupMemberRepository businessProviderGroupMemberRepository;

    @Autowired
    private AssetImplementsElementRTRatingRepository assetImplementsElementRTRatingRepository;

    @Autowired
    private AssetImplementsElementRTAttributeRepository assetImplementsElementRTAttributeRepository;

    @Autowired
    private AssetImplementsElementRTLibraryAttributeRepository assetImplementsElementRTLibraryAttributeRepository;

    private void deleteLinkedArtifacts(String objectType, Integer elementId) {
        List<Artifact> linkedArtifacts = artifactRepository.findByObjectTypeAndElementIdAndIsArchivedFalse(objectType, elementId);
        if (linkedArtifacts != null) {
            for (Artifact linkedArtifact : linkedArtifacts) {
                deleteArtifact(linkedArtifact);
            }
        }
    }

    public void deleteAssetType(AssetType assetType) {
        if (assetType == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_TYPE, assetType.getId());

        //Asset Type Protected By Sce
        List<AssetTypeProtectedBySce> assetTypeProtectedBySceList = assetType.getAssetTypeProtectedBySceList();
        if (assetTypeProtectedBySceList != null) {
            for (AssetTypeProtectedBySce assetTypeProtectedBySce : assetTypeProtectedBySceList)
                deleteAssetTypeProtectedBySce(assetTypeProtectedBySce);
        }

        //AssetType to Element Map
        List<AssetTypeToShieldElementMap> assetTypeToShieldElementMapList = assetType.getAssetTypeToShieldElementMapList();
        if (assetTypeProtectedBySceList != null) {
            for (AssetTypeToShieldElementMap assetTypeToShieldElementMap : assetTypeToShieldElementMapList)
                deleteAssetTypeToShieldElementMap(assetTypeToShieldElementMap);
        }

        //    Asset
        List<Asset> assets = assetType.getAssetList();
        if (assets != null)
            for (Asset asset : assets)
                deleteAsset(asset);

        //Asset Type Group Member
        List<AssetTypeGroupMember> assetTypeGroupMembers = assetType.getAssetTypeGroupMembers();
        if (assetTypeGroupMembers != null) {
            for (AssetTypeGroupMember assetTypeGroupMember : assetTypeGroupMembers)
                deleteAssetTypeGroupMember(assetTypeGroupMember);
        }

        //Children Asset Type
        List<AssetType> childrenAssetTypeList = assetType.getChildrenAssetTypeList();
        if (childrenAssetTypeList != null) {
            for (AssetType childAssetType : childrenAssetTypeList)
                deleteAssetType(childAssetType);
        }

        assetTypeRepository.delete(assetType);
    }

    public void deleteAsset(Asset asset) {

        if (asset == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET, asset.getId());

        //Asset Delivers Sce
        List<AssetDeliversSce> assetDeliversSceList = asset.getAssetDeliversSceList();
        if (assetDeliversSceList != null) {
            for (AssetDeliversSce assetDeliversSce : assetDeliversSceList)
                deleteAssetDeliversSce(assetDeliversSce);
        }

        //Direct Asset to Element Link
        List<AssetToShieldElementMap> assetToShieldElementMapList = asset.getAssetToShieldElementMapList();
        if (assetToShieldElementMapList != null) {
            for (AssetToShieldElementMap assetToShieldElementMap : assetToShieldElementMapList)
                deleteAssetToShieldElementMap(assetToShieldElementMap);
        }

        //Asset Group Member
        List<AssetGroupMember> assetGroupMembers = asset.getAssetGroupMembers();
        if (assetGroupMembers != null) {
            for (AssetGroupMember assetGroupMember : assetGroupMembers)
                deleteAssetGroupMember(assetGroupMember);
        }

        assetRepository.delete(asset);
    }

    public void deleteAssetDeliversSce(AssetDeliversSce assetDeliversSce) {
        if (assetDeliversSce == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK_COULD, assetDeliversSce.getId());
        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK, assetDeliversSce.getId());

        //Asset Delivers Attribute
        List<AssetDeliversSceRTAttribute> attributes = assetDeliversSce.getAssetDeliversSceRTAttributeList();
        if (attributes != null) {
            for (AssetDeliversSceRTAttribute attribute : attributes)
                deleteAssetDeliversSceRTAttribute(attribute);
        }

        assetDeliversSceRepository.delete(assetDeliversSce);
    }

    public void deleteAssetDeliversSceRTAttribute(AssetDeliversSceRTAttribute attribute) {
        if (attribute == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_DELIVERS_ATTRIBUTE, attribute.getId());

        //Asset Delivers Rating
        List<AssetDeliversSceRTRating> ratings = attribute.getAssetDeliversSceRTRatingList();
        if (ratings != null) {
            for (AssetDeliversSceRTRating rating : ratings)
                deleteAssetDeliversSceRTRating(rating);
        }

        assetDeliversSceRTAttributeRepository.delete(attribute);
    }

    public void deleteAssetImplementsElementRTAttribute(AssetImplementsElementRTAttribute attribute) {
        if (attribute == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_IMPLEMENTS_ATTRIBUTE, attribute.getId());

        //Asset Delivers Rating
        List<AssetImplementsElementRTRating> ratings = attribute.getAssetImplementsElementRTRatingList();
        if (ratings != null) {
            for (AssetImplementsElementRTRating rating : ratings)
                deleteAssetImplementsElementRTRating(rating);
        }

        assetImplementsElementRTAttributeRepository.delete(attribute);
    }

    public void deleteProvider(ProviderInfo providerInfo) {
        if (providerInfo == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.PROVIDER, providerInfo.getId());

        //	Asset
        List<Asset> assets = providerInfo.getAssetList();
        if (assets != null) {
            for (Asset asset : assets)
                deleteAsset(asset);
        }

        //	Provider Group Member
        List<ProviderGroupMember> providerGroupMembers = providerInfo.getProviderGroupMembers();
        if (providerGroupMembers != null) {
            for (ProviderGroupMember providerGroupMember : providerGroupMembers)
                deleteProviderGroupMember(providerGroupMember);
        }

        //	Technical Support Info
        List<TechnicalSupport> technicalSupportList = providerInfo.getTechnicalSupportList();
        if (technicalSupportList != null) {
            for (TechnicalSupport technicalSupport : technicalSupportList)
                deleteTechnicalSupport(technicalSupport);
        }

        providerInfoRepository.delete(providerInfo);
    }

    public void deleteTechnicalSupport(TechnicalSupport technicalSupport) {
        if (technicalSupport == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.TECHNICAL_SUPPORT_PEOPLE, technicalSupport.getId());

        //Technical Support Contact Info
        List<TechnicalSupportContactInfo> technicalSupportContactInfoList = technicalSupport.getTechnicalSupportContactInfoList();
        if (technicalSupportContactInfoList != null) {
            for (TechnicalSupportContactInfo technicalSupportContactInfo : technicalSupportContactInfoList)
                deleteTechnicalSupportContactInfo(technicalSupportContactInfo);
        }

        technicalSupportInfoRepository.delete(technicalSupport);
    }

    public void deleteObjectiveParameter(ObjectiveParameterWord objectiveParameterWord) {
        if (objectiveParameterWord == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.OBJECTIVE_PARAMETER, objectiveParameterWord.getId());

        //	Security Control Expression
        List<SecurityControlExpression> securityControlExpressionList = objectiveParameterWord.getSecurityControlExpressionList();
        if (securityControlExpressionList != null) {
            for (SecurityControlExpression securityControlExpression : securityControlExpressionList)
                deleteSecurityControlExpression(securityControlExpression);
        }

        //  Childeren Objective/Content/Method/Subject Parameter
        List<ObjectiveParameterWord> childrenObjectiveParameters = objectiveParameterWord.getChildrenObjectiveParameterWordList();
        if (childrenObjectiveParameters != null) {
            for (ObjectiveParameterWord childObjectiveParameter : childrenObjectiveParameters)
                deleteObjectiveParameter(childObjectiveParameter);
        }

        objectiveParameterWordRepository.delete(objectiveParameterWord);
    }

    public void deleteMethodParameter(MethodParameterWord methodParameterWord) {
        if (methodParameterWord == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.METHOD_PARAMETER, methodParameterWord.getId());

        //	Security Control Expression
        List<SecurityControlExpression> securityControlExpressionList = methodParameterWord.getSecurityControlExpressionList();
        if (securityControlExpressionList != null) {
            for (SecurityControlExpression securityControlExpression : securityControlExpressionList)
                deleteSecurityControlExpression(securityControlExpression);
        }

        //  Childeren Objective/Content/Method/Subject Parameter
        List<MethodParameterWord> childrenMethodParameterWordList = methodParameterWord.getChildrenMethodParameterWordList();
        if (childrenMethodParameterWordList != null) {
            for (MethodParameterWord childMethodParameter : childrenMethodParameterWordList)
                deleteMethodParameter(childMethodParameter);
        }

        methodParameterWordRepository.delete(methodParameterWord);
    }

    public void deleteContentParameter(ContentParameterWord contentParameterWord) {
        if (contentParameterWord == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.CONTENT_PARAMETER, contentParameterWord.getId());

        //	Security Control Expression
        List<SecurityControlExpression> securityControlExpressionList = contentParameterWord.getSecurityControlExpressionList();
        if (securityControlExpressionList != null) {
            for (SecurityControlExpression securityControlExpression : securityControlExpressionList)
                deleteSecurityControlExpression(securityControlExpression);
        }

        //  Childeren Objective/Content/Method/Subject Parameter
        List<ContentParameterWord> childrenContentParameterWordList = contentParameterWord.getChildrenContentParameterWordList();
        if (childrenContentParameterWordList != null) {
            for (ContentParameterWord childContentParamter : childrenContentParameterWordList)
                deleteContentParameter(childContentParamter);
        }

        contentParameterWordRepository.delete(contentParameterWord);
    }

    public void deleteSubjectParameter(SubjectParameterWord subjectParameterWord) {
        if (subjectParameterWord == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.SUBJECT_PARAMETER, subjectParameterWord.getId());

        //	Security Control Expression
        List<SecurityControlExpression> securityControlExpressionList = subjectParameterWord.getSecurityControlExpressionList();
        if (securityControlExpressionList != null) {
            for (SecurityControlExpression securityControlExpression : securityControlExpressionList)
                deleteSecurityControlExpression(securityControlExpression);
        }

        //  Childeren Objective/Content/Method/Subject Parameter
        List<SubjectParameterWord> childrenSubjectParameterWordList = subjectParameterWord.getChildrenSubjectParameterWordList();
        if (childrenSubjectParameterWordList != null) {
            for (SubjectParameterWord childSubjectParameter : childrenSubjectParameterWordList)
                deleteSubjectParameter(childSubjectParameter);
        }

        subjectParameterWordRepository.delete(subjectParameterWord);
    }

    public void deleteSecurityControlExpression(SecurityControlExpression securityControlExpression) {
        if (securityControlExpression == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.SCE, securityControlExpression.getId());

        //Asset Type Protected By Sce
        List<AssetTypeProtectedBySce> assetTypeProtectedBySceList = securityControlExpression.getAssetTypeProtectedBySceList();
        if (assetTypeProtectedBySceList != null) {
            for (AssetTypeProtectedBySce assetTypeProtectedBySce : assetTypeProtectedBySceList)
                deleteAssetTypeProtectedBySce(assetTypeProtectedBySce);
        }

        //Business Asset Type To Expression Links
        List<BusinessAssetTypeToExpressionLink> businessAssetTypeToExpressionLinkList = securityControlExpression.getBusinessAssetTypeToExpressionLinks();
        if (businessAssetTypeToExpressionLinkList != null) {
            for (BusinessAssetTypeToExpressionLink businessAssetTypeToExpressionLink : businessAssetTypeToExpressionLinkList)
                deleteBusinessAssetTypeToExpressionLink(businessAssetTypeToExpressionLink);
        }

        //	Asset Delivers Sce
        List<AssetDeliversSce> assetDeliversSceList = securityControlExpression.getAssetDeliversSceList();
        if (assetDeliversSceList != null) {
            for (AssetDeliversSce assetDeliversSce : assetDeliversSceList)
                deleteAssetDeliversSce(assetDeliversSce);
        }

        //	Asset Delivers Sce
        List<BusinessAssetToExpressionLink> businessAssetToExpressionLinks = securityControlExpression.getBusinessAssetToExpressionLinks();
        if (businessAssetToExpressionLinks != null) {
            for (BusinessAssetToExpressionLink businessAssetToExpressionLink : businessAssetToExpressionLinks)
                deleteBusinessAssetToExpressionLink(businessAssetToExpressionLink);
        }

        //	Sce Attributes
        List<SceRTAttribute> attributes = securityControlExpression.getSceRTAttributeList();
        if (attributes != null) {
            for (SceRTAttribute attribute : attributes)
                deleteSceRTAttribute(attribute);
        }

        //	Sce Fulfills Element
        List<SceFulfillsShieldElement> sceFulfillsShieldElementList = securityControlExpression.getSceFulfillsShieldElementList();
        if (sceFulfillsShieldElementList != null) {
            for (SceFulfillsShieldElement sceFulfillsShieldElement : sceFulfillsShieldElementList)
                deleteSceFulfillsShieldElement(sceFulfillsShieldElement);
        }

        //	Sce Group Member
        List<SceGroupMember> sceGroupMembers = securityControlExpression.getSceGroupMembers();
        if (sceGroupMembers != null) {
            for (SceGroupMember sceGroupMember : sceGroupMembers)
                deleteSceGroupMember(sceGroupMember);
        }

        securityControlExpressionRepository.delete(securityControlExpression);
    }

    public void deleteSceRTAttribute(SceRTAttribute attribute) {
        if (attribute == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.SCE_RT_ATTRIBUTE, attribute.getId());

        //Sce Rating
        List<SceRTRating> ratings = attribute.getSceRTRatingList();
        if (ratings != null) {
            for (SceRTRating rating : ratings)
                deleteSceRTRating(rating);
        }

        sceRTAttributeRepository.delete(attribute);
    }

    public void deleteShieldType(ShieldType shieldType) {
        if (shieldType == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.SHIELD_TYPE, shieldType.getId());

        //Shield
        List<Shield> shields = shieldType.getShieldList();
        if (shields != null) {
            for (Shield shield : shields)
                deleteShield(shield);
        }

        shieldTypeRepository.delete(shieldType);
    }

    public void deleteShieldElementType(ShieldElementType shieldElementType) {
        if (shieldElementType == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.SHIELD_ELEMENT_TYPE, shieldElementType.getId());
        deleteLinkedArtifacts(ObjectTypeConstants.STANDARD_ELEMENT_TYPE, shieldElementType.getId());
        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_CONTROL_TYPE, shieldElementType.getId());

        //	Shield Element Group
        List<ShieldElementGroup> shieldElementGroups = shieldElementType.getShieldElementGroups();
        if (shieldElementGroups != null) {
            for (ShieldElementGroup shieldElementGroup : shieldElementGroups)
                deleteShieldElementGroup(shieldElementGroup);
        }

        //	Shield Element Attributes
        List<ShieldElementRTAttribute> attributes = shieldElementType.getShieldElementRTAttributeList();
        if (attributes != null) {
            for (ShieldElementRTAttribute attribute : attributes)
                deleteShieldElementRTAttribute(attribute);
        }

        // Shield Element Library Attributes
        List<ShieldElementRTLibraryAttribute> shieldElementRTLibraryAttributes = shieldElementType.getShieldElementRTLibraryAttributeList();
        if (shieldElementRTLibraryAttributes != null) {
            for (ShieldElementRTLibraryAttribute shieldElementRTLibraryAttribute : shieldElementRTLibraryAttributes)
                deleteShieldElementRTLibraryAttribute(shieldElementRTLibraryAttribute);
        }

        //  Shield Element
        List<ShieldElement> shieldElementList = shieldElementType.getShieldElementList();
        if (shieldElementList != null) {
            for (ShieldElement shieldElement : shieldElementList)
                deleteShieldElement(shieldElement);
        }

        //	Children Shield Element Type
        List<ShieldElementType> childrenShieldElementTypeList = shieldElementType.getChildrenShieldElementTypeList();
        if (childrenShieldElementTypeList != null) {
            for (ShieldElementType childShieldElementType : childrenShieldElementTypeList)
                deleteShieldElementType(childShieldElementType);
        }

        shieldElementTypeRepository.delete(shieldElementType);
    }

    public void deleteShieldElementRTLibraryAttribute(ShieldElementRTLibraryAttribute attribute) {
        if (attribute == null)
            return;
        deleteLinkedArtifacts(ObjectTypeConstants.SHIELD_ELEMENT_LIBRARY_ATTRIBUTE, attribute.getId());

        shieldElementRTLibraryAttributeRepository.delete(attribute);
    }

    public void deleteShieldElementRTAttribute(ShieldElementRTAttribute attribute) {
        if (attribute == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.SHIELD_ELEMENT_RT_ATTRIBUTE, attribute.getId());

        //Element Rating
        List<ShieldElementRTRating> ratings = attribute.getShieldElementRTRatingList();
        if (ratings != null) {
            for (ShieldElementRTRating rating : ratings)
                deleteShieldElementRTRating(rating);
        }

        shieldElementRTAttributeRepository.delete(attribute);
    }

    public void deleteShieldElement(ShieldElement shieldElement) {
        if (shieldElement == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.SHIELD_ELEMENT, shieldElement.getId());
        deleteLinkedArtifacts(ObjectTypeConstants.STANDARD_ELEMENT, shieldElement.getId());
        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_CONTROL, shieldElement.getId());

        //	Sce Fulfills Element
        List<SceFulfillsShieldElement> sceFulfillsShieldElementList = shieldElement.getSceFulfillsShieldElementList();
        if (sceFulfillsShieldElementList != null) {
            for (SceFulfillsShieldElement sceFulfillsShieldElement : sceFulfillsShieldElementList)
                deleteSceFulfillsShieldElement(sceFulfillsShieldElement);
        }

        // Element To Element Direct Map
        List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapListOne = shieldElementToShieldElementMapRepository.findByShieldElementOneId(shieldElement.getId());
        if (shieldElementToShieldElementMapListOne != null) {
            for (ShieldElementToShieldElementMap shieldElementToShieldElementMap : shieldElementToShieldElementMapListOne)
                deleteShieldElementToShieldElementMap(shieldElementToShieldElementMap);
        }
        List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapListTwo = shieldElementToShieldElementMapRepository.findByShieldElementTwoId(shieldElement.getId());
        if (shieldElementToShieldElementMapListTwo != null) {
            for (ShieldElementToShieldElementMap shieldElementToShieldElementMap : shieldElementToShieldElementMapListTwo)
                deleteShieldElementToShieldElementMap(shieldElementToShieldElementMap);
        }

        //Asset To Element Direct Map
        List<AssetToShieldElementMap> assetToShieldElementMapList = shieldElement.getAssetToShieldElementMapList();
        if (assetToShieldElementMapList != null) {
            for (AssetToShieldElementMap assetToShieldElementMap : assetToShieldElementMapList)
                deleteAssetToShieldElementMap(assetToShieldElementMap);
        }

        //Business Asset To Element Map
        List<BusinessAssetToShieldElementMap> businessAssetToShieldElementMapList = shieldElement.getBusinessAssetToShieldElementMapList();
        if (businessAssetToShieldElementMapList != null) {
            for (BusinessAssetToShieldElementMap businessAssetToShieldElementMap : businessAssetToShieldElementMapList)
                deleteBusinessAssetToShieldElementMap(businessAssetToShieldElementMap);
        }

        //AssetType To Element Direct Map
        List<AssetTypeToShieldElementMap> assetTypeToShieldElementMapList = shieldElement.getAssetTypeToShieldElementMapList();
        if (assetTypeToShieldElementMapList != null) {
            for (AssetTypeToShieldElementMap assetTypeToShieldElementMap : assetTypeToShieldElementMapList)
                deleteAssetTypeToShieldElementMap(assetTypeToShieldElementMap);
        }

        //Business AssetType To Element Direct Map
        List<BusinessAssetTypeToShieldElementMap> businessAssetTypeToShieldElementMapList = shieldElement.getBusinessAssetTypeToShieldElementMapList();
        if (businessAssetTypeToShieldElementMapList != null) {
            for (BusinessAssetTypeToShieldElementMap businessAssetTypeToShieldElementMap : businessAssetTypeToShieldElementMapList)
                deleteBusinessAssetTypeToShieldElementMap(businessAssetTypeToShieldElementMap);
        }

        //	Element Group Member
        List<ShieldElementGroupMember> shieldElementGroupMembers = shieldElement.getShieldElementGroupMembers();
        if (shieldElementGroupMembers != null) {
            for (ShieldElementGroupMember shieldElementGroupMember : shieldElementGroupMembers)
                deleteShieldElementGroupMember(shieldElementGroupMember);
        }

        //	Shield Element Attributes
        List<ShieldElementRTAttribute> shieldElementRTAttributes = shieldElement.getShieldElementRTAttributeList();
        if (shieldElementRTAttributes != null) {
            for (ShieldElementRTAttribute attribute : shieldElementRTAttributes)
                deleteShieldElementRTAttribute(attribute);
        }

        //	Children Shield Element
        List<ShieldElement> childrenShieldElementList = shieldElement.getChildrenShieldElementList();
        if (childrenShieldElementList != null) {
            for (ShieldElement childShieldElement : childrenShieldElementList)
                deleteShieldElement(childShieldElement);
        }

        //delete guidance
        List<Guidance> guidanceList = shieldElement.getGuidanceList();
        if (guidanceList != null) {
            for (Guidance guidance : guidanceList)
                deleteGuidance(guidance);
        }
        //delete test procedures
        List<TestProcedure> testProcedureList = shieldElement.getTestProcedureList();
        if (testProcedureList != null) {
            for (TestProcedure testProcedure : testProcedureList)
                deleteTestProcedure(testProcedure);
        }

        shieldElementRepository.delete(shieldElement);
    }

    public void deleteSceFulfillsShieldElement(SceFulfillsShieldElement sceFulfillsShieldElement) {
        if (sceFulfillsShieldElement == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK, sceFulfillsShieldElement.getId());

        // Sce Fulfills Element Attributes
        List<ShieldElementFulfilledBySceRTAttribute> attributes = sceFulfillsShieldElement.getShieldElementFulfilledBySceRTAttributeList();
        if (attributes != null) {
            for (ShieldElementFulfilledBySceRTAttribute attribute : attributes)
                deleteShieldElementFulfilledBySceRTAttribute(attribute);
        }

        sceFulfillsShieldElementRepository.delete(sceFulfillsShieldElement);
    }

    public void deleteShieldElementFulfilledBySceRTAttribute(ShieldElementFulfilledBySceRTAttribute attribute) {
        if (attribute == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.SCE_FULFILLS_SHIELD_ELEMENT_RT_ATTRIBUTE, attribute.getId());

        //Sce Fulfills Rating
        List<ShieldElementFulfilledBySceRTRating> ratings = attribute.getShieldElementFulfilledBySceRTRatingList();
        if (ratings != null) {
            for (ShieldElementFulfilledBySceRTRating rating : ratings)
                deleteShieldElementFulfilledBySceRTRating(rating);
        }

        shieldElementFulfilledBySceRTAttributeRepository.delete(attribute);

    }

    public void deleteShieldElementGroup(ShieldElementGroup shieldElementGroup) {
        if (shieldElementGroup == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.SHIELD_ELEMENT_GROUP, shieldElementGroup.getId());

        //Shield Element Group Members
        List<ShieldElementGroupMember> shieldElementGroupMembers = shieldElementGroup.getShieldElementGroupMembers();
        if (shieldElementGroupMembers != null) {
            for (ShieldElementGroupMember shieldElementGroupMember : shieldElementGroupMembers)
                deleteShieldElementGroupMember(shieldElementGroupMember);
        }

        shieldElementGroupRepository.delete(shieldElementGroup);

    }

    public void deleteSceGroup(SceGroup sceGroup) {
        if (sceGroup == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.SCE_GROUP, sceGroup.getId());

        //sce Group Member
        List<SceGroupMember> sceGroupMembers = sceGroup.getSceGroupMembers();
        if (sceGroupMembers != null) {
            for (SceGroupMember sceGroupMember : sceGroupMembers)
                deleteSceGroupMember(sceGroupMember);
        }

        sceGroupRepository.delete(sceGroup);
    }

    public void deleteAssetGroup(AssetGroup assetGroup) {
        if (assetGroup == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_GROUP, assetGroup.getId());

        //Asset Group Member
        List<AssetGroupMember> assetGroupMembers = assetGroup.getAssetGroupMembers();

        if (assetGroupMembers != null)
            for (AssetGroupMember assetGroupMember : assetGroupMembers)
                deleteAssetGroupMember(assetGroupMember);

        assetGroupRepository.delete(assetGroup);
    }


    public void deleteAssetTypeGroup(AssetTypeGroup assetTypeGroup) {
        if (assetTypeGroup == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_TYPE_GROUP, assetTypeGroup.getId());

        //Asset Group Member
        List<AssetTypeGroupMember> assetTypeGroupMembers = assetTypeGroup.getAssetTypeGroupMembers();

        if (assetTypeGroupMembers != null)
            for (AssetTypeGroupMember assetTypeGroupMember : assetTypeGroupMembers)
                deleteAssetTypeGroupMember(assetTypeGroupMember);

        assetTypeGroupRepository.delete(assetTypeGroup);
    }

    public void deleteProviderGroup(ProviderGroup providerGroup) {
        if (providerGroup == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.PROVIDER_GROUP, providerGroup.getId());

        //Provider Group Member
        List<ProviderGroupMember> providerGroupMembers = providerGroup.getProviderGroupMembers();
        if (providerGroupMembers != null) {
            for (ProviderGroupMember providerGroupMember : providerGroupMembers)
                deleteProviderGroupMember(providerGroupMember);
        }

        providerGroupRepository.delete(providerGroup);
    }

    public void deleteCustomPerspective(CustomPerspective customPerspective) {
        if (customPerspective == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.PERSPECTIVE, customPerspective.getId());

        //Asset Delivers Attribute
        List<AssetDeliversSceRTAttribute> assetDeliversSceRTAttributes = customPerspective.getAssetDeliversSceRTAttributeList();
        if (assetDeliversSceRTAttributes != null) {
            for (AssetDeliversSceRTAttribute assetDeliversSceRTAttribute : assetDeliversSceRTAttributes)
                deleteAssetDeliversSceRTAttribute(assetDeliversSceRTAttribute);
        }

        // Asset Delivers Library Attribute
        List<AssetDeliversSceRTLibraryAttribute> assetDeliversSceRTLibraryAttributes = customPerspective.getAssetDeliversSceRTLibraryAttributeList();
        if (assetDeliversSceRTAttributes != null) {
            for (AssetDeliversSceRTLibraryAttribute assetDeliversSceRTLibraryAttribute : assetDeliversSceRTLibraryAttributes)
                deleteAssetDeliversSceRTLibraryAttribute(assetDeliversSceRTLibraryAttribute);
        }

        //	Asset Type Protected By Attribute
        List<AssetTypeProtectedBySceRTAttribute> assetTypeProtectedBySceRTAttributeList = customPerspective.getAssetTypeProtectedBySceRTAttributeList();
        if (assetTypeProtectedBySceRTAttributeList != null)
            for (AssetTypeProtectedBySceRTAttribute assetTypeProtectedBySceRTAttribute : assetTypeProtectedBySceRTAttributeList)
                deleteAssetTypeProtectedBySceRTAttribute(assetTypeProtectedBySceRTAttribute);

        // Asset Type Protected By Library Attribute
        List<AssetTypeProtectedBySceRTLibraryAttribute> assetTypeProtectedBySceRTLibraryAttributes = customPerspective.getAssetTypeProtectedBySceRTLibraryAttributeList();
        if (assetTypeProtectedBySceRTLibraryAttributes != null) {
            for (AssetTypeProtectedBySceRTLibraryAttribute assetTypeProtectedBySceRTLibraryAttribute : assetTypeProtectedBySceRTLibraryAttributes)
                deleteAssetTypeProtectedBySceRTLibraryAttribute(assetTypeProtectedBySceRTLibraryAttribute);
        }

        //	Shield Element Fulfilled By Attribute
        List<ShieldElementFulfilledBySceRTAttribute> shieldElementFulfilledBySceRTAttributes = customPerspective.getShieldElementFulfilledBySceRTAttributeList();
        if (shieldElementFulfilledBySceRTAttributes != null) {
            for (ShieldElementFulfilledBySceRTAttribute shieldElementFulfilledBySceRTAttribute : shieldElementFulfilledBySceRTAttributes)
                deleteShieldElementFulfilledBySceRTAttribute(shieldElementFulfilledBySceRTAttribute);
        }

        // Shield Element Fulfilled By Library Attribute
        List<ShieldElementFulfilledBySceRTLibraryAttribute> shieldElementFulfilledBySceRTLibraryAttributes = customPerspective.getShieldElementFulfilledBySceRTLibraryAttributeList();
        if (shieldElementFulfilledBySceRTLibraryAttributes != null) {
            for (ShieldElementFulfilledBySceRTLibraryAttribute shieldElementFulfilledBySceRTLibraryAttribute : shieldElementFulfilledBySceRTLibraryAttributes)
                deleteShieldElementFulfilledBySceRTLibraryAttribute(shieldElementFulfilledBySceRTLibraryAttribute);
        }

        //	Shield Element Attribute
        List<ShieldElementRTAttribute> shieldElementRTAttributes = customPerspective.getShieldElementRTAttributeList();
        if (shieldElementRTAttributes != null)
            for (ShieldElementRTAttribute shieldElementRTAttribute : shieldElementRTAttributes)
                deleteShieldElementRTAttribute(shieldElementRTAttribute);

        // Shield Element Library Attribute
        List<ShieldElementRTLibraryAttribute> shieldElementRTLibraryAttributes = customPerspective.getShieldElementRTLibraryAttributeList();
        if (shieldElementRTLibraryAttributes != null) {
            for (ShieldElementRTLibraryAttribute shieldElementRTLibraryAttribute : shieldElementRTLibraryAttributes)
                deleteShieldElementRTLibraryAttribute(shieldElementRTLibraryAttribute);
        }

        // Asset Implements Shield Element Attribute
        List<AssetImplementsElementRTAttribute> assetImplementsElementRTAttributes = customPerspective.getAssetImplementsElementRTAttributeList();
        if (assetImplementsElementRTAttributes != null)
            for (AssetImplementsElementRTAttribute assetImplementsElementRTAttribute : assetImplementsElementRTAttributes)
                deleteAssetImplementsElementRTAttribute(assetImplementsElementRTAttribute);

        // Asset Implements Shield Element Library Attribute
        List<AssetImplementsElementRTLibraryAttribute> assetImplementsElementRTLibraryAttributes = customPerspective.getAssetImplementsElementRTLibraryAttributeList();
        if (assetImplementsElementRTLibraryAttributes != null) {
            for (AssetImplementsElementRTLibraryAttribute assetImplementsElementRTLibraryAttribute : assetImplementsElementRTLibraryAttributes)
                deleteAssetImplementsElementRTLibraryAttribute(assetImplementsElementRTLibraryAttribute);
        }

        //	Sce Attribute
        List<SceRTAttribute> sceRTAttributes = customPerspective.getSceRTAttributeList();
        if (sceRTAttributes != null)
            for (SceRTAttribute sceRTAttribute : sceRTAttributes)
                deleteSceRTAttribute(sceRTAttribute);

        // Sce Library Attribute
        List<SceRTLibraryAttribute> sceRTLibraryAttributes = customPerspective.getSceRTLibraryAttributeList();
        if (sceRTLibraryAttributes != null) {
            for (SceRTLibraryAttribute sceRTLibraryAttribute : sceRTLibraryAttributes)
                deleteSceRTLibraryAttribute(sceRTLibraryAttribute);
        }

        customPerspectiveRepository.delete(customPerspective);
    }

    private void deleteSceRTLibraryAttribute(SceRTLibraryAttribute sceRTLibraryAttribute) {
        if (sceRTLibraryAttribute == null)
            return;
        deleteLinkedArtifacts(ObjectTypeConstants.SCE_LIBRARY_ATTRIBUTE, sceRTLibraryAttribute.getId());

        sceRTLibraryAttributeRepository.delete(sceRTLibraryAttribute);
    }

    private void deleteShieldElementFulfilledBySceRTLibraryAttribute(ShieldElementFulfilledBySceRTLibraryAttribute shieldElementFulfilledBySceRTLibraryAttribute) {
        if (shieldElementFulfilledBySceRTLibraryAttribute == null)
            return;
        deleteLinkedArtifacts(ObjectTypeConstants.SCE_FULFILLS_SHIELD_ELEMENT_LIBRARY_ATTRIBUTE, shieldElementFulfilledBySceRTLibraryAttribute.getId());

        shieldElementFulfilledBySceRTLibraryAttributeRepository.delete(shieldElementFulfilledBySceRTLibraryAttribute);
    }

    private void deleteAssetTypeProtectedBySceRTLibraryAttribute(AssetTypeProtectedBySceRTLibraryAttribute attribute) {
        if (attribute == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_TYPE_PROTECTED_BY_SCE_LIBRARY_ATTRIBUTE, attribute.getId());

        assetTypeProtectedBySceRTLibraryAttributeRepository.delete(attribute);
    }

    public void deleteOrganizationalUnit(OrganizationalUnit organizationalUnit) {
        if (organizationalUnit == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ORGANIZATIONAL_UNIT, organizationalUnit.getId());

        //  Asset Type OU link null
        List<AssetType> assetTypes = organizationalUnit.getAllLinkedAssetTypes();
        if (assetTypes != null)
            for (AssetType assetType : assetTypes) {
                assetType.setOrganizationalUnit(null);
                assetTypeRepository.save(assetType);
            }

        //	Provider Info OU link null
        List<ProviderInfo> providerInfoList = organizationalUnit.getAllLinkedProviders();
        if (providerInfoList != null)
            for (ProviderInfo providerInfo : providerInfoList) {
                providerInfo.setOrganizationalUnit(null);
                providerInfoRepository.save(providerInfo);
            }

        //	Asset OU link null
        List<Asset> assets = organizationalUnit.getAllLinkedAssets();
        if (assets != null)
            for (Asset asset : assets) {
                asset.setOrganizationalUnit(null);
                assetRepository.save(asset);
            }

        //	/*SphericUser OU link null */
        //	Shield Element OU link null
        List<ShieldElement> shieldElementList = organizationalUnit.getAllLinkedShieldElements();
        if (shieldElementList != null) {
            for (ShieldElement shieldElement : shieldElementList) {
                shieldElement.setOrganizationalUnit(null);
                shieldElementRepository.save(shieldElement);
            }
        }

        //	Provider Group OU link null
        List<ProviderGroup> providerGroups = organizationalUnit.getProviderGroups();
        if (providerGroups != null)
            for (ProviderGroup providerGroup : providerGroups) {
                providerGroup.setOrganizationalUnit(null);
                providerGroupRepository.save(providerGroup);
            }

        //	Asset Type Group OU link null
        List<AssetTypeGroup> assetTypeGroups = organizationalUnit.getAssetTypeGroups();
        if (assetTypeGroups != null)
            for (AssetTypeGroup assetTypeGroup : assetTypeGroups) {
                assetTypeGroup.setOrganizationalUnit(null);
                assetTypeGroupRepository.save(assetTypeGroup);
            }

        //	Asset Group OU link null
        List<AssetGroup> assetGroups = organizationalUnit.getAssetGroups();
        if (assetGroups != null)
            for (AssetGroup assetGroup : assetGroups) {
                assetGroup.setOrganizationalUnit(null);
                assetGroupRepository.save(assetGroup);
            }

        //	Sce Group OU link null
        List<SceGroup> sceGroups = organizationalUnit.getSceGroups();
        if (sceGroups != null) {
            for (SceGroup sceGroup : sceGroups) {
                sceGroup.setOrganizationalUnit(null);
                sceGroupRepository.save(sceGroup);
            }
        }
        //	Shield Element Group OU link null
        List<ShieldElementGroup> shieldElementGroups = organizationalUnit.getShieldElementGroups();
        if (shieldElementGroups != null) {
            for (ShieldElementGroup shieldElementGroup : shieldElementGroups) {
                shieldElementGroup.setOrganizationalUnit(null);
                shieldElementGroupRepository.save(shieldElementGroup);
            }
        }

        //Delete Children Organizational Units
        List<OrganizationalUnit> childrenOrganizationalUnits = organizationalUnit.getChildrenOrganizationalUnits();
        if (childrenOrganizationalUnits != null) {
            for (OrganizationalUnit childOrganizationalUnit : childrenOrganizationalUnits)
                deleteOrganizationalUnit(childOrganizationalUnit);
        }

        //delete linked users
        List<SphericUser> sphericUsers = organizationalUnit.getSphericUserList();
        if (sphericUsers != null) {
            for (SphericUser sphericUser : sphericUsers)
                deleteUser(sphericUser);
        }

        organizationalUnitRepository.delete(organizationalUnit);
    }

    public void deleteShield(Shield shield) {

        if (shield == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.SHIELD, shield.getId());
        deleteLinkedArtifacts(ObjectTypeConstants.STANDARD, shield.getId());
        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_FRAMEWORK, shield.getId());

        //problem with deleting shield elements - i shall start with parent null item and delete all children
        List<ShieldElement> levelOneShieldElementList = shieldElementRepository.findByShieldIdAndParentShieldElementIdAndIsArchivedFalse(shield.getId(), null);
        if (levelOneShieldElementList != null) {
            for (ShieldElement levelOneElement : levelOneShieldElementList)
                deleteShieldElement(levelOneElement);
        }

        List<ShieldElement> shieldElementList = shieldElementRepository.findByShieldId(shield.getId());
        while (shieldElementList != null && !shieldElementList.isEmpty()) {
            deleteShieldElement(shieldElementList.get(0));
            shieldElementList = shield.getShieldElementList();
        }

        //problem with deleting shield element types - i shall start with parent null item and delete all children
        List<ShieldElementType> levelOneShieldElementTypeList = shieldElementTypeRepository.findByShieldIdAndParentShieldElementTypeId(shield.getId(), null);
        if (levelOneShieldElementTypeList != null)
            for (ShieldElementType levelOneElementType : levelOneShieldElementTypeList)
                deleteShieldElementType(levelOneElementType);

        List<ShieldElementType> shieldElementTypeList = shieldElementTypeRepository.findByShieldId(shield.getId());
        while (shieldElementTypeList != null && !shieldElementTypeList.isEmpty()) {
            deleteShieldElementType(shieldElementTypeList.get(0));
            shieldElementTypeList = shield.getShieldElementTypeList();
        }

        shieldRepository.delete(shield);
    }

    public void deleteAssetTypeProtectedBySceRTAttribute(AssetTypeProtectedBySceRTAttribute assetTypeProtectedBySceRTAttribute) {
        if (assetTypeProtectedBySceRTAttribute == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_TYPE_PROTECTED_BY_SCE_RT_ATTRIBUTE, assetTypeProtectedBySceRTAttribute.getId());

        //  AssetTypeProtectedBySceRTAttributeRating
        List<AssetTypeProtectedBySceRTRating> ratings = assetTypeProtectedBySceRTAttribute.getAssetTypeProtectedBySceRTRatingList();
        if (ratings != null) {
            for (AssetTypeProtectedBySceRTRating rating : ratings)
                deleteAssetTypeProtectedBySceRTRating(rating);
        }

        assetTypeProtectedBySceRTAttributeRepository.delete(assetTypeProtectedBySceRTAttribute);
    }

    public void deleteAssetTypeProtectedBySceRTRating(AssetTypeProtectedBySceRTRating rating) {
        if (rating == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_TYPE_PROTECTED_BY_SCE_RT_ATTRIBUTE_RATING, rating.getId());

        assetTypeProtectedBySceRTRatingRepository.delete(rating);
    }

    public void deleteShieldElementFulfilledBySceRTRating(ShieldElementFulfilledBySceRTRating rating) {
        if (rating == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.SCE_FULFILLS_SHIELD_ELEMENT_RT_ATTRIBUTE_RATING, rating.getId());

        shieldElementFulfilledBySceRTRatingRepository.delete(rating);
    }

    public void deleteShieldElementGroupMember(ShieldElementGroupMember shieldElementGroupMember) {
        if (shieldElementGroupMember == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.SHIELD_ELEMENT_GROUP_MEMBER, shieldElementGroupMember.getId());

        shieldElementGroupMemberRepository.delete(shieldElementGroupMember);
    }

    public void deleteShieldElementRTRating(ShieldElementRTRating rating) {
        if (rating == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.SHIELD_ELEMENT_RT_ATTRIBUTE_RATING, rating.getId());

        shieldElementRTRatingRepository.delete(rating);
    }

    public void deleteSceRTRating(SceRTRating rating) {
        if (rating == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.SCE_RT_ATTRIBUTE_RATING, rating.getId());

        sceRTRatingRepository.delete(rating);
    }

    public void deleteSceGroupMember(SceGroupMember sceGroupMember) {
        if (sceGroupMember == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.SCE_GROUP_MEMBER, sceGroupMember.getId());

        sceGroupMemberRepository.delete(sceGroupMember);
    }

    public void deleteTechnicalSupportContactInfo(TechnicalSupportContactInfo technicalSupportContactInfo) {
        if (technicalSupportContactInfo == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.TECHNICAL_SUPPORT_CONTACT_INFO, technicalSupportContactInfo.getId());

        technicalSupportContactInfoRepository.delete(technicalSupportContactInfo);
    }

    public void deleteProviderGroupMember(ProviderGroupMember providerGroupMember) {
        if (providerGroupMember == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.PROVIDER_GROUP_MEMBER, providerGroupMember.getId());

        providerGroupMemberRepository.delete(providerGroupMember);
    }

    public void deleteAssetDeliversSceRTRating(AssetDeliversSceRTRating rating) {
        if (rating == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_DELIVERS_ATTRIBUTE_RATING, rating.getId());

        assetDeliversSceRTRatingRepository.delete(rating);
    }

    public void deleteAssetImplementsElementRTRating(AssetImplementsElementRTRating rating) {
        if (rating == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_IMPLEMENTS_ATTRIBUTE_RATING, rating.getId());

        assetImplementsElementRTRatingRepository.delete(rating);
    }

    public void deleteAssetGroupMember(AssetGroupMember assetGroupMember) {
        if (assetGroupMember == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_GROUP_MEMBER, assetGroupMember.getId());

        assetGroupMemberRepository.delete(assetGroupMember);
    }

    public void deleteAssetTypeGroupMember(AssetTypeGroupMember assetTypeGroupMember) {
        if (assetTypeGroupMember == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_TYPE_GROUP_MEMBER, assetTypeGroupMember.getId());

        assetTypeGroupMemberRepository.delete(assetTypeGroupMember);
    }

    public void deleteAssetTypeProtectedBySce(AssetTypeProtectedBySce assetTypeProtectedBySce) {
        if (assetTypeProtectedBySce == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_TYPE_TO_EXPRESSION_LINK, assetTypeProtectedBySce.getId());
        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_TYPE_TO_EXPRESSION_LINK_COULD, assetTypeProtectedBySce.getId());

        //  Asset Type Protected By sce Attribute
        List<AssetTypeProtectedBySceRTAttribute> attributes = assetTypeProtectedBySce.getAssetTypeProtectedBySceRTAttributeList();
        if (attributes != null)
            for (AssetTypeProtectedBySceRTAttribute attribute : attributes)
                deleteAssetTypeProtectedBySceRTAttribute(attribute);
        assetTypeProtectedBySceRepository.delete(assetTypeProtectedBySce);
    }

    public void deleteAssetDeliversSceRTLibraryAttribute(AssetDeliversSceRTLibraryAttribute attribute) {
        if (attribute == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_DELIVERS_LIBRARY_ATTRIBUTE, attribute.getId());

        assetDeliversSceRTLibraryAttributeRepository.delete(attribute);
    }

    public void deleteAssetImplementsElementRTLibraryAttribute(AssetImplementsElementRTLibraryAttribute attribute) {
        if (attribute == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_IMPLEMENTS_LIBRARY_ATTRIBUTE, attribute.getId());

        assetImplementsElementRTLibraryAttributeRepository.delete(attribute);
    }

    public void deleteArtifact(Artifact artifact) {
        //find all artifacts of this artifact and delete them.
        List<Artifact> linkedArtifacts = artifactRepository.findByObjectTypeAndElementIdAndIsArchivedFalse(ObjectTypeConstants.ARTIFACT, artifact.getId());
        if (linkedArtifacts != null) {
            for (Artifact linkedArtifact : linkedArtifacts) {
                deleteArtifact(linkedArtifact);
            }
        }
        if (artifact == null)
            return;
        String src = artifact.getUrlString();
        if (checkIfFileExist(src)) {
            File f = new File(src);
            boolean status = f.delete();
            if (!status)
                throw new ExecException("Failed to Delete physical file with url " + src);
        }
        artifactRepository.delete(artifact);
    }

    private boolean checkIfFileExist(String path) {
        File obj = new File(path);
        if (obj.exists())
            return true;
        return false;
    }

    public void deleteAssetTypeToShieldElementMap(AssetTypeToShieldElementMap assetTypeToShieldElementMap) {
        if (assetTypeToShieldElementMap == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_TYPE_TO_SHIELD_ELEMENT_LINK, assetTypeToShieldElementMap.getId());

        //  Asset Type Protected By sce Attribute
        /*List<AssetTypeProtectedBySceRTAttribute> attributes = assetTypeToShieldElementMap.getAssetTypeProtectedBySceRTAttributeList();
        if (attributes != null)
            for (AssetTypeProtectedBySceRTAttribute attribute : attributes)
                deleteAssetTypeProtectedBySceRTAttribute(attribute);*/

        assetTypeToShieldElementMapRepository.delete(assetTypeToShieldElementMap);
    }

    public void deleteAssetToShieldElementMap(AssetToShieldElementMap assetToShieldElementMap) {
        if (assetToShieldElementMap == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK, assetToShieldElementMap.getId());

        //  Asset Implments Element RT Attribute
        List<AssetImplementsElementRTAttribute> attributes = assetToShieldElementMap.getAssetImplementsElementRTAttributes();
        if (attributes != null)
            for (AssetImplementsElementRTAttribute attribute : attributes)
                deleteAssetImplementsElementRTAttribute(attribute);

        assetToShieldElementMapRepository.delete(assetToShieldElementMap);
    }

    public void deleteShieldElementToShieldElementMap(ShieldElementToShieldElementMap shieldElementToShieldElementMap) {
        if (shieldElementToShieldElementMap == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.SHIELD_ELEMENT_TO_SHIELD_ELEMENT_LINK, shieldElementToShieldElementMap.getId());

        //  Asset Type Protected By sce Attribute
        /*List<AssetTypeProtectedBySceRTAttribute> attributes = assetTypeToShieldElementMap.getAssetTypeProtectedBySceRTAttributeList();
        if (attributes != null)
            for (AssetTypeProtectedBySceRTAttribute attribute : attributes)
                deleteAssetTypeProtectedBySceRTAttribute(attribute);*/

        shieldElementToShieldElementMapRepository.delete(shieldElementToShieldElementMap);
    }

    public void deleteUser(SphericUser user) {
        if (user == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.USER, user.getId());

        // delete all approved and pending approval maps
        List<ApprovedUserRolesMap> approvedUserRolesMapList = user.getApprovedUserRolesMapList();
        if (approvedUserRolesMapList != null) {
            for (ApprovedUserRolesMap approvedUserRolesMap : approvedUserRolesMapList)
                deleteApprovedUserRolesMap(approvedUserRolesMap);
        }

        List<ApprovalPendingUserRolesMap> approvalPendingUserRolesMapList = user.getApprovalPendingUserRolesMapList();
        if (approvalPendingUserRolesMapList != null) {
            for (ApprovalPendingUserRolesMap approvalPendingUserRolesMap : approvalPendingUserRolesMapList)
                deleteApprovalPendingUserRolesMap(approvalPendingUserRolesMap);
        }

        sphericUserRepository.delete(user);
    }

    private void deleteApprovalPendingUserRolesMap(ApprovalPendingUserRolesMap approvalPendingUserRolesMap) {
        if (approvalPendingUserRolesMap == null)
            return;
        approvalPendingUserRolesMapRepository.delete(approvalPendingUserRolesMap);
    }

    private void deleteApprovedUserRolesMap(ApprovedUserRolesMap approvedUserRolesMap) {
        if (approvedUserRolesMap == null)
            return;
        approvedUserRolesMapRepository.delete(approvedUserRolesMap);
    }

    public void deleteCoreObjectTypePermissionsMap(CoreObjectTypePermissionsMap coreObjectTypePermissionsMap) {
        if (coreObjectTypePermissionsMap == null)
            return;
        coreObjectTypePermissionsMapRepository.delete(coreObjectTypePermissionsMap);
    }

    public void deleteMiscellaneousActionPermissionMap(MiscellaneousActionPermissionsMap miscellaneousActionPermissionsMap) {
        if (miscellaneousActionPermissionsMap == null)
            return;

        miscellaneousActionPermissionsMapRepository.delete(miscellaneousActionPermissionsMap);
    }

    public void deleteTestProcedure(TestProcedure testProcedure) {
        if (testProcedure == null)
            return;
        deleteLinkedArtifacts(ObjectTypeConstants.TEST_PROCEDURE, testProcedure.getId());
        testProcedureRepository.delete(testProcedure);
    }

    public void deleteGuidance(Guidance guidance) {
        if (guidance == null)
            return;
        deleteLinkedArtifacts(ObjectTypeConstants.GUIDANCE, guidance.getId());
        guidanceRepository.delete(guidance);
    }

    public void deleteIngestSource(IngestSource ingestSource) {
        if (ingestSource == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.INGEST_SOURCE, ingestSource.getId());

        //all guidances
        List<Guidance> guidanceList = ingestSource.getGuidanceList();
        if (guidanceList != null) {
            for (Guidance guidance : guidanceList)
                deleteGuidance(guidance);
        }
        // all test procedures
        List<TestProcedure> testProcedures = ingestSource.getTestProcedureList();
        if (testProcedures != null) {
            for (TestProcedure testProcedure : testProcedures)
                deleteTestProcedure(testProcedure);
        }

        ingestSourceRepository.delete(ingestSource);
    }

    public void deleteUserRole(UserRole userRole) {
        if (userRole == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.USER_ROLE, userRole.getId());

        // delete all approved and pending approval maps
        List<ApprovedUserRolesMap> approvedUserRolesMapList = userRole.getApprovedUserRolesMapList();
        if (approvedUserRolesMapList != null) {
            for (ApprovedUserRolesMap approvedUserRolesMap : approvedUserRolesMapList)
                deleteApprovedUserRolesMap(approvedUserRolesMap);
        }

        List<ApprovalPendingUserRolesMap> approvalPendingUserRolesMapList = userRole.getApprovalPendingUserRolesMapList();
        if (approvalPendingUserRolesMapList != null) {
            for (ApprovalPendingUserRolesMap approvalPendingUserRolesMap : approvalPendingUserRolesMapList)
                deleteApprovalPendingUserRolesMap(approvalPendingUserRolesMap);
        }

        //delete all core permissions map
        List<CoreObjectTypePermissionsMap> coreObjectTypePermissionsMaps = userRole.getCoreObjectTypePermissionsMapList();
        if (coreObjectTypePermissionsMaps != null) {
            for (CoreObjectTypePermissionsMap coreObjectTypePermissionsMap : coreObjectTypePermissionsMaps)
                deleteCoreObjectTypePermissionsMap(coreObjectTypePermissionsMap);
        }

        //delete all miscellaneous permissions map
        List<MiscellaneousActionPermissionsMap> miscellaneousActionPermissionsMapList = userRole.getMiscellaneousActionPermissionsMapList();
        if (miscellaneousActionPermissionsMapList != null) {
            for (MiscellaneousActionPermissionsMap miscellaneousActionPermissionsMap : miscellaneousActionPermissionsMapList)
                deleteMiscellaneousActionPermissionMap(miscellaneousActionPermissionsMap);
        }

        //delete all desktops of interest map
        List<DesktopsOfInterestMap> desktopsOfInterestMapList = userRole.getDesktopsOfInterestMapList();
        if (desktopsOfInterestMapList != null) {
            for (DesktopsOfInterestMap desktopsOfInterestMap : desktopsOfInterestMapList)
                deleteDesktopsOfInterestMap(desktopsOfInterestMap);
        }

        userRoleRepository.delete(userRole);
    }

    private void deleteDesktopsOfInterestMap(DesktopsOfInterestMap desktopsOfInterestMap) {
        if (desktopsOfInterestMap == null)
            return;
        desktopsOfInterestMapRepository.delete(desktopsOfInterestMap);
    }

    public void deleteBusinessAssetType(BusinessAssetType assetType) {
        if (assetType == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_ASSET_TYPE, assetType.getId());

        //Business Asset Type To Expression Link
        List<BusinessAssetTypeToExpressionLink> businessAssetTypeToExpressionLinks = assetType.getBusinessAssetTypeToExpressionLinks();
        if (businessAssetTypeToExpressionLinks != null) {
            for (BusinessAssetTypeToExpressionLink businessAssetTypeToExpressionLink : businessAssetTypeToExpressionLinks)
                deleteBusinessAssetTypeToExpressionLink(businessAssetTypeToExpressionLink);
        }

        //B AssetType to Element Map
        List<BusinessAssetTypeToShieldElementMap> assetTypeToShieldElementMapList = assetType.getBusinessAssetTypeToShieldElementMapList();
        if (businessAssetTypeToExpressionLinks != null) {
            for (BusinessAssetTypeToShieldElementMap assetTypeToShieldElementMap : assetTypeToShieldElementMapList)
                deleteBusinessAssetTypeToShieldElementMap(assetTypeToShieldElementMap);
        }

        //    B Asset
        List<BusinessAsset> assets = assetType.getBusinessAssetList();
        if (assets != null)
            for (BusinessAsset asset : assets)
                deleteBusinessAsset(asset);

        //B Asset Type Group Member
        List<BusinessAssetTypeGroupMember> assetTypeGroupMembers = assetType.getBusinessAssetTypeGroupMembers();
        if (assetTypeGroupMembers != null) {
            for (BusinessAssetTypeGroupMember assetTypeGroupMember : assetTypeGroupMembers)
                deleteBusinessAssetTypeGroupMember(assetTypeGroupMember);
        }

        //Children B Asset Type
        List<BusinessAssetType> childrenAssetTypeList = assetType.getChildrenBusinessAssetTypeList();
        if (childrenAssetTypeList != null) {
            for (BusinessAssetType childAssetType : childrenAssetTypeList)
                deleteBusinessAssetType(childAssetType);
        }

        businessAssetTypeRepository.delete(assetType);
    }

    private void deleteBusinessAssetTypeGroupMember(BusinessAssetTypeGroupMember businessAssetTypeGroupMember) {
        if (businessAssetTypeGroupMember == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_ASSET_TYPE_GROUP_MEMBER, businessAssetTypeGroupMember.getId());

        businessAssetTypeGroupMemberRepository.delete(businessAssetTypeGroupMember);
    }

    public void deleteBusinessAsset(BusinessAsset asset) {
        if (asset == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_ASSET, asset.getId());

        // B Asset To Expression Links
        List<BusinessAssetToExpressionLink> businessAssetToExpressionLinks = asset.getBusinessAssetToExpressionLinks();
        if (businessAssetToExpressionLinks != null) {
            for (BusinessAssetToExpressionLink businessAssetToExpressionLink : businessAssetToExpressionLinks)
                deleteBusinessAssetToExpressionLink(businessAssetToExpressionLink);
        }

        //Direct Asset to Element Link
        List<BusinessAssetToShieldElementMap> assetToShieldElementMapList = asset.getBusinessAssetToShieldElementMapList();
        if (assetToShieldElementMapList != null) {
            for (BusinessAssetToShieldElementMap assetToShieldElementMap : assetToShieldElementMapList)
                deleteBusinessAssetToShieldElementMap(assetToShieldElementMap);
        }

        //Asset Group Member
        List<BusinessAssetGroupMember> assetGroupMembers = asset.getBusinessAssetGroupMembers();
        if (assetGroupMembers != null) {
            for (BusinessAssetGroupMember assetGroupMember : assetGroupMembers)
                deleteBusinessAssetGroupMember(assetGroupMember);
        }

        businessAssetRepository.delete(asset);
    }

    private void deleteBusinessAssetGroupMember(BusinessAssetGroupMember businessAssetGroupMember) {
        if (businessAssetGroupMember == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_ASSET_GROUP_MEMBER, businessAssetGroupMember.getId());

        businessAssetGroupMemberRepository.delete(businessAssetGroupMember);
    }

    public void deleteBusinessAssetToShieldElementMap(BusinessAssetToShieldElementMap assetToShieldElementMap) {
        if (assetToShieldElementMap == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_ASSET_TO_SHIELD_ELEMENT_LINK, assetToShieldElementMap.getId());

        businessAssetToShieldElementMapRepository.delete(assetToShieldElementMap);
    }

    public void deleteBusinessAssetToExpressionLink(BusinessAssetToExpressionLink businessAssetToExpressionLink) {
        if (businessAssetToExpressionLink == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_ASSET_TO_EXPRESSION_LINK, businessAssetToExpressionLink.getId());
        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_ASSET_TO_EXPRESSION_LINK_COULD, businessAssetToExpressionLink.getId());


        businessAssetToExpressionLinkRepository.delete(businessAssetToExpressionLink);
    }

    public void deleteBusinessAssetTypeToShieldElementMap(BusinessAssetTypeToShieldElementMap assetTypeToShieldElementMap) {
        if (assetTypeToShieldElementMap == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_SHIELD_ELEMENT_LINK, assetTypeToShieldElementMap.getId());

        businessAssetTypeToShieldElementMapRepository.delete(assetTypeToShieldElementMap);
    }

    public void deleteBusinessAssetTypeToExpressionLink(BusinessAssetTypeToExpressionLink businessAssetTypeToExpressionLink) {
        if (businessAssetTypeToExpressionLink == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_EXPRESSION_LINK_COULD, businessAssetTypeToExpressionLink.getId());
        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_EXPRESSION_LINK, businessAssetTypeToExpressionLink.getId());

        businessAssetTypeToExpressionLinkRepository.delete(businessAssetTypeToExpressionLink);
    }

    public void deleteBusinessProvider(BusinessProvider providerInfo) {
        if (providerInfo == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_PROVIDER, providerInfo.getId());

        //	Business Asset
        List<BusinessAsset> assets = providerInfo.getBusinessAssetList();
        if (assets != null) {
            for (BusinessAsset asset : assets)
                deleteBusinessAsset(asset);
        }

        //	Provider Group Member
        List<BusinessProviderGroupMember> providerGroupMembers = providerInfo.getBusinessProviderGroupMembers();
        if (providerGroupMembers != null) {
            for (BusinessProviderGroupMember providerGroupMember : providerGroupMembers)
                deleteBusinessProviderGroupMember(providerGroupMember);
        }

        businessProviderRepository.delete(providerInfo);
    }

    private void deleteBusinessProviderGroupMember(BusinessProviderGroupMember businessProviderGroupMember) {
        if (businessProviderGroupMember == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_PROVIDER_GROUP_MEMBER, businessProviderGroupMember.getId());

        businessProviderGroupMemberRepository.delete(businessProviderGroupMember);
    }

    public void deleteBusinessAssetGroup(BusinessAssetGroup assetGroup) {
        if (assetGroup == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_ASSET_GROUP, assetGroup.getId());

        //Asset Group Member
        List<BusinessAssetGroupMember> assetGroupMembers = assetGroup.getBusinessAssetGroupMembers();

        if (assetGroupMembers != null)
            for (BusinessAssetGroupMember assetGroupMember : assetGroupMembers)
                deleteBusinessAssetGroupMember(assetGroupMember);

        businessAssetGroupRepository.delete(assetGroup);
    }

    public void deleteBusinessAssetTypeGroup(BusinessAssetTypeGroup assetTypeGroup) {
        if (assetTypeGroup == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_ASSET_TYPE_GROUP, assetTypeGroup.getId());

        //B Asset Group Member
        List<BusinessAssetTypeGroupMember> assetTypeGroupMembers = assetTypeGroup.getBusinessAssetTypeGroupMembers();

        if (assetTypeGroupMembers != null)
            for (BusinessAssetTypeGroupMember assetTypeGroupMember : assetTypeGroupMembers)
                deleteBusinessAssetTypeGroupMember(assetTypeGroupMember);

        businessAssetTypeGroupRepository.delete(assetTypeGroup);
    }

    public void deleteBusinessProviderGroup(BusinessProviderGroup providerGroup) {
        if (providerGroup == null)
            return;

        deleteLinkedArtifacts(ObjectTypeConstants.BUSINESS_PROVIDER_GROUP, providerGroup.getId());

        //Provider Group Member
        List<BusinessProviderGroupMember> providerGroupMembers = providerGroup.getBusinessProviderGroupMembers();
        if (providerGroupMembers != null) {
            for (BusinessProviderGroupMember providerGroupMember : providerGroupMembers)
                deleteBusinessProviderGroupMember(providerGroupMember);
        }

        businessProviderGroupRepository.delete(providerGroup);
    }
}
