package com.ss.utils;

import com.ss.common.ExecException;
import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.artifact.Artifact;
import com.ss.domain.asset.*;
import com.ss.domain.groups.*;
import com.ss.domain.parametertree.ContentParameterWord;
import com.ss.domain.parametertree.MethodParameterWord;
import com.ss.domain.parametertree.ObjectiveParameterWord;
import com.ss.domain.parametertree.SubjectParameterWord;
import com.ss.domain.perspective.CustomPerspective;
import com.ss.domain.perspective.attribute.AssetDeliversSceRTAttribute;
import com.ss.domain.perspective.attribute.AssetDeliversSceRTLibraryAttribute;
import com.ss.domain.perspective.attribute.ShieldElementRTAttribute;
import com.ss.domain.perspective.attribute.ShieldElementRTLibraryAttribute;
import com.ss.domain.sce.SceFulfillsShieldElement;
import com.ss.domain.sce.SecurityControlExpression;
import com.ss.domain.shieldclassification.*;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.domain.usermanagement.SphericUser;
import com.ss.domain.usermanagement.UserRole;
import com.ss.repository.asset.*;
import com.ss.repository.groups.*;
import com.ss.repository.parametertree.ContentParameterWordRepository;
import com.ss.repository.parametertree.MethodParameterWordRepository;
import com.ss.repository.parametertree.ObjectiveParameterWordRepository;
import com.ss.repository.parametertree.SubjectParameterWordRepository;
import com.ss.repository.perspective.CustomPerspectiveRepository;
import com.ss.repository.perspective.attribute.AssetDeliversSceRTAttributeRepository;
import com.ss.repository.perspective.attribute.AssetDeliversSceRTLibraryAttributeRepository;
import com.ss.repository.perspective.attribute.ShieldElementRTLibraryAttributeRepository;
import com.ss.repository.sce.SecurityControlExpressionRepository;
import com.ss.repository.shieldclassification.ShieldElementRepository;
import com.ss.repository.shieldclassification.ShieldElementTypeRepository;
import com.ss.repository.shieldclassification.ShieldRepository;
import com.ss.repository.shieldclassification.ShieldTypeRepository;
import com.ss.repository.usermanagement.OrganizationalUnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("HaveAssetCheckingService")
public class HaveAssetCheckingService {

    @Autowired
    private ShieldRepository shieldRepository;

    @Autowired
    private ShieldTypeRepository shieldTypeRepository;

    @Autowired
    private ShieldElementTypeRepository shieldElementTypeRepository;

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
    private CustomPerspectiveRepository customPerspectiveRepository;

    @Autowired
    private AssetDeliversSceRTAttributeRepository assetDeliversSceRTAttributeRepository;

    @Autowired
    private AssetDeliversSceRTLibraryAttributeRepository assetDeliversSceRTLibraryAttributeRepository;

    @Autowired
    private ShieldElementRTLibraryAttributeRepository shieldElementRTLibraryAttributeRepository;

    @Autowired
    private GetWithIdHelper getWithIdHelper;

    public Boolean isHaveAssetIgnore(Integer elementId, String objectType, boolean isDirect) {

        switch (objectType) {
            case ObjectTypeConstants.SHIELD:
                Shield shield = getWithIdHelper.getShield(elementId);
                return doesShieldHaveAsset(isDirect, shield);
            case ObjectTypeConstants.STANDARD:
                Shield standard = getWithIdHelper.getShield(elementId);
                return doesShieldHaveAsset(isDirect, standard);
            case ObjectTypeConstants.BUSINESS_FRAMEWORK:
                Shield businessFramework = getWithIdHelper.getShield(elementId);
                return doesShieldHaveAsset(isDirect, businessFramework);
            case ObjectTypeConstants.SHIELD_TYPE:
                ShieldType shieldType = getWithIdHelper.getShieldType(elementId);
                return doesShieldTypeHaveAsset(isDirect, shieldType);
            case ObjectTypeConstants.SHIELD_ELEMENT_TYPE:
                ShieldElementType shieldElementType = getWithIdHelper.getShieldElementType(elementId);
                return doesShieldElementTypeHaveAsset(isDirect, shieldElementType);
            case ObjectTypeConstants.BUSINESS_CONTROL_TYPE:
                ShieldElementType businessControlType = getWithIdHelper.getShieldElementType(elementId);
                return doesShieldElementTypeHaveAsset(isDirect, businessControlType);
            case ObjectTypeConstants.STANDARD_ELEMENT_TYPE:
                ShieldElementType standardElementType = getWithIdHelper.getShieldElementType(elementId);
                return doesShieldElementTypeHaveAsset(isDirect, standardElementType);
            case ObjectTypeConstants.SHIELD_ELEMENT:
                ShieldElement shieldElement = getWithIdHelper.getShieldElement(elementId);
                return doesShieldElementHaveAsset(isDirect, shieldElement);
            case ObjectTypeConstants.STANDARD_ELEMENT:
                ShieldElement standardElement = getWithIdHelper.getShieldElement(elementId);
                return doesShieldElementHaveAsset(isDirect, standardElement);
            case ObjectTypeConstants.BUSINESS_CONTROL:
                ShieldElement businessControl = getWithIdHelper.getShieldElement(elementId);
                return doesShieldElementHaveAsset(isDirect, businessControl);
            case ObjectTypeConstants.SCE:
                SecurityControlExpression securityControlExpression = getWithIdHelper.getSce(elementId);
                return doesExpressionHaveAsset(isDirect, securityControlExpression);
            case ObjectTypeConstants.ORGANIZATIONAL_UNIT:
                OrganizationalUnit organizationalUnit = getWithIdHelper.getOrganizationalUnit(elementId);
                return doesOrganizationalUnitHaveAsset(isDirect, organizationalUnit);
            case ObjectTypeConstants.OBJECTIVE_PARAMETER:
                ObjectiveParameterWord objectiveParameterWord = getWithIdHelper.getObjectiveParameter(elementId);
                return doesObjectiveParameterHaveAsset(isDirect, objectiveParameterWord);
            case ObjectTypeConstants.METHOD_PARAMETER:
                MethodParameterWord methodParameterWord = getWithIdHelper.getMethodParameter(elementId);
                return doesMethodParameterHaveAsset(isDirect, methodParameterWord);
            case ObjectTypeConstants.CONTENT_PARAMETER:
                ContentParameterWord contentParameterWord = getWithIdHelper.getContentParameter(elementId);
                return doesContentParameterHaveAsset(isDirect, contentParameterWord);
            case ObjectTypeConstants.SUBJECT_PARAMETER:
                SubjectParameterWord subjectParameterWord = getWithIdHelper.getSubjectParameter(elementId);
                return doesSubjectParameterHaveAsset(isDirect, subjectParameterWord);
            case ObjectTypeConstants.ASSET_TYPE:
                AssetType assetType = getWithIdHelper.getAssetType(elementId);
                return doesAssetTypeHaveAsset(isDirect, assetType);
            case ObjectTypeConstants.ASSET:
                Asset asset = getWithIdHelper.getAsset(elementId);
                return doesAssetHaveAsset(isDirect, asset);
            case ObjectTypeConstants.TECHNICAL_SUPPORT_PEOPLE:
                TechnicalSupport technicalSupport = getWithIdHelper.getTechnicalSupport(elementId);
                return doesTechnicalSupportHaveAsset(isDirect, technicalSupport);
            case ObjectTypeConstants.PROVIDER:
                ProviderInfo providerInfo = getWithIdHelper.getProvider(elementId);
                return doesProviderHaveAsset(isDirect, providerInfo);
            case ObjectTypeConstants.TECHNICAL_SUPPORT_CONTACT_INFO:
                TechnicalSupportContactInfo technicalSupportContactInfo = getWithIdHelper.getTechnicalSupportContactInfo(elementId);
                return doesTechnicalSupportContactInfoHaveAsset(isDirect, technicalSupportContactInfo);
            case ObjectTypeConstants.SHIELD_ELEMENT_GROUP:
                ShieldElementGroup shieldElementGroup = getWithIdHelper.getShieldElementGroup(elementId);
                return doesShieldElementGroupHaveAsset(isDirect, shieldElementGroup);
            case ObjectTypeConstants.SCE_GROUP:
                SceGroup sceGroup = getWithIdHelper.getSceGroup(elementId);
                return doesSceGroupHaveAsset(isDirect, sceGroup);
            case ObjectTypeConstants.ASSET_GROUP:
                AssetGroup assetGroup = getWithIdHelper.getAssetGroup(elementId);
                return doesAssetGroupHaveAsset(isDirect, assetGroup);
            case ObjectTypeConstants.ASSET_TYPE_GROUP:
                AssetTypeGroup assetTypeGroup = getWithIdHelper.getAssetTypeGroup(elementId);
                return doesAssetTypeGroupHaveAsset(isDirect, assetTypeGroup);
            case ObjectTypeConstants.PROVIDER_GROUP:
                ProviderGroup providerGroup = getWithIdHelper.getProviderGroup(elementId);
                return doesProviderGroupHaveAsset(isDirect, providerGroup);
            case ObjectTypeConstants.PERSPECTIVE:
                CustomPerspective customPerspective = getWithIdHelper.getPerspective(elementId);
                return false;
            case ObjectTypeConstants.ASSET_DELIVERS_ATTRIBUTE:
                AssetDeliversSceRTAttribute assetDeliversSceRTAttribute = getWithIdHelper.getAssetDeliversSceRTAttribute(elementId);
                return false;
            case ObjectTypeConstants.SHIELD_ELEMENT_RT_ATTRIBUTE:
                ShieldElementRTAttribute shieldElementRTAttribute = getWithIdHelper.getShieldElementRTAttribute(elementId);
                return false;
            case ObjectTypeConstants.ASSET_DELIVERS_LIBRARY_ATTRIBUTE:
                AssetDeliversSceRTLibraryAttribute assetDeliversSceRTLibraryAttribute = getWithIdHelper.getAssetDeliversSceRTLibraryAttribute(elementId);
                return false;
            case ObjectTypeConstants.SHIELD_ELEMENT_LIBRARY_ATTRIBUTE:
                ShieldElementRTLibraryAttribute shieldElementLibraryAttribute = getWithIdHelper.getShieldElementLibraryAttribute(elementId);
                return false;
            case ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK:
                SceFulfillsShieldElement sceFulfillsShieldElement = getWithIdHelper.getSceFulfillsShieldElement(elementId);
                return doesSceFulfillsShieldElementHaveAsset(isDirect, sceFulfillsShieldElement);
            case ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK: {
                AssetDeliversSce assetDeliversSce = getWithIdHelper.getAssetDeliverssce(elementId);
                return doesAssetDeliversSceHaveAsset(isDirect, assetDeliversSce);
            }
            case ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK_COULD: {
                AssetDeliversSce assetDeliversSce = getWithIdHelper.getAssetDeliverssce(elementId);
                return doesAssetDeliversSceHaveAsset(isDirect, assetDeliversSce);
            }
            case ObjectTypeConstants.ASSET_TYPE_TO_EXPRESSION_LINK: {
                AssetTypeProtectedBySce assetTypeProtectedBySce = getWithIdHelper.getAssetTypeProtectedBySce(elementId);
                return doesAssetTypeProtectedBySceHaveAsset(isDirect, assetTypeProtectedBySce);
            }
            case ObjectTypeConstants.ASSET_TYPE_TO_EXPRESSION_LINK_COULD: {
                AssetTypeProtectedBySce assetTypeProtectedBySce = getWithIdHelper.getAssetTypeProtectedBySce(elementId);
                return doesAssetTypeProtectedBySceHaveAsset(isDirect, assetTypeProtectedBySce);
            }
            case ObjectTypeConstants.ASSET_TYPE_TO_SHIELD_ELEMENT_LINK: {
                AssetTypeToShieldElementMap assetTypeToShieldElementMap = getWithIdHelper.getAssetTypeToShieldElementMap(elementId);
                return doesDirectAssetTypeToShieldElementLinkHaveAsset(isDirect, assetTypeToShieldElementMap);
            }
            case ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK: {
                AssetToShieldElementMap assetToShieldElementMap = getWithIdHelper.getAssetToShieldElementMap(elementId);
                return doesDirectAssetToShieldElementLinkHaveAsset(isDirect, assetToShieldElementMap);
            }
            case ObjectTypeConstants.SHIELD_ELEMENT_TO_SHIELD_ELEMENT_LINK: {
                ShieldElementToShieldElementMap shieldElementToShieldElementMap = getWithIdHelper.getShieldElementToShieldElementMap(elementId);
                return doesShieldElementToShieldElementMapHaveAsset(isDirect, shieldElementToShieldElementMap);

            }
            case ObjectTypeConstants.ARTIFACT:
                Artifact artifact = getWithIdHelper.getArtifact(elementId);
                return false;
            case ObjectTypeConstants.USER:
                SphericUser user = getWithIdHelper.getUser(elementId);
                return false;
            case ObjectTypeConstants.USER_ROLE:
                UserRole userRole = getWithIdHelper.getUserRole(elementId);
                return false;
            case ObjectTypeConstants.INGEST_SOURCE:
                IngestSource ingestSource = getWithIdHelper.getIngestSource(elementId);
                return false;
            case ObjectTypeConstants.GUIDANCE:
                Guidance guidance = getWithIdHelper.getGuidance(elementId);
                return false;
            case ObjectTypeConstants.TEST_PROCEDURE:
                TestProcedure testProcedure = getWithIdHelper.getTestProcedure(elementId);
                return false;
            default:
                throw new ExecException("this is unknown object type" + objectType);

        }
    }

    private Boolean doesDirectAssetToShieldElementLinkHaveAsset(boolean isDirect, AssetToShieldElementMap assetToShieldElementMap) {
        return false;
    }

    private Boolean doesDirectAssetTypeToShieldElementLinkHaveAsset(boolean isDirect, AssetTypeToShieldElementMap assetTypeToShieldElementMap) {
        return false;
    }


    public boolean doesShieldTypeHaveAsset(boolean isDirect, ShieldType shieldType) {

        List<Shield> shieldList = shieldType.getShieldList();
        if (doesAnyOfShieldsHaveAsset(isDirect, shieldList)) return true;
        return false;
    }

    private boolean doesAnyOfShieldsHaveAsset(boolean isDirect, List<Shield> shieldList) {
        if (shieldList != null)
            for (Shield shield : shieldList) {
                if (shield != null && !shield.isArchived()) {
                    if (doesShieldHaveAsset(isDirect, shield))
                        return true;

                }
            }
        return false;
    }

    public boolean doesShieldHaveAsset(boolean isDirect, Shield shield) {
        List<ShieldElement> shieldElements = shield.getShieldElementList();
        if (doesAnyOfShieldElementsHaveAsset(isDirect, shieldElements)) return true;
        return false;
    }

    private boolean doesAnyOfShieldElementsHaveAsset(boolean isDirect, List<ShieldElement> shieldElements) {
        if (shieldElements != null)
            for (ShieldElement shieldElement : shieldElements) {
                if (shieldElement != null && !shieldElement.isArchived()) {
                    if (doesShieldElementHaveDirectAsset(isDirect, shieldElement))
                        return true;
                }
            }
        return false;
    }

    public boolean doesShieldElementHaveAsset(boolean isDirect, ShieldElement shieldElement) {
        List<SceFulfillsShieldElement> sceFulfillsShieldElementList = shieldElement.getSceFulfillsShieldElementList();
        if (doesAnyOfSceFulfillsShieldElementListHaveAsset(isDirect, sceFulfillsShieldElementList)) return true;
        List<ShieldElement> childrenShieldElementList = shieldElement.getChildrenShieldElementList();
        if (childrenShieldElementList != null) {
            for (ShieldElement childShieldElement : childrenShieldElementList) {
                if (childShieldElement != null && !childShieldElement.isArchived()) {
                    if (doesShieldElementHaveAsset(isDirect, childShieldElement)) return true;
                }
            }
        }
        return false;
    }

    public boolean doesShieldElementHaveDirectAsset(boolean isDirect, ShieldElement shieldElement) {
        List<SceFulfillsShieldElement> sceFulfillsShieldElementList = shieldElement.getSceFulfillsShieldElementList();
        if (doesAnyOfSceFulfillsShieldElementListHaveAsset(isDirect, sceFulfillsShieldElementList)) return true;
        return false;
    }

    private boolean doesAnyOfSceFulfillsShieldElementListHaveAsset(boolean isDirect, List<SceFulfillsShieldElement> sceFulfillsShieldElementList) {
        if (sceFulfillsShieldElementList != null)
            for (SceFulfillsShieldElement sceFulfillsShieldElement : sceFulfillsShieldElementList) {
                if (sceFulfillsShieldElement != null && !sceFulfillsShieldElement.isArchived()) {
                    SecurityControlExpression securityControlExpression = sceFulfillsShieldElement.getSce();
                    if (securityControlExpression != null && !securityControlExpression.isArchived()) {
                        if (doesExpressionHaveAsset(isDirect, securityControlExpression))
                            return true;
                    }
                }
            }
        return false;
    }

    public boolean doesExpressionHaveAsset(boolean isDirect, SecurityControlExpression securityControlExpression) {
        List<AssetDeliversSce> assetDeliversSceList = securityControlExpression.getAssetDeliversSceList();
        if (doesAnyOfAssetDeliversSceListHaveAsset(isDirect, assetDeliversSceList)) return true;
        return false;
    }

    private boolean doesAnyOfAssetDeliversSceListHaveAsset(boolean isDirect, List<AssetDeliversSce> assetDeliversSceList) {
        if (assetDeliversSceList != null) {
            for (AssetDeliversSce assetDeliversSce : assetDeliversSceList) {
                if (assetDeliversSce != null && !assetDeliversSce.isArchived()) {
                    if (doesAssetHaveAsset(isDirect, assetDeliversSce.getAsset()))
                        return true;

                }
            }
        }
        return false;
    }

    public boolean doesAssetHaveAsset(boolean isDirect, Asset asset) {
        if (asset != null && !asset.isArchived())
            return true;
        return false;
    }

    public boolean doesShieldElementTypeHaveAsset(boolean isDirect, ShieldElementType shieldElementType) {
        List<ShieldElement> shieldElementList = shieldElementType.getShieldElementList();
        if (doesAnyOfShieldElementsHaveAsset(isDirect, shieldElementList)) return true;
        List<ShieldElementType> childrenShieldElementTypeList = shieldElementType.getChildrenShieldElementTypeList();
        if (childrenShieldElementTypeList != null) {
            for (ShieldElementType childShieldElementType : childrenShieldElementTypeList) {
                if (childShieldElementType != null && !childShieldElementType.isArchived()) {
                    if (doesShieldElementTypeHaveAsset(isDirect, childShieldElementType)) return true;
                }
            }
        }
        return false;
    }

    public boolean doesObjectiveParameterHaveAsset(boolean isDirect, ObjectiveParameterWord objectiveParameterWord) {
        List<SecurityControlExpression> securityControlExpressions = objectiveParameterWord.getSecurityControlExpressionList();
        if (doesAnyOfExpressionsHaveAsset(isDirect, securityControlExpressions)) return true;
        List<ObjectiveParameterWord> childrenObjectiveParameterWordList = objectiveParameterWord.getChildrenObjectiveParameterWordList();
        if (childrenObjectiveParameterWordList != null) {
            for (ObjectiveParameterWord childObjectiveParameterWord : childrenObjectiveParameterWordList) {
                if (childObjectiveParameterWord != null && !childObjectiveParameterWord.isArchived()) {
                    if (doesObjectiveParameterHaveAsset(isDirect, childObjectiveParameterWord)) return true;
                }
            }
        }
        return false;
    }

    private boolean doesAnyOfExpressionsHaveAsset(boolean isDirect, List<SecurityControlExpression> securityControlExpressions) {
        if (securityControlExpressions != null) {
            for (SecurityControlExpression securityControlExpression : securityControlExpressions) {
                if (securityControlExpression != null && !securityControlExpression.isArchived()) {
                    if (doesExpressionHaveAsset(isDirect, securityControlExpression))
                        return true;
                }
            }
        }
        return false;
    }

    public boolean doesMethodParameterHaveAsset(boolean isDirect, MethodParameterWord methodParameterWord) {
        List<SecurityControlExpression> securityControlExpressions = methodParameterWord.getSecurityControlExpressionList();
        if (doesAnyOfExpressionsHaveAsset(isDirect, securityControlExpressions)) return true;
        List<MethodParameterWord> childrenMethodParameterWordList = methodParameterWord.getChildrenMethodParameterWordList();
        if (childrenMethodParameterWordList != null) {
            for (MethodParameterWord childMethodParameterWord : childrenMethodParameterWordList) {
                if (childMethodParameterWord != null && !childMethodParameterWord.isArchived()) {
                    if (doesMethodParameterHaveAsset(isDirect, childMethodParameterWord)) return true;
                }
            }
        }
        return false;
    }

    public boolean doesContentParameterHaveAsset(boolean isDirect, ContentParameterWord contentParameterWord) {
        List<SecurityControlExpression> securityControlExpressions = contentParameterWord.getSecurityControlExpressionList();
        if (doesAnyOfExpressionsHaveAsset(isDirect, securityControlExpressions)) return true;
        List<ContentParameterWord> childrenContentParameterWordList = contentParameterWord.getChildrenContentParameterWordList();
        if (childrenContentParameterWordList != null) {
            for (ContentParameterWord childContentParameterWord : childrenContentParameterWordList) {
                if (childContentParameterWord != null && !childContentParameterWord.isArchived()) {
                    if (doesContentParameterHaveAsset(isDirect, childContentParameterWord)) return true;
                }
            }
        }
        return false;
    }

    public boolean doesSubjectParameterHaveAsset(boolean isDirect, SubjectParameterWord subjectParameterWord) {
        List<SecurityControlExpression> securityControlExpressions = subjectParameterWord.getSecurityControlExpressionList();
        if (doesAnyOfExpressionsHaveAsset(isDirect, securityControlExpressions)) return true;
        List<SubjectParameterWord> childrenSubjectParameterWordList = subjectParameterWord.getChildrenSubjectParameterWordList();
        if (childrenSubjectParameterWordList != null) {
            for (SubjectParameterWord childSubjectParameterWord : childrenSubjectParameterWordList) {
                if (childSubjectParameterWord != null && !childSubjectParameterWord.isArchived()) {
                    if (doesSubjectParameterHaveAsset(isDirect, childSubjectParameterWord)) return true;
                }
            }
        }
        return false;
    }

    public boolean doesAssetTypeHaveAsset(boolean isDirect, AssetType assetType) {
        List<Asset> assets = assetType.getAssetList();
        if (doesAnyOfAssetsHaveAsset(isDirect, assets)) return true;
        List<AssetType> childrenAssetTypes = assetType.getChildrenAssetTypeList();
        if (childrenAssetTypes != null) {
            for (AssetType childAssetType : childrenAssetTypes) {
                if (childAssetType != null && !childAssetType.isArchived()) {
                    if (doesAssetTypeHaveAsset(isDirect, childAssetType)) return true;
                }
            }
        }
        return false;
    }

    private boolean doesAnyOfAssetsHaveAsset(boolean isDirect, List<Asset> assets) {
        if (assets != null) {
            for (Asset asset : assets) {
                if (doesAssetHaveAsset(isDirect, asset))
                    return true;
            }
        }
        return false;
    }

    public boolean doesProviderHaveAsset(boolean isDirect, ProviderInfo providerInfo) {
        List<Asset> assets = providerInfo.getAssetList();
        if (doesAnyOfAssetsHaveAsset(isDirect, assets)) return true;
        return false;
    }

    public boolean doesTechnicalSupportHaveAsset(boolean isDirect, TechnicalSupport technicalSupport) {
        ProviderInfo providerInfo = technicalSupport.getProviderInfo();
        if (providerInfo != null && !providerInfo.isArchived())
            if (doesProviderHaveAsset(isDirect, providerInfo))
                return true;
        return false;
    }

    public boolean doesTechnicalSupportContactInfoHaveAsset(boolean isDirect, TechnicalSupportContactInfo technicalSupportContactInfo) {
        TechnicalSupport technicalSupport = technicalSupportContactInfo.getTechnicalSupport();
        if (technicalSupport != null && !technicalSupport.isArchived())
            if (doesTechnicalSupportHaveAsset(isDirect, technicalSupport)) return true;
        return false;

    }

    public boolean doesOrganizationalUnitHaveAsset(boolean isDirect, OrganizationalUnit organizationalUnit) {
        List<Asset> assets = organizationalUnit.getAllLinkedAssets();
        if (doesAnyOfAssetsHaveAsset(isDirect, assets)) return true;
        List<OrganizationalUnit> childrenOrganizationalUnits = organizationalUnit.getChildrenOrganizationalUnits();
        if (childrenOrganizationalUnits != null) {
            for (OrganizationalUnit childOrganizationalUnit : childrenOrganizationalUnits) {
                if (childOrganizationalUnit != null && !childOrganizationalUnit.isArchived()) {
                    if (doesOrganizationalUnitHaveAsset(isDirect, childOrganizationalUnit)) return true;
                }
            }
        }
        return false;
    }

    public boolean doesShieldElementGroupHaveAsset(boolean isDirect, ShieldElementGroup shieldElementGroup) {
        List<ShieldElementGroupMember> shieldElementGroupMembers = shieldElementGroup.getShieldElementGroupMembers();
        if (doesAnyOfShieldElementGroupMemberHaveAsset(isDirect, shieldElementGroupMembers)) return true;
        return false;
    }

    private boolean doesAnyOfShieldElementGroupMemberHaveAsset(boolean isDirect, List<ShieldElementGroupMember> shieldElementGroupMembers) {
        if (shieldElementGroupMembers != null) {
            for (ShieldElementGroupMember shieldElementGroupMember : shieldElementGroupMembers) {
                if (shieldElementGroupMember != null && !shieldElementGroupMember.isArchived()) {
                    ShieldElement shieldElement = shieldElementGroupMember.getShieldElement();
                    if (shieldElement != null && !shieldElement.isArchived())
                        if (doesShieldElementHaveAsset(isDirect, shieldElement)) return true;
                }
            }
        }
        return false;
    }

    public boolean doesSceGroupHaveAsset(boolean isDirect, SceGroup sceGroup) {
        List<SceGroupMember> sceGroupMembers = sceGroup.getSceGroupMembers();
        if (doesAnyOfSceGroupMemberHaveAsset(isDirect, sceGroupMembers)) return true;
        return false;
    }

    private boolean doesAnyOfSceGroupMemberHaveAsset(boolean isDirect, List<SceGroupMember> sceGroupMembers) {
        if (sceGroupMembers != null) {
            for (SceGroupMember sceGroupMember : sceGroupMembers) {
                if (sceGroupMember != null && !sceGroupMember.isArchived()) {
                    SecurityControlExpression sce = sceGroupMember.getSce();
                    if (sce != null && !sce.isArchived())
                        if (doesExpressionHaveAsset(isDirect, sce)) return true;
                }
            }
        }
        return false;
    }

    public boolean doesAssetGroupHaveAsset(boolean isDirect, AssetGroup assetGroup) {
        List<AssetGroupMember> assetGroupMembers = assetGroup.getAssetGroupMembers();
        if (doesAnyOfAssetGroupMemberHaveAsset(isDirect, assetGroupMembers)) return true;
        return false;
    }

    private boolean doesAnyOfAssetGroupMemberHaveAsset(boolean isDirect, List<AssetGroupMember> assetGroupMembers) {
        if (assetGroupMembers != null) {
            for (AssetGroupMember assetGroupMember : assetGroupMembers) {
                if (assetGroupMember != null && !assetGroupMember.isArchived()) {
                    if (doesAssetHaveAsset(isDirect, assetGroupMember.getAsset())) return true;
                }
            }
        }
        return false;
    }

    public boolean doesAssetTypeGroupHaveAsset(boolean isDirect, AssetTypeGroup assetTypeGroup) {
        List<AssetTypeGroupMember> assetTypeGroupMembers = assetTypeGroup.getAssetTypeGroupMembers();
        if (doesAnyOfAssetTypeGroupMemberHaveAsset(isDirect, assetTypeGroupMembers)) return true;
        return false;
    }

    private boolean doesAnyOfAssetTypeGroupMemberHaveAsset(boolean isDirect, List<AssetTypeGroupMember> assetTypeGroupMembers) {
        if (assetTypeGroupMembers != null) {
            for (AssetTypeGroupMember assetTypeGroupMember : assetTypeGroupMembers) {
                if (assetTypeGroupMember != null && !assetTypeGroupMember.isArchived()) {
                    AssetType assetType = assetTypeGroupMember.getAssetType();
                    if (assetType != null && !assetType.isArchived())
                        if (doesAssetTypeHaveAsset(isDirect, assetType)) return true;
                }
            }
        }
        return false;
    }

    public boolean doesProviderGroupHaveAsset(boolean isDirect, ProviderGroup providerGroup) {
        List<ProviderGroupMember> providerGroupMembers = providerGroup.getProviderGroupMembers();
        if (doesAnyOfProviderGroupMemberHaveAsset(isDirect, providerGroupMembers)) return true;
        return false;
    }

    private boolean doesAnyOfProviderGroupMemberHaveAsset(boolean isDirect, List<ProviderGroupMember> providerGroupMembers) {
        if (providerGroupMembers != null) {
            for (ProviderGroupMember providerGroupMember : providerGroupMembers) {
                if (providerGroupMember != null && !providerGroupMember.isArchived()) {
                    ProviderInfo providerInfo = providerGroupMember.getProviderInfo();
                    if (providerInfo != null && !providerInfo.isArchived())
                        if (doesProviderHaveAsset(isDirect, providerInfo)) return true;
                }
            }
        }
        return false;
    }

    public boolean doesSceFulfillsShieldElementHaveAsset(boolean isDirect, SceFulfillsShieldElement sceFulfillsShieldElement) {
        SecurityControlExpression securityControlExpression = sceFulfillsShieldElement.getSce();
        if (securityControlExpression != null && !securityControlExpression.isArchived())
            if (doesExpressionHaveAsset(isDirect, securityControlExpression)) return true;
        return false;
    }

    public boolean doesAssetDeliversSceHaveAsset(boolean isDirect, AssetDeliversSce assetDeliversSce) {
        Asset asset = assetDeliversSce.getAsset();
        if (doesAssetHaveAsset(isDirect, asset)) return true;
        return false;
    }

    public boolean doesAssetTypeProtectedBySceHaveAsset(boolean isDirect, AssetTypeProtectedBySce assetTypeProtectedBySce) {
        AssetType assetType = assetTypeProtectedBySce.getAssetType();
        if (assetType != null && !assetType.isArchived())
            if (doesAssetTypeHaveAsset(isDirect, assetType)) return true;
        return false;
    }

    public boolean doesAssetTypeToShieldElementMapHaveAsset(boolean isDirect, AssetTypeToShieldElementMap assetTypeToShieldElementMap) {
        AssetType assetType = assetTypeToShieldElementMap.getAssetType();
        if (assetType != null && !assetType.isArchived())
            if (doesAssetTypeHaveAsset(isDirect, assetType)) return true;
        return false;
    }

    public boolean doesAssetToShieldElementMapHaveAsset(boolean isDirect, AssetToShieldElementMap assetToShieldElementMap) {
        Asset asset = assetToShieldElementMap.getAsset();
        if (asset != null && !asset.isArchived())
            if (doesAssetHaveAsset(isDirect, asset)) return true;
        return false;
    }

    public boolean doesShieldElementToShieldElementMapHaveAsset(boolean isDirect, ShieldElementToShieldElementMap shieldElementToShieldElementMap) {
        return false;
    }

    public boolean doesUserHaveAsset(boolean isDirect, SphericUser user) {
        return false;
    }

    public boolean doesUserRoleHaveAsset(boolean isDirect, UserRole userRole) {
        return false;
    }

    public boolean doesIngestSourceHaveAsset(boolean isDirect, IngestSource ingestSource) {
        return false;
    }

    public boolean doesTestProcedureHaveAsset(boolean isDirect, TestProcedure testProcedure) {
        return false;
    }

    public boolean doesGuidanceHaveAsset(boolean isDirect, Guidance guidance) {
        return false;
    }

}
