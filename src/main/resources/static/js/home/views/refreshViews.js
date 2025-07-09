$(document).ready(function () {
    $(document).on("click", ".refreshButton", function (e) {
        $("#saveData").show();
        let src_id = $(this).closest(".innerDesktop").attr("id");
        let openedView = getOpenedViewObjectForGivenViewIdInBiView(src_id);
        let isBiviewSide = true;
        if (openedView === null) {
            openedView = getOpenedViewObjectForGivenViewIdInSingleView(src_id);
            isBiviewSide = false;
            if (openedView === null)
                return;
        }
        let viewType = openedView.view_type;
        refreshViewOfGivenId(viewType, src_id, isBiviewSide, true);
        e.stopPropagation();

    });

    $(document).on("click", ".refreshAnchorButton", function (e) {
        let isBiview = !($(this).closest(".desktop").hasClass("single-desktop"));
        let activeDesktop = getActiveDesktop(isBiview);
        activeDesktop.utilsFunction.fullRefresh();
        e.stopPropagation();
    });
});

function refreshAllOpenedViews(activeDesktop) {
    if (activeDesktop.opened_views && activeDesktop.opened_views.length > 0) {
        for (let j = 0; j < activeDesktop.opened_views.length; j++) {
            let openedView = activeDesktop.opened_views[j];
            if (!$("#" + openedView.div_id).hasClass("dis-none")) {
                let viewType = openedView.view_type;
                if (viewType) {
                    if (backing.view_type[viewType]) {
                        backing.view_type[viewType].eventHandler("event", openedView.div_id, false);
                        activeDesktop.opened_views[j].events_in_queue = [];
                    }
                }
            }
        }
    }
}

function eventHandlerUtilsFunction(activeDesktop, events) {
    let desktopUtilsFunction = activeDesktop.utilsFunction;
    let isFullRefresh = desktopUtilsFunction.areThereAnyEventsThatTriggerFullRefresh(events);
    if (isFullRefresh) {
        desktopUtilsFunction.fullRefresh();
    }
    else {
        let isSoftRefresh = desktopUtilsFunction.areThereAnyEventsThatTriggerSoftRefresh(events);
        if (isSoftRefresh) {
            desktopUtilsFunction.getDirectoryView();
        }
    }
}

function eventHandlerUtilsFunctionSchema(activeDesktop, events) {
    let desktopUtilsFunction = activeDesktop.utilsFunction;
    let isFullRefresh = desktopUtilsFunction.areThereAnyEventsThatTriggerFullRefresh(events);
    if (isFullRefresh) {
        desktopUtilsFunction.fullRefresh();
    }
    else {
        let isSoftRefresh = desktopUtilsFunction.areThereAnyEventsThatTriggerSoftRefresh(events);
        if (isSoftRefresh) {
            let obj = desktopUtilsFunction.getSelector();
            desktopUtilsFunction.getElementTypeList(obj.shieldId);
            desktopUtilsFunction.getDirectoryView();
        }
    }
}

function shield_schema_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["cla_workspace"].desktops["shield_schema_desktop"];
    eventHandlerUtilsFunctionSchema(activeDesktop, events);
}

function classification_map_mode_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["cla_workspace"].desktops["classification_map_mode_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function standard_schema_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["std_workspace"].desktops["standard_schema_desktop"];
    eventHandlerUtilsFunctionSchema(activeDesktop, events);
}

function threat_schema_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["threat_workspace"].desktops["threat_schema_desktop"];
    eventHandlerUtilsFunctionSchema(activeDesktop, events);
}

function standard_map_mode_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["std_workspace"].desktops["standard_map_mode_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function threat_map_mode_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["threat_workspace"].desktops["threat_map_mode_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function business_schema_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["business_workspace"].desktops["business_schema_desktop"];
    eventHandlerUtilsFunctionSchema(activeDesktop, events);
}

function business_map_mode_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["business_workspace"].desktops["business_map_mode_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function ruler_type_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["eval_workspace"].desktops["ruler_type_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function shield_element_ruler_type_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["eval_workspace"].desktops["shield_element_ruler_type_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function asset_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["cla_workspace"].desktops["asset_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function asset_map_mode_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["cla_workspace"].desktops["asset_map_mode_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function asset_type_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["cla_workspace"].desktops["asset_type_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function asset_type_map_mode_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["cla_workspace"].desktops["asset_type_map_mode_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function provider_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["cla_workspace"].desktops["provider_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function business_asset_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["business_workspace"].desktops["business_asset_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function business_asset_map_mode_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["business_workspace"].desktops["business_asset_map_mode_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function business_asset_type_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["business_workspace"].desktops["business_asset_type_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function business_asset_type_map_mode_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["business_workspace"].desktops["business_asset_type_map_mode_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function business_provider_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["business_workspace"].desktops["business_provider_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function expression_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["expression_workspace"].desktops["expression_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function anz_expression_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces.expression_workspace.desktops.anz_expression_desktop;
    eventHandlerUtilsFunction(activeDesktop, events);

}

function objective_parameter_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["expression_workspace"].desktops["objective_parameter_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);

}

function method_parameter_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["expression_workspace"].desktops["method_parameter_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function content_parameter_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["expression_workspace"].desktops["content_parameter_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function subject_parameter_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["expression_workspace"].desktops["subject_parameter_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function organisational_unit_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["administration_workspace"].desktops["organisational_unit_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function users_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["administration_workspace"].desktops["users_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function roles_desktop_event_handler_singleview(events) {
    let activeDesktop = backing.singleview.workspaces["administration_workspace"].desktops["roles_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function shield_schema_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_cla_workspace"].desktops["shield_schema_desktop"];
    eventHandlerUtilsFunctionSchema(activeDesktop, events);
}

function classification_map_mode_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_cla_workspace"].desktops["classification_map_mode_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function standard_schema_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_std_workspace"].desktops["standard_schema_desktop"];
    eventHandlerUtilsFunctionSchema(activeDesktop, events);
}

function threat_schema_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_threat_workspace"].desktops["threat_schema_desktop"];
    eventHandlerUtilsFunctionSchema(activeDesktop, events);
}

function standard_map_mode_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_std_workspace"].desktops["standard_map_mode_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function threat_map_mode_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_threat_workspace"].desktops["threat_map_mode_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function business_schema_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_business_workspace"].desktops["business_schema_desktop"];
    eventHandlerUtilsFunctionSchema(activeDesktop, events);
}

function business_map_mode_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_business_workspace"].desktops["business_map_mode_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function ruler_type_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_eval_workspace"].desktops["ruler_type_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function shield_element_ruler_type_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_eval_workspace"].desktops["shield_element_ruler_type_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function asset_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_cla_workspace"].desktops["asset_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function asset_map_mode_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_cla_workspace"].desktops["asset_map_mode_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function asset_type_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_cla_workspace"].desktops["asset_type_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function asset_type_map_mode_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_cla_workspace"].desktops["asset_type_map_mode_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function provider_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_cla_workspace"].desktops["provider_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function business_asset_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_business_workspace"].desktops["business_asset_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function business_asset_map_mode_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_business_workspace"].desktops["business_asset_map_mode_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function business_asset_type_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_business_workspace"].desktops["business_asset_type_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function business_asset_type_map_mode_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_business_workspace"].desktops["business_asset_type_map_mode_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function business_provider_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_business_workspace"].desktops["business_provider_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function expression_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_expression_workspace"].desktops["expression_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function anz_expression_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces.bi_expression_workspace.desktops.anz_expression_desktop;
    eventHandlerUtilsFunction(activeDesktop, events);
}

function objective_parameter_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_expression_workspace"].desktops["objective_parameter_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function method_parameter_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_expression_workspace"].desktops["method_parameter_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function content_parameter_desktop_event_handler_biview(events) {

    let activeDesktop = backing.biview.workspaces["bi_expression_workspace"].desktops["content_parameter_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function subject_parameter_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_expression_workspace"].desktops["subject_parameter_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function organisational_unit_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_administration_workspace"].desktops["organisational_unit_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function users_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_administration_workspace"].desktops["users_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function roles_desktop_event_handler_biview(events) {
    let activeDesktop = backing.biview.workspaces["bi_administration_workspace"].desktops["roles_desktop"];
    eventHandlerUtilsFunction(activeDesktop, events);
}

function evaluationview_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("evaluationview", divId, isBiviewSide);
}

function dataview_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("dataview", divId, isBiviewSide)
}

function create_shield_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("create_shield_element_view", divId, isBiviewSide)
}

function create_asset_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("create_asset_element_view", divId, isBiviewSide)
}

function create_asset_type_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("create_asset_type_element_view", divId, isBiviewSide)
}

function create_objective_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("create_objective_element_view", divId, isBiviewSide)
}

function create_method_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("create_method_element_view", divId, isBiviewSide)
}

function create_subject_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("create_subject_element_view", divId, isBiviewSide)
}

function create_content_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("create_content_element_view", divId, isBiviewSide)
}

function create_provider_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("create_provider_element_view", divId, isBiviewSide)
}

function create_organizationalunit_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("create_organizationalunit_element_view", divId, isBiviewSide)
}

function edit_shield_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("edit_shield_element_view", divId, isBiviewSide)
}

function edit_asset_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("edit_asset_element_view", divId, isBiviewSide)
}

function edit_asset_type_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("edit_asset_type_element_view", divId, isBiviewSide)
}

function edit_provider_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("edit_provider_element_view", divId, isBiviewSide)
}

function edit_organizationalunit_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("edit_organizationalunit_element_view", divId, isBiviewSide)
}

function edit_subject_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("edit_subject_element_view", divId, isBiviewSide)
}

function edit_objective_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("edit_objective_element_view", divId, isBiviewSide)
}

function edit_method_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("edit_method_element_view", divId, isBiviewSide)
}

function edit_content_element_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("edit_content_element_view", divId, isBiviewSide)
}

function expressionview_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("expressionview", divId, isBiviewSide)
}

function association_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("association_view", divId, isBiviewSide)
}

function protection_association_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("protection_association_view", divId, isBiviewSide)
}

function pivot_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("pivot_view", divId, isBiviewSide)
}

function asset_association_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("asset_association_view", divId, isBiviewSide)
}

function create_expression_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("create_expression_view", divId, isBiviewSide)
}

function edit_expression_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("edit_expression_view", divId, isBiviewSide)
}

function asset_attribute_library_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("asset_attribute_library_view", divId, isBiviewSide)
}

function shield_attribute_library_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("shield_attribute_library_view", divId, isBiviewSide)
}

function ring_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("ring_view", divId, isBiviewSide)
}

function group_ring_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("group_ring_view", divId, isBiviewSide)
}

function create_group_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("create_groups", divId, isBiviewSide)
}

function edit_group_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("edit_groups", divId, isBiviewSide)
}

function modify_expression_asset_association_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("exp_asset_association_view", divId, isBiviewSide)
}

function modify_expression_asset_type_association_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("exp_assetType_association_view", divId, isBiviewSide)
}

function modify_expression_shield_association_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("exp_shield_association_view", divId, isBiviewSide)
}

function modify_expression_standard_association_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("exp_standard_association_view", divId, isBiviewSide)
}

function modify_expression_threat_association_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("exp_threat_association_view", divId, isBiviewSide)
}

function create_artifact_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("create_artifact_view", divId, isBiviewSide)
}

function modify_artifact_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("edit_artifact_view", divId, isBiviewSide)
}

function direct_shield_association_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("direct_shield_association_view", divId, isBiviewSide)
}

function direct_asset_association_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("direct_asset_association_view", divId, isBiviewSide)
}

function direct_asset_element_association_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("direct_asset_element_association_view", divId, isBiviewSide)
}

function direct_asset_type_association_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("direct_asset_type_association_view", divId, isBiviewSide)
}

function direct_asset_type_element_association_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("direct_asset_type_element_association_view", divId, isBiviewSide)
}

function create_user_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("create_user_view", divId, isBiviewSide)
}

function create_role_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("create_role_view", divId, isBiviewSide)
}

function edit_user_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("edit_user_view", divId, isBiviewSide)
}

function edit_role_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("edit_role_view", divId, isBiviewSide)
}

function permission_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("permission_view", divId, isBiviewSide)
}

function projection_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("projection_view", divId, isBiviewSide)
}

function guidance_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("guidance_view", divId, isBiviewSide)
}

function test_procedure_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("test_procedure_view", divId, isBiviewSide)
}

function source_view_event_handler(event, divId, isBiviewSide) {
    refreshViewOfGivenId("source_view", divId, isBiviewSide)
}

function appendToAllEventQueues(event) {
    function appendToWorkspacesGivenKeyValuePairs(workspaceKeyValuePairs) {
        let keysOfWrokspaces = Object.keys(workspaceKeyValuePairs);
        for (let i = 0; i < keysOfWrokspaces.length; i++) {
            let workspace = workspaceKeyValuePairs[keysOfWrokspaces[i]];
            let desktopsKeyValuePairs = workspace.desktops;
            let desktopKeys = Object.keys(desktopsKeyValuePairs);
            for (let j = 0; j < desktopKeys.length; j++) {
                let desktop = desktopsKeyValuePairs[desktopKeys[j]];
                if (desktop.isOpened === true) {
                    desktop.events_in_queue.push(event);
                    if (desktop.opened_views) {
                        for (let k = 0; k < desktop.opened_views.length; k++) {
                            desktop.opened_views[k].events_in_queue.push(event);
                        }
                    }
                }
            }
        }
    }

    if (event) {
        appendToWorkspacesGivenKeyValuePairs(backing.singleview.workspaces);
        appendToWorkspacesGivenKeyValuePairs(backing.biview.workspaces);
    }
}

function getOpenedViewObjectForGivenViewIdInSingleView(viewId) {
    let keysOfWrokspaces = Object.keys(backing.singleview.workspaces);
    for (let i = 0; i < keysOfWrokspaces.length; i++) {
        let workspace = backing.singleview.workspaces[keysOfWrokspaces[i]];
        let desktopsKeyValuePairs = workspace.desktops;
        let desktopKeys = Object.keys(desktopsKeyValuePairs);
        for (let j = 0; j < desktopKeys.length; j++) {
            let desktop = desktopsKeyValuePairs[desktopKeys[j]];

            if (desktop.opened_views) {
                for (let k = 0; k < desktop.opened_views.length; k++) {
                    if (desktop.opened_views[k].div_id === viewId)
                        return desktop.opened_views[k];
                }
            }
        }
    }
    return null;
}

function getOpenedViewObjectForGivenViewIdInBiView(viewId) {
    let keysOfWrokspaces = Object.keys(backing.biview.workspaces);
    for (let i = 0; i < keysOfWrokspaces.length; i++) {
        let workspace = backing.biview.workspaces[keysOfWrokspaces[i]];
        let desktopsKeyValuePairs = workspace.desktops;
        let desktopKeys = Object.keys(desktopsKeyValuePairs);
        for (let j = 0; j < desktopKeys.length; j++) {
            let desktop = desktopsKeyValuePairs[desktopKeys[j]];

            if (desktop.opened_views) {
                for (let k = 0; k < desktop.opened_views.length; k++) {
                    if (desktop.opened_views[k].div_id === viewId)
                        return desktop.opened_views[k];
                }
            }
        }
    }
    return null;
}

function applyEventsToActiveScreens() {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
    if (backing.is_bi_view_active) {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        if (activeDesktop.events_in_queue && activeDesktop.events_in_queue.length !== 0) {
            activeDesktop.eventHandler(activeDesktop.events_in_queue);
            activeDesktop.events_in_queue = [];
        }
        for (let j = 0; j < activeDesktop.opened_views.length; j++) {
            let openedView = activeDesktop.opened_views[j];
            if (!$("#" + openedView.div_id).hasClass("dis-none")) {
                let viewType = openedView.view_type;
                if (viewType) {
                    if (backing.view_type[viewType]) {
                        if (openedView.events_in_queue && openedView.events_in_queue.length !== 0)
                            backing.view_type[viewType].eventHandler(openedView.events_in_queue, openedView.div_id, true);
                        activeDesktop.opened_views[j].events_in_queue = [];
                    }
                }
            }
        }
    }
    activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
    activeDesktopKeyname = backing.singleview.active_desktop.keyname;
    activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
    if (activeDesktop.events_in_queue) {
        activeDesktop.eventHandler(activeDesktop.events_in_queue);
        activeDesktop.events_in_queue = [];
    }
    for (let j = 0; j < activeDesktop.opened_views.length; j++) {
        let openedView = activeDesktop.opened_views[j];
        if (!$("#" + openedView.div_id).hasClass("dis-none")) {
            let viewType = openedView.view_type;
            if (viewType) {
                if (backing.view_type[viewType]) {
                    if (openedView.events_in_queue && openedView.events_in_queue.length !== 0) {
                        backing.view_type[viewType].eventHandler(openedView.events_in_queue, openedView.div_id, false);
                    }
                    activeDesktop.opened_views[j].events_in_queue = [];
                }
            }
        }
    }
}

function evaluationRefresh(element, isBiviewSide, viewObject, uniqueId) {
    let data = {};
    let obj = {};
    let activeDesktop = getActiveDesktop(isBiviewSide),
        view = getSingleOrBiView(isBiviewSide),
        desktopKeyname = getDesktopName(isBiviewSide);
    if (element && element[ATTR.linkId]) {
        obj.linkId = element[ATTR.linkId];
        obj.linkType = element[ATTR.linkType];
        data.assetDeliversLinkId = element.linkId;

    }
    else {
        data.shieldElementId = element.elementId;
    }
    data.perspectiveIds = activeDesktop.perspectivesSelected;
    let div_id = viewObject.div_id;
    $("#" + viewObject.div_id).remove();
    $("#saveData").show();
    if (desktopKeyname === "ruler_type_desktop") {
        console.log("get asset delivers rating  calling");
        let callbackfn = function (res, err) {
            if (res) {
                console.log("get asset delivers rating" + JSON.stringify(res));
                service.getElementInfoByLinkId(obj, function (res2, err) {
                    if (res2) {
                        renderEvaluationView(div_id, res, view, res2, uniqueId, "Evaluation View");
                        $("#saveData").hide();
                    }
                    else if (err) {
                        errorHandler(err);
                        $("#saveData").hide();
                    }
                });
            }
            else if (err) {
                errorHandler(err);
                $("#saveData").hide();
            }
        };
        if(!backing.isDirectMode)
            service.getAssetDeliversAttributesRating(data, callbackfn);
        else {
            data.assetImplementsLinkId = data.assetDeliversLinkId;
            service.getAssetImplementsAttributesRating(data, callbackfn);
        }
    }
    else if (desktopKeyname === "shield_element_ruler_type_desktop") {
        service.getShieldElementAttributesAndRating(data, function (res, err) {
            if (res) {
                renderShieldElementEvaluationView(div_id, res, view, element, uniqueId, "Evaluation View");
                $("#saveData").hide();
            }
            else if (err) {
                errorHandler(err);
                $("#saveData").hide();
            }
        });
    }
    return view;
}

function refreshViewOfGivenId(viewType, divId, isBiview, onRefreshButtonClick = false) {
    let view, objectTypeIcon;
    let viewObject = {"div_id": divId};
    let divIdWrapper = $("#" + viewObject.div_id);
    let uniqueId = divIdWrapper.attr("uniqueid");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];

    if (element) {
        objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    }
    let activeDesktop = getActiveDesktop(isBiview);
    view = getSingleOrBiView(isBiview);
    switch (viewType) {
        case backing.view_type.dataview.key: {
            let ratingDataView = divIdWrapper.closest(".innerDesktop").attr("ratingDataView");
            let data = {};
            if (ratingDataView === "true") {
                objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true, ratingDataView);
                data.elementId = element[ATTR.ratingId];
                data.objectType = element[ATTR.ratingObjectType];
            }
            else {
                data.elementId = element[ATTR.elementId];
                data.objectType = element[ATTR.objectType];
            }
            let obj = {};
            obj.elementId = element[ATTR.elementId];
            obj.objectType = element[ATTR.objectType];
            service.getSingleDataView(data, function (res, err) {
                if (res) {
                    function callback(elementRes) {
                        elementRes.uniqueId = uniqueId;
                        if (res[ATTR.children]) {
                            let expanded = divIdWrapper.find(".ResizingIcon.expandView").hasClass("dis-none");
                            divIdWrapper.remove();
                            generateUniqueIdAndParentLink(res, "dataView", null);
                            renderDataView(view, res, viewObject.div_id, elementRes, ratingDataView);
                            renderDirectoryViewDataView(view, res[ATTR.children], viewObject.div_id);
                            if (expanded)
                                $("#" + viewObject.div_id).find(".expandView").trigger("click");
                            backing.view_type.dataview.eventCalled = false;
                            $("#saveData").hide();
                        }
                    }

                    serviceFunctions.getElementInfo(callback, obj);
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.expressionview.key: {
            let data = element[ATTR.elementId];
            let obj = {};
            obj.elementId = element[ATTR.elementId];
            obj.objectType = element[ATTR.objectType];
            service.getExpressionView(data, function (res, err) {
                if (res) {
                    service.getElementInfo(obj, function (res2, err) {
                        if (res2) {
                            generateUniqueIdAndParentLink(res2, "expressionView", null);
                            let str = getContentOfExpressionView(res, viewObject.div_id, res2, isBiview);
                            divIdWrapper.html(str);
                            $("#saveData").hide();
                        }
                        else if (err) {
                            $("#saveData").hide();
                            errorHandler(err);
                        }
                    });
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.association_view.key: {
            let data = {}, obj = {};
            data.elementId = element[ATTR.elementId];
            obj.elementId = element[ATTR.elementId];
            obj.objectType = element[ATTR.objectType];
            let checkElementArray = {};
            $("#" + viewObject.div_id + " .selectToMap").each(function () {
                if ($(this).hasClass("flaticon-arrow")) {
                    checkElementArray[$(this).attr("id")] = "flaticon-arrow";
                }
                else if ($(this).hasClass("flaticon-unlink"))
                    checkElementArray[$(this).attr("id")] = "flaticon-unlink";
            });
            let index = getIndexOfOpenedViewFromPassedOpenedViews(viewObject.div_id, activeDesktop.opened_views);
            service.getAssociationView(data, function (orgRes, err) {
                if (orgRes) {
                    let res = appendingAsChildobject(element, orgRes);
                    generateUniqueIdAndParentLink(res, "associationView", null);
                    if (!divIdWrapper.find(".sortAssociation").hasClass("unSortAss"))
                        sortChildrenAlphbetically(res);
                    activeDesktop.opened_views[index].associationRes = res;
                    service.getElementInfo(obj, function (ElemInfores, err) {
                        if (ElemInfores) {
                            divIdWrapper.find(".desktop-selector-container .iconWrapper").html(objectTypeIcon);
                            divIdWrapper.find(".desktop-selector-container .typeIcon").html(getViewHeaderName(ElemInfores).toUpperCase());
                            divIdWrapper.find(".desktop-selector-container .typeIcon").attr("title", getViewHeaderName(ElemInfores).toUpperCase());
                        }
                        else if (err) {
                            $("#saveData").hide();
                            errorHandler(err);
                        }
                    });
                    if (res[ATTR.children])
                        if ($("#" + viewObject.div_id + " .assocExpand").hasClass("active")) {
                            renderDirectoryViewForAssociationView(res, viewObject.div_id, view, true);
                        }
                        else if ($("#" + viewObject.div_id + " .assocShort").hasClass("active")) {
                            renderDirectoryViewForAssociationView(res, viewObject.div_id, view, false);
                        }
                    let checkKeys = Object.keys(checkElementArray);
                    for (let i = 0; i <= checkKeys.length; i++) {
                        if (divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").hasClass(checkElementArray[checkKeys[i]]))
                            divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectToMap " + checkElementArray[checkKeys[i]]);
                        else
                            divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectToMap iconShadow " + checkElementArray[checkKeys[i]]);
                    }
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.protection_association_view.key: {
            let data = {}, obj = {};
            data.assetTypeId = element[ATTR.elementId];
            obj.elementId = element[ATTR.elementId];
            obj.objectType = element[ATTR.objectType];
            let checkElementArray = {};
            $("#" + viewObject.div_id + " .selectToAssociationMap").each(function () {
                if ($(this).hasClass("flaticon-arrow") && $(this).hasClass("partialSelection"))
                    checkElementArray[$(this).attr("id")] = "partialSelection";
                else if ($(this).hasClass("flaticon-arrow"))
                    checkElementArray[$(this).attr("id")] = "flaticon-arrow";
                else if ($(this).hasClass("flaticon-unlink"))
                    checkElementArray[$(this).attr("id")] = "flaticon-unlink";
            });
            let renderFunction = ($("#" + viewObject.div_id).attr("isBusiness") === "true") ? service.getProtectedByAssociationsForBusinessAssetType : service.getProtectedByAssociationsForAssetType;
            renderFunction(data, function (orgRes, err) {
                if (orgRes) {
                    let res = appendingAsChildobject(element, orgRes);
                    generateUniqueIdAndParentLink(res, "associationView", null);
                    if (!divIdWrapper.find(".sortProtectionAssociation").hasClass("unSortAss"))
                        sortChildrenAlphbetically(res);
                    let index = getIndexOfOpenedViewFromPassedOpenedViews(viewObject.div_id, activeDesktop.opened_views);
                    activeDesktop.opened_views[index].associationRes = res;
                    service.getElementInfo(obj, function (elemInfoRes, err) {
                        if (elemInfoRes) {
                            divIdWrapper.find(".desktop-selector-container .iconWrapper").html(objectTypeIcon);
                            divIdWrapper.find(".desktop-selector-container .typeIcon").html(getViewHeaderName(elemInfoRes).toUpperCase());
                            divIdWrapper.find(".desktop-selector-container .typeIcon").attr("title", getViewHeaderName(elemInfoRes).toUpperCase());
                        }
                        else if (err) {
                            errorHandler(err);
                        }
                    });
                    if (res[ATTR.children])
                        if ($("#" + viewObject.div_id + " .protectionAssocExpand").hasClass("active")) {
                            renderDirectoryViewForProtectionAssociationView(res, viewObject.div_id, view, true);
                        }
                        else if ($("#" + viewObject.div_id + " .protectionAssocShort").hasClass("active")) {
                            renderDirectoryViewForProtectionAssociationView(res, viewObject.div_id, view, false);
                        }
                    let checkKeys = Object.keys(checkElementArray);
                    for (let i = 0; i <= checkKeys.length; i++) {
                        if (divIdWrapper.find("#" + checkKeys[i]).hasClass(checkElementArray[checkKeys[i]]))
                            divIdWrapper.find("#" + checkKeys[i]).attr("class", "checkbox-map selectToAssociationMap " + checkElementArray[checkKeys[i]]);
                        else
                            divIdWrapper.find("#" + checkKeys[i]).attr("class", "checkbox-map selectToAssociationMap iconShadow " + checkElementArray[checkKeys[i]]);
                        if (checkElementArray[checkKeys[i]] === "partialSelection")
                            id.find("#" + checkKeys[i]).addClass("flaticon-arrow");
                    }
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.asset_association_view.key: {
            let data = {}, obj = {};
            let checkElementArray = {};
            data.assetId = element[ATTR.elementId];
            obj.elementId = element[ATTR.elementId];
            obj.objectType = element[ATTR.objectType];
            $("#" + viewObject.div_id + " .selectToAssetAssociationMap").each(function () {
                if ($(this).hasClass("flaticon-arrow") && $(this).hasClass("partialSelection"))
                    checkElementArray[$(this).attr("id")] = "partialSelection";
                else if ($(this).hasClass("flaticon-arrow"))
                    checkElementArray[$(this).attr("id")] = "flaticon-arrow";
                else if ($(this).hasClass("flaticon-unlink"))
                    checkElementArray[$(this).attr("id")] = "flaticon-unlink";
            });
            let renderFunction = ($("#" + viewObject.div_id).attr("isBusiness") === "true") ? service.getDeliversAssociationsForBusinessAsset : service.getDeliversAssociationsForAsset;
            renderFunction(data, function (orgRes, err) {
                if (orgRes) {
                    let res = appendingAsChildobject(element, orgRes);
                    generateUniqueIdAndParentLink(res, "associationView", null);
                    if (!divIdWrapper.find(".sortAssetAssociation").hasClass("unSortAss"))
                        sortChildrenAlphbetically(res);
                    let index = getIndexOfOpenedViewFromPassedOpenedViews(viewObject.div_id, activeDesktop.opened_views);
                    activeDesktop.opened_views[index].associationRes = res;
                    service.getElementInfo(obj, function (elemInfoRes, err) {
                        if (elemInfoRes) {
                            divIdWrapper.find(".desktop-selector-container .iconWrapper").html(objectTypeIcon);
                            divIdWrapper.find(".desktop-selector-container .typeIcon").html(getViewHeaderName(elemInfoRes).toUpperCase());
                            divIdWrapper.find(".desktop-selector-container .typeIcon").attr("title", getViewHeaderName(elemInfoRes).toUpperCase());
                        }
                        else if (err) {
                            $("#saveData").hide();
                            errorHandler(err);
                        }
                    });
                    if (res[ATTR.children])
                        if ($("#" + viewObject.div_id + " .assetAssocExpand").hasClass("active")) {
                            renderDirectoryViewForAssetAssociationView(res, viewObject.div_id, view, true);
                        }
                        else if ($("#" + viewObject.div_id + " .assetAssocShort").hasClass("active")) {
                            renderDirectoryViewForAssetAssociationView(res, viewObject.div_id, view, false);
                        }
                    let checkKeys = Object.keys(checkElementArray);
                    for (let i = 0; i <= checkKeys.length; i++) {
                        if (divIdWrapper.find("#" + checkKeys[i]).hasClass(checkElementArray[checkKeys[i]]))
                            divIdWrapper.find("#" + checkKeys[i]).attr("class", "checkbox-map selectToAssetAssociationMap " + checkElementArray[checkKeys[i]]);
                        else
                            divIdWrapper.find("#" + checkKeys[i]).attr("class", "checkbox-map selectToAssetAssociationMap iconShadow " + checkElementArray[checkKeys[i]]);
                        if (checkElementArray[checkKeys[i]] === "partialSelection")
                            divIdWrapper.find("#" + checkKeys[i]).addClass("flaticon-arrow");
                    }
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.pivot_view.key: {
            // added below check: think referesh is not that important for pivot view and feel that it is okay.
            if(onRefreshButtonClick) {
                let data = {};
                data.elementId = element[ATTR.elementId];
                data.objectType = element[ATTR.objectType];
                service.getElementInfo(data, function (res, err) {
                    if (res) {
                        generateUniqueIdAndParentLink(res, "pivotView", null);
                        let str = getPivotViewContent(viewObject.div_id, res, isBiview);
                        divIdWrapper.html(str);
                        $("#saveData").hide();
                    }
                    else if (err) {
                        $("#saveData").hide();
                        errorHandler(err);
                    }
                });
            }
            $("#saveData").hide();
            break;
        }
        case backing.view_type.create_expression_view.key: {
            let obj = [], i = 0;
            divIdWrapper.find(".innerBlock").each(function () {
                if ($(this).find(".expressionChildViewText.selected").length > 0) {
                    let id = $(this).find(".expressionChildViewText.selected").attr("id");
                    obj.push(id);
                }
                else
                    obj.push(0);
            });
            let objectiveStr = renderDirectoryViewForCreateExpressionForChildren(backing.objectiveParameterDv.children, viewObject.div_id, "singleview", "CreateOrEditExpressionView", isBiview);
            divIdWrapper.find(".ObjectiveContainer").find(".tree_structure_parent").html(objectiveStr);
            let methodStr = renderDirectoryViewForCreateExpressionForChildren(backing.methodParameterDv.children, viewObject.div_id, "singleview", "CreateOrEditExpressionView", isBiview);
            divIdWrapper.find(".MethodContainer").find(".tree_structure_parent").html(methodStr);
            let contentStr = renderDirectoryViewForCreateExpressionForChildren(backing.contentParameterDv.children, viewObject.div_id, "singleview", "CreateOrEditExpressionView", isBiview);
            divIdWrapper.find(".ContentContainer").find(".tree_structure_parent").html(contentStr);
            let subjectStr = renderDirectoryViewForCreateExpressionForChildren(backing.subjectParameterDv.children, viewObject.div_id, "singleview", "CreateOrEditExpressionView", isBiview);
            divIdWrapper.find(".SubjectContainer").find(".tree_structure_parent").html(subjectStr);
            divIdWrapper.find(".innerBlock").each(function () {
                $(this).find(".d-text").each(function () {
                    if ($(this).attr("id") === obj[i]) {
                        $(this).addClass("selected active");
                    }
                });
                i++;
            });
            divIdWrapper.find(".expressionChildViewText.active").parents(".element_li").each(function () {
                $(this).children(".directoryListItemContainer").find(".d-text").addClass("active");
            });
            getSelectedString(viewObject.div_id);
            $("#saveData").hide();
            break;
        }
        case backing.view_type.edit_expression_view.key: {
            service.getSceInfo(element.elementId, function (res, err) {
                if (res) {
                    let objectiveStr = renderDirectoryViewForCreateExpressionForChildren(backing.objectiveParameterDv.children, viewObject.div_id, "singleview", "CreateOrEditExpressionView", isBiview, res.objectiveParameterId);
                    divIdWrapper.find(".ObjectiveContainer").find(".tree_structure_parent").html(objectiveStr);
                    let methodStr = renderDirectoryViewForCreateExpressionForChildren(backing.methodParameterDv.children, viewObject.div_id, "singleview", "CreateOrEditExpressionView", isBiview, res.methodParameterId);
                    divIdWrapper.find(".MethodContainer").find(".tree_structure_parent").html(methodStr);
                    let contentStr = renderDirectoryViewForCreateExpressionForChildren(backing.contentParameterDv.children, viewObject.div_id, "singleview", "CreateOrEditExpressionView", isBiview, res.contentParameterId);
                    divIdWrapper.find(".ContentContainer").find(".tree_structure_parent").html(contentStr);
                    let subjectStr = renderDirectoryViewForCreateExpressionForChildren(backing.subjectParameterDv.children, viewObject.div_id, "singleview", "CreateOrEditExpressionView", isBiview, res.subjectParameterId);
                    divIdWrapper.find(".SubjectContainer").find(".tree_structure_parent").html(subjectStr);
                    divIdWrapper.find(".expressionChildViewText.active").parents(".element_li").each(function () {
                        $(this).children(".directoryListItemContainer").find(".d-text").addClass("active");
                    });
                    getSelectedString(viewObject.div_id);
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.create_shield_element_view.key: {
            let shieldName = divIdWrapper.attr("shieldName");
            let parentElementName = "NA";
            let parentElementType = "NA";
            let object = canHaveCreateHotlinkElement(element, view);
            let elementType = object.childElementType;
            if (element.elementId !== 0) {
                service.getEditElementInfo(element.elementId, function (res, err) {
                    if (res) {
                        parentElementName = (res.name) ? res.name : "NA";
                        parentElementType = (res.elementTypeName) ? res.elementTypeName : "NA";
                        shieldName = res.shieldName;
                        if (!element[ATTR.objectType].match(/_root$/))
                            divIdWrapper.find(".panel-header").html("CREATE CHILD " + elementType.toUpperCase() + " ELEMENT: " + objectTypeIcon + "" + res.name.toUpperCase());
                        divIdWrapper.find(".parentName").val(parentElementName);
                        divIdWrapper.find(".parentType").val(parentElementType);
                        divIdWrapper.find(".shieldName").val(shieldName);
                    }
                    else if (err) {
                        $("#saveData").hide();
                        errorHandler(err);
                    }
                });
            }
            divIdWrapper.find(".shieldName").val(shieldName);
            divIdWrapper.find(".childType").val(elementType);
            getDataForOrgUnit(viewObject.div_id);
            $("#saveData").hide();
            break;
        }
        case backing.view_type.edit_shield_element_view.key: {
            service.getEditElementInfo(element.elementId, function (res, err) {
                if (res) {
                    let parentElementName = (res.parentElementName) ? res.parentElementName : "NA";
                    let parentElementType = (res.parentElementTypeName) ? res.parentElementTypeName : "NA";
                    let shieldName = res.shieldName;
                    let elementType = res.elementTypeName;
                    divIdWrapper.find(".parentName").val(parentElementName);
                    divIdWrapper.find(".parentType").val(parentElementType);
                    divIdWrapper.find(".shieldName").val(shieldName);
                    divIdWrapper.find(".childType").val(elementType);
                    getDataForOrgUnit(viewObject.div_id, res.organizationalUnitId);
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.create_asset_element_view.key: {
            let providerData = {}, data = {};
            let viewId = viewObject.div_id;
            data.assetTypeGroupId = 0;
            data.level = 0;
            data.protectionType = "do_not_show";
            data.showExpression = false;
            data.showAsset = false;
            providerData.showAsset = false;
            providerData.providerGroupId = 0;
            let isBusiness = ($("#" + viewObject.div_id).attr("isBusiness") === "true");
            getDataForAssetTypeHierarchy(data, viewId, "", isBusiness);
            getDataForProviderHierarchy(providerData, viewId, "", isBusiness);
            getDataForOrgUnit(viewId);
            $("#saveData").hide();
            break;
        }
        case backing.view_type.edit_asset_element_view.key: {
            service.getAssetElementInfo(element.elementId, function (res, err) {
                if (res) {
                    let providerData = {}, data = {};
                    let viewId = viewObject.div_id;
                    data.assetTypeGroupId = 0;
                    data.level = 0;
                    data.protectionType = "do_not_show";
                    data.showExpression = false;
                    data.showAsset = false;
                    providerData.showAsset = false;
                    providerData.providerGroupId = 0;
                    let isBusiness = ($("#" + viewObject.div_id).attr("isBusiness") === "true");
                    getDataForAssetTypeHierarchy(data, viewId, res.assetTypeId, isBusiness);
                    getDataForProviderHierarchy(providerData, viewId, res.providerId, isBusiness);
                    getDataForOrgUnit(viewId, res.organizationalUnitId);
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.edit_user_view.key: {
            service.getUserInfo(element.elementId, function (res, err) {
                if (res) {
                    let viewId = viewObject.div_id;
                    getDataForOrgUnit(viewId, res.organizationalUnitId);
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.create_asset_type_element_view.key: {
            let data = {};
            data.elementId = element[ATTR.elementId];
            data.objectType = element[ATTR.objectType];
            if (!element[ATTR.objectType].match(/_root$/)) {
                service.getElementInfo(data, function (res, err) {
                    if (res) {
                        let parentAssetType = (res.name) ? res.name : "NA";
                        if (!element[ATTR.objectType].match(/_root$/))
                            divIdWrapper.find(".panel-header").html("CREATE CHILD ASSET TYPE: " + objectTypeIcon + "" + res.name.toUpperCase());
                        divIdWrapper.find(".parentAssetType").val(parentAssetType);
                    }
                    else if (err) {
                        $("#saveData").hide();
                        errorHandler(err);
                    }
                });
            }
            getDataForOrgUnit(viewObject.div_id);
            $("#saveData").hide();
            break;
        }
        case backing.view_type.edit_asset_type_element_view.key: {
            let data = {};
            data.elementId = element[ATTR.elementId];
            data.objectType = element[ATTR.objectType];
            service.getElementInfo(data, function (res, err) {
                if (res) {
                    let parentAssetType = (res.parentElementName !== "") ? res.parentElementName : "NA";
                    divIdWrapper.find(".parentAssetType").val(parentAssetType);
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            service.getAssetTypeInfo(element.elementId, function (res, err) {
                if (res) {
                    getDataForOrgUnit(viewObject.div_id, res.organizationalUnitId);
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            $("#saveData").hide();
            break;
        }
        case backing.view_type.create_organizationalunit_element_view.key: {
            let data = {};
            data.elementId = element[ATTR.elementId];
            data.objectType = element[ATTR.objectType];
            $("#saveData").show();
            if (!element[ATTR.objectType].match(/_root$/)) {
                service.getElementInfo(data, function (res, err) {
                    if (res) {
                        let parentAssetType = (res.name) ? res.name : "NA";
                        if (!element[ATTR.objectType].match(/_root$/))
                            divIdWrapper.find(".panel-header").html("CREATE CHILD ORGANIZATIONAL UNIT: " + objectTypeIcon + "" + res.name.toUpperCase());
                        divIdWrapper.find(".organizationalParent").val(parentAssetType);
                    }
                    else if (err) {
                        $("#saveData").hide();
                        errorHandler(err);
                    }
                });
            }
            $("#saveData").hide();
            break;
        }
        case backing.view_type.edit_organizationalunit_element_view.key: {
            let data = {};
            data.elementId = element[ATTR.elementId];
            data.objectType = element[ATTR.objectType];
            service.getElementInfo(data, function (res, err) {
                if (res) {
                    let parentAssetType = (res.parentElementName !== "") ? res.parentElementName : "NA";
                    divIdWrapper.find(".organizationalParent").val(parentAssetType);
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.create_provider_element_view.key: {
            getDataForOrgUnit(viewObject.div_id);
            $("#saveData").hide();
            break;
        }
        case backing.view_type.edit_provider_element_view.key: {
            service.getProviderInfo(element.elementId, function (res, err) {
                if (res) {
                    getDataForOrgUnit(viewObject.div_id, res.organizationalUnitId);
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
                $("#saveData").hide();
            });
            break;
        }
        case backing.view_type.evaluationview.key:
            if (element !== undefined)
                evaluationRefresh(element, isBiview, viewObject, uniqueId);
            $("#saveData").hide();
            break;
        case backing.view_type.create_objective_element_view.key: {
            let data = {};
            data.elementId = element[ATTR.elementId];
            data.objectType = element[ATTR.objectType];
            service.getElementInfo(data, function (res, err) {
                if (res) {
                    let parentName = (res.name) ? res.name : "NA";
                    if (!element[ATTR.objectType].match(/_root$/))
                        divIdWrapper.find(".panel-header").html("CREATE CHILD SECURITY TECHNIQUE: " + objectTypeIcon + "" + res.name.toUpperCase());
                    divIdWrapper.find(".parentParameter").val(parentName);
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.create_method_element_view.key: {
            let data = {};
            data.elementId = element[ATTR.elementId];
            data.objectType = element[ATTR.objectType];
            service.getElementInfo(data, function (res, err) {
                if (res) {
                    let parentName = (res.name) ? res.name : "NA";
                    if (!element[ATTR.objectType].match(/_root$/))
                        divIdWrapper.find(".panel-header").html("CREATE CHILD SECURITY CONTENT: " + objectTypeIcon + "" + res.name.toUpperCase());
                    divIdWrapper.find(".parentParameter").val(parentName);
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.create_content_element_view.key: {
            let data = {};
            data.elementId = element[ATTR.elementId];
            data.objectType = element[ATTR.objectType];
            service.getElementInfo(data, function (res, err) {
                if (res) {
                    let parentName = (res.name) ? res.name : "NA";
                    if (!element[ATTR.objectType].match(/_root$/))
                        divIdWrapper.find(".panel-header").html("CREATE CHILD PROTECTED CONTENT: " + objectTypeIcon + "" + res.name.toUpperCase());
                    divIdWrapper.find(".parentParameter").val(parentName);
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.create_subject_element_view.key: {
            let data = {};
            data.elementId = element[ATTR.elementId];
            data.objectType = element[ATTR.objectType];
            service.getElementInfo(data, function (res, err) {
                if (res) {
                    let parentName = (res.name) ? res.name : "NA";
                    if (!element[ATTR.objectType].match(/_root$/))
                        divIdWrapper.find(".panel-header").html("CREATE CHILD PROTECTED SUBJECT: " + objectTypeIcon + "" + res.name.toUpperCase());
                    divIdWrapper.find(".parentParameter").val(parentName);
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.edit_objective_element_view.key: {
            let data = {};
            data.elementId = element[ATTR.elementId];
            data.objectType = element[ATTR.objectType];
            service.getElementInfo(data, function (res, err) {
                if (res) {
                    let parentName = (res.parentElementName !== "") ? res.parentElementName : "NA";
                    divIdWrapper.find(".parentParameter").val(parentName);
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.edit_method_element_view.key: {
            let data = {};
            data.elementId = element[ATTR.elementId];
            data.objectType = element[ATTR.objectType];
            service.getElementInfo(data, function (res, err) {
                if (res) {
                    let parentName = (res.parentElementName !== "") ? res.parentElementName : "NA";
                    divIdWrapper.find(".parentParameter").val(parentName);
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.edit_content_element_view.key: {
            let data = {};
            data.elementId = element[ATTR.elementId];
            data.objectType = element[ATTR.objectType];
            service.getElementInfo(data, function (res, err) {
                if (res) {
                    let parentName = (res.parentElementName !== "") ? res.parentElementName : "NA";
                    divIdWrapper.find(".parentParameter").val(parentName);
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.edit_subject_element_view.key: {
            let data = {};
            data.elementId = element[ATTR.elementId];
            data.objectType = element[ATTR.objectType];
            service.getElementInfo(data, function (res, err) {
                if (res) {
                    let parentName = (res.parentElementName !== "") ? res.parentElementName : "NA";
                    divIdWrapper.find(".parentParameter").val(parentName);
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.ring_view.key: {
            let str = getElementWithHotLinks(backing.dictionary_of_unique_id_to_attr_object[activeDesktop.recentSelectedId], viewObject.div_id, view);
            divIdWrapper.find("#Ring_directoryview").html(str);
            updateViewsStandards(viewObject.div_id, activeDesktop.directoryJson);
            $("#saveData").hide();
            break;
        }
        case backing.view_type.group_ring_view.key: {
            groupRingView(viewObject.div_id, element);
            $("#saveData").hide();
            break;
        }
        case backing.view_type.asset_attribute_library_view.key: {
            let data = {};
            data.perspectiveId = divIdWrapper.attr("persId");
            let callbackfn = function (res, err) {
                if (res) {
                    generateUniqueIdAndParentLink(res, "attributeLibraryView", null);
                    let str = refreshTableInAssetLibrary(res, data.perspectiveId, view);
                    $("#" + viewObject.div_id).find(".treeContainerAssociationView").html(str);
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            };
            if(!backing.isDirectMode)
                service.getAllAssetLibraryAttribute(data, callbackfn);
            else
                service.getAllAssetImplementsLibraryAttribute(data, callbackfn);
            break;
        }
        case backing.view_type.shield_attribute_library_view.key: {
            let data = {};
            data.perspectiveId = divIdWrapper.attr("persId");
            service.getAllShieldElementLibraryAttribute(data, function (res, err) {
                if (res) {
                    generateUniqueIdAndParentLink(res, "attributeLibraryView", null);
                    let str = refreshTableInShieldElementLibrary(res, data.perspectiveId, view);
                    $("#" + viewObject.div_id).find(".treeContainerAssociationView").html(str);
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.create_groups.key: {
            let createGroupsViewDivId = viewObject.div_id;
            divIdWrapper.find(".panel-header").html("CREATE " + element.name.toUpperCase() + " GROUP");
            let dataSelector = activeDesktop.utilsFunction.getSelector();
            let data = {};
            data.shieldId = dataSelector.dropDownOneShieldId ? dataSelector.dropDownOneShieldId : dataSelector.shieldId;
            data.level = element.level;
            data.shieldElementGroupId = 0;
            data.showExpression = false;
            service.getShieldDv(data, function (res, err) {
                if (res) {
                    generateUniqueIdAndParentLink(res, "", null);
                    renderDirectoryView(res, createGroupsViewDivId + "treeContainer", "singleview", "groupView", false);
                    $("#" + createGroupsViewDivId + "treeContainer").find(".d-text").each(function () {
                        let id = $(this);
                        if (element.elementId == null || element.elementId == 0 || $(this).attr("shieldElementTypeId") == element.elementId)
                            $(this).addClass("canSelect");
                        else
                            $(this).addClass("cannotSelect");
                        $("#" + createGroupsViewDivId + "selectedElements").find("li").each(function () {
                            if ($(this).attr("elementId") === id.attr("id"))
                                id.addClass("selectedGroup")
                        });
                    });
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.edit_groups.key: {
            let createGroupsViewDivId = viewObject.div_id;
            divIdWrapper.find(".panel-header").html("EDIT " + element.name.toUpperCase() + " GROUP");
            let dataSelector = activeDesktop.utilsFunction.getSelector();
            let data = {};
            data.shieldId = dataSelector.dropDownOneShieldId ? dataSelector.dropDownOneShieldId : dataSelector.shieldId;
            data.level = element.level;
            data.shieldElementGroupId = 0;
            data.showExpression = false;
            service.getShieldDv(data, function (res, err) {
                if (res) {
                    generateUniqueIdAndParentLink(res, "", null);
                    renderDirectoryView(res, createGroupsViewDivId + "treeContainer", "singleview", "groupView", false);
                    $("#" + createGroupsViewDivId + "treeContainer").find(".d-text").each(function () {
                        let id = $(this);
                        if (element.elementId == 0 || element.elementId == null || $(this).attr("shieldElementTypeId") == element.elementId)
                            $(this).addClass("canSelect");
                        else
                            $(this).addClass("cannotSelect");
                        $("#" + createGroupsViewDivId + "selectedElements").find("li").each(function () {
                            if ($(this).attr("elementId") === id.attr("id"))
                                id.addClass("selectedGroup")
                        });
                    });
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.exp_asset_association_view.key: {
            let data = {}, obj = {};
            data.elementId = element[ATTR.elementId];
            obj.elementId = element[ATTR.elementId];
            obj.objectType = element[ATTR.objectType];
            let checkElementArray = {};
            $("#" + viewObject.div_id + " .selectExpAssetAssociationMap").each(function () {
                if ($(this).hasClass("flaticon-arrow") && $(this).hasClass("partialSelection"))
                    checkElementArray[$(this).attr("id")] = "partialSelection";
                else if ($(this).hasClass("flaticon-arrow"))
                    checkElementArray[$(this).attr("id")] = "flaticon-arrow";
                else if ($(this).hasClass("flaticon-unlink"))
                    checkElementArray[$(this).attr("id")] = "flaticon-unlink";
            });
            let renderFunction = ($("#" + viewObject.div_id).attr("isBusiness") === "true") ? service.getDeliversByBusinessAssetAssociationsForExpression : service.getDeliversByAssociationsForExpression;
            renderFunction(data, function (orgRes, err) {
                if (orgRes) {
                    let res = appendingAsChildobject(element, orgRes);
                    generateUniqueIdAndParentLink(res, "expAssetAssociationView", null);
                    service.getElementInfo(obj, function (elementInfoRes, err) {
                        if (elementInfoRes) {
                            let elementName = combineChainElements(elementInfoRes);
                            divIdWrapper.find(".desktop-selector-container .typeIcon").html(objectTypeIcon + "" + elementName.str);
                            divIdWrapper.find(".desktop-selector-container .typeIcon").attr("title", elementName.str);
                        }
                        else if (err) {
                            errorHandler(err);
                        }
                    });
                    if (res[ATTR.children]) {
                        if (!divIdWrapper.find(".sortIcon").hasClass("unSortAss"))
                            sortChildrenAlphbetically(res);
                        let index = getIndexOfOpenedViewFromPassedOpenedViews(viewObject.div_id, activeDesktop.opened_views);
                        activeDesktop.opened_views[index].associationRes = res;
                        renderDirectoryViewForExpAssetAssociationView(res, viewObject.div_id, view);
                    }
                    let checkKeys = Object.keys(checkElementArray);
                    for (let i = 0; i <= checkKeys.length; i++) {
                        if (divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").hasClass(checkElementArray[checkKeys[i]]))
                            divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectExpAssetAssociationMap " + checkElementArray[checkKeys[i]]);
                        else
                            divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectExpAssetAssociationMap iconShadow " + checkElementArray[checkKeys[i]]);
                        if (checkElementArray[checkKeys[i]] === "partialSelection")
                            divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").addClass("flaticon-arrow");
                    }
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.exp_assetType_association_view.key: {
            let data = {}, obj = {};
            data.elementId = element[ATTR.elementId];
            obj.elementId = element[ATTR.elementId];
            obj.objectType = element[ATTR.objectType];
            let checkElementArray = {};
            $("#" + viewObject.div_id + " .selectExpAssetTypeAssociationMap").each(function () {
                if ($(this).hasClass("flaticon-arrow") && $(this).hasClass("partialSelection"))
                    checkElementArray[$(this).attr("id")] = "partialSelection";
                else if ($(this).hasClass("flaticon-arrow"))
                    checkElementArray[$(this).attr("id")] = "flaticon-arrow";
                else if ($(this).hasClass("flaticon-unlink"))
                    checkElementArray[$(this).attr("id")] = "flaticon-unlink";
            });
            let renderFunction = ($("#" + viewObject.div_id).attr("isBusiness") === "true") ? service.getBusinessProtectsAssociationsForExpression : service.getProtectsAssociationsForExpression;
            renderFunction(data, function (orgRes, err) {
                if (orgRes) {
                    let res = appendingAsChildobject(element, orgRes);
                    generateUniqueIdAndParentLink(res, "expAssetTypeAssociationView", null);
                    service.getElementInfo(obj, function (elementInfoRes, err) {
                        if (elementInfoRes) {
                            let elementName = combineChainElements(elementInfoRes);
                            divIdWrapper.find(".desktop-selector-container .typeIcon").html(objectTypeIcon + "" + elementName.str);
                            divIdWrapper.find(".desktop-selector-container .typeIcon").attr("title", elementName.str);
                        }
                        else if (err) {
                            errorHandler(err);
                        }
                    });
                    if (res[ATTR.children]) {
                        if (!divIdWrapper.find(".sortIcon").hasClass("unSortAss"))
                            sortChildrenAlphbetically(res);
                        let index = getIndexOfOpenedViewFromPassedOpenedViews(viewObject.div_id, activeDesktop.opened_views);
                        activeDesktop.opened_views[index].associationRes = res;
                        renderDirectoryViewExpAssetTypeAssociationView(res, viewObject.div_id, view);
                    }
                    let checkKeys = Object.keys(checkElementArray);
                    for (let i = 0; i <= checkKeys.length; i++) {
                        if (divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").hasClass(checkElementArray[checkKeys[i]]))
                            divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectExpAssetTypeAssociationMap " + checkElementArray[checkKeys[i]]);
                        else
                            divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectExpAssetTypeAssociationMap iconShadow " + checkElementArray[checkKeys[i]]);
                        if (checkElementArray[checkKeys[i]] === "partialSelection")
                            divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").addClass("flaticon-arrow");
                    }
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.exp_shield_association_view.key: {
            let data = {}, obj = {};
            let searchDropDown;
            let prevSelectedShieldId;
            let prevSelectedShield;
            data.expressionId = element[ATTR.elementId];
            obj.elementId = element[ATTR.elementId];
            obj.objectType = element[ATTR.objectType];
            let checkElementArray = {};
            if (isBiview) {
                prevSelectedShieldId = $("#" + viewObject.div_id + "_shieldSelectorAssociationSelected").attr("elementId");
                view = "biview";
                searchDropDown = "biSearchElementTypeShieldExpAssociationDropDown";
            }
            else {
                prevSelectedShieldId = $("#" + viewObject.div_id + "_shieldSelectorAssociationSelected").attr("elementId");
                view = "singleview";
                searchDropDown = "singleSearchElementTypeShieldExpAssociationDropDown";

            }
            $("#" + viewObject.div_id + " .selectExpShieldAssociationMap").each(function () {
                if ($(this).hasClass("flaticon-arrow"))
                    checkElementArray[$(this).attr("id")] = "flaticon-arrow";
                else if ($(this).hasClass("flaticon-unlink"))
                    checkElementArray[$(this).attr("id")] = "flaticon-unlink";
            });
            service.getShieldOfShieldType(data, function (shieldRes, err) {
                if (shieldRes) {
                    if (prevSelectedShieldId) {
                        prevSelectedShield = checkInsideArray(shieldRes.children, prevSelectedShieldId);
                        if (prevSelectedShield) {
                            data.shieldId = prevSelectedShield.elementId;
                        }
                    }
                    if (!prevSelectedShieldId || !prevSelectedShield) {
                        data.shieldId = shieldRes.children[0].elementId;
                    }
                    service.getShieldStdAssociationsForExpression(data, function (orgRes, err) {
                        if (orgRes) {
                            let res = appendingAsChildobject(element, orgRes);
                            generateUniqueIdAndParentLink(res, "expShieldAssociationView", null);
                            let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                            if (objectTypesAndElementTypes) {
                                renderObjectTypesAndElementTypesDropDownShieldExp(objectTypesAndElementTypes, viewObject.div_id, searchDropDown, "shieldExpAssociationSearchObjectItem");
                            }
                            renderShieldDropDownForAssociationView(shieldRes.children, view, viewObject.div_id, prevSelectedShield);
                            service.getElementInfo(obj, function (elementInfoRes, err) {
                                if (elementInfoRes) {
                                    let elementName = combineChainElements(elementInfoRes);
                                    divIdWrapper.find(".desktop-selector-container .typeIcon").html(objectTypeIcon + "" + elementName.str);
                                    divIdWrapper.find(".desktop-selector-container .typeIcon").attr("title", elementName.str);
                                }
                                else if (err) {
                                    errorHandler(err);
                                }
                            });
                            if (!divIdWrapper.find(".sortIcon").hasClass("unSortAss"))
                                sortChildrenAlphbetically(res);
                            let index = getIndexOfOpenedViewFromPassedOpenedViews(viewObject.div_id, activeDesktop.opened_views);
                            activeDesktop.opened_views[index].associationRes = res;
                            renderDirectoryViewForExpShieldAssociationView(res, viewObject.div_id, view);
                            let checkKeys = Object.keys(checkElementArray);
                            for (let i = 0; i <= checkKeys.length; i++) {
                                if (divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").hasClass(checkElementArray[checkKeys[i]]))
                                    divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectExpShieldAssociationMap " + checkElementArray[checkKeys[i]]);
                                else
                                    divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectExpShieldAssociationMap iconShadow " + checkElementArray[checkKeys[i]]);
                            }
                            $("#saveData").hide();
                        }
                        else if (err) {
                            $("#saveData").hide();
                            errorHandler(err);
                        }
                    });
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.exp_standard_association_view.key: {
            let data = {}, obj = {};
            let searchDropDown;
            let prevSelectedShieldId;
            let prevSelectedShield, getDropDownService;
            data.expressionId = element[ATTR.elementId];
            obj.elementId = element[ATTR.elementId];
            obj.objectType = element[ATTR.objectType];
            let checkElementArray = {};
            if (isBiview) {
                prevSelectedShieldId = $("#" + viewObject.div_id + "_standardSelectorAssociationSelected").attr("elementId");
                searchDropDown = "biSearchElementTypeStdExpAssociationDropDown";
            }
            else {
                prevSelectedShieldId = $("#" + viewObject.div_id + "_standardSelectorAssociationSelected").attr("elementId");
                searchDropDown = "singleSearchElementTypeStdExpAssociationDropDown";
            }
            $("#" + viewObject.div_id + " .selectExpStandardAssociationMap").each(function () {
                if ($(this).hasClass("flaticon-arrow"))
                    checkElementArray[$(this).attr("id")] = "flaticon-arrow";
                else if ($(this).hasClass("flaticon-unlink"))
                    checkElementArray[$(this).attr("id")] = "flaticon-unlink";
            });
            if (divIdWrapper.attr("objectType") === "shield_element")
                getDropDownService = service.getShieldOfShieldType;
            else if (divIdWrapper.attr("objectType") === "standard_element")
                getDropDownService = service.getShieldOfStandardType;
            else if (divIdWrapper.attr("objectType") === "b_control")
                getDropDownService = service.getShieldOfBusinessType;
            else if (divIdWrapper.attr("objectType") === "threat_element")
                getDropDownService = service.getShieldOfThreatType;
            getDropDownService(data, function (shieldRes, err) {
                if (shieldRes) {
                    if (prevSelectedShieldId) {
                        prevSelectedShield = checkInsideArray(shieldRes.children, prevSelectedShieldId);
                        if (prevSelectedShield) {
                            data.shieldId = prevSelectedShield.elementId;
                        }
                    }
                    if (!prevSelectedShieldId || !prevSelectedShield) {
                        data.shieldId = shieldRes.children[0].elementId;
                    }
                    service.getShieldStdAssociationsForExpression(data, function (orgRes, err) {
                        if (orgRes) {
                            let res = appendingAsChildobject(element, orgRes);
                            generateUniqueIdAndParentLink(res, "expStandardAssociationView", null);
                            let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                            if (objectTypesAndElementTypes) {
                                renderObjectTypesAndElementTypesDropDownStdExp(objectTypesAndElementTypes, viewObject.div_id, searchDropDown, "stdExpAssociationSearchObjectItem");
                            }
                            renderStandardDropDownForAssociationView(shieldRes.children, view, viewObject.div_id, prevSelectedShield);
                            service.getElementInfo(obj, function (elementInfoRes, err) {
                                if (elementInfoRes) {
                                    let elementName = combineChainElements(elementInfoRes);
                                    divIdWrapper.find(".desktop-selector-container .typeIcon").html(objectTypeIcon + "" + elementName.str);
                                    divIdWrapper.find(".desktop-selector-container .typeIcon").attr("title", elementName.str);
                                }
                                else if (err) {
                                    errorHandler(err);
                                }
                            });
                            if (!divIdWrapper.find(".sortIcon").hasClass("unSortAss"))
                                sortChildrenAlphbetically(res);
                            let index = getIndexOfOpenedViewFromPassedOpenedViews(viewObject.div_id, activeDesktop.opened_views);
                            activeDesktop.opened_views[index].associationRes = res;
                            renderDirectoryViewForExpStandardAssociationView(res, viewObject.div_id, view);
                            let checkKeys = Object.keys(checkElementArray);
                            for (let i = 0; i <= checkKeys.length; i++) {
                                if (divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").hasClass(checkElementArray[checkKeys[i]]))
                                    divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectExpStandardAssociationMap " + checkElementArray[checkKeys[i]]);
                                else
                                    divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectExpStandardAssociationMap iconShadow " + checkElementArray[checkKeys[i]]);
                            }
                        }
                        else if (err) {
                            $("#saveData").hide();
                            errorHandler(err);
                        }
                    });
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.create_artifact_view.key: {
            $("#saveData").hide();
            break;
        }
        case backing.view_type.edit_artifact_view.key: {
            $("#saveData").hide();
            break;
        }
        case backing.view_type.direct_shield_association_view.key: {
            let data = {}, obj = {};
            let prevSelectedShieldId, searchDropDown, prevSelectedShield, getDropDownService;
            data.elementId = element[ATTR.elementId];
            obj.elementId = element[ATTR.elementId];
            obj.objectType = element[ATTR.objectType];
            let checkElementArray = {};
            let prevSelectedObjectType = $("#" + viewObject.div_id + "_elementSelectorAssociationSelected").attr("objectType");
            if (isBiview) {
                prevSelectedShieldId = $("#" + viewObject.div_id + "_elementSelectorAssociationSelected").attr("elementId");
                searchDropDown = "biSearchElementTypeShieldExpAssociationDropDown";
            }
            else {
                prevSelectedShieldId = $("#" + viewObject.div_id + "_elementSelectorAssociationSelected").attr("elementId");
                searchDropDown = "singleSearchElementTypeShieldExpAssociationDropDown";

            }
            $("#" + viewObject.div_id + " .selectToDirectMap").each(function () {
                if ($(this).hasClass("flaticon-arrow"))
                    checkElementArray[$(this).attr("id")] = "flaticon-arrow";
                else if ($(this).hasClass("flaticon-unlink"))
                    checkElementArray[$(this).attr("id")] = "flaticon-unlink";
            });
            if (prevSelectedObjectType === "shield")
                getDropDownService = service.getShieldOfShieldType;
            else if (prevSelectedObjectType === "standard")
                getDropDownService = service.getShieldOfStandardType;
            else if (prevSelectedObjectType === "b_framework")
                getDropDownService = service.getShieldOfBusinessType;
            else if (prevSelectedObjectType === "threat")
                getDropDownService = service.getShieldOfThreatType;
            getDropDownService(data, function (shieldRes, err) {
                if (shieldRes) {
                    if (prevSelectedShieldId) {
                        prevSelectedShield = checkInsideArray(shieldRes.children, prevSelectedShieldId);
                        if (prevSelectedShield) {
                            data.selectedShield = prevSelectedShield.elementId;
                        }
                    }
                    if (!prevSelectedShieldId || !prevSelectedShield) {
                        data.selectedShield = shieldRes.children[0].elementId;
                    }
                    service.getDirectShieldElementAssociationsForShieldElement(data, function (orgRes, err) {
                        if (orgRes) {
                            let res = appendingAsChildobject(element, orgRes);
                            generateUniqueIdAndParentLink(res, "directElementAssociationView", null);
                            let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                            if (objectTypesAndElementTypes) {
                                renderObjectTypesAndElementTypesDropDownShieldExp(objectTypesAndElementTypes, viewObject.div_id, searchDropDown, "shieldExpAssociationSearchObjectItem");
                            }
                            renderDirectElementDropDownForAssociationView(shieldRes.children, view, viewObject.div_id, prevSelectedShield);
                            service.getElementInfo(obj, function (elementInfoRes, err) {
                                if (elementInfoRes) {
                                    divIdWrapper.find(".desktop-selector-container .iconWrapper").html(objectTypeIcon);
                                    divIdWrapper.find(".desktop-selector-container .typeIcon").html(getViewHeaderName(elementInfoRes).toUpperCase());
                                    divIdWrapper.find(".desktop-selector-container .typeIcon").attr("title", getViewHeaderName(elementInfoRes).toUpperCase());
                                }
                                else if (err) {
                                    errorHandler(err);
                                }
                            });
                            if (!divIdWrapper.find(".sortIcon").hasClass("unSortAss"))
                                sortChildrenAlphbetically(res);
                            let index = getIndexOfOpenedViewFromPassedOpenedViews(viewObject.div_id, activeDesktop.opened_views);
                            activeDesktop.opened_views[index].associationRes = res;
                            renderDirectoryViewForDirectElementAssociationView(res, viewObject.div_id, view);
                            let checkKeys = Object.keys(checkElementArray);
                            for (let i = 0; i <= checkKeys.length; i++) {
                                if (divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").hasClass(checkElementArray[checkKeys[i]]))
                                    divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectToDirectMap " + checkElementArray[checkKeys[i]]);
                                else
                                    divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectToDirectMap iconShadow " + checkElementArray[checkKeys[i]]);
                            }
                        }
                        else if (err) {
                            errorHandler(err);
                        }

                    });
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }

            });
            break;
        }
        case backing.view_type.direct_asset_association_view.key: {
            let data = {}, obj = {};
            data.elementId = element[ATTR.elementId];
            obj.elementId = element[ATTR.elementId];
            obj.objectType = element[ATTR.objectType];
            let checkElementArray = {};
            $("#" + viewObject.div_id + " .selectDirectAssetAssociationMap").each(function () {
                if ($(this).hasClass("flaticon-arrow"))
                    checkElementArray[$(this).attr("id")] = "flaticon-arrow";
                else if ($(this).hasClass("flaticon-unlink"))
                    checkElementArray[$(this).attr("id")] = "flaticon-unlink";
            });
            let renderFunction = (divIdWrapper.attr("isBusiness") === "true") ? service.getDirectBusinessAssetAssociationsForElement : service.getDirectAssetAssociationsForElement;
            renderFunction(data, function (orgRes, err) {
                if (orgRes) {
                    let res = appendingAsChildobject(element, orgRes);
                    generateUniqueIdAndParentLink(res, "directAssetAssociationView", null);
                    service.getElementInfo(obj, function (elementInfoRes, err) {
                        if (elementInfoRes) {
                            divIdWrapper.find(".desktop-selector-container .iconWrapper").html(objectTypeIcon);
                            divIdWrapper.find(".desktop-selector-container .typeIcon").html(getViewHeaderName(elementInfoRes).toUpperCase());
                            divIdWrapper.find(".desktop-selector-container .typeIcon").attr("title", getViewHeaderName(elementInfoRes).toUpperCase());
                        }
                        else if (err) {
                            $("#saveData").hide();
                            errorHandler(err);
                        }
                    });
                    if (res[ATTR.children]) {
                        if (!divIdWrapper.find(".sortIcon").hasClass("unSortAss"))
                            sortChildrenAlphbetically(res);
                        let index = getIndexOfOpenedViewFromPassedOpenedViews(viewObject.div_id, activeDesktop.opened_views);
                        activeDesktop.opened_views[index].associationRes = res;
                        renderDirectoryViewForDirectAssetAssociationView(res, viewObject.div_id, view);
                    }
                    let checkKeys = Object.keys(checkElementArray);
                    for (let i = 0; i <= checkKeys.length; i++) {
                        if (divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").hasClass(checkElementArray[checkKeys[i]]))
                            divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectDirectAssetAssociationMap " + checkElementArray[checkKeys[i]]);
                        else
                            divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectDirectAssetAssociationMap iconShadow " + checkElementArray[checkKeys[i]]);
                    }
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.direct_asset_element_association_view.key: {
            let data = {}, obj = {};
            let prevSelectedShieldId, searchDropDown, prevSelectedShield, getDropDownService;
            data.elementId = element[ATTR.elementId];
            obj.elementId = element[ATTR.elementId];
            obj.objectType = element[ATTR.objectType];
            let checkElementArray = {};
            if (isBiview) {
                prevSelectedShieldId = $("#" + viewObject.div_id + "_assetElementSelectorAssociationSelected").attr("elementId");
                view = "biview";
                searchDropDown = "biSearchElementTypeShieldExpAssociationDropDown";
            }
            else {
                prevSelectedShieldId = $("#" + viewObject.div_id + "_assetElementSelectorAssociationSelected").attr("elementId");
                view = "singleview";
                searchDropDown = "singleSearchElementTypeShieldExpAssociationDropDown";

            }
            $("#" + viewObject.div_id + " .selectDirectAssetMap").each(function () {
                if ($(this).hasClass("flaticon-arrow"))
                    checkElementArray[$(this).attr("id")] = "flaticon-arrow";
                else if ($(this).hasClass("flaticon-unlink"))
                    checkElementArray[$(this).attr("id")] = "flaticon-unlink";
            });
            if (divIdWrapper.attr("objectType") === "shield_element")
                getDropDownService = service.getShieldOfShieldType;
            else if (divIdWrapper.attr("objectType") === "standard_element")
                getDropDownService = service.getShieldOfStandardType;
            else if (divIdWrapper.attr("objectType") === "b_control")
                getDropDownService = service.getShieldOfBusinessType;
            else if (divIdWrapper.attr("objectType") === "threat_element")
                getDropDownService = service.getShieldOfThreatType;
            getDropDownService(data, function (shieldRes, err) {
                if (shieldRes) {
                    if (prevSelectedShieldId) {
                        prevSelectedShield = checkInsideArray(shieldRes.children, prevSelectedShieldId);
                        if (prevSelectedShield) {
                            data.selectedShield = prevSelectedShield.elementId;
                        }
                    }
                    if (!prevSelectedShieldId || !prevSelectedShield) {
                        data.selectedShield = shieldRes.children[0].elementId;
                    }
                    let renderFunction = (divIdWrapper.attr("isBusiness") === "true") ? service.getDirectShieldElementAssociationsForBusinessAsset : service.getDirectShieldElementAssociationsForAsset;
                    renderFunction(data, function (orgRes, err) {
                        if (orgRes) {
                            let res = appendingAsChildobject(element, orgRes);
                            generateUniqueIdAndParentLink(res, "directAssetElementAssociationView", null);
                            let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                            if (objectTypesAndElementTypes) {
                                renderObjectTypesAndElementTypesDropDownShieldExp(objectTypesAndElementTypes, viewObject.div_id, searchDropDown, "shieldExpAssociationSearchObjectItem");
                            }
                            renderDirectAssetElementDropDownForAssociationView(shieldRes.children, view, viewObject.div_id, prevSelectedShield);
                            service.getElementInfo(obj, function (elementInfoRes, err) {
                                if (elementInfoRes) {
                                    divIdWrapper.find(".desktop-selector-container .typeIcon").html(objectTypeIcon + "" + elementInfoRes.name.toUpperCase());
                                    divIdWrapper.find(".desktop-selector-container .typeIcon").attr("title", elementInfoRes.name.toUpperCase());
                                }
                                else if (err) {
                                    $("#saveData").hide();
                                    errorHandler(err);
                                }
                            });
                            if (!divIdWrapper.find(".sortIcon").hasClass("unSortAss"))
                                sortChildrenAlphbetically(res);
                            let index = getIndexOfOpenedViewFromPassedOpenedViews(viewObject.div_id, activeDesktop.opened_views);
                            activeDesktop.opened_views[index].associationRes = res;
                            renderDirectoryViewForDirectAssetElementAssociationView(res, viewObject.div_id, view);
                            let checkKeys = Object.keys(checkElementArray);
                            for (let i = 0; i <= checkKeys.length; i++) {
                                if (divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").hasClass(checkElementArray[checkKeys[i]]))
                                    divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectDirectAssetMap " + checkElementArray[checkKeys[i]]);
                                else
                                    divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectDirectAssetMap iconShadow " + checkElementArray[checkKeys[i]]);
                            }
                            $("#saveData").hide();
                        }
                        else if (err) {
                            $("#saveData").hide();
                            errorHandler(err);
                        }

                    });
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }

            });
            break;
        }
        case backing.view_type.direct_asset_type_association_view.key: {
            let data = {}, obj = {};
            data.elementId = element[ATTR.elementId];
            obj.elementId = element[ATTR.elementId];
            obj.objectType = element[ATTR.objectType];
            let checkElementArray = {};
            $("#" + viewObject.div_id + " .selectDirectAssetTypeAssociationMap").each(function () {
                if ($(this).hasClass("flaticon-arrow"))
                    checkElementArray[$(this).attr("id")] = "flaticon-arrow";
                else if ($(this).hasClass("flaticon-unlink"))
                    checkElementArray[$(this).attr("id")] = "flaticon-unlink";
            });
            let renderFunction = ($("#" + viewObject.div_id).attr("isBusiness") === "true") ? service.getDirectBusinessAssetTypeAssociationsForElement : service.getDirectAssetTypeAssociationsForElement;
            renderFunction(data, function (orgRes, err) {
                if (orgRes) {
                    let res = appendingAsChildobject(element, orgRes);
                    generateUniqueIdAndParentLink(res, "directAssetTypeAssociationView", null);
                    service.getElementInfo(obj, function (elementInfoRes, err) {
                        if (elementInfoRes) {
                            divIdWrapper.find(".desktop-selector-container .iconWrapper").html(objectTypeIcon);
                            divIdWrapper.find(".desktop-selector-container .typeIcon").html(getViewHeaderName(elementInfoRes).toUpperCase());
                            divIdWrapper.find(".desktop-selector-container .typeIcon").attr("title", getViewHeaderName(elementInfoRes).toUpperCase());
                        }
                        else if (err) {
                            $("#saveData").hide();
                        }
                    });
                    if (res[ATTR.children]) {
                        if (!divIdWrapper.find(".sortIcon").hasClass("unSortAss"))
                            sortChildrenAlphbetically(res);
                        let index = getIndexOfOpenedViewFromPassedOpenedViews(viewObject.div_id, activeDesktop.opened_views);
                        activeDesktop.opened_views[index].associationRes = res;
                        renderDirectoryViewForDirectAssetTypeAssociationView(res, viewObject.div_id, view);
                    }
                    let checkKeys = Object.keys(checkElementArray);
                    for (let i = 0; i <= checkKeys.length; i++) {
                        if (divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").hasClass(checkElementArray[checkKeys[i]]))
                            divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectDirectAssetTypeAssociationMap " + checkElementArray[checkKeys[i]]);
                        else
                            divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectDirectAssetTypeAssociationMap iconShadow " + checkElementArray[checkKeys[i]]);
                    }
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }
            });
            break;
        }
        case backing.view_type.direct_asset_type_element_association_view.key: {
            let data = {}, obj = {};
            let prevSelectedShieldId, searchDropDown, prevSelectedShield, getDropDownService;
            data.elementId = element[ATTR.elementId];
            obj.elementId = element[ATTR.elementId];
            obj.objectType = element[ATTR.objectType];
            let checkElementArray = {};
            if (isBiview) {
                prevSelectedShieldId = $("#" + viewObject.div_id + "_assetTypeElementSelectorAssociationSelected").attr("elementId");
                view = "biview";
                searchDropDown = "biSearchElementTypeShieldExpAssociationDropDown";
            }
            else {
                prevSelectedShieldId = $("#" + viewObject.div_id + "_assetTypeElementSelectorAssociationSelected").attr("elementId");
                view = "singleview";
                searchDropDown = "singleSearchElementTypeShieldExpAssociationDropDown";

            }
            $("#" + viewObject.div_id + " .selectDirectAssetTypeMap").each(function () {
                if ($(this).hasClass("flaticon-arrow"))
                    checkElementArray[$(this).attr("id")] = "flaticon-arrow";
                else if ($(this).hasClass("flaticon-unlink"))
                    checkElementArray[$(this).attr("id")] = "flaticon-unlink";
            });

            if (divIdWrapper.attr("objectType") === "shield_element")
                getDropDownService = service.getShieldOfShieldType;
            else if (divIdWrapper.attr("objectType") === "standard_element")
                getDropDownService = service.getShieldOfStandardType;
            else if (divIdWrapper.attr("objectType") === "b_control")
                getDropDownService = service.getShieldOfBusinessType;
            else if (divIdWrapper.attr("objectType") === "threat_element")
                getDropDownService = service.getShieldOfThreatType;

            getDropDownService(data, function (shieldRes, err) {
                if (shieldRes) {
                    if (prevSelectedShieldId) {
                        prevSelectedShield = checkInsideArray(shieldRes.children, prevSelectedShieldId);
                        if (prevSelectedShield) {
                            data.selectedShield = prevSelectedShield.elementId;
                        }
                    }
                    if (!prevSelectedShieldId || !prevSelectedShield) {
                        data.selectedShield = shieldRes.children[0].elementId;
                    }
                    let renderFunction = (divIdWrapper.attr("isBusiness") === "true") ? service.getDirectShieldElementAssociationsForBusinessAssetType : service.getDirectShieldElementAssociationsForAssetType;
                    renderFunction(data, function (orgRes, err) {
                        if (orgRes) {
                            let res = appendingAsChildobject(element, orgRes);
                            generateUniqueIdAndParentLink(res, "directAssetTypeElementAssociationView", null);
                            let objectTypesAndElementTypes = objectTypeInScope.processObjectTypeDropDownContent(res);
                            if (objectTypesAndElementTypes) {
                                renderObjectTypesAndElementTypesDropDownShieldExp(objectTypesAndElementTypes, viewObject.div_id, searchDropDown, "shieldExpAssociationSearchObjectItem");
                            }
                            renderDirectAssetTypeElementDropDownForAssociationView(shieldRes.children, view, viewObject.div_id, prevSelectedShield);
                            service.getElementInfo(obj, function (elementInfoRes, err) {
                                if (elementInfoRes) {
                                    divIdWrapper.find(".desktop-selector-container .iconWrapper").html(objectTypeIcon);
                                    divIdWrapper.find(".desktop-selector-container .typeIcon").html(getViewHeaderName(elementInfoRes).toUpperCase());
                                    divIdWrapper.find(".desktop-selector-container .typeIcon").attr("title", getViewHeaderName(elementInfoRes).toUpperCase());
                                }
                                else if (err) {
                                    $("#saveData").hide();
                                    errorHandler(err);
                                }
                            });
                            if (!divIdWrapper.find(".sortIcon").hasClass("unSortAss"))
                                sortChildrenAlphbetically(res);
                            let index = getIndexOfOpenedViewFromPassedOpenedViews(viewObject.div_id, activeDesktop.opened_views);
                            activeDesktop.opened_views[index].associationRes = res;
                            renderDirectoryViewForDirectAssetTypeElementAssociationView(res, viewObject.div_id, view);
                            let checkKeys = Object.keys(checkElementArray);
                            for (let i = 0; i <= checkKeys.length; i++) {
                                if (divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").hasClass(checkElementArray[checkKeys[i]]))
                                    divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectDirectAssetTypeMap " + checkElementArray[checkKeys[i]]);
                                else
                                    divIdWrapper.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map selectDirectAssetTypeMap iconShadow " + checkElementArray[checkKeys[i]]);
                            }
                        }
                        else if (err) {
                            $("#saveData").hide();
                            errorHandler(err);
                        }

                    });
                    $("#saveData").hide();
                }
                else if (err) {
                    $("#saveData").hide();
                    errorHandler(err);
                }

            });
            break;
        }
        case backing.view_type.projection_view.key: {
            let projectionUtil = new projectionUtils();
            projectionUtil.fullRefresh(isBiview);
            let src_hotlinkId, uniqueId, view;
            if (isBiview)
                view = "biview";
            else
                view = "singleview";
            let viewDivId = viewObject.div_id;
            let isViewOpenedBefore = true;
            let data = {};
            let activeDesktopKey = activeDesktop.key;
            if (activeDesktopKey === "ruler_type_desktop") {
                src_hotlinkId = "projectionViewRulerType";
                uniqueId = "projectionViewRulerType";
            }
            else if (activeDesktopKey === "bi_shield_element_ruler_type_desktop") {
                src_hotlinkId = "projectionViewBiShieldElement";
                uniqueId = "projectionViewBiShieldElement";
            }
            else if (activeDesktopKey === "shield_element_ruler_type_desktop") {
                src_hotlinkId = "projectionViewShieldElement ";
                uniqueId = "projectionViewShieldElement ";
            }
            else if (activeDesktopKey === "bi_ruler_type_desktop") {
                src_hotlinkId = "projectionViewBiRulerType ";
                uniqueId = "projectionViewBiRulerType ";
            }
            let hotlinkData = {src_hotlinkId, view, viewDivId, uniqueId, isViewOpenedBefore};
            data.shieldId = $("#" + activeDesktop.selector.shield_dropdown_selected_id).attr("elementId");
            projectionUtil.getShieldsOfShieldType(data.shieldId, hotlinkData, isBiview);
            $("#saveData").hide();
            break;
        }
        case backing.view_type.permission_view.key: {
            $("#saveData").hide();
            break;
        }
        case backing.view_type.guidance_view.key: {
            $("#saveData").show();
            backing.view_type.guidance_view.eventCalled = true;
            let elementId = $("#" + divId).attr("shieldelementid");
            let data = {elementId};
            let obj = {};
            obj.elementId = element[ATTR.elementId];
            obj.objectType = element[ATTR.objectType];
            service.getGuidances(data, function (res, err) {
                if (res) {
                    divIdWrapper.remove();
                    generateUniqueIdAndParentLink(res, backing.view_type.guidance_view.name, null);

                    function callback(elementRes) {
                        elementRes.uniqueId = uniqueId;
                        renderGuidanceView(res, divId, elementRes, backing.view_type.guidance_view, isBiview);
                        renderDirectoryViewForGuidanceView(res, divId, backing.view_type.guidance_view, view);
                        backing.view_type.guidance_view.eventCalled = false;
                        $("#saveData").hide();
                    }

                    serviceFunctions.getElementInfo(callback, obj);
                }
                else if (err) {
                    errorHandler(err);
                    $("#saveData").hide();
                }
            });
            break;
        }
        case backing.view_type.test_procedure_view.key: {
            backing.view_type.test_procedure_view.eventCalled = true;
            $("#saveData").show();
            let elementId = $("#" + divId).attr("shieldelementid");
            let data = {elementId};
            let obj = {};
            obj.elementId = element[ATTR.elementId];
            obj.objectType = element[ATTR.objectType];
            service.getTestProcedures(data, function (res, err) {
                if (res) {
                    divIdWrapper.remove();
                    generateUniqueIdAndParentLink(res, backing.view_type.test_procedure_view.name, null);

                    function callback(elementRes) {
                        elementRes.uniqueId = uniqueId;
                        renderGuidanceView(res, divId, elementRes, backing.view_type.test_procedure_view, isBiview);
                        renderDirectoryViewForGuidanceView(res, divId, backing.view_type.test_procedure_view, view);
                        $("#saveData").hide();
                        backing.view_type.test_procedure_view.eventCalled = false;
                    }

                    serviceFunctions.getElementInfo(callback, obj);
                }
                else if (err) {
                    errorHandler(err);
                    $("#saveData").hide();
                }
            });
            break;
        }
        case backing.view_type.source_view.key: {
            $("#saveData").show();
            service.getSourcesDv(null, function (res, err) {
                if (res) {
                    generateUniqueIdAndParentLink(res, backing.view_type.source_view.name, null);
                    renderDirectoryViewForGuidanceView(res, divId, backing.view_type.source_view, view);
                    $("#saveData").hide();
                }
                else if (err) {
                    errorHandler(err);
                    $("#saveData").hide();
                }
            });
            break;
        }
        case backing.view_type.create_role_view.key: {
            $("#saveData").hide();
            break;
        }
        case backing.view_type.create_user_view.key: {
            $("#saveData").hide();
            break;
        }
    }
    highlightHotlinks(isBiview);
}

function checkInsideArray(array, element) {
    let shield;
    for (let i = 0; i < array.length; i++) {
        if (array[i].elementId === parseInt(element)) {
            shield = array[i];
        }
    }
    return shield;
}
