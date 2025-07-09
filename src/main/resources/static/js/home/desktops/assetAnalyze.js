$(document).ready(function () {
    $(document).on("click", ".anzgroupSelectorAssetItem", function (e) {
        let AssetMapModeDesktopUtil = new AssetMapModeDesktopUtils();
        AssetMapModeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".assetStartingPointList", function (e) {
        lufShieldId = $(this).attr("shieldid");
        let AssetMapModeDesktopUtil = new AssetMapModeDesktopUtils();
        if ($("#closeAssociationViewasset_map_mode_desk").length > 0)
            $("#closeAssociationViewasset_map_mode_desk").trigger("click");
        AssetMapModeDesktopUtil.expressionSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".assetAnzSearchObject_ElementTypeItem", function (e) {
        let AssetMapModeDesktopUtil = new AssetMapModeDesktopUtils();
        let dropDownId = "single_asset_map_mode_desk_search_dropdown_content";
        let selectedId = "single_asset_map_mode_desk_search_dropdown_selected";
        AssetMapModeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".assetAnzCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_asset_map_mode_desk_custom_search_dropdown_content";
        let selectedId = "single_asset_map_mode_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#showAssetDirectLinks", function (e) {
        let AssetMapModeDesktopUtil = new AssetMapModeDesktopUtils();
        AssetMapModeDesktopUtil.showDirectLinks();
        e.stopPropagation();
    });

    /*bi Anz asset selector*/
    $(document).on("click", ".biAnzgroupSelectorAssetItem", function (e) {
        let AssetMapModeDesktopUtil = new BiViewAssetMapModeDesktopUtils();
        AssetMapModeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biAssetStartingPointList", function (e) {
        lufShieldId = $(this).attr("shieldid");
        let AssetMapModeDesktopUtil = new BiViewAssetMapModeDesktopUtils();
        if ($("#closeAssociationViewbi_asset_map_mode_desk").length > 0)
            $("#closeAssociationViewbi_asset_map_mode_desk").trigger("click");
        AssetMapModeDesktopUtil.expressionSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biAssetAnzSearchObject_ElementTypeItem", function (e) {
        let AssetMapModeDesktopUtil = new BiViewAssetMapModeDesktopUtils();
        let dropDownId = "bi_asset_map_mode_desk_search_dropdown_content";
        let selectedId = "bi_asset_map_mode_desk_search_dropdown_selected";
        AssetMapModeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biAssetAnzCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_asset_map_mode_desk_custom_search_dropdown_content";
        let selectedId = "bi_asset_map_mode_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#showBiAssetDirectLinks", function (e) {
        let AssetMapModeDesktopUtil = new BiViewAssetMapModeDesktopUtils();
        AssetMapModeDesktopUtil.showDirectLinks();
        e.stopPropagation();
    });
    /*bi Anz asset selector */

    $(document).on("click", ".anzgroupSelectorBusinessAssetItem", function (e) {
        let AssetMapModeDesktopUtil = new BusinessAssetMapModeDesktopUtils();
        AssetMapModeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".businessAssetStartingPointList", function (e) {
        busAssetLufId = $(this).attr("shieldid");
        let AssetMapModeDesktopUtil = new BusinessAssetMapModeDesktopUtils();
        if ($("#closeAssociationViewbusiness_asset_map_mode_desk").length > 0)
            $("#closeAssociationViewbusiness_asset_map_mode_desk").trigger("click");
        AssetMapModeDesktopUtil.expressionSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".businessAssetAnzSearchObject_ElementTypeItem", function (e) {
        let AssetMapModeDesktopUtil = new BusinessAssetMapModeDesktopUtils();
        let dropDownId = "single_business_asset_map_mode_desk_search_dropdown_content";
        let selectedId = "single_business_asset_map_mode_desk_search_dropdown_selected";
        AssetMapModeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".businessAssetAnzCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_business_asset_map_mode_desk_custom_search_dropdown_content";
        let selectedId = "single_business_asset_map_mode_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#showBusinessAssetDirectLinks", function (e) {
        let AssetMapModeDesktopUtil = new BusinessAssetMapModeDesktopUtils();
        AssetMapModeDesktopUtil.showDirectLinks();
        e.stopPropagation();
    });

    /*bi Anz asset selector*/
    $(document).on("click", ".biAnzgroupSelectorBusinessAssetItem", function (e) {
        let AssetMapModeDesktopUtil = new BiViewBusinessAssetMapModeDesktopUtils();
        AssetMapModeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessAssetStartingPointList", function (e) {
        busAssetLufId = $(this).attr("shieldid");
        let AssetMapModeDesktopUtil = new BiViewBusinessAssetMapModeDesktopUtils();
        if ($("#closeAssociationViewbi_business_asset_map_mode_desk").length > 0)
            $("#closeAssociationViewbi_business_asset_map_mode_desk").trigger("click");
        AssetMapModeDesktopUtil.expressionSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessAssetAnzSearchObject_ElementTypeItem", function (e) {
        let AssetMapModeDesktopUtil = new BiViewBusinessAssetMapModeDesktopUtils();
        let dropDownId = "bi_business_asset_map_mode_desk_search_dropdown_content";
        let selectedId = "bi_business_asset_map_mode_desk_search_dropdown_selected";
        AssetMapModeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessAssetAnzCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_business_asset_map_mode_desk_custom_search_dropdown_content";
        let selectedId = "bi_business_asset_map_mode_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#showBiBusinessAssetDirectLinks", function (e) {
        let AssetMapModeDesktopUtil = new BiViewBusinessAssetMapModeDesktopUtils();
        AssetMapModeDesktopUtil.showDirectLinks();
        e.stopPropagation();
    });
    /*bi Anz asset selector */
});

const assetAnalysisUtil = new assetAnalysisUtils;

function assetAnalysisUtils() {
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

    function getDirectory(activeDesktop, view, callback, classOfObjectTypeElementType, showDirectLinksId, isBusiness) {
        modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
        let data = {};
        let backingview;
        let isBiview = isBiViewOrNot(view);
        if (view === "singleview") {
            backingview = backing.singleview;
        }
        else if (view === "biview") {
            backingview = backing.biview;
        }
        let $expressionDropDownSelected = $(`#${activeDesktop.selector.expression_dropdown_selected_id}`);
        data.direct = backing.isDirectMode;
        data.dropDownOneProtectionType = $(`#${activeDesktop.selector.protection_dropdown_selected_id}`).attr("elementId");
        data.dropDownOneGroupId = parseInt($(`#${activeDesktop.selector.groups_dropdown_selected_id}`).attr("elementId"));
        data.dropDownTwoProtectionType = "shall";
        data.dropDownTwoShieldId = $expressionDropDownSelected.attr("shieldId");
        data.dropDownTwoStartingPoint = $expressionDropDownSelected.attr("startingPoint");
        if ($("#" + showDirectLinksId).is(':checked'))
            data.showDirectLinksInExpressionMode = true;
        else
            data.showDirectLinksInExpressionMode = false;
        $("#saveData").show();
        let renderFunction = (isBusiness) ? service.getBusinessAssetMapToOtherStartingPoint : service.getAssetMapToOtherStartingPoint;
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
        let $expressionSelectedId = $(`#${desktopSelector.expression_dropdown_selected_id}`);
        selectorObj.dropDownOneGroupId = $("#" + desktopSelector.groups_dropdown_selected_id).attr("elementId");
        selectorObj.dropDownOneProtectionType = $("#" + desktopSelector.protection_dropdown_selected_id).attr("elementId");
        selectorObj.dropDownTwoProtectionType = "shall";
        selectorObj.dropDownTwoShieldId = $expressionSelectedId.attr("shieldId");
        selectorObj.dropDownTwoStartingPoint = $expressionSelectedId.attr("startingPoint");
        selectorObj.dropDownTwoHtml = $expressionSelectedId.html();
        if ($("#" + desktopSelector.showDirectLinks_checkbox_id).find(".assetCheckbox").is(":checked")) {
            selectorObj.showDirectLinksInExpressionMode = true;
        }
        else {
            selectorObj.showDirectLinksInExpressionMode = false;
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

    function expressionClick(activeDesktop, selectedElement) {
        let $dropDown = $(".desktop-selector-dropdown-content");
        let $expressionDropDownSelected = $(`#${activeDesktop.selector.expression_dropdown_selected_id}`);
        if (!selectedElement) {
            $dropDown.addClass("dis-none");
            return;
        }
        $("#saveData").show();
        $dropDown.addClass("dis-none");
        let selectedHtml = selectedElement.html(),
            label = selectedElement.text(),
            staticLinkName = constants.linkNames["ASSET_TO_EXPRESSION"],
            startingPoint = selectedElement.attr("startingPoint"),
            protectionType = (selectedElement.attr("protectionType") === "dummy" ? undefined : selectedElement.attr("protectionType")),
            shieldId = selectedElement.attr("shieldId"),
            linkNameAttr = selectedElement.attr("linkName");

        if(shieldId===undefined){
            $dropDown.addClass("dis-none");
            $("#saveData").hide();
            return;
        }
        
        let objectType = selectedElement.attr("objectType");
        let selectedExpressionObj = {
            selectedHtml,
            label,
            startingPoint,
            protectionType,
            shieldId,
            objectType,
            linkNameAttr,
            staticLinkName
        };
        $expressionDropDownSelected.html(selectedExpressionObj.selectedHtml);
        $expressionDropDownSelected.find(".related-framework-action").remove();
        $expressionDropDownSelected.attr("title", selectedElement.attr("title"));
        $expressionDropDownSelected.attr("shieldId", selectedExpressionObj.shieldId);
        $expressionDropDownSelected.attr("protectionType", selectedExpressionObj.protectionType);
        $expressionDropDownSelected.attr("startingPoint", selectedExpressionObj.startingPoint);
        $expressionDropDownSelected.attr("objectType", selectedExpressionObj.objectType);
        activeDesktop.expressionSelectorSelected = selectedExpressionObj;
        activeDesktop.utilsFunction.getDirectoryView();
    }

    function refresh(activeDesktop, view) {
        let previousSelection = {};
        let groupSelectorId = activeDesktop.selector.groups_dropdown_selected_id;
        let $protectionTypeSelectorId = $("#" + activeDesktop.selector.protection_dropdown_selected_id);
        let $expressionSelectorId = $("#" + activeDesktop.selector.expression_dropdown_selected_id);

        previousSelection.groupSelectorId = $(`#${groupSelectorId}`).attr("elementId");
        getProtectionTypeSelector(previousSelection, $protectionTypeSelectorId, view);
        getExpressionSelection(previousSelection, $expressionSelectorId, view);
        activeDesktop.previousSelectors = previousSelection;
        activeDesktop.utilsFunction.getShieldStartingPoints();
    }

    return {getGroups, getDirectory, searchClick, getSelector, groupClick, refresh, expressionClick};
}

function AssetMapModeDesktopUtils() {
    let assetAnzDesk = new Object();

    function getShieldStartingPoints() {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_map_mode_desktop;
        let callback = function (res) {
            renderExpressionSelector(res, activeDesktop, "assetStartingPointList", false);
            // activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ASSET_TO_EXPRESSION"];
            selectExpressionSelector(activeDesktop, false, () => {
                getElementGroups();
                if(lufShieldId){
                    activeDesktop.utilsFunction.shieldSelectorClick($("#" + activeDesktop.selector.expression_dropdown_id).find("li[shieldid = " + lufShieldId + "]"));
                }
            });
        };
        serviceFunctions.getDropdownTwoOptionsForAssetStartingPoint(callback);
    }

    function getElementGroups() {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_map_mode_desktop;
        assetAnalysisUtil.getGroups(activeDesktop, "singleview", "anzgroupSelectorAsset");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_map_mode_desktop;
        assetAnalysisUtil.getDirectory(activeDesktop, "singleview", callback, "assetAnzSearchObject_ElementTypeItem", "showAssetDirectLinks");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_map_mode_desktop;
        assetAnalysisUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "assetAnzCustomSearchObject_ElementTypeItem");
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_map_mode_desktop;
        assetAnalysisUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function showDirectLinks() {
        $("#saveData").show();
        getDirectoryView();
    }

    function expressionSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_map_mode_desktop;
        assetAnalysisUtil.expressionClick(activeDesktop, selectedElement);
    }

    function getSelectorForAssetMapDesk() {
        let desktopSelector = backing.singleview.workspaces.cla_workspace.desktops.asset_map_mode_desktop.selector;
        return assetAnalysisUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_map_mode_desktop;
        assetAnalysisUtil.refresh(activeDesktop, "singleview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("asset_map_mode_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForAssetMapDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("asset_map_mode_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    function saveDragAndDrop(){
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(false);
        let genericElement={children};
        service.saveAssetAnalyzeModeDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            refreshFullDesktop();
            hideDragAndDropSaveBtn();
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    assetAnzDesk.getSelector = getSelectorForAssetMapDesk;
    assetAnzDesk.groupSelectorClick = groupSelectorClick;
    assetAnzDesk.expressionSelectorClick = expressionSelectorClick;
    assetAnzDesk.getShieldStartingPoints = getShieldStartingPoints;
    assetAnzDesk.getElementGroups = getElementGroups;
    assetAnzDesk.getDirectoryView = getDirectoryView;
    assetAnzDesk.showDirectLinks = showDirectLinks;
    assetAnzDesk.searchObjectElementClick = searchObjectElementClick;
    assetAnzDesk.fullRefresh = refreshFullDesktop;
    assetAnzDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    assetAnzDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    assetAnzDesk.shieldSelectorClick=expressionSelectorClick;
    assetAnzDesk.saveDragAndDrop = saveDragAndDrop;
    assetAnzDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    return assetAnzDesk;
}

function BiViewAssetMapModeDesktopUtils() {
    let assetAnzDesk = new Object();

    function getShieldStartingPoints() {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_map_mode_desktop;
        let callback = function (res) {
            renderExpressionSelector(res, activeDesktop, "biAssetStartingPointList", true);
            // activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ASSET_TO_EXPRESSION"];
            selectExpressionSelector(activeDesktop, true, () => {
                getElementGroups();
                if(lufShieldId){
                    activeDesktop.utilsFunction.shieldSelectorClick($("#" + activeDesktop.selector.expression_dropdown_id).find("li[shieldid = " + lufShieldId + "]"));
                }
            });
        };
        serviceFunctions.getDropdownTwoOptionsForAssetStartingPoint(callback);
    }

    function getElementGroups() {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_map_mode_desktop;
        assetAnalysisUtil.getGroups(activeDesktop, "biview", "bianzgroupSelectorAsset");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_map_mode_desktop;
        assetAnalysisUtil.getDirectory(activeDesktop, "biview", callback, "biAssetAnzSearchObject_ElementTypeItem", "showBiAssetDirectLinks");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_map_mode_desktop;
        assetAnalysisUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biAssetAnzCustomSearchObject_ElementTypeItem");
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_map_mode_desktop;
        assetAnalysisUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function expressionSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_map_mode_desktop;
        assetAnalysisUtil.expressionClick(activeDesktop, selectedElement);
    }

    function getSelectorForAssetMapDesk() {
        let desktopSelector = backing.biview.workspaces.bi_cla_workspace.desktops.asset_map_mode_desktop.selector;
        return assetAnalysisUtil.getSelector(desktopSelector);
    }

    function showDirectLinks() {
        $("#saveData").show();
        getDirectoryView();
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_map_mode_desktop;
        assetAnalysisUtil.refresh(activeDesktop, "biview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("asset_map_mode_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForAssetMapDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("asset_map_mode_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }


    function saveDragAndDrop(){
        let isBiView = true;
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiView);
        let genericElement={children};
        service.saveAssetAnalyzeModeDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            refreshFullDesktop();
            hideDragAndDropSaveBtn(isBiView);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    assetAnzDesk.groupSelectorClick = groupSelectorClick;
    assetAnzDesk.expressionSelectorClick = expressionSelectorClick;
    assetAnzDesk.getShieldStartingPoints = getShieldStartingPoints;
    assetAnzDesk.getElementGroups = getElementGroups;
    assetAnzDesk.getDirectoryView = getDirectoryView;
    assetAnzDesk.showDirectLinks = showDirectLinks;
    assetAnzDesk.searchObjectElementClick = searchObjectElementClick;
    assetAnzDesk.fullRefresh = refreshFullDesktop;
    assetAnzDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    assetAnzDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    assetAnzDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    assetAnzDesk.shieldSelectorClick=expressionSelectorClick;
    assetAnzDesk.saveDragAndDrop = saveDragAndDrop;
    return assetAnzDesk;
}

function BusinessAssetMapModeDesktopUtils() {
    let assetAnzDesk = new Object();

    function getShieldStartingPoints() {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_map_mode_desktop;
        let callback = function (res) {
            renderExpressionSelector(res, activeDesktop, "businessAssetStartingPointList", false);
            // activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ASSET_TO_EXPRESSION"];
            selectExpressionSelector(activeDesktop, false, () => {
                getElementGroups();
                if(busAssetLufId){
                    activeDesktop.utilsFunction.shieldSelectorClick($("#" + activeDesktop.selector.expression_dropdown_id).find("li[shieldid = " + busAssetLufId + "]"));
                }
            });
        };
        serviceFunctions.getDropdownTwoOptionsForBusinessAssetStartingPoint(callback);
    }

    function getElementGroups() {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_map_mode_desktop;
        assetAnalysisUtil.getGroups(activeDesktop, "singleview", "anzgroupSelectorBusinessAsset", true);
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_map_mode_desktop;
        assetAnalysisUtil.getDirectory(activeDesktop, "singleview", callback, "businessAssetAnzSearchObject_ElementTypeItem", "showBusinessAssetDirectLinks", true);
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_map_mode_desktop;
        assetAnalysisUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "businessAssetAnzCustomSearchObject_ElementTypeItem");
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_map_mode_desktop;
        assetAnalysisUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function showDirectLinks() {
        $("#saveData").show();
        getDirectoryView();
    }

    function expressionSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_map_mode_desktop;
        assetAnalysisUtil.expressionClick(activeDesktop, selectedElement);
    }

    function getSelectorForAssetMapDesk() {
        let desktopSelector = backing.singleview.workspaces.business_workspace.desktops.business_asset_map_mode_desktop.selector;
        return assetAnalysisUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_map_mode_desktop;
        assetAnalysisUtil.refresh(activeDesktop, "singleview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("business_asset_map_mode_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForAssetMapDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("business_asset_map_mode_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
        //addDragAndDropCommon();
    }

     function saveDragAndDrop(){
        let isBiView = false; 
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiView);
        let genericElement={children};

        service.saveBusinessAssetMapModeDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            getShieldStartingPoints();
            hideDragAndDropSaveBtn(isBiView);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    assetAnzDesk.getSelector = getSelectorForAssetMapDesk;
    assetAnzDesk.groupSelectorClick = groupSelectorClick;
    assetAnzDesk.expressionSelectorClick = expressionSelectorClick;
    assetAnzDesk.getShieldStartingPoints = getShieldStartingPoints;
    assetAnzDesk.getElementGroups = getElementGroups;
    assetAnzDesk.getDirectoryView = getDirectoryView;
    assetAnzDesk.showDirectLinks = showDirectLinks;
    assetAnzDesk.searchObjectElementClick = searchObjectElementClick;
    assetAnzDesk.fullRefresh = refreshFullDesktop;
    assetAnzDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    assetAnzDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    assetAnzDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    assetAnzDesk.shieldSelectorClick=expressionSelectorClick;
    assetAnzDesk.addDragAndDrop = addDragAndDrop;
    assetAnzDesk.saveDragAndDrop = saveDragAndDrop;
    return assetAnzDesk;
}

function BiViewBusinessAssetMapModeDesktopUtils() {
    let assetAnzDesk = new Object();

    function getShieldStartingPoints() {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_map_mode_desktop;
        let callback = function (res) {
            renderExpressionSelector(res, activeDesktop, "biBusinessAssetStartingPointList", true);
            // activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ASSET_TO_EXPRESSION"];
            selectExpressionSelector(activeDesktop, true, () => {
                getElementGroups();
                if(busAssetLufId){
                    activeDesktop.utilsFunction.shieldSelectorClick($("#" + activeDesktop.selector.expression_dropdown_id).find("li[shieldid = " + busAssetLufId + "]"));
                }
            });
        };
        serviceFunctions.getDropdownTwoOptionsForBusinessAssetStartingPoint(callback);
    }

    function getElementGroups() {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_map_mode_desktop;
        assetAnalysisUtil.getGroups(activeDesktop, "biview", "biAnzGroupSelectorBusinessAsset", true);
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_map_mode_desktop;
        assetAnalysisUtil.getDirectory(activeDesktop, "biview", callback, "biBusinessAssetAnzSearchObject_ElementTypeItem", "showBiBusinessAssetDirectLinks", true);
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_map_mode_desktop;
        assetAnalysisUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biBusinessAssetAnzCustomSearchObject_ElementTypeItem");
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_map_mode_desktop;
        assetAnalysisUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function expressionSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_map_mode_desktop;
        assetAnalysisUtil.expressionClick(activeDesktop, selectedElement);
    }

    function getSelectorForAssetMapDesk() {
        let desktopSelector = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_map_mode_desktop.selector;
        return assetAnalysisUtil.getSelector(desktopSelector);
    }

    function showDirectLinks() {
        $("#saveData").show();
        getDirectoryView();
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_map_mode_desktop;
        assetAnalysisUtil.refresh(activeDesktop, "biview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("business_asset_map_mode_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForAssetMapDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("business_asset_map_mode_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
        //addDragAndDropCommon(true);
    }

     function saveDragAndDrop(){
        let isBiView = true; 
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiView);
        let genericElement={children};

        service.saveBusinessAssetMapModeDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            getShieldStartingPoints();
            hideDragAndDropSaveBtn(isBiView);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    assetAnzDesk.groupSelectorClick = groupSelectorClick;
    assetAnzDesk.expressionSelectorClick = expressionSelectorClick;
    assetAnzDesk.getShieldStartingPoints = getShieldStartingPoints;
    assetAnzDesk.getElementGroups = getElementGroups;
    assetAnzDesk.getDirectoryView = getDirectoryView;
    assetAnzDesk.showDirectLinks = showDirectLinks;
    assetAnzDesk.searchObjectElementClick = searchObjectElementClick;
    assetAnzDesk.fullRefresh = refreshFullDesktop;
    assetAnzDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    assetAnzDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    assetAnzDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    assetAnzDesk.shieldSelectorClick = expressionSelectorClick;
    assetAnzDesk.addDragAndDrop = addDragAndDrop;
    assetAnzDesk.saveDragAndDrop = saveDragAndDrop;
    return assetAnzDesk;
}
