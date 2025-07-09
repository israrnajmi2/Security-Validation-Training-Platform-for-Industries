package com.ss.utils;

import com.ss.constants.ObjectTypeConstants;
import com.ss.pojo.helper.IdNameObject;
import com.ss.pojo.restservice.GenericItem;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("IdNameObjectConverter")
public class IdNameObjectConverter {

    public List<IdNameObject> convertOnlyTopLevel(List<GenericItem> genericItemList) {
        List<IdNameObject> response = new ArrayList<>();
        if (genericItemList == null)
            return response;
        for (GenericItem genericItem : genericItemList) {
            IdNameObject idNameObject = new IdNameObject();
            idNameObject.setName(genericItem.getName());
            idNameObject.setElementId(genericItem.getElementId());
            idNameObject.setObjectType(genericItem.getObjectType());
            response.add(idNameObject);
        }
        return response;
    }

    public void minifiedGenericItem(GenericItem shieldGenericItem) {
        //shieldGenericItem.setLevel(null);
        shieldGenericItem.setOrgUnitName(null);
        shieldGenericItem.setOrgUnitId(null);
        shieldGenericItem.setShieldElementTypeName(null);
        //shieldGenericItem.setShieldElementTypeId(null);
        shieldGenericItem.setGroupItemFound(null);
        shieldGenericItem.setDescription(null);
        shieldGenericItem.setShieldTypeId(null);
        shieldGenericItem.setShieldTypeName(null);
        shieldGenericItem.setChain(null);
        shieldGenericItem.setVersion(null);
        shieldGenericItem.setProviderName(null);
        shieldGenericItem.setAuthor(null);
        shieldGenericItem.setShieldId(null);
        shieldGenericItem.setShieldName(null);
        shieldGenericItem.setDefaultElement(null);
        shieldGenericItem.setMappableToSce(null);
        shieldGenericItem.setAcronym(null);
        //shieldGenericItem.setBooleanFlags(null);

        if (shieldGenericItem.getObjectType().equals(ObjectTypeConstants.SHIELD_ELEMENT) || shieldGenericItem.getObjectType().equals(ObjectTypeConstants.STANDARD_ELEMENT)
                || shieldGenericItem.getObjectType().equals(ObjectTypeConstants.BUSINESS_CONTROL)) {
            shieldGenericItem.setLevel(null);
        }

        if (shieldGenericItem.getChildren() != null) {
            for (GenericItem child : shieldGenericItem.getChildren()) {
                if (child != null)
                    minifiedGenericItem(child);
            }
            //Collections.sort(shieldGenericItem.getChildren(), new GenericItemAlphabetComparator());
        }
    }

    public void minifiedGenericItemPerspective(GenericItem shieldGenericItem) {
        //shieldGenericItem.setLevel(null);
        shieldGenericItem.setOrgUnitName(null);
        shieldGenericItem.setOrgUnitId(null);
        shieldGenericItem.setShieldElementTypeName(null);
        //shieldGenericItem.setShieldElementTypeId(null);
        shieldGenericItem.setGroupItemFound(null);
        shieldGenericItem.setDescription(null);
        shieldGenericItem.setShieldTypeId(null);
        shieldGenericItem.setShieldTypeName(null);
        shieldGenericItem.setChain(null);
        shieldGenericItem.setVersion(null);
        shieldGenericItem.setProviderName(null);
        shieldGenericItem.setAuthor(null);
        shieldGenericItem.setShieldId(null);
        shieldGenericItem.setShieldName(null);
        shieldGenericItem.setDefaultElement(null);
        shieldGenericItem.setMappableToSce(null);
        //shieldGenericItem.setBooleanFlags(null);
        shieldGenericItem.setAcronym(null);

        if (shieldGenericItem.getObjectType().equals(ObjectTypeConstants.SHIELD_ELEMENT) || shieldGenericItem.getObjectType().equals(ObjectTypeConstants.STANDARD_ELEMENT)
                || shieldGenericItem.getObjectType().equals(ObjectTypeConstants.BUSINESS_CONTROL)) {
            shieldGenericItem.setLevel(null);
        }


        if (shieldGenericItem.getIndex() == null)
            shieldGenericItem.setIndex(0f);

        if (shieldGenericItem.getChildren() != null) {
            for (GenericItem child : shieldGenericItem.getChildren()) {
                if (child != null)
                    minifiedGenericItemPerspective(child);
            }
            //Collections.sort(shieldGenericItem.getChildren(), new GenericItemAlphabetComparator());
        }
    }

    public void minifiedGenericItemForDataview(GenericItem shieldGenericItem) {
        //shieldGenericItem.setLevel(null);
        shieldGenericItem.setOrgUnitName(null);
        shieldGenericItem.setOrgUnitId(null);
        shieldGenericItem.setShieldElementTypeName(null);
        //shieldGenericItem.setShieldElementTypeId(null);
        shieldGenericItem.setGroupItemFound(null);

        shieldGenericItem.setShieldTypeId(null);
        shieldGenericItem.setShieldTypeName(null);

        shieldGenericItem.setVersion(null);
        shieldGenericItem.setProviderName(null);
        shieldGenericItem.setAuthor(null);
        shieldGenericItem.setShieldId(null);
        shieldGenericItem.setShieldName(null);
        shieldGenericItem.setDefaultElement(null);
        shieldGenericItem.setMappableToSce(null);
        shieldGenericItem.setAcronym(null);
        shieldGenericItem.setBooleanFlags(null);

        if (shieldGenericItem.getObjectType().equals(ObjectTypeConstants.SHIELD_ELEMENT) || shieldGenericItem.getObjectType().equals(ObjectTypeConstants.STANDARD_ELEMENT)
                || shieldGenericItem.getObjectType().equals(ObjectTypeConstants.BUSINESS_CONTROL)) {
            shieldGenericItem.setLevel(null);
        }

        if (shieldGenericItem.getChildren() != null) {
            for (GenericItem child : shieldGenericItem.getChildren()) {
                if (child != null)
                    minifiedGenericItemForDataview(child);
            }
            //Collections.sort(shieldGenericItem.getChildren(), new GenericItemAlphabetComparator());
        }
    }
}
