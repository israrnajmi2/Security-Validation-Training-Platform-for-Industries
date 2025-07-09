$(document).ready(function () {
    $(document).on("click", ".orgSearchObject_ElementTypeItem", function (e) {
        let OrganisationalUnitDesktopUtil = new OrganisationalUnitDesktopUtils();
        let dropDownId = "single_organisational_unit_desk_search_dropdown_content";
        let selectedId = "single_organisational_unit_desk_search_dropdown_selected";
        OrganisationalUnitDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".orgCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_organisational_unit_desk_custom_search_dropdown_content";
        let selectedId = "single_organisational_unit_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#single_organisational_checkbox", function (e) {
        let OrganisationalUnitDesktopUtil = new OrganisationalUnitDesktopUtils();
        OrganisationalUnitDesktopUtil.getDirectoryView();
        e.stopPropagation();
    });

    $(document).on("click", "#bi_organisational_checkbox", function (e) {
        let OrganisationalUnitDesktopUtil = new BiViewOrganisationalUnitDesktopUtils();
        OrganisationalUnitDesktopUtil.getDirectoryView();
        e.stopPropagation();
    });

    /* User Desktop*/
    $(document).on("click", ".usersSearchObject_ElementTypeItem", function (e) {
        let UsersDesktopUtil = new UsersDesktopUtils();
        let dropDownId = "single_users_desk_search_dropdown_content";
        let selectedId = "single_users_desk_search_dropdown_selected";
        UsersDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biUsersSearchObject_ElementTypeItem", function (e) {
        let UsersDesktopUtil = new BiViewUsersDesktopUtils();
        let dropDownId = "bi_users_desk_search_dropdown_content";
        let selectedId = "bi_users_desk_search_dropdown_selected";
        UsersDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", "#single_users_checkbox", function (e) {
        let UsersDesktopUtil = new UsersDesktopUtils();
        UsersDesktopUtil.getDirectoryView();
        e.stopPropagation();
    });

    $(document).on("click", "#bi_users_checkbox", function (e) {
        let BiViewUsersDesktopUtil = new BiViewUsersDesktopUtils();
        BiViewUsersDesktopUtil.getDirectoryView();
        e.stopPropagation();
    });
    /* User Desktop*/

    /* Roles Desktop*/
    $(document).on("click", ".roleSearchObject_ElementTypeItem", function (e) {
        let RolesDesktopUtil = new RolesDesktopUtils();
        let dropDownId = "single_roles_desk_search_dropdown_content";
        let selectedId = "single_roles_desk_search_dropdown_selected";
        RolesDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biRoleSearchObject_ElementTypeItem", function (e) {
        let RolesDesktopUtil = new BiViewRolesDesktopUtils();
        let dropDownId = "bi_roles_desk_search_dropdown_content";
        let selectedId = "bi_roles_desk_search_dropdown_selected";
        RolesDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".singleview-permission-view", function (e) {
        permissionHotlinkClick($(this), "singleview");
        e.stopPropagation();
    });

    $(document).on("click", ".biview-permission-view", function (e) {
        permissionHotlinkClick($(this), "biview");
        e.stopPropagation();
    });

    $(document).on("click", "#single_roles_checkbox", function (e) {
        let RolesDesktopUtil = new RolesDesktopUtils();
        RolesDesktopUtil.getDirectoryView();
        e.stopPropagation();
    });

    $(document).on("click", "#bi_roles_checkbox", function (e) {
        let RolesDesktopUtil = new BiViewRolesDesktopUtils();
        RolesDesktopUtil.getDirectoryView();
        e.stopPropagation();
    });

    $(document).on("click", ".permissionSave", function (e) {
        $("#saveData").show();
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let isBiview = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiview);
        let viewId = desktop.attr("id");

        let currentOpenedView = getCurrentOpenedView(activeDesktop, viewId);
        //let hotlinkId = currentOpenedView.source_hotlink_id;
        let uniqueId = currentOpenedView.uniqueId;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];

        let data = {};
        data.userRoleId = element.elementId;
        let corePermission = saveCorePermissionObject(desktop);
        let secondaryPermission = saveSecondaryPermissionObject(desktop);
        data.corePermissionsInMemory = {};
        data.miscellaneousPermissionsInMemory = {};
        data.corePermissionsInMemory.objectTypeToCoreHotlinksMap = corePermission;
        data.miscellaneousPermissionsInMemory.miscellaneousActionStateMap = secondaryPermission;
        service.saveHotlinkPermission(data, function (res, err) {
            if (res) {
                alert("Permission Modifications Saved Successfully");
                $("#saveData").hide();
            }
            else if (err) {
                errorHandler(err);
                $("#saveData").hide();
            }
        });
        e.stopPropagation();
    });
    /*Roles Desktop*/
});
const organizationalUtil = new organizationalUtils;

function organizationalUtils() {
    function getDirectory(activeDesktop, view, classOfObjectTypeElementType, res) {
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
                renderObjectTypesAndElementTypesDropDown(objectTypesAndElementTypes, activeDesktop, classOfObjectTypeElementType);
            }
            let oldExpansionState = getExpansionStateOfElements(activeDesktop.tree_container_id);
            renderDirectoryView(res, directoryViewTreeId, view, "anchorView", false);
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
            alert("Error");
            $("#saveData").hide();

        }
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

    return {getDirectory, searchClick};
}

function OrganisationalUnitDesktopUtils() {
    let orgUnitDesk = new Object();

    function getDirectoryView() {
        $("#saveData").show();
        let data = {};
        let activeDesktop = backing.singleview.workspaces.administration_workspace.desktops.organisational_unit_desktop;
        if ($("#" + activeDesktop.selector.showUser_checkbox_id).find("input").is(':checked'))
            data.showUsers = true;
        else
            data.showUsers = false;
        service.getOrganizationalUnitDesktopDv(data, function (res, err) {
            if (res) {
                organizationalUtil.getDirectory(activeDesktop, "singleview", "orgSearchObject_ElementTypeItem", res);
            }
            else if (err) {
                $("#saveData").hide();
                errorHandler(err);
            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.administration_workspace.desktops.organisational_unit_desktop;
        organizationalUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "orgCustomSearchObject_ElementTypeItem");
    }

    function refreshFullDesktop() {
        getDirectoryView();
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("organisational_unit_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("organisational_unit_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }


    //added by Manish for drag and drop
    function saveDragAndDrop(){
    }

    //added for drag and drop by Manish
    function addDragAndDrop() {
    }

    orgUnitDesk.getDirectoryView = getDirectoryView;
    orgUnitDesk.searchObjectElementClick = searchObjectElementClick;
    orgUnitDesk.fullRefresh = refreshFullDesktop;
    orgUnitDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    orgUnitDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    orgUnitDesk.saveDragAndDrop = saveDragAndDrop;
    orgUnitDesk.addDragAndDrop = addDragAndDrop;
    return orgUnitDesk;
}

function BiViewOrganisationalUnitDesktopUtils() {
    let orgUnitDesk = new Object();

    function getDirectoryView() {
        $("#saveData").show();
        let data = {};
        let activeDesktop = backing.biview.workspaces.bi_administration_workspace.desktops.organisational_unit_desktop;
        if ($("#" + activeDesktop.selector.showUser_checkbox_id).find("input").is(':checked'))
            data.showUsers = true;
        else
            data.showUsers = false;
        service.getOrganizationalUnitDesktopDv(data, function (res, err) {
            if (res)
                organizationalUtil.getDirectory(activeDesktop, "biview", "biOrgSearchObject_ElementTypeItem", res);
            else if (err) {
                $("#saveData").hide();
                errorHandler(err);
            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_administration_workspace.desktops.organisational_unit_desktop;
        organizationalUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biOrgCustomSearchObject_ElementTypeItem");
    }

    function refreshFullDesktop() {
        getDirectoryView();
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("organisational_unit_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("organisational_unit_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }


    //added by Manish for drag and drop
    function saveDragAndDrop(){
    }

    //added for drag and drop by Manish
    function addDragAndDrop() {
    }

    orgUnitDesk.getDirectoryView = getDirectoryView;
    orgUnitDesk.searchObjectElementClick = searchObjectElementClick;
    orgUnitDesk.fullRefresh = refreshFullDesktop;
    orgUnitDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    orgUnitDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    orgUnitDesk.addDragAndDrop = addDragAndDrop;
    orgUnitDesk.saveDragAndDrop = saveDragAndDrop;
    return orgUnitDesk;
}

function UsersDesktopUtils() {
    let usersDesk = new Object();

    function getDirectoryView() {
        let data = {};
        $("#saveData").show();
        let activeDesktop = backing.singleview.workspaces.administration_workspace.desktops.users_desktop;
        modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
        if ($("#" + activeDesktop.selector.showRoles_checkbox_id).find("input").is(':checked'))
            data.showRoles = true;
        else
            data.showRoles = false;
        service.getAllUsers(data, function (res, err) {
            if (res) {
                organizationalUtil.getDirectory(activeDesktop, "singleview", "usersSearchObject_ElementTypeItem", res);
            }
            else if (err) {
                $("#saveData").hide();
                errorHandler(err);
            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.administration_workspace.desktops.users_desktop;
        organizationalUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "usersCustomSearchObject_ElementTypeItem");
    }

    function refreshFullDesktop() {
        getDirectoryView();
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("users_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("users_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    //added by Manish for drag and drop
    function saveDragAndDrop(){
    }

    //added for drag and drop by Manish
    function addDragAndDrop() {
    }

    usersDesk.getDirectoryView = getDirectoryView;
    usersDesk.searchObjectElementClick = searchObjectElementClick;
    usersDesk.fullRefresh = refreshFullDesktop;
    usersDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    usersDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    usersDesk.saveDragAndDrop = saveDragAndDrop;
    usersDesk.addDragAndDrop = addDragAndDrop;
    return usersDesk;
}

function BiViewUsersDesktopUtils() {
    let usersDesk = new Object();

    function getDirectoryView() {
        let data = {};
        $("#saveData").show();
        let activeDesktop = backing.biview.workspaces.bi_administration_workspace.desktops.users_desktop;
        if ($("#" + activeDesktop.selector.showRoles_checkbox_id).find("input").is(':checked'))
            data.showRoles = true;
        else
            data.showRoles = false;
        service.getAllUsers(data, function (res, err) {
            if (res)
                organizationalUtil.getDirectory(activeDesktop, "biview", "biUsersSearchObject_ElementTypeItem", res);
            else if (err) {
                errorHandler(err);
                $("#saveData").hide();
            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_administration_workspace.desktops.users_desktop;
        organizationalUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biUsersCustomSearchObject_ElementTypeItem");
    }

    function refreshFullDesktop() {
        getDirectoryView();
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("users_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("users_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

     //added by Manish for drag and drop
     function saveDragAndDrop(){
    }

    //added for drag and drop by Manish
    function addDragAndDrop() {
    }


    usersDesk.getDirectoryView = getDirectoryView;
    usersDesk.searchObjectElementClick = searchObjectElementClick;
    usersDesk.fullRefresh = refreshFullDesktop;
    usersDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    usersDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    usersDesk.saveDragAndDrop = saveDragAndDrop;
    usersDesk.addDragAndDrop = addDragAndDrop;
    return usersDesk;
}

function RolesDesktopUtils() {
    let rolesDesk = new Object();

    function getDirectoryView() {
        $("#saveData").show();
        let data = {};
        let activeDesktop = backing.singleview.workspaces.administration_workspace.desktops.roles_desktop;
        modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
        if ($("#" + activeDesktop.selector.showUser_checkbox_id).find("input").is(':checked'))
            data.showUsers = true;
        else
            data.showUsers = false;
        service.getRolesDv(data, function (res, err) {
            if (res)
                organizationalUtil.getDirectory(activeDesktop, "singleview", "roleSearchObject_ElementTypeItem", res);
            else if (err) {
                $("#saveData").hide();
                errorHandler(err);
            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.administration_workspace.desktops.roles_desktop;
        organizationalUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "rolesCustomSearchObject_ElementTypeItem");
    }

    function refreshFullDesktop() {
        getDirectoryView();
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("roles_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("roles_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    //added by Manish for drag and drop
    function saveDragAndDrop(){
    }

    //added for drag and drop by Manish
    function addDragAndDrop() {
    }

    rolesDesk.getDirectoryView = getDirectoryView;
    rolesDesk.searchObjectElementClick = searchObjectElementClick;
    rolesDesk.fullRefresh = refreshFullDesktop;
    rolesDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    rolesDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    rolesDesk.saveDragAndDrop = saveDragAndDrop;
    rolesDesk.addDragAndDrop = addDragAndDrop;
    return rolesDesk;
}

function BiViewRolesDesktopUtils() {
    let rolesDesk = new Object();

    function getDirectoryView() {
        $("#saveData").show();
        let data = {};
        let activeDesktop = backing.biview.workspaces.bi_administration_workspace.desktops.roles_desktop;
        if ($("#" + activeDesktop.selector.showUser_checkbox_id).find("input").is(':checked'))
            data.showUsers = true;
        else
            data.showUsers = false;
        service.getRolesDv(data, function (res, err) {
            if (res)
                organizationalUtil.getDirectory(activeDesktop, "biview", "biRoleSearchObject_ElementTypeItem", res);
            else if (err) {
                errorHandler(err);
                $("#saveData").hide();
            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_administration_workspace.desktops.roles_desktop;
        organizationalUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biRolesCustomSearchObject_ElementTypeItem");
    }

    function refreshFullDesktop() {
        getDirectoryView();
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("roles_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("roles_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    //added by Manish for drag and drop
    function saveDragAndDrop(){
    }

    //added for drag and drop by Manish
    function addDragAndDrop() {
    }

    rolesDesk.getDirectoryView = getDirectoryView;
    rolesDesk.searchObjectElementClick = searchObjectElementClick;
    rolesDesk.fullRefresh = refreshFullDesktop;
    rolesDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    rolesDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    rolesDesk.addDragAndDrop = addDragAndDrop;
    rolesDesk.saveDragAndDrop = saveDragAndDrop;
    return rolesDesk;
}

function permissionHotlinkClick($this, view) {
    $("#saveData").show();
    let isBiview = isBiViewOrNot(view);
    let src_hotlinkId = $this.attr("id");
    let src_id = $this.closest(".innerDesktop").attr("id");
    let viewDivId = backing.view_type.permission_view.name + "_" + src_hotlinkId;

    //check for space in screen
    let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.permission_view.key);
    if (!haveSpaceToOpenView) {
        $("#saveData").hide();
        return;
    }
    //check view is opened before
    let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(viewDivId, isBiview);
    if (isViewOpenedBefore) {
        $("#saveData").hide();
        return;
    }
    let uniqueId = $this.attr("uniqueid");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let activeDesktop = getActiveDesktop(isBiview);
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
    let data = {};
    data.userRoleId = element.elementId;
    let name;
    name = element[ATTR.name];

    service.getHotlinkPermission(data, function (res, err) {
        if (res) {
            generateUniqueIdAndParentLink(res, "permissionView", null);
            renderPermissionView(res, viewDivId, element, view);
            if (active_desktop_directory_view_id === src_id)
                createScenarioViewOpenedFromAnchorSingleCase(viewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.permission_view.key, "Permission View: " + name, uniqueId, isBiview);
            else
                createScenarioViewOpenedFromView(viewDivId, src_id, src_hotlinkId, backing.view_type.permission_view.key, "Permission View: " + name, uniqueId, isBiview);
            //call reposition home function
            repositionViews(isBiview);
            // highlightSourceAndView(viewDivId,false);
            $("#saveData").hide();
        }
        else if (err) {
            errorHandler(err);
            $("#saveData").hide();
        }
    });
}

function renderPermissionView(res, viewDivId, element, view) {
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let str = "";
    str += `<div id="${viewDivId}" class="innerDesktop dataviewDesktop" view=${view} uniqueid="${element.uniqueId}">`;
    str += `<div class="panel-header-container ${view}">` +
        `<span class="flaticon-role-workspace findSourceHotlink dataViewIcon"  title="Show Source Hotlink"></span>`;
    str += `<span class="panel-header">CORE PERMISSION VIEW: ${element.name.toUpperCase()}</span>`;
    str += `<span class="rgtnavdfstage_build_workbench_close close-btn ${view}CloseBtn" id="closeDataView${desktopId}" title="Close">` +
        `<span class="ss-cancel" style="font-size: 11px;"></span>` +
        `</span>` +
        `<span class="flaticon-fullscreen expandView ResizingIcon fright" title="Full Screen"></span>` +
        `<span class="flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none" title="Default Screen"></span>` +
        `<span class="fright flaticon-refresh-button refreshButton" title="Refresh"></span>` +
        `</div>` +
        `<div class="panel-header-container ${view}">` +
        `<span class="headerActionButton permissionSave">SAVE</span>` +
        `</div>` +
        `<div class="permissionView-content">`;
    // str += "</ul>";
    str += `<span class="permission-heading">CORE PERMISSONS</span>`;
    if (res.debugInfo.corePermissionsInMemory.objectTypeToCoreHotlinksMap) {
        let corePermissions = res.debugInfo.corePermissionsInMemory.objectTypeToCoreHotlinksMap;
        str += displayCorePermissionObject(corePermissions);
    }
    str += `<span class="permission-heading">SECONDARY PERMISSONS</span>`;
    if (res.debugInfo.miscellaneousPermissionsInMemory.miscellaneousActionStateMap) {
        let secondaryPermission = res.debugInfo.miscellaneousPermissionsInMemory.miscellaneousActionStateMap;
        str += displayOtherPermissionObject(secondaryPermission)
    }

    str += "</div></div>";
    $("#" + desktopId).append(str);
}

function saveCorePermissionObject(desktop) {
    let data = {};
    desktop.find(".corePermissionItem").each(function () {
        let label = $(this).children(".permissionLabel").attr("objType");
        data[label] = {};
        data[label].canCreate = $(this).find(".canCreate").is(':checked');
        data[label].canEdit = $(this).find(".canEdit").is(':checked');
        data[label].canDelete = $(this).find(".canDelete").is(':checked');
        data[label].canDataview = $(this).find(".canDataview").is(':checked');
    });
    return data;
}

function saveSecondaryPermissionObject(desktop) {
    let data = {};
    desktop.find(".secondaryPermissionItem").each(function () {
        let label = $(this).children(".permissionLabel").attr("objType");
        data[label] = {};
        data[label].havePermission = $(this).find("." + label).is(':checked');
    });
    return data;
}

function displayCorePermissionObject(permissions) {
    let str = "";
    $.each(permissions, function (key, value) {
        let per = value;
        str += '<div class="permissionItem corePermissionItem">';
        str += `<span class="permissionLabel" objType="${key}">${value.objectTypeLabel.toUpperCase()}</span><div class="permissionWrapper">`;
        $.each(per, function (key1, value1) {
            let icon;
            if (key1 === "canCreate") {
                icon = "flaticon-add-attribute flaticon-fontIconCheckbox";
            }
            else if (key1 === "canEdit") {
                icon = "ss-edit";
            }
            else if (key1 === "canDataview") {
                icon = "flaticon-open-in-tab-2";
            }
            else if (key1 === "canDelete") {
                icon = "ss-delete";
            }
            if (icon) {
                if (value1)
                    str += `<span class="iconCheckBoxWrapper"><span class="iconCheckBox ${icon}"></span><input class=${key1} type="checkbox" checked></span>`;
                else {
                    str += `<span class="iconCheckBoxWrapper"><span class="iconCheckBox ${icon}"></span><input class=${key1} type="checkbox"></span>`;
                }
            }

        });
        str += "</div></div>";
    });
    return str;
}

function displayOtherPermissionObject(permissions) {
    let str = "";
    $.each(permissions, function (key, value) {
        str += '<div class="permissionItem secondaryPermissionItem">';
        if (value.havePermission)
            str += `<span class="iconCheckBoxWrapper"><input class=${key} type="checkbox" checked></span>`;
        else
            str += `<span class="iconCheckBoxWrapper"><input class=${key} type="checkbox"></span>`;
        str += `<span class="permissionLabel" objType="${key}">${value.objectTypeLabel.toUpperCase()}</span><div class="permissionWrapper">`;

        str += "</div></div>";
    });
    return str;
}
