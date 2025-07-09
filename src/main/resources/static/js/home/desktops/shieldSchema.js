let lufShieldId;

$(document).ready(function () {
    $(document).on("click", ".schemaShieldSelectorItem", function (e) {
        lufShieldId = $(this).attr("elementId");
        let shieldSchemaDesktopUtil = new ShieldSchemaDesktopUtils();
        shieldSchemaDesktopUtil.shieldSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".schemaGroupSelectorItem", function (e) {
        let shieldSchemaDesktopUtil = new ShieldSchemaDesktopUtils();
        shieldSchemaDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".shieldSchemaSearchObject_ElementTypeItem", function (e) {
        let shieldSchemaDesktopUtil = new ShieldSchemaDesktopUtils();
        let dropDownId = "single_sh_sch_desk_search_dropdown_content";
        let selectedId = "single_sh_sch_desk_search_dropdown_selected";
        shieldSchemaDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".shieldSchemaCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_sh_sch_desk_custom_search_dropdown_content";
        let selectedId = "single_sh_sch_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
    //bi click

    $(document).on("click", ".biSchemaShieldSelectorItem", function (e) {
        lufShieldId = $(this).attr("elementId");
        let shieldSchemaDesktopUtil = new BiviewShieldSchemaDesktopUtils();
        shieldSchemaDesktopUtil.shieldSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biSchemaGroupSelectorItem", function (e) {
        let shieldSchemaDesktopUtil = new BiviewShieldSchemaDesktopUtils();
        shieldSchemaDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biShieldSchemaSearchObject_ElementTypeItem", function (e) {
        let shieldSchemaDesktopUtil = new BiviewShieldSchemaDesktopUtils();
        let dropDownId = "bi_sh_sch_desk_search_dropdown_content";
        let selectedId = "bi_sh_sch_desk_search_dropdown_selected";
        shieldSchemaDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biShieldSchemaCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_sh_sch_desk_custom_search_dropdown_content";
        let selectedId = "bi_sh_sch_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
});

function ShieldSchemaDesktopUtils() {
    let shieldSchDesk = new Object();

    function getShieldsOfShieldType() {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.shield_schema_desktop;
        let selectorId = activeDesktop.selector.shield_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        previousSelector = {shieldSelectorId: lufShieldId}; 

        let callback = function (res) {
            serviceFunctions.getDefaultShieldPrefs((defaultPrefs) => {
                renderSchemaSelectorDropDown(activeDesktop, res.children, "schemaShieldSelector", false, defaultPrefs);
                shieldSelector(previousSelector, selectorId, shieldSelectorClick);
            });
        };
        serviceFunctions.getShieldOfShieldType(callback);
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
            renderSelectorDropDown(activeDesktop, res.children, "groupSelector", "schemaGroupSelector", data);
            groupSelector(previousSelector, dropDownId, getLiFromGroupDropDownSelector, activeDesktop.utilsFunction.groupSelectorClick, "schemaGroupSelector");
        };
        serviceFunctions.getGroupsOfShieldGivenMaxLevel(data, callback);
    }

    function getElementTypeList(data) {
        service.getShieldElementTypes(data, function (res, err) {
            if (res) {
                let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.shield_schema_desktop;
                if (activeDesktop) {
                    generateUniqueIdAndParentLink(res, activeDesktop.div_id, null);
                    renderElementList(res, "sh_sch_elementTypeList");
                }
            }
            else if (err) {

            }
        });
    }

    function getDirectoryView() {
        let data = {};
        data.shieldId = parseInt($("#single_sh_sch_desk_shield_dropdown_selected").attr("elementId"));
        data.level = 0;
        data.shieldElementGroupId = parseInt($("#single_sh_sch_desk_groups_dropdown_selected").attr("elementId"));
        data.showExpression = false;
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }
        $("#saveData").show();
        service.getShieldDv(data, function (res, err) {
            if (res) {
                let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.shield_schema_desktop;
                let directoryViewTreeId = activeDesktop.tree_container_id;
                modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
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
                        renderObjectTypesAndElementTypesDropDown(objectTypesAndElementTypes, activeDesktop, "shieldSchemaSearchObject_ElementTypeItem");
                    }
                    let oldExpansionState = getExpansionStateOfElements(activeDesktop.tree_container_id);
                    renderSchemaDirectoryView(res, directoryViewTreeId, "singleview", "anchorView", false);
                    // applyExpansionState(oldExpansionState, activeDesktop.tree_container_id);
                    let ringViewDivId = backing.view_type.ring_view.name + "_" + activeDesktop.div_id;
                    activeDesktop.elementIdAndObjectArray = null;
                    if ($("#" + ringViewDivId).hasClass("active"))
                        updateViewsStandards(ringViewDivId, res);
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

    function renderElementList(renderData, idOfParentDiv) {
        console.log("renderElementList", renderData, idOfParentDiv);
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.shield_schema_desktop;
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
                str += renderElementListLi(renderData.children[i], selector, data, false, false, true);
            }
        }
        str += "<li class=\"createElementType \" view=\"shieldSchema\" elementId=\"0\">+ Create Control Type</li>";
        str += "</ul>";
        $("#" + idOfParentDiv).html(str);
    }

    function shieldSelectorClick(selectedElement) {
        function canHaveCreateShieldElementHotlink(data, isBiView, $shieldSelector) {
            let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.shield_schema_desktop;
            service.getTypesThatCanHaveCreateShieldElementHotlink(data.shieldId, function (res, err) {
                if (res) {
                    activeDesktop.canHaveCreateShieldElementHotlink = res;
                    $("#saveData").show();
                    $(".desktop-selector-dropdown-content").addClass("dis-none");
                    $shieldSelector.html(selectedElement.find(".dropdownIcon").html() + selectedElement.find(".acronym").html());
                    $shieldSelector.attr("title", selectedElement.attr("title"));
                    $shieldSelector.attr("elementId", selectedElement.attr("elementId"));
                    getElementTypeList(data.shieldId);
                    getGroups(data, activeDesktop);
                }
                else if (err) {
                    $("#saveData").hide();
                }
            });
        }

        let data = {};
        let $shieldSelector = $("#single_sh_sch_desk_shield_dropdown_selected");
        data.shieldId = selectedElement.attr("elementId");
        data.level = 0;
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }
        canHaveCreateShieldElementHotlink(data, false, $shieldSelector);
    }

    function groupClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.shield_schema_desktop;
        let $dropDown = $(".desktop-selector-dropdown-content");
        if (!selectedElement) {
            $dropDown.addClass("dis-none");
            return;
        }
        let $groupsSelected = $(`#${activeDesktop.selector.groups_dropdown_selected_id}`);
        $("#saveData").show();
        $dropDown.addClass("dis-none");
        if(selectedElement.attr("elementId") !== "0" && selectedElement.attr("level") == "0") {
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

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.shield_schema_desktop;
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
        renderCustomSearchDropDown(selectedElement.attr("randomId"), activeDesktop, "shieldSchemaCustomSearchObject_ElementTypeItem");
    }

    function getSelectorForClaSchema() {
        let desktopSelector = backing.singleview.workspaces.cla_workspace.desktops.shield_schema_desktop.selector;
        let selectorObj = {};
        selectorObj.shieldId = $("#" + desktopSelector.shield_dropdown_selected_id).attr("elementId");
        selectorObj.level = 0;
        selectorObj.shieldElementGroupId = $("#" + desktopSelector.groups_dropdown_selected_id).attr("elementId");
        selectorObj.showExpression = false;
        return selectorObj;
    }

    function refreshFullDesktop() {
        let previousSelection = {};
        let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.shield_schema_desktop;
        let shieldSelectorId = activeDesktop.selector.shield_dropdown_selected_id;
        let groupSelectorId = activeDesktop.selector.groups_dropdown_selected_id;
        previousSelection.shieldSelectorId = $("#" + shieldSelectorId).attr("elementId");
        previousSelection.groupSelectorId = $("#" + groupSelectorId).attr("elementId");
        activeDesktop.previousSelectors = previousSelection;
        getAllShieldElementTypes(() => {
            getShieldsOfShieldType();
        })

    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("shield_schema_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("shield_schema_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
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
            const event = {"key": backing.event_type.deleted_shield_element.key};
            propagateEvent(event);
            // getShieldsOfShieldType();
            hideDragAndDropSaveBtn();
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }
    
    shieldSchDesk.getSelector = getSelectorForClaSchema;
    shieldSchDesk.getGroups = getGroups;
    shieldSchDesk.groupSelectorClick = groupClick;
    shieldSchDesk.shieldSelectorClick = shieldSelectorClick;
    shieldSchDesk.renderSchemaSelectorDropDown = renderSchemaSelectorDropDown;
    shieldSchDesk.renderElementList = renderElementList;
    shieldSchDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    shieldSchDesk.getElementTypeList = getElementTypeList;
    shieldSchDesk.getDirectoryView = getDirectoryView;
    shieldSchDesk.searchObjectElementClick = searchObjectElementClick;
    shieldSchDesk.fullRefresh = refreshFullDesktop;
    shieldSchDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh
    shieldSchDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    shieldSchDesk.saveDragAndDrop= saveDragAndDrop;
    return shieldSchDesk;
}

function BiviewShieldSchemaDesktopUtils() {
    let shieldSchDesk = new Object();

    function getShieldsOfShieldType() {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.shield_schema_desktop;
        let selectorId = activeDesktop.selector.shield_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        previousSelector = { shieldSelectorId: lufShieldId };
        let callback = function (res) {
            serviceFunctions.getDefaultShieldPrefs((defaultPrefs) => {
                renderSchemaSelectorDropDown(activeDesktop, res.children, "biSchemaShieldSelector", true, defaultPrefs);
                shieldSelector(previousSelector, selectorId, shieldSelectorClick);
            });
        };
        serviceFunctions.getShieldOfShieldType(callback);
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
            renderSelectorDropDown(activeDesktop, res.children, "groupSelector", "biSchemaGroupSelector", data);
            groupSelector(previousSelector, dropDownId, getLiFromGroupDropDownSelector, activeDesktop.utilsFunction.groupSelectorClick, "biSchemaGroupSelector");
        };
        serviceFunctions.getGroupsOfShieldGivenMaxLevel(data, callback);
    }

    function getElementTypeList(data) {
        service.getShieldElementTypes(data, function (res, err) {
            if (res) {
                let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.shield_schema_desktop;
                if (activeDesktop) {
                    generateUniqueIdAndParentLink(res, activeDesktop.div_id, null);
                    renderElementList(res, "bi_sh_sch_elementTypeList");
                }
            }
            else if (err) {

            }
        });
    }

    function getDirectoryView() {
        let data = {};
        data.shieldId = parseInt($("#bi_sh_sch_desk_shield_dropdown_selected").attr("elementId"));
        data.level = 0;
        data.shieldElementGroupId = parseInt($("#bi_sh_sch_desk_groups_dropdown_selected").attr("elementId"));
        data.showExpression = false;

        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }
        $("#saveData").show();
        service.getShieldDv(data, function (res, err) {
            if (res) {
                let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.shield_schema_desktop;
                let directoryViewTreeId = activeDesktop.tree_container_id;
                modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
                if (activeDesktop) {
                    generateUniqueIdAndParentLink(res, activeDesktop.div_id, null);
                    backing.biview.dvDataUseAttr = res;
                    let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                    if (objectTypesAndElementTypes) {
                        renderObjectTypesAndElementTypesDropDown(objectTypesAndElementTypes, activeDesktop, "biShieldSchemaSearchObject_ElementTypeItem");
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
                    applyExpansionState(oldExpansionState, directoryViewTreeId);
                    $("#saveData").hide();
                }
                else {
                    errorHandler(err)
                    // alert("error");
                    $("#saveData").hide();
                }
            }
            else if (err) {
                $("#saveData").hide();
            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.shield_schema_desktop;
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
        renderCustomSearchDropDown(selectedElement.attr("randomId"), activeDesktop, "biShieldSchemaCustomSearchObject_ElementTypeItem");
    }

    function renderElementList(renderData, idOfParentDiv) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.shield_schema_desktop;
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
                str += renderElementListLi(renderData.children[i], selector, data, false, true, true);
            }
        }
        str += "<li class=\"createElementType \" view=\"shieldSchema\" elementId=\"0\">+ Create Control Type</li>";
        str += "</ul>";

        $("#" + idOfParentDiv).html(str);
    }

    function shieldSelectorClick(selectedElement) {
        function canHaveCreateShieldElementHotlink(data, isBiView, $selectorShield) {
            let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);

            service.getTypesThatCanHaveCreateShieldElementHotlink(data.shieldId, function (res, err) {
                if (res) {
                    activeDesktop.canHaveCreateShieldElementHotlink = res;
                    $("#saveData").show();
                    $(".desktop-selector-dropdown-content").addClass("dis-none");
                    $selectorShield.html(selectedElement.find(".dropdownIcon").html() + selectedElement.find(".acronym").html());
                    $selectorShield.attr("title", selectedElement.attr("title"));
                    $selectorShield.attr("elementId", selectedElement.attr("elementId"));
                    getElementTypeList(data.shieldId);
                    getGroups(data, activeDesktop);
                }
                else if (err) {
                    $("#saveData").hide();
                }
            });
        }

        let data = {};
        let $selectorShield = $("#bi_sh_sch_desk_shield_dropdown_selected");
        data.shieldId = selectedElement.attr("elementId");
        data.level = 0;
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }
        canHaveCreateShieldElementHotlink(data, true, $selectorShield);
    }

    function groupSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.shield_schema_desktop;
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
        } else {
            $groupsSelected.parent().find(".groupIcon").addClass("opacityDull");
            $groupsSelected.html("");
        }
        $groupsSelected.attr("title", $groupsSelected.html());
        $groupsSelected.attr("elementId", selectedElement.attr("elementId"));
        getDirectoryView();
    }

    function getSelectorForClaSchema() {
        var desktopSelector = backing.biview.workspaces.bi_cla_workspace.desktops.shield_schema_desktop.selector;
        var selectorObj = {};
        selectorObj.shieldId = $("#" + desktopSelector.shield_dropdown_selected_id).attr("elementId");
        selectorObj.level = 0;
        selectorObj.shieldElementGroupId = $("#" + desktopSelector.groups_dropdown_selected_id).attr("elementId");
        selectorObj.showExpression = false;

        return selectorObj;
    }

    function refreshFullDesktop() {
        var previousSelection = {};
        let activeDesktop = backing.biview.workspaces.bi_cla_workspace.desktops.shield_schema_desktop;
        var desktop = $("#" + activeDesktop.anchor_div_id);
        let shieldSelectorId = activeDesktop.selector.shield_dropdown_selected_id;
        let groupSelectorId = activeDesktop.selector.groups_dropdown_selected_id;
        previousSelection.shieldSelectorId = $("#" + shieldSelectorId).attr("elementId");
        previousSelection.groupSelectorId = $("#" + groupSelectorId).attr("elementId");
        activeDesktop.previousSelectors = previousSelection;
        getAllShieldElementTypes(() => {
            getShieldsOfShieldType();
        })

    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("shield_schema_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("shield_schema_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }


    function saveDragAndDrop(){
        let isBiView = true; 
        $("#saveData").show();
        let desktop=getActiveDesktop(isBiView);
        let shiledObj=desktop.utilsFunction.getSelector();
        let children=getTreeDataForActiveDeskTop(isBiView);
        let genericElement={shieldId:shiledObj.shieldId,children};

        service.saveShieldDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            //getShieldsOfShieldType();
            const event = {"key": backing.event_type.deleted_shield_element.key};
            propagateEvent(event);
            hideDragAndDropSaveBtn(isBiView);
            if(res.errorMessage){
                errorMsgHandler(err);
            }
        });
    }

    shieldSchDesk.getSelector = getSelectorForClaSchema;
    shieldSchDesk.getGroups = getGroups;
    shieldSchDesk.groupSelectorClick = groupSelectorClick;
    shieldSchDesk.shieldSelectorClick = shieldSelectorClick;
    shieldSchDesk.renderSchemaSelectorDropDown = renderSchemaSelectorDropDown;
    shieldSchDesk.renderElementList = renderElementList;
    shieldSchDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    shieldSchDesk.getElementTypeList = getElementTypeList;
    shieldSchDesk.getDirectoryView = getDirectoryView;
    shieldSchDesk.searchObjectElementClick = searchObjectElementClick;
    shieldSchDesk.fullRefresh = refreshFullDesktop;
    shieldSchDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh
    shieldSchDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    shieldSchDesk.saveDragAndDrop = saveDragAndDrop;
    return shieldSchDesk;
}