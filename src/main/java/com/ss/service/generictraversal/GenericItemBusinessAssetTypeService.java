package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.*;
import com.ss.domain.businessasset.BusinessAsset;
import com.ss.domain.businessasset.BusinessAssetType;
import com.ss.domain.businessasset.BusinessAssetTypeToExpressionLink;
import com.ss.domain.businessasset.BusinessAssetTypeToShieldElementMap;
import com.ss.domain.groups.BusinessAssetTypeGroup;
import com.ss.domain.groups.BusinessAssetTypeGroupMember;
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

@Service("GenericItemBusinessAssetTypeService")
public class GenericItemBusinessAssetTypeService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemSceService genericItemSceService;

    @Autowired
    private GenericItemBusinessAssetService genericItemBusinessAssetService;

    @Autowired
    private GenericItemBusinessAssetTypeGroupService genericItemBusinessAssetTypeGroupService;

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

    public GenericItem buildGenericItemForBusinessAssetTypeToExpressionLink(BusinessAssetTypeToExpressionLink businessAssetTypeToExpressionLink, BusinessAssetType assetType, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (businessAssetTypeToExpressionLink == null)
            throw new ExecException("buildGenericItemForAssetTypeWithProtectedBySceLink method : BusinessAssetTypeToExpressionLink parameter is null");
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetType);
        genericItem.setLinkId(businessAssetTypeToExpressionLink.getId());
        switch (businessAssetTypeToExpressionLink.getShallCouldIs()) {
            case ProtectionType.COULD:
                genericItem.setLinkType(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_EXPRESSION_LINK_COULD);
                genericItem.setLinkName(LinkName.EXPRESSION_TO_BUSINESS_ASSET_TYPE_COULD);
                break;
            case ProtectionType.SHALL:
                genericItem.setLinkType(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_EXPRESSION_LINK);
                genericItem.setLinkName(LinkName.EXPRESSION_TO_BUSINESS_ASSET_TYPE);
                break;
            default:
                throw new ExecException("Unknown protection type for business asset type " + businessAssetTypeToExpressionLink.getShallCouldIs());
        }

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(assetType, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    public GenericItem buildGenericItemForBusinessAssetTypeToShieldElementMapLink(BusinessAssetTypeToShieldElementMap assetTypeToShieldElementMap, BusinessAssetType assetType, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (assetTypeToShieldElementMap == null)
            throw new ExecException("buildGenericItemForAssetTypeToShieldElementMapLink method : assetTypeToShieldElementMap parameter is null");
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetType);
        genericItem.setLinkId(assetTypeToShieldElementMap.getId());
        genericItem.setLinkType(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_SHIELD_ELEMENT_LINK);
        genericItem.setLinkName(linkNameHelper.getLinkName(linkNameHelper.getObjectTypeForElement(assetTypeToShieldElementMap.getShieldElement()), ObjectTypeConstants.BUSINESS_ASSET_TYPE));

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(assetType, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    public GenericItem buildGenericItemForBusinessAssetType(BusinessAssetType assetType, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetType);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(assetType, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    private void handleView(BusinessAssetType assetType, ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<GenericItem> children = new ArrayList<>();


        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            switch (viewDescriptor.getViewName()) {
                case GIView.BUSINESS_ASSET_TYPE:
                    handleViewNameBusinessAssetType(assetType, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.BUSINESS_ASSET:
                    handleViewNameBusinessAsset(assetType, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.SCE:
                    handleViewNameSce(assetType, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.BUSINESS_ASSET_TYPE_GROUP:
                    handleViewNameBusinessAssetTypeGroup(assetType, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ORGANIZATIONAL_UNIT:
                    handleViewNameOrganizationalUnit(assetType, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.DIRECT_SHIELD_ELEMENT:
                    handleViewNameDirectShieldElement(assetType, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("GenericItemBusinessAssetTypeService: unknown viewName " + viewDescriptor.getViewName() + " for BusinessAssetType");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
    }

    private void handleViewNameDirectShieldElement(BusinessAssetType assetType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS)) {
            handleAllLinkedCaseForViewDirectShieldElement(assetType, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID)) {
            handleAllLinkedByShieldIdCaseForViewDirectShieldElement(assetType, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("GenericItemAssetTypeService: handleViewNameDirectShieldElement: viewName: direct_shield_element: unknown selection mode " + viewDescriptor.getSelectionMode());
    }

    private void handleAllLinkedByShieldIdCaseForViewDirectShieldElement(BusinessAssetType assetType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (viewDescriptor.getShieldId() == null)
            throw new ExecException("buildGenericItemForAsset: viewName: direct_shield_element: selectionMode : all_linked_by_shield_id : shieldId is null in view descriptor");
        Shield shield = shieldRepository.findOne(viewDescriptor.getShieldId());
        if (shield == null || shield.isArchived())
            throw new ExecException("buildGenericItemForAsset: viewName: direct_shield_element: selectionMode : all_linked_by_shield_id : Shield with id " + viewDescriptor.getShieldId() + " not found");
        int shieldId = shield.getId();

        List<BusinessAssetTypeToShieldElementMap> assetTypeToShieldElementMapList = assetType.getBusinessAssetTypeToShieldElementMapList();
        if (assetTypeToShieldElementMapList != null && (!assetTypeToShieldElementMapList.isEmpty())) {
            for (BusinessAssetTypeToShieldElementMap assetTypeToShieldElementMap : assetTypeToShieldElementMapList) {
                if (assetTypeToShieldElementMap != null && (!assetTypeToShieldElementMap.isArchived())) {
                    ShieldElement shieldElement = assetTypeToShieldElementMap.getShieldElement();
                    if (shieldElement != null && (!shieldElement.isArchived()) && shieldElement.getShield().getId().equals(shieldId))
                        children.add(genericItemShieldElementService.buildGenericItemForBusinessAssetTypeToShieldElementMap(assetTypeToShieldElementMap, shieldElement, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleAllLinkedCaseForViewDirectShieldElement(BusinessAssetType assetType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAssetTypeToShieldElementMap> assetTypeToShieldElementMapList = assetType.getBusinessAssetTypeToShieldElementMapList();
        if (assetTypeToShieldElementMapList != null) {
            for (BusinessAssetTypeToShieldElementMap assetTypeToShieldElementMap : assetTypeToShieldElementMapList) {
                if (assetTypeToShieldElementMap != null && !assetTypeToShieldElementMap.isArchived()) {
                    ShieldElement shieldElement = assetTypeToShieldElementMap.getShieldElement();
                    if (shieldElement != null && !shieldElement.isArchived())
                        children.add(genericItemShieldElementService.buildGenericItemForBusinessAssetTypeToShieldElementMap(assetTypeToShieldElementMap, shieldElement, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameBusinessAssetTypeGroup(BusinessAssetType assetType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAssetTypeGroupMember> assetTypeGroupMembers = assetType.getBusinessAssetTypeGroupMembers();
        if (assetTypeGroupMembers != null && (!assetTypeGroupMembers.isEmpty())) {
            for (BusinessAssetTypeGroupMember assetTypeGroupMember : assetTypeGroupMembers) {
                if (assetTypeGroupMember != null && assetTypeGroupMember.isActivated() && (!assetTypeGroupMember.isArchived())) {
                    BusinessAssetTypeGroup assetTypeGroup = assetTypeGroupMember.getBusinessAssetTypeGroup();
                    if (assetTypeGroup != null && (!assetTypeGroup.isArchived())) {
                        children.add(genericItemBusinessAssetTypeGroupService.buildGenericItemForBusinessAssetTypeGroup(assetTypeGroup, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                    }
                }
            }
        }
    }

    private void handleViewNameOrganizationalUnit(BusinessAssetType assetType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        OrganizationalUnit organizationalUnit = assetType.getOrganizationalUnit();
        if (organizationalUnit != null && (!organizationalUnit.isArchived()))
            children.add(genericItemOrganizationalUnitService.buildGenericItemForOrganizationalUnit(organizationalUnit, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
    }

    private void handleViewNameSce(BusinessAssetType assetType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS)) {
            handleAllLinkedCaseForViewAssetType(assetType, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.SHALL_PROTECT)) {
            handleShallProtectCaseForViewAssetType(assetType, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.COULD_PROTECT)) {
            handleCouldProtectCaseForViewAssetType(assetType, viewDescriptor, children, perspectiveGroupInfo);
        /*} else if (viewDescriptor.getSelectionMode().equals(GIMode.PROTECT)) {
            handleProtectCaseForViewAssetType(assetType, viewDescriptor, children, perspectiveGroupInfo);*/
        } else
            throw new ExecException("PerspectiveGenericItemAssetTypeService: viewName: asset_type: unknown selection mode " + viewDescriptor.getSelectionMode());
    }

    private void handleCouldProtectCaseForViewAssetType(BusinessAssetType assetType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAssetTypeToExpressionLink> businessAssetTypeToExpressionLinks = assetType.getBusinessAssetTypeToExpressionLinks();
        if (businessAssetTypeToExpressionLinks != null && (!businessAssetTypeToExpressionLinks.isEmpty())) {
            for (BusinessAssetTypeToExpressionLink businessAssetTypeToExpressionLink : businessAssetTypeToExpressionLinks) {
                if (businessAssetTypeToExpressionLink != null && (!businessAssetTypeToExpressionLink.isArchived()) && businessAssetTypeToExpressionLink.getShallCouldIs() != null
                        && businessAssetTypeToExpressionLink.getShallCouldIs().equals(ProtectionType.COULD)) {
                    SecurityControlExpression sce = businessAssetTypeToExpressionLink.getSce();
                    if (sce != null && (!sce.isArchived()))
                        children.add(genericItemSceService.buildGenericItemForSceWithBusinessAssetTypeToExpressionLink(businessAssetTypeToExpressionLink, sce, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleShallProtectCaseForViewAssetType(BusinessAssetType assetType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAssetTypeToExpressionLink> businessAssetTypeToExpressionLinks = assetType.getBusinessAssetTypeToExpressionLinks();
        if (businessAssetTypeToExpressionLinks != null && (!businessAssetTypeToExpressionLinks.isEmpty())) {
            for (BusinessAssetTypeToExpressionLink businessAssetTypeToExpressionLink : businessAssetTypeToExpressionLinks) {
                if (businessAssetTypeToExpressionLink != null && (!businessAssetTypeToExpressionLink.isArchived()) && businessAssetTypeToExpressionLink.getShallCouldIs() != null
                        && businessAssetTypeToExpressionLink.getShallCouldIs().equals(ProtectionType.SHALL)) {
                    SecurityControlExpression sce = businessAssetTypeToExpressionLink.getSce();
                    if (sce != null && (!sce.isArchived()))
                        children.add(genericItemSceService.buildGenericItemForSceWithBusinessAssetTypeToExpressionLink(businessAssetTypeToExpressionLink, sce, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleAllLinkedCaseForViewAssetType(BusinessAssetType assetType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAssetTypeToExpressionLink> businessAssetTypeToExpressionLinks = assetType.getBusinessAssetTypeToExpressionLinks();
        if (businessAssetTypeToExpressionLinks != null && (!businessAssetTypeToExpressionLinks.isEmpty())) {
            for (BusinessAssetTypeToExpressionLink businessAssetTypeToExpressionLink : businessAssetTypeToExpressionLinks) {
                if (businessAssetTypeToExpressionLink != null && (!businessAssetTypeToExpressionLink.isArchived())) {
                    SecurityControlExpression sce = businessAssetTypeToExpressionLink.getSce();
                    if (sce != null && (!sce.isArchived()))
                        children.add(genericItemSceService.buildGenericItemForSceWithBusinessAssetTypeToExpressionLink(businessAssetTypeToExpressionLink, sce, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameBusinessAsset(BusinessAssetType assetType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAsset> assetList = assetType.getBusinessAssetList();
        if (assetList != null && (!assetList.isEmpty())) {
            for (BusinessAsset asset : assetList) {
                if (asset != null && (!asset.isArchived())) {
                    children.add(genericItemBusinessAssetService.buildGenericItemForBusinessAsset(asset, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameBusinessAssetType(BusinessAssetType assetType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS) ||
                viewDescriptor.getSelectionMode().equals(GIMode.CHILDREN_ELEMENTS)) {
            handleChildrenCaseForViewAssetType(assetType, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.PARENT_ELEMENT)) {
            handleParentCaseForViewAssetType(assetType, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("PerspectiveGenericItemAssetTypeService: viewName: asset_type: unknown selection mode " + viewDescriptor.getSelectionMode());
    }

    private void handleChildrenCaseForViewAssetType(BusinessAssetType assetType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAssetType> childrenAssetTypeList = assetType.getChildrenBusinessAssetTypeList();
        if (childrenAssetTypeList != null && (!childrenAssetTypeList.isEmpty())) {
            for (BusinessAssetType childAssetType : childrenAssetTypeList) {
                if (childAssetType != null && (!childAssetType.isArchived()))
                    children.add(buildGenericItemForBusinessAssetType(childAssetType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleParentCaseForViewAssetType(BusinessAssetType assetType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        BusinessAssetType parentAssetType = assetType.getParentBusinessAssetType();
        if (parentAssetType != null && (!parentAssetType.isArchived()))
            children.add(buildGenericItemForBusinessAssetType(parentAssetType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
    }
}
