$(document).ready(function () {
    $(document).on("click", ".anzBusinessshieldSelectorItem", function (e) {
        busLufId=$(this).attr("elementId");
        let BusinessMapModeDesktopUtil = new BusinessMapModeDesktopUtils();
        BusinessMapModeDesktopUtil.shieldSelectorClick($(this));
        removeCircularLinkDropDown(busLufId,false);
        e.stopPropagation();
    });

    $(document).on("click", ".anzBusinesslevelSelectorItem", function (e) {
        let BusinessMapModeDesktopUtil = new BusinessMapModeDesktopUtils();
        BusinessMapModeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".anzBusinessgroupSelectorItem", function (e) {
        let BusinessMapModeDesktopUtil = new BusinessMapModeDesktopUtils();
        BusinessMapModeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".businessStartingPointList", function (e) {
        let BusinessMapModeDesktopUtil = new BusinessMapModeDesktopUtils();
        if ($("#closeAssociationViewbusiness_map_mode_desk").length > 0)
            $("#closeAssociationViewbusiness_map_mode_desk").trigger("click");
        BusinessMapModeDesktopUtil.expressionSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".anzBusinessSearchObject_ElementTypeItem", function (e) {
        let BusinessMapModeDesktopUtil = new BusinessMapModeDesktopUtils();
        let dropDownId = "single_business_map_mode_desk_search_dropdown_content";
        let selectedId = "single_business_map_mode_desk_search_dropdown_selected";
        BusinessMapModeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".anzBusinessCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_business_map_mode_desk_custom_search_dropdown_content";
        let selectedId = "single_business_map_mode_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#showBusinessDirectLinks", function (e) {
        let BusinessMapModeDesktopUtil = new BusinessMapModeDesktopUtils();
        BusinessMapModeDesktopUtil.showDirectLinks();
        e.stopPropagation();
    });

    /*bi ANZ standard selector*/
    $(document).on("click", ".biBusinessAnzshieldSelectorItem", function (e) {
        busLufId=$(this).attr("elementId");
        let BusinessMapModeDesktopUtil = new BiviewBusinessMapModeDesktopUtils();
        BusinessMapModeDesktopUtil.shieldSelectorClick($(this));
        removeCircularLinkDropDown(busLufId,true);
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessAnzlevelSelectorItem", function (e) {
        let BusinessMapModeDesktopUtil = new BiviewBusinessMapModeDesktopUtils();
        BusinessMapModeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessAnzgroupSelectorItem", function (e) {
        let BusinessMapModeDesktopUtil = new BiviewBusinessMapModeDesktopUtils();
        BusinessMapModeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessStartingPointList", function (e) {
        let BusinessMapModeDesktopUtil = new BiviewBusinessMapModeDesktopUtils();
        if ($("#closeAssociationViewbi_business_map_mode_desk").length > 0)
            $("#closeAssociationViewbi_business_map_mode_desk").trigger("click");
        BusinessMapModeDesktopUtil.expressionSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biAnzBusinessSearchObject_ElementTypeItem", function (e) {
        let BusinessMapModeDesktopUtil = new BiviewBusinessMapModeDesktopUtils();
        let dropDownId = "bi_business_map_mode_desk_search_dropdown_content";
        let selectedId = "bi_business_map_mode_desk_search_dropdown_selected";
        BusinessMapModeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biAnzBusinessCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_business_map_mode_desk_custom_search_dropdown_content";
        let selectedId = "bi_business_map_mode_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#showBiBusinessDirectLinks", function (e) {
        let BusinessMapModeDesktopUtil = new BiviewBusinessMapModeDesktopUtils();
        BusinessMapModeDesktopUtil.showDirectLinks();
        e.stopPropagation();
    });
    /*bi ANZ standard selector*/
});

const businessAnalysisUtil = new businessAnalysisUtils;

function businessAnalysisUtils() {
    function getShields(activeDesktop, view, classParam) {
        let dropDownId = activeDesktop.selector.shield_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        previousSelector = {shieldSelectorId: busLufId}; 
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
        serviceFunctions.getShieldOfBusinessType(callback);
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
            dropDownTwoProtectionType = "shall",
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

function BusinessMapModeDesktopUtils() {
    let businessAnzDesk = new Object();

    function getShieldStartingPoints() {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_map_mode_desktop;
        let callback = function (res) {
            renderExpressionSelector(res, activeDesktop, "businessStartingPointList", false);
            // activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ELEMENT_TO_EXPRESSION"];
            getShieldsOfShieldType();
        };
        serviceFunctions.getDropdownTwoOptionsForShieldStartingPoint(backing.object_type.b_control.key, callback);
    }

    function getShieldsOfShieldType() {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.getShields(activeDesktop, "singleview", "anzBusinessshieldSelector");
    }

    function getAllowedLevels(data) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.getLevels(data, activeDesktop, "singleview", "anzBusinesslevelSelector");

    }

    function selectExpressionSelected(cb) {
    	let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_map_mode_desktop;
    	selectExpressionSelector(activeDesktop, false, cb);
    }

    function getElementGroups(data) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.getGroups(data, activeDesktop, "singleview", "anzBusinessgroupSelector");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.getDirectory(activeDesktop, "singleview", callback, "anzBusinessSearchObject_ElementTypeItem", "showBusinessDirectLinks");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "anzBusinessCustomSearchObject_ElementTypeItem");
    }

    function getSelectorForStdMapDesk() {
        let desktopSelector = backing.singleview.workspaces.business_workspace.desktops.business_map_mode_desktop.selector;
        return businessAnalysisUtil.getSelector(desktopSelector);
    }

    function shieldSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.shieldClick(activeDesktop, selectedElement);

    }

    function levelSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.levelClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function expressionSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.expressionClick(activeDesktop, selectedElement);
    }

    function selectClickedGroup(selectedGroupId, elementIdOfClickedArc, objectTypeOfClickedArc) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_map_mode_desktop;
        shieldAnalysisUtil.selectClickedGroup(activeDesktop, "anzBusinessgroupSelectorItem", selectedGroupId, elementIdOfClickedArc, objectTypeOfClickedArc, "singleview");
    }

    function showDirectLinks() {
        $("#saveData").show();
        getDirectoryView();
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.refresh(activeDesktop, "singleview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("business_map_mode_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForStdMapDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("business_map_mode_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
        // addDragAndDropCommon();
        // removeCircularLinkDropDown(busLufId,false);
    }

        //added by Manish for drag and drop
    function saveDragAndDrop(){
        let isBiView = false;
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiView);
        let genericElement={children};

        service.saveBusinessMapModeDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            getShieldsOfShieldType();
            hideDragAndDropSaveBtn(isBiView);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    businessAnzDesk.getSelector = getSelectorForStdMapDesk;
    businessAnzDesk.getShieldStartingPoints = getShieldStartingPoints;
    businessAnzDesk.getAllowedLevels = getAllowedLevels;
    businessAnzDesk.getElementGroups = getElementGroups;
    businessAnzDesk.shieldSelectorClick = shieldSelectorClick;
    businessAnzDesk.levelSelectorClick = levelSelectorClick;
    businessAnzDesk.groupSelectorClick = groupSelectorClick;
    businessAnzDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    businessAnzDesk.expressionSelectorClick = expressionSelectorClick;
    businessAnzDesk.getDirectoryView = getDirectoryView;
    businessAnzDesk.showDirectLinks = showDirectLinks;
    businessAnzDesk.searchObjectElementClick = searchObjectElementClick;
    businessAnzDesk.fullRefresh = refreshFullDesktop;
    businessAnzDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    businessAnzDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    businessAnzDesk.selectClickedGroup = selectClickedGroup;
    businessAnzDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    businessAnzDesk.selectExpressionSelected= selectExpressionSelected;
    businessAnzDesk.addDragAndDrop = addDragAndDrop;
    businessAnzDesk.saveDragAndDrop = saveDragAndDrop;
    return businessAnzDesk;
}

function BiviewBusinessMapModeDesktopUtils() {
    let businessAnzDesk = new Object();

    function getShieldStartingPoints() {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_map_mode_desktop;
        let callback = function (res) {
            renderExpressionSelector(res, activeDesktop, "biBusinessStartingPointList", true);
            // activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ELEMENT_TO_EXPRESSION"];
            getShieldsOfShieldType();
        };
        serviceFunctions.getDropdownTwoOptionsForShieldStartingPoint(backing.object_type.b_control.key, callback);
    }

    function getShieldsOfShieldType() {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.getShields(activeDesktop, "biview", "biBusinessAnzshieldSelector");
    }

    function getAllowedLevels(data) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.getLevels(data, activeDesktop, "biview", "biBusinessAnzlevelSelector");
    }

    function selectExpressionSelected(cb) {
    	let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_map_mode_desktop;
    	selectExpressionSelector(activeDesktop, true, cb);
    }

    function getElementGroups(data) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.getGroups(data, activeDesktop, "biview", "biBusinessAnzgroupSelector");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.getDirectory(activeDesktop, "biview", callback, "biAnzBusinessSearchObject_ElementTypeItem", "showBiStdDirectLinks");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_map_mode_desktop;
        shieldAnalysisUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biAnzBusinessCustomSearchObject_ElementTypeItem");
    }

    function getSelectorForStdMapDesk() {
        let desktopSelector = backing.biview.workspaces.bi_business_workspace.desktops.business_map_mode_desktop.selector;
        return shieldAnalysisUtil.getSelector(desktopSelector);
    }

    function shieldSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.shieldClick(activeDesktop, selectedElement);
    }

    function levelSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.levelClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function expressionSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.expressionClick(activeDesktop, selectedElement);
    }

    function selectClickedGroup(selectedGroupId, elementIdOfClickedArc, objectTypeOfClickedArc) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.selectClickedGroup(activeDesktop, "biBusinessAnzgroupSelectorItem", selectedGroupId, elementIdOfClickedArc, objectTypeOfClickedArc, "biview");
    }

    function showDirectLinks() {
        $("#saveData").show();
        getDirectoryView();
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_map_mode_desktop;
        businessAnalysisUtil.refresh(activeDesktop, "biview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("business_map_mode_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForStdMapDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("business_map_mode_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
        // addDragAndDropCommon(true);
        // removeCircularLinkDropDown(busLufId,true);
    }

     //added by Manish for drag and drop
     function saveDragAndDrop(){
        let isBiView = true;
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiView);
        let genericElement={children};

        service.saveBusinessMapModeDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            getShieldsOfShieldType();
            hideDragAndDropSaveBtn(isBiView);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    businessAnzDesk.getSelector = getSelectorForStdMapDesk;
    businessAnzDesk.getShieldStartingPoints = getShieldStartingPoints;
    businessAnzDesk.shieldSelectorClick = shieldSelectorClick;
    businessAnzDesk.levelSelectorClick = levelSelectorClick;
    businessAnzDesk.groupSelectorClick = groupSelectorClick;
    businessAnzDesk.getAllowedLevels = getAllowedLevels;
    businessAnzDesk.getElementGroups = getElementGroups;
    businessAnzDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    businessAnzDesk.expressionSelectorClick = expressionSelectorClick;
    businessAnzDesk.getDirectoryView = getDirectoryView;
    businessAnzDesk.showDirectLinks = showDirectLinks;
    businessAnzDesk.searchObjectElementClick = searchObjectElementClick;
    businessAnzDesk.fullRefresh = refreshFullDesktop;
    businessAnzDesk.selectClickedGroup = selectClickedGroup;
    businessAnzDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    businessAnzDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    businessAnzDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    businessAnzDesk.selectExpressionSelected= selectExpressionSelected;
    businessAnzDesk.addDragAndDrop = addDragAndDrop;
    businessAnzDesk.saveDragAndDrop = saveDragAndDrop;
    return businessAnzDesk;
}