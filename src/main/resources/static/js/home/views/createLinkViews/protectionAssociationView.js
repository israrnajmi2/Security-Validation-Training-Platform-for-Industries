$(document).ready(function () {
    $(document).on("click", ".sortProtectionAssociation", function (e) {
        let expand;
        let desktop = $(this).closest(".innerDesktop");
        expand = !desktop.find(".protectionAssocShort").hasClass("active");
        sortAssociationForThreeTypesMap($(this), "selectToAssociationMap", renderDirectoryViewForProtectionAssociationView, expand);
        e.stopPropagation();
    });

    $(document).on("click", ".singleview-protection-association-view", function (e) {
        renderProtectionAssociationViewData($(this), false);
        e.stopPropagation();
    });

    $(document).on("click", ".biview-protection-association-view", function (e) {
        renderProtectionAssociationViewData($(this), true);
        e.stopPropagation();
    });

    $(document).on("click", ".selectToAssociationMap", function (e) {
        let element = backing.dictionary_of_unique_id_to_attr_object[$(this).attr("uniqueId")];
        getSelectionIcon(element, $(this));
        e.stopPropagation();
    });

    $(document).on("mouseleave", ".selectToAssociationMap", function (e) {
        let desktop = $(this).closest(".innerDesktop").attr("id");
        $("#" + desktop).find(".checkbox-map .tooltip").addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".protectionMap", function (e) {
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
        $("#" + viewId + " .selectToAssociationMap").each(function () {
            if ($(this).hasClass("flaticon-arrow") && $(this).hasClass("partialSelection")) {
                associatedCouldExpressions.push($(this).attr("id"));
            }
            else if ($(this).hasClass("flaticon-arrow")) {
                associatedShallExpressions.push($(this).attr("id"));
            }
        });
        data.associatedCouldExpressions = associatedCouldExpressions;
        data.associatedShallExpressions = associatedShallExpressions;
        data.elementId = element[ATTR.elementId];
        let saveFunction = (desktop.attr("isBusiness") === "true") ? service.saveExpressionFulfillsAssociationsToBusinessAssetTypeElement : service.saveExpressionFulfillsAssociationsToAssetTypeElement;
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

    $(document).on("click", ".protectedAssociationSearchObject_ElementTypeItem", function (e) {
        let searchDropDownSelected, dropDownClass;
        let desktop = $(this).closest(".innerDesktop");
        let selectedElement = $(this);
        if (desktop.attr("view") === "singleview") {
            searchDropDownSelected = "singleSearchElementTypeProtectedAssociationSelected";
            dropDownClass = "singleSearchElementTypeProtectedAssociationDropDown";
        }
        else if (desktop.attr("view") === "biview") {
            searchDropDownSelected = "biSearchElementTypeProtectedAssociationSelected";
            dropDownClass = "biSearchElementTypeProtectedAssociationDropDown";
        }
        let $selectedId = desktop.find("." + searchDropDownSelected);
        let $dropDown = desktop.find("." + dropDownClass);
        searchObjectElementClickProtectionAssociation(selectedElement, $selectedId, $dropDown, desktop, "protectedAssociationCustomSearchObject_ElementTypeItem");
        e.stopPropagation();
    });

    $(document).on("click", ".protectedAssociationCustomSearchObject_ElementTypeItem", function (e) {
        let searchDropDownSelected, dropDownClass;
        let desktop = $(this).closest(".innerDesktop");
        let selectedElement = $(this);
        if (desktop.attr("view") === "singleview") {
            searchDropDownSelected = "singleCustomSearchElementTypeProtectedAssociationSelected";
            dropDownClass = "singleCustomSearchElementTypeProtectedAssociationDropDown";
        }
        else if (desktop.attr("view") === "biview") {
            searchDropDownSelected = "biCustomSearchElementTypeProtectedAssociationSelected";
            dropDownClass = "biCustomSearchElementTypeProtectedAssociationDropDown";
        }
        let $selectedId = desktop.find("." + searchDropDownSelected);
        let $dropDown = desktop.find("." + dropDownClass);
        customSearchObjectElementClickProtectionAssociation(selectedElement, $selectedId, $dropDown);
        e.stopPropagation();
    });

    $(document).on("click", ".protectionAssocExpand", function (e) {
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

        $("#" + viewId + " .selectToAssociationMap").each(function () {
            if ($(this).hasClass("flaticon-arrow") && $(this).hasClass("partialSelection"))
                checkElementArray[$(this).attr("id")] = "partialSelection";
            else if ($(this).hasClass("flaticon-arrow"))
                checkElementArray[$(this).attr("id")] = "flaticon-arrow";
            else if ($(this).hasClass("flaticon-unlink"))
                checkElementArray[$(this).attr("id")] = "flaticon-unlink";
        });
        let associationRes = activeDesktop.opened_views[index].associationRes;
        if (associationRes && associationRes[ATTR.children]) {
            renderDirectoryViewForProtectionAssociationView(associationRes, viewId, view, true);
            let checkKeys = Object.keys(checkElementArray);
            for (let i = 0; i <= checkKeys.length; i++) {
                let queryId = $("#" + viewId);
                if (queryId.find("#" + checkKeys[i]).hasClass(checkElementArray[checkKeys[i]]))
                    queryId.find("#" + checkKeys[i]).attr("class", "checkbox-map selectToAssociationMap " + checkElementArray[checkKeys[i]]);
                else
                    queryId.find("#" + checkKeys[i]).attr("class", "checkbox-map selectToAssociationMap iconShadow " + checkElementArray[checkKeys[i]]);
                if (checkElementArray[checkKeys[i]] === "partialSelection")
                    queryId.find("#" + checkKeys[i]).addClass("flaticon-arrow");
            }
        }
        e.stopPropagation();
    });

    $(document).on("click", ".protectionAssocShort", function (e) {
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

        $("#" + viewId + " .selectToAssociationMap").each(function () {
            if ($(this).hasClass("flaticon-arrow") && $(this).hasClass("partialSelection"))
                checkElementArray[$(this).attr("id")] = "partialSelection";
            else if ($(this).hasClass("flaticon-arrow"))
                checkElementArray[$(this).attr("id")] = "flaticon-arrow";
            else if ($(this).hasClass("flaticon-unlink"))
                checkElementArray[$(this).attr("id")] = "flaticon-unlink";
        });
        let associationRes = activeDesktop.opened_views[index].associationRes;
        if (associationRes && associationRes[ATTR.children]) {
            renderDirectoryViewForProtectionAssociationView(associationRes, viewId, view, false);
            let checkKeys = Object.keys(checkElementArray);
            for (let i = 0; i <= checkKeys.length; i++) {
                let queryId = $("#" + viewId);
                if (queryId.find("#" + checkKeys[i]).hasClass(checkElementArray[checkKeys[i]]))
                    queryId.find("#" + checkKeys[i]).attr("class", "checkbox-map selectToAssociationMap " + checkElementArray[checkKeys[i]]);
                else
                    queryId.find("#" + checkKeys[i]).attr("class", "checkbox-map selectToAssociationMap iconShadow " + checkElementArray[checkKeys[i]]);
                if (checkElementArray[checkKeys[i]] === "partialSelection")
                    queryId.find("#" + checkKeys[i]).addClass("flaticon-arrow");
            }
        }
        e.stopPropagation();
    });

});

function renderProtectionAssociationViewData(selector, isBiview) {
    $("#saveData").show();
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, viewClass;
    let src_hotlinkId = selector.attr("id");
    let src_id = selector.closest(".innerDesktop").attr("id");
    let associationViewDivId = backing.view_type.protection_association_view.name + "_" + src_hotlinkId;
    let uniqueId = selector.attr("uniqueid");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let data = {};
    data.assetTypeId = element[ATTR.elementId];
    let isBusiness = (selector.attr("elementObjectType") === "business_asset_type") ? true : false;
    //check for space in screen
    let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.protection_association_view.key);
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
        searchClass = "biSearchElementTypeProtectedAssociationDropDown";
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "singleview";
        searchClass = "singleSearchElementTypeProtectedAssociationDropDown";
    }
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
    let renderFunction = (isBusiness) ? service.getProtectedByAssociationsForBusinessAssetType : service.getProtectedByAssociationsForAssetType;
    renderFunction(data, function (orgRes, err) {
        if (orgRes) {
            if (orgRes.children !== undefined) {
                let res = appendingAsChildobject(element, orgRes);
                generateUniqueIdAndParentLink(res, "associationView", null);
                sortChildrenAlphbetically(res);
                renderSingleProtectionAssociationView(res, associationViewDivId, element, isBiview, isBusiness);
                if (res[ATTR.children])
                    renderDirectoryViewForProtectionAssociationView(res, associationViewDivId, viewClass, true);
                if (active_desktop_directory_view_id === src_id)
                    createScenarioViewOpenedFromAnchorSingleCase(associationViewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.protection_association_view.key, "Create Links: " + element[ATTR.name], uniqueId, isBiview, res);
                else
                    createScenarioViewOpenedFromView(associationViewDivId, src_id, src_hotlinkId, backing.view_type.protection_association_view.key, "Create Links: " + element[ATTR.name], uniqueId, isBiview, res);
                let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                if (objectTypesAndElementTypes) {
                    renderObjectTypesAndElementTypesDropDownProtectionAssociation(objectTypesAndElementTypes, associationViewDivId, searchClass, "protectedAssociationSearchObject_ElementTypeItem");
                }
                repositionViews(isBiview);
                highlightSourceAndView(associationViewDivId, isBiview);
                $("#saveData").hide();

            }
            else {
                alert("No Expressions to Create links");
            }
            $("#saveData").hide();
        }
        else if (err) {

            errorHandler(err);
        }
    });
}

function renderSingleProtectionAssociationView(res, viewName, element, isBiview, isBusiness) {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, viewClass, closeBtnClass, searchDropDownSelected,
        searchDropDown, customSearchDropDownSelected, customSearchDropDown;
    if (isBiview) {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "biview";
        closeBtnClass = "biviewCloseBtn";
        searchDropDownSelected = "biSearchElementTypeProtectedAssociationSelected";
        searchDropDown = "biSearchElementTypeProtectedAssociationDropDown";
        customSearchDropDownSelected = "biCustomSearchElementTypeProtectedAssociationSelected";
        customSearchDropDown = "biCustomSearchElementTypeProtectedAssociationDropDown";
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "singleview";
        closeBtnClass = "singleviewCloseBtn";
        searchDropDownSelected = "singleSearchElementTypeProtectedAssociationSelected";
        searchDropDown = "singleSearchElementTypeProtectedAssociationDropDown";
        customSearchDropDownSelected = "singleCustomSearchElementTypeProtectedAssociationSelected";
        customSearchDropDown = "singleCustomSearchElementTypeProtectedAssociationDropDown";

    }
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    let str = "";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop associationViewDesktop\" view=\"" + viewClass + "\" uniqueid=\"" + element.uniqueId + "\" isBusiness=\"" + isBusiness + "\">" +
        "<div class=\"headerWrapper\"><div class=\"panel-header-container " + viewClass + "\">" +
        "<span class=\"flaticon-arrow findSourceHotlink\" title=\"Show Source Hotlink\"><span class=\"flaticon-expression-element subscriptIcon\"></span></span>" +
        "<span class=\"panel-header\">CREATE LINKS</span>" +
        "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + closeBtnClass + "\" id=\"closeAssociationView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>";
    str += "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>";
    str += "<span class=\"fright sortIcon sortProtectionAssociation flaticon-sort\" title=\"Sort\"></span>";
    str += "</div>";
    str += "<div class=\"desktop-selector-container " + viewClass + "\" style=\"color:#000;\">" +
        "<div class=\"desktop-selector-dropdown equalBy2 fleft\">" +
        "<label class=\"labelText\">Between</label>" +
        "</div>" +
        "<span class=\"iconWrapper\">" + objectTypeIcon + "</span>" +
        "<span class=\"typeIcon\" title=\"" + element.name.toUpperCase() + "\">" + element.name.toUpperCase() +
        "</span></div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\" style=\"color:#000;\">" +
        "<span class=\"flaticon-turn-right newLine\"></span>" +
        "<div class=\"desktop-selector-dropdown equalBy2 fleft\">" +
        "<label class=\"labelText\">and</label>" +
        "</div>" +
        "<span class=\"linkingIcon flaticon-expression-element\">EXPRESSION</span></div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\">" +
        "<div class=\"selectorLabel fleft\">" +
        "<span class=\"protectionAssocShort assoc-exp-mode\">SHORT</span>" +
        "<span>|</span>" +
        "<span class=\"protectionAssocExpand assoc-exp-mode active\">EXPANDED</span>" +
        "</div>" +
        "<span class=\"flaticon-search openSearch fright hideAndShowSearch\" title=\"Show Search Bar\"></span>" +
        "<span class=\"headerActionButton protectionMap\">SAVE</span>" +
        "</div>" +
        "<div class=\"searchWrapper\"><div class=\"desktop-selector-container desktop-searchSelector-container\">" +
        "<span class=\"flaticon-search search\"></span><input class=\"search-keyword fleft\" placeholder=\"Search\">" +
        "<div class=\"desktop-selector-dropdown equalBy3 fleft\">" +
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
        "<span>  | </span>" +
        "<span class=\"haveSearch customSearchSelector\">HAVE</span>" +
        "<span>  | </span>" +
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
        str += "<div class=\"treeContainerAssociationView treeContainer\">" +
            "<div class=\"tree_structure_parent\">" +
            "<ul class=\"directoryView_ringList clearfix directoryViewList directoryViewList_DV directoryViewUl\" id=\"" + viewName + "_association_tree_container\"></ul>" +
            "</div>" +
            "</div>";
    }


    str += "</div>";
    $("#" + desktopId).append(str);
}

function renderDirectoryViewForProtectionAssociationView(data, viewId, view, isFull) {
    let isBiview = isBiViewOrNot(view);
    let associationViewId = viewId + "_association_tree_container";
    if (isFull) {
        renderDirectoryView(data, associationViewId, view, "protectionAssociationView_full", isBiview);
    }
    else
        renderDirectoryView(data, associationViewId, view, "protectionAssociationView", isBiview);
}

function renderObjectTypesAndElementTypesDropDownProtectionAssociation(objects, src_id, selectorDropDownClass, liElementClass) {
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
        searchDropDownSelected = "singleSearchElementTypeProtectedAssociationSelected";
        dropDownClass = "singleSearchElementTypeProtectedAssociationDropDown";
    }
    else if (desktop.attr("view") === "biview") {
        searchDropDownSelected = "biSearchElementTypeProtectedAssociationSelected";
        dropDownClass = "biSearchElementTypeProtectedAssociationDropDown";
    }
    let $selectedId = desktop.find("." + searchDropDownSelected);
    let $dropDown = desktop.find("." + dropDownClass);
    let selectedElement = desktop.find("." + dropDownClass).find("ul:first li:first");
    searchObjectElementClickProtectionAssociation(selectedElement, $selectedId, $dropDown, desktop, "protectedAssociationCustomSearchObject_ElementTypeItem");

}

function renderCustomSearchDropDownProtectionAssociation(randomId, desktop, liElementClass) {
    let $selectorDropDownId, $selectorId;
    let str = "";
    let isHaveNoSelected = false;
    if (desktop.attr("view") === "singleview") {
        $selectorDropDownId = desktop.find(".singleCustomSearchElementTypeProtectedAssociationDropDown");
        $selectorId = desktop.find(".singleCustomSearchElementTypeProtectedAssociationSelected");
    }
    else if (desktop.attr("view") === "biview") {
        $selectorDropDownId = desktop.find(".biCustomSearchElementTypeProtectedAssociationDropDown");
        $selectorId = desktop.find(".biCustomSearchElementTypeProtectedAssociationSelected");
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
            customSearchObjectElementClickProtectionAssociation($selectorDropDownId.find("ul:first li:first"), $selectorId, $selectorDropDownId);
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

function customSearchObjectElementClickProtectionAssociation(selectedElement, selectedId, dropDownId) {
    selectedId.html(selectedElement.html());
    selectedId.removeAttr("randomId");
    selectedId.attr("randomId", selectedElement.attr("randomId"));
    selectedId.closest(".innerDesktop").find(".search-keyword").keyup();
    dropDownId.addClass("dis-none");
}

function searchObjectElementClickProtectionAssociation(selectedElement, selectedId, dropDownClass, desktop, liElementClass) {
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
    renderCustomSearchDropDownProtectionAssociation(selectedElement.attr("randomId"), desktop, liElementClass);
}
