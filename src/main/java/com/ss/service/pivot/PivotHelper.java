package com.ss.service.pivot;

import com.ss.common.ExecException;
import com.ss.constants.ObjectTypeConstants;
import com.ss.controller.DataViewController;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.helper.IdNameObject;
import com.ss.pojo.restservice.GenericItem;
import com.ss.pojo.restservice.PivotRequest;
import com.ss.service.generictraversal.*;
import com.ss.utils.GetWithIdHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("PivotHelper")
public class PivotHelper {

    @Autowired
    private GenericItemShieldService genericItemShieldService;

    @Autowired
    private GetWithIdHelper getWithIdHelper;

    @Autowired
    private GenericItemShieldTypeService genericItemShieldTypeService;

    @Autowired
    private GenericItemShieldElementTypeService genericItemShieldElementTypeService;

    @Autowired
    private GenericItemShieldElementService genericItemShieldElementService;

    @Autowired
    private GenericItemSceService genericItemSceService;

    @Autowired
    private GenericItemOrganizationalUnitService genericItemOrganizationalUnitService;

    @Autowired
    private GenericItemObjectiveParameterWordService genericItemObjectiveParameterWordService;

    @Autowired
    private GenericItemMethodParameterWordService genericItemMethodParameterWordService;

    @Autowired
    private GenericItemContentParameterWordService genericItemContentParameterWordService;

    @Autowired
    private GenericItemSubjectParameterWordService genericItemSubjectParameterWordService;

    @Autowired
    private GenericItemAssetTypeService genericItemAssetTypeService;

    @Autowired
    private GenericItemAssetService genericItemAssetService;

    @Autowired
    private GenericItemTechnicalSupportService genericItemTechnicalSupportService;

    @Autowired
    private GenericItemProviderInfoService genericItemProviderInfoService;

    @Autowired
    private GenericItemTechnicalSupportContactInfoService genericItemTechnicalSupportContactInfoService;

    @Autowired
    private GenericItemShieldElementGroupService genericItemShieldElementGroupService;

    @Autowired
    private GenericItemSceGroupService genericItemSceGroupService;

    @Autowired
    private GenericItemAssetGroupService genericItemAssetGroupService;

    @Autowired
    private GenericItemAssetTypeGroupService genericItemAssetTypeGroupService;

    @Autowired
    private GenericItemProviderGroupService genericItemProviderGroupService;

    @Autowired
    private GenericItemSphericUserService genericItemSphericUserService;

    @Autowired
    private GenericItemUserRoleService genericItemUserRoleService;

    @Autowired
    private GenericItemTestProcedureService genericItemTestProcedureService;

    @Autowired
    private GenericItemIngestSourceService genericItemIngestSourceService;

    @Autowired
    private GenericItemGuidanceService genericItemGuidanceService;

    @Autowired
    private GenericItemBusinessAssetService genericItemBusinessAssetService;

    @Autowired
    private GenericItemBusinessAssetTypeService genericItemBusinessAssetTypeService;

    @Autowired
    private GenericItemBusinessProviderService genericItemBusinessProviderService;

    @Autowired
    private GenericItemBusinessProviderGroupService genericItemBusinessProviderGroupService;

    @Autowired
    private GenericItemBusinessAssetTypeGroupService genericItemBusinessAssetTypeGroupService;

    @Autowired
    private GenericItemBusinessAssetGroupService genericItemBusinessAssetGroupService;

    @Autowired
    private DataViewController dataViewController;


    public GenericItem getSubtreeGenericItem(PivotRequest pivotRequest) {
        if(pivotRequest.getViewDescriptorWithLabel().getViewName().equals("all")) {
            boolean isDirectMode = true;
            if(!pivotRequest.getViewDescriptorWithLabel().getSelectionMode().equals("direct"))
                isDirectMode = false;
            pivotRequest.getElementId();
            pivotRequest.getObjectType();
            ResponseEntity<GenericItem> responseEntity = dataViewController.getDataView(pivotRequest.getElementId(), pivotRequest.getObjectType(), isDirectMode);
            return responseEntity.getBody();
        }

        ViewDescriptor viewDescriptor = new ViewDescriptor();
        viewDescriptor.setViewName(pivotRequest.getViewDescriptorWithLabel().getViewName());
        viewDescriptor.setShieldId(pivotRequest.getViewDescriptorWithLabel().getShieldId());
        viewDescriptor.setSelectionMode(pivotRequest.getViewDescriptorWithLabel().getSelectionMode());
        viewDescriptor.setNextLevel(null);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);
        List<IdNameObject> idNameObjects = null;
        perspectiveGroupInfo.setGroupItems(idNameObjects);

        Integer elementId = pivotRequest.getElementId();

        if (elementId == null)
            throw new ExecException("Element Id is null");

        switch (pivotRequest.getObjectType()) {
            case ObjectTypeConstants.SHIELD:
                return genericItemShieldService.buildGenericItemForShield(getWithIdHelper.getShield(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.STANDARD:
                return genericItemShieldService.buildGenericItemForShield(getWithIdHelper.getShield(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.THREAT_FRAMEWORK:
                return genericItemShieldService.buildGenericItemForShield(getWithIdHelper.getShield(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.BUSINESS_FRAMEWORK:
                return genericItemShieldService.buildGenericItemForShield(getWithIdHelper.getShield(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.SHIELD_TYPE:
                return genericItemShieldTypeService.buildGenericItemForShieldType(getWithIdHelper.getShieldType(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.SHIELD_ELEMENT_TYPE:
                return genericItemShieldElementTypeService.buildGenericItemForShieldElementType(getWithIdHelper.getShieldElementType(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.STANDARD_ELEMENT_TYPE:
                return genericItemShieldElementTypeService.buildGenericItemForShieldElementType(getWithIdHelper.getShieldElementType(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.THREAT_ELEMENT_TYPE:
                return genericItemShieldElementTypeService.buildGenericItemForShieldElementType(getWithIdHelper.getShieldElementType(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.BUSINESS_CONTROL_TYPE:
                return genericItemShieldElementTypeService.buildGenericItemForShieldElementType(getWithIdHelper.getShieldElementType(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.SHIELD_ELEMENT:
                return genericItemShieldElementService.buildGenericItemForShieldElement(getWithIdHelper.getShieldElement(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.STANDARD_ELEMENT:
                return genericItemShieldElementService.buildGenericItemForShieldElement(getWithIdHelper.getShieldElement(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.THREAT_ELEMENT:
                return genericItemShieldElementService.buildGenericItemForShieldElement(getWithIdHelper.getShieldElement(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.BUSINESS_CONTROL:
                return genericItemShieldElementService.buildGenericItemForShieldElement(getWithIdHelper.getShieldElement(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.SCE:
                return genericItemSceService.buildGenericItemForSce(getWithIdHelper.getSce(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.ORGANIZATIONAL_UNIT:
                return genericItemOrganizationalUnitService.buildGenericItemForOrganizationalUnit(getWithIdHelper.getOrganizationalUnit(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.OBJECTIVE_PARAMETER:
                return genericItemObjectiveParameterWordService.buildGenericItemForObjectiveParameterWord(getWithIdHelper.getObjectiveParameter(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.METHOD_PARAMETER:
                return genericItemMethodParameterWordService.buildGenericItemForMethodParameterWord(getWithIdHelper.getMethodParameter(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.CONTENT_PARAMETER:
                return genericItemContentParameterWordService.buildGenericItemForContentParameterWord(getWithIdHelper.getContentParameter(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.SUBJECT_PARAMETER:
                return genericItemSubjectParameterWordService.buildGenericItemForSubjectParameterWord(getWithIdHelper.getSubjectParameter(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.ASSET_TYPE:
                return genericItemAssetTypeService.buildGenericItemForAssetType(getWithIdHelper.getAssetType(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.ASSET:
                return genericItemAssetService.buildGenericItemForAsset(getWithIdHelper.getAsset(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.TECHNICAL_SUPPORT_PEOPLE:
                return genericItemTechnicalSupportService.buildGenericItemForTechnicalSupport(getWithIdHelper.getTechnicalSupport(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.PROVIDER:
                return genericItemProviderInfoService.buildGenericItemForProviderInfo(getWithIdHelper.getProvider(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.TECHNICAL_SUPPORT_CONTACT_INFO:
                return genericItemTechnicalSupportContactInfoService.buildGenericItemForTechnicalSupportContactInfo(getWithIdHelper.getTechnicalSupportContactInfo(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.SHIELD_ELEMENT_GROUP:
                return genericItemShieldElementGroupService.buildGenericItemForShieldElementGroup(getWithIdHelper.getShieldElementGroup(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.SCE_GROUP:
                return genericItemSceGroupService.buildGenericItemForSceGroup(getWithIdHelper.getSceGroup(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.ASSET_GROUP:
                return genericItemAssetGroupService.buildGenericItemForAssetGroup(getWithIdHelper.getAssetGroup(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.ASSET_TYPE_GROUP:
                return genericItemAssetTypeGroupService.buildGenericItemForAssetTypeGroup(getWithIdHelper.getAssetTypeGroup(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.PROVIDER_GROUP:
                return genericItemProviderGroupService.buildGenericItemForProviderGroup(getWithIdHelper.getProviderGroup(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.USER:
                return genericItemSphericUserService.buildGenericItemForSphericUser(getWithIdHelper.getUser(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.USER_ROLE:
                return genericItemUserRoleService.buildGenericItemForUserRole(getWithIdHelper.getUserRole(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.TEST_PROCEDURE:
                return genericItemTestProcedureService.buildGenericItemForTestProcedure(getWithIdHelper.getTestProcedure(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.GUIDANCE:
                return genericItemGuidanceService.buildGenericItemForGuidance(getWithIdHelper.getGuidance(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.INGEST_SOURCE:
                return genericItemIngestSourceService.buildGenericItemForIngestSource(getWithIdHelper.getIngestSource(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE:
                return genericItemBusinessAssetTypeService.buildGenericItemForBusinessAssetType(getWithIdHelper.getBusinessAssetType(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.BUSINESS_ASSET:
                return genericItemBusinessAssetService.buildGenericItemForBusinessAsset(getWithIdHelper.getBusinessAsset(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.BUSINESS_PROVIDER:
                return genericItemBusinessProviderService.buildGenericItemForBusinessProvider(getWithIdHelper.getBusinessProvider(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.BUSINESS_ASSET_GROUP:
                return genericItemBusinessAssetGroupService.buildGenericItemForBusinessAssetGroup(getWithIdHelper.getBusinessAssetGroup(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE_GROUP:
                return genericItemBusinessAssetTypeGroupService.buildGenericItemForBusinessAssetTypeGroup(getWithIdHelper.getBusinessAssetTypeGroup(elementId), viewDescriptor, perspectiveGroupInfo);
            case ObjectTypeConstants.BUSINESS_PROVIDER_GROUP:
                return genericItemBusinessProviderGroupService.buildGenericItemForBusinessProviderGroup(getWithIdHelper.getBusinessProviderGroup(elementId), viewDescriptor, perspectiveGroupInfo);
            default:
                throw new ExecException("Unsupported object type " + pivotRequest.getObjectType());
        }

    }
}
