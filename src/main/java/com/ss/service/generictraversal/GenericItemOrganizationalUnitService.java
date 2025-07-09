package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.domain.asset.Asset;
import com.ss.domain.asset.AssetType;
import com.ss.domain.asset.ProviderInfo;
import com.ss.domain.groups.*;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.domain.usermanagement.SphericUser;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.shieldclassification.ShieldRepository;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("GenericItemOrganizationalUnitService")
public class GenericItemOrganizationalUnitService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemProviderInfoService genericItemProviderInfoService;

    @Autowired
    private GenericItemAssetTypeService genericItemAssetTypeService;

    @Autowired
    private GenericItemAssetService genericItemAssetService;

    @Autowired
    private GenericItemShieldElementService genericItemShieldElementService;

    @Autowired
    private ShieldRepository shieldRepository;

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
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private GenericItemSphericUserService genericItemSphericUserService;


    public GenericItem buildGenericItemForOrganizationalUnit(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(organizationalUnit);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(organizationalUnit, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    private void handleView(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<GenericItem> children = new ArrayList<>();

        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            switch (viewDescriptor.getViewName()) {
                case GIView.ASSET_TYPE:
                    handleViewNameAssetType(organizationalUnit, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ASSET:
                    handleViewNameAsset(organizationalUnit, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.STANDARD_ELEMENT:
                case GIView.BUSINESS_ELEMENT:
                case GIView.THREAT_ELEMENT:
                case GIView.SHIELD_ELEMENT:
                    handleViewNameShieldElement(organizationalUnit, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.PROVIDER:
                    handleViewNameProviderInfo(organizationalUnit, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ORGANIZATIONAL_UNIT:
                    handleViewNameOrganizationalUnit(organizationalUnit, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.SHIELD_ELEMENT_GROUP:
                    handleViewNameShieldElementGroup(organizationalUnit, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.SCE_GROUP:
                    handleViewNameSceGroup(organizationalUnit, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ASSET_GROUP:
                    handleViewNameAssetGroup(organizationalUnit, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ASSET_TYPE_GROUP:
                    handleViewNameAssetTypeGroup(organizationalUnit, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.PROVIDER_GROUP:
                    handleViewNameProviderInfoGroup(organizationalUnit, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.SPHERIC_USER:
                    handleViewNameSphericUser(organizationalUnit, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("PerspectiveGenericItemOrganizationalUnitService: unknown viewName " + viewDescriptor.getViewName() + " for OrganizationalUnit");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
    }

    private void handleViewNameSphericUser(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<SphericUser> sphericUserList = organizationalUnit.getSphericUserList();
        if (sphericUserList != null) {
            for (SphericUser sphericUser : sphericUserList) {
                if (sphericUser != null && !sphericUser.isArchived() && sphericUser.isActivated()) {
                    children.add(genericItemSphericUserService.buildGenericItemForSphericUser(sphericUser, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameProviderInfoGroup(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ProviderGroup> providerGroups = organizationalUnit.getProviderGroups();
        if (providerGroups != null && !providerGroups.isEmpty()) {
            for (ProviderGroup providerGroup : providerGroups) {
                if (providerGroup != null && !providerGroup.isArchived())
                    children.add(genericItemProviderGroupService.buildGenericItemForProviderGroup(providerGroup, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleViewNameAssetGroup(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<AssetGroup> assetGroups = organizationalUnit.getAssetGroups();
        if (assetGroups != null && !assetGroups.isEmpty()) {
            for (AssetGroup assetGroup : assetGroups) {
                if (assetGroup != null && !assetGroup.isArchived())
                    children.add(genericItemAssetGroupService.buildGenericItemForAssetGroup(assetGroup, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleViewNameAssetTypeGroup(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<AssetTypeGroup> assetTypeGroups = organizationalUnit.getAssetTypeGroups();
        if (assetTypeGroups != null && !assetTypeGroups.isEmpty()) {
            for (AssetTypeGroup assetTypeGroup : assetTypeGroups) {
                if (assetTypeGroup != null && !assetTypeGroup.isArchived())
                    children.add(genericItemAssetTypeGroupService.buildGenericItemForAssetTypeGroup(assetTypeGroup, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleViewNameSceGroup(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<SceGroup> sceGroups = organizationalUnit.getSceGroups();
        if (sceGroups != null && !sceGroups.isEmpty()) {
            for (SceGroup sceGroup : sceGroups) {
                if (sceGroup != null && !sceGroup.isArchived())
                    children.add(genericItemSceGroupService.buildGenericItemForSceGroup(sceGroup, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleViewNameShieldElementGroup(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ShieldElementGroup> shieldElementGroups = organizationalUnit.getShieldElementGroups();
        if (shieldElementGroups != null && !shieldElementGroups.isEmpty()) {
            for (ShieldElementGroup shieldElementGroup : shieldElementGroups) {
                if (shieldElementGroup != null && !shieldElementGroup.isArchived())
                    children.add(genericItemShieldElementGroupService.buildGenericItemForShieldElementGroup(shieldElementGroup, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleViewNameOrganizationalUnit(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS) ||
                viewDescriptor.getSelectionMode().equals(GIMode.CHILDREN_ELEMENTS)) {
            handleChildrenCaseForViewOrganizationalUnit(organizationalUnit, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.PARENT_ELEMENT)) {
            handleParentCaseForViewOrganizationalUnit(organizationalUnit, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("PerspectiveGenericItemOrganizationalUnitService: viewName: organizational_unit: unknown selection mode " + viewDescriptor.getSelectionMode());
    }

    private void handleParentCaseForViewOrganizationalUnit(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        OrganizationalUnit parentOU = organizationalUnit.getParentOrganizationalUnit();
        if (parentOU != null && (!parentOU.isArchived())) {
            children.add(buildGenericItemForOrganizationalUnit(parentOU, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }

    private void handleChildrenCaseForViewOrganizationalUnit(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<OrganizationalUnit> childrenOUList = organizationalUnit.getChildrenOrganizationalUnits();
        if (childrenOUList != null && (!childrenOUList.isEmpty())) {
            for (OrganizationalUnit childOU : childrenOUList) {
                if (childOU != null && (!childOU.isArchived()))
                    children.add(buildGenericItemForOrganizationalUnit(childOU, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleViewNameProviderInfo(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {

        List<ProviderInfo> providersList = organizationalUnit.getAllLinkedProviders();
        if (providersList != null && !(providersList.isEmpty())) {
            for (ProviderInfo provider : providersList) {
                if (provider != null && (!provider.isArchived()))
                    children.add(genericItemProviderInfoService.buildGenericItemForProviderInfo(provider, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleViewNameShieldElement(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS)) {
            handleAllLinkedCaseForViewShieldElement(organizationalUnit, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID)) {
            handleAllLinkedByShieldIdCaseForViewShieldElement(organizationalUnit, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("PerspectiveGenericItemOrganizationalUnitService: viewName: shield_element: unknown selection mode " + viewDescriptor.getSelectionMode());
    }

    private void handleAllLinkedByShieldIdCaseForViewShieldElement(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (viewDescriptor.getShieldId() == null)
            throw new ExecException("buildGenericItemForOrganizationalUnit: viewName: shield_element: selectionMode : all_linked_by_shield_id : shieldId is null in view descriptor");

        Shield shield = shieldRepository.findOne(viewDescriptor.getShieldId());
        if (shield == null || shield.isArchived())
            throw new ExecException("buildGenericItemForOrganizationalUnit: viewName: shield_element: selectionMode : all_linked_by_shield_id : Shield with id " + viewDescriptor.getShieldId() + " not found");

        List<ShieldElement> shieldElementList = organizationalUnit.getAllLinkedShieldElements();
        if (shieldElementList != null && (!shieldElementList.isEmpty())) {
            for (ShieldElement shieldElement : shieldElementList) {
                if (shieldElement != null && (!shieldElement.isArchived()) && (shieldElement.getShield().getId().equals(viewDescriptor.getShieldId())))
                    children.add(genericItemShieldElementService.buildGenericItemForShieldElement(shieldElement, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleAllLinkedCaseForViewShieldElement(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ShieldElement> shieldElementList = organizationalUnit.getAllLinkedShieldElements();
        if (shieldElementList != null && (!shieldElementList.isEmpty())) {
            for (ShieldElement shieldElement : shieldElementList) {
                if (shieldElement != null && (!shieldElement.isArchived()))
                    children.add(genericItemShieldElementService.buildGenericItemForShieldElement(shieldElement, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleViewNameAsset(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<Asset> assetList = organizationalUnit.getAllLinkedAssets();
        if (assetList != null && (!assetList.isEmpty())) {
            for (Asset asset : assetList) {
                if (asset != null && (!asset.isArchived()))
                    children.add(genericItemAssetService.buildGenericItemForAsset(asset, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }


    private void handleViewNameAssetType(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<AssetType> assetTypeList = organizationalUnit.getAllLinkedAssetTypes();
        if (assetTypeList != null && (!assetTypeList.isEmpty())) {
            for (AssetType assetType : assetTypeList) {
                if (assetType != null && (!assetType.isArchived()))
                    children.add(genericItemAssetTypeService.buildGenericItemForAssetType(assetType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }
}
