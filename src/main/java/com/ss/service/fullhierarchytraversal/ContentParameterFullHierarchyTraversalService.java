package com.ss.service.fullhierarchytraversal;

import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.parametertree.ContentParameterWord;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.parametertree.ContentParameterWordRepository;
import com.ss.service.generictraversal.GenericItemContentParameterWordService;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("ContentParameterFullHierarchyTraversalService")
public class ContentParameterFullHierarchyTraversalService {

    @Autowired
    private ContentParameterWordRepository contentParameterWordRepository;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemContentParameterWordService genericItemContentParameterWordService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForContentParameterRootFullWithDescriptor(ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo, Integer level) {
        GenericItem genericItem = new GenericItem();
        genericItem.setObjectType(ObjectTypeConstants.CONTENT_PARAMETER_ROOT);
        genericItem.setName("");
        genericItem.setElementId(0);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        List<ContentParameterWord> levelOneParameterWords = contentParameterWordRepository.findByLevelAndIsArchivedFalse(1);

        for (ContentParameterWord parameterWord : levelOneParameterWords) {
            if (parameterWord != null && !parameterWord.isArchived() && (level == 0 || (int) parameterWord.getLevel() <= level))
                children.add(buildGenericItemForContentParameterWithDescriptor(parameterWord, viewDescriptor, perspectiveGroupInfo, level));
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
        return genericItem;
    }

    private GenericItem buildGenericItemForContentParameterWithDescriptor(ContentParameterWord parameterWord, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo, Integer level) {
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(parameterWord);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        if (level == 0 || parameterWord.getLevel().equals(level)) {//expression links or applying extra view descriptor
            GenericItem item = genericItemContentParameterWordService.buildGenericItemForContentParameterWord(parameterWord, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null)
                children.addAll(item.getChildren());
        }

        if (level == 0 || (int) parameterWord.getLevel() < level) {
            List<ContentParameterWord> childrenParameterWordList = parameterWord.getChildrenContentParameterWordList();

            if (childrenParameterWordList != null) {
                for (ContentParameterWord child : childrenParameterWordList) {
                    children.add(buildGenericItemForContentParameterWithDescriptor(child, viewDescriptor, perspectiveGroupInfo, level));
                }
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }
}