package com.ss.controller;

import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.artifact.Artifact;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.artifact.ArtifactRepository;
import com.ss.service.dataview.DataViewHelper;
import com.ss.service.permissions.PermissionCheckerService;
import com.ss.utils.GenericItemPOJOBuilder;
import com.ss.utils.IdNameObjectConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RestController
@Transactional
@RequestMapping(value = "/rest/dataview")
public class DataViewController {

    @Autowired
    private DataViewHelper dataViewHelper;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private ArtifactRepository artifactRepository;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    @Autowired
    private IdNameObjectConverter idNameObjectConverter;

    @RequestMapping(value = "/get_data_view/{elementId}/{objectType}/{isDirect}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getDataView(@PathVariable("elementId") Integer elementId, @PathVariable("objectType") String objectType,
                                                                                     @PathVariable("isDirect") Boolean isDirect) {

        if (!permissionCheckerService.hasDataviewPermission(objectType))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (elementId == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Please pass elementId parameter", HttpStatus.BAD_REQUEST);
        if (objectType == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Please pass objectType parameter", HttpStatus.BAD_REQUEST);

        GenericItem genericItem = null;

        switch (objectType) {
            case ObjectTypeConstants.STANDARD:
                genericItem = dataViewHelper.getDataViewForShield(elementId, objectType, isDirect);
                break;
            case ObjectTypeConstants.SHIELD:
                genericItem = dataViewHelper.getDataViewForShield(elementId, objectType, isDirect);
                break;
            case ObjectTypeConstants.BUSINESS_FRAMEWORK:
                genericItem = dataViewHelper.getDataViewForShield(elementId, objectType, isDirect);
                break;
            case ObjectTypeConstants.THREAT_FRAMEWORK:
                genericItem = dataViewHelper.getDataViewForShield(elementId, objectType, isDirect);
                break;
            case ObjectTypeConstants.SHIELD_TYPE:
                genericItem = dataViewHelper.getDataViewForShieldType(elementId, isDirect);
                break;
            case ObjectTypeConstants.SHIELD_ELEMENT_TYPE:
                genericItem = dataViewHelper.getDataViewForShieldElementType(elementId, objectType, isDirect);
                break;
            case ObjectTypeConstants.STANDARD_ELEMENT_TYPE:
                genericItem = dataViewHelper.getDataViewForShieldElementType(elementId, objectType, isDirect);
                break;
            case ObjectTypeConstants.BUSINESS_CONTROL_TYPE:
                genericItem = dataViewHelper.getDataViewForShieldElementType(elementId, objectType, isDirect);
                break;
            case ObjectTypeConstants.THREAT_ELEMENT_TYPE:
                genericItem = dataViewHelper.getDataViewForShieldElementType(elementId, objectType, isDirect);
                break;
            case ObjectTypeConstants.SHIELD_ELEMENT:
                genericItem = dataViewHelper.getDataViewForShieldElement(elementId, objectType, isDirect);
                break;
            case ObjectTypeConstants.STANDARD_ELEMENT:
                genericItem = dataViewHelper.getDataViewForShieldElement(elementId, objectType, isDirect);
                break;
            case ObjectTypeConstants.BUSINESS_CONTROL:
                genericItem = dataViewHelper.getDataViewForShieldElement(elementId, objectType, isDirect);
                break;
            case ObjectTypeConstants.THREAT_ELEMENT:
                genericItem = dataViewHelper.getDataViewForShieldElement(elementId, objectType, isDirect);
                break;
            case ObjectTypeConstants.SCE:
                genericItem = dataViewHelper.getDataViewForSCE(elementId, isDirect);
                break;
            case ObjectTypeConstants.ORGANIZATIONAL_UNIT:
                genericItem = dataViewHelper.getDataViewForOrganizationalUnit(elementId, isDirect);
                break;
            case ObjectTypeConstants.OBJECTIVE_PARAMETER:
                genericItem = dataViewHelper.getDataViewForObjectiveParameter(elementId, isDirect);
                break;
            case ObjectTypeConstants.METHOD_PARAMETER:
                genericItem = dataViewHelper.getDataViewForMethodParameter(elementId, isDirect);
                break;
            case ObjectTypeConstants.CONTENT_PARAMETER:
                genericItem = dataViewHelper.getDataViewForContentParameter(elementId, isDirect);
                break;
            case ObjectTypeConstants.SUBJECT_PARAMETER:
                genericItem = dataViewHelper.getDataViewForSubjectParameter(elementId, isDirect);
                break;
            case ObjectTypeConstants.ASSET_TYPE:
                genericItem = dataViewHelper.getDataViewForAssetType(elementId, isDirect);
                break;
            case ObjectTypeConstants.ASSET:
                genericItem = dataViewHelper.getDataViewForAsset(elementId, isDirect);
                break;
            case ObjectTypeConstants.TECHNICAL_SUPPORT_PEOPLE:
                genericItem = dataViewHelper.getDataViewForTechnicalSupportPeople(elementId, isDirect);
                break;
            case ObjectTypeConstants.PROVIDER:
                genericItem = dataViewHelper.getDataViewForProvider(elementId, isDirect);
                break;
            case ObjectTypeConstants.TECHNICAL_SUPPORT_CONTACT_INFO:
                genericItem = dataViewHelper.getDataViewForTechnicalSupportContactInfo(elementId, isDirect);
                break;
            case ObjectTypeConstants.SHIELD_ELEMENT_GROUP:
                genericItem = dataViewHelper.getDataViewForShieldElementGroup(elementId, isDirect);
                break;
            case ObjectTypeConstants.SCE_GROUP:
                genericItem = dataViewHelper.getDataViewForSceGroup(elementId, isDirect);
                break;
            case ObjectTypeConstants.ASSET_GROUP:
                genericItem = dataViewHelper.getDataViewForAssetGroup(elementId, isDirect);
                break;
            case ObjectTypeConstants.ASSET_TYPE_GROUP:
                genericItem = dataViewHelper.getDataViewForAssetTypeGroup(elementId, isDirect);
                break;
            case ObjectTypeConstants.PROVIDER_GROUP:
                genericItem = dataViewHelper.getDataViewForProviderGroup(elementId, isDirect);
                break;
            case ObjectTypeConstants.ARTIFACT:
                genericItem = dataViewHelper.getDataViewForArtifact(elementId, isDirect);
                break;
            case ObjectTypeConstants.ASSET_DELIVERS_ATTRIBUTE:
                genericItem = dataViewHelper.getDataViewForAssetDeliversAttribute(elementId, isDirect);
                break;
            case ObjectTypeConstants.ASSET_IMPLEMENTS_ATTRIBUTE:
                genericItem = dataViewHelper.getDataViewForAssetImplementsAttribute(elementId, isDirect);
                break;
            case ObjectTypeConstants.SHIELD_ELEMENT_RT_ATTRIBUTE:
                genericItem = dataViewHelper.getDataViewForShieldElementAttribute(elementId, isDirect);
                break;
            case ObjectTypeConstants.ASSET_DELIVERS_ATTRIBUTE_RATING:
                genericItem = dataViewHelper.getDataViewForAssetDeliversRating(elementId, isDirect);
                break;
            case ObjectTypeConstants.ASSET_IMPLEMENTS_ATTRIBUTE_RATING:
                genericItem = dataViewHelper.getDataViewForAssetImplementsRating(elementId, isDirect);
                break;
            case ObjectTypeConstants.SHIELD_ELEMENT_RT_ATTRIBUTE_RATING:
                genericItem = dataViewHelper.getDataViewForShieldElementRating(elementId, isDirect);
                break;
            case ObjectTypeConstants.USER:
                genericItem = dataViewHelper.getDataViewForSphericUser(elementId, isDirect);
                break;
            case ObjectTypeConstants.USER_ROLE:
                genericItem = dataViewHelper.getDataViewForUserRole(elementId, isDirect);
                break;
            case ObjectTypeConstants.TEST_PROCEDURE:
                genericItem = dataViewHelper.getDataViewForTestProcedure(elementId, isDirect);
                break;
            case ObjectTypeConstants.GUIDANCE:
                genericItem = dataViewHelper.getDataViewForGuidance(elementId, isDirect);
                break;
            case ObjectTypeConstants.INGEST_SOURCE:
                genericItem = dataViewHelper.getDataViewForIngestSource(elementId, isDirect);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET:
                genericItem = dataViewHelper.getDataViewForBusinessAsset(elementId, isDirect);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE:
                genericItem = dataViewHelper.getDataViewForBusinessAssetType(elementId, isDirect);
                break;
            case ObjectTypeConstants.BUSINESS_PROVIDER:
                genericItem = dataViewHelper.getDataViewForBusinessProvider(elementId, isDirect);
                break;
            case ObjectTypeConstants.BUSINESS_PROVIDER_GROUP:
                genericItem = dataViewHelper.getDataViewForBusinessProviderGroup(elementId, isDirect);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_GROUP:
                genericItem = dataViewHelper.getDataViewForBusinessAssetGroup(elementId, isDirect);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE_GROUP:
                genericItem = dataViewHelper.getDataViewForBusinessAssetTypeGroup(elementId, isDirect);
                break;
            default:
                return genericItemPOJOBuilder.buildGIErrorResponse("Data View not implemented for object type " + objectType + " (or) this is unidentified object type", HttpStatus.BAD_REQUEST);

        }
        //generate artifacts attribute for genericItem
        /*
        artifacts : [
                {
                    "name"
                    "description"
                    "fileName"
                    "objectType"
                    "elementType"
                }
            ]
         */
        List<Artifact> artifacts = artifactRepository.findByObjectTypeAndElementIdAndIsArchivedFalse(objectType, elementId);
        if (artifacts != null && !artifacts.isEmpty()) {
            List<GenericItem> genericItemsOfArtifacts = new ArrayList<>();
            for (Artifact artifact : artifacts) {
                genericItemsOfArtifacts.add(genericItemPOJOBuilder.buildGenericPOJO(artifact));
            }
            genericItem.setArtifacts(genericItemsOfArtifacts);
        }

        idNameObjectConverter.minifiedGenericItemForDataview(genericItem);

        return new ResponseEntity(genericItem, HttpStatus.OK);
    }
}
