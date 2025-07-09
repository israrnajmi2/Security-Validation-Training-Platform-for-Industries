package com.ss.service.fullhierarchytraversal.helper;

import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.domain.groups.AssetTypeGroup;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.helper.IdNameObject;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.asset.AssetTypeRepository;
import com.ss.repository.groups.AssetTypeGroupRepository;
import com.ss.service.fullhierarchytraversal.AssetTypeFullHierarchyTraversalService;
import com.ss.service.generictraversal.GenericItemAssetTypeGroupService;
import com.ss.utils.GenericItemPOJOBuilder;
import com.ss.utils.IdNameObjectConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("AssetTypeFullHelper")
public class AssetTypeFullHelper {

    @Autowired
    private AssetTypeRepository assetTypeRepository;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private AssetTypeGroupRepository assetTypeGroupRepository;

    @Autowired
    private GenericItemAssetTypeGroupService genericItemAssetTypeGroupService;

    @Autowired
    private IdNameObjectConverter idNameObjectConverter;

    @Autowired
    private AssetTypeFullHierarchyTraversalService assetTypeFullHierarchyTraversalService;

    public ResponseEntity<GenericItem> getAssetTypeFullWithDescriptor(Integer assetTypeGroupId, ViewDescriptor extraViewDescriptor, ViewDescriptor extraViewDescriptor1, Integer level) {

        List<IdNameObject> idNameObjects = null;
        if (assetTypeGroupId != null && !assetTypeGroupId.equals(0)) {

            AssetTypeGroup assetTypeGroup = assetTypeGroupRepository.findOne(assetTypeGroupId);
            if (assetTypeGroup == null || assetTypeGroup.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type Group with id : " + assetTypeGroupId + " not found", HttpStatus.NOT_FOUND);

            ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.ASSET_TYPE, GIMode.ALL_LINKED_ELEMENTS);
            PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
            perspectiveGroupInfo.setRated(false);
            perspectiveGroupInfo.setGroupFoundAndIncludeAllChildren(true);
            GenericItem genericItem = genericItemAssetTypeGroupService.buildGenericItemForAssetTypeGroup(assetTypeGroup, viewDescriptor, perspectiveGroupInfo);
            idNameObjects = idNameObjectConverter.convertOnlyTopLevel(genericItem.getChildren());
        }

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);
        perspectiveGroupInfo.setGroupItems(idNameObjects);

        if (level == null)
            level = 0;
        GenericItem assetTypeGenericItem = assetTypeFullHierarchyTraversalService.buildGenericItemForAssetTypeRootFullWithDescriptor(extraViewDescriptor, extraViewDescriptor1, perspectiveGroupInfo, level);

        idNameObjectConverter.minifiedGenericItem(assetTypeGenericItem);
        return new ResponseEntity(assetTypeGenericItem, HttpStatus.OK);
    }
}
