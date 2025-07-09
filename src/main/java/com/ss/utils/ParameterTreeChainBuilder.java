package com.ss.utils;

import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.parametertree.ContentParameterWord;
import com.ss.domain.parametertree.MethodParameterWord;
import com.ss.domain.parametertree.ObjectiveParameterWord;
import com.ss.domain.parametertree.SubjectParameterWord;
import com.ss.pojo.helper.IdNameObject;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service("ParameterTreeChainBuilder")
public class ParameterTreeChainBuilder {


    public List<IdNameObject> getOdosArrayListChain(ObjectiveParameterWord odos) {
        List<IdNameObject> response = new ArrayList<>();

        response.add(createIdNameObjectForOdos(odos));

        odos = odos.getParentObjectiveParameterWord();
        while (odos != null) {
            response.add(createIdNameObjectForOdos(odos));
            odos = odos.getParentObjectiveParameterWord();
        }
        Collections.reverse(response);
        return response;
    }

    private IdNameObject createIdNameObjectForOdos(ObjectiveParameterWord odos) {
        IdNameObject idNameObject = new IdNameObject();
        idNameObject.setObjectType(ObjectTypeConstants.OBJECTIVE_PARAMETER);
        idNameObject.setElementId(odos.getId());
        idNameObject.setName(odos.getWord());
        return idNameObject;
    }

    public List<IdNameObject> getMdosColonSeparatedChain(MethodParameterWord mdos) {
        List<IdNameObject> response = new ArrayList<>();
        response.add(createIdNameObjectForMdos(mdos));

        mdos = mdos.getParentMethodParameterWord();
        while (mdos != null) {
            response.add(createIdNameObjectForMdos(mdos));
            mdos = mdos.getParentMethodParameterWord();
        }
        Collections.reverse(response);
        return response;
    }

    private IdNameObject createIdNameObjectForMdos(MethodParameterWord mdos) {
        IdNameObject idNameObject = new IdNameObject();
        idNameObject.setObjectType(ObjectTypeConstants.METHOD_PARAMETER);
        idNameObject.setElementId(mdos.getId());
        idNameObject.setName(mdos.getWord());
        return idNameObject;
    }

    public List<IdNameObject> getCdosColonSeparatedChain(ContentParameterWord cdos) {
        List<IdNameObject> response = new ArrayList<>();
        response.add(createIdNameObjectForCdos(cdos));

        cdos = cdos.getParentContentParameterWord();
        while (cdos != null) {
            response.add(createIdNameObjectForCdos(cdos));
            cdos = cdos.getParentContentParameterWord();
        }
        Collections.reverse(response);
        return response;
    }

    private IdNameObject createIdNameObjectForCdos(ContentParameterWord cdos) {
        IdNameObject idNameObject = new IdNameObject();
        idNameObject.setObjectType(ObjectTypeConstants.CONTENT_PARAMETER);
        idNameObject.setElementId(cdos.getId());
        idNameObject.setName(cdos.getWord());
        return idNameObject;
    }

    public List<IdNameObject> getSdosColonSeparatedChain(SubjectParameterWord sdos) {
        List<IdNameObject> response = new ArrayList<>();
        response.add(createIdNameObjectForSdos(sdos));
        sdos = sdos.getParentSubjectParameterWord();
        while (sdos != null) {
            response.add(createIdNameObjectForSdos(sdos));
            sdos = sdos.getParentSubjectParameterWord();
        }
        Collections.reverse(response);
        return response;
    }

    private IdNameObject createIdNameObjectForSdos(SubjectParameterWord sdos) {
        IdNameObject idNameObject = new IdNameObject();
        idNameObject.setObjectType(ObjectTypeConstants.SUBJECT_PARAMETER);
        idNameObject.setElementId(sdos.getId());
        idNameObject.setName(sdos.getWord());
        return idNameObject;
    }
}
