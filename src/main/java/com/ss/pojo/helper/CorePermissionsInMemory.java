package com.ss.pojo.helper;

import java.util.HashMap;
import java.util.Map;

public class CorePermissionsInMemory {

    Map<String, CoreHotlinksPOJO> objectTypeToCoreHotlinksMap = new HashMap<>();

    public Map<String, CoreHotlinksPOJO> getObjectTypeToCoreHotlinksMap() {
        return objectTypeToCoreHotlinksMap;
    }

    public void setObjectTypeToCoreHotlinksMap(Map<String, CoreHotlinksPOJO> objectTypeToCoreHotlinksMap) {
        this.objectTypeToCoreHotlinksMap = objectTypeToCoreHotlinksMap;
    }
}
