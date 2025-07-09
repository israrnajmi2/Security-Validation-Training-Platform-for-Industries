package com.ss.service.fullhierarchytraversal;

import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.asset.Asset;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.asset.AssetRepository;
import com.ss.service.generictraversal.GenericItemAssetService;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("AssetFullHierarchyTraversalService")
public class AssetFullHierarchyTraversalService {

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemAssetService genericItemAssetService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForAssetRootFullWithDescriptor(ViewDescriptor viewDescriptor, ViewDescriptor extraViewDescriptor1, PerspectiveGroupInfo perspectiveGroupInfo) {
        GenericItem genericItem = new GenericItem();
        genericItem.setObjectType(ObjectTypeConstants.ASSET_ROOT);
        genericItem.setName("");
        genericItem.setElementId(0);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();


        List<Asset> assets = assetRepository.findByIsArchivedFalse();


        for (Asset asset : assets) {
            if (asset != null && !asset.isArchived()) {
                children.add(buildGenericItemForAssetWithDescriptor(asset, viewDescriptor, extraViewDescriptor1, perspectiveGroupInfo));
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
        return genericItem;
    }

    private GenericItem buildGenericItemForAssetWithDescriptor(Asset asset, ViewDescriptor viewDescriptor, ViewDescriptor extraViewDescriptor1, PerspectiveGroupInfo perspectiveGroupInfo) {
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(asset);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        if (viewDescriptor != null) {
            GenericItem item = genericItemAssetService.buildGenericItemForAsset(asset, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null)
                children.addAll(item.getChildren());
        }
        if (extraViewDescriptor1 != null) {
            GenericItem item = genericItemAssetService.buildGenericItemForAsset(asset, extraViewDescriptor1, perspectiveGroupInfo);
            if (item.getChildren() != null)
                children.addAll(item.getChildren());
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }
}
