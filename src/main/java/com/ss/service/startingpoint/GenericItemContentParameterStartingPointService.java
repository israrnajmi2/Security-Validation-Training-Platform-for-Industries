//package com.ss.service.startingpoint;
//
//import com.ss.constants.ObjectTypeConstants;
//import com.ss.domain.parametertree.ContentParameterWord;
//import com.ss.pojo.PerspectiveGroupInfo;
//import com.ss.pojo.ViewDescriptor;
//import com.ss.pojo.restservice.GenericItem;
//import com.ss.repository.parametertree.ContentParameterWordRepository;
//import com.ss.service.generictraversal.GenericItemContentParameterWordService;
//import com.ss.utils.GenericItemIndexCalculator;
//import com.ss.utils.GenericItemPOJOBuilder;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service("GenericItemContentParameterStartingPointService")
//public class GenericItemContentParameterStartingPointService {
//
//    @Autowired
//    private GenericItemPOJOBuilder genericItemPOJOBuilder;
//
//    @Autowired
//    private ContentParameterWordRepository contentParameterWordRepository;
//
//    @Autowired
//    private GenericItemContentParameterWordService genericItemContentParameterWordService;
//
//    @Autowired
//    private GenericItemIndexCalculator genericItemIndexCalculator;
//
//    public GenericItem buildGenericItemForContentParameterStartingPoint(ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
//        //GenericItem pojo - special case.
//        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(ObjectTypeConstants.CONTENT_PARAMETER_ROOT);
//        handleView(viewDescriptor, genericItem, perspectiveGroupInfo);
//        return genericItem;
//    }
//
//    private void handleView(ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
//
//        List<GenericItem> children = new ArrayList<>();
//        List<ContentParameterWord> levelOne = contentParameterWordRepository.findByLevelAndIsArchivedFalse(1);
//        if (levelOne != null && (!levelOne.isEmpty())) {
//            for (ContentParameterWord levelOneObject : levelOne) {
//                children.add(genericItemContentParameterWordService.buildGenericItemForContentParameterWord(levelOneObject, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
//            }
//        }
//
//        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
//    }
//}
