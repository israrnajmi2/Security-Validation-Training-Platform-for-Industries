package com.ss.service.fullhierarchytraversal;

import com.ss.constants.ObjectTypeConstants;
import com.ss.constants.RulerTypeConstants;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.shieldclassification.ShieldElementType;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.service.generictraversal.GenericItemShieldElementService;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("ShieldFullHierarchyTraversalService")
public class ShieldFullHierarchyTraversalService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemShieldElementService genericItemShieldElementService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForShieldFullWithDescriptor(Shield shield, ViewDescriptor viewDescriptor, ViewDescriptor extraViewDescriptor1, PerspectiveGroupInfo perspectiveGroupInfo, int level) {
        GenericItem genericItem = new GenericItem();
        genericItem.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_ROOT);
        genericItem.setName("");
        genericItem.setElementId(0);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        List<ShieldElementType> shieldElementTypeList = shield.getShieldElementTypeList();
        for (ShieldElementType shieldElementType : shieldElementTypeList) {
            if (shieldElementType != null && (!shieldElementType.isArchived()) && shieldElementType.getLevel().equals(1)) {
                List<ShieldElement> shieldElementList = shieldElementType.getShieldElementList();
                for (ShieldElement shieldElement : shieldElementList) {
                    if (shieldElement != null && (!shieldElement.isArchived()) && (level == 0 || (int) shieldElement.getLevel() <= level))
                        children.add(buildGenericItemForShieldElementWithDescriptor(shieldElement, viewDescriptor, extraViewDescriptor1, perspectiveGroupInfo, level));
                }
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
        return genericItem;
    }

    private GenericItem buildGenericItemForShieldElementWithDescriptor(ShieldElement shieldElement, ViewDescriptor viewDescriptor, ViewDescriptor extraViewDescriptor1, PerspectiveGroupInfo perspectiveGroupInfo, int level) {
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElement);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        if (perspectiveGroupInfo.isRated()) {
            if (perspectiveGroupInfo.getRulerType().equals(RulerTypeConstants.SHIELD_ELEMENT) && perspectiveGroupInfo.getLevelOfEvaluation().equals(shieldElement.getLevel())) {
                genericItem.setRating(genericItemIndexCalculator.getRatingForShieldElement(shieldElement, perspectiveGroupInfo.getPerspectiveIds(), perspectiveGroupInfo.getDate()));
            }
        }

        List<GenericItem> children = new ArrayList<>();

        if ((level == 0 || shieldElement.getLevel().equals(level)) && shieldElement.getShieldElementType().isMappableToSce()) {
            if (viewDescriptor != null) {
                GenericItem item = genericItemShieldElementService.buildGenericItemForShieldElement(shieldElement, viewDescriptor, perspectiveGroupInfo);
                if (item.getChildren() != null)
                    children.addAll(item.getChildren());
            }
            if (extraViewDescriptor1 != null) {
                GenericItem item = genericItemShieldElementService.buildGenericItemForShieldElement(shieldElement, extraViewDescriptor1, perspectiveGroupInfo);
                if (item.getChildren() != null)
                    children.addAll(item.getChildren());
            }
        }

        if (level == 0 || (int) shieldElement.getLevel() < level) {
            List<ShieldElement> childrenShieldElementList = shieldElement.getChildrenShieldElementList();

            if (childrenShieldElementList != null) {
                for (ShieldElement child : childrenShieldElementList) {
                    children.add(buildGenericItemForShieldElementWithDescriptor(child, viewDescriptor, extraViewDescriptor1, perspectiveGroupInfo, level));
                }
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }
}
