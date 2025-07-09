package com.ss.pojo.helper;

public class CoreHotlinksPOJO {

    private boolean canCreate;
    private boolean canEdit;
    private boolean canDelete;
    private boolean canDataview;
    private String objectTypeLabel;

    public boolean isCanCreate() {
        return canCreate;
    }

    public void setCanCreate(boolean canCreate) {
        this.canCreate = canCreate;
    }

    public boolean isCanEdit() {
        return canEdit;
    }

    public void setCanEdit(boolean canEdit) {
        this.canEdit = canEdit;
    }

    public boolean isCanDelete() {
        return canDelete;
    }

    public void setCanDelete(boolean canDelete) {
        this.canDelete = canDelete;
    }

    public boolean isCanDataview() {
        return canDataview;
    }

    public void setCanDataview(boolean canDataview) {
        this.canDataview = canDataview;
    }

    public String getObjectTypeLabel() {
        return objectTypeLabel;
    }

    public void setObjectTypeLabel(String objectTypeLabel) {
        this.objectTypeLabel = objectTypeLabel;
    }
}
