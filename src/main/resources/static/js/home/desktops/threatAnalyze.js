
$(document).ready(function () {
    $(document).on("click", ".anzThreatshieldSelectorItem", function (e) {
        threatLufId=$(this).attr("elementId");
        let ThreatMapModeDesktopUtil = new ThreatMapModeDesktopUtils();
        ThreatMapModeDesktopUtil.shieldSelectorClick($(this));
        removeCircularLinkDropDown(threatLufId,false);
        e.stopPropagation();
    });

    $(document).on("click", ".anzThreatlevelSelectorItem", function (e) {
        let ThreatMapModeDesktopUtil = new ThreatMapModeDesktopUtils();
        ThreatMapModeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".anzThreatgroupSelectorItem", function (e) {
        let ThreatMapModeDesktopUtil = new ThreatMapModeDesktopUtils();
        ThreatMapModeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".threatStartingPointList", function (e) {
        let ThreatMapModeDesktopUtil = new ThreatMapModeDesktopUtils();
        if ($("#closeAssociationViewthreat_map_mode_desk").length > 0)
            $("#closeAssociationViewthreat_map_mode_desk").trigger("click");
        ThreatMapModeDesktopUtil.expressionSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".anzThreatSearchObject_ElementTypeItem", function (e) {
        let ThreatMapModeDesktopUtil = new ThreatMapModeDesktopUtils();
        let dropDownId = "single_threat_map_mode_desk_search_dropdown_content";
        let selectedId = "single_threat_map_mode_desk_search_dropdown_selected";
        ThreatMapModeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".anzThreatCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_threat_map_mode_desk_custom_search_dropdown_content";
        let selectedId = "single_threat_map_mode_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#showThreatDirectLinks", function (e) {
        let ThreatMapModeDesktopUtil = new ThreatMapModeDesktopUtils();
        ThreatMapModeDesktopUtil.showDirectLinks();
        e.stopPropagation();
    });

    /*bi ANZ threat selector*/
    $(document).on("click", ".biThreatAnzshieldSelectorItem", function (e) {
        threatLufId=$(this).attr("elementId");
        let ThreatMapModeDesktopUtil = new BiviewThreatMapModeDesktopUtils();
        ThreatMapModeDesktopUtil.shieldSelectorClick($(this));
        removeCircularLinkDropDown(threatLufId,true);
        e.stopPropagation();
    });

    $(document).on("click", ".biThreatAnzlevelSelectorItem", function (e) {
        let ThreatMapModeDesktopUtil = new BiviewThreatMapModeDesktopUtils();
        ThreatMapModeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biThreatAnzgroupSelectorItem", function (e) {
        let ThreatMapModeDesktopUtil = new BiviewThreatMapModeDesktopUtils();
        ThreatMapModeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biThreatStartingPointList", function (e) {
        let ThreatMapModeDesktopUtil = new BiviewThreatMapModeDesktopUtils();
        if ($("#closeAssociationViewbi_threat_map_mode_desk").length > 0)
            $("#closeAssociationViewbi_threat_map_mode_desk").trigger("click");
        ThreatMapModeDesktopUtil.expressionSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biAnzThreatSearchObject_ElementTypeItem", function (e) {
        let ThreatMapModeDesktopUtil = new BiviewThreatMapModeDesktopUtils();
        let dropDownId = "bi_threat_map_mode_desk_search_dropdown_content";
        let selectedId = "bi_threat_map_mode_desk_search_dropdown_selected";
        ThreatMapModeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biAnzThreatCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_threat_map_mode_desk_custom_search_dropdown_content";
        let selectedId = "bi_threat_map_mode_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#showBiThreatDirectLinks", function (e) {
        let ThreatMapModeDesktopUtil = new BiviewThreatMapModeDesktopUtils();
        ThreatMapModeDesktopUtil.showDirectLinks();
        e.stopPropagation();
    });
    /*bi ANZ threat selector*/
});

const threatAnalysisUtil = new ThreatAnalysisUtils;

function ThreatAnalysisUtils() {
    function getShields(activeDesktop, view, classParam) {
        let dropDownId = activeDesktop.selector.shield_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        previousSelector={shieldSelectorId: threatLufId};
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
        serviceFunctions.getShieldOfThreatType(callback);
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

function ThreatMapModeDesktopUtils() {
    let threatAnzDesk = new Object();

    function getShieldStartingPoints() {
        let activeDesktop = backing.singleview.workspaces.threat_workspace.desktops.threat_map_mode_desktop;
        let callback = function (res) {
            renderExpressionSelector(res, activeDesktop, "threatStartingPointList", false);
            // activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ELEMENT_TO_EXPRESSION"];
            getShieldsOfShieldType();
        };
        serviceFunctions.getDropdownTwoOptionsForShieldStartingPoint(backing.object_type.threat_element.key, callback);
    }

    function getShieldsOfShieldType() {
        let activeDesktop = backing.singleview.workspaces.threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.getShields(activeDesktop, "singleview", "anzThreatshieldSelector");
    }

    function getAllowedLevels(data) {
        let activeDesktop = backing.singleview.workspaces.threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.getLevels(data, activeDesktop, "singleview", "anzThreatlevelSelector");

    }

    function selectExpressionSelected(cb) {
    	let activeDesktop = backing.singleview.workspaces.threat_workspace.desktops.threat_map_mode_desktop;
    	selectExpressionSelector(activeDesktop, false, cb);
    }

    function getElementGroups(data) {
        let activeDesktop = backing.singleview.workspaces.threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.getGroups(data, activeDesktop, "singleview", "anzThreatgroupSelector");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.singleview.workspaces.threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.getDirectory(activeDesktop, "singleview", callback, "anzThreatSearchObject_ElementTypeItem", "showThreatDirectLinks");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "anzThreatCustomSearchObject_ElementTypeItem");
    }

    function getSelectorForThreatMapDesk() {
        let desktopSelector = backing.singleview.workspaces.threat_workspace.desktops.threat_map_mode_desktop.selector;
        return threatAnalysisUtil.getSelector(desktopSelector);
    }

    function shieldSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.shieldClick(activeDesktop, selectedElement);

    }

    function levelSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.levelClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.singleview.workspaces.threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function expressionSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.expressionClick(activeDesktop, selectedElement);
    }

    function selectClickedGroup(selectedGroupId, elementIdOfClickedArc, objectTypeOfClickedArc) {
        let activeDesktop = backing.singleview.workspaces.threat_workspace.desktops.threat_map_mode_desktop;
        shieldAnalysisUtil.selectClickedGroup(activeDesktop, "anzThreatgroupSelectorItem", selectedGroupId, elementIdOfClickedArc, objectTypeOfClickedArc, "singleview");
    }

    function showDirectLinks() {
        $("#saveData").show();
        getDirectoryView();
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.singleview.workspaces.threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.refresh(activeDesktop, "singleview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("threat_map_mode_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForThreatMapDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("threat_map_mode_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
        /*addDragAndDropCommon();
        removeCircularLinkDropDown(threatLufId,false);*/
    }

    //added by Manish for drag and drop
    function saveDragAndDrop(){
        let isBiview=false;
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiview);
        let genericElement={children};
        service.saveThreatMapModeDesktopDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            getShieldsOfShieldType();
            hideDragAndDropSaveBtn(isBiview);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });

    }

    threatAnzDesk.getSelector = getSelectorForThreatMapDesk;
    threatAnzDesk.getShieldStartingPoints = getShieldStartingPoints;
    threatAnzDesk.getAllowedLevels = getAllowedLevels;
    threatAnzDesk.getElementGroups = getElementGroups;
    threatAnzDesk.shieldSelectorClick = shieldSelectorClick;
    threatAnzDesk.levelSelectorClick = levelSelectorClick;
    threatAnzDesk.groupSelectorClick = groupSelectorClick;
    threatAnzDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    threatAnzDesk.expressionSelectorClick = expressionSelectorClick;
    threatAnzDesk.getDirectoryView = getDirectoryView;
    threatAnzDesk.showDirectLinks = showDirectLinks;
    threatAnzDesk.searchObjectElementClick = searchObjectElementClick;
    threatAnzDesk.fullRefresh = refreshFullDesktop;
    threatAnzDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    threatAnzDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    threatAnzDesk.selectClickedGroup = selectClickedGroup;
    threatAnzDesk.selectExpressionSelected= selectExpressionSelected;
    threatAnzDesk.addDragAndDrop = addDragAndDrop;
    threatAnzDesk.saveDragAndDrop = saveDragAndDrop;
    threatAnzDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    return threatAnzDesk;
}

function BiviewThreatMapModeDesktopUtils() {
    let threatAnzDesk = new Object();

    function getShieldStartingPoints() {
        let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_map_mode_desktop;
        let callback = function (res) {
            renderExpressionSelector(res, activeDesktop, "biThreatStartingPointList", true);
            // activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ELEMENT_TO_EXPRESSION"];
            getShieldsOfShieldType();
        };
        serviceFunctions.getDropdownTwoOptionsForShieldStartingPoint(backing.object_type.threat_element.key, callback);
    }

    function getShieldsOfShieldType() {
        let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.getShields(activeDesktop, "biview", "biThreatAnzshieldSelector");
    }

    function getAllowedLevels(data) {
        let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.getLevels(data, activeDesktop, "biview", "biThreatAnzlevelSelector");
    }

    function selectExpressionSelected(cb) {
    	let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_map_mode_desktop;
    	selectExpressionSelector(activeDesktop, true, cb);
    }

    function getElementGroups(data) {
        let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.getGroups(data, activeDesktop, "biview", "biThreatAnzgroupSelector");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.getDirectory(activeDesktop, "biview", callback, "biAnzThreatSearchObject_ElementTypeItem", "showBiThreatDirectLinks");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_map_mode_desktop;
        shieldAnalysisUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biAnzThreatCustomSearchObject_ElementTypeItem");
    }

    function getSelectorForThreatMapDesk() {
        let desktopSelector = backing.biview.workspaces.bi_threat_workspace.desktops.threat_map_mode_desktop.selector;
        return shieldAnalysisUtil.getSelector(desktopSelector);
    }

    function shieldSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.shieldClick(activeDesktop, selectedElement);
    }

    function levelSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.levelClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function expressionSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.expressionClick(activeDesktop, selectedElement);
    }

    function selectClickedGroup(selectedGroupId, elementIdOfClickedArc, objectTypeOfClickedArc) {
        let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.selectClickedGroup(activeDesktop, "biThreatAnzgroupSelectorItem", selectedGroupId, elementIdOfClickedArc, objectTypeOfClickedArc, "biview");
    }

    function showDirectLinks() {
        $("#saveData").show();
        getDirectoryView();
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_map_mode_desktop;
        threatAnalysisUtil.refresh(activeDesktop, "biview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("threat_map_mode_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForThreatMapDesk(); 
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("threat_map_mode_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
        /*addDragAndDropCommon(true);
        removeCircularLinkDropDown(threatLufId,true);*/
    }

    //added by Manish for drag and drop
    function saveDragAndDrop(){
        let isBiview=true;
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiview);
        let genericElement={children};
        service.saveThreatMapModeDesktopDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            getShieldsOfShieldType();
            hideDragAndDropSaveBtn(isBiview);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    threatAnzDesk.getSelector = getSelectorForThreatMapDesk;
    threatAnzDesk.getShieldStartingPoints = getShieldStartingPoints;
    threatAnzDesk.shieldSelectorClick = shieldSelectorClick;
    threatAnzDesk.levelSelectorClick = levelSelectorClick;
    threatAnzDesk.groupSelectorClick = groupSelectorClick;
    threatAnzDesk.getAllowedLevels = getAllowedLevels;
    threatAnzDesk.getElementGroups = getElementGroups;
    threatAnzDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    threatAnzDesk.expressionSelectorClick = expressionSelectorClick;
    threatAnzDesk.getDirectoryView = getDirectoryView;
    threatAnzDesk.showDirectLinks = showDirectLinks;
    threatAnzDesk.searchObjectElementClick = searchObjectElementClick;
    threatAnzDesk.fullRefresh = refreshFullDesktop;
    threatAnzDesk.selectClickedGroup = selectClickedGroup;
    threatAnzDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    threatAnzDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    threatAnzDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    threatAnzDesk.selectExpressionSelected= selectExpressionSelected;
    threatAnzDesk.addDragAndDrop = addDragAndDrop;
    threatAnzDesk.saveDragAndDrop = saveDragAndDrop;
    return threatAnzDesk;
}