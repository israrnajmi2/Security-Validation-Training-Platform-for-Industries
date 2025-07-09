package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIView;
import com.ss.domain.asset.AssetType;
import com.ss.domain.groups.AssetTypeGroup;
import com.ss.domain.groups.AssetTypeGroupMember;
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

@Service("GenericItemAssetTypeGroupService")
public class GenericItemAssetTypeGroupService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private GenericItemAssetTypeService genericItemAssetTypeService;

    @Autowired
    private GenericItemOrganizationalUnitService genericItemOrganizationalUnitService;


    public GenericItem buildGenericItemForAssetTypeGroup(AssetTypeGroup assetTypeGroup, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetTypeGroup);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(assetTypeGroup, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    private void handleView(AssetTypeGroup assetTypeGroup, ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<GenericItem> children = new ArrayList<>();

        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {

            switch (viewDescriptor.getViewName()) {
                case GIView.ASSET_TYPE:
                    handleViewNameAssetType(assetTypeGroup, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ORGANIZATIONAL_UNIT:
                    handleViewNameOrganizationalUnit(assetTypeGroup, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("GenericItemAssetTypeGroupService: unknown viewName " + viewDescriptor.getViewName() + " for AssetTypeGroup");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
    }

    private void handleViewNameAssetType(AssetTypeGroup assetTypeGroup, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<AssetTypeGroupMember> assetTypeGroupMembers = assetTypeGroup.getAssetTypeGroupMembers();
        if (assetTypeGroupMembers != null && (!assetTypeGroupMembers.isEmpty())) {
            for (AssetTypeGroupMember assetTypeGroupMember : assetTypeGroupMembers) {
                if (assetTypeGroupMember != null && (!assetTypeGroupMember.isArchived()) && assetTypeGroupMember.isActivated()) {
                    AssetType assetType = assetTypeGroupMember.getAssetType();

                    if (assetType != null && (!assetType.isArchived()))
                        children.add(genericItemAssetTypeService.buildGenericItemForAssetType(assetType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameOrganizationalUnit(AssetTypeGroup assetTypeGroup, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        OrganizationalUnit organizationalUnit = assetTypeGroup.getOrganizationalUnit();
        if (organizationalUnit != null && (!organizationalUnit.isArchived()))
            children.add(genericItemOrganizationalUnitService.buildGenericItemForOrganizationalUnit(organizationalUnit, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
    }
}
