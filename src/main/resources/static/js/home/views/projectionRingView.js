$(document).ready(function () {
    $(document).on("click", ".projectionRingView", function (e) {
        $("#saveData").show();
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let isBiview = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiview);
        let backingView = (isBiview === false) ? backing.singleview : backing.biview;
        let directoryViewTreeId = "projection" + activeDesktop.tree_container_id;
        let activeDesktopKeyName = activeDesktop.key;
        let json = backingView.projectionDesktops[activeDesktopKeyName]["directoryJson"];
        if (json.children && json.children.length > 0) {
            if ($(this).hasClass("active")) {
                renderDirectoryView(json, directoryViewTreeId, view, "projectionView", isBiview);
                $(this).removeClass("active");
                desktop.find(".desktop-anchorSearchSelector-container").removeClass("dis-none");
                desktop.find(".openSearch").removeClass("dis-none");
            }
            else {
                renderProjectionRingView(directoryViewTreeId, view, activeDesktop.key);
                getProjectionRings(activeDesktop, backingView.projectionDesktops[activeDesktopKeyName], view);
                $(this).addClass("active");
                desktop.find(".desktop-anchorSearchSelector-container").addClass("dis-none");
                desktop.find(".openSearch").addClass("dis-none");
            }
        }
        $("#saveData").hide();
        e.stopPropagation();
    });

    $(document).on('click', '#projectionStartPoint', function (e) {
        $("#saveData").show();
        let view = $(this).closest(".innerDesktop").attr("view");
        let isBiview = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiview);
        let backingView = (isBiview === false) ? backing.singleview : backing.biview;
        let viewWrapperId = $("#" + activeDesktop.key + view + "ProjectionWrapper");
        let activePerspective = backingView.projectionDesktops[viewWrapperId.attr("activeProjection")];
        activePerspective.startPoint = activePerspective.startPoint - 1;
        activePerspective.endPoint = activePerspective.endPoint - 1;
        if (activePerspective.startPoint < 0 || activePerspective.endPoint < 0) {
            activePerspective.startPoint = 0;
            activePerspective.endPoint = 3;
        }
        getProjectionRings(activeDesktop, activePerspective, view);
        $("#saveData").hide();
        e.stopPropagation();
    });

    $(document).on('click', '#projectionEndPoint', function (e) {
        $("#saveData").show();
        let view = $(this).closest(".innerDesktop").attr("view");
        let isBiview = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiview);
        let viewWrapperId = $("#" + activeDesktop.key + view + "ProjectionWrapper");
        let backingView = (isBiview === false) ? backing.singleview : backing.biview;
        let activePerspective = backingView.projectionDesktops[viewWrapperId.attr("activeProjection")];
        if (activePerspective.endPoint < activePerspective.ringCount + 2) {
            activePerspective.startPoint = activePerspective.startPoint + 1;
            activePerspective.endPoint = activePerspective.endPoint + 1;
            if (activePerspective.endPoint >= activePerspective.ringCount + 3) {
                let r = activePerspective.endPoint - (activePerspective.ringCount - 1);
                activePerspective.startPoint = activePerspective.startPoint - r;
                activePerspective.endPoint = activePerspective.endPoint - r;
            }
            getProjectionRings(activeDesktop, activePerspective, view);
        }
        $("#saveData").hide();
        e.stopPropagation();
    });

    $(document).on('click', '.projectionChildren', function (e) {
        e.preventDefault();
        $("#saveData").show();
        renderProjectionRingViewChildClick($(this));
        $("#saveData").hide();
        e.stopPropagation();
    });

    $(document).on('click', '.highlightComponentProjection', function (e) {
        e.preventDefault();
        $("#saveData").show();
        renderProjectionRingViewChildClick($(this));
        $("#saveData").hide();
        e.stopPropagation();
    });

    var DELAY = 250, clicks = 0, timer = null;
    $(document).on('click', '#projectionLeftButton', function (e) {
        let view = $(this).closest(".innerDesktop").attr("view");
        let isBiview = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiview);
        let viewWrapperId = $("#" + activeDesktop.key + view + "ProjectionWrapper");
        let backingView = (isBiview === false) ? backing.singleview : backing.biview;
        let activePerspective = backingView.projectionDesktops[viewWrapperId.attr("activeProjection")];
        let queryId = $("#standardShield_projection_" + activePerspective.key);
        let parentId = $(this).parent().parent().attr("id"), donutdata;
        if (timer == null) {
            timer = setTimeout(function () {
                clicks = 0;
                timer = null;
                let arcArray = queryId.children("#" + parentId).children(".projectionChildren");
                let ringNum = queryId.children("#" + parentId + ".shieldRing").attr("text");
                let svgId = "svg_projection_" + view + activePerspective.key;

                let data = activePerspective.directoryJson;
                if (parentId === data.uniqueId)
                    donutdata = data;
                else
                    donutdata = findChildrenForGivenParentId(data.children, parentId);
                queryId.children("#" + parentId).children(".levelData").remove();
                queryId.children("#" + parentId).children(".projectionChildren").remove();
                queryId.children("#" + parentId).children(".highlightComponentProjection").remove();
                if (arcArray.length > activePerspective.data[parentId].displayCount) {
                    activePerspective.data[parentId].startIndex = activePerspective.data[parentId].startIndex - 1;
                    activePerspective.data[parentId].endIndex = activePerspective.data[parentId].endIndex - 1;
                    if (activePerspective.data[parentId].startIndex < 0 || activePerspective.data[parentId].endIndex < 0) {
                        activePerspective.data[parentId].startIndex = 0;
                        activePerspective.data[parentId].endIndex = activePerspective.data[parentId].displayCount - 1;
                    }
                    createDonutForProjectionData(activePerspective, view, donutdata, activePerspective.data[parentId].innerAngle, activePerspective.data[parentId].outerAngle, activePerspective.shieldRing[ringNum]);
                }
                let highlightComponentProjection = activePerspective.shieldRing[ringNum].append("g")
                    .attr("class", "highlightComponentProjection").attr("id", activePerspective.data[parentId].selectedChildId);
                createHighlightComponentStandards(view, activePerspective.data[parentId].selectedChildId, activePerspective.maxRadius, highlightComponentProjection, true, svgId, true, activePerspective);
                $("#Index" + parentId).text((activePerspective.data[parentId].startIndex + 1) + "-" + (activePerspective.data[parentId].endIndex + 1) + " / " + arcArray.length);
                createLevelDisplay(activePerspective.shieldRing[ringNum], activePerspective.shieldThickness, data.uniqueId, activePerspective.data[parentId].outerAngle, ringNum);
                e.stopPropagation();
            }, DELAY);
        }
        if (clicks === 1) {
            clearTimeout(timer);
            timer = null;
            clicks = -1;
            let arcArray = queryId.children("#" + parentId).children(".projectionChildren");
            let ringNum = queryId.children("#" + parentId + ".shieldRing").attr("text");
            let svgId = "svg_projection_" + view + activePerspective.key;

            let data = activePerspective.directoryJson;
            if (parentId === data.uniqueId)
                donutdata = data;
            else
                donutdata = findChildrenForGivenParentId(data.children, parentId);
            queryId.children("#" + parentId).children(".levelData").remove();
            queryId.children("#" + parentId).children(".projectionChildren").remove();
            queryId.children("#" + parentId).children(".highlightComponentProjection").remove();
            if (arcArray.length > activePerspective.data[parentId].displayCount) {
                activePerspective.data[parentId].startIndex = activePerspective.data[parentId].startIndex - activePerspective.data[parentId].displayCount;
                activePerspective.data[parentId].endIndex = activePerspective.data[parentId].endIndex - activePerspective.data[parentId].displayCount;
                if (activePerspective.data[parentId].startIndex < 0 || activePerspective.data[parentId].endIndex < 0) {
                    activePerspective.data[parentId].startIndex = 0;
                    activePerspective.data[parentId].endIndex = activePerspective.data[parentId].displayCount - 1;
                }
                createDonutForProjectionData(activePerspective, view, donutdata, activePerspective.data[parentId].innerAngle, activePerspective.data[parentId].outerAngle, activePerspective.shieldRing[ringNum]);
            }
            let highlightComponentProjection = activePerspective.shieldRing[ringNum].append("g")
                .attr("class", "highlightComponentProjection").attr("id", activePerspective.data[parentId].selectedChildId);
            createHighlightComponentStandards(view, activePerspective.data[parentId].selectedChildId, activePerspective.maxRadius, highlightComponentProjection, true, svgId, true, activePerspective);
            $("#Index" + parentId).text((activePerspective.data[parentId].startIndex + 1) + "-" + (activePerspective.data[parentId].endIndex + 1) + " / " + arcArray.length);
            createLevelDisplay(activePerspective.shieldRing[ringNum], activePerspective.shieldThickness, data.uniqueId, activePerspective.data[parentId].outerAngle, ringNum);
            e.stopPropagation();
        }
        clicks++;

    });

    $(document).on('click', '#projectionRightButton', function (e) {
        let view = $(this).closest(".innerDesktop").attr("view");
        let isBiview = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiview);
        let viewWrapperId = $("#" + activeDesktop.key + view + "ProjectionWrapper");
        let backingView = (isBiview === false) ? backing.singleview : backing.biview;
        let activePerspective = backingView.projectionDesktops[viewWrapperId.attr("activeProjection")];
        let queryId = $("#standardShield_projection_" + activePerspective.key);
        let parentId = $(this).parent().parent().attr("id"), donutdata;
        if (timer == null) {
            timer = setTimeout(function () {
                clicks = 0;
                timer = null;
                let arcArray = queryId.children("#" + parentId).children(".projectionChildren");
                let ringNum = queryId.children("#" + parentId + ".shieldRing").attr("text");
                let svgId = "svg_projection_" + view + activePerspective.key;

                let data = activePerspective.directoryJson;

                if (parentId === data.uniqueId)
                    donutdata = data;
                else
                    donutdata = findChildrenForGivenParentId(data.children, parentId);
                queryId.children("#" + parentId).children(".levelData").remove();
                queryId.children("#" + parentId).children(".projectionChildren").remove();
                queryId.children("#" + parentId).children(".highlightComponentProjection").remove();

                if (arcArray.length > activePerspective.data[parentId].displayCount) {
                    activePerspective.data[parentId].startIndex = activePerspective.data[parentId].startIndex + 1;
                    activePerspective.data[parentId].endIndex = activePerspective.data[parentId].endIndex + 1;
                    if (activePerspective.data[parentId].endIndex >= arcArray.length) {
                        let r = activePerspective.data[parentId].endIndex - (arcArray.length - 1);
                        activePerspective.data[parentId].startIndex = activePerspective.data[parentId].startIndex - r;
                        activePerspective.data[parentId].endIndex = activePerspective.data[parentId].endIndex - r;
                    }
                    createDonutForProjectionData(activePerspective, view, donutdata, activePerspective.data[parentId].innerAngle, activePerspective.data[parentId].outerAngle, activePerspective.shieldRing[ringNum])
                }
                let highlightComponentProjection = activePerspective.shieldRing[ringNum].append("g")
                    .attr("class", "highlightComponentProjection").attr("id", activePerspective.data[parentId].selectedChildId);
                createHighlightComponentStandards(view, activePerspective.data[parentId].selectedChildId, activePerspective.maxRadius, highlightComponentProjection, true, svgId, true, activePerspective);
                $("#Index" + parentId).text((activePerspective.data[parentId].startIndex + 1) + "-" + (activePerspective.data[parentId].endIndex + 1) + " / " + arcArray.length);
                createLevelDisplay(activePerspective.shieldRing[ringNum], activePerspective.shieldThickness, data.uniqueId, activePerspective.data[parentId].outerAngle, ringNum);
                e.stopPropagation();
            }, DELAY);
        }

        if (clicks === 1) {
            clearTimeout(timer);
            timer = null;
            clicks = -1;
            let arcArray = queryId.children("#" + parentId).children(".projectionChildren");
            let ringNum = queryId.children("#" + parentId + ".shieldRing").attr("text");
            let svgId = "svg_projection_" + view + activePerspective.key;

            let data = activePerspective.directoryJson;

            if (parentId === data.uniqueId)
                donutdata = data;
            else
                donutdata = findChildrenForGivenParentId(data.children, parentId);
            queryId.children("#" + parentId).children(".levelData").remove();
            queryId.children("#" + parentId).children(".projectionChildren").remove();
            queryId.children("#" + parentId).children(".highlightComponentProjection").remove();

            if (arcArray.length > activePerspective.data[parentId].displayCount) {
                activePerspective.data[parentId].startIndex = activePerspective.data[parentId].startIndex + activePerspective.data[parentId].displayCount;
                activePerspective.data[parentId].endIndex = activePerspective.data[parentId].endIndex + activePerspective.data[parentId].displayCount;
                if (activePerspective.data[parentId].endIndex >= arcArray.length) {
                    let r = activePerspective.data[parentId].endIndex - (arcArray.length - 1);
                    activePerspective.data[parentId].startIndex = activePerspective.data[parentId].startIndex - r;
                    activePerspective.data[parentId].endIndex = activePerspective.data[parentId].endIndex - r;
                }
                createDonutForProjectionData(activePerspective, view, donutdata, activePerspective.data[parentId].innerAngle, activePerspective.data[parentId].outerAngle, activePerspective.shieldRing[ringNum]);
            }
            let highlightComponentProjection = activePerspective.shieldRing[ringNum].append("g")
                .attr("class", "highlightComponentProjection").attr("id", activePerspective.data[parentId].selectedChildId);
            createHighlightComponentStandards(view, activePerspective.data[parentId].selectedChildId, activePerspective.maxRadius, highlightComponentProjection, true, svgId, true, activePerspective);
            $("#Index" + parentId).text((activePerspective.data[parentId].startIndex + 1) + "-" + (activePerspective.data[parentId].endIndex + 1) + " / " + arcArray.length);
            createLevelDisplay(activePerspective.shieldRing[ringNum], activePerspective.shieldThickness, data.uniqueId, activePerspective.data[parentId].outerAngle, ringNum);
            e.stopPropagation();
        }
        clicks++;
    });

    function renderProjectionRingViewChildClick(selector) {
        let view = selector.closest(".innerDesktop").attr("view");
        let isBiview = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiview);
        let viewWrapperId = $("#" + activeDesktop.key + view + "ProjectionWrapper");
        let backingView = (isBiview === false) ? backing.singleview : backing.biview;
        let activePerspective = backingView.projectionDesktops[viewWrapperId.attr("activeProjection")];
        let compId = selector.attr('id');
        let data = activePerspective.directoryJson;
        let res = fun1(data.children, compId);
        let resl = res.levels;
        activePerspective.arr = resl.split(";");
        activePerspective.recentSelectedId = compId;
        activePerspective.ringCount = calcDepth(data, activePerspective.arr);
        let element = backing.dictionary_of_unique_id_to_attr_object[compId], level;
        if (element.children && element.children.length > 0) {
            if (element.level)
                level = element.level;
            else
                level = getLevelOfGivenUniqueId(activePerspective.directoryJson, compId, 0);
            if (level > activePerspective.endPoint) {
                activePerspective.startPoint += 1;
                activePerspective.endPoint = activePerspective.startPoint + 3;
                if (activePerspective.endPoint >= activePerspective.ringCount + 3) {
                    let r = activePerspective.endPoint - (activePerspective.ringCount - 1);
                    activePerspective.startPoint = activePerspective.startPoint - r;
                    activePerspective.endPoint = activePerspective.endPoint - r;
                }
            }
        }
        getProjectionRings(activeDesktop, activePerspective, view);
    }

});

function renderProjectionRingView(directoryViewTreeId, viewClass, viewName) {
    let str = "<div class =\"ringViewWrapper\" id = \"" + viewClass + "ProjectionRingViewWrapper\"><div class=\"treeContainerRingView\">" +
        "<div class=\"tree_structure_of_element tree_structure_parent\"><ul class=\"directoryView_ringList clearfix directoryViewList directoryViewList_DV directoryViewUl\" id = \"Ring_directoryview\" style=\"margin-top: 10px;\">";
    str += "</ul>" +
        "</div>" +
        "</div>";
    str += "<div class=\"graphicalView\" id=\"" + viewName + viewClass + "ProjectionWrapper\" ></div>";
    str += "<div class=\"ratingDescription\"></div>";
    str += "</div>";
    str += "</div>";
    $("#" + directoryViewTreeId).html(str);
}

function getProjectionRings(activeDesktop, activePerspective, view) {
    $("#saveData").hide();
    let selectedPerspective;
    let data = activePerspective.directoryJson;
    let svgId = "svg_projection_" + view + activePerspective.key;
    let sphericContainerId = activeDesktop.key + view + "ProjectionWrapper";
    $('#' + sphericContainerId).attr("activeProjection", activePerspective.key);
    let viewId = "projection" + activeDesktop.tree_container_id;
    let isBiview = isBiViewOrNot(view);
    initializeProjectionDesktopData(activePerspective.directoryJson, activePerspective);
    d3.select('#' + svgId).remove();
    activePerspective.width = $('#' + sphericContainerId).width();
    activePerspective.height = $('#' + sphericContainerId).height();
    activePerspective.maxRadius = maxRadiusCalculator(activePerspective.width, activePerspective.height);
    let vis = d3.select('#' + sphericContainerId).append("svg")
        .attr("width", activePerspective.width)
        .attr("height", activePerspective.height)
        .attr("id", svgId);

    let shadowGroup = vis.append('defs');
    dropShadow(shadowGroup, "projection_" + activePerspective.key);
    let h = vis.append("defs");

    let selectedHighlight = h.append("linearGradient")
        .attr("id", "highlight_projection_" + activePerspective.key)
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "100%");

    selectedHighlight.append("stop")
        .attr('class', 'start')
        .attr("offset", "0%")
        .attr("stop-color", "#5F4B8B")
        .attr("stop-opacity", 1);

    selectedHighlight.append("stop")
        .attr('class', 'end')
        .attr("offset", "100%")
        .attr("stop-color", "#7B4368")
        .attr("stop-opacity", 1);

    let group = d3.select("#" + svgId).append("g")
        .attr("transform", "translate(" + activePerspective.width / 2 + "," + ((activePerspective.height / 2)) + ")")
        .attr("id", "standardShield_projection_" + activePerspective.key);
    activePerspective.innerRadius = (activePerspective.maxRadius * 15) / 100;
    activePerspective.outerRadius = activePerspective.maxRadius - 30;
    let circleGroup = group.append("g")
        .attr("id", activePerspective.key + "_projection_name");
    circleGroup.append("circle")
        .attr("id", "innerRadius_projection_" + activePerspective.key)
        .attr("r", activePerspective.innerRadius)
        .attr("fill", function () {
            return ColorLuminance("#5F4B8B", 1.1);
        });
    selectedPerspective = getPerspectiveInSelection(isBiview);
    circleGroup.append("text")
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", (activePerspective.innerRadius * 26) / 100)
        .attr("text-anchor", "middle")
        .attr("font-family", "Arial")
        .attr("font-weight", "Bold")
        .attr("font-size", activePerspective.innerRadius - 10)
        .attr("fill", "white").text(function () {
        return selectedPerspective.selectedPerspective.name.charAt(0).toUpperCase();
    });
    if (activeDesktop.elementIdAndObjectArray === null) {
        updateElementIdAndObjectArrayOfperspectives(activePerspective, data, view, activePerspective.innerRadius, activePerspective.outerRadius, group);
    }
    else
        createProjectionRings(data, view, activePerspective, activePerspective.innerRadius, activePerspective.outerRadius, group);
    let element = backing.dictionary_of_unique_id_to_attr_object[activePerspective.recentSelectedId];
    if (element !== undefined)
        getElementWithHotLinks(element, viewId, view);
    else
        activeDesktop.recentSelectedId = "";
    getCircleList(viewId, activeDesktop.trafficModeSelection, isBiview);
    $("#saveData").hide();
}

function createProjectionRings(shieldData, view, activePerspective, innerRadius, outerRadius, group) {
    let data = shieldData;
    let svgId = "svg_projection_" + view + activePerspective.key;
    let ringC = calcDepth(data, activePerspective.arr);
    activePerspective.ringCount = ringC;
    let availableRadius = outerRadius - innerRadius;
    let shieldThickness = availableRadius / 4;
    activePerspective.shieldThickness = shieldThickness;
    activePerspective.shieldRing = [];
    let element = backing.dictionary_of_unique_id_to_attr_object[activePerspective.recentSelectedId];
    let parentItem = element.parentItem;
    let index = getIndexOfGivenChild(parentItem.children, activePerspective.recentSelectedId);
    let currentOuterRadius = outerRadius;
    let currentInnerRadius = 0;
    let displayData = data, i = 0, j = 1, q = ringC, g = 4, p = 0;
    if (ringC > 1 && activePerspective.startPoint > 0)
        group.append("g")
            .attr("id", "projectionStartPoint")
            .attr("cursor", "pointer")
            .attr("transform", "translate(" + -2 + ",-" + (currentOuterRadius + 8) + ")")
            .append("text")
            .attr("font-size", 16)
            .attr("text-anchor", "middle")
            .attr("font-family", "Arial")
            .attr("font-weight", "Bold")
            .text("+")
            .attr("fill", "black");
    while (displayData && displayData.children && displayData.children.length > 0) {
        activePerspective.shieldRing[j] = group.append("g")
            .attr("class", "shieldRing")
            .attr("text", j)
            .attr("id", displayData.uniqueId);
        if (!activePerspective.data[displayData.uniqueId]) {
            activePerspective.data[displayData.uniqueId] = {};
        }
        activePerspective.data[displayData.uniqueId].outerAngle = currentOuterRadius;
        if (j > activePerspective.startPoint && j <= (activePerspective.endPoint + 1)) {
            currentInnerRadius = currentOuterRadius - shieldThickness;
            activePerspective.data[displayData.uniqueId].innerAngle = currentInnerRadius;
            activePerspective.data[displayData.uniqueId].startIndex = 0;
            activePerspective.data[displayData.uniqueId].displayCount = calculateDisplayCount(g, 4);
            activePerspective.data[displayData.uniqueId].endIndex = activePerspective.data[displayData.uniqueId].displayCount - 1;
            if (activePerspective.data[displayData.uniqueId] === activePerspective.data[parentItem.uniqueId]) {
                activePerspective.data[parentItem.uniqueId].startIndex = index;
                activePerspective.data[parentItem.uniqueId].endIndex = index + (activePerspective.data[parentItem.uniqueId].displayCount - 1);
                if (activePerspective.data[parentItem.uniqueId].endIndex >= parentItem.children.length) {
                    let s = activePerspective.data[parentItem.uniqueId].endIndex - (parentItem.children.length - 1);
                    activePerspective.data[parentItem.uniqueId].startIndex -= s;
                    activePerspective.data[parentItem.uniqueId].endIndex -= s;
                }
            }
            createDonutForProjectionData(activePerspective, view, displayData, currentInnerRadius, currentOuterRadius, activePerspective.shieldRing[j]);
            let highlightComponentProjection = activePerspective.shieldRing[j].append("g")
                .attr("class", "highlightComponentProjection");
            if (activePerspective.arr.length !== 0) {
                activePerspective.data[displayData.uniqueId].selectedChildId = displayData.children[activePerspective.arr[i]].uniqueId;
                activePerspective.data[displayData.uniqueId].selectedChildName = renderTextOfShield(displayData.children[activePerspective.arr[i]]);
                highlightComponentProjection.attr("id", activePerspective.data[displayData.uniqueId].selectedChildId);
                createHighlightComponentStandards(view, activePerspective.data[displayData.uniqueId].selectedChildId, activePerspective.maxRadius, highlightComponentProjection, true, svgId, true, activePerspective);
                createLevelDisplay(activePerspective.shieldRing[j], shieldThickness, data.uniqueId, currentOuterRadius, j);
                addRotationRingForProjection(displayData, currentOuterRadius, group, activePerspective);
                currentOuterRadius = currentInnerRadius;
                g--;
                p++;
            }
        }
        displayData = displayData.children[activePerspective.arr[i]];
        i++;
        j++;
        q--;
    }
    let remainingarc = 4 - p;
    $("#innerRadius_projection_" + activePerspective.key).attr("r", (activePerspective.innerRadius + (shieldThickness * remainingarc)));
    let rectHeight = ((activePerspective.innerRadius / 2) + (shieldThickness * remainingarc) - 14);
    let endpoint = group.append("g")
        .attr("id", "projectionEndPoint")
        .attr("cursor", "pointer").attr("transform", "translate(" + -3 + ",-" + (currentOuterRadius + 3) + ")");
    endpoint.append("rect")
        .attr("width", 5)
        .attr("height", rectHeight)
        .attr("fill", "#5F4B8B");
    if (ringC > 1 && activePerspective.endPoint < activePerspective.ringCount + 2)
        endpoint.append("text")
            .attr("transform", "translate(" + 2 + "," + (rectHeight + 15) + ")")
            .attr("font-size", 16)
            .attr("text-anchor", "middle")
            .attr("font-family", "Arial")
            .attr("font-weight", "Bold")
            .text("+")
            .attr("fill", "white");
}

function initializeProjectionDesktopData(shieldData, activePerspective) {
    let data = shieldData, res, level;
    if (activePerspective.recentSelectedId !== undefined || backing.dictionary_of_unique_id_to_attr_object[activePerspective.recentSelectedId] !== undefined) {
        res = fun1(data.children, activePerspective.recentSelectedId);
    }
    else {
        activePerspective.recentSelectedId = activePerspective.directoryJson.children[0].uniqueId;
        res = fun1(data.children, activePerspective.recentSelectedId);
    }
    if (res.isFound === false) {
        activePerspective.recentSelectedId = activePerspective.directoryJson.children[0].uniqueId;
        res = fun1(data.children, activePerspective.recentSelectedId);
        let element = backing.dictionary_of_unique_id_to_attr_object[activePerspective.recentSelectedId];
        if (element.level)
            level = element.level;
        else level = getLevelOfGivenUniqueId(activePerspective.directoryJson, activePerspective.recentSelectedId, 0);
        if (level < 4) {
            activePerspective.startPoint = 0;
            activePerspective.endPoint = 3;
        }
        else {
            activePerspective.startPoint = level - 3;
            activePerspective.endPoint = activePerspective.startPoint + 3;
            if (activePerspective.endPoint >= activePerspective.ringCount + 3) {
                let r = activePerspective.endPoint - (activePerspective.ringCount - 1);
                activePerspective.startPoint = activePerspective.startPoint - r;
                activePerspective.endPoint = activePerspective.endPoint - r;
            }
        }
    }
    let resl = res.levels;
    activePerspective.arr = resl.split(";");
    let ringC = calcDepth(data, activePerspective.arr);
    let displayData = data, q = ringC, i = 0;
    activePerspective.ringCount = ringC;
    while (displayData && displayData.children && displayData.children.length > 0) {
        if (!activePerspective.data[displayData.uniqueId]) {
            activePerspective.data[displayData.uniqueId] = {};
            activePerspective.data[displayData.uniqueId].startIndex = 0;
            activePerspective.data[displayData.uniqueId].displayCount = calculateDisplayCount(q, ringC);
            activePerspective.data[displayData.uniqueId].endIndex = activePerspective.data[displayData.uniqueId].displayCount - 1;
        }
        displayData = displayData.children[activePerspective.arr[i]];
        i++;
        q--;
    }
}

function updateElementIdAndObjectArrayOfperspectives(activePerspective, element, view, innerRadius, outerRadius, group) {
    let arr = getElementIdObjectTypeOfAllToGetResponseOfElementsHavingAssets(activePerspective.directoryJson.children);
    let data = {};
    data["exclamationSeparatedElementIdObjectTypeList"] = arr;
    data["direct"] = backing.isDirectMode;
    service.getDoesHaveAssets(data, function (res, err) {
        if (res) {
            activePerspective.elementIdAndObjectArray = res;
            createProjectionRings(element, view, activePerspective, innerRadius, outerRadius, group);
        }
        else if (err) {
            errorHandler(err);
            $("#saveData").hide();
        }
    });
}

function createDonutForProjectionData(activePerspective, view, donutData, innerRadius, outerRadius, group) {
    let data = donutData;
    let pi = Math.PI / 180;
    if (data.children && data.children.length > 0) {
        let componentCount = data.children.length;
        let startAngle = 0;
        let endAngle = 0;
        let varyAngle = 360 / componentCount;
        let hideComponent = false;

        if (componentCount > activePerspective.data[data.uniqueId].displayCount) {
            varyAngle = 360 / activePerspective.data[data.uniqueId].displayCount;
        }
        if (activePerspective.data[data.uniqueId].startIndex >= activePerspective.data[data.uniqueId].endIndex) {
            startAngle = 360 - ((activePerspective.data[data.uniqueId].endIndex + 1) * varyAngle);
        }

        for (let i = 0; i < componentCount; i++) {
            hideComponent = true;
            endAngle = startAngle + varyAngle;
            let component = group.append("g")
                .attr("style", "cursor:pointer;")
                .attr("id", data.children[i].uniqueId)
                .attr("class", "projectionChildren");
            if (activePerspective.data[data.uniqueId].startIndex <= activePerspective.data[data.uniqueId].endIndex) {
                if (i >= activePerspective.data[data.uniqueId].startIndex && i <= activePerspective.data[data.uniqueId].endIndex) {
                    hideComponent = false;
                }
            }
            else {
                if (i >= activePerspective.data[data.uniqueId].startIndex || i <= activePerspective.data[data.uniqueId].endIndex) {
                    hideComponent = false;
                }
            }
            createArcForProjection(activePerspective, view, data.children[i], innerRadius, outerRadius, startAngle * pi, endAngle * pi, component, hideComponent);
            if (!hideComponent) {
                if (activePerspective.data[data.uniqueId].startIndex >= activePerspective.data[data.uniqueId].endIndex) {
                    if (i === activePerspective.data[data.uniqueId].endIndex) {
                        endAngle = 0;
                    }
                }
                startAngle = endAngle;
            }
        }
    }
    else {
        let component = group.append("g");
        createArcForProjection(activePerspective, view, data, innerRadius, outerRadius, 0, 360 * pi, component)
    }
}

function createArcForProjection(activePerspective, view, data, innerRadius, outerRadius, startAngle, endAngle, group, hideComponent) {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, isBiViewSide;
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
    if (hideComponent) {
        startAngle = 0;
        endAngle = 0;
    }
    let arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
    let fillColor = "#ffffff";
    let strokeColor = "#2E2E2E";
    data.textColor = "white";
    if (fillColor === '#ffffff') data.textColor = "black";
    let obj = getIconColor(data, isBiViewSide, "ringView");
    if (activeDesktop.trafficModeSelection !== undefined && activeDesktop.trafficModeSelection === true) {
        if ((activeWorkspaceKeyname === "eval_workspace" || activeWorkspaceKeyname === "bi_eval_workspace")) {
            fillColor = getFillColorForTrafficMode(data);
        }
    }
    else if (obj) {
        fillColor = obj.bg;
        data.textColor = obj.text;
        strokeColor = obj.border;
    }
    group.append("path")
        .datum({startAngle: startAngle, endAngle: endAngle})
        .attr("d", arc)
        .attr("class", "componentArc")
        .attr("elementId", data.elementId)
        .attr("objectType", data.objectType)
        .attr("stroke", strokeColor)
        .attr("stroke-width", function () {
            if (hideComponent)
                return 0;
            else
                return "1";
        })
        .attr("fill", fillColor)
        .on("mouseover", function () {
            d3.select("#shieldTooltip")
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px")
                .style("opacity", 1)
                .select("#value")
                .html(function () {
                    return renderTextOfShield(data, true);
                });
        })
        .on("mouseout", function () {
            // Hide the tooltip
            d3.select("#shieldTooltip")
                .style("opacity", 0);
        });
    data.textSize = getFontSize(innerRadius, outerRadius);
    data.iconForRingView = backing.RingViewIcons[backing.object_type[data.objectType].icon];
    let arc4Text = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle);
    addText2ArcStandards("ring_view", data, arc4Text, group, hideComponent);
}

function addRotationRingForProjection(data, outerRadius, group, activePerspective) {
    if (data.children.length > activePerspective.data[data.uniqueId].displayCount) {
        let l2ComponentGroup = group.append("g")
            .attr("class", "l2ComponentGroup")
            .attr("id", data.uniqueId);
        createRotationIconsPerspective(outerRadius, l2ComponentGroup, data.uniqueId, data.children.length, activePerspective);
    }
}

function createRotationIconsPerspective(radius, group, id, total, activePerspective) {
    let textTag;
    let height = (32 * (activePerspective.shieldThickness)) / 100;
    let textHeight = (18 * (activePerspective.shieldThickness)) / 100;
    let buttongroup = group.append("g")
        .attr("transform", "translate(" + 0 + ",-" + (radius + 3) + ")")
        .attr("id", id);

    buttongroup.append("rect")
        .attr("width", radius / 2)
        .attr("height", height)
        .attr("x", -(radius / 4))
        .attr("fill", "#A6A6A6")
        .attr("stroke", "#2E2E2E")
        .attr("stroke-width", 1);

    textTag = buttongroup.append("text")
        .attr("text-anchor", "middle")
        .attr("font-family", "Arial")
        .attr("font-weight", "Bold")
        .attr("font-size", 14)
        .attr("fill", "#000000")
        .attr("class", "enableRotate")
        .style("user-select", "none");

    textTag.append("tspan")
        .attr("y", textHeight + (radius / 90))
        .attr("id", "projectionRightButton")
        .attr("x", radius / 5)
        .text(">")
        .style("user-select", "none")
        .style("cursor", "pointer");

    textTag.append("tspan")
        .attr("font-size", 12)
        .attr("id", "Index" + id)
        .attr("y", textHeight + (radius / 100))
        .attr("x", 0)
        .text((activePerspective.data[id].startIndex + 1) + "-" + (activePerspective.data[id].endIndex + 1) + " / " + total);

    textTag.append("tspan")
        .attr("id", "projectionLeftButton")
        .attr("y", textHeight + (radius / 90))
        .attr("x", -(radius / 5))
        .text("<")
        .style("user-select", "none")
        .style("cursor", "pointer");
}

function highlightArcProjection(view, data, maxRadius, strokeWidthFactor, group, componentId, activePerspective) {
    let url = "#dropshadow_projection_" + activePerspective.key;
    let sturl = "#highlight_projection_" + activePerspective.key;
    let element = backing.dictionary_of_unique_id_to_attr_object[componentId];
    let strokeWidth = (maxRadius * strokeWidthFactor) / 100;
    group.append("path")
        .attr("d", data)
        .attr("class", "highlightArc")
        .attr('filter', 'url(' + url + ')')
        .attr("stroke", 'url(' + sturl + ')')
        .attr("stroke-width", function () {
            if (activePerspective.recentSelectedId !== undefined && componentId === activePerspective.recentSelectedId)
                return strokeWidth * 1.5;
            else return strokeWidth / 1.5;
        })
        .attr("fill-opacity", 0)
        .style("cursor", "pointer")
        .on("mouseover", function () {
            d3.select("#shieldTooltip")
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px")
                .style("opacity", 1)
                .select("#value")
                .html(function () {
                    return renderTextOfShield(element, true);
                });
        })
        .on("mouseout", function () {
            d3.select("#shieldTooltip")
                .style("opacity", 0);
        });
}

function refreshProjectionRingView(activeDesktop, isBiview) {
    let backingView = (isBiview === false) ? backing.singleview : backing.biview;
    let activePerspective = backingView.projectionDesktops[activeDesktop.key];
    activeDesktop.recentSelectedId = "";
    activePerspective.data = [];
    activePerspective.startPoint = 0;
    activePerspective.endPoint = 3;
}


