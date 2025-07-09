package com.ss.controller;


import com.ss.common.ExecException;
import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.parametertree.ContentParameterWord;
import com.ss.domain.parametertree.MethodParameterWord;
import com.ss.domain.parametertree.ObjectiveParameterWord;
import com.ss.domain.parametertree.SubjectParameterWord;
import com.ss.pojo.restservice.*;
import com.ss.repository.parametertree.ContentParameterWordRepository;
import com.ss.repository.parametertree.MethodParameterWordRepository;
import com.ss.repository.parametertree.ObjectiveParameterWordRepository;
import com.ss.repository.parametertree.SubjectParameterWordRepository;
import com.ss.service.fullhierarchytraversal.helper.ContentParameterFullHelper;
import com.ss.service.fullhierarchytraversal.helper.MethodParameterFullHelper;
import com.ss.service.fullhierarchytraversal.helper.ObjectiveParameterFullHelper;
import com.ss.service.fullhierarchytraversal.helper.SubjectParameterFullHelper;
import com.ss.service.permissions.PermissionCheckerService;
import com.ss.utils.DuplicateCheckingService;
import com.ss.utils.GenericItemPOJOBuilder;
import com.ss.utils.GenericItemSubtreeHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@Transactional
@RequestMapping(value = "/rest/parameter")
public class ParameterController {

    @Autowired
    private ObjectiveParameterFullHelper objectiveParameterFullHelper;

    @Autowired
    private MethodParameterFullHelper methodParameterFullHelper;

    @Autowired
    private ContentParameterFullHelper contentParameterFullHelper;

    @Autowired
    private SubjectParameterFullHelper subjectParameterFullHelper;

    @Autowired
    private ObjectiveParameterWordRepository objectiveParameterWordRepository;

    @Autowired
    private MethodParameterWordRepository methodParameterWordRepository;

    @Autowired
    private ContentParameterWordRepository contentParameterWordRepository;

    @Autowired
    private SubjectParameterWordRepository subjectParameterWordRepository;

    @Autowired
    private GenericItemSubtreeHelper genericItemSubtreeHelper;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private DuplicateCheckingService duplicateCheckingService;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    @RequestMapping(value = "/get_objective_parameter_dv", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getObjectiveParameterDv() {

        return objectiveParameterFullHelper.getObjectiveParameterFullWithDescriptor(null, null);
    }

    @RequestMapping(value = "/get_method_parameter_dv", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getMethodParameterDv() {
        return methodParameterFullHelper.getMethodParameterFullWithDescriptor(null, null);
    }

    @RequestMapping(value = "/get_content_parameter_dv", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getContentParameterDv() {
        return contentParameterFullHelper.getContentParameterFullWithDescriptor(null, null);
    }

    @RequestMapping(value = "/get_subject_parameter_dv", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getSubjectParameterDv() {
        return subjectParameterFullHelper.getSubjectParameterFullWithDescriptor(null, null);
    }

    @RequestMapping(value = "/get_objective_parameter_subtree_dv/{objectType}/{elementId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getObjectiveParameterSubtreeDv(@PathVariable("objectType") String objectType, @PathVariable("elementId") Integer elementId) {

        ResponseEntity<GenericItem> response = objectiveParameterFullHelper.getObjectiveParameterFullWithDescriptor(null, null);
        GenericItem genericItem = response.getBody();
        GenericItem requiredGenericItem = genericItemSubtreeHelper.findObject(genericItem, objectType, elementId);
        if (requiredGenericItem == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Parent item with id " + elementId + " and object type " + objectType + " not found - may have been unmapped or deleted", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(requiredGenericItem, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_method_parameter_subtree_dv/{objectType}/{elementId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getMethodParameterSubtreeDv(@PathVariable("objectType") String objectType, @PathVariable("elementId") Integer elementId) {
        ResponseEntity<GenericItem> response = methodParameterFullHelper.getMethodParameterFullWithDescriptor(null, null);
        GenericItem genericItem = response.getBody();
        GenericItem requiredGenericItem = genericItemSubtreeHelper.findObject(genericItem, objectType, elementId);
        if (requiredGenericItem == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Parent item with id " + elementId + " and object type " + objectType + " not found - may have been unmapped or deleted", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(requiredGenericItem, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_content_parameter_subtree_dv/{objectType}/{elementId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getContentParameterSubtreeDv(@PathVariable("objectType") String objectType, @PathVariable("elementId") Integer elementId) {
        ResponseEntity<GenericItem> response = contentParameterFullHelper.getContentParameterFullWithDescriptor(null, null);
        GenericItem genericItem = response.getBody();
        GenericItem requiredGenericItem = genericItemSubtreeHelper.findObject(genericItem, objectType, elementId);
        if (requiredGenericItem == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Parent item with id " + elementId + " and object type " + objectType + " not found - may have been unmapped or deleted", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(requiredGenericItem, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_subject_parameter_subtree_dv/{objectType}/{elementId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getSubjectParameterSubtreeDv(@PathVariable("objectType") String objectType, @PathVariable("elementId") Integer elementId) {
        ResponseEntity<GenericItem> response = subjectParameterFullHelper.getSubjectParameterFullWithDescriptor(null, null);
        GenericItem genericItem = response.getBody();
        GenericItem requiredGenericItem = genericItemSubtreeHelper.findObject(genericItem, objectType, elementId);
        if (requiredGenericItem == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Parent item with id " + elementId + " and object type " + objectType + " not found - may have been unmapped or deleted", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(requiredGenericItem, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_objective_parameter", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createObjectiveParameter(@RequestBody CreateParameterRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.OBJECTIVE_PARAMETER))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        ObjectiveParameterWord parameterWord = new ObjectiveParameterWord();

        parameterWord.setWord(request.getName().trim());

        /*List<ObjectiveParameterWord> objectiveParameterWordsWithSameName = objectiveParameterWordRepository.findByWordAndIsArchivedFalse(request.getName().trim());
        if (objectiveParameterWordsWithSameName != null && !objectiveParameterWordsWithSameName.isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Objective Parameter Word with name " + request.getName() + " already exist", HttpStatus.CONFLICT);*/
        parameterWord.setDescription(request.getDescription());


        ObjectiveParameterWord parentParameter = null;
        if (request.getParentParameterId() != null && !request.getParentParameterId().equals(0)) {
            parentParameter = objectiveParameterWordRepository.findOne(request.getParentParameterId());
            if (parentParameter == null || parentParameter.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Parent Objective Parameter with id " + request.getParentParameterId() + " not found", HttpStatus.BAD_REQUEST);
        }


        parameterWord.setArchived(false);
        parameterWord.setDefault(false);
        if (parentParameter != null)
            parameterWord.setLevel(parentParameter.getLevel() + 1);
        else
            parameterWord.setLevel(1);
        parameterWord.setParentObjectiveParameterWord(parentParameter);

        if (duplicateCheckingService.isDuplicateObjectiveParamter(parameterWord)) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Objective Parameter Word with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }

        parameterWord = objectiveParameterWordRepository.save(parameterWord);

        if (parameterWord == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Objective Parameter Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(parameterWord);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_objective_parameter_info/{objectiveParameterId}", method = RequestMethod.GET)
    public ObjectiveParameterInfo getObjectiveParameterInfo(@PathVariable("objectiveParameterId") Integer objectiveParameterId) {

        ObjectiveParameterWord objectiveParameterWord = objectiveParameterWordRepository.findOne(objectiveParameterId);
        if (objectiveParameterWord == null || objectiveParameterWord.isArchived())
            throw new ExecException("Objective Parameter with id " + objectiveParameterId + " not found");

        ObjectiveParameterInfo response = new ObjectiveParameterInfo();
        response.setDescription(objectiveParameterWord.getDescription());
        response.setName(objectiveParameterWord.getWord());
        response.setElementId(objectiveParameterWord.getId());

        ObjectiveParameterWord parentObjectiveParameterWord = objectiveParameterWord.getParentObjectiveParameterWord();
        if (parentObjectiveParameterWord == null) {
            response.setParentObjectiveParameterId(0);
            response.setParentObjectiveParameterName(null);
        } else {
            response.setParentObjectiveParameterId(parentObjectiveParameterWord.getId());
            response.setParentObjectiveParameterName(parentObjectiveParameterWord.getWord());
        }
        return response;
    }

    @RequestMapping(value = "/edit_objective_parameter", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editObjectiveParameter(@RequestBody EditObjectiveParameterRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.OBJECTIVE_PARAMETER))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        ObjectiveParameterWord objectiveParameterWord = objectiveParameterWordRepository.findOne(request.getElementId());
        if (objectiveParameterWord == null || objectiveParameterWord.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Objective Parameter Word with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        /*List<ObjectiveParameterWord> objectiveParametersWithSameName = objectiveParameterWordRepository.findByWordAndIsArchivedFalse(request.getName().trim());

        if (objectiveParametersWithSameName != null && !objectiveParametersWithSameName.isEmpty()) {
            if (!objectiveParametersWithSameName.get(0).getId().equals(request.getElementId()))
                return genericItemPOJOBuilder.buildGIErrorResponse("Objective Parameter with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }*/
        objectiveParameterWord.setWord(request.getName().trim());
        objectiveParameterWord.setDescription(request.getDescription());

        if (duplicateCheckingService.isDuplicateObjectiveParamter(objectiveParameterWord)) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Objective Parameter with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }

        objectiveParameterWord = objectiveParameterWordRepository.save(objectiveParameterWord);

        if (objectiveParameterWord == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Objective Parameter Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(objectiveParameterWord);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_method_parameter", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createMethodParameter(@RequestBody CreateParameterRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.METHOD_PARAMETER))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        MethodParameterWord parameterWord = new MethodParameterWord();

        parameterWord.setWord(request.getName().trim());

        /*List<MethodParameterWord> methodParameterWordsWithSameName = methodParameterWordRepository.findByWordAndIsArchivedFalse(request.getName().trim());
        if (methodParameterWordsWithSameName != null && !methodParameterWordsWithSameName.isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Method Paramter Word with name " + request.getName() + " already exist", HttpStatus.CONFLICT);*/

        parameterWord.setDescription(request.getDescription());

        MethodParameterWord parentParameter = null;
        if (request.getParentParameterId() != null && !request.getParentParameterId().equals(0)) {
            parentParameter = methodParameterWordRepository.findOne(request.getParentParameterId());
            if (parentParameter == null || parentParameter.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Parent Method Parameter with id " + request.getParentParameterId() + " not found", HttpStatus.BAD_REQUEST);
        }


        parameterWord.setArchived(false);
        parameterWord.setDefault(false);
        if (parentParameter != null)
            parameterWord.setLevel(parentParameter.getLevel() + 1);
        else
            parameterWord.setLevel(1);
        parameterWord.setParentMethodParameterWord(parentParameter);

        if (duplicateCheckingService.isDuplicateMethodParameter(parameterWord)) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Method Paramter Word with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }

        parameterWord = methodParameterWordRepository.save(parameterWord);

        if (parameterWord == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Method Parameter Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(parameterWord);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_method_parameter_info/{methodParameterId}", method = RequestMethod.GET)
    public MethodParameterInfo getMethodParameterInfo(@PathVariable("methodParameterId") Integer methodParameterId) {

        MethodParameterWord methodParameterWord = methodParameterWordRepository.findOne(methodParameterId);
        if (methodParameterWord == null || methodParameterWord.isArchived())
            throw new ExecException("Method Parameter with id " + methodParameterId + " not found");

        MethodParameterInfo response = new MethodParameterInfo();
        response.setDescription(methodParameterWord.getDescription());
        response.setName(methodParameterWord.getWord());
        response.setElementId(methodParameterWord.getId());

        MethodParameterWord parentMethodParameterWord = methodParameterWord.getParentMethodParameterWord();
        if (parentMethodParameterWord == null) {
            response.setParentMethodParameterId(0);
            response.setParentMethodParameterName(null);
        } else {
            response.setParentMethodParameterId(parentMethodParameterWord.getId());
            response.setParentMethodParameterName(parentMethodParameterWord.getWord());
        }
        return response;
    }

    @RequestMapping(value = "/edit_method_parameter", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editMethodParameter(@RequestBody EditMethodParameterRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.METHOD_PARAMETER))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        MethodParameterWord methodParameterWord = methodParameterWordRepository.findOne(request.getElementId());
        if (methodParameterWord == null || methodParameterWord.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Method Parameter Word with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        /*List<MethodParameterWord> methodParametersWithSameName = methodParameterWordRepository.findByWordAndIsArchivedFalse(request.getName().trim());

        if (methodParametersWithSameName != null && !methodParametersWithSameName.isEmpty()) {
            if (!methodParametersWithSameName.get(0).getId().equals(request.getElementId()))
                return genericItemPOJOBuilder.buildGIErrorResponse("Method Parameter with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }*/
        methodParameterWord.setWord(request.getName().trim());
        methodParameterWord.setDescription(request.getDescription());

        if (duplicateCheckingService.isDuplicateMethodParameter(methodParameterWord)) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Method Parameter with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }

        methodParameterWord = methodParameterWordRepository.save(methodParameterWord);

        if (methodParameterWord == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Method Parameter Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(methodParameterWord);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_content_parameter", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createContentParameter(@RequestBody CreateParameterRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.CONTENT_PARAMETER))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        ContentParameterWord parameterWord = new ContentParameterWord();

        parameterWord.setWord(request.getName().trim());

        /*
        List<ContentParameterWord> contentParameterWordsWithSameName = contentParameterWordRepository.findByWordAndIsArchivedFalse(request.getName().trim());
        if (contentParameterWordsWithSameName != null && !contentParameterWordsWithSameName.isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Content Parameter Word with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        */

        parameterWord.setDescription(request.getDescription());

        ContentParameterWord parentParameter = null;
        if (request.getParentParameterId() != null && !request.getParentParameterId().equals(0)) {
            parentParameter = contentParameterWordRepository.findOne(request.getParentParameterId());
            if (parentParameter == null || parentParameter.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Parent Content Parameter with id " + request.getParentParameterId() + " not found", HttpStatus.BAD_REQUEST);
        }

        parameterWord.setArchived(false);
        parameterWord.setDefault(false);
        if (parentParameter != null)
            parameterWord.setLevel(parentParameter.getLevel() + 1);
        else
            parameterWord.setLevel(1);
        parameterWord.setParentContentParameterWord(parentParameter);

        if (duplicateCheckingService.isDuplicateContentParamter(parameterWord)) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Content Parameter Word with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }
        parameterWord = contentParameterWordRepository.save(parameterWord);

        if (parameterWord == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Content Parameter Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(parameterWord);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_content_parameter_info/{contentParameterId}", method = RequestMethod.GET)
    public ContentParameterInfo getContentParameterInfo(@PathVariable("contentParameterId") Integer contentParameterId) {

        ContentParameterWord contentParameterWord = contentParameterWordRepository.findOne(contentParameterId);
        if (contentParameterWord == null || contentParameterWord.isArchived())
            throw new ExecException("Content Parameter with id " + contentParameterId + " not found");

        ContentParameterInfo response = new ContentParameterInfo();
        response.setDescription(contentParameterWord.getDescription());
        response.setName(contentParameterWord.getWord());
        response.setElementId(contentParameterWord.getId());

        ContentParameterWord parentContentParameterWord = contentParameterWord.getParentContentParameterWord();
        if (parentContentParameterWord == null) {
            response.setParentContentParameterId(0);
            response.setParentContentParameterName(null);
        } else {
            response.setParentContentParameterId(parentContentParameterWord.getId());
            response.setParentContentParameterName(parentContentParameterWord.getWord());
        }
        return response;
    }

    @RequestMapping(value = "/edit_content_parameter", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editContentParameter(@RequestBody EditContentParameterRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.CONTENT_PARAMETER))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        ContentParameterWord contentParameterWord = contentParameterWordRepository.findOne(request.getElementId());
        if (contentParameterWord == null || contentParameterWord.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Content Parameter Word with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        /*List<ContentParameterWord> contentParametersWithSameName = contentParameterWordRepository.findByWordAndIsArchivedFalse(request.getName().trim());

        if (contentParametersWithSameName != null && !contentParametersWithSameName.isEmpty()) {
            if (!contentParametersWithSameName.get(0).getId().equals(request.getElementId()))
                return genericItemPOJOBuilder.buildGIErrorResponse("Content Parameter with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }*/
        contentParameterWord.setWord(request.getName().trim());
        contentParameterWord.setDescription(request.getDescription());

        if (duplicateCheckingService.isDuplicateContentParamter(contentParameterWord)) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Content Parameter with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }

        contentParameterWord = contentParameterWordRepository.save(contentParameterWord);

        if (contentParameterWord == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Content Parameter Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(contentParameterWord);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_subject_parameter", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createSubjectParameter(@RequestBody CreateParameterRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.SUBJECT_PARAMETER))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        SubjectParameterWord parameterWord = new SubjectParameterWord();

        parameterWord.setWord(request.getName().trim());

        /*List<SubjectParameterWord> subjectParameterWordsWithSameName = subjectParameterWordRepository.findByWordAndIsArchivedFalse(request.getName().trim());
        if (subjectParameterWordsWithSameName != null && !subjectParameterWordsWithSameName.isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Subject Parameter Word with name " + request.getName() + " already exist", HttpStatus.CONFLICT);*/

        parameterWord.setDescription(request.getDescription());


        SubjectParameterWord parentParameter = null;
        if (request.getParentParameterId() != null && !request.getParentParameterId().equals(0)) {
            parentParameter = subjectParameterWordRepository.findOne(request.getParentParameterId());
            if (parentParameter == null || parentParameter.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Parent Subject Parameter with id " + request.getParentParameterId() + " not found", HttpStatus.BAD_REQUEST);
        }


        parameterWord.setArchived(false);
        parameterWord.setDefault(false);
        if (parentParameter != null)
            parameterWord.setLevel(parentParameter.getLevel() + 1);
        else
            parameterWord.setLevel(1);
        parameterWord.setParentSubjectParameterWord(parentParameter);
        if (duplicateCheckingService.isDuplicateSubjectParameter(parameterWord)) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Subject Parameter Word with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }

        parameterWord = subjectParameterWordRepository.save(parameterWord);

        if (parameterWord == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Subject Parameter Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(parameterWord);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_subject_parameter_info/{subjectParameterId}", method = RequestMethod.GET)
    public SubjectParameterInfo getSubjectParameterInfo(@PathVariable("subjectParameterId") Integer subjectParameterId) {

        SubjectParameterWord subjectParameterWord = subjectParameterWordRepository.findOne(subjectParameterId);
        if (subjectParameterWord == null || subjectParameterWord.isArchived())
            throw new ExecException("Subject Parameter with id " + subjectParameterId + " not found");

        SubjectParameterInfo response = new SubjectParameterInfo();
        response.setDescription(subjectParameterWord.getDescription());
        response.setName(subjectParameterWord.getWord());
        response.setElementId(subjectParameterWord.getId());

        SubjectParameterWord parentSubjectParameterWord = subjectParameterWord.getParentSubjectParameterWord();
        if (parentSubjectParameterWord == null) {
            response.setParentSubjectParameterId(0);
            response.setParentSubjectParameterName(null);
        } else {
            response.setParentSubjectParameterId(parentSubjectParameterWord.getId());
            response.setParentSubjectParameterName(parentSubjectParameterWord.getWord());
        }
        return response;
    }

    @RequestMapping(value = "/edit_subject_parameter", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editSubjectParameter(@RequestBody EditSubjectParameterRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.SUBJECT_PARAMETER))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        SubjectParameterWord subjectParameterWord = subjectParameterWordRepository.findOne(request.getElementId());
        if (subjectParameterWord == null || subjectParameterWord.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Subject Parameter Word with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        /*List<SubjectParameterWord> subjectParametersWithSameName = subjectParameterWordRepository.findByWordAndIsArchivedFalse(request.getName().trim());

        if (subjectParametersWithSameName != null && !subjectParametersWithSameName.isEmpty()) {
            if (!subjectParametersWithSameName.get(0).getId().equals(request.getElementId()))
                return genericItemPOJOBuilder.buildGIErrorResponse("Subject Parameter with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }*/

        subjectParameterWord.setWord(request.getName().trim());
        subjectParameterWord.setDescription(request.getDescription());
        if (duplicateCheckingService.isDuplicateSubjectParameter(subjectParameterWord)) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Subject Parameter with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }

        subjectParameterWord = subjectParameterWordRepository.save(subjectParameterWord);

        if (subjectParameterWord == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Subject Parameter Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(subjectParameterWord);
        return new ResponseEntity(response, HttpStatus.OK);
    }
}