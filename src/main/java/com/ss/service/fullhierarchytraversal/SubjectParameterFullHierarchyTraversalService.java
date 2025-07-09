package com.ss.service.fullhierarchytraversal;

import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.parametertree.SubjectParameterWord;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.parametertree.SubjectParameterWordRepository;
import com.ss.service.generictraversal.GenericItemSubjectParameterWordService;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("SubjectParameterFullHierarchyTraversalService")
public class SubjectParameterFullHierarchyTraversalService {

    @Autowired
    private SubjectParameterWordRepository subjectParameterWordRepository;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemSubjectParameterWordService genericItemSubjectParameterWordService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForSubjectParameterRootFullWithDescriptor(ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo, Integer level) {
        GenericItem genericItem = new GenericItem();
        genericItem.setObjectType(ObjectTypeConstants.SUBJECT_PARAMETER_ROOT);
        genericItem.setName("");
        genericItem.setElementId(0);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        List<SubjectParameterWord> levelOneParameterWords = subjectParameterWordRepository.findByLevelAndIsArchivedFalse(1);

        for (SubjectParameterWord parameterWord : levelOneParameterWords) {
            if (parameterWord != null && !parameterWord.isArchived() && (level == 0 || (int) parameterWord.getLevel() <= level))
                children.add(buildGenericItemForSubjectParameterWithDescriptor(parameterWord, viewDescriptor, perspectiveGroupInfo, level));
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
        return genericItem;
    }

    private GenericItem buildGenericItemForSubjectParameterWithDescriptor(SubjectParameterWord parameterWord, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo, Integer level) {
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(parameterWord);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        if (level == 0 || parameterWord.getLevel().equals(level)) {//expression links or applying extra view descriptor
            GenericItem item = genericItemSubjectParameterWordService.buildGenericItemForSubjectParameterWord(parameterWord, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null)
                children.addAll(item.getChildren());
        }

        if (level == 0 || (int) parameterWord.getLevel() < level) {
            List<SubjectParameterWord> childrenParameterWordList = parameterWord.getChildrenSubjectParameterWordList();

            if (childrenParameterWordList != null) {
                for (SubjectParameterWord child : childrenParameterWordList) {
                    children.add(buildGenericItemForSubjectParameterWithDescriptor(child, viewDescriptor, perspectiveGroupInfo, level));
                }
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }
}