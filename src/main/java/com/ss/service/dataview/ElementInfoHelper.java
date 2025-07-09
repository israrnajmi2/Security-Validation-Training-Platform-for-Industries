package com.ss.service.dataview;

import com.ss.common.ExecException;
import com.ss.constants.LinkName;
import com.ss.constants.ObjectTypeConstants;
import com.ss.constants.ProtectionType;
import com.ss.domain.artifact.Artifact;
import com.ss.domain.asset.*;
import com.ss.domain.businessasset.BusinessAssetToExpressionLink;
import com.ss.domain.businessasset.BusinessAssetToShieldElementMap;
import com.ss.domain.businessasset.BusinessAssetTypeToExpressionLink;
import com.ss.domain.businessasset.BusinessAssetTypeToShieldElementMap;
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
import com.ss.pojo.restservice.GenericItem;
import com.ss.pojo.restservice.LinkElementInfoResponse;
import com.ss.repository.artifact.ArtifactRepository;
import com.ss.repository.asset.*;
import com.ss.repository.businessasset.BusinessAssetToExpressionLinkRepository;
import com.ss.repository.businessasset.BusinessAssetToShieldElementMapRepository;
import com.ss.repository.businessasset.BusinessAssetTypeToExpressionLinkRepository;
import com.ss.repository.businessasset.BusinessAssetTypeToShieldElementMapRepository;
import com.ss.repository.groups.*;
import com.ss.repository.parametertree.ContentParameterWordRepository;
import com.ss.repository.parametertree.MethodParameterWordRepository;
import com.ss.repository.parametertree.ObjectiveParameterWordRepository;
import com.ss.repository.parametertree.SubjectParameterWordRepository;
import com.ss.repository.perspective.CustomPerspectiveRepository;
import com.ss.repository.perspective.attribute.*;
import com.ss.repository.perspective.rating.AssetDeliversSceRTRatingRepository;
import com.ss.repository.perspective.rating.AssetImplementsElementRTRatingRepository;
import com.ss.repository.perspective.rating.ShieldElementRTRatingRepository;
import com.ss.repository.sce.SceFulfillsShieldElementRepository;
import com.ss.repository.sce.SecurityControlExpressionRepository;
import com.ss.repository.shieldclassification.*;
import com.ss.repository.usermanagement.OrganizationalUnitRepository;
import com.ss.repository.usermanagement.SphericUserRepository;
import com.ss.repository.usermanagement.UserRoleRepository;
import com.ss.utils.GenericItemPOJOBuilder;
import com.ss.utils.GetWithIdHelper;
import com.ss.utils.LinkNameHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("ElementInfoHelper")
public class ElementInfoHelper {


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
    private AssetTypeProtectedBySceRepository assetTypeProtectedBySceRepository;

    @Autowired
    private SceFulfillsShieldElementRepository sceFulfillsShieldElementRepository;

    @Autowired
    private AssetToShieldElementMapRepository assetToShieldElementMapRepository;

    @Autowired
    private AssetTypeToShieldElementMapRepository assetTypeToShieldElementMapRepository;

    @Autowired
    private ShieldElementToShieldElementMapRepository shieldElementToShieldElementMapRepository;

    @Autowired
    private CustomPerspectiveRepository customPerspectiveRepository;

    @Autowired
    private AssetDeliversSceRTAttributeRepository assetDeliversSceRTAttributeRepository;

    @Autowired
    private AssetDeliversSceRTLibraryAttributeRepository assetDeliversSceRTLibraryAttributeRepository;

    @Autowired
    private AssetDeliversSceRTRatingRepository assetDeliversSceRTRatingRepository;

    @Autowired
    private ShieldElementRTAttributeRepository shieldElementRTAttributeRepository;

    @Autowired
    private ShieldElementRTLibraryAttributeRepository shieldElementRTLibraryAttributeRepository;

    @Autowired
    private ShieldElementRTRatingRepository shieldElementRTRatingRepository;

    @Autowired
    private ArtifactRepository artifactRepository;

    @Autowired
    private SphericUserRepository sphericUserRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private IngestSourceRepository ingestSourceRepository;

    @Autowired
    private TestProcedureRepository testProcedureRepository;

    @Autowired
    private GuidanceRepository guidanceRepository;

    @Autowired
    private GetWithIdHelper getWithIdHelper;

    @Autowired
    private BusinessAssetToExpressionLinkRepository businessAssetToExpressionLinkRepository;

    @Autowired
    private BusinessAssetTypeToExpressionLinkRepository businessAssetTypeToExpressionLinkRepository;

    @Autowired
    private BusinessAssetToShieldElementMapRepository businessAssetToShieldElementMapRepository;

    @Autowired
    private BusinessAssetTypeToShieldElementMapRepository businessAssetTypeToShieldElementMapRepository;

    @Autowired
    private AssetImplementsElementRTAttributeRepository assetImplementsElementRTAttributeRepository;

    @Autowired
    private AssetImplementsElementRTLibraryAttributeRepository assetImplementsElementRTLibraryAttributeRepository;

    @Autowired
    private AssetImplementsElementRTRatingRepository assetImplementsElementRTRatingRepository;

    @Autowired
    private LinkNameHelper linkNameHelper;

    public GenericItem getElementInfoForShield(Integer elementId) {

        Shield shield = shieldRepository.findOne(elementId);

        if (shield == null || shield.isArchived())
            throw new ExecException("Shield with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shield);

        return response;
    }

    public GenericItem getElementInfoForShieldType(Integer elementId) {
        ShieldType shieldType = shieldTypeRepository.findOne(elementId);

        if (shieldType == null || shieldType.isArchived())
            throw new ExecException("ShieldType with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shieldType);

        return response;

    }

    public GenericItem getElementInfoForShieldElement(Integer elementId) {
        ShieldElement shieldElement = shieldElementRepository.findOne(elementId);

        if (shieldElement == null || shieldElement.isArchived())
            throw new ExecException("Shield/Standard Element with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJOWithParentElement(shieldElement);

        return response;
    }

    public GenericItem getElementInfoForSCE(Integer elementId) {
        SecurityControlExpression securityControlExpression = securityControlExpressionRepository.findOne(elementId);

        if (securityControlExpression == null || securityControlExpression.isArchived())
            throw new ExecException("Security Control Expression with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(securityControlExpression);

        return response;
    }

    public GenericItem getElementInfoForOrganizationalUnit(Integer elementId) {
        OrganizationalUnit organizationalUnit = organizationalUnitRepository.findOne(elementId);

        if (organizationalUnit == null || organizationalUnit.isArchived())
            throw new ExecException("Organizational Unit with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJOWithParent(organizationalUnit);

        return response;
    }


    public GenericItem getElementInfoForObjectiveParameter(Integer elementId) {
        ObjectiveParameterWord objectiveParameterWord = objectiveParameterWordRepository.findOne(elementId);

        if (objectiveParameterWord == null || objectiveParameterWord.isArchived())
            throw new ExecException("Objective Parameter Word with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJOWithParent(objectiveParameterWord);
        return response;
    }

    public GenericItem getElementInfoForMethodParameter(Integer elementId) {
        MethodParameterWord methodParameterWord = methodParameterWordRepository.findOne(elementId);

        if (methodParameterWord == null || methodParameterWord.isArchived())
            throw new ExecException("Method Parameter Word with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJOWithParent(methodParameterWord);

        return response;
    }

    public GenericItem getElementInfoForContentParameter(Integer elementId) {
        ContentParameterWord contentParameterWord = contentParameterWordRepository.findOne(elementId);

        if (contentParameterWord == null || contentParameterWord.isArchived())
            throw new ExecException("Content Parameter Word with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJOWithParent(contentParameterWord);

        return response;
    }

    public GenericItem getElementInfoForSubjectParameter(Integer elementId) {
        SubjectParameterWord subjectParameterWord = subjectParameterWordRepository.findOne(elementId);
        if (subjectParameterWord == null || subjectParameterWord.isArchived())
            throw new ExecException("Subject Parameter Word with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJOWithParent(subjectParameterWord);

        return response;
    }

    public GenericItem getElementInfoForAssetType(Integer elementId) {
        AssetType assetType = assetTypeRepository.findOne(elementId);
        if (assetType == null || assetType.isArchived())
            throw new ExecException("Asset Type with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJOWithParent(assetType);

        return response;
    }

    public GenericItem getElementInfoForAsset(Integer elementId) {
        Asset asset = assetRepository.findOne(elementId);
        if (asset == null || asset.isArchived())
            throw new ExecException("Asset with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(asset);

        return response;
    }

    public GenericItem getElementInfoForTechnicalSupportPeople(Integer elementId) {
        TechnicalSupport technicalSupport = technicalSupportInfoRepository.findOne(elementId);
        if (technicalSupport == null || technicalSupport.isArchived())
            throw new ExecException("Technical Support with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(technicalSupport);

        return response;
    }

    public GenericItem getElementInfoForProvider(Integer elementId) {

        ProviderInfo providerInfo = providerInfoRepository.findOne(elementId);
        if (providerInfo == null || providerInfo.isArchived())
            throw new ExecException("Provider Info with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(providerInfo);

        return response;

    }

    public GenericItem getElementInfoForTechnicalSupportContactInfo(Integer elementId) {
        TechnicalSupportContactInfo technicalSupportContactInfo = technicalSupportContactInfoRepository.findOne(elementId);
        if (technicalSupportContactInfo == null || technicalSupportContactInfo.isArchived())
            throw new ExecException("Technical Support Contact Info with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(technicalSupportContactInfo);

        return response;
    }

    public GenericItem getElementInfoForShieldElementGroup(Integer elementId) {
        ShieldElementGroup shieldElementGroup = shieldElementGroupRepository.findOne(elementId);
        if (shieldElementGroup == null || shieldElementGroup.isArchived())
            throw new ExecException("Shield Element Group with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shieldElementGroup);

        return response;
    }

    public GenericItem getElementInfoForSceGroup(Integer elementId) {
        SceGroup sceGroup = sceGroupRepository.findOne(elementId);
        if (sceGroup == null || sceGroup.isArchived())
            throw new ExecException("Security Control Expression Group with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(sceGroup);

        return response;
    }

    public GenericItem getElementInfoForAssetGroup(Integer elementId) {
        AssetGroup assetGroup = assetGroupRepository.findOne(elementId);
        if (assetGroup == null || assetGroup.isArchived())
            throw new ExecException("Asset Group with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(assetGroup);

        return response;
    }

    public GenericItem getElementInfoForAssetTypeGroup(Integer elementId) {
        AssetTypeGroup assetTypeGroup = assetTypeGroupRepository.findOne(elementId);
        if (assetTypeGroup == null || assetTypeGroup.isArchived())
            throw new ExecException("Asset Type Group with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(assetTypeGroup);

        return response;
    }

    public GenericItem getElementInfoForProviderGroup(Integer elementId) {
        ProviderGroup providerGroup = providerGroupRepository.findOne(elementId);
        if (providerGroup == null || providerGroup.isArchived())
            throw new ExecException("Provider Group with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(providerGroup);

        return response;
    }

    public GenericItem getElementInfoForShieldElementType(Integer elementId) {
        ShieldElementType shieldElementType = shieldElementTypeRepository.findOne(elementId);
        if (shieldElementType == null || shieldElementType.isArchived())
            throw new ExecException("Shield Element Type with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shieldElementType);

        return response;
    }

    public LinkElementInfoResponse getElementInfoForAssetDeliveSce(Integer linkId) {
        AssetDeliversSce assetDeliversSce = assetDeliversSceRepository.findOne(linkId);
        if (assetDeliversSce == null || assetDeliversSce.isArchived())
            throw new ExecException("Asset Delivers Sce Link with Id " + linkId + " not found");

        LinkElementInfoResponse genericItem = new LinkElementInfoResponse();
        genericItem.setLinkId(linkId);

        switch (assetDeliversSce.getShallCould()) {
            case ProtectionType.COULD:
                genericItem.setLinkType(ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK_COULD);
                genericItem.setLinkName(LinkName.ASSET_TO_EXPRESSION_COULD);
                break;
            case ProtectionType.SHALL:
                genericItem.setLinkType(ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK);
                genericItem.setLinkName(LinkName.ASSET_TO_EXPRESSION);
                break;
            default:
                throw new ExecException("Unknown protection type for asset type " + assetDeliversSce.getShallCould());
        }

        genericItem.setExpression(genericItemPOJOBuilder.buildGenericPOJO(assetDeliversSce.getSce()));
        genericItem.setOtherPeer(genericItemPOJOBuilder.buildGenericPOJO(assetDeliversSce.getAsset()));
        return genericItem;

    }

    public LinkElementInfoResponse getElementInfoForAssetTypeProtectedBySce(Integer linkId) {
        AssetTypeProtectedBySce assetTypeProtectedBySce = assetTypeProtectedBySceRepository.findOne(linkId);
        if (assetTypeProtectedBySce == null || assetTypeProtectedBySce.isArchived())
            throw new ExecException("Asset Type Protected By Sce Link with Id " + linkId + " not found");

        LinkElementInfoResponse genericItem = new LinkElementInfoResponse();
        genericItem.setLinkId(linkId);

        switch (assetTypeProtectedBySce.getShallCouldIs()) {
            case ProtectionType.COULD:
                genericItem.setLinkType(ObjectTypeConstants.ASSET_TYPE_TO_EXPRESSION_LINK_COULD);
                genericItem.setLinkName(LinkName.ASSET_TYPE_TO_EXPRESSION_COULD);
                break;
            /*case ProtectionType.IS:
                genericItem.setLinkTypeAttr(ObjectTypeConstants.ASSET_TYPE_IS_PROTECTED_BY_SCE_LINK);
                genericItem.setLinkNameAttr(LinkName.PROTECTS);
                break;*/
            case ProtectionType.SHALL:
                genericItem.setLinkType(ObjectTypeConstants.ASSET_TYPE_TO_EXPRESSION_LINK);
                genericItem.setLinkName(LinkName.ASSET_TYPE_TO_EXPRESSION);
                break;
            default:
                throw new ExecException("Unknown protection type for asset type " + assetTypeProtectedBySce.getShallCouldIs());
        }

        genericItem.setExpression(genericItemPOJOBuilder.buildGenericPOJO(assetTypeProtectedBySce.getSce()));
        genericItem.setOtherPeer(genericItemPOJOBuilder.buildGenericPOJO(assetTypeProtectedBySce.getAssetType()));
        return genericItem;
    }

    public LinkElementInfoResponse getElementInfoForSceFulfillsSce(Integer linkId) {

        SceFulfillsShieldElement sceFulfillsShieldElement = sceFulfillsShieldElementRepository.findOne(linkId);
        if (sceFulfillsShieldElement == null || sceFulfillsShieldElement.isArchived())
            throw new ExecException("Sce Fulfills Shield Element Link with Id " + linkId + " not found");

        LinkElementInfoResponse genericItem = new LinkElementInfoResponse();
        genericItem.setLinkId(linkId);

        genericItem.setLinkType(ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK);
        genericItem.setLinkName(LinkName.ELEMENT_TO_EXPRESSION);

        genericItem.setExpression(genericItemPOJOBuilder.buildGenericPOJO(sceFulfillsShieldElement.getSce()));
        genericItem.setOtherPeer(genericItemPOJOBuilder.buildGenericPOJO(sceFulfillsShieldElement.getShieldElement()));
        return genericItem;
    }

    public LinkElementInfoResponse getElementInfoForDirectAssetToShieldElementLink(Integer linkId) {
        AssetToShieldElementMap assetToShieldElementMap = assetToShieldElementMapRepository.findOne(linkId);
        if (assetToShieldElementMap == null || assetToShieldElementMap.isArchived())
            throw new ExecException("Asset To Shield Element Map Link with Id " + linkId + " not found");

        LinkElementInfoResponse genericItem = new LinkElementInfoResponse();
        genericItem.setLinkId(linkId);

        ShieldElement element = assetToShieldElementMap.getShieldElement();
        genericItem.setLinkType(ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK);
        genericItem.setLinkName(linkNameHelper.getLinkName(ObjectTypeConstants.ASSET, linkNameHelper.getObjectTypeForElement(element)));

        genericItem.setDirectPeerOne(genericItemPOJOBuilder.buildGenericPOJO(assetToShieldElementMap.getAsset()));
        genericItem.setOtherPeer(genericItemPOJOBuilder.buildGenericPOJO(element));
        return genericItem;
    }

    public LinkElementInfoResponse getElementInfoForDirectAssetTypeToShieldElementLink(Integer linkId) {
        AssetTypeToShieldElementMap assetTypeToShieldElementMap = assetTypeToShieldElementMapRepository.findOne(linkId);
        if (assetTypeToShieldElementMap == null || assetTypeToShieldElementMap.isArchived())
            throw new ExecException("Asset Type To Shield Element Map Link with Id " + linkId + " not found");

        LinkElementInfoResponse genericItem = new LinkElementInfoResponse();
        genericItem.setLinkId(linkId);

        ShieldElement element = assetTypeToShieldElementMap.getShieldElement();

        genericItem.setLinkType(ObjectTypeConstants.ASSET_TYPE_TO_SHIELD_ELEMENT_LINK);
        genericItem.setLinkName(linkNameHelper.getLinkName(ObjectTypeConstants.ASSET_TYPE, linkNameHelper.getObjectTypeForElement(element)));

        genericItem.setDirectPeerOne(genericItemPOJOBuilder.buildGenericPOJO(assetTypeToShieldElementMap.getAssetType()));
        genericItem.setOtherPeer(genericItemPOJOBuilder.buildGenericPOJO(element));
        return genericItem;
    }

    public LinkElementInfoResponse getElementInfoForDirectElementToElementLink(Integer linkId) {
        ShieldElementToShieldElementMap shieldElementToShieldElementMap = shieldElementToShieldElementMapRepository.findOne(linkId);
        if (shieldElementToShieldElementMap == null || shieldElementToShieldElementMap.isArchived())
            throw new ExecException("Shield Element To Shield Element Map Link with Id " + linkId + " not found");

        LinkElementInfoResponse genericItem = new LinkElementInfoResponse();
        genericItem.setLinkId(linkId);
        ShieldElement element1 = shieldElementToShieldElementMap.getShieldElementOne();
        ShieldElement element2 = shieldElementToShieldElementMap.getShieldElementTwo();

        genericItem.setLinkType(ObjectTypeConstants.SHIELD_ELEMENT_TO_SHIELD_ELEMENT_LINK);
        genericItem.setLinkName(linkNameHelper.getLinkName(linkNameHelper.getObjectTypeForElement(element1), linkNameHelper.getObjectTypeForElement(element2)));

        genericItem.setDirectPeerOne(genericItemPOJOBuilder.buildGenericPOJO(element1));
        genericItem.setOtherPeer(genericItemPOJOBuilder.buildGenericPOJO(element2));
        return genericItem;
    }

    public GenericItem getElementInfoForPerspective(Integer elementId) {
        CustomPerspective perspective = customPerspectiveRepository.findOne(elementId);
        if (perspective == null || perspective.isArchived())
            throw new ExecException("Perspective with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(perspective);

        return response;
    }

    public GenericItem getElementInfoForAssetDeliversAttribute(Integer elementId) {
        AssetDeliversSceRTAttribute attribute = assetDeliversSceRTAttributeRepository.findOne(elementId);
        if (attribute == null || attribute.isArchived())
            throw new ExecException("Asset Delivers Attribute with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);

        return response;
    }

    public GenericItem getElementInfoForAssetImplementsAttribute(Integer elementId) {
        AssetImplementsElementRTAttribute attribute = assetImplementsElementRTAttributeRepository.findOne(elementId);
        if (attribute == null || attribute.isArchived())
            throw new ExecException("Asset Implements Attribute with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);

        return response;
    }

    public GenericItem getElementInfoForAssetDeliversLibraryAttribute(Integer elementId) {
        AssetDeliversSceRTLibraryAttribute attribute = assetDeliversSceRTLibraryAttributeRepository.findOne(elementId);
        if (attribute == null || attribute.isArchived())
            throw new ExecException("Asset Delivers Library Attribute with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);

        return response;
    }

    public GenericItem getElementInfoForAssetImplementsLibraryAttribute(Integer elementId) {
        AssetImplementsElementRTLibraryAttribute attribute = assetImplementsElementRTLibraryAttributeRepository.findOne(elementId);
        if (attribute == null || attribute.isArchived())
            throw new ExecException("Asset Implements Library Attribute with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);

        return response;
    }

    public GenericItem getElementInfoForAssetDeliversAttributeRating(Integer elementId) {
        AssetDeliversSceRTRating attributeRating = assetDeliversSceRTRatingRepository.findOne(elementId);
        if (attributeRating == null)
            throw new ExecException("Asset Delivers Attribute Rating with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attributeRating);

        return response;
    }

    public GenericItem getElementInfoForAssetImplementsAttributeRating(Integer elementId) {
        AssetImplementsElementRTRating attributeRating = assetImplementsElementRTRatingRepository.findOne(elementId);
        if (attributeRating == null)
            throw new ExecException("Asset Implements Attribute Rating with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attributeRating);

        return response;
    }

    public GenericItem getElementInfoForShieldElementAttributeRating(Integer elementId) {
        ShieldElementRTRating attributeRating = shieldElementRTRatingRepository.findOne(elementId);
        if (attributeRating == null)
            throw new ExecException("Shield Element Attribute Rating with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attributeRating);

        return response;
    }

    public GenericItem getElementInfoForShieldElementLibraryAttribute(Integer elementId) {
        ShieldElementRTLibraryAttribute attribute = shieldElementRTLibraryAttributeRepository.findOne(elementId);
        if (attribute == null || attribute.isArchived())
            throw new ExecException("Shield Element Library Attribute with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);

        return response;
    }

    public GenericItem getElementInfoForShieldElementAttribute(Integer elementId) {
        ShieldElementRTAttribute attribute = shieldElementRTAttributeRepository.findOne(elementId);
        if (attribute == null || attribute.isArchived())
            throw new ExecException("Shield Element Attribute with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);

        return response;
    }

    public GenericItem getElementInfoForArtifact(Integer elementId) {
        Artifact attribute = artifactRepository.findOne(elementId);
        if (attribute == null || attribute.isArchived())
            throw new ExecException("Artifact with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);

        return response;
    }

    public GenericItem getElementInfoForUser(Integer elementId) {
        SphericUser sphericUser = sphericUserRepository.findOne(elementId);
        if (sphericUser == null || sphericUser.isArchived())
            throw new ExecException("Spheric User with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(sphericUser);

        return response;
    }

    public GenericItem getElementInfoForUserRole(Integer elementId) {
        UserRole userRole = userRoleRepository.findOne(elementId);
        if (userRole == null || userRole.isArchived())
            throw new ExecException("User Role with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(userRole);

        return response;
    }

    public GenericItem getElementInfoForIngestSource(Integer elementId) {
        IngestSource ingestSource = ingestSourceRepository.findOne(elementId);
        if (ingestSource == null || ingestSource.isArchived())
            throw new ExecException("Ingest Source with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(ingestSource);

        return response;
    }

    public GenericItem getElementInfoForTestProcedure(Integer elementId) {
        TestProcedure testProcedure = testProcedureRepository.findOne(elementId);
        if (testProcedure == null || testProcedure.isArchived())
            throw new ExecException("Test Procedure with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(testProcedure);

        return response;
    }

    public GenericItem getElementInfoForGuidance(Integer elementId) {
        Guidance guidance = guidanceRepository.findOne(elementId);
        if (guidance == null || guidance.isArchived())
            throw new ExecException("Guidance with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(guidance);

        return response;
    }

    public GenericItem getElementInfoForBusinessAssetType(Integer elementId) {
        return genericItemPOJOBuilder.buildGenericPOJO(getWithIdHelper.getBusinessAssetType(elementId));
    }

    public GenericItem getElementInfoForBusinessAsset(Integer elementId) {
        return genericItemPOJOBuilder.buildGenericPOJO(getWithIdHelper.getBusinessAsset(elementId));
    }

    public GenericItem getElementInfoForBusinessProvider(Integer elementId) {
        return genericItemPOJOBuilder.buildGenericPOJO(getWithIdHelper.getBusinessProvider(elementId));
    }

    public GenericItem getElementInfoForBusinessAssetGroup(Integer elementId) {
        return genericItemPOJOBuilder.buildGenericPOJO(getWithIdHelper.getBusinessAssetGroup(elementId));
    }

    public GenericItem getElementInfoForBusinessAssetTypeGroup(Integer elementId) {
        return genericItemPOJOBuilder.buildGenericPOJO(getWithIdHelper.getBusinessAssetTypeGroup(elementId));
    }

    public GenericItem getElementInfoForBusinessProviderGroup(Integer elementId) {
        return genericItemPOJOBuilder.buildGenericPOJO(getWithIdHelper.getBusinessProviderGroup(elementId));
    }

    public LinkElementInfoResponse getElementInfoForBusinessAssetToExpressionLink(Integer linkId) {
        BusinessAssetToExpressionLink businessAssetToExpressionLink = businessAssetToExpressionLinkRepository.findOne(linkId);
        if (businessAssetToExpressionLink == null || businessAssetToExpressionLink.isArchived())
            throw new ExecException("BusinessAssetToExpressionLink with Id " + linkId + " not found");

        LinkElementInfoResponse genericItem = new LinkElementInfoResponse();
        genericItem.setLinkId(linkId);

        switch (businessAssetToExpressionLink.getShallCould()) {
            case ProtectionType.COULD:
                genericItem.setLinkType(ObjectTypeConstants.BUSINESS_ASSET_TO_EXPRESSION_LINK_COULD);
                genericItem.setLinkName(LinkName.BUSINESS_ASSET_TO_EXPRESSION_COULD);
                break;
            case ProtectionType.SHALL:
                genericItem.setLinkType(ObjectTypeConstants.BUSINESS_ASSET_TO_EXPRESSION_LINK);
                genericItem.setLinkName(LinkName.BUSINESS_ASSET_TO_EXPRESSION);
                break;
            default:
                throw new ExecException("Unknown protection type for asset type " + businessAssetToExpressionLink.getShallCould());
        }

        genericItem.setExpression(genericItemPOJOBuilder.buildGenericPOJO(businessAssetToExpressionLink.getSce()));
        genericItem.setOtherPeer(genericItemPOJOBuilder.buildGenericPOJO(businessAssetToExpressionLink.getBusinessAsset()));
        return genericItem;
    }

    public LinkElementInfoResponse getElementInfoForBusinessAssetTypeToExpressionLink(Integer linkId) {
        BusinessAssetTypeToExpressionLink businessAssetTypeToExpressionLink = businessAssetTypeToExpressionLinkRepository.findOne(linkId);
        if (businessAssetTypeToExpressionLink == null || businessAssetTypeToExpressionLink.isArchived())
            throw new ExecException("BusinessAssetTypeToExpressionLink with Id " + linkId + " not found");

        LinkElementInfoResponse genericItem = new LinkElementInfoResponse();
        genericItem.setLinkId(linkId);

        switch (businessAssetTypeToExpressionLink.getShallCouldIs()) {
            case ProtectionType.COULD:
                genericItem.setLinkType(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_EXPRESSION_LINK_COULD);
                genericItem.setLinkName(LinkName.BUSINESS_ASSET_TYPE_TO_EXPRESSION_COULD);
                break;
            case ProtectionType.SHALL:
                genericItem.setLinkType(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_EXPRESSION_LINK);
                genericItem.setLinkName(LinkName.BUSINESS_ASSET_TYPE_TO_EXPRESSION);
                break;
            default:
                throw new ExecException("Unknown protection type for asset type " + businessAssetTypeToExpressionLink.getShallCouldIs());
        }

        genericItem.setExpression(genericItemPOJOBuilder.buildGenericPOJO(businessAssetTypeToExpressionLink.getSce()));
        genericItem.setOtherPeer(genericItemPOJOBuilder.buildGenericPOJO(businessAssetTypeToExpressionLink.getBusinessAssetType()));
        return genericItem;
    }

    public LinkElementInfoResponse getElementInfoForBusinessAssetToShieldElementLink(Integer linkId) {
        BusinessAssetToShieldElementMap assetToShieldElementMap = businessAssetToShieldElementMapRepository.findOne(linkId);
        if (assetToShieldElementMap == null || assetToShieldElementMap.isArchived())
            throw new ExecException("Business Asset To Shield Element Map Link with Id " + linkId + " not found");

        LinkElementInfoResponse genericItem = new LinkElementInfoResponse();
        genericItem.setLinkId(linkId);

        ShieldElement element = assetToShieldElementMap.getShieldElement();
        genericItem.setLinkType(ObjectTypeConstants.BUSINESS_ASSET_TO_SHIELD_ELEMENT_LINK);
        genericItem.setLinkName(linkNameHelper.getLinkName(ObjectTypeConstants.BUSINESS_ASSET, linkNameHelper.getObjectTypeForElement(element)));

        genericItem.setDirectPeerOne(genericItemPOJOBuilder.buildGenericPOJO(assetToShieldElementMap.getBusinessAsset()));
        genericItem.setOtherPeer(genericItemPOJOBuilder.buildGenericPOJO(element));
        return genericItem;
    }

    public LinkElementInfoResponse getElementInfoForBusinessAssetTypeToShieldElementLink(Integer linkId) {
        BusinessAssetTypeToShieldElementMap assetTypeToShieldElementMap = businessAssetTypeToShieldElementMapRepository.findOne(linkId);
        if (assetTypeToShieldElementMap == null || assetTypeToShieldElementMap.isArchived())
            throw new ExecException("Business Asset Type To Shield Element Map Link with Id " + linkId + " not found");

        LinkElementInfoResponse genericItem = new LinkElementInfoResponse();
        genericItem.setLinkId(linkId);

        ShieldElement element = assetTypeToShieldElementMap.getShieldElement();
        genericItem.setLinkType(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_SHIELD_ELEMENT_LINK);
        genericItem.setLinkName(linkNameHelper.getLinkName(ObjectTypeConstants.BUSINESS_ASSET_TYPE, linkNameHelper.getObjectTypeForElement(element)));

        genericItem.setDirectPeerOne(genericItemPOJOBuilder.buildGenericPOJO(assetTypeToShieldElementMap.getBusinessAssetType()));
        genericItem.setOtherPeer(genericItemPOJOBuilder.buildGenericPOJO(element));
        return genericItem;
    }
}
