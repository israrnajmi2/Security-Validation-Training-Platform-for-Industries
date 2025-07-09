$(document).ready(function () {
    $(document).on("click", ".anzshieldSelectorItem", function (e) {
        lufShieldId = $(this).attr("elementId");
        let ClassificationMapModeDesktopUtil = new ClassificationMapModeDesktopUtils();
        ClassificationMapModeDesktopUtil.shieldSelectorClick($(this));
        removeCircularLinkDropDown(lufShieldId,false);
        e.stopPropagation();
    });

    $(document).on("click", ".anzlevelSelectorItem", function (e) {
        let ClassificationMapModeDesktopUtil = new ClassificationMapModeDesktopUtils();
        ClassificationMapModeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".anzgroupSelectorItem", function (e) {
        let ClassificationMapModeDesktopUtil = new ClassificationMapModeDesktopUtils();
        ClassificationMapModeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".StartingPointList", function (e) {
        let ClassificationMapModeDesktopUtil = new ClassificationMapModeDesktopUtils();
        if ($("#closeAssociationViewclassification_map_mode_desk").length > 0)
            $("#closeAssociationViewclassification_map_mode_desk").trigger("click");
        ClassificationMapModeDesktopUtil.expressionSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".anzSearchObject_ElementTypeItem", function (e) {
        let ClassificationMapModeDesktopUtil = new ClassificationMapModeDesktopUtils();
        let dropDownId = "single_classification_map_mode_desk_search_dropdown_content";
        let selectedId = "single_classification_map_mode_desk_search_dropdown_selected";
        ClassificationMapModeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".anzCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_classification_map_mode_desk_custom_search_dropdown_content";
        let selectedId = "single_classification_map_mode_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#showDirectLinks", function (e) {
        let ClassificationMapModeDesktopUtil = new ClassificationMapModeDesktopUtils();
        ClassificationMapModeDesktopUtil.showDirectLinks();
        e.stopPropagation();
    });

 


    
    
    /*bi shield ANZ selector*/
    $(document).on("click", ".biAnzshieldSelectorItem", function (e) {
        lufShieldId = $(this).attr("elementId");
        let ClassificationMapModeDesktopUtil = new BiviewClassificationMapModeDesktopUtils();
        ClassificationMapModeDesktopUtil.shieldSelectorClick($(this));
        removeCircularLinkDropDown(lufShieldId,true);
        e.stopPropagation();
    });

    $(document).on("click", ".biAnzlevelSelectorItem", function (e) {
        let ClassificationMapModeDesktopUtil = new BiviewClassificationMapModeDesktopUtils();
        ClassificationMapModeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biAnzgroupSelectorItem", function (e) {
        let ClassificationMapModeDesktopUtil = new BiviewClassificationMapModeDesktopUtils();
        ClassificationMapModeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biStartingPointList", function (e) {
        let ClassificationMapModeDesktopUtil = new BiviewClassificationMapModeDesktopUtils();
        if ($("#closeAssociationViewbi_classification_map_mode_desk").length > 0)
            $("#closeAssociationViewbi_classification_map_mode_desk").trigger("click");
        ClassificationMapModeDesktopUtil.expressionSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biAnzSearchObject_ElementTypeItem", function (e) {
        let ClassificationMapModeDesktopUtil = new BiviewClassificationMapModeDesktopUtils();
        let dropDownId = "bi_classification_map_mode_desk_search_dropdown_content";
        let selectedId = "bi_classification_map_mode_desk_search_dropdown_selected";
        ClassificationMapModeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biAnzCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_classification_map_mode_desk_custom_search_dropdown_content";
        let selectedId = "bi_classification_map_mode_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#showBiDirectLinks", function (e) {
        let ClassificationMapModeDesktopUtil = new BiviewClassificationMapModeDesktopUtils();
        ClassificationMapModeDesktopUtil.showDirectLinks();
        e.stopPropagation();
    });

    /*bi shield ANZ selector*/
});
const shieldAnalysisUtil = new ShieldAnalysisUtils;

function ShieldAnalysisUtils() {
    function getShields(activeDesktop, view, classParam) {
        prin("getShields");
        let dropDownId = activeDesktop.selector.shield_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        previousSelector = { shieldSelectorId: lufShieldId };
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
        serviceFunctions.getShieldOfShieldType(callback);
    }

    function getLevels(data, activeDesktop, view, classParam) {
        prin("getLevels");
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
        prin("getGroups");
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
        prin("getDirectory");
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
        data.dropDownOneShieldId = parseInt($(`#${activeDesktop.selector.shield_dropdown_selected_id}`).attr("elementId"));
        data.dropDownOneLevelOfInterest = parseInt($(`#${activeDesktop.selector.level_dropdown_selected_id}`).attr("elementId"));
        data.dropDownOneGroupId = parseInt($(`#${activeDesktop.selector.groups_dropdown_selected_id}`).attr("elementId"));
        data.dropDownTwoProtectionType = $expressionDropDownSelected.attr("protectionType");
        data.dropDownTwoShieldId = $expressionDropDownSelected.attr("shieldId");
        data.dropDownTwoStartingPoint = $expressionDropDownSelected.attr("startingPoint");
        if ($("#" + showDirectLinksId).is(':checked'))
            data.showDirectLinksInExpressionMode = true;
        else
            data.showDirectLinksInExpressionMode = false;

        if ((typeof(data.dropDownOneShieldId) === "undefined") || (parseInt(data.dropDownOneShieldId) === 0)) {
            $("#saveData").hide();
            return;
        }

        $("#saveData").show();
        service.getShieldFullMapToOtherStartingPoint(data, function (res, err) {
            if (res) {
                prin("getDirectory: received dv response from api");
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
                     prin("getDirectory: applied expansion state");
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
        prin("searchClick");
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
        prin("getSelector");
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
        else if ($expressionSelector.find(".disableSelector").hasClass("active")) {
            selectorObj.showExpression = false;
        }
        return selectorObj;
    }

    function shieldClick(activeDesktop, selectedElement) {
        prin("shieldClick");
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
        activeDesktop.utilsFunction.selectExpressionSelected(() => {
            // activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ELEMENT_TO_EXPRESSION"];
            activeDesktop.utilsFunction.getAllowedLevels(data);
        });
    }

    function levelClick(activeDesktop, selectedElement) {
        prin("levelClick");
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
        prin("groupClick");
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
        prin("expressionClick");
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
        prin("refresh");
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
        prin("selectClickedGroup");
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

function ClassificationMapModeDesktopUtils() {
    let shieldAnzDesk = new Object();

    function getShieldStartingPoints() {
        prin("getShieldStartingPoints");
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.classification_map_mode_desktop;
        let callback = function (res) {
            renderExpressionSelector(res, activeDesktop, "StartingPointList", false);
            getShieldsOfShieldType();
        };
        serviceFunctions.getDropdownTwoOptionsForShieldStartingPoint(backing.object_type.shield_element.key, callback);
    }

    function getShieldsOfShieldType() {
        prin("getShieldsOfShieldType");
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.getShields(activeDesktop, "singleview", "anzshieldSelector");
    }

    function getAllowedLevels(data) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.getLevels(data, activeDesktop, "singleview", "anzlevelSelector");
    }

    function selectExpressionSelected(cb) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.classification_map_mode_desktop;
        selectExpressionSelector(activeDesktop, false, cb);
    }

    function getElementGroups(data) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.getGroups(data, activeDesktop, "singleview", "anzgroupSelector");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.getDirectory(activeDesktop, "singleview", callback, "anzSearchObject_ElementTypeItem", "showDirectLinks");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "anzCustomSearchObject_ElementTypeItem");
    }

    function shieldSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.shieldClick(activeDesktop, selectedElement);
    }

    function levelSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.levelClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function expressionSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.expressionClick(activeDesktop, selectedElement);
    }

    function getSelectorForClaMapDesk() {
        let desktopSelector = backing.singleview.workspaces.cla_workspace.desktops.classification_map_mode_desktop.selector;
        return shieldAnalysisUtil.getSelector(desktopSelector);
    }

    function selectClickedGroup(selectedGroupId, elementIdOfClickedArc, objectTypeOfClickedArc) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.selectClickedGroup(activeDesktop, "anzgroupSelectorItem", selectedGroupId, elementIdOfClickedArc, objectTypeOfClickedArc, "singleview");
    }
    

    function showDirectLinks() {
        $("#saveData").show();
        getDirectoryView();
    }
    
    

    function refreshFullDesktop() {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.refresh(activeDesktop, "singleview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
    prin("areThereAnyEventsThatTriggerFullRefresh");
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("classification_map_mode_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
    prin("areThereAnyEventsThatTriggerSoftRefresh");
        let selectors = getSelectorForClaMapDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("classification_map_mode_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

     //added by Manish for drag and drop
    function saveDragAndDrop(){
    prin("saveDragAndDrop");
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(false);
        let genericElement={children};
        service.saveClassificationMapModeDesktopDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            getShieldsOfShieldType();
            hideDragAndDropSaveBtn();
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });

    }

    //added for drag and drop by Manish
    function addDragAndDrop() {
    prin("addDragAndDrop");
        /*let selectorId=getActiveDesktopTreeSelectorId(false);
        $("#"+selectorId).sortable({
            items : "li[id]",
            toleranceElement: '> div',
            dropOnEmpty: true,
            change: function(event, ui) {
                let isAllowed=true;
                if(isAllowed) {
                    ui.placeholder.css({visibility: 'visible', border : '1px dotted blue'});
                }else{
                    ui.placeholder.css({visibility: 'visible', border : '1px dotted red'});
                }
                
            },
            update : function(event, ui) {
                updateTextOnDrop(event,ui)
            }
        });

        removeCircularLinkDropDown(lufShieldId,false);*/
    }

    shieldAnzDesk.getSelector = getSelectorForClaMapDesk;
    shieldAnzDesk.getShieldStartingPoints = getShieldStartingPoints;
    shieldAnzDesk.shieldSelectorClick = shieldSelectorClick;
    shieldAnzDesk.levelSelectorClick = levelSelectorClick;
    shieldAnzDesk.groupSelectorClick = groupSelectorClick;
    shieldAnzDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    shieldAnzDesk.getElementGroups = getElementGroups;
    shieldAnzDesk.getAllowedLevels = getAllowedLevels;
    shieldAnzDesk.expressionSelectorClick = expressionSelectorClick;
    shieldAnzDesk.getDirectoryView = getDirectoryView;
    shieldAnzDesk.showDirectLinks = showDirectLinks;
    shieldAnzDesk.searchObjectElementClick = searchObjectElementClick;
    shieldAnzDesk.fullRefresh = refreshFullDesktop;
    shieldAnzDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    shieldAnzDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    shieldAnzDesk.selectClickedGroup = selectClickedGroup;
    shieldAnzDesk.saveDragAndDrop = saveDragAndDrop;
    shieldAnzDesk.addDragAndDrop = addDragAndDrop;
    shieldAnzDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    shieldAnzDesk.selectExpressionSelected= selectExpressionSelected;
    return shieldAnzDesk;
}

function BiviewClassificationMapModeDesktopUtils() {
    let shieldAnzDesk = new Object();

    function getShieldStartingPoints() {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.classification_map_mode_desktop;
        let callback = function (res) {
            renderExpressionSelector(res, activeDesktop, "biStartingPointList", true);
            // activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ELEMENT_TO_EXPRESSION"];
            getShieldsOfShieldType();
        };
        serviceFunctions.getDropdownTwoOptionsForShieldStartingPoint(backing.object_type.shield_element.key, callback);
    }

    function getShieldsOfShieldType() {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.getShields(activeDesktop, "biview", "biAnzshieldSelector");
    }

    function getAllowedLevels(data) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.getLevels(data, activeDesktop, "biview", "biAnzlevelSelector");
    }

    function selectExpressionSelected(cb) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.classification_map_mode_desktop;
        selectExpressionSelector(activeDesktop, true, cb);
    }

    function getElementGroups(data) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.getGroups(data, activeDesktop, "biview", "biAnzgroupSelector");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.getDirectory(activeDesktop, "biview", callback, "biAnzSearchObject_ElementTypeItem", "showBiDirectLinks");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biAnzCustomSearchObject_ElementTypeItem");
    }

    function getSelectorForClaMapDesk() {
        let desktopSelector = backing.biview.workspaces.bi_cla_workspace.desktops.classification_map_mode_desktop.selector;
        return shieldAnalysisUtil.getSelector(desktopSelector);
    }

    function shieldSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.shieldClick(activeDesktop, selectedElement);
    }

    function levelSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.levelClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function expressionSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.expressionClick(activeDesktop, selectedElement);
    }

    function selectClickedGroup(selectedGroupId, elementIdOfClickedArc, objectTypeOfClickedArc) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.selectClickedGroup(activeDesktop, "biAnzgroupSelectorItem", selectedGroupId, elementIdOfClickedArc, objectTypeOfClickedArc, "biview");
    }

    function showDirectLinks() {
        $("#saveData").show();
        getDirectoryView();
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.classification_map_mode_desktop;
        shieldAnalysisUtil.refresh(activeDesktop, "biview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("classification_map_mode_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForClaMapDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("classification_map_mode_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }


    //added by Manish for drag and drop
    function saveDragAndDrop(){
        let isBiview=true;
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiview);
        let genericElement={children};
        service.saveClassificationMapModeDesktopDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            getShieldsOfShieldType();
            hideDragAndDropSaveBtn(isBiview);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });

    }

    //added for drag and drop by Manish
    function addDragAndDrop() {
        /*let isBiview=true;
        let selectorId=getActiveDesktopTreeSelectorId(isBiview);
        $("#"+selectorId).sortable({
            items : "li[id]",
            toleranceElement: '> div',
            dropOnEmpty: true,
            change: function(event, ui) {
                let isAllowed=true;
                if(isAllowed) {
                    ui.placeholder.css({visibility: 'visible', border : '1px dotted blue'});
                }else{
                    ui.placeholder.css({visibility: 'visible', border : '1px dotted red'});
                }
                
            },
            update : function(event, ui) {
                updateTextOnDrop(event,ui,isBiview)
            }
        });

        removeCircularLinkDropDown(lufShieldId,true);*/
    }

    shieldAnzDesk.getSelector = getSelectorForClaMapDesk;
    shieldAnzDesk.getShieldStartingPoints = getShieldStartingPoints;
    shieldAnzDesk.shieldSelectorClick = shieldSelectorClick;
    shieldAnzDesk.levelSelectorClick = levelSelectorClick;
    shieldAnzDesk.groupSelectorClick = groupSelectorClick;
    shieldAnzDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    shieldAnzDesk.getAllowedLevels = getAllowedLevels;
    shieldAnzDesk.getElementGroups = getElementGroups;
    shieldAnzDesk.expressionSelectorClick = expressionSelectorClick;
    shieldAnzDesk.getDirectoryView = getDirectoryView;
    shieldAnzDesk.showDirectLinks = showDirectLinks;
    shieldAnzDesk.searchObjectElementClick = searchObjectElementClick;
    shieldAnzDesk.selectClickedGroup = selectClickedGroup;
    shieldAnzDesk.fullRefresh = refreshFullDesktop;
    shieldAnzDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    shieldAnzDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    shieldAnzDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    shieldAnzDesk.selectExpressionSelected= selectExpressionSelected;
    shieldAnzDesk.saveDragAndDrop = saveDragAndDrop;
    shieldAnzDesk.addDragAndDrop = addDragAndDrop;
    return shieldAnzDesk;
}
