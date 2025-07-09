let evalLufId;
$(document).ready(function () {
    $(document).on("click", ".shieldSelectorShieldRulerItem", function (e) {
        evalLufId=$(this).attr("elementId");
        let shieldElementRulerTypeDesktopUtils = new ShieldElementRulerTypeDesktopUtils();
        shieldElementRulerTypeDesktopUtils.shieldSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".levelSelectorShieldRulerItem", function (e) {
        let shieldElementRulerTypeDesktopUtils = new ShieldElementRulerTypeDesktopUtils();
        shieldElementRulerTypeDesktopUtils.levelSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".groupSelectorShieldRulerItem", function (e) {
        let shieldElementRulerTypeDesktopUtils = new ShieldElementRulerTypeDesktopUtils();
        shieldElementRulerTypeDesktopUtils.groupSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".evalSearchObject_ShieldElementTypeItem", function (e) {
        let rulerTypeDesktopUtil = new ShieldElementRulerTypeDesktopUtils();
        let dropDownId = "single_shield_element_r_type_desk_search_dropdown_content";
        let selectedId = "single_shield_element_r_type_desk_search_dropdown_selected";
        rulerTypeDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".evalCustomSearchObject_ShieldElementTypeItem", function (e) {
        let dropDownId = "single_shield_element_r_type_desk_custom_search_dropdown_content";
        let selectedId = "single_shield_element_r_type_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".searchMinIndexShieldElementItem", function (e) {
        let rulerTypeDesktopUtil = new ShieldElementRulerTypeDesktopUtils();
        rulerTypeDesktopUtil.minIndexSelectorClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".searchMaxIndexShieldElementItem", function (e) {
        let rulerTypeDesktopUtil = new ShieldElementRulerTypeDesktopUtils();
        rulerTypeDesktopUtil.maxIndexSelectorClick($(this));
        e.stopPropagation();
    });
});

function ShieldElementRulerTypeDesktopUtils() {
    let shElemRulTypDesk = new Object();

    function getShieldsOfShieldType() {
        let activeDesktop = backing.singleview.workspaces.eval_workspace.desktops.shield_element_ruler_type_desktop;
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
                renderSelectorDropDown(activeDesktop, res.children, "shieldSelector", "shieldSelectorShieldRuler", data, true, defaultPrefs);
                shieldSelector(previousSelector, selectorId, shieldSelectorClick);
                let event = {"key": backing.event_type.selector_change.key};
                propagateEvent(event);
            });
        };
        serviceFunctions.getShieldsAndStandard(callback);
    }

    function getAllowedLevels(data) {
        let activeDesktop = backing.singleview.workspaces.eval_workspace.desktops.shield_element_ruler_type_desktop;
        let selectorId = activeDesktop.selector.level_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        let callback = function (res) {
            let data = {};
            data.idOfParentDiv = selectorId;
            data.view = "singleview";
            data.viewName = "groupView";
            data.isRoot = false;
            renderSelectorDropDown(activeDesktop, res, "levelSelector", "levelSelectorShieldRuler", data, true);
            levelSelector(previousSelector, selectorId, levelSelectorClick);
        };
        serviceFunctions.getAllowedLevels(data, callback);
        let event = {"key": backing.event_type.selector_change.key};
        propagateEvent(event);
    }

    function getElementGroups(data) {
        let activeDesktop = backing.singleview.workspaces.eval_workspace.desktops.shield_element_ruler_type_desktop;
        let selectorId = activeDesktop.selector.groups_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        let callback = function (res) {
            let data = {};
            data.idOfParentDiv = selectorId;
            data.view = "singleview";
            data.viewName = "groupView";
            data.isRoot = false;
            renderSelectorDropDown(activeDesktop, res, "groupSelector", "groupSelectorShieldRuler", data, true);
            groupSelector(previousSelector, selectorId, getLiFromSelector, groupSelectorClick);
        };
        serviceFunctions.getGroupsGivenMaxLevel(data, callback);
        let event = {"key": backing.event_type.selector_change.key};
        propagateEvent(event);
    }

    function getDirectoryView() {
        let data = getSelectorForRulerTypeDesk();
        let activeDesktop = backing.singleview.workspaces.eval_workspace.desktops.shield_element_ruler_type_desktop;
        let previousSelector = activeDesktop.previousSelectors;
        let directoryViewTreeId = activeDesktop.tree_container_id;
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0) || (data.perspectiveIds.length < 0)) {
            $("#" + directoryViewTreeId).empty();
            $("#saveData").hide();
            return;
        }
        $("#saveData").show();
        service.getShieldElementRulerTypeDv(data, function (res, err) {
            if (res) {
                activeDesktop.perspectivesSelected = data.perspectiveIds;
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
                        renderObjectTypesAndElementTypesDropDown(objectTypesAndElementTypes, activeDesktop, "evalSearchObject_ShieldElementTypeItem");
                    }
                    renderMinIndexDropDown();
                    renderMaxIndexDropDown();
                    let oldExpansionState = getExpansionStateOfElements(activeDesktop.tree_container_id);
                    renderDirectoryView(res, directoryViewTreeId, "singleview", "anchorView", false);
                    // applyExpansionState(oldExpansionState, activeDesktop.tree_container_id);
                    let ringViewDivId = backing.view_type.ring_view.name + "_" + activeDesktop.div_id;
                    activeDesktop.elementIdAndObjectArray = null;
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
        });
    }

    function getPerspectives() {
        $("#saveData").show();
        service.getAllPerspectives(null, function (res, err) {
            if (res) {
                let activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
                let activeDesktopKeyname = backing.singleview.active_desktop.keyname;
                let activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
                if (activeDesktop) {
                    backing.singleview.workspaces.eval_workspace.desktops.shield_element_ruler_type_desktop.perspectives = res;
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

    function renderMinIndexDropDown() {
        let activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        let activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        let activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        let selectorDropDownId = activeDesktop.selector.search_min_index_dropdown_id;

        let str = "";
        str += "<ul>";
        for (let i = 0; i <= 1;) {
            str += "<li class=\"searchMinIndexShieldElementItem\">" + i.toFixed(1) + "</li>\n";
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
            str += "<li class=\"searchMaxIndexShieldElementItem\">" + i.toFixed(1) + "</li>\n";
            i = (i + 0.1);
        }
        str += "</ul>";
        $("#" + selectorDropDownId).html(str);
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.eval_workspace.desktops.shield_element_ruler_type_desktop;
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
        renderCustomSearchDropDown(selectedElement.attr("randomId"), activeDesktop, "evalCustomSearchObject_ShieldElementTypeItem");
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
        let selectedIds = backing.singleview.workspaces.eval_workspace.desktops.shield_element_ruler_type_desktop.perspectivesSelected;
        backing.singleview.workspaces.eval_workspace.desktops.shield_element_ruler_type_desktop.perspectivesCount = renderData.children.length;
        data.idOfParentDiv = selectorDropDown;
        data.view = "singleview";
        data.viewName = "schemaView";
        data.isRoot = false;
        perspectives = renderData.children;
        if (previousSelector && previousSelector.perspectivesSelectedId && previousSelector.oldPerspectives) {
            let perspectivesSelectedId = previousSelector.perspectivesSelectedId;
            let oldPerspectives = previousSelector.oldPerspectives;
            if (renderData.children.length > oldPerspectives.children.length) {
                //  let difference = $(renderData.children).not(oldPerspectives.children).get();
                let onlyInA = renderData.children.filter(comparer(oldPerspectives.children));
                let onlyInB = oldPerspectives.children.filter(comparer(renderData.children));
                var result = onlyInA.concat(onlyInB);
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
            else if (perspectivesSelectedId || perspectivesSelectedId.length === 0) {
                for (let i = 0; i <= perspectives.length; i++) {
                    if (perspectives[i]) {
                        if (i === 0) {
                            str += renderPerspectiveLi(perspectives[i], selector, data, "selected");
                        }
                        else
                            str += renderPerspectiveLi(perspectives[i], selector, data, "");
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
        $("#single_shield_element_r_type_slider").html(str);
        getDirectoryView();
        reOrderPerspective(false, activeDesktop);
    };

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
        let perspectivesSelectedId, isCompositeSelection;
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
                    str += `<li class="${selector}EvaluationItem" elementId="${selectorList[i][ATTR.elementId]}" defaultColor="#f5f5f5" persColor ="${selectorList[i].color}" style="background-color:${backgroundcolor}"><span class = "perspectiveSelectorLabel" title="${label}">${label}</span>` +
                        `<span class="fright checkboxSpan"><input type="checkbox" checked></span></li>`;
                }
                else {
                    backgroundcolor = "#f5f5f5";
                    str += `<li class="${selector}EvaluationItem" elementId="${selectorList[i][ATTR.elementId]}" defaultColor="#f5f5f5" persColor ="${selectorList[i].color}" style="background-color: ${backgroundcolor}"><span class = "perspectiveSelectorLabel" title="${label}">${label}</span>` +
                        `<span class="fright checkboxSpan"><input type="checkbox"></span></li>`;
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

        let shieldObjType = selectedElement.attr("objectType")
        let elementLabel = null;
        let mapToIcon = "flaticon-shield-element";
        if(shieldObjType === backing.object_type.shield.key) {
            elementLabel = " Internal Policies of ";
            mapToIcon = "flaticon-shield-element"
        } else if(shieldObjType === backing.object_type.standard.key) {
            elementLabel = "External Policies of ";
            mapToIcon = "flaticon-standard-element"
        } else if(shieldObjType === backing.object_type.b_framework.key) {
            elementLabel = "Value Processes of ";
            mapToIcon = "flaticon-business-element"
        } else if(shieldObjType === backing.object_type.threat.key) {
            elementLabel = "Threat Vectors of ";
            mapToIcon = "flaticon-threat-control"
        }
        if(elementLabel)
            $("#shield_element_ruler_type_desk .headerWrapper .desktop-selector-dropdown .labelText").text(elementLabel);

        $("#saveData").show();
        getAllowedLevels(data);
        let iconWrapper = $("#single_shield_element_r_type_desk_shield_dropdown_selected").closest(".desktop-selector-dropdown").find(".mapToIcon");
        iconWrapper.removeClass("flaticon-shield-element flaticon-standard-element flaticon-business-element flaticon-threat-control");
        let controlsClass = mapToIcon;
        $("#single_shield_element_r_type_desk_shield_dropdown_selected").closest(".desktop-selector-dropdown").find(".mapToIcon").addClass(controlsClass);
        $("#single_shield_element_r_type_desk_shield_dropdown_selected").html(selectedElement.find(".dropdownIcon").html() + selectedElement.find(".acronym").html());
        $("#single_shield_element_r_type_desk_shield_dropdown_selected").attr("title", selectedElement.attr("title"));
        $("#single_shield_element_r_type_desk_shield_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));

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
        data.shieldId = $("#single_shield_element_r_type_desk_shield_dropdown_selected").attr("elementId");
        data.level = selectedElement.attr("elementId");
        $("#saveData").show();
        getElementGroups(data);
        $(".desktop-selector-dropdown-content").addClass("dis-none");
        if (selectedElement.attr("elementId") !== "0") {
            $("#single_shield_element_r_type_desk_level_dropdown_selected").attr("title", selectedElement.html());
            $("#single_shield_element_r_type_desk_level_dropdown_selected").html(selectedElement.html());
            $("#single_shield_element_r_type_desk_level_dropdown_selected").parent().find(".levelIcon").removeClass("opacityDull");
        }
        else {
            $("#single_shield_element_r_type_desk_level_dropdown_selected").attr("title", "");
            $("#single_shield_element_r_type_desk_level_dropdown_selected").parent().find(".levelIcon").addClass("opacityDull");
            $("#single_shield_element_r_type_desk_level_dropdown_selected").html("");
        }
        $("#single_shield_element_r_type_desk_level_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));
        $("#single_shield_element_r_type_desk_level_dropdown_selected").attr("elementTypeId", selectedElement.attr("elementTypeId"));

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
        $("#single_shield_element_r_type_desk_groups_dropdown_selected").html(selectedElement.html());
        if (selectedElement.attr("elementId") !== "0") {
            $("#single_shield_element_r_type_desk_groups_dropdown_selected").attr("title", selectedElement.html());
            $("#single_shield_element_r_type_desk_groups_dropdown_selected").html(selectedElement.html());
            $("#single_shield_element_r_type_desk_groups_dropdown_selected").parent().find(".groupIcon").removeClass("opacityDull");
        }
        else {
            $("#single_shield_element_r_type_desk_groups_dropdown_selected").attr("title", "");
            $("#single_shield_element_r_type_desk_groups_dropdown_selected").parent().find(".groupIcon").addClass("opacityDull");
            $("#single_shield_element_r_type_desk_groups_dropdown_selected").html("");
        }
        $("#single_shield_element_r_type_desk_groups_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));
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
        $("#single_shield_element_r_type_desk_search_min_index_dropdown_selected").html(selectedElement.html());
        if ($("#single_shield_element_r_type_desk_search_max_index_dropdown_selected").html() < selectedElement.html()) {
            $("#single_shield_element_r_type_desk_search_max_index_dropdown_selected").html(selectedElement.html());
        }
        //$("#single_r_type_desk_groups_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));
        $("#single_shield_element_r_type_desk_search_min_index_dropdown_selected").closest(".desktop-selector-container").find(".search-keyword").keyup();

        //$("#single_r_type_desk_groups_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));
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
        $("#single_shield_element_r_type_desk_search_max_index_dropdown_selected").html(selectedElement.html());
        // $("#single_r_type_desk_groups_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));
        $("#single_shield_element_r_type_desk_search_max_index_dropdown_selected").closest(".desktop-selector-container").find(".search-keyword").keyup();
    }

    function getSelectorForRulerTypeDesk() {
        $("#saveData").show();
        let desktopSelector = backing.singleview.workspaces.eval_workspace.desktops.shield_element_ruler_type_desktop.selector;
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
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("shield_element_ruler_type_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("shield_element_ruler_type_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    // added for drag and drop by Manish
    function addDragAndDrop() {
    }

    //added by Manish for drag and drop
    function saveDragAndDrop(){
    }

    shElemRulTypDesk.shieldSelectorClick = shieldSelectorClick;
    shElemRulTypDesk.levelSelectorClick = levelSelectorClick;
    shElemRulTypDesk.groupSelectorClick = groupSelectorClick;
    //shElemRulTypDesk.renderSelectorDropDown = renderSelectorDropDown;
    shElemRulTypDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    shElemRulTypDesk.getDirectoryView = getDirectoryView;
    shElemRulTypDesk.getSelector = getSelectorForRulerTypeDesk;
    shElemRulTypDesk.getPerspectives = getPerspectives;
    shElemRulTypDesk.renderPerspectiveDropDownLi = renderPerspectiveDropDownLi;
    shElemRulTypDesk.searchObjectElementClick = searchObjectElementClick;
    shElemRulTypDesk.minIndexSelectorClick = minIndexSelectorClick;
    shElemRulTypDesk.maxIndexSelectorClick = maxIndexSelectorClick;
    shElemRulTypDesk.fullRefresh = refreshFullDesktop;
    shElemRulTypDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    shElemRulTypDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    shElemRulTypDesk.saveDragAndDrop = saveDragAndDrop;
    shElemRulTypDesk.addDragAndDrop = addDragAndDrop;
    return shElemRulTypDesk;
}

function BiViewShieldElementRulerTypeDesktopUtils() {
    let shElemRulTypDesk = new Object();

    function getShieldsOfShieldType() {
        let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.shield_element_ruler_type_desktop;
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
                renderSelectorDropDown(activeDesktop, res.children, "shieldSelector", "biShieldSelectorShieldRuler", data, true, defaultPrefs);
                shieldSelector(previousSelector, selectorId, shieldSelectorClick);
                let event = {"key": backing.event_type.selector_change.key};
                propagateEvent(event);
            });
        };
        serviceFunctions.getShieldsAndStandard(callback);
    }

    function getAllowedLevels(data) {
        let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.shield_element_ruler_type_desktop;
        let selectorId = activeDesktop.selector.level_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        let callback = function (res) {
            let data = {};
            data.idOfParentDiv = selectorId;
            data.view = "biview";
            data.viewName = "groupView";
            data.isRoot = false;
            renderSelectorDropDown(activeDesktop, res, "levelSelector", "biLevelSelectorShieldRuler", data, true);
            levelSelector(previousSelector, selectorId, levelSelectorClick);
            let event = {"key": backing.event_type.selector_change.key};
            propagateEvent(event);
        };
        serviceFunctions.getAllowedLevels(data, callback);
    }

    function getElementGroups(data) {
        let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.shield_element_ruler_type_desktop;
        let selectorId = activeDesktop.selector.groups_dropdown_id;
        let previousSelector = activeDesktop.previousSelectors;
        let callback = function (res) {
            let data = {};
            data.idOfParentDiv = selectorId;
            data.view = "biview";
            data.viewName = "groupView";
            data.isRoot = false;
            renderSelectorDropDown(activeDesktop, res, "groupSelector", "biGroupSelectorShieldRuler", data, true);
            groupSelector(previousSelector, selectorId, getLiFromSelector, groupSelectorClick);
            let event = {"key": backing.event_type.selector_change.key};
            propagateEvent(event);
        };
        serviceFunctions.getGroupsGivenMaxLevel(data, callback);
    }

    function getDirectoryView() {
        var data = getSelectorForRulerTypeDesk();
        let activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        let activeDesktopKeyname = backing.biview.active_desktop.keyname;
        let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.shield_element_ruler_type_desktop;
        let previousSelector = activeDesktop.previousSelectors;
        let directoryViewTreeId = activeDesktop.tree_container_id;
        modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
        if ((typeof(data.shieldId) === "undefined") || (parseInt(data.shieldId) === 0) || (data.perspectiveIds.length < 0)) {
            $("#" + directoryViewTreeId).empty();
            $("#saveData").hide();
            return;
        }
        $("#saveData").show();
        service.getShieldElementRulerTypeDv(data, function (res, err) {
            if (res) {
                activeDesktop.perspectivesSelected = data.perspectiveIds;
                if (activeDesktop) {
                    generateUniqueIdAndParentLink(res, activeDesktop.div_id, null);
                    backing.biview.dvDataUseAttr = res;
                    if (activeDesktop.sortBy === undefined)
                        activeDesktop.sortBy = false;
                    if (activeDesktop.sortBy === true)
                        sortChildrenAlphbetically(res);
                    activeDesktop.directoryJson = res;
                    let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                    if (objectTypesAndElementTypes) {
                        renderObjectTypesAndElementTypesDropDown(objectTypesAndElementTypes, activeDesktop, "biEvalSearchObject_ShieldElementTypeItem");
                    }
                    renderMinIndexDropDown();
                    renderMaxIndexDropDown();
                    var oldExpansionState = getExpansionStateOfElements(directoryViewTreeId);
                    renderDirectoryView(res, directoryViewTreeId, "biview", "anchorView", true);
                    // applyExpansionState(oldExpansionState, directoryViewTreeId);
                    var ringViewDivId = backing.view_type.ring_view.name + "_" + activeDesktop.div_id;
                    activeDesktop.elementIdAndObjectArray = null;
                    if ($("#" + ringViewDivId).hasClass("active"))
                        updateViewsStandards(ringViewDivId, res);
                    refreshGroupRingViews(activeDesktop.opened_views);
                    if (previousSelector) {
                        refreshAllOpenedViews(activeDesktop);
                        if (previousSelector.compositeSelection)
                            $("#" + activeDesktop.anchor_div_id).find(".desktop-perspective-selector-container .compositePerspectiveSelection").addClass("active");
                    }
                    applyExpansionState(oldExpansionState, directoryViewTreeId);
                    $("#saveData").hide()
                }
            }
            else if (err) {
                $("#saveData").hide();
            }
        });
    }

    function getPerspectives() {
        $("#saveData").show();
        service.getAllPerspectives(null, function (res, err) {
            if (res) {
                let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.shield_element_ruler_type_desktop;
                if (activeDesktop) {
                    backing.biview.workspaces.bi_eval_workspace.desktops.shield_element_ruler_type_desktop.perspectives = res;
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

    function renderMinIndexDropDown() {
        let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.shield_element_ruler_type_desktop;
        let selectorDropDownId = activeDesktop.selector.search_min_index_dropdown_id;

        let str = "";
        str += "<ul>";
        for (var i = 0; i <= 1;) {
            str += "<li class=\"biSearchMinIndexShieldElementItem\">" + i.toFixed(1) + "</li>\n";
            i = (i + 0.1);
        }
        str += "</ul>";
        $("#" + selectorDropDownId).html(str);
    }

    function renderMaxIndexDropDown() {
        let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.shield_element_ruler_type_desktop;
        let selectorDropDownId = activeDesktop.selector.search_max_index_dropdown_id;
        let minIndexSelectorId = activeDesktop.selector.search_min_index_dropdown_selected_id;
        let minIndex = parseFloat($("#" + minIndexSelectorId).html());
        let str = "";
        str += "<ul>";
        for (var i = minIndex; i <= 1;) {
            str += "<li class=\"biSearchMaxIndexShieldElementItem\">" + i.toFixed(1) + "</li>\n";
            i = (i + 0.1);
        }
        str += "</ul>";
        $("#" + selectorDropDownId).html(str);
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.shield_element_ruler_type_desktop;
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
        renderCustomSearchDropDown(selectedElement.attr("randomId"), activeDesktop, "biEvalCustomSearchObject_ShieldElementTypeItem");
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
        let perspectives;
        var selector = "perspective";
        var data = {};
        var selectedIds = backing.biview.workspaces.bi_eval_workspace.desktops.shield_element_ruler_type_desktop.perspectivesSelected;
        backing.biview.workspaces.bi_eval_workspace.desktops.shield_element_ruler_type_desktop.perspectivesCount = renderData.children.length;
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
                        continue loop1;
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
        $("#bi_shield_element_r_type_slider").html(str);
        getDirectoryView();
        reOrderPerspective(true, activeDesktop);
    }


    function renderPerspectiveLi(element, selector, data, selected) {
        var str = "";
        var backgroundcolor;
        let activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        let activeDesktopKeyname = backing.biview.active_desktop.keyname;
        let activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);

        var compositeColor = $("#" + activeDesktop.div_id).find(".compositeColorPicker").val();
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
        let activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        let activeDesktopKeyname = backing.biview.active_desktop.keyname;
        let activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        let previousSelector = backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop.previousSelectors;
        if (previousSelector) {
            var perspectivesSelectedId = previousSelector.perspectivesSelectedId;
            var isCompositeSelection = previousSelector.compositeSelection;
        }
        else {
            if ($("#" + activeDesktop.div_id).find(".compositePerspectiveSelection").hasClass("active")) {
                var isCompositeSelection = true;
            }
            else {
                var isCompositeSelection = false;
            }
        }
        str += "<ul>";
        if (isCompositeSelection) {
            for (let i = 0; i < selectorList.length; i++) {
                backgroundcolor = selectorList[i].color;
                let label = selectorList[i][ATTR.name].toUpperCase();
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
                    str += `<li class="${selector}EvaluationItem" elementId="${selectorList[i][ATTR.elementId]}" defaultColor="#f5f5f5" persColor ="${selectorList[i].color}" style="background-color: ${backgroundcolor}"><span class = "perspectiveSelectorLabel" title="${label}">${label}</span>` +
                        `<span class="fright checkboxSpan"><input type="checkbox"></span></li>`;
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
        canHaveCreateShieldElementHotlink(data.shieldId, true);

        let shieldObjType = selectedElement.attr("objectType")
        let elementLabel = null;
        let mapToIcon = "flaticon-shield-element";
        if(shieldObjType === backing.object_type.shield.key) {
            elementLabel = " Internal Policies of ";
            mapToIcon = "flaticon-shield-element"
        } else if(shieldObjType === backing.object_type.standard.key) {
            elementLabel = "External Policies of ";
            mapToIcon = "flaticon-standard-element"
        } else if(shieldObjType === backing.object_type.b_framework.key) {
            elementLabel = "Value Processes of ";
            mapToIcon = "flaticon-business-element"
        } else if(shieldObjType === backing.object_type.threat.key) {
            elementLabel = "Threat Vectors of ";
            mapToIcon = "flaticon-threat-control"
        }
        if(elementLabel)
            $("#bi_shield_element_ruler_type_desk .headerWrapper .desktop-selector-dropdown .labelText").text(elementLabel);

        $("#saveData").show();
        getAllowedLevels(data);
        $("#bi_shield_element_r_type_desk_shield_dropdown_selected").closest(".desktop-selector-dropdown").find(".mapToIcon").removeClass("flaticon-shield-element flaticon-standard-element flaticon-business-element flaticon-threat-control");
        let controlsClass = mapToIcon;
        $("#bi_shield_element_r_type_desk_shield_dropdown_selected").closest(".desktop-selector-dropdown").find(".mapToIcon").addClass(controlsClass);
        $("#bi_shield_element_r_type_desk_shield_dropdown_selected").html(selectedElement.find(".dropdownIcon").html() + selectedElement.find(".acronym").html());
        $("#bi_shield_element_r_type_desk_shield_dropdown_selected").attr("title", selectedElement.attr("title"));
        $("#bi_shield_element_r_type_desk_shield_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));

    }

    function levelSelectorClick(selectedElement) {
        if (!selectedElement) {
            $(".desktop-selector-dropdown-content").addClass("dis-none");
            return;
        }
        let data = {};
        data.shieldId = $("#bi_shield_element_r_type_desk_shield_dropdown_selected").attr("elementId");
        data.level = selectedElement.attr("elementId");
        $("#saveData").show();
        getElementGroups(data);
        $(".desktop-selector-dropdown-content").addClass("dis-none");
        $("#bi_shield_element_r_type_desk_level_dropdown_selected").html(selectedElement.html());
        if (selectedElement.attr("elementId") !== "0") {
            $("#bi_shield_element_r_type_desk_level_dropdown_selected").attr("title", selectedElement.html());
            $("#bi_shield_element_r_type_desk_level_dropdown_selected").html(selectedElement.html());
            $("#bi_shield_element_r_type_desk_level_dropdown_selected").parent().find(".levelIcon").removeClass("opacityDull");
        }
        else {
            $("#bi_shield_element_r_type_desk_level_dropdown_selected").attr("title", "");
            $("#bi_shield_element_r_type_desk_level_dropdown_selected").parent().find(".levelIcon").addClass("opacityDull");
            $("#bi_shield_element_r_type_desk_level_dropdown_selected").html("");
        }
        $("#bi_shield_element_r_type_desk_level_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));
        $("#bi_shield_element_r_type_desk_level_dropdown_selected").attr("elementTypeId", selectedElement.attr("elementTypeId"));

    }

    function groupSelectorClick(selectedElement) {
        if (!selectedElement) {
            $(".desktop-selector-dropdown-content").addClass("dis-none");
            return;
        }
        $("#saveData").show();
        $(".desktop-selector-dropdown-content").addClass("dis-none");
        if (selectedElement.attr("elementId") !== "0") {
            $("#bi_shield_element_r_type_desk_groups_dropdown_selected").attr("title", selectedElement.html());
            $("#bi_shield_element_r_type_desk_groups_dropdown_selected").html(selectedElement.html());
            $("#bi_shield_element_r_type_desk_groups_dropdown_selected").parent().find(".groupIcon").removeClass("opacityDull");
        }
        else {
            $("#bi_shield_element_r_type_desk_groups_dropdown_selected").attr("title", "");
            $("#bi_shield_element_r_type_desk_groups_dropdown_selected").parent().find(".groupIcon").addClass("opacityDull");
            $("#bi_shield_element_r_type_desk_groups_dropdown_selected").html("");
        }
        $("#bi_shield_element_r_type_desk_groups_dropdown_selected").attr("elementId", selectedElement.attr("elementId"));
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
        $("#bi_shield_element_r_type_desk_search_min_index_dropdown_selected").html(selectedElement.html());
        if ($("#bi_shield_element_r_type_desk_search_max_index_dropdown_selected").html() < selectedElement.html()) {
            $("#single_shield_element_r_type_desk_search_max_index_dropdown_selected").html(selectedElement.html());
        }
        $("#bi_shield_element_r_type_desk_search_min_index_dropdown_selected").closest(".desktop-selector-container").find(".search-keyword").keyup();
        renderMaxIndexDropDown();

    }

    function maxIndexSelectorClick(selectedElement) {
        if (!selectedElement) {
            $(".desktop-selector-dropdown-content").addClass("dis-none");
            return;
        }
        $(".desktop-selector-dropdown-content").addClass("dis-none");
        $("#bi_shield_element_r_type_desk_search_max_index_dropdown_selected").html(selectedElement.html());
        $("#bi_shield_element_r_type_desk_search_max_index_dropdown_selected").closest(".desktop-selector-container").find(".search-keyword").keyup();
    }

    function getSelectorForRulerTypeDesk() {
        $("#saveData").show();
        var desktopSelector = backing.biview.workspaces.bi_eval_workspace.desktops.shield_element_ruler_type_desktop.selector;
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
        return selectorObj;
    }

    function refreshFullDesktop() {
        var previousSelection = {};
        let activeDesktop = backing.biview.workspaces.bi_eval_workspace.desktops.shield_element_ruler_type_desktop;
        var desktop = $("#" + activeDesktop.anchor_div_id);
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
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("shield_element_ruler_type_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("shield_element_ruler_type_desktop", undefined, true);
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

     // added for drag and drop by Manish
    function addDragAndDrop() {
    }

    //added by Manish for drag and drop
    function saveDragAndDrop(){
    }

    shElemRulTypDesk.shieldSelectorClick = shieldSelectorClick;
    shElemRulTypDesk.levelSelectorClick = levelSelectorClick;
    shElemRulTypDesk.groupSelectorClick = groupSelectorClick;
    shElemRulTypDesk.getShieldsOfShieldType = getShieldsOfShieldType;
    shElemRulTypDesk.getDirectoryView = getDirectoryView;
    shElemRulTypDesk.getSelector = getSelectorForRulerTypeDesk;
    shElemRulTypDesk.getPerspectives = getPerspectives;
    shElemRulTypDesk.renderPerspectiveDropDownLi = renderPerspectiveDropDownLi;
    shElemRulTypDesk.searchObjectElementClick = searchObjectElementClick;
    shElemRulTypDesk.minIndexSelectorClick = minIndexSelectorClick;
    shElemRulTypDesk.maxIndexSelectorClick = maxIndexSelectorClick;
    shElemRulTypDesk.fullRefresh = refreshFullDesktop;
    shElemRulTypDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    shElemRulTypDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    shElemRulTypDesk.saveDragAndDrop = saveDragAndDrop;
    shElemRulTypDesk.addDragAndDrop = addDragAndDrop;
    return shElemRulTypDesk;
}