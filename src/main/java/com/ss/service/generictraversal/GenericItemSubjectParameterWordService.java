package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.domain.parametertree.SubjectParameterWord;
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

@Service("GenericItemSubjectParameterWordService")
public class GenericItemSubjectParameterWordService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemSceService genericItemSceService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForSubjectParameterWord(SubjectParameterWord subjectParameterWord, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (subjectParameterWord == null)
            throw new ExecException("buildGenericItemForSubjectParameterWord method :  subjectParameterWord parameter is null");
        //GenericItem pojo
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(subjectParameterWord);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();
        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            switch (viewDescriptor.getViewName()) {
                case GIView.SUBJECT_PARAMETER:
                    handleViewNameObjectiveParameterWord(subjectParameterWord, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.SCE:
                    handleViewNameSce(subjectParameterWord, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("buildGenericItemForSubjectParameterWord: unknown viewName " + viewDescriptor.getViewName() + " for SubjectParameterWord");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }


    private void handleViewNameObjectiveParameterWord(SubjectParameterWord subjectParameterWord, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS) ||
                viewDescriptor.getSelectionMode().equals(GIMode.CHILDREN_ELEMENTS)) {
            handleChildrenCaseForViewObjectiveParameterWord(subjectParameterWord, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.PARENT_ELEMENT)) {
            handleParentCaseForViewObjectiveParameterWord(subjectParameterWord, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("buildGenericItemForSubjectParameterWord: viewName: subject_parameter_word: unknown selection mode " + viewDescriptor.getSelectionMode());

    }

    private void handleChildrenCaseForViewObjectiveParameterWord(SubjectParameterWord subjectParameterWord, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<SubjectParameterWord> childrenSubjectParameterWordList = subjectParameterWord.getChildrenSubjectParameterWordList();
        if (childrenSubjectParameterWordList != null && (!childrenSubjectParameterWordList.isEmpty())) {
            for (SubjectParameterWord childSubjectParameterWord : childrenSubjectParameterWordList) {
                if (childSubjectParameterWord != null && (!childSubjectParameterWord.isArchived())) {
                    children.add(buildGenericItemForSubjectParameterWord(childSubjectParameterWord, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleParentCaseForViewObjectiveParameterWord(SubjectParameterWord subjectParameterWord, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        SubjectParameterWord parentSubjectParameterWord = subjectParameterWord.getParentSubjectParameterWord();
        if (parentSubjectParameterWord != null && (!parentSubjectParameterWord.isArchived())) {
            children.add(buildGenericItemForSubjectParameterWord(parentSubjectParameterWord, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }

    private void handleViewNameSce(SubjectParameterWord subjectParameterWord, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        //all linked sce's
        List<SecurityControlExpression> securityControlExpressionList = subjectParameterWord.getSecurityControlExpressionList();
        if (securityControlExpressionList != null && (!securityControlExpressionList.isEmpty())) {
            for (SecurityControlExpression securityControlExpression : securityControlExpressionList) {
                if (securityControlExpression != null && (!securityControlExpression.isArchived()))
                    children.add(genericItemSceService.buildGenericItemForSce(securityControlExpression, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
            }
        }

    }
}
