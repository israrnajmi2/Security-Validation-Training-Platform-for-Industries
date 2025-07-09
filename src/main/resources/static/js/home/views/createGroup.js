$(document).ready(function () {
    $(document).on("click", ".createGroup", function (e) {
        $("#saveData").show();
        let activeDesktop, isBiView, view;
        if ($(this).hasClass("singleview")) {
            isBiView = false;
            view = "singleview";
        }
        else if ($(this).hasClass("biview")) {
            isBiView = true;
            view = "biview";
        }
        activeDesktop = getActiveDesktop(isBiView);
        let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
        let src_hotlinkId = $(this).attr("id");
        let createGroupsViewDivId = backing.view_type.create_groups.name + "_" + active_desktop_directory_view_id + "_" + src_hotlinkId;
        //check for space in screen
        let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_groups.key);
        if (!haveSpaceToOpenView) {
            $("#saveData").hide();
            return;
        }
        //check view is opened before
        let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(createGroupsViewDivId, isBiView);

        if (isViewOpenedBefore) {
            $("#saveData").hide();
            return;
        }
        let uniqueId = $(this).attr("uniqueId");
        let elementType = $(this).attr("elementType");
        let level = $(this).attr("level");
        let name = "Create" + elementType + "Group";
        let dataSelector = activeDesktop.utilsFunction.getSelector();
        let data = {};
        data.shieldId = dataSelector.dropDownOneShieldId ? dataSelector.dropDownOneShieldId : dataSelector.shieldId;
        data.level = level;
        data.shieldElementGroupId = 0;
        data.showExpression = false;
        service.getShieldDv(data, function (res, err) {
            if (res) {
                createScenarioViewOpenedFromAnchorSingleCase(createGroupsViewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_groups.key, name, src_hotlinkId, isBiView);
                renderCreateGroups(createGroupsViewDivId, view, elementType, src_hotlinkId, data.shieldId, uniqueId);
                generateUniqueIdAndParentLink(res, "", null);
                renderDirectoryView(res, createGroupsViewDivId + "treeContainer", view, "groupView", isBiView);
                $("#" + createGroupsViewDivId + "treeContainer").find(".d-text").each(function () {
                    if (src_hotlinkId == 0 || $(this).attr("shieldElementTypeId") === src_hotlinkId)
                        $(this).addClass("canSelect");
                    else
                        $(this).addClass("cannotSelect");
                });
                repositionViews(isBiView);
                $("#saveData").hide();
            }
            else if (err) {
                $("#saveData").hide();
            }
        });
    });
    $(document).on("click", ".canSelect", function (e) {
        let viewId = $(this).closest(".innerDesktop").attr("id");
        let uniqueId = $(this).closest(".element_li").attr("uniqueid");
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view"), isBiView;
        if (view === "singleview")
            isBiView = false;
        else
            isBiView = true;
        let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiView);
        if ($(this).hasClass("selectedGroup")) {
            $(this).removeClass("selectedGroup");
            $(this).addClass("canSelect");
            $("#" + viewId + "selectedElements").find("li").each(function () {
                if (parseInt($(this).attr("elementId")) === element.elementId)
                    $(this).remove();
            })
        }
        else {
            $(this).addClass("selectedGroup");
            let str;
            if (element.refId && element.refId.trim() !== "")
                str = "<li elementId=\"" + element.elementId + "\">" + objectTypeIcon + "  " + element.name + "<span class=\"d-text-refId\" style=\"display: block;\">&nbsp[" + element.refId + "]</span></li>";
            else
                str = "<li elementId=\"" + element.elementId + "\">" + objectTypeIcon + "  " + element.name + "</li>";
            $("#" + viewId + "selectedElements").append(str);
        }
        e.stopPropagation();
    });
    $(document).on("click", ".create-groups", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let viewId = desktop.attr("id");
        let data = {};
        data.shieldElementTypeId = $(this).attr("id");
        data.shieldId = $(this).attr("shieldId");
        data.groupMemberShieldElementIds = [];
        $("#" + viewId + "treeContainer").find(".d-text").each(function () {
            if ($(this).hasClass("selectedGroup")) {
                data.groupMemberShieldElementIds.push($(this).attr("id"));
            }
        });
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.organizationalUnitId = (desktop.find(".organisationalDirectory").attr("elementId")) ? desktop.find(".organisationalDirectory").attr("elementId") : 0;
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        service.createGroup(data, function (res, err) {
            if (res) {
                alert("Successfully Added");
                desktop.remove();
                (view === "singleview") ? closeViewUpdateOpenedViews(viewId, false) : closeViewUpdateOpenedViews(viewId, true);
                let event = {"key": backing.event_type.created_shield_element_group.key};
                propagateEvent(event);
                $("#saveData").hide();
            }
            else if (err) {
                if (err.status === 409)
                    alert(err.responseJSON.errorMessage);
                else
                    errorHandler(err);
                $("#saveData").hide();
            }
        });
    });

    $(document).on("click", ".save-groups", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let viewId = desktop.attr("id");
        let data = {};
        data.elementId = $(this).attr("id");
        data.groupMemberShieldElementIds = [];
        $("#" + viewId + "treeContainer").find(".d-text").each(function () {
            if ($(this).hasClass("selectedGroup")) {
                data.groupMemberShieldElementIds.push($(this).attr("id"));
            }
        });
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.organizationalUnitId = (desktop.find(".organisationalDirectory").attr("elementId")) ? desktop.find(".organisationalDirectory").attr("elementId") : 0;
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        service.editGroup(data, function (res, err) {
            if (res) {
                alert("Successfully Edited");
                (view === "singleview") ? closeViewUpdateOpenedViews(viewId, false) : closeViewUpdateOpenedViews(viewId, true);
                let event = {"key": backing.event_type.edited_shield_element_group.key};
                propagateEvent(event);
                desktop.remove();
                $("#saveData").hide();
            }
            else if (err) {
                if (err.status === 409)
                    alert(err.responseJSON.errorMessage);
                else
                    errorHandler(err);
                $("#saveData").hide();
            }
        });
    });

});

function renderCreateGroups(viewName, view, elementType, elementTypeId, shieldId, uniqueId) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\" uniqueid=\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"flaticon-add-attribute dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    str += "<span class=\"panel-header\"> CREATE " + elementType.toUpperCase() + " GROUP</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton create-groups\" id=\"" + elementTypeId + "\" shieldId=\"" + shieldId + "\">CREATE</span>" +
        "</div><div class=\"create-shield-element-container\">" +
        "<ul>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"></textarea></div></li>" +
        //  "<label class=\"\">DESCRIPTION:</label><textarea class=\"descriptionInput \" ></textarea></li>" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label class=\"\">ORGANIZATIONAL UNIT:</label><input class=\"organisationalDirectory hierarchySelected\" readonly>" +
        "<div id=\"" + viewName + "org\" class=\"organisationalDirectoryDropDown hierarchyDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearOrgDirectory\">CLEAR</span></li>" +
        "</ul>";
    str += "<div class=\"treeContainerWrapper innerBlock fleft\">";
    str += "<div class=\"selectedElementsHeading " + view + "\">Please Choose Group Members:</div>";
    str += "<div class=\"expressionViewSearchBox " + view + "\"><span class=\"flaticon-search search\"></span><input class=\" searchBox\" placeholder=\"Search\">\n" +
        "<span title=\"Clear Search\" class=\"tooltip clearSearchBox flaticon-remove tooltipstered fright\"></span>" +
        "<div class=\"desktop-search-wrapper selectorLabel fright\" style=\"padding:10px;\">\n" +
        "<span class=\"restrictedSearchBox searchSelector flaticon-filter-search\" title=\"Show Search Results Only\"></span>" +
        "</div></div>";
    str += "<div class=\"treeContainerGroups\">" +
        "<div class=\"tree_structure_parent\">" +
        "<ul class=\"directoryView_ringList clearfix directoryViewList directoryViewList_DV directoryViewUl\" id=\"" + viewName + "treeContainer\"></ul>" +
        " <div class=\"noSearchResults\" hidden>No Search Results</div></div></div></div>";
    str += "<div class=\"selectedGroupElementsWrapper fleft\"><div class=\"selectedElementsHeading " + view + "\">Selected Members:</div><ul id=\"" + viewName + "selectedElements\"></ul></div>";
    str += "</div></div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    getDataForOrgUnit(viewName);
    applyRichTextEditorById("descriptionInput"+uniqueId);
}

function renderEditGroups(viewName, res, view, element, elementType, uniqueId) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueid=\"" + element.uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"ss-edit dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    str += "<span class=\"panel-header\"> EDIT " + element.name.toUpperCase() + " GROUP</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton save-groups\" id=\"" + res.elementId + "\">SAVE</span>" +
        "</div><div class=\"create-shield-element-container\">" +
        "<ul>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\" value=\"" + res.name + "\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\">" + res.description + "</textarea></div></li>" +
        // "<label class=\"\">DESCRIPTION:</label><textarea class=\"descriptionInput\">" + res.description + "</textarea></li>" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label class=\"\">ORGANIZATIONAL UNIT:</label><input class=\"organisationalDirectory hierarchySelected\" readonly>" +
        "<div id=\"" + viewName + "org\" class=\"organisationalDirectoryDropDown hierarchyDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearOrgDirectory\">CLEAR</span></li>" +
        "</ul>";
    str += "<div class=\"treeContainerWrapper innerBlock fleft\">";
    str += "<div class=\"selectedElementsHeading " + view + "\">Please Choose Group Members:</div>";
    str += "<div class=\"expressionViewSearchBox " + view + "\"><span class=\"flaticon-search search\"></span><input class=\" searchBox\" placeholder=\"Search\">\n" +
        "<span title=\"Clear Search\" class=\"tooltip clearSearchBox flaticon-remove tooltipstered fright\"></span>" +
        "<div class=\"desktop-search-wrapper selectorLabel fright\" style=\"padding:10px;\">\n" +
        "<span class=\"restrictedSearchBox searchSelector flaticon-filter-search\" title=\"Show Search Results Only\"></span>" +
        "</div></div>";
    str += "<div class=\"treeContainerGroups\">" +
        "<div class=\"tree_structure_parent\">" +
        "<ul class=\"directoryView_ringList clearfix directoryViewList directoryViewList_DV directoryViewUl\" id=\"" + viewName + "treeContainer\"></ul>" +
        " <div class=\"noSearchResults\" hidden>No Search Results</div></div></div></div>";
    str += "<div class=\"selectedGroupElementsWrapper fleft\"><div class=\"selectedElementsHeading " + view + "\">Selected Members:</div><ul id=\"" + viewName + "selectedElements\"></ul></div>";
    str += "</div></div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    getDataForOrgUnit(viewName, res.organizationalUnitId);
    applyRichTextEditorById("descriptionInput"+uniqueId);
}
