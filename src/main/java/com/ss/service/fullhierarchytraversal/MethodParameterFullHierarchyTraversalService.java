package com.ss.service.fullhierarchytraversal;

import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.parametertree.MethodParameterWord;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.parametertree.MethodParameterWordRepository;
import com.ss.service.generictraversal.GenericItemMethodParameterWordService;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("MethodParameterFullHierarchyTraversalService")
public class MethodParameterFullHierarchyTraversalService {

    @Autowired
    private MethodParameterWordRepository methodParameterWordRepository;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemMethodParameterWordService genericItemMethodParameterWordService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForMethodParameterRootFullWithDescriptor(ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo, Integer level) {
        GenericItem genericItem = new GenericItem();
        genericItem.setObjectType(ObjectTypeConstants.METHOD_PARAMETER_ROOT);
        genericItem.setName("");
        genericItem.setElementId(0);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        List<MethodParameterWord> levelOneParameterWords = methodParameterWordRepository.findByLevelAndIsArchivedFalse(1);

        for (MethodParameterWord parameterWord : levelOneParameterWords) {
            if (parameterWord != null && !parameterWord.isArchived() && (level == 0 || (int) parameterWord.getLevel() <= level))
                children.add(buildGenericItemForMethodParameterWithDescriptor(parameterWord, viewDescriptor, perspectiveGroupInfo, level));
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
        return genericItem;
    }

    private GenericItem buildGenericItemForMethodParameterWithDescriptor(MethodParameterWord parameterWord, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo, Integer level) {
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(parameterWord);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        if (level == 0 || parameterWord.getLevel().equals(level)) {//expression links or applying extra view descriptor
            GenericItem item = genericItemMethodParameterWordService.buildGenericItemForMethodParameterWord(parameterWord, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null)
                children.addAll(item.getChildren());
        }

        if (level == 0 || (int) parameterWord.getLevel() < level) {
            List<MethodParameterWord> childrenParameterWordList = parameterWord.getChildrenMethodParameterWordList();

            if (childrenParameterWordList != null) {
                for (MethodParameterWord child : childrenParameterWordList) {
                    children.add(buildGenericItemForMethodParameterWithDescriptor(child, viewDescriptor, perspectiveGroupInfo, level));
                }
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }
}