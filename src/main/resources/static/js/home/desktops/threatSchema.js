let threatLufId;
$(document).ready(function () {
    $(document).on("click", ".threatSchemaShieldSelectorItem", function (e) {
        threatLufId=$(this).attr("elementId");
        let threatSchemaDesktopUtil = new ThreatSchemaDesktopUtils();
        threatSchemaDesktopUtil.shieldSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".threatSchemaGroupSelectorItem", function (e) {
        let threatSchemaDesktopUtil = new ThreatSchemaDesktopUtils();
        threatSchemaDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".threatSchemaSearchObject_ElementTypeItem", function (e) {
        let threatSchemaDesktopUtil = new ThreatSchemaDesktopUtils();
        let dropDownId = "single_threat_sch_desk_search_dropdown_content";
        let selectedId = "single_threat_sch_desk_search_dropdown_selected";
        threatSchemaDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".threatSchemaCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_threat_sch_desk_custom_search_dropdown_content";
        let selectedId = "single_threat_sch_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
    /*bi Threat Schema selector*/
    $(document).on("click", ".biThreatSchemaShieldSelectorItem", function (e) {
        threatLufId=$(this).attr("elementId");
        let threatSchemaDesktopUtil = new BiviewThreatSchemaDesktopUtils();
        threatSchemaDesktopUtil.shieldSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biThreatSchemaGroupSelectorItem", function (e) {
        let threatSchemaDesktopUtil = new BiviewThreatSchemaDesktopUtils();
        threatSchemaDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biThreatSchemaSearchObject_ElementTypeItem", function (e) {
        let threatSchemaDesktopUtil = new BiviewThreatSchemaDesktopUtils();
        let dropDownId = "bi_threat_sch_desk_search_dropdown_content";
        let selectedId = "bi_threat_sch_desk_search_dropdown_selected";
        threatSchemaDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biThreatSchemaCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_threat_sch_desk_custom_search_dropdown_content";
        let selectedId = "bi_threat_sch_desk_custom_search_dropdown_selected";f
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
    /*bi threat Schema selector*/
});

function ThreatSchemaDesktopUtils() {
    let threatSchDesk = new Object();

    function getShieldsOfShieldType() {
        let activeDesktop = backing.singleview.workspaces.threat_workspace.desktops.threat_schema_desktop;
        let selectorId = activeDesktop.selector.shield_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        previousSelector={shieldSelectorId: threatLufId};
        let callback = function (res) {
            serviceFunctions.getDefaultShieldPrefs((defaultPrefs) => {
                renderSchemaSelectorDropDown(activeDesktop, res.children, "threatSchemaShieldSelector", false, defaultPrefs);
                shieldSelector(previousSelector, selectorId, shieldSelectorClick);
            });
        };
        serviceFunctions.getShieldOfThreatType(callback);
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
            renderSelectorDropDown(activeDesktop, res.children, "groupSelector", "threatSchemaGroupSelector", data);
            groupSelector(previousSelector, dropDownId, getLiFromGroupDropDownSelector, activeDesktop.utilsFunction.groupSelectorClick, "threatSchemaGroupSelector");
        };
        serviceFunctions.getGroupsOfShieldGivenMaxLevel(data, callback);
    }

    function getDirectoryView() {
        let data = {};
        data.shieldId = parseInt($("#single_threat_sch_desk_shield_dropdown_selected").attr("elementId"));
        data.level = 0;
        data.shieldElementGroupId = parseInt($("#single_threat_sch_desk_groups_dropdown_selected").attr("elementId"));
        data.showExpression = false;
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }

        $("#saveData").show();
        service.getShieldDv(data, function (res, err) {
            if (res) {
                let activeDesktop = backing.singleview.workspaces.threat_workspace.desktops.threat_schema_desktop;
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
                        renderObjectTypesAndElementTypesDropDown(objectTypesAndElementTypes, activeDesktop, "threatSchemaSearchObject_ElementTypeItem");
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
                renderElementList(res, "threat_sch_elementTypeList");
            }
            else if (err) {

            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.threat_workspace.desktops.threat_schema_desktop;
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
        renderCustomSearchDropDown(selectedElement.attr("randomId"), activeDesktop, "threatSchemaCustomSearchObject_ElementTypeItem");
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
        str += "<li class=\"createElementType \" view=\"threatSchema\" elementId=\"0\">+ Create Threat Vector Type</li>";
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
                    $("#single_threat_sch_desk_shield_dropdown_selected").html(selectedElement.find(".dropdownIcon").html() + selectedElement.find(".acronym").html());
                    $("#single_threat_sch_desk_shield_dropdown_selected").attr("title", selectedElement.attr("title"));
                    $("#single_threat_sch_desk_shield_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));
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
        let activeDesktop = backing.singleview.workspaces.threat_workspace.desktops.threat_schema_desktop;
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

    function getSelectorForThreatSchema() {
        let desktopSelector = backing.singleview.workspaces.threat_workspace.desktops.threat_schema_desktop.selector;
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
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("threat_schema_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("threat_schema_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
        addDragAndDropCommon();
    }

    //added by Manish for drag and drop
    function saveDragAndDrop(){
        $("#saveData").show();

        let desktop=getActiveDesktop();
        let shiledObj=desktop.utilsFunction.getSelector();
        let children=getTreeDataForActiveDeskTop(false);
        let genericElement={shieldId:shiledObj.shieldId,children};

        service.saveShieldDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            // getShieldsOfShieldType();
            const event = {"key": backing.event_type.deleted_threat_element.key};
            propagateEvent(event);
            hideDragAndDropSaveBtn();
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    threatSchDesk.getSelector = getSelectorForThreatSchema;
    threatSchDesk.getGroups = getGroups;
    threatSchDesk.groupSelectorClick = groupClick;
    threatSchDesk.getElementTypeList = getElementTypeList;
    threatSchDesk.shieldSelectorClick = shieldSelectorClick;
    threatSchDesk.renderSchemaSelectorDropDown = renderSchemaSelectorDropDown;
    threatSchDesk.renderElementList = renderElementList;
    threatSchDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    threatSchDesk.getDirectoryView = getDirectoryView;
    threatSchDesk.searchObjectElementClick = searchObjectElementClick;
    threatSchDesk.fullRefresh = refreshFullDesktop;
    threatSchDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh
    threatSchDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    threatSchDesk.saveDragAndDrop = saveDragAndDrop;
    threatSchDesk.addDragAndDrop = addDragAndDrop;
    return threatSchDesk;
}

function BiviewThreatSchemaDesktopUtils() {
    let threatSchDesk = new Object();

    function getShieldsOfShieldType() {
        let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_schema_desktop;
        let selectorId = activeDesktop.selector.shield_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        previousSelector={shieldSelectorId: threatLufId};
        let callback = function (res) {
            serviceFunctions.getDefaultShieldPrefs((defaultPrefs) => {
                renderSchemaSelectorDropDown(activeDesktop, res.children, "biThreatSchemaShieldSelector", true, defaultPrefs);
                shieldSelector(previousSelector, selectorId, shieldSelectorClick);
            });
        };
        serviceFunctions.getShieldOfThreatType(callback);
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
            renderSelectorDropDown(activeDesktop, res.children, "groupSelector", "biThreatSchemaGroupSelector", data);
            groupSelector(previousSelector, dropDownId, getLiFromGroupDropDownSelector, activeDesktop.utilsFunction.groupSelectorClick, "biThreatSchemaGroupSelector");
        };
        serviceFunctions.getGroupsOfShieldGivenMaxLevel(data, callback);
    }

    function getDirectoryView() {
        let data = {};
        data.shieldId = parseInt($("#bi_threat_sch_desk_shield_dropdown_selected").attr("elementId"));
        data.level = 0;
        data.shieldElementGroupId = parseInt($("#bi_threat_sch_desk_groups_dropdown_selected").attr("elementId"));
        data.showExpression = false;
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }

        $("#saveData").show();
        service.getShieldDv(data, function (res, err) {
            if (res) {
                let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_schema_desktop;
                modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
                let directoryViewTreeId = activeDesktop.tree_container_id;
                if (activeDesktop) {
                    generateUniqueIdAndParentLink(res, activeDesktop.div_id, null);
                    backing.biview.dvDataUseAttr = res;
                    let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                    if (objectTypesAndElementTypes) {
                        renderObjectTypesAndElementTypesDropDown(objectTypesAndElementTypes, activeDesktop, "biThreatSchemaSearchObject_ElementTypeItem");
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
                renderElementList(res, "bi_threat_sch_elementTypeList");
            }
            else if (err) {

            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_schema_desktop;
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
        renderCustomSearchDropDown(selectedElement.attr("randomId"), activeDesktop, "biThreatSchemaCustomSearchObject_ElementTypeItem");
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
        str += "<li class=\"createElementType \" view=\"threatSchema\" elementId=\"0\">+ Create Threat Vector Type</li>";
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
                    $("#bi_threat_sch_desk_shield_dropdown_selected").html(selectedElement.find(".dropdownIcon").html() + selectedElement.find(".acronym").html());
                    $("#bi_threat_sch_desk_shield_dropdown_selected").attr("title", selectedElement.attr("title"));
                    $("#bi_threat_sch_desk_shield_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));
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
        let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_schema_desktop;
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

    function getSelectorForThreatSchema() {
        var desktopSelector = backing.biview.workspaces.bi_threat_workspace.desktops.threat_schema_desktop.selector;
        var selectorObj = {};
        selectorObj.shieldId = $("#" + desktopSelector.shield_dropdown_selected_id).attr("elementId");
        selectorObj.level = 0;
        selectorObj.shieldElementGroupId = $("#" + desktopSelector.groups_dropdown_selected_id).attr("elementId");
        selectorObj.showExpression = false;

        return selectorObj;
    }

    function refreshFullDesktop() {
        var previousSelection = {};
        let activeDesktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_schema_desktop;
        var desktop = $("#" + activeDesktop.anchor_div_id);
        let shieldSelectorId = activeDesktop.selector.shield_dropdown_selected_id;
        let groupSelectorId = activeDesktop.selector.groups_dropdown_selected_id;
        previousSelection.shieldSelectorId = $("#" + shieldSelectorId).attr("elementId");
        previousSelection.groupSelectorId = $("#" + groupSelectorId).attr("elementId");
        activeDesktop.previousSelectors = previousSelection;
        getAllShieldElementTypes(() => {getShieldsOfShieldType();})

    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("threat_schema_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("threat_schema_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
        addDragAndDropCommon(true);
    }

    //added by Manish for drag and drop
    function saveDragAndDrop(){
        $("#saveData").show();
        let isBiView = true;
        let desktop=getActiveDesktop(isBiView);
        let shiledObj=desktop.utilsFunction.getSelector();
        let children=getTreeDataForActiveDeskTop(isBiView);
        let genericElement={shieldId:shiledObj.shieldId,children};

        service.saveShieldDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            // getShieldsOfShieldType();
            const event = {"key": backing.event_type.deleted_threat_element.key};
            propagateEvent(event);
            hideDragAndDropSaveBtn(isBiView);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    threatSchDesk.getSelector = getSelectorForThreatSchema;
    threatSchDesk.getGroups = getGroups;
    threatSchDesk.groupSelectorClick = groupSelectorClick;
    threatSchDesk.getElementTypeList = getElementTypeList;
    threatSchDesk.shieldSelectorClick = shieldSelectorClick;
    threatSchDesk.renderSchemaSelectorDropDown = renderSchemaSelectorDropDown;
    threatSchDesk.renderElementList = renderElementList;
    threatSchDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    threatSchDesk.getDirectoryView = getDirectoryView;
    threatSchDesk.searchObjectElementClick = searchObjectElementClick;
    threatSchDesk.fullRefresh = refreshFullDesktop;
    threatSchDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    threatSchDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    threatSchDesk.addDragAndDrop = addDragAndDrop;
    threatSchDesk.saveDragAndDrop = saveDragAndDrop;
    return threatSchDesk;
}