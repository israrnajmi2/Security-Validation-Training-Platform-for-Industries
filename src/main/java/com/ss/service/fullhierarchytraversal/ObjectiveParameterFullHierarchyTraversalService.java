package com.ss.service.fullhierarchytraversal;

import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.parametertree.ObjectiveParameterWord;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.parametertree.ObjectiveParameterWordRepository;
import com.ss.service.generictraversal.GenericItemObjectiveParameterWordService;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("ObjectiveParameterFullHierarchyTraversalService")
public class ObjectiveParameterFullHierarchyTraversalService {

    @Autowired
    private ObjectiveParameterWordRepository objectiveParameterWordRepository;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemObjectiveParameterWordService genericItemObjectiveParameterWordService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForObjectiveParameterRootFullWithDescriptor(ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo, Integer level) {
        GenericItem genericItem = new GenericItem();
        genericItem.setObjectType(ObjectTypeConstants.OBJECTIVE_PARAMETER_ROOT);
        genericItem.setName("");
        genericItem.setElementId(0);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        List<ObjectiveParameterWord> levelOneParameterWords = objectiveParameterWordRepository.findByLevelAndIsArchivedFalse(1);

        for (ObjectiveParameterWord parameterWord : levelOneParameterWords) {
            if (parameterWord != null && !parameterWord.isArchived() && (level == 0 || (int) parameterWord.getLevel() <= level))
                children.add(buildGenericItemForObjectiveParameterWithDescriptor(parameterWord, viewDescriptor, perspectiveGroupInfo, level));
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
        return genericItem;
    }

    private GenericItem buildGenericItemForObjectiveParameterWithDescriptor(ObjectiveParameterWord parameterWord, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo, Integer level) {
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(parameterWord);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        if (level == 0 || parameterWord.getLevel().equals(level)) {//expression links or applying extra view descriptor
            GenericItem item = genericItemObjectiveParameterWordService.buildGenericItemForObjectiveParameterWord(parameterWord, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null)
                children.addAll(item.getChildren());
        }

        if (level == 0 || (int) parameterWord.getLevel() < level) {
            List<ObjectiveParameterWord> childrenParameterWordList = parameterWord.getChildrenObjectiveParameterWordList();

            if (childrenParameterWordList != null) {
                for (ObjectiveParameterWord child : childrenParameterWordList) {
                    children.add(buildGenericItemForObjectiveParameterWithDescriptor(child, viewDescriptor, perspectiveGroupInfo, level));
                }
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }
}