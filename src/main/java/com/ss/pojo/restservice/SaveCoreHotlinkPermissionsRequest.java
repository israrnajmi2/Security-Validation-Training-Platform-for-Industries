package com.ss.pojo.restservice;

import com.ss.pojo.helper.CorePermissionsInMemory;
import com.ss.pojo.helper.MiscellaneousPermissionsInMemory;

public class SaveCoreHotlinkPermissionsRequest {

    private Integer userRoleId;

    private CorePermissionsInMemory corePermissionsInMemory;

    private MiscellaneousPermissionsInMemory miscellaneousPermissionsInMemory;

    public Integer getUserRoleId() {
        return userRoleId;
    }

    public void setUserRoleId(Integer userRoleId) {
        this.userRoleId = userRoleId;
    }

    public CorePermissionsInMemory getCorePermissionsInMemory() {
        return corePermissionsInMemory;
    }

    public void setCorePermissionsInMemory(CorePermissionsInMemory corePermissionsInMemory) {
        this.corePermissionsInMemory = corePermissionsInMemory;
    }

    public MiscellaneousPermissionsInMemory getMiscellaneousPermissionsInMemory() {
        return miscellaneousPermissionsInMemory;
    }

    public void setMiscellaneousPermissionsInMemory(MiscellaneousPermissionsInMemory miscellaneousPermissionsInMemory) {
        this.miscellaneousPermissionsInMemory = miscellaneousPermissionsInMemory;
    }
}
