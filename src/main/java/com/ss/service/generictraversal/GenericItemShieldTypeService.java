package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIView;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldType;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service("GenericItemShieldTypeService")
public class GenericItemShieldTypeService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemShieldService genericItemShieldService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForShieldType(ShieldType shieldType, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (shieldType == null)
            throw new ExecException("buildGenericItemForShieldType method : shieldType parameter is null");
        //GenericItem pojo
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldType);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();
        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            if (Arrays.asList(GIView.SHIELD, GIView.STANDARD, GIView.THREAT, GIView.BUSINESS).contains(viewDescriptor.getViewName())) {
                handleViewNameShield(shieldType, viewDescriptor, children, perspectiveGroupInfo);
            } else {
                throw new ExecException("buildGenericItemForShieldType: unknown viewName " + viewDescriptor.getViewName() + " for ShieldType");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }

    private void handleViewNameShield(ShieldType shieldType, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<Shield> shieldList = shieldType.getShieldList();
        if (shieldList != null && (!shieldList.isEmpty())) {
            for (Shield shield : shieldList) {
                if (shield != null && (!shield.isArchived()))
                    children.add(genericItemShieldService.buildGenericItemForShield(shield, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }

        }
    }
}
