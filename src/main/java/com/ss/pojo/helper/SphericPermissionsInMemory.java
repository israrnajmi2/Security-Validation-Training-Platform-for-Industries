package com.ss.pojo.helper;

public class SphericPermissionsInMemory {

    private CorePermissionsInMemory corePermissionsInMemory;

    private MiscellaneousPermissionsInMemory miscellaneousPermissionsInMemory;

    //private ViewPermissionsInMemory viewPermissionsInMemory;


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
