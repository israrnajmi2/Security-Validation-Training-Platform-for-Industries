$(document).ready(function () {
    /*guidance view starts here*/
    $(document).on("click", ".singleview-guidance-view", function (e) {
        guidanceViewClick($(this), backing.view_type.guidance_view, false);
        e.stopPropagation();
    });

    $(document).on("click", ".biview-guidance-view", function (e) {
        guidanceViewClick($(this), backing.view_type.guidance_view, true);
        e.stopPropagation();
    });

    $(document).on("click", ".singleviewguidanceViewSource", function (e) {
        renderSourceGuidanceDirectoryView($(this), false, backing.view_type.guidance_view);
        e.stopPropagation();
    });

    $(document).on("click", ".biviewguidanceViewSource", function (e) {
        renderSourceGuidanceDirectoryView($(this), true, backing.view_type.guidance_view);
        e.stopPropagation();
    });

    $(document).on("click", ".guidanceView-add-child", function (e) {
        guidanceAddChildClick($(this), backing.view_type.create_guidance_view);
        e.stopPropagation();
    });

    $(document).on("click", ".create-guidance-child", function (e) {
        let $this = $(this);
        let desktop = $this.closest(".innerDesktop");
        let view = desktop.attr("view");
        let shieldElementId = $this.attr("shieldElementId"),
            sourceId = desktop.find(".hierarchySelected").attr("elementId"),
            description = desktop.find(".descriptionInput").val().trim();
        if ((typeof description === "undefined") || (description === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        let data = {description, shieldElementId, sourceId};
        service.createGuidances(data, function (res, err) {
            if (res) {
                alert("Successfully Added");
                let id = desktop.attr("id");
                desktop.remove();
                (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
                let event = {"key": backing.event_type.created_guidances.key};
                propagateEvent(event);
                $("#saveData").hide();
            }
            else if (err) {
                if (err.status === 409) {
                    alert(err.responseJSON.errorMessage);
                }
                else {
                    errorHandler(err);
                }
                $("#saveData").hide();
            }
        });
        e.stopPropagation();
    });

    $(document).on("click", ".singleview-guidanceView-edit-element", function (e) {
        renderGuidanceEditViewData($(this), "singleview", backing.view_type.edit_guidance_view);
        e.stopPropagation();
    });

    $(document).on("click", ".biview-guidanceView-edit-element", function (e) {
        renderGuidanceEditViewData($(this), "biview", backing.view_type.edit_guidance_view);
        e.stopPropagation();
    });

    $(document).on("click", ".save-guidance-child", function (e) {
        let $this = $(this);
        let desktop = $this.closest(".innerDesktop");
        let view = desktop.attr("view");
        let elementId = $this.attr("elementId"),
            description = desktop.find(".descriptionInput").val().trim(),
            sourceId = desktop.find(".sourceDirectory").attr("elementId");
        if ((typeof description === "undefined") || (description === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        let data = {description, elementId, sourceId};
        service.saveGuidances(data, function (res, err) {
            if (res) {
                alert("Edited Successfully");
                let id = desktop.attr("id");
                desktop.remove();
                (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
                let event = {"key": backing.event_type.created_guidances.key};
                propagateEvent(event);
                $("#saveData").hide();
            }
            else if (err) {
                if (err.status === 409) {
                    alert(err.responseJSON.errorMessage);
                }
                else {
                    errorHandler(err);
                }
                $("#saveData").hide();
            }
        });
        e.stopPropagation();
    });
    /*guidance view starts here*/

    /*test procedure view starts here*/
    $(document).on("click", ".singleview-testProcedure-view", function (e) {
        guidanceViewClick($(this), backing.view_type.test_procedure_view, false);
        e.stopPropagation();
    });

    $(document).on("click", ".biview-testProcedure-view", function (e) {
        guidanceViewClick($(this), backing.view_type.test_procedure_view, true);
        e.stopPropagation();
    });

    $(document).on("click", ".singleviewtestProcedureViewSource", function (e) {
        renderSourceTestProcedureDirectoryView($(this), false, backing.view_type.test_procedure_view);
        e.stopPropagation();
    });

    $(document).on("click", ".biviewtestProcedureViewSource", function (e) {
        renderSourceTestProcedureDirectoryView($(this), true, backing.view_type.test_procedure_view);
        e.stopPropagation();
    });

    $(document).on("click", ".testProcedureView-add-child", function (e) {
        guidanceAddChildClick($(this), backing.view_type.create_test_procedure_view);
        e.stopPropagation();
    });

    $(document).on("click", ".create-test-procedure-child", function (e) {
        let $this = $(this);
        let desktop = $this.closest(".innerDesktop");
        let view = desktop.attr("view");
        let shieldElementId = $this.attr("shieldElementId"),
            sourceId = desktop.find(".hierarchySelected").attr("elementId"),
            description = desktop.find(".descriptionInput").val().trim(),
            referenceId = desktop.find(".referenceInput").val().trim();
        if ((typeof description === "undefined") || (description === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        else if ((typeof referenceId === "undefined") || (referenceId === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        let data = {description, shieldElementId, sourceId, referenceId};
        service.createTestProcedures(data, function (res, err) {
            if (res) {
                alert("Successfully Added");
                let id = desktop.attr("id");
                desktop.remove();
                (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
                let event = {"key": backing.event_type.created_test_procedure.key};
                propagateEvent(event);
                $("#saveData").hide();
            }
            else if (err) {
                if (err.status === 409) {
                    alert(err.responseJSON.errorMessage);
                }
                else {
                    errorHandler(err);
                }
                $("#saveData").hide();
            }
        });
        e.stopPropagation();
    });

    $(document).on("click", ".singleview-testProcedureView-edit-element", function (e) {
        renderGuidanceEditViewData($(this), "singleview", backing.view_type.edit_test_procedure_view);
        e.stopPropagation();
    });

    $(document).on("click", ".biview-testProcedureView-edit-element", function (e) {
        renderGuidanceEditViewData($(this), "biview", backing.view_type.edit_test_procedure_view);
        e.stopPropagation();
    });

    $(document).on("click", ".save-test_procedure-child", function (e) {
        let $this = $(this);
        let desktop = $this.closest(".innerDesktop");
        let view = desktop.attr("view");
        let elementId = $this.attr("elementId"),
            sourceId = desktop.find(".hierarchySelected").attr("elementId"),
            description = desktop.find(".descriptionInput").val().trim(),
            referenceId = desktop.find(".referenceInput").val().trim();
        if ((typeof description === "undefined") || (description === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        else if ((typeof referenceId === "undefined") || (referenceId === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        let data = {description, elementId, sourceId, referenceId};
        service.saveTestProcedures(data, function (res, err) {
            if (res) {
                alert("Edited Successfully");
                let id = desktop.attr("id");
                desktop.remove();
                (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
                let event = {"key": backing.event_type.created_test_procedure.key};
                propagateEvent(event);
                $("#saveData").hide();
            }
            else if (err) {
                if (err.status === 409) {
                    alert(err.responseJSON.errorMessage);
                }
                else {
                    errorHandler(err);
                }
                $("#saveData").hide();
            }
        });
        e.stopPropagation();
    });
    /*test procedure view ends here*/

    $(document).on("click", ".sourceDirectory", function (e) {
        let desktop = $(this).closest(".innerDesktop");
        desktop.find(".hierarchyDropDown").addClass("dis-none");
        desktop.find(".sourceDirectoryDropDown").removeClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".sourceSelector", function (e) {
        let desktop = $(this).closest(".innerDesktop");
        desktop.find(".sourceDirectoryDropDown").find(".d-text").removeClass("active");
        $(this).children(".d-text").addClass("active");
        desktop.find(".sourceDirectory").val($(this).children(".d-text").html().replace(/&amp;/g, '&'));
        let elementId = $(this).attr("elementId");
        desktop.find(".sourceDirectory").attr("elementId", elementId);
        desktop.find(".sourceDirectoryDropDown").addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".clearSourceDirectory", function () {
        $(this).closest(".create-shield-field").find(".hierarchyDropDown").find(".d-text").removeClass("active");
        $(this).closest(".create-shield-field").children("input").val('');
        $(this).closest(".create-shield-field").children("input").attr("elementId", 0);
    });

    $(document).on("mouseleave", ".sourceDirectoryDropDown", function () {
        $(this).addClass("dis-none");
    });

    /*Source DropDown starts here*/
    $(document).on("click", ".create-source", function (e) {
        let $this = $(this);
        let desktop = $this.closest(".innerDesktop");
        let view = desktop.attr("view");
        let name = desktop.find(".nameInput").val().trim(),
            description = desktop.find(".descriptionInput").val().trim(),
            organizationName = desktop.find(".orgInput").val().trim();
        if ((typeof name === "undefined") || (name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        else if ((typeof organizationName === "undefined") || (organizationName === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        let data = {description, organizationName, name};
        service.createSources(data, function (res, err) {
            if (res) {
                alert("Successfully Added");
                let id = desktop.attr("id");
                desktop.remove();
                (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
                let event = {"key": backing.event_type.create_source.key};
                propagateEvent(event);
                $("#popUp").addClass("dis-none");
                $("#saveData").hide();
            }
            else if (err) {
                if (err.status === 409) {
                    alert(err.responseJSON.errorMessage);
                }
                else {
                    errorHandler(err);
                }
                $("#saveData").hide();
            }
        });
        e.stopPropagation();
    });
    /*Source DropDown ends here*/
});

function guidanceViewClick(selector, viewType, isBiview) {
    $("#saveData").show();
    let src_hotlinkId = selector.attr("id");
    let src_id = selector.closest(".innerDesktop").attr("id");
    let viewDivId = viewType.name + "_" + src_hotlinkId;
    let view = getSingleOrBiView(isBiview);
    let uniqueId = selector.attr("uniqueid");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let activeDesktop = getActiveDesktop(isBiview);
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
    let data = {};
    //check for space in screen
    let haveSpaceToOpenView = checkIfViewCanOpen(viewType.key);
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
    let serviceCall;
    if (viewType.key === "guidance_view") {
        serviceCall = service.getGuidances;
    }
    else if (viewType.key === "test_procedure_view") {
        serviceCall = service.getTestProcedures;
    }
    data.elementId = element[ATTR.elementId];
    serviceCall(data, function (res, err) {
        if (res) {
            generateUniqueIdAndParentLink(res, viewType.name, null);
            renderGuidanceView(res, viewDivId, element, viewType, isBiview);
            renderDirectoryViewForGuidanceView(res, viewDivId, viewType, view);
            if (active_desktop_directory_view_id === src_id)
                createScenarioViewOpenedFromAnchorSingleCase(viewDivId, active_desktop_directory_view_id, src_hotlinkId, viewType.key, viewType.label + ": " + element[ATTR.name], uniqueId, isBiview);
            else
                createScenarioViewOpenedFromView(viewDivId, src_id, src_hotlinkId, viewType.key, viewType.label + ":" + element[ATTR.name], uniqueId, isBiview);
            highlightSourceAndView(viewDivId, isBiview);
            repositionViews(isBiview);
            $("#saveData").hide();
        }
        else if (err) {
            $("#saveData").hide();
            errorHandler(err);
        }
    });
}

function renderGuidanceView(res, viewDivId, element, viewType, isBiview) {
    let view = getSingleOrBiView(isBiview);
    let activeDesktop = getActiveDesktop(isBiview);
    let closeBtnClass = view + "CloseBtn";
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    let headerName = getViewHeaderName(element);
    let desktopId = activeDesktop.div_id;
    let str = "";
    str += `<div id="${viewDivId}" class="innerDesktop" view="${view}" uniqueid="${element.uniqueId}" shieldElementId="${element.elementId}">` +
        `<div class="panel-header-container ${view}">` +
        `<span class="${viewType.icon} findSourceHotlink" title="Show Source Hotlink"></span>` +
        `<span class="panel-header">${viewType.label.toUpperCase()} : ${objectTypeIcon} <span class="viewHeaderName" title="${headerName.toUpperCase()}">${headerName.toUpperCase()}</span></span>` +
        `<span class="rgtnavdfstage_build_workbench_close close-btn ${closeBtnClass}" id="closeAssociationView${desktopId}" title="Close">` +
        `<span class="ss-cancel" style="font-size: 11px;"></span>` +
        `</span>` +
        `<span class="flaticon-fullscreen expandView ResizingIcon fright" title="Full Screen"></span>` +
        `<span class="flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none" title="Default Screen"></span>`;
    str += `<span class="fright flaticon-refresh-button refreshButton" title="Refresh"></span>`;
    str += `</div>`;
    if (res.children) {
        str += "<div class=\"treeContainerWithOutRow\">" +
            `<div class="tree_structure_parent">` +
            `<ul class="directoryView_ringList clearfix directoryViewList directoryViewList_DV directoryViewUl" id="${viewDivId}_${viewType.name}_tree_container"></ul>` +
            "</div>" +
            "</div>";
    }
    str += "</div>";
    $("#" + desktopId).append(str);
    repositionViews(isBiview);
}

function renderDirectoryViewForGuidanceView(data, viewId, viewType, view) {
    let isBiview = isBiViewOrNot(view);
    let associationViewId = `${viewId}_${viewType.name}_tree_container`;
    renderDirectoryView(data, associationViewId, view, viewType.name, isBiview);
}

function guidanceAddChildClick($this, viewType) {
    let shieldElementUniqueId, shieldElement, shieldElementId, sourceId, source, data = {};
    let desktop = $this.closest(".innerDesktop");
    let src_hotlinkId = $this.attr("id");
    let view = desktop.attr("view");
    let isBiview = isBiViewOrNot(view);
    let uniqueId = $this.attr("uniqueId");
    let label = $this.attr("title");
    if (viewType.key !== "create_source_view") {
        shieldElementUniqueId = desktop.attr("uniqueId");
        shieldElement = backing.dictionary_of_unique_id_to_attr_object[shieldElementUniqueId];
        shieldElementId = shieldElement.elementId;
        sourceId = desktop.find(".sourceSelectorSelected").attr("elementId");
        source = desktop.find(".sourceSelectorSelected").html();
        data = {shieldElementId, sourceId};
    }
    let desktopId = desktop.attr("id");
    let childviewDivId = viewType.name + "_" + src_hotlinkId;
    //check for space in screen
    let haveSpaceToOpenView = checkIfViewCanOpen(viewType.key);
    if (!haveSpaceToOpenView) {
        return;
    }
    //check view is opened before
    let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
    if (isViewOpenedBefore) {
        return;
    }
    createScenarioViewOpenedFromView(childviewDivId, desktopId, src_hotlinkId, viewType.key, label, uniqueId, isBiview);
    if (viewType.key === "create_source_view") {
        renderCreateSourceView(childviewDivId, view, shieldElement, source, uniqueId, data, label, viewType);
    }
    else {
        renderCreateGuidanceView(childviewDivId, view, shieldElement, source, uniqueId, data, label, viewType);
    }
    repositionViews(isBiview);
    highlightSourceAndView(childviewDivId, isBiview);

}

function renderCreateGuidanceView(viewName, view, shieldElement, source, uniqueId, data, label, viewType) {
    let str = "", createText;
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(shieldElement, isBiview);
    if (viewType.key === "create_guidance_view") {
        createText = "create-guidance-child";
    }
    else if (viewType.key === "create_test_procedure_view") {
        createText = "create-test-procedure-child";
    }
    str += `<div id="${viewName}" class="innerDesktop childviewDesktop" view="${view}"  uniqueId ="${uniqueId}">` +
        `<div class="panel-header-container ${view}">` +
        `<span class="flaticon-add-attribute dataViewIcon findSourceHotlink" title="Show Source Hotlink"></span>`;
    if (shieldElement.name)
        str += `<span class="panel-header">${label.toUpperCase()}: ${objectTypeIcon} ${shieldElement.name.toUpperCase()}</span>`;
    else
        str += "<span class=\"panel-header\">" + label.toUpperCase() + "</span>";
    str += `<span class="rgtnavdfstage_build_workbench_close close-btn ${view}CloseBtn" id="closeCreateShieldElementView${desktopId}" title="Close">` +
        `<span class="ss-cancel" style="font-size: 11px;"></span></span>` +
        `<span class="flaticon-fullscreen expandView ResizingIcon fright" title="Full Screen"></span>` +
        `<span class="flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none" title="Default Screen"></span>` +
        `<span class="fright flaticon-refresh-button refreshButton" title="Refresh"></span></div>` +
        `<div class="desktop-selector-container ${view}">` +
        `<span class="headerActionButton ${createText}" shieldElementId ="${data.shieldElementId}">CREATE</span></div>` +
        `<ul class="create-shield-element-container">` +
        `<li class="create-shield-field">` +
        `<label>DESCRIPTION<span style="color:#ec4c4c;">*</span>:</label><textarea class="descriptionInput guidanceView"></textarea></li>`;
    if (viewType.key === "create_test_procedure_view") {
        str += "<li class=\"create-shield-field\">" +
            `<label>DESCRIPTIVE ID<span style="color:#ec4c4c;">*</span>:</label><input class="referenceInput"/></li>`;
    }
    str += `<li class="create-shield-field" style="position: relative;">` +
        `<label>SOURCE:</label><input class="sourceDirectory hierarchySelected" readonly>` +
        `<div id="${viewName}source" class="hierarchyDropDown sourceDirectoryDropDown dis-none"></div>` +
        `<span class="actionButton clearSourceDirectory">CLEAR</span>` +
        `</ul></div>`;
    $("#" + desktopId).append(str);
    getDataForSourceDropDown(viewName);

}

function renderCreateSourceView(viewName, view, shieldElement, source, uniqueId, data, label, viewType) {
    let str = "", createText;
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    createText = "create-source";
    str += `<div id="${viewName}" class="innerDesktop childviewDesktop" view="${view}"  uniqueId ="${uniqueId}">` +
        `<div class="panel-header-container ${view}">` +
        `<span class="flaticon-add-attribute dataViewIcon findSourceHotlink" title="Show Source Hotlink"></span>`;
    str += "<span class=\"panel-header\">" + label.toUpperCase() + "</span>";
    str += `<span class="rgtnavdfstage_build_workbench_close tooltip tooltipstered close-btn ${view}CloseBtn" id="closeCreateShieldElementView${desktopId}" title="Close">` +
        `<span class="ss-cancel" style="font-size: 11px;"></span></span>` +
        `<span class="flaticon-fullscreen expandView ResizingIcon fright" title="Full Screen"></span>` +
        `<span class="flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none" title="Default Screen"></span>` +
        `<span class="fright flaticon-refresh-button refreshButton" title="Refresh"></span></div>` +
        `<div class="desktop-selector-container ${view}">` +
        `<span class="headerActionButton ${createText}" shieldElementId ="${data.shieldElementId}">CREATE</span></div>` +
        `<ul class="create-shield-element-container">` +
        `<li class="create-shield-field">` +
        `<label>NAME<span style="color:#ec4c4c;">*</span>:</label><input class="nameInput"></li>` +
        `<li class="create-shield-field">` +
        `<label>DESCRIPTION:</label><textarea class="descriptionInput"></textarea></li>` +
        `<li class="create-shield-field">` +
        `<label>ORGANIZATION NAME<span style="color:#ec4c4c;">*</span>:</label><input class="orgInput"></li>`;
    `</ul></div>`;
    $("#" + desktopId).append(str);
}

function renderSourceGuidanceDirectoryView(selector, isBiview, viewType) {
    $("#saveData").show();
    let data = {};
    let selectedElement = selector;
    let desktop = selectedElement.closest(".innerDesktop");
    let viewDivId = desktop.attr("id");
    let activeDesktop = getActiveDesktop(isBiview);
    data.sourceId = selector.attr("elementId");
    data.elementId = desktop.attr("shieldelementid");
    let view = getSingleOrBiView(isBiview);
    service.getGuidances(data, function (res, err) {
        if (res) {
            generateUniqueIdAndParentLink(res, viewType.name, null);
            renderDirectoryViewForGuidanceView(res, viewDivId, viewType, view);
            $("#saveData").hide();
        }
        else if (err) {
            $("#saveData").hide();
            errorHandler(err);
        }
    });
    let viewId = $("#" + viewDivId + "_sourceSelector");
    viewId.html(selectedElement.html());
    viewId.attr("elementId", selectedElement.attr("elementId"));
    $("#" + viewDivId + "_sourceDropDown").addClass("dis-none");
}

function renderSourceTestProcedureDirectoryView(selector, isBiview, viewType) {
    $("#saveData").show();
    let data = {};
    let selectedElement = selector;
    let desktop = selectedElement.closest(".innerDesktop");
    let viewDivId = desktop.attr("id");
    let activeDesktop = getActiveDesktop(isBiview);
    data.sourceId = selector.attr("elementId");
    data.elementId = desktop.attr("shieldelementid");
    let view = getSingleOrBiView(isBiview);
    service.getTestProcedures(data, function (res, err) {
        if (res) {
            generateUniqueIdAndParentLink(res, viewType.name, null);
            renderDirectoryViewForGuidanceView(res, viewDivId, viewType, view);
            $("#saveData").hide();
        }
        else if (err) {
            $("#saveData").hide();
            errorHandler(err);
        }
    });
    let viewId = $("#" + viewDivId + "_sourceSelector");
    viewId.html(selectedElement.html());
    viewId.attr("elementId", selectedElement.attr("elementId"));
    $("#" + viewDivId + "_sourceDropDown").addClass("dis-none");
}

function renderGuidanceEditViewData(selector, view, viewType) {
    $("#saveData").show();
    let data = {}, serviceCall,
        desktop = selector.closest(".innerDesktop"),
        src_hotlinkId = selector.attr("id"),
        uniqueId = selector.attr("uniqueId"),
        label = selector.attr("title"),
        element = backing.dictionary_of_unique_id_to_attr_object[uniqueId],
        elementType = selector.attr("elementType"),
        isBiview = isBiViewOrNot(view),
        childviewDivId = viewType.name + "_" + src_hotlinkId,
        desktopId = desktop.attr("id"),
        haveSpaceToOpenView = checkIfViewCanOpen(viewType.key);
    if (!haveSpaceToOpenView) {
        return;
    }
    let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
    if (isViewOpenedBefore) {
        return;
    }
    if (viewType.name === "editGuidanceView") {
        data = {guidanceId: element.elementId};
        serviceCall = service.getGuidancesInfo;
    }
    else if (viewType.name === "editTestProcedureView") {
        data = {testProcedureId: element.elementId};
        serviceCall = service.getTestProceduresInfo;
    }
    else if (viewType.name === "editSourceView") {
        data = {sourceId: element.elementId};
        serviceCall = service.getSourceInfo;
    }

    createScenarioViewOpenedFromView(childviewDivId, desktopId, src_hotlinkId, viewType.key, label, uniqueId, isBiview);
    serviceCall(data, function (res, err) {
        if (res) {
            if (viewType.name === "editSourceView") {
                renderEditSourceView(childviewDivId, res, view, element, uniqueId, label);
            }
            else {
                renderEditGuidanceView(childviewDivId, res, view, element, uniqueId, label);
            }
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
        }
        else if (err) {
            errorHandler(err);
        }
        $("#saveData").hide();
    });
}

function renderEditGuidanceView(viewName, res, view, element, uniqueId, label) {
    let str = "";
    let {elementId, description, referenceId, sourceId} = res;
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview);
    str += `<div id="${viewName}" class="innerDesktop childviewDesktop" view="${view}"  uniqueId ="${uniqueId}">` +
        `<div class="panel-header-container ${view}">` +
        `<span class="flaticon-add-attribute dataViewIcon findSourceHotlink" title="Show Source Hotlink"></span>`;
    if (element.name)
        str += `<span class="panel-header">${label.toUpperCase()}: ${objectTypeIcon} ${element.name.toUpperCase()}</span>`;
    else
        str += `<span class="panel-header">${label.toUpperCase()}</span>`;
    str += `<span class="rgtnavdfstage_build_workbench_close close-btn ${view}CloseBtn" id="closeCreateShieldElementView${desktopId}" title="Close">` +
        `<span class="ss-cancel" style="font-size: 11px;"></span>` +
        "</span>" +
        `<span class="flaticon-fullscreen expandView ResizingIcon fright" title="Full Screen"></span>` +
        `<span class="flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none" title="Default Screen"></span>` +
        `<span class="fright flaticon-refresh-button refreshButton" title="Refresh"></span>` +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        `<span class="headerActionButton save-${element.objectType}-child" elementId="${elementId}">SAVE</span>` +
        "</div>" +
        `<ul class="create-shield-element-container">` +
        `<li class="create-shield-field">` +
        `<label>DESCRIPTION<span style="color:#ec4c4c;">*</span>:</label><textarea class="descriptionInput guidanceView">${description}</textarea></li>`;
    if (element.objectType === "test_procedure") {
        str += "<li class=\"create-shield-field\">" +
            `<label>DESCRIPTIVE ID<span style="color:#ec4c4c;">*</span>:</label><input class="referenceInput" value="${referenceId}"/></li>`;
    }
    str += `<li class="create-shield-field" style="position: relative;">` +
        `<label>SOURCE:</label><input class="sourceDirectory hierarchySelected" readonly>` +
        `<div id="${viewName}source" class="hierarchyDropDown sourceDirectoryDropDown dis-none"></div>` +
        `<span class="actionButton clearSourceDirectory">CLEAR</span>` +
        `</ul></div>`;
    $("#" + desktopId).append(str);
    getDataForSourceDropDown(viewName, sourceId);
}

function renderEditSourceView(viewName, res, view, element, uniqueId, label) {
    let str = "";
    let {elementId, name, description, organizationName, referenceId} = res;
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview);
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"flaticon-add-attribute dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    if (element.name)
        str += "<span class=\"panel-header\">" + label.toUpperCase() + ": " + objectTypeIcon + "" + element.name.toUpperCase() + "</span>";
    else
        str += "<span class=\"panel-header\">" + label.toUpperCase() + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        `<span class="headerActionButton save-${element.objectType}-child" elementId="${elementId}">SAVE</span>` +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        `<li class="create-shield-field">` +
        `<label>NAME<span style="color:#ec4c4c;">*</span>:</label><input class="nameInput" value="${name}"></li>` +
        `<li class="create-shield-field">` +
        `<label>DESCRIPTION:</label><textarea class="descriptionInput">${description}</textarea></li>` +
        `<li class="create-shield-field">` +
        `<label>ORGANIZATION NAME<span style="color:#ec4c4c;">*</span>:</label><input class="orgInput" value="${organizationName}"></li>`;
    str += "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
}

