package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.domain.groups.ShieldElementGroup;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.shieldclassification.ShieldElementType;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("GenericItemShieldElementTypeService")
public class GenericItemShieldElementTypeService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemShieldService genericItemShieldService;

    @Autowired
    private GenericItemShieldElementService genericItemShieldElementService;

    @Autowired
    private GenericItemShieldElementGroupService genericItemShieldElementGroupService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForShieldElementType(ShieldElementType shieldElementType, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (shieldElementType == null)
            throw new ExecException("buildGenericItemForShieldElementType method : shieldElementType parameter is null");
        //GenericItem pojo
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElementType);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();
        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            switch (viewDescriptor.getViewName()) {
                case GIView.BUSINESS:
                case GIView.THREAT:
                case GIView.STANDARD:
                case GIView.SHIELD:
                    handleViewNameShield(shieldElementType, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.THREAT_ELEMENT_TYPE:
                case GIView.BUSINESS_ELEMENT_TYPE:
                case GIView.STANDARD_ELEMENT_TYPE:
                case GIView.SHIELD_ELEMENT_TYPE:
                    handleViewNameShieldElementType(shieldElementType, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.STANDARD_ELEMENT:
                case GIView.BUSINESS_ELEMENT:
                case GIView.THREAT_ELEMENT:
                case GIView.SHIELD_ELEMENT:
                    handleViewNameShieldElement(shieldElementType, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.SHIELD_ELEMENT_GROUP:
                    handleViewNameShieldElementGroup(shieldElementType, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("buildGenericItemForShieldElementType: unknown viewName " + viewDescriptor.getViewName() + " for ShieldElementType");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }

    private void handleViewNameShieldElementGroup(ShieldElementType shieldElementType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ShieldElementGroup> shieldElementGroups = shieldElementType.getShieldElementGroups();
        if (shieldElementGroups != null && (!shieldElementGroups.isEmpty())) {
            for (ShieldElementGroup shieldElementGroup : shieldElementGroups) {
                if (shieldElementGroup != null && (!shieldElementGroup.isArchived()))
                    children.add(genericItemShieldElementGroupService.buildGenericItemForShieldElementGroup(shieldElementGroup, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleViewNameShield(ShieldElementType shieldElementType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        Shield shield = shieldElementType.getShield();
        if (shield != null && (!shield.isArchived())) {
            children.add(genericItemShieldService.buildGenericItemForShield(shield, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }

    private void handleViewNameShieldElement(ShieldElementType shieldElementType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        //all linked
        List<ShieldElement> shieldElementList = shieldElementType.getShieldElementList();

        if (shieldElementList != null && (!shieldElementList.isEmpty())) {
            for (ShieldElement shieldElement : shieldElementList) {
                if (shieldElement != null && (!shieldElement.isArchived()))
                    children.add(genericItemShieldElementService.buildGenericItemForShieldElement(shieldElement, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleViewNameShieldElementType(ShieldElementType shieldElementType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS)
                || viewDescriptor.getSelectionMode().equals(GIMode.CHILDREN_ELEMENTS)) {
            handleChildrenSelectorForViewShieldElementType(shieldElementType, viewDescriptor, children, perspectiveGroupInfo);

        } else if (viewDescriptor.getSelectionMode().equals(GIMode.PARENT_ELEMENT)) {
            handleParentSelectorForViewShieldElementType(shieldElementType, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("buildGenericItemForShieldElementType: viewName: shield_element_type: unknown selection mode " + viewDescriptor.getSelectionMode());
    }

    private void handleChildrenSelectorForViewShieldElementType(ShieldElementType shieldElementType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ShieldElementType> childrenShieldElementTypeList = shieldElementType.getChildrenShieldElementTypeList();
        if (childrenShieldElementTypeList != null && (!childrenShieldElementTypeList.isEmpty())) {
            for (ShieldElementType childShieldElementType : childrenShieldElementTypeList) {
                if (childShieldElementType != null && (!childShieldElementType.isArchived()))
                    children.add(buildGenericItemForShieldElementType(childShieldElementType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleParentSelectorForViewShieldElementType(ShieldElementType shieldElementType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        ShieldElementType parentShieldElementType = shieldElementType.getParentShieldElementType();
        if (parentShieldElementType != null && (!parentShieldElementType.isArchived())) {
            children.add(buildGenericItemForShieldElementType(parentShieldElementType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }
}
