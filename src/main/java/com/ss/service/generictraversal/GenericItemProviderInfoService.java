package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIView;
import com.ss.domain.asset.Asset;
import com.ss.domain.asset.ProviderInfo;
import com.ss.domain.asset.TechnicalSupport;
import com.ss.domain.groups.ProviderGroup;
import com.ss.domain.groups.ProviderGroupMember;
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

@Service("GenericItemProviderInfoService")
public class GenericItemProviderInfoService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemAssetService genericItemAssetService;

    @Autowired
    private GenericItemTechnicalSupportService genericItemTechnicalSupportService;

    @Autowired
    private GenericItemOrganizationalUnitService genericItemOrganizationalUnitService;

    @Autowired
    private GenericItemProviderGroupService genericItemProviderGroupService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForProviderInfo(ProviderInfo providerInfo, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (providerInfo == null)
            throw new ExecException("buildGenericItemForProviderInfo method :  providerInfo parameter is null");
        //GenericItem pojo
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(providerInfo);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();
        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            switch (viewDescriptor.getViewName()) {
                case GIView.ASSET:
                    handleViewNameAsset(providerInfo, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.TECHNICAL_SUPPORT_PEOPLE:
                    handleViewNameTechnicalSupportPeople(providerInfo, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ORGANIZATIONAL_UNIT:
                    handleViewNameOrganizationalUnit(providerInfo, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.PROVIDER_GROUP:
                    handleViewNameProviderGroup(providerInfo, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("buildGenericItemForProviderInfo: unknown viewName " + viewDescriptor.getViewName() + " for ProviderInfo");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }

    private void handleViewNameProviderGroup(ProviderInfo providerInfo, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ProviderGroupMember> providerGroupMembers = providerInfo.getProviderGroupMembers();
        if (providerGroupMembers != null && !providerGroupMembers.isEmpty()) {
            for (ProviderGroupMember providerGroupMember : providerGroupMembers) {
                if (providerGroupMember != null && providerGroupMember.isActivated() && !providerGroupMember.isArchived()) {
                    ProviderGroup providerGroup = providerGroupMember.getProviderGroup();
                    if (providerGroup != null && !providerGroup.isArchived())
                        children.add(genericItemProviderGroupService.buildGenericItemForProviderGroup(providerGroup, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameOrganizationalUnit(ProviderInfo providerInfo, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        OrganizationalUnit organizationalUnit = providerInfo.getOrganizationalUnit();
        if (organizationalUnit != null && (!organizationalUnit.isArchived()))
            children.add(genericItemOrganizationalUnitService.buildGenericItemForOrganizationalUnit(organizationalUnit, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
    }

    private void handleViewNameTechnicalSupportPeople(ProviderInfo providerInfo, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<TechnicalSupport> technicalSupportList = providerInfo.getTechnicalSupportList();
        if (technicalSupportList != null && (!technicalSupportList.isEmpty())) {
            for (TechnicalSupport technicalSupport : technicalSupportList) {
                if (technicalSupport != null && (!technicalSupport.isArchived())) {
                    children.add(genericItemTechnicalSupportService.buildGenericItemForTechnicalSupport(technicalSupport, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                    //build technical support object.
                }
            }
        }
    }

    private void handleViewNameAsset(ProviderInfo providerInfo, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<Asset> assetList = providerInfo.getAssetList();
        if (assetList != null && (!assetList.isEmpty())) {
            for (Asset asset : assetList) {
                if (asset != null && (!asset.isArchived()))
                    children.add(genericItemAssetService.buildGenericItemForAsset(asset, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }
}
