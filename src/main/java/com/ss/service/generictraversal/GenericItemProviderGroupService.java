package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIView;
import com.ss.domain.asset.ProviderInfo;
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

@Service("GenericItemProviderGroupService")
public class GenericItemProviderGroupService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private GenericItemProviderInfoService genericItemProviderInfoService;

    @Autowired
    private GenericItemOrganizationalUnitService genericItemOrganizationalUnitService;


    public GenericItem buildGenericItemForProviderGroup(ProviderGroup providerGroup, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(providerGroup);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(providerGroup, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    private void handleView(ProviderGroup providerGroup, ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<GenericItem> children = new ArrayList<>();

        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {

            switch (viewDescriptor.getViewName()) {
                case GIView.PROVIDER:
                    handleViewNameProvider(providerGroup, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ORGANIZATIONAL_UNIT:
                    handleViewNameOrganizationalUnit(providerGroup, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("GenericItemProviderGroupService: unknown viewName " + viewDescriptor.getViewName() + " for ProviderGroup");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
    }

    private void handleViewNameProvider(ProviderGroup providerGroup, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ProviderGroupMember> providerGroupMembers = providerGroup.getProviderGroupMembers();
        if (providerGroupMembers != null && (!providerGroupMembers.isEmpty())) {
            for (ProviderGroupMember providerGroupMember : providerGroupMembers) {
                if (providerGroupMember != null && (!providerGroupMember.isArchived()) && providerGroupMember.isActivated()) {
                    ProviderInfo providerInfo = providerGroupMember.getProviderInfo();

                    if (providerInfo != null && (!providerInfo.isArchived()))
                        children.add(genericItemProviderInfoService.buildGenericItemForProviderInfo(providerInfo, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameOrganizationalUnit(ProviderGroup providerGroup, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        OrganizationalUnit organizationalUnit = providerGroup.getOrganizationalUnit();
        if (organizationalUnit != null && (!organizationalUnit.isArchived()))
            children.add(genericItemOrganizationalUnitService.buildGenericItemForOrganizationalUnit(organizationalUnit, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
    }
}
