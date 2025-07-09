package com.ss.service.fullhierarchytraversal.helper;

import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.domain.groups.BusinessAssetGroup;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.helper.IdNameObject;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.groups.BusinessAssetGroupRepository;
import com.ss.service.fullhierarchytraversal.BusinessAssetFullHierarchyTraversalService;
import com.ss.service.generictraversal.GenericItemBusinessAssetGroupService;
import com.ss.utils.GenericItemPOJOBuilder;
import com.ss.utils.IdNameObjectConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("BusinessAssetFullHelper")
public class BusinessAssetFullHelper {


    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private BusinessAssetGroupRepository businessAssetGroupRepository;

    @Autowired
    private GenericItemBusinessAssetGroupService genericItemBusinessAssetGroupService;

    @Autowired
    private IdNameObjectConverter idNameObjectConverter;

    @Autowired
    private BusinessAssetFullHierarchyTraversalService businessAssetFullHierarchyTraversalService;

    public ResponseEntity<GenericItem> getAssetFullWithDescriptor(Integer assetGroupId, ViewDescriptor extraViewDescriptor, ViewDescriptor extraViewDescriptor1) {

        List<IdNameObject> idNameObjects = null;
        if (assetGroupId != null && !assetGroupId.equals(0)) {

            BusinessAssetGroup assetGroup = businessAssetGroupRepository.findOne(assetGroupId);
            if (assetGroup == null || assetGroup.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Business Asset Group with id : " + assetGroupId + " not found", HttpStatus.NOT_FOUND);

            ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.BUSINESS_ASSET, GIMode.ALL_LINKED_ELEMENTS);
            PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
            perspectiveGroupInfo.setRated(false);
            perspectiveGroupInfo.setGroupFoundAndIncludeAllChildren(true);
            GenericItem genericItem = genericItemBusinessAssetGroupService.buildGenericItemForBusinessAssetGroup(assetGroup, viewDescriptor, perspectiveGroupInfo);
            idNameObjects = idNameObjectConverter.convertOnlyTopLevel(genericItem.getChildren());
        }

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);
        perspectiveGroupInfo.setGroupItems(idNameObjects);

        GenericItem assetTypeGenericItem = businessAssetFullHierarchyTraversalService.buildGenericItemForAssetRootFullWithDescriptor(extraViewDescriptor, extraViewDescriptor1, perspectiveGroupInfo);

        idNameObjectConverter.minifiedGenericItem(assetTypeGenericItem);
        return new ResponseEntity(assetTypeGenericItem, HttpStatus.OK);
    }
}
