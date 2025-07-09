$(document).ready(function () {
    $(document).on("click", ".groupSelectorExpressionItem", function (e) {
        let ExpressionDesktopUtil = new ExpressionDesktopUtils();
        ExpressionDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".expressionSearchObject_ElementTypeItem", function (e) {
        let ExpressionDesktopUtil = new ExpressionDesktopUtils();
        let dropDownId = "single_expression_desk_search_dropdown_content";
        let selectedId = "single_expression_desk_search_dropdown_selected";
        ExpressionDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".expressionCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_expression_desk_custom_search_dropdown_content";
        let selectedId = "single_expression_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".bigroupSelectorExpressionItem", function (e) {
        let ExpressionDesktopUtil = new BiViewExpressionDesktopUtils();
        ExpressionDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biExpressionSearchObject_ElementTypeItem", function (e) {
        let ExpressionDesktopUtil = new BiViewExpressionDesktopUtils();
        let dropDownId = "bi_expression_desk_search_dropdown_content";
        let selectedId = "bi_expression_desk_search_dropdown_selected";
        ExpressionDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biExpressionCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_expression_desk_custom_search_dropdown_content";
        let selectedId = "bi_expression_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

});

const expressionUtil = new expressionUtils;

function expressionUtils() {
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
        data.expressionGroupId = $(`#${activeDesktop.selector.groups_dropdown_selected_id}`).attr("elementId");
        $("#saveData").show();
        service.getExpressionDvWithGroupApplied(data, function (res, err) {
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
        selectorObj.expressionGroupId = $("#" + desktopSelector.groups_dropdown_selected_id).attr("elementId");
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


function ExpressionDesktopUtils() {
    let ExpDesk = new Object();

    function getElementGroups() {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.expression_desktop;
        expressionUtil.getGroups(activeDesktop, "singleview", "groupSelectorExpression");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.expression_desktop;
        expressionUtil.getDirectory(activeDesktop, "singleview", callback, "expressionSearchObject_ElementTypeItem");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.expression_desktop;
        expressionUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "expressionCustomSearchObject_ElementTypeItem");
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.expression_desktop;
        expressionUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function getSelectorForExpressionDesk() {
        let desktopSelector = backing.singleview.workspaces.expression_workspace.desktops.expression_desktop.selector;
        return expressionUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.expression_desktop;
        expressionUtil.refresh(activeDesktop, "singleview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("expression_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForExpressionDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("expression_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    ExpDesk.getSelector = getSelectorForExpressionDesk;
    ExpDesk.groupSelectorClick = groupSelectorClick;
    ExpDesk.getElementGroups = getElementGroups;
    ExpDesk.getDirectoryView = getDirectoryView;
    ExpDesk.searchObjectElementClick = searchObjectElementClick;
    ExpDesk.fullRefresh = refreshFullDesktop;
    ExpDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    ExpDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    return ExpDesk;
}

function BiViewExpressionDesktopUtils() {
    let ExpDesk = new Object();

    function getElementGroups() {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.expression_desktop;
        expressionUtil.getGroups(activeDesktop, "biview", "bigroupSelectorExpression");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.expression_desktop;
        expressionUtil.getDirectory(activeDesktop, "biview", callback, "biExpressionSearchObject_ElementTypeItem");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.expression_desktop;
        expressionUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biExpressionCustomSearchObject_ElementTypeItem");
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.expression_desktop;
        expressionUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function getSelectorForExpressionDesk() {
        let desktopSelector = backing.biview.workspaces.bi_expression_workspace.desktops.expression_desktop.selector;
        return expressionUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.expression_desktop;
        expressionUtil.refresh(activeDesktop, "biview");
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("expression_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let selectors = getSelectorForExpressionDesk();
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("expression_desktop", selectors);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    ExpDesk.groupSelectorClick = groupSelectorClick;
    ExpDesk.getElementGroups = getElementGroups;
    ExpDesk.getDirectoryView = getDirectoryView;
    ExpDesk.searchObjectElementClick = searchObjectElementClick;
    ExpDesk.fullRefresh = refreshFullDesktop;
    ExpDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    ExpDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    return ExpDesk;
}