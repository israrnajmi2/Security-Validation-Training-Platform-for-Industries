package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.*;
import com.ss.domain.asset.*;
import com.ss.domain.groups.AssetGroup;
import com.ss.domain.groups.AssetGroupMember;
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

@Service("GenericItemAssetService")
public class GenericItemAssetService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemSceService genericItemSceService;

    @Autowired
    private GenericItemAssetTypeService genericItemAssetTypeService;

    @Autowired
    private GenericItemProviderInfoService genericItemProviderInfoService;

    @Autowired
    private GenericItemAssetGroupService genericItemAssetGroupService;

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

    public GenericItem buildGenericItemForAssetWithDeliversSceLink(AssetDeliversSce assetDeliversSce, Asset asset, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (assetDeliversSce == null)
            throw new ExecException("buildGenericItemForAssetWithDeliversSceLink method : assetDeliversSce parameter is null");
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(asset);
        genericItem.setLinkId(assetDeliversSce.getId());
        switch (assetDeliversSce.getShallCould()) {
            case ProtectionType.COULD:
                genericItem.setLinkType(ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK_COULD);
                genericItem.setLinkName(LinkName.EXPRESSION_TO_ASSET_COULD);
                break;
            case ProtectionType.SHALL:
                genericItem.setLinkType(ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK);
                genericItem.setLinkName(LinkName.EXPRESSION_TO_ASSET);
                break;
            default:
                throw new ExecException("Unknown protection type for asset type " + assetDeliversSce.getShallCould());
        }

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        if (perspectiveGroupInfo.isRated()) {
            if (perspectiveGroupInfo.getRulerType().equals(RulerTypeConstants.ASSET_DELIVERS_SCE)) {
                genericItem.setRating(genericItemIndexCalculator.getRatingForAssetDeliversSceLink(assetDeliversSce, perspectiveGroupInfo.getPerspectiveIds(), perspectiveGroupInfo.getDate()));
            }
        }

        handleView(asset, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    public GenericItem buildGenericItemForAssetToShieldElementMapLink(AssetToShieldElementMap assetToShieldElementMap, Asset asset, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (assetToShieldElementMap == null)
            throw new ExecException("buildGenericItemForAssetToShieldElementMapLink method : assetToShieldElementMap parameter is null");
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(asset);
        genericItem.setLinkId(assetToShieldElementMap.getId());
        genericItem.setLinkType(ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK);
        genericItem.setLinkName(linkNameHelper.getLinkName(linkNameHelper.getObjectTypeForElement(assetToShieldElementMap.getShieldElement()), ObjectTypeConstants.ASSET));

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        if (perspectiveGroupInfo.isRated()) {
            if (perspectiveGroupInfo.getRulerType().equals(RulerTypeConstants.ASSET_IMPLEMENTS_ELEMENT)) {
                genericItem.setRating(genericItemIndexCalculator.getRatingForAssetImplementsElementLink(assetToShieldElementMap, perspectiveGroupInfo.getPerspectiveIds(), perspectiveGroupInfo.getDate()));
            }
        }

        handleView(asset, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    public GenericItem buildGenericItemForAsset(Asset asset, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(asset);
        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(asset, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    private void handleView(Asset asset, ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<GenericItem> children = new ArrayList<>();

        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {

            switch (viewDescriptor.getViewName()) {
                case GIView.ASSET_TYPE:
                    handleViewNameAssetType(asset, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.SCE:
                    handleViewNameSce(asset, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.PROVIDER:
                    handleViewNameProviderInfo(asset, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ASSET_GROUP:
                    handleViewNameAssetGroup(asset, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ORGANIZATIONAL_UNIT:
                    handleViewNameOrganizationalUnit(asset, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.DIRECT_SHIELD_ELEMENT:
                    handleViewNameDirectShieldElement(asset, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("GenericItemAssetService: unknown viewName " + viewDescriptor.getViewName() + " for Asset");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
    }

    private void handleViewNameDirectShieldElement(Asset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS)) {
            handleAllLinkedCaseForViewDirectShieldElement(asset, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID)) {
            handleAllLinkedByShieldIdCaseForViewDirectShieldElement(asset, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("GenericItemAssetService: handleViewNameDirectShieldElement: viewName: direct_shield_element: unknown selection mode " + viewDescriptor.getSelectionMode());
    }

    private void handleAllLinkedByShieldIdCaseForViewDirectShieldElement(Asset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (viewDescriptor.getShieldId() == null)
            throw new ExecException("buildGenericItemForAsset: viewName: direct_shield_element: selectionMode : all_linked_by_shield_id : shieldId is null in view descriptor");
        Shield shield = shieldRepository.findOne(viewDescriptor.getShieldId());
        if (shield == null || shield.isArchived())
            throw new ExecException("buildGenericItemForAsset: viewName: direct_shield_element: selectionMode : all_linked_by_shield_id : Shield with id " + viewDescriptor.getShieldId() + " not found");
        int shieldId = shield.getId();

        List<AssetToShieldElementMap> assetToShieldElementMapList = asset.getAssetToShieldElementMapList();
        if (assetToShieldElementMapList != null && (!assetToShieldElementMapList.isEmpty())) {
            for (AssetToShieldElementMap assetToShieldElementMap : assetToShieldElementMapList) {
                if (assetToShieldElementMap != null && (!assetToShieldElementMap.isArchived())) {
                    ShieldElement shieldElement = assetToShieldElementMap.getShieldElement();
                    if (shieldElement != null && (!shieldElement.isArchived()) && shieldElement.getShield().getId().equals(shieldId))
                        children.add(genericItemShieldElementService.buildGenericItemForAssetToShieldElementMapLink(assetToShieldElementMap, shieldElement, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleAllLinkedCaseForViewDirectShieldElement(Asset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<AssetToShieldElementMap> assetToShieldElementMapList = asset.getAssetToShieldElementMapList();
        if (assetToShieldElementMapList != null) {
            for (AssetToShieldElementMap assetToShieldElementMap : assetToShieldElementMapList) {
                if (assetToShieldElementMap != null && !assetToShieldElementMap.isArchived()) {
                    ShieldElement shieldElement = assetToShieldElementMap.getShieldElement();
                    if (shieldElement != null && !shieldElement.isArchived())
                        children.add(genericItemShieldElementService.buildGenericItemForAssetToShieldElementMapLink(assetToShieldElementMap, shieldElement, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameAssetGroup(Asset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<AssetGroupMember> assetGroupMembers = asset.getAssetGroupMembers();
        if (assetGroupMembers != null && (!assetGroupMembers.isEmpty())) {
            for (AssetGroupMember assetGroupMember : assetGroupMembers) {
                if (assetGroupMember != null && (!assetGroupMember.isArchived()) && assetGroupMember.isActivated()) {
                    AssetGroup assetGroup = assetGroupMember.getAssetGroup();
                    if (assetGroup != null && (!assetGroup.isArchived()))
                        children.add(genericItemAssetGroupService.buildGenericItemForAssetGroup(assetGroup, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameOrganizationalUnit(Asset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        OrganizationalUnit organizationalUnit = asset.getOrganizationalUnit();
        if (organizationalUnit != null && (!organizationalUnit.isArchived()))
            children.add(genericItemOrganizationalUnitService.buildGenericItemForOrganizationalUnit(organizationalUnit, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
    }

    private void handleViewNameProviderInfo(Asset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        ProviderInfo providerInfo = asset.getProviderInfo();
        if (providerInfo != null && (!providerInfo.isArchived())) {
            children.add(genericItemProviderInfoService.buildGenericItemForProviderInfo(providerInfo, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }

    }

    private void handleViewNameSce(Asset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS)) {
            handleAllLinkedCaseForViewAsset(asset, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.SHALL_DELIVER)) {
            handleShallDeliverCaseForViewAsset(asset, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.COULD_DELIVER)) {
            handleCouldDeliverCaseForViewAsset(asset, viewDescriptor, children, perspectiveGroupInfo);
        /*} else if (viewDescriptor.getSelectionMode().equals(GIMode.PROTECT)) {
            handleProtectCaseForViewAssetType(assetType, viewDescriptor, children, perspectiveGroupInfo);*/
        } else
            throw new ExecException("viewName: sce: unknown selection mode " + viewDescriptor.getSelectionMode());
    }

    private void handleCouldDeliverCaseForViewAsset(Asset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<AssetDeliversSce> assetDeliversSceList = asset.getAssetDeliversSceList();
        if (assetDeliversSceList != null && (!assetDeliversSceList.isEmpty())) {
            for (AssetDeliversSce assetDeliversSce : assetDeliversSceList) {
                if (assetDeliversSce != null && (!assetDeliversSce.isArchived()) && assetDeliversSce.getShallCould() != null && assetDeliversSce.getShallCould().equals(ProtectionType.COULD)) {
                    SecurityControlExpression sce = assetDeliversSce.getSce();
                    if (sce != null && (!sce.isArchived()))
                        children.add(genericItemSceService.buildGenericItemForSceWithAssetDeliversLink(assetDeliversSce, sce, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleShallDeliverCaseForViewAsset(Asset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<AssetDeliversSce> assetDeliversSceList = asset.getAssetDeliversSceList();
        if (assetDeliversSceList != null && (!assetDeliversSceList.isEmpty())) {
            for (AssetDeliversSce assetDeliversSce : assetDeliversSceList) {
                if (assetDeliversSce != null && (!assetDeliversSce.isArchived()) && assetDeliversSce.getShallCould() != null && assetDeliversSce.getShallCould().equals(ProtectionType.SHALL)) {
                    SecurityControlExpression sce = assetDeliversSce.getSce();
                    if (sce != null && (!sce.isArchived()))
                        children.add(genericItemSceService.buildGenericItemForSceWithAssetDeliversLink(assetDeliversSce, sce, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleAllLinkedCaseForViewAsset(Asset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<AssetDeliversSce> assetDeliversSceList = asset.getAssetDeliversSceList();
        if (assetDeliversSceList != null && (!assetDeliversSceList.isEmpty())) {
            for (AssetDeliversSce assetDeliversSce : assetDeliversSceList) {
                if (assetDeliversSce != null && (!assetDeliversSce.isArchived())) {
                    SecurityControlExpression sce = assetDeliversSce.getSce();
                    if (sce != null && (!sce.isArchived()))
                        children.add(genericItemSceService.buildGenericItemForSceWithAssetDeliversLink(assetDeliversSce, sce, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameAssetType(Asset asset, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        AssetType assetType = asset.getAssetType();
        if (assetType != null && (!assetType.isArchived())) {
            children.add(genericItemAssetTypeService.buildGenericItemForAssetType(assetType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }
}
