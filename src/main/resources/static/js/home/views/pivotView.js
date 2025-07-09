let idOfDirectControlLink;

function promisifyGetPivotDropdownContent(data) {
    return new Promise((resolve, reject) => {
        service.getPivotDropdownContent(data, function (res, err) {
            if(err)
                reject(err)
             resolve(res);
        });
    })
}

$(document).ready(function () {
    $(document).on("click", ".singleview-pivot-view", function (e) {
        let target = $(e.target);
        pivotViewClick($(this), false);
        if (target.parents(".r_conainer").length) {
            e.stopPropagation();
        }
    });


     $(document).on("contextmenu", ".singleview-pivot-view", function(e){
        let target = $(e.target);
        pivotViewClick($(this), false);
        if (target.parents(".r_conainer").length) {
            e.stopPropagation();
        }
        return false;
     });


    $(document).on("click", ".biview-pivot-view", function (e) {
        let target = $(e.target);
        pivotViewClick($(this), true);
        if (target.parents(".r_conainer").length) {
            e.stopPropagation();
        }
    });

    $(document).on("click", ".pivot-view-menu", async function (e) {
        if(!$(this).children(".pivotOptions").hasClass("dis-none")) {
            $(this).children(".pivotOptions").toggleClass("dis-none");
            e.stopPropagation();
            return;
        }
        $(this).closest(".innerDesktop").find(".pivotOptions").addClass("dis-none");

        if(!$(this).hasClass("options-fetched")) {
            let uniqueId = $(this).attr("uniqueId");
            let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
            if (!element)
                alert("it is bad again");
            const optionsForObjectType = await promisifyGetPivotDropdownContent({objectType: element[ATTR["objectType"]], elementId: element[ATTR["elementId"]]});
            // populate dropdown with the options fetched. // that is it.
            const parentDivObj = $(this).closest(".innerDesktop");
            const options = getPivotOptionsLis(element, parentDivObj.attr("id"), optionsForObjectType);
            $(this).children(".pivotOptions").html(options);
            $(this).addClass("options-fetched");
        }

        $(this).children(".pivotOptions").toggleClass("dis-none");
        let width = $(this).children(".pivotOptions").width();
        let position = e.pageX - $(this).closest(".innerDesktop").offset().left;
        if (position < width) {
            let rightPosition = 500 - ($(this).closest(".innerDesktop").width() - position);
            $(this).children(".pivotOptions").attr("style", "margin-left:-" + rightPosition + "px;max-width:500px;");
            $(this).children(".pivotOptions").children(".pivotli").attr("style", "min-width:" + width + "px!important;");
        }
        else {
            if (($(this).closest(".innerDesktop").width() - position) < width) {
                let rightPosition = width - ($(this).closest(".innerDesktop").width() - position);
                $(this).children(".pivotOptions").attr("style", "margin-left:-" + rightPosition + "px;")
            }
        }
        e.stopPropagation();
    });

    $(document).on("mouseleave", ".pivotOptions", function () {
        $(this).addClass("dis-none");
        $(this).attr("style", "");
    });

    $(document).on("click", ".pivotli", function (e) {
        $("#saveData").show();
        let idOfOptionLi = $(this).attr("id");
        let viewDescriptorWithLabel = backing.pivot_li_id_to_option_dict[idOfOptionLi];
        if (!viewDescriptorWithLabel)
            alert("it is bad.");
        let uniqueId = $(this).attr("uniqueId");
        let elementJson = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        if (!elementJson)
            alert("it is bad again");
        let objToPassToRestService = {};
        objToPassToRestService.elementId = elementJson.elementId;
        objToPassToRestService.objectType = elementJson.objectType;
        objToPassToRestService.viewDescriptorWithLabel = viewDescriptorWithLabel;

        let element_li_object = $(this).closest(".element_li");
        let parentDivObj = $(this).closest(".innerDesktop");
        let li = $(this);
        let view = parentDivObj.attr("view");
        service.getPivotSubTree(objToPassToRestService, function (res, err) {
            if (res) {
                let isBiview = false;
                if (view !== "singleview")
                    isBiview = true;
                if (res.children && res.children.length !== 0) {
                    li.closest("ul.pivotOptions").find(".activePivotLi").removeClass("activePivotLi");
                    li.addClass("activePivotLi");
                    let optionsUlStr = li.closest(".pivot-view-menu").children("ul.pivotOptions").html();
                    res.uniqueId = element_li_object.attr("uniqueId");
                    generateUniqueIdAndParentLinkForSubtreePivot(res.children, element_li_object.attr("uniqueId"), elementJson);

                    parentDivObj.find(".pivot-highlight-bg").removeClass('pivot-highlight-bg');
                    element_li_object.addClass("pivot-highlight-bg");
                    element_li_object.children('ul').remove();
                    element_li_object.append(renderChildrenPivot(res[ATTR.children], element_li_object.attr("id"), view, isBiview, res[ATTR["elementId"]]));
                    // elmement li . addChild(pivotChildrenFunction);
                    // refreshSubtreePivot(res, element_li_object.attr("id"), view, isBiview, optionsUlStr);
                }
                else
                    alert("Empty Result Set Returned");
                $("#saveData").hide();
            }
            else if (err) {
                errorHandler(err);
                $("#saveData").hide();
            }
        });
        e.stopPropagation();
    });
});

function pivotViewClick(selector, isBiview) {
    $("#saveData").show();
    idOfDirectControlLink = null;
    let src_hotlinkId = selector.attr("id");
    let src_id = selector.closest(".innerDesktop").attr("id");
    let pivotViewDivId = backing.view_type.pivot_view.name + "_" + src_hotlinkId;
    let uniqueId = selector.attr("uniqueid");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];

    service.getPivotDropdownContent({objectType: element[ATTR["objectType"]], elementId: element[ATTR["elementId"]]}, function (optionsForObjectType, err) {
        if (optionsForObjectType) {
            let activeDesktop = getActiveDesktop(isBiview);
            let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
            let data = {};
            let name;
            //check for space in screen
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.pivot_view.key);
            if (!haveSpaceToOpenView) {
                $("#saveData").hide();
                return;
            }
            //check view is opened before
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(pivotViewDivId, isBiview);

            if (isViewOpenedBefore) {
                $("#saveData").hide();
                return;
            }
            data.elementId = element[ATTR.elementId];
            data.objectType = element[ATTR.objectType];
            if (data.objectType === constants.objectType.SCE_ROOT || data.objectType === constants.objectType.SCE) {
                let elementName = combineChainElements(element);
                name = elementName.str;
            }
            else
                name = element[ATTR.name];

            createPivotView(pivotViewDivId, element, isBiview, optionsForObjectType);
            if (active_desktop_directory_view_id === src_id)
                createScenarioViewOpenedFromAnchorSingleCase(pivotViewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.pivot_view.key, "Pivot View: " + name, uniqueId, isBiview);
            else
                createScenarioViewOpenedFromView(pivotViewDivId, src_id, src_hotlinkId, backing.view_type.pivot_view.key, "Pivot View: " + name, uniqueId, isBiview);
            repositionViews(isBiview);
            highlightSourceAndView(pivotViewDivId, isBiview);
            $("#saveData").hide();

            // added by Manish to select direct control link by default
            if(idOfDirectControlLink){
                $("#"+idOfDirectControlLink).trigger('click');
                idOfDirectControlLink=undefined;
            }
        } else if (err) {
            $("#saveData").hide();
            errorHandler(err);
        }
     });
}

function generateUniqueIdAndParentLinkForSubtreePivot(children, uniqueIdOfParent, parentObj) {
    if (children) {
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            child.uniqueId = createIdForElement(child[ATTR.elementId], child[ATTR.objectType], uniqueIdOfParent);
            child.parentItem = parentObj;
            backing.dictionary_of_unique_id_to_attr_object[child.uniqueId] = child;
            if (child.children)
                generateUniqueIdAndParentLinkForSubtreePivot(child.children, child.uniqueId, child);
        }
    }
}

let refreshSubtreePivot = function (renderData, idOfSubTreeRootLi, view, isBiview, optionsHtmlStr) {
    let strVar = "";

    strVar += " <div class=\"directoryListItemContainer clearfix\">\n";
    if (renderData && renderData[ATTR.children] && renderData[ATTR.children].length > 0) {

        strVar += " <div class=\"whiteBgTriangle whiteBg\">\n";

        strVar += " <span class=\"triangle_active fleft\"></span>\n";
        strVar += " </div>\n";
        strVar += " <span class=\"verticle_dotted_line-deactivate\"></span>\n";
    }
    else {
        strVar += " <span class=\"verticle_dotted_line-deactivate verticle_dotted_line-long\"></span>\n";
    }
    strVar += " <div class=\"r_conainer fleft\">\n";

    strVar += renderCircleOrSquareInventoryDv(renderData, isBiview);
    strVar += renderTextOfDv(renderData);
    strVar += " <span id = \"" + idOfSubTreeRootLi + "_" + backing.view_type.dataview.id + "_" + renderData.uniqueId + "\" uniqueId =\"" + renderData.uniqueId + "\" class=\"flaticon-open-file pivot-view-menu\">";
    strVar += "<ul class=\"pivotOptions dis-none\">";
    strVar += optionsHtmlStr;
    strVar += "</ul>";
    strVar += "</span>";
    strVar += renderHotlinkInventoryDv(renderData, idOfSubTreeRootLi, view);
    strVar += " </div>\n";
    strVar += " </div>";
    if (renderData[ATTR.children]) {
        strVar += renderChildrenPivot(renderData[ATTR.children], idOfSubTreeRootLi, view, isBiview, renderData[ATTR["elementId"]]);
    }

    $("#" + idOfSubTreeRootLi).html(strVar);
};

function renderChildrenPivot(childrenArray, idOfParentDiv, view, isBiview, rootElementId) {
    function renderChild() {
        strVar += " <li class=\"element_li " + view + "_pivotli\" id=\"" + idOfParentDiv + "_" + childrenArray[i].uniqueId + "\" uniqueId = \"" + childrenArray[i].uniqueId + "\">\n";
        strVar += " <div class=\"directoryListItemContainer clearfix\">\n";
        if (childrenArray[i][ATTR.children] && childrenArray[i][ATTR.children].length > 0) {

            strVar += " <div class=\"whiteBgTriangle whiteBg\">\n";

            strVar += " <span class=\"triangle_active fleft\"></span>\n";
            strVar += " </div>\n";
            strVar += " <span class=\"verticle_dotted_line-deactivate\"></span>\n";
        }
        else
            strVar += " <span class=\"verticle_dotted_line-deactivate verticle_dotted_line-long\"></span>\n";
        strVar += " <div class=\"r_conainer fleft\">\n";
        strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview);
        strVar += renderTextOfDv(childrenArray[i]);
        if(childrenArray[i][ATTR["objectType"]] && childrenArray[i][ATTR["elementId"]] && rootElementId != childrenArray[i][ATTR["elementId"]]) {
            strVar += " <span id = \"" + idOfParentDiv + "_" + backing.view_type.dataview.id + "_" + childrenArray[i].uniqueId + "\" uniqueId =\"" + childrenArray[i].uniqueId + "\" class=\"flaticon-open-file pivot-view-menu\">";
            strVar += "<ul class=\"pivotOptions dis-none\">";
            // strVar += getPivotOptionsLis(childrenArray[i], idOfParentDiv);
            strVar += "</ul>\n";
        }
        strVar += "</span>";
        strVar += renderHotlinkInventoryDv(childrenArray[i], idOfParentDiv, view);
        strVar += " </div>\n";
        strVar += " </div>";
        if (childrenArray[i][ATTR.children]) {
            strVar += renderChildrenPivot(childrenArray[i][ATTR.children], idOfParentDiv, view, isBiview, rootElementId);
        }
        strVar += "</li>\n";
    }

    if (!childrenArray)
        return "";
    else if (childrenArray.length === 0)
        return "";
    else {
        var strVar = "";
        strVar += " <ul class=\"directoryViewUlE clearfix\" hidden>\n";
        for (var i = 0; i < childrenArray.length; i++) {
            renderChild();
        }
        strVar += "</ul>\n";
        $("#saveData").hide();
        return strVar;
    }
}

function createOptionId(obj) {
    let id = "";
    if (obj.viewName)
        id += obj.viewName;
    if (obj.selectionMode)
        id += obj.selectionMode;
    if (obj.shieldId)
        id += obj.shieldId;
    if (obj.label)
        id += obj.label;
    id = id.replace(/\W/g, '');
    id = id.replace(/ /g, '');
    return id;
}

function getPivotOptionsLis(elementJson, idOfParentDiv, optionsForObjectType) {
    let str = "";
    if (optionsForObjectType && optionsForObjectType.length !== 0) {
        for (let i = 0; i < optionsForObjectType.length; i++) {
            let option_id_to_append = createOptionId(optionsForObjectType[i]);
            let id = idOfParentDiv + "_" + elementJson.uniqueId + "_pivotli_" + option_id_to_append;
            backing.pivot_li_id_to_option_dict[id] = optionsForObjectType[i];
            str += "<li id=\"" + id + "\" uniqueId=\"" + elementJson.uniqueId + "\" class=\"pivotli\">" + optionsForObjectType[i].label + "</li>";

            // added by Manish to select direct control link by default
            if(optionsForObjectType[i].label==="All"){
                idOfDirectControlLink=id;
            }
        }
    }
    return str;
}

function getPivotElementHtml(elementJson, idOfParentDiv, view, optionsForObjectType) {
    let strVar = "";
    strVar += " <li class=\"element_li " + view + "_pivotli\" id=\"" + idOfParentDiv + "_" + elementJson.uniqueId + "\" uniqueId = \"" + elementJson.uniqueId + "\">\n";
    strVar += " <div class=\"directoryListItemContainer clearfix\">\n";
    strVar += " <span class=\"verticle_dotted_line-deactivate verticle_dotted_line-long\"></span>\n";
    strVar += " <div class=\"r_conainer fleft\">\n";
    if (view === "singleview") {
        strVar += renderCircleOrSquareInventoryDv(elementJson, false, false, true);
    }
    else if (view === "biview") {
        strVar += renderCircleOrSquareInventoryDv(elementJson, true, false, true);
    }
    elementJson.linkName = "";
    strVar += renderTextOfDv(elementJson);
    if(optionsForObjectType)
        strVar += " <span id = \"" + idOfParentDiv + "_" + elementJson.uniqueId + "\" uniqueId =\"" + elementJson.uniqueId + "\" class=\"flaticon-open-file  pivot-view-menu options-fetched\">";
    else
        strVar += " <span id = \"" + idOfParentDiv + "_" + elementJson.uniqueId + "\" uniqueId =\"" + elementJson.uniqueId + "\" class=\"flaticon-open-file  pivot-view-menu\">";
    strVar += "<ul class=\"pivotOptions dis-none\">";
    strVar += getPivotOptionsLis(elementJson, idOfParentDiv, optionsForObjectType);
    strVar += "</ul></span>";
    strVar += renderHotlinkInventoryDv(elementJson, idOfParentDiv, view);
    strVar += " </div>\n";
    strVar += " </div>";
    strVar += "</li>\n";
    return strVar;
}

function getPivotViewContent(pivotViewDivId, elementJson, isBiview, optionsForObjectType) {
    let activeDesktop, viewClass, headerName;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(elementJson, isBiview, "", true);
    activeDesktop = getActiveDesktop(isBiview);
    viewClass = getSingleOrBiView(isBiview);
    let desktopId = activeDesktop.div_id;
    headerName = getViewHeaderName(elementJson);
    let str = "<div class=\"panel-header-container " + viewClass + "\">" +
        "<span class=\"flaticon-axis-arrows pivotViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    str += `<span class="panel-header">PIVOT VIEW: ${objectTypeIcon} <span class ="viewHeaderName" title ="${headerName.toUpperCase()}">${headerName.toUpperCase()}</span></span></span>`;
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + viewClass + "CloseBtn\" id=\"closeAssociationView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>";
    str += "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>";
    str += "</div>";
    if (elementJson) {
        str += "<div class=\"treeContainerPivotView\">" +
            "<div class=\"tree_structure_parent\"><ul class=\"directoryView_ringList clearfix directoryViewList directoryViewList_DV directoryViewUl\" id = \"pivot_directoryview\" style=\"margin-top: 10px;\">";

        str += getPivotElementHtml(elementJson, pivotViewDivId, viewClass, optionsForObjectType);
        str += "</ul>" +
            "</div>" +
            "</div>";
    }
    return str;

}

function createPivotView(pivotViewDivId, elementJson, isBiview, optionsForObjectType) {
    let activeDesktop, viewClass;
    activeDesktop = getActiveDesktop(isBiview);
    if (isBiview)
        viewClass = "biview";
    else
        viewClass = "singleview";
    let desktopId = activeDesktop.div_id;
    elementJson.children = [];
    let str = "";
    str += "<div id=\"" + pivotViewDivId + "\" class=\"innerDesktop pivotViewDesktop\" view=\"" + viewClass + "\" uniqueId=\"" + elementJson.uniqueId + "\">";
    str += getPivotViewContent(pivotViewDivId, elementJson, isBiview, optionsForObjectType);
    str += "</div>";
    $("#" + desktopId).append(str);
}