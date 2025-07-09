$(document).ready(function () {
    $(document).on("click", ".singleview-expression-view", function (e) {
        expressionViewClick($(this), false);
        e.stopPropagation();
    });

    $(document).on("click", ".biview-expression-view", function (e) {
        expressionViewClick($(this), true);
        e.stopPropagation();
    });

    $(document).on("click", ".selectedName", function () {
        let viewName = $(this).closest(".innerBlock").attr("id");
        $("#" + viewName).find(".expressionChildViewText.selected").closest(".element_li").each(function () {
            let a = $(this).closest(".tree_structure_parent");
            let b = $(this);
            a.animate({scrollTop: b.offset().top - a.offset().top + a.scrollTop(), scrollLeft: 0}, 300);
        });
    });
});

function expressionViewClick(selector, isBiview) {
    $("#saveData").show();
    let src_hotlinkId = selector.attr("id");
    let src_id = selector.closest(".innerDesktop").attr("id");
    let expressionViewDivId = backing.view_type.expressionview.name + "_" + src_hotlinkId;
    let uniqueId = selector.attr("uniqueid");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let elementName = combineChainElements(element);
    let activeDesktop = getActiveDesktop(isBiview);
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
    let data = selector.attr("sceId");
    //check for space in screen
    let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.expressionview.key);
    if (!haveSpaceToOpenView) {
        $("#saveData").hide();
        return;
    }
    //check view is opened before
    let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(expressionViewDivId, isBiview);

    if (isViewOpenedBefore) {
        $("#saveData").hide();
        return;
    }
    service.getExpressionView(data, function (res, err) {
        if (res) {
            renderSingleExpressionView(res, expressionViewDivId, element, isBiview);
            if (active_desktop_directory_view_id === src_id)
                createScenarioViewOpenedFromAnchorSingleCase(expressionViewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.expressionview.key, "Expression View: " + elementName.str, uniqueId, isBiview);
            else
                createScenarioViewOpenedFromView(expressionViewDivId, src_id, src_hotlinkId, backing.view_type.expressionview.key, "Expression View: " + elementName.str, uniqueId, isBiview);
            //call reposition home function
            repositionViews(isBiview);
            highlightSourceAndView(expressionViewDivId, isBiview);
            $("#saveData").hide();

        }
        else if (err) {
            $("#saveData").hide();
            errorHandler(err);
        }
    });
}

function renderSingleExpressionView(res, viewName, element, isBiviewSide) {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, view;
    if (isBiviewSide === true) {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        view = "biview";
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        view = "singleview";
    }
    let desktopId = activeDesktop.div_id;
    let str = "";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop expressionviewDesktop\" view=\"" + view + "\" uniqueid =\"" + element.uniqueId + "\">";
    str += getContentOfExpressionView(res, viewName, element, isBiviewSide);
    str += "</div>";
    $("#" + desktopId).append(str);
}

function getContentOfExpressionView(res, viewName, element, isBiviewSide) {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, view, closeBtnClass, copyBtnClass;
    if (isBiviewSide === true) {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        view = "biview";
        closeBtnClass = "biviewCloseBtn";
        copyBtnClass = "biview-expression-edit-element";
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        view = "singleview";
        closeBtnClass = "singleviewCloseBtn";
        copyBtnClass = "singleview-expression-edit-element";
    }
    let elementName = combineChainElements(element);
    let desktopId = activeDesktop.div_id;

    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiviewSide, "", true);

    let str = "<div class=\"panel-header-container " + view + "\">" +

        "<span class=\"flaticon-open-tab-2 ExpressionViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>" +
        "<span class=\"panel-header\" style=\"margin-left: 10px\">Expression VIEW: " + objectTypeIcon + "" + elementName.str + "</span>" +
        "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + closeBtnClass + "\" id=\"closeExpressionView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>";
    if (activeDesktopKeyname === "expression_desktop")
        str += "<span id = \"" + viewName + "_" + backing.view_type.create_expression_view.id + "_" + element.uniqueId + "\" uniqueId =\"" + element.uniqueId + "\" title= \"Create Expression\" elementType=\"" + element.objectType + "\" class=\"tooltip copyExp " + copyBtnClass + "\">COPY</span>";
    str += "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"data-container-expressionView\">" +
        "<div class=\"dataView-description\">" +
        "<span class=\"descriptionheading\">Description:</span>";
    if (res[ATTR.description] && res[ATTR.description] !== "")
        str += "<div class=\"descriptionContent\">" + res[ATTR.description] + "</div>";
    else
        str += "<div class=\"descriptionContent\">No Description</div>";
    str += "</div>";
    str += "<div class=\"expViewContainer\">";
    str += renderIndividualExpression(res[ATTR.odosTree], isBiviewSide, viewName + "odosChain", "Security Technique", "Objective", activeDesktop, false);
    str += renderIndividualExpression(res[ATTR.mdosTree], isBiviewSide, viewName + "mdosChain", "Security Content", "Method", activeDesktop, false);
    str += renderIndividualExpression(res[ATTR.cdosTree], isBiviewSide, viewName + "cdosChain", "Protected Content", "Content", activeDesktop, false);
    str += renderIndividualExpression(res[ATTR.sdosTree], isBiviewSide, viewName + "sdosChain", "Protected Subject", "Subject", activeDesktop, false);
    str += "</div>";
    return str;
}

function getExpressionSearchBox(view) {
    return "<div class=\"expressionViewSearchBox " + view + "\"><span class=\"flaticon-search search\"></span><input class=\" searchBox\" placeholder=\"Search\">\n" +
        "<span title=\"Clear Search\" class=\"tooltip clearSearchBox flaticon-remove tooltipstered fright\"></span>" +
        "<div class=\"desktop-search-wrapper selectorLabel fright\" style=\"padding:9px;\">\n" +
        "<span class=\"restrictedSearchBox searchSelector flaticon-filter-search\" title=\"Show Search Results Only\"></span>" +
        "</div></div>";
}

function renderIndividualExpression(renderData, isBiviewside, WrapperId, Heading, ContainerName, activeDesktop, isCreateView, selectedId) {
    let view;
    if (isBiviewside === true)
        view = "biview";
    else
        view = "singleview";
    let str = "";
    if (isCreateView) {
        if (ContainerName === "Objective") {
            str += "<div class=\"expViewWrapper  " + ContainerName + "Container expViewWrapperWithHeight innerBlock\" id=" + WrapperId + "><div class=\"expressionViewHeading " + view + "\">" + Heading + "<span style=\"color:#ec4c4c;\">*</span></div>";
        }
        else
            str += "<div class=\"expViewWrapper  " + ContainerName + "Container expViewWrapperWithHeight innerBlock\" id=" + WrapperId + "><div class=\"expressionViewHeading " + view + "\">" + Heading + "</div>";
        str += getExpressionSearchBox(view);
        str += "<div class=\"expressionViewHeader " + view + "\"><span class=\"selectedName fleft\"></span><span title=\"Clear Selection\" class=\"expressionClear flaticon-remove\"></span></div>";
    }
    else {
        str += "<div class=\"expViewWrapper  " + ContainerName + "Container expViewWrapperWithHeight innerBlock\" id=" + WrapperId + "><div class=\"expressionViewHeading " + view + "\">" + Heading + "</div>";
        str += getExpressionSearchBox(view);
    }
    if (renderData) {
        if (isCreateView) {
            str += "<div class=\"treeContainerExpressionView\">";
            str += "<div class=\"tree_structure_parent\">";
            generateUniqueIdAndParentLinkForSubtree(renderData, activeDesktop.div_id, null);
            str += renderDirectoryViewForCreateExpressionForChildren(renderData, WrapperId, view, "CreateOrEditExpressionView", false, selectedId);
        }
        else {
            str += "<div class=\"treeContainerExpressionView\" style=\"height: calc(100% - 60px);\">";
            str += "<div class=\"tree_structure_parent\">";
            generateUniqueIdAndParentLink(renderData, activeDesktop.div_id, null);
            str += renderDirectoryViewForExpressionViewForChildren(renderData.children, WrapperId, view, "ExpressionView", false);
        }
        str += "</div></div>";
    }
    else {
        str += "<ul style=\"margin: 10px;\"><li style=\"padding:5px; opacity: 0.5;\" class=\"expViewli\">NOT APPLICABLE</li></ul>";
    }
    str += "</div>";
    return str;
}

function renderChildrenForIndividualExpression(childrenArray, idOfParentDiv) {
    function renderChild() {
        strVar += " <li class=\"element_li\">\n";
        strVar += " <div class=\"directoryListItemContainer clearfix\">\n";
        if (childrenArray[i][ATTR.children] && childrenArray[i][ATTR.children].length > 0) {
            strVar += " <div class=\"whiteBgTriangle whiteBg\">\n";
            strVar += " <span class=\"triangle_active fleft\"></span>\n";
            strVar += " </div>\n";
            strVar += " <span class=\"verticle_dotted_line-deactivate\"></span>\n";
        }
        else {
            strVar += " <span class=\"verticle_dotted_line-deactivate verticle_dotted_line-long\"></span>\n";
        }
        strVar += " <div class=\"r_conainer fleft expressionViewSelector\" elementId =\"" + childrenArray[i].elementId + "\">\n";
        strVar += renderTextOfDv(childrenArray[i], true);
        strVar += " </div>\n";
        strVar += " </div>";
        if (childrenArray[i][ATTR.children]) {
            strVar += renderChildrenForIndividualExpression(childrenArray[i][ATTR.children], idOfParentDiv);
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

function renderDirectoryViewForExpressionViewForChildren(childrenArray, idOfParentDiv, view, viewName, isBiview) {
    function renderChild() {
        strVar += " <li class=\"element_li\" id=\"" + idOfParentDiv + "_" + childrenArray[i].uniqueId + "\" uniqueId = \"" + childrenArray[i].uniqueId + "\">\n";
        strVar += " <div class=\"directoryListItemContainer clearfix\">\n";
        if (childrenArray[i][ATTR.children] && childrenArray[i][ATTR.children].length > 0) {
            strVar += " <div class=\"whiteBgTriangle whiteBg\">\n";
            strVar += " <span class=\"triangle_active fleft\"></span>\n";
            strVar += " </div>\n";
            strVar += " <span class=\"verticle_dotted_line-deactivate\"></span>\n";
        }
        else {
            strVar += " <span class=\"verticle_dotted_line-deactivate verticle_dotted_line-long\"></span>\n";
        }
        strVar += " <div class=\"r_conainer fleft\">\n";
        strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview);
        strVar += renderTextOfExpressionDv(childrenArray[i]);

        strVar += renderHotlinkInventoryDv(childrenArray[i], idOfParentDiv, view, viewName);
        strVar += " </div>\n";
        strVar += " </div>";
        if (childrenArray[i][ATTR.children]) {
            strVar += renderDirectoryViewForExpressionViewForChildren(childrenArray[i][ATTR.children], idOfParentDiv, view, viewName, isBiview);
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

function renderDirectoryViewForCreateExpressionForChildren(childrenArray, idOfParentDiv, view, viewName, isBiview, selectedId) {
    function renderChild() {
        strVar += " <li class=\"element_li\" id=\"" + idOfParentDiv + "_" + childrenArray[i].uniqueId + "\" uniqueId = \"" + childrenArray[i].uniqueId + "\">\n";
        strVar += " <div class=\"directoryListItemContainer clearfix\">\n";
        if (childrenArray[i][ATTR.children] && childrenArray[i][ATTR.children].length > 0) {
            strVar += " <div class=\"whiteBgTriangle whiteBg\">\n";
            strVar += " <span class=\"triangle_active fleft\"></span>\n";
            strVar += " </div>\n";
            strVar += " <span class=\"verticle_dotted_line-deactivate\"></span>\n";
        }
        else {
            strVar += " <span class=\"verticle_dotted_line-deactivate verticle_dotted_line-long\"></span>\n";
        }
        strVar += " <div class=\"r_conainer fleft\">\n";
        strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview);
        strVar += renderTextOfDv(childrenArray[i], true, selectedId);

        strVar += renderHotlinkInventoryDv(childrenArray[i], idOfParentDiv, view, viewName);
        strVar += " </div>\n";
        strVar += " </div>";
        if (childrenArray[i][ATTR.children]) {
            strVar += renderDirectoryViewForCreateExpressionForChildren(childrenArray[i][ATTR.children], idOfParentDiv, view, viewName, isBiview, selectedId);
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
