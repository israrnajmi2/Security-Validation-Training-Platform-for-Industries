$(document).on('click', '#startPoint', function (e) {
    let view = $(this).closest(".innerDesktop").attr("view");
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let ringViewDivId = backing.view_type.ring_view.name + "_" + activeDesktop.div_id;
    activeDesktop.startPoint = activeDesktop.startPoint - 1;
    activeDesktop.endPoint = activeDesktop.endPoint - 1;
    if (activeDesktop.startPoint < 0 || activeDesktop.endPoint < 0) {
        activeDesktop.startPoint = 0;
        activeDesktop.endPoint = 3;
    }
    updateViewsStandards(ringViewDivId, activeDesktop.directoryJson);
    e.stopPropagation();
});

$(document).on('click', '#endPoint', function (e) {
    let view = $(this).closest(".innerDesktop").attr("view");
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    if (activeDesktop.endPoint < activeDesktop.ringCount + 2) {
        let ringViewDivId = backing.view_type.ring_view.name + "_" + activeDesktop.div_id;
        activeDesktop.startPoint = activeDesktop.startPoint + 1;
        activeDesktop.endPoint = activeDesktop.endPoint + 1;
        if (activeDesktop.endPoint >= activeDesktop.ringCount + 3) {
            let r = activeDesktop.endPoint - (activeDesktop.ringCount - 1);
            activeDesktop.startPoint = activeDesktop.startPoint - r;
            activeDesktop.endPoint = activeDesktop.endPoint - r;
        }
        updateViewsStandards(ringViewDivId, activeDesktop.directoryJson);
    }
    e.stopPropagation();
});

$(document).on('click', '.children', function (e) {
    e.preventDefault();
    renderRingViewChildClick($(this));
    e.stopPropagation();
});

$(document).on('click', '.highlightComponentGroup', function (e) {
    e.preventDefault();
    renderRingViewChildClick($(this));
    e.stopPropagation();
});

var DELAY = 250, clicks = 0, timer = null;
$(document).on('click', '#shieldLeftButton', function (e) {
    let view = $(this).closest(".innerDesktop").attr("view");
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let queryId = $("#standardShield_" + activeDesktop.div_id);
    let parentId = $(this).parent().parent().attr("id"), donutdata;
    if (timer == null) {
        timer = setTimeout(function () {
            clicks = 0;
            timer = null;
            let arcArray = queryId.children("#" + parentId).children(".children");
            let ringNum = queryId.children("#" + parentId + ".shieldRing").attr("text");
            let svgId = "svg_" + activeDesktop.div_id;

            let data = activeDesktop.directoryJson;
            if (parentId === data.uniqueId)
                donutdata = data;
            else
                donutdata = findChildrenForGivenParentId(data.children, parentId);
            queryId.children("#" + parentId).children(".levelData").remove();
            queryId.children("#" + parentId).children(".children").remove();
            queryId.children("#" + parentId).children(".highlightComponentGroup").remove();
            if (arcArray.length > activeDesktop.data[parentId].displayCount) {
                activeDesktop.data[parentId].startIndex = activeDesktop.data[parentId].startIndex - 1;
                activeDesktop.data[parentId].endIndex = activeDesktop.data[parentId].endIndex - 1;
                if (activeDesktop.data[parentId].startIndex < 0 || activeDesktop.data[parentId].endIndex < 0) {
                    activeDesktop.data[parentId].startIndex = 0;
                    activeDesktop.data[parentId].endIndex = activeDesktop.data[parentId].displayCount - 1;
                }
                createDonutStandards(view, donutdata, activeDesktop.data[parentId].innerAngle, activeDesktop.data[parentId].outerAngle, activeDesktop.shieldRing[ringNum], "ring_view");
            }
            let highlightComponentGroup = activeDesktop.shieldRing[ringNum].append("g")
                .attr("class", "highlightComponentGroup").attr("id", activeDesktop.data[parentId].selectedChildId);
            createHighlightComponentStandards(view, activeDesktop.data[parentId].selectedChildId, activeDesktop.maxRadius, highlightComponentGroup, true, svgId);
            $("#Index" + parentId).text((activeDesktop.data[parentId].startIndex + 1) + "-" + (activeDesktop.data[parentId].endIndex + 1) + " / " + arcArray.length);
            createLevelDisplay(activeDesktop.shieldRing[ringNum], activeDesktop.shieldThickness, data.uniqueId, activeDesktop.data[parentId].outerAngle, ringNum);
            e.stopPropagation();
        }, DELAY);
    }

    if (clicks === 1) {
        clearTimeout(timer);
        timer = null;
        clicks = -1;
        let arcArray = queryId.children("#" + parentId).children(".children");
        let ringNum = queryId.children("#" + parentId + ".shieldRing").attr("text");
        let svgId = "svg_" + activeDesktop.div_id;

        let data = activeDesktop.directoryJson;
        if (parentId === data.uniqueId)
            donutdata = data;
        else
            donutdata = findChildrenForGivenParentId(data.children, parentId);
        queryId.children("#" + parentId).children(".levelData").remove();
        queryId.children("#" + parentId).children(".children").remove();
        queryId.children("#" + parentId).children(".highlightComponentGroup").remove();
        if (arcArray.length > activeDesktop.data[parentId].displayCount) {
            activeDesktop.data[parentId].startIndex = activeDesktop.data[parentId].startIndex - activeDesktop.data[parentId].displayCount;
            activeDesktop.data[parentId].endIndex = activeDesktop.data[parentId].endIndex - activeDesktop.data[parentId].displayCount;
            if (activeDesktop.data[parentId].startIndex < 0 || activeDesktop.data[parentId].endIndex < 0) {
                activeDesktop.data[parentId].startIndex = 0;
                activeDesktop.data[parentId].endIndex = activeDesktop.data[parentId].displayCount - 1;
            }
            createDonutStandards(view, donutdata, activeDesktop.data[parentId].innerAngle, activeDesktop.data[parentId].outerAngle, activeDesktop.shieldRing[ringNum], "ring_view")
        }
        let highlightComponentGroup = activeDesktop.shieldRing[ringNum].append("g")
            .attr("class", "highlightComponentGroup").attr("id", activeDesktop.data[parentId].selectedChildId);
        createHighlightComponentStandards(view, activeDesktop.data[parentId].selectedChildId, activeDesktop.maxRadius, highlightComponentGroup, true, svgId);
        $("#Index" + parentId).text((activeDesktop.data[parentId].startIndex + 1) + "-" + (activeDesktop.data[parentId].endIndex + 1) + " / " + arcArray.length);
        createLevelDisplay(activeDesktop.shieldRing[ringNum], activeDesktop.shieldThickness, data.uniqueId, activeDesktop.data[parentId].outerAngle, ringNum);
        e.stopPropagation();
    }
    clicks++;

});

$(document).on('click', '#shieldRightButton', function (e) {
    let view = $(this).closest(".innerDesktop").attr("view");
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let queryId = $("#standardShield_" + activeDesktop.div_id);
    let parentId = $(this).parent().parent().attr("id"), donutdata;
    if (timer == null) {
        timer = setTimeout(function () {
            clicks = 0;
            timer = null;
            let arcArray = queryId.children("#" + parentId).children(".children");
            let ringNum = queryId.children("#" + parentId + ".shieldRing").attr("text");
            let svgId = "svg_" + activeDesktop.div_id;

            let data = activeDesktop.directoryJson;

            if (parentId === data.uniqueId)
                donutdata = data;
            else
                donutdata = findChildrenForGivenParentId(data.children, parentId);
            queryId.children("#" + parentId).children(".levelData").remove();
            queryId.children("#" + parentId).children(".children").remove();
            queryId.children("#" + parentId).children(".highlightComponentGroup").remove();

            if (arcArray.length > activeDesktop.data[parentId].displayCount) {
                activeDesktop.data[parentId].startIndex = activeDesktop.data[parentId].startIndex + 1;
                activeDesktop.data[parentId].endIndex = activeDesktop.data[parentId].endIndex + 1;
                if (activeDesktop.data[parentId].endIndex >= arcArray.length) {
                    let r = activeDesktop.data[parentId].endIndex - (arcArray.length - 1);
                    activeDesktop.data[parentId].startIndex = activeDesktop.data[parentId].startIndex - r;
                    activeDesktop.data[parentId].endIndex = activeDesktop.data[parentId].endIndex - r;
                }
                createDonutStandards(view, donutdata, activeDesktop.data[parentId].innerAngle, activeDesktop.data[parentId].outerAngle, activeDesktop.shieldRing[ringNum], "ring_view")
            }
            let highlightComponentGroup = activeDesktop.shieldRing[ringNum].append("g")
                .attr("class", "highlightComponentGroup").attr("id", activeDesktop.data[parentId].selectedChildId);
            createHighlightComponentStandards(view, activeDesktop.data[parentId].selectedChildId, activeDesktop.maxRadius, highlightComponentGroup, true, svgId);
            $("#Index" + parentId).text((activeDesktop.data[parentId].startIndex + 1) + "-" + (activeDesktop.data[parentId].endIndex + 1) + " / " + arcArray.length);
            createLevelDisplay(activeDesktop.shieldRing[ringNum], activeDesktop.shieldThickness, data.uniqueId, activeDesktop.data[parentId].outerAngle, ringNum);
            e.stopPropagation();
        }, DELAY);
    }

    if (clicks === 1) {
        clearTimeout(timer);
        timer = null;
        clicks = -1;
        let arcArray = queryId.children("#" + parentId).children(".children");
        let ringNum = queryId.children("#" + parentId + ".shieldRing").attr("text");
        let svgId = "svg_" + activeDesktop.div_id;

        let data = activeDesktop.directoryJson;

        if (parentId === data.uniqueId)
            donutdata = data;
        else
            donutdata = findChildrenForGivenParentId(data.children, parentId);
        queryId.children("#" + parentId).children(".levelData").remove();
        queryId.children("#" + parentId).children(".children").remove();
        queryId.children("#" + parentId).children(".highlightComponentGroup").remove();

        if (arcArray.length > activeDesktop.data[parentId].displayCount) {
            activeDesktop.data[parentId].startIndex = activeDesktop.data[parentId].startIndex + activeDesktop.data[parentId].displayCount;
            activeDesktop.data[parentId].endIndex = activeDesktop.data[parentId].endIndex + activeDesktop.data[parentId].displayCount;
            if (activeDesktop.data[parentId].endIndex >= arcArray.length) {
                let r = activeDesktop.data[parentId].endIndex - (arcArray.length - 1);
                activeDesktop.data[parentId].startIndex = activeDesktop.data[parentId].startIndex - r;
                activeDesktop.data[parentId].endIndex = activeDesktop.data[parentId].endIndex - r;
            }
            createDonutStandards(view, donutdata, activeDesktop.data[parentId].innerAngle, activeDesktop.data[parentId].outerAngle, activeDesktop.shieldRing[ringNum], "ring_view")
        }
        let highlightComponentGroup = activeDesktop.shieldRing[ringNum].append("g")
            .attr("class", "highlightComponentGroup").attr("id", activeDesktop.data[parentId].selectedChildId);
        createHighlightComponentStandards(view, activeDesktop.data[parentId].selectedChildId, activeDesktop.maxRadius, highlightComponentGroup, true, svgId);
        $("#Index" + parentId).text((activeDesktop.data[parentId].startIndex + 1) + "-" + (activeDesktop.data[parentId].endIndex + 1) + " / " + arcArray.length);
        createLevelDisplay(activeDesktop.shieldRing[ringNum], activeDesktop.shieldThickness, data.uniqueId, activeDesktop.data[parentId].outerAngle, ringNum);
        e.stopPropagation();
    }
    clicks++;
});

$(window).on('resize', function () {
    let view = $(this).closest(".innerDesktop").attr("view");
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let ringViewDivId = backing.view_type.ring_view.name + "_" + activeDesktop.div_id;
    if (activeDesktop.directoryJson && $("#" + ringViewDivId).hasClass("active"))
        updateViewsStandards(ringViewDivId, activeDesktop.directoryJson);
    refreshGroupRingViews(activeDesktop.opened_views);
});

function renderRingViewChildClick(selector) {
    let view = selector.closest(".innerDesktop").attr("view");
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let ringViewDivId = backing.view_type.ring_view.name + "_" + activeDesktop.div_id;
    let compId = selector.attr('id');
    let data = activeDesktop.directoryJson;
    let res = fun1(data.children, compId);
    let resl = res.levels;
    activeDesktop.arr = resl.split(";");
    activeDesktop.recentSelectedId = compId;
    activeDesktop.ringCount = calcDepth(data, activeDesktop.arr);
    let containerId = activeDesktop.tree_container_id;
    let element = backing.dictionary_of_unique_id_to_attr_object[compId], level;
    if (element.children && element.children.length > 0) {
        if (element.level)
            level = element.level;
        else
            level = getLevelOfGivenUniqueId(activeDesktop.directoryJson, compId, 0);
        if (level > activeDesktop.endPoint) {
            activeDesktop.startPoint += 1;
            activeDesktop.endPoint = activeDesktop.startPoint + 3;
            if (activeDesktop.endPoint >= activeDesktop.ringCount + 3) {
                let r = activeDesktop.endPoint - (activeDesktop.ringCount - 1);
                activeDesktop.startPoint = activeDesktop.startPoint - r;
                activeDesktop.endPoint = activeDesktop.endPoint - r;
            }
        }
    }
    updateViewsStandards(ringViewDivId, data);
    $("#" + containerId).find(".flaticon-shape.active").each(function () {
        let selector = $(this);
        selector.removeClass("active");
        selector.closest(".r_conainer").find(".d-text").removeClass("active");
    });
    $("#" + containerId).find(".element_li").each(function () {
        let selector = $(this);
        if (selector.attr("uniqueid") === compId) {
            let parentsOfSelected = selector;
            let selectedId = selector.attr("uniqueid");
            let selectedIdToSearch = activeDesktop.tree_container_id + "_" + backing.view_type.ring_view.id + "_" + selectedId;
            document.getElementById(selectedIdToSearch).scrollIntoView({
                behavior: "smooth",
                inline: "nearest"
            });
            highLightParentsOfD(parentsOfSelected)
        }
    });
}

function highLightParentsOfD(elements) {
    for (let i = 0; i < elements.length; i++) {
        $(elements[i]).children().eq(0).find(".r_conainer").find(".flaticon-shape").addClass("active");
        $(elements[i]).children().eq(0).find(".r_conainer").find(".d-text").addClass("active");
    }
}

function maxRadiusCalculator(x, y) {
    if (x > y) return (y / 2) - 10;
    else return (x / 2) - 10;
}

function fun1(jsonArr, idToFind) {
    let response = {levels: "", isFound: false};
    let childrenZeroIndices = "";
    if (jsonArr) {
        for (let i = 0; i < jsonArr.length; i++) {
            element = jsonArr[i];

            if (element.uniqueId == idToFind) {

                if (element.children)
                    childrenZeroIndices = appendZerothIndexForAllExistingChildren(element.children);
                response.levels = i + childrenZeroIndices;
                response.isFound = true;
                return response;
            }
            else if (element.children) {
                response = fun1(element.children, idToFind);
                if (response.isFound) {
                    response.levels = i + ";" + response.levels;
                    return response;
                }
            }

        }
    }
    return response;
}

function appendZerothIndexForAllExistingChildren(jsonArr) {
    let childrenZeroIndices = "";
    if (jsonArr && jsonArr[0]) {
        childrenZeroIndices = ";0";
        if (jsonArr[0].children)
            childrenZeroIndices = childrenZeroIndices + appendZerothIndexForAllExistingChildren(jsonArr[0].children);
    }
    return childrenZeroIndices;
}

function findChildrenForGivenParentId(data, id) {
    if (data) {
        for (var i = 0; i < data.length; i++) {
            element = data[i];

            if (element.uniqueId == id) {

                if (element.children)
                    return element;
            }
            else if (element.children) {
                var result = findChildrenForGivenParentId(element.children, id);
                if (result) {
                    return result;
                }
            }

        }
    }
}

function dropShadow(group, id) {
    let filter = group.append("filter")
        .attr('id', 'dropshadow_' + id);
    filter.append('feGaussianBlur')
        .attr('in', 'SourceAlpha')
        .attr('stdDeviation', 1) // !!! important parameter - blur
        .attr('result', 'blur');

    //append offset filter to result of gaussion blur filter
    filter.append('feOffset')
        .attr('in', 'blur')
        .attr('dx', 0) // !!! important parameter - x-offset
        .attr('dy', 0) // !!! important parameter - y-offset
        .attr('result', 'offsetBlur');

    //merge result with original image
    let feMerge = filter.append('feMerge');

    //first layer result of blur and offset
    feMerge.append('feMergeNode')
        .attr('in", "offsetBlur');

    //original image on top
    feMerge.append('feMergeNode')
        .attr('in', 'SourceGraphic');
}

function getFontSize(innerRadius, outerRadius) {
    let availableRadius = outerRadius - innerRadius;
    if (availableRadius < 100) return availableRadius * 0.13;
    else if (availableRadius < 200) return availableRadius * 0.12;
    else if (availableRadius < 300) return availableRadius * 0.09;
    else return availableRadius * 0.04;
}

function calculateDepth(data) {
    let depth = calculateDepthHelper(data);
    return depth - 1;
}

function calculateDepthHelper(data) {
    let obj = data;
    let depth = 0;
    if (obj.children && obj.children.length !== 0) {
        obj.children.forEach(function (d) {
            let tmpDepth = calculateDepthHelper(d);
            if (tmpDepth > depth) {
                depth = tmpDepth
            }
        })
    }
    return depth + 1;
}

function calcDepth(data, arr) {
    let displayData = data;
    let count = 0, i = 0;
    while (displayData && displayData.children && displayData.children.length > 0) {
        count++;
        displayData = displayData.children[arr[i]];
        i++;
    }
    return count;
}

function updateViewsStandards(viewId, data) {
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
    let svgId = "svg_" + activeDesktop.div_id;
    let sphericContainerId = viewId + "_wrapper";
    d3.select('#' + svgId).remove();
    activeDesktop.width = $('#' + sphericContainerId).width();
    activeDesktop.height = $('#' + sphericContainerId).height();
    activeDesktop.maxRadius = maxRadiusCalculator(activeDesktop.width, activeDesktop.height);
    let vis = d3.select('#' + sphericContainerId).append("svg")
        .attr("width", activeDesktop.width)
        .attr("height", activeDesktop.height)
        .attr("id", svgId);

    let shadowGroup = vis.append('defs');
    dropShadow(shadowGroup, activeDesktop.div_id);
    let h = vis.append("defs");

    let selectedHighlight = h.append("linearGradient")
        .attr("id", "highlight_" + activeDesktop.div_id)
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
        .attr("transform", "translate(" + activeDesktop.width / 2 + "," + ((activeDesktop.height / 2)) + ")")
        .attr("id", "standardShield_" + activeDesktop.div_id);
    activeDesktop.innerRadius = (activeDesktop.maxRadius * 15) / 100;
    activeDesktop.outerRadius = activeDesktop.maxRadius - 30;
    let circleGroup = group.append("g")
        .attr("id", activeDesktop.div_id + "_name");
    circleGroup.append("circle")
        .attr("id", "innerRadius_" + activeDesktop.div_id)
        .attr("r", activeDesktop.innerRadius)
        .attr("fill", function () {
            return ColorLuminance("#5F4B8B", 1.1);
        });
    if (activeWorkspaceKeyname === "eval_workspace" || activeWorkspaceKeyname === "bi_eval_workspace") {
        selectedPerspective = getPerspectiveInSelection(isBiViewSide);
    }
    circleGroup.append("text")
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", (activeDesktop.innerRadius * 26) / 100)
        .attr("text-anchor", "middle")
        .attr("font-family", "Arial")
        .attr("font-weight", "Bold")
        .attr("font-size", activeDesktop.innerRadius - 10)
        .attr("fill", "white").text(function () {
        if ((activeWorkspaceKeyname === "eval_workspace" || activeWorkspaceKeyname === "bi_eval_workspace") && selectedPerspective.isComposite === false)
            return selectedPerspective.selectedPerspective.name.charAt(0).toUpperCase();
        else
            return ""
    });
    if (activeDesktop.elementIdAndObjectArray === null) {
        updateElementIdAndObjectArray(activeDesktop, data, view, activeDesktop.innerRadius, activeDesktop.outerRadius, group);
    }
    else
        createShieldStandards(data, view, activeDesktop.innerRadius, activeDesktop.outerRadius, group);
    let element = backing.dictionary_of_unique_id_to_attr_object[activeDesktop.recentSelectedId];
    if (element !== undefined)
        getElementWithHotLinks(element, viewId, view);
    else
        activeDesktop.recentSelectedId = "";
    if ((activeWorkspaceKeyname === "eval_workspace" || activeWorkspaceKeyname === "bi_eval_workspace"))
        getCircleList(viewId, activeDesktop.trafficModeSelection, isBiViewSide);
}

function calculateDisplayCount(ringNumber, totalRings) {
    let r;
    if (totalRings === 1)
        r = 5;
    else
        r = (ringNumber * 19) / (totalRings);
    if (r < 2)
        return 2;
    else
        return Math.floor(r);
}

function createShieldStandards(shieldData, view, innerRadius, outerRadius, group) {
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let data = shieldData;
    initializeData(activeDesktop.directoryJson, view);
    let svgId = "svg_" + activeDesktop.div_id;
    let ringC = calcDepth(data, activeDesktop.arr);
    activeDesktop.ringCount = ringC;
    let availableRadius = outerRadius - innerRadius;
    let shieldThickness = availableRadius / 4;
    activeDesktop.shieldThickness = shieldThickness;
    activeDesktop.shieldRing = [];
    let element = backing.dictionary_of_unique_id_to_attr_object[activeDesktop.recentSelectedId];
    let parentItem = element.parentItem;
    let index = getIndexOfGivenChild(parentItem.children, activeDesktop.recentSelectedId);
    let currentOuterRadius = outerRadius;
    let currentInnerRadius = 0;
    let displayData = data, i = 0, j = 1, q = ringC, g = 4, p = 0;
    if (ringC > 1 && activeDesktop.startPoint > 0)
        group.append("g")
            .attr("id", "startPoint")
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
        activeDesktop.shieldRing[j] = group.append("g")
            .attr("class", "shieldRing")
            .attr("text", j)
            .attr("id", displayData.uniqueId);
        if (!activeDesktop.data[displayData.uniqueId]) {
            activeDesktop.data[displayData.uniqueId] = {};
        }
        activeDesktop.data[displayData.uniqueId].outerAngle = currentOuterRadius;
        if (j > activeDesktop.startPoint && j <= (activeDesktop.endPoint + 1)) {
            currentInnerRadius = currentOuterRadius - shieldThickness;
            activeDesktop.data[displayData.uniqueId].innerAngle = currentInnerRadius;
            activeDesktop.data[displayData.uniqueId].startIndex = 0;
            activeDesktop.data[displayData.uniqueId].displayCount = calculateDisplayCount(g, 4);
            activeDesktop.data[displayData.uniqueId].endIndex = activeDesktop.data[displayData.uniqueId].displayCount - 1;
            if (activeDesktop.data[displayData.uniqueId] === activeDesktop.data[parentItem.uniqueId]) {
                activeDesktop.data[parentItem.uniqueId].startIndex = index;
                activeDesktop.data[parentItem.uniqueId].endIndex = index + (activeDesktop.data[parentItem.uniqueId].displayCount - 1);
                if (activeDesktop.data[parentItem.uniqueId].endIndex >= parentItem.children.length) {
                    let s = activeDesktop.data[parentItem.uniqueId].endIndex - (parentItem.children.length - 1);
                    activeDesktop.data[parentItem.uniqueId].startIndex -= s;
                    activeDesktop.data[parentItem.uniqueId].endIndex -= s;
                }
            }
            createDonutStandards(view, displayData, currentInnerRadius, currentOuterRadius, activeDesktop.shieldRing[j], "ring_view");
            let highlightComponentGroup = activeDesktop.shieldRing[j].append("g")
                .attr("class", "highlightComponentGroup");
            if (activeDesktop.arr.length !== 0) {
                activeDesktop.data[displayData.uniqueId].selectedChildId = displayData.children[activeDesktop.arr[i]].uniqueId;
                activeDesktop.data[displayData.uniqueId].selectedChildName = renderTextOfShield(displayData.children[activeDesktop.arr[i]]);
                highlightComponentGroup.attr("id", activeDesktop.data[displayData.uniqueId].selectedChildId);
                createHighlightComponentStandards(view, activeDesktop.data[displayData.uniqueId].selectedChildId, activeDesktop.maxRadius, highlightComponentGroup, true, svgId);
                createLevelDisplay(activeDesktop.shieldRing[j], shieldThickness, data.uniqueId, currentOuterRadius, j);
                addRotationRing(view, displayData, currentOuterRadius, group, "ring_view");
                currentOuterRadius = currentInnerRadius;
                g--;
                p++;
            }
        }
        displayData = displayData.children[activeDesktop.arr[i]];
        i++;
        j++;
        q--;
    }
    let remainingarc = 4 - p;
    $("#innerRadius_" + activeDesktop.div_id).attr("r", (activeDesktop.innerRadius + (shieldThickness * remainingarc)));
    let rectHeight = ((activeDesktop.innerRadius / 2) + (shieldThickness * remainingarc) - 14);
    let endpoint = group.append("g")
        .attr("id", "endPoint")
        .attr("cursor", "pointer").attr("transform", "translate(" + -3 + ",-" + (currentOuterRadius + 3) + ")");
    endpoint.append("rect")
        .attr("width", 5)
        .attr("height", rectHeight)
        .attr("fill", "#5F4B8B");
    if (ringC > 1 && activeDesktop.endPoint < activeDesktop.ringCount + 2)
        endpoint.append("text")
            .attr("transform", "translate(" + 2 + "," + (rectHeight + 15) + ")")
            .attr("font-size", 16)
            .attr("text-anchor", "middle")
            .attr("font-family", "Arial")
            .attr("font-weight", "Bold")
            .text("+")
            .attr("fill", "white");
}

function createLevelDisplay(group, shieldThickness, uniqueId, currentOuterRadius, levelNum, name) {
    let circle = group.append("g")
        .attr("class", "levelData")
        .attr("transform", "translate(" + -3 + ",-" + (currentOuterRadius + 3) + ")");
    circle.append("rect")
        .attr("width", 5)
        .attr("height", shieldThickness + 10)
        .attr("fill", "#5F4B8B");
    if (levelNum)
        circle.append("text")
            .attr("font-size", 8)
            .attr("text-anchor", "middle")
            .attr("font-family", "Arial")
            .attr("x", 2.5)
            .attr("y", shieldThickness / 2 + 10)
            .attr("font-weight", "Bold")
            .attr("fill", "white")
            .attr("id", "ringNum" + uniqueId)
            .text(levelNum);
    if (name)
        getTooltip(circle, name);
}

function addRotationRing(view, data, outerRadius, group, viewName) {
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    if (data.children.length > activeDesktop.data[data.uniqueId].displayCount) {
        let l2ComponentGroup = group.append("g")
            .attr("class", "l2ComponentGroup")
            .attr("id", data.uniqueId);
        if (viewName === "group_ring_view")
            createRotationIconsGroups(view, outerRadius, l2ComponentGroup, data.uniqueId, data.children.length);
        else if (viewName === "ring_view")
            createRotationIconsStandards(view, outerRadius, l2ComponentGroup, data.uniqueId, data.children.length);
    }
}

function createDonutStandards(view, donutData, innerRadius, outerRadius, group, viewName) {
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let data = donutData;
    let pi = Math.PI / 180;
    if (data.children && data.children.length > 0) {
        let componentCount = data.children.length;
        let startAngle = 0;
        let endAngle = 0;
        let varyAngle = 360 / componentCount;
        let hideComponent = false;

        if (componentCount > activeDesktop.data[data.uniqueId].displayCount) {
            varyAngle = 360 / activeDesktop.data[data.uniqueId].displayCount;
        }
        if (activeDesktop.data[data.uniqueId].startIndex >= activeDesktop.data[data.uniqueId].endIndex) {
            startAngle = 360 - ((activeDesktop.data[data.uniqueId].endIndex + 1) * varyAngle);
        }

        for (let i = 0; i < componentCount; i++) {
            hideComponent = true;
            endAngle = startAngle + varyAngle;
            let component = group.append("g")
                .attr("style", "cursor:pointer;")
                .attr("id", data.children[i].uniqueId)
                .attr("class", function () {
                    if (viewName && viewName === "group_ring_view")
                        return "groupChildren";
                    else
                        return "children";
                });
            if (activeDesktop.data[data.uniqueId].startIndex <= activeDesktop.data[data.uniqueId].endIndex) {
                if (i >= activeDesktop.data[data.uniqueId].startIndex && i <= activeDesktop.data[data.uniqueId].endIndex) {
                    hideComponent = false;
                }
            }
            else {
                if (i >= activeDesktop.data[data.uniqueId].startIndex || i <= activeDesktop.data[data.uniqueId].endIndex) {
                    hideComponent = false;
                }
            }
            createArcStandards(viewName, view, data.children[i], innerRadius, outerRadius, startAngle * pi, endAngle * pi, component, hideComponent);
            if (!hideComponent) {
                if (activeDesktop.data[data.uniqueId].startIndex >= activeDesktop.data[data.uniqueId].endIndex) {
                    if (i === activeDesktop.data[data.uniqueId].endIndex) {
                        endAngle = 0;
                    }
                }
                startAngle = endAngle;
            }
        }
    }
    else {
        let component = group.append("g");
        createArcStandards(viewName, view, data, innerRadius, outerRadius, 0, 360 * pi, component)
    }
}

function getAssetFlag(booleanFlags) {
    if (booleanFlags)
        return getTrueOrFalse(booleanFlags, 0);
    return false;
}

function getTrueOrFalse(boolenFlags, position) {
    let zeroOrOne = (boolenFlags >> position) & 1;
    if (zeroOrOne === 1)
        return true;
    else
        return false;
}

function createArcStandards(viewName, view, data, innerRadius, outerRadius, startAngle, endAngle, group, hideComponent) {
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
    if (viewName === "ring_view" && activeDesktop.trafficModeSelection !== undefined && activeDesktop.trafficModeSelection === true) {
        if ((activeWorkspaceKeyname === "eval_workspace" || activeWorkspaceKeyname === "bi_eval_workspace")) {
            fillColor = getFillColorForTrafficMode(data);
        }
    }
    else if (activeWorkspaceKeyname !== "eval_workspace" && activeWorkspaceKeyname !== "bi_eval_workspace") {
        if (activeDesktop.elementIdAndObjectArray && activeDesktop.elementIdAndObjectArray !== null && activeDesktop.elementIdAndObjectArray[data.elementId + "!" + data.objectType] === true) {
            fillColor = "#000";
            data.textColor = "#fff";
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
    addText2ArcStandards(viewName, data, arc4Text, group, hideComponent);
}

function addText2ArcStandards(viewName, data, arc, group, hideComponent) {
    let displayString = renderTextOfShield(data);
    let dy, tspan, y;
    displayString.trim();
    let buildDisplayText = displayString.split(' ');
    let displayText = "";
    for (let i = 0; i < buildDisplayText.length; i++) {
        if (buildDisplayText[i].length > 10) {
            displayText += buildDisplayText[i].substring(0, 9) + "- ";
            if (buildDisplayText[i].substring(10, buildDisplayText[i].length).length > 10) {
                displayText += buildDisplayText[i].substring(9, 18) + "- ";
                displayText += buildDisplayText[i].substring(18, buildDisplayText[i].length) + " ";
            }
            else
                displayText += buildDisplayText[i].substring(9, buildDisplayText[i].length) + " ";
        }
        else
            displayText += buildDisplayText[i] + " ";
    }
    let words = displayText.trim().split(' ');
    if (data.textSize) {
        if (data.textSize < 6) dy = 1;
        else if (data.textSize < 9) dy = 2;
        else if (data.textSize < 12) dy = 3;
        else if (data.textSize < 15) dy = 4;
        else if (data.textSize < 18) dy = 5;
        else dy = 6;
    }
    if (words.length < 5)
        y = (words.length * dy) * -2;
    else
        y = (4 * dy) * -1;
    let textTag = group.append("text")
        .attr("transform", function () {
            if (viewName === "group_ring_view")
                return "translate(" + arc.centroid() + ") rotate(90)";
            else return "translate(" + arc.centroid() + ")";
        })
        .attr("text-anchor", "middle")
        .attr("font-family", "noto_sansregular")
        .attr("font-size", data.textSize)
        .attr("fill", data.textColor)
        .attr("y", y)
        .attr("class", "componentText")
        .style("visibility", "visible");
    textTag.append("tspan").attr("font-family", "Flaticon").attr("font-size", data.textSize - 1).text(data.iconForRingView + " ");
    if (words.length < 5) {
        for (let i = 0; i < words.length; i++) {
            tspan = textTag.append('tspan').attr("x", 0).attr("dy", function () {
                return data.textSize + 1;
            }).text(words[i]);
            if (i > 0)
                tspan.attr("x", 0).attr("dy", data.textSize);
        }
    }
    else {
        for (let i = 0; i < 2; i++) {
            tspan = textTag.append('tspan').attr("x", 0).attr("dy", function () {
                return data.textSize + 1;
            }).text(words[i]);
            if (i === 1)
                tspan.text(words[1] + "...");
            if (i > 0)
                tspan.attr("x", 0).attr("dy", data.textSize);
        }

    }
    if (hideComponent) {
        textTag.style("visibility", "hidden");
    }
}

function createHighlightComponentStandards(view, componentId, maxRadius, group, flag, svgId, isprojection, activePerspective) {
    let strokeWidthFactor = 1;
    if (flag === undefined) flag = false;
    let renderFunction = (isprojection === true) ? highlightArcProjection : highlightArcStandards;
    if (flag) {
        let arcData = $("#" + svgId).find("#" + componentId).children().first().attr("d");
        renderFunction(view, arcData, maxRadius, strokeWidthFactor, group, componentId, activePerspective);
    }
    else if ($("#" + svgId).find("#" + componentId).children().first().attr("fill") !== 'white') {
        let arcData = $("#" + componentId).children().first().attr("d");
        renderFunction(view, arcData, maxRadius, strokeWidthFactor, group, componentId, activePerspective);
    }
}

function highlightArcStandards(view, data, maxRadius, strokeWidthFactor, group, componentId) {
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let url = "#dropshadow_" + activeDesktop.div_id;
    let sturl = "#highlight_" + activeDesktop.div_id;
    let element = backing.dictionary_of_unique_id_to_attr_object[componentId];
    let strokeWidth = (maxRadius * strokeWidthFactor) / 100;
    group.append("path")
        .attr("d", data)
        .attr("class", "highlightArc")
        .attr('filter', 'url(' + url + ')')
        .attr("stroke", 'url(' + sturl + ')')
        .attr("stroke-width", function () {
            if (activeDesktop.recentSelectedId !== undefined && componentId === activeDesktop.recentSelectedId)
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

function createRotationIconsStandards(view, radius, group, id, total) {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, textTag;
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
    let height = (32 * (activeDesktop.shieldThickness)) / 100;
    let textHeight = (18 * (activeDesktop.shieldThickness)) / 100;
    let buttongroup = group.append("g")
        .attr("transform", "translate(" + 0 + ",-" + (radius + 3) + ")")
        .attr("id", id);

    buttongroup.append("rect")
        .attr("width", radius / 2)
        .attr("height", height)
        .attr("x", -(radius / 4))
        .attr("fill", function () {
            if ((activeWorkspaceKeyname === "eval_workspace" || activeWorkspaceKeyname === "bi_eval_workspace"))
                return "#A6A6A6";
            else
                return "white";
        })
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
        .attr("id", "shieldRightButton")
        .attr("x", radius / 5)
        .text(">")
        .style("user-select", "none")
        .style("cursor", "pointer");

    textTag.append("tspan")
        .attr("font-size", 12)
        .attr("id", "Index" + id)
        .attr("y", textHeight + (radius / 100))
        .attr("x", 0)
        .text((activeDesktop.data[id].startIndex + 1) + "-" + (activeDesktop.data[id].endIndex + 1) + " / " + total);

    textTag.append("tspan")
        .attr("id", "shieldLeftButton")
        .attr("y", textHeight + (radius / 90))
        .attr("x", -(radius / 5))
        .text("<")
        .style("user-select", "none")
        .style("cursor", "pointer");
}

function createRotationIconsGroups(view, radius, group, id, total) {
    let textTag;
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let height = (32 * (activeDesktop.groupArcThickness)) / 100;
    let textHeight = (18 * (activeDesktop.groupArcThickness)) / 100;
    let buttongroup = group.append("g")
        .attr("transform", "translate(" + 0 + ",-" + (radius + 3) + ")")
        .attr("id", id);

    buttongroup.append("rect")
        .attr("width", radius / 2)
        .attr("height", height)
        .attr("x", -(radius / 4))
        .attr("fill", "white").attr("stroke", "#2E2E2E").attr("stroke-width", 1);

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
        .attr("id", "groupRightButton")
        .attr("x", radius / 5)
        .text(">")
        .style("user-select", "none")
        .style("cursor", "pointer");

    textTag.append("tspan")
        .attr("font-size", 12)
        .attr("id", "Index" + id)
        .attr("y", textHeight + (radius / 100))
        .attr("x", 0)
        .text((activeDesktop.data[id].startIndex + 1) + "-" + (activeDesktop.data[id].endIndex + 1) + " / " + total);

    textTag.append("tspan")
        .attr("id", "groupLeftButton")
        .attr("y", textHeight + (radius / 90))
        .attr("x", -(radius / 5))
        .text("<")
        .style("user-select", "none")
        .style("cursor", "pointer");
}

function renderTextOfShield(element, isTooltip) {
    let objectType = element.objectType;
    let returnHtml;
    switch (objectType) {
        case constants.objectType.SCE: {
            returnHtml = getStextForSce(element, isTooltip);
            break;
        }
        case constants.objectType.OBJECTIVE_PARAMETER: {
            returnHtml = getStextForObjective(element, isTooltip);
            break;
        }
        case constants.objectType.METHOD_PARAMETER: {
            returnHtml = getStextForMethod(element, isTooltip);
            break;
        }
        case constants.objectType.CONTENT_PARAMETER: {
            returnHtml = getStextForContent(element, isTooltip);
            break;
        }
        case constants.objectType.SUBJECT_PARAMETER: {
            returnHtml = getStextForSubjective(element, isTooltip);
            break;
        }
        case constants.objectType.SHIELD: {
            returnHtml = getStextForGeneral(element, isTooltip);
            break;
        }
        case constants.objectType.SHIELD_TYPE: {
            returnHtml = getStextForGeneral(element, isTooltip);
            break;
        }
        case constants.objectType.SHIELD_ELEMENT_TYPE: {
            returnHtml = getStextForGeneral(element, isTooltip);
            break;
        }
        case constants.objectType.SHIELD_ELEMENT: {
            returnHtml = getStextForGeneral(element, isTooltip);
            break;
        }
        case constants.objectType.ASSET_TYPE: {
            returnHtml = getStextForGeneral(element, isTooltip);
            break;
        }
        case constants.objectType.ASSET: {
            returnHtml = getStextForGeneral(element, isTooltip);
            break;
        }
        case constants.objectType.TECHNICAL_SUPPORT_PEOPLE: {
            returnHtml = getStextForGeneral(element, isTooltip);
            break;
        }
        case constants.objectType.PROVIDER: {
            returnHtml = getStextForGeneral(element, isTooltip);
            break;
        }
        case constants.objectType.TECHNICAL_SUPPORT_CONTACT_INFO: {
            returnHtml = getStextForGeneral(element, isTooltip);
            break;
        }
        case constants.objectType.SCE_FULFILLS_SHIELD_ELEMENT_LINK: {
            returnHtml = getStextForGeneral(element, isTooltip);
            break;
        }
        case constants.objectType.ASSET_DELIVERS_SCE_LINK: {
            returnHtml = getStextForGeneral(element, isTooltip);
            break;
        }
        case constants.objectType.SHIELD_ELEMENT_GROUP: {
            return "No Members";
        }

        default: {
            returnHtml = getStextForGeneral(element, isTooltip);
        }
    }
    return returnHtml;

}

function getStextForGeneral(element, isTooltip) {
    let strvar = "";
    if (isTooltip === true) {
        if (element.rating !== undefined)
            strvar += "<div style=\"text-align:center;\">Rating: " + element.rating + "</div>";
        else if (element.index !== undefined)
            strvar += "<div style=\"text-align:center;\">Index: " + element.index + "</div>";
        strvar += element.name;
        return strvar;
    }
    else if (element.level !== undefined)
        return element.name;
    else
        return element.name;
}

function getStextForSce(element, isTooltip) {
    let strvar = "";
    let elementName = combineChainElements(element);
    if (isTooltip === true) {
        if (element.rating !== undefined)
            strvar += "<div style=\"text-align:center;\">Rating: " + element.rating + "</div>";
        else if (element.index !== undefined)
            strvar += "<div style=\"text-align:center;\">Index: " + element.index + "</div>";
        strvar += "<div>";
        strvar += elementName.str;
        strvar += "</div>";
        return strvar;
    }
    else {
        strvar += "";
        strvar += elementName.str;
        strvar += "";
        return strvar;
    }
}

function getStextForObjective(element, isTooltip) {
    let strvar = "";
    if (isTooltip === true) {
        if (element.rating !== undefined)
            strvar += "<div style=\"text-align:center;\">Rating: " + element.rating + "</div>";
        else if (element.index !== undefined)
            strvar += "<div style=\"text-align:center;\">Index: " + element.index + "</div>";
        strvar += element.name;
        return strvar;
    }
    else if (element.odosLevel)
        return element.name;
    else
        return element.name;
}

function getStextForMethod(element, isTooltip) {
    let strvar = "";
    if (isTooltip === true) {
        if (element.rating !== undefined)
            strvar += "<div style=\"text-align:center;\">Rating: " + element.rating + "</div>";
        else if (element.index !== undefined)
            strvar += "<div style=\"text-align:center;\">Index: " + element.index + "</div>";
        strvar += element.name;
        return strvar;
    }
    else if (element.mdosLevel)
        return element.name;
    else
        return element.name;
}

function getStextForContent(element, isTooltip) {
    let strvar = "";
    if (isTooltip === true) {
        if (element.rating !== undefined)
            strvar += "<div style=\"text-align:center;\">Rating: " + element.rating + "</div>";
        else if (element.index !== undefined)
            strvar += "<div style=\"text-align:center;\">Index: " + element.index + "</div>";
        strvar += element.name;
        return strvar;
    }
    else if (element.cdosLevel)
        return element.name;
    else
        return element.name;

}

function getStextForSubjective(element, isTooltip) {
    let strvar = "";
    if (isTooltip === true) {
        if (element.rating !== undefined)
            strvar += "<div style=\"text-align:center;\">Rating: " + element.rating + "</div>";
        else if (element.index !== undefined)
            strvar += "<div style=\"text-align:center;\">Index: " + element.index + "</div>";
        strvar += element.name;
        return strvar;
    }
    else if (element.sdosLevel)
        return element.name;
    else
        return element.name;
}
