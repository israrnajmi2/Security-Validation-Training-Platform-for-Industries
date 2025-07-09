package com.ss.service.fullhierarchytraversal;

import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.businessasset.BusinessAssetType;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.businessasset.BusinessAssetTypeRepository;
import com.ss.service.generictraversal.GenericItemBusinessAssetTypeService;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("BusinessAssetTypeFullHierarchyTraversalService")
public class BusinessAssetTypeFullHierarchyTraversalService {

    @Autowired
    private BusinessAssetTypeRepository businessAssetTypeRepository;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemBusinessAssetTypeService genericItemBusinessAssetTypeService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public GenericItem buildGenericItemForAssetTypeRootFullWithDescriptor(ViewDescriptor viewDescriptor, ViewDescriptor extraViewDescriptor1, PerspectiveGroupInfo perspectiveGroupInfo, Integer level) {
        GenericItem genericItem = new GenericItem();
        genericItem.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_TYPE_ROOT);
        genericItem.setName("");
        genericItem.setElementId(0);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        List<BusinessAssetType> levelOneAssetTypes = businessAssetTypeRepository.findByLevelAndIsArchivedFalse(1);

        for (BusinessAssetType assetType : levelOneAssetTypes) {
            if (assetType != null && !assetType.isArchived() && (level == 0 || (int) assetType.getLevel() <= level))
                children.add(buildGenericItemForAssetTypeWithDescriptor(assetType, viewDescriptor, extraViewDescriptor1, perspectiveGroupInfo, level));
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
        return genericItem;
    }

    private GenericItem buildGenericItemForAssetTypeWithDescriptor(BusinessAssetType assetType, ViewDescriptor viewDescriptor, ViewDescriptor extraViewDescriptor1, PerspectiveGroupInfo perspectiveGroupInfo, Integer level) {
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(assetType);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        if (level == 0 || assetType.getLevel().equals(level)) {//expression links or applying extra view descriptor
            if (viewDescriptor != null) {
                GenericItem item = genericItemBusinessAssetTypeService.buildGenericItemForBusinessAssetType(assetType, viewDescriptor, perspectiveGroupInfo);
                if (item.getChildren() != null)
                    children.addAll(item.getChildren());
            }
            if (extraViewDescriptor1 != null) {
                GenericItem item = genericItemBusinessAssetTypeService.buildGenericItemForBusinessAssetType(assetType, extraViewDescriptor1, perspectiveGroupInfo);
                if (item.getChildren() != null)
                    children.addAll(item.getChildren());
            }
        }

        if (level == 0 || (int) assetType.getLevel() < level) {
            List<BusinessAssetType> childrenAssetTypeList = assetType.getChildrenBusinessAssetTypeList();

            if (childrenAssetTypeList != null) {
                for (BusinessAssetType child : childrenAssetTypeList) {
                    children.add(buildGenericItemForAssetTypeWithDescriptor(child, viewDescriptor, extraViewDescriptor1, perspectiveGroupInfo, level));
                }
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }
}
