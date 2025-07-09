package com.ss.comparator;

import com.ss.constants.ObjectTypeConstants;
import com.ss.pojo.helper.IdNameObject;
import com.ss.pojo.restservice.GenericItem;

import java.util.Comparator;
import java.util.List;

public class GenericItemAlphabetComparator implements Comparator<GenericItem> {

    @Override
    public int compare(GenericItem o1, GenericItem o2) {
        String ot1 = "";
        String ot2 = "";
        String name1 = "";
        String name2 = "";
        if (o1 != null) {
            if (o1.getObjectType() != null)
                ot1 = o1.getObjectType().trim().toLowerCase();
            name1 = getName(o1);
        }
        if (o2 != null) {
            if (o2.getObjectType() != null)
                ot2 = o2.getObjectType().trim().toLowerCase();
            name2 = getName(o2);
        }

        if (ot1.equals(ot2)) {
            return name1.compareTo(name2);
        } else if (ot1.equals(ObjectTypeConstants.SCE))
            return -1;
        else if (ot2.equals(ObjectTypeConstants.SCE))
            return 1;
        else {
            return ot1.compareTo(ot2);
        }
    }

    private String getName(GenericItem genericItem) {
        if (genericItem.getObjectType() != null && genericItem.getObjectType().equals(ObjectTypeConstants.SCE))
            return getExpressionName(genericItem);
        else if (genericItem.getName() != null)
            return genericItem.getName().trim().toLowerCase();

        return "";
    }

    private String getExpressionName(GenericItem genericItem) {
        String expressionName = "";
        if (genericItem.getOdosChain() == null)
            return expressionName;
        expressionName += getChainAsString(genericItem.getOdosChain());
        if (genericItem.getMdosChain() == null)
            return expressionName;
        expressionName += getChainAsString(genericItem.getMdosChain());
        if (genericItem.getCdosChain() == null)
            return expressionName;
        expressionName += getChainAsString(genericItem.getCdosChain());
        if (genericItem.getSdosChain() == null)
            return expressionName;
        expressionName += getChainAsString(genericItem.getSdosChain());
        return expressionName;
    }

    private String getChainAsString(List<IdNameObject> chain) {
        String chainAsName = "";
        if (chain != null && !chain.isEmpty()) {
            for (IdNameObject obj : chain)
                chainAsName += obj.getName();
        }
        return chainAsName;
    }
}
