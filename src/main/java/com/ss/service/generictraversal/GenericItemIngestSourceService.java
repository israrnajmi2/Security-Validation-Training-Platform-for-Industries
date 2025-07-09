package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIView;
import com.ss.domain.shieldclassification.Guidance;
import com.ss.domain.shieldclassification.IngestSource;
import com.ss.domain.shieldclassification.TestProcedure;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("GenericItemIngestSourceService")
public class GenericItemIngestSourceService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemGuidanceService genericItemGuidanceService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private GenericItemTestProcedureService genericItemTestProcedureService;


    public GenericItem buildGenericItemForIngestSource(IngestSource ingestSource, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(ingestSource);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(ingestSource, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    private void handleView(IngestSource ingestSource, ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<GenericItem> children = new ArrayList<>();

        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            switch (viewDescriptor.getViewName()) {
                case GIView.TEST_PROCEDURE:
                    handleViewNameTestProcedure(ingestSource, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.GUIDANCE:
                    handleViewNameGuidance(ingestSource, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("buildGenericItemForIngestSource: unknown viewName " + viewDescriptor.getViewName() + " for IngestSource");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
    }

    private void handleViewNameTestProcedure(IngestSource ingestSource, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<TestProcedure> testProcedureList = ingestSource.getTestProcedureList();
        if (testProcedureList != null) {
            for (TestProcedure testProcedure : testProcedureList) {
                if (testProcedure != null && !testProcedure.isArchived())
                    children.add(genericItemTestProcedureService.buildGenericItemForTestProcedure(testProcedure, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }


    private void handleViewNameGuidance(IngestSource ingestSource, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<Guidance> guidanceList = ingestSource.getGuidanceList();
        if (guidanceList != null) {
            for (Guidance guidance : guidanceList) {
                if (guidance != null && !guidance.isArchived())
                    children.add(genericItemGuidanceService.buildGenericItemForGuidance(guidance, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }
    }

}
