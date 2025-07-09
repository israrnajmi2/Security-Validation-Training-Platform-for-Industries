package com.ss.pojo;

public class ViewDescriptor {
    private String viewName;

    /*all_linked, all_linked_level0, all_linked_by_shield_id, children, parent, shall_protect, could_protect, protect*/
    private String selectionMode;

    //for selection mode : all_linked_by_shield_id. Using with SCE
    private Integer shieldId;

    private ViewDescriptor nextLevel;

    public ViewDescriptor() {

    }

    public ViewDescriptor(String viewName) {
        this.viewName = viewName;
    }

    public ViewDescriptor(String viewName, ViewDescriptor nextLevel) {
        this.viewName = viewName;
        this.nextLevel = nextLevel;
    }

    public ViewDescriptor(String viewName, String selectionMode) {
        this.viewName = viewName;
        this.selectionMode = selectionMode;
    }

    public ViewDescriptor(String viewName, String selectionMode, ViewDescriptor nextLevel) {
        this.viewName = viewName;
        this.selectionMode = selectionMode;
        this.nextLevel = nextLevel;
    }

    public String getViewName() {
        return viewName;
    }

    public void setViewName(String viewName) {
        this.viewName = viewName;
    }

    public String getSelectionMode() {
        return selectionMode;
    }

    public void setSelectionMode(String selectionMode) {
        this.selectionMode = selectionMode;
    }

    public Integer getShieldId() {
        return shieldId;
    }

    public void setShieldId(Integer shieldId) {
        this.shieldId = shieldId;
    }

    public ViewDescriptor getNextLevel() {
        return nextLevel;
    }

    public void setNextLevel(ViewDescriptor nextLevel) {
        this.nextLevel = nextLevel;
    }
}
