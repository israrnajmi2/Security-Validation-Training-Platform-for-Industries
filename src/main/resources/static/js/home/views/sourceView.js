$(document).ready(function () {
    $(document).on("click", ".sourceView", function (e) {
        let desktop = $(this).closest(".innerDesktop");
        let side = desktop.attr("side");
        let isBiview = isBiViewOrNot(side);
        sourceViewClick($(this), backing.view_type.source_view, isBiview);
        e.stopPropagation();
    });

    $(document).on("click", ".sourceView-add-child", function (e) {
        guidanceAddChildClick($(this), backing.view_type.create_source_view);
        e.stopPropagation();
    });

    $(document).on("click", ".singleview-sourceView-edit-element", function (e) {
        renderGuidanceEditViewData($(this), "singleview", backing.view_type.edit_source_view);
        e.stopPropagation();
    });

    $(document).on("click", ".biview-sourceView-edit-element", function (e) {
        renderGuidanceEditViewData($(this), "biview", backing.view_type.edit_source_view);
        e.stopPropagation();
    });

    $(document).on("click", ".save-ingest_source-child", function (e) {
        let $this = $(this);
        let desktop = $this.closest(".innerDesktop");
        let view = desktop.attr("view");
        let elementId = $this.attr("elementId"),
            name = desktop.find(".nameInput").val().trim(),
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
        let data = {elementId, description, organizationName, name};
        service.saveSource(data, function (res, err) {
            if (res) {
                alert("Edited Successfully");
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

});

function sourceViewClick(selector, viewType, isBiview) {
    $("#saveData").show();
    let src_hotlinkId = selector.attr("id");
    let viewDivId = viewType.name + "_" + src_hotlinkId;
    let view = getSingleOrBiView(isBiview);
    let uniqueId = view + "_" + src_hotlinkId;
    let activeDesktop = getActiveDesktop(isBiview);
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
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
    service.getSourcesDv(null, function (res, err) {
        if (res) {
            generateUniqueIdAndParentLink(res, viewType.name, null);
            renderSourceView(res, viewDivId, viewType, isBiview);
            // renderSourceDropDown(sourceRes.children, view,viewDivId,viewType);
            renderDirectoryViewForGuidanceView(res, viewDivId, viewType, view);
            createScenarioViewOpenedFromAnchorSingleCase(viewDivId, active_desktop_directory_view_id, src_hotlinkId, viewType.key, viewType.label, uniqueId, isBiview);
            // //call reposition home function
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

function renderSourceView(res, viewDivId, viewType, isBiview) {
    let view = getSingleOrBiView(isBiview);
    let activeDesktop = getActiveDesktop(isBiview);
    let closeBtnClass = view + "CloseBtn";
    let desktopId = activeDesktop.div_id;
    let str = "";
    str += `<div id="${viewDivId}" class="innerDesktop" view="${view}">` +
        `<div class="panel-header-container ${view}">` +
        `<span class="${viewType.icon} findSourceHotlink" title="Show Source Hotlink"></span>` +
        `<span class="panel-header">${viewType.label.toUpperCase()} </span>` +
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
}
