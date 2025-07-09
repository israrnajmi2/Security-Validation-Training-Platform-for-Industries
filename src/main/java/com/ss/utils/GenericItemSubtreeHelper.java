package com.ss.utils;

import com.ss.pojo.restservice.GenericItem;
import org.springframework.stereotype.Service;

@Service("GenericItemSubtreeHelper")
public class GenericItemSubtreeHelper {

    public GenericItem findObject(GenericItem genericItem, String objectType, Integer elementId) {
        if (genericItem.getObjectType() != null && objectType != null && genericItem.getObjectType().equals(objectType)) {
            if (genericItem.getElementId() == null && elementId == null)
                return genericItem;
            else if (genericItem.getElementId() != null && elementId != null && genericItem.getElementId().equals(elementId)) {
                return genericItem;
            }
        }

        if (genericItem.getChildren() != null) {
            for (GenericItem childItem : genericItem.getChildren()) {
                GenericItem returnedItem = findObject(childItem, objectType, elementId);
                if (returnedItem != null)
                    return returnedItem;
            }
        }

        return null;
    }
}
