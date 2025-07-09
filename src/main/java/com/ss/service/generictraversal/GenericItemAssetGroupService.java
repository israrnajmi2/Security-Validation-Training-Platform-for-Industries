package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIView;
import com.ss.domain.asset.Asset;
import com.ss.domain.groups.AssetGroup;
import com.ss.domain.groups.AssetGroupMember;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("GenericItemAssetGroupService")
public class GenericItemAssetGroupService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private GenericItemAssetService genericItemAssetService;

    @Autowired
    private GenericItemOrganizationalUnitService genericItemOrganizationalUnitService;


    public GenericItem buildGenericItemForAssetGroup(AssetGroup assetGroup, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetGroup);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(assetGroup, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    private void handleView(AssetGroup assetGroup, ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<GenericItem> children = new ArrayList<>();

        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {

            switch (viewDescriptor.getViewName()) {
                case GIView.ASSET:
                    handleViewNameAsset(assetGroup, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ORGANIZATIONAL_UNIT:
                    handleViewNameOrganizationalUnit(assetGroup, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("GenericItemSceGroupService: unknown viewName " + viewDescriptor.getViewName() + " for SceGroup");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
    }

    private void handleViewNameAsset(AssetGroup assetGroup, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<AssetGroupMember> assetGroupMembers = assetGroup.getAssetGroupMembers();
        if (assetGroupMembers != null && (!assetGroupMembers.isEmpty())) {
            for (AssetGroupMember assetGroupMember : assetGroupMembers) {
                if (assetGroupMember != null && (!assetGroupMember.isArchived()) && assetGroupMember.isActivated()) {
                    Asset asset = assetGroupMember.getAsset();

                    if (asset != null && (!asset.isArchived()))
                        children.add(genericItemAssetService.buildGenericItemForAsset(asset, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameOrganizationalUnit(AssetGroup assetGroup, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        OrganizationalUnit organizationalUnit = assetGroup.getOrganizationalUnit();
        if (organizationalUnit != null && (!organizationalUnit.isArchived()))
            children.add(genericItemOrganizationalUnitService.buildGenericItemForOrganizationalUnit(organizationalUnit, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
    }
}
