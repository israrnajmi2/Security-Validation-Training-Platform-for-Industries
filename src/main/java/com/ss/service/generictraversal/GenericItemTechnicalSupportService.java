package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIView;
import com.ss.domain.asset.ProviderInfo;
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

@Service("GenericItemTechnicalSupportService")
public class GenericItemTechnicalSupportService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemProviderInfoService genericItemProviderInfoService;

    @Autowired
    private GenericItemTechnicalSupportContactInfoService genericItemTechnicalSupportContactInfoService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForTechnicalSupport(TechnicalSupport technicalSupport, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (technicalSupport == null)
            throw new ExecException("buildGenericItemForTechnicalSupport method :  technicalSupport parameter is null");
        //GenericItem pojo
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(technicalSupport);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();
        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            switch (viewDescriptor.getViewName()) {
                case GIView.PROVIDER:
                    handleViewNameProviderInfo(technicalSupport, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.TECHNICAL_SUPPORT_CONTACT_INFO:
                    handleViewNameTechnicalSupportContactInfo(technicalSupport, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("buildGenericItemForTechnicalSupport: unknown viewName " + viewDescriptor.getViewName() + " for TechnicalSupport");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }

    private void handleViewNameTechnicalSupportContactInfo(TechnicalSupport technicalSupport, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<TechnicalSupportContactInfo> technicalSupportContactInfoList = technicalSupport.getTechnicalSupportContactInfoList();
        if (technicalSupportContactInfoList != null && (!technicalSupportContactInfoList.isEmpty())) {
            for (TechnicalSupportContactInfo technicalSupportContactInfo : technicalSupportContactInfoList) {
                if (technicalSupportContactInfo != null && (!technicalSupportContactInfo.isArchived()))
                    children.add(genericItemTechnicalSupportContactInfoService.buildGenericItemForTechnicalSupportContactInfo(technicalSupportContactInfo,
                            viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

    private void handleViewNameProviderInfo(TechnicalSupport technicalSupport, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        ProviderInfo providerInfo = technicalSupport.getProviderInfo();
        if (providerInfo != null && (!providerInfo.isArchived())) {
            children.add(genericItemProviderInfoService.buildGenericItemForProviderInfo(providerInfo, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }

}
