//package com.ss.service.startingpoint;
//
//import com.ss.constants.ObjectTypeConstants;
//import com.ss.domain.parametertree.MethodParameterWord;
//import com.ss.pojo.PerspectiveGroupInfo;
//import com.ss.pojo.ViewDescriptor;
//import com.ss.pojo.restservice.GenericItem;
//import com.ss.repository.parametertree.MethodParameterWordRepository;
//import com.ss.service.generictraversal.GenericItemMethodParameterWordService;
//import com.ss.utils.GenericItemIndexCalculator;
//import com.ss.utils.GenericItemPOJOBuilder;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service("GenericItemMethodParameterStartingPointService")
//public class GenericItemMethodParameterStartingPointService {
//
//    @Autowired
//    private GenericItemPOJOBuilder genericItemPOJOBuilder;
//
//    @Autowired
//    private MethodParameterWordRepository methodParameterWordRepository;
//
//    @Autowired
//    private GenericItemMethodParameterWordService genericItemMethodParameterWordService;
//
//    @Autowired
//    private GenericItemIndexCalculator genericItemIndexCalculator;
//
//    public GenericItem buildGenericItemForMethodParameterStartingPoint(ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
//        //GenericItem pojo - special case.
//        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(ObjectTypeConstants.METHOD_PARAMETER_ROOT);
//        handleView(viewDescriptor, genericItem, perspectiveGroupInfo);
//        return genericItem;
//    }
//
//    private void handleView(ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
//
//        List<GenericItem> children = new ArrayList<>();
//        List<MethodParameterWord> levelOne = methodParameterWordRepository.findByLevelAndIsArchivedFalse(1);
//        if (levelOne != null && (!levelOne.isEmpty())) {
//            for (MethodParameterWord levelOneObject : levelOne) {
//                children.add(genericItemMethodParameterWordService.buildGenericItemForMethodParameterWord(levelOneObject, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
//            }
//        }
//
//        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
//    }
//}
