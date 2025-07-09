$(document).ready(function () {
    $(document).on("click", ".groupSelectorProviderItem", function (e) {
        let AssetDesktopUtil = new ProviderDesktopUtils();
        AssetDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", "#providerAsset", function (e) {
        let AssetTypeDesktopUtil = new ProviderDesktopUtils();
        AssetTypeDesktopUtil.assetClick();
        e.stopPropagation();
    });

    $(document).on("click", ".providerSearchObject_ElementTypeItem", function (e) {
        let providerDesktopUtils = new ProviderDesktopUtils();
        let dropDownId = "single_provider_desk_search_dropdown_content";
        let selectedId = "single_provider_desk_search_dropdown_selected";
        providerDesktopUtils.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".providerCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_provider_desk_custom_search_dropdown_content";
        let selectedId = "single_provider_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".bigroupSelectorProviderItem", function (e) {
        let ProviderDesktopUtils = new BiViewProviderDesktopUtils();
        ProviderDesktopUtils.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", "#biProviderAsset", function (e) {
        let ProviderDesktopUtils = new BiViewProviderDesktopUtils();
        ProviderDesktopUtils.assetClick();
        e.stopPropagation();
    });

    $(document).on("click", ".biProviderSearchObject_ElementTypeItem", function (e) {
        let providerDesktopUtils = new BiViewProviderDesktopUtils();
        let dropDownId = "bi_provider_desk_search_dropdown_content";
        let selectedId = "bi_provider_desk_search_dropdown_selected";
        providerDesktopUtils.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biProviderCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_provider_desk_custom_search_dropdown_content";
        let selectedId = "bi_provider_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".groupSelectorBusinessProviderItem", function () {
        let AssetDesktopUtil = new BusinessProviderDesktopUtils(e);
        AssetDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", "#businessProviderAsset", function (e) {
        let AssetTypeDesktopUtil = new BusinessProviderDesktopUtils();
        AssetTypeDesktopUtil.assetClick();
        e.stopPropagation();
    });

    $(document).on("click", ".businessProviderSearchObject_ElementTypeItem", function (e) {
        let providerDesktopUtils = new BusinessProviderDesktopUtils();
        let dropDownId = "single_business_provider_desk_search_dropdown_content";
        let selectedId = "single_provider_desk_search_dropdown_selected";
        providerDesktopUtils.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".businessProviderCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_business_provider_desk_custom_search_dropdown_content";
        let selectedId = "single_provider_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".bigroupSelectorBusinessProviderItem", function (e) {
        let ProviderDesktopUtils = new BiViewBusinessProviderDesktopUtils();
        ProviderDesktopUtils.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", "#biBusinessProviderAsset", function (e) {
        let ProviderDesktopUtils = new BiViewBusinessProviderDesktopUtils();
        ProviderDesktopUtils.assetClick();
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessProviderSearchObject_ElementTypeItem", function (e) {
        let providerDesktopUtils = new BiViewBusinessProviderDesktopUtils();
        let dropDownId = "bi_business_provider_desk_search_dropdown_content";
        let selectedId = "bi_business_provider_desk_search_dropdown_selected";
        providerDesktopUtils.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessProviderCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_business_provider_desk_custom_search_dropdown_content";
        let selectedId = "bi_business_provider_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
});

const providerUtil = new providerUtils;

function providerUtils() {
    function getGroups(activeDesktop, view, classParam, isBusiness) {
        let selectorId = activeDesktop.selector.groups_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        let callback = function (res) {
            let data = {};
            data.idOfParentDiv = selectorId;
            data.view = view;
            data.viewName = "groupView";
            data.isRoot = false;
            renderSelectorDropDown(activeDesktop, res, "groupSelector", classParam, data, true);
            groupSelector(previousSelector, selectorId, getLiFromSelector, activeDesktop.utilsFunction.groupSelectorClick);
        };
        (isBusiness) ? serviceFunctions.getAllBusinessProviderGroups(callback) : serviceFunctions.getAllProviderGroups(callback);
    }

    function getDirectory(activeDesktop, view, callback, classOfObjectTypeElementType, assetId, isBusiness) {
        modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
        let data = {};
        let backingview, renderFunction;
        let isBiview = isBiViewOrNot(view);
        if (view === "singleview") {
            backingview = backing.singleview;
        }
        else if (view === "biview") {
            backingview = backing.biview;
        }
        data.assetTypeGroupId = $("#single_provider_desk_group_dropdown_selected").attr("elementId");
        if ($("#" + assetId).is(':checked'))
            data.showAsset = true;
        else
            data.showAsset = false;
        $("#saveData").show();
        renderFunction = (isBusiness) ? service.getBusinessProvidersDvWithOrWithoutAssetAndGroupApplied : service.getProvidersDvWithOrWithoutAssetAndGroupApplied;
        renderFunction(data, function (res, err) {
            if (res) {
                let directoryViewTreeId = activeDesktop.tree_container_id;
                if (activeDesktop) {
                    generateUniqueIdAndParentLink(res, activeDesktop.div_id, null);
                    backingview.dvDataUseAttr = res;
                    if (activeDesktop.sortBy === undefined)
                        activeDesktop.sortBy = false;
                    if (activeDesktop.sortBy === true)
                        sortChildrenAlphbetically(res);
                    activeDesktop.directoryJson = res;
                    let oldExpansionState = getExpansionStateOfElements(activeDesktop.tree_container_id);
                    renderDirectoryView(res, directoryViewTreeId, view, "anchorView", isBiview);
                    // applyExpansionState(oldExpansionState, activeDesktop.tree_container_id);
                    let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                    if (objectTypesAndElementTypes) {
                        renderObjectTypesAndElementTypesDropDown(objectTypesAndElementTypes, activeDesktop, classOfObjectTypeElementType);
                        activeDesktop.ObjectTypesAndElementTypes = objectTypesAndElementTypes;
                    }
                    let ringViewDivId = backing.view_type.ring_view.name + "_" + activeDesktop.div_id;
                    activeDesktop.elementIdAndObjectArray = null;
                    if ($("#" + ringViewDivId).hasClass("active"))
                        updateViewsStandards(ringViewDivId, res);
                    refreshGroupRingViews(activeDesktop.opened_views);
                    if (callback) {
                        callback();
                    }
                    applyExpansionState(oldExpansionState, activeDesktop.tree_container_id);
                    $("#saveData").hide();
                }
                else {
                    errorHandler(err);
                    $("#saveData").hide();

                }
            }
            else if (err) {
                $("#saveData").hide();
            }
        });
    }

    function searchClick(activeDesktop, selectedElement, selectedId, dropDownId, classParam) {
        let $selectedId = $("#" + selectedId);
        if (selectedElement.attr("randomId")) {
            $selectedId.html(selectedElement.html());
            $selectedId.parent().find(".searchIcon").removeClass("opacityDull");
        }
        else {
            $selectedId.parent().find(".searchIcon").addClass("opacityDull");
            $selectedId.html("");
        }
        $selectedId.removeAttr("randomId");
        $selectedId.attr("randomId", selectedElement.attr("randomId"));
        $("#" + dropDownId).addClass("dis-none");
        renderCustomSearchDropDown(selectedElement.attr("randomId"), activeDesktop, classParam);
    }

    function getSelector(desktopSelector) {
        let selectorObj = {};
        selectorObj.providerGroupId = $("#" + desktopSelector.groups_dropdown_selected_id).attr("elementId");
        if ($("#" + desktopSelector.asset_checkbox_id).find(".assetCheckbox").is(":checked")) {
            selectorObj.showAsset = true;
        }
        else {
            selectorObj.showAsset = false;
        }
        return selectorObj;
    }

    function groupClick(activeDesktop, selectedElement, callback) {
        let $dropDown = $(".desktop-selector-dropdown-content");
        if (!selectedElement) {
            $dropDown.addClass("dis-none");
            return;
        }
        let $groupsSelected = $(`#${activeDesktop.selector.groups_dropdown_selected_id}`);
        $("#saveData").show();
        $dropDown.addClass("dis-none");
        if (selectedElement.attr("elementId") !== "0") {
            $groupsSelected.html(selectedElement.html());
            $groupsSelected.parent().find(".groupIcon").removeClass("opacityDull");
        }
        else {
            $groupsSelected.parent().find(".groupIcon").addClass("opacityDull");
            $groupsSelected.html("");
        }
        $groupsSelected.attr("elementId", selectedElement.attr("elementId"));
        activeDesktop.utilsFunction.getDirectoryView(callback)
    }

    function refresh(activeDesktop) {
        let previousSelection = {};
        let groupSelectorId = activeDesktop.selector.groups_dropdown_selected_id;
        previousSelection.shieldSelectorId = $("#" + groupSelectorId).attr("elementId");
        activeDesktop.previousSelectors = previousSelection;
        activeDesktop.utilsFunction.getElementGroups();
    }

    return {getGroups, getDirectory, searchClick, getSelector, groupClick, refresh};
}

function ProviderDesktopUtils() {
    let proDesk = new Object();

    function getElementGroups() {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.provider_desktop;
        providerUtil.getGroups(activeDesktop, "singleview", "groupSelectorProvider");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.provider_desktop;
        providerUtil.getDirectory(activeDesktop, "singleview", callback, "providerSearchObject_ElementTypeItem", "providerAsset");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.provider_desktop;
        providerUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "providerCustomSearchObject_ElementTypeItem");
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.provider_desktop;
        providerUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function assetClick() {
        $("#saveData").show();
        getDirectoryView();
    }

    function getSelectorForProviderDesk() {
        let desktopSelector = backing.singleview.workspaces.cla_workspace.desktops.provider_desktop.selector;
        return providerUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.provider_desktop;
        providerUtil.refresh(activeDesktop, "singleview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("provider_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForProviderDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("provider_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

     //added by Manish for drag and drop
    function saveDragAndDrop(){
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(false);
        let genericElement={children};
        service.saveProviderDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            // refreshFullDesktop();
            const event = {"key": backing.event_type.deleted_provider_element.key};
            propagateEvent(event);
            hideDragAndDropSaveBtn();
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    //added for drag and drop by Manish
    /*function addDragAndDrop() {
        let selectorId=getActiveDesktopTreeSelectorId(false);
        $("#"+selectorId).sortable({
            items : "li[id]",
            toleranceElement: '> div',
            dropOnEmpty: true,
            change: function(event, ui) {

                if(ui.item.attr("objectType")==="provider_info") {
                    ui.placeholder.css({visibility: 'visible', border : '1px dotted red'});
                }else{
                    ui.placeholder.css({visibility: 'visible', border : '1px dotted blue'});
                }
                
            },
            update : function(event, ui) {
                if(ui.item.attr("objectType")==="provider_info") {
                    $(this).sortable('cancel');
                 }else{
                    updateTextOnDrop(event,ui)
                 }
            }
        });
    }*/


    proDesk.getSelector = getSelectorForProviderDesk;
    proDesk.groupSelectorClick = groupSelectorClick;
    proDesk.assetClick = assetClick;
    proDesk.getElementGroups = getElementGroups;
    proDesk.getDirectoryView = getDirectoryView;
    proDesk.searchObjectElementClick = searchObjectElementClick;
    proDesk.fullRefresh = refreshFullDesktop;
    proDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    proDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    proDesk.saveDragAndDrop = saveDragAndDrop;
    // proDesk.addDragAndDrop = addDragAndDrop;
    return proDesk;
}

function BiViewProviderDesktopUtils() {
    let proDesk = new Object();

    function getElementGroups() {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.provider_desktop;
        providerUtil.getGroups(activeDesktop, "biview", "bigroupSelectorProvider");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.provider_desktop;
        providerUtil.getDirectory(activeDesktop, "biview", callback, "biProviderSearchObject_ElementTypeItem", "biProviderAsset");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.provider_desktop;
        providerUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biProviderCustomSearchObject_ElementTypeItem");
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.provider_desktop;
        providerUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function assetClick() {
        $("#saveData").show();
        getDirectoryView();
    }

    function getSelectorForProviderDesk() {
        let desktopSelector = backing.biview.workspaces.bi_cla_workspace.desktops.provider_desktop.selector;
        return providerUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.provider_desktop;
        providerUtil.refresh(activeDesktop, "biview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("provider_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForProviderDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("provider_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }


     //added by Manish for drag and drop
     function saveDragAndDrop(){
        let isBiView =true;
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiView);
        let genericElement={children};
        service.saveProviderDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            //refreshFullDesktop();
            const event = {"key": backing.event_type.deleted_provider_element.key};
            propagateEvent(event);
            hideDragAndDropSaveBtn(isBiView);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

/*    //added for drag and drop by Manish
    function addDragAndDrop() {
        let isBiView =true;
        let selectorId=getActiveDesktopTreeSelectorId(isBiView);
        $("#"+selectorId).sortable({
            items : "li[id]",
            toleranceElement: '> div',
            dropOnEmpty: true,
            change: function(event, ui) {

                if(ui.item.attr("objectType")==="provider_info") {
                    ui.placeholder.css({visibility: 'visible', border : '1px dotted red'});
                }else{
                    ui.placeholder.css({visibility: 'visible', border : '1px dotted blue'});
                }

            },
            update : function(event, ui) {
                if(ui.item.attr("objectType")==="provider_info") {
                    $(this).sortable('cancel');
                 }else{
                    updateTextOnDrop(event,ui,isBiView)
                 }
            }
        });
    }*/

    proDesk.groupSelectorClick = groupSelectorClick;
    proDesk.assetClick = assetClick;
    proDesk.getElementGroups = getElementGroups;
    proDesk.getDirectoryView = getDirectoryView;
    proDesk.fullRefresh = refreshFullDesktop;
    proDesk.searchObjectElementClick = searchObjectElementClick;
    proDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    proDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    proDesk.saveDragAndDrop = saveDragAndDrop;
    //proDesk.addDragAndDrop = addDragAndDrop;
    return proDesk;
}

function BusinessProviderDesktopUtils() {
    let proDesk = new Object();

    function getElementGroups() {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_provider_desktop;
        providerUtil.getGroups(activeDesktop, "singleview", "groupSelectorBusinessProvider", true);
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_provider_desktop;
        providerUtil.getDirectory(activeDesktop, "singleview", callback, "businessProviderSearchObject_ElementTypeItem", "businessProviderAsset", true);
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_provider_desktop;
        providerUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "businessProviderCustomSearchObject_ElementTypeItem");
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_provider_desktop;
        providerUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function assetClick() {
        $("#saveData").show();
        getDirectoryView();
    }

    function getSelectorForProviderDesk() {
        let desktopSelector = backing.singleview.workspaces.business_workspace.desktops.business_provider_desktop.selector;
        return providerUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_provider_desktop;
        providerUtil.refresh(activeDesktop, "singleview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("business_provider_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForProviderDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("business_provider_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    /*function addDragAndDrop() {
        addDragAndDropCommon();
    }*/

    function saveDragAndDrop(){
        let isBiView =false;
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiView);
        let genericElement={children};
        service.saveBusinessProviderDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            // refreshFullDesktop();
            const event = {"key": backing.event_type.deleted_provider_element.key};
            propagateEvent(event);
            hideDragAndDropSaveBtn(isBiView);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    proDesk.getSelector = getSelectorForProviderDesk;
    proDesk.groupSelectorClick = groupSelectorClick;
    proDesk.assetClick = assetClick;
    proDesk.getElementGroups = getElementGroups;
    proDesk.getDirectoryView = getDirectoryView;
    proDesk.searchObjectElementClick = searchObjectElementClick;
    proDesk.fullRefresh = refreshFullDesktop;
    proDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    proDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    proDesk.saveDragAndDrop = saveDragAndDrop;
    //proDesk.addDragAndDrop = addDragAndDrop;
    return proDesk;
}

function BiViewBusinessProviderDesktopUtils() {
    let proDesk = new Object();

    function getElementGroups() {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_provider_desktop;
        providerUtil.getGroups(activeDesktop, "biview", "bigroupSelectorBusinessProvider", true);
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_provider_desktop;
        providerUtil.getDirectory(activeDesktop, "biview", callback, "biBusinessProviderSearchObject_ElementTypeItem", "biBusinessProviderAsset", true);
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_provider_desktop;
        providerUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biBusinessProviderCustomSearchObject_ElementTypeItem");
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_provider_desktop;
        providerUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function assetClick() {
        $("#saveData").show();
        getDirectoryView();
    }

    function getSelectorForProviderDesk() {
        let desktopSelector = backing.biview.workspaces.bi_business_workspace.desktops.business_provider_desktop.selector;
        return providerUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_provider_desktop;
        providerUtil.refresh(activeDesktop, "biview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("business_provider_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForProviderDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("business_provider_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    /*function addDragAndDrop() {
        addDragAndDropCommon(true);
    }*/

    function saveDragAndDrop(){
        let isBiView =true;
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiView);
        let genericElement={children};
        service.saveBusinessProviderDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            // refreshFullDesktop();
            const event = {"key": backing.event_type.deleted_provider_element.key};
            propagateEvent(event);
            hideDragAndDropSaveBtn(isBiView);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    proDesk.groupSelectorClick = groupSelectorClick;
    proDesk.assetClick = assetClick;
    proDesk.getElementGroups = getElementGroups;
    proDesk.getDirectoryView = getDirectoryView;
    proDesk.fullRefresh = refreshFullDesktop;
    proDesk.searchObjectElementClick = searchObjectElementClick;
    proDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    proDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    proDesk.saveDragAndDrop = saveDragAndDrop;
    //proDesk.addDragAndDrop = addDragAndDrop;
    return proDesk;
}