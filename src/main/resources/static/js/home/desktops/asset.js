$(document).ready(function () {
    $(document).on("click", ".groupSelectorAssetItem", function (e) {
        let AssetDesktopUtil = new AssetDesktopUtils();
        AssetDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".assetSearchObject_ElementTypeItem", function (e) {
        let AssetDesktopUtil = new AssetDesktopUtils();
        let dropDownId = "single_asset_desk_search_dropdown_content";
        let selectedId = "single_asset_desk_search_dropdown_selected";
        AssetDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".assetCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_asset_desk_custom_search_dropdown_content";
        let selectedId = "single_asset_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
    /*bi asset selector*/
    $(document).on("click", ".bigroupSelectorAssetItem", function (e) {
        let AssetDesktopUtil = new BiViewAssetDesktopUtils();
        AssetDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biAssetSearchObject_ElementTypeItem", function (e) {
        let AssetDesktopUtil = new BiViewAssetDesktopUtils();
        let dropDownId = "bi_asset_desk_search_dropdown_content";
        let selectedId = "bi_asset_desk_search_dropdown_selected";
        AssetDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biAssetCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_asset_desk_custom_search_dropdown_content";
        let selectedId = "bi_asset_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
    /*bi asset selector */

    $(document).on("click", ".groupSelectorBusinessAssetItem", function (e) {
        let AssetDesktopUtil = new BusinessAssetDesktopUtils();
        AssetDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".businessAssetSearchObject_ElementTypeItem", function (e) {
        let AssetDesktopUtil = new BusinessAssetDesktopUtils();
        let dropDownId = "single_business_asset_desk_search_dropdown_content";
        let selectedId = "single_business_asset_desk_search_dropdown_selected";
        AssetDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".businessAssetCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_business_asset_desk_custom_search_dropdown_content";
        let selectedId = "single_business_asset_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
    /*bi business asset selector*/
    $(document).on("click", ".bigroupSelectorBusinessAssetItem", function (e) {
        let AssetDesktopUtil = new BiViewBusinessAssetDesktopUtils();
        AssetDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessAssetSearchObject_ElementTypeItem", function (e) {
        let AssetDesktopUtil = new BiViewBusinessAssetDesktopUtils();
        let dropDownId = "bi_business_asset_desk_search_dropdown_content";
        let selectedId = "bi_business_asset_desk_search_dropdown_selected";
        AssetDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessAssetCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_business_asset_desk_custom_search_dropdown_content";
        let selectedId = "bi_business_asset_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
    /*bi business asset selector */
});

const assetUtil = new assetUtils;

function assetUtils() {
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
        (isBusiness) ? serviceFunctions.getAllBusinessAssetGroups(callback) : serviceFunctions.getAllAssetGroups(callback);
    }

    function getDirectory(activeDesktop, view, callback, classOfObjectTypeElementType, isBusiness) {
        let data = {};
        let backingview, renderFunction;
        let isBiview = isBiViewOrNot(view);
        if (view === "singleview") {
            backingview = backing.singleview;
        }
        else if (view === "biview") {
            backingview = backing.biview;
        }
        data.assetGroupId = parseInt($(`#${activeDesktop.selector.groups_dropdown_selected_id}`).attr("elementId"));
        data.protectionType = "shall";
        // if (data.protectionType === "do_not_show")
        data.showExpression = false;
        // else
        //     data.showExpression = true;
        $("#saveData").show();
        renderFunction = (isBusiness) ? service.getBusinessAssetsDvWithGroupApplied : service.getAssetsDvWithGroupApplied;
        renderFunction(data, function (res, err) {
            if (res) {
                let directoryViewTreeId = activeDesktop.tree_container_id;
                modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
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
                    // alert("error");
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
        selectorObj.assetGroupId = $("#" + desktopSelector.groups_dropdown_selected_id).attr("elementId");
        selectorObj.protectionType = "shall";
        selectorObj.protectionTypeHtml = $("#" + desktopSelector.protection_dropdown_selected_id).html();
        if (selectorObj.protectionType === "do_not_show")
            selectorObj.showExpression = false;
        else
            selectorObj.showExpression = true;
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
        let protectionTypeSelector = activeDesktop.selector.protection_dropdown_selected_id;
        previousSelection.groupSelectorId = $("#" + groupSelectorId).attr("elementId");
        previousSelection.protectionTypeSelector = {};
        previousSelection.protectionTypeSelector.elementId = $("#" + protectionTypeSelector).attr("elementId");
        previousSelection.protectionTypeSelector.htmlElement = $("#" + protectionTypeSelector).html();
        activeDesktop.previousSelectors = previousSelection;
        activeDesktop.utilsFunction.getElementGroups();
    }

    return {getGroups, getDirectory, searchClick, getSelector, groupClick, refresh};
}


function AssetDesktopUtils() {
    let AssetDesk = new Object();

    function getElementGroups() {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_desktop;
        assetUtil.getGroups(activeDesktop, "singleview", "groupSelectorAsset");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_desktop;
        assetUtil.getDirectory(activeDesktop, "singleview", callback, "assetSearchObject_ElementTypeItem");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_desktop;
        assetUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "assetCustomSearchObject_ElementTypeItem");
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_desktop;
        assetUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function getSelectorForAssetDesk() {
        let desktopSelector = backing.singleview.workspaces.cla_workspace.desktops.asset_desktop.selector;
        return assetUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_desktop;
        assetUtil.refresh(activeDesktop);
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("asset_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForAssetDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("asset_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

     //added by Manish for drag and drop
     function saveDragAndDrop(){
         $("#saveData").show();
         let children=getTreeDataForActiveDeskTop(false);
         let genericElement={children};
         service.saveAssetModeDragAndDrop(genericElement, function (res, err) {
             $("#saveData").hide();
             // refreshFullDesktop();
             const event = {"key": backing.event_type.deleted_asset_element.key};
             propagateEvent(event);
             hideDragAndDropSaveBtn();
             if(res.errorMessage){
                 errorMsgHandler(res);
             }
         });
    }

    AssetDesk.getSelector = getSelectorForAssetDesk;
    AssetDesk.groupSelectorClick = groupSelectorClick;
    AssetDesk.getElementGroups = getElementGroups;
    AssetDesk.getDirectoryView = getDirectoryView;
    AssetDesk.searchObjectElementClick = searchObjectElementClick;
    AssetDesk.fullRefresh = refreshFullDesktop;
    AssetDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    AssetDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    AssetDesk.saveDragAndDrop = saveDragAndDrop;
    return AssetDesk;
}

function BiViewAssetDesktopUtils() {
    let AssetDesk = new Object();

    function getElementGroups() {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_desktop;
        assetUtil.getGroups(activeDesktop, "biview", "bigroupSelectorAsset");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_desktop;
        assetUtil.getDirectory(activeDesktop, "biview", callback, "biAssetSearchObject_ElementTypeItem");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_desktop;
        assetUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biAssetCustomSearchObject_ElementTypeItem");
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_desktop;
        assetUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function getProtectionClick(selectedElement) {
        if (!selectedElement)
            return;
        $("#saveData").show();
        $(".desktop-selector-dropdown-content").addClass("dis-none");
        $("#bi_asset_desk_protection_dropdown_selected").html(selectedElement.html());
        $("#bi_asset_desk_protection_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));
        getDirectoryView();
    }

    function getSelectorForAssetDesk() {
        let desktopSelector = backing.biview.workspaces.bi_cla_workspace.desktops.asset_desktop.selector;
        return assetUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_desktop;
        assetUtil.refresh(activeDesktop);
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("asset_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForAssetDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("asset_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }


    //added by Manish for drag and drop
    function saveDragAndDrop(){
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(true);
        let genericElement={children};
        service.saveAssetModeDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            // refreshFullDesktop();
            const event = {"key": backing.event_type.deleted_asset_element.key};
            propagateEvent(event);
            hideDragAndDropSaveBtn(true);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    AssetDesk.groupSelectorClick = groupSelectorClick;
    AssetDesk.getProtectionClick = getProtectionClick;
    AssetDesk.getElementGroups = getElementGroups;
    AssetDesk.getDirectoryView = getDirectoryView;
    AssetDesk.searchObjectElementClick = searchObjectElementClick;
    AssetDesk.fullRefresh = refreshFullDesktop;
    AssetDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    AssetDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    AssetDesk.saveDragAndDrop = saveDragAndDrop;
    return AssetDesk;
}

function BusinessAssetDesktopUtils() {
    let AssetDesk = new Object();

    function getElementGroups() {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_desktop;
        assetUtil.getGroups(activeDesktop, "singleview", "groupSelectorBusinessAsset", true);
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_desktop;
        assetUtil.getDirectory(activeDesktop, "singleview", callback, "businessAssetSearchObject_ElementTypeItem", true);
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_desktop;
        assetUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "businessAssetCustomSearchObject_ElementTypeItem");
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_desktop;
        assetUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function getSelectorForAssetDesk() {
        let desktopSelector = backing.singleview.workspaces.business_workspace.desktops.business_asset_desktop.selector;
        return assetUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_desktop;
        assetUtil.refresh(activeDesktop);
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("business_asset_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForAssetDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("business_asset_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
        addDragAndDropCommon();
    }

     function saveDragAndDrop(){
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(false);
        let genericElement={children};
        service.saveBusinessAssetModeDragAndDrop(genericElement, function (res, err) {
          $("#saveData").hide();
          // refreshFullDesktop();
          const event = {"key": backing.event_type.deleted_asset_element.key};
          propagateEvent(event);
          hideDragAndDropSaveBtn();
          if(res.errorMessage){
              errorMsgHandler(res);
          }
        });
    }

    AssetDesk.getSelector = getSelectorForAssetDesk;
    AssetDesk.groupSelectorClick = groupSelectorClick;
    AssetDesk.getElementGroups = getElementGroups;
    AssetDesk.getDirectoryView = getDirectoryView;
    AssetDesk.searchObjectElementClick = searchObjectElementClick;
    AssetDesk.fullRefresh = refreshFullDesktop;
    AssetDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    AssetDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    AssetDesk.addDragAndDrop = addDragAndDrop;
    AssetDesk.saveDragAndDrop = saveDragAndDrop;
    return AssetDesk;
}

function BiViewBusinessAssetDesktopUtils() {
    let AssetDesk = new Object();

    function getElementGroups() {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_desktop;
        assetUtil.getGroups(activeDesktop, "biview", "bigroupSelectorBusinessAsset", true);
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_desktop;
        assetUtil.getDirectory(activeDesktop, "biview", callback, "biBusinessAssetSearchObject_ElementTypeItem", true);
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_desktop;
        assetUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biBusinessAssetCustomSearchObject_ElementTypeItem");
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_desktop;
        assetUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function getSelectorForAssetDesk() {
        let desktopSelector = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_desktop.selector;
        return assetUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_desktop;
        assetUtil.refresh(activeDesktop);
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("business_asset_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForAssetDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("business_asset_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
        addDragAndDropCommon(true);
    }

     function saveDragAndDrop(){
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(true);
        let genericElement={children};
        service.saveBusinessAssetModeDragAndDrop(genericElement, function (res, err) {
        $("#saveData").hide();
        // refreshFullDesktop();
        const event = {"key": backing.event_type.deleted_asset_element.key};
        propagateEvent(event);
        hideDragAndDropSaveBtn(true);
        if(res.errorMessage){
           errorMsgHandler(res);
        }
        });
    }

    AssetDesk.groupSelectorClick = groupSelectorClick;
    AssetDesk.getElementGroups = getElementGroups;
    AssetDesk.getDirectoryView = getDirectoryView;
    AssetDesk.searchObjectElementClick = searchObjectElementClick;
    AssetDesk.fullRefresh = refreshFullDesktop;
    AssetDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    AssetDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    AssetDesk.addDragAndDrop = addDragAndDrop;
    AssetDesk.saveDragAndDrop = saveDragAndDrop;
    return AssetDesk;
}