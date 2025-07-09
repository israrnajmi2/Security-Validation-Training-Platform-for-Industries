let stdLufId;
$(document).ready(function () {
    $(document).on("click", ".stdSchemaShieldSelectorItem", function (e) {
        stdLufId=$(this).attr("elementId");
        let standardSchemaDesktopUtil = new StandardSchemaDesktopUtils();
        standardSchemaDesktopUtil.shieldSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".stdSchemaGroupSelectorItem", function (e) {
        let standardSchemaDesktopUtil = new StandardSchemaDesktopUtils();
        standardSchemaDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".stdSchemaSearchObject_ElementTypeItem", function (e) {
        let standardSchemaDesktopUtil = new StandardSchemaDesktopUtils();
        let dropDownId = "single_std_sch_desk_search_dropdown_content";
        let selectedId = "single_std_sch_desk_search_dropdown_selected";
        standardSchemaDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".stdSchemaCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_std_sch_desk_custom_search_dropdown_content";
        let selectedId = "single_std_sch_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
    /*bi Standard Schema selector*/
    $(document).on("click", ".biStdSchemaShieldSelectorItem", function (e) {
        stdLufId=$(this).attr("elementId");
        let standardSchemaDesktopUtil = new BiviewStandardSchemaDesktopUtils();
        standardSchemaDesktopUtil.shieldSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biStdSchemaGroupSelectorItem", function (e) {
        let standardSchemaDesktopUtil = new BiviewStandardSchemaDesktopUtils();
        standardSchemaDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biStdSchemaSearchObject_ElementTypeItem", function (e) {
        let standardSchemaDesktopUtil = new BiviewStandardSchemaDesktopUtils();
        let dropDownId = "bi_std_sch_desk_search_dropdown_content";
        let selectedId = "bi_std_sch_desk_search_dropdown_selected";
        standardSchemaDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biStdSchemaCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_std_sch_desk_custom_search_dropdown_content";
        let selectedId = "bi_std_sch_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
    /*bi standard Schema selector*/
});

function StandardSchemaDesktopUtils() {
    let stdSchDesk = new Object();

    function getShieldsOfShieldType() {
        let activeDesktop = backing.singleview.workspaces.std_workspace.desktops.standard_schema_desktop;
        let selectorId = activeDesktop.selector.shield_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        previousSelector = {shieldSelectorId: stdLufId};
        let callback = function (res) {
            serviceFunctions.getDefaultShieldPrefs((defaultPrefs) => {
                renderSchemaSelectorDropDown(activeDesktop, res.children, "stdSchemaShieldSelector", false, defaultPrefs);
                shieldSelector(previousSelector, selectorId, shieldSelectorClick);
            });
        };
        serviceFunctions.getShieldOfStandardType(callback);
    }

    function getGroups(data, activeDesktop) {
        let dropDownId = activeDesktop.selector.groups_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;

        let callback = function (res) {
            let idOfParentDiv = dropDownId,
                viewName = "groupView",
                isRoot = false,
                view = "singleview";
            let data = {idOfParentDiv, view, viewName, isRoot};
            renderSelectorDropDown(activeDesktop, res.children, "groupSelector", "stdSchemaGroupSelector", data);
            groupSelector(previousSelector, dropDownId, getLiFromGroupDropDownSelector, activeDesktop.utilsFunction.groupSelectorClick, "stdSchemaGroupSelector");
        };
        serviceFunctions.getGroupsOfShieldGivenMaxLevel(data, callback);
    }

    function getDirectoryView() {
        let data = {};
        data.shieldId = parseInt($("#single_std_sch_desk_shield_dropdown_selected").attr("elementId"));
        data.level = 0;
        data.shieldElementGroupId = parseInt($("#single_std_sch_desk_groups_dropdown_selected").attr("elementId"));
        data.showExpression = false;
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }

        $("#saveData").show();
        service.getShieldDv(data, function (res, err) {
            if (res) {
                let activeDesktop = backing.singleview.workspaces.std_workspace.desktops.standard_schema_desktop;
                modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
                let directoryViewTreeId = activeDesktop.tree_container_id;
                if (activeDesktop) {
                    generateUniqueIdAndParentLink(res, activeDesktop.div_id, null);
                    backing.singleview.dvDataUseAttr = res;
                    if (activeDesktop.sortBy === undefined)
                        activeDesktop.sortBy = false;
                    if (activeDesktop.sortBy === true)
                        sortChildrenAlphbetically(res);
                    activeDesktop.directoryJson = res;
                    let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                    if (objectTypesAndElementTypes) {
                        renderObjectTypesAndElementTypesDropDown(objectTypesAndElementTypes, activeDesktop, "stdSchemaSearchObject_ElementTypeItem");
                    }
                    let oldExpansionState = getExpansionStateOfElements(activeDesktop.tree_container_id);
                    renderSchemaDirectoryView(res, directoryViewTreeId, "singleview", "anchorView", false);
                    // applyExpansionState(oldExpansionState, activeDesktop.tree_container_id);
                    let ringViewDivId = backing.view_type.ring_view.name + "_" + activeDesktop.div_id;
                    activeDesktop.elementIdAndObjectArray = null;
                    if ($("#" + ringViewDivId).hasClass("active"))
                        updateViewsStandards(ringViewDivId, res);
                    refreshGroupRingViews(activeDesktop.opened_views);
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

    function getElementTypeList(data) {
        service.getShieldElementTypes(data, function (res, err) {
            if (res) {
                renderElementList(res, "std_sch_elementTypeList");
            }
            else if (err) {

            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.std_workspace.desktops.standard_schema_desktop;
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
        renderCustomSearchDropDown(selectedElement.attr("randomId"), activeDesktop, "stdSchemaCustomSearchObject_ElementTypeItem");
    }

    function renderElementList(renderData, idOfParentDiv) {
        let activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        let activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        let activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        let selectorDropDown = activeDesktop.selector.shield_dropdown_id;

        generateUniqueIdAndParentLink(renderData, activeDesktop.div_id, null);
        let str = "";
        let selector = "elementList";
        let data = {};
        data.idOfParentDiv = selectorDropDown;
        data.view = "singleview";
        data.viewName = "schemaView";
        data.isRoot = false;
        str += "<ul class=\"elementListUl\">";
        if (renderData && renderData.children) {
            for (let i = 0; i < renderData.children.length; i++) {
                str += renderElementListLi(renderData.children[i], selector, data, false, false);
            }
        }
        str += "<li class=\"createElementType \" view=\"standardSchema\" elementId=\"0\">+ Create Control Type</li>";
        str += "</ul>";

        $("#" + idOfParentDiv).html(str);
    }

    function shieldSelectorClick(selectedElement) {
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, backingSide;
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);

        function canHaveCreateShieldElementHotlink(data) {
            let activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
            let activeDesktopKeyname = backing.singleview.active_desktop.keyname;
            service.getTypesThatCanHaveCreateShieldElementHotlink(data.shieldId, function (res, err) {
                if (res) {
                    backing.singleview.workspaces[activeWorkspaceKeyname].desktops[activeDesktopKeyname].canHaveCreateShieldElementHotlink = res;
                    $(".desktop-selector-dropdown-content").addClass("dis-none");
                    $("#single_std_sch_desk_shield_dropdown_selected").html(selectedElement.find(".dropdownIcon").html() + selectedElement.find(".acronym").html());
                    $("#single_std_sch_desk_shield_dropdown_selected").attr("title", selectedElement.attr("title"));
                    $("#single_std_sch_desk_shield_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));
                    getElementTypeList(data.shieldId);
                    getGroups(data, activeDesktop);
                }
                else if (err) {
                    $("#saveData").hide();
                }
            });
        }

        let data = {};
        data.shieldId = selectedElement.attr("elementId");
        data.level = 0;
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }
        canHaveCreateShieldElementHotlink(data);
    }

    function groupClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.std_workspace.desktops.standard_schema_desktop;
        let $dropDown = $(".desktop-selector-dropdown-content");
        if (!selectedElement) {
            $dropDown.addClass("dis-none");
            return;
        }
        let $groupsSelected = $(`#${activeDesktop.selector.groups_dropdown_selected_id}`);
        $("#saveData").show();
        $dropDown.addClass("dis-none");
        if (selectedElement.attr("elementId") !== "0" && selectedElement.attr("level") == "0") {
            $groupsSelected.html(selectedElement.find(".acronym").html());
            $groupsSelected.parent().find(".groupIcon").removeClass("opacityDull");
        } else if (selectedElement.attr("elementId") !== "0") {
            $groupsSelected.html("L" + selectedElement.attr("level") + " : " + selectedElement.find(".acronym").html());
            $groupsSelected.parent().find(".groupIcon").removeClass("opacityDull");
        }
        else {
            $groupsSelected.parent().find(".groupIcon").addClass("opacityDull");
            $groupsSelected.html("");
        }
        $groupsSelected.attr("title", $groupsSelected.html());
        $groupsSelected.attr("elementId", selectedElement.attr("elementId"));
        getDirectoryView();
    }

    function getSelectorForStdSchema() {
        let desktopSelector = backing.singleview.workspaces.std_workspace.desktops.standard_schema_desktop.selector;
        let selectorObj = {};
        selectorObj.shieldId = $("#" + desktopSelector.shield_dropdown_selected_id).attr("elementId");
        selectorObj.level = 0;
        selectorObj.shieldElementGroupId = $("#" + desktopSelector.groups_dropdown_selected_id).attr("elementId");
        selectorObj.showExpression = false;

        return selectorObj;
    }

    function refreshFullDesktop() {
        let previousSelection = {};
        let activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        let activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        let activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        let desktop = $("#" + activeDesktop.anchor_div_id);
        let shieldSelectorId = activeDesktop.selector.shield_dropdown_selected_id;
        let groupSelectorId = activeDesktop.selector.groups_dropdown_selected_id;
        previousSelection.shieldSelectorId = $("#" + shieldSelectorId).attr("elementId");
        previousSelection.groupSelectorId = $("#" + groupSelectorId).attr("elementId");
        activeDesktop.previousSelectors = previousSelection;
        getAllShieldElementTypes(() => {getShieldsOfShieldType();})

    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("standard_schema_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("standard_schema_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    //added by Manish for drag and drop

    function saveDragAndDrop(){
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(false);
        let shieldId=getSelectorForStdSchema().shieldId;
        let genericElement={shieldId,children};
        service.saveShieldDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            // refreshFullDesktop();
            const event = {"key": backing.event_type.deleted_standard_element.key};
            propagateEvent(event);
            hideDragAndDropSaveBtn();
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    stdSchDesk.getSelector = getSelectorForStdSchema;
    stdSchDesk.getGroups = getGroups;
    stdSchDesk.groupSelectorClick = groupClick;
    stdSchDesk.getElementTypeList = getElementTypeList;
    stdSchDesk.shieldSelectorClick = shieldSelectorClick;
    stdSchDesk.renderSchemaSelectorDropDown = renderSchemaSelectorDropDown;
    stdSchDesk.renderElementList = renderElementList;
    stdSchDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    stdSchDesk.getDirectoryView = getDirectoryView;
    stdSchDesk.searchObjectElementClick = searchObjectElementClick;
    stdSchDesk.fullRefresh = refreshFullDesktop;
    stdSchDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh
    stdSchDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    stdSchDesk.saveDragAndDrop = saveDragAndDrop;
    return stdSchDesk;
}

function BiviewStandardSchemaDesktopUtils() {
    let stdSchDesk = new Object();

    function getShieldsOfShieldType() {
        let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_schema_desktop;
        let selectorId = activeDesktop.selector.shield_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        previousSelector = {shieldSelectorId: stdLufId};
        let callback = function (res) {
            serviceFunctions.getDefaultShieldPrefs((defaultPrefs) => {
                renderSchemaSelectorDropDown(activeDesktop, res.children, "biStdSchemaShieldSelector", true, defaultPrefs);
                shieldSelector(previousSelector, selectorId, shieldSelectorClick);
            });
        };
        serviceFunctions.getShieldOfStandardType(callback);
    }


    function getGroups(data, activeDesktop) {
        let dropDownId = activeDesktop.selector.groups_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;

        let callback = function (res) {
            let idOfParentDiv = dropDownId,
                viewName = "groupView",
                view = "biview",
                isRoot = false;
            let data = {idOfParentDiv, view, viewName, isRoot};
            renderSelectorDropDown(activeDesktop, res.children, "groupSelector", "biStdSchemaGroupSelector", data);
            groupSelector(previousSelector, dropDownId, getLiFromGroupDropDownSelector, activeDesktop.utilsFunction.groupSelectorClick, "biStdSchemaGroupSelector");
        };
        serviceFunctions.getGroupsOfShieldGivenMaxLevel(data, callback);
    }

    function getDirectoryView() {
        let data = {};
        data.shieldId = parseInt($("#bi_std_sch_desk_shield_dropdown_selected").attr("elementId"));
        data.level = 0;
        data.shieldElementGroupId = parseInt($("#bi_std_sch_desk_groups_dropdown_selected").attr("elementId"));
        data.showExpression = false;
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }

        $("#saveData").show();
        service.getShieldDv(data, function (res, err) {
            if (res) {
                let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_schema_desktop;
                modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
                let directoryViewTreeId = activeDesktop.tree_container_id;
                if (activeDesktop) {
                    generateUniqueIdAndParentLink(res, activeDesktop.div_id, null);
                    backing.biview.dvDataUseAttr = res;
                    let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                    if (objectTypesAndElementTypes) {
                        renderObjectTypesAndElementTypesDropDown(objectTypesAndElementTypes, activeDesktop, "biStdSchemaSearchObject_ElementTypeItem");
                    }
                    var oldExpansionState = getExpansionStateOfElements(directoryViewTreeId);
                    if (activeDesktop.sortBy === undefined)
                        activeDesktop.sortBy = false;
                    if (activeDesktop.sortBy === true)
                        sortChildrenAlphbetically(res);
                    activeDesktop.directoryJson = res;
                    renderSchemaDirectoryView(res, directoryViewTreeId, "biview", "anchorView", true);
                    // applyExpansionState(oldExpansionState, directoryViewTreeId);
                    var ringViewDivId = backing.view_type.ring_view.name + "_" + activeDesktop.div_id;
                    activeDesktop.elementIdAndObjectArray = null;
                    if ($("#" + ringViewDivId).hasClass("active"))
                        updateViewsStandards(ringViewDivId, res);
                    refreshGroupRingViews(activeDesktop.opened_views);
                    applyExpansionState(oldExpansionState, directoryViewTreeId);
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

    function getElementTypeList(data) {
        service.getShieldElementTypes(data, function (res, err) {
            if (res) {
                renderElementList(res, "bi_std_sch_elementTypeList");
            }
            else if (err) {

            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_schema_desktop;
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
        renderCustomSearchDropDown(selectedElement.attr("randomId"), activeDesktop, "biStdSchemaCustomSearchObject_ElementTypeItem");
    }

    function renderElementList(renderData, idOfParentDiv) {
        let activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        let activeDesktopKeyname = backing.biview.active_desktop.keyname;
        let activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        let selectorDropDown = activeDesktop.selector.shield_dropdown_id;

        generateUniqueIdAndParentLink(renderData, activeDesktop.div_id, null);
        var str = "";
        var selector = "elementList";
        var data = {};
        data.idOfParentDiv = selectorDropDown;
        data.view = "biview";
        data.viewName = "schemaView";
        data.isRoot = false;
        str += "<ul class=\"elementListUl\">";
        if (renderData && renderData.children) {
            for (let i = 0; i < renderData.children.length; i++) {
                str += renderElementListLi(renderData.children[i], selector, data, false, true);
            }
        }
        str += "<li class=\"createElementType \" view=\"standardSchema\" elementId=\"0\">+ Create Control Type</li>";
        str += "</ul>";

        $("#" + idOfParentDiv).html(str);
    }

    function shieldSelectorClick(selectedElement) {
        let data = {};

        function canHaveCreateShieldElementHotlink(data) {
            let activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            let activeDesktopKeyname = backing.biview.active_desktop.keyname;
            let activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
            service.getTypesThatCanHaveCreateShieldElementHotlink(data.shieldId, function (res, err) {
                if (res) {
                    backing.biview.workspaces[activeWorkspaceKeyname].desktops[activeDesktopKeyname].canHaveCreateShieldElementHotlink = res;
                    $(".desktop-selector-dropdown-content").addClass("dis-none");
                    $("#bi_std_sch_desk_shield_dropdown_selected").html(selectedElement.find(".dropdownIcon").html() + selectedElement.find(".acronym").html());
                    $("#bi_std_sch_desk_shield_dropdown_selected").attr("title", selectedElement.attr("title"));
                    $("#bi_std_sch_desk_shield_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));
                    getElementTypeList(data.shieldId);
                    getGroups(data, activeDesktop);
                }
                else if (err) {
                    $("#saveData").hide();
                }
            });
        }

        data.shieldId = selectedElement.attr("elementId");
        data.level = 0;
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }
        canHaveCreateShieldElementHotlink(data);
    }

    function groupSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_schema_desktop;
        let $dropDown = $(".desktop-selector-dropdown-content");
        if (!selectedElement) {
            $dropDown.addClass("dis-none");
            return;
        }
        let $groupsSelected = $(`#${activeDesktop.selector.groups_dropdown_selected_id}`);
        $("#saveData").show();
        $dropDown.addClass("dis-none");
        if (selectedElement.attr("elementId") !== "0" && selectedElement.attr("level") == "0") {
            $groupsSelected.html(selectedElement.find(".acronym").html());
            $groupsSelected.parent().find(".groupIcon").removeClass("opacityDull");
        }
        else if (selectedElement.attr("elementId") !== "0") {
            $groupsSelected.html("L" + selectedElement.attr("level") + " : " + selectedElement.find(".acronym").html());
            $groupsSelected.parent().find(".groupIcon").removeClass("opacityDull");
        }
        else {
            $groupsSelected.parent().find(".groupIcon").addClass("opacityDull");
            $groupsSelected.html("");
        }
        $groupsSelected.attr("title", $groupsSelected.html());
        $groupsSelected.attr("elementId", selectedElement.attr("elementId"));
        getDirectoryView();
    }

    function getSelectorForStdSchema() {
        var desktopSelector = backing.biview.workspaces.bi_std_workspace.desktops.standard_schema_desktop.selector;
        var selectorObj = {};
        selectorObj.shieldId = $("#" + desktopSelector.shield_dropdown_selected_id).attr("elementId");
        selectorObj.level = 0;
        selectorObj.shieldElementGroupId = $("#" + desktopSelector.groups_dropdown_selected_id).attr("elementId");
        selectorObj.showExpression = false;

        return selectorObj;
    }

    function refreshFullDesktop() {
        var previousSelection = {};
        let activeDesktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_schema_desktop;
        var desktop = $("#" + activeDesktop.anchor_div_id);
        let shieldSelectorId = activeDesktop.selector.shield_dropdown_selected_id;
        let groupSelectorId = activeDesktop.selector.groups_dropdown_selected_id;
        previousSelection.shieldSelectorId = $("#" + shieldSelectorId).attr("elementId");
        previousSelection.groupSelectorId = $("#" + groupSelectorId).attr("elementId");
        activeDesktop.previousSelectors = previousSelection;
        getAllShieldElementTypes(() => {getShieldsOfShieldType();})

    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("standard_schema_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("standard_schema_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    //added by Manish for drag and drop

    function saveDragAndDrop(){
        let isBiView = true;
        $("#saveData").show();
        let children=getTreeDataForActiveDeskTop(isBiView);
        let shieldId=getSelectorForStdSchema().shieldId;
        let genericElement={shieldId,children};
        service.saveShieldDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            //refreshFullDesktop();
            const event = {"key": backing.event_type.deleted_standard_element.key};
            propagateEvent(event);
            hideDragAndDropSaveBtn(isBiView);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    stdSchDesk.getSelector = getSelectorForStdSchema;
    stdSchDesk.getGroups = getGroups;
    stdSchDesk.groupSelectorClick = groupSelectorClick;
    stdSchDesk.getElementTypeList = getElementTypeList;
    stdSchDesk.shieldSelectorClick = shieldSelectorClick;
    stdSchDesk.renderSchemaSelectorDropDown = renderSchemaSelectorDropDown;
    stdSchDesk.renderElementList = renderElementList;
    stdSchDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    stdSchDesk.getDirectoryView = getDirectoryView;
    stdSchDesk.searchObjectElementClick = searchObjectElementClick;
    stdSchDesk.fullRefresh = refreshFullDesktop;
    stdSchDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    stdSchDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    stdSchDesk.saveDragAndDrop = saveDragAndDrop;
    return stdSchDesk;
}