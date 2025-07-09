$(document).ready(function () {
    $(document).on("click", ".sortExpATAssociation", function (e) {
        sortAssociationForThreeTypesMap($(this), "selectExpAssetTypeAssociationMap", renderDirectoryViewExpAssetTypeAssociationView);
        e.stopPropagation();
    });

    $(document).on("click", ".singleview-expAssetType-association-view", function (e) {
        expAssetTypeAssociationClick($(this), "singleview", "singleSearchElementTypeAssetTypeExpAssociationDropDown");
        e.stopPropagation();
    });

    $(document).on("click", ".biview-expAssetType-association-view", function (e) {
        expAssetTypeAssociationClick($(this), "biview", "biSearchElementTypeAssetTypeExpAssociationDropDown");
        e.stopPropagation();

    });

    $(document).on("click", ".selectExpAssetTypeAssociationMap", function (e) {
        let element = backing.dictionary_of_unique_id_to_attr_object[$(this).attr("uniqueId")];
        getSelectionIcon(element, $(this));
        e.stopPropagation();
    });

    $(document).on("mouseleave", ".selectExpAssetTypeAssociationMap", function (e) {
        let desktop = $(this).closest(".innerDesktop").attr("id");
        $("#" + desktop).find(".checkbox-map .tooltip").addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".expAssetTypeMap", function (e) {
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
        let associatedCouldExpressions = [];
        let associatedShallExpressions = [];
        let data = {};
        $("#" + viewId + " .selectExpAssetTypeAssociationMap").each(function () {
            if ($(this).hasClass("flaticon-arrow") && $(this).hasClass("partialSelection")) {
                associatedCouldExpressions.push($(this).attr("id"));
            }
            else if ($(this).hasClass("flaticon-arrow")) {
                associatedShallExpressions.push($(this).attr("id"));
            }
        });
        data.associatedCouldAssetTypes = associatedCouldExpressions;
        data.associatedShallAssetTypes = associatedShallExpressions;
        data.expressionId = element[ATTR.elementId];
        let saveFunction = (desktop.attr("isBusiness") === "true") ? service.saveBusinessProtectsAssociationsForExpression : service.saveProtectsAssociationsForExpression;
        saveFunction(data, function (res, err) {
            if (res) {
                alert("Links saved successfully");
                let event = {"key": backing.event_type.modified_protection_association.key};
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

    $(document).on("click", ".assetTypeExpAssociationSearchObjectItem", function (e) {
        let searchDropDownSelected, dropDownClass;
        let desktop = $(this).closest(".innerDesktop");
        let selectedElement = $(this);
        if (desktop.attr("view") === "singleview") {
            searchDropDownSelected = "singleSearchElementTypeAssetTypeExpAssociationSelected";
            dropDownClass = "singleSearchElementTypeAssetTypeExpAssociationDropDown";

        }
        else if (desktop.attr("view") === "biview") {
            searchDropDownSelected = "biSearchElementTypeAssetTypeExpAssociationSelected";
            dropDownClass = "biSearchElementTypeAssetTypeExpAssociationDropDown";
        }
        let $selectedId = desktop.find("." + searchDropDownSelected);
        let $dropDown = desktop.find("." + dropDownClass);
        searchObjectElementClickAssetExp(selectedElement, $selectedId, $dropDown, desktop, "assetTypeExpAssociationCustomSearchObjectItem");
        e.stopPropagation();
    });

    $(document).on("click", ".assetTypeExpAssociationCustomSearchObjectItem", function (e) {
        let searchDropDownSelected, dropDownClass;
        let desktop = $(this).closest(".innerDesktop");
        let selectedElement = $(this);
        if (desktop.attr("view") === "singleview") {
            searchDropDownSelected = "singleCustomSearchElementTypeAssetTypeExpAssociationSelected";
            dropDownClass = "singleCustomSearchElementTypeAssetTypeExpAssociationDropDown";
        }
        else if (desktop.attr("view") === "biview") {
            searchDropDownSelected = "biCustomSearchElementTypeAssetTypeExpAssociationSelected";
            dropDownClass = "biCustomSearchElementTypeAssetTypeExpAssociationDropDown";
        }
        let $selectedId = desktop.find("." + searchDropDownSelected);
        let $dropDown = desktop.find("." + dropDownClass);
        customSearchObjectElementClickAssetExp(selectedElement, $selectedId, $dropDown);
        e.stopPropagation();
    });
});

function expAssetTypeAssociationClick($this, view, classParam) {
    $("#saveData").show();
    let src_hotlinkId = $this.attr("id");
    let src_id = $this.closest(".innerDesktop").attr("id");
    let associationViewDivId = backing.view_type.exp_assetType_association_view.name + "_" + src_hotlinkId;
    let isBiview = isBiViewOrNot(view);
    //check for space in screen
    let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.exp_assetType_association_view.key);
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
    let uniqueId = $this.attr("uniqueid");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let activeDesktop = getActiveDesktop(isBiview);
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
    let data = {};
    data.elementId = element[ATTR.elementId];
    let isBusiness = ($this.attr("objectType") === "business_asset_type") ? true : false;
    let renderFunction = (isBusiness) ? service.getBusinessProtectsAssociationsForExpression : service.getProtectsAssociationsForExpression;
    renderFunction(data, function (orgRes, err) {
        if (orgRes) {
            if (orgRes.children !== undefined) {
                let res = appendingAsChildobject(element, orgRes);
                generateUniqueIdAndParentLink(res, "expAssetAssociationView", null);
                sortChildrenAlphbetically(res);
                if (active_desktop_directory_view_id === src_id)
                    createScenarioViewOpenedFromAnchorSingleCase(associationViewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.exp_assetType_association_view.key, "Create Links: " + element[ATTR.name], uniqueId, isBiview, res);
                else
                    createScenarioViewOpenedFromView(associationViewDivId, src_id, src_hotlinkId, backing.view_type.exp_assetType_association_view.key, "Create Links: " + element[ATTR.name], uniqueId, isBiview, res);
                renderExpAssetTypeAssociationView(res, associationViewDivId, element, isBiview, isBusiness);
                if (res[ATTR.children])
                    renderDirectoryViewExpAssetTypeAssociationView(res, associationViewDivId, view);
                let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                if (objectTypesAndElementTypes) {
                    renderObjectTypesAndElementTypesDropDownAssetTypeExp(objectTypesAndElementTypes, associationViewDivId, classParam, "assetTypeExpAssociationSearchObjectItem");
                }
                highlightSourceAndView(associationViewDivId, isBiview);
                repositionViews(isBiview);
                $("#saveData").hide();

            }
            else {
                alert("No Asset Types to Create links");
            }
            $("#saveData").hide();
        }
        else if (err) {

            errorHandler(err);
        }
    });
}

function renderExpAssetTypeAssociationView(res, viewName, element, isBiview, isBusiness) {
    let viewClass, closeBtnClass, searchDropDownSelected, searchDropDown, customSearchDropDownSelected,
        customSearchDropDown;
    let activeDesktop = getActiveDesktop(isBiview);
    if (isBiview) {
        viewClass = "biview";
        closeBtnClass = "biviewCloseBtn";
        searchDropDownSelected = "biSearchElementTypeAssetTypeExpAssociationSelected";
        searchDropDown = "biSearchElementTypeAssetTypeExpAssociationDropDown";
        customSearchDropDownSelected = "biCustomSearchElementTypeAssetTypeExpAssociationSelected";
        customSearchDropDown = "biCustomSearchElementTypeAssetTypeExpAssociationDropDown";

    }
    else {
        viewClass = "singleview";
        closeBtnClass = "singleviewCloseBtn";
        searchDropDownSelected = "singleSearchElementTypeAssetTypeExpAssociationSelected";
        searchDropDown = "singleSearchElementTypeAssetTypeExpAssociationDropDown";
        customSearchDropDownSelected = "singleCustomSearchElementTypeAssetTypeExpAssociationSelected";
        customSearchDropDown = "singleCustomSearchElementTypeAssetTypeExpAssociationDropDown";

    }
    let elementName = combineChainElements(element);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    let str = "";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop associationViewDesktop\" view=\"" + viewClass + "\" uniqueid=\"" + element.uniqueId + "\" isBusiness=\"" + isBusiness + "\">" +
        "<div class=\"headerWrapper\"><div class=\"panel-header-container " + viewClass + "\">" +
        "<span class=\"flaticon-arrow findSourceHotlink\" title=\"Show Source Hotlink\">";
    if (isBusiness === true)
        str += "<span class=\"flaticon-business-asset-type-element subscriptIcon\"></span>";
    else
        str += "<span class=\"flaticon-asset-type-element subscriptIcon\"></span>";
    str += "</span><span class=\"panel-header\">CREATE LINKS</span>" +
        "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + closeBtnClass + "\" id=\"closeAssociationView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>";
    str += "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>";
    str += "<span class=\"fright sortIcon sortExpATAssociation flaticon-sort\" title=\"Sort\"></span>";
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
    if (isBusiness === true)
        str += "<span class=\"linkingIcon flaticon-business-asset-type-element\">VALUE ASSET TYPE</span>";
    else
        str += "<span class=\"linkingIcon flaticon-asset-type-element\">SECURITY ASSET TYPE</span>";
    str += "<span class=\"flaticon-search openSearch fright hideAndShowSearch\" title=\"Show Search Bar\"></span>" +
        "<span class=\"headerActionButton expAssetTypeMap\">SAVE</span>" +
        "</div>" +
        "<div class=\"searchWrapper\"><div class=\"desktop-selector-container desktop-searchSelector-container\">" +
        "<span class=\"flaticon-search search\"></span><input class=\"search-keyword fleft\" placeholder=\"Search\">" +
        "<div class=\"desktop-selector-dropdown equalBy3 fleft\">" +
        `<span class="flaticon-search-dropdown searchIcon iconClick opacityDull" title="Select Object Type To Search"></span>` +
        "<span id=\"" + viewName + "searchElementTypeAssetTypeAssociationSelected\" class=\"selector searchObject_elementType " + searchDropDownSelected + "\"></span>" +
        "<div id=\"" + viewName + "assetTypeAssociation_search_dropdown_content\" class=\"desktop-selector-dropdown-content " + searchDropDown + " dis-none\">" +
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

function renderDirectoryViewExpAssetTypeAssociationView(data, viewId, view) {
    let isBiview = isBiViewOrNot(view);
    let associationViewId = viewId + "_association_tree_container";
    renderDirectoryView(data, associationViewId, view, "expAssetTypeAssociationView", isBiview);
}

function renderObjectTypesAndElementTypesDropDownAssetTypeExp(objects, src_id, selectorDropDownClass, liElementClass) {
    let str = "";
    let searchDropDownSelected, dropDownClass;
    let desktop = $("#" + src_id);
    addToDictionary(objects);
    let sortedObjA = getSortElementTypeDropDownObject(objects);
    let customChoices = getCustomTrueChoicesForAssetTypeAssociation();
    let sortedObj = $.merge(customChoices, sortedObjA);
    str += "<ul>";
    str += "<li class=\"" + liElementClass + "\">ALL</li>";
    for (let i = 0; i < sortedObj.length; i++) {
        str += "<li class=\"" + liElementClass + "\"  randomId =\"" + sortedObj[i].randomId + "\">" + sortedObj[i].label.toUpperCase() + "</li>";
    }
    str += "</ul>";
    desktop.find("." + selectorDropDownClass).html(str);
    if (desktop.attr("view") === "singleview") {
        searchDropDownSelected = "singleSearchElementTypeAssetTypeExpAssociationSelected";
        dropDownClass = "singleSearchElementTypeAssetTypeExpAssociationDropDown";
    }
    else if (desktop.attr("view") === "biview") {
        searchDropDownSelected = "biSearchElementTypeAssetTypeExpAssociationSelected";
        dropDownClass = "biSearchElementTypeAssetTypeExpAssociationDropDown";
    }
    let $selectedId = desktop.find("." + searchDropDownSelected);
    let $dropDown = desktop.find("." + dropDownClass);
    let selectedElement = desktop.find("." + dropDownClass).find("ul:first li:first");
    searchObjectElementClickAssetTypeExp(selectedElement, $selectedId, $dropDown, desktop, "assetTypeExpAssociationCustomSearchObjectItem");

}

function renderCustomSearchDropDownAssetTypeExp(randomId, desktop, liElementClass) {
    let $selectorDropDownId, $selectorId;
    let str = "";
    let isHaveNoSelected = false;
    if (desktop.attr("view") === "singleview") {
        $selectorDropDownId = desktop.find(".singleCustomSearchElementTypeAssetTypeExpAssociationDropDown");
        $selectorId = desktop.find(".singleCustomSearchElementTypeAssetTypeExpAssociationSelected");
    }
    else if (desktop.attr("view") === "biview") {
        $selectorDropDownId = desktop.find(".biCustomSearchElementTypeAssetTypeExpAssociationDropDown");
        $selectorId = desktop.find(".biCustomSearchElementTypeAssetTypeExpAssociationSelected");
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
            customSearchObjectElementClickAssetTypeExp($selectorDropDownId.find("ul:first li:first"), $selectorId, $selectorDropDownId);
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

function customSearchObjectElementClickAssetTypeExp(selectedElement, selectedId, dropDownId) {
    selectedId.html(selectedElement.html());
    selectedId.removeAttr("randomId");
    selectedId.attr("randomId", selectedElement.attr("randomId"));
    selectedId.closest(".innerDesktop").find(".search-keyword").keyup();
    dropDownId.addClass("dis-none");
}

function searchObjectElementClickAssetTypeExp(selectedElement, selectedId, dropDownClass, desktop, liElementClass) {
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
    renderCustomSearchDropDownAssetTypeExp(selectedElement.attr("randomId"), desktop, liElementClass);
}

function getCustomTrueChoicesForAssetTypeAssociation() {
    let array = [];
    let choices;
    let cons = constants.association_css_style;
    addToDictionary(cons);
    choices = [cons.asset_type_selected, cons.asset_type_not_selected, cons.unsaved];
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