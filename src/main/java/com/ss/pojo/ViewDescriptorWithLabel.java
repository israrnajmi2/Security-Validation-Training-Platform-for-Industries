package com.ss.pojo;

public class ViewDescriptorWithLabel {
    private String viewName;

    /*all_linked, all_linked_level0, all_linked_by_shield_id, children, parent, shall_protect, could_protect, protect*/
    private String selectionMode;

    //for selection mode : all_linked_by_shield_id. Using with SCE
    private Integer shieldId;

    private String label;

    public ViewDescriptorWithLabel() {

    }

    public ViewDescriptorWithLabel(String viewName) {
        this.viewName = viewName;
    }

    public ViewDescriptorWithLabel(String viewName, String selectionMode) {
        this.viewName = viewName;
        this.selectionMode = selectionMode;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
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

}
