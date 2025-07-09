package com.ss.utils;


import com.ss.common.ExecException;
import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.parametertree.ContentParameterWord;
import com.ss.domain.parametertree.MethodParameterWord;
import com.ss.domain.parametertree.ObjectiveParameterWord;
import com.ss.domain.parametertree.SubjectParameterWord;
import com.ss.domain.sce.SecurityControlExpression;
import com.ss.pojo.restservice.GenericItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("ExpressionViewHelper")
public class ExpressionViewHelper {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;


    public GenericItem getExpressionView(SecurityControlExpression sce) {
        if (sce == null)
            throw new ExecException("Security Control Expression passed is null");
        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(sce);
        response.setOdosChain(null);
        response.setMdosChain(null);
        response.setCdosChain(null);
        response.setSdosChain(null);

        response.setOdosTree(generateOdosTree(sce.getObjectiveParameterWord()));
        response.setMdosTree(generateMdosTree(sce.getMethodParameterWord()));
        response.setCdosTree(generateCdosTree(sce.getContentParameterWord()));
        response.setSdosTree(generateSdosTree(sce.getSubjectParameterWord()));
        return response;
    }

    private GenericItem generateSdosTree(SubjectParameterWord parameterWord) {
        if (parameterWord == null)
            return null;
        GenericItem response = new GenericItem();
        response.setName("");
        response.setObjectType(ObjectTypeConstants.SUBJECT_PARAMETER_ROOT);

        response.setChildren(sdosTreeHelp(parameterWord));
        return response;
    }

    private GenericItem generateCdosTree(ContentParameterWord parameterWord) {

        if (parameterWord == null)
            return null;
        GenericItem response = new GenericItem();
        response.setName("");
        response.setObjectType(ObjectTypeConstants.CONTENT_PARAMETER_ROOT);

        response.setChildren(cdosTreeHelp(parameterWord));
        return response;
    }

    private GenericItem generateMdosTree(MethodParameterWord parameterWord) {
        if (parameterWord == null)
            return null;
        GenericItem response = new GenericItem();
        response.setName("");
        response.setObjectType(ObjectTypeConstants.METHOD_PARAMETER_ROOT);

        response.setChildren(mdosTreeHelp(parameterWord));
        return response;

    }

    private GenericItem generateOdosTree(ObjectiveParameterWord parameterWord) {

        if (parameterWord == null)
            return null;
        GenericItem response = new GenericItem();
        response.setName("");
        response.setObjectType(ObjectTypeConstants.OBJECTIVE_PARAMETER_ROOT);

        response.setChildren(odosTreeHelp(parameterWord));
        return response;
    }

    private List<GenericItem> odosTreeHelp(ObjectiveParameterWord parameterWord) {

        if (parameterWord == null)
            return null;
        GenericItem parameterGI = genericItemPOJOBuilder.buildGenericPOJO(parameterWord);

        if (parameterWord.getParentObjectiveParameterWord() != null)
            return buildObjectiveParameterGenericItem(parameterGI, parameterWord.getParentObjectiveParameterWord());
        else
            return convertToArrayList(parameterGI);

    }

    private List<GenericItem> buildObjectiveParameterGenericItem(GenericItem childParameterGI, ObjectiveParameterWord parentObjectiveParameterWord) {

        GenericItem parameterGI = genericItemPOJOBuilder.buildGenericPOJO(parentObjectiveParameterWord);
        parameterGI.setChildren(convertToArrayList(childParameterGI));
        if (parentObjectiveParameterWord.getParentObjectiveParameterWord() != null)
            return buildObjectiveParameterGenericItem(parameterGI, parentObjectiveParameterWord.getParentObjectiveParameterWord());
        else
            return convertToArrayList(parameterGI);

    }

    private List<GenericItem> mdosTreeHelp(MethodParameterWord parameterWord) {

        if (parameterWord == null)
            return null;
        GenericItem parameterGI = genericItemPOJOBuilder.buildGenericPOJO(parameterWord);

        if (parameterWord.getParentMethodParameterWord() != null)
            return buildMethodParameterGenericItem(parameterGI, parameterWord.getParentMethodParameterWord());
        else
            return convertToArrayList(parameterGI);

    }

    private List<GenericItem> buildMethodParameterGenericItem(GenericItem childParameterGI, MethodParameterWord parentMethodParameterWord) {

        GenericItem parameterGI = genericItemPOJOBuilder.buildGenericPOJO(parentMethodParameterWord);
        parameterGI.setChildren(convertToArrayList(childParameterGI));
        if (parentMethodParameterWord.getParentMethodParameterWord() != null)
            return buildMethodParameterGenericItem(parameterGI, parentMethodParameterWord.getParentMethodParameterWord());
        else
            return convertToArrayList(parameterGI);

    }

    private List<GenericItem> cdosTreeHelp(ContentParameterWord parameterWord) {

        if (parameterWord == null)
            return null;
        GenericItem parameterGI = genericItemPOJOBuilder.buildGenericPOJO(parameterWord);

        if (parameterWord.getParentContentParameterWord() != null)
            return buildContentParameterGenericItem(parameterGI, parameterWord.getParentContentParameterWord());
        else
            return convertToArrayList(parameterGI);

    }

    private List<GenericItem> buildContentParameterGenericItem(GenericItem childParameterGI, ContentParameterWord parentContentParameterWord) {

        GenericItem parameterGI = genericItemPOJOBuilder.buildGenericPOJO(parentContentParameterWord);
        parameterGI.setChildren(convertToArrayList(childParameterGI));
        if (parentContentParameterWord.getParentContentParameterWord() != null)
            return buildContentParameterGenericItem(parameterGI, parentContentParameterWord.getParentContentParameterWord());
        else
            return convertToArrayList(parameterGI);

    }

    private List<GenericItem> sdosTreeHelp(SubjectParameterWord parameterWord) {

        if (parameterWord == null)
            return null;
        GenericItem parameterGI = genericItemPOJOBuilder.buildGenericPOJO(parameterWord);

        if (parameterWord.getParentSubjectParameterWord() != null)
            return buildSubjectParameterGenericItem(parameterGI, parameterWord.getParentSubjectParameterWord());
        else
            return convertToArrayList(parameterGI);

    }

    private List<GenericItem> buildSubjectParameterGenericItem(GenericItem childParameterGI, SubjectParameterWord parentSubjectParameterWord) {

        GenericItem parameterGI = genericItemPOJOBuilder.buildGenericPOJO(parentSubjectParameterWord);
        parameterGI.setChildren(convertToArrayList(childParameterGI));
        if (parentSubjectParameterWord.getParentSubjectParameterWord() != null)
            return buildSubjectParameterGenericItem(parameterGI, parentSubjectParameterWord.getParentSubjectParameterWord());
        else
            return convertToArrayList(parameterGI);

    }

    private List<GenericItem> convertToArrayList(GenericItem genericItem) {
        List<GenericItem> genericItemList = new ArrayList<>();
        genericItemList.add(genericItem);
        return genericItemList;
    }
}
