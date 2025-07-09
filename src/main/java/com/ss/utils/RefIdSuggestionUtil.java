package com.ss.utils;

import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.shieldclassification.ShieldElementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service("RefIdSuggestionUtil")
public class RefIdSuggestionUtil {

    @Autowired
    private ShieldElementRepository shieldElementRepository;

    public String getRefIdSuggestion(ShieldElement shieldElement, Shield shield) {
        List<ShieldElement> childrenShieldElementList = shieldElement.getChildrenShieldElementList();
        String abbreviation = shieldElement.getAbbreviation();
        if(abbreviation == null || abbreviation.isEmpty())
            abbreviation = "1";

        Set<String> refIdSet = new HashSet<>();
        if(childrenShieldElementList != null) {
            refIdSet = childrenShieldElementList.stream().map(item -> item.getAbbreviation()).collect(Collectors.toSet());
        }

        char delimiter = '.';
        int count = 1;

        while (refIdSet.contains(abbreviation + delimiter + count)) {
            count++;
        }

        return abbreviation + delimiter + count;
    }

    public void setRefIfForDraggedItem(GenericItem genericItem){
        if(genericItem!=null && genericItem.getChildren()!=null && genericItem.getDragged() && genericItem.getObjectType().equalsIgnoreCase(ObjectTypeConstants.SHIELD_ELEMENT)){

            ShieldElement shieldElement=shieldElementRepository.findOne(genericItem.getElementId());

            // for child
            int count = 1;
            String abbreviation = shieldElement.getAbbreviation();
            if(abbreviation == null || abbreviation.isEmpty())
                abbreviation = "1";

            char delimiter = '.';

            for (GenericItem item : genericItem.getChildren()) {
                if(item.getDragged() && item.getObjectType().equalsIgnoreCase(ObjectTypeConstants.SHIELD_ELEMENT)){
                    ShieldElement shieldElementChild=shieldElementRepository.findOne(item.getElementId());
                    shieldElementChild.setAbbreviation(abbreviation + delimiter + count);
                    shieldElementRepository.saveAndFlush(shieldElementChild);
                    count++;
                }
                if(item.getChildren()!=null){
                    setRefIfForDraggedItem(item);
                }
            }
        }

    }

}
