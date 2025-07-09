package com.ss.utils;

import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElementType;
import com.ss.pojo.ViewDescriptor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ViewDescriptorGenerationUtil")
public class ViewDescriptorGenerationUtil {

    public ViewDescriptor getViewDescriptorForShieldStartingPointFull(Shield shield) {

        //ViewDescriptor viewDescriptor = new ViewDescriptor();
        List<ShieldElementType> shieldElementTypeList = shield.getShieldElementTypeList();
        for (ShieldElementType shieldElementType : shieldElementTypeList) {
            if ((!shieldElementType.isArchived()) && shieldElementType.getLevel().equals(1)) {
                ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.SHIELD_ELEMENT, GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS);

                ViewDescriptor parentDescriptor = viewDescriptor;

                List<ShieldElementType> childShieldElementTypeList = shieldElementType.getChildrenShieldElementTypeList();
                ShieldElementType childShieldElementType = getShieldElementType(childShieldElementTypeList);
                while (childShieldElementType != null) {
                    ViewDescriptor nextLevel = new ViewDescriptor(GIView.SHIELD_ELEMENT, GIMode.CHILDREN_ELEMENTS);

                    parentDescriptor.setNextLevel(nextLevel);
                    parentDescriptor = nextLevel;
                    childShieldElementType = getShieldElementType(childShieldElementType.getChildrenShieldElementTypeList());
                }

                return viewDescriptor;
            }
        }
        return null;
    }

    private ShieldElementType getShieldElementType(List<ShieldElementType> childShieldElementTypeList) {
        if (childShieldElementTypeList == null || childShieldElementTypeList.isEmpty())
            return null;
        for (ShieldElementType shieldElementType : childShieldElementTypeList) {
            if (!shieldElementType.isArchived())
                return shieldElementType;
        }
        return null;
    }
}
