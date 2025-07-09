$(document).ready(function () {
    $(document).on("click", ".singleview-data-view", function (e) {
        let target = $(e.target);
        dataviewClick($(this), "singleview");
        if (target.parents(".r_conainer").length) {
            e.stopPropagation();
        }
        e.stopPropagation();
    });

    $(document).on("click", ".biview-data-view", function (e) {
        let target = $(e.target);
        dataviewClick($(this), "biview");
        if (target.parents(".r_conainer").length) {
            e.stopPropagation();
        }
        e.stopPropagation();
    });

    $(document).on("click", ".expandView", function () {
        $(this).addClass("dis-none");
        let innerDesktop = $(this).closest(".innerDesktop");
        let id = innerDesktop.attr("id");
        let view = innerDesktop.attr("view");
        let isBiview = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiview);
        $(this).next(".collapseView").removeClass("dis-none");
        deleteClass(id);
        $("#" + id).addClass("fullScreen");
        refreshRingView($(this));
        refreshGroupRingViews(activeDesktop.opened_views);
    });

    $(document).on("click", ".collapseView", function () {
        $(this).addClass("dis-none");
        let innerDesktop = $(this).closest(".innerDesktop");
        let id = innerDesktop.attr("id");
        $(this).prev(".expandView").removeClass("dis-none");
        $("#" + id).removeClass("fullScreen");
        if ($(this).parent().hasClass("biview"))
            repositionViews(true);
        else
            repositionViews(false);
    });

    $(document).on("click", ".findSourceHotlink", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let isBiview = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiview);
        let viewId = desktop.attr("id");
        let indexOfCurrentOpenedView = getIndexOfOpenedViewFromPassedOpenedViews(viewId, activeDesktop.opened_views);
        let currentOpenedView = activeDesktop.opened_views[indexOfCurrentOpenedView];
        let uniqueId = currentOpenedView.uniqueId;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let sourceHotlinkId = currentOpenedView.source_hotlink_id;
        let hotlinkId = $("#" + sourceHotlinkId);
        if (sourceHotlinkId && sourceHotlinkId != null) {
            hotlinkId.addClass("active");
            hotlinkId.parents(".directoryViewUlE").attr("style", "display:block;");
            hotlinkId.toggleClass("colorAnimation");
            let closestUl = hotlinkId.closest(".directoryViewUlE");
            if (closestUl) {
                closestUl.parents(".element_li").each(function () {
                    if ($(this).children(".directoryListItemContainer").children(".whiteBgTriangle").find("span:first").hasClass("triangle_deactive")) {
                        $(this).children(".directoryListItemContainer").children(".whiteBgTriangle").find("span:first").attr("class", "triangle_active fleft");
                    }
                });
            }
            let a = hotlinkId.closest(".tree_structure_parent");
            let b = hotlinkId;
            a.animate({
                scrollTop: b.offset().top - a.offset().top + a.scrollTop() - 100,
                scrollLeft: b.offset().left - a.offset().left + a.scrollLeft() - 200
            }, 300);
        }
        else {
            alert("Source Hotlink for this view does not exist: The source view may have been closed");
        }

    });

    $(document).on("click", ".artifactName", function (e) {
        $(this).closest(".artifacts").find(".artifactDesc").toggleClass("dis-none");
        e.stopPropagation();
    });
});

function dataviewClick($this, view) {
    $("#saveData").show();
    let isBiview = isBiViewOrNot(view);
    let src_hotlinkId = $this.attr("id");
    let ratingDataView = $this.attr("ratingDataView");
    let src_id = $this.closest(".innerDesktop").attr("id");
    let viewDivId = backing.view_type.dataview.name + "_" + src_hotlinkId;
    let uniqueId = $this.attr("uniqueid");
    let activeDesktop = getActiveDesktop(isBiview);
    //check for space in screen
    let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.dataview.key);
    if (!haveSpaceToOpenView) {
        return;
    }
    //check view is opened before
    let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(viewDivId, isBiview);
    if (isViewOpenedBefore) {
        return;
    }
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
    let data = {};
    if (ratingDataView === "true") {
        data.elementId = element[ATTR.ratingId];
        data.objectType = element[ATTR.ratingObjectType];
    }
    else {
        data.elementId = element[ATTR.elementId];
        data.objectType = element[ATTR.objectType];
    }
    let name;
    if (data.objectType === constants.objectType.SCE_ROOT || data.objectType === constants.objectType.SCE) {
        let elementName = combineChainElements(element);
        name = elementName.str;
    }
    else {
        name = element[ATTR.name];
    }
    service.getSingleDataView(data, function (res, err) {
        if (res) {
            generateUniqueIdAndParentLink(res, "dataView", null);
            if (active_desktop_directory_view_id === src_id)
                createScenarioViewOpenedFromAnchorSingleCase(viewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.dataview.key, "Data View: " + name, uniqueId, isBiview);
            else
                createScenarioViewOpenedFromView(viewDivId, src_id, src_hotlinkId, backing.view_type.dataview.key, "Data View: " + name, uniqueId, isBiview);
            renderDataView(view, res, viewDivId, element, ratingDataView);
            if (res[ATTR.children])
                renderDirectoryViewDataView(view, res[ATTR.children], viewDivId);
            highlightSourceAndView(viewDivId, isBiview);
            $("#saveData").hide();
        }
        else if (err) {
            errorHandler(err);
            $("#saveData").hide();
        }
    });
}

function renderDataView(view, res, viewName, element, ratingDataView) {
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(undefined, view);
    let desktopId = activeDesktop.div_id;
    let objIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true, ratingDataView);
    let headerName = getViewHeaderName(element);
    let str = "";
    if (ratingDataView === "true")
        str += `<div id="${viewName}" class="innerDesktop dataviewDesktop" view="${view}" uniqueid="${element.uniqueId}" ratingDataView="${ratingDataView}">`;
    else
        str += `<div id="${viewName}" class="innerDesktop dataviewDesktop" view="${view}" uniqueid="${element.uniqueId}">`;
    str += `<div class="panel-header-container ${view}">` +
        `<span class="flaticon-open-in-tab-2 findSourceHotlink dataViewIcon"  title="Show Source Hotlink"></span>`;
    str += `<span class="panel-header">DATA VIEW: ${objIcon} <span class="viewHeaderName" title="${headerName.toUpperCase()}">${headerName.toUpperCase()}</span></span>`;
    str += `<span class="rgtnavdfstage_build_workbench_close close-btn ${view}CloseBtn" id=\"closeDataView${desktopId}" title="Close">` +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"dataView-content\">" +
        "<div class=\"dataView-description\">" +
        "<span class=\"descriptionheading\">Name:</span>";
    if (element.objectType === "sce") {
        str += "<div class=\"descriptionContent elementName\">" + headerName + "</div>";
    }
    else {
        str += "<div class=\"descriptionContent elementName\">" + res[ATTR.name] + "</div>";
    }
    str += "<span class=\"descriptionheading\">Description:</span>";
    if (res[ATTR.description] && res[ATTR.description] !== "")
        str += `<div class="descriptionContent elementDescription">${res[ATTR.description]}</div>`;
    else
        str += "<div class=\"descriptionContent elementDescription\">No Description</div>";
    str += "<div><span class=\"descriptionheading\">Artifacts:</span>" +
        "<div class=\"descriptionContent createArtifact\">+  Artifact</div><ul class=\"artifactsDisplay\">";
    str += "</ul></div></div>";
    if (res[ATTR.children]) {
        let renderData = res[ATTR.children];
        for (let i = 0; i < renderData.length; i++) {
            str += "<div class=\"dataView-directoryView\">" +
                "<div class=\"tree_structure_parent tree_structure_parent_dataView\">" +
                "<ul class=\"directoryView_ringList clearfix directoryViewList directoryViewList_DV directoryViewUl\" " +
                "id=\"" + viewName + "_dataView_" + i + "\"></ul>" +
                "<div class=\"noSearchResults\" hidden>No Search Results</div>" +
                "</div>" +
                "</div>";
        }
    }
    str += "</div>";
    if ($("#" + desktopId).find("#" + viewName).length === 0)
        $("#" + desktopId).append(str);
    getArtifacts(res.artifacts, viewName, view);
    repositionViews(isBiview);
}

function getArtifacts(artifacts, viewName, view) {
    let isBiview = isBiViewOrNot(view);
    let str = "";
    if (artifacts && artifacts.length > 0) {
        for (let i = 0; i < artifacts.length; i++) {
            artifacts[i].uniqueId = viewName + "_" + artifacts[i].elementId + "_" + artifacts[i].objectType;
            backing.dictionary_of_unique_id_to_attr_object[artifacts[i].uniqueId] = artifacts[i];
            let description = (artifacts[i].description) ? artifacts[i].description : "No description";
            str += "<li class=\"artifacts\">" +
                "<a class=\"flaticon-file-download\" href=\"/rest/artifact/download/" + artifacts[i].elementId + "\"></a>" +
                "<span title=\"" + artifacts[i].fileName + "\" class=\"artifactName\">" + artifacts[i].name + "&nbsp;&nbsp;[ " + artifacts[i].fileName + " ]</span>";
            str += renderHotlinkInventoryDv(artifacts[i], viewName, view, "dataView", false);
            str += "<div class=\"artifactDesc dis-none\" style=\"padding:8px 0 0 30px;\">description: " + description + "</div>" +
                "</li>";
        }
    }
    else
        str += "<li class=\"artifacts\">No Artifacts</li>";
    $("#" + viewName).find(".artifactsDisplay").html(str);
    highlightHotlinks(isBiview);
}

function renderDirectoryViewDataView(view, data, viewId) {
    for (let i = 0; i < data.length; i++) {
        let dataViewId = viewId + "_dataView_" + i;
        renderDirectoryView(data[i], dataViewId, view, "dataView", false);
    }
}

function highlightHotlink(id) {
    let idQuery = $("#" + id);
    if (id) {
        if (idQuery.length !== 0) {
            idQuery.addClass("active");
            idQuery.closest(".r_conainer").find(".d-text").addClass("active");
        }
    }

}

function createScenarioViewOpenedFromAnchorSingleCase(viewDivId, src_container_div_id, src_hotlinkId, viewType, viewHeaderName, uniqueId, isBiviewSide, associationRes) {
    let activeDesktop = getActiveDesktop(isBiviewSide);
    if (isBiviewSide) {
        if (!backing.biview.active_desktop.children_views) {
            backing.biview.active_desktop.children_views = {};
        }
        backing.biview.active_desktop.children_views[src_hotlinkId] = viewDivId;
        highlightHotlink(src_hotlinkId);
        let new_view_opened = {
            "div_id": viewDivId,
            "name": viewHeaderName,
            "view_type": viewType,
            "uniqueId": uniqueId,
            "source_view_div_id": src_container_div_id,
            "source_hotlink_id": src_hotlinkId,
            "children_views": {},
            "events_in_queue": [],
            "associationRes": associationRes
        };
        activeDesktop.opened_views.unshift(new_view_opened);
    }
    else {
        if (!backing.singleview.active_desktop.children_views) {
            backing.singleview.active_desktop.children_views = {};
        }
        backing.singleview.active_desktop.children_views[src_hotlinkId] = viewDivId;
        highlightHotlink(src_hotlinkId);
        let new_view_opened = {
            "div_id": viewDivId,
            "name": viewHeaderName,
            "view_type": viewType,
            "uniqueId": uniqueId,
            "source_view_div_id": src_container_div_id,
            "source_hotlink_id": src_hotlinkId,
            "children_views": {},
            "events_in_queue": [],
            "associationRes": associationRes
        };
        activeDesktop.opened_views.unshift(new_view_opened);
    }
}

function getIndexOfOpenedViewFromPassedOpenedViews(viewDivIdToFind, opened_views_array) {
    let length = opened_views_array.length;
    for (let i = 0; i < length; i++) {
        let obj = opened_views_array[i];
        if (obj.div_id === viewDivIdToFind)
            return i;
    }
    return null;
}

function createScenarioViewOpenedFromView(viewDivId, src_container_div_id, src_hotlinkId, viewType, viewHeaderName, uniqueId, isBiViewSide, associationRes) {
    let activeDesktop = getActiveDesktop(isBiViewSide);
    if (isBiViewSide) {
        if (!activeDesktop.opened_views) {
            activeDesktop.opened_views = [];
        }
        let index_of_opened_src_view_obj = getIndexOfOpenedViewFromPassedOpenedViews(src_container_div_id, activeDesktop.opened_views);
        if (index_of_opened_src_view_obj === null) {
            alert("Error: View with id " + src_container_div_id + " not found. please check with developer");
            return;
        }
        activeDesktop.opened_views[index_of_opened_src_view_obj].children_views[src_hotlinkId] = viewDivId;
        highlightHotlink(src_hotlinkId);
        let new_opened_view = {
            "div_id": viewDivId,
            "name": viewHeaderName,
            "view_type": viewType,
            "uniqueId": uniqueId,
            "source_view_div_id": src_container_div_id,
            "source_hotlink_id": src_hotlinkId,
            "children_views": {},
            "events_in_queue": [],
            "associationRes": associationRes
        };
        unshiftPassedViewIdObjInOpenedViews(true, src_container_div_id);
        activeDesktop.opened_views.unshift(new_opened_view);
    }
    else {
        if (!activeDesktop.opened_views) {
            activeDesktop.opened_views = [];
        }
        let index_of_opened_src_view_obj = getIndexOfOpenedViewFromPassedOpenedViews(src_container_div_id, activeDesktop.opened_views);
        if (index_of_opened_src_view_obj === null) {
            alert("Error: View with id " + src_container_div_id + " not found. please check with developer");
            return;
        }
        activeDesktop.opened_views[index_of_opened_src_view_obj].children_views[src_hotlinkId] = viewDivId;
        highlightHotlink(src_hotlinkId);
        let new_opened_view = {
            "div_id": viewDivId,
            "name": viewHeaderName,
            "view_type": viewType,
            "uniqueId": uniqueId,
            "source_view_div_id": src_container_div_id,
            "source_hotlink_id": src_hotlinkId,
            "children_views": {},
            "events_in_queue": [],
            "associationRes": associationRes
        };
        unshiftPassedViewIdObjInOpenedViews(false, src_container_div_id);
        activeDesktop.opened_views.unshift(new_opened_view);
    }
}

function deHighlightHotlink(id) {
    let idQuery = $("#" + id);
    if (id) {
        if (idQuery.length !== 0) {
            idQuery.removeClass("active");
            if (idQuery.closest(".r_conainer").find(".directory-text-icon.active").length <= 0)
                idQuery.closest(".r_conainer").find(".d-text").removeClass("active");
            idQuery.removeClass("colorAnimation");
        }
    }
    if (idQuery.hasClass("active"))
        idQuery.removeClass("active");
}

function closeViewUpdateOpenedViews(viewId, isBiViewSide) {
    //in backing.opened_views[viewId]
    let children_views, source_view_div_id, hotlink_id_of_src, childViewId, keys;
    let children_views_of_src, i;
    let activeDesktop = getActiveDesktop(isBiViewSide);
    if (isBiViewSide) {
        let index_of_opened_view_obj_to_be_closed = getIndexOfOpenedViewFromPassedOpenedViews(viewId, activeDesktop.opened_views);
        if (index_of_opened_view_obj_to_be_closed != null) {

            //children_views -- make them orphaned
            children_views = activeDesktop.opened_views[index_of_opened_view_obj_to_be_closed].children_views;
            if (children_views) {
                keys = Object.keys(children_views);
                for (i = 0; i < keys.length; i++) {
                    childViewId = children_views[keys[i]];
                    if (childViewId) {
                        let index_of_child_view_to_be_made_orphaned = getIndexOfOpenedViewFromPassedOpenedViews(childViewId, activeDesktop.opened_views);
                        if (index_of_child_view_to_be_made_orphaned != null) {
                            let findSourceHotlink = $("#" + childViewId).find(".findSourceHotlink");
                            findSourceHotlink.addClass("non-active");
                            delete activeDesktop.opened_views[index_of_child_view_to_be_made_orphaned].source_hotlink_id;
                            delete activeDesktop.opened_views[index_of_child_view_to_be_made_orphaned].source_view_div_id;
                        }
                    }
                }
            }
            //source_hotlink_id -- dehighlight & remove from childrenviews of activedesktop
            source_view_div_id = activeDesktop.opened_views[index_of_opened_view_obj_to_be_closed].source_view_div_id;
            hotlink_id_of_src = activeDesktop.opened_views[index_of_opened_view_obj_to_be_closed].source_hotlink_id;
            let index_of_opened_view_obj_of_view_where_closing_view_is_opened_from = getIndexOfOpenedViewFromPassedOpenedViews(source_view_div_id, activeDesktop.opened_views);
            if (index_of_opened_view_obj_of_view_where_closing_view_is_opened_from != null) {
                //children_views_of_src = index_of_opened_view_obj_of_view_where_closing_view_is_opened_from.children_views;
                deHighlightHotlink(hotlink_id_of_src);
                delete activeDesktop.opened_views[index_of_opened_view_obj_of_view_where_closing_view_is_opened_from].children_views[hotlink_id_of_src];

            }
            else if (activeDesktop.anchor_div_id === source_view_div_id) {
                children_views_of_src = backing.biview.active_desktop.children_views;
                deHighlightHotlink(hotlink_id_of_src);
                delete children_views_of_src[hotlink_id_of_src];
            }

            activeDesktop.opened_views.splice(index_of_opened_view_obj_to_be_closed, 1);

            $("#" + viewId).remove();

            repositionViews(true);
        }
    }
    else {
        let index_of_opened_view_obj_to_be_closed = getIndexOfOpenedViewFromPassedOpenedViews(viewId, activeDesktop.opened_views);
        if (index_of_opened_view_obj_to_be_closed != null) {
            //children_views -- make them orphaned
            children_views = activeDesktop.opened_views[index_of_opened_view_obj_to_be_closed].children_views;
            if (children_views) {
                keys = Object.keys(children_views);
                for (i = 0; i < keys.length; i++) {
                    childViewId = children_views[keys[i]];
                    if (childViewId) {
                        let index_of_child_view_to_be_made_orphaned = getIndexOfOpenedViewFromPassedOpenedViews(childViewId, activeDesktop.opened_views);
                        if (index_of_child_view_to_be_made_orphaned != null) {
                            let findSourceHotlink = $("#" + childViewId).find(".findSourceHotlink");
                            findSourceHotlink.addClass("non-active");
                            delete activeDesktop.opened_views[index_of_child_view_to_be_made_orphaned].source_hotlink_id;
                            delete activeDesktop.opened_views[index_of_child_view_to_be_made_orphaned].source_view_div_id;
                        }
                    }
                }
            }

            //source_hotlink_id -- dehighlight & remove from activedesktop.childrenviews
            source_view_div_id = activeDesktop.opened_views[index_of_opened_view_obj_to_be_closed].source_view_div_id;
            hotlink_id_of_src = activeDesktop.opened_views[index_of_opened_view_obj_to_be_closed].source_hotlink_id;
            let index_of_opened_view_obj_of_view_where_closing_view_is_opened_from = getIndexOfOpenedViewFromPassedOpenedViews(source_view_div_id, activeDesktop.opened_views);
            if (index_of_opened_view_obj_of_view_where_closing_view_is_opened_from != null) {
                //children_views_of_src = index_of_opened_view_obj_of_view_where_closing_view_is_opened_from.children_views;
                deHighlightHotlink(hotlink_id_of_src);
                delete activeDesktop.opened_views[index_of_opened_view_obj_of_view_where_closing_view_is_opened_from].children_views[hotlink_id_of_src];

            }
            else if (activeDesktop.anchor_div_id === source_view_div_id) {
                children_views_of_src = backing.singleview.active_desktop.children_views;
                deHighlightHotlink(hotlink_id_of_src);
                delete children_views_of_src[hotlink_id_of_src];
            }

            activeDesktop.opened_views.splice(index_of_opened_view_obj_to_be_closed, 1);

            $("#" + viewId).remove();

            repositionViews(false);
        }
    }
}
