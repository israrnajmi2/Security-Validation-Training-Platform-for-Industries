//package com.ss.service.startingpoint;
//
//import com.ss.constants.ObjectTypeConstants;
//import com.ss.domain.parametertree.SubjectParameterWord;
//import com.ss.pojo.PerspectiveGroupInfo;
//import com.ss.pojo.ViewDescriptor;
//import com.ss.pojo.restservice.GenericItem;
//import com.ss.repository.parametertree.SubjectParameterWordRepository;
//import com.ss.service.generictraversal.GenericItemSubjectParameterWordService;
//import com.ss.utils.GenericItemIndexCalculator;
//import com.ss.utils.GenericItemPOJOBuilder;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service("GenericItemSubjectParameterStartingPointService")
//public class GenericItemSubjectParameterStartingPointService {
//
//    @Autowired
//    private GenericItemPOJOBuilder genericItemPOJOBuilder;
//
//    @Autowired
//    private SubjectParameterWordRepository subjectParameterWordRepository;
//
//    @Autowired
//    private GenericItemSubjectParameterWordService genericItemSubjectParameterWordService;
//
//    @Autowired
//    private GenericItemIndexCalculator genericItemIndexCalculator;
//
//    public GenericItem buildGenericItemForSubjectParameterStartingPoint(ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
//        //GenericItem pojo - special case.
//        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(ObjectTypeConstants.SUBJECT_PARAMETER_ROOT);
//        handleView(viewDescriptor, genericItem, perspectiveGroupInfo);
//        return genericItem;
//    }
//
//    private void handleView(ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
//
//        List<GenericItem> children = new ArrayList<>();
//        List<SubjectParameterWord> levelOne = subjectParameterWordRepository.findByLevelAndIsArchivedFalse(1);
//        if (levelOne != null && (!levelOne.isEmpty())) {
//            for (SubjectParameterWord levelOneObject : levelOne) {
//                children.add(genericItemSubjectParameterWordService.buildGenericItemForSubjectParameterWord(levelOneObject, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
//            }
//        }
//        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
//    }
//}
