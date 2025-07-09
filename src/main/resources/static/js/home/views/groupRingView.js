function findElementInPassedDvJson(elementId, objectType, dVJson) {
    if (dVJson.elementId === elementId && dVJson.objectType === objectType)
        return dVJson;
    if (dVJson.children) {
        let len = dVJson.children.length;
        for (let i = 0; i < len; i++) {
            let elementReturned = findElementInPassedDvJson(elementId, objectType, dVJson.children[i]);
            if (elementReturned != null)
                return elementReturned;
        }
    }
    return null;
}

$(document).ready(function () {
    $(document).on("click", ".singleViewGroupRingView", function (e) {
        $("#saveData").show();
        let src_hotlinkId = $(this).parent("span").attr("id");
        let uniqueId = $(this).attr("uniqueId");
        let activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        let activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        let activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        let ringViewDivId = backing.view_type.group_ring_view.name + "_" + uniqueId;

        //check for space in screen
        let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.group_ring_view.key);
        if (!haveSpaceToOpenView) {
            $("#saveData").hide();
            e.stopPropagation();
            return;
        }
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
        let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(ringViewDivId, false);

        if (isViewOpenedBefore) {
            $("#saveData").hide();
            e.stopPropagation();
            return;
        }
        activeDesktop.groupVerticalScroll[element.uniqueId] = {
            startPoint: 0,
            endPoint: 3
        };
        if (element.children && element.children.length > 0) {
            renderGroupRingView(ringViewDivId, false, element, element.name);
            createScenarioViewOpenedFromAnchorSingleCase(ringViewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.group_ring_view.key, "Group View: " + element.name, uniqueId, false);
            repositionViews(false);
            groupRingView(ringViewDivId, element);
            $("#saveData").hide();
            e.stopPropagation();
        }
        else {
            $("#saveData").hide();
            e.stopPropagation();
        }
    });

    $(document).on("click", ".biViewGroupRingView", function (e) {
        $("#saveData").show();
        let src_hotlinkId = $(this).parent("span").attr("id");
        let uniqueId = $(this).attr("uniqueId");
        let activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        let activeDesktopKeyname = backing.biview.active_desktop.keyname;
        let activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        let ringViewDivId = backing.view_type.group_ring_view.name + "_" + uniqueId;

        //check for space in screen
        let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.group_ring_view.key);
        if (!haveSpaceToOpenView) {
            $("#saveData").hide();
            e.stopPropagation();
            return;
        }
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
        let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(ringViewDivId, true);

        if (isViewOpenedBefore) {
            $("#saveData").hide();
            e.stopPropagation();
            return;
        }
        activeDesktop.groupVerticalScroll[element.uniqueId] = {
            startPoint: 0,
            endPoint: 3
        };
        if (element.children && element.children.length > 0) {
            renderGroupRingView(ringViewDivId, true, element, element.name);
            createScenarioViewOpenedFromAnchorSingleCase(ringViewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.group_ring_view.key, "Group View: " + element.name, uniqueId, true);
            repositionViews(true);
            groupRingView(ringViewDivId, element);
            $("#saveData").hide();
            e.stopPropagation();
        }
        else {
            $("#saveData").hide();
            e.stopPropagation();
        }
    });

    $(document).on("click", ".groupChildren", function () {
        let view = $(this).closest(".innerDesktop").attr("view");
        let uniqueId = $(this).attr('id');
        let data = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
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
        activeDesktop.utilsFunction.selectClickedGroup(data.parentItem.elementId, data.elementId, data.objectType);
    });

    $(document).on('click', '#groupsStartPoint', function () {
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let id = desktop.attr("uniqueid");
        let data = backing.dictionary_of_unique_id_to_attr_object[id];
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
        let scrollIndex = activeDesktop.groupVerticalScroll[id];
        let ringViewDivId = backing.view_type.group_ring_view.name + "_" + id;
        if (activeDesktop.groupRingCount > 1) {
            scrollIndex.startPoint = scrollIndex.startPoint - 1;
            scrollIndex.endPoint = scrollIndex.endPoint - 1;
            if (scrollIndex.startPoint < 0 || scrollIndex.endPoint < 0) {
                scrollIndex.startPoint = 0;
                scrollIndex.endPoint = 3;
            }
        }
        groupRingView(ringViewDivId, data);
    });

    $(document).on('click', '#groupsEndPoint', function () {
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
        let view = $(this).closest(".innerDesktop").attr("view");
        let id = $(this).closest(".innerDesktop").attr("uniqueid");
        let data = backing.dictionary_of_unique_id_to_attr_object[id];
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
        let scrollIndex = activeDesktop.groupVerticalScroll[id];
        let ringViewDivId = backing.view_type.group_ring_view.name + "_" + id;
        if (activeDesktop.groupRingCount > 1) {
            scrollIndex.startPoint = scrollIndex.startPoint + 1;
            scrollIndex.endPoint = scrollIndex.endPoint + 1;
            if (scrollIndex.endPoint >= activeDesktop.groupRingCount + 3) {
                let r = scrollIndex.endPoint - (activeDesktop.groupRingCount + 2);
                scrollIndex.startPoint = scrollIndex.startPoint - r;
                scrollIndex.endPoint = scrollIndex.endPoint - r;
            }
        }
        groupRingView(ringViewDivId, data);
    });

    $(document).on('click', '#groupLeftButton', function () {
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
        let view = $(this).closest(".innerDesktop").attr("view");
        let id = $(this).closest(".innerDesktop").attr("uniqueid");
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
        let parentId = $(this).parent().parent().attr("id");
        if (timer == null) {
            timer = setTimeout(function () {
                clicks = 0;
                timer = null;
                let groupShieldId = $("#groupShield_" + id);
                let ringNum = groupShieldId.children("#" + parentId + ".shieldRing").attr("text");
                let donutData = backing.dictionary_of_unique_id_to_attr_object[parentId];
                groupShieldId.children("#" + parentId).children(".groupChildren").remove();
                if (data.children.length > activeDesktop.data[parentId].displayCount) {
                    activeDesktop.data[parentId].startIndex = activeDesktop.data[parentId].startIndex - 1;
                    activeDesktop.data[parentId].endIndex = activeDesktop.data[parentId].endIndex - 1;
                    if (activeDesktop.data[parentId].startIndex < 0 || activeDesktop.data[parentId].endIndex < 0) {
                        activeDesktop.data[parentId].startIndex = 0;
                        activeDesktop.data[parentId].endIndex = activeDesktop.data[parentId].displayCount - 1;
                    }
                    createDonutStandards(view, donutData, activeDesktop.data[parentId].innerAngle, activeDesktop.data[parentId].outerAngle, activeDesktop.groupShieldRing[ringNum], "group_ring_view")
                }
                createLevelDisplay(activeDesktop.groupShieldRing[ringNum], activeDesktop.groupArcThickness, data.uniqueId, activeDesktop.data[parentId].outerAngle, ringNum, data.name);
                $("#Index" + parentId).text((activeDesktop.data[parentId].startIndex + 1) + "-" + (activeDesktop.data[parentId].endIndex + 1) + " / " + data.children.length);
            }, DELAY);
        }
        if (clicks === 1) {
            clearTimeout(timer);
            timer = null;
            clicks = -1;
            let groupShieldId = $("#groupShield_" + id);
            let ringNum = groupShieldId.children("#" + parentId + ".shieldRing").attr("text");

            let donutData = backing.dictionary_of_unique_id_to_attr_object[parentId];

            groupShieldId.children("#" + parentId).children(".groupChildren").remove();

            if (data.children.length > activeDesktop.data[parentId].displayCount) {
                activeDesktop.data[parentId].startIndex = activeDesktop.data[parentId].startIndex - activeDesktop.data[parentId].displayCount;
                activeDesktop.data[parentId].endIndex = activeDesktop.data[parentId].endIndex - activeDesktop.data[parentId].displayCount;
                if (activeDesktop.data[parentId].startIndex < 0 || activeDesktop.data[parentId].endIndex < 0) {
                    activeDesktop.data[parentId].startIndex = 0;
                    activeDesktop.data[parentId].endIndex = activeDesktop.data[parentId].displayCount - 1;
                }
                createDonutStandards(view, donutData, activeDesktop.data[parentId].innerAngle, activeDesktop.data[parentId].outerAngle, activeDesktop.groupShieldRing[ringNum], "group_ring_view")
            }
            createLevelDisplay(activeDesktop.groupShieldRing[ringNum], activeDesktop.groupArcThickness, data.uniqueId, activeDesktop.data[parentId].outerAngle, ringNum, data.name);
            $("#Index" + parentId).text((activeDesktop.data[parentId].startIndex + 1) + "-" + (activeDesktop.data[parentId].endIndex + 1) + " / " + data.children.length);

        }
        clicks++;
    });

    $(document).on('click', '#groupRightButton', function () {
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let id = desktop.attr("uniqueid");
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
        let parentId = $(this).parent().parent().attr("id");
        if (timer == null) {
            timer = setTimeout(function () {
                clicks = 0;
                timer = null;
                let groupShieldId = $("#groupShield_" + id);
                let ringNum = groupShieldId.children("#" + parentId + ".shieldRing").attr("text");
                let donutData = backing.dictionary_of_unique_id_to_attr_object[parentId];
                groupShieldId.children("#" + parentId).children(".groupChildren").remove();

                if (data.children.length > activeDesktop.data[parentId].displayCount) {
                    activeDesktop.data[parentId].startIndex = activeDesktop.data[parentId].startIndex + 1;
                    activeDesktop.data[parentId].endIndex = activeDesktop.data[parentId].endIndex + 1;
                    if (activeDesktop.data[parentId].endIndex >= data.children.length) {
                        let r = activeDesktop.data[parentId].endIndex - (data.children.length - 1);
                        activeDesktop.data[parentId].startIndex = activeDesktop.data[parentId].startIndex - r;
                        activeDesktop.data[parentId].endIndex = activeDesktop.data[parentId].endIndex - r;
                    }
                    createDonutStandards(view, donutData, activeDesktop.data[parentId].innerAngle, activeDesktop.data[parentId].outerAngle, activeDesktop.groupShieldRing[ringNum], "group_ring_view")
                }
                createLevelDisplay(activeDesktop.groupShieldRing[ringNum], activeDesktop.groupArcThickness, data.uniqueId, activeDesktop.data[parentId].outerAngle, ringNum, data.name);
                $("#Index" + parentId).text((activeDesktop.data[parentId].startIndex + 1) + "-" + (activeDesktop.data[parentId].endIndex + 1) + " / " + data.children.length);
            }, DELAY);
        }
        if (clicks === 1) {
            clearTimeout(timer);
            timer = null;
            clicks = -1;
            let groupShieldId = $("#groupShield_" + id);
            let ringNum = groupShieldId.children("#" + parentId + ".shieldRing").attr("text");
            let donutData = backing.dictionary_of_unique_id_to_attr_object[parentId];
            groupShieldId.children("#" + parentId).children(".groupChildren").remove();

            if (data.children.length > activeDesktop.data[parentId].displayCount) {
                activeDesktop.data[parentId].startIndex = activeDesktop.data[parentId].startIndex + activeDesktop.data[parentId].displayCount;
                activeDesktop.data[parentId].endIndex = activeDesktop.data[parentId].endIndex + activeDesktop.data[parentId].displayCount;
                if (activeDesktop.data[parentId].endIndex >= data.children.length) {
                    let r = activeDesktop.data[parentId].endIndex - (data.children.length - 1);
                    activeDesktop.data[parentId].startIndex = activeDesktop.data[parentId].startIndex - r;
                    activeDesktop.data[parentId].endIndex = activeDesktop.data[parentId].endIndex - r;
                }
                createDonutStandards(view, donutData, activeDesktop.data[parentId].innerAngle, activeDesktop.data[parentId].outerAngle, activeDesktop.groupShieldRing[ringNum], "group_ring_view")
            }
            createLevelDisplay(activeDesktop.groupShieldRing[ringNum], activeDesktop.groupArcThickness, data.uniqueId, activeDesktop.data[parentId].outerAngle, ringNum, data.name);
            $("#Index" + parentId).text((activeDesktop.data[parentId].startIndex + 1) + "-" + (activeDesktop.data[parentId].endIndex + 1) + " / " + data.children.length);
        }
        clicks++;
    });

});

function renderGroupRingView(viewName, isBiview, element, headerName) {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, viewClass, closeBtnClass;
    if (isBiview) {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "biview";
        closeBtnClass = "biviewCloseBtn";
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "singleview";
        closeBtnClass = "singleviewCloseBtn";
    }
    let desktopId = activeDesktop.div_id;
    let str = "";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop associationViewDesktop dis-none\" view=\"" + viewClass + "\" uniqueid=\"" + element.uniqueId + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">" +
        "<span class=\"flaticon-round findSourceHotlink\" title=\"Show Source Hotlink\"></span>" +
        "<span class=\"panel-header\">GROUP VIEW: " + headerName.toUpperCase() + " Group</span>" +
        "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + closeBtnClass + "\" id=\"closeAssociationView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>";
    str += "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>";
    str += "</div>";
    str += "<div class =\"ringViewWrapper\" id = \"" + viewClass + "ringViewWrapper\">";
    str += "<div class=\"groupGraphicalView\" id=\"" + viewName + "_wrapper\" ></div>";
    str += "</div></div>";
    $("#" + desktopId).append(str);
}

function groupRingView(viewId, data) {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, isBiViewSide;
    let selectedPerspective;
    let view = $("#" + viewId).closest(".innerDesktop").attr("view");
    if (view === "biview") {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        isBiViewSide = true;
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        isBiViewSide = false;
    }
    let svgId = "svg_" + data.uniqueId;
    let sphericContainerId = viewId + "_wrapper";
    let containerId = $('#' + sphericContainerId);
    d3.select('#' + svgId).remove();
    let width = containerId.width();
    let height = containerId.height();
    activeDesktop.maxGroupRadius = maxRadiusCalculator(width, height);
    let vis = d3.select('#' + sphericContainerId).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", svgId);

    let shadowGroup = vis.append('defs');
    dropShadow(shadowGroup, data.uniqueId);

    let group = d3.select("#" + svgId).append("g")
        .attr("transform", "translate(" + width / 2 + "," + ((height / 2)) + ") rotate(-90)")
        .attr("id", "groupShield_" + data.uniqueId);
    let innerRadius = (activeDesktop.maxGroupRadius * 15) / 100;
    let outerRadius = activeDesktop.maxGroupRadius - 30;
    let circleGroup = group.append("g")
        .attr("id", data.uniqueId + "_name");
    circleGroup.append("circle")
        .attr("id", "innerRadius_" + data.uniqueId)
        .attr("r", innerRadius)
        .attr("fill", function () {
            return ColorLuminance("#5F4B8B", 1.1);
        });
    if (activeWorkspaceKeyname === "eval_workspace" || activeWorkspaceKeyname === "bi_eval_workspace") {
        selectedPerspective = getPerspectiveInSelection(isBiViewSide);
    }
    circleGroup.append("text")
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", (innerRadius * 26) / 100)
        .attr("text-anchor", "middle")
        .attr("font-family", "Arial")
        .attr("font-weight", "Bold")
        .attr("font-size", innerRadius - 10)
        .attr("fill", "white").text(function () {
        if ((activeWorkspaceKeyname === "eval_workspace" || activeWorkspaceKeyname === "bi_eval_workspace") && selectedPerspective.isComposite === false)
            return selectedPerspective.selectedPerspective.name.charAt(0).toUpperCase();
        else
            return ""
    });
    createGroupRings(data, view, innerRadius, outerRadius, group);
}

function createGroupRings(shieldData, view, innerRadius, outerRadius, group) {
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
    let data = shieldData;
    let ringC = shieldData.children.length;

    activeDesktop.groupRingCount = ringC;
    let availableRadius = outerRadius - innerRadius;
    let shieldThickness = availableRadius / 4;
    activeDesktop.groupArcThickness = shieldThickness;
    activeDesktop.groupShieldRing = [];
    let currentOuterRadius = outerRadius;
    let currentInnerRadius = 0;
    let j = 1, q = ringC, p = 0;
    if (data.children && data.children.length > 0) {
        let scrollIndex = activeDesktop.groupVerticalScroll[data.uniqueId], end;
        if (data.children.length > 4)
            end = scrollIndex.endPoint + 1;
        else
            end = data.children.length;
        if (!data.children[scrollIndex.startPoint]) {
            scrollIndex.startPoint -= 1;
            scrollIndex.endPoint -= 1;
        }
        if (scrollIndex.startPoint > 0)
            group.append("g")
                .attr("id", "groupsStartPoint")
                .attr("cursor", "pointer")
                .attr("transform", "translate(" + -2 + ",-" + (currentOuterRadius + 8) + ")")
                .append("text")
                .attr("font-size", 16)
                .attr("text-anchor", "middle")
                .attr("font-family", "Arial")
                .attr("font-weight", "Bold")
                .text("+")
                .attr("fill", "black");

        for (let g = 0; g < data.children.length; g++) {
            let displayData = data.children[g];
            activeDesktop.groupShieldRing[j] = group.append("g")
                .attr("class", "shieldRing")
                .attr("text", j)
                .attr("id", displayData.uniqueId);
            if (!activeDesktop.data[displayData.uniqueId]) {
                activeDesktop.data[displayData.uniqueId] = {};
                activeDesktop.data[displayData.uniqueId].startIndex = 0;
                activeDesktop.data[displayData.uniqueId].displayCount = calculateDisplayCount(q, ringC);
                activeDesktop.data[displayData.uniqueId].endIndex = activeDesktop.data[displayData.uniqueId].displayCount - 1;
            }
            activeDesktop.data[displayData.uniqueId].outerAngle = currentOuterRadius;
            if (j > scrollIndex.startPoint && j <= end) {
                currentInnerRadius = currentOuterRadius - shieldThickness;
                activeDesktop.data[displayData.uniqueId].innerAngle = currentInnerRadius;
                createDonutStandards(view, displayData, currentInnerRadius, currentOuterRadius, activeDesktop.groupShieldRing[j], "group_ring_view");
                createLevelDisplay(activeDesktop.groupShieldRing[j], shieldThickness, data.uniqueId, currentOuterRadius, g + 1, displayData.name);
                addRotationRing(view, displayData, currentOuterRadius, group, "group_ring_view");
                currentOuterRadius = currentInnerRadius;
                p++;
            }
            j++;
            q--;
        }
        let remainingArc = 4 - p;
        $("#innerRadius_" + shieldData.uniqueId).attr("r", (innerRadius + (shieldThickness * remainingArc)));
        let rectHeight = ((innerRadius / 2) + (shieldThickness * remainingArc) - 14);
        let endpoint = group.append("g")
            .attr("id", "groupsEndPoint")
            .attr("cursor", "pointer").attr("transform", "translate(" + -3 + ",-" + (currentOuterRadius + 3) + ")");
        endpoint.append("rect").attr("width", 5)
            .attr("height", rectHeight)
            .attr("fill", "#5F4B8B");
        if (scrollIndex.endPoint < data.children.length + 2)
            endpoint.append("text")
                .attr("transform", "translate(" + 2 + "," + (rectHeight + 15) + ")")
                .attr("font-size", 16)
                .attr("text-anchor", "middle")
                .attr("font-family", "Arial")
                .attr("font-weight", "Bold")
                .text("+")
                .attr("fill", "white");
    }
}

function getTooltip(circle, name) {
    circle.on("mouseover", function () {
        d3.select("#shieldTooltip")
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px")
            .style("opacity", 1)
            .select("#value")
            .text(name);
    })
        .on("mouseout", function () {
            // Hide the tooltip
            d3.select("#shieldTooltip")
                .style("opacity", 0);
        });
}

function refreshGroupRingViews(openedViews) {
    for (let i = 0; i < openedViews.length; i++) {
        if (openedViews[i].view_type === backing.view_type.group_ring_view.key) {
            let ringViewDivId = backing.view_type.group_ring_view.name + "_" + openedViews[i].uniqueId;
            let element = backing.dictionary_of_unique_id_to_attr_object[openedViews[i].uniqueId];
            if ($("#" + ringViewDivId).hasClass("active"))
                groupRingView(ringViewDivId, element);
        }
    }
}