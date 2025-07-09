$(document).ready(function () {
    $(document).on("click", ".shieldSelectorEvaluationItem", function (e) {
        evalLufId=$(this).attr("elementId");
        let rulerTypeDesktopUtil = new RulerTypeDesktopUtils();
        rulerTypeDesktopUtil.shieldSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".levelSelectorEvaluationItem", function (e) {
        let rulerTypeDesktopUtil = new RulerTypeDesktopUtils();
        rulerTypeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".groupSelectorEvaluationItem", function (e) {
        let rulerTypeDesktopUtil = new RulerTypeDesktopUtils();
        rulerTypeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".shieldSelectorProjectionItem", function (e) {
        let projectionUtil = new projectionUtils();
        let view = $(this).closest(".innerDesktop").attr("view");
        let isBiview = isBiViewOrNot(view);
        let viewDivId = $(this).closest(".innerDesktop").attr("id");
        let hotlinkData = {view, viewDivId};
        projectionUtil.shieldSelectorClick($(this), hotlinkData, isBiview);
        e.stopPropagation();
    });

    $(document).on("click", ".levelSelectorProjectionItem", function (e) {
        let projectionUtil = new projectionUtils();
        let view = $(this).closest(".innerDesktop").attr("view");
        let isBiview = isBiViewOrNot(view);
        let viewDivId = $(this).closest(".innerDesktop").attr("id");
        let hotlinkData = {view, viewDivId};
        projectionUtil.levelSelectorClick($(this), hotlinkData, isBiview);
        e.stopPropagation();
    });

    $(document).on("click", ".groupSelectorProjectionItem", function (e) {
        let projectionUtil = new projectionUtils();
        let view = $(this).closest(".innerDesktop").attr("view");
        let isBiview = isBiViewOrNot(view);
        let viewDivId = $(this).closest(".innerDesktop").attr("id");
        let hotlinkData = {view, viewDivId};
        projectionUtil.groupSelectorClick($(this), hotlinkData, isBiview);
        e.stopPropagation();
    });

    $(document).on("click", ".evalSearchObject_ElementTypeItem", function (e) {
        let rulerTypeDesktopUtil = new RulerTypeDesktopUtils();
        let dropDownId = "single_r_type_desk_search_dropdown_content";
        let selectedId = "single_r_type_desk_search_dropdown_selected";
        rulerTypeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".evalCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_r_type_desk_custom_search_dropdown_content";
        let selectedId = "single_r_type_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".searchMinIndexItem", function (e) {
        let rulerTypeDesktopUtil = new RulerTypeDesktopUtils();
        rulerTypeDesktopUtil.minIndexSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".searchMaxIndexItem", function (e) {
        let rulerTypeDesktopUtil = new RulerTypeDesktopUtils();
        rulerTypeDesktopUtil.maxIndexSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".projectionView", function (e) {
        $("#saveData").show();
        $(this).addClass("active");
        let projectionUtil = new projectionUtils();
        let view = $(this).closest(".innerDesktop").attr("view");
        let isBiview = isBiViewOrNot(view);
        let src_hotlinkId = $(this).attr("id"),
            uniqueId = $(this).attr("uniqueId");
        let activeDesktop = getActiveDesktop(isBiview);
        let viewDivId = "projection" + activeDesktop.anchor_div_id;
        let shieldId = $("#" + activeDesktop.selector.shield_dropdown_selected_id).attr("elementId");
        let data = {shieldId};
        let hotlinkData = {src_hotlinkId, view, viewDivId, uniqueId};
        //check for space in screen
        let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.projection_view.key);
        if (!haveSpaceToOpenView) {
            $("#saveData").hide();
            return;
        }
        //check view is opened before
        hotlinkData.isViewOpenedBefore = false;
        let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(viewDivId, isBiview);
        if (isViewOpenedBefore) {
            hotlinkData.isViewOpenedBefore = true;
            projectionUtil.getShieldsOfShieldType(data.shieldId, hotlinkData, isBiview);
            return;
        }
        let selectedShield = $("#" + activeDesktop.selector.shield_dropdown_selected_id).html();
        renderProjectionView(viewDivId, isBiview, selectedShield);
        UpdateSelectorOfDesktop(activeDesktop);
        projectionUtil.getShieldsOfShieldType(data.shieldId, hotlinkData, isBiview);
        e.stopPropagation();
    });

    $(document).on("click", ".projectionSearchObject_ElementTypeItem", function (e) {
        let view = $(this).closest(".innerDesktop").attr("view");
        let isBiview = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiview);
        let projectionUtil = new projectionUtils();
        let dropDownId = "projection" + activeDesktop.selector.search_dropdown_id;
        let selectedId = "projection" + activeDesktop.selector.search_dropdown_selected_id;
        projectionUtil.searchObjectElementClick($(this), selectedId, dropDownId, isBiview);
        e.stopPropagation();
    });

    $(document).on("click", ".projectionCustomSearchObject_ElementTypeItem", function (e) {
        let view = $(this).closest(".innerDesktop").attr("view");
        let isBiview = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiview);
        let projectionUtil = new projectionUtils();
        let dropDownId = "projection" + activeDesktop.selector.custom_search_dropdown_id;
        let selectedId = "projection" + activeDesktop.selector.custom_search_dropdown_selected_id;
        customSearchObjectElementClick($(this), selectedId, dropDownId, isBiview);
        e.stopPropagation();
    });

    $(document).on("click", ".projectionSearchMinIndexItem", function (e) {
        let view = $(this).closest(".innerDesktop").attr("view");
        let isBiview = isBiViewOrNot(view);
        let projectionUtil = new projectionUtils();
        projectionUtil.minIndexSelectorClick($(this), isBiview);
        e.stopPropagation();
    });

    $(document).on("click", ".projectionSearchMaxIndexItem", function (e) {
        let view = $(this).closest(".innerDesktop").attr("view");
        let isBiview = isBiViewOrNot(view);
        let projectionUtil = new projectionUtils();
        projectionUtil.maxIndexSelectorClick($(this), isBiview);
        e.stopPropagation();
    });

    /*biview selectors*/
    $(document).on("click", ".biShieldSelectorEvaluationItem", function (e) {
        evalLufId=$(this).attr("elementId");
        let rulerTypeDesktopUtil = new BiViewRulerTypeDesktopUtils();
        rulerTypeDesktopUtil.shieldSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biLevelSelectorEvaluationItem", function (e) {
        let rulerTypeDesktopUtil = new BiViewRulerTypeDesktopUtils();
        rulerTypeDesktopUtil.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biGroupSelectorEvaluationItem", function (e) {
        let rulerTypeDesktopUtil = new BiViewRulerTypeDesktopUtils();
        rulerTypeDesktopUtil.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biEvalSearchObject_ElementTypeItem", function (e) {
        let rulerTypeDesktopUtil = new BiViewRulerTypeDesktopUtils();
        let dropDownId = "bi_r_type_desk_search_dropdown_content";
        let selectedId = "bi_r_type_desk_search_dropdown_selected";
        rulerTypeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biEvalCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_r_type_desk_custom_search_dropdown_content";
        let selectedId = "bi_r_type_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biSearchMinIndexItem", function (e) {
        let rulerTypeDesktopUtil = new BiViewRulerTypeDesktopUtils();
        rulerTypeDesktopUtil.minIndexSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biSearchMaxIndexItem", function (e) {
        let rulerTypeDesktopUtil = new BiViewRulerTypeDesktopUtils();
        rulerTypeDesktopUtil.maxIndexSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".compositePerspectiveSelectionInBiview", function (e) {
        $("#saveData").show();
        let desktop = $(this).closest(".innerDesktop");
        let data = {};
        let selectedPerspectives = [];
        desktop.find(".perspectivesSelector").addClass("activated");
        desktop.find(".perspectiveModeSelector").removeClass("active");
        $(this).addClass("active");
        desktop.find(".desktop-perspective-selector-container").find(".perspectiveSelectorEvaluationItem").each(function () {
            $(this).find("input").prop('checked', true);
            let persColor = $(this).attr("persColor");
            $(this).attr("style", "background-color:" + persColor);

        });
        desktop.find(".perspectiveUl").find(".perspectiveItem").each(function () {
            $(this).addClass("selected");
            let persColor = $(this).attr("persColor");
            $(this).attr("style", "background-color:" + persColor);
            selectedPerspectives.push($(this).attr("elementId"));
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
        e.stopPropagation();
    });

});

function UpdateSelectorOfDesktop(activeDesktop) {
    let selector = activeDesktop.selector;
    let shieldId = selector.shield_dropdown_selected_id;
    let levelId = $("#projected" + selector.level_dropdown_selected_id);
    let groupId = $("#projected" + selector.groups_dropdown_selected_id);
    let iconClass = $("#" + shieldId).closest(".desktop-selector-dropdown").find(".mapToIcon").attr("class");
    let iconId = $("#projected" + shieldId);
    iconId.closest(".desktop-selector").find(".mapToIcon").addClass(iconClass);
    iconId.html($("#" + selector.shield_dropdown_selected_id).html());
    if ($("#" + selector.level_dropdown_selected_id).html() === "")
        levelId.closest(".desktop-selector").find(".levelIcon").addClass("opacityDull");
    else
        levelId.closest(".desktop-selector").find(".levelIcon").removeClass("opacityDull");
    if ($("#" + selector.groups_dropdown_selected_id).html() === "")
        groupId.closest(".desktop-selector").find(".groupIcon").addClass("opacityDull");
    else
        groupId.closest(".desktop-selector").find(".groupIcon").removeClass("opacityDull");
    groupId.html($("#" + selector.groups_dropdown_selected_id).html());
    levelId.html($("#" + selector.level_dropdown_selected_id).html());
}

function projectionUtils() {
    let projectionViewUtil = new Object();

    function getShieldsOfShieldType(shieldId, hotlinkData, isBiview) {
        let activeDesktop = getActiveDesktop(isBiview);
        let view = getSingleOrBiView(isBiview);
        let previousSelector = activeDesktop.ProjectionpreviousSelectors;
        previousSelector={shieldSelectorId: evalLufId};
        let selectorId = "projection" + activeDesktop.selector.shield_dropdown_id;
        activeDesktop.projectionExpressionSelectorSelected = {};
        $("#saveData").show();

        let callback = function (res) {
            serviceFunctions.getDefaultShieldPrefs((defaultPrefs) => {
                let data = {};
                data.idOfParentDiv = selectorId;
                data.view = view;
                data.viewName = "groupView";
                data.isRoot = false;
                renderSelectorDropDown(activeDesktop, res.children, "shieldSelector", "shieldSelectorProjection", data, true, defaultPrefs);
                shieldSelectorProjection(previousSelector, selectorId, shieldSelectorClick, hotlinkData, isBiview);
            });
        };
        let data = {};
        data.shieldId = shieldId;
        //let linkName = (backing.isDirectMode) ? constants.linkNames["ELEMENT_MAP_TO_ELEMENT"] : constants.linkNames["EXPRESSION_TO_ELEMENT"];
        let linkName = constants.linkNames["ELEMENT_MAP_TO_ELEMENT"];
        activeDesktop.projectionExpressionSelectorSelected["staticLinkName"] = linkName;
        activeDesktop.projectionExpressionSelectorSelected["startingPoint"] = "asset_root";
        serviceFunctions.getShieldsAndStandardsExcluding(data, callback);
    }

    function getAllowedLevels(data, hotlinkData, isBiview) {
        let activeDesktop = getActiveDesktop(isBiview);
        let view = getSingleOrBiView(isBiview);
        let previousSelector = activeDesktop.ProjectionpreviousSelectors;
        let selectorId = "projection" + activeDesktop.selector.level_dropdown_id;
        let callback = function (res) {
            let data = {};
            data.idOfParentDiv = selectorId;
            data.view = view;
            data.viewName = "groupView";
            data.isRoot = false;
            renderSelectorDropDown(activeDesktop, res, "levelSelector", "levelSelectorProjection", data);
            levelSelectorProjection(previousSelector, selectorId, levelSelectorClick, hotlinkData, isBiview);
        };
        serviceFunctions.getAllowedLevels(data, callback);
    }

    function getElementGroups(data, hotlinkData, isBiview) {
        let activeDesktop = getActiveDesktop(isBiview);
        let selectorId = "projection" + activeDesktop.selector.groups_dropdown_id;
        let previousSelector = activeDesktop.ProjectionpreviousSelectors;
        let view = getSingleOrBiView(isBiview);
        let callback = function (res) {
            let data = {};
            data.idOfParentDiv = selectorId;
            data.view = view;
            data.viewName = "groupView";
            data.isRoot = false;
            renderSelectorDropDown(activeDesktop, res, "groupSelector", "groupSelectorProjection", data, true);
            groupSelectorProjection(previousSelector, selectorId, getLiFromSelector, groupSelectorClick, hotlinkData, isBiview, "groupSelectorProjection");
        };
        serviceFunctions.getGroupsGivenMaxLevel(data, callback);
    }

    function getDirectoryView({src_hotlinkId, view, viewDivId, uniqueId, isViewOpenedBefore}) {
        let isBiview = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiview);
        let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
        let data = {};
        let backingView = (isBiview === false) ? backing.singleview : backing.biview;
        let isRingViewActive = $(`#projection${activeDesktop.anchor_div_id}`).find(".projectionRingView").hasClass("active");
        data.shieldId = $("#" + activeDesktop.selector.shield_dropdown_selected_id).attr("elementId");
        data.directMode = backing.isDirectMode;
        data.level = $("#" + activeDesktop.selector.level_dropdown_selected_id).attr("elementId");
        data.perspectiveIds = activeDesktop.perspectivesSelected;
        data.projectionLevel = $("#projection" + activeDesktop.selector.level_dropdown_selected_id).attr("elementId");
        data.projectionShieldElementGroupId = $("#projection" + activeDesktop.selector.groups_dropdown_selected_id).attr("elementId");
        data.projectionShieldId = $("#projection" + activeDesktop.selector.shield_dropdown_selected_id).attr("elementId");
        data.shieldElementGroupId = $("#" + activeDesktop.selector.groups_dropdown_selected_id).attr("elementId");

        // let previousSelector = backing.singleview.workspaces[workspace].desktops[desktop].previousSelectors;
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }
        if (activeDesktop.key === "ruler_type_desktop") {
            var callbackfn = function (res, err) {
                if (res) {
                    activeDesktop.perspectivesSelected = data.perspectiveIds;
                    let directoryViewTreeId = "projection" + activeDesktop.tree_container_id;
                    if (activeDesktop) {
                        generateUniqueIdAndParentLink(res, "projection" + activeDesktop.div_id, null);
                        backingView.projectionDesktops.ruler_type_desktop["directoryJson"] = res;
                        if (isViewOpenedBefore || !src_hotlinkId) {
                            (!isRingViewActive) ? renderDirectoryView(res, directoryViewTreeId, view, "projectionView", isBiview) : getProjectionRings(activeDesktop, backingView.projectionDesktops[activeDesktop.key], view);
                            UpdateSelectorOfDesktop(activeDesktop);
                            let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                            activeDesktop.projectionObjectTypesAndElementTypes = objectTypesAndElementTypes;
                            if (objectTypesAndElementTypes) {
                                renderObjectAndElementTypesDropDownForViews(objectTypesAndElementTypes, activeDesktop, "projectionSearchObject_ElementTypeItem");
                            }
                            renderMinIndexDropDown();
                            renderMaxIndexDropDown();
                            return;
                        }
                        (!isRingViewActive) ? renderDirectoryView(res, directoryViewTreeId, view, "projectionView", isBiview) : getProjectionRings(activeDesktop, backingView.projectionDesktops[activeDesktop.key], view);
                        createScenarioViewOpenedFromAnchorSingleCase(viewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.projection_view.key, "Projection View ", uniqueId, isBiview, res);
                        let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                        activeDesktop.projectionObjectTypesAndElementTypes = objectTypesAndElementTypes;
                        if (objectTypesAndElementTypes) {
                            renderObjectAndElementTypesDropDownForViews(objectTypesAndElementTypes, activeDesktop, "projectionSearchObject_ElementTypeItem");
                        }
                        renderMinIndexDropDown();
                        renderMaxIndexDropDown();
                        highlightSourceAndView(viewDivId, isBiview);
                        $(`#projection${activeDesktop.anchor_div_id}`).removeClass("dis-none");
                        repositionViews(isBiview);
                        $("#saveData").hide()
                    }
                    modifyContainerHeight($("#projection" + activeDesktop.anchor_div_id));
                }
                else if (err) {
                    $("#saveData").hide();
                }
            };
            if(!backing.isDirectMode)
                service.getAssetDeliversProjectionDv(data, callbackfn);
            else
                service.getAssetImplementsProjectionDv(data, callbackfn);
        }
        else if (activeDesktop.key === "shield_element_ruler_type_desktop") {
            service.getShieldElementProjectionDv(data, function (res, err) {
                if (res) {
                    activeDesktop.perspectivesSelected = data.perspectiveIds;

                    let directoryViewTreeId = "projection" + activeDesktop.tree_container_id;
                    if (activeDesktop) {
                        generateUniqueIdAndParentLink(res, "projection" + activeDesktop.div_id, null);
                        backingView.projectionDesktops.shield_element_ruler_type_desktop["directoryJson"] = res;
                        if (isViewOpenedBefore || !src_hotlinkId) {
                            (!isRingViewActive) ? renderDirectoryView(res, directoryViewTreeId, view, "projectionView", isBiview) : getProjectionRings(activeDesktop, backingView.projectionDesktops[activeDesktop.key], view);
                            UpdateSelectorOfDesktop(activeDesktop);
                            let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                            activeDesktop.projectionObjectTypesAndElementTypes = objectTypesAndElementTypes;
                            if (objectTypesAndElementTypes) {
                                renderObjectAndElementTypesDropDownForViews(objectTypesAndElementTypes, activeDesktop, "projectionSearchObject_ElementTypeItem");
                            }
                            renderMinIndexDropDown(isBiview);
                            renderMaxIndexDropDown(isBiview);
                            return;
                        }
                        (!isRingViewActive) ? renderDirectoryView(res, directoryViewTreeId, view, "projectionView", isBiview) : getProjectionRings(activeDesktop, backingView.projectionDesktops[activeDesktop.key], view);
                        createScenarioViewOpenedFromAnchorSingleCase(viewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.projection_view.key, "Projection View ", uniqueId, isBiview, res);
                        let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                        activeDesktop.projectionObjectTypesAndElementTypes = objectTypesAndElementTypes;
                        if (objectTypesAndElementTypes) {
                            renderObjectAndElementTypesDropDownForViews(objectTypesAndElementTypes, activeDesktop, "projectionSearchObject_ElementTypeItem");
                        }
                        renderMinIndexDropDown(isBiview);
                        renderMaxIndexDropDown(isBiview);
                        highlightSourceAndView(viewDivId, isBiview);
                        $(`#projection${activeDesktop.anchor_div_id}`).removeClass("dis-none");
                        repositionViews(isBiview);

                        $("#saveData").hide()
                    }
                    modifyContainerHeight($("#projection" + activeDesktop.anchor_div_id));
                }
                else if (err) {
                    $("#saveData").hide();
                }
            });
        }
        $("#saveData").show();
    }

    function renderMinIndexDropDown(isBiview) {
        let activeDesktop = getActiveDesktop(isBiview);
        let selectorDropDownId = `projection${activeDesktop.selector.search_min_index_dropdown_id}`;

        let str = "";
        str += "<ul>";
        for (let i = 0; i <= 1;) {
            str += "<li class=\"projectionSearchMinIndexItem\">" + i.toFixed(1) + "</li>\n";
            i = (i + 0.1);
        }
        str += "</ul>";
        $("#" + selectorDropDownId).html(str);
    }

    function renderMaxIndexDropDown(isBiview) {
        let activeDesktop = getActiveDesktop(isBiview);
        let selectorDropDownId = `projection${activeDesktop.selector.search_max_index_dropdown_id}`;
        let minIndexSelectorId = `projection${activeDesktop.selector.search_min_index_dropdown_selected_id}`;
        let minIndex = parseFloat($("#" + minIndexSelectorId).html());
        let str = "";
        str += "<ul>";
        for (let i = minIndex; i <= 1;) {
            str += "<li class=\"projectionSearchMaxIndexItem\">" + i.toFixed(1) + "</li>\n";
            i = (i + 0.1);
        }
        str += "</ul>";
        $("#" + selectorDropDownId).html(str);
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId, isBiview) {
        let activeDesktop = getActiveDesktop(isBiview);
        let $selectedId = $("#" + selectedId);
        if (selectedElement.attr("randomId")) {
            $selectedId.html(selectedElement.html());
            $selectedId.parent().find(".searchIcon").removeClass("opacityDull");
        }
        else {
            $selectedId.parent().find(".searchIcon").addClass("opacityDull");
            $selectedId.html("");
        }
        $selectedId.removeAttr("randomId");
        $selectedId.attr("randomId", selectedElement.attr("randomId"));
        $("#" + dropDownId).addClass("dis-none");
        renderCustomSearchDropDownForViews(selectedElement.attr("randomId"), activeDesktop, "projectionCustomSearchObject_ElementTypeItem", isBiview);
    }

    function shieldSelectorClick(selectedElement, hotlinkData, isBiview) {
        let activeDesktop = getActiveDesktop(isBiview);
        refreshProjectionRingView(activeDesktop, isBiview);

        function canHaveCreateShieldElementHotlink(shieldId, isBiView) {
            service.getTypesThatCanHaveCreateShieldElementHotlink(shieldId, function (res, err) {
                if (res) {
                    activeDesktop.canHaveCreateShieldElementHotlink = res;
                }
                else if (err) {
                    $("#saveData").hide();
                }
            });
        }

        let data = {};
        data.shieldId = selectedElement.attr("elementId");
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }
        canHaveCreateShieldElementHotlink(data.shieldId, false);

        $("#saveData").show();
        getAllowedLevels(data, hotlinkData, isBiview);
        let selectorId = "projection" + activeDesktop.selector.shield_dropdown_selected_id;
        $("#" + selectorId).closest(".desktop-selector-dropdown").find(".mapToIcon").removeClass("flaticon-shield-element flaticon-standard-element flaticon-business-element flaticon-threat-control");
        let controlsClass = null;
        let controlLabel = null;
        // let controlsClass = (selectedElement.attr("objectType") === "shield") ? "flaticon-shield-element" : "flaticon-standard-element";
        switch(selectedElement.attr("objectType")) {
            case constants.objectType.SHIELD:
                controlsClass = "flaticon-shield-element";
                controlLabel = " Internal Policies of"
                break;
            case constants.objectType.STANDARD:
                controlsClass = "flaticon-standard-element";
                controlLabel = "External Policies of"
                break;
            case constants.objectType.BUSINESS:
                controlsClass = "flaticon-business-element";
                controlLabel = "Value Processes of"
                break;
            case constants.objectType.THREAT:
                controlsClass = "flaticon-threat-control";
                controlLabel = "Threat Vectors of"
                break;
            default:
                controlsClass = "flaticon-shield-element";
                controlLabel = " Internal Policies of"
        }
        $("#" + selectorId).closest(".desktop-selector-dropdown").find(".mapToIcon").addClass(controlsClass);
        $("#" + selectorId).closest(".desktop-selector-dropdown").find(".labelText:first").html(controlLabel);
        $("#" + selectorId).html(selectedElement.find(".dropdownIcon").html() + selectedElement.find(".acronym").html());
        $("#" + selectorId).attr("title", selectedElement[0].title);
        $("#" + selectorId).attr("elementId", selectedElement.attr("elementId"));
    }

    function levelSelectorClick(selectedElement, hotlinkData, isBiview) {
        let activeDesktop = getActiveDesktop(isBiview);
        refreshProjectionRingView(activeDesktop, isBiview);
        if (!selectedElement) {
            $(".desktop-selector-dropdown-content").addClass("dis-none");
            return;
        }
        let data = {};
        data.shieldId = $("#projection" + activeDesktop.selector.shield_dropdown_selected_id).attr("elementId");
        data.level = selectedElement.attr("elementId");
        $("#saveData").show();
        getElementGroups(data, hotlinkData, isBiview);

        $(".desktop-selector-dropdown-content").addClass("dis-none");
        let selectorId = "projection" + activeDesktop.selector.level_dropdown_selected_id;
        let $levelSelected = $("#" + selectorId);
        if (selectedElement.attr("elementId") !== "0") {
            $levelSelected.attr("title", selectedElement.html());
            $levelSelected.html(selectedElement.html());
            $levelSelected.parent().find(".levelIcon").removeClass("opacityDull");
        }
        else {
            $levelSelected.attr("title", "");
            $levelSelected.parent().find(".levelIcon").addClass("opacityDull");
            $levelSelected.html("");
        }
        $("#" + selectorId).attr("elementId", selectedElement.attr("elementId"));

    }

    function groupSelectorClick(selectedElement, hotlinkData, isBiview) {
        let activeDesktop = getActiveDesktop(isBiview);
        refreshProjectionRingView(activeDesktop, isBiview);
        if (!selectedElement) {
            $(".desktop-selector-dropdown-content").addClass("dis-none");
            return;
        }
        // else if($("#single_sh_arch_desk_groups_dropdown_selected").html() === selectedElement.html()){
        //     $(".desktop-selector-dropdown-content").addClass("dis-none");
        //     return;
        // }
        $("#saveData").show();
        $(".desktop-selector-dropdown-content").addClass("dis-none");
        let selectorId = "projection" + activeDesktop.selector.groups_dropdown_selected_id;
        let $groupSelected = $("#" + selectorId);
        if (selectedElement.attr("elementId") !== "0") {
            $groupSelected.attr("title", selectedElement.html());
            $groupSelected.html(selectedElement.html());
            $groupSelected.parent().find(".groupIcon").removeClass("opacityDull");
        }
        else {
            $groupSelected.attr("title", "");
            $groupSelected.parent().find(".groupIcon").addClass("opacityDull");
            $groupSelected.html("");
        }
        $("#" + selectorId).attr("elementId", selectedElement.attr("elementId"));
        getDirectoryView(hotlinkData);
    }

    function minIndexSelectorClick(selectedElement, isBiview) {
        let activeDesktop = getActiveDesktop(isBiview);
        let selectedMinIndex = `projection${activeDesktop.selector.search_min_index_dropdown_selected_id}`;
        let selectedMaxIndex = `projection${activeDesktop.selector.search_max_index_dropdown_selected_id}`;
        if (!selectedElement) {
            $(".desktop-selector-dropdown-content").addClass("dis-none");
            return;
        }
        $(".desktop-selector-dropdown-content").addClass("dis-none");
        $("#" + selectedMinIndex).html(selectedElement.html());
        if ($("#" + selectedMaxIndex).html() < selectedElement.html()) {
            $("#" + selectedMaxIndex).html(selectedElement.html());
        }
        $("#" + selectedMinIndex).closest(".desktop-selector-container").find(".search-keyword").keyup();
        renderMaxIndexDropDown();
    }

    function maxIndexSelectorClick(selectedElement, isBiview) {
        let activeDesktop = getActiveDesktop(isBiview);
        let selectedMaxIndex = `projection${activeDesktop.selector.search_max_index_dropdown_selected_id}`;
        if (!selectedElement) {
            $(".desktop-selector-dropdown-content").addClass("dis-none");
            return;
        }
        $(".desktop-selector-dropdown-content").addClass("dis-none");
        $("#" + selectedMaxIndex).html(selectedElement.html());
        $("#" + selectedMaxIndex).closest(".desktop-selector-container").find(".search-keyword").keyup();
    }

    function getSelectorForRulerTypeDesk() {
        $("#saveData").show();
        let desktopSelector = backing.singleview.workspaces.eval_workspace.desktops.ruler_type_desktop.selector;
        let selectorObj = {};
        let selectedPerspectives = [];
        $("#" + desktopSelector.perspective_container).find(".perspectiveItem").each(function () {
            if ($(this).hasClass("selected")) {
                selectedPerspectives.push($(this).attr("elementId"));
            }
        });
        selectorObj.perspectiveIds = selectedPerspectives;
        selectorObj.shieldId = $("#" + desktopSelector.shield_dropdown_selected_id).attr("elementId");
        selectorObj.shieldElementGroupId = $("#" + desktopSelector.groups_dropdown_selected_id).attr("elementId");
        selectorObj.level = $("#" + desktopSelector.level_dropdown_selected_id).attr("elementId");
        $("#saveData").hide();
        return selectorObj;
    }

    function refreshFullDesktop(isBiview) {
        let previousSelection = {};
        let activeDesktop = getActiveDesktop(isBiview);
        let shieldSelectorId = "projection" + activeDesktop.selector.shield_dropdown_selected_id;
        let levelSelectorId = "projection" + activeDesktop.selector.level_dropdown_selected_id;
        let groupSelectorId = "projection" + activeDesktop.selector.groups_dropdown_selected_id;
        previousSelection.shieldSelectorId = $("#" + shieldSelectorId).attr("elementId");
        previousSelection.levelSelectorId = $("#" + levelSelectorId).attr("elementId");
        previousSelection.groupSelectorId = $("#" + groupSelectorId).attr("elementId");
        activeDesktop.ProjectionpreviousSelectors = previousSelection;
    }

    function RefreshView() {
        getShieldsOfShieldType();
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("projection_view");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("projection_view");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    projectionViewUtil.shieldSelectorClick = shieldSelectorClick;
    projectionViewUtil.levelSelectorClick = levelSelectorClick;
    projectionViewUtil.groupSelectorClick = groupSelectorClick;
    projectionViewUtil.getShieldsOfShieldType = getShieldsOfShieldType;
    projectionViewUtil.getDirectoryView = getDirectoryView;
    projectionViewUtil.minIndexSelectorClick = minIndexSelectorClick;
    projectionViewUtil.maxIndexSelectorClick = maxIndexSelectorClick;
    projectionViewUtil.getSelector = getSelectorForRulerTypeDesk;
    projectionViewUtil.searchObjectElementClick = searchObjectElementClick;
    projectionViewUtil.fullRefresh = refreshFullDesktop;
    projectionViewUtil.RefreshView = RefreshView;
    projectionViewUtil.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    projectionViewUtil.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    projectionViewUtil.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    return projectionViewUtil;
}

function RulerTypeDesktopUtils() {
    let rulTypDesk = new Object();

    function getShieldsOfShieldType() {
        let activeDesktop = backing.singleview.workspaces.eval_workspace.desktops.ruler_type_desktop;
        let selectorId = activeDesktop.selector.shield_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        previousSelector={shieldSelectorId: evalLufId};
        $("#saveData").show();
        let callback = function (res) {
            serviceFunctions.getDefaultShieldPrefs((defaultPrefs) => {
                let data = {};
                data.idOfParentDiv = selectorId;
                data.view = "singleview";
                data.viewName = "groupView";
                data.isRoot = false;
                if(backing.isDirectMode)
                    $("#ruler_type_desk .rulerLinkLabel").text("Implemented by");
                else
                    $("#ruler_type_desk .rulerLinkLabel").text("Delivered by");
                renderSelectorDropDown(activeDesktop, res.children, "shieldSelector", "shieldSelectorEvaluation", data, true, defaultPrefs);
                shieldSelector(previousSelector, selectorId, shieldSelectorClick);
                let event = {"key": backing.event_type.selector_change.key};
                propagateEvent(event);
                if(backing.isDirectMode) {
                    activeDesktop.expressionSelectorSelected["label"] = constants.linkNames["ASSET_TO_ELEMENT"];
                    activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ELEMENT_TO_EXPRESSION"];
                    activeDesktop.expressionSelectorSelected["linkNameAttr"] = constants.linkNames["ASSET_TO_ELEMENT"];
                    activeDesktop.expressionSelectorSelected["startingPoint"] = "asset_root";
                } else {
                    activeDesktop.expressionSelectorSelected["label"] = constants.linkNames["EXPRESSION_TO_ASSET"];
                    activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ELEMENT_TO_EXPRESSION"];
                    activeDesktop.expressionSelectorSelected["linkNameAttr"] = constants.linkNames["EXPRESSION_TO_ASSET"];
                    activeDesktop.expressionSelectorSelected["startingPoint"] = "asset_root";
                }
            });
        };
        serviceFunctions.getShieldsAndStandard(callback);
    }

    function getAllowedLevels(data) {
        let activeDesktop = backing.singleview.workspaces.eval_workspace.desktops.ruler_type_desktop;
        let selectorId = activeDesktop.selector.level_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        let callback = function (res) {
            let data = {};
            data.idOfParentDiv = selectorId;
            data.view = "singleview";
            data.viewName = "groupView";
            data.isRoot = false;
            renderSelectorDropDown(activeDesktop, res, "levelSelector", "levelSelectorEvaluation", data);
            levelSelector(previousSelector, selectorId, levelSelectorClick);
            let event = {"key": backing.event_type.selector_change.key};
            propagateEvent(event);
        };
        serviceFunctions.getAllowedLevels(data, callback);
    }

    function getElementGroups(data) {
        let activeDesktop = backing.singleview.workspaces.eval_workspace.desktops.ruler_type_desktop;
        let selectorId = activeDesktop.selector.groups_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        let callback = function (res) {
            let data = {};
            data.idOfParentDiv = selectorId;
            data.view = "singleview";
            data.viewName = "groupView";
            data.isRoot = false;
            renderSelectorDropDown(activeDesktop, res, "groupSelector", "groupSelectorEvaluation", data, true);
            groupSelector(previousSelector, selectorId, getLiFromSelector, groupSelectorClick);
            let event = {"key": backing.event_type.selector_change.key};
            propagateEvent(event);
        };
        serviceFunctions.getGroupsGivenMaxLevel(data, callback);
    }

    function getDirectoryView() {
        let data = getSelectorForRulerTypeDesk();
        let workspace = backing.singleview.active_workspace_keyname;
        let desktop = backing.singleview.active_desktop.keyname;
        let previousSelector = backing.singleview.workspaces[workspace].desktops[desktop].previousSelectors;
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }
        $("#saveData").show();
        var callbackfn = function (res, err) {
            if (res) {
                $("#saveData").show();
                let activeDesktop = backing.singleview.workspaces.eval_workspace.desktops.ruler_type_desktop;
                modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
                activeDesktop.perspectivesSelected = data.perspectiveIds;
                let directoryViewTreeId = activeDesktop.tree_container_id;
                if (activeDesktop) {
                    generateUniqueIdAndParentLink(res, activeDesktop.div_id, null);
                    backing.singleview.dvDataUseAttr = res;
                    if (activeDesktop.sortBy === undefined)
                        activeDesktop.sortBy = false;
                    if (activeDesktop.sortBy === true)
                        sortChildrenAlphbetically(res);
                    activeDesktop.directoryJson = res;
                    let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                    if (objectTypesAndElementTypes) {
                        renderObjectTypesAndElementTypesDropDown(objectTypesAndElementTypes, activeDesktop, "evalSearchObject_ElementTypeItem");
                        activeDesktop.ObjectTypesAndElementTypes = objectTypesAndElementTypes;
                    }
                    renderMinIndexDropDown();
                    renderMaxIndexDropDown();
                    let oldExpansionState = getExpansionStateOfElements(activeDesktop.tree_container_id);
                    renderDirectoryView(res, directoryViewTreeId, "singleview", "anchorView", false);
                    // applyExpansionState(oldExpansionState, activeDesktop.tree_container_id);
                    let ringViewDivId = backing.view_type.ring_view.name + "_" + activeDesktop.div_id;
                    if ($("#" + ringViewDivId).hasClass("active"))
                        updateViewsStandards(ringViewDivId, res);
                    refreshGroupRingViews(activeDesktop.opened_views);
                    if (previousSelector) {
                        refreshAllOpenedViews(activeDesktop);
                        if (previousSelector.compositeSelection)
                            $("#" + activeDesktop.anchor_div_id).find(".desktop-perspective-selector-container .compositePerspectiveSelection").addClass("active");
                    }
                    applyExpansionState(oldExpansionState, activeDesktop.tree_container_id);
                    $("#saveData").hide()
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
    }

    function getPerspectives() {
        $("#saveData").show();
        service.getAllPerspectives(null, function (res, err) {
            if (res) {
                let activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
                let activeDesktopKeyname = backing.singleview.active_desktop.keyname;
                let activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
                if (activeDesktop) {
                    backing.singleview.workspaces.eval_workspace.desktops.ruler_type_desktop.perspectives = res;
                    generateUniqueIdAndParentLink(res, activeDesktop.div_id, null);
                    renderPerspective(res);
                    renderPerspectiveDropDownLi(res.children, "perspectiveSelector");
                    $("#saveData").hide();
                }
            }
            else if (err) {
                $("#saveData").hide();
            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.eval_workspace.desktops.ruler_type_desktop;
        let $selectedId = $("#" + selectedId);
        if (selectedElement.attr("randomId")) {
            $selectedId.html(selectedElement.html());
            $selectedId.parent().find(".searchIcon").removeClass("opacityDull");
        }
        else {
            $selectedId.parent().find(".searchIcon").addClass("opacityDull");
            $selectedId.html("");
        }
        $selectedId.removeAttr("randomId");
        $selectedId.attr("randomId", selectedElement.attr("randomId"));
        $("#" + dropDownId).addClass("dis-none");
        renderCustomSearchDropDown(selectedElement.attr("randomId"), activeDesktop, "evalCustomSearchObject_ElementTypeItem");
    }

    function renderMinIndexDropDown() {
        let activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        let activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        let activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        let selectorDropDownId = activeDesktop.selector.search_min_index_dropdown_id;

        let str = "";
        str += "<ul>";
        for (let i = 0; i <= 1;) {
            str += "<li class=\"searchMinIndexItem\">" + i.toFixed(1) + "</li>\n";
            i = (i + 0.1);
        }
        str += "</ul>";
        $("#" + selectorDropDownId).html(str);
    }

    function renderMaxIndexDropDown() {
        let activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        let activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        let activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        let selectorDropDownId = activeDesktop.selector.search_max_index_dropdown_id;
        let minIndexSelectorId = activeDesktop.selector.search_min_index_dropdown_selected_id;
        let minIndex = parseFloat($("#" + minIndexSelectorId).html());
        let str = "";
        str += "<ul>";
        for (let i = minIndex; i <= 1;) {
            str += "<li class=\"searchMaxIndexItem\">" + i.toFixed(1) + "</li>\n";
            i = (i + 0.1);
        }
        str += "</ul>";
        $("#" + selectorDropDownId).html(str);
    }

    function renderPerspective(renderData) {
        function comparer(otherArray) {
            return function (current) {
                return otherArray.filter(function (other) {
                    return other.elementId == current.elementId
                }).length == 0;
            }
        }

        let activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        let activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        let activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        let selectorDropDown = activeDesktop.selector.perspective_container;
        let previousSelector = activeDesktop.previousSelectors;

        generateUniqueIdAndParentLink(renderData, activeDesktop.div_id, null);
        let str = "";
        let perspectives;
        let selector = "perspective";
        let data = {};
        let isCompositeSelection;
        let selectedIds = backing.singleview.workspaces.eval_workspace.desktops.ruler_type_desktop.perspectivesSelected;
        backing.singleview.workspaces.eval_workspace.desktops.ruler_type_desktop.perspectivesCount = renderData.children.length;
        data.idOfParentDiv = selectorDropDown;
        data.view = "singleview";
        data.viewName = "schemaView";
        data.isRoot = false;
        perspectives = renderData.children;
        if (previousSelector && previousSelector.perspectivesSelectedId && previousSelector.oldPerspectives) {
            let result;
            let perspectivesSelectedId = previousSelector.perspectivesSelectedId;
            let oldPerspectives = previousSelector.oldPerspectives;
            if (renderData.children.length > oldPerspectives.children.length) {
                //  let difference = $(renderData.children).not(oldPerspectives.children).get();
                let onlyInA = renderData.children.filter(comparer(oldPerspectives.children));
                let onlyInB = oldPerspectives.children.filter(comparer(renderData.children));
                result = onlyInA.concat(onlyInB);
                perspectives = oldPerspectives.children;
            }
            else if (renderData.children.length < oldPerspectives.children.length) {
                let deletedPers = oldPerspectives.children.filter(comparer(renderData.children));
                let index = perspectivesSelectedId.indexOf(deletedPers[0].elementId.toString());
                if (index > -1) {
                    perspectivesSelectedId.splice(index, 1);
                }
            }

            isCompositeSelection = previousSelector.compositeSelection;
            if (perspectivesSelectedId && perspectivesSelectedId.length > 0) {
                let nxtIndex = 0, nxtPersIndex = 0;
                loop1: for (let i = nxtIndex; i <= perspectives.length; i++) {
                    if (perspectives[i]) {
                        loop2: for (let j = nxtPersIndex; j <= perspectivesSelectedId.length; j++) {
                            if (parseInt(perspectivesSelectedId[j]) === perspectives[i][ATTR.elementId]) {
                                str += renderPerspectiveLi(perspectives[i], selector, data, "selected");
                                nxtIndex = i;
                                nxtIndex += 1;
                                nxtPersIndex = j;
                                nxtPersIndex += 1;
                                continue loop1;
                            }
                        }
                        str += renderPerspectiveLi(perspectives[i], selector, data, "");
                        nxtIndex = i;
                        nxtIndex += 1;
                    }
                }
            }
            else if (!perspectivesSelectedId || perspectivesSelectedId.length === 0) {
                for (let i = 0; i <= perspectives.length; i++) {
                    if (perspectives[i]) {
                        if (i === 0) {
                            str += renderPerspectiveLi(perspectives[i], selector, data, "selected");
                        }
                        else {
                            str += renderPerspectiveLi(perspectives[i], selector, data, "");
                        }
                    }
                }
            }
            if (result && result[0]) {
                str += renderPerspectiveLi(result[0], selector, data, "");
            }
            delete activeDesktop.previousSelectors;
        }
        else {
            if ($("#" + activeDesktop.div_id).find(".compositePerspectiveSelection").hasClass("active")) {
                isCompositeSelection = true;
            }
            else {
                isCompositeSelection = false;
            }
            if (isCompositeSelection) {
                activeDesktop.perspectivesSelected = [];
                for (let i = 0; i < renderData.children.length; i++) {
                    str += renderPerspectiveLi(renderData.children[i], selector, data, "selected");
                    activeDesktop.perspectivesSelected.push(renderData.children[i].elementId);
                }
            }
            else {
                let persSelected = activeDesktop.perspectivesSelected;
                let count = 0;
                let renderInfo = renderData.children;
                if (persSelected && persSelected.length > 0) {
                    for (let i = 0; i < renderInfo.length; i++) {
                        if (persSelected[0] === renderInfo[i].elementId.toString())
                            count = i;
                    }
                }
                activeDesktop.perspectivesSelected = [];
                for (let i = 0; i < renderInfo.length; i++) {
                    if (count === i) {
                        str += renderPerspectiveLi(renderInfo[i], selector, data, "selected");
                        activeDesktop.perspectivesSelected.push(renderData.children[i].elementId);
                    }
                    else {
                        str += renderPerspectiveLi(renderInfo[i], selector, data, "");
                    }
                }
            }
        }
        $("#single_asset_r_type_slider").html(str);

        getDirectoryView();
        reOrderPerspective(false, activeDesktop);
    }

    function renderPerspectiveLi(element, selector, data, selected) {
        let str = "";
        let backgroundcolor;
        let activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        let activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        let activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);

        let compositeColor = $("#" + activeDesktop.div_id).find(".compositeColorPicker").val();
        if (selected !== "") {
            if ($("#" + activeDesktop.div_id).find(".compositePerspectiveSelection").hasClass("active"))
                backgroundcolor = compositeColor;
            else
                backgroundcolor = element.color;
        }
        else {
            backgroundcolor = "#fff";
        }
        str += "<div class=\"" + selector + "Item " + selected + " bktibx\" defaultColor=\"#fff\" persColor =\"" + element.color + "\"  style=\"background-color: " + backgroundcolor + "\" elementId=\"" + element.elementId + "\" title=\"" + element[ATTR.name].toUpperCase() + "\">\n" +
            "<span class=\"\" id=\"" + element[ATTR.elementId] + "\">" + element[ATTR.name].toUpperCase().charAt(0) + "</span>\n" +
            "<div class=\"perspectiveHotlinkContainer\" style=\"background-color:" + element.color + "\">\n";
        str += renderHotlinkInventoryDv(element, data.idOfParentDiv, data.view, data.viewName, data.isRoot);
        str += "</div>\n";
        str += "</div>\n";
        return str;
    }

    function renderPerspectiveDropDownLi(selectorList, selector) {
        //have to handle bi view case
        let str = "";
        let selectorId;
        let backgroundcolor;
        let isCompositeSelection;
        let perspectivesSelectedId;
        let activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        let activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        let activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        let previousSelector = backing.singleview.workspaces.eval_workspace.desktops.ruler_type_desktop.previousSelectors;
        if (previousSelector) {
            perspectivesSelectedId = previousSelector.perspectivesSelectedId;
            isCompositeSelection = previousSelector.compositeSelection;
        }
        else {
            if ($("#" + activeDesktop.div_id).find(".compositePerspectiveSelection").hasClass("active")) {
                isCompositeSelection = true;
            }
            else {
                isCompositeSelection = false;
            }
        }
        str += "<ul>";
        if (isCompositeSelection) {
            for (let i = 0; i < selectorList.length; i++) {
                let label = selectorList[i][ATTR.name].toUpperCase();
                backgroundcolor = selectorList[i].color;
                str += `<li class="${selector}EvaluationItem" elementId="${selectorList[i][ATTR.elementId]}" defaultColor="#f5f5f5" persColor ="${selectorList[i].color}" style="background-color:${backgroundcolor}"><span class = "perspectiveSelectorLabel" title="${label}">${label}</span>` +
                    `<span class="fright checkboxSpan"><input type="checkbox" checked></span></li>`;
            }
        }
        else if (perspectivesSelectedId && perspectivesSelectedId.length > 0) {
            let nxtIndex = 0, nxtPersIndex = 0;
            loop1 :  for (let i = nxtIndex; i <= selectorList.length; i++) {
                if (selectorList[i]) {
                    loop2 : for (let j = nxtPersIndex; j <= perspectivesSelectedId.length; j++) {
                        if (parseInt(perspectivesSelectedId[j]) === selectorList[i][ATTR.elementId]) {
                            backgroundcolor = selectorList[i].color;
                            str += "<li class=\"" + selector + "EvaluationItem\" elementId=\"" + selectorList[i][ATTR.elementId] + "\" defaultColor=\"#f5f5f5\" persColor =\"" + selectorList[i].color + "\" style=\"background-color: \"" + backgroundcolor + "\"><span>" + selectorList[i][ATTR.name].toUpperCase() + "</span>" +
                                "<span class=\"fright checkboxSpan\"><input type=\"checkbox\" checked></span></li>";
                            nxtIndex = i;
                            nxtIndex += 1;
                            nxtPersIndex = j;
                            nxtPersIndex += 1;
                            continue loop1;
                        }
                    }
                    backgroundcolor = "#f5f5f5";
                    str += "<li class=\"" + selector + "EvaluationItem\" elementId=\"" + selectorList[i][ATTR.elementId] + "\" defaultColor=\"#f5f5f5\" persColor =\"" + selectorList[i].color + "\" style=\"background-color: \"" + backgroundcolor + "\"><span>" + selectorList[i][ATTR.name].toUpperCase() + "</span>" +
                        "<span class=\"fright checkboxSpan\"><input type=\"checkbox\"></span></li>";
                    nxtIndex = i;
                    nxtIndex += 1;
                }
            }
        }
        else {
            for (let i = 0; i < selectorList.length; i++) {
                let label = selectorList[i][ATTR.name].toUpperCase();
                if (i === 0) {
                    backgroundcolor = selectorList[i].color;
                    str += `<li class="${selector}EvaluationItem" elementId="${selectorList[i][ATTR.elementId]}" defaultColor="#f5f5f5" persColor ="${selectorList[i].color}" style="background-color:${backgroundcolor}"><span class = "perspectiveSelectorLabel" title = "${label}">${label}</span>` +
                        `<span class="fright checkboxSpan"><input type="checkbox" checked></span></li>`;
                }
                else {
                    backgroundcolor = "#f5f5f5";
                    str += `<li class="${selector}EvaluationItem" elementId="${selectorList[i][ATTR.elementId]}" defaultColor="#f5f5f5" persColor ="${selectorList[i].color}" style="background-color:${backgroundcolor}"><span class = "perspectiveSelectorLabel" title = "${label}">${label}</span>` +
                        `<span class="fright checkboxSpan"><input type="checkbox" checked></span></li>`;
                }
            }
        }

        str += "<li class=\"applyPerspective activated\">APPLY</li>";
        str += "</ul>";
        let workspace = backing.singleview.active_workspace_keyname;
        let desktop = backing.singleview.active_desktop.keyname;
        selectorId = backing.singleview.workspaces[workspace].desktops[desktop].selector.perspectives_dropdown_id;
        $("#" + selectorId).html(str);
    }

    function shieldSelectorClick(selectedElement) {
        function canHaveCreateShieldElementHotlink(shieldId, isBiView) {
            let activeWorkspaceKeyname, activeDesktopKeyname, backingSide;
            activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
            activeDesktopKeyname = backing.singleview.active_desktop.keyname;
            activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);

            service.getTypesThatCanHaveCreateShieldElementHotlink(shieldId, function (res, err) {
                if (res) {
                    activeDesktop.canHaveCreateShieldElementHotlink = res;
                }
                else if (err) {
                    $("#saveData").hide();
                }
            });
        }

        let data = {};
        let activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        let activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        let activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);

        data.shieldId = selectedElement.attr("elementId");
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }
        canHaveCreateShieldElementHotlink(data.shieldId, false);
        let shieldObjType = selectedElement.attr("objectType");
        let linkName = null;
        let elementLabel = null;
        let mapToIcon = 'flaticon-shield-element';
        if(shieldObjType === backing.object_type.shield.key) {
            linkName = getLinkName(backing.object_type.shield_element.key, backing.object_type.asset.key)
            elementLabel = " Internal Policies of ";
            mapToIcon = "flaticon-shield-element";
            activeDesktop.expressionSelectorSelected["linkNameAttr"] = getLinkName(constants.objectType["SHIELD_ELEMENT"], constants.objectType["ASSET"]);
            activeDesktop.expressionSelectorSelected["label"] = getLinkName(constants.objectType["SHIELD_ELEMENT"], constants.objectType["ASSET"]);
        } else if(shieldObjType === backing.object_type.standard.key) {
            linkName = getLinkName(backing.object_type.standard_element.key, backing.object_type.asset.key)
            elementLabel = "External Policies of ";
            mapToIcon = "flaticon-standard-element"
            activeDesktop.expressionSelectorSelected["linkNameAttr"] = getLinkName(constants.objectType["STANDARD_ELEMENT"], constants.objectType["ASSET"]);
            activeDesktop.expressionSelectorSelected["label"] = getLinkName(constants.objectType["STANDARD_ELEMENT"], constants.objectType["ASSET"]);
        } else if(shieldObjType === backing.object_type.b_framework.key) {
            linkName = getLinkName(backing.object_type.b_control.key, backing.object_type.asset.key)
            elementLabel = "Value Processes of ";
            mapToIcon = "flaticon-business-element"
            activeDesktop.expressionSelectorSelected["linkNameAttr"] = getLinkName(constants.objectType["BUSINESS_CONTROL"], constants.objectType["ASSET"]);
            activeDesktop.expressionSelectorSelected["label"] = getLinkName(constants.objectType["BUSINESS_CONTROL"], constants.objectType["ASSET"]);
        } else if(shieldObjType === backing.object_type.threat.key) {
            linkName = getLinkName(backing.object_type.threat_element.key, backing.object_type.asset.key)
            elementLabel = "Threat Vectors of ";
            mapToIcon = "flaticon-threat-control";
            activeDesktop.expressionSelectorSelected["linkNameAttr"] = getLinkName(constants.objectType["THREAT_ELEMENT"], constants.objectType["ASSET"]);
            activeDesktop.expressionSelectorSelected["label"] = getLinkName(constants.objectType["THREAT_ELEMENT"], constants.objectType["ASSET"]);
        }
        if(linkName)
        $("#ruler_type_desk .rulerLinkLabel").text(linkName);
        if(elementLabel)
            $("#ruler_type_desk .headerWrapper .desktop-selector-dropdown .labelText").text(elementLabel);

        $("#saveData").show();
        getAllowedLevels(data);
        $("#single_r_type_desk_shield_dropdown_selected").closest(".desktop-selector-dropdown").find(".mapToIcon").removeClass("flaticon-shield-element flaticon-standard-element flaticon-threat-control flaticon-business-element");
        let controlsClass = mapToIcon;
        $("#single_r_type_desk_shield_dropdown_selected").closest(".desktop-selector-dropdown").find(".mapToIcon").addClass(controlsClass);
        $("#single_r_type_desk_shield_dropdown_selected").html(selectedElement.find(".dropdownIcon").html() + selectedElement.find(".acronym").html());
        $("#single_r_type_desk_shield_dropdown_selected").attr("title", selectedElement.attr("title"));
        $("#single_r_type_desk_shield_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));


    }

    function levelSelectorClick(selectedElement) {
        if (!selectedElement) {
            $(".desktop-selector-dropdown-content").addClass("dis-none");
            return;
        }
        // else if($("#single_sh_arch_desk_level_dropdown_selected").html() === selectedElement.html()){
        //     $(".desktop-selector-dropdown-content").addClass("dis-none");
        //     return;
        // }
        let data = {};
        data.shieldId = $("#single_r_type_desk_shield_dropdown_selected").attr("elementId");
        data.level = selectedElement.attr("elementId");
        $("#saveData").show();
        getElementGroups(data);
        $(".desktop-selector-dropdown-content").addClass("dis-none");
        if (selectedElement.attr("elementId") !== "0") {
            $("#single_r_type_desk_level_dropdown_selected").attr("title", selectedElement.html());
            $("#single_r_type_desk_level_dropdown_selected").html(selectedElement.html());
            $("#single_r_type_desk_level_dropdown_selected").parent().find(".levelIcon").removeClass("opacityDull");
        }
        else {
            $("#single_r_type_desk_level_dropdown_selected").attr("title", "");
            $("#single_r_type_desk_level_dropdown_selected").parent().find(".levelIcon").addClass("opacityDull");
            $("#single_r_type_desk_level_dropdown_selected").html("");
        }
        $("#single_r_type_desk_level_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));

    }

    function groupSelectorClick(selectedElement) {
        if (!selectedElement) {
            $(".desktop-selector-dropdown-content").addClass("dis-none");
            return;
        }
        // else if($("#single_sh_arch_desk_groups_dropdown_selected").html() === selectedElement.html()){
        //     $(".desktop-selector-dropdown-content").addClass("dis-none");
        //     return;
        // }
        $("#saveData").show();
        $(".desktop-selector-dropdown-content").addClass("dis-none");
        if (selectedElement.attr("elementId") !== "0") {
            $("#single_r_type_desk_groups_dropdown_selected").attr("title", selectedElement.html());
            $("#single_r_type_desk_groups_dropdown_selected").html(selectedElement.html());
            $("#single_r_type_desk_groups_dropdown_selected").parent().find(".groupIcon").removeClass("opacityDull");
        }
        else {
            $("#single_r_type_desk_groups_dropdown_selected").attr("title", "");
            $("#single_r_type_desk_groups_dropdown_selected").parent().find(".groupIcon").addClass("opacityDull");
            $("#single_r_type_desk_groups_dropdown_selected").html("");
        }
        $("#single_r_type_desk_groups_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));
        let event = {"key": backing.event_type.selector_change.key};
        propagateEvent(event);
        getPerspectives();
    }

    function minIndexSelectorClick(selectedElement) {
        if (!selectedElement) {
            $(".desktop-selector-dropdown-content").addClass("dis-none");
            return;
        }
        // else if($("#single_sh_arch_desk_groups_dropdown_selected").html() === selectedElement.html()){
        //     $(".desktop-selector-dropdown-content").addClass("dis-none");
        //     return;
        // }
        $(".desktop-selector-dropdown-content").addClass("dis-none");
        $("#single_r_type_desk_search_min_index_dropdown_selected").html(selectedElement.html());
        if ($("#single_r_type_desk_search_max_index_dropdown_selected").html() < selectedElement.html()) {
            $("#single_r_type_desk_search_max_index_dropdown_selected").html(selectedElement.html());
        }
        //$("#single_r_type_desk_groups_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));
        $("#single_r_type_desk_search_min_index_dropdown_selected").closest(".desktop-selector-container").find(".search-keyword").keyup();
        renderMaxIndexDropDown();
    }

    function maxIndexSelectorClick(selectedElement) {
        if (!selectedElement) {
            $(".desktop-selector-dropdown-content").addClass("dis-none");
            return;
        }
        // else if($("#single_sh_arch_desk_groups_dropdown_selected").html() === selectedElement.html()){
        //     $(".desktop-selector-dropdown-content").addClass("dis-none");
        //     return;
        // }
        $(".desktop-selector-dropdown-content").addClass("dis-none");
        $("#single_r_type_desk_search_max_index_dropdown_selected").html(selectedElement.html());
        // $("#single_r_type_desk_groups_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));
        $("#single_r_type_desk_search_max_index_dropdown_selected").closest(".desktop-selector-container").find(".search-keyword").keyup();
    }

    function getSelectorForRulerTypeDesk() {
        $("#saveData").show();
        let desktopSelector = backing.singleview.workspaces.eval_workspace.desktops.ruler_type_desktop.selector;
        let selectorObj = {};
        let selectedPerspectives = [];
        $("#" + desktopSelector.perspective_container).find(".perspectiveItem").each(function () {
            if ($(this).hasClass("selected")) {
                selectedPerspectives.push($(this).attr("elementId"));
            }
        });
        selectorObj.perspectiveIds = selectedPerspectives;
        selectorObj.shieldId = $("#" + desktopSelector.shield_dropdown_selected_id).attr("elementId");
        selectorObj.shieldElementGroupId = $("#" + desktopSelector.groups_dropdown_selected_id).attr("elementId");
        selectorObj.level = $("#" + desktopSelector.level_dropdown_selected_id).attr("elementId");
        $("#saveData").hide();
        return selectorObj;
    }

    function refreshFullDesktop() {
        let previousSelection = {};
        let activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        let activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        let activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        let desktop = $("#" + activeDesktop.anchor_div_id);
        let shieldSelectorId = activeDesktop.selector.shield_dropdown_selected_id;
        let levelSelectorId = activeDesktop.selector.level_dropdown_selected_id;
        let groupSelectorId = activeDesktop.selector.groups_dropdown_selected_id;

        previousSelection.shieldSelectorId = $("#" + shieldSelectorId).attr("elementId");
        previousSelection.levelSelectorId = $("#" + levelSelectorId).attr("elementId");
        previousSelection.groupSelectorId = $("#" + groupSelectorId).attr("elementId");
        previousSelection.perspectivesSelectedId = activeDesktop.perspectivesSelected;
        previousSelection.oldPerspectives = activeDesktop.perspectives;
        if (desktop.find(".desktop-perspective-selector-container .selectorLabel .compositePerspectiveSelection").hasClass("active")) {
            previousSelection.compositeSelection = true;
        }
        else {
            previousSelection.compositeSelection = false;
        }
        activeDesktop.previousSelectors = previousSelection;

        getShieldsOfShieldType();
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("ruler_type_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("ruler_type_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
    }

    function saveDragAndDrop(){
    }

    rulTypDesk.shieldSelectorClick = shieldSelectorClick;
    rulTypDesk.levelSelectorClick = levelSelectorClick;
    rulTypDesk.groupSelectorClick = groupSelectorClick;
    //rulTypDesk.renderSelectorDropDown = renderSelectorDropDown;
    rulTypDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    rulTypDesk.getDirectoryView = getDirectoryView;
    rulTypDesk.getSelector = getSelectorForRulerTypeDesk;
    rulTypDesk.getPerspectives = getPerspectives;
    rulTypDesk.renderPerspectiveDropDownLi = renderPerspectiveDropDownLi;
    rulTypDesk.searchObjectElementClick = searchObjectElementClick;
    rulTypDesk.minIndexSelectorClick = minIndexSelectorClick;
    rulTypDesk.maxIndexSelectorClick = maxIndexSelectorClick;
    rulTypDesk.fullRefresh = refreshFullDesktop;
    rulTypDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    rulTypDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    rulTypDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    rulTypDesk.addDragAndDrop = addDragAndDrop;
    rulTypDesk.saveDragAndDrop = saveDragAndDrop;
    return rulTypDesk;
}

function BiViewRulerTypeDesktopUtils() {
    let rulTypDesk = new Object();

    function getShieldsOfShieldType() {
        let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop;
        let selectorId = activeDesktop.selector.shield_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        previousSelector={shieldSelectorId: evalLufId};
        let callback = function (res) {
            serviceFunctions.getDefaultShieldPrefs((defaultPrefs) => {
                let data = {};
                data.idOfParentDiv = selectorId;
                data.view = "biview";
                data.viewName = "groupView";
                data.isRoot = false;
                if(backing.isDirectMode)
                    $("#bi_ruler_type_desk .rulerLinkLabel").text("Implemented by");
                else
                    $("#bi_ruler_type_desk .rulerLinkLabel").text("Delivered by");
                renderSelectorDropDown(activeDesktop, res.children, "shieldSelector", "biShieldSelectorEvaluation", data, true, defaultPrefs);
                shieldSelector(previousSelector, selectorId, shieldSelectorClick);
                let event = {"key": backing.event_type.selector_change.key};
                propagateEvent(event);
                if(backing.isDirectMode) {
                    activeDesktop.expressionSelectorSelected["label"] = constants.linkNames["ASSET_TO_ELEMENT"];
                    activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ELEMENT_TO_EXPRESSION"];
                    activeDesktop.expressionSelectorSelected["linkNameAttr"] = constants.linkNames["ASSET_TO_ELEMENT"];
                    activeDesktop.expressionSelectorSelected["startingPoint"] = "asset_root";
                } else {
                    activeDesktop.expressionSelectorSelected["label"] = constants.linkNames["EXPRESSION_TO_ASSET"];
                    activeDesktop.expressionSelectorSelected["staticLinkName"] = constants.linkNames["ELEMENT_TO_EXPRESSION"];
                    activeDesktop.expressionSelectorSelected["linkNameAttr"] = constants.linkNames["EXPRESSION_TO_ASSET"];
                    activeDesktop.expressionSelectorSelected["startingPoint"] = "asset_root";
                }
            });
        };
        serviceFunctions.getShieldsAndStandard(callback);
    }

    function getAllowedLevels(data) {
        let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop;
        let selectorId = activeDesktop.selector.level_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;

        let callback = function (res) {
            let data = {};
            data.idOfParentDiv = selectorId;
            data.view = "biview";
            data.viewName = "groupView";
            data.isRoot = false;
            renderSelectorDropDown(activeDesktop, res, "levelSelector", "biLevelSelectorEvaluation", data);
            levelSelector(previousSelector, selectorId, levelSelectorClick);
            let event = {"key": backing.event_type.selector_change.key};
            propagateEvent(event);
        };
        serviceFunctions.getAllowedLevels(data, callback);
    }

    function getElementGroups(data) {
        let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop;
        let selectorId = activeDesktop.selector.groups_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;

        let callback = function (res) {
            let data = {};
            data.idOfParentDiv = selectorId;
            data.view = "biview";
            data.viewName = "groupView";
            data.isRoot = false;
            renderSelectorDropDown(activeDesktop, res, "groupSelector", "biGroupSelectorEvaluation", data, true);
            groupSelector(previousSelector, selectorId, getLiFromSelector, groupSelectorClick);
            let event = {"key": backing.event_type.selector_change.key};
            propagateEvent(event);
        };
        serviceFunctions.getGroupsGivenMaxLevel(data, callback);
    }

    function getDirectoryView() {
        var data = getSelectorForRulerTypeDesk();
        let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop;
        let previousSelector = activeDesktop.previousSelectors;

        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }
        $("#saveData").show();
        var callbackfn = function (res, err) {
            if (res) {
                activeDesktop.perspectivesSelected = data.perspectiveIds;
                modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
                let directoryViewTreeId = activeDesktop.tree_container_id;
                if (activeDesktop) {
                    generateUniqueIdAndParentLink(res, activeDesktop.div_id, null);
                    backing.biview.dvDataUseAttr = res;
                    let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                    if (objectTypesAndElementTypes) {
                        renderObjectTypesAndElementTypesDropDown(objectTypesAndElementTypes, activeDesktop, "biEvalSearchObject_ElementTypeItem");
                        activeDesktop.ObjectTypesAndElementTypes = objectTypesAndElementTypes;
                    }
                    renderMinIndexDropDown();
                    renderMaxIndexDropDown();
                    var oldExpansionState = getExpansionStateOfElements(directoryViewTreeId);
                    if (activeDesktop.sortBy === undefined)
                        activeDesktop.sortBy = false;
                    if (activeDesktop.sortBy === true)
                        sortChildrenAlphbetically(res);
                    activeDesktop.directoryJson = res;
                    renderDirectoryView(res, directoryViewTreeId, "biview", "anchorView", true);
                    // applyExpansionState(oldExpansionState, directoryViewTreeId);
                    var ringViewDivId = backing.view_type.ring_view.name + "_" + activeDesktop.div_id;
                    if ($("#" + ringViewDivId).hasClass("active"))
                        updateViewsStandards(ringViewDivId, res);
                    refreshGroupRingViews(activeDesktop.opened_views);
                    if (previousSelector && previousSelector.compositeSelection) {
                        ("#" + activeDesktop.anchor_div_id).find(".desktop-perspective-selector-container .selectorLabel .compositePerspectiveSelectionInBiview").addClass("active");
                    }
                    applyExpansionState(oldExpansionState, directoryViewTreeId);
                    $("#saveData").hide()
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
    }

    function getPerspectives() {
        $("#saveData").show();
        service.getAllPerspectives(null, function (res, err) {
            if (res) {
                let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop;
                if (activeDesktop) {
                    backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop.perspectives = res;
                    generateUniqueIdAndParentLink(res, activeDesktop.div_id, null);
                    renderPerspective(res);
                    renderPerspectiveDropDownLi(res.children, "perspectiveSelector");
                    $("#saveData").hide();
                }
            }
            else if (err) {
                $("#saveData").hide();
            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop;
        let $selectedId = $("#" + selectedId);
        if (selectedElement.attr("randomId")) {
            $selectedId.html(selectedElement.html());
            $selectedId.parent().find(".searchIcon").removeClass("opacityDull");
        }
        else {
            $selectedId.parent().find(".searchIcon").addClass("opacityDull");
            $selectedId.html("");
        }
        $selectedId.removeAttr("randomId");
        $selectedId.attr("randomId", selectedElement.attr("randomId"));
        $("#" + dropDownId).addClass("dis-none");
        renderCustomSearchDropDown(selectedElement.attr("randomId"), activeDesktop, "biEvalCustomSearchObject_ElementTypeItem");
    }

    function renderMinIndexDropDown() {
        let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop;
        let selectorDropDownId = activeDesktop.selector.search_min_index_dropdown_id;

        let str = "";
        str += "<ul>";
        for (var i = 0; i <= 1;) {
            str += "<li class=\"biSearchMinIndexItem\">" + i.toFixed(1) + "</li>\n";
            i = (i + 0.1);
        }
        str += "</ul>";
        $("#" + selectorDropDownId).html(str);
    }

    function renderMaxIndexDropDown() {
        let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop;
        let selectorDropDownId = activeDesktop.selector.search_max_index_dropdown_id;
        let minIndexSelectorId = activeDesktop.selector.search_min_index_dropdown_selected_id;
        let minIndex = parseFloat($("#" + minIndexSelectorId).html());
        let str = "";
        str += "<ul>";
        for (var i = minIndex; i <= 1;) {
            str += "<li class=\"biSearchMaxIndexItem\">" + i.toFixed(1) + "</li>\n";
            i = (i + 0.1);
        }
        str += "</ul>";
        $("#" + selectorDropDownId).html(str);
    }

    function renderPerspective(renderData) {
        function comparer(otherArray) {
            return function (current) {
                return otherArray.filter(function (other) {
                    return other.elementId == current.elementId
                }).length == 0;
            }
        }

        let activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        let activeDesktopKeyname = backing.biview.active_desktop.keyname;
        let activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        let selectorDropDown = activeDesktop.selector.perspective_container;
        let previousSelector = activeDesktop.previousSelectors;
        generateUniqueIdAndParentLink(renderData, activeDesktop.div_id, null);
        var str = "";
        var selector = "perspective";
        var data = {};
        let perspectives;
        var selectedIds = backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop.perspectivesSelected;
        backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop.perspectivesCount = renderData.children.length;
        data.idOfParentDiv = selectorDropDown;
        data.view = "biview";
        data.viewName = "schemaView";
        data.isRoot = false;
        perspectives = renderData.children;
        if (previousSelector && previousSelector.perspectivesSelectedId && previousSelector.oldPerspectives) {
            var perspectivesSelectedId = previousSelector.perspectivesSelectedId;
            var oldPerspectives = previousSelector.oldPerspectives;
            if (renderData.children.length > oldPerspectives.children.length) {
                //  var difference = $(renderData.children).not(oldPerspectives.children).get();
                var onlyInA = renderData.children.filter(comparer(oldPerspectives.children));
                var onlyInB = oldPerspectives.children.filter(comparer(renderData.children));
                var result = onlyInA.concat(onlyInB);
                perspectives = oldPerspectives.children;
            }
            else if (renderData.children.length < oldPerspectives.children.length) {
                var deletedPers = oldPerspectives.children.filter(comparer(renderData.children));
                var index = perspectivesSelectedId.indexOf(deletedPers[0].elementId.toString());
                if (index > -1) {
                    perspectivesSelectedId.splice(index, 1);
                }
            }

            var isCompositeSelection = previousSelector.compositeSelection;
            if (perspectivesSelectedId && perspectivesSelectedId.length > 0) {
                var nxtIndex = 0, nxtPersIndex = 0;
                loop1: for (let i = nxtIndex; i <= perspectives.length; i++) {
                    if (perspectives[i]) {
                        loop2: for (let j = nxtPersIndex; j <= perspectivesSelectedId.length; j++) {
                            if (parseInt(perspectivesSelectedId[j]) === perspectives[i][ATTR.elementId]) {
                                str += renderPerspectiveLi(perspectives[i], selector, data, "selected");
                                nxtIndex = i;
                                nxtIndex += 1;
                                nxtPersIndex = j;
                                nxtPersIndex += 1;
                                continue loop1;
                            }
                        }
                        str += renderPerspectiveLi(perspectives[i], selector, data, "");
                        nxtIndex = i;
                        nxtIndex += 1;
                    }
                }
            }
            else if (!perspectivesSelectedId || perspectivesSelectedId.length === 0) {
                for (let i = 0; i <= perspectives.length; i++) {
                    if (perspectives[i]) {
                        if (i === 0) {
                            str += renderPerspectiveLi(perspectives[i], selector, data, "selected");
                        }
                        else {
                            str += renderPerspectiveLi(perspectives[i], selector, data, "");
                        }
                    }
                }
            }
            if (result && result[0]) {
                str += renderPerspectiveLi(result[0], selector, data, "");
            }
            delete activeDesktop.previousSelectors;
        }
        else {
            if ($("#" + activeDesktop.div_id).find(".compositePerspectiveSelection").hasClass("active")) {
                var isCompositeSelection = true;
            }
            else {
                var isCompositeSelection = false;
            }
            if (isCompositeSelection) {
                activeDesktop.perspectivesSelected = [];
                for (let i = 0; i < renderData.children.length; i++) {
                    str += renderPerspectiveLi(renderData.children[i], selector, data, "selected");
                    activeDesktop.perspectivesSelected.push(renderData.children[i].elementId);
                }
            }
            else {
                let persSelected = activeDesktop.perspectivesSelected;
                let count = 0;
                let renderInfo = renderData.children;
                if (persSelected && persSelected.length > 0) {
                    for (let i = 0; i < renderInfo.length; i++) {
                        if (persSelected[0] === renderInfo[i].elementId.toString())
                            count = i;
                    }
                }
                activeDesktop.perspectivesSelected = [];
                for (let i = 0; i < renderInfo.length; i++) {
                    if (count === i) {
                        str += renderPerspectiveLi(renderInfo[i], selector, data, "selected");
                        activeDesktop.perspectivesSelected.push(renderData.children[i].elementId);
                    }
                    else {
                        str += renderPerspectiveLi(renderInfo[i], selector, data, "");
                    }
                }
            }
        }
        $("#bi_asset_r_type_slider").html(str);

        getDirectoryView();
        reOrderPerspective(true, activeDesktop);
    }

    // function reOrderPerspective() {
    //     var persCount = backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop.perspectivesCount;
    //     var widthForPers = persCount * 45;
    //     if ($("#bi_viewContainer").width() < widthForPers) {
    //         $("#bi_leftArrow").removeClass("dis-none");
    //         $("#bi_rightArrow").removeClass("dis-none");
    //     }
    //     else {
    //         $("#bi_leftArrow").addClass("dis-none");
    //         $("#bi_rightArrow").addClass("dis-none");
    //         $("#bi_asset_r_type_slider").css({'right': '', 'left': '0px'}).animate({
    //             'left': '0px'
    //         });
    //     }
    // }

    function renderPerspectiveLi(element, selector, data, selected) {
        var str = "";
        var backgroundcolor;
        if (selected !== "") {
            backgroundcolor = element.color;
        }
        else {
            backgroundcolor = "#fff";
        }
        str += "<div class=\"" + selector + "Item " + selected + " bktibx\" defaultColor=\"#fff\" persColor =\"" + element.color + "\"  style=\"background-color: " + backgroundcolor + "\" elementId=\"" + element.elementId + "\" title=\"" + element[ATTR.name].toUpperCase() + "\">\n" +
            "<span class=\"\" id=\"" + element[ATTR.elementId] + "\">" + element[ATTR.name].toUpperCase().charAt(0) + "</span>\n" +
            "<div class=\"perspectiveHotlinkContainer\" style=\"background-color:" + element.color + "\">\n";
        str += renderHotlinkInventoryDv(element, data.idOfParentDiv, data.view, data.viewName, data.isRoot);
        str += "</div>\n";
        str += "</div>\n";
        return str;
    }

    function renderPerspectiveDropDownLi(selectorList, selector) {
        //have to handle bi view case
        let str = "";
        let selectorId;
        let backgroundcolor;
        let previousSelector = backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop.previousSelectors;
        if (previousSelector) {
            var perspectivesSelectedId = previousSelector.perspectivesSelectedId;
            var isCompositeSelection = previousSelector.compositeSelection;

        }
        str += "<ul>";
        if (isCompositeSelection) {
            for (let i = 0; i < selectorList.length; i++) {
                let label = selectorList[i][ATTR.name].toUpperCase();
                backgroundcolor = selectorList[i].color;
                str += `<li class="${selector}EvaluationItem" elementId="${selectorList[i][ATTR.elementId]}" defaultColor="#f5f5f5" persColor ="${selectorList[i].color}" style="background-color:${backgroundcolor}"><span class = "perspectiveSelectorLabel" title="${label}">${label}</span>` +
                    `<span class="fright checkboxSpan"><input type="checkbox" checked></span></li>`;
            }
        }
        else if (perspectivesSelectedId && perspectivesSelectedId.length > 0) {
            var nxtIndex = 0, nxtPersIndex = 0;
            loop1 :  for (let i = nxtIndex; i <= selectorList.length; i++) {
                if (selectorList[i]) {
                    loop2 : for (let j = nxtPersIndex; j <= perspectivesSelectedId.length; j++) {
                        if (parseInt(perspectivesSelectedId[j]) === selectorList[i][ATTR.elementId]) {
                            backgroundcolor = selectorList[i].color;
                            str += "<li class=\"" + selector + "EvaluationItem\" elementId=\"" + selectorList[i][ATTR.elementId] + "\" defaultColor=\"#f5f5f5\" persColor =\"" + selectorList[i].color + "\" style=\"background-color: \"" + backgroundcolor + "\"><span>" + selectorList[i][ATTR.name].toUpperCase() + "</span>" +
                                "<span class=\"fright checkboxSpan\"><input type=\"checkbox\" checked></span></li>";
                            nxtIndex = i;
                            nxtIndex += 1;
                            nxtPersIndex = j;
                            nxtPersIndex += 1;
                            continue loop1;
                        }
                    }
                    backgroundcolor = "#f5f5f5";
                    str += "<li class=\"" + selector + "EvaluationItem\" elementId=\"" + selectorList[i][ATTR.elementId] + "\" defaultColor=\"#f5f5f5\" persColor =\"" + selectorList[i].color + "\" style=\"background-color: \"" + backgroundcolor + "\"><span>" + selectorList[i][ATTR.name].toUpperCase() + "</span>" +
                        "<span class=\"fright checkboxSpan\"><input type=\"checkbox\"></span></li>";
                    nxtIndex = i;
                    nxtIndex += 1;
                }
            }
        }
        else {
            for (let i = 0; i < selectorList.length; i++) {
                let label = selectorList[i][ATTR.name].toUpperCase();
                if (i === 0) {
                    backgroundcolor = selectorList[i].color;
                    str += `<li class="${selector}EvaluationItem" elementId="${selectorList[i][ATTR.elementId]}" defaultColor="#f5f5f5" persColor ="${selectorList[i].color}" style="background-color:${backgroundcolor}"><span class = "perspectiveSelectorLabel" title="${label}">${label}</span>` +
                        `<span class="fright checkboxSpan"><input type="checkbox" checked></span></li>`;
                }
                else {
                    backgroundcolor = "#f5f5f5";
                    str += `<li class="${selector}EvaluationItem" elementId="${selectorList[i][ATTR.elementId]}" defaultColor="#f5f5f5" persColor ="${selectorList[i].color}" style="background-color:${backgroundcolor}"><span class = "perspectiveSelectorLabel" title = "${label}">${label}</span>` +
                        `<span class="fright checkboxSpan"><input type="checkbox" checked></span></li>`;
                }
            }
        }
        str += "<li class=\"applyPerspective activated\">APPLY</li>";
        str += "</ul>";
        let workspace = backing.biview.active_workspace_keyname;
        let desktop = backing.biview.active_desktop.keyname;
        selectorId = backing.biview.workspaces[workspace].desktops[desktop].selector.perspectives_dropdown_id;
        $("#" + selectorId).html(str);
    }

    function shieldSelectorClick(selectedElement) {
        function canHaveCreateShieldElementHotlink(shieldId, isBiView) {
            let activeWorkspaceKeyname, activeDesktopKeyname, backingSide;
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);

            service.getTypesThatCanHaveCreateShieldElementHotlink(shieldId, function (res, err) {
                if (res) {
                    activeDesktop.canHaveCreateShieldElementHotlink = res;
                }
                else if (err) {
                    $("#saveData").hide();
                }
            });
        }

        let data = {};
        let activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        let activeDesktopKeyname = backing.biview.active_desktop.keyname;
        let activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);

        data.shieldId = selectedElement.attr("elementId");
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0)) {
            $("#saveData").hide();
            return;
        }
        canHaveCreateShieldElementHotlink(data.shieldId, false);

        let shieldObjType = selectedElement.attr("objectType")
        let linkName = null;
        let elementLabel = null;
        let mapToIcon = "flaticon-shield-element";
        if(shieldObjType === backing.object_type.shield.key) {
            linkName = getLinkName(backing.object_type.shield_element.key, backing.object_type.asset.key)
            elementLabel = " Internal Policies of ";
            mapToIcon = "flaticon-shield-element";
            activeDesktop.expressionSelectorSelected["linkNameAttr"] = getLinkName(constants.objectType["SHIELD_ELEMENT"], constants.objectType["ASSET"]);
            activeDesktop.expressionSelectorSelected["label"] = getLinkName(constants.objectType["SHIELD_ELEMENT"], constants.objectType["ASSET"]);
        } else if(shieldObjType === backing.object_type.standard.key) {
            linkName = getLinkName(backing.object_type.standard_element.key, backing.object_type.asset.key)
            elementLabel = "External Policies of ";
            mapToIcon = "flaticon-standard-element";
            activeDesktop.expressionSelectorSelected["linkNameAttr"] = getLinkName(constants.objectType["STANDARD_ELEMENT"], constants.objectType["ASSET"]);
            activeDesktop.expressionSelectorSelected["label"] = getLinkName(constants.objectType["STANDARD_ELEMENT"], constants.objectType["ASSET"]);
        } else if(shieldObjType === backing.object_type.b_framework.key) {
            linkName = getLinkName(backing.object_type.b_control.key, backing.object_type.asset.key)
            elementLabel = "Value Processes of ";
            mapToIcon = "flaticon-business-element";
            activeDesktop.expressionSelectorSelected["linkNameAttr"] = getLinkName(constants.objectType["BUSINESS_CONTROL"], constants.objectType["ASSET"]);
            activeDesktop.expressionSelectorSelected["label"] = getLinkName(constants.objectType["BUSINESS_CONTROL"], constants.objectType["ASSET"]);
        } else if(shieldObjType === backing.object_type.threat.key) {
            linkName = getLinkName(backing.object_type.threat_element.key, backing.object_type.asset.key)
            elementLabel = "Threat Vectors of ";
            mapToIcon = "flaticon-threat-control";
            activeDesktop.expressionSelectorSelected["linkNameAttr"] = getLinkName(constants.objectType["THREAT_ELEMENT"], constants.objectType["ASSET"]);
            activeDesktop.expressionSelectorSelected["label"] = getLinkName(constants.objectType["THREAT_ELEMENT"], constants.objectType["ASSET"]);
        }
        if(linkName)
            $("#bi_ruler_type_desk .rulerLinkLabel").text(linkName);
        if(elementLabel)
            $("#bi_ruler_type_desk .headerWrapper .desktop-selector-dropdown .labelText").text(elementLabel);

        $("#saveData").show();
        getAllowedLevels(data);
        $("#bi_r_type_desk_shield_dropdown_selected").closest(".desktop-selector-dropdown").find(".mapToIcon").removeClass("flaticon-shield-element flaticon-standard-element flaticon-business-element flaticon-threat-control");
        let controlsClass = mapToIcon;
        $("#bi_r_type_desk_shield_dropdown_selected").closest(".desktop-selector-dropdown").find(".mapToIcon").addClass(controlsClass);
        $("#bi_r_type_desk_shield_dropdown_selected").html(selectedElement.find(".dropdownIcon").html() + selectedElement.find(".acronym").html());
        $("#bi_r_type_desk_shield_dropdown_selected").attr("title", selectedElement.attr("title"));
        $("#bi_r_type_desk_shield_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));

    }

    function levelSelectorClick(selectedElement) {
        if (!selectedElement) {
            $(".desktop-selector-dropdown-content").addClass("dis-none");
            return;
        }
        // else if($("#bi_sh_arch_desk_level_dropdown_selected").html() === selectedElement.html()){
        //     $(".desktop-selector-dropdown-content").addClass("dis-none");
        //     return;
        // }
        let data = {};
        data.shieldId = $("#bi_r_type_desk_shield_dropdown_selected").attr("elementId");
        data.level = selectedElement.attr("elementId");
        $("#saveData").show();
        getElementGroups(data);
        $(".desktop-selector-dropdown-content").addClass("dis-none");
        if (selectedElement.attr("elementId") !== "0") {
            $("#bi_r_type_desk_level_dropdown_selected").attr("title", selectedElement.html());
            $("#bi_r_type_desk_level_dropdown_selected").html(selectedElement.html());
            $("#bi_r_type_desk_level_dropdown_selected").parent().find(".levelIcon").removeClass("opacityDull");
        }
        else {
            $("#bi_r_type_desk_level_dropdown_selected").attr("title", "");
            $("#bi_r_type_desk_level_dropdown_selected").parent().find(".levelIcon").addClass("opacityDull");
            $("#bi_r_type_desk_level_dropdown_selected").html("");
        }
        $("#bi_r_type_desk_level_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));

    }

    function groupSelectorClick(selectedElement) {
        if (!selectedElement) {
            $(".desktop-selector-dropdown-content").addClass("dis-none");
            return;
        }
        // else if($("#bi_sh_arch_desk_groups_dropdown_selected").html() === selectedElement.html()){
        //     $(".desktop-selector-dropdown-content").addClass("dis-none");
        //     return;
        // }
        $("#saveData").show();
        $(".desktop-selector-dropdown-content").addClass("dis-none");
        if (selectedElement.attr("elementId") !== "0") {
            $("#bi_r_type_desk_groups_dropdown_selected").attr("title", selectedElement.html());
            $("#bi_r_type_desk_groups_dropdown_selected").html(selectedElement.html());
            $("#bi_r_type_desk_groups_dropdown_selected").parent().find(".groupIcon").removeClass("opacityDull");
        }
        else {
            $("#bi_r_type_desk_groups_dropdown_selected").attr("title", "");
            $("#bi_r_type_desk_groups_dropdown_selected").parent().find(".groupIcon").addClass("opacityDull");
            $("#bi_r_type_desk_groups_dropdown_selected").html("");
        }
        $("#bi_r_type_desk_groups_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));
        let event = {"key": backing.event_type.selector_change.key};
        propagateEvent(event);
        getPerspectives();

    }

    function minIndexSelectorClick(selectedElement) {
        if (!selectedElement) {
            $(".desktop-selector-dropdown-content").addClass("dis-none");
            return;
        }
        $(".desktop-selector-dropdown-content").addClass("dis-none");
        $("#bi_r_type_desk_search_min_index_dropdown_selected").html(selectedElement.html());
        if ($("#bi_r_type_desk_search_max_index_dropdown_selected").html() < selectedElement.html()) {
            $("#single_r_type_desk_search_max_index_dropdown_selected").html(selectedElement.html());
        }
        $("#bi_r_type_desk_search_min_index_dropdown_selected").closest(".desktop-selector-container").find(".search-keyword").keyup();
        renderMaxIndexDropDown();
    }

    function maxIndexSelectorClick(selectedElement) {
        if (!selectedElement) {
            $(".desktop-selector-dropdown-content").addClass("dis-none");
            return;
        }
        $(".desktop-selector-dropdown-content").addClass("dis-none");
        $("#bi_r_type_desk_search_max_index_dropdown_selected").html(selectedElement.html());
        $("#bi_r_type_desk_search_max_index_dropdown_selected").closest(".desktop-selector-container").find(".search-keyword").keyup();
    }

    function getSelectorForRulerTypeDesk() {
        $("#saveData").show();
        var desktopSelector = backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop.selector;
        var selectorObj = {};
        var selectedPerspectives = [];
        $("#" + desktopSelector.perspective_container).find(".perspectiveItem").each(function () {
            if ($(this).hasClass("selected")) {
                selectedPerspectives.push($(this).attr("elementId"));
            }
        });
        selectorObj.perspectiveIds = selectedPerspectives;
        selectorObj.shieldId = $("#" + desktopSelector.shield_dropdown_selected_id).attr("elementId");
        selectorObj.shieldElementGroupId = $("#" + desktopSelector.groups_dropdown_selected_id).attr("elementId");
        selectorObj.level = $("#" + desktopSelector.level_dropdown_selected_id).attr("elementId");
        $("#saveData").hide();
        return selectorObj;
    }

    function refreshFullDesktop() {
        var previousSelection = {};
        let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop;
        var desktop = $("#" + activeDesktop.anchor_div_id);
        let shieldSelectorId = activeDesktop.selector.shield_dropdown_selected_id;
        let levelSelectorId = activeDesktop.selector.level_dropdown_selected_id;
        let groupSelectorId = activeDesktop.selector.groups_dropdown_selected_id;

        previousSelection.shieldSelectorId = $("#" + shieldSelectorId).attr("elementId");
        previousSelection.levelSelectorId = $("#" + levelSelectorId).attr("elementId");
        previousSelection.groupSelectorId = $("#" + groupSelectorId).attr("elementId");
        previousSelection.perspectivesSelectedId = activeDesktop.perspectivesSelected;
        previousSelection.oldPerspectives = activeDesktop.perspectives;

        if (desktop.find(".desktop-perspective-selector-container .selectorLabel .compositePerspectiveSelectionInBiview").hasClass("active")) {
            previousSelection.compositeSelection = true;
        }
        else {
            previousSelection.compositeSelection = false;
        }
        activeDesktop.previousSelectors = previousSelection;

        getShieldsOfShieldType();
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("ruler_type_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("ruler_type_desktop", undefined, true);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

     // added for drag and drop by Manish
    function addDragAndDrop() {
    }

     function saveDragAndDrop(){
    }

    rulTypDesk.shieldSelectorClick = shieldSelectorClick;
    rulTypDesk.levelSelectorClick = levelSelectorClick;
    rulTypDesk.groupSelectorClick = groupSelectorClick;
    rulTypDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    rulTypDesk.getDirectoryView = getDirectoryView;
    rulTypDesk.getSelector = getSelectorForRulerTypeDesk;
    rulTypDesk.getPerspectives = getPerspectives;
    rulTypDesk.renderPerspectiveDropDownLi = renderPerspectiveDropDownLi;
    rulTypDesk.searchObjectElementClick = searchObjectElementClick;
    rulTypDesk.minIndexSelectorClick = minIndexSelectorClick;
    rulTypDesk.maxIndexSelectorClick = maxIndexSelectorClick;
    rulTypDesk.fullRefresh = refreshFullDesktop;
    rulTypDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    rulTypDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    rulTypDesk.reOrderPerspective = reOrderPerspective;
    rulTypDesk.getShieldStartingPointSearchSelectionObject = getShieldStartingPointSearchSelectionObjectForAnalysis;
    rulTypDesk.addDragAndDrop = addDragAndDrop;
    rulTypDesk.saveDragAndDrop = saveDragAndDrop;
    return rulTypDesk;
}

function renderProjectionView(viewName, isBiview, uniqueId) {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, viewClass, closeBtnClass, searchDropDownSelected,
        searchDropDown, customSearchDropDownSelected, customSearchDropDown;
    if (isBiview) {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "biview";
        closeBtnClass = "biviewCloseBtn";
        searchDropDownSelected = "projectionbiSearchElementTypeSelected";
        searchDropDown = "projectionbiSearchElementTypeDropDown";
        customSearchDropDownSelected = "projectionbiCustomSearchElementTypeSelected";
        customSearchDropDown = "projectionbiCustomSearchElementTypeDropDown";

    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        viewClass = "singleview";
        closeBtnClass = "singleviewCloseBtn";
        searchDropDownSelected = "projectionsingleSearchElementTypeSelected";
        searchDropDown = "projectionsingleSearchElementTypeDropDown";
        customSearchDropDownSelected = "projectionsingleCustomSearchElementTypeSelected";
        customSearchDropDown = "projectionsingleCustomSearchElementTypeDropDown";
    }
    let desktopId = activeDesktop.div_id;
    let selector = activeDesktop.selector;
    //let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    let str = "";
    // str += "<div objectType = \""+associationObjectType+"\" id=\"" + viewName + "\" class=\"innerDesktop associationViewDesktop\" view=\"" + viewClass + "\"expressionId = \""+data.expressionId+"\">" +
    str += `<div id="projection${activeDesktop.anchor_div_id}" class="innerDesktop projectionViewDesktop dis-none" view="${viewClass}">` +
        "<div class=\"headerWrapper\"><div class=\"panel-header-container " + viewClass + "\">" +
        "<span class=\"flaticon-projection findSourceHotlink\" title=\"Show Source Hotlink\">";
    str += "</span>" +
        "<span class=\"panel-header\">PROJECT</span>" +
        "<span class=\"rgtnavdfstage_build_workbench_close  close-btn " + closeBtnClass + "\" id=\"closeAssociationView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>";
    str += "<span class=\"fright flaticon-refresh-button refreshButton\"></span><span class=\"fright flaticon-shape projectionRingView\"></span>";
    str += "</div>" +
        "<div class=\"panel-header-container " + viewClass + "\">" +
        "<div class=\"desktop-selector fleft\" style=\"max-width: 240px;\">" +
        "<span class=\"mapToIcon\"></span>" +
        "<label class=\"labelText\">Ratings of</label>" +
        `<span id="projected${selector.shield_dropdown_selected_id}" class="selector projectionShieldSelector"></span>` +
        "</div>" +
        `<div class="desktop-selector equalBy3 fleft">` +
        `<span class="flaticon-levels levelIcon" title="Level Selection"></span>` +
        `<span id="projected${selector.level_dropdown_selected_id}" class="selector levelSelector"></span>` +
        "</div>" +
        "<div class=\"desktop-selector equalBy3 fleft\">" +
        `<span class="flaticon-groups groupIcon" title="Group Selection"></span>` +
        `<span id="projected${selector.groups_dropdown_selected_id}" class="selector groupSelector"></span>` +
        "</div>" +
        "</div>" +
        "<div class=\"panel-header-container " + viewClass + "\">" +
        "<span class=\"flaticon-turn-right newLine\"></span>" +
        "<span class=\"flaticon-projection mapToIcon\"></span>" +
        "<label class=\"labelText\" style=\"margin-right: 12px;\">Projected onto</label>" +
        "<div class=\"desktop-selector-dropdown fleft\" style=\"max-width: 36%;\">" +
        "<span class=\"mapToIcon\"></span>" +
        "<label class=\"labelText\">Controls of</label>" +
        `<span id="projection${selector.shield_dropdown_selected_id}" class="selector  shieldSelectorProjectionSelected">SELECT</span>` +
        "<span class=\"flaticon-size-arrow dropdownArrow\"></span>" +
        `<div id="projection${selector.shield_dropdown_id}" class="desktop-selector-dropdown-content dis-none shieldSelectorProjectionSelected_dropDown_content">` +
        "</div>" +
        "</div>" +
        `<div class="desktop-selector-dropdown fleft" style=\"width:93px\">` +
        `<span class="flaticon-levels levelIcon iconClick opacityDull" title="Level Selection"></span>` +
        `<span id="projection${selector.level_dropdown_selected_id}" class="selector levelSelectorProjectionSelected"></span>` +
        `<div id="projection${selector.level_dropdown_id}" class="desktop-selector-dropdown-content dis-none levelSelectorProjectionSelected_dropDown_content">` +
        "</div>" +
        "</div>" +
        "<div class=\"desktop-selector-dropdown fleft\" style=\"width:84px\">" +
        `<span class="flaticon-groups groupIcon iconClick opacityDull" title="Group Selection"></span>` +
        `<span id="projection${selector.groups_dropdown_selected_id}" class="selector groupSelectorProjectionSelected"></span>` +
        `<div id="projection${selector.groups_dropdown_id}" class="desktop-selector-dropdown-content dis-none groupSelectorProjectionSelected_dropDown_content">` +
        "</div>" +
        "</div>" +
        "<span class=\"searchWithMappedElements flaticon-show-map\" title=\"Show me Links\" staticMap=\"true\" isProjection=\"true\" style=\"margin-left:8px;\"></span><span class=\"flaticon-search openSearch fright hideAndShowSearch\" title=\"Show Search Bar\"></span>" +
        "</div>" +
        "<div class=\"searchWrapper\"><div class=\"desktop-selector-container desktop-searchSelector-container\">" +
        "<span class=\"flaticon-search search\"></span><input class=\"search-keyword fleft\" placeholder=\"Search\">" +
        "<div class=\"desktop-selector-dropdown equalBy3 fleft\">" +
        `<span class="flaticon-search-dropdown searchIcon iconClick opacityDull" title="Select Object Type To Search"></span>` +
        `<span id="projection${selector.search_dropdown_selected_id}" class="selector searchObject_elementType ${searchDropDownSelected}"></span>` +
        `<div id="projection${selector.search_dropdown_id}" class="desktop-selector-dropdown-content dis-none ${searchDropDown}">` +
        "</div>" +
        "</div>" +
        `<div class="desktop-selector-dropdown equalBy3 fleft"><span class="flaticon-range rangeIcon"></span>` +
        `<span id="projection${selector.search_min_index_dropdown_selected_id}"class="selector searchObject_minIndex">0.0</span>` +
        `<div id="projection${selector.search_min_index_dropdown_id}"class="desktop-selector-dropdown-content dis-none">` +
        `</div>` +
        `</div>` +
        `<div class="desktop-selector-dropdown equalBy3 fleft">` +
        `<span class="selector" style="padding:0 10px">TO</span>` +
        `</div>` +
        `<div class="desktop-selector-dropdown equalBy3 fleft">` +
        `<span id="projection${selector.search_max_index_dropdown_selected_id}"class="selector searchObject_maxIndex">1.0</span>` +
        `<div id="projection${selector.search_max_index_dropdown_id}"class="desktop-selector-dropdown-content dis-none">` +
        `</div></div>` +
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
        `<span id="projection${selector.custom_search_dropdown_selected_id}" class=\"selector custom_searchObject_elementType ${customSearchDropDownSelected}"></span>` +
        `<div id="projection${selector.custom_search_dropdown_id}" class="desktop-selector-dropdown-content dis-none ${customSearchDropDown}">` +
        "</div>" +
        "</div>" +
        "<span title=\"Clear Search\" class=\"tooltip clearSearch flaticon-remove tooltipstered\"></span>";
    str += "</div></div></div>";
    str += "<div class=\"treeContainerExpAssociationView treeContainer\">" +
        "<div class=\"tree_structure_parent\">" +
        `<div class="directoryView_ringList clearfix directoryViewList directoryViewList_DV directoryViewUl" id="projection${activeDesktop.tree_container_id}"></div>` +
        "</div>" +
        "</div>";
    str += "</div>";
    $("#" + desktopId).append(str);
}

function shieldSelectorProjection(previousSelector, selectorId, selectorClick, hotlinkData, isBiview) {
    if (previousSelector && previousSelector.shieldSelectorId) {
        let liIndex = getLiFromSelector(selectorId, previousSelector.shieldSelectorId);
        if (liIndex) {
            liIndex++;
            selectorClick($("#" + selectorId + " ul:first li:nth-child(" + liIndex + ")"), hotlinkData, isBiview);
        }
        else {
            selectorClick($("#" + selectorId + " ul:first li:first"), hotlinkData, isBiview);
        }
    }
    else
        selectorClick($("#" + selectorId + " ul:first li:first"), hotlinkData, isBiview);
}

function levelSelectorProjection(previousSelector, selectorId, levelSelectorClick, hotlinkData, isBiview) {
    if (previousSelector && previousSelector.levelSelectorId) {
        let liIndex = getLiFromSelector(selectorId, previousSelector.levelSelectorId);
        if (liIndex) {
            liIndex++;
            levelSelectorClick($("#" + selectorId + " ul:first li:nth-child(" + liIndex + ")"), hotlinkData, isBiview);
        }
        else {
            levelSelectorClick($("#" + selectorId + " ul:first li:first"), hotlinkData, isBiview);
        }
    }
    else
        levelSelectorClick($("#" + selectorId + " ul:first li:first"), hotlinkData, isBiview);
}

function groupSelectorProjection(previousSelector, selectorId, getLiSelector, groupSelectorClick, hotlinkData, isBiview, groupItemClass) {
    if (previousSelector && previousSelector.groupSelectorId) {
        let liIndex = getLiSelector(selectorId, previousSelector.groupSelectorId);
        if (liIndex && groupItemClass) {
            if (!groupItemClass) {
                liIndex++;
            }
            groupSelectorClick(liIndex, hotlinkData, isBiview);
        }
        else {
            groupSelectorClick($("#" + selectorId + " ul:first li:first"), hotlinkData, isBiview);
        }
    }
    else
        groupSelectorClick($("#" + selectorId + " ul:first li:first"), hotlinkData, isBiview);
}

function renderObjectAndElementTypesDropDownForViews(objects, activeDesktop, liElementClass) {
    let str = "";
    let selectorDropDownId = "projection" + activeDesktop.selector.search_dropdown_id;
    addToDictionary(objects);
    let sortedObj = getSortElementTypeDropDownObject(objects);
    str += "<ul>";
    str += "<li class=\"" + liElementClass + "\">ALL</li>";
    for (let i = 0; i < sortedObj.length; i++) {
        str += "<li class=\"" + liElementClass + "\"  randomId =\"" + sortedObj[i].randomId + "\">" + sortedObj[i].label.toUpperCase() + "</li>";
    }
    str += "</ul>";
    $("#" + selectorDropDownId).html(str);
    let projectionUtil = new projectionUtils();
    let dropDownId = "projection" + activeDesktop.selector.search_dropdown_id;
    let selectedId = "projection" + activeDesktop.selector.search_dropdown_selected_id;
    let selectedElement = $("#" + dropDownId).find("ul:first li:first");
    projectionUtil.searchObjectElementClick(selectedElement, selectedId, dropDownId);
}

function renderCustomSearchDropDownForViews(randomId, activeDesktop, liElementClass, isBiview) {
    let str = "";
    let isHaveNoSelected = false;
    let desktop = $("#projection" + activeDesktop.anchor_div_id);
    let selectorDropDownId = "projection" + activeDesktop.selector.custom_search_dropdown_id;
    let selectorId = "projection" + activeDesktop.selector.custom_search_dropdown_selected_id;
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
            $("#" + selectorDropDownId).html(str);
            customSearchObjectElementClick($("#" + selectorDropDownId + " ul:first li:first"), selectorId, selectorDropDownId);
            $("#" + selectorDropDownId).closest(".desktop-selector-container").removeClass("dis-none");
            if (isHaveNoSelected)
                desktop.find(".custom_searchObject_elementType").removeClass("dis-none");
            else
                desktop.find(".custom_searchObject_elementType").addClass("dis-none");
            modifyContainerHeight(desktop);
        }
        else {
            desktop.find(".customSearchSelector").removeClass("active");
            desktop.find(".allSearch").addClass("active");
            $("#" + selectorId).removeAttr("randomId");
            $("#" + selectorDropDownId).empty();
            $("#" + selectorDropDownId).closest(".desktop-selector-container").addClass("dis-none");
            $("#" + selectorId).closest(".innerDesktop").find(".search-keyword").keyup();
            modifyContainerHeight(desktop);
        }
    }
    else {
        desktop.find(".customSearchSelector").removeClass("active");
        desktop.find(".allSearch").addClass("active");
        $("#" + selectorId).removeAttr("randomId");
        $("#" + selectorDropDownId).empty();
        $("#" + selectorDropDownId).closest(".desktop-selector-container").addClass("dis-none");
        $("#" + selectorId).closest(".innerDesktop").find(".search-keyword").keyup();
        modifyContainerHeight(desktop);
    }
}