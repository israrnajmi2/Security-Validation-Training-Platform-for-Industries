$(document).ready(function () {
    $(document).on("click", ".sortShieldAssociation", function (e) {
        sortAssociationForTwoTypesMap($(this), "selectExpShieldAssociationMap", renderDirectoryViewForExpShieldAssociationView);
        e.stopPropagation();
    });

    $(document).on("click", ".singleview-expShield-association-view", function (e) {
        renderExpShieldAssociationViewData($(this), false);
        e.stopPropagation();
    });

    $(document).on("click", ".biview-expShield-association-view", function (e) {
        renderExpShieldAssociationViewData($(this), true);
        e.stopPropagation();
    });

    $(document).on("click", ".selectExpShieldAssociationMap", function (e) {
        let element = backing.dictionary_of_unique_id_to_attr_object[$(this).attr("uniqueId")];
        getSelectionIconOfMap(element, $(this));
        e.stopPropagation();
    });

    $(document).on("mouseleave", ".selectExpShieldAssociationMap", function (e) {
        let desktop = $(this).closest(".innerDesktop").attr("id");
        $("#" + desktop).find(".checkbox-map .tooltip").addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".expShieldMap", function (e) {
        $("#saveData").show();
        let data = {};
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let viewId = desktop.attr("id");
        if (view === "singleview") {
            activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
            activeDesktopKeyname = backing.singleview.active_desktop.keyname;
            activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
            data.shieldId = $("#" + viewId + "_shieldSelectorAssociationSelected").attr("elementId");

        }
        else if (view === "biview") {
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
            data.shieldId = $("#" + viewId + "_shieldSelectorAssociationSelected").attr("elementId");

        }
        let currentOpenedView = getCurrentOpenedView(activeDesktop, viewId);
        let uniqueId = currentOpenedView.uniqueId;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];

        let associatedElements = [];
        $("#" + viewId + " .selectExpShieldAssociationMap").each(function () {
            if ($(this).hasClass("flaticon-arrow")) {
                associatedElements.push($(this).attr("id"));
            }
        });
        data.associatedElements = associatedElements;
        data.expressionId = element[ATTR.elementId];
        service.saveShieldStdAssociationsForExpression(data, function (res, err) {
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

    $(document).on("click", ".shieldExpAssociationSearchObjectItem", function (e) {
        let searchDropDownSelected, dropDownClass;
        let desktop = $(this).closest(".innerDesktop");
        let selectedElement = $(this);

        if (desktop.attr("view") === "singleview") {
            searchDropDownSelected = "singleSearchElementTypeShieldExpAssociationSelected";
            dropDownClass = "singleSearchElementTypeShieldExpAssociationDropDown";
        }
        else if (desktop.attr("view") === "biview") {
            searchDropDownSelected = "biSearchElementTypeShieldExpAssociationSelected";
            dropDownClass = "biSearchElementTypeShieldExpAssociationDropDown";
        }
        let $selectedId = desktop.find("." + searchDropDownSelected);
        let $dropDown = desktop.find("." + dropDownClass);
        searchObjectElementClickShieldExp(selectedElement, $selectedId, $dropDown, desktop, "shieldExpAssociationCustomSearchObjectItem");
        e.stopPropagation();
    });

    $(document).on("click", ".shieldExpAssociationCustomSearchObjectItem", function (e) {
        let searchDropDownSelected, dropDownClass;
        let desktop = $(this).closest(".innerDesktop");
        let selectedElement = $(this);
        if (desktop.attr("view") === "singleview") {
            searchDropDownSelected = "singleCustomSearchElementTypeShieldExpAssociationSelected";
            dropDownClass = "singleCustomSearchElementTypeShieldExpAssociationDropDown";
        }
        else if (desktop.attr("view") === "biview") {
            searchDropDownSelected = "biCustomSearchElementTypeShieldExpAssociationSelected";
            dropDownClass = "biCustomSearchElementTypeShieldExpAssociationDropDown";
        }
        let $selectedId = desktop.find("." + searchDropDownSelected);
        let $dropDown = desktop.find("." + dropDownClass);
        customSearchObjectElementClickShieldExp(selectedElement, $selectedId, $dropDown);
        e.stopPropagation();
    });

    $(document).on("click", ".biShieldAssociationSearchObjectItem", function (e) {
        let selectedElement = $(this);
        let viewId = selectedElement.closest(".innerDesktop").attr("id");
        let selector = viewId + "searchElementTypeShieldAssociationSelected";
        let selectorId = $("#" + selector);
        selectorId.html(selectedElement.html());

        selectorId.removeAttr("elementTypeId");
        selectorId.removeAttr("objectType");

        selectorId.attr("elementTypeId", selectedElement.attr("elementTypeId"));
        selectorId.attr("objectType", selectedElement.attr("objectType"));

        selectorId.closest(".desktop-selector-container").find(".search-keyword").keyup();
        $("#" + viewId + "shieldAssociation_search_dropdown_content").addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".singleviewShieldSelectorAssociationView", function (e) {
        renderShieldSelectorAssociationView($(this), false, "singleSearchElementTypeShieldExpAssociationDropDown");
        e.stopPropagation();
    });

    $(document).on("click", ".biviewShieldSelectorAssociationView", function (e) {
        renderShieldSelectorAssociationView($(this), true, "biSearchElementTypeShieldExpAssociationDropDown");
        e.stopPropagation();
    });

});

function renderShieldSelectorAssociationView(selector, isBiview, searchClass) {
    $("#saveData").show();
    let data = {};
    let selectedElement = selector, viewClass;
    let desktop = selectedElement.closest(".innerDesktop");
    let uniqueId = desktop.attr("uniqueId");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let associationViewDivId = desktop.attr("id");
    let activeDesktop = getActiveDesktop(isBiview);
    data.shieldId = selectedElement.attr("elementId");
    data.expressionId = element.elementId;
    if (isBiview)
        viewClass = "biview";
    else
        viewClass = "singleview";
    service.getShieldStdAssociationsForExpression(data, function (orgRes, err) {
        if (orgRes) {
            let res = appendingAsChildobject(element, orgRes);
            generateUniqueIdAndParentLink(res, "expShieldAssociationView", null);
            activeDesktop.shieldAssociationRes = res;
            let index = getIndexOfOpenedViewFromPassedOpenedViews(associationViewDivId, activeDesktop.opened_views);
            activeDesktop.opened_views[index].associationRes = res;
            desktop.find(".sortShieldAssociation").trigger("click");
            renderDirectoryViewForExpShieldAssociationView(res, associationViewDivId, viewClass);
            let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
            if (objectTypesAndElementTypes) {
                renderObjectTypesAndElementTypesDropDownShieldExp(objectTypesAndElementTypes, associationViewDivId, searchClass, "shieldExpAssociationSearchObjectItem");
            }
            $("#saveData").hide();
        }
        else if (err) {
            $("#saveData").hide();
        }
    });
    let selectedId = $("#" + associationViewDivId + "_shieldSelectorAssociationSelected");
    selectedId.html(selectedElement.find("span").html());
    selectedId.attr("elementId", selectedElement.attr("elementId"));
    $("#" + associationViewDivId + "_shieldSelectorAssociationSelected_dropDown_content").addClass("dis-none");
}

function renderExpShieldAssociationViewData(selector, isBiview) {
    $("#saveData").show();
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, viewClass;
    let src_hotlinkId = selector.attr("id");
    let src_id = selector.closest(".innerDesktop").attr("id");
    let protectedSelectedId = $("#" + src_id).find(".protectionTypeSelector").attr("shieldId");
    let associationViewDivId = backing.view_type.exp_shield_association_view.name + "_" + src_hotlinkId;
    let uniqueId = selector.attr("uniqueid");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let data = {};
    data.expressionId = element.elementId;
    //check for space in screen
    let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.exp_shield_association_view.key);
    if (!haveSpaceToOpenView) {
        $("#saveData").hide();
        return;
    }
    //check view is opened before
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
        searchClass = "biSearchElementTypeShieldExpAssociationDropDown";
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "singleview";
        searchClass = "singleSearchElementTypeShieldExpAssociationDropDown";
    }
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
    service.getShieldOfShieldType(data, function (shieldRes, err) {
        if (shieldRes) {
            let selectedShield = checkInsideArray(shieldRes.children, parseInt(protectedSelectedId));
            data.shieldId = parseInt(protectedSelectedId);
            service.getShieldStdAssociationsForExpression(data, function (orgRes, err) {
                if (orgRes) {
                    if (orgRes.children !== undefined) {
                        let res = appendingAsChildobject(element, orgRes);
                        generateUniqueIdAndParentLink(res, "expShieldAssociationView", null);
                        sortChildrenAlphbetically(res);
                        if (active_desktop_directory_view_id === src_id)
                            createScenarioViewOpenedFromAnchorSingleCase(associationViewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.exp_shield_association_view.key, "Create Links: " + element[ATTR.name], uniqueId, isBiview, res);
                        else
                            createScenarioViewOpenedFromView(associationViewDivId, src_id, src_hotlinkId, backing.view_type.exp_shield_association_view.key, "Create Links: " + element[ATTR.name], uniqueId, isBiview, res);
                        renderExpShieldAssociationView(res, associationViewDivId, data, element, isBiview);
                        renderShieldDropDownForAssociationView(shieldRes.children, viewClass, associationViewDivId, selectedShield);
                        renderDirectoryViewForExpShieldAssociationView(res, associationViewDivId, viewClass);
                        let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                        if (objectTypesAndElementTypes) {
                            renderObjectTypesAndElementTypesDropDownShieldExp(objectTypesAndElementTypes, associationViewDivId, searchClass, "shieldExpAssociationSearchObjectItem");
                        }
                        highlightSourceAndView(associationViewDivId, isBiview);
                        repositionViews(isBiview);
                        $("#saveData").hide();

                    }
                    else {
                        alert("No controls to Create links");
                    }
                    $("#saveData").hide();
                }
                else if (err) {

                    errorHandler(err);
                }
            });
        }
        else if (err) {
            $("#saveData").hide();
            errorHandler(err);
        }
    });
}

function renderExpShieldAssociationView(res, viewName, data, element, isBiview) {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, viewClass, closeBtnClass, searchDropDownSelected,
        searchDropDown, customSearchDropDownSelected, customSearchDropDown;
    if (isBiview) {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "biview";
        closeBtnClass = "biviewCloseBtn";
        searchDropDownSelected = "biSearchElementTypeShieldExpAssociationSelected";
        searchDropDown = "biSearchElementTypeShieldExpAssociationDropDown";
        customSearchDropDownSelected = "biCustomSearchElementTypeShieldExpAssociationSelected";
        customSearchDropDown = "biCustomSearchElementTypeShieldExpAssociationDropDown";

    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "singleview";
        closeBtnClass = "singleviewCloseBtn";
        searchDropDownSelected = "singleSearchElementTypeShieldExpAssociationSelected";
        searchDropDown = "singleSearchElementTypeShieldExpAssociationDropDown";
        customSearchDropDownSelected = "singleCustomSearchElementTypeShieldExpAssociationSelected";
        customSearchDropDown = "singleCustomSearchElementTypeShieldExpAssociationDropDown";
    }
    let elementName = combineChainElements(element);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    let str = "";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop associationViewDesktop\" view=\"" + viewClass + "\" uniqueid=\"" + element.uniqueId + "\" expressionId = \"" + data.expressionId + "\">" +
        "<div class=\"headerWrapper\"><div class=\"panel-header-container " + viewClass + "\">" +
        "<span class=\"flaticon-arrow findSourceHotlink\" title=\"Show Source Hotlink\"><span class=\"flaticon-shield-element subscriptIcon\"></span></span>" +
        "<span class=\"panel-header\">CREATE LINKS</span>" +
        "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + closeBtnClass + "\" id=\"closeAssociationView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>";
    str += "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>";
    str += "<span class=\"fright sortIcon sortShieldAssociation flaticon-sort\" title=\"Sort\"></span>";
    str += "</div><div class=\"desktop-selector-container " + viewClass + "\" style=\"color:#000;\">" +
        "<div class=\"desktop-selector-dropdown equalBy2 fleft\">" +
        "<label class=\"labelText\">Between</label>" +
        "</div>" +
        "<span class=\"typeIcon\" title=\"" + elementName.str + "\">" + objectTypeIcon + "" + elementName.str +
        "</span></div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\" style=\"color:#000;\">" +
        "<span class=\"flaticon-turn-right newLine\"></span>" +
        "<div class=\"desktop-selector-dropdown equalBy2 fleft\">" +
        "<label class=\"labelText\">and</label>" +
        "</div>" +
        "<span class=\"linkingIcon flaticon-shield-element fleft\">Controls of</span>" +
        "<div class=\"desktop-selector-dropdown  fleft\">" +
        "<span id=\"" + viewName + "_shieldSelectorAssociationSelected\" class=\"selector shieldSelector shieldSelectorAssociationSelected\">SELECT</span>" +
        "</div>" +
        "<span class=\"flaticon-search openSearch fright hideAndShowSearch\" title=\"Show Search Bar\"></span>" +
        "<span class=\"headerActionButton expShieldMap\">SAVE</span>" +
        "</div>" +
        "<div class=\"searchWrapper\"><div class=\"desktop-selector-container desktop-searchSelector-container\">" +
        "<span class=\"flaticon-search search\"></span><input class=\"search-keyword fleft\" placeholder=\"Search\">" +
        "<div class=\"desktop-selector-dropdown equalBy3 fleft\">" +
        `<span class="flaticon-search-dropdown searchIcon iconClick opacityDull" title="Select Object Type To Search"></span>` +
        "<span id=\"" + viewName + "searchElementTypeShieldAssociationSelected\" class=\"selector searchObject_elementType " + searchDropDownSelected + "\"></span>" +
        "<div id=\"" + viewName + "shieldAssociation_search_dropdown_content\" class=\"desktop-selector-dropdown-content dis-none " + searchDropDown + "\">" +
        "</div>" +
        "</div>" +
        "<span class=\"flaticon-up-arrow fright hideSearch hideAndShowSearch\" title=\"Hide Search Bar\"></span>" +
        "<span title=\"Clear Search\" class=\"tooltip clearSearch flaticon-remove tooltipstered\"></span>" +
        "<div class=\"desktop-search-wrapper selectorLabel fright\">" +
        "<span class=\"restrictedSearch searchSelector flaticon-filter-search\" title=\"Show Search Results Only\" title=\"Show Search Results Only\"></span>" +
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
        str += "<div class=\"treeContainerExpAssociationView treeContainer\">" +
            "<div class=\"tree_structure_parent\">" +
            "<ul class=\"directoryView_ringList clearfix directoryViewList directoryViewList_DV directoryViewUl\" id=\"" + viewName + "_association_tree_container\"></ul>" +
            "</div>" +
            "</div>";
    }
    str += "</div>";
    $("#" + desktopId).append(str);
}

function renderDirectoryViewForExpShieldAssociationView(data, viewId, view) {
    let isBiview = isBiViewOrNot(view);
    let associationViewId = viewId + "_association_tree_container";
    renderDirectoryView(data, associationViewId, view, "expShieldAssociationView", isBiview);
}

function renderShieldDropDownForAssociationView(res, view, viewId, selectedShield) {
    generateUniqueIdAndParentLinkDropDown(res, viewId, null);
    let isBiview = isBiViewOrNot(view);
    let str = "";
    let selectorId, defaultShield;
    if (selectedShield) {
        defaultShield = selectedShield;
    }
    else {
        defaultShield = res[0];
    }
    let name;
    // if (defaultShield.acronym && defaultShield.acronym.length > 0) {
    //     name = defaultShield.acronym;
    // }
    // else {
        name = defaultShield.name;
    // }

    let defaultShieldName = renderCircleOrSquareInventoryDv(defaultShield, isBiview, "", true, false) + name.toUpperCase();
    str += "<ul>";
    for (let i = 0; i < res.length; i++) {
        str += "<li class = \"" + view + "ShieldSelectorAssociationView grpSelector\" elementId=\"" + res[i][ATTR.elementId] + "\"><span>";
        str += renderCircleOrSquareInventoryDv(res[i], isBiview, "", true, false);
        str += res[i][ATTR.name].toUpperCase() + "</span><span class=\"hotLinkWrapper\">";
        str += renderHotlinkInventoryDv(res[0], viewId, view, "groupView", false);
        str += "</span></li>";
    }
    str += "</ul>";
    selectorId = viewId + "_shieldSelectorAssociationSelected_dropDown_content";
    $("#" + selectorId).html(str);
    if (defaultShield) {
        let selectedId = $("#" + viewId + "_shieldSelectorAssociationSelected");
        let title = "";
        // if (defaultShield.acronym) {
        //     title = `[${defaultShield.acronym}] ${defaultShield.name}`
        // }
        // else {
            title = defaultShield.name;
        // }
        if (view === "singleview") {
            selectedId.html(defaultShieldName);
            selectedId.attr("elementId", defaultShield.elementId);
            selectedId.attr("title", title);
        }
        else if (view === "biview") {
            selectedId.html(defaultShieldName);
            selectedId.attr("elementId", defaultShield.elementId);
            selectedId.attr("title", title);
        }
    }
}

function renderObjectTypesAndElementTypesDropDownShieldExp(objects, src_id, selectorDropDownClass, liElementClass) {
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
        searchDropDownSelected = "singleSearchElementTypeShieldExpAssociationSelected";
        dropDownClass = "singleSearchElementTypeShieldExpAssociationDropDown";
    }
    else if (desktop.attr("view") === "biview") {
        searchDropDownSelected = "biSearchElementTypeShieldExpAssociationSelected";
        dropDownClass = "biSearchElementTypeShieldExpAssociationDropDown";
    }
    let $selectedId = desktop.find("." + searchDropDownSelected);
    let $dropDown = desktop.find("." + dropDownClass);
    let selectedElement = desktop.find("." + dropDownClass).find("ul:first li:first");
    searchObjectElementClickShieldExp(selectedElement, $selectedId, $dropDown, desktop, "shieldExpAssociationCustomSearchObjectItem");

}

function renderCustomSearchDropDownShieldExp(randomId, desktop, liElementClass) {
    let $selectorDropDownId, $selectorId;
    let str = "";
    let isHaveNoSelected = false;
    if (desktop.attr("view") === "singleview") {
        $selectorDropDownId = desktop.find(".singleCustomSearchElementTypeShieldExpAssociationDropDown");
        $selectorId = desktop.find(".singleCustomSearchElementTypeShieldExpAssociationSelected");
    }
    else if (desktop.attr("view") === "biview") {
        $selectorDropDownId = desktop.find(".biCustomSearchElementTypeShieldExpAssociationDropDown");
        $selectorId = desktop.find(".biCustomSearchElementTypeShieldExpAssociationSelected");
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
            customSearchObjectElementClickShieldExp($selectorDropDownId.find("ul:first li:first"), $selectorId, $selectorDropDownId);
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

function customSearchObjectElementClickShieldExp(selectedElement, selectedId, dropDownId) {
    selectedId.html(selectedElement.html());
    selectedId.removeAttr("randomId");
    selectedId.attr("randomId", selectedElement.attr("randomId"));
    selectedId.closest(".innerDesktop").find(".search-keyword").keyup();
    dropDownId.addClass("dis-none");
}

function searchObjectElementClickShieldExp(selectedElement, selectedId, dropDownClass, desktop, liElementClass) {
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
    renderCustomSearchDropDownShieldExp(selectedElement.attr("randomId"), desktop, liElementClass);
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