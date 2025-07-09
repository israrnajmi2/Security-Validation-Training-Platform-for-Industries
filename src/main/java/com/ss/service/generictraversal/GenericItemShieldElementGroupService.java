package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIView;
import com.ss.domain.groups.ShieldElementGroup;
import com.ss.domain.groups.ShieldElementGroupMember;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.shieldclassification.ShieldElementType;
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

@Service("GenericItemShieldElementGroupService")
public class GenericItemShieldElementGroupService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private GenericItemShieldElementTypeService genericItemShieldElementTypeService;

    @Autowired
    private GenericItemShieldElementService genericItemShieldElementService;

    @Autowired
    private GenericItemOrganizationalUnitService genericItemOrganizationalUnitService;


    public GenericItem buildGenericItemForShieldElementGroup(ShieldElementGroup shieldElementGroup, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElementGroup);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(shieldElementGroup, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    private void handleView(ShieldElementGroup shieldElementGroup, ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<GenericItem> children = new ArrayList<>();

        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {

            switch (viewDescriptor.getViewName()) {
                case GIView.STANDARD_ELEMENT:
                case GIView.BUSINESS_ELEMENT:
                case GIView.THREAT_ELEMENT:
                case GIView.SHIELD_ELEMENT:
                    handleViewNameShieldElement(shieldElementGroup, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.THREAT_ELEMENT_TYPE:
                case GIView.BUSINESS_ELEMENT_TYPE:
                case GIView.STANDARD_ELEMENT_TYPE:
                case GIView.SHIELD_ELEMENT_TYPE:
                    handleViewNameShieldElementType(shieldElementGroup, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ORGANIZATIONAL_UNIT:
                    handleViewNameOrganizationalUnit(shieldElementGroup, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("GenericItemShieldElementGroupService: unknown viewName " + viewDescriptor.getViewName() + " for ShieldElementGroup");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
    }

    private void handleViewNameShieldElementType(ShieldElementGroup shieldElementGroup, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        ShieldElementType shieldElementType = shieldElementGroup.getShieldElementType();

        if (shieldElementType != null && (!shieldElementType.isArchived())) {
            children.add(genericItemShieldElementTypeService.buildGenericItemForShieldElementType(shieldElementType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }


    }

    private void handleViewNameShieldElement(ShieldElementGroup shieldElementGroup, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ShieldElementGroupMember> shieldElementGroupMembers = shieldElementGroup.getShieldElementGroupMembers();
        if (shieldElementGroupMembers != null && (!shieldElementGroupMembers.isEmpty())) {
            for (ShieldElementGroupMember groupMemberMap : shieldElementGroupMembers) {
                if (groupMemberMap != null && (!groupMemberMap.isArchived()) && (groupMemberMap.isActivated())) {
                    ShieldElement shieldElement = groupMemberMap.getShieldElement();
                    if (shieldElement != null && (!shieldElement.isArchived()))
                        children.add(genericItemShieldElementService.buildGenericItemForShieldElement(shieldElement, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }

    }

    private void handleViewNameOrganizationalUnit(ShieldElementGroup shieldElementGroup, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        OrganizationalUnit organizationalUnit = shieldElementGroup.getOrganizationalUnit();
        if (organizationalUnit != null && (!organizationalUnit.isArchived()))
            children.add(genericItemOrganizationalUnitService.buildGenericItemForOrganizationalUnit(organizationalUnit, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
    }
}
