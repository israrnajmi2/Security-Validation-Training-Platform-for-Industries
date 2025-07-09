$(document).ready(function () {

    $(document).on("click", ".sortDirectAssetTypeElementAssociation", function (e) {
        sortAssociationForTwoTypesMap($(this), "selectDirectAssetTypeMap", renderDirectoryViewForDirectAssetTypeElementAssociationView);
        e.stopPropagation();
    });

    $(document).on("click", ".singleview-direct-asset-type-element-association-view", function (e) {
        renderDirectAssetTypeElementAssociationViewData($(this), false);
        e.stopPropagation();
    });

    $(document).on("click", ".biview-direct-asset-type-element-association-view", function (e) {
        renderDirectAssetTypeElementAssociationViewData($(this), true);
        e.stopPropagation();
    });

    $(document).on("click", ".selectDirectAssetTypeMap", function (e) {
        let element = backing.dictionary_of_unique_id_to_attr_object[$(this).attr("uniqueId")];
        getSelectionIconOfMap(element, $(this));
        e.stopPropagation();
    });

    $(document).on("mouseleave", ".selectDirectAssetTypeMap", function (e) {
        let desktop = $(this).closest(".innerDesktop").attr("id");
        $("#" + desktop).find(".checkbox-map .tooltip").addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".directAssetTypeElementMap", function () {
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
            data.shieldId = $("#" + viewId + "_assetTypeElementSelectorAssociationSelected").attr("elementId");

        }
        else if (view === "biview") {
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
            data.shieldId = $("#" + viewId + "_assetTypeElementSelectorAssociationSelected").attr("elementId");

        }
        let currentOpenedView = getCurrentOpenedView(activeDesktop, viewId);
        let uniqueId = currentOpenedView.uniqueId;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];

        let associatedElements = [];
        $("#" + viewId + " .selectDirectAssetTypeMap").each(function () {
            if ($(this).hasClass("flaticon-arrow")) {
                associatedElements.push($(this).attr("id"));
            }
        });
        data.associatedElements = associatedElements;
        data.assetTypeId = element[ATTR.elementId];
        let saveFunction = (desktop.attr("isBusiness") === "true") ? service.saveDirectShieldElementAssociationsForBusinessAssetType : service.saveDirectShieldElementAssociationsForAssetType;
        saveFunction(data, function (res, err) {
            if (res) {
                alert("Links saved successfully");
                let event = {"key": backing.event_type.modified_direct_asset_type_element_association.key};
                propagateEvent(event);
                $("#saveData").hide();
            }
            else if (err) {
                errorHandler(err);
                $("#saveData").hide();
            }
        });

    });

    $(document).on("click", ".singleviewDirectAssetTypeElementAssociationView", function (e) {
        renderSelectorDirectAssetTypeElementAssociationView($(this), false, "singleSearchElementTypeShieldExpAssociationDropDown");
        e.stopPropagation();
    });

    $(document).on("click", ".biviewDirectAssetTypeElementAssociationView", function (e) {
        renderSelectorDirectAssetTypeElementAssociationView($(this), true, "biSearchElementTypeShieldExpAssociationDropDown");
        e.stopPropagation();
    });

});

function renderSelectorDirectAssetTypeElementAssociationView(selector, isBiview, searchClass) {
    $("#saveData").show();
    let data = {};
    let selectedElement = selector, viewClass;
    let desktop = selectedElement.closest(".innerDesktop");
    let uniqueId = desktop.attr("uniqueId");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let associationViewDivId = desktop.attr("id");
    let activeDesktop = getActiveDesktop(isBiview);
    data.selectedShield = selectedElement.attr("elementId");
    data.elementId = element.elementId;
    if (isBiview)
        viewClass = "biview";
    else
        viewClass = "singleview";
    service.getDirectShieldElementAssociationsForAssetType(data, function (res, err) {
        if (res) {
            generateUniqueIdAndParentLink(res, "directAssetTypeElementAssociationView", null);
            if (!desktop.find(".sortIcon").hasClass("unSortAss"))
                sortChildrenAlphbetically(res);
            let index = getIndexOfOpenedViewFromPassedOpenedViews(associationViewDivId, activeDesktop.opened_views);
            activeDesktop.opened_views[index].associationRes = res;
            renderDirectoryViewForDirectAssetTypeElementAssociationView(res, associationViewDivId, viewClass);
            let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
            if (objectTypesAndElementTypes) {
                renderObjectTypesAndElementTypesDropDownShieldExp(objectTypesAndElementTypes, associationViewDivId, searchClass, "shieldExpAssociationSearchObjectItem");
            }
            $("#saveData").hide();
        }
        else if (err) {
            $("#saveData").hide();
            errorHandler(err);
        }
    });
    let selectedId = $("#" + associationViewDivId + "_assetTypeElementSelectorAssociationSelected");
    selectedId.html(selectedElement.find("span").html());
    selectedId.attr("elementId", selectedElement.attr("elementId"));
    $("#" + associationViewDivId + "_assetTypeElementSelectorAssociationSelected_dropDown_content").addClass("dis-none");
}

function renderDirectAssetTypeElementAssociationViewData(selector, isBiview) {
    $("#saveData").show();
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, viewClass, getDropDownService;
    let src_hotlinkId = selector.attr("id");
    let src_id = selector.closest(".innerDesktop").attr("id");
    let protectedSelectedId = $("#" + src_id).find(".protectionTypeSelector").attr("shieldId");
    let associationViewDivId = backing.view_type.direct_asset_type_element_association_view.name + "_" + src_hotlinkId;
    let uniqueId = selector.attr("uniqueid");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let data = {};
    data.elementId = element.elementId;
    let selectedIconType = selector.attr("objectType");
    let isBusiness = (selector.attr("elementObjectType") === "business_asset_type") ? true : false;
    //check for space in screen
    let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.direct_asset_type_element_association_view.key);
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
    if (selectedIconType === "shield_element")
        getDropDownService = service.getShieldOfShieldType;
    else if (selectedIconType === "standard_element")
        getDropDownService = service.getShieldOfStandardType;
    else if (selectedIconType === "b_control")
        getDropDownService = service.getShieldOfBusinessType;
    else if (selectedIconType === "threat_element")
        getDropDownService = service.getShieldOfThreatType;
    let renderFunction = (isBusiness) ? service.getDirectShieldElementAssociationsForBusinessAssetType : service.getDirectShieldElementAssociationsForAssetType;
    getDropDownService(data, function (shieldRes, err) {
        if (shieldRes) {
            let selectedShield = checkInsideArray(shieldRes.children, parseInt(protectedSelectedId));
            data.selectedShield = parseInt(protectedSelectedId);
            renderFunction(data, function (orgRes, err) {
                if (orgRes) {
                    if (orgRes.children !== undefined) {
                        let res = appendingAsChildobject(element, orgRes);
                        generateUniqueIdAndParentLink(res, "directAssetElementAssociationView", null);
                        renderDirectAssetTypeElementAssociationView(res, associationViewDivId, data, element, isBiview, selectedIconType, isBusiness);
                        renderDirectAssetTypeElementDropDownForAssociationView(shieldRes.children, viewClass, associationViewDivId, selectedShield);
                        renderDirectoryViewForDirectAssetTypeElementAssociationView(res, associationViewDivId, viewClass);
                        if (active_desktop_directory_view_id === src_id)
                            createScenarioViewOpenedFromAnchorSingleCase(associationViewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.direct_asset_type_element_association_view.key, "Create Links: " + element[ATTR.name], uniqueId, isBiview, res);
                        else
                            createScenarioViewOpenedFromView(associationViewDivId, src_id, src_hotlinkId, backing.view_type.direct_asset_type_element_association_view.key, "Create Links: " + element[ATTR.name], uniqueId, isBiview, res);
                        let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                        if (objectTypesAndElementTypes) {
                            renderObjectTypesAndElementTypesDropDownShieldExp(objectTypesAndElementTypes, associationViewDivId, searchClass, "shieldExpAssociationSearchObjectItem");
                        }
                        highlightSourceAndView(associationViewDivId, isBiview);
                        repositionViews(isBiview);
                        $("#saveData").hide();

                    }
                    else {
                        alert("No controls to create Links");
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

function renderDirectAssetTypeElementAssociationView(res, viewName, data, element, isBiview, associationObjectType, isBusiness) {
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
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    let str = "";
    str += "<div objectType = \"" + associationObjectType + "\" id=\"" + viewName + "\" class=\"innerDesktop associationViewDesktop\" view=\"" + viewClass + "\" uniqueid=\"" + element.uniqueId + "\" expressionId = \"" + data.expressionId + "\" isBusiness=\"" + isBusiness + "\">" +
        "<div class=\"headerWrapper\"><div class=\"panel-header-container " + viewClass + "\">" +
        "<span class=\"flaticon-arrow findSourceHotlink\" title=\"Show Source Hotlink\">";
    if (associationObjectType === "shield_element")
        str += "<span class=\"flaticon-shield-element subscriptIcon\"></span>";
    else if (associationObjectType === "standard_element")
        str += "<span class=\"flaticon-standard-element subscriptIcon\"></span>";
    else if (associationObjectType === "b_control")
        str += "<span class=\"flaticon-business-element subscriptIcon\"></span>";
    else if (associationObjectType === "threat_element")
        str += "<span class=\"flaticon-threat-control subscriptIcon\"></span>";
    str += "</span>" +
        "<span class=\"panel-header\">CREATE LINKS</span>" +
        "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + closeBtnClass + "\" id=\"closeAssociationView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>";
    str += "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>";
    str += "<span class=\"fright sortIcon sortDirectAssetTypeElementAssociation flaticon-sort unSortAss\" title=\"Sort\"></span>";
    str += "</div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\" style=\"color:#000;\">" +
        "<div class=\"desktop-selector-dropdown equalBy2 fleft\">" +
        "<label class=\"labelText\">Between</label>" +
        "</div>" +
        "<span class=\"iconWrapper\">" + objectTypeIcon + "</span>" +
        "<span class=\"typeIcon\" title=\"" + element.name.toUpperCase() + "\">" + element.name.toUpperCase() +
        "</span>";
    str += "</div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\">" +
        "<span class=\"flaticon-turn-right newLine\"></span>" +
        "<div class=\"desktop-selector-dropdown equalBy2 fleft\">" +
        "<label class=\"labelText\">and</label>" +
        "</div>";
    if (associationObjectType === "shield_element") {
        str += `<span class="flaticon-shield-element mapToIcon" title=" Internal Policy"></span>` +
            `<label class="labelText"> Internal Policies of</label>`;
    }
    else if (associationObjectType === "standard_element") {
        str += `<span class="flaticon-standard-element mapToIcon" title="External Policy"></span>` +
            `<label class="labelText">External Policies of</label>`;
    }
    else if (associationObjectType === "b_control") {
        str += `<span class="flaticon-business-element mapToIcon" title="Value Process"></span>` +
            `<label class="labelText">Value Processes of</label>`;
    }
    else if (associationObjectType === "threat_element") {
        str += `<span class="flaticon-threat-control mapToIcon" title="Threat Vector"></span>` +
            `<label class="labelText">Threat Vectors of</label>`;
    }
    str += "<div class=\"desktop-selector-dropdown fleft\">" +
        "<span id=\"" + viewName + "_assetTypeElementSelectorAssociationSelected\" class=\"selector shieldSelector shieldSelectorAssociationSelected\">SELECT</span>" +
        "</div>" +
        "<span class=\"flaticon-search openSearch fright hideAndShowSearch\" title=\"Show Search Bar\"></span>" +
        "<span class=\"headerActionButton directAssetTypeElementMap\">SAVE</span>" +
        "</div>" +
        "<div class=\"searchWrapper\"><div class=\"desktop-selector-container desktop-searchSelector-container\">" +
        "<span class=\"flaticon-search search\"></span><input class=\"search-keyword fleft\" placeholder=\"Search\">" +
        "<div class=\"desktop-selector-dropdown fleft\">" +
        `<span class="flaticon-search-dropdown searchIcon iconClick opacityDull" title="Select Object Type To Search"></span>` +
        "<span id=\"" + viewName + "searchElementTypeShieldAssociationSelected\" class=\"selector searchObject_elementType " + searchDropDownSelected + "\"></span>" +
        "<div id=\"" + viewName + "shieldAssociation_search_dropdown_content\" class=\"desktop-selector-dropdown-content dis-none " + searchDropDown + "\">" +
        "</div>" +
        "</div>" +
        "<span class=\"flaticon-up-arrow fright hideSearch hideAndShowSearch\" title=\"Hide Search Bar\"></span>" +
        "<span title=\"Clear Search\" class=\"tooltip clearSearch flaticon-remove  tooltipstered\"></span>" +
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
        "<span title=\"Clear Search\" class=\"tooltip clearSearch flaticon-remove tooltipstered\"></span>";
    str += "</div></div></div>";
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

function renderDirectoryViewForDirectAssetTypeElementAssociationView(data, viewId, view) {
    let isBiview = isBiViewOrNot(view);
    let associationViewId = viewId + "_association_tree_container";
    renderDirectoryView(data, associationViewId, view, "directAssetTypeElementAssociationView", isBiview);
}

function renderDirectAssetTypeElementDropDownForAssociationView(res, view, viewId, selectedShield) {
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
    //}
    let defaultShieldName = renderCircleOrSquareInventoryDv(defaultShield, isBiview, "", true, false) + name.toUpperCase();
    str += "<ul>";
    for (let i = 0; i < res.length; i++) {
        str += "<li class = \"" + view + "DirectAssetTypeElementAssociationView grpSelector\" elementId=\"" + res[i][ATTR.elementId] + "\"><span>";
        str += renderCircleOrSquareInventoryDv(res[i], isBiview, "", true, false);
        str += res[i][ATTR.name].toUpperCase() + "</span><span class=\"hotLinkWrapper\">";
        str += renderHotlinkInventoryDv(res[0], viewId, view, "groupView", false);
        str += "</span></li>";
    }
    str += "</ul>";
    selectorId = viewId + "_assetTypeElementSelectorAssociationSelected_dropDown_content";
    $("#" + selectorId).html(str);
    if (defaultShield) {
        let selectedId = $("#" + viewId + "_assetTypeElementSelectorAssociationSelected");
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
