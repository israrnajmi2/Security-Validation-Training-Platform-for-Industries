$(document).ready(function () {

    $(document).on("click", ".sortStandardAssociation", function (e) {
        sortAssociationForTwoTypesMap($(this), "selectExpStandardAssociationMap", renderDirectoryViewForExpStandardAssociationView);
        e.stopPropagation();
    });

    $(document).on("click", ".singleview-expStandard-association-view", function (e) {
        renderExpStandardAssociationViewData($(this), false);
        e.stopPropagation();
    });

    $(document).on("click", ".biview-expStandard-association-view", function (e) {
        renderExpStandardAssociationViewData($(this), true);
        e.stopPropagation();
    });

    $(document).on("click", ".selectExpStandardAssociationMap", function (e) {
        let element = backing.dictionary_of_unique_id_to_attr_object[$(this).attr("uniqueId")];
        getSelectionIconOfMap(element, $(this));
        e.stopPropagation();
    });

    $(document).on("mouseleave", ".selectExpStandardAssociationMap", function (e) {
        let desktop = $(this).closest(".innerDesktop").attr("id");
        $("#" + desktop).find(".checkbox-map .tooltip").addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".expStandardMap", function () {
        $("#saveData").show();
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let viewId = desktop.attr("id");
        let associatedElements = [];
        let data = {};
        let selectedId = $("#" + viewId + "_standardSelectorAssociationSelected");

        if (view === "singleview") {
            activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
            activeDesktopKeyname = backing.singleview.active_desktop.keyname;
            activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
            data.shieldId = selectedId.attr("elementId");

        }
        else if (view === "biview") {
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
            data.shieldId = selectedId.attr("elementId");

        }
        let currentOpenedView = getCurrentOpenedView(activeDesktop, viewId);
        let uniqueId = currentOpenedView.uniqueId;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];

        $("#" + viewId + " .selectExpStandardAssociationMap").each(function () {
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

    });

    $(document).on("click", ".stdExpAssociationSearchObjectItem", function () {
        let searchDropDownSelected, dropDownClass;
        let desktop = $(this).closest(".innerDesktop");
        let selectedElement = $(this);

        if (desktop.attr("view") === "singleview") {
            searchDropDownSelected = "singleSearchElementTypeStdExpAssociationSelected";
            dropDownClass = "singleSearchElementTypeStdExpAssociationDropDown";
        }
        else if (desktop.attr("view") === "biview") {
            searchDropDownSelected = "biSearchElementTypeStdExpAssociationSelected";
            dropDownClass = "biSearchElementTypeStdExpAssociationDropDown";
        }
        let $selectedId = desktop.find("." + searchDropDownSelected);
        let $dropDown = desktop.find("." + dropDownClass);
        searchObjectElementClickStdExp(selectedElement, $selectedId, $dropDown, desktop, "stdExpAssociationCustomSearchObjectItem");

    });

    $(document).on("click", ".stdExpAssociationCustomSearchObjectItem", function () {
        let searchDropDownSelected, dropDownClass;
        let desktop = $(this).closest(".innerDesktop");
        let selectedElement = $(this);
        if (desktop.attr("view") === "singleview") {
            searchDropDownSelected = "singleCustomSearchElementTypeStdExpAssociationSelected";
            dropDownClass = "singleCustomSearchElementTypeStdExpAssociationDropDown";
        }
        else if (desktop.attr("view") === "biview") {
            searchDropDownSelected = "biCustomSearchElementTypeStdExpAssociationSelected";
            dropDownClass = "biCustomSearchElementTypeStdExpAssociationDropDown";
        }
        let $selectedId = desktop.find("." + searchDropDownSelected);
        let $dropDown = desktop.find("." + dropDownClass);
        customSearchObjectElementClickStdExp(selectedElement, $selectedId, $dropDown);
    });

    $(document).on("click", ".singleviewStandardSelectorAssociationView", function (e) {
        renderStandardSelectorAssociationView($(this), false, "singleSearchElementTypeStdExpAssociationDropDown");
        e.stopPropagation();

    });

    $(document).on("click", ".biviewStandardSelectorAssociationView", function (e) {
        renderStandardSelectorAssociationView($(this), true, "biSearchElementTypeStdExpAssociationDropDown");
        e.stopPropagation();
    });

});

function renderStandardSelectorAssociationView(selector, isBiview, searchClass) {
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
    service.getShieldStdAssociationsForExpression(data, function (res, err) {
        if (res) {
            generateUniqueIdAndParentLink(res, "expShieldAssociationView", null);
            activeDesktop.standardAssociationRes = res;
            renderDirectoryViewForExpStandardAssociationView(res, associationViewDivId, viewClass);
            let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
            if (objectTypesAndElementTypes) {
                renderObjectTypesAndElementTypesDropDownStdExp(objectTypesAndElementTypes, associationViewDivId, searchClass, "stdExpAssociationSearchObjectItem");
            }
            $("#saveData").hide();
        }
        else if (err) {
            $("#saveData").hide();
        }
    });
    let selectedId = $("#" + associationViewDivId + "_standardSelectorAssociationSelected");
    selectedId.html(selectedElement.find("span").html());
    selectedId.attr("elementId", selectedElement.attr("elementId"));
    $("#" + associationViewDivId + "_standardSelectorAssociationSelected_dropDown_content").addClass("dis-none");
}

function renderExpStandardAssociationViewData(selector, isBiview) {
    $("#saveData").show();
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, viewClass, getDropDownService;
    let src_hotlinkId = selector.attr("id");
    let selectedIconType = selector.attr("objectType");
    let desktop = selector.closest(".innerDesktop");
    let src_id = desktop.attr("id");
    let protectedSelectedId = $("#" + src_id).find(".protectionTypeSelector").attr("shieldId");
    let protectedObjectType = $("#" + src_id).find(".protectionTypeSelector").attr("objectType");
    let associationViewDivId = backing.view_type.exp_standard_association_view.name + "_" + src_hotlinkId;
    let uniqueId = selector.attr("uniqueid");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let data = {};
    data.expressionId = element.elementId;
    //check for space in screen
    let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.exp_standard_association_view.key);
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
        searchClass = "biSearchElementTypeStdExpAssociationDropDown";
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "singleview";
        searchClass = "singleSearchElementTypeStdExpAssociationDropDown";
    }
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
    if (protectedObjectType === "standard")
        getDropDownService = service.getShieldOfStandardType;
    else if (protectedObjectType === "b_framework")
        getDropDownService = service.getShieldOfBusinessType;
    else if (protectedObjectType === "threat")
        getDropDownService = service.getShieldOfThreatType;
    getDropDownService(data, function (shieldRes, err) {
        if (shieldRes) {
            let selectedShield = checkInsideArray(shieldRes.children, parseInt(protectedSelectedId));
            data.shieldId = parseInt(protectedSelectedId);
            service.getShieldStdAssociationsForExpression(data, function (orgRes, err) {
                if (orgRes) {
                    if (orgRes.children !== undefined) {
                        let res = appendingAsChildobject(element, orgRes);
                        generateUniqueIdAndParentLink(res, "expStandardAssociationView", null);
                        sortChildrenAlphbetically(res);
                        if (active_desktop_directory_view_id === src_id)
                            createScenarioViewOpenedFromAnchorSingleCase(associationViewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.exp_standard_association_view.key, "Create Links: " + element[ATTR.name], uniqueId, isBiview, res);
                        else
                            createScenarioViewOpenedFromView(associationViewDivId, src_id, src_hotlinkId, backing.view_type.exp_standard_association_view.key, "Create Links: " + element[ATTR.name], uniqueId, isBiview, res);
                        renderExpStandardAssociationView(res, associationViewDivId, element, isBiview, selectedIconType);
                        renderStandardDropDownForAssociationView(shieldRes.children, viewClass, associationViewDivId, selectedShield);
                        renderDirectoryViewForExpStandardAssociationView(res, associationViewDivId, viewClass);
                        let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                        if (objectTypesAndElementTypes) {
                            renderObjectTypesAndElementTypesDropDownStdExp(objectTypesAndElementTypes, associationViewDivId, searchClass, "stdExpAssociationSearchObjectItem");
                        }
                        //call reposition home function
                        highlightSourceAndView(associationViewDivId, isBiview);
                        repositionViews(isBiview);
                        $("#saveData").hide();
                    }
                    else {
                        alert("No Controls to Create links");
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

function renderExpStandardAssociationView(res, viewName, element, isBiview, objectType) {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, viewClass, closeBtnClass, searchDropDownSelected,
        searchDropDown, customSearchDropDownSelected, customSearchDropDown;
    if (isBiview) {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "biview";
        closeBtnClass = "biviewCloseBtn";
        searchDropDownSelected = "biSearchElementTypeStdExpAssociationSelected";
        searchDropDown = "biSearchElementTypeStdExpAssociationDropDown";
        customSearchDropDownSelected = "biCustomSearchElementTypeStdExpAssociationSelected";
        customSearchDropDown = "biCustomSearchElementTypeStdExpAssociationDropDown";

    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "singleview";
        closeBtnClass = "singleviewCloseBtn";
        searchDropDownSelected = "singleSearchElementTypeStdExpAssociationSelected";
        searchDropDown = "singleSearchElementTypeStdExpAssociationDropDown";
        customSearchDropDownSelected = "singleCustomSearchElementTypeStdExpAssociationSelected";
        customSearchDropDown = "singleCustomSearchElementTypeStdExpAssociationDropDown";
    }
    let elementName = combineChainElements(element);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    let str = "";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop associationViewDesktop\" view=\"" + viewClass + "\" uniqueid=\"" + element.uniqueId + "\">" +
        "<div class=\"headerWrapper\"><div class=\"panel-header-container " + viewClass + "\">" +
        "<span class=\"flaticon-arrow findSourceHotlink\" title=\"Show Source Hotlink\">";
    if (objectType === "b_control")
        str += "<span class=\"flaticon-business-element subscriptIcon\"></span>";
    else if (objectType === "shield_element")
        str += "<span class=\"flaticon-shield-element subscriptIcon\"></span>";
    else if (objectType === "standard_element")
        str += "<span class=\"flaticon-standard-element subscriptIcon\"></span>";
    else if (objectType === "threat_element")
        str += "<span class=\"flaticon-threat-control subscriptIcon\"></span>";

    str += "</span><span class=\"panel-header\">CREATE LINKS</span>" +
        "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + closeBtnClass + "\" id=\"closeAssociationView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>";
    str += "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>";
    str += "<span class=\"fright sortIcon sortStandardAssociation flaticon-sort\" title=\"Sort\"></span>";
    str += "</div><div class=\"desktop-selector-container " + viewClass + "\" style=\"color:#000;\">" +
        "<div class=\"desktop-selector-dropdown equalBy2 fleft\">" +
        "<label class=\"labelText\">Between</label>" +
        "</div>" +
        "<span class=\"typeIcon\" title=\"" + elementName.str + "\">" + objectTypeIcon + "" + elementName.str + "</span></div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\" style=\"color:#000;\">" +
        "<span class=\"flaticon-turn-right newLine\"></span>" +
        "<div class=\"desktop-selector-dropdown equalBy2 fleft\">" +
        "<label class=\"labelText\">and</label>" +
        "</div>";
    if (objectType === "shield_element") {
        str += `<span class="flaticon-shield-element mapToIcon" title=" Internal Policy"></span>` +
            `<label class="labelText"> Internal Policies of</label>`;
    }
    else if (objectType === "standard_element") {
        str += `<span class="flaticon-standard-element mapToIcon" title="External Policy"></span>` +
            `<label class="labelText">External Policies of</label>`;
    }
    else if (objectType === "b_control") {
        str += `<span class="flaticon-business-element mapToIcon" title="Value Process"></span>` +
            `<label class="labelText">Value Processes of</label>`;
    }
    else if (objectType === "threat_element") {
        str += `<span class="flaticon-threat-control mapToIcon" title="Threat Vector"></span>` +
            `<label class="labelText">Threat Vectors of</label>`;
    }
    str += "<div class=\"desktop-selector-dropdown fleft\">" +
        "<span id=\"" + viewName + "_standardSelectorAssociationSelected\" class=\"selector shieldSelector\">SELECT</span>" +
        "</div>" +
        "<span class=\"flaticon-search openSearch fright hideAndShowSearch\" title=\"Show Search Bar\"></span>" +
        "<span class=\"headerActionButton expStandardMap\">SAVE</span>" +
        "</div>" +
        "<div class=\"searchWrapper\"><div class=\"desktop-selector-container desktop-searchSelector-container\">" +
        "<span class=\"flaticon-search search\"></span><input class=\"search-keyword fleft\" placeholder=\"Search\">" +
        "<div class=\"desktop-selector-dropdown equalBy3 fleft\">" +
        `<span class="flaticon-search-dropdown searchIcon iconClick opacityDull" title="Select Object Type To Search"></span>` +
        "<span id=\"" + viewName + "searchElementTypeStdAssociationSelected\" class=\"selector searchObject_elementType " + searchDropDownSelected + "\"></span>" +
        "<div id=\"" + viewName + "stdAssociation_search_dropdown_content\" class=\"desktop-selector-dropdown-content " + searchDropDown + " dis-none\">" +
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
        "<span class=\"selector custom_searchObject_elementType " + customSearchDropDownSelected + " dis-none\"></span>" +
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

function renderDirectoryViewForExpStandardAssociationView(data, viewId, view) {
    let isBiview = isBiViewOrNot(view);
    let associationViewId = viewId + "_association_tree_container";
    renderDirectoryView(data, associationViewId, view, "expStandardAssociationView", isBiview);
}

function renderStandardDropDownForAssociationView(res, view, viewId, selectedShield) {
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
    let defaultShieldName = renderCircleOrSquareInventoryDv(res[0], isBiview, "", true, false) + name.toUpperCase();
    str += "<ul>";
    for (let i = 0; i < res.length; i++) {
        str += "<li class = \"" + view + "StandardSelectorAssociationView grpSelector\" elementId=\"" + res[i][ATTR.elementId] + "\"><span>";
        str += renderCircleOrSquareInventoryDv(res[i], isBiview, "", true, false);
        str += res[i][ATTR.name].toUpperCase() + "</span><span class=\"hotLinkWrapper\">";
        str += renderHotlinkInventoryDv(res[0], viewId, view, "groupView", false);
        str += "</span></li>";
    }
    str += "</ul>";
    selectorId = viewId + "_standardSelectorAssociationSelected_dropDown_content";
    $("#" + selectorId).html(str);
    if (defaultShield) {
        let selectedId = $("#" + viewId + "_standardSelectorAssociationSelected");
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

function renderObjectTypesAndElementTypesDropDownStdExp(objects, src_id, selectorDropDownClass, liElementClass) {
    let str = "";
    let searchDropDownSelected, dropDownClass;
    addToDictionary(objects);
    let desktop = $("#" + src_id);
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
        searchDropDownSelected = "singleSearchElementTypeStdExpAssociationSelected";
        dropDownClass = "singleSearchElementTypeStdExpAssociationDropDown";
    }
    else if (desktop.attr("view") === "biview") {
        searchDropDownSelected = "biSearchElementTypeStdExpAssociationSelected";
        dropDownClass = "biSearchElementTypeStdExpAssociationDropDown";
    }
    let $selectedId = desktop.find("." + searchDropDownSelected);
    let $dropDown = desktop.find("." + dropDownClass);
    let selectedElement = desktop.find("." + dropDownClass).find("ul:first li:first");
    searchObjectElementClickStdExp(selectedElement, $selectedId, $dropDown, desktop, "stdExpAssociationCustomSearchObjectItem");
}

function renderCustomSearchDropDownStdExp(randomId, desktop, liElementClass) {
    let $selectorDropDownId, $selectorId;
    let str = "";
    let isHaveNoSelected = false;
    if (desktop.attr("view") === "singleview") {
        $selectorDropDownId = desktop.find(".singleCustomSearchElementTypeStdExpAssociationDropDown");
        $selectorId = desktop.find(".singleCustomSearchElementTypeStdExpAssociationSelected");
    }
    else if (desktop.attr("view") === "biview") {
        $selectorDropDownId = desktop.find(".biCustomSearchElementTypeStdExpAssociationDropDown");
        $selectorId = desktop.find(".biCustomSearchElementTypeStdExpAssociationSelected");
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
            customSearchObjectElementClickStdExp($selectorDropDownId.find("ul:first li:first"), $selectorId, $selectorDropDownId);
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

function customSearchObjectElementClickStdExp(selectedElement, selectedId, dropDownId) {
    selectedId.html(selectedElement.html());
    selectedId.removeAttr("randomId");
    selectedId.attr("randomId", selectedElement.attr("randomId"));
    selectedId.closest(".innerDesktop").find(".search-keyword").keyup();
    dropDownId.addClass("dis-none");
}

function searchObjectElementClickStdExp(selectedElement, selectedId, dropDownClass, desktop, liElementClass) {
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
    renderCustomSearchDropDownStdExp(selectedElement.attr("randomId"), desktop, liElementClass);
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