package com.ss.service.fullhierarchytraversal;

import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.asset.AssetType;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.asset.AssetTypeRepository;
import com.ss.service.generictraversal.GenericItemAssetTypeService;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("AssetTypeFullHierarchyTraversalService")
public class AssetTypeFullHierarchyTraversalService {

    @Autowired
    private AssetTypeRepository assetTypeRepository;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemAssetTypeService genericItemAssetTypeService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForAssetTypeRootFullWithDescriptor(ViewDescriptor viewDescriptor, ViewDescriptor extraViewDescriptor1, PerspectiveGroupInfo perspectiveGroupInfo, Integer level) {
        GenericItem genericItem = new GenericItem();
        genericItem.setObjectType(ObjectTypeConstants.ASSET_TYPE_ROOT);
        genericItem.setName("");
        genericItem.setElementId(0);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        List<AssetType> levelOneAssetTypes = assetTypeRepository.findByLevelAndIsArchivedFalse(1);

        for (AssetType assetType : levelOneAssetTypes) {
            if (assetType != null && !assetType.isArchived() && (level == 0 || (int) assetType.getLevel() <= level))
                children.add(buildGenericItemForAssetTypeWithDescriptor(assetType, viewDescriptor, extraViewDescriptor1, perspectiveGroupInfo, level));
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
        return genericItem;
    }

    private GenericItem buildGenericItemForAssetTypeWithDescriptor(AssetType assetType, ViewDescriptor viewDescriptor, ViewDescriptor extraViewDescriptor1, PerspectiveGroupInfo perspectiveGroupInfo, Integer level) {
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetType);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        if (level == 0 || assetType.getLevel().equals(level)) {//expression links or applying extra view descriptor
            if (viewDescriptor != null) {
                GenericItem item = genericItemAssetTypeService.buildGenericItemForAssetType(assetType, viewDescriptor, perspectiveGroupInfo);
                if (item.getChildren() != null)
                    children.addAll(item.getChildren());
            }
            if (extraViewDescriptor1 != null) {
                GenericItem item = genericItemAssetTypeService.buildGenericItemForAssetType(assetType, extraViewDescriptor1, perspectiveGroupInfo);
                if (item.getChildren() != null)
                    children.addAll(item.getChildren());
            }
        }

        if (level == 0 || (int) assetType.getLevel() < level) {
            List<AssetType> childrenAssetTypeList = assetType.getChildrenAssetTypeList();

            if (childrenAssetTypeList != null) {
                for (AssetType child : childrenAssetTypeList) {
                    children.add(buildGenericItemForAssetTypeWithDescriptor(child, viewDescriptor, extraViewDescriptor1, perspectiveGroupInfo, level));
                }
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }
}
