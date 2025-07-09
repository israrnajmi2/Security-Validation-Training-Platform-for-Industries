let busAssetLufId;

$(document).ready(function () {
    $(document).on("click", ".levelSelectorAssetTypeMapModeItem", function (e) {
        let AssetTypeDesktopUtil = new AssetTypeMapModeDesktopUtils();
        AssetTypeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".groupSelectorAssetTypeMapModeItem", function (e) {
        let AssetTypeDesktopUtil = new AssetTypeMapModeDesktopUtils();
        AssetTypeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".assetTypeStartingPointList", function (e) {
        lufShieldId = $(this).attr("shieldid");
        let AssetTypeDesktopUtil = new AssetTypeMapModeDesktopUtils();
        if ($("#closeAssociationViewasset_type_map_mode_desk").length > 0)
            $("#closeAssociationViewasset_type_map_mode_desk").trigger("click");
        AssetTypeDesktopUtil.expressionClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".assetTypeAnzSearchObject_ElementTypeItem", function (e) {
        let AssetTypeDesktopUtil = new AssetTypeMapModeDesktopUtils();
        let dropDownId = "single_asset_type_map_mode_desk_search_dropdown_content";
        let selectedId = "single_asset_type_map_mode_desk_search_dropdown_selected";
        AssetTypeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".assetTypeAnzCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_asset_type_map_mode_desk_custom_search_dropdown_content";
        let selectedId = "single_asset_type_map_mode_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#showAssetTypeDirectLinks", function (e) {
        let AssetTypeDesktopUtil = new AssetTypeMapModeDesktopUtils();
        AssetTypeDesktopUtil.showDirectLinks();
        e.stopPropagation();
    });
    /*bi assetTypeMapMode selector*/
    $(document).on("click", ".bilevelSelectorAssetTypeMapModeItem", function (e) {
        let AssetTypeDesktopUtil = new BiViewAssetTypeMapModeDesktopUtils();
        AssetTypeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".bigroupSelectorAssetTypeMapModeItem", function (e) {
        let AssetTypeDesktopUtil = new BiViewAssetTypeMapModeDesktopUtils();
        AssetTypeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biAssetTypeStartingPointList", function (e) {
        lufShieldId = $(this).attr("shieldid");
        let AssetTypeDesktopUtil = new BiViewAssetTypeMapModeDesktopUtils();
        if ($("#closeAssociationViewbi_asset_type_map_mode_desk").length > 0)
            $("#closeAssociationViewbi_asset_type_map_mode_desk").trigger("click");
        AssetTypeDesktopUtil.expressionClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biAssetTypeAnzSearchObject_ElementTypeItem", function (e) {
        let AssetTypeDesktopUtil = new BiViewAssetTypeMapModeDesktopUtils();
        let dropDownId = "bi_asset_type_map_mode_desk_search_dropdown_content";
        let selectedId = "bi_asset_type_map_mode_desk_search_dropdown_selected";
        AssetTypeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biAssetTypeAnzCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_asset_type_map_mode_desk_custom_search_dropdown_content";
        let selectedId = "bi_asset_type_map_mode_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#showBiAssetTypeDirectLinks", function (e) {
        let AssetTypeDesktopUtil = new BiViewAssetTypeMapModeDesktopUtils();
        AssetTypeDesktopUtil.showDirectLinks();
        e.stopPropagation();
    });
    /*bi assetTypeMapMode selectors*/

    $(document).on("click", ".levelSelectorBusinessAssetTypeMapModeItem", function (e) {
        let AssetTypeDesktopUtil = new BusinessAssetTypeMapModeDesktopUtils();
        AssetTypeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".groupSelectorBusinessAssetTypeMapModeItem", function (e) {
        let AssetTypeDesktopUtil = new BusinessAssetTypeMapModeDesktopUtils();
        AssetTypeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".businessAssetTypeStartingPointList", function (e) {
        busAssetLufId = $(this).attr("shieldid");
        let AssetTypeDesktopUtil = new BusinessAssetTypeMapModeDesktopUtils();
        if ($("#closeAssociationViewbusiness_asset_type_map_mode_desk").length > 0)
            $("#closeAssociationViewbusiness_asset_type_map_mode_desk").trigger("click");
        AssetTypeDesktopUtil.expressionClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".businessAssetTypeAnzSearchObject_ElementTypeItem", function (e) {
        let AssetTypeDesktopUtil = new BusinessAssetTypeMapModeDesktopUtils();
        let dropDownId = "single_business_asset_type_map_mode_desk_search_dropdown_content";
        let selectedId = "single_business_asset_type_map_mode_desk_search_dropdown_selected";
        AssetTypeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".businessAssetTypeAnzCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_business_asset_type_map_mode_desk_custom_search_dropdown_content";
        let selectedId = "single_business_asset_type_map_mode_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#showBusinessAssetTypeDirectLinks", function (e) {
        let AssetTypeDesktopUtil = new BusinessAssetTypeMapModeDesktopUtils();
        AssetTypeDesktopUtil.showDirectLinks();
        e.stopPropagation();
    });
    /*bi assetTypeMapMode selector*/
    $(document).on("click", ".bilevelSelectorBusinessAssetTypeMapModeItem", function (e) {
        let AssetTypeDesktopUtil = new BiViewBusinessAssetTypeMapModeDesktopUtils();
        AssetTypeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".bigroupSelectorBusinessAssetTypeMapModeItem", function (e) {
        let AssetTypeDesktopUtil = new BiViewBusinessAssetTypeMapModeDesktopUtils();
        AssetTypeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessAssetTypeStartingPointList", function (e) {
        busAssetLufId = $(this).attr("shieldid");
        let AssetTypeDesktopUtil = new BiViewBusinessAssetTypeMapModeDesktopUtils();
        if ($("#closeAssociationViewbi_business_asset_type_map_mode_desk").length > 0)
            $("#closeAssociationViewbi_business_asset_type_map_mode_desk").trigger("click");
        AssetTypeDesktopUtil.expressionClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessAssetTypeAnzSearchObject_ElementTypeItem", function (e) {
        let AssetTypeDesktopUtil = new BiViewBusinessAssetTypeMapModeDesktopUtils();
        let dropDownId = "bi_business_asset_type_map_mode_desk_search_dropdown_content";
        let selectedId = "bi_business_asset_type_map_mode_desk_search_dropdown_selected";
        AssetTypeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessAssetTypeAnzCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_business_asset_type_map_mode_desk_custom_search_dropdown_content";
        let selectedId = "bi_business_asset_type_map_mode_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#showBiBusinessAssetTypeDirectLinks", function (e) {
        let AssetTypeDesktopUtil = new BiViewAssetTypeMapModeDesktopUtils();
        AssetTypeDesktopUtil.showDirectLinks();
        e.stopPropagation();
    });
    /*bi assetTypeMapMode selectors*/
});

const assetTypeAnalysisUtil = new assetTypeAnalysisUtils;

function assetTypeAnalysisUtils() {
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
        data.dropDownOneLevelOfInterest = $(`#${activeDesktop.selector.level_dropdown_selected_id}`).attr("elementId");
        data.dropDownOneProtectionType = "shall";
        data.dropDownOneGroupId = parseInt($(`#${activeDesktop.selector.groups_dropdown_selected_id}`).attr("elementId"));
        data.dropDownTwoProtectionType = "shall";
        data.dropDownTwoShieldId = $expressionDropDownSelected.attr("shieldId");
        data.dropDownTwoStartingPoint = $expressionDropDownSelected.attr("startingPoint");
        if ($("#" + showDirectLinksId).is(':checked'))
            data.showDirectLinksInExpressionMode = true;
        else
            data.showDirectLinksInExpressionMode = false;
        $("#saveData").show();
        let renderFunction = (isBusiness) ? service.getBusinessAssetTypeMapToOtherStartingPoint : service.getAssetTypeMapToOtherStartingPoint;
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
        selectorObj.dropDownOneLevelOfInterest = $("#" + desktopSelector.level_dropdown_selected_id).attr("elementId");
        selectorObj.dropDownOneProtectionType = "shall";
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
            staticLinkName = constants.linkNames["ASSET_TYPE_TO_EXPRESSION"],
            startingPoint = selectedElement.attr("startingPoint"),
            protectionType = (selectedElement.attr("protectionType") === "dummy" ? undefined : selectedElement.attr("protectionType")),
            shieldId = selectedElement.attr("shieldId"),
            linkNameAttr = selectedElement.attr("linkName");
        let str = "", objectType = selectedElement.attr("objectType");
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
        $expressionDropDownSelected.attr("title", label);
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
        previousSelection.groupSelectorId = $("#" + groupSelectorId).attr("elementId");
        getProtectionTypeSelector(previousSelection, $protectionTypeSelectorId, view);
        getExpressionSelection(previousSelection, $expressionSelectorId, view);
        activeDesktop.previousSelectors = previousSelection;
        activeDesktop.utilsFunction.getShieldStartingPoints();
    }

    return {
        getLevels,
        getGroups,
        getDirectory,
        searchClick,
        getSelector,
        groupClick,
        levelClick,
        refresh,
        expressionClick
    };
}

function AssetTypeMapModeDesktopUtils() {
    let assetTypAnzDesk = new Object();

    function getShieldStartingPoints() {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_map_mode_desktop;
        let callback = function (res) {
            activeDesktop.previousSelectors = {shieldSelectorId : lufShieldId};
            renderExpressionSelector(res, activeDesktop, "assetTypeStartingPointList", false);
            // activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ASSET_TYPE_TO_EXPRESSION"];
            selectExpressionSelector(activeDesktop, false, () => {
                getAssetTypeAllowedLevels();
                if(lufShieldId){
                    activeDesktop.utilsFunction.shieldSelectorClick($("#" + activeDesktop.selector.expression_dropdown_id).find("li[shieldid = " + lufShieldId + "]"));
                }
            });
        };
        serviceFunctions.getDropdownTwoOptionsForAssetTypeStartingPoint(callback);
    }

    function getAssetTypeAllowedLevels() {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.getLevels(activeDesktop, "singleview", "levelSelectorAssetTypeMapMode");
    }

    function getElementGroups(data) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.getGroups(data, activeDesktop, "singleview", "groupSelectorAssetTypeMapMode");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.getDirectory(activeDesktop, "singleview", callback, "assetTypeAnzSearchObject_ElementTypeItem", "showAssetTypeDirectLinks");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "assetTypeAnzCustomSearchObject_ElementTypeItem");
    }

    function levelSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.levelClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function expressionClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_map_mode_desktop;
        assetAnalysisUtil.expressionClick(activeDesktop, selectedElement);
    }

    function getSelectorForAssetTypeMapDesk() {
        let desktopSelector = backing.singleview.workspaces.cla_workspace.desktops.asset_type_map_mode_desktop.selector;
        return assetTypeAnalysisUtil.getSelector(desktopSelector);
    }

    function showDirectLinks() {
        $("#saveData").show();
        getDirectoryView();
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.refresh(activeDesktop, "singleview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("asset_type_map_mode_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForAssetTypeMapDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("asset_type_map_mode_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    //added by Manish for drag and drop
    function saveDragAndDrop(){
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(false);
        let genericElement={children};
        service.saveAssetTypeAnalyzeModeDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            refreshFullDesktop();
            hideDragAndDropSaveBtn();
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    assetTypAnzDesk.getSelector = getSelectorForAssetTypeMapDesk;
    assetTypAnzDesk.levelSelectorClick = levelSelectorClick;
    assetTypAnzDesk.expressionClick = expressionClick;
    assetTypAnzDesk.getElementGroups = getElementGroups;
    assetTypAnzDesk.groupSelectorClick = groupSelectorClick;
    assetTypAnzDesk.getShieldStartingPoints = getShieldStartingPoints;
    assetTypAnzDesk.getAssetTypeAllowedLevels = getAssetTypeAllowedLevels;
    assetTypAnzDesk.getDirectoryView = getDirectoryView;
    assetTypAnzDesk.showDirectLinks = showDirectLinks;
    assetTypAnzDesk.searchObjectElementClick = searchObjectElementClick;
    assetTypAnzDesk.fullRefresh = refreshFullDesktop;
    assetTypAnzDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    assetTypAnzDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    assetTypAnzDesk.shieldSelectorClick=expressionClick;
    assetTypAnzDesk.saveDragAndDrop = saveDragAndDrop;
    assetTypAnzDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    return assetTypAnzDesk;
}

function BiViewAssetTypeMapModeDesktopUtils() {
    let assetTypAnzDesk = new Object();

    function getShieldStartingPoints() {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_map_mode_desktop;
        let callback = function (res) {
            activeDesktop.previousSelectors = {shieldSelectorId : lufShieldId};
            renderExpressionSelector(res, activeDesktop, "biAssetTypeStartingPointList", true);
            // activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ASSET_TYPE_TO_EXPRESSION"];
            selectExpressionSelector(activeDesktop, true, () => {
                getAssetTypeAllowedLevels();
                if(lufShieldId){
                    activeDesktop.utilsFunction.shieldSelectorClick($("#" + activeDesktop.selector.expression_dropdown_id).find("li[shieldid = " + lufShieldId + "]"));
                }
            });
        };
        serviceFunctions.getDropdownTwoOptionsForAssetTypeStartingPoint(callback);
    }

    function getAssetTypeAllowedLevels() {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.getLevels(activeDesktop, "biview", "bilevelSelectorAssetTypeMapMode");
    }

    function getElementGroups(data) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.getGroups(data, activeDesktop, "biview", "bigroupSelectorAssetTypeMapMode");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.getDirectory(activeDesktop, "biview", callback, "biAssetTypeAnzSearchObject_ElementTypeItem", "showBiAssetTypeDirectLinks");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biAssetTypeAnzCustomSearchObject_ElementTypeItem");
    }

    function levelSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.levelClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function showDirectLinks() {
        $("#saveData").show();
        getDirectoryView();
    }

    function expressionClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_map_mode_desktop;
        assetAnalysisUtil.expressionClick(activeDesktop, selectedElement);
    }

    function getSelectorForAssetTypeMapDesk() {
        let desktopSelector = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_map_mode_desktop.selector;
        return assetTypeAnalysisUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.refresh(activeDesktop, "biview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("asset_type_map_mode_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForAssetTypeMapDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("asset_type_map_mode_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

     //added by Manish for drag and drop
     function saveDragAndDrop(){
        let isBiview = true;
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiview);
        let genericElement={children};
        service.saveAssetTypeAnalyzeModeDragAndDrop(genericElement, function (res, err) {
            refreshFullDesktop();
            hideDragAndDropSaveBtn(isBiview);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
            $("#saveData").hide();
        });
    }

    assetTypAnzDesk.levelSelectorClick = levelSelectorClick;
    assetTypAnzDesk.expressionClick = expressionClick;
    assetTypAnzDesk.getElementGroups = getElementGroups;
    assetTypAnzDesk.groupSelectorClick = groupSelectorClick;
    assetTypAnzDesk.getShieldStartingPoints = getShieldStartingPoints;
    assetTypAnzDesk.getAssetTypeAllowedLevels = getAssetTypeAllowedLevels;
    assetTypAnzDesk.searchObjectElementClick = searchObjectElementClick;
    assetTypAnzDesk.showDirectLinks = showDirectLinks;
    assetTypAnzDesk.getDirectoryView = getDirectoryView;
    assetTypAnzDesk.fullRefresh = refreshFullDesktop;
    assetTypAnzDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    assetTypAnzDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    assetTypAnzDesk.shieldSelectorClick=expressionClick;
    assetTypAnzDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    assetTypAnzDesk.saveDragAndDrop = saveDragAndDrop; 
    return assetTypAnzDesk;
}

function BusinessAssetTypeMapModeDesktopUtils() {
    let assetTypAnzDesk = new Object();

    function getShieldStartingPoints() {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_map_mode_desktop;
        let callback = function (res) {
            renderExpressionSelector(res, activeDesktop, "businessAssetTypeStartingPointList", false);
            // activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ASSET_TYPE_TO_EXPRESSION"];
            selectExpressionSelector(activeDesktop, false, () => {
                getAssetTypeAllowedLevels();
                if(busAssetLufId){
                    activeDesktop.utilsFunction.shieldSelectorClick($("#" + activeDesktop.selector.expression_dropdown_id).find("li[shieldid = " + busAssetLufId + "]"));
                }
            });
        };
        serviceFunctions.getDropdownTwoOptionsForBusinessAssetTypeStartingPoint(callback);
    }

    function getAssetTypeAllowedLevels() {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.getLevels(activeDesktop, "singleview", "levelSelectorBusinessAssetTypeMapMode", true);
    }

    function getElementGroups(data) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.getGroups(data, activeDesktop, "singleview", "groupSelectorBusinessAssetTypeMapMode", true);
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.getDirectory(activeDesktop, "singleview", callback, "businessAssetTypeAnzSearchObject_ElementTypeItem", "showBusinessAssetTypeDirectLinks", true);
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "businessAssetTypeAnzCustomSearchObject_ElementTypeItem");
    }

    function levelSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.levelClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function expressionClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_map_mode_desktop;
        assetAnalysisUtil.expressionClick(activeDesktop, selectedElement);
    }

    function getSelectorForAssetTypeMapDesk() {
        let desktopSelector = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_map_mode_desktop.selector;
        return assetTypeAnalysisUtil.getSelector(desktopSelector);
    }

    function showDirectLinks() {
        $("#saveData").show();
        getDirectoryView();
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.refresh(activeDesktop, "singleview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("business_asset_type_map_mode_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForAssetTypeMapDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("business_asset_type_map_mode_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
        // addDragAndDropCommon();
    }

    function saveDragAndDrop(){
        let isBiView = false;
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiView);
        let genericElement={children};

        service.saveBusinessAssetTypeMapModeDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            getShieldStartingPoints();
            hideDragAndDropSaveBtn(isBiView);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    assetTypAnzDesk.getSelector = getSelectorForAssetTypeMapDesk;
    assetTypAnzDesk.levelSelectorClick = levelSelectorClick;
    assetTypAnzDesk.expressionClick = expressionClick;
    assetTypAnzDesk.getElementGroups = getElementGroups;
    assetTypAnzDesk.groupSelectorClick = groupSelectorClick;
    assetTypAnzDesk.getAssetTypeAllowedLevels = getAssetTypeAllowedLevels;
    assetTypAnzDesk.getShieldStartingPoints = getShieldStartingPoints;
    assetTypAnzDesk.getDirectoryView = getDirectoryView;
    assetTypAnzDesk.showDirectLinks = showDirectLinks;
    assetTypAnzDesk.searchObjectElementClick = searchObjectElementClick;
    assetTypAnzDesk.fullRefresh = refreshFullDesktop;
    assetTypAnzDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    assetTypAnzDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    assetTypAnzDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    assetTypAnzDesk.shieldSelectorClick = expressionClick;
    assetTypAnzDesk.saveDragAndDrop = saveDragAndDrop;
    assetTypAnzDesk.addDragAndDrop = addDragAndDrop;
    return assetTypAnzDesk;
}

function BiViewBusinessAssetTypeMapModeDesktopUtils() {
    let assetTypAnzDesk = new Object();

    function getShieldStartingPoints() {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_map_mode_desktop;
        let callback = function (res) {
            renderExpressionSelector(res, activeDesktop, "biBusinessAssetTypeStartingPointList", true);
            // activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ASSET_TYPE_TO_EXPRESSION"];
            selectExpressionSelector(activeDesktop, true, () => {
                getAssetTypeAllowedLevels();
                if(busAssetLufId){
                    activeDesktop.utilsFunction.shieldSelectorClick($("#" + activeDesktop.selector.expression_dropdown_id).find("li[shieldid = " + busAssetLufId + "]"));
                }
            });
        };
        serviceFunctions.getDropdownTwoOptionsForBusinessAssetTypeStartingPoint(callback);
    }

    function getAssetTypeAllowedLevels() {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.getLevels(activeDesktop, "biview", "bilevelSelectorBusinessAssetTypeMapMode", true);
    }

    function getElementGroups(data) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.getGroups(data, activeDesktop, "biview", "bigroupSelectorBusinessAssetTypeMapMode", true);
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.getDirectory(activeDesktop, "biview", callback, "biBusinessAssetTypeAnzSearchObject_ElementTypeItem", "showBiBusinessAssetTypeDirectLinks", true);
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biBusinessAssetTypeAnzCustomSearchObject_ElementTypeItem");
    }

    function levelSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.levelClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function showDirectLinks() {
        $("#saveData").show();
        getDirectoryView();
    }

    function expressionClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_map_mode_desktop;
        assetAnalysisUtil.expressionClick(activeDesktop, selectedElement);
    }

    function getSelectorForAssetTypeMapDesk() {
        let desktopSelector = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_map_mode_desktop.selector;
        return assetTypeAnalysisUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_map_mode_desktop;
        assetTypeAnalysisUtil.refresh(activeDesktop, "biview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("business_asset_type_map_mode_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForAssetTypeMapDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("business_asset_type_map_mode_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
        // addDragAndDropCommon(true);
    }

    function saveDragAndDrop(){
        let isBiView = true;
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiView);
        let genericElement={children};

        service.saveBusinessAssetTypeMapModeDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            getShieldStartingPoints();
            hideDragAndDropSaveBtn(isBiView);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    assetTypAnzDesk.levelSelectorClick = levelSelectorClick;
    assetTypAnzDesk.expressionClick = expressionClick;
    assetTypAnzDesk.getElementGroups = getElementGroups;
    assetTypAnzDesk.groupSelectorClick = groupSelectorClick;
    assetTypAnzDesk.getShieldStartingPoints = getShieldStartingPoints;
    assetTypAnzDesk.getAssetTypeAllowedLevels = getAssetTypeAllowedLevels;
    assetTypAnzDesk.searchObjectElementClick = searchObjectElementClick;
    assetTypAnzDesk.showDirectLinks = showDirectLinks;
    assetTypAnzDesk.getDirectoryView = getDirectoryView;
    assetTypAnzDesk.fullRefresh = refreshFullDesktop;
    assetTypAnzDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    assetTypAnzDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    assetTypAnzDesk.shieldSelectorClick=expressionClick;
    assetTypAnzDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    assetTypAnzDesk.saveDragAndDrop = saveDragAndDrop;
    assetTypAnzDesk.addDragAndDrop = addDragAndDrop;
    return assetTypAnzDesk;
}
