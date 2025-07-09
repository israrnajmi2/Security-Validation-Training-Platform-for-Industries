$(document).ready(function () {
    $(document).on("click", ".groupSelectorAnzExpressionItem", function (e) {
        let ExpressionDesktopUtil = new AnzExpressionDesktopUtils();
        ExpressionDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".anzExpressionSearchObject_ElementTypeItem", function (e) {
        let ExpressionDesktopUtil = new AnzExpressionDesktopUtils();
        let dropDownId = "single_anz_expression_desk_search_dropdown_content";
        let selectedId = "single_anz_expression_desk_search_dropdown_selected";
        ExpressionDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".anzExpressionCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_anz_expression_desk_custom_search_dropdown_content";
        let selectedId = "single_anz_expression_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".anzExpressionProtectionList", function (e) {
        let ExpressionDesktopUtil = new AnzExpressionDesktopUtils();
        if ($("#closeAssociationViewanz_expression_desk").length > 0)
            $("#closeAssociationViewanz_expression_desk").trigger("click");
        ExpressionDesktopUtil.expressionSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".assocExpressionShort", function (e) {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.expression_desktop;
        let directoryViewTreeId = activeDesktop.tree_container_id;
        let desktop = $("#" + directoryViewTreeId).closest(".innerDesktop");
        desktop.find(".assoc-exp-mode").removeClass("active");
        $(this).addClass("active");
        renderDirectoryView(activeDesktop.directoryJson, directoryViewTreeId, "singleview", "anchorView", false);
        e.stopPropagation();
    });

    $(document).on("click", ".assocExpressionExpand", function (e) {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.expression_desktop;
        let directoryViewTreeId = activeDesktop.tree_container_id;
        let desktop = $("#" + directoryViewTreeId).closest(".innerDesktop");
        desktop.find(".assoc-exp-mode").removeClass("active");
        $(this).addClass("active");
        renderDirectoryView(activeDesktop.directoryJson, directoryViewTreeId, "singleview", "anchorView_full", false);
        e.stopPropagation();
    });

    $(document).on("click", ".bigroupSelectorAnzExpressionItem", function (e) {
        let ExpressionDesktopUtil = new BiViewAnzExpressionDesktopUtils();
        ExpressionDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biAnzExpressionSearchObject_ElementTypeItem", function (e) {
        let ExpressionDesktopUtil = new BiViewAnzExpressionDesktopUtils();
        let dropDownId = "bi_anz_expression_desk_search_dropdown_content";
        let selectedId = "bi_anz_expression_desk_search_dropdown_selected";
        ExpressionDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biAnzExpressionCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_anz_expression_desk_custom_search_dropdown_content";
        let selectedId = "bi_anz_expression_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biAnzExpressionProtectionList", function (e) {
        let ExpressionDesktopUtil = new BiViewAnzExpressionDesktopUtils();
        if ($("#closeAssociationViewbi_anz_expression_desk").length > 0)
            $("#closeAssociationViewbi_anz_expression_desk").trigger("click");
        ExpressionDesktopUtil.expressionSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biAssocExpressionShort", function (e) {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.expression_desktop;
        let directoryViewTreeId = activeDesktop.tree_container_id;
        let desktop = $("#" + directoryViewTreeId).closest(".innerDesktop");
        desktop.find(".assoc-exp-mode").removeClass("active");
        $(this).addClass("active");
        renderDirectoryView(activeDesktop.directoryJson, directoryViewTreeId, "biview", "anchorView", true);
        e.stopPropagation();
    });

    $(document).on("click", ".biAssocExpressionExpand", function (e) {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.expression_desktop;
        let directoryViewTreeId = activeDesktop.tree_container_id;
        let desktop = $("#" + directoryViewTreeId).closest(".innerDesktop");
        desktop.find(".assoc-exp-mode").removeClass("active");
        $(this).addClass("active");
        renderDirectoryView(activeDesktop.directoryJson, directoryViewTreeId, "biview", "anchorView_full", true);
        e.stopPropagation();
    });
});

const expressionAnzUtil = new expressionAnzUtils;

function expressionAnzUtils() {
    function getGroups(activeDesktop, view, classParam) {
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
        serviceFunctions.getAllExpressionGroups(callback);
    }

    function getDirectory(activeDesktop, view, callback, classOfObjectTypeElementType) {
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
        let protectionSelectedId = $(`#${activeDesktop.selector.expression_dropdown_selected_id}`);
        data.dropDownOneGroupId = parseInt($(`#${activeDesktop.selector.groups_dropdown_selected_id}`).attr("elementId"));
        data.dropDownTwoProtectionType = protectionSelectedId.attr("protectionType");
        data.dropDownTwoShieldId = protectionSelectedId.attr("shieldId");
        data.dropDownTwoStartingPoint = protectionSelectedId.attr("startingPoint");
        $("#saveData").show();
        service.getExpressionAnalyzeModeDv(data, function (res, err) {
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
        let protectionId = $("#" + desktopSelector.expression_dropdown_selected_id);
        selectorObj.expressionGroupId = $("#" + desktopSelector.groups_dropdown_selected_id).attr("elementId");
        selectorObj.dropDownTwoProtectionType = protectionId.attr("protectionType");
        selectorObj.dropDownTwoShieldId = protectionId.attr("shieldId");
        selectorObj.dropDownTwoStartingPoint = protectionId.attr("startingPoint");
        selectorObj.dropDownTwoHtml = protectionId.html();
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
            startingPoint = selectedElement.attr("startingPoint"),
            protectionType = (selectedElement.attr("protectionType") === "dummy" ? undefined : selectedElement.attr("protectionType")),
            shieldId = selectedElement.attr("shieldId"),
            objectType = selectedElement.attr("objectType"),
            linkNameAttr = selectedElement.attr("linkName");
        // $(`#${activeDesktop.selector.expression_label_indirect_id}`).find("label").html(constants.labels[startingPoint]);
        let selectedExpressionObj = {
            selectedHtml,
            label,
            startingPoint,
            protectionType,
            shieldId,
            objectType,
            linkNameAttr
        };
        // let str = "";
        // if (objectType === "shield")
        //     str += '<span class="mapToIcon flaticon-shield-element"></span><label class="labelText">Controls of</label>';
        // else if (objectType === "standard")
        //     str += '<span class="mapToIcon flaticon-standard-element"></span><label class="labelText">Controls of</label>';
        // $expressionDropDownSelected.html(str);
        // $expressionDropDownSelected.append(selectedExpressionObj.selectedHtml);
        // $expressionDropDownSelected.attr("title", label);
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

    function refresh(activeDesktop) {
        let previousSelection = {};
        let groupSelectorId = activeDesktop.selector.groups_dropdown_selected_id;
        previousSelection.shieldSelectorId = $("#" + groupSelectorId).attr("elementId");
        activeDesktop.previousSelectors = previousSelection;
        activeDesktop.utilsFunction.getShieldStartingPoints();
    }

    return {getGroups, getDirectory, searchClick, getSelector, groupClick, expressionClick, refresh};
}

function AnzExpressionDesktopUtils() {
    let ExpDesk = new Object();

    function getShieldStartingPoints() {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.anz_expression_desktop;
        let callback = function (res) {
            renderExpressionSelector(res, activeDesktop, "anzExpressionProtectionList", false);
            selectExpressionSelector(activeDesktop, false, () => {
                getElementGroups();
            });
        };
        serviceFunctions.getDropdownTwoOptionsForAnzExpressionStartingPoint(callback);
    }

    function getElementGroups() {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.anz_expression_desktop;
        expressionAnzUtil.getGroups(activeDesktop, "singleview", "groupSelectorAnzExpression");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.anz_expression_desktop;
        expressionAnzUtil.getDirectory(activeDesktop, "singleview", callback, "anzExpressionSearchObject_ElementTypeItem");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.anz_expression_desktop;
        expressionAnzUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "anzExpressionCustomSearchObject_ElementTypeItem");
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.anz_expression_desktop;
        expressionAnzUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function expressionSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.anz_expression_desktop;
        expressionAnzUtil.expressionClick(activeDesktop, selectedElement);
    }

    function getSelectorForExpressionDesk() {
        let desktopSelector = backing.singleview.workspaces.expression_workspace.desktops.anz_expression_desktop.selector;
        return expressionAnzUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.anz_expression_desktop;
        expressionAnzUtil.refresh(activeDesktop, "singleview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("anz_expression_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForExpressionDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("anz_expression_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    ExpDesk.getSelector = getSelectorForExpressionDesk;
    ExpDesk.getShieldStartingPoints = getShieldStartingPoints;
    ExpDesk.groupSelectorClick = groupSelectorClick;
    ExpDesk.expressionSelectorClick = expressionSelectorClick;
    ExpDesk.getElementGroups = getElementGroups;
    ExpDesk.getDirectoryView = getDirectoryView;
    ExpDesk.searchObjectElementClick = searchObjectElementClick;
    ExpDesk.fullRefresh = refreshFullDesktop;
    ExpDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    ExpDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    ExpDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    return ExpDesk;
}

function BiViewAnzExpressionDesktopUtils() {
    let ExpDesk = new Object();

    function getShieldStartingPoints() {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.anz_expression_desktop;
        let callback = function (res) {
            renderExpressionSelector(res, activeDesktop, "biAnzExpressionProtectionList", true);
            selectExpressionSelector(activeDesktop, true, () => {
                getElementGroups();
            });
        };
        serviceFunctions.getDropdownTwoOptionsForAnzExpressionStartingPoint(callback);
    }

    function getElementGroups() {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.anz_expression_desktop;
        expressionAnzUtil.getGroups(activeDesktop, "biview", "bigroupSelectorAnzExpression");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.anz_expression_desktop;
        expressionAnzUtil.getDirectory(activeDesktop, "biview", callback, "biAnzExpressionSearchObject_ElementTypeItem");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.anz_expression_desktop;
        expressionAnzUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biAnzExpressionCustomSearchObject_ElementTypeItem");
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.anz_expression_desktop;
        expressionAnzUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function expressionSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.anz_expression_desktop;
        expressionAnzUtil.expressionClick(activeDesktop, selectedElement);
    }

    function getSelectorForExpressionDesk() {
        let desktopSelector = backing.biview.workspaces.bi_expression_workspace.desktops.anz_expression_desktop.selector;
        return expressionAnzUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.anz_expression_desktop;
        expressionAnzUtil.refresh(activeDesktop, "biview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("anz_expression_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForExpressionDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("anz_expression_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    ExpDesk.getShieldStartingPoints = getShieldStartingPoints;
    ExpDesk.expressionSelectorClick = expressionSelectorClick;
    ExpDesk.groupSelectorClick = groupSelectorClick;
    ExpDesk.getElementGroups = getElementGroups;
    ExpDesk.getDirectoryView = getDirectoryView;
    ExpDesk.searchObjectElementClick = searchObjectElementClick;
    ExpDesk.fullRefresh = refreshFullDesktop;
    ExpDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    ExpDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    ExpDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    return ExpDesk;
}