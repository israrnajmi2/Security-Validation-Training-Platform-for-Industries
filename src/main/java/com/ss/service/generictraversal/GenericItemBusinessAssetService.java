package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.*;
import com.ss.domain.businessasset.*;
import com.ss.domain.groups.BusinessAssetGroup;
import com.ss.domain.groups.BusinessAssetGroupMember;
import com.ss.domain.sce.SecurityControlExpression;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
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

@Service("GenericItemBusinessAssetService")
public class GenericItemBusinessAssetService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemSceService genericItemSceService;

    @Autowired
    private GenericItemBusinessAssetTypeService genericItemBusinessAssetTypeService;

    @Autowired
    private GenericItemBusinessProviderService genericItemBusinessProviderService;

    @Autowired
    private GenericItemBusinessAssetGroupService genericItemBusinessAssetGroupService;

    @Autowired
    private GenericItemOrganizationalUnitService genericItemOrganizationalUnitService;

    @Autowired
    private GenericItemShieldElementService genericItemShieldElementService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private ShieldRepository shieldRepository;

    @Autowired
    private LinkNameHelper linkNameHelper;

    public GenericItem buildGenericItemForBusinessAssetToExpressionLink(BusinessAssetToExpressionLink businessAssetToExpressionLink, BusinessAsset asset, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (businessAssetToExpressionLink == null)
            throw new ExecException("buildGenericItemForAssetWithDeliversSceLink method : businessAssetToExpressionLink parameter is null");
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(asset);
        genericItem.setLinkId(businessAssetToExpressionLink.getId());
        switch (businessAssetToExpressionLink.getShallCould()) {
            case ProtectionType.COULD:
                genericItem.setLinkType(ObjectTypeConstants.BUSINESS_ASSET_TO_EXPRESSION_LINK_COULD);
                genericItem.setLinkName(LinkName.EXPRESSION_TO_BUSINESS_ASSET_COULD);
                break;
            case ProtectionType.SHALL:
                genericItem.setLinkType(ObjectTypeConstants.BUSINESS_ASSET_TO_EXPRESSION_LINK);
                genericItem.setLinkName(LinkName.EXPRESSION_TO_BUSINESS_ASSET);
                break;
            default:
                throw new ExecException("Unknown protection type for asset type " + businessAssetToExpressionLink.getShallCould());
        }

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(asset, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    public GenericItem buildGenericItemForBusinessAssetToShieldElementMapLink(BusinessAssetToShieldElementMap assetToShieldElementMap, BusinessAsset asset, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (assetToShieldElementMap == null)
            throw new ExecException("buildGenericItemForAssetToShieldElementMapLink method : assetToShieldElementMap parameter is null");
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(asset);
        genericItem.setLinkId(assetToShieldElementMap.getId());
        genericItem.setLinkType(ObjectTypeConstants.BUSINESS_ASSET_TO_SHIELD_ELEMENT_LINK);
        genericItem.setLinkName(linkNameHelper.getLinkName(linkNameHelper.getObjectTypeForElement(assetToShieldElementMap.getShieldElement()), ObjectTypeConstants.BUSINESS_ASSET));

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(asset, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    public GenericItem buildGenericItemForBusinessAsset(BusinessAsset asset, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(asset);
        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(asset, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    private void handleView(BusinessAsset asset, ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<GenericItem> children = new ArrayList<>();

        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {

            switch (viewDescriptor.getViewName()) {
                case GIView.BUSINESS_ASSET_TYPE:
                    handleViewNameAssetType(asset, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.SCE:
                    handleViewNameSce(asset, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.BUSINESS_PROVIDER:
                    handleViewNameProviderInfo(asset, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.BUSINESS_ASSET_GROUP:
                    handleViewNameAssetGroup(asset, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ORGANIZATIONAL_UNIT:
                    handleViewNameOrganizationalUnit(asset, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.DIRECT_SHIELD_ELEMENT:
                    handleViewNameDirectShieldElement(asset, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("GenericItemBusinessAssetService: unknown viewName " + viewDescriptor.getViewName() + " for BusinessAsset");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
    }

    private void handleViewNameDirectShieldElement(BusinessAsset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS)) {
            handleAllLinkedCaseForViewDirectShieldElement(asset, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID)) {
            handleAllLinkedByShieldIdCaseForViewDirectShieldElement(asset, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("GenericItemAssetService: handleViewNameDirectShieldElement: viewName: direct_shield_element: unknown selection mode " + viewDescriptor.getSelectionMode());
    }

    private void handleAllLinkedByShieldIdCaseForViewDirectShieldElement(BusinessAsset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (viewDescriptor.getShieldId() == null)
            throw new ExecException("buildGenericItemForAsset: viewName: direct_shield_element: selectionMode : all_linked_by_shield_id : shieldId is null in view descriptor");
        Shield shield = shieldRepository.findOne(viewDescriptor.getShieldId());
        if (shield == null || shield.isArchived())
            throw new ExecException("buildGenericItemForAsset: viewName: direct_shield_element: selectionMode : all_linked_by_shield_id : Shield with id " + viewDescriptor.getShieldId() + " not found");
        int shieldId = shield.getId();

        List<BusinessAssetToShieldElementMap> assetToShieldElementMapList = asset.getBusinessAssetToShieldElementMapList();
        if (assetToShieldElementMapList != null && (!assetToShieldElementMapList.isEmpty())) {
            for (BusinessAssetToShieldElementMap assetToShieldElementMap : assetToShieldElementMapList) {
                if (assetToShieldElementMap != null && (!assetToShieldElementMap.isArchived())) {
                    ShieldElement shieldElement = assetToShieldElementMap.getShieldElement();
                    if (shieldElement != null && (!shieldElement.isArchived()) && shieldElement.getShield().getId().equals(shieldId))
                        children.add(genericItemShieldElementService.buildGenericItemForBusinessAssetToShieldElementMapLink(assetToShieldElementMap, shieldElement, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleAllLinkedCaseForViewDirectShieldElement(BusinessAsset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAssetToShieldElementMap> assetToShieldElementMapList = asset.getBusinessAssetToShieldElementMapList();
        if (assetToShieldElementMapList != null) {
            for (BusinessAssetToShieldElementMap assetToShieldElementMap : assetToShieldElementMapList) {
                if (assetToShieldElementMap != null && !assetToShieldElementMap.isArchived()) {
                    ShieldElement shieldElement = assetToShieldElementMap.getShieldElement();
                    if (shieldElement != null && !shieldElement.isArchived())
                        children.add(genericItemShieldElementService.buildGenericItemForBusinessAssetToShieldElementMapLink(assetToShieldElementMap, shieldElement, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameAssetGroup(BusinessAsset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAssetGroupMember> assetGroupMembers = asset.getBusinessAssetGroupMembers();
        if (assetGroupMembers != null && (!assetGroupMembers.isEmpty())) {
            for (BusinessAssetGroupMember assetGroupMember : assetGroupMembers) {
                if (assetGroupMember != null && (!assetGroupMember.isArchived()) && assetGroupMember.isActivated()) {
                    BusinessAssetGroup assetGroup = assetGroupMember.getBusinessAssetGroup();
                    if (assetGroup != null && (!assetGroup.isArchived()))
                        children.add(genericItemBusinessAssetGroupService.buildGenericItemForBusinessAssetGroup(assetGroup, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameOrganizationalUnit(BusinessAsset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        OrganizationalUnit organizationalUnit = asset.getOrganizationalUnit();
        if (organizationalUnit != null && (!organizationalUnit.isArchived()))
            children.add(genericItemOrganizationalUnitService.buildGenericItemForOrganizationalUnit(organizationalUnit, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
    }

    private void handleViewNameProviderInfo(BusinessAsset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        BusinessProvider providerInfo = asset.getBusinessProvider();
        if (providerInfo != null && (!providerInfo.isArchived())) {
            children.add(genericItemBusinessProviderService.buildGenericItemForBusinessProvider(providerInfo, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }

    }

    private void handleViewNameSce(BusinessAsset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS)) {
            handleAllLinkedCaseForViewAsset(asset, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.SHALL_DELIVER)) {
            handleShallDeliverCaseForViewAsset(asset, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.COULD_DELIVER)) {
            handleCouldDeliverCaseForViewAsset(asset, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("viewName: sce: unknown selection mode " + viewDescriptor.getSelectionMode());
    }

    private void handleCouldDeliverCaseForViewAsset(BusinessAsset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAssetToExpressionLink> businessAssetToExpressionLinks = asset.getBusinessAssetToExpressionLinks();
        if (businessAssetToExpressionLinks != null && (!businessAssetToExpressionLinks.isEmpty())) {
            for (BusinessAssetToExpressionLink businessAssetToExpressionLink : businessAssetToExpressionLinks) {
                if (businessAssetToExpressionLink != null && (!businessAssetToExpressionLink.isArchived()) && businessAssetToExpressionLink.getShallCould() != null && businessAssetToExpressionLink.getShallCould().equals(ProtectionType.COULD)) {
                    SecurityControlExpression sce = businessAssetToExpressionLink.getSce();
                    if (sce != null && (!sce.isArchived()))
                        children.add(genericItemSceService.buildGenericItemForBusinessAssetToExpressionLink(businessAssetToExpressionLink, sce, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleShallDeliverCaseForViewAsset(BusinessAsset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAssetToExpressionLink> businessAssetToExpressionLinks = asset.getBusinessAssetToExpressionLinks();
        if (businessAssetToExpressionLinks != null && (!businessAssetToExpressionLinks.isEmpty())) {
            for (BusinessAssetToExpressionLink businessAssetToExpressionLink : businessAssetToExpressionLinks) {
                if (businessAssetToExpressionLink != null && (!businessAssetToExpressionLink.isArchived()) && businessAssetToExpressionLink.getShallCould() != null && businessAssetToExpressionLink.getShallCould().equals(ProtectionType.SHALL)) {
                    SecurityControlExpression sce = businessAssetToExpressionLink.getSce();
                    if (sce != null && (!sce.isArchived()))
                        children.add(genericItemSceService.buildGenericItemForBusinessAssetToExpressionLink(businessAssetToExpressionLink, sce, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleAllLinkedCaseForViewAsset(BusinessAsset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAssetToExpressionLink> businessAssetToExpressionLinks = asset.getBusinessAssetToExpressionLinks();
        if (businessAssetToExpressionLinks != null && (!businessAssetToExpressionLinks.isEmpty())) {
            for (BusinessAssetToExpressionLink businessAssetToExpressionLink : businessAssetToExpressionLinks) {
                if (businessAssetToExpressionLink != null && (!businessAssetToExpressionLink.isArchived())) {
                    SecurityControlExpression sce = businessAssetToExpressionLink.getSce();
                    if (sce != null && (!sce.isArchived()))
                        children.add(genericItemSceService.buildGenericItemForBusinessAssetToExpressionLink(businessAssetToExpressionLink, sce, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameAssetType(BusinessAsset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        BusinessAssetType assetType = asset.getBusinessAssetType();
        if (assetType != null && (!assetType.isArchived())) {
            children.add(genericItemBusinessAssetTypeService.buildGenericItemForBusinessAssetType(assetType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }
}
