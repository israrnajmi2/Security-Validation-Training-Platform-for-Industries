//package com.ss.service.startingpoint;
//
//import com.ss.constants.ObjectTypeConstants;
//import com.ss.domain.asset.AssetType;
//import com.ss.pojo.PerspectiveGroupInfo;
//import com.ss.pojo.ViewDescriptor;
//import com.ss.pojo.restservice.GenericItem;
//import com.ss.repository.asset.AssetTypeRepository;
//import com.ss.service.generictraversal.GenericItemAssetTypeService;
//import com.ss.utils.GenericItemIndexCalculator;
//import com.ss.utils.GenericItemPOJOBuilder;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service("GenericItemAssetTypeStartingPointService")
//public class GenericItemAssetTypeStartingPointService {
//
//    @Autowired
//    private GenericItemPOJOBuilder genericItemPOJOBuilder;
//
//    @Autowired
//    private AssetTypeRepository assetTypeRepository;
//
//    @Autowired
//    private GenericItemAssetTypeService genericItemAssetTypeService;
//
//    @Autowired
//    private GenericItemIndexCalculator genericItemIndexCalculator;
//
//    public GenericItem buildGenericItemForAssetTypeStartingPoint(ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
//        //GenericItem pojo - special case.
//        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(ObjectTypeConstants.ASSET_TYPE_ROOT);
//        handleView(viewDescriptor, genericItem, perspectiveGroupInfo);
//        return genericItem;
//    }
//
//    private void handleView(ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
//
//        List<GenericItem> children = new ArrayList<>();
//        List<AssetType> levelOneAssetTypes = assetTypeRepository.findByLevelAndIsArchivedFalse(1);
//        if (levelOneAssetTypes != null && (!levelOneAssetTypes.isEmpty())) {
//            for (AssetType levelOneAssetType : levelOneAssetTypes) {
//                children.add(genericItemAssetTypeService.buildGenericItemForAssetType(levelOneAssetType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
//            }
//        }
//
//        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
//    }
//}
