$(document).ready(function () {
    $(document).on("click", ".levelSelectorAssetTypeItem", function (e) {
        let AssetTypeDesktopUtil = new AssetTypeDesktopUtils();
        AssetTypeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".groupSelectorAssetTypeItem", function (e) {
        let AssetTypeDesktopUtil = new AssetTypeDesktopUtils();
        AssetTypeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", "#assetType", function (e) {
        let AssetTypeDesktopUtil = new AssetTypeDesktopUtils();
        AssetTypeDesktopUtil.assetClick();
        e.stopPropagation();
    });

    $(document).on("click", ".assetTypeSearchObject_ElementTypeItem", function (e) {
        let AssetTypeDesktopUtil = new AssetTypeDesktopUtils();
        let dropDownId = "single_asset_type_desk_search_dropdown_content";
        let selectedId = "single_asset_type_desk_search_dropdown_selected";
        AssetTypeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".assetTypeCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_asset_type_desk_custom_search_dropdown_content";
        let selectedId = "single_asset_type_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
    /*bi assetType selector*/
    $(document).on("click", ".bilevelSelectorAssetTypeItem", function (e) {
        let AssetTypeDesktopUtil = new BiViewAssetTypeDesktopUtils();
        AssetTypeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".bigroupSelectorAssetTypeItem", function (e) {
        let AssetTypeDesktopUtil = new BiViewAssetTypeDesktopUtils();
        AssetTypeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", "#biAssetType", function (e) {
        let AssetTypeDesktopUtil = new BiViewAssetTypeDesktopUtils();
        AssetTypeDesktopUtil.assetClick();
        e.stopPropagation();
    });

    $(document).on("click", ".biAssetTypeSearchObject_ElementTypeItem", function (e) {
        let AssetTypeDesktopUtil = new BiViewAssetTypeDesktopUtils();
        let dropDownId = "bi_asset_type_desk_search_dropdown_content";
        let selectedId = "bi_asset_type_desk_search_dropdown_selected";
        AssetTypeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biAssetTypeCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_asset_type_desk_custom_search_dropdown_content";
        let selectedId = "bi_asset_type_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
    /* bi asset Type selector*/

    $(document).on("click", ".levelSelectorBusinessAssetTypeItem", function (e) {
        let AssetTypeDesktopUtil = new BusinessAssetTypeDesktopUtils();
        AssetTypeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".groupSelectorBusinessAssetTypeItem", function (e) {
        let AssetTypeDesktopUtil = new BusinessAssetTypeDesktopUtils();
        AssetTypeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", "#businessAssetType", function (e) {
        let AssetTypeDesktopUtil = new BusinessAssetTypeDesktopUtils();
        AssetTypeDesktopUtil.assetClick();
        e.stopPropagation();
    });

    $(document).on("click", ".businessAssetTypeSearchObject_ElementTypeItem", function (e) {
        let AssetTypeDesktopUtil = new BusinessAssetTypeDesktopUtils();
        let dropDownId = "single_business_asset_type_desk_search_dropdown_content";
        let selectedId = "single_business_asset_type_desk_search_dropdown_selected";
        AssetTypeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".businessAssetTypeCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_business_asset_type_desk_custom_search_dropdown_content";
        let selectedId = "single_business_asset_type_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
    /*bi assetType selector*/
    $(document).on("click", ".bilevelSelectorBusinessAssetTypeItem", function (e) {
        let AssetTypeDesktopUtil = new BiViewBusinessAssetTypeDesktopUtils();
        AssetTypeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".bigroupSelectorBusinessAssetTypeItem", function (e) {
        let AssetTypeDesktopUtil = new BiViewBusinessAssetTypeDesktopUtils();
        AssetTypeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", "#biBusinessAssetType", function (e) {
        let AssetTypeDesktopUtil = new BiViewBusinessAssetTypeDesktopUtils();
        AssetTypeDesktopUtil.assetClick();
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessAssetTypeSearchObject_ElementTypeItem", function (e) {
        let AssetTypeDesktopUtil = new BiViewBusinessAssetTypeDesktopUtils();
        let dropDownId = "bi_business_asset_type_desk_search_dropdown_content";
        let selectedId = "bi_business_asset_type_desk_search_dropdown_selected";
        AssetTypeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessAssetTypeCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_business_asset_type_desk_custom_search_dropdown_content";
        let selectedId = "bi_business_asset_type_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
    /* bi asset Type selector*/
});

const assetTypeUtil = new assetTypeUtils;

function assetTypeUtils() {
    function getLevels(activeDesktop, view, classParam, isBusiness) {
        let dropDownId = activeDesktop.selector.level_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;

        let callback = function (res) {
            let idOfParentDiv = dropDownId,
                viewName = "groupView",
                isRoot = false;
            let data = {idOfParentDiv, view, viewName, isRoot};
            renderSelectorDropDown(activeDesktop, res, "levelSelector", classParam, data);
            levelSelector(previousSelector, dropDownId, activeDesktop.utilsFunction.levelSelectorClick);
        };
        (isBusiness) ? serviceFunctions.getBusinessAssetTypeAllowedLevels(callback) : serviceFunctions.getAssetTypeAllowedLevels(callback);
    }

    function getGroups(data, activeDesktop, view, classParam, isBusiness) {
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
        (isBusiness) ? serviceFunctions.getBusinessAssetTypeGroupsByMaxLevel(data, callback) : serviceFunctions.getAssetTypeGroupsByMaxLevel(data, callback);
    }

    function getDirectory(activeDesktop, view, callback, classOfObjectTypeElementType, assetSelectionId, isBusiness) {
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
        data.level = parseInt($(`#${activeDesktop.selector.level_dropdown_selected_id}`).attr("elementId"));
        data.assetTypeGroupId = parseInt($(`#${activeDesktop.selector.groups_dropdown_selected_id}`).attr("elementId"));
        data.protectionType = "shall";
        if ($("#" + assetSelectionId).is(':checked'))
            data.showAsset = true;
        else
            data.showAsset = false;
        data.showExpression = false;
        $("#saveData").show();
        renderFunction = (isBusiness) ? service.getBusinessAssetTypeDv : service.getAssetTypeDv;
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
        let $protectionSelectedId = $("#" + desktopSelector.protection_dropdown_selected_id);
        selectorObj.level = $("#" + desktopSelector.level_dropdown_selected_id).attr("elementId");
        selectorObj.assetTypeGroupId = $("#" + desktopSelector.groups_dropdown_selected_id).attr("elementId");
        selectorObj.protectionType = "shall";
        selectorObj.protectionTypeHtml = $protectionSelectedId.html();
        selectorObj.showExpression = true;
        if ($("#" + desktopSelector.asset_checkbox_id).find(".assetCheckbox").is(":checked")) {
            selectorObj.showAsset = true;
        }
        else {
            selectorObj.showAsset = false;
        }

        return selectorObj;
    }

    function levelClick(activeDesktop, selectedElement) {
        let $dropDown = $(".desktop-selector-dropdown-content");
        if (!selectedElement) {
            $dropDown.addClass("dis-none");
            return;
        }
        let $shieldSelected = $(`#${activeDesktop.selector.shield_dropdown_selected_id}`);
        let $levelSelected = $(`#${activeDesktop.selector.level_dropdown_selected_id}`);

        let shieldId = $shieldSelected.attr("elementId"),
            level = selectedElement.attr("elementId");
        let data = {shieldId, level};
        $("#saveData").show();
        activeDesktop.utilsFunction.getElementGroups(data);
        $dropDown.addClass("dis-none");
        if (selectedElement.attr("elementId") !== "0") {
            $levelSelected.html(selectedElement.html());
            $levelSelected.parent().find(".levelIcon").removeClass("opacityDull");
        }
        else {
            $levelSelected.parent().find(".levelIcon").addClass("opacityDull");
            $levelSelected.html("");
        }
        $levelSelected.attr("elementId", selectedElement.attr("elementId"));
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

    function refresh(activeDesktop, view) {
        let previousSelection = {};
        let groupSelectorId = activeDesktop.selector.groups_dropdown_selected_id;
        let protectionTypeSelector = activeDesktop.selector.protection_dropdown_selected_id;
        previousSelection.groupSelectorId = $("#" + groupSelectorId).attr("elementId");
        previousSelection.protectionTypeSelector = {};
        previousSelection.protectionTypeSelector.elementId = $("#" + protectionTypeSelector).attr("elementId");
        previousSelection.protectionTypeSelector.htmlElement = $("#" + protectionTypeSelector).html();
        activeDesktop.previousSelectors = previousSelection;
        activeDesktop.utilsFunction.getAssetTypeAllowedLevels();
    }

    return {getLevels, getGroups, getDirectory, searchClick, getSelector, groupClick, levelClick, refresh};
}

function AssetTypeDesktopUtils() {
    let assetTypDesk = new Object();

    function getAssetTypeAllowedLevels() {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_desktop;
        assetTypeUtil.getLevels(activeDesktop, "singleview", "levelSelectorAssetType");
    }

    function getElementGroups(data) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_desktop;
        assetTypeUtil.getGroups(data, activeDesktop, "singleview", "groupSelectorAssetType");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_desktop;
        assetTypeUtil.getDirectory(activeDesktop, "singleview", callback, "assetTypeSearchObject_ElementTypeItem", "assetType");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_desktop;
        assetTypeUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "assetTypeCustomSearchObject_ElementTypeItem");
    }

    function levelSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_desktop;
        assetTypeUtil.levelClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_desktop;
        assetTypeUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function assetClick() {
        $("#saveData").show();
        getDirectoryView();
    }

    function getSelectorForAssetTypeDesk() {
        let desktopSelector = backing.singleview.workspaces.cla_workspace.desktops.asset_type_desktop.selector;
        return assetTypeUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_desktop;
        assetTypeUtil.refresh(activeDesktop, "singleview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("asset_type_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForAssetTypeDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("asset_type_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    //added by Manish for drag and drop
    function saveDragAndDrop(){
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(false);
        let genericElement={children};
        service.saveAssetTypeDragAndDrop(genericElement, function (res, err) {
            // refreshFullDesktop();
            const event = {"key": backing.event_type.deleted_asset_type_element.key};
            propagateEvent(event);
            hideDragAndDropSaveBtn();
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    assetTypDesk.getSelector = getSelectorForAssetTypeDesk;
    assetTypDesk.levelSelectorClick = levelSelectorClick;
    assetTypDesk.getElementGroups = getElementGroups;
    assetTypDesk.assetClick = assetClick;
    assetTypDesk.groupSelectorClick = groupSelectorClick;
    assetTypDesk.getAssetTypeAllowedLevels = getAssetTypeAllowedLevels;
    assetTypDesk.getDirectoryView = getDirectoryView;
    assetTypDesk.searchObjectElementClick = searchObjectElementClick;
    assetTypDesk.fullRefresh = refreshFullDesktop;
    assetTypDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    assetTypDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    assetTypDesk.saveDragAndDrop = saveDragAndDrop;
    return assetTypDesk;
}

function BiViewAssetTypeDesktopUtils() {
    let assetTypDesk = new Object();

    function getAssetTypeAllowedLevels() {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_desktop;
        assetTypeUtil.getLevels(activeDesktop, "biview", "bilevelSelectorAssetType");
    }

    function getElementGroups(data) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_desktop;
        assetTypeUtil.getGroups(data, activeDesktop, "biview", "bigroupSelectorAssetType");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_desktop;
        assetTypeUtil.getDirectory(activeDesktop, "biview", callback, "biAssetTypeSearchObject_ElementTypeItem", "biAssetType");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_desktop;
        assetTypeUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biAssetTypeCustomSearchObject_ElementTypeItem");
    }

    function levelSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_desktop;
        assetTypeUtil.levelClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_desktop;
        assetTypeUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function assetClick() {
        $("#saveData").show();
        getDirectoryView();
    }

    function getSelectorForAssetTypeDesk() {
        let desktopSelector = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_desktop.selector;
        return assetTypeUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_desktop;
        assetTypeUtil.refresh(activeDesktop, "biview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("asset_type_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForAssetTypeDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("asset_type_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }


    //added by Manish for drag and drop
    function saveDragAndDrop(){
        let isBiView = true;
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiView);
        let genericElement={children};
        service.saveAssetTypeDragAndDrop(genericElement, function (res, err) {
            //refreshFullDesktop();
            const event = {"key": backing.event_type.deleted_asset_type_element.key};
            propagateEvent(event);
            hideDragAndDropSaveBtn(isBiView);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    assetTypDesk.levelSelectorClick = levelSelectorClick;
    assetTypDesk.assetClick = assetClick;
    assetTypDesk.groupSelectorClick = groupSelectorClick;
    assetTypDesk.getAssetTypeAllowedLevels = getAssetTypeAllowedLevels;
    assetTypDesk.getElementGroups = getElementGroups;
    assetTypDesk.getDirectoryView = getDirectoryView;
    assetTypDesk.searchObjectElementClick = searchObjectElementClick;
    assetTypDesk.fullRefresh = refreshFullDesktop;
    assetTypDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    assetTypDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    assetTypDesk.saveDragAndDrop = saveDragAndDrop;
    return assetTypDesk;
}

function BusinessAssetTypeDesktopUtils() {
    let assetTypDesk = new Object();

    function getAssetTypeAllowedLevels() {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_desktop;
        assetTypeUtil.getLevels(activeDesktop, "singleview", "levelSelectorBusinessAssetType", true);
    }

    function getElementGroups(data) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_desktop;
        assetTypeUtil.getGroups(data, activeDesktop, "singleview", "groupSelectorBusinessAssetType", true);
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_desktop;
        assetTypeUtil.getDirectory(activeDesktop, "singleview", callback, "businessAssetTypeSearchObject_ElementTypeItem", "businessAssetType", true);
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_desktop;
        assetTypeUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "businessAssetTypeCustomSearchObject_ElementTypeItem");
    }

    function levelSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_desktop;
        assetTypeUtil.levelClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_desktop;
        assetTypeUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function assetClick() {
        $("#saveData").show();
        getDirectoryView();
    }

    function getSelectorForAssetTypeDesk() {
        let desktopSelector = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_desktop.selector;
        return assetTypeUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_desktop;
        assetTypeUtil.refresh(activeDesktop, "singleview", true);
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("business_asset_type_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForAssetTypeDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("business_asset_type_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
        addDragAndDropCommon();
    }

    /// added by Manish for drag and drop
     function saveDragAndDrop(){
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(false);
        let genericElement={children};

        service.saveBusinessAssetTypeDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            //refreshFullDesktop();
            const event = {"key": backing.event_type.deleted_asset_type_element.key};
            propagateEvent(event);
            hideDragAndDropSaveBtn();
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    assetTypDesk.getSelector = getSelectorForAssetTypeDesk;
    assetTypDesk.levelSelectorClick = levelSelectorClick;
    assetTypDesk.getElementGroups = getElementGroups;
    assetTypDesk.assetClick = assetClick;
    assetTypDesk.groupSelectorClick = groupSelectorClick;
    assetTypDesk.getAssetTypeAllowedLevels = getAssetTypeAllowedLevels;
    assetTypDesk.getDirectoryView = getDirectoryView;
    assetTypDesk.searchObjectElementClick = searchObjectElementClick;
    assetTypDesk.fullRefresh = refreshFullDesktop;
    assetTypDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    assetTypDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    assetTypDesk.saveDragAndDrop = saveDragAndDrop;
    assetTypDesk.addDragAndDrop = addDragAndDrop;
    return assetTypDesk;
}

function BiViewBusinessAssetTypeDesktopUtils() {
    let assetTypDesk = new Object();

    function getAssetTypeAllowedLevels() {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_desktop;
        assetTypeUtil.getLevels(activeDesktop, "biview", "bilevelSelectorBusinessAssetType", true);
    }

    function getElementGroups(data) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_desktop;
        assetTypeUtil.getGroups(data, activeDesktop, "biview", "bigroupSelectorBusinessAssetType", true);
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_desktop;
        assetTypeUtil.getDirectory(activeDesktop, "biview", callback, "biBusinessAssetTypeSearchObject_ElementTypeItem", "biBusinessAssetType", true);
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_desktop;
        assetTypeUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biBusinessAssetTypeCustomSearchObject_ElementTypeItem");
    }

    function levelSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_desktop;
        assetTypeUtil.levelClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_desktop;
        assetTypeUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function assetClick() {
        $("#saveData").show();
        getDirectoryView();
    }

    function getSelectorForAssetTypeDesk() {
        let desktopSelector = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_desktop.selector;
        return assetTypeUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_desktop;
        assetTypeUtil.refresh(activeDesktop, "biview", true);
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("business_asset_type_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForAssetTypeDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("business_asset_type_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
        addDragAndDropCommon(true);
    }

    /// added by Manish for drag and drop
     function saveDragAndDrop(){
        let isBiView = true; 
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiView);
        let genericElement={children};

        service.saveBusinessAssetTypeDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            // refreshFullDesktop();
            const event = {"key": backing.event_type.deleted_asset_type_element.key};
            propagateEvent(event);
            hideDragAndDropSaveBtn(isBiView);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    assetTypDesk.levelSelectorClick = levelSelectorClick;
    assetTypDesk.assetClick = assetClick;
    assetTypDesk.groupSelectorClick = groupSelectorClick;
    assetTypDesk.getAssetTypeAllowedLevels = getAssetTypeAllowedLevels;
    assetTypDesk.getElementGroups = getElementGroups;
    assetTypDesk.getDirectoryView = getDirectoryView;
    assetTypDesk.searchObjectElementClick = searchObjectElementClick;
    assetTypDesk.fullRefresh = refreshFullDesktop;
    assetTypDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    assetTypDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    assetTypDesk.saveDragAndDrop = saveDragAndDrop;
    assetTypDesk.addDragAndDrop = addDragAndDrop;
    return assetTypDesk;
}