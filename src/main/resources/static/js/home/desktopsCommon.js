$(document).ready(function () {
    $(document).on("click", ".sortAnchor", function () {
        let side = $(this).closest(".innerDesktop").attr("side");
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
        if (side === "right") {
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        }
        else {
            activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
            activeDesktopKeyname = backing.singleview.active_desktop.keyname;
            activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        }
        if ($(this).hasClass("unSortAnchor")) {
            activeDesktop.sortBy = true;
            $(this).removeClass("unSortAnchor");
            $(this).addClass("active");
        }
        else {
            activeDesktop.sortBy = false;
            $(this).addClass("unSortAnchor");
            $(this).removeClass("active");
        }
        activeDesktop.utilsFunction.getDirectoryView();
    });

    $(document).on("click", ".viewsDropDown", function (e) {
        let dropDownContent = $(this).children(".viewsDropDownContent");
        let isDisplayNone = dropDownContent.hasClass("dis-none");
        $(".viewsDropDownContent").addClass("dis-none");
        if (isDisplayNone)
            dropDownContent.removeClass("dis-none");
        else
            dropDownContent.addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".ViewsDropDownLi", function (e) {
        let viewIdToReorder = $(this).attr("viewId");
        $(this).closest(".viewsDropDownContent").toggleClass("dis-none");
        let view = $("#" + viewIdToReorder).closest(".innerDesktop").attr("view");
        if (view === "singleview") {
            unshiftPassedViewIdObjInOpenedViews(false, viewIdToReorder);
            repositionViews(false);
        }
        else {
            unshiftPassedViewIdObjInOpenedViews(true, viewIdToReorder);
            repositionViews(true);
        }
        applyEventsToActiveScreens();
        e.stopPropagation()
    });

    $(document).on("click", ".closeViewFromMenu", function (e) {
        let id = $(this).parent(".ViewsDropDownLi").attr("viewId");
        let innerDesktop = $("#" + id).closest(".innerDesktop");
        let view = innerDesktop.attr("view");
        $(this).closest(".viewsDropDownContent").addClass("dis-none");
        innerDesktop.remove();
        if (view === "singleview")
            closeViewUpdateOpenedViews(id, false);
        else
            closeViewUpdateOpenedViews(id, true);
        e.stopPropagation()
    });

    $(document).on("click", ".desktop-selector-dropdown", function (e) {
        let desktopSelector = $(this);
        const innerDesktop = $(this).closest(".innerDesktop");
        let dropDownContent = desktopSelector.find(".desktop-selector-dropdown-content");
        let isDisplayNone = dropDownContent.hasClass("dis-none");
        $(".desktop-selector-dropdown-content").addClass("dis-none");
        if (isDisplayNone) {
            $(this).closest(".innerDesktop");
            let activeDesktop = getActiveDesktop(undefined, innerDesktop.attr("side"));
            if(activeDesktop.selector.expression_dropdown_id == dropDownContent.attr("id")) {
                fetchAndApplyLinkToPreferences(dropDownContent, activeDesktop, () => {dropDownContent.removeClass("dis-none");});
            } else if(activeDesktop.selector.shield_dropdown_id == dropDownContent.attr("id")){
                fetchAndApplyShieldDefaultsOnHtml(dropDownContent, activeDesktop, () => {dropDownContent.removeClass("dis-none");});
            } else {
                dropDownContent.removeClass("dis-none");
            }
        }
        else
            dropDownContent.addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".hideSearch", function (e) {
        $(this).closest(".innerDesktop").find(".searchWrapper").addClass("dis-none");
        $(this).closest(".innerDesktop").find(".openSearch,.clearSearch").removeClass("dis-none");
        modifyContainerHeight($(this).closest(".innerDesktop"));
        e.stopPropagation();
    });

    $(document).on("click", ".openSearch", function (e) {
        $(this).closest(".innerDesktop").find(".searchWrapper").removeClass("dis-none");
        $(this).closest(".innerDesktop").find(".openSearch,.searchClear").addClass("dis-none");
        modifyContainerHeight($(this).closest(".innerDesktop"));
        e.stopPropagation();
    });

    $(document).on("click", ".hideAttribute", function (e) {
        $(this).closest(".innerDesktop").find(".desktop-attribute-wrapper").addClass("dis-none");
        $(this).closest(".innerDesktop").find(".openAttribute").removeClass("dis-none");
        modifyContainerHeight($(this).closest(".innerDesktop"));
        e.stopPropagation();
    });

    $(document).on("click", ".openAttribute", function (e) {
        $(this).closest(".innerDesktop").find(".desktop-attribute-wrapper").removeClass("dis-none");
        $(this).closest(".innerDesktop").find(".openAttribute").addClass("dis-none");
        modifyContainerHeight($(this).closest(".innerDesktop"));
        e.stopPropagation();
    });

    $(document).on("click", ".hidePerspective", function (e) {
        $(this).closest(".innerDesktop").find(".desktop-perspective-selector-container").addClass("dis-none");
        $(this).closest(".innerDesktop").find(".openPerspective").removeClass("dis-none");
        modifyContainerHeight($(this).closest(".innerDesktop"));
        e.stopPropagation();
    });

    $(document).on("click", ".openPerspective", function (e) {
        let isBiview;
        $(this).closest(".innerDesktop").find(".desktop-perspective-selector-container").removeClass("dis-none");
        $(this).closest(".innerDesktop").find(".openPerspective").addClass("dis-none");
        let desktop = $(this).closest(".innerDesktop");
        if (desktop.attr("side") === "left") {
            isBiview = false;
        }
        if (desktop.attr("side") === "right") {
            isBiview = true;
        }
        let activeDesktop = getActiveDesktop(isBiview);
        reOrderPerspective(isBiview, activeDesktop);
        modifyContainerHeight(desktop);
        e.stopPropagation();
    });

    $(document).on("click", ".singlePerspectiveSelection", function (e) {
        $("#saveData").show();
        let desktop = $(this).closest(".innerDesktop");
        let isBiview;
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
        modifyContainerHeight(desktop);
        if (desktop.attr("side") === "left") {
            isBiview = false;
            activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
            activeDesktopKeyname = backing.singleview.active_desktop.keyname;
            activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        }
        if (desktop.attr("side") === "right") {
            isBiview = true;
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        }
        desktop.find(".perspectivesSelector").addClass("dis-none");
        desktop.find(".perspectiveModeSelector").removeClass("active");
        $(this).addClass("active");
        desktop.find(".desktop-perspective-selector-container .compositeColorPicker").prop("disabled", true);
        desktop.find(".desktop-perspective-selector-container .compositeColorPicker").addClass("dis-none");
        desktop.find(".perspectivesSelector").removeClass("activated");
        activeDesktop.perspectivesSelected = [];
        let selectedPerspectives = [];
        let count = 0;
        desktop.find(".perspectiveUl").find(".perspectiveItem").each(function (i) {
            if ($(this).hasClass("selected")) {
                if (count > 0) {
                    $(this).removeClass("selected");
                    let defaultColor = $(this).attr("defaultColor");
                    $(this).attr("style", "background-color:" + defaultColor);
                }
                else {
                    let persColor = $(this).attr("persColor");
                    $(this).attr("style", "background-color:" + persColor);
                    selectedPerspectives.push($(this).attr("elementId"));
                }
                count++;
            }
            else {

            }
        });
        activeDesktop.perspectivesSelected = selectedPerspectives;
        if (isBiview) {
            let event = {"key": backing.event_type.perspective_selection_changed_biview.key};
            propagateEventForAssetDeliversRulerType(event, true);
            $("#saveData").hide();
        }
        else {
            let event = {"key": backing.event_type.perspective_selection_changed_singleview.key};
            propagateEventForAssetDeliversRulerType(event, false);
            $("#saveData").hide();
        }
        e.stopPropagation();
    });

    $(document).on("click", ".compositePerspectiveSelection", function (e) {
        $("#saveData").show();
        let desktop = $(this).closest(".innerDesktop");
        modifyContainerHeight(desktop);
        let selectedPerspectives = [];
        let isBiview;
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
        if (desktop.attr("side") === "left") {
            isBiview = false;
            activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
            activeDesktopKeyname = backing.singleview.active_desktop.keyname;
            activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        }
        if (desktop.attr("side") === "right") {
            isBiview = true;
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        }
        desktop.find(".perspectivesSelector").removeClass("dis-none");
        desktop.find(".desktop-perspective-selector-container .compositeColorPicker").prop("disabled", false);
        desktop.find(".desktop-perspective-selector-container .compositeColorPicker").removeClass("dis-none");
        let compositeColor = desktop.find(".desktop-perspective-selector-container .compositeColorPicker").val();
        desktop.find(".perspectivesSelector").addClass("activated");
        desktop.find(".perspectiveModeSelector").removeClass("active");
        $(this).addClass("active");
        activeDesktop.perspectivesSelected = [];

        desktop.find(".desktop-perspective-selector-container").find(".perspectiveSelectorEvaluationItem").each(function () {
            $(this).find("input").prop('checked', true);
            let persColor = $(this).attr("persColor");
            $(this).attr("style", "background-color:" + persColor);

        });
        desktop.find(".perspectiveUl").find(".perspectiveItem").each(function () {
            $(this).addClass("selected");
            // let persColor = $(this).attr("persColor");
            $(this).attr("style", "background-color:" + compositeColor);
            selectedPerspectives.push($(this).attr("elementId"));
        });
        activeDesktop.perspectivesSelected = selectedPerspectives;
        if (isBiview) {
            let event = {"key": backing.event_type.perspective_selection_changed_singleview.key};
            propagateEventForAssetDeliversRulerType(event, false);
            $("#saveData").hide();
        }
        else {
            let event = {"key": backing.event_type.perspective_selection_changed_singleview.key};
            propagateEventForAssetDeliversRulerType(event, false);
            $("#saveData").hide();
        }
        e.stopPropagation();
    });

    $(document).on("change", ".compositeColorPicker", function (e) {
        $("#saveData").show();
        let desktop = $(this).closest(".innerDesktop");
        let compositeColor = $(this).val();
        desktop.find(".perspectiveUl").find(".perspectiveItem").each(function (i) {
            if ($(this).hasClass("selected")) {
                $(this).attr("style", "background-color:" + compositeColor);
            }
        });
        if (desktop.attr("side") === "left") {
            let event = {"key": backing.event_type.composite_color_change_single.key};
            propagateEventForAssetDeliversRulerType(event, false);

        }
        if (desktop.attr("side") === "right") {
            let event = {"key": backing.event_type.composite_color_change_biview.key};
            propagateEventForAssetDeliversRulerType(event, true);
        }
        e.stopPropagation();
    });

    $(document).on("click", ".perspectiveItem", function (e) {
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
        let desktop = $(this).closest(".innerDesktop");
        let isBiview, singlePerspectiveSelection, compositePerspectiveSelection, perspectiveContentId;
        if (desktop.attr("side") === "left") {
            isBiview = false;
            activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
            activeDesktopKeyname = backing.singleview.active_desktop.keyname;
            activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
            singlePerspectiveSelection = "singlePerspectiveSelection";
            compositePerspectiveSelection = "compositePerspectiveSelection";
            perspectiveContentId = activeDesktop.selector.perspectives_dropdown_id;
        }
        if (desktop.attr("side") === "right") {
            isBiview = true;
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
            singlePerspectiveSelection = "singlePerspectiveSelection";
            compositePerspectiveSelection = "compositePerspectiveSelection";
            perspectiveContentId = activeDesktop.selector.perspectives_dropdown_id;
        }
        let perspectivesId = [];
        let compositeColor = desktop.find(".desktop-perspective-selector-container .compositeColorPicker").val();
        if (desktop.find("." + singlePerspectiveSelection).hasClass("active")) {
            desktop.find(".perspectiveUl").find(".perspectiveItem").each(function () {
                let defaultColor = $(this).attr("defaultColor");
                $(this).removeClass("selected");
                $(this).attr("style", "background-color:" + defaultColor);
            });
            $(this).addClass("selected");
            let persColor = $(this).attr("persColor");
            $(this).attr("style", "background-color:" + persColor);
            perspectivesId.push($(this).attr("elementId"));
        }
        else if (desktop.find("." + compositePerspectiveSelection).hasClass("active")) {
            $(this).toggleClass("selected");
            desktop.find(".perspectiveUl").find(".perspectiveItem").each(function () {
                if ($(this).hasClass("selected")) {
                    $(this).attr("style", "background-color:" + compositeColor);
                    perspectivesId.push($(this).attr("elementId"));
                }
                else {
                    let defaultColor = $(this).attr("defaultColor");
                    // let defaultColor = "#fff";
                    $(this).attr("style", "background-color:" + defaultColor);
                }
            });
            if (perspectivesId < 1) {
                $(this).toggleClass("selected");
                alert("One Perspective must always be in selection");
                return;
            }
            desktop.find("#" + perspectiveContentId).find(".perspectiveSelectorEvaluationItem").each(function () {
                let dropDefaultColor = $(this).attr("defaultColor");
                let dropPersColor = $(this).attr("persColor");
                for (let i = 0; i < perspectivesId.length; i++) {
                    if ($(this).attr("elementId") === perspectivesId[i]) {
                        $(this).find("input").prop('checked', true);
                        $(this).attr("style", "background-color:" + dropPersColor);
                        return;
                    }
                }
                $(this).find("input").prop('checked', false);
                $(this).attr("style", "background-color:" + dropDefaultColor);
            });
        }
        activeDesktop.perspectivesSelected = perspectivesId;
        if (isBiview) {
            if (activeDesktop) {
                let event = {"key": backing.event_type.perspective_selection_changed_biview.key};
                propagateEventForAssetDeliversRulerType(event, true);
                $("#saveData").hide();
            }
        }
        else {
            if (activeDesktop) {
                let event = {"key": backing.event_type.perspective_selection_changed_singleview.key};
                propagateEventForAssetDeliversRulerType(event, false);
                $("#saveData").hide();
            }
        }
        let event2 = {"key": backing.event_type.selector_change.key};
        propagateEvent(event2);
        e.stopPropagation();
    });

    $(document).on("click", ".applyPerspective", function (e) {
        let desktop = $(this).closest(".innerDesktop");
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
        let isBiview;
        if (desktop.attr("side") === "left") {
            isBiview = false;
            activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
            activeDesktopKeyname = backing.singleview.active_desktop.keyname;
            activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);

        }
        if (desktop.attr("side") === "right") {
            isBiview = true;
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);

        }
        let desktopSelector = $(this).closest(".desktop-selector-dropdown-content");
        let data = {};
        let selectedPerspectives = [];
        desktopSelector.find(".perspectiveSelectorEvaluationItem").each(function () {
            if ($(this).find("input").is(":checked")) {
                selectedPerspectives.push($(this).attr("elementId"));
            }
        });
        if (selectedPerspectives.length < 1) {
            alert("Please select atleast one perspective");
            return;
        }
        let compositeColor = desktop.find(".desktop-perspective-selector-container .compositeColorPicker").val();

        data.perspectiveIds = selectedPerspectives;
        data.shieldId = desktop.find(".shieldSelector").attr("elementId");
        data.shieldElementGroupId = desktop.find(".groupSelector").attr("elementId");
        data.level = desktop.find(".levelSelector").attr("elementId");
        let perspectivesContainerId = activeDesktop.selector.perspective_container;
        desktop.find("#" + perspectivesContainerId).find(".perspectiveItem").each(function () {
            $(this).removeClass("selected");
            let defaultColor = $(this).attr("defaultColor");
            $(this).attr("style", "background-color:" + defaultColor);
        });
        desktop.find("#" + perspectivesContainerId).find(".perspectiveItem").each(function () {
            for (let i = 0; i < selectedPerspectives.length; i++) {
                if ($(this).attr("elementId") === selectedPerspectives[i]) {
                    $(this).addClass("selected");
                    $(this).attr("style", "background-color:" + compositeColor);
                }
            }
        });
        $("#saveData").show();
        var callbackfn = function (res, err) {
            if (res) {

                if (isBiview) {
                    activeDesktop.perspectivesSelected = data.perspectiveIds;
                    let directoryViewTreeId = activeDesktop.tree_container_id;
                    if (activeDesktop) {
                        generateUniqueIdAndParentLink(res, activeDesktop.div_id, null);
                        backing.biview.dvDataUseAttr = res;
                        let event = {"key": backing.event_type.perspective_selection_changed_biview.key};
                        propagateEventForAssetDeliversRulerType(event, true);
                        //   renderDirectoryView(res, directoryViewTreeId, "biview", "anchorView", false);
                        $("#saveData").hide();
                    }
                }
                else {

                    activeDesktop.perspectivesSelected = data.perspectiveIds;
                    let directoryViewTreeId = activeDesktop.tree_container_id;
                    if (activeDesktop) {
                        generateUniqueIdAndParentLink(res, activeDesktop.div_id, null);
                        backing.singleview.dvDataUseAttr = res;
                        let event = {"key": backing.event_type.perspective_selection_changed_singleview.key};
                        propagateEventForAssetDeliversRulerType(event, false);
                        // renderDirectoryView(res, directoryViewTreeId, "singleview", "anchorView", false);
                        $("#saveData").hide();
                    }
                }
            }
            else if (err) {
                $("#saveData").hide();
            }
        };
        if(!backing.isDirectMode)
            service.getAssetDeliversRulerTypeDv(data, callbackfn);
        else
            service.getAssetImplementsRulerTypeDv(data, callbackfn);
        desktopSelector.addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("mouseenter", ".perspectiveItem,.perspectiveSelectorEvaluationItem", function (e) {
        let persColor = $(this).attr("persColor");
        $(this).attr("style", "background-color:" + persColor);
        e.stopPropagation();
    });

    $(document).on("mouseleave", ".perspectiveItem", function (e) {
        let compositePerspectiveSelection;
        let desktop = $(this).closest(".innerDesktop");
        let persColor = $(this).attr("persColor");
        if (desktop.attr("side") === "left") {
            compositePerspectiveSelection = "compositePerspectiveSelection";
        }
        if (desktop.attr("side") === "right") {
            compositePerspectiveSelection = "compositePerspectiveSelection";
        }
        let compositeColor = desktop.find(".desktop-perspective-selector-container .compositeColorPicker").val();
        let defaultColor = $(this).attr("defaultcolor");
        if ($(this).hasClass("selected")) {
            if (desktop.find("." + compositePerspectiveSelection).hasClass("active")) {
                $(this).attr("style", "background-color:" + compositeColor);
            }
            else
                $(this).attr("style", "background-color:" + persColor);
        }
        else {
            $(this).attr("style", "background-color:" + defaultColor);
        }
        e.stopPropagation();
    });

    $(document).on("mouseleave", ".perspectiveSelectorEvaluationItem", function (e) {
        let persColor = $(this).attr("persColor");
        let defaultColor = $(this).attr("defaultcolor");
        if ($(this).find("input").is(":checked")) {
            $(this).attr("style", "background-color:" + persColor);
        }
        else {
            $(this).attr("style", "background-color:" + defaultColor);
        }
        e.stopPropagation();
    });

    $(document).on("click", ".perspectiveSelectorEvaluationItem", function (e) {
        let checkBoxes = $(this).find("input");
        checkBoxes.prop("checked", !checkBoxes.prop("checked"));
        e.stopPropagation();
    });

    $(document).on("click", ".perspectiveSelectorEvaluationItem input", function (e) {
        let checkBoxes = $(this);
        checkBoxes.prop("checked", !checkBoxes.prop("checked"));
        e.stopPropagation();

    });

    $(document).on("click", ".singlePerspectiveSelectionInBiview", function () {
        $("#saveData").show();
        let desktop = $(this).closest(".innerDesktop");
        desktop.find(".perspectiveModeSelector").removeClass("active");
        $(this).addClass("active");
        desktop.find(".perspectivesSelector").removeClass("activated");
        let data = {};
        let selectedPerspectives = [];
        let count = 0;
        desktop.find(".perspectivesSelector").addClass("dis-none");
        desktop.find(".perspectiveUl").find(".perspectiveItem").each(function () {
            if ($(this).hasClass("selected")) {
                if (count > 0) {
                    $(this).removeClass("selected");
                    let defaultColor = $(this).attr("defaultColor");
                    $(this).attr("style", "background-color:" + defaultColor);
                }
                else
                    selectedPerspectives.push($(this).attr("elementId"));
                count++;
            }
        });
        data.perspectiveIds = selectedPerspectives;
        data.shieldId = desktop.find(".shieldSelector").attr("elementId");
        data.shieldElementGroupId = desktop.find(".groupSelector").attr("elementId");
        data.level = desktop.find(".levelSelector").attr("elementId");
        var callbackfn = function (res, err) {
            if (res) {
                let activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
                let activeDesktopKeyname = backing.biview.active_desktop.keyname;
                let activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
                activeDesktop.perspectivesSelected = data.perspectiveIds;
                let directoryViewTreeId = activeDesktop.tree_container_id;
                if (activeDesktop) {
                    generateUniqueIdAndParentLink(res, activeDesktop.div_id, null);
                    backing.biview.dvDataUseAttr = res;
                    let oldExpansionState = getExpansionStateOfElements(directoryViewTreeId);
                    renderDirectoryView(res, directoryViewTreeId, "biview", "anchorView", true);
                    applyExpansionState(oldExpansionState, directoryViewTreeId);
                    $("#saveData").hide();
                }
            }
            else if (err) {
                $("#saveData").hide();
            }
        };
        if(!backing.isDirectMode)
            service.getAssetDeliversRulerTypeDv(data, callbackfn);
        else
            service.getAssetImplementsRulerTypeDv(data, callbackfn);

    });

    $(document).on("click", ".perspectiveSelectorEvaluationItem", function (e) {
        let checkBoxes = $(this).find("input");
        checkBoxes.prop("checked", !checkBoxes.prop("checked"));
        e.stopPropagation();
    });

    $(document).on("click", ".perspectiveSelectorEvaluationItem input", function (e) {
        let checkBoxes = $(this);
        checkBoxes.prop("checked", !checkBoxes.prop("checked"));
        e.stopPropagation();
    });

    $(document).on("click", ".biShieldSelectorShieldRulerItem", function (e) {
        evalLufId=$(this).attr("elementId");
        let shieldElementRulerTypeDesktopUtils = new BiViewShieldElementRulerTypeDesktopUtils();
        shieldElementRulerTypeDesktopUtils.shieldSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biLevelSelectorShieldRulerItem", function (e) {
        let shieldElementRulerTypeDesktopUtils = new BiViewShieldElementRulerTypeDesktopUtils();
        shieldElementRulerTypeDesktopUtils.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biGroupSelectorShieldRulerItem", function (e) {
        let shieldElementRulerTypeDesktopUtils = new BiViewShieldElementRulerTypeDesktopUtils();
        shieldElementRulerTypeDesktopUtils.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biEvalSearchObject_ShieldElementTypeItem", function (e) {
        let rulerTypeDesktopUtil = new BiViewShieldElementRulerTypeDesktopUtils();
        let dropDownId = "bi_shield_element_r_type_desk_search_dropdown_content";
        let selectedId = "bi_shield_element_r_type_desk_search_dropdown_selected";
        rulerTypeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biEvalCustomSearchObject_ShieldElementTypeItem", function (e) {
        let dropDownId = "bi_shield_element_r_type_desk_custom_search_dropdown_content";
        let selectedId = "bi_shield_element_r_type_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biSearchMinIndexShieldElementItem", function (e) {
        let rulerTypeDesktopUtil = new BiViewShieldElementRulerTypeDesktopUtils();
        rulerTypeDesktopUtil.minIndexSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biSearchMaxIndexShieldElementItem", function (e) {
        let rulerTypeDesktopUtil = new BiViewShieldElementRulerTypeDesktopUtils();
        rulerTypeDesktopUtil.maxIndexSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biOrgSearchObject_ElementTypeItem", function (e) {
        let OrganisationalUnitDesktopUtil = new BiViewOrganisationalUnitDesktopUtils();
        let dropDownId = "bi_organisational_unit_desk_search_dropdown_content";
        let selectedId = "bi_organisational_unit_desk_search_dropdown_selected";
        OrganisationalUnitDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biOrgCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_organisational_unit_desk_custom_search_dropdown_content";
        let selectedId = "bi_organisational_unit_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });
});

function localeCompareForNumbers_(a, b) {
    try {
        if(a && b) {
            a = parseInt(a);
            b = parseInt(b);
            if (a > b) return 1;
            else if (a < b) return -1;
            else return 0;
        }
    } catch(err) {}
    return 0;
}

const objectTypeRankDict = {
    "asset_type": 1,
    "asset": 2,
    "business_asset_type": 3,
    "business_asset": 4,
    "shield": 5,
    "standard": 6,
    "b_framework": 7,
    "threat": 8
}

function localeCompareForObjectType_(a, b) {
    try {
        let aRank = objectTypeRankDict[a];
        let bRank = objectTypeRankDict[b];
        if(!aRank)
            aRank = 10;
        if(!bRank)
            bRank = 10;
        return localeCompareForNumbers_(aRank, bRank);
    } catch(err) {}
    return 0;
}

function fetchAndApplyLinkToPreferences(dropDownContent, activeDesktop, cb) {
    prin("fetchAndApplyLinkToPreferences");
    const data = {};
    data.isDirect = backing.isDirectMode;
    data.shieldIdOne = 0;
    if(activeDesktop.key == "classification_map_mode_desktop" || activeDesktop.key == "bi_classification_map_mode_desktop") {
        data.shieldIdOne = parseInt($(`#${activeDesktop.selector.shield_dropdown_selected_id}`).attr("elementId"));
        data.objectTypeOne = "shield";
    } else if (activeDesktop.key == "standard_map_mode_desktop" || activeDesktop.key == "bi_standard_map_mode_desktop") {
        data.shieldIdOne = parseInt($(`#${activeDesktop.selector.shield_dropdown_selected_id}`).attr("elementId"));
        data.objectTypeOne = "standard";
    } else if (activeDesktop.key == "business_map_mode_desktop" || activeDesktop.key == "bi_business_map_mode_desktop") {
        data.shieldIdOne = parseInt($(`#${activeDesktop.selector.shield_dropdown_selected_id}`).attr("elementId"));
        data.objectTypeOne = "b_framework";
    } else if (activeDesktop.key == "threat_map_mode_desktop" || activeDesktop.key == "bi_threat_map_mode_desktop") {
        data.shieldIdOne = parseInt($(`#${activeDesktop.selector.shield_dropdown_selected_id}`).attr("elementId"));
        data.objectTypeOne = "threat";
    } else if (activeDesktop.key == "asset_type_map_mode_desktop" || activeDesktop.key == "bi_asset_type_map_mode_desktop") {
        data.objectTypeOne = "asset_type";
    } else if (activeDesktop.key == "asset_map_mode_desktop" || activeDesktop.key == "bi_asset_map_mode_desktop") {
        data.objectTypeOne = "asset";
    } else if (activeDesktop.key == "business_asset_type_map_mode_desktop" || activeDesktop.key == "bi_business_asset_type_map_mode_desktop") {
        data.objectTypeOne = "business_asset_type";
    } else if (activeDesktop.key == "business_asset_map_mode_desktop" || activeDesktop.key == "bi_business_asset_map_mode_desktop") {
        data.objectTypeOne = "business_asset";
    } else if (activeDesktop.key == "anz_expression_desktop" || activeDesktop.key == "bi_anz_expression_desktop") {
          data.objectTypeOne = "sce";
    } else {
        if(cb) cb();
        return;
    }
    console.log(data);
    prin("fetchAndApplyLinkToPreferences before getLinkToPrefs api call");
    serviceFunctions.getLinkToPrefs(data, (linkToPrefs) => {
        prin("fetchAndApplyLinkToPreferences received getLinkToPrefs api call response");
        /*
            linkToPrefs = [{shieldId: 0, objectType: "asset"}, {shieldId: 10, objectType: "standard"}]
        */
        const linkToPrefsHashSet = new Set();
        linkToPrefs.forEach(item => linkToPrefsHashSet.add(item.shieldId + item.objectType));

        ulResults = dropDownContent.children('ul');
        if(ulResults.length == 0)
            return;
        const ulItem = $(ulResults[0]);
        prin("fetchAndApplyLinkToPreferences starting with removing active flag")
        ulItem.find(".related-framework-action").removeClass("related-framework-action-active");
        prin("fetchAndApplyLinkToPreferences done with removing active flag")
        const liHtmlResults = ulItem.children();
        prin("fetchAndApplyLinkToPreferences received liItems");

        const liHtmlResultsArr = liHtmlResults.toArray();
        prin("fetchAndApplyLinkToPreferences converted liItems to array");
        liHtmlResultsArr.forEach(liArrItem => {
            const $liArrItem = $(liArrItem);
            if(linkToPrefsHashSet.has($liArrItem.attr("shieldid")+$liArrItem.attr("objecttype")))
                $liArrItem.find(".related-framework-action").addClass("related-framework-action-active");
        })
        prin("fetchAndApplyLinkToPreferences done with setting active fag ones And starting sort")

        const sortedLiArray = liHtmlResultsArr.sort(function(a, b) {
            a = $(a);
            b = $(b);
            const isAFlagged = linkToPrefsHashSet.has(a.attr("shieldid") + a.attr("objecttype"));
            const isBFlagged = linkToPrefsHashSet.has(b.attr("shieldid") + b.attr("objecttype"));

            if(isAFlagged && isBFlagged) {
            } else if(isAFlagged)
                return -1;
            else if(isBFlagged)
                return 1;
            if (a.attr("objecttype") === b.attr("objecttype"))
                return localeCompareForNumbers_(a.attr("shieldid"), b.attr("shieldid"));
            return localeCompareForObjectType_(a.attr("objecttype"),b.attr("objecttype"));
        });
        prin("fetchAndApplyLinkToPreferences done with sorting");

        ulItem.html($(sortedLiArray));
        prin("fetchAndApplyLinkToPreferences done with setting html to droopdown");
        if(cb) cb();
    });
}

function fetchAndApplyShieldDefaultsOnHtml(dropDownContent, activeDesktop, cb) {
    serviceFunctions.getDefaultShieldPrefs((defaultPrefs) => {
        ulResults = dropDownContent.children('ul');
         if(ulResults.length == 0)
            return;
         const ulItem = $(ulResults[0]);
         const liHtmlResults = ulItem.children();
         const shieldTypeName = getShieldTypeNameKey(activeDesktop);
         const defaultShieldIdSet = new Set(Object.values(defaultPrefs).filter(Number));

        const sortedLiArray = liHtmlResults.toArray().sort(function(a, b){
            a = $(a);
            b = $(b);
            if(a.hasClass("createShield") && b.hasClass("createShieldFromExcelImport"))
                return -1;
            else if(b.hasClass("createShield") && a.hasClass("createShieldFromExcelImport"))
                return 1;
            else if(a.hasClass("createShield") || a.hasClass("createShieldFromExcelImport"))
                return 1
            else if(b.hasClass("createShield") || b.hasClass("createShieldFromExcelImport"))
                return -1;
            if(defaultShieldIdSet.has(parseInt(a.attr("elementId"))) && defaultShieldIdSet.has(parseInt(b.attr("elementId")))) {
            } else if(defaultShieldIdSet.has(parseInt(a.attr("elementId"))))
                return -1;
            else if(defaultShieldIdSet.has(parseInt(b.attr("elementId"))))
                return 1;
            if (a.attr("objecttype") === b.attr("objecttype"))
                return localeCompareForNumbers_(a.attr("elementId"), b.attr("elementId"));
            return localeCompareForObjectType_(a.attr("objecttype"),b.attr("objecttype"));
        });
        ulItem.find(".default-framework-action").removeClass("default-framework-action-active");
        for(const shId of defaultShieldIdSet) {
            ulItem.find(".default-framework-action[shieldid="+shId+"]").addClass("default-framework-action-active");
        }
        ulItem.html($(sortedLiArray));
        if(cb) cb();
    });
}

function getExpansionStateOfElements(idOfSubTreeRootLi) {
    let expansionState = {};
    $("#" + idOfSubTreeRootLi).find(".whiteBgTriangle").each(function () {
        let keys = $(this).closest("li").attr("id");
        let value = $(this).find("span").hasClass("triangle_active");
        expansionState[keys] = value;
    });
    return expansionState;
}

function applyExpansionState(oldExpansionState, idOfSubTreeRootLi) {
    if (Object.keys(oldExpansionState).length !== 0)
        $("#" + idOfSubTreeRootLi).find(".whiteBgTriangle").each(function () {
            let keys = $(this).closest("li").attr("id");
            if (oldExpansionState[keys] === undefined)
                return;
            else if (oldExpansionState[keys]) {
                $(this).find("span").attr("class", "triangle_active fleft");
                $(this).closest("li").children("ul.directoryViewUlE").show();
            }
            else {
                $(this).find("span").attr("class", "triangle_deactive fleft");
                $(this).closest("li").children("ul.directoryViewUlE").hide();
            }

        });
}

function modifyContainerHeight(selectedWrapper) {
    let height = selectedWrapper.find(".headerWrapper").height();
    selectedWrapper.find(".treeContainer").attr("style", "height:calc(100% - " + height + "px);");
}

function getSingleActiveDesktop(workspaceKeyname, desktopKeyname) {
    return backing.singleview.workspaces[workspaceKeyname].desktops[desktopKeyname];
}

function getBiActiveDesktop(workspaceKeyname, desktopKeyname) {
    return backing.biview.workspaces[workspaceKeyname].desktops[desktopKeyname];
}

function getActiveDesktop(isBiview, view = "") {
    let backingView;
    if (isBiview || view === "biview" || view === "right")
        backingView = backing.biview;
    else if (!isBiview || view === "singleview" || view === "left")
        backingView = backing.singleview;
    return backingView.workspaces[backingView.active_workspace_keyname].desktops[backingView.active_desktop.keyname];
}

function getDesktopName(isBiview, view = "") {
    let backingView;
    if (isBiview || view === "biview" || view === "right")
        backingView = backing.biview;
    else if (!isBiview || view === "singleview" || view === "left")
        backingView = backing.singleview;
    return backingView.active_desktop.keyname;
}

function isBiViewOrNot(view) {
    if (view === "singleview" || view === "left") {
        return false;
    }
    else if (view === "biview" || view === "right") {
        return true;
    }
}

function getSingleOrBiView(isBiview) {
    if (isBiview || isBiview === "right") {
        return "biview";
    }
    else if (!isBiview || isBiview === "left") {
        return "singleview";
    }
}

function getDesktopDetails($this) {
    let desktop = $this.closest(".innerDesktop");
    let viewSide = desktop.attr("side");
    let view = (viewSide === "right") ? "biview" : "singleview";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let obj = {isBiview, activeDesktop};
    return obj;
}

function showHeader(view) {
    let workspace, desktop, workspace_icon, desktop_icon, desktop_subScriptIcon;
    if (view === "singleview") {
        if (backing.singleview.active_workspace_keyname) {
            workspace = backing.singleview.workspaces[backing.singleview.active_workspace_keyname].header_name;
            workspace_icon = backing.singleview.workspaces[backing.singleview.active_workspace_keyname].icon;
            let $workspaceSelectedIcon = $(".workspace-selected-icon");
            $(".workspace_selected").html(workspace.toUpperCase());
            $workspaceSelectedIcon.removeClass(function (index, className) {
                return (className.match(/(^|\s)flaticon-\S+/g) || []).join(' ');
            });
            $workspaceSelectedIcon.attr("title", "Selected Workspace: " + workspace);
            $workspaceSelectedIcon.removeClass("ss-tick");
            $workspaceSelectedIcon.addClass(workspace_icon);
            if (backing.singleview.active_desktop.keyname && backing.singleview.active_desktop.keyname !== null) {
                desktop = backing.singleview.workspaces[backing.singleview.active_workspace_keyname].desktops[backing.singleview.active_desktop.keyname].header_name;
                desktop_icon = backing.singleview.workspaces[backing.singleview.active_workspace_keyname].desktops[backing.singleview.active_desktop.keyname].icon;
                if(backing.singleview.active_desktop.keyname === backing.singleview.workspaces.eval_workspace.desktops.ruler_type_desktop.key
                    && backing.isDirectMode) {
                    desktop = "Security Asset Implements Control Link";
                    //desktop_icon =
                }
                let $desktopSelectedIcon = $(".desktop-selected-icon");
                desktop_subScriptIcon = backing.singleview.workspaces[backing.singleview.active_workspace_keyname].desktops[backing.singleview.active_desktop.keyname].subScriptIcon;
                $(".desktop_selected").html(desktop.toUpperCase());
                $desktopSelectedIcon.removeClass(function (index, className) {
                    return (className.match(/(^|\s)flaticon-\S+/g) || []).join(' ');
                });
                $desktopSelectedIcon.attr("title", "Selected Desktop: " + desktop);
                $desktopSelectedIcon.removeClass("ss-tick");
                $desktopSelectedIcon.addClass(desktop_icon);
                $(".desktop-selected-icon").removeClass("ss-tick");

                $(".desktop-selected-icon").addClass(desktop_icon);
                if (desktop_subScriptIcon && desktop_subScriptIcon !== undefined) {
                    $(".desktop-selected-icon").find(".subscriptIcon").removeClass(function (index, className) {
                        return (className.match(/(^|\s)flaticon-\S+/g) || []).join(' ');
                    });
                    $(".desktop-selected-icon").find(".subscriptIcon").addClass(desktop_subScriptIcon);
                }
            }
        }
    }
    else if (view === "biview") {
        if (backing.biview.active_workspace_keyname) {
            workspace = backing.biview.workspaces[backing.biview.active_workspace_keyname].header_name;
            workspace_icon = backing.biview.workspaces[backing.biview.active_workspace_keyname].icon;
            let $biWorkspaceSelectedIcon = $(".bi_workspace-selected-icon");
            $biWorkspaceSelectedIcon.addClass(workspace_icon);
            $biWorkspaceSelectedIcon.removeClass(function (index, className) {
                return (className.match(/(^|\s)flaticon-\S+/g) || []).join(' ');
            });
            $biWorkspaceSelectedIcon.attr("title", "Selected Workspace: " + workspace);
            $biWorkspaceSelectedIcon.removeClass("ss-tick");
            $biWorkspaceSelectedIcon.addClass(workspace_icon);
            $(".bi_workspace_selected").html(workspace.toUpperCase());
            if (backing.biview.active_desktop.keyname && backing.biview.active_desktop.keyname !== null) {
                desktop = backing.biview.workspaces[backing.biview.active_workspace_keyname].desktops[backing.biview.active_desktop.keyname].header_name;
                desktop_icon = backing.biview.workspaces[backing.biview.active_workspace_keyname].desktops[backing.biview.active_desktop.keyname].icon;
                if(backing.biview.active_desktop.keyname === backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop.key
                    && backing.isDirectMode) {
                    desktop = "Security Asset Implements Control Link";
                    //desktop_icon =
                }
                let $biDesktopSelectedIcon = $(".bi_desktop-selected-icon");
                $biDesktopSelectedIcon.addClass(desktop_icon);
                desktop_subScriptIcon = backing.biview.workspaces[backing.biview.active_workspace_keyname].desktops[backing.biview.active_desktop.keyname].subScriptIcon;
                $(".bi_desktop-selected-icon").addClass(desktop_icon);
                $(".bi_desktop-selected-icon").removeClass(function (index, className) {
                    return (className.match(/(^|\s)flaticon-\S+/g) || []).join(' ');
                });
                $biDesktopSelectedIcon.attr("title", "Selected Desktop: " + desktop);
                $biDesktopSelectedIcon.removeClass("ss-tick");
                $biDesktopSelectedIcon.addClass(desktop_icon);
                $(".bi_desktop_selected").html(desktop.toUpperCase());
                if (desktop_subScriptIcon && desktop_subScriptIcon !== undefined) {
                    $(".bi_desktop-selected-icon").find(".subscriptIcon").removeClass(function (index, className) {
                        return (className.match(/(^|\s)flaticon-\S+/g) || []).join(' ');
                    });
                    $(".bi_desktop-selected-icon").find(".subscriptIcon").addClass(desktop_subScriptIcon);
                }
            }
        }
    }
}

function areThereAnyEventsThatTrigger(event_types_that_trigger_true, events) {
    if (events && events.length !== 0 && event_types_that_trigger_true && event_types_that_trigger_true.length !== 0) {
        let len = events.length;
        for (let i = 0; i < len; i++) {
            if (events[i] && events[i].key && (event_types_that_trigger_true.indexOf(events[i].key) !== -1))
                return true;
        }
    }
    return false;
}

function EventTypeUtils() {
    let eventTypeUtil = new Object();

    function getShieldEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_shield.key);
        events.push(event_type.edited_shield.key);
        events.push(event_type.deleted_shield.key);
        return events;
    }

    function getShieldElementEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_shield_element.key);
        events.push(event_type.edited_shield_element.key);
        events.push(event_type.deleted_shield_element.key);
        return events;
    }

    function getShieldElementEventsWithoutCreate() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.edited_shield_element.key);
        events.push(event_type.deleted_shield_element.key);
        return events;
    }

    function getShieldElementTypeEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_shield_element_type.key);
        events.push(event_type.edited_shield_element_type.key);
        events.push(event_type.deleted_shield_element_type.key);
        return events;
    }

    function getStandardEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_standard.key);
        events.push(event_type.edited_shield.key); //shield EVents
        events.push(event_type.deleted_shield.key);
        events.push(event_type.deleted_standard.key);
        return events;
    }

    function getThreatEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_threat.key);
        events.push(event_type.created_threat_element_type.key);
        events.push(event_type.edited_shield.key); //shield EVents
        events.push(event_type.deleted_shield.key);
        events.push(event_type.deleted_threat.key);
        return events;
    }

    function getStandardElementEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_shield_element.key);
        events.push(event_type.edited_shield_element.key);
        events.push(event_type.deleted_standard_element.key);
        return events;
    }

    function getThreatElementEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_shield_element.key);
        events.push(event_type.edited_shield_element.key);
        events.push(event_type.deleted_threat_element.key);
        return events;
    }

    function getBusinessEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_Business.key);
        events.push(event_type.edited_shield.key);
        events.push(event_type.deleted_shield.key);
        events.push(event_type.deleted_standard.key);
        return events;
    }

    function getBusinessElementTypeEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_business_element_type.key);
        events.push(event_type.edited_shield_element_type.key);
        events.push(event_type.deleted_shield_element_type.key);
        return events;
    }

    function getBusinessElementEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_shield_element.key);
        events.push(event_type.edited_shield_element.key);
        events.push(event_type.deleted_business_control.key);
        return events;
    }

    function getStandardElementEventsWithoutCreate() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.edited_shield_element.key);
        events.push(event_type.deleted_shield_element.key);
        return events;
    }

    function getThreatElementEventsWithoutCreate() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.edited_shield_element.key);
        events.push(event_type.deleted_shield_element.key);
        return events;
    }

    function getStandardElementTypeEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_standard_element_type.key);
        events.push(event_type.edited_shield_element_type.key); //shield events
        events.push(event_type.deleted_standard_element_type.key);
        return events;
    }

    function getThreatElementTypeEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_threat_element_type.key);
        events.push(event_type.edited_shield_element_type.key); //shield events
        events.push(event_type.deleted_threat_element_type.key);
        return events;
    }

    function getAssetElementEventsWithoutCreate() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.edited_asset_element.key);
        events.push(event_type.deleted_asset_element.key);
        return events;
    }

    function getAssetElementEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_asset_element.key);
        events.push(event_type.edited_asset_element.key);
        events.push(event_type.deleted_asset_element.key);
        return events;
    }

    function getAssetTypeElementEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_asset_type_element.key);
        events.push(event_type.edited_asset_type_element.key);
        events.push(event_type.deleted_asset_type_element.key);
        return events;
    }

    function getAssetTypeElementEventsWithoutCreate() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.edited_asset_type_element.key);
        events.push(event_type.deleted_asset_type_element.key);
        return events;
    }

    function getProviderElementEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_provider_element.key);
        events.push(event_type.edited_provider_element.key);
        events.push(event_type.deleted_provider_element.key);
        return events;
    }

    function getExpressionEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_expression.key);
        events.push(event_type.edited_expression.key);
        events.push(event_type.deleted_expression.key);
        events = events.concat(eventTypeUtil.getObjectiveParameterElementEvents());
        events = events.concat(eventTypeUtil.getMethodParameterElementEvents());
        events = events.concat(eventTypeUtil.getContentParameterElementEvents());
        events = events.concat(eventTypeUtil.getSubjectParameterElementEvents());
        return events;
    }

    function getExpressionEventsWithoutCreate() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.edited_expression.key);
        events.push(event_type.deleted_expression.key);
        events = events.concat(eventTypeUtil.getObjectiveParameterElementEventsWithoutCreate());
        events = events.concat(eventTypeUtil.getMethodParameterElementEventsWithoutCreate());
        events = events.concat(eventTypeUtil.getContentParameterElementEventsWithoutCreate());
        events = events.concat(eventTypeUtil.getSubjectParameterElementEventsWithoutCreate());
        return events;
    }

    function getObjectiveParameterElementEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_objectiveParameter_element.key);
        events.push(event_type.edited_objectiveParameter_element.key);
        events.push(event_type.deleted_objectiveParameter_element.key);
        return events;
    }

    function getMethodParameterElementEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_methodParameter_element.key);
        events.push(event_type.edited_methodParameter_element.key);
        events.push(event_type.deleted_methodParameter_element.key);
        return events;
    }

    function getContentParameterElementEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_contentParameter_element.key);
        events.push(event_type.edited_contentParameter_element.key);
        events.push(event_type.deleted_contentParameter_element.key);
        return events;
    }

    function getSubjectParameterElementEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_subjectParameter_element.key);
        events.push(event_type.edited_subjectParameter_element.key);
        events.push(event_type.deleted_subjectParameter_element.key);
        return events;
    }

    function getObjectiveParameterElementEventsWithoutCreate() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.edited_objectiveParameter_element.key);
        events.push(event_type.deleted_objectiveParameter_element.key);
        return events;
    }

    function getMethodParameterElementEventsWithoutCreate() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.edited_methodParameter_element.key);
        events.push(event_type.deleted_methodParameter_element.key);
        return events;
    }

    function getContentParameterElementEventsWithoutCreate() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.edited_contentParameter_element.key);
        events.push(event_type.deleted_contentParameter_element.key);
        return events;
    }

    function getSubjectParameterElementEventsWithoutCreate() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.edited_subjectParameter_element.key);
        events.push(event_type.deleted_subjectParameter_element.key);
        return events;
    }

    function getOrganizationalUnitElementEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_organizationalunit_element.key);
        events.push(event_type.edited_organizationalunit_element.key);
        events.push(event_type.deleted_organizationalUnit_element.key);
        return events;
    }

    function getUserElementEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_user.key);
        events.push(event_type.edited_user.key);
        events.push(event_type.deleted_user.key);
        return events;
    }

    function getRoleElementEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_role.key);
        events.push(event_type.edited_role.key);
        events.push(event_type.deleted_role.key);
        return events;
    }

    function getPerspectiveEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_perspective.key);
        events.push(event_type.edited_perspective.key);
        events.push(event_type.deleted_perspective.key);
        return events;
    }

    function getShieldElementGroupEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.created_shield_element_group.key);
        events.push(event_type.edited_shield_element_group.key);
        events.push(event_type.deleted_shield_element_group.key);
        return events;
    }

    function getElementsCommonEvents() {
        let events = [];
        let event_type = backing.event_type;
        events.push(event_type.create_artifact.key);
        events.push(event_type.deleted_element.key);
        return events;
    }

    eventTypeUtil.getElementsCommonEvents = getElementsCommonEvents;
    eventTypeUtil.getShieldElementGroupEvents = getShieldElementGroupEvents;
    eventTypeUtil.getShieldEvents = getShieldEvents;
    eventTypeUtil.getShieldElementEvents = getShieldElementEvents;
    eventTypeUtil.getShieldElementEventsWithoutCreate = getShieldElementEventsWithoutCreate;
    eventTypeUtil.getShieldElementTypeEvents = getShieldElementTypeEvents;
    eventTypeUtil.getStandardEvents = getStandardEvents;
    eventTypeUtil.getThreatEvents = getThreatEvents;
    eventTypeUtil.getStandardElementEvents = getStandardElementEvents;
    eventTypeUtil.getThreatElementEvents = getThreatElementEvents;
    eventTypeUtil.getStandardElementEventsWithoutCreate = getStandardElementEventsWithoutCreate;
    eventTypeUtil.getThreatElementEventsWithoutCreate = getThreatElementEventsWithoutCreate;
    eventTypeUtil.getStandardElementTypeEvents = getStandardElementTypeEvents;
    eventTypeUtil.getThreatElementTypeEvents = getThreatElementTypeEvents;
    eventTypeUtil.getBusinessEvents = getBusinessEvents;
    eventTypeUtil.getBusinessElementTypeEvents = getBusinessElementTypeEvents;
    eventTypeUtil.getBusinessElementEvents = getBusinessElementEvents;
    eventTypeUtil.getAssetElementEvents = getAssetElementEvents;
    eventTypeUtil.getAssetElementEventsWithoutCreate = getAssetElementEventsWithoutCreate;
    eventTypeUtil.getAssetTypeElementEvents = getAssetTypeElementEvents;
    eventTypeUtil.getAssetTypeElementEventsWithoutCreate = getAssetTypeElementEventsWithoutCreate;
    eventTypeUtil.getProviderElementEvents = getProviderElementEvents;
    eventTypeUtil.getOrganizationalUnitElement = getOrganizationalUnitElementEvents;
    eventTypeUtil.getUserElement = getUserElementEvents;
    eventTypeUtil.getRoleElement = getRoleElementEvents;
    eventTypeUtil.getObjectiveParameterElementEvents = getObjectiveParameterElementEvents;
    eventTypeUtil.getContentParameterElementEvents = getContentParameterElementEvents;
    eventTypeUtil.getMethodParameterElementEvents = getMethodParameterElementEvents;
    eventTypeUtil.getSubjectParameterElementEvents = getSubjectParameterElementEvents;
    eventTypeUtil.getObjectiveParameterElementEventsWithoutCreate = getObjectiveParameterElementEventsWithoutCreate;
    eventTypeUtil.getContentParameterElementEventsWithoutCreate = getContentParameterElementEventsWithoutCreate;
    eventTypeUtil.getMethodParameterElementEventsWithoutCreate = getMethodParameterElementEventsWithoutCreate;
    eventTypeUtil.getSubjectParameterElementEventsWithoutCreate = getSubjectParameterElementEventsWithoutCreate;
    eventTypeUtil.getExpressionEvents = getExpressionEvents;
    eventTypeUtil.getExpressionEventsWithoutCreate = getExpressionEventsWithoutCreate;
    eventTypeUtil.getPerspectiveEvents = getPerspectiveEvents;
    return eventTypeUtil;
}

/*Fullrefresh softrefresh events generation starts here*/
function desktopsFullRefreshEvents(desktopName) {
    let eventTypes = [];
    let event_type = backing.event_type;
    switch (desktopName) {
        case "shield_schema_desktop":
            eventTypes = eventTypeUtils.getShieldEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementGroupEvents());
            eventTypes.push(event_type.modified_spheric_mode.key);
            eventTypes.push(event_type.edited_shield.key);
            break;
        case "shield_architecture_desktop":
            eventTypes = eventTypeUtils.getShieldEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementGroupEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementEvents());
            eventTypes.push(event_type.modified_spheric_mode.key);
            eventTypes.push(event_type.edited_shield.key);
            break;
        case "classification_map_mode_desktop":
            eventTypes = eventTypeUtils.getShieldEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementGroupEvents());
            eventTypes.push(event_type.modified_spheric_mode.key);
            eventTypes.push(event_type.edited_shield.key);
            break;
        case "standard_schema_desktop":
            eventTypes = eventTypeUtils.getStandardEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementGroupEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementTypeEvents());
            eventTypes.push(event_type.modified_spheric_mode.key);
            break;
        case "threat_schema_desktop":
            eventTypes = eventTypeUtils.getThreatEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementGroupEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementTypeEvents());
            eventTypes.push(event_type.modified_spheric_mode.key);
            break;
        case "standard_architecture_desktop":
            eventTypes = eventTypeUtils.getStandardEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementGroupEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEvents());
            eventTypes.push(backing.event_type.modified_spheric_mode.key);
            break;
        case "standard_map_mode_desktop":
            eventTypes = eventTypeUtils.getShieldEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementGroupEvents());
            eventTypes.push(backing.event_type.modified_spheric_mode.key);
            break;
        case "threat_map_mode_desktop":
            eventTypes = eventTypeUtils.getShieldEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementGroupEvents());
            eventTypes.push(backing.event_type.modified_spheric_mode.key);
            break;
        case "business_schema_desktop":
            eventTypes = eventTypeUtils.getBusinessEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementGroupEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getBusinessElementTypeEvents());
            eventTypes.push(event_type.modified_spheric_mode.key);
            break;
        case "business_map_mode_desktop":
            eventTypes = eventTypeUtils.getBusinessEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getBusinessElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementGroupEvents());
            eventTypes.push(backing.event_type.modified_spheric_mode.key);
            break;
        case "shield_element_ruler_type_desktop":
            eventTypes = eventTypeUtils.getShieldEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getPerspectiveEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementGroupEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEvents());
            eventTypes.push(backing.event_type.modified_spheric_mode.key);
            break;
        case "ruler_type_desktop":
            eventTypes = eventTypeUtils.getShieldEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getPerspectiveEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementGroupEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEvents());
            eventTypes.push(backing.event_type.modified_spheric_mode.key);
            break;
        case "provider_desktop":
        case "business_provider_desktop":
            eventTypes.push(event_type.modified_spheric_mode.key);
            break;
        case "asset_type_desktop":
        case "business_asset_type_desktop":
            eventTypes = [event_type.created_asset_type_element.key, event_type.deleted_asset_type_element.key];
            eventTypes.push(event_type.modified_spheric_mode.key);
            break;
        case "asset_type_map_mode_desktop":
        case "business_asset_type_map_mode_desktop":
            eventTypes = [event_type.created_asset_type_element.key, event_type.deleted_asset_type_element.key];
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatEvents());
            eventTypes.push(event_type.modified_spheric_mode.key);
            break;
        case "asset_desktop":
        case "business_asset_desktop":
            eventTypes.push(event_type.modified_spheric_mode.key);
            break;
        case "asset_map_mode_desktop":
        case "business_asset_map_mode_desktop":
            eventTypes = eventTypeUtils.getShieldEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatEvents());
            eventTypes.push(event_type.modified_spheric_mode.key);
            break;
        case "expression_desktop":
            eventTypes.push(event_type.modified_spheric_mode.key);
            break;
        case "anz_expression_desktop":
            eventTypes.push(event_type.modified_spheric_mode.key);
            break;
        case "objective_parameter_desktop":
            eventTypes.push(event_type.modified_spheric_mode.key);
            break;
        case "method_parameter_desktop":
            eventTypes.push(event_type.modified_spheric_mode.key);
            break;
        case "content_parameter_desktop":
            eventTypes.push(event_type.modified_spheric_mode.key);
            break;
        case "subject_parameter_desktop":
            eventTypes.push(event_type.modified_spheric_mode.key);
            break;
        case "organisational_unit_desktop":
            eventTypes = eventTypeUtils.getUserElement();
            eventTypes = eventTypes.concat(eventTypeUtils.getRoleElement());
            eventTypes = eventTypes.concat(eventTypeUtils.getOrganizationalUnitElement());
            eventTypes.push(event_type.modified_spheric_mode.key);
            break;
        case "users_desktop": {
            eventTypes = eventTypeUtils.getUserElement();
            eventTypes = eventTypes.concat(eventTypeUtils.getRoleElement());
            eventTypes.push(event_type.modified_spheric_mode.key);
            break;
        }
        case "roles_desktop":
            eventTypes = eventTypeUtils.getUserElement();
            eventTypes = eventTypes.concat(eventTypeUtils.getRoleElement());
            eventTypes.push(event_type.modified_spheric_mode.key);
            break;
        case "permission_view":
            eventTypes = eventTypeUtils.getShieldEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getPerspectiveEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementGroupEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEvents());
            eventTypes.push(backing.event_type.modified_spheric_mode.key);
            eventTypes.push(backing.event_type.selector_change.key);
            break;
    }
    return eventTypes;
}

function desktopsSoftRefreshEvents(desktopName, selectors, isBiview) {
    let eventTypes = [];
    let event_type = backing.event_type;
    switch (desktopName) {
        case "shield_schema_desktop":
            eventTypes = eventTypeUtils.getShieldElementEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "shield_architecture_desktop":
            eventTypes = eventTypeUtils.getShieldElementEvents();
            if (selectors.showExpression) {
                eventTypes = eventTypes.concat(eventTypeUtils.getExpressionEventsWithoutCreate());
                eventTypes.push(event_type.modified_shield_element_association.key);
                eventTypes.push(event_type.modified_shield_element_association.key);
                eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            }
            break;
        case "classification_map_mode_desktop":
            eventTypes = eventTypeUtils.getShieldElementEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getExpressionEventsWithoutCreate());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getBusinessElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementEvents());
            if (selectors.dropDownTwoHtml) {
                if (selectors.dropDownTwoHtml.match(/Asset Type/)) {
                    eventTypes.push(event_type.modified_protection_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getAssetTypeElementEventsWithoutCreate());

                }
                else if (selectors.dropDownTwoHtml.match(/Asset/)) {
                    eventTypes.push(event_type.modified_asset_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getAssetElementEventsWithoutCreate());
                }
                else if (selectors.dropDownTwoHtml.match(/Standard/)) {
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementEventsWithoutCreate());
                }
                else if (selectors.dropDownTwoHtml.match(/Threat/)) {
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementEventsWithoutCreate());
                }
                else if (selectors.dropDownTwoHtml.match(/Shield/)) {
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEventsWithoutCreate());
                }
            }
            eventTypes.push(event_type.modified_shield_element_association.key);
            eventTypes.push(event_type.modified_direct_element_element_association.key);
            eventTypes.push(event_type.modified_direct_asset_element_association.key);
            eventTypes.push(event_type.modified_direct_asset_type_element_association.key);
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "standard_schema_desktop":
            eventTypes = eventTypeUtils.getStandardElementEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "threat_schema_desktop":
            eventTypes = eventTypeUtils.getThreatElementEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementTypeEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "standard_architecture_desktop":
            eventTypes = eventTypeUtils.getStandardElementEvents();
            if (selectors.showExpression) {
                eventTypes = eventTypes.concat(eventTypeUtils.getExpressionEventsWithoutCreate());
                eventTypes.push(event_type.modified_shield_element_association.key);
                eventTypes.push(event_type.modified_shield_element_association.key);
            }
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "standard_map_mode_desktop":
            eventTypes = eventTypeUtils.getStandardElementEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getExpressionEventsWithoutCreate());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getBusinessElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementEvents());

            if (selectors.dropDownTwoHtml) {
                if (selectors.dropDownTwoHtml.match(/Asset Type/)) {
                    eventTypes.push(event_type.modified_protection_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getAssetTypeElementEventsWithoutCreate());
                }
                else if (selectors.dropDownTwoHtml.match(/Asset/)) {
                    eventTypes.push(event_type.modified_asset_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getAssetElementEventsWithoutCreate());

                }
                else if (selectors.dropDownTwoHtml.match(/Standard/)) {
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementEventsWithoutCreate());
                }
                else if (selectors.dropDownTwoHtml.match(/Shield/)) {
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEventsWithoutCreate());
                }
            }
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            eventTypes.push(event_type.modified_shield_element_association.key);
            eventTypes.push(event_type.modified_direct_element_element_association.key);
            eventTypes.push(event_type.modified_direct_asset_element_association.key);
            eventTypes.push(event_type.modified_direct_asset_type_element_association.key);
            break;
        case "threat_map_mode_desktop":
            eventTypes = eventTypeUtils.getThreatElementEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getExpressionEventsWithoutCreate());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getBusinessElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementEvents());

            if (selectors.dropDownTwoHtml) {
                if (selectors.dropDownTwoHtml.match(/Asset Type/)) {
                    eventTypes.push(event_type.modified_protection_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getAssetTypeElementEventsWithoutCreate());
                }
                else if (selectors.dropDownTwoHtml.match(/Asset/)) {
                    eventTypes.push(event_type.modified_asset_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getAssetElementEventsWithoutCreate());

                }
                else if (selectors.dropDownTwoHtml.match(/Standard/)) {
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementEventsWithoutCreate());
                }
                else if (selectors.dropDownTwoHtml.match(/Threat/)) {
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementEventsWithoutCreate());
                }
                else if (selectors.dropDownTwoHtml.match(/Shield/)) {
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEventsWithoutCreate());
                }
            }
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            eventTypes.push(event_type.modified_shield_element_association.key);
            eventTypes.push(event_type.modified_direct_element_element_association.key);
            eventTypes.push(event_type.modified_direct_asset_element_association.key);
            eventTypes.push(event_type.modified_direct_asset_type_element_association.key);
            break;
        case "business_schema_desktop":
            eventTypes = eventTypeUtils.getBusinessElementEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "business_map_mode_desktop":
            eventTypes = eventTypeUtils.getBusinessElementEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getExpressionEventsWithoutCreate());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getBusinessElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementEvents());

            if (selectors.dropDownTwoHtml) {
                if (selectors.dropDownTwoHtml.match(/Asset Type/)) {
                    eventTypes.push(event_type.modified_protection_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getAssetTypeElementEventsWithoutCreate());
                }
                else if (selectors.dropDownTwoHtml.match(/Asset/)) {
                    eventTypes.push(event_type.modified_asset_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getAssetElementEventsWithoutCreate());

                }
                else if (selectors.dropDownTwoHtml.match(/Standard/)) {
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementEventsWithoutCreate());
                }
                else if (selectors.dropDownTwoHtml.match(/Threat/)) {
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementEventsWithoutCreate());
                }
                else if (selectors.dropDownTwoHtml.match(/Shield/)) {
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEventsWithoutCreate());
                }
            }
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            eventTypes.push(event_type.modified_shield_element_association.key);
            eventTypes.push(event_type.modified_direct_element_element_association.key);
            eventTypes.push(event_type.modified_direct_asset_element_association.key);
            eventTypes.push(event_type.modified_direct_asset_type_element_association.key);
            break;
        case "shield_element_ruler_type_desktop":
            eventTypes = eventTypeUtils.getStandardElementEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getAssetElementEventsWithoutCreate());
            eventTypes = eventTypes.concat(eventTypeUtils.getExpressionEventsWithoutCreate());
            eventTypes.push(event_type.created_shield_element_attribute.key);
            eventTypes.push(event_type.added_shield_element_attribute_library.key);
            eventTypes.push(event_type.modified_shield_element_association.key);
            eventTypes.push(event_type.modified_asset_association.key);
            eventTypes.push(event_type.edited_shield_element_attribute_rating.key);
            //if(isBiview)
            eventTypes.push(event_type.perspective_selection_changed_biview.key);
            //else
            eventTypes.push(event_type.perspective_selection_changed_singleview.key);
            eventTypes.push(event_type.composite_color_change_single.key);
            eventTypes.push(event_type.edited_shield_element_attribute.key);
            eventTypes.push(event_type.deleted_shield_element_attribute.key);
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "ruler_type_desktop":
            eventTypes = eventTypeUtils.getStandardElementEvents();
            eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getAssetElementEventsWithoutCreate());
            eventTypes = eventTypes.concat(eventTypeUtils.getExpressionEventsWithoutCreate());
            eventTypes.push(event_type.created_asset_delivers_attribute.key);
            eventTypes.push(event_type.added_asset_delivers_attribute_library.key);
            eventTypes.push(event_type.modified_shield_element_association.key);
            eventTypes.push(event_type.modified_asset_association.key);
            eventTypes.push(event_type.edited_asset_delivers_rating.key);
            eventTypes.push(event_type.modified_direct_asset_element_association.key);
            //if(isBiview)
            eventTypes.push(event_type.perspective_selection_changed_biview.key);
            //else
            eventTypes.push(event_type.perspective_selection_changed_singleview.key);
            eventTypes.push(event_type.composite_color_change_single.key);
            eventTypes.push(event_type.edited_asset_delivers_attribute.key);
            eventTypes.push(event_type.deleted_asset_delivers_attribute.key);
            eventTypes.push(event_type.create_artifact.key);
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "provider_desktop":
        case "business_provider_desktop":
            eventTypes = eventTypes.concat(eventTypeUtils.getProviderElementEvents());
            if (selectors.showAsset) {
                eventTypes = eventTypes.concat(eventTypeUtils.getAssetElementEvents());
            }
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "asset_type_desktop":
        case "business_asset_type_desktop":
            eventTypes = [event_type.edited_asset_type_element.key];

            if (selectors.protectionTypeHtml) {
                if (!selectors.protectionTypeHtml.match(/DO NOT SHOW/)) {
                    eventTypes.push(event_type.modified_protection_association.key);
                }
            }
            if (selectors.showAsset) {
                eventTypes = eventTypes.concat(eventTypeUtils.getAssetElementEvents());
            }
            eventTypes.push(event_type.modified_shield_element_association.key);
            eventTypes.push(event_type.modified_asset_association.key);
            eventTypes.push(event_type.modified_direct_element_element_association.key);
            eventTypes.push(event_type.modified_direct_asset_element_association.key);
            eventTypes.push(event_type.modified_direct_asset_type_element_association.key);
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "asset_type_map_mode_desktop":
        case "business_asset_type_map_mode_desktop":
            eventTypes = eventTypeUtils.getAssetElementEvents();
            eventTypes.push(event_type.modified_protection_association.key);
            eventTypes.push(event_type.edited_asset_type_element.key);
            if (selectors.dropDownTwoHtml) {
                if (selectors.dropDownTwoHtml.match(/Asset/)) {
                    eventTypes.push(event_type.modified_asset_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getAssetElementEventsWithoutCreate());
                }
                else if (selectors.dropDownTwoHtml.match(/Shield/) || selectors.dropDownTwoHtml.match(/Standard/)
                || selectors.dropDownTwoHtml.match(/Threat/)) {
                    eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEventsWithoutCreate());
                    eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementEventsWithoutCreate());
                    eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementEventsWithoutCreate());
                }
            }
            eventTypes.push(event_type.modified_shield_element_association.key);
            eventTypes.push(event_type.modified_direct_element_element_association.key);
            eventTypes.push(event_type.modified_direct_asset_element_association.key);
            eventTypes.push(event_type.modified_direct_asset_type_element_association.key);
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "asset_desktop":
        case "business_asset_desktop":
            eventTypes = eventTypeUtils.getAssetElementEvents();
            if (selectors.protectionTypeHtml) {
                if (!selectors.protectionTypeHtml.match(/DO NOT SHOW/)) {
                    eventTypes.push(event_type.modified_asset_association.key);
                }
            }
            eventTypes.push(event_type.modified_shield_element_association.key);
            eventTypes.push(event_type.modified_asset_association.key);
            eventTypes.push(event_type.modified_direct_element_element_association.key);
            eventTypes.push(event_type.modified_direct_asset_element_association.key);
            eventTypes.push(event_type.modified_direct_asset_type_element_association.key);
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "asset_map_mode_desktop":
        case "business_asset_map_mode_desktop":
            eventTypes = eventTypeUtils.getAssetElementEvents();
            if (selectors.dropDownTwoHtml) {
                if (selectors.dropDownTwoHtml.match(/Asset Type/)) {
                    eventTypes.push(event_type.modified_protection_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getAssetTypeElementEventsWithoutCreate());
                }
                else if (selectors.dropDownTwoHtml.match(/Shield/) || selectors.dropDownTwoHtml.match(/Standard/)
                || selectors.dropDownTwoHtml.match(/Threat/)) {
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEventsWithoutCreate());
                    eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementEventsWithoutCreate());
                    eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementEventsWithoutCreate());
                }
            }
            eventTypes.push(event_type.modified_shield_element_association.key);
            eventTypes.push(event_type.modified_asset_association.key);
            eventTypes.push(event_type.modified_direct_element_element_association.key);
            eventTypes.push(event_type.modified_direct_asset_element_association.key);
            eventTypes.push(event_type.modified_direct_asset_type_element_association.key);
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "expression_desktop":
            eventTypes = eventTypes.concat(eventTypeUtils.getExpressionEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "anz_expression_desktop":
            eventTypes = eventTypes.concat(eventTypeUtils.getExpressionEvents());
            if (selectors.dropDownTwoHtml) {
                if (selectors.dropDownTwoHtml.match(/Asset Type/) || selectors.dropDownTwoHtml.match(/VALUE ASSET TYPE/)) {
                    eventTypes.push(event_type.modified_protection_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getAssetTypeElementEventsWithoutCreate());
                }
                else if (selectors.dropDownTwoHtml.match(/Standard/)) {
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getStandardElementEventsWithoutCreate());
                }
                else if (selectors.dropDownTwoHtml.match(/Threat/)) {
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getThreatElementEventsWithoutCreate());
                }
                else if (selectors.dropDownTwoHtml.match(/Shield/)) {
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes.push(event_type.modified_shield_element_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getShieldElementEventsWithoutCreate());
                }
                else if (selectors.dropDownTwoHtml.match(/Asset/) || selectors.dropDownTwoHtml.match(/VALUE ASSET/)) {
                    eventTypes.push(event_type.modified_asset_association.key);
                    eventTypes = eventTypes.concat(eventTypeUtils.getAssetElementEventsWithoutCreate());
                }
                eventTypes.push(event_type.modified_shield_element_association.key);
            }
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "objective_parameter_desktop":
            eventTypes = eventTypes.concat(eventTypeUtils.getObjectiveParameterElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "method_parameter_desktop":
            eventTypes = eventTypes.concat(eventTypeUtils.getMethodParameterElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "content_parameter_desktop":
            eventTypes = eventTypes.concat(eventTypeUtils.getContentParameterElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "subject_parameter_desktop":
            eventTypes = eventTypes.concat(eventTypeUtils.getSubjectParameterElementEvents());
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "organisational_unit_desktop":
            eventTypes = eventTypes.concat(eventTypeUtils.getOrganizationalUnitElement());
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "roles_desktop":
            eventTypes = eventTypes.concat(eventTypeUtils.getOrganizationalUnitElement());
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
        case "users_desktop":
            eventTypes = eventTypes.concat(eventTypeUtils.getOrganizationalUnitElement());
            eventTypes = eventTypes.concat(eventTypeUtils.getElementsCommonEvents());
            break;
    }
    return eventTypes;
}

/*Fullrefresh softrefresh events generation ends here*/

/*common functions for expression start*/
function getProtectionTypeSelector(previousSelection, $protectionTypeSelectorId, view) {
    function protectionTypeDirect() {
        previousSelection.protectionTypeSelectorDirect = {};
        previousSelection.protectionTypeSelectorDirect.elementId = $protectionTypeSelectorId.attr("elementId");
        previousSelection.protectionTypeSelectorDirect.htmlElement = $protectionTypeSelectorId.html();
    }

    function protectionTypeInDirect() {
        previousSelection.protectionTypeSelectorInDirect = {};
        previousSelection.protectionTypeSelectorInDirect.elementId = $protectionTypeSelectorId.attr("elementId");
        previousSelection.protectionTypeSelectorInDirect.htmlElement = $protectionTypeSelectorId.html();
    }

    let directModeClicked;
    if (view === "singleview") {
        directModeClicked = backing.directModeClickedSingleview;
    }
    else if (view === "biview") {
        directModeClicked = backing.directModeClickedBiview;
    }
    if (directModeClicked) {
        if (backing.isDirectMode) {
            protectionTypeInDirect();
        }
        else {
            protectionTypeDirect();
        }
    }
    else {
        if (backing.isDirectMode) {
            protectionTypeDirect();
        }
        else {
            protectionTypeInDirect();
        }
    }
}

function renderProtectionTypeSelector(selectors, activeDesktop, expressionClass, constantsLabel) {
    let $selectorId = $("#" + activeDesktop.selector.protection_dropdown_id);
    let $selectedId = $("#" + activeDesktop.selector.protection_dropdown_selected_id);
    let previousSelector = activeDesktop.previousSelectors;
    let $directLabelId = $("#" + activeDesktop.selector.protection_direct_label_id);
    let $indirectLabelId = $("#" + activeDesktop.selector.protection_indirect_label_id);
    let $directLabelContainer = $("#" + activeDesktop.selector.protection_indirect_label_id).closest(".desktop-selector-container");
    let str = "<ul>";
    for (let i = 0; i < selectors.length; i++) {
        str += "<li class=\"" + expressionClass + "\" elementId=\"" + constantsLabel[selectors[i]] + "\">" + selectors[i] + "</li>"
    }
    str += "</ul>";
    $selectorId.html(str);
    let selectionValue = getFromProtectionTypeSelection(previousSelector, selectors, constantsLabel);
    if (backing.isDirectMode) {
        if (activeDesktop.div_id === "asset_type_desk" || activeDesktop.div_id === "bi_asset_type_desk") {
            $directLabelContainer.addClass("dis-none");
        }
        $directLabelId.removeClass("dis-none");
        $indirectLabelId.addClass("dis-none");
        $selectedId.addClass("dis-none");
        $selectedId.html("DO NOT SHOW");
        $selectedId.attr("elementId", "do_not_show");
    }
    else if (!backing.isDirectMode) {
        if (activeDesktop.div_id === "asset_type_desk" || activeDesktop.div_id === "bi_asset_type_desk") {
            $directLabelContainer.removeClass("dis-none");
        }
        $directLabelId.addClass("dis-none");
        $indirectLabelId.removeClass("dis-none");
        $selectedId.removeClass("dis-none");
        $selectedId.html(selectionValue.htmlElementValue);
        $selectedId.attr("elementId", selectionValue.elementIdValue);
    }
}

function getFromProtectionTypeSelection(previousSelector, selectors, constantsLabel) {
    let selectionObj = {};
    if (backing.isDirectMode && previousSelector && previousSelector.protectionTypeSelectorDirect) {
        selectionObj.elementIdValue = previousSelector.protectionTypeSelectorDirect.elementId;
        selectionObj.htmlElementValue = previousSelector.protectionTypeSelectorDirect.htmlElement;
    }
    else if (!backing.isDirectMode && previousSelector && previousSelector.protectionTypeSelectorInDirect) {
        selectionObj.elementIdValue = previousSelector.protectionTypeSelectorInDirect.elementId;
        selectionObj.htmlElementValue = previousSelector.protectionTypeSelectorInDirect.htmlElement;
    }
    else {
        selectionObj.htmlElementValue = selectors[0];
        selectionObj.elementIdValue = constantsLabel[selectors[0]];
    }
    return selectionObj;

}

function getExpressionSelection(previousSelection, $expressionSelectorId, view) {
    prin("getExpressionSelection");
    function expressionDirect() {
        previousSelection.expressionSelectorDirect = {};
        previousSelection.expressionSelectorDirect.shieldId = $expressionSelectorId.attr("shieldId");
        previousSelection.expressionSelectorDirect.startingPoint = $expressionSelectorId.attr("startingPoint");
        previousSelection.expressionSelectorDirect.protectionType = $expressionSelectorId.attr("protectionType");
        previousSelection.expressionSelectorDirect.htmlElement = $expressionSelectorId.html();
    }

    function expressionInDirect() {
        previousSelection.expressionSelectorInDirect = {};
        previousSelection.expressionSelectorInDirect.shieldId = $expressionSelectorId.attr("shieldId");
        previousSelection.expressionSelectorInDirect.startingPoint = $expressionSelectorId.attr("startingPoint");
        previousSelection.expressionSelectorInDirect.protectionType = $expressionSelectorId.attr("protectionType");
        previousSelection.expressionSelectorInDirect.htmlElement = $expressionSelectorId.html();
    }

    let directModeClicked;
    if (view === "singleview") {
        directModeClicked = backing.directModeClickedSingleview;
    }
    else if (view === "biview") {
        directModeClicked = backing.directModeClickedBiview;
    }
    if (directModeClicked) {
        if (backing.isDirectMode) {
            expressionInDirect();
        }
        else {
            expressionDirect();
        }
        if (view === "singleview") {
            backing.directModeClickedSingleview = false;
        }
        else if (view === "biview") {
            backing.directModeClickedBiview = false;
        }
    }
    else {
        if (backing.isDirectMode) {
            expressionInDirect();
        }
        else {
            expressionDirect();
        }
    }

}

function getFromExpressionSelection(previousSelector, activeDesktop, isBiview) {
    prin("getFromExpressionSelection")
    const firstSelectorHtml = $("#" + activeDesktop.selector.expression_dropdown_id).children().first().children().first();
    if(firstSelectorHtml.length != 1)
        return {};
    let firstSelectorShieldId = firstSelectorHtml.attr("shieldId");
    if(firstSelectorShieldId) {
        try {
            firstSelectorShieldId= parseInt(firstSelectorShieldId);
        } catch(err) {
            firstSelectorShieldId = 0;
        }
    }
    const firstSelector = {
        label: firstSelectorHtml.attr("title"),
        shieldId: firstSelectorShieldId,
        objectTypeForIcon: firstSelectorHtml.attr("objectType"),
        protectionType: firstSelectorHtml.attr("protectionType"),
        startingPoint: firstSelectorHtml.attr("startingPoint"),
        linkNameAttr: firstSelectorHtml.attr("linkName")
    };

    let selectionObj = {}, objectType;
    if (firstSelector.objectTypeForIcon)
        objectType = firstSelector.objectTypeForIcon;
    let str = "<span class=\"flaticon-arrow dropdown2Icon\"></span><label class=\"dropdown2LabelText\">" + firstSelector.linkNameAttr + " </label>";
    if (objectType === "shield")
        str += '<span class="dropdown2Icon flaticon-shield-element marginLeft"></span><label class="dropdown2LabelText"> Internal Policies of </label>';
    else if (objectType === "standard")
        str += '<span class="dropdown2Icon flaticon-standard-element marginLeft"></span><label class="dropdown2LabelText">External Policies of </label>';
    else if (objectType === "b_framework")
        str += '<span class="dropdown2Icon flaticon-business-element marginLeft"></span><label class="dropdown2LabelText">Value Processes of </label>';
    else if (objectType === "threat")
        str += '<span class="dropdown2Icon flaticon-threat-control marginLeft"></span><label class="dropdown2LabelText">Threat Vectors of </label>';
    if (backing.isDirectMode && previousSelector && previousSelector.expressionSelectorDirect) {
        selectionObj.htmlElementValue = previousSelector.expressionSelectorDirect.htmlElement;
        selectionObj.shieldIdValue = previousSelector.expressionSelectorDirect.shieldId;
        selectionObj.startingPointValue = previousSelector.expressionSelectorDirect.startingPoint;
        selectionObj.protectionTypeValue = previousSelector.expressionSelectorDirect.protectionType;
    }
    else if (!backing.isDirectMode && previousSelector && previousSelector.expressionSelectorInDirect) {
        selectionObj.htmlElementValue = previousSelector.expressionSelectorInDirect.htmlElement;
        selectionObj.shieldIdValue = previousSelector.expressionSelectorInDirect.shieldId;
        selectionObj.startingPointValue = previousSelector.expressionSelectorInDirect.startingPoint;
        selectionObj.protectionTypeValue = previousSelector.expressionSelectorInDirect.protectionType;
    }
    else {
        if (firstSelector.shieldId) {
            selectionObj.acronym = backing.shield_schema_obj.shieldInfoMap[firstSelector.shieldId].shieldName;
            selectionObj.htmlElementValue = str + renderCircleOrSquareInventoryDv(firstSelector, isBiview, false, false, false) + selectionObj.acronym;
        }
        else
            selectionObj.htmlElementValue = str + renderCircleOrSquareInventoryDv(firstSelector, isBiview, false, false, false) + firstSelector.label.toUpperCase();
        selectionObj.startingPointValue = firstSelector.startingPoint;
        let shieldId = 0;
        let objectType;
        if (firstSelector.shieldId)
            shieldId = firstSelector.shieldId;
        let protectionType = "dummy";
        if (firstSelector.protectionType)
            protectionType = firstSelector.protectionType;
        selectionObj.shieldIdValue = shieldId;
        selectionObj.protectionTypeValue = protectionType;
        selectionObj.objectType = firstSelector.objectTypeForIcon;
        activeDesktop.expressionSelectorSelected = firstSelector;
    }
    return selectionObj;
}

function selectExpressionSelector(activeDesktop, isBiview, cb) {
    prin("selectExpressionSelector dropdowntwo one.. start")
    fetchAndApplyLinkToPreferences($("#" + activeDesktop.selector.expression_dropdown_id), activeDesktop, () => {
        let previousSelector = activeDesktop.previousSelectors;
        let $selectedId = $("#" + activeDesktop.selector.expression_dropdown_selected_id);
        if(!$selectedId.attr("objectType")) {
            let selectionValue = getFromExpressionSelection(previousSelector, activeDesktop, isBiview);
            $selectedId.html(selectionValue.htmlElementValue);
            $selectedId.attr("shieldId", selectionValue.shieldIdValue);
            $selectedId.attr("startingPoint", selectionValue.startingPointValue);
            $selectedId.attr("protectionType", selectionValue.protectionTypeValue);
            $selectedId.attr("objectType", selectionValue.objectType);
        }
        if(cb) cb();
    });
}

function renderExpressionSelector(selectors, activeDesktop, expressionClass, isBiview) {
    prin("renderExpressionSelector");
    console.log("In render expression selector - this is dropdown 2", selectors, activeDesktop, expressionClass, isBiview);
    let $selectorId = $("#" + activeDesktop.selector.expression_dropdown_id);
    let $selectedId = $("#" + activeDesktop.selector.expression_dropdown_selected_id);
    let $directLabelId = $("#" + activeDesktop.selector.expression_label_direct_id);
    let $indirectLabelId = $("#" + activeDesktop.selector.expression_label_indirect_id);
    let previousSelector = activeDesktop.previousSelectors;
    let selectedStr = "";
    let objectType;
    if (selectors.length !== 0) {

        let str = "<ul>";
        for (let i = 0; i < selectors.length; i++) {
            let startingPoint = selectors[i].startingPoint;
            let shieldId = 0;
            if (selectors[i].shieldId)
                shieldId = selectors[i].shieldId;
            let protectionType = "dummy";
            if (selectors[i].protectionType)
                protectionType = selectors[i].protectionType;
            if (selectors[i].objectTypeForIcon)
                objectType = selectors[i].objectTypeForIcon;
            let name;
            if (selectors[i].shieldId) {
                let acronym = backing.shield_schema_obj.shieldInfoMap[selectors[i].shieldId].acronym;
                if (acronym !== null)
                    name = "[ " + acronym + " ] " + selectors[i].label.toUpperCase();
                else
                    name = selectors[i].label.toUpperCase();
            }
            else
                name = selectors[i].label.toUpperCase();
            str += "<li title=\"" + name + "\" class=\"" + expressionClass + " expSelectorClass\" startingPoint=\"" + startingPoint + "\" shieldId=\"" + shieldId + "\" protectionType=\"" + protectionType + "\" objectType =\"" + objectType + "\" linkName=\"" + selectors[i].linkNameAttr + "\" >";
            str += '<span class="related-framework-action flaticon-map"></span>';
            str += "<span class=\"flaticon-arrow dropdown2Icon marginLeft\"></span><label class=\"dropdown2LabelText\">" + selectors[i].linkNameAttr + " </label>";
            if (objectType === "shield")
                str += '<span class="dropdown2Icon flaticon-shield-element marginLeft"></span><label class="dropdown2LabelText"> Internal Policies of </label>';
            else if (objectType === "standard")
                str += '<span class="dropdown2Icon flaticon-standard-element marginLeft"></span><label class="dropdown2LabelText">External Policies of </label>';
            else if (objectType === "b_framework")
                str += '<span class="dropdown2Icon flaticon-business-element marginLeft"></span><label class="dropdown2LabelText">Value Processes of </label>';
            else if (objectType === "threat")
                str += '<span class="dropdown2Icon flaticon-threat-control marginLeft"></span><label class="dropdown2LabelText">Threat Vectors of </label>';
            str += '<span class="marginLeft">'+renderCircleOrSquareInventoryDv(selectors[i], isBiview, false, false, false)+'</span>';
            str += '<span>';
            if (selectors[i].shieldId) {
                let acronym = backing.shield_schema_obj.shieldInfoMap[selectors[i].shieldId].shieldName;
                if (acronym !== null)
                    str += acronym;
                else
                    str += selectors[i].label.toUpperCase();
            }
            else
                str += selectors[i].label.toUpperCase();
            str += "</span></li>";
        }
        str += "</ul>";
        $selectorId.html(str);


        if (backing.isDirectMode) {
            $directLabelId.removeClass("dis-none");
            $indirectLabelId.addClass("dis-none");
        }
        else if (!backing.isDirectMode) {
            $directLabelId.addClass("dis-none");
            $indirectLabelId.removeClass("dis-none");
        }

        /*let selectionValue = getFromExpressionSelection(previousSelector, selectors, activeDesktop, isBiview);
        $selectedId.html(selectionValue.htmlElementValue);
        $selectedId.attr("shieldId", selectionValue.shieldIdValue);
        $selectedId.attr("startingPoint", selectionValue.startingPointValue);
        $selectedId.attr("protectionType", selectionValue.protectionTypeValue);
        $selectedId.attr("objectType", selectionValue.objectType);*/
    }
}

/* common functions for expression ends*/

function shieldSelector(previousSelector, selectorId, selectorClick) {
    prin("shieldSelector")
    console.log("shieldSelector: ", previousSelector, selectorId, selectorClick);
    if (previousSelector && previousSelector.shieldSelectorId) {
        let liIndex = getLiFromSelector(selectorId, previousSelector.shieldSelectorId);
        if (liIndex) {
            liIndex++;
            selectorClick($("#" + selectorId + " ul:first li:nth-child(" + liIndex + ")"));
        }
        else {
            selectorClick($("#" + selectorId + " ul:first li:first"));
        }
    }
    else
        selectorClick($("#" + selectorId + " ul:first li:first"));
}

function levelSelector(previousSelector, selectorId, levelSelectorClick) {
    prin("levelSelector");
    if (previousSelector && previousSelector.levelSelectorId) {
        let liIndex = getLiFromSelector(selectorId, previousSelector.levelSelectorId);
        if (liIndex) {
            liIndex++;
            levelSelectorClick($("#" + selectorId + " ul:first li:nth-child(" + liIndex + ")"));
        }
        else {
            levelSelectorClick($("#" + selectorId + " ul:first li:first"));
        }
    }
    else
        levelSelectorClick($("#" + selectorId + " ul:first li:first"));
}

function groupSelector(previousSelector, selectorId, getLiSelector, groupSelectorClick, groupItemClass) {
    prin("groupSelector")
    if (previousSelector && previousSelector.groupSelectorId) {
        let liIndex = getLiSelector(selectorId, previousSelector.groupSelectorId, groupItemClass + "Item");
        if (liIndex && groupItemClass) {
            if (!groupItemClass) {
                liIndex++;
            }
            groupSelectorClick(liIndex);
        }
        else {
            groupSelectorClick($("#" + selectorId + " ul:first li:first"));
        }
    }
    else
        groupSelectorClick($("#" + selectorId + " ul:first li:first"));
}

function getShieldTypeNameKey(activeDesktop) {
    if(activeDesktop.key == "shield_schema_desktop" || activeDesktop.key == "bi_shield_schema_desktop"
        || activeDesktop.key == "classification_map_mode_desktop" || activeDesktop.key == "bi_classification_map_mode_desktop"
    ) {
        return "Shield"
    } else if (activeDesktop.key == "standard_schema_desktop" || activeDesktop.key == "bi_standard_schema_desktop"
        || activeDesktop.key == "standard_map_mode_desktop" || activeDesktop.key == "bi_standard_map_mode_desktop"
    ) {
        return "Standard"
    } else if (activeDesktop.key == "business_schema_desktop" || activeDesktop.key == "bi_business_schema_desktop"
        || activeDesktop.key == "business_map_mode_desktop" || activeDesktop.key == "bi_business_map_mode_desktop"
    ) {
        return "BusinessFrameworks"
    } else if (activeDesktop.key == "threat_schema_desktop" || activeDesktop.key == "bi_threat_schema_desktop"
        || activeDesktop.key == "threat_map_mode_desktop" || activeDesktop.key == "bi_threat_map_mode_desktop"
    ) {
        return "Threat"
    }
    return null;
}

function renderSelectorDropDown(activeDesktop, selectorList, selector, selectorClass, data, isGroupCreate = false, defaultPrefs = false) {
    prin("renderSelectorDropDown");
    console.log("RenderSelectorDropDown: - this is for dropdown1 analysis desktops when selector='shieldSelector'", activeDesktop, selectorList, selector, selectorClass, data, isGroupCreate, defaultPrefs);

    if(selector == "shieldSelector" && defaultPrefs) {
        const defaultShieldIdSet = new Set(Object.values(defaultPrefs).filter(Number));
        selectorList.forEach(item => {
            if(defaultShieldIdSet.has(item.elementId))
                item.isDefaultShield = true;
        })
        selectorList.sort(function(a, b){
            if(a.isDefaultShield && b.isDefaultShield) {
            } else if(a.isDefaultShield)
                return -1;
            else if(b.isDefaultShield)
                return 1;
            if (a.objectType == b.objectType)
                return localeCompareForNumbers_(a.elementId, b.elementId);
            return localeCompareForObjectType_(a.objectType, b.objectType)
        });
    }

    // //have to handle bi view case
    let str = "";
    let ringView;
    str += "<ul>";
    let isBiview = isBiViewOrNot(data.view);
    if (data && data.view === "biview") {
        ringView = "biViewGroupRingView";
    }
    else if (data && data.view === "singleview") {
        ringView = "singleViewGroupRingView";
    }
    if (isGroupCreate) {
        generateUniqueIdAndParentLinkDropDown(selectorList, activeDesktop.div_id, null);
        if (selector === "groupSelector") {
            str += "<li class=\"" + selectorClass + "Item\" elementId=\"0\">NO GROUPS</li>";
        }
        if (selector === "levelSelector" && (selectorList && selectorList.length <= 0)) {
            str += "<li class=\"" + selectorClass + "Item\" elementId=\"0\">NO LEVELS</li>";
        }
        for (let i = 0; i < selectorList.length; i++) {
            if (selector === "levelSelector") {
                str += "<li class=\"" + selectorClass + "Item\" elementTypeId = \"" + selectorList[i].elementTypeId + "\" elementId=\"" + selectorList[i][ATTR.level] + "\">L" + selectorList[i][ATTR.level] + ": " + selectorList[i][ATTR.label].toUpperCase() + "</li>";
            }
            else if (selector === "shieldSelector") {
                str += renderElementListLi(selectorList[i], selectorClass, data, true, isBiview);
            }
            else {
                str += "<li class=\"" + selectorClass + "Item\" elementTypeId = \"" + selectorList[i].elementTypeId + "\" elementId=\"" + selectorList[i][ATTR.elementId] + "\">" + selectorList[i][ATTR.name].toUpperCase() + "</li>";
            }
        }
    }
    else {
        generateUniqueIdAndParentLinkDropDown(selectorList, activeDesktop.div_id, null);
        if (selector === "levelSelector") {
            str += "<li class=\"" + selectorClass + "Item\" elementId=\"0\">ALL LEVELS</li>";
        }
        else if (selector === "groupSelector") {
            str += "<li class=\"" + selectorClass + "Item \" elementId=\"0\">NO GROUPS</li>";
        }
        for (let i = 0; i < selectorList.length; i++) {
            if (selector === "levelSelector") {
                let label = (selectorList[i][ATTR.label] === "" ? "" : ": " + selectorList[i][ATTR.label].toUpperCase());
                str += `<li class="${selectorClass}Item" elementId="${selectorList[i][ATTR.level]}">L${selectorList[i][ATTR.level]} ${label}</li>`;
            }
            else if (selector === "groupSelector") {
                str += "<li id =\"" + selectorList[i].elementId + "\" class=\"groupLi\">" +
                    "<span class=\"elementTypeSpan createGroup " + data.view + "\" id =\"" + selectorList[i].elementId + "\" elementType=\"" + selectorList[i].name + "\" level=\"" + selectorList[i].level + "\"  uniqueId=\"" + selectorList[i].uniqueId + "\" style=\"font-weight:bold\"> +  "+ (selectorList[i].level != 0 ? "L" + selectorList[i].level + " : " : "") + selectorList[i].name + " " +
                    "Group<span class=\"flaticon-round " + ringView + "\" uniqueId=\"" + selectorList[i].uniqueId + "\"></span></span><ul>";
                for (let j = 0; j < selectorList[i].children.length; j++) {
                    str += renderElementListLi(selectorList[i].children[j], selectorClass, data, true, isBiview);
                }
                str += "</ul></li>";
            }
            else {
                str += renderElementListLi(selectorList[i], selectorClass, data, true, isBiview, selector == "shieldSelector");
            }
        }
    }
    str += "</ul>";
    $("#" + data.idOfParentDiv).html(str);
}

function renderSchemaSelectorDropDown(activeDesktop, selectorList, selector, isBiview, defaultPrefs = false) {
    prin("renderSchemaSelectorDropDown")
    console.log("desktopsCommon > renderSchemaSelectorDropdown: ", selectorList, selector);
    // let activeDesktop = backing.singleview.workspaces.cla_workspace.desktops.shield_schema_desktop;

    if(defaultPrefs) {
        const defaultShieldIdSet = new Set(Object.values(defaultPrefs).filter(Number));
        selectorList.forEach(item => {
            if(defaultShieldIdSet.has(item.elementId))
                item.isDefaultShield = true;
        })
        selectorList.sort(function(a, b){
            if(a.isDefaultShield && b.isDefaultShield) {
            } else if(a.isDefaultShield)
                return -1;
            else if(b.isDefaultShield)
                return 1;
            if (a.objectType == b.objectType)
                return localeCompareForNumbers_(a.elementId, b.elementId);
            return localeCompareForObjectType_(a.objectType, b.objectType)
        });
    }

    let selectorDropDownId = activeDesktop.selector.shield_dropdown_id;

    generateUniqueIdAndParentLinkDropDown(selectorList, activeDesktop.div_id, null);
    let str = "";
    let data = {};
    data.idOfParentDiv = selectorDropDownId;
    data.view = isBiview ? "biview" : "singleview";
    data.viewName = "schemaView";
    data.isRoot = false;
    str += "<ul>";
    for (let i = 0; i < selectorList.length; i++) {
        str += renderElementListLi(selectorList[i], selector, data, true, isBiview, true);
    }
    let createShieldClass = "createShield";
    let createShieldFromExcelClass = "createShieldFromExcelImport";
    let frameworkType = "Internal";
    if(activeDesktop.key == "shield_schema_desktop" || activeDesktop.key == "bi_shield_schema_desktop") {
    } else if (activeDesktop.key == "standard_schema_desktop" || activeDesktop.key == "bi_standard_schema_desktop") {
        createShieldClass = "createStandard";
        createShieldFromExcelClass = "createStandardFromIngestFile";
        frameworkType = "External";
    } else if (activeDesktop.key == "business_schema_desktop" || activeDesktop.key == "bi_business_schema_desktop") {
        createShieldClass = "createBusinessFramework";
        createShieldFromExcelClass = "createBusinessFrameworkFromIngestFile";
        frameworkType = "Business";
    } else if (activeDesktop.key == "threat_schema_desktop" || activeDesktop.key == "bi_threat_schema_desktop") {
        createShieldClass = "createThreat";
        createShieldFromExcelClass = "createThreatFromIngestFile";
        frameworkType = "Threat";
    }
    str += "<li class=\""+createShieldClass+"\" elementId=\"0\" style=\"font-weight: bold;\">+ "+frameworkType+" Framework</li>";
    str += "<li class=\""+createShieldFromExcelClass+"\" elementId=\"0\" style=\"font-weight: bold;\">+ Ingest from Excel</li>";
    str += "</ul>";
    $("#" + selectorDropDownId).html(str);
}

function renderElementListLi(element, selector, data, isDropdown, isBiview, showDefaultSelectionIcon = false) {
    let str = "";
    let listTitle = (element.acronym) ? "[" + element.acronym.toUpperCase() + "] " + element[ATTR.name].toUpperCase() : element[ATTR.name].toUpperCase();
    str += "<li class=\"" + selector + "Item grpSelector\" elementId=\"" + element.elementId + "\" title=\"" + listTitle + "\" objectType=\"" + element.objectType + "\" level=\"" + element.level + "\">" +
        "<div class=\"\" style=\"display: flex;align-items:center;\">\n";
    if (isDropdown === true) {
        if(showDefaultSelectionIcon) {
            if(element.isDefaultShield)
                str += '<span class="default-framework-action default-framework-action-active flaticon-advance-search" shieldId="'+element.elementId+'"></span>';
            else
                str += '<span class="default-framework-action flaticon-advance-search" shieldId="'+element.elementId+'"></span>';
        }
        str += "<span class=\"\" id=\"" + element[ATTR.elementId] + "\"><span class=\"dropdownIcon\">";
        str += renderCircleOrSquareInventoryDv(element, isBiview, "", true, false) + "</span>";
        if (element.shieldName) {
            str += "<span class=\"acronym\">" + element.shieldName.toUpperCase() + "</span></span>";
            str += "</span><div class=\"hotLinkWrapper\">";
        }
        else {
           str += "<span class=\"acronym\">" + element[ATTR.name].toUpperCase() + "</span></span></span><div class=\"hotLinkWrapper\">";
        }
    }
    else {
        str += "<span class=\"elementListItemLabel\" id=\"" + element[ATTR.elementId] + "\">";
        str += renderCircleOrSquareInventoryDv(element, isBiview, "", true, false);
        str += element[ATTR.name] + "</span><div class=\"hotLinkWrapper\">";
    }
    str += renderHotlinkInventoryDv(element, data.idOfParentDiv, data.view, data.viewName, data.isRoot, isDropdown);
    str += " </div></div>\n" +
        "</li>\n";
    return str;
}

function getShieldStartingPointSearchSelectionObjectForAnalysis(dropDownTwoObject, isStaticMap) {
    let linkName = (isStaticMap) ? dropDownTwoObject.staticLinkName : dropDownTwoObject.linkNameAttr;
    if (dropDownTwoObject && dropDownTwoObject.startingPoint) {
        // switch (dropDownTwoObject.startingPoint) {
        //     case "asset_root":
        //         if (dropDownTwoObject.protectionType) {
        //             switch (dropDownTwoObject.protectionType) {
        //                 case "shall":
        //                     return {
        //                         "linkType": "asset_shall_delivers_sce",
        //                         "isCustom": false
        //                     }
        //                 case "could":
        //                     return {
        //                         "linkType": "asset_could_delivers_sce",
        //                         "isCustom": false
        //                     }
        //                 case "could_and_shall":
        //                     return null;
        //             }
        //         }
        //         else {
        //             return {
        //                 "linkType": "direct_asset_to_shield_element_link",
        //                 "isCustom": false
        //             }
        //         }
        //         break;
        //     case "asset_type_root":
        //         if (dropDownTwoObject.protectionType) {
        //             switch (dropDownTwoObject.protectionType) {
        //                 case "shall":
        //                     return {
        //                         "linkType": "asset_type_shall_be_protected_by_sce",
        //                         "isCustom": false
        //                     }
        //                 case "could":
        //                     return {
        //                         "linkType": "asset_type_could_be_protected_by_sce",
        //                         "isCustom": false
        //                     }
        //                 case "could_and_shall":
        //                     return null;
        //             }
        //         }
        //         else {
        //             return {
        //                 "linkType": "direct_asset_type_to_shield_element_link",
        //                 "isCustom": false
        //             }
        //         }
        //         break;
        //     case "shield_root":
        //         if (dropDownTwoObject.label) {
        //             if (dropDownTwoObject.label.startsWith("Fulfill ")) {
        //                 return {
        //                     "linkType": "sce_fulfills_shield_element",
        //                     "isCustom": false
        //                 }
        //             }
        //             else {
        //                 return {
        //                     "linkType": "direct_shield_element_to_shield_element_link",
        //                     "isCustom": false
        //                 }
        //             }
        //         }
        //         break;
        return {
            "linkName": linkName,
            "isCustom": false
        }
    }
    return null;
}

function showVerticalLine(element) {
    let {linkType} = element;
    let {ASSET, ASSET_TYPE, SHIELD} = constants.directShieldLinkType;
    if (linkType && (linkType === ASSET || linkType === ASSET_TYPE || linkType === SHIELD)) {
        return true;
    }
    else {
        return false;
    }
}

function getPerspectiveInSelection(isBiview) {
    let activeDesktop = getActiveDesktop(isBiview);
    let perspectives = activeDesktop.perspectives.children;
    let selectedPerspectiveId = activeDesktop.perspectivesSelected;
    if ($("#" + activeDesktop.div_id).find(".compositePerspectiveSelection").hasClass("active")) {
        let persCompositeObj = {};
        persCompositeObj.isComposite = true;
        persCompositeObj.color = $("#" + activeDesktop.div_id).find(".compositeColorPicker").val();
        persCompositeObj.selectedPerspective = [];
        for (let i = 0; i < perspectives.length; i++) {
            var match = false;
            for (let j = 0; j < selectedPerspectiveId.length; j++) {
                if (perspectives[i].elementId === parseInt(selectedPerspectiveId[j])) {
                    match = true;
                    break;
                }
            }
            if (!match) {
                persCompositeObj.selectedPerspective.push(perspectives[i]);
            }
        }
        return persCompositeObj;
    }
    else {
        let obj = {};
        obj.isComposite = false;
        for (let i = 0; i < perspectives.length; i++) {
            for (let j = 0; j < selectedPerspectiveId.length; j++) {
                if (perspectives[i].elementId === parseInt(selectedPerspectiveId[j])) {
                    obj.selectedPerspective = perspectives[i];
                }
            }
        }
        return obj;
    }
}

function getPerspectiveWithId(persId, isBiview) {
    let activeDesktop, perspectives, filteredPers;
    activeDesktop = getActiveDesktop(isBiview);
    if (activeDesktop.perspectives && activeDesktop.perspectives.children)
        perspectives = activeDesktop.perspectives.children;
    if (perspectives) {
        filteredPers = perspectives.filter((perspective) => perspective.elementId === parseInt(persId));
        return filteredPers[0];
    }
}

function getLiFromSelector(selectorId, selectedElementId) {
    let index;
    $("#" + selectorId).find("li").each(function (i) {
        if ($(this).attr("elementId") === selectedElementId) {
            index = i;
            return false;
        }
    });
    return index;
}

function getLiFromGroupDropDownSelector(selectorId, selectedElementId, selector) {
    let index;
    $("#" + selectorId).find("." + selector + "").each(function (i) {
        if ($(this).attr("elementId") === selectedElementId) {
            index = $(this);
            return false;
        }
    });
    return index;
}

function getSortElementTypeDropDownObject(objects) {
    let array = [];
    $.each(objects, function (key, value) {
        array.push(value);
    });
    array.sort(function (o1, o2) {
        if (o1.order > o2.order) return 1;
        else if (o1.order < o2.order) return -1;
        else {
            return o1.label.localeCompare(o2.label);
        }
    });
    return array;
}

function getSortedArrayPossibleChildren(possibleChildren) {
    let array = [];
    for (let i = 0; i < possibleChildren.length; i++) {
        let customSearchElement = backing.dictionary_of_unique_id_to_attr_object[possibleChildren[i]];
        if (customSearchElement)
            array.push(customSearchElement);
    }
    array.sort(function (o1, o2) {
        if (o1.order > o2.order) return 1;
        else if (o1.order < o2.order) return -1;
        else {
            return o1.label.localeCompare(o2.label);
        }
    });
    return array;
}

function renderObjectTypesAndElementTypesDropDown(objects, activeDesktop, liElementClass) {
    let str = "";
    let selectorDropDownId = activeDesktop.selector.search_dropdown_id;
    let selectedElement;
    addToDictionary(objects);
    let sortedObj = getSortElementTypeDropDownObject(objects);
    str += "<ul>";
    str += "<li class=\"" + liElementClass + "\" >ALL</li>";
    for (let i = 0; i < sortedObj.length; i++) {
        str += "<li class=\"" + liElementClass + "\"  randomId =\"" + sortedObj[i].randomId + "\">" + sortedObj[i].label.toUpperCase() + "</li>";
    }
    str += "</ul>";
    $("#" + selectorDropDownId).html(str);
    let util = activeDesktop.utilsFunction;
    let dropDownId = activeDesktop.selector.search_dropdown_id;
    let selectedId = activeDesktop.selector.search_dropdown_selected_id;
    selectedElement = $(`#${dropDownId}`).find("ul:first li:first");
    util.searchObjectElementClick(selectedElement, selectedId, dropDownId);
}

function searchWithMappedElements(desktop, isStaticMap, isProjection) {
    let activeDesktop = desktop.activeDesktop;
    let objects, sortedObj, selectedElement, util, dropDownId, selectedId;
    let startingPointObject, index;
    if (isProjection === false) {
        objects = activeDesktop.ObjectTypesAndElementTypes;
        if (objects !== undefined)
            sortedObj = getSortElementTypeDropDownObject(objects);
        util = activeDesktop.utilsFunction;
        dropDownId = activeDesktop.selector.search_dropdown_id;
        selectedId = activeDesktop.selector.search_dropdown_selected_id;
        if (activeDesktop.expressionSelectorSelected) {
            startingPointObject = util.getShieldStartingPointSearchSelectionObject(activeDesktop.expressionSelectorSelected, isStaticMap);
        }
        if (startingPointObject) {
            index = getSearchObjectMatchIndex(sortedObj, startingPointObject);
            if (index && index > 0) {
                index += 2;
                selectedElement = $("#" + dropDownId).find("ul:first li:nth-child(" + index + ")");
            }
            else if (index && index === -1) {
                alert(`There are no ${activeDesktop.expressionSelectorSelected.label} mappings`);
                selectedElement = $(`#${dropDownId}`).find("ul:first li:first");
            }
        }
        else {
            selectedElement = $(`#${dropDownId}`).find("ul:first li:first");
        }
    }
    else {
        objects = activeDesktop.projectionObjectTypesAndElementTypes;
        if (objects !== undefined)
            sortedObj = getSortElementTypeDropDownObject(objects);
        util = new projectionUtils();
        dropDownId = "projection" + activeDesktop.selector.search_dropdown_id;
        selectedId = "projection" + activeDesktop.selector.search_dropdown_selected_id;
        if (activeDesktop.projectionExpressionSelectorSelected) {
            startingPointObject = util.getShieldStartingPointSearchSelectionObject(activeDesktop.projectionExpressionSelectorSelected, isStaticMap);
        }
        if (startingPointObject) {
            index = getSearchObjectMatchIndex(sortedObj, startingPointObject);
            if (index && index > 0) {
                index += 2;
                selectedElement = $("#" + dropDownId).find("ul:first li:nth-child(" + index + ")");
            }
            else if (index && index === -1) {
                alert(`There are no ${activeDesktop.projectionExpressionSelectorSelected.staticLinkName} mappings`);
                selectedElement = $(`#${dropDownId}`).find("ul:first li:first");
            }
        }
        else {
            selectedElement = $(`#${dropDownId}`).find("ul:first li:first");
        }
    }
    util.searchObjectElementClick(selectedElement, selectedId, dropDownId, desktop.isBiview);
}

function showCheckBoxItem(activeDesktop) {
    let objects = activeDesktop.ObjectTypesAndElementTypes;
    let sortedObj = getSortElementTypeDropDownObject(objects);
    let selectedElement;
    let util = activeDesktop.utilsFunction;
    let dropDownId = activeDesktop.selector.search_dropdown_id;
    let selectedId = activeDesktop.selector.search_dropdown_selected_id;
    let index;
    let startingPointObjectLabel = "Asset";
    if (startingPointObjectLabel) {
        index = getSearchObjectLabelMatchIndex(sortedObj, startingPointObjectLabel);
        if (index && index > 0) {
            index += 2;
            selectedElement = $("#" + dropDownId).find("ul:first li:nth-child(" + index + ")");
        }
        else if (index && index === -1) {
            alert(`There are no ${activeDesktop.expressionSelectorSelected.label} mappings`);
            selectedElement = $(`#${dropDownId}`).find("ul:first li:first");
        }
    }
    util.searchObjectElementClick(selectedElement, selectedId, dropDownId);
}

function renderCustomSearchDropDown(randomId, activeDesktop, liElementClass) {
    let str = "";
    let isHaveNoSelected = false;
    let desktop = $("#" + activeDesktop.anchor_div_id);
    let selectorDropDownId = activeDesktop.selector.custom_search_dropdown_id;
    let $selectorDropDownId = $("#" + selectorDropDownId);
    let selectorId = activeDesktop.selector.custom_search_dropdown_selected_id;
    let $selectorId = $("#" + selectorId);
    let searchElement = backing.dictionary_of_unique_id_to_attr_object[randomId];
    if (!desktop.find(".allSearch").hasClass("active")) {
        isHaveNoSelected = true;
    }
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
            customSearchObjectElementClick($("#" + selectorDropDownId + " ul:first li:first"), selectorId, selectorDropDownId);
            $selectorDropDownId.closest(".desktop-selector-container").removeClass("dis-none");
            if (isHaveNoSelected)
                desktop.find(".custom_searchObject_elementType").removeClass("dis-none");
            else
                desktop.find(".custom_searchObject_elementType").addClass("dis-none");
            modifyContainerHeight(desktop);
        }
        else {
            desktop.find(".customSearchSelector").removeClass("active");
            desktop.find(".allSearch").addClass("active");
            $selectorId.removeAttr("randomId");
            $selectorDropDownId.empty();
            $selectorDropDownId.closest(".desktop-selector-container").addClass("dis-none");
            $selectorId.closest(".innerDesktop").find(".search-keyword").keyup();
            modifyContainerHeight(desktop);
        }
    }
    else {
        desktop.find(".customSearchSelector").removeClass("active");
        desktop.find(".allSearch").addClass("active");
        $selectorId.removeAttr("randomId");
        $selectorDropDownId.empty();
        $selectorDropDownId.closest(".desktop-selector-container").addClass("dis-none");
        $selectorId.closest(".innerDesktop").find(".search-keyword").keyup();
        modifyContainerHeight(desktop);
    }
}

function customSearchObjectElementClick(selectedElement, selectedId, dropDownId) {
    let $selectedId = $("#" + selectedId);
    $selectedId.html(selectedElement.html());
    $selectedId.removeAttr("randomId");
    $selectedId.attr("randomId", selectedElement.attr("randomId"));
    $selectedId.closest(".innerDesktop").find(".search-keyword").keyup();
    $("#" + dropDownId).addClass("dis-none");
}

function getSearchObjectMatchIndex(searchTypesArray, searchObject) {
    if (searchTypesArray) {
        for (var i = 0; i < searchTypesArray.length; i++) {
            var objAtIndex = searchTypesArray[i];
            if (typeof(searchObject.isCustom) !== "undefined" && typeof(objAtIndex.isCustom) !== "undefined" && searchObject.isCustom === objAtIndex.isCustom) {
                if (searchObject.objectType && searchObject.shieldElementTypeId && objAtIndex.objectType && objAtIndex.shieldElementTypeId
                    && searchObject.objectType === objAtIndex.objectType && searchObject.shieldElementTypeId === objAtIndex.shieldElementTypeId)
                    return i;
                else if (searchObject.objectType && objAtIndex.objectType && searchObject.objectType === objAtIndex.objectType)
                    return i;
                else if (searchObject.linkName && objAtIndex.linkName && searchObject.linkName === objAtIndex.linkName)
                    return i;
            }
        }
    }
    return -1;
}

function getSearchObjectLabelMatchIndex(searchTypesArray, searchObjectLabel) {
    if (searchTypesArray) {
        for (let i = 0; i < searchTypesArray.length; i++) {
            let objAtIndex = searchTypesArray[i];
            if (objAtIndex.label === searchObjectLabel)
                return i;
        }
    }
    return -1;
}

function reOrderPerspective(isBiview, activeDesktop) {
    let persCount = activeDesktop.perspectivesCount;
    let widthForPers = persCount * 45;
    if ($("#" + activeDesktop.selector.perspective_container_viewContainer).width() < widthForPers && $("#" + activeDesktop.selector.perspective_container).width() < widthForPers) {
        $("#" + activeDesktop.selector.perspective_left_slider_arrow).removeClass("dis-none");
        $("#" + activeDesktop.selector.perspective_right_slider_arrow).removeClass("dis-none");

    }
    else {
        $("#" + activeDesktop.selector.perspective_left_slider_arrow).addClass("dis-none");
        $("#" + activeDesktop.selector.perspective_right_slider_arrow).addClass("dis-none");

        $("#" + activeDesktop.selector.perspective_slider_id).css({'right': '', 'left': '0px'}).animate({
            'left': '0px'
        });
    }
}

function getLinkName(objectType1, objectType2) {
    const SECURITY_ASSET_TO_SHIELD_ELEMENT = "implements";
    const SECURITY_ASSET_TO_STANDARD_ELEMENT = "delivers requirements of";
    const SECURITY_ASSET_TO_BUSINESS_ELEMENT = "delivers protection to";
    const SECURITY_ASSET_TO_THREAT_ELEMENT = "mitigates";

    const BUSINESS_ASSET_TO_SHIELD_ELEMENT = "is policy protected by";
    const BUSINESS_ASSET_TO_STANDARD_ELEMENT = "is in scope of";
    const BUSINESS_ASSET_TO_BUSINESS_ELEMENT = "enables";
    const BUSINESS_ASSET_TO_THREAT_ELEMENT = "is threatened by";

    /*const ELEMENT_TO_ASSET = "implemented by";
    const SHIELD_ELEMENT_TO_BUSINESS_ASSET = "implemented by";*/

    const SHIELD_ELEMENT_TO_SECURITY_ASSET = "is implemented by";
    const STANDARD_ELEMENT_TO_SECURITY_ASSET = "governs";
    const BUSINESS_ELEMENT_TO_SECURITY_ASSET = "is protected by";
    const THREAT_ELEMENT_TO_SECURITY_ASSET = "is mitigated by";

    const SHIELD_ELEMENT_TO_BUSINESS_ASSET = "policy protects";
    const STANDARD_ELEMENT_TO_BUSINESS_ASSET = "governs";
    const BUSINESS_ELEMENT_TO_BUSINESS_ASSET = "is enabled by";
    const THREAT_ELEMENT_TO_BUSINESS_ASSET = "threatens";

    /*const ASSET_TYPE_TO_ELEMENT = "secured by";
    const BUSINESS_ASSET_TYPE_TO_SHIELD_ELEMENT = "secured by";*/

    const SECURITY_ASSET_TYPE_TO_SHIELD_ELEMENT = "implements";
    const SECURITY_ASSET_TYPE_TO_STANDARD_ELEMENT = "delivers requirements of";
    const SECURITY_ASSET_TYPE_TO_BUSINESS_ELEMENT = "delivers protection to";
    const SECURITY_ASSET_TYPE_TO_THREAT_ELEMENT = "mitigates";

    const BUSINESS_ASSET_TYPE_TO_SHIELD_ELEMENT = "is policy protected by";
    const BUSINESS_ASSET_TYPE_TO_STANDARD_ELEMENT = "is in scope of";
    const BUSINESS_ASSET_TYPE_TO_BUSINESS_ELEMENT = "enables";
    const BUSINESS_ASSET_TYPE_TO_THREAT_ELEMENT = "is threatened by";


    /*const ELEMENT_TO_ASSET_TYPE = "secures";
    const SHIELD_ELEMENT_TO_BUSINESS_ASSET_TYPE = "secures";*/

    const SHIELD_ELEMENT_TO_SECURITY_ASSET_TYPE = "is implemented by";
    const STANDARD_ELEMENT_TO_SECURITY_ASSET_TYPE = "governs";
    const BUSINESS_ELEMENT_TO_SECURITY_ASSET_TYPE = "is protected by";
    const THREAT_ELEMENT_TO_SECURITY_ASSET_TYPE = "is mitigated by";

    const SHIELD_ELEMENT_TO_BUSINESS_ASSET_TYPE = "policy protects";
    const STANDARD_ELEMENT_TO_BUSINESS_ASSET_TYPE = "governs";
    const BUSINESS_ELEMENT_TO_BUSINESS_ASSET_TYPE = "is enabled by";
    const THREAT_ELEMENT_TO_BUSINESS_ASSET_TYPE = "threatens";

    /*const ELEMENT_MAP_TO_ELEMENT = "related to";*/

    const SHIELD_ELEMENT_TO_SHIELD_ELEMENT = "is related to";
    const SHIELD_ELEMENT_TO_STANDARD_ELEMENT = "validates";
    const SHIELD_ELEMENT_TO_BUSINESS_ELEMENT = "policy protects";
    const SHIELD_ELEMENT_TO_THREAT_ELEMENT = "manages";

    const STANDARD_ELEMENT_TO_SHIELD_ELEMENT = "is validated by";
    const STANDARD_ELEMENT_TO_STANDARD_ELEMENT = "is related to";
    const STANDARD_ELEMENT_TO_BUSINESS_ELEMENT = "governs";
    const STANDARD_ELEMENT_TO_THREAT_ELEMENT = "governs";

    const BUSINESS_ELEMENT_TO_SHIELD_ELEMENT = "is policy protected by";
    const BUSINESS_ELEMENT_TO_STANDARD_ELEMENT = "is in scope of";
    const BUSINESS_ELEMENT_TO_BUSINESS_ELEMENT = "is related to";
    const BUSINESS_ELEMENT_TO_THREAT_ELEMENT = "is threatened by";

    const THREAT_ELEMENT_TO_SHIELD_ELEMENT = "is managed by";
    const THREAT_ELEMENT_TO_STANDARD_ELEMENT = "is in scope of";
    const THREAT_ELEMENT_TO_BUSINESS_ELEMENT = "threatens";
    const THREAT_ELEMENT_TO_THREAT_ELEMENT = "is related to";

    switch (objectType1) {
        case backing.object_type.shield_element.key:
            return getLinkNameForShieldElement(objectType2);
        case backing.object_type.standard_element.key:
            return getLinkNameForStandardElement(objectType2);
        case backing.object_type.b_control.key:
            return getLinkNameForBusinessElement(objectType2);
        case backing.object_type.threat_element.key:
            return getLinkNameForThreatElement(objectType2);
        case backing.object_type.asset_type.key:
            return getLinkNameForSecurityAssetType(objectType2);
        case backing.object_type.asset.key:
            return getLinkNameForSecurityAsset(objectType2);
        case backing.object_type.business_asset.key:
            return getLinkNameForBusinessAsset(objectType2);
        case backing.object_type.business_asset_type.key:
            return getLinkNameForBusinessAssetType(objectType2);
    }
    return "";
    function getLinkNameForShieldElement(objectType2) {
        switch (objectType2) {
            case backing.object_type.shield_element.key:
                return SHIELD_ELEMENT_TO_SHIELD_ELEMENT;
            case backing.object_type.standard_element.key:
                return SHIELD_ELEMENT_TO_STANDARD_ELEMENT;
            case backing.object_type.b_control.key:
                return SHIELD_ELEMENT_TO_BUSINESS_ELEMENT;
            case backing.object_type.threat_element.key:
                return SHIELD_ELEMENT_TO_THREAT_ELEMENT;
            case backing.object_type.asset_type.key:
                return SHIELD_ELEMENT_TO_SECURITY_ASSET_TYPE;
            case backing.object_type.asset.key:
                return SHIELD_ELEMENT_TO_SECURITY_ASSET;
            case backing.object_type.business_asset.key:
                return SHIELD_ELEMENT_TO_BUSINESS_ASSET;
            case backing.object_type.business_asset_type.key:
                return SHIELD_ELEMENT_TO_BUSINESS_ASSET_TYPE;
        }
        return "";
    }

    function getLinkNameForStandardElement(objectType2) {
        switch (objectType2) {
            case backing.object_type.shield_element.key:
                return STANDARD_ELEMENT_TO_SHIELD_ELEMENT;
            case backing.object_type.standard_element.key:
                return STANDARD_ELEMENT_TO_STANDARD_ELEMENT;
            case backing.object_type.b_control.key:
                return STANDARD_ELEMENT_TO_BUSINESS_ELEMENT;
            case backing.object_type.threat_element.key:
                return STANDARD_ELEMENT_TO_THREAT_ELEMENT;
            case backing.object_type.asset_type.key:
                return STANDARD_ELEMENT_TO_SECURITY_ASSET_TYPE;
            case backing.object_type.asset.key:
                return STANDARD_ELEMENT_TO_SECURITY_ASSET;
            case backing.object_type.business_asset.key:
                return STANDARD_ELEMENT_TO_BUSINESS_ASSET;
            case backing.object_type.business_asset_type.key:
                return STANDARD_ELEMENT_TO_BUSINESS_ASSET_TYPE;
        }
        return "";
    }

    function getLinkNameForBusinessElement(objectType2) {
        switch (objectType2) {
            case backing.object_type.shield_element.key:
                return BUSINESS_ELEMENT_TO_SHIELD_ELEMENT;
            case backing.object_type.standard_element.key:
                return BUSINESS_ELEMENT_TO_STANDARD_ELEMENT;
            case backing.object_type.b_control.key:
                return BUSINESS_ELEMENT_TO_BUSINESS_ELEMENT;
            case backing.object_type.threat_element.key:
                return BUSINESS_ELEMENT_TO_THREAT_ELEMENT;
            case backing.object_type.asset_type.key:
                return BUSINESS_ELEMENT_TO_SECURITY_ASSET_TYPE;
            case backing.object_type.asset.key:
                return BUSINESS_ELEMENT_TO_SECURITY_ASSET;
            case backing.object_type.business_asset.key:
                return BUSINESS_ELEMENT_TO_BUSINESS_ASSET;
            case backing.object_type.business_asset_type.key:
                return BUSINESS_ELEMENT_TO_BUSINESS_ASSET_TYPE;
        }
        return "";
    }

    function getLinkNameForThreatElement(objectType2) {
        switch (objectType2) {
            case backing.object_type.shield_element.key:
                return THREAT_ELEMENT_TO_SHIELD_ELEMENT;
            case backing.object_type.standard_element.key:
                return THREAT_ELEMENT_TO_STANDARD_ELEMENT;
            case backing.object_type.b_control.key:
                return THREAT_ELEMENT_TO_BUSINESS_ELEMENT;
            case backing.object_type.threat_element.key:
                return THREAT_ELEMENT_TO_THREAT_ELEMENT;
            case backing.object_type.asset_type.key:
                return THREAT_ELEMENT_TO_SECURITY_ASSET_TYPE;
            case backing.object_type.asset.key:
                return THREAT_ELEMENT_TO_SECURITY_ASSET;
            case backing.object_type.business_asset.key:
                return THREAT_ELEMENT_TO_BUSINESS_ASSET;
            case backing.object_type.business_asset_type.key:
                return THREAT_ELEMENT_TO_BUSINESS_ASSET_TYPE;
        }
        return "";
    }

    function getLinkNameForSecurityAssetType(objectType2) {
        switch (objectType2) {
            case backing.object_type.shield_element.key:
                return SECURITY_ASSET_TYPE_TO_SHIELD_ELEMENT;
            case backing.object_type.standard_element.key:
                return SECURITY_ASSET_TYPE_TO_STANDARD_ELEMENT;
            case backing.object_type.b_control.key:
                return SECURITY_ASSET_TYPE_TO_BUSINESS_ELEMENT;
            case backing.object_type.threat_element.key:
                return SECURITY_ASSET_TYPE_TO_THREAT_ELEMENT;
        }
        return "";
    }

    function getLinkNameForSecurityAsset(objectType2) {
        switch (objectType2) {
            case backing.object_type.shield_element.key:
                return SECURITY_ASSET_TO_SHIELD_ELEMENT;
            case backing.object_type.standard_element.key:
                return SECURITY_ASSET_TO_STANDARD_ELEMENT;
            case backing.object_type.b_control.key:
                return SECURITY_ASSET_TO_BUSINESS_ELEMENT;
            case backing.object_type.threat_element.key:
                return SECURITY_ASSET_TO_THREAT_ELEMENT;
        }
        return "";
    }

    function getLinkNameForBusinessAssetType(objectType2) {
        switch (objectType2) {
            case backing.object_type.shield_element.key:
                return BUSINESS_ASSET_TYPE_TO_SHIELD_ELEMENT;
            case backing.object_type.standard_element.key:
                return BUSINESS_ASSET_TYPE_TO_STANDARD_ELEMENT;
            case backing.object_type.b_control.key:
                return BUSINESS_ASSET_TYPE_TO_BUSINESS_ELEMENT;
            case backing.object_type.threat_element.key:
                return BUSINESS_ASSET_TYPE_TO_THREAT_ELEMENT;
        }
        return "";
    }

    function getLinkNameForBusinessAsset(objectType2) {
        switch (objectType2) {
            case backing.object_type.shield_element.key:
                return BUSINESS_ASSET_TO_SHIELD_ELEMENT;
            case backing.object_type.standard_element.key:
                return BUSINESS_ASSET_TO_STANDARD_ELEMENT;
            case backing.object_type.b_control.key:
                return BUSINESS_ASSET_TO_BUSINESS_ELEMENT;
            case backing.object_type.threat_element.key:
                return BUSINESS_ASSET_TO_THREAT_ELEMENT;
        }
        return "";
    }
}