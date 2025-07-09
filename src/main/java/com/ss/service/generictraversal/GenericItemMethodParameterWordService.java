package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.domain.parametertree.MethodParameterWord;
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

@Service("GenericItemMethodParameterWordService")
public class GenericItemMethodParameterWordService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemSceService genericItemSceService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForMethodParameterWord(MethodParameterWord methodParameterWord, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (methodParameterWord == null)
            throw new ExecException("buildGenericItemForMethodParameterWord method :  methodParameterWord parameter is null");
        //GenericItem pojo
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(methodParameterWord);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();
        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            switch (viewDescriptor.getViewName()) {
                case GIView.METHOD_PARAMETER:
                    handleViewNameObjectiveParameterWord(methodParameterWord, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.SCE:
                    handleViewNameSce(methodParameterWord, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("buildGenericItemForMethodParameterWord: unknown viewName " + viewDescriptor.getViewName() + " for MethodParameterWord");
            }
        }


        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }


    private void handleViewNameObjectiveParameterWord(MethodParameterWord methodParameterWord, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS) ||
                viewDescriptor.getSelectionMode().equals(GIMode.CHILDREN_ELEMENTS)) {
            handleChildrenCaseForViewObjectiveParameterWord(methodParameterWord, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.PARENT_ELEMENT)) {
            handleParentCaseForViewObjectiveParameterWord(methodParameterWord, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("buildGenericItemForMethodParameterWord: viewName: method_parameter_word: unknown selection mode " + viewDescriptor.getSelectionMode());

    }

    private void handleChildrenCaseForViewObjectiveParameterWord(MethodParameterWord methodParameterWord, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<MethodParameterWord> childrenMethodParameterWordList = methodParameterWord.getChildrenMethodParameterWordList();
        if (childrenMethodParameterWordList != null && (!childrenMethodParameterWordList.isEmpty())) {
            for (MethodParameterWord childMethodParameterWord : childrenMethodParameterWordList) {
                if (childMethodParameterWord != null && (!childMethodParameterWord.isArchived())) {
                    children.add(buildGenericItemForMethodParameterWord(childMethodParameterWord, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleParentCaseForViewObjectiveParameterWord(MethodParameterWord methodParameterWord, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        MethodParameterWord parentMethodParameterWord = methodParameterWord.getParentMethodParameterWord();
        if (parentMethodParameterWord != null && (!parentMethodParameterWord.isArchived())) {
            children.add(buildGenericItemForMethodParameterWord(parentMethodParameterWord, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }

    private void handleViewNameSce(MethodParameterWord methodParameterWord, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        //all linked sce's
        List<SecurityControlExpression> securityControlExpressionList = methodParameterWord.getSecurityControlExpressionList();
        if (securityControlExpressionList != null && (!securityControlExpressionList.isEmpty())) {
            for (SecurityControlExpression securityControlExpression : securityControlExpressionList) {
                if (securityControlExpression != null && (!securityControlExpression.isArchived()))
                    children.add(genericItemSceService.buildGenericItemForSce(securityControlExpression, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }

    }
}
