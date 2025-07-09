package com.ss.service.projectionview;

import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.shieldclassification.ShieldElementType;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.shieldclassification.ShieldElementTypeRepository;
import com.ss.utils.GenericItemIndexCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("ProjectionHelperService")
public class ProjectionHelperService {

    @Autowired
    private ShieldElementTypeRepository shieldElementTypeRepository;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    public Map<Integer, Float> getRatingsMap(GenericItem assetDeliversPerspectiveDV, Integer shieldId, Integer level) {
        Map<Integer, Float> responseMap = new HashMap<>();

        List<ShieldElementType> shieldElementTypeList = shieldElementTypeRepository.findByShieldIdAndIsArchivedFalse(shieldId);
        Set<Integer> elementTypeIds = getSetOfElementTypeIds(shieldElementTypeList, level);

        updateRatingsMap(assetDeliversPerspectiveDV, responseMap, elementTypeIds);
        return responseMap;
    }

    private void updateRatingsMap(GenericItem genericItem, Map<Integer, Float> responseMap, Set<Integer> elementTypeIds) {
        if (genericItem == null)
            return;
        if (genericItem.getShieldElementTypeId() != null && elementTypeIds.contains(genericItem.getShieldElementTypeId())) {
            if (genericItem.getRating() != null)
                responseMap.put(genericItem.getElementId(), genericItem.getRating());
            else if (genericItem.getIndex() != null)
                responseMap.put(genericItem.getElementId(), genericItem.getIndex());
        }
        if (genericItem.getChildren() != null) {
            for (GenericItem child : genericItem.getChildren()) {
                updateRatingsMap(child, responseMap, elementTypeIds);
            }
        }
    }

    private Set<Integer> getSetOfElementTypeIds(List<ShieldElementType> shieldElementTypeList, Integer level) {
        Set<Integer> responseSet = new HashSet<>();
        if (shieldElementTypeList != null)
            for (ShieldElementType shieldElementType : shieldElementTypeList) {
                if (level == null || level <= 0 || shieldElementType.getLevel() <= level)
                    responseSet.add(shieldElementType.getId());
            }
        return responseSet;
    }

    public void applyIndexValues(GenericItem genericItem, Map<Integer, Float> ratingsMap) {
        if (genericItem == null)
            return;
        if (genericItem.getChildren() != null && !genericItem.getChildren().isEmpty()) {
            for (GenericItem child : genericItem.getChildren())
                applyIndexValues(child, ratingsMap);
            genericItem.setIndex(genericItemIndexCalculator.calculateAggregateIndexProjection(genericItem.getChildren()));
        } else {
            Float index = ratingsMap.get(genericItem.getElementId());
            if (index == null)
                genericItem.setIndex(0f);
            else
                genericItem.setIndex(index);
        }
    }

    public void removeMappingsWithoutRatings(GenericItem genericItem, Map<Integer, Float> ratingsMap) {

        canIncludeGenericItem(genericItem, ratingsMap);

    }

    private boolean canIncludeGenericItem(GenericItem genericItem, Map<Integer, Float> ratingsMap) {
        if (genericItem == null)
            return false;
        if (genericItem.getChildren() != null && !genericItem.getChildren().isEmpty()) {
            List<GenericItem> filteredChildren = new ArrayList<>();
            for (GenericItem child : genericItem.getChildren()) {
                boolean includeGenericItem = canIncludeGenericItem(child, ratingsMap);
                if (includeGenericItem)
                    filteredChildren.add(child);
            }
            genericItem.setChildren(filteredChildren);
        } else {
            if (genericItem.getLinkType() != null && genericItem.getLinkType().equals(ObjectTypeConstants.SHIELD_ELEMENT_TO_SHIELD_ELEMENT_LINK)) {
                Float index = ratingsMap.get(genericItem.getElementId());
                if (index == null)
                    return false;
            }
        }
        return true;
    }
}
