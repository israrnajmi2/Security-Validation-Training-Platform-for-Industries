package com.ss.controller;

import com.ss.constants.MiscellaneousActionConstants;
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
import com.ss.domain.sce.SceFulfillsShieldElement;
import com.ss.domain.sce.SecurityControlExpression;
import com.ss.domain.shieldclassification.*;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.domain.usermanagement.SphericUser;
import com.ss.domain.usermanagement.UserRole;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.artifact.ArtifactRepository;
import com.ss.service.delete.DeleteHelperService;
import com.ss.service.permissions.PermissionCheckerService;
import com.ss.utils.GenericItemPOJOBuilder;
import com.ss.utils.GetWithIdHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/rest/delete")
public class DeleteController {

    @Autowired
    private DeleteHelperService deleteHelperService;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GetWithIdHelper getWithIdHelper;

    @Autowired
    private ArtifactRepository artifactRepository;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    @RequestMapping(value = "/{objectType}/{elementId}", method = RequestMethod.DELETE)
    public ResponseEntity<GenericItem> deleteRecord(@PathVariable("objectType") String objectType, @PathVariable("elementId") Integer elementId) {

        if (!haveDeletePermission(objectType))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (elementId == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Please pass elementId parameter", HttpStatus.BAD_REQUEST);
        if (objectType == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Please pass objectType parameter", HttpStatus.BAD_REQUEST);

        GenericItem genericItem = null;

        switch (objectType) {
            case ObjectTypeConstants.SHIELD:
                Shield shield = getWithIdHelper.getShield(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(shield);
                deleteHelperService.deleteShield(shield);
                break;
            case ObjectTypeConstants.STANDARD:
                Shield standard = getWithIdHelper.getShield(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(standard);
                deleteHelperService.deleteShield(standard);
                break;
            case ObjectTypeConstants.BUSINESS_FRAMEWORK:
                Shield businessFrameworks = getWithIdHelper.getShield(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(businessFrameworks);
                deleteHelperService.deleteShield(businessFrameworks);
                break;
            case ObjectTypeConstants.THREAT_FRAMEWORK:
                Shield threatFramework = getWithIdHelper.getShield(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(threatFramework);
                deleteHelperService.deleteShield(threatFramework);
                break;
            case ObjectTypeConstants.SHIELD_TYPE:
                ShieldType shieldType = getWithIdHelper.getShieldType(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldType);
                deleteHelperService.deleteShieldType(shieldType);
                break;
            case ObjectTypeConstants.SHIELD_ELEMENT_TYPE:
                ShieldElementType shieldElementType = getWithIdHelper.getShieldElementType(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElementType);
                deleteHelperService.deleteShieldElementType(shieldElementType);
                break;
            case ObjectTypeConstants.STANDARD_ELEMENT_TYPE:
                ShieldElementType standardElementType = getWithIdHelper.getShieldElementType(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(standardElementType);
                deleteHelperService.deleteShieldElementType(standardElementType);
                break;
            case ObjectTypeConstants.BUSINESS_CONTROL_TYPE:
                ShieldElementType businessControlType = getWithIdHelper.getShieldElementType(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(businessControlType);
                deleteHelperService.deleteShieldElementType(businessControlType);
                break;
            case ObjectTypeConstants.THREAT_ELEMENT_TYPE:
                ShieldElementType threatElementType = getWithIdHelper.getShieldElementType(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(threatElementType);
                deleteHelperService.deleteShieldElementType(threatElementType);
                break;
            case ObjectTypeConstants.SHIELD_ELEMENT:
                ShieldElement shieldElement = getWithIdHelper.getShieldElement(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElement);
                deleteHelperService.deleteShieldElement(shieldElement);
                break;
            case ObjectTypeConstants.STANDARD_ELEMENT:
                ShieldElement standardElement = getWithIdHelper.getShieldElement(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(standardElement);
                deleteHelperService.deleteShieldElement(standardElement);
                break;
            case ObjectTypeConstants.BUSINESS_CONTROL:
                ShieldElement businessControl = getWithIdHelper.getShieldElement(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(businessControl);
                deleteHelperService.deleteShieldElement(businessControl);
                break;
            case ObjectTypeConstants.THREAT_ELEMENT:
                ShieldElement threatElement = getWithIdHelper.getShieldElement(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(threatElement);
                deleteHelperService.deleteShieldElement(threatElement);
                break;
            case ObjectTypeConstants.SCE:
                SecurityControlExpression securityControlExpression = getWithIdHelper.getSce(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(securityControlExpression);
                deleteHelperService.deleteSecurityControlExpression(securityControlExpression);
                break;
            case ObjectTypeConstants.ORGANIZATIONAL_UNIT:
                OrganizationalUnit organizationalUnit = getWithIdHelper.getOrganizationalUnit(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(organizationalUnit);
                deleteHelperService.deleteOrganizationalUnit(organizationalUnit);
                break;
            case ObjectTypeConstants.OBJECTIVE_PARAMETER:
                ObjectiveParameterWord objectiveParameterWord = getWithIdHelper.getObjectiveParameter(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(objectiveParameterWord);
                deleteHelperService.deleteObjectiveParameter(objectiveParameterWord);
                break;
            case ObjectTypeConstants.METHOD_PARAMETER:
                MethodParameterWord methodParameterWord = getWithIdHelper.getMethodParameter(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(methodParameterWord);
                deleteHelperService.deleteMethodParameter(methodParameterWord);
                break;
            case ObjectTypeConstants.CONTENT_PARAMETER:
                ContentParameterWord contentParameterWord = getWithIdHelper.getContentParameter(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(contentParameterWord);
                deleteHelperService.deleteContentParameter(contentParameterWord);
                break;
            case ObjectTypeConstants.SUBJECT_PARAMETER:
                SubjectParameterWord subjectParameterWord = getWithIdHelper.getSubjectParameter(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(subjectParameterWord);
                deleteHelperService.deleteSubjectParameter(subjectParameterWord);
                break;
            case ObjectTypeConstants.ASSET_TYPE:
                AssetType assetType = getWithIdHelper.getAssetType(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetType);
                deleteHelperService.deleteAssetType(assetType);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE:
                BusinessAssetType businessAssetType = getWithIdHelper.getBusinessAssetType(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(businessAssetType);
                deleteHelperService.deleteBusinessAssetType(businessAssetType);
                break;
            case ObjectTypeConstants.ASSET:
                Asset asset = getWithIdHelper.getAsset(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(asset);
                deleteHelperService.deleteAsset(asset);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET:
                BusinessAsset businessAsset = getWithIdHelper.getBusinessAsset(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(businessAsset);
                deleteHelperService.deleteBusinessAsset(businessAsset);
                break;
            case ObjectTypeConstants.TECHNICAL_SUPPORT_PEOPLE:
                TechnicalSupport technicalSupport = getWithIdHelper.getTechnicalSupport(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(technicalSupport);
                deleteHelperService.deleteTechnicalSupport(technicalSupport);
                break;
            case ObjectTypeConstants.PROVIDER:
                ProviderInfo providerInfo = getWithIdHelper.getProvider(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(providerInfo);
                deleteHelperService.deleteProvider(providerInfo);
                break;
            case ObjectTypeConstants.BUSINESS_PROVIDER:
                BusinessProvider businessProvider = getWithIdHelper.getBusinessProvider(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(businessProvider);
                deleteHelperService.deleteBusinessProvider(businessProvider);
                break;
            case ObjectTypeConstants.TECHNICAL_SUPPORT_CONTACT_INFO:
                TechnicalSupportContactInfo technicalSupportContactInfo = getWithIdHelper.getTechnicalSupportContactInfo(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(technicalSupportContactInfo);
                deleteHelperService.deleteTechnicalSupportContactInfo(technicalSupportContactInfo);
                break;
            case ObjectTypeConstants.SHIELD_ELEMENT_GROUP:
                ShieldElementGroup shieldElementGroup = getWithIdHelper.getShieldElementGroup(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElementGroup);
                deleteHelperService.deleteShieldElementGroup(shieldElementGroup);
                break;
            case ObjectTypeConstants.SCE_GROUP:
                SceGroup sceGroup = getWithIdHelper.getSceGroup(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(sceGroup);
                deleteHelperService.deleteSceGroup(sceGroup);
                break;
            case ObjectTypeConstants.ASSET_GROUP:
                AssetGroup assetGroup = getWithIdHelper.getAssetGroup(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetGroup);
                deleteHelperService.deleteAssetGroup(assetGroup);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_GROUP:
                BusinessAssetGroup businessAssetGroup = getWithIdHelper.getBusinessAssetGroup(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(businessAssetGroup);
                deleteHelperService.deleteBusinessAssetGroup(businessAssetGroup);
                break;
            case ObjectTypeConstants.ASSET_TYPE_GROUP:
                AssetTypeGroup assetTypeGroup = getWithIdHelper.getAssetTypeGroup(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetTypeGroup);
                deleteHelperService.deleteAssetTypeGroup(assetTypeGroup);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE_GROUP:
                BusinessAssetTypeGroup businessAssetTypeGroup = getWithIdHelper.getBusinessAssetTypeGroup(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(businessAssetTypeGroup);
                deleteHelperService.deleteBusinessAssetTypeGroup(businessAssetTypeGroup);
                break;
            case ObjectTypeConstants.PROVIDER_GROUP:
                ProviderGroup providerGroup = getWithIdHelper.getProviderGroup(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(providerGroup);
                deleteHelperService.deleteProviderGroup(providerGroup);
                break;
            case ObjectTypeConstants.BUSINESS_PROVIDER_GROUP:
                BusinessProviderGroup businessProviderGroup = getWithIdHelper.getBusinessProviderGroup(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(businessProviderGroup);
                deleteHelperService.deleteBusinessProviderGroup(businessProviderGroup);
                break;
            case ObjectTypeConstants.PERSPECTIVE:
                CustomPerspective customPerspective = getWithIdHelper.getPerspective(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(customPerspective);
                deleteHelperService.deleteCustomPerspective(customPerspective);
                break;
            case ObjectTypeConstants.ASSET_DELIVERS_ATTRIBUTE:
                AssetDeliversSceRTAttribute assetDeliversSceRTAttribute = getWithIdHelper.getAssetDeliversSceRTAttribute(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetDeliversSceRTAttribute);
                deleteHelperService.deleteAssetDeliversSceRTAttribute(assetDeliversSceRTAttribute);
                break;
            case ObjectTypeConstants.ASSET_IMPLEMENTS_ATTRIBUTE:
                AssetImplementsElementRTAttribute assetImplementsElementRTAttribute = getWithIdHelper.getAssetImplementsElementRTAttribute(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetImplementsElementRTAttribute);
                deleteHelperService.deleteAssetImplementsElementRTAttribute(assetImplementsElementRTAttribute);
                break;
            case ObjectTypeConstants.SHIELD_ELEMENT_RT_ATTRIBUTE:
                ShieldElementRTAttribute shieldElementRTAttribute = getWithIdHelper.getShieldElementRTAttribute(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElementRTAttribute);
                deleteHelperService.deleteShieldElementRTAttribute(shieldElementRTAttribute);
                break;
            case ObjectTypeConstants.ASSET_DELIVERS_LIBRARY_ATTRIBUTE:
                AssetDeliversSceRTLibraryAttribute assetDeliversSceRTLibraryAttribute = getWithIdHelper.getAssetDeliversSceRTLibraryAttribute(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetDeliversSceRTLibraryAttribute);
                deleteHelperService.deleteAssetDeliversSceRTLibraryAttribute(assetDeliversSceRTLibraryAttribute);
                break;
            case ObjectTypeConstants.ASSET_IMPLEMENTS_LIBRARY_ATTRIBUTE:
                AssetImplementsElementRTLibraryAttribute assetImplementsElementRTLibraryAttribute = getWithIdHelper.getAssetImplementsElementRTLibraryAttribute(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetImplementsElementRTLibraryAttribute);
                deleteHelperService.deleteAssetImplementsElementRTLibraryAttribute(assetImplementsElementRTLibraryAttribute);
                break;
            case ObjectTypeConstants.SHIELD_ELEMENT_LIBRARY_ATTRIBUTE:
                ShieldElementRTLibraryAttribute shieldElementLibraryAttribute = getWithIdHelper.getShieldElementLibraryAttribute(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElementLibraryAttribute);
                deleteHelperService.deleteShieldElementRTLibraryAttribute(shieldElementLibraryAttribute);
                break;
            case ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK:
                SceFulfillsShieldElement sceFulfillsShieldElement = getWithIdHelper.getSceFulfillsShieldElement(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(sceFulfillsShieldElement);
                deleteHelperService.deleteSceFulfillsShieldElement(sceFulfillsShieldElement);
                break;
            case ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK: {
                AssetDeliversSce assetDeliversSce = getWithIdHelper.getAssetDeliverssce(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetDeliversSce);
                deleteHelperService.deleteAssetDeliversSce(assetDeliversSce);
            }
            break;
            case ObjectTypeConstants.BUSINESS_ASSET_TO_EXPRESSION_LINK: {
                BusinessAssetToExpressionLink businessAssetToExpressionLink = getWithIdHelper.getBusinessAssetToExpressionLink(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(businessAssetToExpressionLink);
                deleteHelperService.deleteBusinessAssetToExpressionLink(businessAssetToExpressionLink);
            }
            break;
            case ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK_COULD: {
                AssetDeliversSce assetDeliversSce = getWithIdHelper.getAssetDeliverssce(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetDeliversSce);
                deleteHelperService.deleteAssetDeliversSce(assetDeliversSce);
            }
            break;
            case ObjectTypeConstants.BUSINESS_ASSET_TO_EXPRESSION_LINK_COULD: {
                BusinessAssetToExpressionLink businessAssetToExpressionLink = getWithIdHelper.getBusinessAssetToExpressionLink(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(businessAssetToExpressionLink);
                deleteHelperService.deleteBusinessAssetToExpressionLink(businessAssetToExpressionLink);
            }
            break;
            case ObjectTypeConstants.ASSET_TYPE_TO_EXPRESSION_LINK: {
                AssetTypeProtectedBySce assetTypeProtectedBySce = getWithIdHelper.getAssetTypeProtectedBySce(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetTypeProtectedBySce);
                deleteHelperService.deleteAssetTypeProtectedBySce(assetTypeProtectedBySce);
            }
            break;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_EXPRESSION_LINK: {
                BusinessAssetTypeToExpressionLink businessAssetTypeToExpressionLink = getWithIdHelper.getBusinessAssetTypeToExpressionLink(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(businessAssetTypeToExpressionLink);
                deleteHelperService.deleteBusinessAssetTypeToExpressionLink(businessAssetTypeToExpressionLink);
            }
            break;
            case ObjectTypeConstants.ASSET_TYPE_TO_EXPRESSION_LINK_COULD: {
                AssetTypeProtectedBySce assetTypeProtectedBySce = getWithIdHelper.getAssetTypeProtectedBySce(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetTypeProtectedBySce);
                deleteHelperService.deleteAssetTypeProtectedBySce(assetTypeProtectedBySce);
            }
            break;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_EXPRESSION_LINK_COULD: {
                BusinessAssetTypeToExpressionLink businessAssetTypeToExpressionLink = getWithIdHelper.getBusinessAssetTypeToExpressionLink(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(businessAssetTypeToExpressionLink);
                deleteHelperService.deleteBusinessAssetTypeToExpressionLink(businessAssetTypeToExpressionLink);
            }
            break;
            case ObjectTypeConstants.ASSET_TYPE_TO_SHIELD_ELEMENT_LINK: {
                AssetTypeToShieldElementMap assetTypeToShieldElementMap = getWithIdHelper.getAssetTypeToShieldElementMap(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetTypeToShieldElementMap);
                deleteHelperService.deleteAssetTypeToShieldElementMap(assetTypeToShieldElementMap);
            }
            break;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_SHIELD_ELEMENT_LINK: {
                BusinessAssetTypeToShieldElementMap businessAssetTypeToShieldElementMap = getWithIdHelper.getBusinessAssetTypeToShieldElementMap(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(businessAssetTypeToShieldElementMap);
                deleteHelperService.deleteBusinessAssetTypeToShieldElementMap(businessAssetTypeToShieldElementMap);
            }
            break;
            case ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK: {
                AssetToShieldElementMap assetToShieldElementMap = getWithIdHelper.getAssetToShieldElementMap(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetToShieldElementMap);
                deleteHelperService.deleteAssetToShieldElementMap(assetToShieldElementMap);
            }
            break;
            case ObjectTypeConstants.BUSINESS_ASSET_TO_SHIELD_ELEMENT_LINK: {
                BusinessAssetToShieldElementMap businessAssetToShieldElementMap = getWithIdHelper.getBusinessAssetToShieldElementMap(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(businessAssetToShieldElementMap);
                deleteHelperService.deleteBusinessAssetToShieldElementMap(businessAssetToShieldElementMap);
            }
            break;
            case ObjectTypeConstants.SHIELD_ELEMENT_TO_SHIELD_ELEMENT_LINK: {
                ShieldElementToShieldElementMap shieldElementToShieldElementMap = getWithIdHelper.getShieldElementToShieldElementMap(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElementToShieldElementMap);
                deleteHelperService.deleteShieldElementToShieldElementMap(shieldElementToShieldElementMap);
            }
            break;
            case ObjectTypeConstants.ARTIFACT:
                Artifact artifact = getWithIdHelper.getArtifact(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(artifact);
                deleteHelperService.deleteArtifact(artifact);
                break;
            case ObjectTypeConstants.USER:
                SphericUser user = getWithIdHelper.getUser(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(user);
                deleteHelperService.deleteUser(user);
                break;
            case ObjectTypeConstants.USER_ROLE:
                UserRole userRole = getWithIdHelper.getUserRole(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(userRole);
                deleteHelperService.deleteUserRole(userRole);
                break;
            case ObjectTypeConstants.INGEST_SOURCE:
                IngestSource ingestSource = getWithIdHelper.getIngestSource(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(ingestSource);
                deleteHelperService.deleteIngestSource(ingestSource);
                break;
            case ObjectTypeConstants.GUIDANCE:
                Guidance guidance = getWithIdHelper.getGuidance(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(guidance);
                deleteHelperService.deleteGuidance(guidance);
                break;
            case ObjectTypeConstants.TEST_PROCEDURE:
                TestProcedure testProcedure = getWithIdHelper.getTestProcedure(elementId);
                genericItem = genericItemPOJOBuilder.buildGenericPOJO(testProcedure);
                deleteHelperService.deleteTestProcedure(testProcedure);
                break;
            default:
                return genericItemPOJOBuilder.buildGIErrorResponse("Deletion not implemented for object type " + objectType + " (or) this is unknown object type", HttpStatus.BAD_REQUEST);

        }
        return new ResponseEntity(genericItem, HttpStatus.OK);
    }

    private boolean haveDeletePermission(String objectType) {

        if (objectType.equals(ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK)) {
            return permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_ELEMENT_FULFILLED_BY_EXPRESSION_ASSOCIATION);
        } else if (objectType.equals(ObjectTypeConstants.ASSET_TYPE_TO_EXPRESSION_LINK_COULD)) {
            return permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_ASSET_TYPE_PROTECTED_BY_EXPRESSION_ASSOCIATION);
        } else if (objectType.equals(ObjectTypeConstants.ASSET_TYPE_TO_EXPRESSION_LINK)) {
            return permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_ASSET_TYPE_PROTECTED_BY_EXPRESSION_ASSOCIATION);
        } else if (objectType.equals(ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK_COULD)) {
            return permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_ASSET_DELIVERS_EXPRESSION_ASSOCIATION);
        } else if (objectType.equals(ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK)) {
            return permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_ASSET_DELIVERS_EXPRESSION_ASSOCIATION);
        } else if (objectType.equals(ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK)) {
            return permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_DIRECT_ASSET_IMPLEMENTS_ELEMENT_ASSOCIATION);
        } else if (objectType.equals(ObjectTypeConstants.ASSET_TYPE_TO_SHIELD_ELEMENT_LINK)) {
            return permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_DIRECT_ASSET_TYPE_SECURED_BY_ELEMENT_ASSOCIATION);
        } else if (objectType.equals(ObjectTypeConstants.SHIELD_ELEMENT_TO_SHIELD_ELEMENT_LINK)) {
            return permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_DIRECT_ELEMENT_MAPTO_ELEMENT_ASSOCIATION);
        } else if (objectType.equals(ObjectTypeConstants.APPROVED_USER_ROLE_LINK)) {
            return false;
        } else if (objectType.equals(ObjectTypeConstants.APPROVAL_PENDING_USER_ROLE_LINK)) {
            return false;
        } else if(objectType.endsWith("_link")) {
            return true;
        } else return permissionCheckerService.hasDeletePermission(objectType);

    }
}
