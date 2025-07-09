package com.ss.service.fullhierarchytraversal;

import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.businessasset.BusinessAsset;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.businessasset.BusinessAssetRepository;
import com.ss.service.generictraversal.GenericItemBusinessAssetService;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("BusinessAssetFullHierarchyTraversalService")
public class BusinessAssetFullHierarchyTraversalService {

    @Autowired
    private BusinessAssetRepository businessAssetRepository;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemBusinessAssetService genericItemBusinessAssetService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForAssetRootFullWithDescriptor(ViewDescriptor viewDescriptor, ViewDescriptor extraViewDescriptor1, PerspectiveGroupInfo perspectiveGroupInfo) {
        GenericItem genericItem = new GenericItem();
        genericItem.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_ROOT);
        genericItem.setName("");
        genericItem.setElementId(0);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();


        List<BusinessAsset> assets = businessAssetRepository.findByIsArchivedFalse();


        for (BusinessAsset asset : assets) {
            if (asset != null && !asset.isArchived()) {
                children.add(buildGenericItemForAssetWithDescriptor(asset, viewDescriptor, extraViewDescriptor1, perspectiveGroupInfo));
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
        return genericItem;
    }

    private GenericItem buildGenericItemForAssetWithDescriptor(BusinessAsset asset, ViewDescriptor viewDescriptor, ViewDescriptor extraViewDescriptor1, PerspectiveGroupInfo perspectiveGroupInfo) {
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(asset);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        if (viewDescriptor != null) {
            GenericItem item = genericItemBusinessAssetService.buildGenericItemForBusinessAsset(asset, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null)
                children.addAll(item.getChildren());
        }
        if (extraViewDescriptor1 != null) {
            GenericItem item = genericItemBusinessAssetService.buildGenericItemForBusinessAsset(asset, extraViewDescriptor1, perspectiveGroupInfo);
            if (item.getChildren() != null)
                children.addAll(item.getChildren());
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }
}
