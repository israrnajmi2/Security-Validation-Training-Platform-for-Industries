package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.domain.parametertree.ContentParameterWord;
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

@Service("GenericItemContentParameterWordService")
public class GenericItemContentParameterWordService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemSceService genericItemSceService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForContentParameterWord(ContentParameterWord contentParameterWord, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (contentParameterWord == null)
            throw new ExecException("buildGenericItemForContentParameterWord method :  contentParameterWord parameter is null");
        //GenericItem pojo
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(contentParameterWord);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();
        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            switch (viewDescriptor.getViewName()) {
                case GIView.CONTENT_PARAMETER:
                    handleViewNameObjectiveParameterWord(contentParameterWord, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.SCE:
                    handleViewNameSce(contentParameterWord, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("buildGenericItemForContentParameterWord: unknown viewName " + viewDescriptor.getViewName() + " for ContentParameterWord");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }


    private void handleViewNameObjectiveParameterWord(ContentParameterWord contentParameterWord, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS) ||
                viewDescriptor.getSelectionMode().equals(GIMode.CHILDREN_ELEMENTS)) {
            handleChildrenCaseForViewObjectiveParameterWord(contentParameterWord, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.PARENT_ELEMENT)) {
            handleParentCaseForViewObjectiveParameterWord(contentParameterWord, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("buildGenericItemForContentParameterWord: viewName: content_parameter_word: unknown selection mode " + viewDescriptor.getSelectionMode());

    }

    private void handleChildrenCaseForViewObjectiveParameterWord(ContentParameterWord contentParameterWord, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ContentParameterWord> childrenContentParameterWordList = contentParameterWord.getChildrenContentParameterWordList();
        if (childrenContentParameterWordList != null && (!childrenContentParameterWordList.isEmpty())) {
            for (ContentParameterWord childContentParameterWord : childrenContentParameterWordList) {
                if (childContentParameterWord != null && (!childContentParameterWord.isArchived())) {
                    children.add(buildGenericItemForContentParameterWord(childContentParameterWord, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleParentCaseForViewObjectiveParameterWord(ContentParameterWord contentParameterWord, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        ContentParameterWord parentContentParameterWord = contentParameterWord.getParentContentParameterWord();
        if (parentContentParameterWord != null && (!parentContentParameterWord.isArchived())) {
            children.add(buildGenericItemForContentParameterWord(parentContentParameterWord, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }

    private void handleViewNameSce(ContentParameterWord contentParameterWord, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        //all linked sce's
        List<SecurityControlExpression> securityControlExpressionList = contentParameterWord.getSecurityControlExpressionList();
        if (securityControlExpressionList != null && (!securityControlExpressionList.isEmpty())) {
            for (SecurityControlExpression securityControlExpression : securityControlExpressionList) {
                if (securityControlExpression != null && (!securityControlExpression.isArchived()))
                    children.add(genericItemSceService.buildGenericItemForSce(securityControlExpression, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }

    }
}
