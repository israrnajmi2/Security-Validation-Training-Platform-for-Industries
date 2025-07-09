function repositionViews(isBiviewSide) {
    let views_to_be_shown = [];
    let views_to_be_minimized = [];
    let totalCount = 0;
    let maxCount = 3, count;
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, singleActiveDesktop, len, opened_view_object;
    if (isBiviewSide) {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        singleActiveDesktop = activeDesktop;
    }
    if (activeDesktop.opened_views) {
        if (backing.is_bi_view_active) {
            len = activeDesktop.opened_views.length;
            for (let i = 0; i < len; i++) {
                opened_view_object = activeDesktop.opened_views[i];
                if (i == 0) {
                    if ($("#" + opened_view_object.div_id).hasClass("dis-none")) {
                        $("#" + opened_view_object.div_id).removeClass("dis-none");
                    }
                    $("#" + opened_view_object.div_id).addClass("active");
                    views_to_be_shown.push(opened_view_object);
                }
                else {
                    $("#" + opened_view_object.div_id).removeClass("active");
                    $("#" + opened_view_object.div_id).addClass("dis-none");
                    views_to_be_minimized.push(opened_view_object);
                }
            }

        }
        else {
            len = activeDesktop.opened_views.length;
            for (let i = 0; i < len; i++) {
                opened_view_object = activeDesktop.opened_views[i];
                let viewType = opened_view_object.view_type;
                if (viewType) {
                    if (backing.view_type[viewType]) {
                        count = getCountOfQuadrantsNeeded(backing.view_type[viewType].minimal);
                        totalCount += count;
                        if (totalCount > maxCount) {
                            totalCount -= count;
                            $("#" + opened_view_object.div_id).removeClass("active");
                            $("#" + opened_view_object.div_id).addClass("dis-none");
                            views_to_be_minimized.push(opened_view_object);//add to minimize
                        }
                        else {
                            if ($("#" + opened_view_object.div_id).hasClass("dis-none")) {
                                $("#" + opened_view_object.div_id).removeClass("dis-none");
                            }
                            $("#" + opened_view_object.div_id).addClass("active");
                            views_to_be_shown.push(opened_view_object);//add to show
                        }
                    }
                    else {
                        alert(viewType + " not found in backing.view_type dictionary.");
                        $("#saveData").hide();
                        return false;
                    }

                }
                else {
                    alert("Please check open home object.. view_type cannot be undefined");
                    $("#saveData").hide();
                    return false;
                }
            }
        }
        if (backing.is_bi_view_active) {

            showViewsBiView(isBiviewSide, views_to_be_shown);
        }
        else {
            showViewsSingleView(views_to_be_shown);
        }
        refreshGroupRingViews(activeDesktop.opened_views);
        updateMinimizeDropDown(views_to_be_minimized, isBiviewSide, activeDesktop.div_id);
    }
    if (singleActiveDesktop && (activeWorkspaceKeyname === "eval_workspace" || activeWorkspaceKeyname === "bi_eval_workspace")) {
        reOrderPerspective(false, activeDesktop);
    }
    let ringViewDivId = backing.view_type.ring_view.name + "_" + activeDesktop.div_id;
    if ($("#" + ringViewDivId).hasClass("active"))
        updateViewsStandards(ringViewDivId, activeDesktop.directoryJson);
}

function showViewsSingleView(views_to_be_shown) {
    let activeDesktop = getActiveDesktop(false);
    let horizontalHalfDivId = getViewSizeDivIdSingleViewCase(constants.viewSize.HORIZONTAL_HALF, views_to_be_shown);
    let anchorId = activeDesktop.anchor_div_id;
    deleteClass(anchorId);
    let quarterViewDivId;
    if (horizontalHalfDivId !== null) {
        deleteClass(horizontalHalfDivId);
        $("#" + horizontalHalfDivId).addClass("bottom-half-position");
        quarterViewDivId = getViewSizeDivIdSingleViewCase(constants.viewSize.QUARTER, views_to_be_shown);
        if (quarterViewDivId !== null) {
            $("#" + anchorId).addClass("top-left-quarter-position");
            deleteClass(quarterViewDivId);
            $("#" + quarterViewDivId).addClass("top-right-quarter-position");
        }
        else {
            $("#" + anchorId).addClass("top-half-position");
        }
    }
    else {
        var verticalHalfDivId = getViewSizeDivIdSingleViewCase(constants.viewSize.VERTICAL_HALF, views_to_be_shown);
        if (verticalHalfDivId !== null) {
            deleteClass(verticalHalfDivId);
            $("#" + verticalHalfDivId).addClass("right-half-position");
            quarterViewDivId = getViewSizeDivIdSingleViewCase(constants.viewSize.QUARTER, views_to_be_shown);
            if (quarterViewDivId !== null) {
                $("#" + anchorId).addClass("top-left-quarter-position");
                deleteClass(quarterViewDivId);
                $("#" + quarterViewDivId).addClass("bottom-left-quarter-position");
            }
            else {
                $("#" + anchorId).addClass("left-half-position");
            }
        }
        else {
            quarterViewDivId = getViewSizeDivIdSingleViewCase(constants.viewSize.QUARTER, views_to_be_shown);
            if (quarterViewDivId !== null) {

                var sortedArray = getSortedObjectArrayOfOpenedViews(views_to_be_shown);

                if (sortedArray.length === 3) {
                    deleteClass(sortedArray[0].divId);
                    $("#" + sortedArray[0].divId).addClass("top-right-quarter-position");
                    deleteClass(sortedArray[1].divId);
                    $("#" + sortedArray[1].divId).addClass("bottom-left-quarter-position");
                    deleteClass(sortedArray[2].divId);
                    $("#" + sortedArray[2].divId).addClass("bottom-right-quarter-position");
                    $("#" + anchorId).addClass("top-left-quarter-position");
                }
                else if (sortedArray.length === 2) {
                    deleteClass(sortedArray[0].divId);
                    $("#" + sortedArray[0].divId).addClass("right-half-position");
                    deleteClass(sortedArray[1].divId);
                    $("#" + sortedArray[1].divId).addClass("bottom-left-quarter-position");
                    $("#" + anchorId).addClass("top-left-quarter-position");
                }
                else if (sortedArray.length === 1) {
                    deleteClass(sortedArray[0].divId);
                    $("#" + sortedArray[0].divId).addClass("right-half-position");
                    $("#" + anchorId).addClass("left-half-position");
                }
                else {
                    alert("Error:There cannot be more than three home open . Please check with developer");
                }

            }
            else {
                $("#" + anchorId).addClass("full-screen-position");
            }

        }
    }
}

function showViewsBiView(isBiviewSide, views_to_be_shown) {
    let activeDesktop = getActiveDesktop(isBiviewSide);
    if (!isBiviewSide) {
        if (views_to_be_shown) {
            let singleViewCount = views_to_be_shown.length;
            let singleViewAnchorId = activeDesktop.anchor_div_id;
            deleteClass(singleViewAnchorId);
            if (singleViewCount > 1)
                alert("Check with developer- opened home count bi view case cannot ever be greater than one");
            if (singleViewCount === 1) {
                deleteClass(views_to_be_shown[0].div_id);
                $("#" + views_to_be_shown[0].div_id).addClass("bottom-half-position");
                $("#" + singleViewAnchorId).addClass("top-half-position");
            }
            else {
                $("#" + singleViewAnchorId).addClass("full-screen-position");
            }
        }
    }
    else {
        if (views_to_be_shown) {
            let biViewCount = views_to_be_shown.length;
            let biViewAnchorId = activeDesktop.anchor_div_id;
            deleteClass(biViewAnchorId);
            if (biViewCount > 1)
                alert("Check with developer- opened home count bi view case cannot ever be greater than one");
            if (biViewCount === 1) {
                deleteClass(views_to_be_shown[0].div_id);
                $("#" + views_to_be_shown[0].div_id).addClass("bottom-half-position");
                $("#" + biViewAnchorId).addClass("top-half-position");
            }
            else {
                $("#" + biViewAnchorId).addClass("full-screen-position");
            }
        }
    }
}

function deleteClass(id) {
    let $Id = $("#" + id);
    let classToRemove = ["top-left-quarter-position",
        "top-right-quarter-position", "bottom-left-quarter-position", "bottom-right-quarter-position", "left-half-position",
        "right-half-position", "top-half-position", "bottom-half-position", "full-screen-position", "half-desktop", "full-desktop", "fullScreen"];
    for (let i = 0; i < classToRemove.length; i++) {
        if ($Id.hasClass(classToRemove[i]))
            if (classToRemove[i] === 'fullScreen') {
                $Id.find(".collapseView").addClass("dis-none");
                $Id.find(".expandView").removeClass("dis-none");
                $Id.removeClass(classToRemove[i]);
            }
            else
                $Id.removeClass(classToRemove[i]);
    }
}

function getIconForGivenViewType(viewName, viewId) {
    let str = "";
    let viewIcons = {
        "source_view": "flaticon-source",
        "guidance_view": "flaticon-guidance",
        "test_procedure_view": "flaticon-test-procedure",
        "evaluationview": "flaticon-ruler",
        "dataview": "flaticon-open-in-tab-2",
        "expressionview": "flaticon-open-tab-2",
        "pivot_view": "flaticon-axis-arrows",
        "ring_view": "flaticon-shape",
        "group_ring_view": "flaticon-round",
        "projection_view": "flaticon-projection"
    };
    if (viewName === "association_view" || viewName === "asset_association_view" || viewName === "protection_association_view") {
        str = "<span class=\"flaticon-arrow  menuText fleft clearfix\"><span class=\"flaticon-expression-element subscriptIcon menuIcon\"></span>";
    }
    else if (viewName.match(/^edit_/)) {
        str = "<span class=\"ss-edit menuIcon menuText fleft clearfix\">";
    }
    else if (viewName.match(/^create_/)) {
        str = "<span class=\"flaticon-add-attribute menuIcon menuText fleft clearfix\">";
    }
    else if (viewName === "exp_asset_association_view" || viewName === "direct_asset_association_view") {
        str = "<span class=\"flaticon-arrow  menuText fleft clearfix\"><span class=\"flaticon-asset-element subscriptIcon menuIcon\"></span>";
    }
    else if (viewName === "exp_assetType_association_view" || viewName === "direct_asset_type_association_view") {
        str = "<span class=\"flaticon-arrow  menuText fleft clearfix\"><span class=\"flaticon-asset-type-element subscriptIcon menuIcon\"></span>";
    }
    else if (viewName === "exp_shield_association_view") {
        str = "<span class=\"flaticon-arrow  menuText fleft clearfix\"><span class=\"flaticon-shield-element subscriptIcon menuIcon\"></span>";
    }
    else if (viewName === "exp_standard_association_view") {
        str = "<span class=\"flaticon-arrow menuText fleft clearfix\"><span class=\"flaticon-standard-element subscriptIcon  menuIcon\"></span>";
    }
    else if (viewName === "direct_asset_element_association_view" || viewName === "direct_asset_type_element_association_view" || viewName === "direct_shield_association_view") {
        if ($("#" + viewId).attr("objectType") === "standard_element")
            str = "<span class=\"flaticon-arrow menuText fleft clearfix\"><span class=\"flaticon-standard-element subscriptIcon  menuIcon\"></span>";
        else if ($("#" + viewId).attr("objectType") === "shield_element")
            str = "<span class=\"flaticon-arrow  menuText fleft clearfix\"><span class=\"flaticon-shield-element subscriptIcon menuIcon\"></span>";
        if ($("#" + viewId).attr("objectType") === "b_control")
            str = "<span class=\"flaticon-arrow menuText fleft clearfix\"><span class=\"flaticon-business-element subscriptIcon  menuIcon\"></span>";
        if ($("#" + viewId).attr("objectType") === "threat_element")
            str = "<span class=\"flaticon-arrow menuText fleft clearfix\"><span class=\"flaticon-threat-control subscriptIcon  menuIcon\"></span>";
    }
    else {
        str = "<span class=\"" + viewIcons[viewName] + " menuIcon menuText fleft clearfix\">";
    }
    return str;
}

function updateMinimizeDropDown(views_to_be_minimized, isBiviewSide, activeDesktopId) {
    let count = views_to_be_minimized.length;
    let $activeDesktopId = $("#" + activeDesktopId);
    let str = "Minimized views:<ul style=\"margin: 5px 0 0 5px;\">";
    if (views_to_be_minimized && views_to_be_minimized.length > 0) {
        $activeDesktopId.find(".viewsDropDown").attr("style", "opacity:1;");
        for (let i = 0; i < views_to_be_minimized.length; i++) {
            str += "<li class=\"ViewsDropDownLi clearfix\" title=\"" + views_to_be_minimized[i].name + "\" ViewId=\"" + views_to_be_minimized[i].div_id + "\">";
            str += getIconForGivenViewType(views_to_be_minimized[i].view_type, views_to_be_minimized[i].div_id);
            str += "" + views_to_be_minimized[i].name + "</span><span class=\"ss-cancel closeViewFromMenu fright\" title=\"close\"></span></li>";
        }
        str += "</ul>";
        $activeDesktopId.find(".viewsDropDownContent").html(str);
        $activeDesktopId.find(".viewsDropDown").attr("count", count);
    }
    else {
        $activeDesktopId.find(".viewsDropDownContent").html("");
        $activeDesktopId.find(".viewsDropDown").attr("style", "opacity:0;");
    }
}

function unshiftPassedViewIdObjInOpenedViews(isBiviewSide, viewIdToReorder) {
    let obj, openedViews, indexFound;
    let activeDesktop = getActiveDesktop(isBiviewSide);
    if (!isBiviewSide) {
        if (viewIdToReorder) {
            openedViews = activeDesktop.opened_views;
            indexFound = null;
            for (let i = 0; i < openedViews.length; i++) {
                if (openedViews[i].div_id === viewIdToReorder) {
                    indexFound = i;
                    break;
                }
            }
            if (indexFound != null) {
                if (backing.is_bi_view_active) {
                    var haveSpaceToOpenView = checkIfViewCanOpen(activeDesktop.opened_views[indexFound].view_type);
                    if (!haveSpaceToOpenView) {
                        return;
                    }
                }
                obj = openedViews[indexFound];
                activeDesktop.opened_views.splice(indexFound, 1);
                activeDesktop.opened_views.unshift(obj);
            }
        }
    }
    else {
        if (viewIdToReorder) {
            openedViews = activeDesktop.opened_views;
            indexFound = null;
            for (let i = 0; i < openedViews.length; i++) {
                if (openedViews[i].div_id === viewIdToReorder) {
                    indexFound = i;
                    break;
                }
            }
            if (indexFound != null) {
                obj = openedViews[indexFound];
                activeDesktop.opened_views.splice(indexFound, 1);
                activeDesktop.opened_views.unshift(obj);
            }

        }
    }
}

function getViewSizeDivIdSingleViewCase(viewSize, views_to_be_shown) {
    if (views_to_be_shown && views_to_be_shown.length > 0) {
        for (let i = 0; i < views_to_be_shown.length; i++) {
            let opened_view_object = views_to_be_shown[i];
            let viewType = opened_view_object.view_type;
            if (viewType) {
                if (backing.view_type[viewType]) {
                    if (backing.view_type[viewType].minimal === viewSize) {
                        return opened_view_object.div_id;
                    }
                }
                else {
                    alert(viewType + " not found in backing.view_type dictionary.");
                    return null;
                }

            }
            else {
                alert("Please check open home object.. view_type cannot be undefined");
                return null;
            }
        }
    }
    return null;
}

function getSortedObjectArrayOfOpenedViews(views_to_be_shown) {
    function comparePriority(a, b) {
        if (a.priority < b.priority)
            return -1;
        if (a.priority > b.priority)
            return 1;
        return 0;
    }

    let arrayToReturn = [];
    if (views_to_be_shown && views_to_be_shown.length > 0) {
        for (let i = 0; i < views_to_be_shown.length; i++) {
            let opened_view_object = views_to_be_shown[i];
            let viewType = opened_view_object.view_type;
            if (viewType) {
                if (backing.view_type[viewType]) {
                    let newObjetToPushToArray = {};
                    newObjetToPushToArray.priority = backing.view_type[viewType].priority;
                    newObjetToPushToArray.divId = views_to_be_shown[i].div_id;
                    arrayToReturn.push(newObjetToPushToArray);
                }
                else {
                    alert(viewType + " not found in backing.view_type dictionary.");
                    return null;
                }
            }
            else {
                alert("Please check open home object.. view_type cannot be undefined");
                return null;
            }
        }
    }
    arrayToReturn.sort(comparePriority);
    return arrayToReturn;
}

function highlightSourceAndView(viewId, isBiviewSide) {
    let openedViewIndex, $sourceHotlinkId, closestUl;
    let activeDesktop = getActiveDesktop(isBiviewSide);
    let $viewId = $("#" + viewId);
    if (!isBiviewSide) {
        openedViewIndex = getIndexOfOpenedViewFromPassedOpenedViews(viewId, activeDesktop.opened_views);
        $sourceHotlinkId = $("#" + activeDesktop.opened_views[openedViewIndex].source_hotlink_id);
        closestUl = $sourceHotlinkId.closest(".directoryViewUlE");
        if (closestUl.length !== 0) {
            closestUl.parents(".element_li").each(function () {
                let $firstSpan = $(this).children(".directoryListItemContainer").children(".whiteBgTriangle").find("span:first");
                if ($firstSpan.hasClass("triangle_deactive")) {
                    $firstSpan.attr("class", "triangle_active fleft");
                }
            });
        }
        if ($sourceHotlinkId.closest(".tree_structure_parent").length !== 0 || $sourceHotlinkId.closest(".tree_structure_parent_schema").length !== 0) {
            let a = $sourceHotlinkId.closest(".tree_structure_parent"),
                b = $sourceHotlinkId;
            if (b.closest(".innerDesktop").hasClass("active"))
                a.animate({
                    scrollTop: b.offset().top - a.offset().top + a.scrollTop() - 100,
                    scrollLeft: a.scrollLeft()
                }, 300);
            $viewId.find(".panel-header-container").addClass("headerColorAnimation");
            $sourceHotlinkId.addClass("colorAnimation");
            setTimeout(() => {
                $sourceHotlinkId.removeClass("colorAnimation");
            }, 5001)
        }
    }
    else {
        openedViewIndex = getIndexOfOpenedViewFromPassedOpenedViews(viewId, activeDesktop.opened_views);
        $sourceHotlinkId = $("#" + activeDesktop.opened_views[openedViewIndex].source_hotlink_id);
        closestUl = $sourceHotlinkId.closest(".directoryViewUlE");
        if (closestUl) {
            closestUl.parents(".element_li").each(function () {
                let $firstSpan = $(this).children(".directoryListItemContainer").children(".whiteBgTriangle").find("span:first");
                if ($firstSpan.hasClass("triangle_deactive")) {
                    $firstSpan.attr("class", "triangle_active fleft");
                }
            });
        }
        let a = $sourceHotlinkId.closest(".tree_structure_parent"),
            b = $sourceHotlinkId;
        if (b.closest(".innerDesktop").hasClass("active"))
            a.animate({
                scrollTop: b.offset().top - a.offset().top + a.scrollTop() - 100,
                scrollLeft: a.scrollLeft()
            }, 300);

        $viewId.find(".panel-header-container").addClass("biHeaderColorAnimation");
        $sourceHotlinkId.addClass("colorAnimation");
        setTimeout(() => {
            $sourceHotlinkId.removeClass("colorAnimation");
        }, 5001)
    }
}

function checkIfViewCanOpen(viewTypeToBeOpened) {
    if (backing.is_bi_view_active) {

        if (backing.view_type[viewTypeToBeOpened]) {
            if (backing.view_type[viewTypeToBeOpened].minimal === constants.viewSize.QUARTER)
                return true;
        }
        else {
            alert(viewTypeToBeOpened + " not found in backing.view_type dictionary.");
            $("#saveData").hide();
            return false;
        }
    }
    return true;
}

function getCountOfQuadrantsNeeded(viewSize) {
    switch (viewSize) {
        case constants.viewSize.QUARTER:
            return 1;
        case constants.viewSize.VERTICAL_HALF:
            return 2;
        case constants.viewSize.HORIZONTAL_HALF:
            return 2;
        default: {
            alert("Error: Unknown ViewSize " + viewSize);
            return 5;
        }
    }
}

function checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(viewDivId, isBiviewSide) {
    //check if element with this id already exist
    if ($("#" + viewDivId).length === 0) {
        return false;
    }
    else {
        unshiftPassedViewIdObjInOpenedViews(isBiviewSide, viewDivId);
        repositionViews(isBiviewSide);
        $("#saveData").hide();
        return true;
    }
}

function getCurrentOpenedView(activeDesktop, viewId) {
    for (let i = 0; i < activeDesktop.opened_views.length; i++) {
        if (activeDesktop.opened_views[i].div_id === viewId) {
            return activeDesktop.opened_views[i];
        }
    }
}

