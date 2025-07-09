$(document).ready(function () {
    $(document).on("click", ".anzStandardshieldSelectorItem", function (e) {
        stdLufId=$(this).attr("elementId");
        let StandardMapModeDesktopUtil = new StandardMapModeDesktopUtils();
        StandardMapModeDesktopUtil.shieldSelectorClick($(this));
        removeCircularLinkDropDown(stdLufId,false);
        e.stopPropagation();
    });

    $(document).on("click", ".anzStandardlevelSelectorItem", function (e) {
        let StandardMapModeDesktopUtil = new StandardMapModeDesktopUtils();
        StandardMapModeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".anzStandardgroupSelectorItem", function (e) {
        let StandardMapModeDesktopUtil = new StandardMapModeDesktopUtils();
        StandardMapModeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".standardStartingPointList", function (e) {
        let StandardMapModeDesktopUtil = new StandardMapModeDesktopUtils();
        if ($("#closeAssociationViewstandard_map_mode_desk").length > 0)
            $("#closeAssociationViewstandard_map_mode_desk").trigger("click");
        StandardMapModeDesktopUtil.expressionSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".anzStandardSearchObject_ElementTypeItem", function (e) {
        let StandardMapModeDesktopUtil = new StandardMapModeDesktopUtils();
        let dropDownId = "single_standard_map_mode_desk_search_dropdown_content";
        let selectedId = "single_standard_map_mode_desk_search_dropdown_selected";
        StandardMapModeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".anzStandardCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_standard_map_mode_desk_custom_search_dropdown_content";
        let selectedId = "single_standard_map_mode_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#showStdDirectLinks", function (e) {
        let StandardMapModeDesktopUtil = new StandardMapModeDesktopUtils();
        StandardMapModeDesktopUtil.showDirectLinks();
        removeCircularLinkDropDown(stdLufId,true);
        e.stopPropagation();
    });

    /*bi ANZ standard selector*/
    $(document).on("click", ".biStdAnzshieldSelectorItem", function (e) {
        stdLufId=$(this).attr("elementId");
        let StandardMapModeDesktopUtil = new BiviewStdMapModeDesktopUtils();
        StandardMapModeDesktopUtil.shieldSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biStdAnzlevelSelectorItem", function (e) {
        let StandardMapModeDesktopUtil = new BiviewStdMapModeDesktopUtils();
        StandardMapModeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biStdAnzgroupSelectorItem", function (e) {
        let StandardMapModeDesktopUtil = new BiviewStdMapModeDesktopUtils();
        StandardMapModeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biStandardStartingPointList", function (e) {
        let StandardMapModeDesktopUtil = new BiviewStdMapModeDesktopUtils();
        if ($("#closeAssociationViewbi_standard_map_mode_desk").length > 0)
            $("#closeAssociationViewbi_standard_map_mode_desk").trigger("click");
        StandardMapModeDesktopUtil.expressionSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biAnzStandardSearchObject_ElementTypeItem", function (e) {
        let StandardMapModeDesktopUtil = new BiviewStdMapModeDesktopUtils();
        let dropDownId = "bi_standard_map_mode_desk_search_dropdown_content";
        let selectedId = "bi_standard_map_mode_desk_search_dropdown_selected";
        StandardMapModeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biAnzStandardCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_standard_map_mode_desk_custom_search_dropdown_content";
        let selectedId = "bi_standard_map_mode_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#showBiStdDirectLinks", function (e) {
        let StandardMapModeDesktopUtil = new BiviewStdMapModeDesktopUtils();
        StandardMapModeDesktopUtil.showDirectLinks();
        e.stopPropagation();
    });
    /*bi ANZ standard selector*/
});

const stdAnalysisUtil = new StdAnalysisUtils;

function StdAnalysisUtils() {
    function getShields(activeDesktop, view, classParam) {
        let dropDownId = activeDesktop.selector.shield_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        previousSelector={shieldSelectorId: stdLufId};
        let callback = function (res) {
            serviceFunctions.getDefaultShieldPrefs((defaultPrefs) => {
                let idOfParentDiv = dropDownId,
                    viewName = "groupView",
                    isRoot = false;
                let data = {idOfParentDiv, view, viewName, isRoot};
                renderSelectorDropDown(activeDesktop, res.children, "shieldSelector", classParam, data, false, defaultPrefs);
                shieldSelector(previousSelector, dropDownId, activeDesktop.utilsFunction.shieldSelectorClick);
            });
        };
        serviceFunctions.getShieldOfStandardType(callback);
    }

    function getLevels(data, activeDesktop, view, classParam) {
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
        serviceFunctions.getAllowedLevels(data, callback);
    }

    function getGroups(data, activeDesktop, view, classParam) {
        let dropDownId = activeDesktop.selector.groups_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        let callback = function (res) {
            let idOfParentDiv = dropDownId,
                viewName = "groupView",
                isRoot = false;
            let data = {idOfParentDiv, view, viewName, isRoot};
            renderSelectorDropDown(activeDesktop, res, "groupSelector", classParam, data, true);
            groupSelector(previousSelector, dropDownId, getLiFromGroupDropDownSelector, activeDesktop.utilsFunction.groupSelectorClick, classParam);
        };
        serviceFunctions.getGroupsGivenMaxLevel(data, callback);
    }

    function getDirectory(activeDesktop, view, callback, classOfObjectTypeElementType, showDirectLinksId) {
        modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
        let backingview, showDirectLinksInExpressionMode;
        let isBiview = isBiViewOrNot(view);
        if (view === "singleview") {
            backingview = backing.singleview;
        }
        else if (view === "biview") {
            backingview = backing.biview;
        }
        let $expressionDropDownSelected = $(`#${activeDesktop.selector.expression_dropdown_selected_id}`);
        let direct = backing.isDirectMode,
            dropDownOneShieldId = parseInt($(`#${activeDesktop.selector.shield_dropdown_selected_id}`).attr("elementId")),
            dropDownOneLevelOfInterest = parseInt($(`#${activeDesktop.selector.level_dropdown_selected_id}`).attr("elementId")),
            dropDownOneGroupId = parseInt($(`#${activeDesktop.selector.groups_dropdown_selected_id}`).attr("elementId")),
            dropDownTwoProtectionType = $expressionDropDownSelected.attr("protectionType"),
            dropDownTwoShieldId = $expressionDropDownSelected.attr("shieldId"),
            dropDownTwoStartingPoint = $expressionDropDownSelected.attr("startingPoint");
        if ($("#" + showDirectLinksId).is(':checked'))
            showDirectLinksInExpressionMode = true;
        else
            showDirectLinksInExpressionMode = false;

        let data = {
            direct,
            dropDownOneShieldId,
            dropDownOneLevelOfInterest,
            dropDownOneGroupId,
            dropDownTwoProtectionType,
            dropDownTwoShieldId,
            dropDownTwoStartingPoint,
            showDirectLinksInExpressionMode
        };
        if ((typeof(dropDownOneShieldId) === "undefined") || (parseInt(dropDownOneShieldId) === 0)) {
            $("#saveData").hide();
            return;
        }

        $("#saveData").show();
        service.getShieldFullMapToOtherStartingPoint(data, function (res, err) {
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
                errorHandler(err);
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
        let $expressionSelector = $(`#${desktopSelector.expression_selector_id}`);
        selectorObj.dropDownOneShieldId = $(`#${desktopSelector.shield_dropdown_selected_id}`).attr("elementId");
        selectorObj.dropDownOneGroupId = $(`#${desktopSelector.groups_dropdown_selected_id}`).attr("elementId");
        selectorObj.dropDownOneLevelOfInterest = $(`#${desktopSelector.level_dropdown_selected_id}`).attr("elementId");
        selectorObj.dropDownTwoProtectionType = $expressionSelectedId.attr("protectionType");
        selectorObj.dropDownTwoShieldId = $expressionSelectedId.attr("shieldId");
        selectorObj.dropDownTwoStartingPoint = $expressionSelectedId.attr("startingPoint");
        selectorObj.dropDownTwoHtml = $expressionSelectedId.html();
        if ($("#" + desktopSelector.showDirectLinks_checkbox_id).find(".assetCheckbox").is(":checked")) {
            selectorObj.showDirectLinksInExpressionMode = true;
        }
        else {
            selectorObj.showDirectLinksInExpressionMode = false;
        }

        if ($expressionSelector.find(".enableSelector").hasClass("active")) {
            selectorObj.showExpression = true;
        }
        else if ($expressionSelector.find(".disableSelector").hasClass("active")) selectorObj.showExpression = false;
        return selectorObj;
    }

    function shieldClick(activeDesktop, selectedElement) {
        function canHaveCreateShieldElementHotlink(shieldId) {
            service.getTypesThatCanHaveCreateShieldElementHotlink(shieldId, function (res, err) {
                if (res) {
                    activeDesktop.canHaveCreateShieldElementHotlink = res;
                }
                else if (err) {
                    $("#saveData").hide();
                }
            });
        }

        let $shieldSelected = $(`#${activeDesktop.selector.shield_dropdown_selected_id}`);
        if (!selectedElement) {
            $(".desktop-selector-dropdown-content").addClass("dis-none");
            return;
        }

        let shieldId = selectedElement.attr("elementId");
        let data = {shieldId};
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }
        canHaveCreateShieldElementHotlink(shieldId);
        $("#saveData").show();

        $shieldSelected.html(selectedElement.find(".dropdownIcon").html() + selectedElement.find(".acronym").html());
        $shieldSelected.attr("title", selectedElement.attr("title"));
        $shieldSelected.attr("elementId", selectedElement.attr("elementId"));
        activeDesktop.utilsFunction.selectExpressionSelected(() => {activeDesktop.utilsFunction.getAllowedLevels(data);})
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
            $levelSelected.attr("title", selectedElement.html());
            $levelSelected.parent().find(".levelIcon").removeClass("opacityDull");
        }
        else {
            $levelSelected.parent().find(".levelIcon").addClass("opacityDull");
            $levelSelected.attr("title", "");
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
        $groupsSelected.attr("title", $groupsSelected.html());
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
            staticLinkName = constants.linkNames["ELEMENT_TO_EXPRESSION"],
            startingPoint = selectedElement.attr("startingPoint"),
            protectionType = (selectedElement.attr("protectionType") === "dummy" ? undefined : selectedElement.attr("protectionType")),
            shieldId = selectedElement.attr("shieldId"),
            objectType = selectedElement.attr("objectType"),
            linkNameAttr = selectedElement.attr("linkName");
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
        if (activeDesktop && activeDesktop.previousSelectors) {
            if (activeDesktop.previousSelectors.expressionSelectorDirect) {
                previousSelection.expressionSelectorDirect = activeDesktop.previousSelectors.expressionSelectorDirect;
            }
            if (activeDesktop.previousSelectors.expressionSelectorInDirect) {
                previousSelection.expressionSelectorInDirect = activeDesktop.previousSelectors.expressionSelectorInDirect;
            }
        }
        let shieldSelectorId = activeDesktop.selector.shield_dropdown_selected_id;
        let levelSelectorId = activeDesktop.selector.level_dropdown_selected_id;
        let groupSelectorId = activeDesktop.selector.groups_dropdown_selected_id;
        let $expressionSelectorId = $("#" + activeDesktop.selector.expression_dropdown_selected_id);

        previousSelection.shieldSelectorId = $(`#${shieldSelectorId}`).attr("elementId");
        previousSelection.levelSelectorId = $(`#${levelSelectorId}`).attr("elementId");
        previousSelection.groupSelectorId = $(`#${groupSelectorId}`).attr("elementId");
        getExpressionSelection(previousSelection, $expressionSelectorId, view);
        activeDesktop.previousSelectors = previousSelection;
        activeDesktop.utilsFunction.getShieldStartingPoints();
    }

    function selectClickedGroup(activeDesktop, classParam, selectedGroupId, elementIdOfClickedArc, objectTypeOfClickedArc, view) {
        let groupsDropDownId = activeDesktop.selector.groups_dropdown_id;
        let dvJson = activeDesktop.directoryJson;
        $("#" + groupsDropDownId).find("." + classParam).each(function () {
            if (parseInt($(this).attr("elementid")) === selectedGroupId) {
                activeDesktop.utilsFunction.groupSelectorClick($(this), function () {
                    let elementFromDVJson = findElementInPassedDvJson(elementIdOfClickedArc, objectTypeOfClickedArc, dvJson);
                    if (elementFromDVJson == null) {
                        alert("Clicked control not found in directoryJson of the anchor.");
                        return;
                    }
                    $("#" + activeDesktop.tree_container_id).find("." + view + "-ring-view[uniqueId = \"" + elementFromDVJson.uniqueId + "\"]").trigger("click");
                });
            }
        });

    }

    return {
        getShields,
        getLevels,
        getGroups,
        getDirectory,
        searchClick,
        getSelector,
        levelClick,
        groupClick,
        shieldClick,
        refresh,
        expressionClick,
        selectClickedGroup
    };
}

function StandardMapModeDesktopUtils() {
    let stdAnzDesk = new Object();

    function getShieldStartingPoints() {
        let activeDesktop = backing.singleview.workspaces.std_workspace.desktops.standard_map_mode_desktop;
        let callback = function (res) {
            renderExpressionSelector(res, activeDesktop, "standardStartingPointList", false);
            // activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ELEMENT_TO_EXPRESSION"];
            getShieldsOfShieldType();
        };
        serviceFunctions.getDropdownTwoOptionsForShieldStartingPoint(backing.object_type.standard_element.key, callback);
    }

    function getShieldsOfShieldType() {
        let activeDesktop = backing.singleview.workspaces.std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.getShields(activeDesktop, "singleview", "anzStandardshieldSelector");
    }

    function getAllowedLevels(data) {
        let activeDesktop = backing.singleview.workspaces.std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.getLevels(data, activeDesktop, "singleview", "anzStandardlevelSelector");

    }

    function selectExpressionSelected(cb) {
    	let activeDesktop = backing.singleview.workspaces.std_workspace.desktops.standard_map_mode_desktop;
    	selectExpressionSelector(activeDesktop, false, cb);
    }

    function getElementGroups(data) {
        let activeDesktop = backing.singleview.workspaces.std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.getGroups(data, activeDesktop, "singleview", "anzStandardgroupSelector");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.singleview.workspaces.std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.getDirectory(activeDesktop, "singleview", callback, "anzStandardSearchObject_ElementTypeItem", "showStdDirectLinks");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "anzStandardCustomSearchObject_ElementTypeItem");
    }

    function getSelectorForStdMapDesk() {
        let desktopSelector = backing.singleview.workspaces.std_workspace.desktops.standard_map_mode_desktop.selector;
        return stdAnalysisUtil.getSelector(desktopSelector);
    }

    function shieldSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.shieldClick(activeDesktop, selectedElement);

    }

    function levelSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.levelClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.singleview.workspaces.std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function expressionSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.expressionClick(activeDesktop, selectedElement);
    }

    function selectClickedGroup(selectedGroupId, elementIdOfClickedArc, objectTypeOfClickedArc) {
        let activeDesktop = backing.singleview.workspaces.std_workspace.desktops.standard_map_mode_desktop;
        shieldAnalysisUtil.selectClickedGroup(activeDesktop, "anzStandardgroupSelectorItem", selectedGroupId, elementIdOfClickedArc, objectTypeOfClickedArc, "singleview");
    }

    function showDirectLinks() {
        $("#saveData").show();
        getDirectoryView();
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.singleview.workspaces.std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.refresh(activeDesktop, "singleview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("standard_map_mode_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForStdMapDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("standard_map_mode_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }


    // added for drag and drop by Manish
    function addDragAndDrop() {
        /*addDragAndDropCommon();
        removeCircularLinkDropDown(stdLufId,false);*/
    }

     //added by Manish for drag and drop
     function saveDragAndDrop(){
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(false);
        let shieldId=getSelectorForStdMapDesk().dropDownOneShieldId;
        let genericElement={shieldId,children};
        service.saveStandardMapModeDesktopDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            getShieldsOfShieldType();
            hideDragAndDropSaveBtn();
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    stdAnzDesk.getSelector = getSelectorForStdMapDesk;
    stdAnzDesk.getShieldStartingPoints = getShieldStartingPoints;
    stdAnzDesk.getAllowedLevels = getAllowedLevels;
    stdAnzDesk.getElementGroups = getElementGroups;
    stdAnzDesk.shieldSelectorClick = shieldSelectorClick;
    stdAnzDesk.levelSelectorClick = levelSelectorClick;
    stdAnzDesk.groupSelectorClick = groupSelectorClick;
    stdAnzDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    stdAnzDesk.expressionSelectorClick = expressionSelectorClick;
    stdAnzDesk.getDirectoryView = getDirectoryView;
    stdAnzDesk.showDirectLinks = showDirectLinks;
    stdAnzDesk.searchObjectElementClick = searchObjectElementClick;
    stdAnzDesk.fullRefresh = refreshFullDesktop;
    stdAnzDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    stdAnzDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    stdAnzDesk.selectClickedGroup = selectClickedGroup;
    stdAnzDesk.selectExpressionSelected= selectExpressionSelected;
    stdAnzDesk.saveDragAndDrop = saveDragAndDrop;
    stdAnzDesk.addDragAndDrop = addDragAndDrop;
    stdAnzDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    return stdAnzDesk;
}

function BiviewStdMapModeDesktopUtils() {
    let stdAnzDesk = new Object();

    function getShieldStartingPoints() {
        let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_map_mode_desktop;
        let callback = function (res) {
            renderExpressionSelector(res, activeDesktop, "biStandardStartingPointList", true);
            // activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ELEMENT_TO_EXPRESSION"];
            getShieldsOfShieldType();
        };
        serviceFunctions.getDropdownTwoOptionsForShieldStartingPoint(backing.object_type.standard_element.key, callback);
    }

    function getShieldsOfShieldType() {
        let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.getShields(activeDesktop, "biview", "biStdAnzshieldSelector");
    }

    function getAllowedLevels(data) {
        let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.getLevels(data, activeDesktop, "biview", "biStdAnzlevelSelector");
    }

    function selectExpressionSelected(cb) {
        let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_map_mode_desktop;
        selectExpressionSelector(activeDesktop, true, cb);
    }

    function getElementGroups(data) {
        let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.getGroups(data, activeDesktop, "biview", "biStdAnzgroupSelector");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.getDirectory(activeDesktop, "biview", callback, "biAnzStandardSearchObject_ElementTypeItem", "showBiStdDirectLinks");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_map_mode_desktop;
        shieldAnalysisUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biAnzStandardCustomSearchObject_ElementTypeItem");
    }

    function getSelectorForStdMapDesk() {
        let desktopSelector = backing.biview.workspaces.bi_std_workspace.desktops.standard_map_mode_desktop.selector;
        return shieldAnalysisUtil.getSelector(desktopSelector);
    }

    function shieldSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.shieldClick(activeDesktop, selectedElement);
    }

    function levelSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.levelClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function expressionSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.expressionClick(activeDesktop, selectedElement);
    }

    function selectClickedGroup(selectedGroupId, elementIdOfClickedArc, objectTypeOfClickedArc) {
        let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.selectClickedGroup(activeDesktop, "biStdAnzgroupSelectorItem", selectedGroupId, elementIdOfClickedArc, objectTypeOfClickedArc, "biview");
    }

    function showDirectLinks() {
        $("#saveData").show();
        getDirectoryView();
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_map_mode_desktop;
        stdAnalysisUtil.refresh(activeDesktop, "biview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("standard_map_mode_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForStdMapDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("standard_map_mode_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
        /*addDragAndDropCommon(true);
        removeCircularLinkDropDown(stdLufId,true);*/
    }

    //added by Manish for drag and drop
    function saveDragAndDrop(){
        let isBiView = true;
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiView);
        let shieldId=getSelectorForStdMapDesk().dropDownOneShieldId;
        let genericElement={shieldId,children};
        service.saveStandardMapModeDesktopDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            getShieldsOfShieldType();
            hideDragAndDropSaveBtn(isBiView);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    stdAnzDesk.getSelector = getSelectorForStdMapDesk;
    stdAnzDesk.getShieldStartingPoints = getShieldStartingPoints;
    stdAnzDesk.shieldSelectorClick = shieldSelectorClick;
    stdAnzDesk.levelSelectorClick = levelSelectorClick;
    stdAnzDesk.groupSelectorClick = groupSelectorClick;
    stdAnzDesk.getAllowedLevels = getAllowedLevels;
    stdAnzDesk.getElementGroups = getElementGroups;
    stdAnzDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    stdAnzDesk.expressionSelectorClick = expressionSelectorClick;
    stdAnzDesk.getDirectoryView = getDirectoryView;
    stdAnzDesk.showDirectLinks = showDirectLinks;
    stdAnzDesk.searchObjectElementClick = searchObjectElementClick;
    stdAnzDesk.fullRefresh = refreshFullDesktop;
    stdAnzDesk.selectClickedGroup = selectClickedGroup;
    stdAnzDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    stdAnzDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    stdAnzDesk.selectExpressionSelected= selectExpressionSelected;
    stdAnzDesk.saveDragAndDrop = saveDragAndDrop;
    stdAnzDesk.addDragAndDrop = addDragAndDrop;
    stdAnzDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    return stdAnzDesk;
}