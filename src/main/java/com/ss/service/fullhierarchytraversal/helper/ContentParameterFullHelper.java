package com.ss.service.fullhierarchytraversal.helper;

import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.helper.IdNameObject;
import com.ss.pojo.restservice.GenericItem;
import com.ss.service.fullhierarchytraversal.ContentParameterFullHierarchyTraversalService;
import com.ss.utils.IdNameObjectConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ContentParameterFullHelper")
public class ContentParameterFullHelper {


    @Autowired
    private IdNameObjectConverter idNameObjectConverter;

    @Autowired
    private ContentParameterFullHierarchyTraversalService contentParameterFullHierarchyTraversalService;

    public ResponseEntity<GenericItem> getContentParameterFullWithDescriptor(ViewDescriptor viewDescriptor, Integer level) {

        List<IdNameObject> idNameObjects = null;

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);
        perspectiveGroupInfo.setGroupItems(idNameObjects);

        if (level == null)
            level = 0;

        GenericItem assetTypeGenericItem = contentParameterFullHierarchyTraversalService.buildGenericItemForContentParameterRootFullWithDescriptor(viewDescriptor, perspectiveGroupInfo, level);
        idNameObjectConverter.minifiedGenericItem(assetTypeGenericItem);
        return new ResponseEntity(assetTypeGenericItem, HttpStatus.OK);
    }
}