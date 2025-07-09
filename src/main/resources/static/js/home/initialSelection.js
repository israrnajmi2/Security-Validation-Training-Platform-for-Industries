$(document).ready(function () {

    $("#headerLabelId").dblclick(function () {
        $(this).hide();
        $('#headerLabelTextAreaId').val($(this).html()).show().focus();
    });

    function onHeaderLabelBlurOrEnter(self) {
        const value = self.val();
        if(value && value.trim()) {
            $('#headerLabelTextAreaId').hide();
            $('#headerLabelId').html(value).show();
            localStorage.setItem(`${encodeURIComponent(window.location.hostname)}-headerLabel`, value);
        } else {
            $('#headerLabelTextAreaId').hide();
            $('#headerLabelId').show();
        }
    }

    $("#headerLabelTextAreaId").blur(function () {
        onHeaderLabelBlurOrEnter($(this));
    });

    $('#headerLabelTextAreaId').keypress(function(event) {
        if (event.keyCode == 13) {
            onHeaderLabelBlurOrEnter($(this));
        }
    });

    //added for drag_and_drop_save_btn click by Manish
    $(document).on("click", "#drag_and_drop_save_btn", function (e) {
        let activeDesktop = getActiveDesktop();
        activeDesktop.utilsFunction.saveDragAndDrop();
    });

    $(document).on("click", "#cncl_drag_and_drop_save_btn", function (e) {
        let isBiview = !($(this).closest(".desktop").hasClass("single-desktop"));
        let activeDesktop = getActiveDesktop(isBiview);
        activeDesktop.utilsFunction.fullRefresh();
        e.stopPropagation();
        $(this).addClass("dis-none");
    });
    // added toggle refid button by manish
    $(document).on("click", "#toggle_btn", function (e) {     
        if($('.d-text-refId').is(':visible'))
           $('.d-text-refId').hide();
        else 
           $('.d-text-refId').show();  
    });

    $(document).on("click", "#bi_drag_and_drop_save_btn", function (e) {
        let activeDesktop = getActiveDesktop(true);
        activeDesktop.utilsFunction.saveDragAndDrop();
    });

    $(document).on("click", "#bi_cncl_drag_and_drop_save_btn", function (e) {
        let isBiview = !($(this).closest(".desktop").hasClass("single-desktop"));
        let activeDesktop = getActiveDesktop(isBiview);
        activeDesktop.utilsFunction.fullRefresh();
        e.stopPropagation();
        $(this).addClass("dis-none");
    });
    
    $(document).on("click", ".leftWorkspaceList,.leftDesktopList", function () {
        if ($(this).hasClass("leftWorkspaceList")) {
            selectWorkspace($(this), "singleview");
        }
        else if ($(this).hasClass("leftDesktopList")) {
            updateSelectorOnDesktops($(this), false);
            selectDesktopSingleCase($(this));
        }
        repositionViews(false);
        applyEventsToActiveScreens();
    });

    $(document).ready(function () {
        $(document).on("click", ".rightWorkspaceList", function () {
            openParallelBiView=false;
            selectWorkspace($(this), "biview");
            repositionViews(false);
            applyEventsToActiveScreens();
        });
        $(document).on("click", ".rightDesktopList", function () {
            updateSelectorOnDesktops($(this), true);
            selectDesktopBiCase($(this));
            repositionViews(false);
            applyEventsToActiveScreens();
        });
    });

    $(document).on("click", ".modeSelectionWrapper", function (e) {
        $("#headerContent").find(".modesDropDownContent").removeClass("dis-none");
        e.stopPropagation();
    });
 
    $(document).on("mouseleave", ".modeSelectionWrapper", function (e) {
        $("#headerContent").find(".modesDropDownContent").addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".mode", function (e) {
        $("#headerContent").find(".modesDropDownContent").addClass("dis-none");
        modeSelectionClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".userRolesSelection", function (e) {
        $(this).find(".rolesDropDownContent").removeClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".userRoleSelector", function (e) {
        $("#headerContent").find(".rolesDropDownContent").addClass("dis-none");
        getLoginUser();
        e.stopPropagation();
    });

    $(document).on("mouseleave", ".rolesDropDownContent", function (e) {
        $("#headerContent").find(".rolesDropDownContent").addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("mouseleave", ".userRolesSelection", function (e) {
        $(this).find(".rolesDropDownContent").addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".loginUserName", function (e) {
        $(this).find(".userDropDownContent").removeClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("mouseleave", ".loginUserName", function (e) {
        $(this).find(".userDropDownContent").addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".userEvents", function (e) {
        $("#headerContent").find(".rolesDropDownContent").addClass("dis-none");
        renderEventSelected($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".savePassword", function (e) {
        let minNumberofChars = 8;
        var regularExpression = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        let desktop = $(this).closest(".innerDesktop");
        let data = {};
        data.oldPassword = desktop.find(".oldPw").val();
        data.newPassword = desktop.find(".newPw").val();
        let confirmPassword = desktop.find(".confirmPw").val();
        if (data.newPassword.length < minNumberofChars || !regularExpression.test(data.newPassword)) {
            alert("password should contain at least one Uppercase, one lowercase, one number and one special character");
            return;
        }
        else if (data.newPassword !== confirmPassword) {
            alert("The New password and confirm Password doesn't match");
            return;
        }
        else {
            service.resetPassword(data, function (res, err) {
                if (res) {
                    alert("Reset Password Successful");
                    desktop.remove();
                    $("#popUp").addClass("dis-none");
                } else if (err)
                    errorHandler(err);
            });
        }
    });

    $(document).on("click", ".saveUserProfile", function (e) {
        let desktop = $(this).closest(".innerDesktop");
        let data = {};
        data.firstName = desktop.find(".firstNameInput").val().trim();
        data.lastName = desktop.find(".lastNameInput").val().trim();
        data.location = desktop.find(".location").val().trim();
        data.mobileNo = desktop.find(".mobileNo").val().trim();
        let phoneno = /^[- +()]*[0-9][- +()0-9]*$/;
        data.organizationalUnitId = desktop.find(".organisationalDirectory").attr("elementId");
        if ((typeof data.firstName === "undefined") || (data.firstName === "") || (typeof data.lastName === "undefined") || (data.lastName === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        else if ((typeof data.organizationalUnitId === "undefined") || (data.organizationalUnitId === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        else if (data.mobileNo !== "" && data.mobileNo.match(phoneno) === null) {
            alert("Please enter valid mobile number");
            return;
        }
        else {
            service.editLoginUser(data, function (res, err) {
                if (res) {
                    alert("Edited Profile Successfully");
                    desktop.remove();
                    $("#popUp").addClass("dis-none");
                    let event = {"key": backing.event_type.edited_user.key};
                    propagateEvent(event);
                }
                else if (err)
                    errorHandler(err);
            });
        }
    });
});


function setHeaderLabel() {
    let initialValue = 'Security Validation Platform';
    const headerLabelFromLocalStorage = localStorage.getItem(`${encodeURIComponent(window.location.hostname)}-headerLabel`);
    if(headerLabelFromLocalStorage)
        initialValue = headerLabelFromLocalStorage;
    $('#headerLabelTextAreaId').hide();
    $('#headerLabelId').html(initialValue).show();
}

function updateSelectorOnDesktops(clicked_desktop_li, isBiview) {
    let backingView, claWorkspace, stdWorkspace, businessWorkspace, evalWorkspace,threatWorkspace;
    if (isBiview) {
        let biWorkspaces = backing.biview.workspaces;
        backingView = backing.biview;
        claWorkspace = biWorkspaces.bi_cla_workspace.desktops;
        stdWorkspace = biWorkspaces.bi_std_workspace.desktops;
        businessWorkspace = biWorkspaces.bi_business_workspace.desktops;
        evalWorkspace = biWorkspaces.bi_eval_workspace.desktops;
        threatWorkspace = biWorkspaces.bi_threat_workspace.desktops;
    }
    else {
        let singleViewWorkspaces = backing.singleview.workspaces;
        backingView = backing.singleview;
        claWorkspace = singleViewWorkspaces.cla_workspace.desktops;
        stdWorkspace = singleViewWorkspaces.std_workspace.desktops;
        businessWorkspace = singleViewWorkspaces.business_workspace.desktops;
        evalWorkspace = singleViewWorkspaces.eval_workspace.desktops;
        threatWorkspace = singleViewWorkspaces.threat_workspace.desktops;
    }
    let span_inside_li = clicked_desktop_li.children().eq(0);
    if (span_inside_li) {
        let desktopKeyName = span_inside_li.attr("desktopKeyName");
        backingView.active_desktop.keyname = desktopKeyName;
        switch (desktopKeyName) {
            case claWorkspace.shield_schema_desktop.key:
                updateSelectorForGivenDesktops(claWorkspace.shield_schema_desktop, claWorkspace.classification_map_mode_desktop);
                // updateLastUsedFramework(claWorkspace.shield_schema_desktop,lufShieldId);

                break;

            case claWorkspace.classification_map_mode_desktop.key:
                updateSelectorForGivenDesktops(claWorkspace.classification_map_mode_desktop, claWorkspace.shield_schema_desktop);
                // updateLastUsedFramework(claWorkspace.classification_map_mode_desktop,lufShieldId);
                break;

                //added by Manish for Single LUF selector
            case claWorkspace.asset_map_mode_desktop.key:

                /*if(lufShieldId!==$("#" + claWorkspace.asset_map_mode_desktop.selector.expression_dropdown_selected_id).attr("shieldid")){
                    claWorkspace.asset_map_mode_desktop.utilsFunction.shieldSelectorClick($("#" + claWorkspace.asset_map_mode_desktop.selector.expression_dropdown_id).find("li[shieldid = " + lufShieldId + "]"));
                }*/

                break;

            case claWorkspace.asset_type_map_mode_desktop.key:
               
                /*if(lufShieldId!==$("#" + claWorkspace.asset_type_map_mode_desktop.selector.expression_dropdown_selected_id).attr("shieldid")){
                    claWorkspace.asset_type_map_mode_desktop.utilsFunction.shieldSelectorClick($("#" + claWorkspace.asset_type_map_mode_desktop.selector.expression_dropdown_id).find("li[shieldid = " + lufShieldId + "]"));
                }*/

                break;


            case stdWorkspace.standard_schema_desktop.key:
                updateSelectorForGivenDesktops(stdWorkspace.standard_schema_desktop, stdWorkspace.standard_map_mode_desktop);
                // updateLastUsedFramework(stdWorkspace.standard_schema_desktop,stdLufId);
                break;
            case stdWorkspace.standard_map_mode_desktop.key:
                updateSelectorForGivenDesktops(stdWorkspace.standard_map_mode_desktop, stdWorkspace.standard_schema_desktop);
                // updateLastUsedFramework(stdWorkspace.standard_map_mode_desktop,stdLufId);
                break;
            case businessWorkspace.business_schema_desktop.key:
                updateSelectorForGivenDesktops(businessWorkspace.business_schema_desktop, businessWorkspace.business_map_mode_desktop);
                // updateLastUsedFramework(businessWorkspace.business_schema_desktop,busLufId);
                break;

            case businessWorkspace.business_map_mode_desktop.key:
                updateSelectorForGivenDesktops(businessWorkspace.business_map_mode_desktop, businessWorkspace.business_schema_desktop);
                // updateLastUsedFramework(businessWorkspace.business_map_mode_desktop,busLufId);
                break;

                //added by Manish for Single LUF selector
            case businessWorkspace.business_asset_type_map_mode_desktop.key:
                // updateLastUsedFrameworkExpressionSelector(businessWorkspace.business_asset_type_map_mode_desktop,busAssetLufId);
                
                /*if(busAssetLufId && busAssetLufId!==$("#" + businessWorkspace.business_asset_type_map_mode_desktop.selector.expression_dropdown_selected_id).attr("shieldid")){
                    businessWorkspace.business_asset_type_map_mode_desktop.utilsFunction.shieldSelectorClick($("#" +  businessWorkspace.business_asset_type_map_mode_desktop.selector.expression_dropdown_id).find("li[shieldid = " + busAssetLufId + "]"));
                }*/

                break;
            case businessWorkspace.business_asset_map_mode_desktop.key:
                // updateLastUsedFrameworkExpressionSelector(businessWorkspace.business_asset_map_mode_desktop,busAssetLufId);
                /*if(busAssetLufId && busAssetLufId!==$("#" + businessWorkspace.business_asset_map_mode_desktop.selector.expression_dropdown_selected_id).attr("shieldid")){
                    businessWorkspace.business_asset_map_mode_desktop.utilsFunction.shieldSelectorClick($("#" +  businessWorkspace.business_asset_map_mode_desktop.selector.expression_dropdown_id).find("li[shieldid = " + busAssetLufId + "]"));
                }*/

                break;

            case evalWorkspace.ruler_type_desktop.key:
                updateSelectorForGivenDesktops(evalWorkspace.ruler_type_desktop, evalWorkspace.shield_element_ruler_type_desktop);
                // updateLastUsedFramework(evalWorkspace.ruler_type_desktop,evalLufId);
                break;
            case evalWorkspace.shield_element_ruler_type_desktop.key:
                updateSelectorForGivenDesktops(evalWorkspace.shield_element_ruler_type_desktop, evalWorkspace.ruler_type_desktop);
                //updateLastUsedFramework(evalWorkspace.shield_element_ruler_type_desktop,evalLufId);
                break;
            case threatWorkspace.threat_schema_desktop.key:
                updateSelectorForGivenDesktops(threatWorkspace.threat_schema_desktop, threatWorkspace.threat_map_mode_desktop);
                // updateLastUsedFramework(threatWorkspace.threat_schema_desktop,threatLufId);
                break;
            case threatWorkspace.threat_map_mode_desktop.key:
                updateSelectorForGivenDesktops(threatWorkspace.threat_map_mode_desktop, threatWorkspace.threat_schema_desktop);
                // updateLastUsedFramework(threatWorkspace.threat_map_mode_desktop,threatLufId);
                break;
        }
    }
}

function updateLastUsedFrameworkExpressionSelector(desktop,lufId) {
    if(lufId!==$("#" + desktop.selector.expression_dropdown_selected_id).attr("shieldid")){
        desktop.utilsFunction.shieldSelectorClick($("#" + desktop.expression_dropdown_id).find("li[shieldid = " + lufId + "]"));
    }
}

function updateLastUsedFramework(desktop,lufId) {
    if(lufId!==$("#" + desktop.selector.shield_dropdown_selected_id).attr("elementId")){
        desktop.utilsFunction.shieldSelectorClick($("#" + desktop.selector.shield_dropdown_id).find("li[elementId = \"" + lufId + "\"]"));
    }
}

function updateSelectorForGivenDesktops(desktop1, desktop2) {
    let id = $("#" + desktop2.selector.shield_dropdown_selected_id).attr("elementId");
    if ($("#" + desktop1.selector.shield_dropdown_selected_id).attr("elementId") === undefined) {
        desktop1.previousSelectors = {};
        desktop1.previousSelectors.shieldSelectorId = id;
    }
    else {
        if ($("#" + desktop2.selector.shield_dropdown_selected_id).attr("elementId") !== $("#" + desktop1.selector.shield_dropdown_selected_id).attr("elementId")) {
            closeOpenedViewsOfGiveDesktop(desktop1);
            desktop1.utilsFunction.shieldSelectorClick($("#" + desktop1.selector.shield_dropdown_id).find("li[elementId = \"" + id + "\"]"));
        }
    }
}

function closeOpenedViewsOfGiveDesktop(desktop) {
    if (desktop.opened_views) {
        for (let k = 0; k < desktop.opened_views.length; k++) {
            $("#" + desktop.opened_views[k].div_id).remove();
        }
        desktop.opened_views = [];
    }
}

function initialSelection() {
    getLoginUser();
    service.getToolMode(null, function (res, err) {
        if (!res) {
            if (err) errorHandler(err);
        } else {
            if (res.name === "direct" || res.name === "both_direct_and_expression")
                backing.isDirectMode = true;
            renderContentForModeSelectionDropDown(res.name);
            setDesktopsBasedOnMode();
            backing.userToolMode = res.name;
        }
    });
    selectWorkspace($("#" + backing.singleview.workspace_selector_id + " ul:first li:first"), "singleview");
}


function initialBiviewSelection() {

    // added by manish for parallel bi view
    if(openParallelBiView){
        let biWorkspace="bi_"+backing.singleview.active_workspace_keyname;
        selectWorkspace($("#" + backing.biview.workspace_selector_id + " ul:first li[keyname="+biWorkspace+"]"), "biview");
    }else{
        selectWorkspace($("#" + backing.biview.workspace_selector_id + " ul:first li:first"), "biview");
    }

    changeLeftView();
    $("#bi-content-wrapper").toggleClass("dis-none");

}

function changeLeftView() {
    $("#single-content-wrapper").toggleClass("singleView-desktop");
}

function selectWorkspace(clicked_workspace_li, view) {
    if (view === "singleview") {
        $(".leftWorkspaceList").removeClass("selected");
        clicked_workspace_li.addClass("selected");
        backing.singleview.active_workspace_keyname = clicked_workspace_li.attr("keyname");
    }
    else if (view === "biview") {
        $(".rightWorkspaceList").removeClass("selected");
        clicked_workspace_li.addClass("selected");

        // added by manish
        if(openParallelBiView){
            let activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
            let activeDesktopKeyname = backing.singleview.active_desktop.keyname;
            backing.biview.active_workspace_keyname = "bi_"+activeWorkspaceKeyname;
            backing.biview.active_desktop.keyname=activeDesktopKeyname;
        }else{
            backing.biview.active_workspace_keyname = clicked_workspace_li.attr("keyname");
        }       
    }
    renderDesktopItems(view);
}

function selectDesktopLiWithIndex(workspaceKeyname, selectorId, i, j, k) {
    let first_desktop_li;
    switch (workspaceKeyname) {
        /*case "cla_workspace":
            first_desktop_li = $("#" + selectorId + " ul:first li:nth-child(" + k + ")");
            break;
        case "std_workspace":
            first_desktop_li = $("#" + selectorId + " ul:first li:nth-child(" + k + ")");
            break;
        case "business_workspace":
            first_desktop_li = $("#" + selectorId + " ul:first li:nth-child(" + k + ")");
            break;
        case "threat_workspace":
            first_desktop_li = $("#" + selectorId + " ul:first li:nth-child(" + k + ")");
            break;
        case "bi_cla_workspace":
            first_desktop_li = $("#" + selectorId + " ul:first li:nth-child(" + k + ")");
            break;
        case "bi_std_workspace":
            first_desktop_li = $("#" + selectorId + " ul:first li:nth-child(" + k + ")");
            break;
        case "bi_business_workspace":
            first_desktop_li = $("#" + selectorId + " ul:first li:nth-child(" + k + ")");
            break;
        case "bi_threat_workspace":
            first_desktop_li = $("#" + selectorId + " ul:first li:nth-child(" + k + ")");
            break;*/
        case "expression_workspace":
            first_desktop_li = $("#" + selectorId + " ul:first li:nth-child(" + k + ")");
            break;
        case "bi_expression_workspace":
            first_desktop_li = $("#" + selectorId + " ul:first li:nth-child(" + k + ")");
            break;
        default:
            first_desktop_li = $("#" + selectorId + " ul:first li:first");
            break;
    }
    return first_desktop_li;
}

function renderDesktopItems(view) {
    let currentView, desktopList;
    let desktopIndexToSkip;
    let viewId;
    let parallelDesktopIndex;

    if (view && view === "singleview") {
        viewId = "single";
        currentView = backing.singleview;
        desktopList = "leftDesktopList";
    }
    else if (view && view === "biview") {
        viewId = "bi";
        currentView = backing.biview;
        desktopList = "rightDesktopList";
    }
    let selectorId = currentView.desktop_selector_id;
    let $selectorId = $("#" + selectorId);

    $selectorId.html("");

    if (currentView.active_workspace_keyname == null)
        return;

    let desktops = Object.values(currentView.workspaces[currentView.active_workspace_keyname].desktops);

    let str = "<div class=\"dekstop-header-icon-wrapper nav-header-icon-wrapper\">" +
        "<span class=\"centerPosition flaticon-desktop\" title=\"Desktop\"></span>" +
        "</div>";
    str += "<ul class=\"desktops\" >";
    for (let i = 0; i < desktops.length; i++) {

        //added by Manish get index of parallet desktop 
        if (view && view === "biview"){
            if(currentView.active_desktop.keyname && currentView.active_desktop.keyname===desktops[i].key){
                parallelDesktopIndex=i+1;
            }
        }

        if (desktopIndexToSkip && desktopIndexToSkip === i)
            str += "<li class=\"" + desktopList + " dis-none\" title=\"" + desktops[i].full_name + "\" id=\"" + viewId + "_" + desktops[i].key + "\"><span class=\"" + desktops[i].subScriptIcon + " subscriptIcon\" desktopKeyName=\"" + desktops[i].key + "\"></span><span class=\"desktopList centerPosition " + desktops[i].icon + "\" ></span></li>";
        else
            str += "<li class=\"" + desktopList + "\" title=\"" + desktops[i].full_name + "\" id=\"" + viewId + "_" + desktops[i].key + "\"><span class=\"" + desktops[i].subScriptIcon + " subscriptIcon\" desktopKeyName=\"" + desktops[i].key + "\"></span><span class=\"desktopList centerPosition " + desktops[i].icon + "\" ></span></li>";
    }
    str += "</ul>";
    $selectorId.html(str);

    let first_desktop_li;

    //added by Manish get index of parallet desktop 
    if(parallelDesktopIndex && view && view === "biview"){
        first_desktop_li = first_desktop_li = $("#" + selectorId + " ul:first li:nth-child(" + parallelDesktopIndex + ")");
    }else{
        first_desktop_li = selectDesktopLiWithIndex(currentView.active_workspace_keyname, selectorId, 3, 4, 2);
    }
    updateSelectorOnDesktops(first_desktop_li,(view === "singleview")?false:true);
    (view === "singleview") ? selectDesktopSingleCase(first_desktop_li) : selectDesktopBiCase(first_desktop_li);
}

function selectDesktopSingleCase(clicked_desktop_li) {
    let singleViewWorkspaces = backing.singleview.workspaces;
    let claWorkspace = singleViewWorkspaces.cla_workspace.desktops;
    let stdWorkspace = singleViewWorkspaces.std_workspace.desktops;
    let threatWorkspace = singleViewWorkspaces.threat_workspace.desktops;
    let businessWorkspace = singleViewWorkspaces.business_workspace.desktops;
    let expWorkspace = singleViewWorkspaces.expression_workspace.desktops;
    let evalWorkspace = singleViewWorkspaces.eval_workspace.desktops;
    let adminWorkspace = singleViewWorkspaces.administration_workspace.desktops;
    let span_inside_li = clicked_desktop_li.children().eq(0);
    if (span_inside_li) {
        let desktopKeyName = span_inside_li.attr("desktopKeyName");
        backing.singleview.active_desktop.keyname = desktopKeyName;
        $(".leftDesktopList").removeClass("activeClass");
        clicked_desktop_li.addClass("activeClass");
        switch (desktopKeyName) {
            case claWorkspace.shield_schema_desktop.key:
                handleShowShieldSchemaDesktopSingleViewCase();
                break;
            case claWorkspace.classification_map_mode_desktop.key:
                handleShowClassificationMapModeDesktopSingleViewCase();
                break;
            case stdWorkspace.standard_schema_desktop.key:
                handleShowStandardSchemaDesktopSingleViewCase();
                break;
            case stdWorkspace.standard_map_mode_desktop.key:
                handleShowStandardMapModeDesktopSingleViewCase();
                break;
            case threatWorkspace.threat_schema_desktop.key:
                handleShowThreatSchemaDesktopSingleViewCase();
                break;
            case threatWorkspace.threat_map_mode_desktop.key:
                handleShowThreatMapModeDesktopSingleViewCase();
                break;
            case businessWorkspace.business_schema_desktop.key:
                handleShowBusinessSchemaDesktopSingleViewCase();
                break;
            case businessWorkspace.business_map_mode_desktop.key:
                handleShowBusinessMapModeDesktopSingleViewCase();
                break;
            case businessWorkspace.business_asset_desktop.key:
                handleShowBusinessAssetDesktopSingleViewCase();
                break;
            case businessWorkspace.business_asset_map_mode_desktop.key:
                handleShowBusinessAssetMapModeDesktopSingleViewCase();
                break;
            case businessWorkspace.business_asset_type_desktop.key:
                handleShowBusinessAssetTypeDesktopSingleViewCase();
                break;
            case businessWorkspace.business_asset_type_map_mode_desktop.key:
                handleShowBusinessAssetTypeMapModeDesktopSingleViewCase();
                break;
            case businessWorkspace.business_provider_desktop.key:
                handleShowBusinessProviderDesktopSingleViewCase();
                break;
            case evalWorkspace.ruler_type_desktop.key:
                handleShowRulerTypeDesktopSingleViewCase();
                break;
            case evalWorkspace.shield_element_ruler_type_desktop.key:
                handleShowShieldElementRulerTypeDesktopSingleViewCase();
                break;
            case claWorkspace.asset_desktop.key:
                handleShowAssetDesktopSingleViewCase();
                break;
            case claWorkspace.asset_map_mode_desktop.key:
                handleShowAssetMapModeDesktopSingleViewCase();
                break;
            case claWorkspace.asset_type_desktop.key:
                handleShowAssetTypeDesktopSingleViewCase();
                break;
            case claWorkspace.asset_type_map_mode_desktop.key:
                handleShowAssetTypeMapModeDesktopSingleViewCase();
                break;
            case claWorkspace.provider_desktop.key:
                handleShowProviderDesktopSingleViewCase();
                break;
            case expWorkspace.expression_desktop.key:
                handleShowExpressionDesktopSingleViewCase();
                break;
            case expWorkspace.anz_expression_desktop.key:
                handleShowAnzExpressionDesktopSingleViewCase();
                break;
            case expWorkspace.objective_parameter_desktop.key:
                handleShowObjectiveParameterDesktopSingleViewCase();
                break;
            case expWorkspace.method_parameter_desktop.key:
                handleShowMethodParameterDesktopSingleViewCase();
                break;
            case expWorkspace.content_parameter_desktop.key:
                handleShowContentParameterDesktopSingleViewCase();
                break;
            case expWorkspace.subject_parameter_desktop.key:
                handleShowSubjectParameterDesktopSingleViewCase();
                break;
            case adminWorkspace.organisational_unit_desktop.key:
                handleShowOrganisationalUnitDesktopSingleViewCase();
                break;
            case adminWorkspace.users_desktop.key:
                handleShowUsersSingleViewCase();
                break;
            case adminWorkspace.roles_desktop.key:
                handleShowRolesSingleViewCase();
                break;
            default:
                alert("Unknown desktop keyname " + desktopKeyName + " Please check with developer");
        }
    }
}

function selectDesktopBiCase(clicked_desktop_li) {
    let biViewWorkspaces = backing.biview.workspaces;
    let claWorkspace = biViewWorkspaces.bi_cla_workspace.desktops;
    let stdWorkspace = biViewWorkspaces.bi_std_workspace.desktops;
    let threatWorkspace = biViewWorkspaces.bi_threat_workspace.desktops;
    let businessWorkspace = biViewWorkspaces.bi_business_workspace.desktops;
    let expWorkspace = biViewWorkspaces.bi_expression_workspace.desktops;
    let evalWorkspace = biViewWorkspaces.bi_eval_workspace.desktops;
    let adminWorkspace = biViewWorkspaces.bi_administration_workspace.desktops;
    let span_inside_li = clicked_desktop_li.children().eq(0);
    if (span_inside_li) {
        let desktopKeyName = span_inside_li.attr("desktopKeyName");
        backing.biview.active_desktop.keyname = desktopKeyName;
        $(".rightDesktopList").removeClass("activeClass");
        clicked_desktop_li.addClass("activeClass");
        switch (desktopKeyName) {
            case claWorkspace.shield_schema_desktop.key:
                handleShowShieldSchemaDesktopBiViewCase();
                break;
            case claWorkspace.classification_map_mode_desktop.key:
                handleShowClassificationMapModeDesktopBiViewCase();
                break;
            case stdWorkspace.standard_schema_desktop.key:
                handleShowStandardSchemaDesktopBiViewCase();
                break;
            case stdWorkspace.standard_map_mode_desktop.key:
                handleShowStandardMapModeDesktopBiViewCase();
                break;
            case threatWorkspace.threat_schema_desktop.key:
                handleShowThreatSchemaDesktopBiViewCase();
                break;
            case threatWorkspace.threat_map_mode_desktop.key:
                handleShowThreatMapModeDesktopBiViewCase();
                break;
            case businessWorkspace.business_schema_desktop.key:
                handleShowBusinessSchemaDesktopBiViewCase();
                break;
            case businessWorkspace.business_map_mode_desktop.key:
                handleShowBusinessMapModeDesktopBiViewCase();
                break;
            case businessWorkspace.business_asset_desktop.key:
                handleShowBusinessAssetDesktopBiViewCase();
                break;
            case businessWorkspace.business_asset_map_mode_desktop.key:
                handleShowBusinessAssetMapModeDesktopBiViewCase();
                break;
            case businessWorkspace.business_asset_type_desktop.key:
                handleShowBusinessAssetTypeDesktopBiViewCase();
                break;
            case businessWorkspace.business_asset_type_map_mode_desktop.key:
                handleShowBusinessAssetTypeMapModeDesktopBiViewCase();
                break;
            case businessWorkspace.business_provider_desktop.key:
                handleShowBusinessProviderDesktopBiViewCase();
                break;
            case evalWorkspace.ruler_type_desktop.key:
                handleShowRulerTypeDesktopBiViewCase();
                break;
            case evalWorkspace.shield_element_ruler_type_desktop.key:
                handleShowShieldElementRulerTypeDesktopBiViewCase();
                break;
            case claWorkspace.asset_desktop.key:
                handleShowAssetDesktopBiViewCase();
                break;
            case claWorkspace.asset_map_mode_desktop.key:
                handleShowAssetMapModeDesktopBiViewCase();
                break;
            case claWorkspace.asset_type_desktop.key:
                handleShowAssetTypeDesktopBiViewCase();
                break;
            case claWorkspace.asset_type_map_mode_desktop.key:
                handleShowAssetTypeMapModeDesktopBiViewCase();
                break;
            case claWorkspace.provider_desktop.key:
                handleShowProviderDesktopBiViewCase();
                break;
            case expWorkspace.expression_desktop.key:
                handleShowExpressionDesktopBiViewCase();
                break;
            case expWorkspace.anz_expression_desktop.key:
                handleShowAnzExpressionDesktopBiViewCase();
                break;
            case expWorkspace.objective_parameter_desktop.key:
                handleShowObjectiveParameterDesktopBiViewCase();
                break;
            case expWorkspace.method_parameter_desktop.key:
                handleShowMethodParameterDesktopBiViewCase();
                break;
            case expWorkspace.content_parameter_desktop.key:
                handleShowContentParameterDesktopBiViewCase();
                break;
            case expWorkspace.subject_parameter_desktop.key:
                handleShowSubjectParameterDesktopBiViewCase();
                break;
            case adminWorkspace.organisational_unit_desktop.key:
                handleShowOrganisationalUnitDesktopBiViewCase();
                break;
            case adminWorkspace.users_desktop.key:
                handleShowUsersDesktopBiViewCase();
                break;
            case adminWorkspace.roles_desktop.key:
                handleShowRolesDesktopBiViewCase();
                break;
            default:
                alert("Unknown desktop keyname " + desktopKeyName + " Please check with developer");
        }
    }
}

function renderEventSelected(selector) {
    let event = selector.attr("id");
    switch (event) {
        case "Change Password": {
            renderChangePasswordPopUp();
            break;
        }
        case "Delete Account": {
            service.deleteAccount(null, function (res, err) {
                if (res) {
                    alert("Deleted account successfully");
                    window.location.href = "/logout";
                } else if (err)
                    errorHandler(err);
            });
            break;
        }
        case "Edit Profile": {
            service.getLoggedInUserDetails(null, function (res, err) {
                if (!res) {
                    if (err) errorHandler(err);
                } else {
                    renderEditProfilePopUp(res.sphericUserInfo);
                }
            });
            break;
        }
    }
}

function renderEditProfilePopUp(res) {
    let str = "";
    let viewClass = "singleview";
    let viewName = "popOverlay";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + viewClass + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    str += "<span class=\"panel-header\">EDIT PROFILE</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close tooltip tooltipstered close-btn closePopUp\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\">" +
        `<span class="headerActionButton saveUserProfile">SAVE</span>` +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">FIRST NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"firstNameInput\" value=\"" + res.firstName + "\"/></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">LAST NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"lastNameInput\" value=\"" + res.lastName + "\"/></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">LOCATION:</label><input class=\"location\" value=\"" + res.location + "\"/></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">MOBILE NO:</label><input type=\"tel\" class=\"mobileNo\" value=\"" + res.mobileNo + "\"/></li>" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label class=\"\">ORGANIZATIONAL UNIT<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"organisationalDirectory hierarchySelected\" readonly/>" +
        "<div id=\"" + viewName + "org\" class=\"organisationalDirectoryDropDown hierarchyDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearOrgDirectory\">CLEAR</span></li>" +
        "</ul>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
    getDataForOrgUnit(viewName, res.organizationalUnitId);
    $("#" + viewName).find('input.oldPw').focus();
}

function renderChangePasswordPopUp() {
    let str = "";
    let viewClass = "singleview";
    let viewName = "popOverlay";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + viewClass + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    str += "<span class=\"panel-header\">CHANGE PASSWORD</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close tooltip tooltipstered close-btn closePopUp\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\">" +
        `<span class="headerActionButton savePassword">SAVE</span>` +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        `<label>OLD PASSWORD<span style="color:#ec4c4c;">*</span>:</label><input class="oldPw" type=\"password\"></li>` +
        "<li class=\"create-shield-field\">" +
        `<label>NEW PASSWORD<span style="color:#ec4c4c;">*</span>:</label><input class="newPw" type="password"></li>` +
        "<li class=\"create-shield-field\">" +
        `<label>CONFIRM PASSWORD<span style="color:#ec4c4c;">*</span>:</label><input class="confirmPw" type="password"></li>` +
        "</ul>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
    $("#" + viewName).find('input.oldPw').focus();
}

function renderContentForModeSelectionDropDown(userMode) {
    let str = "<ul>";
    let modes = (userMode === "direct") ? ["Direct Mode"] : (userMode === "expression") ?
        ["Expression Mode"] : ["Direct Mode", "Expression Mode"];
    let i;
    for (i = 0; i < modes.length; i++) {
        str += "<li class=\"mode\" id=\"" + modes[i] + "\">" + modes[i].toUpperCase() + "</li>";
    }
    str += "</ul>";
    $("#headerContent").find(".modesDropDownContent").html(str);
    modeSelectionClick($(".modesDropDownContent ul:first li:first"));
}

function modeSelectionClick(selectedMode) {
    let type = selectedMode.attr("id");
    let selected = $(".selectedMode");
    switch (type) {
        case "Direct Mode": {
            backing.isDirectMode = true;
            $(".tree_structure_parent ul li").attr("style", "min-width:100%;");
            $(".ingestMap").removeClass("dis-none");
            selected.html("Direct Mode");
            $(".expressionModeRow").addClass("dis-none");
            $(".addPadding").removeClass("paddingLeft");
            break;
        }
        case "Expression Mode": {
            backing.isDirectMode = false;
            $(".tree_structure_parent ul li").attr("style", "min-width:100%;");
            $(".ingestMap").addClass("dis-none");
            selected.html("Expression Mode");
            $(".expressionModeRow").removeClass("dis-none");
            $(".addPadding").addClass("paddingLeft");
            break;
        }
    }
    closeAllOpenedViews();
    setDesktopsBasedOnMode();
    checkIfOpenedViewIsEvalOrExpression(type);
    let event = {"key": backing.event_type.modified_spheric_mode.key};
    propagateEvent(event);
    if (backing.is_bi_view_active) {
        repositionViews(true);
    }
    else {
        repositionViews(false);
    }
    $("#saveData").hide();
}

function getAllShieldElementTypes(cb) {
    service.getAllShieldElementTypesForAllShields(null, function (res, err) {
        if (!res) {
            if (err) errorHandler(err);
        } else {
            backing.allShieldElementTypes = res;
            serviceFunctions.getAllShieldAndStandardSchema(cb);
        }
    });
}

function getLoginUser() {
    service.getLoggedInUserDetails(null, function (res, err) {
        if (!res) {
            if (err) errorHandler(err);
        } else {
            backing.loggedInUserId = res.sphericUserInfo.elementId;
            $("#headerContent").find("#loginUserName").html(res.sphericUserInfo.email);
            $("#headerContent").find("#loginUserName").attr("UserId", res.sphericUserInfo.elementId);
            if (res.userRoles && res.userRoles.length > 0)
                renderUserRoles(res.userRoles);
            updateUsersDropdown(res.sphericUserInfo.email);
        }
    });
}

function updateUsersDropdown(userId) {
    let str = "<ul>";
    let Hotlinks = (userId === "root") ? ["Change Password"] : ["Change Password", "Edit Profile", "Delete Account"];
    let i;
    for (i = 0; i < Hotlinks.length; i++) {
        str += "<li class=\"userEvents\" id=\"" + Hotlinks[i] + "\">" + Hotlinks[i].toUpperCase() + "</li>";
    }
    str += "</ul>";
    $("#headerContent").find(".userDropDownContent").html(str);
}

function renderUserRoles(roles) {
    $("#headerContent").find(".userRolesSelection").removeClass("dis-none");
    let str = "<ul>";
    let i;
    for (i = 0; i < roles.length; i++) {
        if (roles[i].approved === false) {
            str += "<li class=\"userRoleSelector\" elementId=\"" + roles[i].elementId + "\" style=\"cursor:not-allowed\">" + roles[i].name + "<span class=\"notApprovedLabel\">Not Approved</span></li>";
        }
        else {
            str += "<li class=\"userRoleSelector\" elementId=\"" + roles[i].elementId + "\">";
            if (roles[i].active === true) {
                str += "<span class=\"activeRole\"></span>" + roles[i].name + "</li>";
                $("#headerContent").find(".roleActive").html(roles[i].name);
            }
            else
                str += "" + roles[i].name + "</li>";
        }
    }
    str += "</ul>";
    $("#headerContent").find(".rolesDropDownContent").html(str);
}

function closeAllOpenedViews() {
    function closeViewsOfGivenWrokspace(workspaceKeyValuePairs) {
        let keysOfWrokspaces = Object.keys(workspaceKeyValuePairs);
        for (let i = 0; i < keysOfWrokspaces.length; i++) {
            let workspace = workspaceKeyValuePairs[keysOfWrokspaces[i]];
            let desktopsKeyValuePairs = workspace.desktops;
            let desktopKeys = Object.keys(desktopsKeyValuePairs);
            for (let j = 0; j < desktopKeys.length; j++) {
                let desktop = desktopsKeyValuePairs[desktopKeys[j]];
                if (desktop.opened_views) {
                    for (let k = 0; k < desktop.opened_views.length; k++) {
                        $("#" + desktop.opened_views[k].div_id).remove();
                    }
                    desktop.opened_views = [];
                }
            }
        }
    }

    closeViewsOfGivenWrokspace(backing.singleview.workspaces, false);
    closeViewsOfGivenWrokspace(backing.biview.workspaces, true);
    removeChildrenViewOfActiveDesktops()

}

function removeChildrenViewOfActiveDesktops() {
    backing.biview.active_desktop.children_views = {};
    backing.singleview.active_desktop.children_views = {};
}

function setDesktopsBasedOnMode() {
    if (backing.isDirectMode === true) {
        /*$("#single_ruler_type_desktop").addClass("dis-none");*/
        $("#expression_workspace").addClass("dis-none");

        /*$("#bi_ruler_type_desktop").addClass("dis-none");*/
        $("#bi_expression_workspace").addClass("dis-none");
    }
    else {
        /*$("#single_ruler_type_desktop").removeClass("dis-none");*/
        $("#expression_workspace").removeClass("dis-none");

        /*$("#bi_ruler_type_desktop").removeClass("dis-none");*/
        $("#bi_expression_workspace").removeClass("dis-none");
    }

    $("#single_shield_architecture_desktop").addClass("dis-none");
    $("#single_standard_architecture_desktop").addClass("dis-none");
    $("#bi_shield_architecture_desktop").addClass("dis-none");
    $("#bi_standard_architecture_desktop").addClass("dis-none");

}

function checkIfOpenedViewIsEvalOrExpression(mode_type) {
    let activeWorkspace, activeDesktop;
    activeWorkspace = backing.singleview.active_workspace_keyname;
    activeDesktop = backing.singleview.active_desktop.keyname;
    if( activeDesktop === "ruler_type_desktop" ) {
        if(mode_type === "Direct Mode")
            $(".desktop_selected").html("Security Asset Implements Control Link".toUpperCase());
        else
            $(".desktop_selected").html(backing.singleview.workspaces.eval_workspace.desktops.ruler_type_desktop.header_name.toUpperCase());
    }
    if (activeWorkspace === "expression_workspace") {
        selectWorkspace($("#" + backing.singleview.workspace_selector_id + " ul:first li:first"), "singleview");
    }
    if (backing.is_bi_view_active) {
        activeWorkspace = backing.biview.active_workspace_keyname;
        activeDesktop = backing.biview.active_desktop.keyname;
        if( activeDesktop === "ruler_type_desktop" ) {
            if(mode_type === "Direct Mode")
                $(".bi_desktop_selected").html("Security Asset Implements Control Link".toUpperCase());
            else
                $(".bi_desktop_selected").html(backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop.header_name.toUpperCase());
        }
        if (activeWorkspace === "bi_expression_workspace") {
            selectWorkspace($("#" + backing.biview.workspace_selector_id + " ul:first li:first"), "biview");
        }
    }
}

//added by Manish for Circular link issue
function removeCircularLinkDropDown(shieldId,isBiview) {
    /*let activeDesktop = getActiveDesktop(isBiview);
    shieldId=shieldId?shieldId:lufShieldId;
    if(shieldId===undefined){
        let sheildSelectorId = activeDesktop.selector.shield_dropdown_selected_id;
        shieldId = $("#"+sheildSelectorId).attr("elementId");
    }
   
    let expSelectorId =activeDesktop.selector.expression_dropdown_id;
    $("#"+expSelectorId).find("li").removeClass("dis-none");
    $("#"+expSelectorId).find("li[shieldId="+shieldId+"]").addClass("dis-none");

    let firstSheildId= $("#"+activeDesktop.selector.shield_dropdown_selected_id).attr("elementId");
    let secondSheildId=$("#"+activeDesktop.selector.expression_dropdown_selected_id).attr("shieldId");
    if(firstSheildId===secondSheildId){
        $("#"+expSelectorId+" :not(li[shieldId="+firstSheildId+"]) li:first-child").trigger("click");
    }*/
   
}