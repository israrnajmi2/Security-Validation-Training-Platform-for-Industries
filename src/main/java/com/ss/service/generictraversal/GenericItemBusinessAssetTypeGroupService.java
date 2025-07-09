package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIView;
import com.ss.domain.businessasset.BusinessAssetType;
import com.ss.domain.groups.BusinessAssetTypeGroup;
import com.ss.domain.groups.BusinessAssetTypeGroupMember;
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

@Service("GenericItemBusinessAssetTypeGroupService")
public class GenericItemBusinessAssetTypeGroupService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private GenericItemBusinessAssetTypeService genericItemBusinessAssetTypeService;

    @Autowired
    private GenericItemOrganizationalUnitService genericItemOrganizationalUnitService;


    public GenericItem buildGenericItemForBusinessAssetTypeGroup(BusinessAssetTypeGroup assetTypeGroup, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetTypeGroup);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(assetTypeGroup, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    private void handleView(BusinessAssetTypeGroup assetTypeGroup, ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<GenericItem> children = new ArrayList<>();

        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {

            switch (viewDescriptor.getViewName()) {
                case GIView.BUSINESS_ASSET_TYPE:
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

    private void handleViewNameAssetType(BusinessAssetTypeGroup assetTypeGroup, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAssetTypeGroupMember> assetTypeGroupMembers = assetTypeGroup.getBusinessAssetTypeGroupMembers();
        if (assetTypeGroupMembers != null && (!assetTypeGroupMembers.isEmpty())) {
            for (BusinessAssetTypeGroupMember assetTypeGroupMember : assetTypeGroupMembers) {
                if (assetTypeGroupMember != null && (!assetTypeGroupMember.isArchived()) && assetTypeGroupMember.isActivated()) {
                    BusinessAssetType assetType = assetTypeGroupMember.getBusinessAssetType();

                    if (assetType != null && (!assetType.isArchived()))
                        children.add(genericItemBusinessAssetTypeService.buildGenericItemForBusinessAssetType(assetType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameOrganizationalUnit(BusinessAssetTypeGroup assetTypeGroup, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        OrganizationalUnit organizationalUnit = assetTypeGroup.getOrganizationalUnit();
        if (organizationalUnit != null && (!organizationalUnit.isArchived()))
            children.add(genericItemOrganizationalUnitService.buildGenericItemForOrganizationalUnit(organizationalUnit, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
    }
}
