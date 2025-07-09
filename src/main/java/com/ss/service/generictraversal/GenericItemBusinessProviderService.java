package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIView;
import com.ss.domain.businessasset.BusinessAsset;
import com.ss.domain.businessasset.BusinessProvider;
import com.ss.domain.groups.BusinessProviderGroup;
import com.ss.domain.groups.BusinessProviderGroupMember;
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

@Service("GenericItemBusinessProviderService")
public class GenericItemBusinessProviderService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemBusinessAssetService genericItemBusinessAssetService;

    @Autowired
    private GenericItemOrganizationalUnitService genericItemOrganizationalUnitService;

    @Autowired
    private GenericItemBusinessProviderGroupService genericItemBusinessProviderGroupService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForBusinessProvider(BusinessProvider providerInfo, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (providerInfo == null)
            throw new ExecException("buildGenericItemForBusinessProvider method :  providerInfo parameter is null");
        //GenericItem pojo
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(providerInfo);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();
        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            switch (viewDescriptor.getViewName()) {
                case GIView.BUSINESS_ASSET:
                    handleViewNameBusinessAsset(providerInfo, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ORGANIZATIONAL_UNIT:
                    handleViewNameOrganizationalUnit(providerInfo, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.BUSINESS_PROVIDER_GROUP:
                    handleViewNameBusinessProviderGroup(providerInfo, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("buildGenericItemForProviderInfo: unknown viewName " + viewDescriptor.getViewName() + " for ProviderInfo");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }

    private void handleViewNameBusinessProviderGroup(BusinessProvider providerInfo, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessProviderGroupMember> providerGroupMembers = providerInfo.getBusinessProviderGroupMembers();
        if (providerGroupMembers != null && !providerGroupMembers.isEmpty()) {
            for (BusinessProviderGroupMember providerGroupMember : providerGroupMembers) {
                if (providerGroupMember != null && providerGroupMember.isActivated() && !providerGroupMember.isArchived()) {
                    BusinessProviderGroup providerGroup = providerGroupMember.getBusinessProviderGroup();
                    if (providerGroup != null && !providerGroup.isArchived())
                        children.add(genericItemBusinessProviderGroupService.buildGenericItemForBusinessProviderGroup(providerGroup, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameOrganizationalUnit(BusinessProvider providerInfo, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        OrganizationalUnit organizationalUnit = providerInfo.getOrganizationalUnit();
        if (organizationalUnit != null && (!organizationalUnit.isArchived()))
            children.add(genericItemOrganizationalUnitService.buildGenericItemForOrganizationalUnit(organizationalUnit, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
    }

    private void handleViewNameBusinessAsset(BusinessProvider providerInfo, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAsset> assetList = providerInfo.getBusinessAssetList();
        if (assetList != null && (!assetList.isEmpty())) {
            for (BusinessAsset asset : assetList) {
                if (asset != null && (!asset.isArchived()))
                    children.add(genericItemBusinessAssetService.buildGenericItemForBusinessAsset(asset, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }
}
