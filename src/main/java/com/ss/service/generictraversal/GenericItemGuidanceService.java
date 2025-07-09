package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIView;
import com.ss.domain.shieldclassification.Guidance;
import com.ss.domain.shieldclassification.IngestSource;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("GenericItemGuidanceService")
public class GenericItemGuidanceService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemShieldElementService genericItemShieldElementService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private GenericItemIngestSourceService genericItemIngestSourceService;


    public GenericItem buildGenericItemForGuidance(Guidance guidance, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(guidance);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(guidance, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    private void handleView(Guidance guidance, ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<GenericItem> children = new ArrayList<>();

        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            switch (viewDescriptor.getViewName()) {
                case GIView.INGEST_SOURCE:
                    handleViewNameIngestSource(guidance, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.STANDARD_ELEMENT:
                case GIView.BUSINESS_ELEMENT:
                case GIView.THREAT_ELEMENT:
                case GIView.SHIELD_ELEMENT:
                    handleViewNameShieldElement(guidance, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("buildGenericItemForGuidance: unknown viewName " + viewDescriptor.getViewName() + " for Guidance");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
    }

    private void handleViewNameIngestSource(Guidance guidance, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        IngestSource ingestSource = guidance.getIngestSource();
        if (ingestSource != null && !ingestSource.isArchived()) {
            children.add(genericItemIngestSourceService.buildGenericItemForIngestSource(ingestSource, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }


    private void handleViewNameShieldElement(Guidance guidance, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        ShieldElement shieldElement = guidance.getShieldElement();
        if (shieldElement != null && !shieldElement.isArchived()) {
            children.add(genericItemShieldElementService.buildGenericItemForShieldElement(shieldElement, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }

}
