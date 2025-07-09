$(document).ready(function () {
    $(document).on("click", ".root-ring-view", function (e) {
        let parentli = $(this).closest(".element_li").find(".directoryViewUlE").children(".element_li").first();
        parentli.children(".directoryListItemContainer").find(".flaticon-shape").trigger("click");
        e.stopPropagation();
    });

    $(document).on("click", ".singleview-ring-view", function (e) {
        renderRingViewData($(this), false);
        e.stopPropagation();
    });

    $(document).on("click", ".biview-ring-view", function (e) {
        renderRingViewData($(this), true);
        e.stopPropagation();
    });

    $(document).on("click", ".ringViewCloseBtn", function () {
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
        let innerDesktop = $(this).closest(".innerDesktop");
        let id = innerDesktop.attr("id");
        let view = innerDesktop.attr("view");
        if (view === "biview") {
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        }
        else {
            activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
            activeDesktopKeyname = backing.singleview.active_desktop.keyname;
            activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        }
        let activeDesktopDivId = $("#" + activeDesktop.anchor_div_id);
        activeDesktopDivId.find(".flaticon-shape.active").each(function () {
            let selector = $(this);
            selector.removeClass("active");
            selector.closest(".r_conainer").find(".d-text").removeClass("active");
        });
        activeDesktopDivId.find(".flaticon-shape").attr("style", "");
        innerDesktop.removeClass("active");
        innerDesktop.addClass("dis-none");
        if (view === "singleview")
            closeViewUpdateOpenedViews(id, false);
        else
            closeViewUpdateOpenedViews(id, true);
    });

    $(document).on("click", ".trafficMode", function () {
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, isBiview;
        let innerDesktop = $(this).closest(".innerDesktop");
        let view = innerDesktop.attr("view");
        if (view === "biview") {
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
            isBiview = true;
        }
        else {
            activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
            activeDesktopKeyname = backing.singleview.active_desktop.keyname;
            activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
            isBiview = false;
        }
        let ringViewDivId = backing.view_type.ring_view.name + "_" + activeDesktop.div_id;
        let ringViewIdWrapper = $("#" + ringViewDivId);
        if (activeDesktop.trafficModeSelection !== undefined && activeDesktop.trafficModeSelection === true) {
            activeDesktop.trafficModeSelection = false;
            ringViewIdWrapper.find(".ratingDescription").html("");
            $(this).attr("style", "opacity:0.3;");
            getCircleList(ringViewDivId, false, isBiview);
        }
        else {
            activeDesktop.trafficModeSelection = true;
            $(this).attr("style", "opacity:1;");
            ringViewIdWrapper.find(".ratingDescription").html("");
            getCircleList(ringViewDivId, true, isBiview);
        }
        activeDesktop.utilsFunction.getDirectoryView();
        if ($("#projectionViewShieldElement").hasClass("active") || $("#projectionViewRulerType").hasClass("active")) {
            let event = {"key": backing.event_type.selector_change.key};
            propagateEvent(event);
        }
        if (ringViewIdWrapper.hasClass("active"))
            updateViewsStandards(ringViewDivId, activeDesktop.directoryJson);

    });
});

function renderRingViewData(selector, isBiview) {
    $("#saveData").show();
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
    let opened = false;
    let src_hotlinkId = selector.attr("id");
    let src_id = selector.closest(".innerDesktop").attr("id");
    if (isBiview) {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
    }
    let ringViewDivId = backing.view_type.ring_view.name + "_" + activeDesktop.div_id;
    let uniqueId = selector.attr("uniqueid");
    activeDesktop.recentSelectedId = uniqueId;
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
    //check for space in screen
    let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.ring_view.key);
    if (!haveSpaceToOpenView) {
        $("#saveData").hide();
        return;
    }
    if (activeDesktop.opened_views.length === 0)
        opened = false;
    else
        for (let i = 0; i < activeDesktop.opened_views.length; i++) {
            if (activeDesktop.opened_views[i].div_id === ringViewDivId) {
                opened = true;
                break;
            }
        }
    if (opened === false) {
        renderRingView(ringViewDivId, isBiview);
        createScenarioViewOpenedFromAnchorSingleCase(ringViewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.ring_view.key, "Depth View: " + activeDesktop.full_name, uniqueId, isBiview);
    }
    let data = activeDesktop.directoryJson;
    let res = fun1(data.children, uniqueId);
    let resl = res.levels;
    let ringViewId = $("#" + ringViewDivId);
    activeDesktop.arr = resl.split(";");
    ringViewId.removeClass("dis-none");
    ringViewId.addClass("active");
    activeDesktop.ringCount = calcDepth(data, activeDesktop.arr);
    let level;
    if (element.level)
        level = element.level;
    else level = getLevelOfGivenUniqueId(activeDesktop.directoryJson, uniqueId, 0);
    if (level < 4) {
        activeDesktop.startPoint = 0;
        activeDesktop.endPoint = 3;
    }
    else {
        activeDesktop.startPoint = level - 3;
        activeDesktop.endPoint = activeDesktop.startPoint + 3;
        if (activeDesktop.endPoint >= activeDesktop.ringCount + 3) {
            let r = activeDesktop.endPoint - (activeDesktop.ringCount - 1);
            activeDesktop.startPoint = activeDesktop.startPoint - r;
            activeDesktop.endPoint = activeDesktop.endPoint - r;
        }
    }
    unshiftPassedViewIdObjInOpenedViews(isBiview, ringViewDivId);
    repositionViews(isBiview);
    updateViewsStandards(ringViewDivId, data);
    $("#" + src_id).find(".d-text").removeClass("active");
    $("#" + src_id).find(".flaticon-shape").removeClass("active");
    selector.addClass("active");
    selector.closest(".r_conainer").find(".d-text").addClass("active");
    document.getElementById(src_hotlinkId).scrollIntoView({behavior: "smooth", inline: "nearest"});
    $("#saveData").hide();
}

function renderRingView(viewName, isBiview) {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, viewClass, closeBtnClass;
    if (isBiview) {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "biview";
        closeBtnClass = "ringViewCloseBtn";
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "singleview";
        closeBtnClass = "ringViewCloseBtn";
    }
    let desktopId = activeDesktop.div_id;
    let str = "";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop associationViewDesktop dis-none\" view=\"" + viewClass + "\" uniqueid=\"" + activeDesktop.directoryJson.uniqueId + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">" +
        "<span class=\"flaticon-shape findSourceHotlink\" title=\"Show Source Hotlink\"></span>" +
        "<span class=\"panel-header\">DEPTH VIEW: " + activeDesktop.header_name.toUpperCase() + "</span>" +
        "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + closeBtnClass + "\" id=\"closeAssociationView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>";
    str += "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>";
    str += "</div>";
    str += "<div class =\"ringViewWrapper\" id = \"" + viewClass + "ringViewWrapper\"><div class=\"treeContainerRingView\">" +
        "<div class=\"tree_structure_of_element tree_structure_parent\"><ul class=\"directoryView_ringList clearfix directoryViewList directoryViewList_DV directoryViewUl\" id = \"Ring_directoryview\" style=\"margin-top: 10px;\">";
    str += "</ul>" +
        "</div>" +
        "</div>";
    str += "<div class=\"graphicalView\" id=\"" + viewName + "_wrapper\" ></div>";
    if ((activeWorkspaceKeyname === "eval_workspace" || activeWorkspaceKeyname === "bi_eval_workspace"))
        str += "<div class=\"ratingDescription\"></div>";
    str += "</div>";
    str += "</div>";
    $("#" + desktopId).append(str);
}

function getElementWithHotLinks(elementJson, idOfParentDiv, view) {
    let strVar = "";
    let isBiViewSide;
    if (view === "biview")
        isBiViewSide = true;
    else
        isBiViewSide = false;
    strVar += " <li class=\"element_li " + view + "_pivotli\" id=\"" + idOfParentDiv + "_" + elementJson.uniqueId + "\" uniqueId = \"" + elementJson.uniqueId + "\">\n";
    strVar += " <div class=\"directoryListItemContainer clearfix\">\n";
    strVar += " <span class=\"verticle_dotted_line-deactivate verticle_dotted_line-long\"></span>\n";
    strVar += " <div class=\"r_conainer fleft\">\n";
    strVar += renderCircleOrSquareInventoryDv(elementJson, isBiViewSide, "ringView");
    strVar += renderTextOfDv(elementJson);
    strVar += renderHotlinkInventoryDv(elementJson, idOfParentDiv, view, "RingView");
    strVar += " </div>\n";
    strVar += " </div>";
    strVar += "</li>\n";
    $("#" + idOfParentDiv).find("#Ring_directoryview").html(strVar);
}

function refreshRingView(viewId) {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
    let innerDesktop = viewId.closest(".innerDesktop");
    let view = innerDesktop.attr("view");
    if (view === "biview") {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
    }
    let ringViewDivId = backing.view_type.ring_view.name + "_" + activeDesktop.div_id;
    if ($("#" + ringViewDivId).hasClass("active"))
        updateViewsStandards(ringViewDivId, activeDesktop.directoryJson);
}

function getIndexOfGivenChild(json, id) {
    for (let i = 0; i < json.length; i++) {
        if (json[i].uniqueId === id) {
            return i;
        }
    }
}

function initializeData(shieldData, view) {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
    if (view === "biview") {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
    }
    let data = activeDesktop.directoryJson, res;
    if (backing.dictionary_of_unique_id_to_attr_object[activeDesktop.recentSelectedId] !== undefined)
        res = fun1(data.children, activeDesktop.recentSelectedId);
    else {
        activeDesktop.recentSelectedId = activeDesktop.directoryJson.children[0].uniqueId;
        res = fun1(data.children, activeDesktop.recentSelectedId);
    }
    let resl = res.levels;
    activeDesktop.arr = resl.split(";");
    let ringC = calcDepth(data, activeDesktop.arr);
    let displayData = data, q = ringC, i = 0;
    activeDesktop.ringCount = ringC;
    while (displayData && displayData.children && displayData.children.length > 0) {
        if (!activeDesktop.data[displayData.uniqueId]) {
            activeDesktop.data[displayData.uniqueId] = {};
            activeDesktop.data[displayData.uniqueId].startIndex = 0;
            activeDesktop.data[displayData.uniqueId].displayCount = calculateDisplayCount(q, ringC);
            activeDesktop.data[displayData.uniqueId].endIndex = activeDesktop.data[displayData.uniqueId].displayCount - 1;
        }
        displayData = displayData.children[activeDesktop.arr[i]];
        i++;
        q--;
    }
}

function getLevelOfGivenUniqueId(dVJson, id, currentLevel) {
    if (dVJson.uniqueId === id)
        return currentLevel;
    if (dVJson.children) {
        let len = dVJson.children.length;
        for (let i = 0; i < len; i++) {
            let level = getLevelOfGivenUniqueId(dVJson.children[i], id, currentLevel + 1);
            if (level !== undefined)
                return level;
        }
    }
}

function ColorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    if (hex === "000000")
        return "gray";
    else if (hex === "ffffff")
        return "#000000";
    else {
        // convert to decimal and change luminosity
        let rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }

        return rgb;
    }
}

function getFillColorForTrafficMode(data) {
    let index;
    if (data.rating !== undefined)
        index = data.rating;
    else if (data.index !== undefined)
        index = data.index;
    else
        index = 0;
    if (index == 0)
        return "#A6A6A6";
    else if (index > 0 && index <= 0.2)
        return "#C00000";
    else if (index > 0.2 && index <= 0.4)
        return "#FF0000";
    else if (index > 0.4 && index <= 0.6)
        return "#FF9900";
    else if (index > 0.6 && index <= 0.8)
        return "#00B050";
    else if (index > 0.8 && index <= 1)
        return "#008000";
}

function getCircleList(id, trafficMode, isBiView) {
    let obj = [{"title": "Registered", "color": "#A6A6A6", "rating": 0},
        {"title": "Very Bad", "color": "#C00000", "rating": 0.2},
        {"title": "Bad", "color": "#FF0000", "rating": 0.4},
        {"title": "Average", "color": "#FF9900", "rating": 0.6},
        {"title": "Good", "color": "#00B050", "rating": 0.8},
        {"title": "Very Good", "color": "#008000", "rating": 1}];
    if (trafficMode === false)
        obj = getColorsForEvalMode(obj, isBiView);
    let str = "";
    str += "<ul class=\"circleList clearfix\">";
    for (let i = 0; i < obj.length; i++) {
        str += "<li><span class=\"circle\" title=\"" + obj[i].title + "\" style=\"background-color:" + obj[i].color + ";\">" + obj[i].rating + "</span></li>"
    }
    str += "</ul>";
    $("#" + id).find(".ratingDescription").html(str);
}

function getColorsForEvalMode(obj, isBiview) {
    let perspectiveColor;
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
    if (isBiview) {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
    }

    if (activeWorkspaceKeyname === "eval_workspace" || activeWorkspaceKeyname === "bi_eval_workspace") {
        for (let i = 0; i < obj.length; i++)
            if (obj[i].rating) {
                let query = $("#" + activeDesktop.anchor_div_id);
                let index = obj[i].rating;
                if (query.find(".desktop-perspective-selector-container .compositePerspectiveSelection").hasClass("active")) {
                    perspectiveColor = query.find(".desktop-perspective-selector-container .compositeColorPicker").val();
                }
                else {
                    let perspectiveSelected = getPerspectiveInSelection(isBiview);
                    perspectiveColor = perspectiveSelected.selectedPerspective.color;
                }
                if (index === 0) {
                    obj[i].color = "#A6A6A6";
                }
                else {
                    let percent = (1 - (index).toFixed(1));
                    let f = parseInt(perspectiveColor.slice(1), 16), t = percent < 0 ? 0 : 255,
                        p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
                    obj[i].color = "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
                }
            }
    }
    return obj;
}

function getElementIdObjectTypeOfAllToGetResponseOfElementsHavingAssets(json) {
    let response = [];
    if (json) {
        for (let i = 0; i < json.length; i++) {
            element = json[i];
            response.push(json[i].elementId + "!" + json[i].objectType);
            if (element.children) {
                let array = getElementIdObjectTypeOfAllToGetResponseOfElementsHavingAssets(element.children);
                response = response.concat(array)
            }

        }
    }
    return response;
}

function updateElementIdAndObjectArray(activeDesktop, element, view, innerRadius, outerRadius, group) {
    let arr = getElementIdObjectTypeOfAllToGetResponseOfElementsHavingAssets(activeDesktop.directoryJson.children);
    let data = {};
    data["exclamationSeparatedElementIdObjectTypeList"] = arr;
    data["direct"] = backing.isDirectMode;
    service.getDoesHaveAssets(data, function (res, err) {
        if (res) {
            activeDesktop.elementIdAndObjectArray = res;
            createShieldStandards(element, view, innerRadius, outerRadius, group);
        }
        else if (err) {
            errorHandler(err);
            $("#saveData").hide();
        }
    });
}


