package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.domain.parametertree.ObjectiveParameterWord;
import com.ss.domain.sce.SecurityControlExpression;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("GenericItemObjectiveParameterWordService")
public class GenericItemObjectiveParameterWordService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemSceService genericItemSceService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForObjectiveParameterWord(ObjectiveParameterWord objectiveParameterWord, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (objectiveParameterWord == null)
            throw new ExecException("buildGenericItemForObjectiveParameterWord method :  objectiveParameterWord parameter is null");
        //GenericItem pojo
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(objectiveParameterWord);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();
        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            switch (viewDescriptor.getViewName()) {
                case GIView.OBJECTIVE_PARAMETER:
                    handleViewNameObjectiveParameterWord(objectiveParameterWord, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.SCE:
                    handleViewNameSce(objectiveParameterWord, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("buildGenericItemForObjectiveParameterWord: unknown viewName " + viewDescriptor.getViewName() + " for ObjectiveParameterWord");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }


    private void handleViewNameObjectiveParameterWord(ObjectiveParameterWord objectiveParameterWord, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS) ||
                viewDescriptor.getSelectionMode().equals(GIMode.CHILDREN_ELEMENTS)) {
            handleChildrenCaseForViewObjectiveParameterWord(objectiveParameterWord, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.PARENT_ELEMENT)) {
            handleParentCaseForViewObjectiveParameterWord(objectiveParameterWord, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("buildGenericItemForObjectiveParameterWord: viewName: objective_parameter_word: unknown selection mode " + viewDescriptor.getSelectionMode());

    }

    private void handleChildrenCaseForViewObjectiveParameterWord(ObjectiveParameterWord objectiveParameterWord, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ObjectiveParameterWord> childrenObjectiveParameterWordList = objectiveParameterWord.getChildrenObjectiveParameterWordList();
        if (childrenObjectiveParameterWordList != null && (!childrenObjectiveParameterWordList.isEmpty())) {
            for (ObjectiveParameterWord childObjectiveParameterWord : childrenObjectiveParameterWordList) {
                if (childObjectiveParameterWord != null && (!childObjectiveParameterWord.isArchived())) {
                    children.add(buildGenericItemForObjectiveParameterWord(childObjectiveParameterWord, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleParentCaseForViewObjectiveParameterWord(ObjectiveParameterWord objectiveParameterWord, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        ObjectiveParameterWord parentObjectiveParameterWord = objectiveParameterWord.getParentObjectiveParameterWord();
        if (parentObjectiveParameterWord != null && (!parentObjectiveParameterWord.isArchived())) {
            children.add(buildGenericItemForObjectiveParameterWord(parentObjectiveParameterWord, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }

    private void handleViewNameSce(ObjectiveParameterWord objectiveParameterWord, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        //all linked sce's
        List<SecurityControlExpression> securityControlExpressionList = objectiveParameterWord.getSecurityControlExpressionList();
        if (securityControlExpressionList != null && (!securityControlExpressionList.isEmpty())) {
            for (SecurityControlExpression securityControlExpression : securityControlExpressionList) {
                if (securityControlExpression != null && (!securityControlExpression.isArchived()))
                    children.add(genericItemSceService.buildGenericItemForSce(securityControlExpression, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }

    }
}
