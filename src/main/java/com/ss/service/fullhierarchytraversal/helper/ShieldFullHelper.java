package com.ss.service.fullhierarchytraversal.helper;

import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.asset.AssetToShieldElementMap;
import com.ss.domain.asset.AssetType;
import com.ss.domain.asset.AssetTypeToShieldElementMap;
import com.ss.domain.businessasset.BusinessAssetToShieldElementMap;
import com.ss.domain.businessasset.BusinessAssetTypeToShieldElementMap;
import com.ss.domain.groups.ShieldElementGroup;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.shieldclassification.ShieldElementToShieldElementMap;
import com.ss.domain.shieldclassification.ShieldElementType;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.helper.IdNameObject;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.asset.AssetToShieldElementMapRepository;
import com.ss.repository.asset.AssetTypeRepository;
import com.ss.repository.asset.AssetTypeToShieldElementMapRepository;
import com.ss.repository.businessasset.BusinessAssetToShieldElementMapRepository;
import com.ss.repository.businessasset.BusinessAssetTypeToShieldElementMapRepository;
import com.ss.repository.groups.ShieldElementGroupRepository;
import com.ss.repository.shieldclassification.ShieldElementRepository;
import com.ss.repository.shieldclassification.ShieldElementToShieldElementMapRepository;
import com.ss.repository.shieldclassification.ShieldElementTypeRepository;
import com.ss.repository.shieldclassification.ShieldRepository;
import com.ss.service.fullhierarchytraversal.ShieldFullHierarchyTraversalService;
import com.ss.service.generictraversal.GenericItemShieldElementGroupService;
import com.ss.utils.GenericItemPOJOBuilder;
import com.ss.utils.IdNameObjectConverter;
import com.ss.utils.RefIdSuggestionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

@Service("ShieldFullHelper")
public class ShieldFullHelper {

    @Autowired
    private ShieldRepository shieldRepository;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private ShieldElementGroupRepository shieldElementGroupRepository;

    @Autowired
    private GenericItemShieldElementGroupService genericItemShieldElementGroupService;

    @Autowired
    private IdNameObjectConverter idNameObjectConverter;

    @Autowired
    private ShieldElementRepository shieldElementRepository;

    @Autowired
    private ShieldElementTypeRepository shieldElementTypeRepository;

    @Autowired
    private ShieldFullHierarchyTraversalService shieldFullHierarchyTraversalService;

    @Autowired
    private AssetTypeRepository assetTypeRepository;

    @Autowired
    private AssetTypeToShieldElementMapRepository assetTypeToShieldElementMapRepository;

    @Autowired
    private AssetToShieldElementMapRepository assetToShieldElementMapRepository;

    @Autowired
    private BusinessAssetTypeToShieldElementMapRepository businessAssetTypeToShieldElementMapRepository;

    @Autowired
    private BusinessAssetToShieldElementMapRepository businessAssetToShieldElementMapRepository;

    @Autowired
    private ShieldElementToShieldElementMapRepository shieldElementToShieldElementMapRepository;

    @Autowired
    private RefIdSuggestionUtil refIdSuggestionUtil;

    public ResponseEntity<GenericItem> getShieldFullWithDescriptor(Integer shieldId, Integer shieldElementGroupId, ViewDescriptor extraViewDescriptor, ViewDescriptor extraViewDescriptor1, Integer level) {
        Shield shield = shieldRepository.findOne(shieldId);
        if (shield == null || shield.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield with id : " + shieldId + " not found", HttpStatus.NOT_FOUND);

        List<IdNameObject> idNameObjects = null;
        if (shieldElementGroupId != null && !shieldElementGroupId.equals(0)) {

            ShieldElementGroup shieldElementGroup = shieldElementGroupRepository.findOne(shieldElementGroupId);
            if (shieldElementGroup == null || shieldElementGroup.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Group with id : " + shieldElementGroupId + " not found", HttpStatus.NOT_FOUND);

            ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.SHIELD_ELEMENT, GIMode.ALL_LINKED_ELEMENTS);
            PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
            perspectiveGroupInfo.setRated(false);
            perspectiveGroupInfo.setGroupFoundAndIncludeAllChildren(true);
            GenericItem genericItem = genericItemShieldElementGroupService.buildGenericItemForShieldElementGroup(shieldElementGroup, viewDescriptor, perspectiveGroupInfo);
            idNameObjects = idNameObjectConverter.convertOnlyTopLevel(genericItem.getChildren());
        }

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);
        perspectiveGroupInfo.setGroupItems(idNameObjects);
        if (level == null)
            level = 0;

        GenericItem shieldGenericItem = shieldFullHierarchyTraversalService.buildGenericItemForShieldFullWithDescriptor(shield, extraViewDescriptor, extraViewDescriptor1, perspectiveGroupInfo, level);

        idNameObjectConverter.minifiedGenericItem(shieldGenericItem);
        return new ResponseEntity(shieldGenericItem, HttpStatus.OK);
    }

    public ResponseEntity<GenericItem> getShieldFullWithDescriptorWithoutMinification(Integer shieldId, Integer shieldElementGroupId, ViewDescriptor extraViewDescriptor, ViewDescriptor extraViewDescriptor1, Integer level) {
        Shield shield = shieldRepository.findOne(shieldId);
        if (shield == null || shield.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield with id : " + shieldId + " not found", HttpStatus.NOT_FOUND);

        List<IdNameObject> idNameObjects = null;
        if (shieldElementGroupId != null && !shieldElementGroupId.equals(0)) {

            ShieldElementGroup shieldElementGroup = shieldElementGroupRepository.findOne(shieldElementGroupId);
            if (shieldElementGroup == null || shieldElementGroup.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Group with id : " + shieldElementGroupId + " not found", HttpStatus.NOT_FOUND);

            ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.SHIELD_ELEMENT, GIMode.ALL_LINKED_ELEMENTS);
            PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
            perspectiveGroupInfo.setRated(false);
            perspectiveGroupInfo.setGroupFoundAndIncludeAllChildren(true);
            GenericItem genericItem = genericItemShieldElementGroupService.buildGenericItemForShieldElementGroup(shieldElementGroup, viewDescriptor, perspectiveGroupInfo);
            idNameObjects = idNameObjectConverter.convertOnlyTopLevel(genericItem.getChildren());
        }

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);
        perspectiveGroupInfo.setGroupItems(idNameObjects);
        if (level == null)
            level = 0;

        GenericItem shieldGenericItem = shieldFullHierarchyTraversalService.buildGenericItemForShieldFullWithDescriptor(shield, extraViewDescriptor, extraViewDescriptor1, perspectiveGroupInfo, level);

        return new ResponseEntity(shieldGenericItem, HttpStatus.OK);
    }

    public ResponseEntity<GenericItem> getShieldFullWithDescriptorPerspective(Integer shieldId, Integer shieldElementGroupId, ViewDescriptor extraViewDescriptor, ViewDescriptor extraViewDescriptor1, Integer level, String rulerType, List<Integer> perspectiveIds, Date date) {
        Shield shield = shieldRepository.findOne(shieldId);
        if (shield == null || shield.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield with id : " + shieldId + " not found", HttpStatus.NOT_FOUND);

        List<IdNameObject> idNameObjects = null;
        if (shieldElementGroupId != null && !shieldElementGroupId.equals(0)) {

            ShieldElementGroup shieldElementGroup = shieldElementGroupRepository.findOne(shieldElementGroupId);
            if (shieldElementGroup == null || shieldElementGroup.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Group with id : " + shieldElementGroupId + " not found", HttpStatus.NOT_FOUND);

            ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.SHIELD_ELEMENT, GIMode.ALL_LINKED_ELEMENTS);
            PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
            perspectiveGroupInfo.setRated(false);
            perspectiveGroupInfo.setGroupFoundAndIncludeAllChildren(true);
            GenericItem genericItem = genericItemShieldElementGroupService.buildGenericItemForShieldElementGroup(shieldElementGroup, viewDescriptor, perspectiveGroupInfo);
            idNameObjects = idNameObjectConverter.convertOnlyTopLevel(genericItem.getChildren());
        }

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(true);
        perspectiveGroupInfo.setDate(date);
        perspectiveGroupInfo.setLevelOfEvaluation(level);
        perspectiveGroupInfo.setPerspectiveIds(perspectiveIds);
        perspectiveGroupInfo.setRulerType(rulerType);
        perspectiveGroupInfo.setGroupItems(idNameObjects);
        if (level == null)
            level = 0;

        GenericItem shieldGenericItem = shieldFullHierarchyTraversalService.buildGenericItemForShieldFullWithDescriptor(shield, extraViewDescriptor, extraViewDescriptor1, perspectiveGroupInfo, level);

        idNameObjectConverter.minifiedGenericItemPerspective(shieldGenericItem);
        return new ResponseEntity(shieldGenericItem, HttpStatus.OK);
    }

    public void saveShieldDragAndDrop(GenericItem genericItem, Shield shield,ShieldElement parentShieldElement){
        try{
            Integer shieldId=shield.getId();
            List<GenericItem> children = genericItem.getChildren();
            if(children != null && children.size() != 0) {
                int childrenSize = children.size();
                for (int i = 0; i < childrenSize; i++) {
                    GenericItem item = children.get(i);
                    ShieldElement shieldElement = shieldElementRepository.findOne(item.getElementId());

                    if (item.getDragged()) {
                        shieldElementRepository.flush();
                        Integer order = shieldElement.getSortOrder();
                        if(childrenSize != 1) {
                            if(i == 0) {
                                GenericItem nextItem = children.get(i+1);
                                ShieldElement nextShieldElement = shieldElementRepository.findOne(nextItem.getElementId());
                                int nextSortOrder = nextShieldElement.getSortOrder();
                                int currentSortOrder = shieldElement.getSortOrder();
                                if(currentSortOrder < nextSortOrder) {
                                    shieldElementRepository.decrementSortOrderGtLt(currentSortOrder, nextSortOrder);
                                    order = nextSortOrder-1;
                                } else if(currentSortOrder > nextSortOrder) {
                                    shieldElementRepository.incrementSortOrderGtLt(nextSortOrder-1, currentSortOrder);
                                    order = nextSortOrder;
                                }
                            } else {
                                GenericItem prevItem = children.get(i-1);
                                ShieldElement prevShieldElement = shieldElementRepository.findOne(prevItem.getElementId());
                                int prevSortOrder = prevShieldElement.getSortOrder();
                                int currentSortOrder = shieldElement.getSortOrder();
                                if(currentSortOrder < prevSortOrder) {
                                    shieldElementRepository.decrementSortOrderGtLt(currentSortOrder, prevSortOrder+1);
                                    order = prevSortOrder;
                                } else if(currentSortOrder > prevSortOrder) {
                                    shieldElementRepository.incrementSortOrderGtLt(prevSortOrder, currentSortOrder);
                                    order = prevSortOrder + 1;
                                }
                            }
                        }
                        shieldElement = shieldElementRepository.findOne(item.getElementId());
                        if(parentShieldElement != null)
                            parentShieldElement = shieldElementRepository.findOne(parentShieldElement.getId());
                        shieldElement.setSortOrder(order);
                        ShieldElementType shieldElementType = shieldElementTypeRepository.findByShieldIdAndLevelAndIsArchivedFalse(shieldId, item.getLevel()).get(0);
                        shieldElement.setLevel(item.getLevel());
                        shieldElement.setShieldElementType(shieldElementType);
                        shieldElement.setParentShieldElement(parentShieldElement);
                        shieldElement.setModifiedDateTime(new Date());
                        // update Abbreviation
                        if (parentShieldElement != null) {
                            //refIdSuggestionUtil.setRefIfForDraggedItem(item);
                            Shield shieldItem = parentShieldElement.getShield();
                            shieldElement.setAbbreviation(refIdSuggestionUtil.getRefIdSuggestion(parentShieldElement, shieldItem));
                        }
                        shieldElement = shieldElementRepository.save(shieldElement);
                    }

                    if (null != item.getChildren() && !item.getChildren().isEmpty()) {
                        saveShieldDragAndDrop(item, shield, shieldElement);
                    }
                }
            }

        }catch (Exception e){
            throw e;
        }
    }

    public void saveClassificationMapModeDesktopDragAndDrop(GenericItem genericItem,GenericItem parentGenItem) {
        try{
            if(null!=genericItem){
                if(genericItem.getObjectType().equalsIgnoreCase(ObjectTypeConstants.SHIELD_ELEMENT)){
                    ShieldElement shieldElement=shieldElementRepository.findOne(genericItem.getElementId());
                    // set parent element
                    if(null!=parentGenItem && parentGenItem.getObjectType().equalsIgnoreCase(ObjectTypeConstants.SHIELD_ELEMENT)){
                        ShieldElement parentShieldElement=shieldElementRepository.findOne(parentGenItem.getElementId());
                        shieldElement.setParentShieldElement(parentShieldElement);

                        if(parentShieldElement!=null && genericItem.getDragged()) {
                            //refIdSuggestionUtil.setRefIfForDraggedItem(item);
                            Shield shieldItem = parentShieldElement.getShield();
                            shieldElement.setAbbreviation(refIdSuggestionUtil.getRefIdSuggestion(parentShieldElement, shieldItem));
                        }
                    }else {
                        shieldElement.setParentShieldElement(null);
                    }
                    ShieldElementType shieldElementType=shieldElementTypeRepository.findByShieldIdAndLevelAndIsArchivedFalse(shieldElement.getShield().getId(),genericItem.getLevel()).get(0);
                    shieldElement.setShieldElementType(shieldElementType);


                    shieldElement.setLevel(genericItem.getLevel());
                    shieldElement.setModifiedDateTime(new Date());
                    if(genericItem.getDragged()) {
                        shieldElementRepository.saveAndFlush(shieldElement);
                    }

                    if(null!=genericItem.getChildren() && !genericItem.getChildren().isEmpty()){
                        genericItem.getChildren().forEach(item->{
                            if(null!=item){
                                if(item.getObjectType().equalsIgnoreCase(ObjectTypeConstants.SHIELD_ELEMENT) && null==item.getLinkType() && null==item.getLinkId()){
                                    saveClassificationMapModeDesktopDragAndDrop(item,genericItem);
                                }else if(item.getObjectType().equalsIgnoreCase(ObjectTypeConstants.ASSET_TYPE)){
                                    //  1. asset_type_shield_element_map
                                    if(null!=item.getLinkId() && item.getLinkType().equalsIgnoreCase(ObjectTypeConstants.ASSET_TYPE_TO_SHIELD_ELEMENT_LINK)) {
                                        AssetTypeToShieldElementMap assetTypeToShieldElementMap = assetTypeToShieldElementMapRepository.findOne(item.getLinkId());
                                        assetTypeToShieldElementMap.setShieldElement(shieldElement);
                                        assetTypeToShieldElementMapRepository.save(assetTypeToShieldElementMap);
                                    }
                                }else if(item.getObjectType().equalsIgnoreCase(ObjectTypeConstants.ASSET)){
                                    //  2. direct_asset_to_shield_element_link
                                    if(null!=item.getLinkId() && item.getLinkType().equalsIgnoreCase(ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK)) {
                                        AssetToShieldElementMap assetToShieldElementMap=assetToShieldElementMapRepository.findOne(item.getLinkId());
                                        assetToShieldElementMap.setShieldElement(shieldElement);
                                        assetToShieldElementMapRepository.save(assetToShieldElementMap);
                                    }
                                }else if(item.getObjectType().equalsIgnoreCase(ObjectTypeConstants.BUSINESS_ASSET_TYPE)){
                                    // 3. business_asset_type_to_shield_element_link
                                    if(null!=item.getLinkId() && item.getLinkType().equalsIgnoreCase(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_SHIELD_ELEMENT_LINK)) {
                                        BusinessAssetTypeToShieldElementMap businessAssetTypeToShieldElementMap=businessAssetTypeToShieldElementMapRepository.findOne(item.getLinkId());
                                        businessAssetTypeToShieldElementMap.setShieldElement(shieldElement);
                                        businessAssetTypeToShieldElementMapRepository.save(businessAssetTypeToShieldElementMap);
                                    }
                                }else if(item.getObjectType().equalsIgnoreCase(ObjectTypeConstants.BUSINESS_ASSET)){
                                    // 4. business_asset_to_shield_element_link
                                    if(null!=item.getLinkId() && item.getLinkType().equalsIgnoreCase(ObjectTypeConstants.BUSINESS_ASSET_TO_SHIELD_ELEMENT_LINK)) {
                                        BusinessAssetToShieldElementMap businessAssetToShieldElementMap=businessAssetToShieldElementMapRepository.findOne(item.getLinkId());
                                        businessAssetToShieldElementMap.setShieldElement(shieldElement);
                                        businessAssetToShieldElementMapRepository.save(businessAssetToShieldElementMap);
                                    }
                                }else if(item.getObjectType().equalsIgnoreCase(ObjectTypeConstants.STANDARD_ELEMENT)){
                                    // 5. direct_shield_element_to_shield_element_link
                                    if(null!=item.getLinkId() && item.getLinkType().equalsIgnoreCase(ObjectTypeConstants.SHIELD_ELEMENT_TO_SHIELD_ELEMENT_LINK)) {
                                        ShieldElementToShieldElementMap shieldElementToShieldElementMap = shieldElementToShieldElementMapRepository.findOne(item.getLinkId());
                                        shieldElementToShieldElementMap.setShieldElementOne(shieldElement);
                                        shieldElementToShieldElementMapRepository.save(shieldElementToShieldElementMap);
                                    }
                                }
                            }
                        });
                    }

                }
            }

        }catch (Exception e){
            throw e;
        }
    }

    public void saveStandardShieldDragAndDrop(GenericItem genericItem,Shield shield, ShieldElement parentElement) {

        if (null != genericItem &&
                null != genericItem.getElementId()
                && genericItem.getObjectType().equalsIgnoreCase(ObjectTypeConstants.STANDARD_ELEMENT)) {

            ShieldElement shieldElement = shieldElementRepository.findOne(genericItem.getElementId());
            ShieldElementType shieldElementType=shieldElementTypeRepository.findByShieldIdAndLevelAndIsArchivedFalse(shield.getId(),genericItem.getLevel()).get(0);
            shieldElement.setShieldElementType(shieldElementType);
            shieldElement.setParentShieldElement(parentElement);
            shieldElement.setLevel(genericItem.getLevel());
            shieldElement.setModifiedDateTime(new Date());

            // update Abbreviation
            if(parentElement!=null && genericItem.getDragged()) {
                //refIdSuggestionUtil.setRefIfForDraggedItem(item);
                Shield shieldItem = parentElement.getShield();
                shieldElement.setAbbreviation(refIdSuggestionUtil.getRefIdSuggestion(parentElement, shieldItem));
            }
            if(genericItem.getDragged())
                shieldElementRepository.saveAndFlush(shieldElement);

            if(null!=genericItem.getChildren() && !genericItem.getChildren().isEmpty()){
                genericItem.getChildren().forEach(item->saveStandardShieldDragAndDrop(item,shield,shieldElement));
            }

        }

    }

    public void saveStandardMapModeDesktopDragAndDrop(GenericItem genericItem, Shield shield, ShieldElement parentGenItem) {
        try {
            if (null != genericItem) {
                ShieldElement shieldElement = shieldElementRepository.findOne(genericItem.getElementId());
                // set parent element
                shieldElement.setParentShieldElement(parentGenItem);
                //ShieldElementType shieldElementType = shieldElementTypeRepository.findByShieldIdAndLevelAndIsArchivedFalse(shield.getId(), genericItem.getLevel()).get(0);
                //shieldElement.setShieldElementType(shieldElementType);
                shieldElement.setLevel(genericItem.getLevel());
                shieldElement.setModifiedDateTime(new Date());

                // update Abbreviation
                if(parentGenItem!=null && genericItem.getDragged()) {
                    //refIdSuggestionUtil.setRefIfForDraggedItem(item);
                    Shield shieldItem = parentGenItem.getShield();
                    shieldElement.setAbbreviation(refIdSuggestionUtil.getRefIdSuggestion(parentGenItem, shieldItem));
                }
                if(genericItem.getDragged())
                    shieldElementRepository.saveAndFlush(shieldElement);

                if (null != genericItem.getChildren() && !genericItem.getChildren().isEmpty()) {
                    genericItem.getChildren().forEach(item -> {
                        if (null != item) {
                            if(null != item.getLinkId() && null != item.getLinkType() && item.getLinkType().equalsIgnoreCase(ObjectTypeConstants.SHIELD_ELEMENT_TO_SHIELD_ELEMENT_LINK)){
                                //direct_shield_element_to_shield_element_link
                                ShieldElement draggedItemShieldElement = shieldElementRepository.findOne(item.getElementId());
                                ShieldElementToShieldElementMap shieldElementToShieldElementMap = shieldElementToShieldElementMapRepository.findOne(item.getLinkId());
                                if (shieldElementToShieldElementMap.getShieldElementOne().getId().equals(draggedItemShieldElement.getId())) {
                                    shieldElementToShieldElementMap.setShieldElementTwo(shieldElement);
                                } else {
                                    shieldElementToShieldElementMap.setShieldElementOne(shieldElement);
                                }
                                shieldElementToShieldElementMapRepository.save(shieldElementToShieldElementMap);
                            }else{
                                saveStandardMapModeDesktopDragAndDrop(item,shield,shieldElement);
                            }
                        }
                    });
                }
            }
        } catch (Exception e) {
            throw e;
        }
    }

    public void saveThreatMapModeDesktopDragAndDrop(GenericItem genericItem, GenericItem parentGenItem) {
        try{

            if(null!=genericItem){
                if(genericItem.getObjectType().equalsIgnoreCase(ObjectTypeConstants.THREAT_ELEMENT)){
                    ShieldElement shieldElement=shieldElementRepository.findOne(genericItem.getElementId());
                    // set parent element
                    if(null!=parentGenItem && parentGenItem.getObjectType().equalsIgnoreCase(ObjectTypeConstants.THREAT_ELEMENT)){
                        ShieldElement parentShieldElement=shieldElementRepository.findOne(parentGenItem.getElementId());
                        shieldElement.setParentShieldElement(parentShieldElement);
                        if(parentShieldElement!=null && genericItem.getDragged()) {
                            //refIdSuggestionUtil.setRefIfForDraggedItem(item);
                            Shield shieldItem = parentShieldElement.getShield();
                            shieldElement.setAbbreviation(refIdSuggestionUtil.getRefIdSuggestion(parentShieldElement, shieldItem));
                        }
                    }else {
                        shieldElement.setParentShieldElement(null);
                    }
                    ShieldElementType shieldElementType=shieldElementTypeRepository.findByShieldIdAndLevelAndIsArchivedFalse(shieldElement.getShield().getId(),genericItem.getLevel()).get(0);
                    shieldElement.setShieldElementType(shieldElementType);
                    shieldElement.setLevel(genericItem.getLevel());
                    shieldElement.setModifiedDateTime(new Date());

                    if(genericItem.getDragged())
                        shieldElementRepository.saveAndFlush(shieldElement);

                    if(null!=genericItem.getChildren() && !genericItem.getChildren().isEmpty()){
                        genericItem.getChildren().forEach(item->{
                            if(null!=item){
                                if(item.getObjectType().equalsIgnoreCase(ObjectTypeConstants.THREAT_ELEMENT) && null==item.getLinkType() && null==item.getLinkId()){
                                    saveThreatMapModeDesktopDragAndDrop(item,genericItem);
                                }else if(item.getObjectType().equalsIgnoreCase(ObjectTypeConstants.ASSET_TYPE)){
                                    //  1. asset_type_shield_element_map
                                    if(null!=item.getLinkId() && item.getLinkType().equalsIgnoreCase(ObjectTypeConstants.ASSET_TYPE_TO_SHIELD_ELEMENT_LINK)) {
                                        AssetTypeToShieldElementMap assetTypeToShieldElementMap = assetTypeToShieldElementMapRepository.findOne(item.getLinkId());
                                        assetTypeToShieldElementMap.setShieldElement(shieldElement);
                                        assetTypeToShieldElementMapRepository.save(assetTypeToShieldElementMap);
                                    }
                                }else if(item.getObjectType().equalsIgnoreCase(ObjectTypeConstants.ASSET)){
                                    //  2. direct_asset_to_shield_element_link
                                    if(null!=item.getLinkId() && item.getLinkType().equalsIgnoreCase(ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK)) {
                                        AssetToShieldElementMap assetToShieldElementMap=assetToShieldElementMapRepository.findOne(item.getLinkId());
                                        assetToShieldElementMap.setShieldElement(shieldElement);
                                        assetToShieldElementMapRepository.save(assetToShieldElementMap);
                                    }
                                }else if(item.getObjectType().equalsIgnoreCase(ObjectTypeConstants.BUSINESS_ASSET_TYPE)){
                                    // 3. business_asset_type_to_shield_element_link
                                    if(null!=item.getLinkId() && item.getLinkType().equalsIgnoreCase(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_SHIELD_ELEMENT_LINK)) {
                                        BusinessAssetTypeToShieldElementMap businessAssetTypeToShieldElementMap=businessAssetTypeToShieldElementMapRepository.findOne(item.getLinkId());
                                        businessAssetTypeToShieldElementMap.setShieldElement(shieldElement);
                                        businessAssetTypeToShieldElementMapRepository.save(businessAssetTypeToShieldElementMap);
                                    }
                                }else if(item.getObjectType().equalsIgnoreCase(ObjectTypeConstants.BUSINESS_ASSET)){
                                    // 4. business_asset_to_shield_element_link
                                    if(null!=item.getLinkId() && item.getLinkType().equalsIgnoreCase(ObjectTypeConstants.BUSINESS_ASSET_TO_SHIELD_ELEMENT_LINK)) {
                                        BusinessAssetToShieldElementMap businessAssetToShieldElementMap=businessAssetToShieldElementMapRepository.findOne(item.getLinkId());
                                        businessAssetToShieldElementMap.setShieldElement(shieldElement);
                                        businessAssetToShieldElementMapRepository.save(businessAssetToShieldElementMap);
                                    }
                                }else if(item.getObjectType().equalsIgnoreCase(ObjectTypeConstants.THREAT_ELEMENT)){
                                    // 5. direct_shield_element_to_shield_element_link
                                    if(null!=item.getLinkId() && item.getLinkType().equalsIgnoreCase(ObjectTypeConstants.SHIELD_ELEMENT_TO_SHIELD_ELEMENT_LINK)) {
                                        ShieldElementToShieldElementMap shieldElementToShieldElementMap = shieldElementToShieldElementMapRepository.findOne(item.getLinkId());
                                        shieldElementToShieldElementMap.setShieldElementOne(shieldElement);
                                        shieldElementToShieldElementMapRepository.save(shieldElementToShieldElementMap);
                                    }
                                }
                            }
                        });
                    }

                }
            }

        }catch (Exception e){
            throw e;
        }
    }
}
