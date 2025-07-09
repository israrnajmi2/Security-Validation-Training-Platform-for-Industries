$(document).ready(function () {

    $(document).on("click", ".sortDirectAssetAssociation", function (e) {
        sortAssociationForTwoTypesMap($(this), "selectDirectAssetAssociationMap", renderDirectoryViewForDirectAssetAssociationView);
        e.stopPropagation();
    });

    $(document).on("click", ".singleview-direct-asset-association-view", function (e) {
        renderdirectShieldAssetAssociationViewData($(this), false);
        e.stopPropagation();
    });

    $(document).on("click", ".biview-direct-asset-association-view", function (e) {
        renderdirectShieldAssetAssociationViewData($(this), true);
        e.stopPropagation();
    });

    $(document).on("click", ".selectDirectAssetAssociationMap", function (e) {
        let element = backing.dictionary_of_unique_id_to_attr_object[$(this).attr("uniqueId")];
        getSelectionIconOfMap(element, $(this));
        e.stopPropagation();
    });

    $(document).on("mouseleave", ".selectDirectAssetAssociationMap", function (e) {
        let desktop = $(this).closest(".innerDesktop").attr("id");
        $("#" + desktop).find(".checkbox-map .tooltip").addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".directAssetMap", function () {
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

        let data = {};
        let associatedAssets = [];
        $("#" + viewId + " .selectDirectAssetAssociationMap").each(function () {
            if ($(this).hasClass("flaticon-arrow")) {
                associatedAssets.push($(this).attr("id"));
            }
        });
        data.associatedAssets = associatedAssets;
        data.shieldElementId = element[ATTR.elementId];
        let saveFunction = (desktop.attr("isBusiness") === "true") ? service.saveExpressionFulfillsBusinessAssociationsToShieldElement : service.saveExpressionFulfillsAssociationsToShieldElement;
        saveFunction(data, function (res, err) {
            if (res) {
                alert("Links saved successfully");
                let event = {"key": backing.event_type.modified_direct_asset_element_association.key};
                propagateEvent(event);
                $("#saveData").hide();
            }
            else if (err) {
                errorHandler(err);
                $("#saveData").hide();
            }
        });

    });

});

function renderdirectShieldAssetAssociationViewData(selector, isBiview) {
    $("#saveData").show();
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, viewClass, searchClass;
    let src_hotlinkId = selector.attr("id");
    let src_id = selector.closest(".innerDesktop").attr("id");
    let associationViewDivId = backing.view_type.direct_asset_association_view.name + "_" + src_hotlinkId;
    let uniqueId = selector.attr("uniqueid");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let data = {};
    data.elementId = element[ATTR.elementId];
    let isBusiness = (selector.attr("objectType") === "business_asset") ? true : false;
    //check for space in screen
    let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.direct_asset_association_view.key);
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
    if (isBiview) {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "biview";
        searchClass = "biSearchElementTypeAssetExpAssociationDropDown";
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "singleview";
        searchClass = "singleSearchElementTypeAssetExpAssociationDropDown";

    }
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
    let renderFunction = (isBusiness) ? service.getDirectBusinessAssetAssociationsForElement : service.getDirectAssetAssociationsForElement;
    renderFunction(data, function (orgRes, err) {
        if (orgRes) {
            if (orgRes.children !== undefined) {
                let res = appendingAsChildobject(element, orgRes);
                generateUniqueIdAndParentLink(res, "directAssetAssociationView", null);
                sortChildrenAlphbetically(res);
                renderDirectAssetAssociationView(res, associationViewDivId, element, isBiview, isBusiness);
                if (res[ATTR.children])
                    renderDirectoryViewForDirectAssetAssociationView(res, associationViewDivId, viewClass);
                if (active_desktop_directory_view_id === src_id)
                    createScenarioViewOpenedFromAnchorSingleCase(associationViewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.direct_asset_association_view.key, "Create Links: " + element[ATTR.name], uniqueId, isBiview, res);
                else
                    createScenarioViewOpenedFromView(associationViewDivId, src_id, src_hotlinkId, backing.view_type.direct_asset_association_view.key, "Create Links: " + element[ATTR.name], uniqueId, isBiview, res);
                //call reposition home function
                let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                if (objectTypesAndElementTypes) {
                    renderObjectTypesAndElementTypesDropDownAssetExp(objectTypesAndElementTypes, associationViewDivId, searchClass, "assetExpAssociationSearchObjectItem");
                }
                highlightSourceAndView(associationViewDivId, isBiview);
                repositionViews(isBiview);
                $("#saveData").hide();

            }
            else {
                alert("No Assets to Create links");
            }
            $("#saveData").hide();
        }
        else if (err) {

            errorHandler(err);
        }
    });
}

function renderDirectAssetAssociationView(res, viewName, element, isBiview, isBusiness) {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, viewClass, closeBtnClass, searchDropDownSelected,
        searchDropDown, customSearchDropDownSelected, customSearchDropDown;
    if (isBiview) {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "biview";
        closeBtnClass = "biviewCloseBtn";
        searchDropDownSelected = "biSearchElementTypeAssetExpAssociationSelected";
        searchDropDown = "biSearchElementTypeAssetExpAssociationDropDown";
        customSearchDropDownSelected = "biCustomSearchElementTypeAssetExpAssociationSelected";
        customSearchDropDown = "biCustomSearchElementTypeAssetExpAssociationDropDown";
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "singleview";
        closeBtnClass = "singleviewCloseBtn";
        searchDropDownSelected = "singleSearchElementTypeAssetExpAssociationSelected";
        searchDropDown = "singleSearchElementTypeAssetExpAssociationDropDown";
        customSearchDropDownSelected = "singleCustomSearchElementTypeAssetExpAssociationSelected";
        customSearchDropDown = "singleCustomSearchElementTypeAssetExpAssociationDropDown";

    }
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    let headerName = getViewHeaderName(element);
    let str = "";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop associationViewDesktop\" view=\"" + viewClass + "\" uniqueid=\"" + element.uniqueId + "\"  isBusiness=\"" + isBusiness + "\">" +
        "<div class=\"headerWrapper\"><div class=\"panel-header-container " + viewClass + "\">" +
        "<span class=\"flaticon-arrow findSourceHotlink\" title=\"Show Source Hotlink\">";
    if (isBusiness === true)
        str += "<span class=\"flaticon-business-asset-element subscriptIcon\"></span>";
    else
        str += "<span class=\"flaticon-asset-element subscriptIcon\"></span>";
    str += `</span><span class="panel-header">CREATE LINKS</span>` +
        "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + closeBtnClass + "\" id=\"closeAssociationView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>";
    str += "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>";
    str += "<span class=\"fright sortIcon sortDirectAssetAssociation flaticon-sort\" title=\"Sort\"></span>";
    str += "</div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\" style=\"color:#000;\">" +
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
        "</div>";
    if (isBusiness === true)
        str += "<span class=\"linkingIcon flaticon-business-asset-element\">VALUE ASSET</span>";
    else
        str += "<span class=\"linkingIcon flaticon-asset-element\">SECURITY ASSET</span>";
    str += "<span class=\"flaticon-search openSearch fright hideAndShowSearch\" title=\"Show Search Bar\"></span>" +
        "<span class=\"headerActionButton directAssetMap\" style=\"padding: 0;\">SAVE</span></div>" +
        "<div class=\"searchWrapper\"><div class=\"desktop-selector-container desktop-searchSelector-container\">" +
        "<span class=\"flaticon-search search\"></span><input class=\"search-keyword fleft\" placeholder=\"Search\">" +
        "<div class=\"desktop-selector-dropdown fleft\">" +
        `<span class="flaticon-search-dropdown searchIcon iconClick opacityDull" title="Select Object Type To Search"></span>` +
        "<span id=\"" + viewName + "searchElementTypeAssetAssociationSelected\" class=\"selector searchObject_elementType " + searchDropDownSelected + "\"></span>" +
        "<div id=\"" + viewName + "assetAssociation_search_dropdown_content\" class=\"desktop-selector-dropdown-content " + searchDropDown + " dis-none\">" +
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

function renderDirectoryViewForDirectAssetAssociationView(data, viewId, view) {
    let isBiview = isBiViewOrNot(view);
    let associationViewId = viewId + "_association_tree_container";
    renderDirectoryView(data, associationViewId, view, "directAssetAssociationView", isBiview);
}
