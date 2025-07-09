package com.ss.controller;

import com.ss.constants.ObjectTypeConstants;
import com.ss.pojo.restservice.GenericItem;
import com.ss.pojo.restservice.LinkElementInfoResponse;
import com.ss.service.dataview.ElementInfoHelper;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;

@RestController
@Transactional
@RequestMapping(value = "/rest/generic")
public class GenericController {

    @Autowired
    private ElementInfoHelper elementInfoHelper;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @RequestMapping(value = "/get_element_info_of_link/{linkId}/{linkType}", method = RequestMethod.GET)
    public ResponseEntity<LinkElementInfoResponse> getElementInfoOfLink(@PathVariable("linkId") Integer linkId, @PathVariable("linkType") String linkType) {
        if (linkId == null)
            return genericItemPOJOBuilder.buildGIErrorResponseForLink("Please pass linkId parameter", HttpStatus.BAD_REQUEST);
        if (linkType == null)
            return genericItemPOJOBuilder.buildGIErrorResponseForLink("Please pass linkType parameter", HttpStatus.BAD_REQUEST);

        LinkElementInfoResponse genericItem = null;

        switch (linkType) {
            case ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK_COULD:
                genericItem = elementInfoHelper.getElementInfoForAssetDeliveSce(linkId);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_TO_EXPRESSION_LINK:
                genericItem = elementInfoHelper.getElementInfoForBusinessAssetToExpressionLink(linkId);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_TO_EXPRESSION_LINK_COULD:
                genericItem = elementInfoHelper.getElementInfoForBusinessAssetToExpressionLink(linkId);
                break;
            case ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK:
                genericItem = elementInfoHelper.getElementInfoForAssetDeliveSce(linkId);
                break;
            case ObjectTypeConstants.ASSET_TYPE_TO_EXPRESSION_LINK:
                genericItem = elementInfoHelper.getElementInfoForAssetTypeProtectedBySce(linkId);
                break;
            case ObjectTypeConstants.ASSET_TYPE_TO_EXPRESSION_LINK_COULD:
                genericItem = elementInfoHelper.getElementInfoForAssetTypeProtectedBySce(linkId);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_EXPRESSION_LINK:
                genericItem = elementInfoHelper.getElementInfoForBusinessAssetTypeToExpressionLink(linkId);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_EXPRESSION_LINK_COULD:
                genericItem = elementInfoHelper.getElementInfoForBusinessAssetTypeToExpressionLink(linkId);
                break;
            case ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK:
                genericItem = elementInfoHelper.getElementInfoForSceFulfillsSce(linkId);
                break;
            case ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK:
                genericItem = elementInfoHelper.getElementInfoForDirectAssetToShieldElementLink(linkId);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_TO_SHIELD_ELEMENT_LINK:
                genericItem = elementInfoHelper.getElementInfoForBusinessAssetToShieldElementLink(linkId);
                break;
            case ObjectTypeConstants.ASSET_TYPE_TO_SHIELD_ELEMENT_LINK:
                genericItem = elementInfoHelper.getElementInfoForDirectAssetTypeToShieldElementLink(linkId);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_SHIELD_ELEMENT_LINK:
                genericItem = elementInfoHelper.getElementInfoForBusinessAssetTypeToShieldElementLink(linkId);
                break;
            case ObjectTypeConstants.SHIELD_ELEMENT_TO_SHIELD_ELEMENT_LINK:
                genericItem = elementInfoHelper.getElementInfoForDirectElementToElementLink(linkId);
                break;
            default:
                return genericItemPOJOBuilder.buildGIErrorResponseForLink("Element Info not implemented for link type " + linkType + " (or) this is unidentified link type", HttpStatus.BAD_REQUEST);

        }
        return new ResponseEntity(genericItem, HttpStatus.OK);
    }


    @RequestMapping(value = "/get_element_info/{elementId}/{objectType}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getElementInfo(@PathVariable("elementId") Integer elementId, @PathVariable("objectType") String objectType) {

        if (elementId == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Please pass elementId parameter", HttpStatus.BAD_REQUEST);
        if (objectType == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Please pass objectType parameter", HttpStatus.BAD_REQUEST);

        GenericItem genericItem = null;

        switch (objectType) {
            case ObjectTypeConstants.SHIELD:
                genericItem = elementInfoHelper.getElementInfoForShield(elementId);
                break;
            case ObjectTypeConstants.SHIELD_TYPE:
                genericItem = elementInfoHelper.getElementInfoForShieldType(elementId);
                break;
            case ObjectTypeConstants.SHIELD_ELEMENT_TYPE:
                genericItem = elementInfoHelper.getElementInfoForShieldElementType(elementId);
                break;
            case ObjectTypeConstants.SHIELD_ELEMENT:
                genericItem = elementInfoHelper.getElementInfoForShieldElement(elementId);
                break;
            case ObjectTypeConstants.STANDARD_ELEMENT:
                genericItem = elementInfoHelper.getElementInfoForShieldElement(elementId);
                break;
            case ObjectTypeConstants.THREAT_ELEMENT:
                genericItem = elementInfoHelper.getElementInfoForShieldElement(elementId);
                break;
            case ObjectTypeConstants.BUSINESS_CONTROL:
                genericItem = elementInfoHelper.getElementInfoForShieldElement(elementId);
                break;
            case ObjectTypeConstants.SCE:
                genericItem = elementInfoHelper.getElementInfoForSCE(elementId);
                break;
            case ObjectTypeConstants.ORGANIZATIONAL_UNIT:
                genericItem = elementInfoHelper.getElementInfoForOrganizationalUnit(elementId);
                break;
            case ObjectTypeConstants.OBJECTIVE_PARAMETER:
                genericItem = elementInfoHelper.getElementInfoForObjectiveParameter(elementId);
                break;
            case ObjectTypeConstants.METHOD_PARAMETER:
                genericItem = elementInfoHelper.getElementInfoForMethodParameter(elementId);
                break;
            case ObjectTypeConstants.CONTENT_PARAMETER:
                genericItem = elementInfoHelper.getElementInfoForContentParameter(elementId);
                break;
            case ObjectTypeConstants.SUBJECT_PARAMETER:
                genericItem = elementInfoHelper.getElementInfoForSubjectParameter(elementId);
                break;
            case ObjectTypeConstants.ASSET_TYPE:
                genericItem = elementInfoHelper.getElementInfoForAssetType(elementId);
                break;
            case ObjectTypeConstants.ASSET:
                genericItem = elementInfoHelper.getElementInfoForAsset(elementId);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE:
                genericItem = elementInfoHelper.getElementInfoForBusinessAssetType(elementId);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET:
                genericItem = elementInfoHelper.getElementInfoForBusinessAsset(elementId);
                break;
            case ObjectTypeConstants.TECHNICAL_SUPPORT_PEOPLE:
                genericItem = elementInfoHelper.getElementInfoForTechnicalSupportPeople(elementId);
                break;
            case ObjectTypeConstants.PROVIDER:
                genericItem = elementInfoHelper.getElementInfoForProvider(elementId);
                break;
            case ObjectTypeConstants.BUSINESS_PROVIDER:
                genericItem = elementInfoHelper.getElementInfoForBusinessProvider(elementId);
                break;
            case ObjectTypeConstants.TECHNICAL_SUPPORT_CONTACT_INFO:
                genericItem = elementInfoHelper.getElementInfoForTechnicalSupportContactInfo(elementId);
                break;
            case ObjectTypeConstants.SHIELD_ELEMENT_GROUP:
                genericItem = elementInfoHelper.getElementInfoForShieldElementGroup(elementId);
                break;
            case ObjectTypeConstants.SCE_GROUP:
                genericItem = elementInfoHelper.getElementInfoForSceGroup(elementId);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_GROUP:
                genericItem = elementInfoHelper.getElementInfoForBusinessAssetGroup(elementId);
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE_GROUP:
                genericItem = elementInfoHelper.getElementInfoForBusinessAssetTypeGroup(elementId);
                break;
            case ObjectTypeConstants.BUSINESS_PROVIDER_GROUP:
                genericItem = elementInfoHelper.getElementInfoForBusinessProviderGroup(elementId);
                break;
            case ObjectTypeConstants.ASSET_GROUP:
                genericItem = elementInfoHelper.getElementInfoForAssetGroup(elementId);
                break;
            case ObjectTypeConstants.ASSET_TYPE_GROUP:
                genericItem = elementInfoHelper.getElementInfoForAssetTypeGroup(elementId);
                break;
            case ObjectTypeConstants.PROVIDER_GROUP:
                genericItem = elementInfoHelper.getElementInfoForProviderGroup(elementId);
                break;
            case ObjectTypeConstants.PERSPECTIVE:
                genericItem = elementInfoHelper.getElementInfoForPerspective(elementId);
                break;
            case ObjectTypeConstants.ASSET_DELIVERS_ATTRIBUTE:
                genericItem = elementInfoHelper.getElementInfoForAssetDeliversAttribute(elementId);
                break;
            case ObjectTypeConstants.ASSET_IMPLEMENTS_ATTRIBUTE:
                genericItem = elementInfoHelper.getElementInfoForAssetImplementsAttribute(elementId);
                break;
            case ObjectTypeConstants.ASSET_DELIVERS_LIBRARY_ATTRIBUTE:
                genericItem = elementInfoHelper.getElementInfoForAssetDeliversLibraryAttribute(elementId);
                break;
            case ObjectTypeConstants.ASSET_IMPLEMENTS_LIBRARY_ATTRIBUTE:
                genericItem = elementInfoHelper.getElementInfoForAssetImplementsLibraryAttribute(elementId);
                break;
            case ObjectTypeConstants.ASSET_DELIVERS_ATTRIBUTE_RATING:
                genericItem = elementInfoHelper.getElementInfoForAssetDeliversAttributeRating(elementId);
                break;
            case ObjectTypeConstants.ASSET_IMPLEMENTS_ATTRIBUTE_RATING:
                genericItem = elementInfoHelper.getElementInfoForAssetImplementsAttributeRating(elementId);
                break;
            case ObjectTypeConstants.SHIELD_ELEMENT_RT_ATTRIBUTE:
                genericItem = elementInfoHelper.getElementInfoForShieldElementAttribute(elementId);
                break;
            case ObjectTypeConstants.SHIELD_ELEMENT_LIBRARY_ATTRIBUTE:
                genericItem = elementInfoHelper.getElementInfoForShieldElementLibraryAttribute(elementId);
                break;
            case ObjectTypeConstants.SHIELD_ELEMENT_RT_ATTRIBUTE_RATING:
                genericItem = elementInfoHelper.getElementInfoForShieldElementAttributeRating(elementId);
                break;
            case ObjectTypeConstants.ARTIFACT:
                genericItem = elementInfoHelper.getElementInfoForArtifact(elementId);
                break;
            case ObjectTypeConstants.USER:
                genericItem = elementInfoHelper.getElementInfoForUser(elementId);
                break;
            case ObjectTypeConstants.USER_ROLE:
                genericItem = elementInfoHelper.getElementInfoForUserRole(elementId);
                break;
            case ObjectTypeConstants.STANDARD_ELEMENT_TYPE:
                genericItem = elementInfoHelper.getElementInfoForShieldElementType(elementId);
                break;
            case ObjectTypeConstants.THREAT_ELEMENT_TYPE:
                genericItem = elementInfoHelper.getElementInfoForShieldElementType(elementId);
                break;
            case ObjectTypeConstants.BUSINESS_CONTROL_TYPE:
                genericItem = elementInfoHelper.getElementInfoForShieldElementType(elementId);
                break;
            case ObjectTypeConstants.STANDARD:
                genericItem = elementInfoHelper.getElementInfoForShield(elementId);
                break;
            case ObjectTypeConstants.THREAT_FRAMEWORK:
                genericItem = elementInfoHelper.getElementInfoForShield(elementId);
                break;
            case ObjectTypeConstants.BUSINESS_FRAMEWORK:
                genericItem = elementInfoHelper.getElementInfoForShield(elementId);
                break;
            case ObjectTypeConstants.INGEST_SOURCE:
                genericItem = elementInfoHelper.getElementInfoForIngestSource(elementId);
                break;
            case ObjectTypeConstants.TEST_PROCEDURE:
                genericItem = elementInfoHelper.getElementInfoForTestProcedure(elementId);
                break;
            case ObjectTypeConstants.GUIDANCE:
                genericItem = elementInfoHelper.getElementInfoForGuidance(elementId);
                break;
            default:
                return genericItemPOJOBuilder.buildGIErrorResponse("Element Info not implemented for object type " + objectType + " (or) this is unidentified object type", HttpStatus.BAD_REQUEST);

        }
        return new ResponseEntity(genericItem, HttpStatus.OK);
    }
}
