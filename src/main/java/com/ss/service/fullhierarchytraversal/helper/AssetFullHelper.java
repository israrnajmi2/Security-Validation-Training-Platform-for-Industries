package com.ss.service.fullhierarchytraversal.helper;

import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.domain.groups.AssetGroup;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.helper.IdNameObject;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.groups.AssetGroupRepository;
import com.ss.service.fullhierarchytraversal.AssetFullHierarchyTraversalService;
import com.ss.service.generictraversal.GenericItemAssetGroupService;
import com.ss.utils.GenericItemPOJOBuilder;
import com.ss.utils.IdNameObjectConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("AssetFullHelper")
public class AssetFullHelper {


    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private AssetGroupRepository assetGroupRepository;

    @Autowired
    private GenericItemAssetGroupService genericItemAssetGroupService;

    @Autowired
    private IdNameObjectConverter idNameObjectConverter;

    @Autowired
    private AssetFullHierarchyTraversalService assetFullHierarchyTraversalService;

    public ResponseEntity<GenericItem> getAssetFullWithDescriptor(Integer assetGroupId, ViewDescriptor extraViewDescriptor, ViewDescriptor extraViewDescriptor1) {

        List<IdNameObject> idNameObjects = null;
        if (assetGroupId != null && !assetGroupId.equals(0)) {

            AssetGroup assetGroup = assetGroupRepository.findOne(assetGroupId);
            if (assetGroup == null || assetGroup.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Asset Group with id : " + assetGroupId + " not found", HttpStatus.NOT_FOUND);

            ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.ASSET, GIMode.ALL_LINKED_ELEMENTS);
            PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
            perspectiveGroupInfo.setRated(false);
            perspectiveGroupInfo.setGroupFoundAndIncludeAllChildren(true);
            GenericItem genericItem = genericItemAssetGroupService.buildGenericItemForAssetGroup(assetGroup, viewDescriptor, perspectiveGroupInfo);
            idNameObjects = idNameObjectConverter.convertOnlyTopLevel(genericItem.getChildren());
        }

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);
        perspectiveGroupInfo.setGroupItems(idNameObjects);

        GenericItem assetTypeGenericItem = assetFullHierarchyTraversalService.buildGenericItemForAssetRootFullWithDescriptor(extraViewDescriptor, extraViewDescriptor1, perspectiveGroupInfo);

        idNameObjectConverter.minifiedGenericItem(assetTypeGenericItem);
        return new ResponseEntity(assetTypeGenericItem, HttpStatus.OK);
    }
}
