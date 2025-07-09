$(document).ready(function () {
    $(document).on("click", ".sortAssociation", function (e) {
        let expand;
        let desktop = $(this).closest(".innerDesktop");
        expand = !desktop.find(".assocShort").hasClass("active");
        sortAssociationForTwoTypesMap($(this), "selectToMap", renderDirectoryViewForAssociationView, expand);
        e.stopPropagation();
    });

    $(document).on("click", ".singleview-association-view", function (e) {
        renderAssociationViewData($(this), false);
        e.stopPropagation();
    });

    $(document).on("click", ".biview-association-view", function (e) {
        renderAssociationViewData($(this), true);
        e.stopPropagation();
    });

    $(document).on("click", ".selectToMap", function (e) {
        let element = backing.dictionary_of_unique_id_to_attr_object[$(this).attr("uniqueId")];
        getSelectionIconOfMap(element, $(this));
        e.stopPropagation();
    });

    $(document).on("mouseleave", ".selectToMap", function (e) {
        let desktop = $(this).closest(".innerDesktop").attr("id");
        $("#" + desktop).find(".checkbox-map .tooltip").addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("mouseover", ".checkbox-map .tooltip", function (e) {
        $(this).addClass("dis-none");
        let desktop = $(this).closest(".innerDesktop").attr("id");
        $("#" + desktop).find(".checkbox-map .tooltip").addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".map", function (e) {
        $("#saveData").show();
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        if (view === "singleview") {
            activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
            activeDesktopKeyname = backing.singleview.active_desktop.keyname;
            activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);

        }
        else if (view === "biview") {
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        }
        let viewId = desktop.attr("id");
        let currentOpenedView = getCurrentOpenedView(activeDesktop, viewId);
        let uniqueId = currentOpenedView.uniqueId;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];

        let checkElementArray = [];
        let data = {};
        $("#" + viewId + " .selectToMap").each(function () {
            if ($(this).hasClass("flaticon-arrow")) {
                checkElementArray.push($(this).attr("id"));
            }
        });
        data.associatedExpressions = checkElementArray;
        data.elementId = element[ATTR.elementId];
        service.saveAssociation(data, function (res, err) {
            if (res) {
                alert("Links saved successfully");
                let event = {"key": backing.event_type.modified_shield_element_association.key};
                propagateEvent(event);
                $("#saveData").hide();
            }
            else if (err) {
                errorHandler(err);
                $("#saveData").hide();
            }
        });
        e.stopPropagation();
    });

    $(document).on("click", ".associationSearchObject_ElementTypeItem", function (e) {
        let searchDropDownSelected, dropDownClass;
        let desktop = $(this).closest(".innerDesktop");
        let selectedElement = $(this);
        if (desktop.attr("view") === "singleview") {
            searchDropDownSelected = "singleSearchElementTypeAssociationSelected";
            dropDownClass = "singleSearchElementTypeAssociationDropDown";
        }
        else if (desktop.attr("view") === "biview") {
            searchDropDownSelected = "biSearchElementTypeAssociationSelected";
            dropDownClass = "biSearchElementTypeAssociationDropDown";
        }
        let $selectedId = desktop.find("." + searchDropDownSelected);
        let $dropDown = desktop.find("." + dropDownClass);
        searchObjectElementClickAssociation(selectedElement, $selectedId, $dropDown, desktop, "associationCustomSearchObject_ElementTypeItem");
        e.stopPropagation();
    });

    $(document).on("click", ".associationCustomSearchObject_ElementTypeItem", function (e) {
        let searchDropDownSelected, dropDownClass;
        let desktop = $(this).closest(".innerDesktop");
        let selectedElement = $(this);
        if (desktop.attr("view") === "singleview") {
            searchDropDownSelected = "singleCustomSearchElementTypeAssociationSelected";
            dropDownClass = "singleCustomSearchElementTypeAssociationDropDown";
        }
        else if (desktop.attr("view") === "biview") {
            searchDropDownSelected = "biCustomSearchElementTypeAssociationSelected";
            dropDownClass = "biCustomSearchElementTypeAssociationDropDown";
        }
        let $selectedId = desktop.find("." + searchDropDownSelected);
        let $dropDown = desktop.find("." + dropDownClass);
        customSearchObjectElementClickAssociation(selectedElement, $selectedId, $dropDown);
        e.stopPropagation();
    });

    $(document).on("click", ".assocExpand", function (e) {
        $("#saveData").show();
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let checkElementArray = {};
        desktop.find(".assoc-exp-mode").removeClass("active");
        $(this).addClass("active");
        if (view === "singleview") {
            activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
            activeDesktopKeyname = backing.singleview.active_desktop.keyname;
            activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        }
        else if (view === "biview") {
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        }
        let index = getIndexOfOpenedViewFromPassedOpenedViews(desktop.attr("id"), activeDesktop.opened_views);
        let associationViewDivId = desktop.find(".tree_structure_parent ul:first").attr("id");
        let viewId = associationViewDivId.replace(/_association_tree_container$/, '');
        $("#" + viewId + " .selectToMap").each(function () {
            if ($(this).hasClass("flaticon-gps-check")) {
                checkElementArray[$(this).attr("id")] = "flaticon-gps-check";
            }
            else if ($(this).hasClass("flaticon-unchecked"))
                checkElementArray[$(this).attr("id")] = "flaticon-unchecked";
        });
        let associationRes = activeDesktop.opened_views[index].associationRes;
        if (associationRes && associationRes[ATTR.children]) {
            renderDirectoryViewForAssociationView(associationRes, viewId, view, true);
            let checkKeys = Object.keys(checkElementArray);
            for (let i = 0; i <= checkKeys.length; i++) {
                let selectedId = $("#" + viewId);
                if (selectedId.find("#" + checkKeys[i]).hasClass(checkElementArray[checkKeys[i]]))
                    selectedId.find("#" + checkKeys[i]).attr("class", "checkbox-map selectToMap " + checkElementArray[checkKeys[i]]);
                else
                    selectedId.find("#" + checkKeys[i]).attr("class", "checkbox-map selectToMap iconShadow " + checkElementArray[checkKeys[i]]);
            }
        }
        e.stopPropagation();
    });

    $(document).on("click", ".assocShort", function (e) {
        $("#saveData").show();
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let checkElementArray = {};
        desktop.find(".assoc-exp-mode").removeClass("active");
        $(this).addClass("active");
        if (view === "singleview") {
            activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
            activeDesktopKeyname = backing.singleview.active_desktop.keyname;
            activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        }
        else if (view === "biview") {
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        }
        let index = getIndexOfOpenedViewFromPassedOpenedViews(desktop.attr("id"), activeDesktop.opened_views);
        let associationViewDivId = desktop.find(".tree_structure_parent ul:first").attr("id");
        let viewId = associationViewDivId.replace(/_association_tree_container$/, '');
        $("#" + viewId + " .selectToMap").each(function () {
            if ($(this).hasClass("flaticon-gps-check")) {
                checkElementArray[$(this).attr("id")] = "flaticon-gps-check";
            }
            else if ($(this).hasClass("flaticon-unchecked"))
                checkElementArray[$(this).attr("id")] = "flaticon-unchecked";
        });
        let associationRes = activeDesktop.opened_views[index].associationRes;
        if (associationRes && associationRes[ATTR.children]) {
            renderDirectoryViewForAssociationView(associationRes, viewId, view, false);
            let checkKeys = Object.keys(checkElementArray);
            for (let i = 0; i <= checkKeys.length; i++) {
                let selectedId = $("#" + viewId);
                if (selectedId.find("#" + checkKeys[i]).hasClass(checkElementArray[checkKeys[i]]))
                    selectedId.find("#" + checkKeys[i]).attr("class", "checkbox-map selectToMap " + checkElementArray[checkKeys[i]]);
                else
                    selectedId.find("#" + checkKeys[i]).attr("class", "checkbox-map selectToMap iconShadow " + checkElementArray[checkKeys[i]]);
            }
        }
        e.stopPropagation();
    });
});

function renderAssociationViewData(selector, isBiview) {
    $("#saveData").show();
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, viewClass;
    let src_hotlinkId = selector.attr("id");
    let src_id = selector.closest(".innerDesktop").attr("id");
    let associationViewDivId = backing.view_type.association_view.name + "_" + src_hotlinkId;
    let uniqueId = selector.attr("uniqueid");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let data = {};
    data.elementId = element[ATTR.elementId];
    let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.association_view.key);
    if (!haveSpaceToOpenView) {
        $("#saveData").hide();
        return;
    }
    let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(associationViewDivId, isBiview);
    if (isViewOpenedBefore) {
        $("#saveData").hide();
        return;
    }
    let searchClass;
    if (isBiview) {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "biview";
        searchClass = "biSearchElementTypeAssociationDropDown";
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "singleview";
        searchClass = "singleSearchElementTypeAssociationDropDown";
    }
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
    service.getAssociationView(data, function (orgRes, err) {
        if (orgRes) {
            if (orgRes.children !== undefined) {
                let res = appendingAsChildobject(element, orgRes);
                generateUniqueIdAndParentLink(res, "associationView", null);
                sortChildrenAlphbetically(res);
                renderSingleAssociationView(res, associationViewDivId, element, isBiview);
                if (res[ATTR.children])
                    renderDirectoryViewForAssociationView(res, associationViewDivId, viewClass, true);
                if (active_desktop_directory_view_id === src_id)
                    createScenarioViewOpenedFromAnchorSingleCase(associationViewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.association_view.key, "Association View: " + element[ATTR.name], uniqueId, isBiview, res);
                else
                    createScenarioViewOpenedFromView(associationViewDivId, src_id, src_hotlinkId, backing.view_type.association_view.key, "Association View: " + element[ATTR.name], uniqueId, isBiview, res);
                let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                if (objectTypesAndElementTypes) {
                    renderObjectTypesAndElementTypesDropDownAssociation(objectTypesAndElementTypes, associationViewDivId, searchClass, "associationSearchObject_ElementTypeItem");
                }
                $("#saveData").hide();
                repositionViews(isBiview);
                highlightSourceAndView(associationViewDivId, isBiview);
            }
            else {
                alert("No Expression to Create links");
            }
            $("#saveData").hide();
        }
        else if (err) {

            errorHandler(err);
        }
    });
}

function renderSingleAssociationView(res, viewName, element, isBiview) {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, viewClass, closeBtnClass,
        searchDropDownSelected, searchDropDown, customSearchDropDownSelected, customSearchDropDown, objectTypeIcon;

    if (isBiview) {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "biview";
        closeBtnClass = "biviewCloseBtn";
        searchDropDownSelected = "biSearchElementTypeAssociationSelected";
        searchDropDown = "biSearchElementTypeAssociationDropDown";
        customSearchDropDownSelected = "biCustomSearchElementTypeAssociationSelected";
        customSearchDropDown = "biCustomSearchElementTypeAssociationDropDown";
        objectTypeIcon = renderCircleOrSquareInventoryDv(element, true, "", true);
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "singleview";
        closeBtnClass = "singleviewCloseBtn";
        objectTypeIcon = renderCircleOrSquareInventoryDv(element, false, "", true);
        searchDropDownSelected = "singleSearchElementTypeAssociationSelected";
        searchDropDown = "singleSearchElementTypeAssociationDropDown";
        customSearchDropDownSelected = "singleCustomSearchElementTypeAssociationSelected";
        customSearchDropDown = "singleCustomSearchElementTypeAssociationDropDown";

    }
    let desktopId = activeDesktop.div_id;
    let str = "";
    let headerName = getViewHeaderName(element);
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop associationViewDesktop\" view=\"" + viewClass + "\" uniqueid=\"" + element.uniqueId + "\">" +
        "<div class=\"headerWrapper\"><div class=\"panel-header-container " + viewClass + "\">" +
        "<span class=\"flaticon-arrow findSourceHotlink\" title=\"Show Source Hotlink\"><span class=\"flaticon-expression-element subscriptIcon\"></span></span>" +
        "<span class=\"panel-header\">CREATE LINKS" +
        "</span><span class=\"rgtnavdfstage_build_workbench_close  close-btn " + closeBtnClass + "\" id=\"closeAssociationView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>";
    str += "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>";
    str += "<span class=\"fright sortIcon sortAssociation flaticon-sort\" title=\"Sort\"></span>";
    str += "</div><div class=\"desktop-selector-container " + viewClass + "\" style=\"color:#000;\">" +
        "<div class=\"desktop-selector-dropdown equalBy2 fleft\">" +
        "<label class=\"labelText\">Between</label>" +
        "</div>" +
        "<span class=\"iconWrapper\">" + objectTypeIcon + "</span>" +
        "<span class=\"typeIcon\" title=\"" + headerName.toUpperCase() + "\">" + headerName.toUpperCase() +
        "</span></div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\" style=\"color:#000;\">" +
        "<span class=\"flaticon-turn-right newLine\"></span>" +
        "<div class=\"desktop-selector-dropdown equalBy2 fleft\">" +
        "<label class=\"labelText\">and</label>" +
        "</div>" +
        "<span class=\"linkingIcon flaticon-expression-element\">EXPRESSION</span></div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\" style=\"border-left: 1px solid white;\">" +
        "<div class=\"selectorLabel fleft\">" +
        "<span class=\"assocShort assoc-exp-mode\">SHORT</span>" +
        "<span>|</span>" +
        "<span class=\"assocExpand assoc-exp-mode active\">EXPANDED</span>\<" +
        "/div>" +
        "<span class=\"flaticon-search openSearch fright hideAndShowSearch\" title=\"Show Search Bar\"></span>" +
        "<span class=\"headerActionButton map\">SAVE</span>" +
        "</div>" +
        "<div class=\"searchWrapper\"><div class=\"desktop-selector-container desktop-searchSelector-container\">" +
        "<span class=\"flaticon-search search\"></span><input class=\"search-keyword fleft\" placeholder=\"Search\">" +
        "<div class=\"desktop-selector-dropdown equalBy2 fleft\">" +
        `<span class="flaticon-search-dropdown searchIcon iconClick opacityDull" title="Select Object Type To Search"></span>` +
        "<span class=\"selector searchObject_elementType " + searchDropDownSelected + "\"></span>" +
        "<div class=\"desktop-selector-dropdown-content dis-none " + searchDropDown + "\">" +
        "</div>" +
        "</div>" +
        "<span class=\"flaticon-up-arrow fright hideSearch hideAndShowSearch\" title=\"Hide Search Bar\"></span>" +
        "<span title=\"Clear Search\" class=\"tooltip clearSearch flaticon-remove tooltipstered\"></span>" +
        "<div class=\"desktop-search-wrapper selectorLabel fright\">" +
        "<span class=\"restrictedSearch searchSelector flaticon-filter-search\" title=\"Show Search Results Only\"></span>" +
        "</div>" +
        "</div>" +
        "<div class=\"desktop-selector-container dis-none\">" +
        "<div class=\"desktop-search-wrapper selectorLabel fleft\">" +
        "<span class=\"allSearch customSearchSelector active\">ALL</span>" +
        "<span>&nbsp;|&nbsp;</span>" +
        "<span class=\"haveSearch customSearchSelector\">HAVE</span>" +
        "<span>&nbsp;|&nbsp;</span>" +
        "<span class=\"noSearch customSearchSelector\">NO</span>" +
        "</div>" +
        "<div class=\"desktop-selector-dropdown equalBy3 fleft\" style=\"margin-left: 20%\">" +
        "<span class=\"selector custom_searchObject_elementType " + customSearchDropDownSelected + "\"></span>" +
        "<span class=\"flaticon-size-arrow dropdownArrow  searchDrop dis-none\"></span>" +
        "<div class=\"desktop-selector-dropdown-content dis-none " + customSearchDropDown + "\">" +
        "</div>" +
        "</div>" +
        "</div></div></div>";
    if (res.children) {
        str += "<div class=\" treeContainer treeContainerAssociationView\">" +
            "<div class=\"tree_structure_parent\">" +
            "<ul class=\"directoryView_ringList clearfix directoryViewList directoryViewList_DV directoryViewUl\" id=\"" + viewName + "_association_tree_container\"></ul>" +
            "</div>" +
            "</div>";
    }


    str += "</div>";
    $("#" + desktopId).append(str);
}

function renderDirectoryViewForAssociationView(data, viewId, view, isFull) {
    let isBiview = isBiViewOrNot(view);
    let associationViewId = viewId + "_association_tree_container";
    if (isFull) {
        renderDirectoryView(data, associationViewId, view, "associationView_full", isBiview);
    }
    else
        renderDirectoryView(data, associationViewId, view, "associationView", isBiview);
}

function renderObjectTypesAndElementTypesDropDownAssociation(objects, src_id, selectorDropDownClass, liElementClass) {
    let str = "";
    let searchDropDownSelected, dropDownClass;
    let desktop = $("#" + src_id);
    addToDictionary(objects);
    let sortedObjA = getSortElementTypeDropDownObject(objects);
    let customChoices = getCustomTrueChoicesForAssociation();
    let sortedObj = $.merge(customChoices, sortedObjA);
    str += "<ul>";
    str += "<li class=\"" + liElementClass + "\">ALL</li>";
    for (let i = 0; i < sortedObj.length; i++) {
        str += "<li class=\"" + liElementClass + "\"  randomId =\"" + sortedObj[i].randomId + "\">" + sortedObj[i].label.toUpperCase() + "</li>";
    }
    str += "</ul>";
    desktop.find("." + selectorDropDownClass).html(str);
    if (desktop.attr("view") === "singleview") {
        dropDownClass = "singleSearchElementTypeAssociationDropDown";
        searchDropDownSelected = "singleSearchElementTypeAssociationSelected";
    }
    else if (desktop.attr("view") === "biview") {
        dropDownClass = "biSearchElementTypeAssociationDropDown";
        searchDropDownSelected = "biSearchElementTypeAssociationSelected";
    }
    let $selectedId = desktop.find("." + searchDropDownSelected);
    let $dropDown = desktop.find("." + dropDownClass);
    let selectedElement = desktop.find("." + dropDownClass).find("ul:first li:first");
    searchObjectElementClickAssociation(selectedElement, $selectedId, $dropDown, desktop, "associationCustomSearchObject_ElementTypeItem");
}

function renderCustomSearchDropDownAssociation(randomId, desktop, liElementClass) {
    let $selectorDropDownId, $selectorId;
    let str = "";
    let isHaveNoSelected = false;
    if (desktop.attr("view") === "singleview") {
        $selectorDropDownId = desktop.find(".singleCustomSearchElementTypeAssociationDropDown");
        $selectorId = desktop.find(".singleCustomSearchElementTypeAssociationSelected");
    }
    else if (desktop.attr("view") === "biview") {
        $selectorDropDownId = desktop.find(".biCustomSearchElementTypeAssociationDropDown");
        $selectorId = desktop.find(".biCustomSearchElementTypeAssociationSelected");
    }
    if (!desktop.find(".allSearch").hasClass("active")) {
        isHaveNoSelected = true;
    }
    let searchElement = backing.dictionary_of_unique_id_to_attr_object[randomId];
    if (searchElement) {
        let possibleChildrenUnSorted = searchElement.possibleChildren;
        if (possibleChildrenUnSorted.length > 0) {
            let possibleChildren = getSortedArrayPossibleChildren(possibleChildrenUnSorted);
            str += "<ul>";
            for (let i = 0; i < possibleChildren.length; i++) {
                str += "<li class=\"" + liElementClass + "\"  randomId =\"" + possibleChildren[i].randomId + "\">CHILDREN - " + possibleChildren[i].label.toUpperCase() + "</li>";
            }
            str += "</ul>";
            $selectorDropDownId.html(str);
            customSearchObjectElementClickAssociation($selectorDropDownId.find("ul:first li:first"), $selectorId, $selectorDropDownId);
            if (isHaveNoSelected)
                desktop.find(".custom_searchObject_elementType").removeClass("dis-none");
            else
                desktop.find(".custom_searchObject_elementType").addClass("dis-none");
            $selectorDropDownId.closest(".desktop-selector-container").removeClass("dis-none");
            modifyContainerHeight(desktop);

        }
        else {
            desktop.find(".customSearchSelector").removeClass("active");
            desktop.find(".allSearch").addClass("active");
            $selectorId.removeAttr("randomId");
            $selectorDropDownId.empty();
            $selectorDropDownId.closest(".desktop-selector-container").addClass("dis-none");
            desktop.find(".search-keyword").keyup();
            modifyContainerHeight(desktop);

        }
    }
    else {
        desktop.find(".customSearchSelector").removeClass("active");
        desktop.find(".allSearch").addClass("active");
        $selectorId.removeAttr("randomId");
        $selectorDropDownId.empty();
        $selectorDropDownId.closest(".desktop-selector-container").addClass("dis-none");
        desktop.find(".search-keyword").keyup();
        modifyContainerHeight(desktop);

    }
}

function customSearchObjectElementClickAssociation(selectedElement, selectedId, dropDownId) {
    selectedId.html(selectedElement.html());
    selectedId.removeAttr("randomId");
    selectedId.attr("randomId", selectedElement.attr("randomId"));
    selectedId.closest(".innerDesktop").find(".search-keyword").keyup();
    dropDownId.addClass("dis-none");
}

function searchObjectElementClickAssociation(selectedElement, selectedId, dropDownClass, desktop, liElementClass) {
    if (selectedElement.attr("randomId")) {
        selectedId.html(selectedElement.html());
        selectedId.parent().find(".searchIcon").removeClass("opacityDull");
    }
    else {
        selectedId.parent().find(".searchIcon").addClass("opacityDull");
        selectedId.html("");
    }
    selectedId.removeAttr("randomId");
    selectedId.attr("randomId", selectedElement.attr("randomId"));
    selectedId.closest(".desktop-selector-container").find(".search-keyword").keyup();
    dropDownClass.addClass("dis-none");
    renderCustomSearchDropDownAssociation(selectedElement.attr("randomId"), desktop, liElementClass);
}

function getCustomTrueChoicesForAssociation() {
    let array = [];
    let cons = constants.association_css_style;
    addToDictionary(cons);
    let choices = [cons.shield_not_selected, cons.shield_selected, cons.unsaved];
    for (let i = 0; i < choices.length; i++) {
        let obj = {};
        obj.custom = true;
        obj.objectType = choices[i];
        obj.possibleChildren = [];
        obj.label = choices[i].label;
        obj.randomId = choices[i].randomId;
        array.push(obj);
    }
    return array;
}