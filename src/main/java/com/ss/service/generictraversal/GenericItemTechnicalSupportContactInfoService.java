package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIView;
import com.ss.domain.asset.TechnicalSupport;
import com.ss.domain.asset.TechnicalSupportContactInfo;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("GenericItemTechnicalSupportContactInfoService")
public class GenericItemTechnicalSupportContactInfoService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemTechnicalSupportService genericItemTechnicalSupportService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForTechnicalSupportContactInfo(TechnicalSupportContactInfo technicalSupportContactInfo, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (technicalSupportContactInfo == null)
            throw new ExecException("buildGenericItemForTechnicalSupportContactInfo method :  technicalSupportContactInfo parameter is null");
        //GenericItem pojo
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(technicalSupportContactInfo);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();
        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            if (viewDescriptor.getViewName().equals(GIView.TECHNICAL_SUPPORT_PEOPLE)) {
                handleViewNameTechnicalSupportPeople(technicalSupportContactInfo, viewDescriptor, children, perspectiveGroupInfo);
            } else {
                throw new ExecException("buildGenericItemForTechnicalSupportContactInfo: unknown viewName " + viewDescriptor.getViewName() + " for TechnicalSupportContactInfo");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }

    private void handleViewNameTechnicalSupportPeople(TechnicalSupportContactInfo technicalSupportContactInfo, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        TechnicalSupport technicalSupport = technicalSupportContactInfo.getTechnicalSupport();
        if (technicalSupport != null && (!technicalSupport.isArchived())) {
            children.add(genericItemTechnicalSupportService.buildGenericItemForTechnicalSupport(technicalSupport, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }
}
