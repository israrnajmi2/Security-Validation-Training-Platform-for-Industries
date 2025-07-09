package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.shieldclassification.ShieldElementType;
import com.ss.domain.shieldclassification.ShieldType;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("GenericItemShieldService")
public class GenericItemShieldService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemShieldTypeService genericItemShieldTypeService;

    @Autowired
    private GenericItemShieldElementService genericItemShieldElementService;

    @Autowired
    private GenericItemShieldElementTypeService genericItemShieldElementTypeService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;


    public GenericItem buildGenericItemForShield(Shield shield, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (shield == null)
            throw new ExecException("buildGenericItemForShield method : shield parameter is null");
        //GenericItem pojo
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(shield);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();
        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            switch (viewDescriptor.getViewName()) {
                case GIView.SHIELD_TYPE:
                    handleViewNameShieldType(shield, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.THREAT_ELEMENT_TYPE:
                case GIView.BUSINESS_ELEMENT_TYPE:
                case GIView.STANDARD_ELEMENT_TYPE:
                case GIView.SHIELD_ELEMENT_TYPE:
                    handleViewNameShieldElementType(shield, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.STANDARD_ELEMENT:
                case GIView.BUSINESS_ELEMENT:
                case GIView.THREAT_ELEMENT:
                case GIView.SHIELD_ELEMENT:
                    handleViewNameShieldElement(shield, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("buildGenericItemForShield: unknown viewName " + viewDescriptor.getViewName() + " for Shield");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }

    private void handleViewNameShieldType(Shield shield, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        ShieldType shieldType = shield.getShieldType();
        if (shieldType != null && (!shieldType.isArchived())) {
            children.add(genericItemShieldTypeService.buildGenericItemForShieldType(shieldType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }

    private void handleViewNameShieldElement(Shield shield, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS)) {
            handleAllLinkedCaseForViewShieldElement(shield, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS)) {
            handleAllLinkedLevelOneCaseForViewShieldElement(shield, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("buildGenericItemForShield: viewName: shield_element: unknown selection mode " + viewDescriptor.getSelectionMode());

    }

    private void handleAllLinkedLevelOneCaseForViewShieldElement(Shield shield, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        //all level one shield elements of this shield.
        List<ShieldElementType> shieldElementTypeList = shield.getShieldElementTypeList();
        for (ShieldElementType shieldElementType : shieldElementTypeList) {
            if (shieldElementType != null && (!shieldElementType.isArchived()) && shieldElementType.getLevel().equals(1)) {
                List<ShieldElement> shieldElementList = shieldElementType.getShieldElementList();
                for (ShieldElement shieldElement : shieldElementList) {
                    if (shieldElement != null && (!shieldElement.isArchived()))
                        children.add(genericItemShieldElementService.buildGenericItemForShieldElement(shieldElement, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }

    }

    private void handleAllLinkedCaseForViewShieldElement(Shield shield, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ShieldElement> shieldElementList = shield.getShieldElementList();

        if (shieldElementList != null && (!shieldElementList.isEmpty())) {
            for (ShieldElement shieldElement : shieldElementList) {
                if (shieldElement != null && (!shieldElement.isArchived()))
                    children.add(genericItemShieldElementService.buildGenericItemForShieldElement(shieldElement, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }

    }

    private void handleViewNameShieldElementType(Shield shield, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS)) {
            handleAllLinkedCaseForViewShieldElementType(shield, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS)) {
            handleAllLinkedOneCaseForViewShieldElementType(shield, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("buildGenericItemForShield: viewName: shield_element_type: unknown selection mode " + viewDescriptor.getSelectionMode());
    }

    private void handleAllLinkedOneCaseForViewShieldElementType(Shield shield, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        //all level one shield element types of this shield.
        List<ShieldElementType> shieldElementTypeList = shield.getShieldElementTypeList();
        for (ShieldElementType shieldElementType : shieldElementTypeList) {
            if (shieldElementType != null && (!shieldElementType.isArchived()) && shieldElementType.getLevel().equals(1)) {
                children.add(genericItemShieldElementTypeService.buildGenericItemForShieldElementType(shieldElementType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleAllLinkedCaseForViewShieldElementType(Shield shield, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ShieldElementType> shieldElementTypeList = shield.getShieldElementTypeList();
        if (shieldElementTypeList != null && (!shieldElementTypeList.isEmpty())) {
            for (ShieldElementType shieldElementType : shieldElementTypeList) {
                if (shieldElementType != null && (!shieldElementType.isArchived())) {
                    children.add(genericItemShieldElementTypeService.buildGenericItemForShieldElementType(shieldElementType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }


}
