$(document).ready(function () {
    $(document).on("click", ".contentParamSearchObject_ElementTypeItem", function (e) {
        let ContentParameterDesktopUtil = new ContentParameterDesktopUtils();
        let dropDownId = "single_content_parameter_desk_search_dropdown_content";
        let selectedId = "single_content_parameter_desk_search_dropdown_selected";
        ContentParameterDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".contentParamCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_content_parameter_desk_custom_search_dropdown_content";
        let selectedId = "single_content_parameter_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".methodParamSearchObject_ElementTypeItem", function (e) {
        let MethodParameterDesktopUtil = new MethodParameterDesktopUtils();
        let dropDownId = "single_method_parameter_desk_search_dropdown_content";
        let selectedId = "single_method_parameter_desk_search_dropdown_selected";
        MethodParameterDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".methodParamCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_method_parameter_desk_custom_search_dropdown_content";
        let selectedId = "single_method_parameter_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".objParamSearchObject_ElementTypeItem", function (e) {
        let ObjectiveParameterDesktopUtil = new ObjectiveParameterDesktopUtils();
        let dropDownId = "single_objective_parameter_desk_search_dropdown_content";
        let selectedId = "single_objective_parameter_desk_search_dropdown_selected";
        ObjectiveParameterDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".objParamCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_objective_parameter_desk_custom_search_dropdown_content";
        let selectedId = "single_objective_parameter_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".subjectParamSearchObject_ElementTypeItem", function (e) {
        let SubjectParameterDesktopUtil = new SubjectParameterDesktopUtils();
        let dropDownId = "single_subject_parameter_desk_search_dropdown_content";
        let selectedId = "single_subject_parameter_desk_search_dropdown_selected";
        SubjectParameterDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".subjectParamCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "single_subject_parameter_desk_custom_search_dropdown_content";
        let selectedId = "single_subject_parameter_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biObjParamSearchObject_ElementTypeItem", function (e) {
        let ObjectiveParameterDesktopUtil = new BiViewObjectiveParameterDesktopUtils();
        let dropDownId = "bi_objective_parameter_desk_search_dropdown_content";
        let selectedId = "bi_objective_parameter_desk_search_dropdown_selected";
        ObjectiveParameterDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biObjParamCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_objective_parameter_desk_custom_search_dropdown_content";
        let selectedId = "bi_objective_parameter_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biContentParamSearchObject_ElementTypeItem", function (e) {
        let ContentParameterDesktopUtil = new BiViewContentParameterDesktopUtils();
        let dropDownId = "bi_content_parameter_desk_search_dropdown_content";
        let selectedId = "bi_content_parameter_desk_search_dropdown_selected";
        ContentParameterDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biContentParamCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_content_parameter_desk_custom_search_dropdown_content";
        let selectedId = "bi_content_parameter_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biMethodParamSearchObject_ElementTypeItem", function (e) {
        let MethodParameterDesktopUtil = new BiViewMethodParameterDesktopUtils();
        let dropDownId = "bi_method_parameter_desk_search_dropdown_content";
        let selectedId = "bi_method_parameter_desk_search_dropdown_selected";
        MethodParameterDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biMethodParamCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_method_parameter_desk_custom_search_dropdown_content";
        let selectedId = "bi_method_parameter_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biSubjectParamSearchObject_ElementTypeItem", function (e) {
        let SubjectParameterDesktopUtil = new BiViewSubjectParameterDesktopUtils();
        let dropDownId = "bi_subject_parameter_desk_search_dropdown_content";
        let selectedId = "bi_subject_parameter_desk_search_dropdown_selected";
        SubjectParameterDesktopUtil.searchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

    $(document).on("click", ".biSubjectParamCustomSearchObject_ElementTypeItem", function (e) {
        let dropDownId = "bi_subject_parameter_desk_custom_search_dropdown_content";
        let selectedId = "bi_subject_parameter_desk_custom_search_dropdown_selected";
        customSearchObjectElementClick($(this), selectedId, dropDownId);
        e.stopPropagation();
    });

});

const parameterUtil = new parameterUtils;

function parameterUtils() {
    function getDirectory(activeDesktop, view, classOfObjectTypeElementType, res) {
        modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
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
                renderObjectTypesAndElementTypesDropDown(objectTypesAndElementTypes, activeDesktop, classOfObjectTypeElementType);
            }
            let oldExpansionState = getExpansionStateOfElements(activeDesktop.tree_container_id);
            renderDirectoryView(res, directoryViewTreeId, view, "anchorView", false);
            // applyExpansionState(oldExpansionState, activeDesktop.tree_container_id);
            let ringViewDivId = backing.view_type.ring_view.name + "_" + activeDesktop.div_id;
            activeDesktop.elementIdAndObjectArray = null;
            if ($("#" + ringViewDivId).hasClass("active"))
                updateViewsStandards(ringViewDivId, res);
            refreshGroupRingViews(activeDesktop.opened_views);
            applyExpansionState(oldExpansionState, activeDesktop.tree_container_id);
            $("#saveData").hide();
        }
        else {
            alert("Error");
            $("#saveData").hide();

        }
    }

    function searchClick(activeDesktop, selectedElement, selectedId, dropDownId, classParam) {
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
        renderCustomSearchDropDown(selectedElement.attr("randomId"), activeDesktop, classParam);
    }

    return {getDirectory, searchClick};
}

function ContentParameterDesktopUtils() {
    let conParamDesk = new Object();

    function getDirectoryView() {
        $("#saveData").show();
        service.getContentParameterDv(null, function (res, err) {
            if (res) {
                let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.content_parameter_desktop;
                modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
                parameterUtil.getDirectory(activeDesktop, "singleview", "contentParamSearchObject_ElementTypeItem", res);
            }
            else if (err) {
                $("#saveData").hide();
                errorHandler(err);
            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.content_parameter_desktop;
        parameterUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "contentParamCustomSearchObject_ElementTypeItem");
    }

    function refreshFullDesktop() {
        getDirectoryView();
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("content_parameter_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("content_parameter_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    conParamDesk.getDirectoryView = getDirectoryView;
    conParamDesk.searchObjectElementClick = searchObjectElementClick;
    conParamDesk.fullRefresh = refreshFullDesktop;
    conParamDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    conParamDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    return conParamDesk;
}

function BiViewContentParameterDesktopUtils() {
    let conParamDesk = new Object();

    function getDirectoryView() {
        $("#saveData").show();
        service.getContentParameterDv(null, function (res, err) {
            if (res) {
                let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.content_parameter_desktop;
                modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
                parameterUtil.getDirectory(activeDesktop, "biview", "biContentParamSearchObject_ElementTypeItem", res);
            }
            else if (err) {
                $("#saveData").hide();
                errorHandler(err);
            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.content_parameter_desktop;
        parameterUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biContentParamCustomSearchObject_ElementTypeItem");
    }

    function refreshFullDesktop() {
        getDirectoryView();
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("content_parameter_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("content_parameter_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    conParamDesk.getDirectoryView = getDirectoryView;
    conParamDesk.searchObjectElementClick = searchObjectElementClick;
    conParamDesk.fullRefresh = refreshFullDesktop;
    conParamDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    conParamDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    return conParamDesk;
}

function MethodParameterDesktopUtils() {
    let methParamDesk = new Object();

    function getDirectoryView() {
        $("#saveData").show();
        service.getMethodParameterDv(null, function (res, err) {
            if (res) {
                let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.method_parameter_desktop;
                modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
                parameterUtil.getDirectory(activeDesktop, "singleview", "methodParamSearchObject_ElementTypeItem", res);
            }
            else if (err) {
                $("#saveData").hide();
                errorHandler(err);
            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.method_parameter_desktop;
        parameterUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "methodParamCustomSearchObject_ElementTypeItem");
    }

    function refreshFullDesktop() {
        getDirectoryView();
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("method_parameter_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("method_parameter_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    methParamDesk.getDirectoryView = getDirectoryView;
    methParamDesk.searchObjectElementClick = searchObjectElementClick;
    methParamDesk.fullRefresh = refreshFullDesktop;
    methParamDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    methParamDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    return methParamDesk;
}

function BiViewMethodParameterDesktopUtils() {
    let methParamDesk = new Object();

    function getDirectoryView() {
        $("#saveData").show();
        service.getMethodParameterDv(null, function (res, err) {
            if (res) {
                let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.method_parameter_desktop;
                modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
                parameterUtil.getDirectory(activeDesktop, "biview", "biMethodParamSearchObject_ElementTypeItem", res);
            }
            else if (err) {
                $("#saveData").hide();
                errorHandler(err);
            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.method_parameter_desktop;
        parameterUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biMethodParamCustomSearchObject_ElementTypeItem");
    }

    function refreshFullDesktop() {
        getDirectoryView();
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("method_parameter_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("method_parameter_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    methParamDesk.getDirectoryView = getDirectoryView;
    methParamDesk.searchObjectElementClick = searchObjectElementClick;
    methParamDesk.fullRefresh = refreshFullDesktop;
    methParamDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    methParamDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    return methParamDesk;
}

function ObjectiveParameterDesktopUtils() {
    let objParamDesk = new Object();

    function getDirectoryView() {
        $("#saveData").show();
        service.getObjectiveParameterDv(null, function (res, err) {
            if (res) {
                let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.objective_parameter_desktop;
                modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
                parameterUtil.getDirectory(activeDesktop, "singleview", "objParamSearchObject_ElementTypeItem", res);
            }
            else if (err) {
                $("#saveData").hide();
                errorHandler(err);
            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.objective_parameter_desktop;
        parameterUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "objParamCustomSearchObject_ElementTypeItem");
    }

    function refreshFullDesktop() {
        getDirectoryView();
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("objective_parameter_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("objective_parameter_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    objParamDesk.getDirectoryView = getDirectoryView;
    objParamDesk.searchObjectElementClick = searchObjectElementClick;
    objParamDesk.fullRefresh = refreshFullDesktop;
    objParamDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    objParamDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    return objParamDesk;
}

function BiViewObjectiveParameterDesktopUtils() {
    let objParamDesk = new Object();

    function getDirectoryView() {
        $("#saveData").show();
        service.getObjectiveParameterDv(null, function (res, err) {
            if (res) {
                let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.objective_parameter_desktop;
                modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
                parameterUtil.getDirectory(activeDesktop, "biview", "biObjParamSearchObject_ElementTypeItem", res);
            }
            else if (err) {
                $("#saveData").hide();
                errorHandler(err);
            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.objective_parameter_desktop;
        parameterUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biObjParamCustomSearchObject_ElementTypeItem");
    }

    function refreshFullDesktop() {
        getDirectoryView();
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("objective_parameter_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("objective_parameter_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    objParamDesk.getDirectoryView = getDirectoryView;
    objParamDesk.searchObjectElementClick = searchObjectElementClick;
    objParamDesk.fullRefresh = refreshFullDesktop;
    objParamDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    objParamDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    return objParamDesk;
}

function SubjectParameterDesktopUtils() {
    let subParamDesk = new Object();

    function getDirectoryView() {
        $("#saveData").show();
        service.getSubjectParameterDv(null, function (res, err) {
            if (res) {
                let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.subject_parameter_desktop;
                modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
                parameterUtil.getDirectory(activeDesktop, "singleview", "subjectParamSearchObject_ElementTypeItem", res);
            }
            else if (err) {
                $("#saveData").hide();
                errorHandler(err);
            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.subject_parameter_desktop;
        parameterUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "subjectParamCustomSearchObject_ElementTypeItem");
    }

    function refreshFullDesktop() {
        getDirectoryView();
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("subject_parameter_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("subject_parameter_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    subParamDesk.getDirectoryView = getDirectoryView;
    subParamDesk.searchObjectElementClick = searchObjectElementClick;
    subParamDesk.fullRefresh = refreshFullDesktop;
    subParamDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    subParamDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;

    return subParamDesk;
}

function BiViewSubjectParameterDesktopUtils() {
    let subParamDesk = new Object();

    function getDirectoryView() {
        $("#saveData").show();
        service.getSubjectParameterDv(null, function (res, err) {
            if (res) {
                let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.subject_parameter_desktop;
                modifyContainerHeight($("#" + activeDesktop.anchor_div_id));
                parameterUtil.getDirectory(activeDesktop, "biview", "biSubjectParamSearchObject_ElementTypeItem", res);
            }
            else if (err) {
                $("#saveData").hide();
                errorHandler(err);
            }
        });
    }

    function searchObjectElementClick(selectedElement, selectedId, dropDownId) {
        let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.subject_parameter_desktop;
        parameterUtil.searchClick(activeDesktop, selectedElement, selectedId, dropDownId, "biSubjectParamCustomSearchObject_ElementTypeItem");
    }

    function refreshFullDesktop() {
        getDirectoryView();
    }

    function areThereAnyEventsThatTriggerFullRefresh(events) {
        let eventTypes_fullRefresh = desktopsFullRefreshEvents("subject_parameter_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_fullRefresh, events);
    }

    function areThereAnyEventsThatTriggerSoftRefresh(events) {
        let eventTypes_softRefresh = desktopsSoftRefreshEvents("subject_parameter_desktop");
        return areThereAnyEventsThatTrigger(eventTypes_softRefresh, events);
    }

    subParamDesk.getDirectoryView = getDirectoryView;
    subParamDesk.searchObjectElementClick = searchObjectElementClick;
    subParamDesk.fullRefresh = refreshFullDesktop;
    subParamDesk.areThereAnyEventsThatTriggerFullRefresh = areThereAnyEventsThatTriggerFullRefresh;
    subParamDesk.areThereAnyEventsThatTriggerSoftRefresh = areThereAnyEventsThatTriggerSoftRefresh;
    return subParamDesk;
}