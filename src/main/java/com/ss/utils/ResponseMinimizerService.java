package com.ss.utils;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ss.pojo.restservice.GenericItem;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("ResponseMinimizerService")
public class ResponseMinimizerService {

    private Map<String, String> getShortCutKeys() {
        Map<String, String> shortCutKeys = new HashMap<>();
        shortCutKeys.put("elementId", "c1");
        shortCutKeys.put("name", "c2");
        shortCutKeys.put("description", "c3");
        shortCutKeys.put("chain", "c4");
        shortCutKeys.put("linkId", "c5");
        shortCutKeys.put("linkName", "c6");
        shortCutKeys.put("linkType", "c7");
        shortCutKeys.put("odosChain", "c8");
        shortCutKeys.put("odosTree", "c9");
        shortCutKeys.put("mdosChain", "c10");
        shortCutKeys.put("mdosTree", "c11");
        shortCutKeys.put("cdosChain", "c12");
        shortCutKeys.put("cdosTree", "c13");
        shortCutKeys.put("sdosChain", "c14");
        shortCutKeys.put("sdosTree", "c15");
        shortCutKeys.put("shieldTypeName", "c16");
        shortCutKeys.put("shieldTypeId", "c17");
        shortCutKeys.put("shieldName", "c18");
        shortCutKeys.put("shieldId", "c19");
        shortCutKeys.put("shieldElementTypeName", "c20");
        shortCutKeys.put("shieldElementTypeId", "c21");
        shortCutKeys.put("isMappableToSce", "c22");
        shortCutKeys.put("isDefaultElement", "c23");
        shortCutKeys.put("refId", "c24");
        shortCutKeys.put("children", "c25");
        shortCutKeys.put("author", "c26");
        shortCutKeys.put("version", "c27");
        shortCutKeys.put("level", "c28");
        shortCutKeys.put("objectType", "c29");
        shortCutKeys.put("orgUnitName", "c30");
        shortCutKeys.put("orgUnitId", "c31");
        shortCutKeys.put("providerName", "c32");
        shortCutKeys.put("index", "c33");
        shortCutKeys.put("rating", "c34");
        shortCutKeys.put("isGroupItemFound", "c35");
        shortCutKeys.put("errorMessage", "c36");
        shortCutKeys.put("isFulfillsMapped", "c37");
        shortCutKeys.put("protectionType", "c38");
        shortCutKeys.put("isAssociationMapped", "c39");
        shortCutKeys.put("color", "c40");
        shortCutKeys.put("oneRatingDesc", "c41");
        shortCutKeys.put("twoRatingDesc", "c42");
        shortCutKeys.put("threeRatingDesc", "c43");
        shortCutKeys.put("fourRatingDesc", "c44");
        shortCutKeys.put("fiveRatingDesc", "c45");
        shortCutKeys.put("coefficient", "c46");
        shortCutKeys.put("isActivated", "c47");
        shortCutKeys.put("ratingId", "c48");
        shortCutKeys.put("justificationReason", "c49");
        shortCutKeys.put("ratingObjectType", "c50");
        shortCutKeys.put("parentElementId", "c51");
        shortCutKeys.put("parentElementName", "c52");
        shortCutKeys.put("booleanFlags", "c53");
        shortCutKeys.put("fileName", "c54");
        shortCutKeys.put("artifacts", "c55");
        shortCutKeys.put("debugInfo", "c56");
        shortCutKeys.put("email", "c57");
        shortCutKeys.put("sourceId", "c58");
        shortCutKeys.put("sourceName", "c59");
        shortCutKeys.put("acronym", "c60");

        return shortCutKeys;
    }

    public Map<String, Object> convertGenericItem(GenericItem genericItem) {

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> result = new HashMap<>();

        Map<String, Object> keyValuePair = objectMapper.convertValue(genericItem, Map.class);

        for (Map.Entry<String, Object> entry : keyValuePair.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            Map<String, String> shortCutKeys = getShortCutKeys();
            if (key.equals("children")) {
                List<GenericItem> children = genericItem.getChildren();
                if (children != null) {
                    List<Map<String, Object>> childrenConverted = new ArrayList<>();
                    for (GenericItem child : children) {
                        Map<String, Object> childConverted = convertGenericItem(child);
                        childrenConverted.add(childConverted);
                    }
                    result.put(shortCutKeys.get(key), childrenConverted);
                }
            } else if (shortCutKeys.get(key) != null) {
                key = shortCutKeys.get(key);
                result.put(key, value);
            }

        }
        Map<String, Object> response = new HashMap<>();
        response.put("codes", getShortCutKeys());
        response.put("response", result);
        return response;
    }
}
