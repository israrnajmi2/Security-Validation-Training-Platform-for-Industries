$(document).ready(function () {
    $(document).on("click", ".singleview-edit-element", function (e) {
        let target = $(e.target);
        renderEditViewData($(this), false);
        if (target.parents(".r_conainer").length) {
            e.stopPropagation();
        }
    });

    $(document).on("click", ".singleview-expression-edit-element", function (e) {
        renderEditViewForSecElementClick($(this), false);
        e.stopPropagation();
    });

    $(document).on("click", ".biview-edit-element", function (e) {
        let target = $(e.target);
        renderEditViewData($(this), true);
        if (target.parents(".r_conainer").length) {
            e.stopPropagation();
        }
    });

    $(document).on("click", ".biview-expression-edit-element", function (e) {
        renderEditViewForSecElementClick($(this), true);
        e.stopPropagation();
    });

    $(document).on("click", ".Edit-asset-child", function () {
        let desktop = $(this).closest(".innerDesktop");
        let isBusiness = (desktop.attr("isBusiness") === "true");
        let view = desktop.attr("view");
        let isBiView = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiView);
        let viewId = desktop.attr("id");
        let currentOpenedView = getCurrentOpenedView(activeDesktop, viewId);
        let uniqueId = currentOpenedView.uniqueId;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let data = {};
        data.elementId = element.elementId;
        data.assetTypeId = (desktop.find(".assetTypeHierarchy").attr("elementId")) ? desktop.find(".assetTypeHierarchy").attr("elementId") : "";
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.organizationalUnitId = (desktop.find(".organisationalDirectory").attr("elementId")) ? desktop.find(".organisationalDirectory").attr("elementId") : 0;
        data.providerId = (desktop.find(".providerHierarchy").attr("elementId")) ? desktop.find(".providerHierarchy").attr("elementId") : undefined;
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        else if ((typeof data.assetTypeId === "undefined") || (data.assetTypeId === "")) {
            alert("Please fill all mandatory fields");
            return;
        }

        editAssetChild(data, viewId, view, desktop, isBusiness);
    });

    $(document).on("click", ".edit-assetType-child", function () {
        let desktop = $(this).closest(".innerDesktop");
        let isBusiness = (desktop.attr("isBusiness") === "true");
        let view = desktop.attr("view");
        let isBiView = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiView);
        let viewId = desktop.attr("id");
        let currentOpenedView = getCurrentOpenedView(activeDesktop, viewId);
        let uniqueId = currentOpenedView.uniqueId;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let data = {};
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.organizationalUnitId = (desktop.find(".organisationalDirectory").attr("elementId")) ? desktop.find(".organisationalDirectory").attr("elementId") : 0;
        data.elementId = element[ATTR.elementId];
        data.canDeliverExpression = true;
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        editAssetTypeChild(data, viewId, view, desktop, isBusiness);
    });

    $(document).on("click", ".edit-provider-child", function () {
        let desktop = $(this).closest(".innerDesktop");
        let isBusiness = (desktop.attr("isBusiness") === "true");
        let view = desktop.attr("view");
        let isBiView = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiView);
        let viewId = desktop.attr("id");
        let currentOpenedView = getCurrentOpenedView(activeDesktop, viewId);
        let uniqueId = currentOpenedView.uniqueId;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let data = {};
        data.name = desktop.find(".nameInput").val().trim();
        data.elementId = element[ATTR.elementId];
        data.description = desktop.find(".descriptionInput").val().trim();
        data.organizationalUnitId = (desktop.find(".organisationalDirectory").attr("elementId")) ? desktop.find(".organisationalDirectory").attr("elementId") : 0;
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        editProviderChild(data, viewId, view, desktop, isBusiness);
    });

    $(document).on("click", ".edit-organizational-child", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let isBiView = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiView);
        let viewId = desktop.attr("id");
        let currentOpenedView = getCurrentOpenedView(activeDesktop, viewId);
        let uniqueId = currentOpenedView.uniqueId;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let data = {};
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.elementId = element[ATTR.elementId];
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        editOrganizationalChild(data, viewId, view, desktop);
    });

    $(document).on("click", ".edit-objective-child", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let isBiView = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiView);
        let viewId = desktop.attr("id");
        let currentOpenedView = getCurrentOpenedView(activeDesktop, viewId);
        let uniqueId = currentOpenedView.uniqueId;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let data = {};
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.elementId = element[ATTR.elementId];
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        editObjectiveChild(data, viewId, view, desktop);
    });

    $(document).on("click", ".edit-method-child", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let isBiView = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiView);
        let viewId = desktop.attr("id");
        let currentOpenedView = getCurrentOpenedView(activeDesktop, viewId);
        let uniqueId = currentOpenedView.uniqueId;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let data = {};
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.elementId = element[ATTR.elementId];
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        editMethodChild(data, viewId, view, desktop);
    });

    $(document).on("click", ".edit-content-child", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let isBiView = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiView);
        let viewId = desktop.attr("id");
        let currentOpenedView = getCurrentOpenedView(activeDesktop, viewId);
        let uniqueId = currentOpenedView.uniqueId;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let data = {};
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.elementId = element[ATTR.elementId];
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        editContentChild(data, viewId, view, desktop);
    });

    $(document).on("click", ".edit-subject-child", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let isBiView = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiView);
        let viewId = desktop.attr("id");
        let currentOpenedView = getCurrentOpenedView(activeDesktop, viewId);
        let uniqueId = currentOpenedView.uniqueId;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let data = {};
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.elementId = element[ATTR.elementId];
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        editSubjectChild(data, viewId, view, desktop);
    });

    $(document).on("click", ".edit-sce-child", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let isBiView = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiView);
        let viewId = desktop.attr("id");
        let currentOpenedView = getCurrentOpenedView(activeDesktop, viewId);
        let uniqueId = currentOpenedView.uniqueId;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let data = {};
        data.elementId = element[ATTR.elementId];
        data.description = desktop.find(".descriptionInput").val().trim();
        data.objectiveParameterId = desktop.find(".ObjectiveContainer").find(".selected").attr("id");
        data.contentParameterId = desktop.find(".ContentContainer").find(".selected").attr("id");
        data.methodParameterId = desktop.find(".MethodContainer").find(".selected").attr("id");
        data.subjectParameterId = desktop.find(".SubjectContainer").find(".selected").attr("id");
        if ((typeof data.objectiveParameterId === "undefined") || (data.objectiveParameterId === "")) {
            alert("Security Technology Parameter is mandatory");
            return;
        }
        editSceChild(data, viewId, view, desktop);
    });

    $(document).on("click", ".save-edit-element", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let isBiView = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiView);
        let viewId = desktop.attr("id");
        let currentOpenedView = getCurrentOpenedView(activeDesktop, viewId);
        let uniqueId = currentOpenedView.uniqueId;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let data = {};
        data.elementId = element.elementId;
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.organizationalUnitId = (desktop.find(".organisationalDirectory").attr("elementId")) ? desktop.find(".organisationalDirectory").attr("elementId") : 0;
        data.referenceId = desktop.find(".referenceInput").val().trim();
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        else if ((typeof data.referenceId === "undefined") || (data.referenceId === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        editChild(data, viewId, view, desktop, uniqueId);
    });

    $(document).on("click", ".save-framework", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("framework");
        let data = {};
        data.name = desktop.find(".nameInput").val().trim();
        data.acronym = desktop.find(".acronymInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.author = desktop.find(".authorInput").val().trim();
        data.version = desktop.find(".versionInput").val().trim();
        data.elementId = $(this).attr("elementId");
        data.shieldTypeName = desktop.find(".frameWork").attr("elementId");
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof  data.acronym === "undefined") || (data.acronym === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof  data.author === "undefined") || (data.author === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof  data.version === "undefined") || (data.version === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        saveShieldOrStandard(data, desktop, view);
    });

    $(document).on("click", ".save-shield-element-type", function () {
        let desktop = $(this).closest(".innerDesktop");
        let desktopId;
        let view = desktop.attr("view");
        if (view === "shieldSchema") {
            desktopId = "sh_sch_desk_directory_view";
        }
        else if (view === "standardSchema") {
            desktopId = "std_sch_desk_directory_view";
        }
        else if (view === "businessSchema") {
            desktopId = "business_sch_desk_directory_view";
        }
        let data = {};
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.mappableToExpression = true;
        data.elementId = $(this).attr("elementId");
        let selectedShield = $("#" + desktopId).find(".shieldSelector");
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        saveShieldElementType(data, desktop, selectedShield, view);
    });

    $(document).on("click", ".save-perspective", function () {
        let desktop = $(this).closest(".innerDesktop");
        let data = {};
        data.elementId = $(this).attr("elementId");
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.color = desktop.find(".colorInput").val();
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        savePerspective(data, desktop);
    });

    $(document).on("click", ".edit-user", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let viewId = desktop.attr("id");
        let uniqueId = desktop.attr("uniqueId");
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let data = {};
        let phoneno = /^[- +()]*[0-9][- +()0-9]*$/;
        data.elementId = element.elementId;
        data.firstName = desktop.find(".firstNameInput").val().trim();
        data.lastName = desktop.find(".lastNameInput").val().trim();
        data.location = desktop.find(".location").val().trim();
        data.mobileNo = desktop.find(".mobileNo").val().trim();
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
        else
            editUser(data, viewId, view, desktop);
    });
});

$(document).on("click", ".edit-role", function () {
    let desktop = $(this).closest(".innerDesktop");
    let view = desktop.attr("view");
    let viewId = desktop.attr("id");
    let uniqueId = desktop.attr("uniqueId");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let data = {};
    data.elementId = element.elementId;
    data.name = desktop.find(".nameInput").val().trim();
    data.description = desktop.find(".descriptionInput").val().trim();
    data.modeDirectExpressionOrBoth = desktop.find(".toolSelected").attr("elementId");
    data.approvalRequired = desktop.find(".isApprovalReqClick.canDeliverYes").hasClass("active") ? true : false;
    data.canApprove = desktop.find(".canApproveClick.canDeliverYes").hasClass("active") ? true : false;
    if ((typeof data.name === "undefined") || (data.name === "") || (typeof data.modeDirectExpressionOrBoth === "undefined") || (data.modeDirectExpressionOrBoth === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    else saveRole(data, viewId, view, desktop);
});

function renderEditViewData(selector, isBiview) {
    $("#saveData").show();
    let src_hotlinkId = selector.attr("id");
    let uniqueId = selector.attr("uniqueId");
    let label = selector.attr("title");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let elementType = selector.attr("elementType");
    let childviewDivId;
    let data = {}, name;
    let activeDesktop = getActiveDesktop(isBiview);
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
    let viewClass = getSingleOrBiView(isBiview);
    if (element[ATTR.name])
        name = label + " : " + element[ATTR.name];
    else
        name = label;
    switch (elementType) {
        case constants.objectType.ASSET:
        case constants.objectType.BUSINESS_ASSET: {
            let isBusiness = (elementType === constants.objectType.BUSINESS_ASSET) ? true : false;
            childviewDivId = backing.view_type.edit_asset_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.edit_asset_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.edit_asset_element_view.key, name, uniqueId, isBiview);
            let providerData = {};
            data.assetTypeGroupId = 0;
            data.level = 0;
            data.protectionType = "do_not_show";
            data.showExpression = false;
            data.showAsset = false;
            providerData.showAsset = false;
            providerData.providerGroupId = 0;
            let renderFunction = (isBusiness) ? service.getBusinessAssetElementInfo : service.getAssetElementInfo;
            renderFunction(element.elementId, function (res, err) {
                if (res) {
                    renderEditAssetElementView(providerData, data, res, childviewDivId, viewClass, element, elementType, uniqueId, label, isBusiness);
                    repositionViews(isBiview);
                    highlightSourceAndView(childviewDivId, isBiview);
                }
                else if (err) {
                    errorHandler(err);
                }
                $("#saveData").hide();
            });
            break;
        }
        case constants.objectType.ASSET_TYPE:
        case constants.objectType.BUSINESS_ASSET_TYPE: {
            let isBusiness = (elementType === constants.objectType.BUSINESS_ASSET_TYPE) ? true : false;
            childviewDivId = backing.view_type.edit_asset_type_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_asset_type_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.edit_asset_type_element_view.key, name, uniqueId, isBiview);
            let renderFunction = (isBusiness) ? service.getBusinessAssetTypeInfo : service.getAssetTypeInfo;
            renderFunction(element.elementId, function (res, err) {
                if (res) {
                    renderEditAssetTypeElementView(childviewDivId, res, viewClass, element, elementType, uniqueId, label, isBusiness);
                    repositionViews(isBiview);
                    highlightSourceAndView(childviewDivId, isBiview);
                }
                else if (err) {
                    errorHandler(err);
                }
                $("#saveData").hide();
            });
            break;
        }
        case constants.objectType.PROVIDER:
        case constants.objectType.BUSINESS_PROVIDER: {
            let isBusiness = (elementType === constants.objectType.BUSINESS_PROVIDER) ? true : false;
            childviewDivId = backing.view_type.edit_provider_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.edit_provider_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.edit_provider_element_view.key, name, uniqueId, isBiview);
            let renderFunction = (isBusiness) ? service.getBusinessProviderInfo : service.getProviderInfo;
            renderFunction(element.elementId, function (res, err) {
                if (res) {
                    renderEditProviderElementView(childviewDivId, res, viewClass, element, elementType, uniqueId, label, isBusiness);
                    repositionViews(isBiview);
                    highlightSourceAndView(childviewDivId, isBiview);
                }
                else if (err) {
                    errorHandler(err);
                }
                $("#saveData").hide();
            });
            break;
        }
        case constants.objectType.ORGANIZATIONAL_UNIT: {
            childviewDivId = backing.view_type.edit_organizationalunit_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.edit_organizationalunit_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.edit_organizationalunit_element_view.key, name, uniqueId, isBiview);
            service.getOrganizationalUnitInfo(element.elementId, function (res, err) {
                if (res) {
                    renderEditOrganizationalUnitElementView(childviewDivId, res, viewClass, element, elementType, uniqueId, label);
                    repositionViews(isBiview);
                    highlightSourceAndView(childviewDivId, isBiview);
                }
                else if (err) {
                    errorHandler(err);
                }
                $("#saveData").hide();
            });
            break;
        }
        case constants.objectType.OBJECTIVE_PARAMETER: {
            childviewDivId = backing.view_type.edit_objective_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.edit_objective_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.edit_objective_element_view.key, name, uniqueId, isBiview);
            service.getObjectiveParameterInfo(element.elementId, function (res, err) {
                if (res) {
                    renderEditObjectiveParameterElementView(childviewDivId, res, viewClass, element, elementType, uniqueId, label);
                    repositionViews(isBiview);
                    highlightSourceAndView(childviewDivId, isBiview);
                }
                else if (err) {
                    errorHandler(err);
                }
                $("#saveData").hide();
            });
            break;
        }
        case constants.objectType.METHOD_PARAMETER: {
            childviewDivId = backing.view_type.edit_method_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.edit_method_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.edit_method_element_view.key, name, uniqueId, isBiview);
            service.getMethodParameterInfo(element.elementId, function (res, err) {
                if (res) {
                    renderEditMethodParameterElementView(childviewDivId, res, viewClass, element, elementType, uniqueId, label);
                    repositionViews(isBiview);
                    highlightSourceAndView(childviewDivId, isBiview);
                }
                else if (err) {
                    errorHandler(err);
                }
                $("#saveData").hide();
            });
            break;
        }
        case constants.objectType.CONTENT_PARAMETER: {
            childviewDivId = backing.view_type.edit_content_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.edit_content_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.edit_content_element_view.key, name, uniqueId, isBiview);
            service.getContentParameterInfo(element.elementId, function (res, err) {
                if (res) {
                    renderEditContentParameterElementView(childviewDivId, res, viewClass, element, elementType, uniqueId, label);
                    repositionViews(isBiview);
                    highlightSourceAndView(childviewDivId, isBiview);
                }
                else if (err) {
                    errorHandler(err);
                }
                $("#saveData").hide();
            });
            break;
        }
        case constants.objectType.SUBJECT_PARAMETER: {
            childviewDivId = backing.view_type.edit_subject_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.edit_subject_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.edit_subject_element_view.key, name, uniqueId, isBiview);
            service.getSubjectParameterInfo(element.elementId, function (res, err) {
                if (res) {
                    renderEditSubjectParameterElementView(childviewDivId, res, viewClass, element, elementType, uniqueId, label);
                    repositionViews(isBiview);
                    highlightSourceAndView(childviewDivId, isBiview);
                }
                else if (err) {
                    errorHandler(err);
                }
                $("#saveData").hide();
            });
            break;
        }
        case constants.objectType.STANDARD:
        case constants.objectType.SHIELD:
        case constants.objectType.THREAT:
        case constants.objectType.BUSINESS: {
            service.getShieldInfo(element.elementId, function (res, err) {
                if (res) {
                    if (element.shieldTypeName === "Shield" || element.objectType === "shield") {
                        renderEditShieldPopUp(res, isBiview, element.shieldTypeName);
                    }
                    else if (element.shieldTypeName === "Standard" || element.objectType === "standard") {
                        renderEditShieldPopUp(res, isBiview, element.shieldTypeName);
                    }
                    else if (element.shieldTypeName === "BusinessFrameworks" || element.objectType === "b_framework") {
                        renderEditShieldPopUp(res, isBiview, element.shieldTypeName);
                    }
                    else if (element.shieldTypeName === "Threat" || element.objectType === "threat") {
                        renderEditShieldPopUp(res, isBiview, element.shieldTypeName);
                    }
                    repositionViews(isBiview);
                }
                else if (err) {
                    errorHandler(err);
                }
                $("#saveData").hide();
            });
            break;
        }
        case constants.objectType.STANDARD_ELEMENT_TYPE:
        case constants.objectType.SHIELD_ELEMENT_TYPE:
        case constants.objectType.THREAT_ELEMENT_TYPE:
        case constants.objectType.BUSINESS_CONTROL_TYPE: {
            service.getShieldElementTypeInfo(element.elementId, function (res, err) {
                if (res) {
                    if (element.shieldTypeName === "Shield") {
                        renderEditShieldElementTypePopUp("shieldSchema", res, isBiview);
                    }
                    else if (element.shieldTypeName === "Standard") {
                        renderEditShieldElementTypePopUp("standardSchema", res, isBiview);
                    }
                    else if (element.shieldTypeName === "BusinessFrameworks") {
                        renderEditShieldElementTypePopUp("businessSchema", res, isBiview);
                    } else if (element.shieldTypeName === "Threat") {
                        renderEditShieldElementTypePopUp("threatSchema", res, isBiview);
                    }
                    repositionViews(isBiview);
                    $("#saveData").hide();
                }
                else if (err) {
                    errorHandler(err);
                    $("#saveData").hide();

                }
            });
            break;
        }
        case constants.objectType.PERSPECTIVE: {
            service.getPerspectiveInfo(element.elementId, function (res, err) {
                if (res) {
                    renderEditPerspectivePopUp(res, isBiview);
                    repositionViews(isBiview);
                }
                else if (err) {
                    errorHandler(err);
                }
                $("#saveData").hide();
            });
            break;
        }
        case constants.objectType.SHIELD_ELEMENT_GROUP: {
            childviewDivId = backing.view_type.edit_groups.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.edit_groups.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);

            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.edit_groups.key, name, uniqueId, isBiview);
            service.getShieldElementGroupInfo(element.elementId, function (res, err) {
                if (res) {
                    renderEditGroups(childviewDivId, res, viewClass, element, elementType, uniqueId, label);
                    let dataSelector = activeDesktop.utilsFunction.getSelector();
                    let data = {};
                    data.shieldId = dataSelector.dropDownOneShieldId ? dataSelector.dropDownOneShieldId : dataSelector.shieldId;
                    data.level = LookupLevel(element.shieldElementTypeId);
                    data.shieldElementGroupId = 0;
                    data.showExpression = false;

                    service.getShieldDv(data, function (res1, err) {
                        if (res1) {
                            generateUniqueIdAndParentLink(res1, "", null);
                            renderDirectoryView(res1, childviewDivId + "treeContainer", viewClass, "groupView", isBiview);
                            $("#" + childviewDivId + "treeContainer").find(".d-text").each(function () {
                                if (res.shieldElementTypeId == null || parseInt($(this).attr("shieldElementTypeId")) === res.shieldElementTypeId) {
                                    $(this).addClass("canSelect");
                                    if (res && res.shieldElementGroupMemberIds.length > 0) {
                                        if (selectedShieldElementType(parseInt($(this).attr("id")), res.shieldElementGroupMemberIds)) {
                                            $(this).addClass("selectedGroup");
                                            let uniqueId = $(this).closest(".element_li").attr("uniqueid");
                                            let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
                                            let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview);
                                            let str;
                                            if (element.refId && element.refId.trim() !== "")
                                                str = "<li elementId=\"" + element.elementId + "\">" + objectTypeIcon + "  " + element.name + "<span>&nbsp[" + element.refId + "]</span></li>";
                                            else
                                                str = "<li elementId=\"" + element.elementId + "\">" + objectTypeIcon + "  " + element.name + "</li>";
                                            $("#" + childviewDivId + "selectedElements").append(str);

                                        }
                                    }
                                }
                                else
                                    $(this).addClass("cannotSelect");
                            });
                        }
                        else if (err) {
                            $("#saveData").hide();
                        }
                    });

                    repositionViews(isBiview);
                    $("#saveData").hide();
                }
                else if (err) {
                    errorHandler(err);
                    $("#saveData").hide();

                }
            });
            break;
        }
        case constants.objectType.USER: {
            childviewDivId = backing.view_type.edit_user_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.edit_user_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.edit_user_view.key, name, uniqueId, isBiview);
            service.getUserInfo(element.elementId, function (res, err) {
                if (res) {
                    renderEditUserView(childviewDivId, res, viewClass, element, elementType, uniqueId, label);
                    repositionViews(isBiview);
                    highlightSourceAndView(childviewDivId, isBiview);
                }
                else if (err) {
                    errorHandler(err);
                }
                $("#saveData").hide();
            });
            break;
        }
        case constants.objectType.ROLE: {
            childviewDivId = backing.view_type.edit_role_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.edit_role_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.edit_role_view.key, name, uniqueId, isBiview);
            service.getRoleInfo(element.elementId, function (res, err) {
                if (res) {
                    renderEditRoleView(childviewDivId, res, viewClass, element, elementType, uniqueId, label);
                    repositionViews(isBiview);
                    highlightSourceAndView(childviewDivId, isBiview);
                }
                else if (err) {
                    errorHandler(err);
                }
                $("#saveData").hide();
            });
            break;
        }
        default: {
            childviewDivId = backing.view_type.edit_shield_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.edit_shield_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);

            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.edit_shield_element_view.key, name, uniqueId, isBiview);
            service.getEditElementInfo(element.elementId, function (res, err) {
                if (res) {
                    renderEditElementView(childviewDivId, viewClass, res, element, elementType, uniqueId, label);
                    repositionViews(isBiview);
                    highlightSourceAndView(childviewDivId, isBiview);
                }
                else if (err) {
                    errorHandler(err);
                }
                $("#saveData").hide();
            });
            break;
        }
    }
}

function renderEditViewForSecElementClick(selector, isBiview) {
    $("#saveData").show();
    let isCopy, viewClass;
    if (selector.html() === "COPY")
        isCopy = true;
    else
        isCopy = false;
    if (isBiview)
        viewClass = "biview";
    else
        viewClass = "singleview";
    let desktop = selector.closest(".innerDesktop").attr("id");
    let src_hotlinkId = selector.attr("id");
    let uniqueId = selector.attr("uniqueId");
    let label = selector.attr("title");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let elementType = selector.attr("elementType");
    let childviewDivId = backing.view_type.edit_shield_element_view.name + "_" + src_hotlinkId;
    let activeDesktop = getActiveDesktop(isBiview);
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
    let elementName = combineChainElements(element);
    let name = elementName.str;
    //check for space in screen
    let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.expressionview.key);
    if (!haveSpaceToOpenView) {
        return;
    }
    //check view is opened before
    let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
    if (isViewOpenedBefore) {
        return;
    }
    if (selector.html() === "COPY")
        createScenarioViewOpenedFromView(childviewDivId, desktop, src_hotlinkId, backing.view_type.create_expression_view.key, "Create Element: " + name, uniqueId, isBiview);
    else
        createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.edit_expression_view.key, "Edit Element: " + name, uniqueId, isBiview);
    service.getSceInfo(element.elementId, function (res, err) {
        if (res) {
            renderEditSceElementView(childviewDivId, res, viewClass, element, elementType, uniqueId, label, isCopy);
            highlightSourceAndView(childviewDivId, isBiview);
            $("#saveData").hide();
        }
        else if (err) {
            errorHandler(err);
            $("#saveData").hide();

        }
    });
}

function editChild(data, viewId, view, desktop, uniqueId) {
    $("#saveData").show();
    service.saveEditElement(data, function (res, err) {
        if (res) {
            alert("Edited Successfully");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            let event = {"key": backing.event_type.edited_shield_element.key};
            propagateEvent(event);
        }
        else if (err) {
            if (err.status === 409)
                alert(err.responseJSON.errorMessage);
            else
                errorHandler(err);
            $("#saveData").hide();
        }
    });
}

function editAssetChild(data, viewId, view, desktop, isBusiness) {
    $("#saveData").show();
    let renderFunction = (isBusiness) ? service.editBusinessAssetElement : service.editAssetElement;
    renderFunction(data, function (res, err) {
        if (res) {
            alert("Edited Successfully");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            let event = {"key": backing.event_type.edited_asset_element.key};
            propagateEvent(event);
        }
        else if (err) {
            if (err.status === 409) {
                alert(err.responseJSON.errorMessage);
            }
            else {
                errorHandler(err);
            }
            $("#saveData").hide();
        }
    });
}

function editAssetTypeChild(data, viewId, view, desktop, isBusiness) {
    $("#saveData").show();
    let renderFunction = (isBusiness) ? service.editBusinessAssetType : service.editAssetType;
    renderFunction(data, function (res, err) {
        if (res) {
            alert("Edited Successfully");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            let event = {"key": backing.event_type.edited_asset_type_element.key};
            propagateEvent(event);
        }
        else if (err) {
            if (err.status === 409)
                alert(err.responseJSON.errorMessage);
            else
                errorHandler(err);
            $("#saveData").hide();
        }
    });
}

function editProviderChild(data, viewId, view, desktop, isBusiness) {
    $("#saveData").show();
    let renderFunction = (isBusiness) ? service.editBusinessProvider : service.editProvider;
    renderFunction(data, function (res, err) {
        if (res) {
            alert("Edited Successfully");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            let event = {"key": backing.event_type.edited_provider_element.key};
            propagateEvent(event);
        }
        else if (err) {
            if (err.status === 409)
                alert(err.responseJSON.errorMessage);
            else
                errorHandler(err);
            $("#saveData").hide();
        }
    });
}

function editOrganizationalChild(data, viewId, view, desktop) {
    $("#saveData").show();
    service.editOrganizationalUnit(data, function (res, err) {
        if (res) {
            alert("Edited Successfully");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            let event = {"key": backing.event_type.edited_organizationalunit_element.key};
            propagateEvent(event);
        }
        else if (err) {
            if (err.status === 409)
                alert(err.responseJSON.errorMessage);
            else
                errorHandler(err);
            $("#saveData").hide();
        }
    });
}

function editObjectiveChild(data, viewId, view, desktop) {
    $("#saveData").show();
    service.editObjectiveParameter(data, function (res, err) {
        if (res) {
            alert("Edited Successfully");
            let id = desktop.attr("id");
            desktop.remove();
            service.getObjectiveParameterDv(null, function (res, err) {
                if (res) {
                    backing.objectiveParameterDv = res;
                    generateUniqueIdAndParentLink(backing.objectiveParameterDv, id, null);
                    let event = {"key": backing.event_type.edited_objectiveParameter_element.key};
                    propagateEvent(event);
                }
                else if (err) {
                    errorHandler(err);
                }
            });
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
        }
        else if (err) {
            if (err.status === 409)
                alert(err.responseJSON.errorMessage);
            else
                errorHandler(err);
            $("#saveData").hide();
        }
    });
}

function editMethodChild(data, viewId, view, desktop) {
    $("#saveData").show();
    service.editMethodParameter(data, function (res, err) {
        if (res) {
            alert("Edited Successfully");
            let id = desktop.attr("id");
            desktop.remove();
            service.getMethodParameterDv(null, function (res, err) {
                if (res) {
                    backing.methodParameterDv = res;
                    generateUniqueIdAndParentLink(backing.methodParameterDv, id, null);
                    let event = {"key": backing.event_type.edited_methodParameter_element.key};
                    propagateEvent(event);
                }
                else if (err) {
                    errorHandler(err);
                }
            });
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
        }
        else if (err) {
            if (err.status === 409)
                alert(err.responseJSON.errorMessage);
            else
                errorHandler(err);
            $("#saveData").hide();
        }
    });
}

function editContentChild(data, viewId, view, desktop) {
    $("#saveData").show();
    service.editContentParameter(data, function (res, err) {
        if (res) {
            alert("Edited Successfully");
            let id = desktop.attr("id");
            desktop.remove();
            service.getContentParameterDv(null, function (res, err) {
                if (res) {
                    backing.contentParameterDv = res;
                    generateUniqueIdAndParentLink(backing.contentParameterDv, id, null);
                    let event = {"key": backing.event_type.edited_contentParameter_element.key};
                    propagateEvent(event);
                }
                else if (err) {
                    errorHandler(err);
                }
            });
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
        }
        else if (err) {
            if (err.status === 409)
                alert(err.responseJSON.errorMessage);
            else
                errorHandler(err);
            $("#saveData").hide();
        }
    });
}

function editSubjectChild(data, viewId, view, desktop) {
    $("#saveData").show();
    service.editSubjectParameter(data, function (res, err) {
        if (res) {
            alert("Edited Successfully");
            let id = desktop.attr("id");
            desktop.remove();
            service.getSubjectParameterDv(null, function (res, err) {
                if (res) {
                    backing.subjectParameterDv = res;
                    generateUniqueIdAndParentLink(backing.subjectParameterDv, id, null);
                    let event = {"key": backing.event_type.edited_subjectParameter_element.key};
                    propagateEvent(event);
                }
                else if (err) {
                    errorHandler(err);
                }
            });
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
        }
        else if (err) {
            if (err.status === 409)
                alert(err.responseJSON.errorMessage);
            else
                errorHandler(err);
            $("#saveData").hide();
        }
    });
}

function editSceChild(data, viewId, view, desktop) {
    $("#saveData").show();
    service.editExpression(data, function (res, err) {
        if (res) {
            alert("Edited Successfully");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            let event = {"key": backing.event_type.edited_expression.key};
            propagateEvent(event);
        }
        else if (err) {
            if (err.status === 409)
                alert(err.responseJSON.errorMessage);
            else
                errorHandler(err);
            $("#saveData").hide();
        }
    });
}

function editUser(data, viewId, view, desktop) {
    $("#saveData").show();
    service.editUser(data, function (res, err) {
        if (res) {
            alert("Edited Successfully");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            let event = {"key": backing.event_type.edited_user.key};
            propagateEvent(event);
        }
        else if (err) {
            if (err.status === 409)
                alert(err.responseJSON.errorMessage);
            else
                errorHandler(err);
        }
        $("#saveData").hide();
    });
}

function saveRole(data, viewId, view, desktop) {
    $("#saveData").show();
    service.editRole(data, function (res, err) {
        if (res) {
            alert("Edited Successfully");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            let event = {"key": backing.event_type.edited_role.key};
            propagateEvent(event);
        }
        else if (err) {
            if (err.status === 409)
                alert(err.responseJSON.errorMessage);
            else
                errorHandler(err);
        }
        $("#saveData").hide();
    });
}

function renderEditElementView(viewName, view, res, element, elementType, uniqueId, label) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    let shieldName = ($("#" + activeDesktop.selector.shield_dropdown_selected_id).text()) ? $("#" + activeDesktop.selector.shield_dropdown_selected_id).text() : "NA";
    let headerName = getViewHeaderName(element);
    let {elementTypeName = "NA", parentElementName = "NA", parentElementTypeName = "NA"} = res;
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop editviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"ss-edit dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    str += `<span class="panel-header">${label.toUpperCase()}: ${objectTypeIcon}<span class="viewHeaderName" title="${headerName.toUpperCase()}">${headerName.toUpperCase()}</span></span>`;
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\"  title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button  refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton save-edit-element\">SAVE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">FRAMEWORK:</label><input class=\"uneditable shieldName\" value=\"" + shieldName + "\" readonly></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">PARENT CONTROL NAME:</label><input class=\"uneditable parentName\" value=\"" + parentElementName + "\" readonly></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">PARENT CONTROL TYPE:</label><input class=\"uneditable parentType\" value=\"" + parentElementTypeName + "\" readonly/></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><textarea class=\"nameInput\">" + res.name + "</textarea></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\">" + res.description + "</textarea></div></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">CONTROL TYPE:</label><input class=\"uneditable childType\" value=\"" + elementTypeName + "\" readonly></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTIVE ID<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"referenceInput\" value =\"" + res.referenceId + "\"></li>" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label class=\"\">ORGANIZATIONAL UNIT:</label><input class=\"organisationalDirectory hierarchySelected\" readonly>" +
        "<div id=\"" + viewName + "org\" class=\"hierarchyDropDown organisationalDirectoryDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearOrgDirectory\">CLEAR</span>" +
        "</li>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);

    // added by Manish for Rich Text Editor
    applyRichTextEditorById("descriptionInput"+uniqueId);
        
    $("#" + viewName).find('input.nameInput').focus();
    getDataForOrgUnit(viewName, res.organizationalUnitId);
}

function renderEditShieldPopUp(res, isBiviewSide, framework) {
    let str = "";
    let viewClass;
    if (isBiviewSide === true)
        viewClass = "biview";
    else
        viewClass = "singleview";
    let viewName = "popOverlay";
    let {name, elementId, acronym = "", description = "", author = "", version = ""} = res;
    if (acronym === null) {
        acronym = "";
    }
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + viewClass + "\" uniqueid =\"" + res.uniqueId + "\" framework=\"" + framework + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    str += "<span class=\"panel-header\">EDIT FRAMEWORK</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close tooltip tooltipstered close-btn closePopUp\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\">" +
        `<span class="headerActionButton save-framework" elementId="${elementId}">SAVE</span>` +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label class=\"\">FRAMEWORK TYPE:</label><input class=\"frameWork hierarchySelected\" readonly>" +
        "<div id=\"" + viewName + "frameWork\" class=\"hierarchyDropDown frameWorkDropDown dis-none\"></div>" +
        //"<span class=\"actionButton clearFrameWork\">CLEAR</span>" +
        "</li>" +
        "<li class=\"create-shield-field\">" +
        `<label>ACRONYM<span style="color:#ec4c4c;">*</span>:</label><input class="acronymInput" maxlength="25" style="text-transform:uppercase" value="${acronym}"></li>` +
        "<li class=\"create-shield-field\">" +
        `<label>NAME<span style="color:#ec4c4c;">*</span>:</label><input class="nameInput" value="${name}"></li>` +
        "<li class=\"create-shield-field\">" +
        `<label>AUTHOR<span style="color:#ec4c4c;">*</span>:</label><input class="authorInput" value="${author}"></li>` +
        "<li class=\"create-shield-field\">" +
        //only description changed
        //`<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"> ${description} </textarea></div></li>` +
       
        `<label>DESCRIPTION:</label><textarea class="descriptionInput">${description}</textarea></li>` +
        "<li class=\"create-shield-field\">" +
        `<label>VERSION<span style="color:#ec4c4c;">*</span>:</label><input class="versionInput" value="${version}"></li>` +
        "</ul>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
    $("#" + viewName).find('input.nameInput').focus();
    getDataForFramework(viewName, res.shieldTypeName);
   
}

function renderEditShieldElementTypePopUp(view, res, isBiviewSide) {
    let str = "", viewClass;
    if (isBiviewSide === true)
        viewClass = "biview";
    else
        viewClass = "singleview";
    let viewName = "popOverlay";
    let name = res.name;
    let description = res.description ? res.description : "";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\" uniqueid =\"" + res.uniqueId + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    str += "<span class=\"panel-header\">EDIT CONTROL TYPE</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close tooltip tooltipstered close-btn closePopUp\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\">" +
        "<span class=\"headerActionButton save-shield-element-type\" elementId=\"" + res.elementId + "\">SAVE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\" value=\"" + name + "\"></li>" +
        "<li class=\"create-shield-field\">" +
       // "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\">" + description + "</textarea></div></li>" ;
        "<label class=\"\">DESCRIPTION:</label><textarea class=\"descriptionInput\">" + description + "</textarea></li>";
    str += "</ul>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
    $("#" + viewName).find('input.nameInput').focus();
 
}

function renderEditPerspectivePopUp(res, isBiviewSide) {
    let str = "";
    let viewClass;
    if (isBiviewSide === true)
        viewClass = "biview";
    else
        viewClass = "singleview";
    let viewName = "popOverlay";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + viewClass + "\" uniqueid =\"" + res.uniqueId + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    str += "<span class=\"panel-header\">EDIT PERSPECTIVE</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close tooltip tooltipstered close-btn closePopUp\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\">" +
        "<span class=\"headerActionButton save-perspective\" elementId =\"" + res.elementId + "\">SAVE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\" value=\"" + res.name + "\"></li>" +
        "<li class=\"create-shield-field\">" +
        //"<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\">" + res.description + "</textarea></div></li>" +
        "<label class=\"\">DESCRIPTION:</label><input class=\"descriptionInput\" value=\"" + res.description + "\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">COLOR:</label><input class=\"colorInput\" type=\"color\" value=\"" + res.color + "\"></li>" +
        "</ul>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
    
}

function renderEditAssetElementView(providerData, data, res, viewName, view, element, elementType, uniqueId, label, isBusiness) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\" isBusiness=\"" + isBusiness + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"ss-edit dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    if (element.name)
        str += "<span class=\"panel-header\">" + label.toUpperCase() + ": " + objectTypeIcon + "" + element.name.toUpperCase() + "</span>";
    else
        str += "<span class=\"panel-header\">" + label.toUpperCase() + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\"  title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton Edit-asset-child\">SAVE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\" value=\"" + res.name + "\"></li>" +
        "<li class=\"create-shield-field\">" +
        //changed by manish
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\">" + res.description + "</textarea></div></li>" +
        // "<label class=\"\">DESCRIPTION:</label><textarea class=\"descriptionInput\">" + res.description + "</textarea></li>" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label class=\"\">ASSET TYPE<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"assetTypeHierarchy hierarchySelected\" readonly>" +
        "<div id=\"" + viewName + "assetTypeHierarchy\" class=\"assetTypeHierarchyDropDown hierarchyDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearAssetTypeHierarchy\">CLEAR</span></li>" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label class=\"\">PROVIDER<span style=\"color:#ec4c4c;\"></span>:</label><input class=\"providerHierarchy hierarchySelected\" readonly>" +
        "<div id=\"" + viewName + "providerHierarchy\" class=\"providerHierarchyDropDown hierarchyDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearProviderHierarchy\">CLEAR</span>" +
        "</li>" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label class=\"\">ORGANIZATIONAL UNIT:</label><input class=\"organisationalDirectory hierarchySelected\" readonly>" +
        "<div id=\"" + viewName + "org\" class=\"organisationalDirectoryDropDown hierarchyDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearOrgDirectory\">CLEAR</span>" +
        "</li>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    getDataForAssetTypeHierarchy(data, viewName, res.assetTypeId, isBusiness);
    getDataForProviderHierarchy(providerData, viewName, res.providerId, isBusiness);
    getDataForOrgUnit(viewName, res.organizationalUnitId);
    applyRichTextEditorById("descriptionInput"+uniqueId);
}

function renderEditAssetTypeElementView(viewName, res, view, element, elementType, uniqueId, label, isBusiness) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    let parentAssetType = (res.parentAssetTypeName !== null) ? res.parentAssetTypeName : "NA";
    let parentElementId = (res.parentAssetTypeId) ? res.parentAssetTypeId : 0;
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\" isBusiness=\"" + isBusiness + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"ss-edit dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    if (element.name)
        str += "<span class=\"panel-header\">" + label.toUpperCase() + ": " + objectTypeIcon + "" + element.name.toUpperCase() + "</span>";
    else
        str += "<span class=\"panel-header\">" + label.toUpperCase() + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\"  title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton edit-assetType-child\">SAVE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">PARENT ASSET TYPE:</label><input class=\"uneditable parentAssetType\" value=\"" + parentAssetType + "\" elementId =\"" + parentElementId + "\" readonly></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\" value=\"" + res.name + "\"></li>" +
        "<li class=\"create-shield-field\">" +
       
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\">" + res.description + "</textarea></div></li>" 
        // "<label class=\"\">DESCRIPTION:</label><textarea class=\"descriptionInput\">" + res.description + "</textarea></li>";
    str += "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label class=\"\">ORGANIZATIONAL UNIT:</label><input class=\"organisationalDirectory hierarchySelected\" readonly>" +
        "<div id=\"" + viewName + "org\" class=\"organisationalDirectoryDropDown hierarchyDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearOrgDirectory\">CLEAR</span></li></ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    getDataForOrgUnit(viewName, res.organizationalUnitId);
    applyRichTextEditorById("descriptionInput"+uniqueId);
}

function renderEditProviderElementView(viewName, res, view, element, elementType, uniqueId, label, isBusiness) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\" isBusiness=\"" + isBusiness + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"ss-edit dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    if (element.name)
        str += "<span class=\"panel-header\">" + label.toUpperCase() + ": " + objectTypeIcon + "" + element.name.toUpperCase() + "</span>";
    else
        str += "<span class=\"panel-header\">" + label.toUpperCase() + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\"  title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton edit-provider-child\">SAVE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\" value=\"" + res.name + "\"></li>" +
        "<li class=\"create-shield-field\">" +
        //"<label class=\"\">DESCRIPTION:</label><textarea class=\"descriptionInput\">" + res.description + "</textarea></li>" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\">" + res.description + "</textarea></div></li>" +
        
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label class=\"\">ORGANIZATIONAL UNIT:</label><input class=\"organisationalDirectory hierarchySelected\" readonly>" +
        "<div id=\"" + viewName + "org\" class=\"organisationalDirectoryDropDown hierarchyDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearOrgDirectory\">CLEAR</span>" +
        "</li>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    getDataForOrgUnit(viewName, res.organizationalUnitId);
    applyRichTextEditorById("descriptionInput"+uniqueId);

}

function renderEditOrganizationalUnitElementView(viewName, res, view, element, elementType, uniqueId, label) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    let parentElementName = (res.parentOrganizationalUnitName !== null) ? res.parentOrganizationalUnitName : "NA";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"ss-edit dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    if (element.name)
        str += "<span class=\"panel-header\">" + label.toUpperCase() + ": " + objectTypeIcon + "" + element.name.toUpperCase() + "</span>";
    else
        str += "<span class=\"panel-header\">" + label.toUpperCase() + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\"  title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton edit-organizational-child\">SAVE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">PARENT ORGANIZATIONAL UNIT:</label><input class=\"uneditable organizationalParent\" value=\"" + parentElementName + "\" readonly></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\" value=\"" + res.name + "\"></li>" +
        "<li class=\"create-shield-field\">" +
        //changed by manish
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\">" + res.description + "</textarea></div></li>" +
       // "<label class=\"\">DESCRIPTION:</label><textarea class=\"descriptionInput\">" + res.description + "</textarea></li>" +
        "</li>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    applyRichTextEditorById("descriptionInput"+uniqueId);
}

function renderEditObjectiveParameterElementView(viewName, res, view, element, elementType, uniqueId, label) {
    let str = "";
    let parentElementName = (res.parentObjectiveParameterName !== null) ? res.parentObjectiveParameterName : "NA";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"ss-edit dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    if (element.name)
        str += "<span class=\"panel-header\">" + label.toUpperCase() + ": " + objectTypeIcon + "" + element.name.toUpperCase() + "</span>";
    else
        str += "<span class=\"panel-header\">" + label.toUpperCase() + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\"  title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton edit-objective-child\">SAVE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">PARENT PARAMETER:</label><input class=\"uneditable parentParameter\" value=\"" + parentElementName + "\" readonly></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\" value=\"" + res.name + "\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\">" + res.description + "</textarea></div></li>" +
        // "<label class=\"\">DESCRIPTION:</label><textarea class=\"descriptionInput\">" + res.description + "</textarea>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    applyRichTextEditorById("descriptionInput"+uniqueId);
}

function renderEditMethodParameterElementView(viewName, res, view, element, elementType, uniqueId, label) {
    let str = "";
    let parentElementName = (res.parentMethodParameterName !== null) ? res.parentMethodParameterName : "NA";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"ss-edit dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    if (element.name)
        str += "<span class=\"panel-header\">" + label.toUpperCase() + ": " + objectTypeIcon + "" + element.name.toUpperCase() + "</span>";
    else
        str += "<span class=\"panel-header\">" + label.toUpperCase() + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\"  title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton edit-method-child\">SAVE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">PARENT PARAMETER:</label><input class=\"uneditable parentParameter\" value=\"" + parentElementName + "\" readonly></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\" value=\"" + res.name + "\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\">" + res.description + "</textarea></div></li>" +
        // "<label class=\"\">DESCRIPTION:</label><textarea class=\"descriptionInput\">" + res.description + "</textarea></li>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    applyRichTextEditorById("descriptionInput"+uniqueId);
}

function renderEditContentParameterElementView(viewName, res, view, element, elementType, uniqueId, label) {
    let str = "";
    let parentElementName = (res.parentContentParameterName !== null) ? res.parentContentParameterName : "NA";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"ss-edit dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    if (element.name)
        str += "<span class=\"panel-header\">" + label.toUpperCase() + ": " + objectTypeIcon + "" + element.name.toUpperCase() + "</span>";
    else
        str += "<span class=\"panel-header\">" + label.toUpperCase() + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\"  title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton edit-content-child\">SAVE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">PARENT PARAMETER:</label><input class=\"uneditable parentParameter\" value=\"" + parentElementName + "\" readonly></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\" value=\"" + res.name + "\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\">" + res.description + "</textarea></div></li>" +
        //"<label class=\"\">DESCRIPTION:</label><textarea class=\"descriptionInput\">" + res.description + "</textarea></li>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    applyRichTextEditorById("descriptionInput"+uniqueId);
}

function renderEditSubjectParameterElementView(viewName, res, view, element, elementType, uniqueId, label) {
    let str = "";
    let parentElementName = (res.parentSubjectParameterName !== null) ? res.parentSubjectParameterName : "NA";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"ss-edit dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    if (element.name)
        str += "<span class=\"panel-header\">" + label.toUpperCase() + ": " + objectTypeIcon + "" + element.name.toUpperCase() + "</span>";
    else
        str += "<span class=\"panel-header\">" + label.toUpperCase() + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\"  title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton edit-subject-child\">SAVE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">PARENT PARAMETER:</label><input class=\"uneditable parentParameter\" value=\"" + parentElementName + "\" readonly></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\" value=\"" + res.name + "\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\">" + res.description + "</textarea></div></li>" +
        //"<label class=\"\">DESCRIPTION:</label><textarea class=\"descriptionInput\">" + res.description + "</textarea></li>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    applyRichTextEditorById("descriptionInput"+uniqueId);
}

function renderSceElementEditView(viewName, res, view, element, elementType, uniqueId, label, isCopy) {
    let str = "";
    let headerName, saveClass, icon;
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);

    if (isCopy === true) {
        objectTypeIcon = "";
        headerName = "";
        saveClass = "create_new_sce_with_copy";
        icon = "flaticon-add-attribute";
    }
    else {
        let strObj = combineChainElements(element);
        headerName = strObj.oStr + "  |  " + strObj.mStr + "  |  " + strObj.cStr + "  |  " + strObj.sStr;
        saveClass = "edit-sce-child";
        icon = "ss-edit";
    }

    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"" + icon + " dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    str += "<span class=\"panel-header\">" + label.toUpperCase() + ": " + objectTypeIcon + "" + headerName.toUpperCase() + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\"  title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton " + saveClass + "\">SAVE</span>" +
        "</div>" +
        "<div class=\"create-shield-element-container-expressionView\">" +
        "<ul><li class=\"create-shield-field\">" +
      
       // "<label style=\"width: 10%;\" class=\"\">DESCRIPTION:</label><textarea class=\"descriptionInput expressionDesc\">" + res.description + "</textarea></li></ul>";
        "<label style=\"width: 10%;\" class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\">" + res.description + "</textarea></div></li></ul>" ;    
    str += "<div class=\"expViewContainer\">";
    str += renderIndividualExpression(backing.objectiveParameterDv.children, isBiview, viewName + "odosChain", "Security Technique", "Objective", activeDesktop, true, res.objectiveParameterId);
    str += renderIndividualExpression(backing.methodParameterDv.children, isBiview, viewName + "mdosChain", "Security Content", "Method", activeDesktop, true, res.methodParameterId);
    str += renderIndividualExpression(backing.contentParameterDv.children, isBiview, viewName + "cdosChain", "Protected Content", "Content", activeDesktop, true, res.contentParameterId);
    str += renderIndividualExpression(backing.subjectParameterDv.children, isBiview, viewName + "sdosChain", "Protected Subject", "Subject", activeDesktop, true, res.subjectParameterId);
    str += "</div></div>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('textarea:first').focus();
    repositionViews(isBiview);
    highlightSourceAndView(viewName, isBiview);
    applyRichTextEditorById("descriptionInput"+uniqueId);
}

function renderEditUserView(viewName, res, view, element, elementType, uniqueId, label) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    if (res.mobileNo === null)
        res.mobileNo = "";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"ss-edit dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    if (element.name)
        str += "<span class=\"panel-header\">" + label.toUpperCase() + ": " + objectTypeIcon + "" + element.name.toUpperCase() + "</span>";
    else
        str += "<span class=\"panel-header\">" + label.toUpperCase() + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\"  title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton edit-user\">SAVE</span>" +
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
    $("#" + desktopId).append(str);
    getDataForOrgUnit(viewName, res.organizationalUnitId);
}

function renderEditRoleView(viewName, res, view, element, elementType, uniqueId, label) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"ss-edit dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    if (element.name)
        str += "<span class=\"panel-header\">" + label.toUpperCase() + ": " + objectTypeIcon + "" + element.name.toUpperCase() + "</span>";
    else
        str += "<span class=\"panel-header\">" + label.toUpperCase() + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\"  title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton edit-role\">SAVE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\" value=\"" + res.name + "\"/></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\" value=\""+ res.description +  "\"/></textarea></div></li>" +
        // "<label class=\"\">DESCRIPTION:</label><input class=\"descriptionInput\" value=\"" + res.description + "\"/></li>" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label class=\"\">TOOL MODE<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"toolSelected\" elementId=\"" + res.modeDirectExpressionOrBoth + "\" readonly/>" +
        "<div id=\"" + viewName + "toolMode\" class=\"toolModeDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearToolSelected\">CLEAR</span></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">IS APPROVAL REQUIRED<span class=\"flaticon-help helpIcon\">" +
        "<span class=\"helpText\">Is admin approval required if any user requests to assign this role</span>" +
        "</span><span style=\"color:#ec4c4c;\">*</span>:</label>";
    if (res.approvalRequired === true)
        str += "<span class=\"canDeliver\"><span class=\"canDeliverYes isApprovalReqClick active\">YES</span><span class=\"canDeliverNo isApprovalReqClick\">NO</span></span></li>";
    else
        str += "<span class=\"canDeliver\"><span class=\"canDeliverYes isApprovalReqClick\">YES</span><span class=\"canDeliverNo isApprovalReqClick active\">NO</span></span></li>";
    str += "<li class=\"create-shield-field\">" +
        "<label class=\"\">CAN APPROVE<span class=\"flaticon-help helpIcon\">" +
        "<span class=\"helpText\">Can user with this role approve \"role assignment requests \"</span>" +
        " </span><span style=\"color:#ec4c4c;\">*</span>:</label>";
    if (res.canApprove === true)
        str += "<span class=\"canDeliver\"><span class=\"canDeliverYes canApproveClick active\">YES</span><span class=\"canDeliverNo canApproveClick\">NO</span></span></li>";
    else
        str += "<span class=\"canDeliver\"><span class=\"canDeliverYes canApproveClick \">YES</span><span class=\"canDeliverNo canApproveClick active\">NO</span></span></li>";
    str += "</ul></div>";
    $("#" + desktopId).append(str);
    getToolModes(viewName, res.modeDirectExpressionOrBoth);
    applyRichTextEditorById("descriptionInput"+uniqueId);
}

function renderEditSceElementView(viewName, res, view, element, elementType, uniqueId, label, isCopy) {
    getParameterExpressionDvForEditView(viewName, res, view, element, elementType, uniqueId, label, isCopy);
}

function getParameterExpressionDvForEditView(viewName, resElement, view, element, elementType, uniqueId, label, isCopy) {
    function objectiveParameterDvForExpression(viewName, resElement, view, element, elementType, uniqueId, label) {
        service.getObjectiveParameterDv(null, function (res, err) {
            if (res) {
                backing.objectiveParameterDv = res;
                methodParameterDvForExpression(viewName, resElement, view, element, elementType, uniqueId, label);
            }
            else if (err) {
                $("#saveData").hide();
            }
        });
    }

    function methodParameterDvForExpression(viewName, resElement, view, element, elementType, uniqueId, label) {
        service.getMethodParameterDv(null, function (res, err) {
            if (res) {
                backing.methodParameterDv = res;
                contentParameterDvForExpression(viewName, resElement, view, element, elementType, uniqueId, label);
            }
            else if (err) {
                $("#saveData").hide();
            }
        });
    }

    function contentParameterDvForExpression(viewName, resElement, view, element, elementType, uniqueId, label) {
        service.getContentParameterDv(null, function (res, err) {
            if (res) {
                backing.contentParameterDv = res;
                subjectParameterDvForExpression(viewName, resElement, view, element, elementType, uniqueId, label);
            }
            else if (err) {
                $("#saveData").hide();
            }
        });
    }

    function subjectParameterDvForExpression(viewName, resElement, view, element, elementType, uniqueId, label) {
        service.getSubjectParameterDv(null, function (res, err) {
            if (res) {
                backing.subjectParameterDv = res;
                renderSceElementEditView(viewName, resElement, view, element, elementType, uniqueId, label, isCopy);
                $("#" + viewName).find(".expressionChildViewText.active").parents(".element_li").each(function () {
                    $(this).children(".directoryListItemContainer").find(".d-text").addClass("active");
                });
                $("#" + viewName).find(".expressionChildViewText.selected").closest(".element_li").each(function () {
                    let a = $(this).closest(".tree_structure_parent");
                    let b = $(this);
                    a.animate({scrollTop: b.offset().top - a.offset().top + a.scrollTop(), scrollLeft: 0}, 300);
                });
                getSelectedString(viewName);
            }
            else if (err) {
                $("#saveData").hide();
            }
        });
    }

    objectiveParameterDvForExpression(viewName, resElement, view, element, elementType, uniqueId, label);
}

function getSelectedString(viewName) {
    $("#" + viewName).find(".selectedName").html("");
    $("#" + viewName).find(".expressionChildViewText.selected").each(function () {
        $(this).parents(".element_li").children(".directoryListItemContainer").find(".d-text").each(function () {
            $(this).closest(".innerBlock").children("div.expressionViewHeader").children(".selectedName").append($(this).html() + ":");
        });
        let string = $(this).closest(".innerBlock").children("div.expressionViewHeader").children(".selectedName").html();
        let newstring = string.substr(0, string.length - 1);
        $(this).closest(".innerBlock").children("div.expressionViewHeader").children(".selectedName").html(newstring);
        $(this).closest(".innerBlock").children("div.expressionViewHeader").children(".selectedName").attr("title", newstring)
    });
}

function saveShieldOrStandard(data, desktop, view) {
    function callback() {
        let event = {"key": backing.event_type.edited_shield.key};
        propagateEvent(event);
        if (view === "Shield") {
            let shieldSchemaDesktopUtil = new ShieldSchemaDesktopUtils();
            shieldSchemaDesktopUtil.getShieldsOfShieldType();
        }
        else if (view === "Standard") {
            let standardSchemaDesktopUtil = new StandardSchemaDesktopUtils();
            standardSchemaDesktopUtil.getShieldsOfShieldType();
        }
        else if (view === "BusinessFrameworks") {
            let businessSchemaDesktopUtil = new BusinessSchemaDesktopUtils();
            businessSchemaDesktopUtil.getShieldsOfShieldType();
        }
        else if (view === "Threat") {
            let threatSchemaDesktopUtil = new ThreatSchemaDesktopUtils();
            threatSchemaDesktopUtil.getShieldsOfShieldType();
        }
        desktop.remove();
        $("#popUp").addClass("dis-none");
        $("#saveData").hide();
    }

    $("#saveData").show();
    service.editShield(data, function (res, err) {
        if (res) {
            alert("Successfully Edited");
            serviceFunctions.getAllShieldAndStandardSchema(callback);
        }
        else if (err) {
            if (err.status === 409)
                alert(err.responseJSON.errorMessage);
            else
                errorHandler(err);
            $("#saveData").hide();
        }
    });
}

function saveShieldElementType(data, desktop, selectedShield, view) {
    function callbackEditShieldElement() {
        alert("Successfully Edited");
        if (view === "shieldSchema") {
            let shieldSchemaDesktopUtil = new ShieldSchemaDesktopUtils();
            shieldSchemaDesktopUtil.shieldSelectorClick(selectedShield);
        }
        else if (view === "standardSchema") {
            let standardSchemaDesktopUtil = new StandardSchemaDesktopUtils();
            standardSchemaDesktopUtil.shieldSelectorClick(selectedShield);
        }
        else if (view === "businessSchema") {
            let businessSchemaDesktopUtil = new BusinessSchemaDesktopUtils();
            businessSchemaDesktopUtil.shieldSelectorClick(selectedShield);
        }
        let event = {"key": backing.event_type.edited_shield_element_type.key};
        propagateEvent(event);
        desktop.remove();
        $("#popUp").addClass("dis-none");
        $("#saveData").hide();
    }

    $("#saveData").show();
    service.editShieldElementType(data, function (res, err) {
        if (res) {
            serviceFunctions.getAllShieldAndStandardSchema(callbackEditShieldElement);
        }
        else if (err) {
            if (err.status === 409)
                alert(err.responseJSON.errorMessage);
            else
                errorHandler(err);
            $("#saveData").hide();
        }
    });
}

function savePerspective(data, desktop) {
    $("#saveData").show();
    service.editPerspective(data, function (res, err) {
        if (res) {
            alert("Successfully Edited");
            let rulerTypeDesktopUtil = new RulerTypeDesktopUtils();
            rulerTypeDesktopUtil.getShieldsOfShieldType();
            desktop.remove();
            let event = {"key": backing.event_type.edited_perspective.key};
            propagateEvent(event);
            $("#popUp").addClass("dis-none");
            $("#saveData").hide();
        }
        else if (err) {
            if (err.status === 409)
                alert(err.responseJSON.errorMessage);
            else
                errorHandler(err);
            $("#saveData").hide();
        }
    });
}

function selectedShieldElementType(id, shieldElementGroupMemberIds) {
    for (let i = 0; i < shieldElementGroupMemberIds.length; i++) {
        if (id === shieldElementGroupMemberIds[i])
            return true;
    }
    return false;
}