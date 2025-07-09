//package com.ss.service.startingpoint;
//
//import com.ss.constants.ObjectTypeConstants;
//import com.ss.domain.parametertree.ObjectiveParameterWord;
//import com.ss.pojo.PerspectiveGroupInfo;
//import com.ss.pojo.ViewDescriptor;
//import com.ss.pojo.restservice.GenericItem;
//import com.ss.repository.parametertree.ObjectiveParameterWordRepository;
//import com.ss.service.generictraversal.GenericItemObjectiveParameterWordService;
//import com.ss.utils.GenericItemIndexCalculator;
//import com.ss.utils.GenericItemPOJOBuilder;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service("GenericItemObjectiveParameterStartingPointService")
//public class GenericItemObjectiveParameterStartingPointService {
//
//    @Autowired
//    private GenericItemPOJOBuilder genericItemPOJOBuilder;
//
//    @Autowired
//    private ObjectiveParameterWordRepository objectiveParameterWordRepository;
//
//    @Autowired
//    private GenericItemObjectiveParameterWordService genericItemObjectiveParameterWordService;
//
//    @Autowired
//    private GenericItemIndexCalculator genericItemIndexCalculator;
//
//    public GenericItem buildGenericItemForObjectiveParameterStartingPoint(ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
//        //GenericItem pojo - special case.
//        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(ObjectTypeConstants.OBJECTIVE_PARAMETER_ROOT);
//        handleView(viewDescriptor, genericItem, perspectiveGroupInfo);
//        return genericItem;
//    }
//
//    private void handleView(ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
//
//        List<GenericItem> children = new ArrayList<>();
//        List<ObjectiveParameterWord> levelOneObjectiveParameters = objectiveParameterWordRepository.findByLevelAndIsArchivedFalse(1);
//        if (levelOneObjectiveParameters != null && (!levelOneObjectiveParameters.isEmpty())) {
//            for (ObjectiveParameterWord levelOneObjectiveParameter : levelOneObjectiveParameters) {
//                children.add(genericItemObjectiveParameterWordService.buildGenericItemForObjectiveParameterWord(levelOneObjectiveParameter, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
//            }
//        }
//        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
//    }
//}
