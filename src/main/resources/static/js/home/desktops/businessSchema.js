let busLufId;

$(document).ready(function () {
    $(document).on("click", ".businessSchemaShieldSelectorItem", function (e) {
        busLufId=$(this).attr("elementId");
        let BusinessSchemaDesktopUtil = new BusinessSchemaDesktopUtils();
        BusinessSchemaDesktopUtil.shieldSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".businessSchemaGroupSelectorItem", function (e) {
        let BusinessSchemaDesktopUtil = new BusinessSchemaDesktopUtils();
        BusinessSchemaDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".businessSchemaSearchObject_ElementTypeItem", function (e) {
        let BusinessSchemaDesktopUtil = new BusinessSchemaDesktopUtils();
        let dropDownId = "single_business_sch_desk_search_dropdown_content";
        let selectedId = "single_business_sch_desk_search_dropdown_selected";
        BusinessSchemaDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".businessSchemaCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_business_sch_desk_custom_search_dropdown_content";
        let selectedId = "single_business_sch_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
    /*bi Standard Schema selector*/
    $(document).on("click", ".biBusinessSchemaShieldSelectorItem", function (e) {
        busLufId=$(this).attr("elementId");
        let BusinessSchemaDesktopUtil = new BiviewBusinessSchemaDesktopUtils();
        BusinessSchemaDesktopUtil.shieldSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessSchemaGroupSelectorItem", function (e) {
        let BusinessSchemaDesktopUtil = new BiviewBusinessSchemaDesktopUtils();
        BusinessSchemaDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessSchemaSearchObject_ElementTypeItem", function (e) {
        let BusinessSchemaDesktopUtil = new BiviewBusinessSchemaDesktopUtils();
        let dropDownId = "bi_business_sch_desk_search_dropdown_content";
        let selectedId = "bi_business_sch_desk_search_dropdown_selected";
        BusinessSchemaDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biBusinessSchemaCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_business_sch_desk_custom_search_dropdown_content";
        let selectedId = "bi_business_sch_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
    /*bi standard Schema selector*/
});

const businessUtil = new businessUtils;

function businessUtils() {
    function getShields(activeDesktop, view, classParam) {
        let dropDownId = activeDesktop.selector.shield_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        previousSelector = {shieldSelectorId: busLufId}; 
        let callback = function (res) {
            serviceFunctions.getDefaultShieldPrefs((defaultPrefs) => {
                renderSchemaSelectorDropDown(activeDesktop, res.children, classParam, view == "biview", defaultPrefs);
                shieldSelector(previousSelector, dropDownId, activeDesktop.utilsFunction.shieldSelectorClick);
            });
        };
        serviceFunctions.getShieldOfBusinessType(callback);
    }

    function getGroups(data, activeDesktop, view, classParam) {
        let dropDownId = activeDesktop.selector.groups_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        let callback = function (res) {
            let idOfParentDiv = dropDownId,
                viewName = "groupView",
                isRoot = false;
            let data = {idOfParentDiv, view, viewName, isRoot};
            renderSelectorDropDown(activeDesktop, res.children, "groupSelector", classParam, data);
            groupSelector(previousSelector, dropDownId, getLiFromGroupDropDownSelector, activeDesktop.utilsFunction.groupSelectorClick, classParam);
        };
        serviceFunctions.getGroupsOfShieldGivenMaxLevel(data, callback);
    }

    function getDirectory(activeDesktop, view, callback, classOfObjectTypeElementType) {
        let backingview, isBiview = isBiViewOrNot(view);
        if (view === "singleview") {
            backingview = backing.singleview;
        }
        else if (view === "biview") {
            backingview = backing.biview;
        }
        let data = {};
        data.shieldId = parseInt($(`#${activeDesktop.selector.shield_dropdown_selected_id}`).attr("elementId"));
        data.level = 0;
        data.shieldElementGroupId = parseInt($(`#${activeDesktop.selector.groups_dropdown_selected_id}`).attr("elementId"));
        data.showExpression = false;
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }
        $("#saveData").show();
        service.getShieldDv(data, function (res, err) {
            if (res) {
                modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
                let directoryViewTreeId = activeDesktop.tree_container_id;
                if (activeDesktop) {
                    generateUniqueIdAndParentLink(res, activeDesktop.div_id, null);
                    backingview.dvDataUseAttr = res;
                    if (activeDesktop.sortBy === undefined)
                        activeDesktop.sortBy = false;
                    if (activeDesktop.sortBy === true)
                        sortChildrenAlphbetically(res);
                    activeDesktop.directoryJson = res;
                    let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                    if (objectTypesAndElementTypes) {
                        renderObjectTypesAndElementTypesDropDown(objectTypesAndElementTypes, activeDesktop, classOfObjectTypeElementType);
                    }
                    let oldExpansionState = getExpansionStateOfElements(activeDesktop.tree_container_id);
                    renderSchemaDirectoryView(res, directoryViewTreeId, view, "anchorView", isBiview);
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

    function getElementTypeList(data, activeDesktop, view, listClass) {
        service.getShieldElementTypes(data, function (res, err) {
            if (res) {
                renderElementList(activeDesktop, view, res, listClass);
            }
            else if (err) {

            }
        });
    }

    function renderElementList(activeDesktop, view, renderData, idOfParentDiv) {
        let isBiview = isBiViewOrNot(view);
        let selectorDropDown = activeDesktop.selector.shield_dropdown_id;
        generateUniqueIdAndParentLink(renderData, activeDesktop.div_id, null);
        let str = "";
        let selector = "elementList";
        let data = {};
        data.idOfParentDiv = selectorDropDown;
        data.view = view;
        data.viewName = "schemaView";
        data.isRoot = false;
        str += "<ul class=\"elementListUl\">";
        if (renderData && renderData.children) {
            for (let i = 0; i < renderData.children.length; i++) {
                str += renderElementListLi(renderData.children[i], selector, data, false, isBiview);
            }
        }
        str += "<li class=\"createElementType \" view=\"BusinessSchema\" elementId=\"0\">+ Create Value Process Type</li>";
        str += "</ul>";
        $("#" + idOfParentDiv).html(str);
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

    function shieldClick(activeDesktop, selectedElement) {
        function canHaveCreateShieldElementHotlink(data) {
            service.getTypesThatCanHaveCreateShieldElementHotlink(data.shieldId, function (res, err) {
                if (res) {
                    activeDesktop.canHaveCreateShieldElementHotlink = res;
                    let $shieldSelected = $(`#${activeDesktop.selector.shield_dropdown_selected_id}`);
                    $(".desktop-selector-dropdown-content").addClass("dis-none");
                    if (selectedElement.find(".dropdownIcon").html() !== undefined)
                        $shieldSelected.html(selectedElement.find(".dropdownIcon").html() + selectedElement.find(".acronym").html());
                    else
                        $shieldSelected.html(selectedElement.html());
                    $shieldSelected.attr("title", selectedElement.attr("title"));
                    $shieldSelected.attr("elementId", selectedElement.attr("elementId"));
                    activeDesktop.utilsFunction.getElementTypeList(data.shieldId);
                    activeDesktop.utilsFunction.getElementGroups(data);
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

    function groupClick(activeDesktop, selectedElement, callback) {
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
        activeDesktop.utilsFunction.getDirectoryView(callback)
    }

    function getSelector(desktopSelector) {
        let selectorObj = {};
        selectorObj.shieldId = $("#" + desktopSelector.shield_dropdown_selected_id).attr("elementId");
        selectorObj.level = 0;
        selectorObj.shieldElementGroupId = $("#" + desktopSelector.groups_dropdown_selected_id).attr("elementId");
        selectorObj.showExpression = false;
        return selectorObj;
    }

    function refresh(activeDesktop) {
        let previousSelection = {};
        let shieldSelectorId = activeDesktop.selector.shield_dropdown_selected_id;
        let groupSelectorId = activeDesktop.selector.groups_dropdown_selected_id;
        previousSelection.shieldSelectorId = $("#" + shieldSelectorId).attr("elementId");
        previousSelection.groupSelectorId = $("#" + groupSelectorId).attr("elementId");
        getAllShieldElementTypes(() => {
            activeDesktop.utilsFunction.getShieldsOfShieldType();
        })
    }

    return {
        getShields,
        getGroups,
        getDirectory,
        getElementTypeList,
        searchClick,
        groupClick,
        getSelector,
        shieldClick,
        refresh
    };
}

function BusinessSchemaDesktopUtils() {
    let businessSchDesk = new Object();

    function getShieldsOfShieldType() {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_schema_desktop;
        businessUtil.getShields(activeDesktop, "singleview", "businessSchemaShieldSelector");
    }

    function getElementGroups(data) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_schema_desktop;
        businessUtil.getGroups(data, activeDesktop, "singleview", "businessSchemaGroupSelector");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_schema_desktop;
        businessUtil.getDirectory(activeDesktop, "singleview", callback, "businessSchemaSearchObject_ElementTypeItem");
    }

    function getElementTypeList(data) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_schema_desktop;
        businessUtil.getElementTypeList(data, activeDesktop, "singleview", "business_sch_elementTypeList");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_schema_desktop;
        businessUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "businessSchemaCustomSearchObject_ElementTypeItem");
    }

    function shieldSelectorClick(selectedElement) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_schema_desktop;
        businessUtil.shieldClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_schema_desktop;
        businessUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function getSelectorForStdSchema() {
        let desktopSelector = backing.singleview.workspaces.business_workspace.desktops.business_schema_desktop.selector;
        return businessUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.singleview.workspaces.business_workspace.desktops.business_schema_desktop;
        businessUtil.refresh(activeDesktop);
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("business_schema_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("business_schema_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
        addDragAndDropCommon();
    }

     //added by Manish for drag and drop
     function saveDragAndDrop(){
        $("#saveData").show();
        let treeId=getActiveDesktopTreeSelectorId(false);

        let desktop=getActiveDesktop();
        let shiledObj=desktop.utilsFunction.getSelector();
        let children=getTreeDataForActiveDeskTop(false);
        let genericElement={shieldId:shiledObj.shieldId,children};

        service.saveShieldDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            // refreshFullDesktop();
            const event = {"key": backing.event_type.deleted_business_control.key};
            propagateEvent(event);
            hideDragAndDropSaveBtn();
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }


    businessSchDesk.getSelector = getSelectorForStdSchema;
    businessSchDesk.getElementGroups = getElementGroups;
    businessSchDesk.getElementTypeList = getElementTypeList;
    businessSchDesk.shieldSelectorClick = shieldSelectorClick;
    businessSchDesk.groupSelectorClick = groupSelectorClick;
    businessSchDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    businessSchDesk.getDirectoryView = getDirectoryView;
    businessSchDesk.searchObjectElementClick = searchObjectElementClick;
    businessSchDesk.fullRefresh = refreshFullDesktop;
    businessSchDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    businessSchDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    businessSchDesk.saveDragAndDrop = saveDragAndDrop;
    businessSchDesk.addDragAndDrop = addDragAndDrop;
    return businessSchDesk;
}

function BiviewBusinessSchemaDesktopUtils() {
    let businessSchDesk = new Object();

    function getShieldsOfShieldType() {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_schema_desktop;
        businessUtil.getShields(activeDesktop, "biview", "biBusinessSchemaShieldSelector");
    }

    function getElementGroups(data) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_schema_desktop;
        businessUtil.getGroups(data, activeDesktop, "biview", "biBusinessSchemaGroupSelector");
    }

    function getDirectoryView(callback) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_schema_desktop;
        businessUtil.getDirectory(activeDesktop, "biview", callback, "biBusinessSchemaSearchObject_ElementTypeItem");
    }

    function getElementTypeList(data) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_schema_desktop;
        businessUtil.getElementTypeList(data, activeDesktop, "biview", "bi_business_sch_elementTypeList");
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_schema_desktop;
        businessUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "BibusinessSchemaCustomSearchObject_ElementTypeItem");
    }

    function shieldSelectorClick(selectedElement) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_schema_desktop;
        businessUtil.shieldClick(activeDesktop, selectedElement);
    }

    function groupSelectorClick(selectedElement, callback) {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_schema_desktop;
        businessUtil.groupClick(activeDesktop, selectedElement, callback);
    }

    function getSelectorForStdSchema() {
        let desktopSelector = backing.biview.workspaces.bi_business_workspace.desktops.business_schema_desktop.selector;
        return businessUtil.getSelector(desktopSelector);
    }

    function refreshFullDesktop() {
        let activeDesktop = backing.biview.workspaces.bi_business_workspace.desktops.business_schema_desktop;
        businessUtil.refresh(activeDesktop);
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("business_schema_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("business_schema_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
        addDragAndDropCommon(true);
    }

     //added by Manish for drag and drop
     function saveDragAndDrop(){
        let isBiView = true;
        $("#saveData").show();
        let treeId=getActiveDesktopTreeSelectorId(isBiView);

        let desktop=getActiveDesktop();
        let shiledObj=desktop.utilsFunction.getSelector();
        let children=getTreeDataForActiveDeskTop(isBiView);
        let genericElement={shieldId:shiledObj.shieldId,children};

        service.saveShieldDragAndDrop(genericElement, function (res, err) {
            $("#saveData").hide();
            // refreshFullDesktop();
            const event = {"key": backing.event_type.deleted_business_control.key};
            propagateEvent(event);
            hideDragAndDropSaveBtn(isBiView);
            if(res.errorMessage){
                errorMsgHandler(res);
            }
        });
    }

    businessSchDesk.getSelector = getSelectorForStdSchema;
    businessSchDesk.getElementGroups = getElementGroups;
    businessSchDesk.getElementTypeList = getElementTypeList;
    businessSchDesk.shieldSelectorClick = shieldSelectorClick;
    businessSchDesk.groupSelectorClick = groupSelectorClick;
    businessSchDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    businessSchDesk.getDirectoryView = getDirectoryView;
    businessSchDesk.searchObjectElementClick = searchObjectElementClick;
    businessSchDesk.fullRefresh = refreshFullDesktop;
    businessSchDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    businessSchDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    businessSchDesk.saveDragAndDrop = saveDragAndDrop;
    businessSchDesk.addDragAndDrop = addDragAndDrop;
    return businessSchDesk;
}