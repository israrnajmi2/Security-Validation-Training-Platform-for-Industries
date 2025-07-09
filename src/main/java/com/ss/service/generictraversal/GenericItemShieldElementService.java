package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.*;
import com.ss.domain.asset.Asset;
import com.ss.domain.asset.AssetToShieldElementMap;
import com.ss.domain.asset.AssetType;
import com.ss.domain.asset.AssetTypeToShieldElementMap;
import com.ss.domain.businessasset.BusinessAsset;
import com.ss.domain.businessasset.BusinessAssetToShieldElementMap;
import com.ss.domain.businessasset.BusinessAssetType;
import com.ss.domain.businessasset.BusinessAssetTypeToShieldElementMap;
import com.ss.domain.groups.ShieldElementGroup;
import com.ss.domain.groups.ShieldElementGroupMember;
import com.ss.domain.sce.SceFulfillsShieldElement;
import com.ss.domain.sce.SecurityControlExpression;
import com.ss.domain.shieldclassification.*;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.shieldclassification.ShieldRepository;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import com.ss.utils.LinkNameHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("GenericItemShieldElementService")
public class GenericItemShieldElementService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemSceService genericItemSceService;

    @Autowired
    private GenericItemShieldService genericItemShieldService;

    @Autowired
    private GenericItemShieldElementTypeService genericItemShieldElementTypeService;

    @Autowired
    private GenericItemOrganizationalUnitService genericItemOrganizationalUnitService;

    @Autowired
    private GenericItemShieldElementGroupService genericItemShieldElementGroupService;

    @Autowired
    private GenericItemAssetService genericItemAssetService;

    @Autowired
    private GenericItemAssetTypeService genericItemAssetTypeService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private GenericItemTestProcedureService genericItemTestProcedureService;

    @Autowired
    private GenericItemGuidanceService genericItemGuidanceService;

    @Autowired
    private GenericItemBusinessAssetService genericItemBusinessAssetService;

    @Autowired
    private GenericItemBusinessAssetTypeService genericItemBusinessAssetTypeService;

    @Autowired
    private ShieldRepository shieldRepository;

    @Autowired
    private LinkNameHelper linkNameHelper;

    public GenericItem buildGenericItemForShieldElement(ShieldElement shieldElement, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (shieldElement == null)
            throw new ExecException("buildGenericItemForShieldElement method : shieldElement parameter is null");
        //GenericItem pojo
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElement);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        if (perspectiveGroupInfo.isRated()) {
            if (perspectiveGroupInfo.getRulerType().equals(RulerTypeConstants.SHIELD_ELEMENT) && perspectiveGroupInfo.getLevelOfEvaluation().equals(shieldElement.getLevel())) {
                genericItem.setRating(genericItemIndexCalculator.getRatingForShieldElement(shieldElement, perspectiveGroupInfo.getPerspectiveIds(), perspectiveGroupInfo.getDate()));
            }
        }

        handleViews(shieldElement, viewDescriptor, genericItem, perspectiveGroupInfo);

        return genericItem;
    }

    public GenericItem buildGenericItemForSceFulfillsShieldElement(SceFulfillsShieldElement sceFulfillsShieldElement, ShieldElement shieldElement, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (sceFulfillsShieldElement == null)
            throw new ExecException("buildGenericItemForSceWithFulfillsShieldElementLink method : sceFulfillsShieldElement parameter is null");
        //GenericItem pojo - special case.

        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElement);
        genericItem.setLinkId(sceFulfillsShieldElement.getId());
        genericItem.setLinkType(ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK);
        genericItem.setLinkName(LinkName.EXPRESSION_TO_ELEMENT);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        if (perspectiveGroupInfo.isRated()) {
            if (perspectiveGroupInfo.getRulerType().equals(RulerTypeConstants.SHIELD_ELEMENT) && perspectiveGroupInfo.getLevelOfEvaluation().equals(shieldElement.getLevel())) {
                genericItem.setRating(genericItemIndexCalculator.getRatingForShieldElement(shieldElement, perspectiveGroupInfo.getPerspectiveIds(), perspectiveGroupInfo.getDate()));
            } else if (perspectiveGroupInfo.getRulerType().equals(RulerTypeConstants.SCE_FULFILLS_SHIELD_ELEMENT)) {
                genericItem.setRating(genericItemIndexCalculator.getRatingForSceFulfillsShieldElementLink(sceFulfillsShieldElement, perspectiveGroupInfo.getPerspectiveIds(), perspectiveGroupInfo.getDate()));
            }
        }

        handleViews(shieldElement, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    public GenericItem buildGenericItemForBusinessAssetTypeToShieldElementMap(BusinessAssetTypeToShieldElementMap businessAssetTypeToShieldElementMap, ShieldElement shieldElement, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (businessAssetTypeToShieldElementMap == null)
            throw new ExecException("buildGenericItemForBusinessAssetTypeToShieldElementMap method : businessAssetTypeToShieldElementMap parameter is null");
        //GenericItem pojo - special case.

        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElement);
        genericItem.setLinkId(businessAssetTypeToShieldElementMap.getId());
        genericItem.setLinkType(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_SHIELD_ELEMENT_LINK);
        genericItem.setLinkName(linkNameHelper.getLinkName(ObjectTypeConstants.BUSINESS_ASSET_TYPE, linkNameHelper.getObjectTypeForElement(shieldElement)));

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleViews(shieldElement, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    public GenericItem buildGenericItemForShieldElementToShieldElementMapLink(ShieldElementToShieldElementMap shieldElementToShieldElementMap, ShieldElement shieldElement, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (shieldElementToShieldElementMap == null)
            throw new ExecException("buildGenericItemForShieldElementToShieldElementMapLink method : shieldElementToShieldElementMap parameter is null");
        //GenericItem pojo - special case.

        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElement);
        genericItem.setLinkId(shieldElementToShieldElementMap.getId());
        genericItem.setLinkType(ObjectTypeConstants.SHIELD_ELEMENT_TO_SHIELD_ELEMENT_LINK);
        if(shieldElementToShieldElementMap.getShieldElementOne().getId() == shieldElement.getId())
            genericItem.setLinkName(linkNameHelper.getLinkName(linkNameHelper.getObjectTypeForElement(shieldElementToShieldElementMap.getShieldElementTwo()), linkNameHelper.getObjectTypeForElement(shieldElement)));
        else
            genericItem.setLinkName(linkNameHelper.getLinkName(linkNameHelper.getObjectTypeForElement(shieldElementToShieldElementMap.getShieldElementOne()), linkNameHelper.getObjectTypeForElement(shieldElement)));

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleViews(shieldElement, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    public GenericItem buildGenericItemForAssetTypeToShieldElementMapLink(AssetTypeToShieldElementMap assetTypeToShieldElementMap, ShieldElement shieldElement, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (assetTypeToShieldElementMap == null)
            throw new ExecException("buildGenericItemForAssetTypeToShieldElementMapLink method : assetTypeToShieldElementMap parameter is null");
        //GenericItem pojo - special case.

        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElement);
        genericItem.setLinkId(assetTypeToShieldElementMap.getId());
        genericItem.setLinkType(ObjectTypeConstants.ASSET_TYPE_TO_SHIELD_ELEMENT_LINK);
        genericItem.setLinkName(linkNameHelper.getLinkName(ObjectTypeConstants.ASSET_TYPE, linkNameHelper.getObjectTypeForElement(shieldElement)));

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleViews(shieldElement, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    public GenericItem buildGenericItemForAssetToShieldElementMapLink(AssetToShieldElementMap assetToShieldElementMap, ShieldElement shieldElement, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (assetToShieldElementMap == null)
            throw new ExecException("buildGenericItemForAssetToShieldElementMapLink method: assetToShieldElementMap argument is null");

        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElement);
        genericItem.setLinkId(assetToShieldElementMap.getId());
        genericItem.setLinkType(ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK);
        genericItem.setLinkName(linkNameHelper.getLinkName(ObjectTypeConstants.ASSET, linkNameHelper.getObjectTypeForElement(shieldElement)));

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        if (perspectiveGroupInfo.isRated()) {
            if (perspectiveGroupInfo.getRulerType().equals(RulerTypeConstants.ASSET_IMPLEMENTS_ELEMENT)) {
                genericItem.setRating(genericItemIndexCalculator.getRatingForAssetImplementsElementLink(assetToShieldElementMap, perspectiveGroupInfo.getPerspectiveIds(), perspectiveGroupInfo.getDate()));
            }
        }

        handleViews(shieldElement, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    public GenericItem buildGenericItemForBusinessAssetToShieldElementMapLink(BusinessAssetToShieldElementMap assetToShieldElementMap, ShieldElement shieldElement, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (assetToShieldElementMap == null)
            throw new ExecException("buildGenericItemForBusinessAssetToShieldElementMapLink method: assetToShieldElementMap argument is null");

        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElement);
        genericItem.setLinkId(assetToShieldElementMap.getId());
        genericItem.setLinkType(ObjectTypeConstants.BUSINESS_ASSET_TO_SHIELD_ELEMENT_LINK);
        genericItem.setLinkName(linkNameHelper.getLinkName(ObjectTypeConstants.BUSINESS_ASSET, linkNameHelper.getObjectTypeForElement(shieldElement)));

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleViews(shieldElement, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    private void handleViews(ShieldElement shieldElement, ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<GenericItem> children = new ArrayList<>();

        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            switch (viewDescriptor.getViewName()) {
                case GIView.BUSINESS:
                case GIView.THREAT:
                case GIView.STANDARD:
                case GIView.SHIELD:
                    handleViewNameShield(shieldElement, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.THREAT_ELEMENT_TYPE:
                case GIView.BUSINESS_ELEMENT_TYPE:
                case GIView.STANDARD_ELEMENT_TYPE:
                case GIView.SHIELD_ELEMENT_TYPE:
                    handleViewNameShieldElementType(shieldElement, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.STANDARD_ELEMENT:
                case GIView.BUSINESS_ELEMENT:
                case GIView.THREAT_ELEMENT:
                case GIView.SHIELD_ELEMENT:
                    handleViewNameShieldElement(shieldElement, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.SCE:
                    handleViewNameSce(shieldElement, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ORGANIZATIONAL_UNIT:
                    handleViewNameOrganizationalUnit(shieldElement, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.SHIELD_ELEMENT_GROUP:
                    handleViewNameShieldElementGroup(shieldElement, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.DIRECT_ASSET:
                    handleViewNameDirectAsset(shieldElement, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.DIRECT_ASSET_TYPE:
                    handleViewNameAssetType(shieldElement, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.DIRECT_BUSINESS_ASSET:
                    handleViewNameDirectBusinessAsset(shieldElement, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.DIRECT_BUSINESS_ASSET_TYPE:
                    handleViewNameBusinessAssetType(shieldElement, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.DIRECT_SHIELD_ELEMENT:
                    handleViewNameDirectShieldElement(shieldElement, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.TEST_PROCEDURE:
                    handleViewNameTestProcedure(shieldElement, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.GUIDANCE:
                    handleViewNameGuidance(shieldElement, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("buildGenericItemForShieldElement: unknown viewName " + viewDescriptor.getViewName() + " for ShieldElement");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
    }

    private void handleViewNameTestProcedure(ShieldElement shieldElement, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<TestProcedure> testProcedures = shieldElement.getTestProcedureList();
        if (testProcedures != null) {
            for (TestProcedure testProcedure : testProcedures) {
                if (testProcedure != null && !testProcedure.isArchived())
                    children.add(genericItemTestProcedureService.buildGenericItemForTestProcedure(testProcedure, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleViewNameGuidance(ShieldElement shieldElement, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<Guidance> guidanceList = shieldElement.getGuidanceList();
        if (guidanceList != null) {
            for (Guidance guidance : guidanceList) {
                if (guidance != null && !guidance.isArchived())
                    children.add(genericItemGuidanceService.buildGenericItemForGuidance(guidance, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleViewNameDirectAsset(ShieldElement shieldElement, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<AssetToShieldElementMap> assetToShieldElementMapList = shieldElement.getAssetToShieldElementMapList();
        if (assetToShieldElementMapList != null) {
            for (AssetToShieldElementMap assetToShieldElementMap : assetToShieldElementMapList) {
                if (assetToShieldElementMap != null && !assetToShieldElementMap.isArchived()) {
                    Asset asset = assetToShieldElementMap.getAsset();
                    if (asset != null && !asset.isArchived()) {
                        children.add(genericItemAssetService.buildGenericItemForAssetToShieldElementMapLink(assetToShieldElementMap, asset, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                    }
                }
            }
        }
    }

    private void handleViewNameAssetType(ShieldElement shieldElement, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<AssetTypeToShieldElementMap> assetTypeToShieldElementMapList = shieldElement.getAssetTypeToShieldElementMapList();
        if (assetTypeToShieldElementMapList != null) {
            for (AssetTypeToShieldElementMap assetTypeToShieldElementMap : assetTypeToShieldElementMapList) {
                if (assetTypeToShieldElementMap != null && !assetTypeToShieldElementMap.isArchived()) {
                    AssetType assetType = assetTypeToShieldElementMap.getAssetType();
                    if (assetType != null && !assetType.isArchived()) {
                        children.add(genericItemAssetTypeService.buildGenericItemForAssetTypeToShieldElementMapLink(assetTypeToShieldElementMap, assetType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                    }
                }
            }
        }
    }

    private void handleViewNameDirectBusinessAsset(ShieldElement shieldElement, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAssetToShieldElementMap> assetToShieldElementMapList = shieldElement.getBusinessAssetToShieldElementMapList();
        if (assetToShieldElementMapList != null) {
            for (BusinessAssetToShieldElementMap assetToShieldElementMap : assetToShieldElementMapList) {
                if (assetToShieldElementMap != null && !assetToShieldElementMap.isArchived()) {
                    BusinessAsset asset = assetToShieldElementMap.getBusinessAsset();
                    if (asset != null && !asset.isArchived()) {
                        children.add(genericItemBusinessAssetService.buildGenericItemForBusinessAssetToShieldElementMapLink(assetToShieldElementMap, asset, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                    }
                }
            }
        }
    }

    private void handleViewNameBusinessAssetType(ShieldElement shieldElement, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAssetTypeToShieldElementMap> assetTypeToShieldElementMapList = shieldElement.getBusinessAssetTypeToShieldElementMapList();
        if (assetTypeToShieldElementMapList != null) {
            for (BusinessAssetTypeToShieldElementMap assetTypeToShieldElementMap : assetTypeToShieldElementMapList) {
                if (assetTypeToShieldElementMap != null && !assetTypeToShieldElementMap.isArchived()) {
                    BusinessAssetType assetType = assetTypeToShieldElementMap.getBusinessAssetType();
                    if (assetType != null && !assetType.isArchived()) {
                        children.add(genericItemBusinessAssetTypeService.buildGenericItemForBusinessAssetTypeToShieldElementMapLink(assetTypeToShieldElementMap, assetType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                    }
                }
            }
        }
    }

    private void handleViewNameDirectShieldElement(ShieldElement shieldElement, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS)) {
            handleAllLinkedCaseForViewDirectShieldElement(shieldElement, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID)) {
            handleAllLinkedByShieldIdCaseForViewDirectShieldElement(shieldElement, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("GenericItemShieldElementService: handleViewNameDirectShieldElement: viewName: direct_shield_element: unknown selection mode " + viewDescriptor.getSelectionMode());
    }

    private void handleAllLinkedByShieldIdCaseForViewDirectShieldElement(ShieldElement shieldElement, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (viewDescriptor.getShieldId() == null)
            throw new ExecException("buildGenericItemForShieldElement: viewName: direct_shield_element: selectionMode : all_linked_by_shield_id : shieldId is null in view descriptor");
        Shield shield = shieldRepository.findOne(viewDescriptor.getShieldId());
        if (shield == null || shield.isArchived())
            throw new ExecException("buildGenericItemForShieldElement: viewName: direct_shield_element: selectionMode : all_linked_by_shield_id : Shield with id " + viewDescriptor.getShieldId() + " not found");
        int shieldId = shield.getId();

        List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapListOne = shieldElement.getShieldElementToShieldElementMapListOne();
        if (shieldElementToShieldElementMapListOne != null && (!shieldElementToShieldElementMapListOne.isEmpty())) {
            for (ShieldElementToShieldElementMap shieldElementToShieldElementMap : shieldElementToShieldElementMapListOne) {
                if (shieldElementToShieldElementMap != null && (!shieldElementToShieldElementMap.isArchived())) {
                    ShieldElement shieldElementTwo = shieldElementToShieldElementMap.getShieldElementTwo();
                    if (shieldElementTwo != null && (!shieldElementTwo.isArchived()) && shieldElementTwo.getShield().getId().equals(shieldId))
                        children.add(buildGenericItemForShieldElementToShieldElementMapLink(shieldElementToShieldElementMap, shieldElementTwo, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }

        List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapListTwo = shieldElement.getShieldElementToShieldElementMapListTwo();
        if (shieldElementToShieldElementMapListTwo != null && (!shieldElementToShieldElementMapListTwo.isEmpty())) {
            for (ShieldElementToShieldElementMap shieldElementToShieldElementMap : shieldElementToShieldElementMapListTwo) {
                if (shieldElementToShieldElementMap != null && (!shieldElementToShieldElementMap.isArchived())) {
                    ShieldElement shieldElementOne = shieldElementToShieldElementMap.getShieldElementOne();
                    if (shieldElementOne != null && (!shieldElementOne.isArchived()) && shieldElementOne.getShield().getId().equals(shieldId) && shieldElement.getId() != shieldElementOne.getId())
                        children.add(buildGenericItemForShieldElementToShieldElementMapLink(shieldElementToShieldElementMap, shieldElementOne, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleAllLinkedCaseForViewDirectShieldElement(ShieldElement shieldElement, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapListOne = shieldElement.getShieldElementToShieldElementMapListOne();
        if (shieldElementToShieldElementMapListOne != null) {
            for (ShieldElementToShieldElementMap shieldElementToShieldElementMap : shieldElementToShieldElementMapListOne) {
                if (shieldElementToShieldElementMap != null && !shieldElementToShieldElementMap.isArchived()) {
                    ShieldElement shieldElementTwo = shieldElementToShieldElementMap.getShieldElementTwo();
                    if (shieldElementTwo != null && !shieldElementTwo.isArchived()) {
                        children.add(buildGenericItemForShieldElementToShieldElementMapLink(shieldElementToShieldElementMap, shieldElementTwo, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                    }
                }
            }
        }

        List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapListTwo = shieldElement.getShieldElementToShieldElementMapListTwo();
        if (shieldElementToShieldElementMapListTwo != null) {
            for (ShieldElementToShieldElementMap shieldElementToShieldElementMap : shieldElementToShieldElementMapListTwo) {
                if (shieldElementToShieldElementMap != null && !shieldElementToShieldElementMap.isArchived()) {
                    ShieldElement shieldElementOne = shieldElementToShieldElementMap.getShieldElementOne();
                    if (shieldElementOne != null && !shieldElementOne.isArchived()) {
                        children.add(buildGenericItemForShieldElementToShieldElementMapLink(shieldElementToShieldElementMap, shieldElementOne, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                    }
                }
            }
        }
    }

    private void handleViewNameShieldElementGroup(ShieldElement shieldElement, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ShieldElementGroupMember> shieldElementGroupMembers = shieldElement.getShieldElementGroupMembers();
        if (shieldElementGroupMembers != null && !shieldElementGroupMembers.isEmpty()) {
            for (ShieldElementGroupMember shieldElementGroupMember : shieldElementGroupMembers) {
                if (shieldElementGroupMember != null && shieldElementGroupMember.isActivated() && !shieldElementGroupMember.isArchived()) {
                    ShieldElementGroup shieldElementGroup = shieldElementGroupMember.getShieldElementGroup();
                    if (shieldElementGroup != null && !shieldElementGroup.isArchived())
                        children.add(genericItemShieldElementGroupService.buildGenericItemForShieldElementGroup(shieldElementGroup, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameOrganizationalUnit(ShieldElement shieldElement, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        OrganizationalUnit organizationalUnit = shieldElement.getOrganizationalUnit();
        if (organizationalUnit != null && (!organizationalUnit.isArchived()))
            children.add(genericItemOrganizationalUnitService.buildGenericItemForOrganizationalUnit(organizationalUnit, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
    }

    private void handleViewNameSce(ShieldElement shieldElement, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<SceFulfillsShieldElement> sceFulfillsShieldElementList = shieldElement.getSceFulfillsShieldElementList();

        if (sceFulfillsShieldElementList != null) {
            for (SceFulfillsShieldElement sceFulfillsShieldElement : sceFulfillsShieldElementList) {
                if (sceFulfillsShieldElement != null && (!sceFulfillsShieldElement.isArchived())) {
                    SecurityControlExpression sce = sceFulfillsShieldElement.getSce();
                    if (sce != null && (!sce.isArchived()))
                        children.add(genericItemSceService.buildGenericItemForSceWithFulfillsShieldElementLink(sceFulfillsShieldElement, sce, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }

    }

    private void handleViewNameShield(ShieldElement shieldElement, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        Shield shield = shieldElement.getShield();
        if (shield != null) {
            children.add(genericItemShieldService.buildGenericItemForShield(shield, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }

    private void handleViewNameShieldElement(ShieldElement shieldElement, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS)
                || viewDescriptor.getSelectionMode().equals(GIMode.CHILDREN_ELEMENTS)) {
            handleChildrenCaseForViewShieldElement(shieldElement, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.PARENT_ELEMENT)) {
            handleParentCaseForViewShieldElement(shieldElement, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("buildGenericItemForShieldElement: viewName: shield_element: unknown selection mode " + viewDescriptor.getSelectionMode());

    }

    private void handleChildrenCaseForViewShieldElement(ShieldElement shieldElement, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ShieldElement> childrenShieldElementList = shieldElement.getChildrenShieldElementList();
        if (childrenShieldElementList != null && (!childrenShieldElementList.isEmpty())) {
            for (ShieldElement childShieldElement : childrenShieldElementList) {
                if (childShieldElement != null && (!childShieldElement.isArchived()))
                    children.add(buildGenericItemForShieldElement(childShieldElement, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleParentCaseForViewShieldElement(ShieldElement shieldElement, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        ShieldElement parentShieldElement = shieldElement.getParentShieldElement();
        if (parentShieldElement != null && (!parentShieldElement.isArchived())) {
            children.add(buildGenericItemForShieldElement(parentShieldElement, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }

    private void handleViewNameShieldElementType(ShieldElement shieldElement, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        ShieldElementType shieldElementType = shieldElement.getShieldElementType();
        if (shieldElementType != null)
            children.add(genericItemShieldElementTypeService.buildGenericItemForShieldElementType(shieldElementType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
    }
}
