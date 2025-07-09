$(document).ready(function () {
    /* asset delivers ruler Type */
    $(document).on("click", ".singleview-evaluation-view", function (e) {
        renderEvaluationViewClick($(this), false);
        e.stopPropagation();
    });

    $(document).on("click", ".biview-evaluation-view", function (e) {
        renderEvaluationViewClick($(this), true);
        e.stopPropagation();
    });

    $(document).on('change', '.evaluationRange', function (e) {
        OnChangeOfEvalRange($(this));
        e.stopPropagation();
    });

    $(document).on('change', '.biviewEvaluationRange', function (e) {
        OnChangeOfEvalRange($(this));
        e.stopPropagation();
    });
    /* asset delivers ruler Type */

    /* shield Element ruler Type */
    $(document).on("click", ".singleview-shield-element-evaluation-view", function (e) {
        renderShieldElementEvaluationViewClick($(this), false);
        e.stopPropagation();
    });

    $(document).on('change', '.shieldElementEvaluationRange', function (e) {
        OnChangeOfshieldElementEvalRange($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".biview-shield-element-evaluation-view", function (e) {
        renderShieldElementEvaluationViewClick($(this), true);
        e.stopPropagation();
    });

    $(document).on('change', '.biviewShieldElementEvaluationRange', function (e) {
        OnChangeOfshieldElementEvalRange($(this));
        e.stopPropagation();
    });
    /* shield Element ruler Type */

    $(document).on("click", ".createAttribute", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        if ($(this).hasClass("shieldElementAttribute")) {
            renderCreateAttributePopUp($(this), "shieldElementAttribute", view);
        }
        else if ($(this).hasClass("assetDeliversAttribute")) {
            renderCreateAttributePopUp($(this), "assetDeliversAttribute", view);
        }
    });

    $(document).on("click", ".create-attribute", function (e) {
        createAttributeClick($(this), false);
        e.stopPropagation();
    });

    $(document).on("click", ".biviewCreateAttribute", function () {
        if ($(this).hasClass("shieldElementAttribute")) {
            renderCreateAttributePopUp($(this), "shieldElementAttribute");
        }
        else if ($(this).hasClass("assetDeliversAttribute")) {
            renderCreateAttributePopUp($(this), "assetDeliversAttribute");
        }
    });

    $(document).on("click", ".biviewCreate-attribute", function (e) {
        createAttributeClick($(this), true);
        e.stopPropagation();
    });

    $(document).on("click", ".edit-attribute", function (e) {
        editAttributeClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".save-attribute", function (e) {
        SaveAttributeClick($(this), false);
        e.stopPropagation();
    });

    $(document).on("click", ".biviewEdit-attribute", function (e) {
        editAttributeClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".save-biview-attribute", function (e) {
        SaveAttributeClick($(this), true);
        e.stopPropagation();
    });

    $(document).on('input', 'input[type="range"]', function (e) {
        $(this).next().find(".rangeslider__handle").text($(this).val());

        e.stopPropagation();
    });

    $(document).on('click', '.save-justification', function (e) {
        let data = {};
        let desktop = $(this).closest(".innerDesktop");
        data.assetDeliversAttributeId = $(this).attr("attributeId");
        data.rating = $(this).attr("rating");
        data.justificationReason = desktop.find(".justificationReasonInput").val().trim();
        let callbackfn = function (res, err) {
            if (res) {
                alert("Successfully Saved");
                let event = {"key": backing.event_type.edited_asset_delivers_rating.key};
                propagateEvent(event);
                $("#popUp").addClass("dis-none");
                $("#saveData").hide();
            }
            else if (err) {
                errorHandler(err);
            }
        };
        if(!backing.isDirectMode)
            service.saveAttributeRating(data, callbackfn);
        else {
            data.assetImplementsAttributeId = data.assetDeliversAttributeId;
            service.saveAssetImplementsAttributeRating(data, callbackfn);
        }
        e.stopPropagation();
    });

    $(document).on('click', '.cancel-justification', function (e) {
        let data = {};
        let desktop = $(this).closest(".innerDesktop");
        data.assetDeliversAttributeId = $(this).attr("attributeId");
        data.rating = $(this).attr("rating");
        data.justificationReason = desktop.find(".justificationReasonInput").val().trim();
        let callbackfn = function (res, err) {
            if (res) {
                alert("Successfully Saved");
                let event = {"key": backing.event_type.edited_asset_delivers_rating.key};
                propagateEvent(event);
                $("#popUp").addClass("dis-none");
                $("#saveData").hide();
            }
            else if (err) {
                errorHandler(err);
            }
        };
        if(!backing.isDirectMode)
            service.saveAttributeRating(data, callbackfn);
        else {
            data.assetImplementsAttributeId = data.assetDeliversAttributeId;
            service.saveAssetImplementsAttributeRating(data, callbackfn);
        }
        e.stopPropagation();
    });

    $(document).on('click', '.editJustification', function (e) {
        editJustificationClick($(this));
        e.stopPropagation();

    });

    $(document).on('click', '.biview-editJustification', function (e) {
        editJustificationClick($(this));
        e.stopPropagation();
    });

    $(document).on('click', '.saveEditJustification', function (e) {
        saveEditJustificationClick($(this));
        e.stopPropagation();
    });

    $(document).on('click', '.biview-saveEditJustification', function (e) {
        saveEditJustificationClick($(this));
        e.stopPropagation();
    });

    $(document).on('click', '.evaluationCheckBox', function (e) {
        evaluationCheckboxClick($(this));
        e.stopPropagation();
    });

    $(document).on('click', '.biviewEvaluationCheckBox', function (e) {
        evaluationCheckboxClick($(this));
        e.stopPropagation();
    });

    $(document).on('click', '.shieldElementCheckBox', function (e) {
        shieldElementEvaluationCheckboxClick($(this));
        e.stopPropagation();
    });

    $(document).on('click', '.biviewShieldElementCheckBox', function (e) {
        shieldElementEvaluationCheckboxClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".singleview-libraryView", function (e) {
        renderLibraryViewClick($(this), false);
        e.stopPropagation();
    });

    $(document).on("click", ".selectAllLibrary", function (e) {
        let desktop = $(this).closest(".innerDesktop");
        $(this).addClass("active");
        desktop.find(".deSelectAllLibrary").removeClass("active");
        desktop.find(".treeContainerAssociationView").find(".checkbox-td").each(function () {
            $(this).find("input").prop("checked", true);
        });
        e.stopPropagation();
    });

    $(document).on("click", ".deSelectAllLibrary", function (e) {
        let desktop = $(this).closest(".innerDesktop");
        $(this).addClass("active");
        desktop.find(".selectAllLibrary").removeClass("active");
        desktop.find(".treeContainerAssociationView").find(".checkbox-td").each(function () {
            $(this).find("input").prop("checked", false);
        });
        e.stopPropagation();
    });

    $(document).on("change", ".checkbox-td input", function (e) {
        let desktop = $(this).closest(".innerDesktop");
        let selectAll = false;
        let deselectAll = false;
        desktop.find(".treeContainerAssociationView").find(".checkbox-td").each(function () {
            if ($(this).find("input").prop("checked") === true) {
                deselectAll = true;
            }
            else if ($(this).find("input").prop("checked") === false) {
                selectAll = true;
            }
        });
        if (selectAll)
            desktop.find(".selectAllLibrary").removeClass("active");
        if (deselectAll)
            desktop.find(".deSelectAllLibrary").removeClass("active");
        e.stopPropagation();

    });

    $(document).on("click", ".addAttributeFromLibrary", function (e) {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
        if (view === "biview") {
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        }
        else {
            activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
            activeDesktopKeyname = backing.singleview.active_desktop.keyname;
            activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        }
        let data = {};
        data.perspectiveId = $(this).attr("persId");
        data.libraryAttributeIdsList = [];
        let assetArray = [];
        desktop.find(".checkbox-td").each(function () {
            if ($(this).find(':checkbox').prop("checked") === true) {
                assetArray.push($(this).closest("tr").attr("attributeId"));
            }
        });
        data.libraryAttributeIdsList = assetArray;
        if ($(this).hasClass("shieldElementAttribute")) {
            data.shieldElementId = $(this).attr("linkId");
            service.addShieldElementLibraryAttribute(data, function (res, err) {
                if (res) {
                    alert("Successfully Added");
                    let event = {"key": backing.event_type.added_shield_element_attribute_library.key};
                    propagateEvent(event);
                    $("#popUp").addClass("dis-none");
                    $("#saveData").hide();
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
        else if ($(this).hasClass("assetDeliversAttribute")) {
            data.assetDeliversLinkId = $(this).attr("linkId");
            let callbackfn = function (res, err) {
                if (res) {
                    alert("Successfully Added");
                    let event = {"key": backing.event_type.added_asset_delivers_attribute_library.key};
                    propagateEvent(event);
                    $("#popUp").addClass("dis-none");
                    $("#saveData").hide();
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
            };
            if(!backing.isDirectMode)
                service.addAssetLibraryAttribute(data, callbackfn);
            else {
                data.assetImplementsElementLinkId = data.assetDeliversLinkId;
                service.addAssetImplementsLibraryAttribute(data, callbackfn);
            }
        }
        if ($(this).hasClass("desktopShieldElementAttribute")) {
            data.shieldElementTypeId = $(this).attr("linkId");
            if (desktop.find(".attributeCheckBox").is(":checked")) {
                data.replaceAllExistingAttributes = true;
            }
            else {
                data.replaceAllExistingAttributes = false;
            }
            data.shieldElementTypeId = $("#" + activeDesktop.selector.level_dropdown_selected_id).attr("elementtypeid");
            service.addShieldElementAttributesFromLibraryToAll(data, function (res, err) {
                if (res) {
                    alert("Successfully Added");
                    let event = {"key": backing.event_type.added_shield_element_attribute_library.key};
                    propagateEvent(event);
                    $("#popUp").addClass("dis-none");
                    $("#saveData").hide();
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
        if ($(this).hasClass("desktopAssetDeliversAttribute")) {
            if (desktop.find(".attributeCheckBox").is(":checked")) {
                data.replaceAllExistingAttributes = true;
            }
            else {
                data.replaceAllExistingAttributes = false;
            }
            let callbackfn = function (res, err) {
                if (res) {
                    alert("Successfully Added");
                    let event = {"key": backing.event_type.added_shield_element_attribute_library.key};
                    propagateEvent(event);
                    $("#popUp").addClass("dis-none");
                    $("#saveData").hide();
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
            };
            if(!backing.isDirectMode)
                service.addAssetDeliversAttributesFromLibraryToAllRateableObjects(data, callbackfn);
            else
                service.addAssetImplementsAttributesFromLibraryToAllRateableObjects(data, callbackfn);
        }
        e.stopPropagation();
    });

    $(document).on("click", ".singleviewcreateAttributeToLibrary", function (e) {
        createAttributeToLibraryClick($(this), false);
        e.stopPropagation();
    });

    $(document).on("click", ".singleviewcreate-attribute-to-library", function (e) {
        saveAttributeToLibraryClick($(this));
        e.stopPropagation();
    });

    $(document).on("click", ".editAttributeLibrary", function () {
        let data = {};
        if ($(this).hasClass("assetDeliversAttribute")) {
            data.assetDeliversLibraryAttributeId = parseInt($(this).attr("elementId"));
            let callbackfn = function (res) {
                if (res) {
                    renderEditAttributeLibraryPopUp(res, data, "assetDeliversAttribute");
                }
            };
            if(!backing.isDirectMode)
                service.getAssetLibraryAttributeInfo(data, callbackfn);
            else
                service.getAssetImplementsLibraryAttributeInfo(data, callbackfn);
        }
        else if ($(this).hasClass("shieldElementAttribute")) {
            data.shieldElementLibraryAttributeId = parseInt($(this).attr("elementId"));
            service.getShieldElementLibraryAttributeInfo(data, function (res) {
                if (res) {
                    renderEditAttributeLibraryPopUp(res, data, "shieldElementAttribute");
                    $("#saveData").hide();
                }
            });

        }

    });

    $(document).on("click", ".save-attribute-library", function () {
        let attributeToEdit;
        let desktop = $(this).closest(".innerDesktop");
        let data = {};
        let activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        if (activeDesktopKeyname === "ruler_type_desktop") {
            attributeToEdit = "assetDeliversAttribute";
        }
        else if (activeDesktopKeyname === "shield_element_ruler_type_desktop") {
            attributeToEdit = "shieldElementAttribute";
        }
        data.elementId = $(this).attr("attributeId");
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.oneRatingDescription = desktop.find(".oneRatingDescInput").val();
        data.twoRatingDescription = desktop.find(".twoRatingDescInput").val();
        data.threeRatingDescription = desktop.find(".threeRatingDescInput").val();
        data.fourRatingDescription = desktop.find(".fourRatingDescInput").val();
        data.fiveRatingDescription = desktop.find(".fiveRatingDescInput").val();
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        else if ((typeof data.oneRatingDescription === "undefined") || (data.oneRatingDescription === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        else if ((typeof data.twoRatingDescription === "undefined") || (data.twoRatingDescription === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        else if ((typeof data.threeRatingDescription === "undefined") || (data.threeRatingDescription === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        else if ((typeof data.fourRatingDescription === "undefined") || (data.fourRatingDescription === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        else if ((typeof data.fiveRatingDescription === "undefined") || (data.fiveRatingDescription === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        saveAttributeLibrary(data, desktop, attributeToEdit);
    });

    $(document).on("click", ".addAttributeFromLibraryPopup", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let data = {};
        if ($(this).hasClass("shieldElementAttribute")) {
            data.perspectiveId = $(this).attr("persId");
            data.linkId = $(this).attr("linkId");
            service.getAllShieldElementLibraryAttribute(data, function (res, err) {
                if (res) {
                    renderAddAttributePopUp(res, data, "shieldElementAttribute", view);
                }
                else if (err) {
                    $("#saveData").hide();
                }
            });
        }
        else if ($(this).hasClass("assetDeliversAttribute")) {
            data.perspectiveId = $(this).attr("persId");
            data.linkId = $(this).attr("linkId");
            let callbackfn = function (res, err) {
                if (res) {
                    renderAddAttributePopUp(res, data, "assetDeliversAttribute", view);
                }
                else if (err) {
                    $("#saveData").hide();
                }
            };
            if(!backing.isDirectMode)
                service.getAllAssetLibraryAttribute(data, callbackfn);
            else
                service.getAllAssetImplementsLibraryAttribute(data, callbackfn);
        }
    });

    $(document).on("click", ".deskAddAttributeFromLib", function (e) {
        let desktop = $(this).closest(".innerDesktop");
        let side = desktop.attr("side");
        let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop, view;
        if (side === "right") {
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
            view = "biview"
        }
        else if (side === "left") {
            activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
            activeDesktopKeyname = backing.singleview.active_desktop.keyname;
            activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
            view = "singleview"
        }
        let selectedPerspectiveId = activeDesktop.perspectivesSelected;
        let data = {};
        if ($(this).hasClass("desktopShieldElementAttribute")) {
            data.perspectiveId = selectedPerspectiveId;
            service.getAllShieldElementLibraryAttribute(data, function (res, err) {
                if (res) {
                    renderAddAttributePopUp(res, data, "desktopShieldElementAttribute", view);
                }
                else if (err) {
                    $("#saveData").hide();
                }
            });
        }
        else if ($(this).hasClass("desktopAssetDeliversAttribute")) {
            data.perspectiveId = selectedPerspectiveId;
            let callbackfn = function (res, err) {
                if (res) {
                    renderAddAttributePopUp(res, data, "desktopAssetDeliversAttribute", view);
                }
                else if (err) {
                    $("#saveData").hide();
                }
            };
            if(!backing.isDirectMode)
                service.getAllAssetLibraryAttribute(data, callbackfn);
            else
                service.getAllAssetImplementsLibraryAttribute(data, callbackfn);
        }
        e.stopPropagation()
    });

    /*biview -library*/
    $(document).on("click", ".biview-libraryView", function (e) {
        renderLibraryViewClick($(this), true);
        e.stopPropagation();
    });

    $(document).on("click", ".biviewcreateAttributeToLibrary", function (e) {
        createAttributeToLibraryClick($(this), true);
        e.stopPropagation();
    });

    $(document).on("click", ".biviewcreate-attribute-to-library", function (e) {
        saveAttributeToLibraryClick($(this));
        e.stopPropagation();
    });

});
var counter = 0;

function renderEvaluationViewClick(selector, isBiview) {
    let src_hotlinkId = selector.attr("id");
    let uniqueId = selector.attr("uniqueId");
    let label = selector.attr("title");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let childviewDivId = backing.view_type.evaluationview.name + "_" + src_hotlinkId;
    let activeDesktop = getActiveDesktop(isBiview);
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
    let activeDesktopPerspectiveContainer = activeDesktop.selector.perspective_container;
    let selectedPerspectives = [], viewClass;
    if (isBiview)
        viewClass = "biview";
    else
        viewClass = "singleview";
    //check for space in screen
    let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.evaluationview.key);
    if (!haveSpaceToOpenView) {
        return;
    }
    //check view is opened before
    let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
    if (isViewOpenedBefore) {
        return;
    }
    $("#" + activeDesktopPerspectiveContainer).find(".perspectiveItem").each(function () {
        if ($(this).hasClass("selected")) {
            selectedPerspectives.push($(this).attr("elementId"));
        }
    });
    createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.evaluationview.key, "Evaluation View: " + element.name, uniqueId, isBiview);
    let data = {};
    let obj = {};
    obj.linkId = element.linkId;
    obj.linkType = element.linkType;
    data.assetDeliversLinkId = element.linkId;
    data.perspectiveIds = selectedPerspectives;
    let callbackfn = function (res, err) {
        if (res) {
            service.getElementInfoByLinkId(obj, function (res2, err) {
                if (res2) {
                    renderEvaluationView(childviewDivId, res, viewClass, res2, uniqueId, label);
                }
                else if (err) {
                    errorHandler(err);
                }
            });
        }
        else if (err) {
            errorHandler(err);
        }
    };
    if(!backing.isDirectMode)
        service.getAssetDeliversAttributesRating(data, callbackfn);
    else {
        data.assetImplementsLinkId = data.assetDeliversLinkId;
        service.getAssetImplementsAttributesRating(data, callbackfn);
    }
}

function OnChangeOfEvalRange(selector) {
    if (counter === 1) {
        counter = 0;
        return false;
    }
    console.log(counter);
    let rating = selector.val();
    let attributeId = selector.attr("attributeId");
    let data = {};
    data.assetDeliversAttributeId = attributeId;
    data.rating = rating;
    data.justificationReason = "";
    console.log("save Attribute rating calling");
    let callbackfn = function (res, err) {
        if (res) {
            let event = {"key": backing.event_type.edited_asset_delivers_rating.key};
            propagateEvent(event);
            $("#popUp").addClass("dis-none");
            $("#saveData").hide();
        }
        else if (err) {
            let event = {"key": backing.event_type.edited_asset_delivers_rating.key};
            propagateEvent(event);
            errorHandler(err);
        }
    };
    if(!backing.isDirectMode)
        service.saveAttributeRating(data, callbackfn);
    else {
        data.assetImplementsAttributeId = data.assetDeliversAttributeId;
        service.saveAssetImplementsAttributeRating(data, callbackfn);
    }
    counter = 0;
    counter++;
}

function renderShieldElementEvaluationViewClick(selector, isBiview) {
    let src_hotlinkId = selector.attr("id");
    let uniqueId = selector.attr("uniqueId");
    let label = selector.attr("title");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let childviewDivId = backing.view_type.evaluationview.name + "_" + src_hotlinkId;
    let activeDesktop = getActiveDesktop(isBiview);
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
    let activeDesktopPerspectiveContainer = activeDesktop.selector.perspective_container;
    let selectedPerspectives = [], viewClass;
    if (isBiview)
        viewClass = "biview";
    else
        viewClass = "singleview";
    //check for space in screen
    let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.evaluationview.key);
    if (!haveSpaceToOpenView) {
        return;
    }
    //check view is opened before
    let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
    if (isViewOpenedBefore) {
        return;
    }
    $("#" + activeDesktopPerspectiveContainer).find(".perspectiveItem").each(function () {
        if ($(this).hasClass("selected")) {
            selectedPerspectives.push($(this).attr("elementId"));
        }
    });
    createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.evaluationview.key, "Evaluation View: " + element.name, uniqueId, isBiview);
    let data = {};
    data.shieldElementId = element.elementId;
    data.perspectiveIds = selectedPerspectives;
    service.getShieldElementAttributesAndRating(data, function (res, err) {
        if (res) {
            renderShieldElementEvaluationView(childviewDivId, res, viewClass, element, uniqueId, label);
        }
        else if (err) {
            errorHandler(err);
        }
    });
}

function OnChangeOfshieldElementEvalRange(selector) {
    if (counter === 1) {
        counter = 0;
        return false;
    }
    let rating = selector.val();
    let attributeId = selector.attr("attributeId");
    let data = {};
    data.shieldElementAttributeId = attributeId;
    data.rating = rating;
    data.justificationReason = "";
    service.saveShieldElementAttributeRating(data, function (res, err) {
        if (res) {
            let event = {"key": backing.event_type.edited_shield_element_attribute_rating.key};
            propagateEvent(event);
            $("#popUp").addClass("dis-none");
            $("#saveData").hide();
        }
        else if (err) {
            let event = {"key": backing.event_type.edited_shield_element_attribute_rating.key};
            propagateEvent(event);
            errorHandler(err);
        }
    });
    $(this).next().find(".rangeslider__handle").text(rating);
    counter = 0;
    counter++;
}

function createAttributeClick(selector, isBiview) {
    let desktop = selector.closest(".innerDesktop");
    let data = {};
    let activeDesktop = getActiveDesktop(isBiview);
    let createShieldElementAttr, createAssetDeliversAttr, createAssetDeliversAttrForAll, createShieldElementAttrForAll;
    if (selector.hasClass("shieldElementAttribute")) {
        createShieldElementAttr = true;
        data.shieldElementId = selector.attr("linkId");
    }
    else if (selector.hasClass("assetDeliversAttribute")) {
        createAssetDeliversAttr = true;
        data.assetDeliversLinkId = selector.attr("linkId");
    }
    else if (selector.hasClass("desktopAssetDeliversAttribute")) {
        createAssetDeliversAttrForAll = true;
    }
    else if (selector.hasClass("desktopShieldElementAttribute")) {
        createShieldElementAttrForAll = true;
        data.shieldElementTypeId = $("#" + activeDesktop.selector.level_dropdown_selected_id).attr("elementtypeid");
    }
    data.perspectiveId = parseInt(selector.attr("persId"));
    data.name = desktop.find(".nameInput").val().trim();
    data.description = desktop.find(".descriptionInput").val().trim();
    data.coefficient = desktop.find(".coefficientInput").val().trim();
    data.oneRatingDescription = desktop.find(".oneRatingDescInput").val();
    data.twoRatingDescription = desktop.find(".twoRatingDescInput").val();
    data.threeRatingDescription = desktop.find(".threeRatingDescInput").val();
    data.fourRatingDescription = desktop.find(".fourRatingDescInput").val();
    data.fiveRatingDescription = desktop.find(".fiveRatingDescInput").val();
    if ((typeof data.name === "undefined") || (data.name === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    else if ((typeof data.oneRatingDescription === "undefined") || (data.oneRatingDescription === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    else if ((typeof data.twoRatingDescription === "undefined") || (data.twoRatingDescription === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    else if ((typeof data.threeRatingDescription === "undefined") || (data.threeRatingDescription === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    else if ((typeof data.fourRatingDescription === "undefined") || (data.fourRatingDescription === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    else if ((typeof data.fiveRatingDescription === "undefined") || (data.fiveRatingDescription === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    if (createAssetDeliversAttr)
        createAssetDeliversAttribute(data, desktop);
    else if (createShieldElementAttr)
        createShieldElementAttribute(data, desktop);
    else if (!isBiview) {
        if (createAssetDeliversAttrForAll)
            createAssetDeliversAttributeForAll(data, desktop);
        else if (createShieldElementAttrForAll)
            createShieldElementAttributeForAll(data, desktop);
    }
}

function SaveAttributeClick(selector, isBiview) {
    let attributeToEdit;
    let desktop = selector.closest(".innerDesktop");
    let data = {}, activeDesktopKeyname;
    if (isBiview)
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
    else
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
    if (activeDesktopKeyname === "ruler_type_desktop") {
        attributeToEdit = "assetDeliversAttribute";
    }
    else if (activeDesktopKeyname === "shield_element_ruler_type_desktop") {
        attributeToEdit = "shieldElementAttribute";
    }
    data.activated = selector.attr("activated");
    data.elementId = selector.attr("attributeId");
    data.name = desktop.find(".nameInput").val().trim();
    data.description = desktop.find(".descriptionInput").val().trim();
    data.coefficient = desktop.find(".coefficientInput").val().trim();
    data.oneRatingDescription = desktop.find(".oneRatingDescInput").val();
    data.twoRatingDescription = desktop.find(".twoRatingDescInput").val();
    data.threeRatingDescription = desktop.find(".threeRatingDescInput").val();
    data.fourRatingDescription = desktop.find(".fourRatingDescInput").val();
    data.fiveRatingDescription = desktop.find(".fiveRatingDescInput").val();
    if ((typeof data.name === "undefined") || (data.name === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    else if ((typeof data.oneRatingDescription === "undefined") || (data.oneRatingDescription === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    else if ((typeof data.twoRatingDescription === "undefined") || (data.twoRatingDescription === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    else if ((typeof data.threeRatingDescription === "undefined") || (data.threeRatingDescription === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    else if ((typeof data.fourRatingDescription === "undefined") || (data.fourRatingDescription === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    else if ((typeof data.fiveRatingDescription === "undefined") || (data.fiveRatingDescription === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    saveAttribute(data, desktop, attributeToEdit);
}

function editAttributeClick(selector) {
    let data = {};
    data.attributeId = selector.attr("elementId");
    if (selector.closest("tr").find("input").is(":checked"))
        data.activated = true;
    else
        data.activated = false;
    if (selector.hasClass("assetDeliversAttribute")) {
        let callbackfn = function (res) {
            if (res) {
                renderEditAttributePopUp(res, data, "assetDeliversAttribute");
            }
        };
        if(!backing.isDirectMode)
            service.getAssetDeliversAttributesInfo(data, callbackfn);
        else
            service.getAssetImplementsAttributesInfo(data, callbackfn);
    }
    else if (selector.hasClass("shieldElementAttribute")) {
        service.getShieldElementAttributesInfo(data, function (res) {
            if (res) {
                renderEditAttributePopUp(res, data, "shieldElementAttribute");
                $("#saveData").hide();
            }
        });
    }
}

function editJustificationClick(selector) {
    let data = {}, attributeToJustify;
    let desktop = selector.closest(".innerDesktop");
    let closestTr = selector.closest("tr");
    if (selector.hasClass("assetDeliversAttribute")) {
        attributeToJustify = "assetDeliversAttribute";
    }
    else if (selector.hasClass("shieldElementAttribute")) {
        attributeToJustify = "shieldElementAttribute";
    }
    data.attributeId = closestTr.attr("attributeId");
    data.ratingId = closestTr.attr("ratingId");
    data.justificationReason = desktop.find(".info-tooltip-text").find("span").html();
    renderEditJustificationReasonPopUp(data, attributeToJustify);
}

function saveEditJustificationClick(selector) {
    let data = {};
    let desktop = selector.closest(".innerDesktop");
    if (selector.hasClass("shieldElementAttribute")) {
        {
            data.justificationReason = desktop.find(".justificationReasonInput").val().trim();
            data.shieldElementAttributeId = selector.attr("attributeId");
            data.shieldElementRatingId = selector.attr("ratingId");
        }
        service.saveShieldElementAttributeJustification(data, function (res, err) {
            if (res) {
                alert("Successfully Edited");
                let event = {"key": backing.event_type.edited_shield_element_rating_justification_reason.key};
                propagateEvent(event);
                desktop.remove();
                $("#popUp").addClass("dis-none");
                $("#saveData").hide();
            }
            else if (err) {
                errorHandler(err);
            }
        });
    }
    else if (selector.hasClass("assetDeliversAttribute")) {
        data.assetDeliversAttributeId = selector.attr("attributeId");
        data.assetDeliversRatingId = selector.attr("ratingId");
        data.justificationReason = desktop.find(".justificationReasonInput").val().trim();
        let callbackfn = function (res, err) {
            if (res) {
                alert("Successfully Edited");
                let event = {"key": backing.event_type.edited_asset_delivers_rating_justification_reason.key};
                propagateEvent(event);
                desktop.remove();
                $("#popUp").addClass("dis-none");
                $("#saveData").hide();
            }
            else if (err) {
                errorHandler(err);
            }
        };
        if(!backing.isDirectMode)
            service.saveJustificationReason(data, callbackfn);
        else {
            data.assetImplementsAttributeId = data.assetDeliversAttributeId;
            data.assetImplementsRatingId = data.assetDeliversRatingId;
            service.saveAssetImplementsJustificationReason(data, callbackfn);
        }
    }
}

function evaluationCheckboxClick(selector) {
    let data = {};
    let closestTr = selector.closest("tr");
    data.attributeId = closestTr.attr("attributeId");
    if (selector.is(":checked")) {
        data.activated = true;
    }
    else {
        data.activated = false;
    }
    let callbackfn = function (res, err) {
        if (res)
            saveActivatedAssetElement(res, data);
        else if (err)
            errorHandler(err);
    };
    if(!backing.isDirectMode)
        service.getAssetDeliversAttributesInfo(data, callbackfn);
    else
        service.getAssetImplementsAttributesInfo(data, callbackfn);
}

function shieldElementEvaluationCheckboxClick(selector) {
    let data = {};
    let closestTr = selector.closest("tr");
    data.attributeId = closestTr.attr("attributeId");
    if (selector.is(":checked")) {
        data.activated = true;
    }
    else {
        data.activated = false;
    }
    service.getShieldElementAttributesInfo(data, function (res) {
        if (res) {
            saveActivatedShieldElement(res, data);
        }
    });
}

function renderLibraryViewClick(selector, isBiview) {
    $("#saveData").show();
    let src_hotlinkId = selector.attr("id");
    let src_id = selector.closest(".innerDesktop").attr("id");
    let haveSpaceToOpenView, isViewOpenedBefore, attributeLibraryViewDivId;
    if (selector.hasClass("shieldElementAttribute")) {
        attributeLibraryViewDivId = backing.view_type.shield_attribute_library_view.name + "_" + src_hotlinkId;
        haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.shield_attribute_library_view.key);
        if (!haveSpaceToOpenView) {
            $("#saveData").hide();
            return;
        }
        isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(attributeLibraryViewDivId, isBiview);
    }
    else if (selector.hasClass("assetDeliversAttribute")) {
        attributeLibraryViewDivId = backing.view_type.asset_attribute_library_view.name + "_" + src_hotlinkId;
        haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.asset_attribute_library_view.key);
        if (!haveSpaceToOpenView) {
            $("#saveData").hide();
            return;
        }
        isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(attributeLibraryViewDivId, isBiview);
    }
    if (isViewOpenedBefore) {
        $("#saveData").hide();
        return;
    }
    let uniqueId = selector.attr("uniqueid");
    let data = {};
    data.perspectiveId = selector.attr("persId");
    if (selector.hasClass("shieldElementAttribute")) {
        data.shieldElementTypeId = selector.attr("linkId");
        service.getAllShieldElementLibraryAttribute(data, function (res, err) {
            if (res) {
                generateUniqueIdAndParentLink(res, "attributeLibraryView", null);
                renderShieldAttributeLibraryView(res, attributeLibraryViewDivId, uniqueId, data, isBiview);
                createScenarioViewOpenedFromView(attributeLibraryViewDivId, src_id, src_hotlinkId, backing.view_type.shield_attribute_library_view.key, "Attribute Library: ", uniqueId, isBiview);
                $("#saveData").hide();
                repositionViews(isBiview);
            }
            else if (err) {
                $("#saveData").hide();
                errorHandler(err);
            }
        });
    }
    else if (selector.hasClass("assetDeliversAttribute")) {
        data.linkId = selector.attr("linkId");
        let callbackfn = function (res, err) {
            if (res) {
                generateUniqueIdAndParentLink(res, "attributeLibraryView", null);
                renderAssetAttributeLibraryView(res, attributeLibraryViewDivId, uniqueId, data, isBiview);
                createScenarioViewOpenedFromView(attributeLibraryViewDivId, src_id, src_hotlinkId, backing.view_type.asset_attribute_library_view.key, "Attribute Library: ", uniqueId, isBiview);
                $("#saveData").hide();
                repositionViews(isBiview);
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
    }
}

function createAttributeToLibraryClick(selector, isBiview) {
    if (selector.hasClass("shieldElementAttribute")) {
        renderCreateAttributeLibraryPopUp(selector, "shieldElementAttribute", isBiview);
    }
    else if (selector.hasClass("assetDeliversAttribute")) {
        renderCreateAttributeLibraryPopUp(selector, "assetDeliversAttribute", isBiview);
    }
}

function saveAttributeToLibraryClick(selector) {
    let desktop = selector.closest(".innerDesktop");
    let data = {}, createAssetDeliversAttr, createShieldElementAttr;
    if (selector.hasClass("shieldElementAttribute")) {
        createShieldElementAttr = true;
        data.shieldElementTypeId = selector.attr("shieldElementTypeId");
    }
    else if (selector.hasClass("assetDeliversAttribute")) {
        createAssetDeliversAttr = true;
    }
    data.perspectiveId = selector.attr("persId");
    data.name = desktop.find(".nameInput").val().trim();
    data.description = desktop.find(".descriptionInput").val().trim();
    data.oneRatingDescription = desktop.find(".oneRatingDescInput").val();
    data.twoRatingDescription = desktop.find(".twoRatingDescInput").val();
    data.threeRatingDescription = desktop.find(".threeRatingDescInput").val();
    data.fourRatingDescription = desktop.find(".fourRatingDescInput").val();
    data.fiveRatingDescription = desktop.find(".fiveRatingDescInput").val();
    if ((typeof data.name === "undefined") || (data.name === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    else if ((typeof data.oneRatingDescription === "undefined") || (data.oneRatingDescription === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    else if ((typeof data.twoRatingDescription === "undefined") || (data.twoRatingDescription === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    else if ((typeof data.threeRatingDescription === "undefined") || (data.threeRatingDescription === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    else if ((typeof data.fourRatingDescription === "undefined") || (data.fourRatingDescription === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    else if ((typeof data.fiveRatingDescription === "undefined") || (data.fiveRatingDescription === "")) {
        alert("Please fill all mandatory fields");
        return;
    }
    if (createAssetDeliversAttr)
        createAssetDeliversAttributeLibrary(data, desktop);
    else if (createShieldElementAttr)
        createShieldElementAttributeLibrary(data, desktop);
}

function initialiseSlider(table, bgColor) {
    let $handle;
    table.find('input[type="range"]').each(function () {
        $(this).rangeslider({
            polyfill: false,
            rangeClass: 'rangeslider range-slid',
            horizontalClass: 'rangeslider--horizontal range-horiz',
            fillClass: 'rangeslider__fill range-fill',
            handleClass: 'rangeslider__handle range-hand',
            onInit: function () {
                $handle = $('.rangeslider__handle', this.$range);
                updateHandle($handle[0], this.value);
            }
        })
    });

    function updateHandle(el, val) {
        console.log("initialse slider " + val);
        el.textContent = val;
    }

    table.find(".range-fill").css("background", bgColor);
}

function renderEvaluationView(viewName, data, view, element, uniqueId, label) {
    let str = "";
    let desktopId, isBiView, columnSpan, parentObjIcon, strObj, parentName;
    let activeDesktop, evaluationRangeClass, evaluationCheckBox, editAttributeClass, editJustification;
    let objIcon;
    if (view === "singleview") {
        isBiView = false;
        evaluationRangeClass = "evaluationRange";
        evaluationCheckBox = "evaluationCheckBox";
        editAttributeClass = "edit-attribute";
        editJustification = "editJustification";
        columnSpan = 10;
    }
    if (view === "biview") {
        isBiView = true;
        evaluationRangeClass = "biviewEvaluationRange";
        evaluationCheckBox = "biviewEvaluationCheckBox";
        editAttributeClass = "biviewEdit-attribute";
        editJustification = "biview-editJustification";
        columnSpan = 10;

    }
    activeDesktop = getActiveDesktop(isBiView);
    desktopId = activeDesktop.div_id;
    let dataviewHotlink = view + "-data-view";
    if (element && element.otherPeer)
        objIcon = renderCircleOrSquareInventoryDv(element.otherPeer, isBiView, "", true);
    if (element && element.expression) {
        parentObjIcon = renderCircleOrSquareInventoryDv(element.expression, isBiView, "", true);
        strObj = combineChainElements(element.expression);
        parentName = strObj.oStr + "  |  " + strObj.mStr + "  |  " + strObj.cStr + "  |  " + strObj.sStr;
    }

    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"flaticon-ruler dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    str += "<span class=\"panel-header\" style=\"max-width: 40%;\">" + label.toUpperCase() + ": " + objIcon + " " + element.otherPeer.name + "<span class=\"linkClassInEval\"> " + element.linkName + "</span></span>";

    if(element && element.expression)
        str += "<span class=\"panel-header\" style=\"max-width: 40%;letter-spacing: 0;\"><span class=\"flaticon-link linkHotLink\" style=\"padding:10px;\"></span>" + parentObjIcon + " " + parentName + "</span>";
    else if(element && element.directPeerOne) {
        directObjIcon = renderCircleOrSquareInventoryDv(element.directPeerOne, isBiView, "", true);
        str += "<span class=\"panel-header\" style=\"max-width: 40%;letter-spacing: 0;\"><span class=\"flaticon-link linkHotLink\" style=\"padding:10px;\"></span>" + directObjIcon + " " + element.directPeerOne.name + "</span>";
    }
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button  refreshButton\" title=\"Refresh\"></span>" +
        "</div>";
    str += "<div class=\"evaluation-content\">";
    if (data && data.children.length > 0) {
        let children = data.children;
        generateUniqueIdForPersAttribute(data, activeDesktop.div_id, null);
        for (let i = 0; i < children.length; i++) {
            let textColor = getContrastColor(children[i].color);
            str += "<div class=\"attributeTableContainer\" persColor=\"" + children[i].color + "\"><span class =\"tableHeader\"></span>" +
                "<table class=\"\">" +
                "<thead><tr>" +
                "<td colspan=\"" + columnSpan + "\" style=\"text-align: left;cursor:pointer;color:" + textColor + "; background-color: " + children[i].color + "\">" + children[i].name.toUpperCase() + " INDEX: " + children[i].index.toFixed(2) + "<span class=\"" + view + "-libraryView fright flaticon-attribute-library assetDeliversAttribute\" uniqueId= \"" + children[i].uniqueId + "\" id=\"" + children[i].uniqueId + "attributeLibrary\" title = \"Attribute Library View\" persId = \"" + children[i].elementId + "\" linkId=\"" + element.linkId + "\"></span></td>" +
                "</tr>" +
                "</thead>" +
                "<tbody id=\"stdAttributeTable" + i + "\">";
            str += "<tr><td colspan=\"" + columnSpan + "\"><span class=\"createAttribute assetDeliversAttribute noBorder\" linkId=\"" + element.linkId + "\" persId=\"" + children[i].elementId + "\" title=\"Create Attribute\">+ <span class=\"flaticon-attribute\"></span></span>" +
                "<span class=\"createAttributeDivider\"> / </span>" +
                "<span class=\"addAttributeFromLibraryPopup assetDeliversAttribute noBorder\" linkId=\"" + element.linkId + "\" persId=\"" + children[i].elementId + "\" title=\"Add Attribute From Library\">+ <span class=\"flaticon-attribute\"></span> From Library</span></td>" +
                "</tr>";
            if (children[i].children) {
                let attributes = children[i].children;
                for (let j = 0; j < attributes.length; j++) {
                    str += "<tr attributeId=\"" + attributes[j].elementId + "\" ratingId=\"" + attributes[j].ratingId + "\"><td class=\"noBorder checkbox-td\">";
                    if (attributes[j].activated === true) {
                        str += "<input type=\"checkbox\" class=\"" + evaluationCheckBox + "\" checked></td>";
                    } else {
                        str += "<input type=\"checkbox\" class=\"" + evaluationCheckBox + "\"></td>";
                    }

                    str += "<td class=\"noBorder coefficient-td\">w: " + attributes[j].coefficient + "</td>" +
                        "<td class=\"noBorder attributeName-td tooltip title=\"" + attributes[j].name + "\"><span class=\"flaticon-attribute\"></span>" + attributes[j].name + "</td>";
                    str += "<td class=\"noBorder deleteAttributeHotlink-td\">" +
                        "<span id = \"" + viewName + "_" + backing.view_type.dataview.id + "_" + attributes[j].uniqueId + "\" class=\"" + dataviewHotlink + " flaticon-open-in-tab-2 attributeHotlinks\" title=\"Data View\" uniqueId=\"" + attributes[j].uniqueId + "\" objectType=\"" + attributes[j].objectType + "\"></span></td>" +
                        "<td class=\"noBorder editAttributeHotlink-td\">" +
                        "<span class=\"ss-edit " + editAttributeClass + " assetDeliversAttribute attributeHotlinks\" title=\"Edit Attribute\" elementId=\"" + attributes[j].elementId + "\"></span></td>" +
                        "<td class=\"noBorder deleteAttributeHotlink-td\">" +
                        "<span class=\"ss-delete delete-element\" title=\"Delete Attribute\" elementId=\"" + attributes[j].elementId + "\" objectType=\"" + attributes[j].objectType + "\"></span></td>";
                    str += "<td class=\"noBorder rangeslider-td\"><input type=\"range\" class=\"black fleft " + evaluationRangeClass + "\" min=\"0\" max=\"5\" value=\"" + attributes[j].rating + "\" ratingId=\"" + attributes[j].ratingId + "\" attributeId=\"" + attributes[j].elementId + "\" >" +
                        "</td>" +
                        "<td class=\"noBorder deleteAttributeHotlink-td\">";
                    if (attributes[j].ratingId !== 0)
                        str += "<span ratingDataView=\"" + true + "\" id = \"" + viewName + "_" + backing.view_type.dataview.id + "_" + element.uniqueId + "_" + attributes[j].ratingId + "\" class=\"" + dataviewHotlink + " flaticon-open-in-tab-2 attributeHotlinks\" title=\"Data View\" uniqueId=\"" + attributes[j].uniqueId + "\" objectType=\"" + attributes[j].objectType + "\"></span>";
                    str += "</td>";
                    str += "<td class=\"noBorder ratingDescription-td\">" +
                        "<div class=\"no-margin build-workbench__security-info__tooltip fleft on-top\">\n" +
                        " <span class=\"icon icon-white r_ring tooltip-icon\">i</span>\n";
                    if (j === 0)
                        str += " <div class=\"info-tooltip tooltip-bottom\">\n";
                    else
                        str += " <div class=\"info-tooltip\">\n";
                    str += " <div class=\"info-tooltip-text\">\n" +
                        " <b>Rating Description:</b><br>\n" +
                        " <ol>\n" +
                        "<li>" + attributes[j].oneRatingDesc + "</li>\n" +
                        "<li>" + attributes[j].twoRatingDesc + "</li>\n" +
                        "<li>" + attributes[j].threeRatingDesc + "</li>\n" +
                        "<li>" + attributes[j].fourRatingDesc + "</li>\n" +
                        "<li>" + attributes[j].fiveRatingDesc + "</li>\n" +
                        "</ol></div></div>\n" +
                        "</div></td><td class=\"noBorder artifact-td\"><div class=\"no-margin build-workbench__security-info__tooltip fleft on-top\">\n" +
                        "<span class=\"icon icon-white r_ring tooltip-icon " + editJustification + " assetDeliversAttribute\" style=\"font-size:8px !important\">j</span>\n" +
                        "<div class=\"info-tooltip\">\n" +
                        "<div class=\"info-tooltip-text\">\n" +
                        "<b>Jusitification Reason:</b><br>\n" +
                        "<span>" + attributes[j].justificationReason + "</span>" +
                        "</div></div>\n" +
                        "</div></td>" +
                        "</tr>"+
                        "<tr style=\"border-bottom: 1px solid #ededed;\"><td class=\"noBorder attribute-description\" colspan=\"" + columnSpan + "\"><span>Description: </span><span style=\"font-size:11px !important;color:#464343\" >" + attributes[j].description + "</span></td></tr>";
                }
            }
            else {
                str += "<tr><td class=\"noBorder\" colspan=\"" + columnSpan + "\">No Attributes</td>" +
                    "</tr>";
            }
            str += "</tbody>" +
                "</table></div>";
        }
    }
    else {
        str += "<div class=\"\" style=\"padding: 10px 10px 10px 21px\">Empty Perspective List</div>";
    }
    str += "</div></div>";
    $("#" + desktopId).append(str);

    $(".attributeTableContainer").each(function () {
        let persColor = $(this).attr("persColor");
        initialiseSlider($(this), persColor);
    });

    repositionViews(isBiView);
}

function renderShieldElementEvaluationView(viewName, data, view, element, uniqueId, label) {
    let str = "";
    let desktopId, isBiView, columnSpan, objIcon;
    let activeDesktop, evaluationRangeClass, evaluationCheckBox,
        editAttributeClass, editJustification;
    if (view === "singleview") {
        isBiView = false;
        evaluationRangeClass = "shieldElementEvaluationRange";
        evaluationCheckBox = "shieldElementCheckBox";
        editAttributeClass = "edit-attribute";
        editJustification = "editJustification";
        columnSpan = 10;
    }
    if (view === "biview") {
        isBiView = true;
        evaluationRangeClass = "biviewShieldElementEvaluationRange";
        evaluationCheckBox = "biviewShieldElementCheckBox";
        editAttributeClass = "biviewEdit-attribute";
        editJustification = "biview-editJustification";
        columnSpan = 10;
    }
    activeDesktop = getActiveDesktop(isBiView);
    desktopId = activeDesktop.div_id;
    let dataviewHotlink = view + "-data-view";
    if (element)
        objIcon = renderCircleOrSquareInventoryDv(element, isBiView, "", true);

    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"flaticon-ruler dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    str += "<span class=\"panel-header\">" + label.toUpperCase() + ": " + objIcon + " " + element.name + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button  refreshButton\" title=\"Refresh\"></span>" +
        "</div>";
    str += "<div class=\"evaluation-content\">";
    if (data && data.children) {
        let children = data.children;
        generateUniqueIdForPersAttribute(data, activeDesktop.div_id, null);
        for (let i = 0; i < children.length; i++) {
            str += "<div class=\"attributeTableContainer\" persColor=\"" + children[i].color + "\"><span class =\"tableHeader\"></span>" +
                "<table class=\"\">" +
                "<thead><tr>" +
                "<td colspan=\"" + columnSpan + "\" style=\"text-align: left;cursor:pointer;background-color:" + children[i].color + ";color:#fff;\">" + children[i].name.toUpperCase() + " INDEX: " + children[i].index.toFixed(2) + "<span class=\"" + view + "-libraryView fright flaticon-attribute-library shieldElementAttribute\" uniqueId= \"" + children[i].uniqueId + "\" id=\"" + children[i].uniqueId + "\"attributeLibrary\" title = \"Attribute Library View\" persId = \"" + children[i].elementId + "\" linkId=\"" + element.shieldElementTypeId + "\"></span></td>" +
                "</tr>" +
                "</thead>" +
                "<tbody id=\"stdAttributeTable\">";
            str += "<tr><td colspan=\"" + columnSpan + "\"><span class=\"createAttribute shieldElementAttribute noBorder\" elementId=\"" + element.elementId + "\" persId=\"" + children[i].elementId + "\" title=\"Create Attribute\">+ <span class=\"flaticon-attribute\"></span></span>" +
                "<span class=\"createAttributeDivider\"> / </span>" +
                "<span class=\"addAttributeFromLibraryPopup shieldElementAttribute noBorder\" linkId=\"" + element.elementId + "\" persId=\"" + children[i].elementId + "\" title=\"Add Attribute From Library\">+ <span class=\"flaticon-attribute\"></span> From Library</span></td>" +
                "</tr>";

            if (children[i].children) {
                let attributes = children[i].children;
                for (let j = 0; j < attributes.length; j++) {
                    str += "<tr attributeId=\"" + attributes[j].elementId + "\" ratingId=\"" + attributes[j].ratingId + "\"><td class=\"noBorder checkbox-td\">";
                    if (attributes[j].activated === true) {
                        str += "<input type=\"checkbox\" class=\"" + evaluationCheckBox + "\" checked></td>";
                    } else {
                        str += "<input type=\"checkbox\" class=\"" + evaluationCheckBox + "\"></td>";
                    }

                    str += "<td class=\"noBorder coefficient-td\">w: " + attributes[j].coefficient + "</td>" +
                        "<td class=\"noBorder attributeName-td tooltip title=\"" + attributes[j].name + "\"><span class=\"flaticon-attribute\"></span>" + attributes[j].name + "</td>";
                    str += "<td class=\"noBorder deleteAttributeHotlink-td\">" +
                        "<span id = \"" + viewName + "_" + backing.view_type.dataview.id + "_" + attributes[j].uniqueId + "\" class=\"" + dataviewHotlink + " flaticon-open-in-tab-2 attributeHotlinks\" title=\"Data View\" uniqueId=\"" + attributes[j].uniqueId + "\" objectType=\"" + attributes[j].objectType + "\"></span></td>" +
                        "<td class=\"noBorder editAttributeHotlink-td\">" +
                        "<span class=\"ss-edit " + editAttributeClass + " shieldElementAttribute attributeHotlinks\" title=\"Edit Attribute\" elementId=\"" + attributes[j].elementId + "\"></span></td>" +
                        "<td class=\"noBorder deleteAttributeHotlink-td\">" +
                        "<span class=\"ss-delete delete-element attributeHotlinks\" title=\"Delete Attribute\" elementId=\"" + attributes[j].elementId + "\" objectType=\"" + attributes[j].objectType + "\"></span></td>";
                    str += "<td class=\"noBorder rangeslider-td\"><input type=\"range\" class=\"black fleft " + evaluationRangeClass + "\" min=\"0\" max=\"5\" value=\"" + attributes[j].rating + "\" ratingId=\"" + attributes[j].ratingId + "\" attributeId=\"" + attributes[j].elementId + "\" >" +
                        "</td>" +
                        "<td class=\"noBorder deleteAttributeHotlink-td\">";
                    if (attributes[j].ratingId !== 0)
                        str += "<span ratingDataView=\"" + true + "\" id = \"" + viewName + "_" + backing.view_type.dataview.id + "_" + element.uniqueId + "_" + attributes[j].ratingId + "\" class=\"" + dataviewHotlink + " flaticon-open-in-tab-2 attributeHotlinks\" title=\"Data View\" uniqueId=\"" + attributes[j].uniqueId + "\" objectType=\"" + attributes[j].objectType + "\"></span>";
                    str += "</td>";
                    str += "<td class=\"noBorder ratingDescription-td\">" +
                        "<div class=\"no-margin build-workbench__security-info__tooltip fleft on-top\">\n" +
                        " <span class=\"icon icon-white r_ring tooltip-icon\">i</span>\n";
                    if (j === 0)
                        str += " <div class=\"info-tooltip tooltip-bottom\">\n";
                    else
                        str += " <div class=\"info-tooltip\">\n";

                    str += " <div class=\"info-tooltip-text\">\n" +
                        " <b>Rating Description:</b><br>\n" +
                        " <ol>\n" +
                        "<li>" + attributes[j].oneRatingDesc + "</li>\n" +
                        "<li>" + attributes[j].twoRatingDesc + "</li>\n" +
                        "<li>" + attributes[j].threeRatingDesc + "</li>\n" +
                        "<li>" + attributes[j].fourRatingDesc + "</li>\n" +
                        "<li>" + attributes[j].fiveRatingDesc + "</li>\n" +
                        "</ol></div></div>\n" +
                        "</div></td><td class=\"noBorder artifact-td\"><div class=\"no-margin build-workbench__security-info__tooltip fleft on-top\">\n" +
                        "<span class=\"icon icon-white r_ring tooltip-icon " + editJustification + " shieldElementAttribute\" style=\"font-size:8px !important\">j</span>\n" +
                        "<div class=\"info-tooltip\">\n" +
                        "<div class=\"info-tooltip-text\">\n" +
                        "<b>Jusitification Reason:</b><br>\n" +
                        "<span>" + attributes[j].justificationReason + "</span>" +
                        "</div></div>\n" +
                        "</div></td>" +
                        "</tr>"+
                        "<tr style=\"border-bottom: 1px solid #ededed;\"><td class=\"noBorder attribute-description\" colspan=\"" + columnSpan + "\"><span>Description: </span><span style=\"font-size:11px !important;color:#464343\" >" + attributes[j].description + "</span></td></tr>";
                }
            }
            else {
                str += "<tr><td class=\"noBorder\" colspan=\"" + columnSpan + "\">No Attributes</td>" +
                    "</tr>";
            }
            str += "</tbody>" +
                "</table></div>";
        }
    }
    else {
        str += "<div class=\"\" style=\"padding: 10px 10px 10px 21px\">Empty Perspective List</div>";
    }
    str += "</div></div>";
    $("#" + desktopId).append(str);

    $(".attributeTableContainer").each(function () {
        let persColor = $(this).attr("persColor");
        initialiseSlider($(this), persColor);
    });
    repositionViews(isBiView);
}

function renderCreateAttributePopUp(clickedElement, attributeToCreate) {
    let str = "";
    let desktop = clickedElement.closest(".innerDesktop");
    let view = desktop.attr("view");
    let isBiView = isBiViewOrNot(view);
    let viewName = "popOverlay";
    let elementId = 0;
    let persId;
    if (attributeToCreate === "shieldElementAttribute") {
        elementId = clickedElement.attr("elementId");
        persId = clickedElement.attr("persId");

    }
    else if (attributeToCreate === "assetDeliversAttribute") {
        elementId = clickedElement.attr("linkId");
        persId = clickedElement.attr("persId");
    }
    else {
        let perspectiveSelected = getPerspectiveInSelection(isBiView);
        persId = perspectiveSelected.selectedPerspective.elementId;
    }
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\">" +
        "<div class=\"panel-header-container " + view + "\">";
    if (attributeToCreate === "desktopShieldElementAttribute" || attributeToCreate === "desktopAssetDeliversAttribute")
        str += "<span class=\"panel-header\">CREATE ATTRIBUTE TO ALL RATEABLE OBJECTS</span>";
    else
        str += "<span class=\"panel-header\">CREATE ATTRIBUTE</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn closePopUp\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"headerActionButton create-attribute " + attributeToCreate + "\" linkId=\"" + elementId + "\" persId=\"" + persId + "\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">COEFFICIENT<span style=\"color:#ec4c4c;\">*</span>:</label><input type=\"number\" class=\"coefficientInput\" min =\"0\" value=\"1\" onkeydown=\"return false\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">ATTRIBUTE DESCRIPTION:</label><textarea class=\"descriptionInput\"></textarea></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">1<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"oneRatingDescInput\" value=\"Very Ineffective\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">2<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"twoRatingDescInput\" value=\"Ineffective\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">3<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"threeRatingDescInput\" value=\"Somewhat Effective\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">4<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"fourRatingDescInput\" value=\"Effective\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">5<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"fiveRatingDescInput\" value=\"Very Effective\"></li>";
    if (attributeToCreate === "desktopShieldElementAttribute" || attributeToCreate === "desktopAssetDeliversAttribute")
        str += "<li class=\"attributeCheckBoxWrapper\">" +
            "<input type=\"checkbox\" class=\"attributeCheckBox\"/>" +
            "<label class=\"\" style=\"color:black;\">Replace All Existing Attributes</label>" +
            "</li>";
    str += "</ul>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
    $("#" + viewName).find('input.nameInput').focus();
}

function renderEditAttributePopUp(res, data, attributeToEdit) {
    let str = "";
    let viewClass;
    viewClass = "singleview";
    let viewName = "popOverlay";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + viewClass + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    str += "<span class=\"panel-header\">EDIT ATTRIBUTE</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn closePopUp\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"panel-header-container " + viewClass + "\">" +
        "<span class=\"headerActionButton save-attribute " + attributeToEdit + "\" attributeId =\"" + data.attributeId + "\" activated=\"" + data.activated + "\">SAVE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\" value=" + res.name + "></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">COEFFICIENT<span style=\"color:#ec4c4c;\">*</span>:</label><input type=\"number\" class=\"coefficientInput\" min=\"1\" value=" + res.coefficient + " onkeydown=\"return false\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">ATTRIBUTE DESCRIPTION:</label><textarea class=\"descriptionInput\">" + res.description + "</textarea></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">1<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"oneRatingDescInput\" value=" + res.oneRatingDescription + "></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">2<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"twoRatingDescInput\" value=" + res.twoRatingDescription + "></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">3<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"threeRatingDescInput\" value=" + res.threeRatingDescription + "></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">4<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"fourRatingDescInput\" value=" + res.fourRatingDescription + "></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">5<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"fiveRatingDescInput\" value=" + res.fiveRatingDescription + "></li>" +
        "</ul>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
    $("#" + viewName).find('input.nameInput').focus();

}

function renderEditJustificationReasonPopUp(data, attributeToJustify) {
    let str = "";
    let viewClass;
    viewClass = "singleview";
    let viewName = "popOverlay-small";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + viewClass + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    str += "<span class=\"panel-header\">JUSTIFY</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn closePopUp\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"panel-header-container " + viewClass + "\">" +
        "<span class=\"headerActionButton saveEditJustification " + attributeToJustify + "\" ratingId=\"" + data.ratingId + "\" attributeId =\"" + data.attributeId + "\">SAVE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">JUSTIFICATION REASON:</label><textarea class=\"justificationReasonInput\">" + data.justificationReason + "</textarea></li>" +
        "</ul>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
}

function createShieldElementAttribute(data) {
    service.createShieldElementAttributes(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            let event = {"key": backing.event_type.created_shield_element_attribute.key};
            propagateEvent(event);
            $("#popUp").addClass("dis-none");
            $("#saveData").hide();
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

function createAssetDeliversAttribute(data) {
    let callbackfn = function (res, err) {
        if (res) {
            alert("Successfully Added");
            let event = {"key": backing.event_type.created_asset_delivers_attribute.key};
            propagateEvent(event);
            $("#popUp").addClass("dis-none");
            $("#saveData").hide();
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
    };
    if(!backing.isDirectMode)
        service.createAssetDeliversAttributes(data, callbackfn);
    else {
        data.assetImplementsElementLinkId = data.assetDeliversLinkId;
        service.createAssetImplementsAttributes(data, callbackfn);
    }
}

function createShieldElementAttributeForAll(data, desktop) {
    if (desktop.find(".attributeCheckBox").is(":checked")) {
        data.replaceAllExistingAttributes = true;
    }
    else {
        data.replaceAllExistingAttributes = false;
    }
    service.createShieldElementAttributesForAll(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            let event = {"key": backing.event_type.created_shield_element_attribute.key};
            propagateEvent(event);
            $("#popUp").addClass("dis-none");
            $("#saveData").hide();
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

function createAssetDeliversAttributeForAll(data, desktop) {
    if (desktop.find(".attributeCheckBox").is(":checked")) {
        data.replaceAllExistingAttributes = true;
    }
    else {
        data.replaceAllExistingAttributes = false;
    }
    let callbackfn = function (res, err) {
        if (res) {
            alert("Successfully Added");
            let event = {"key": backing.event_type.created_asset_delivers_attribute.key};
            propagateEvent(event);
            $("#popUp").addClass("dis-none");
            $("#saveData").hide();
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
    };
    if(!backing.isDirectMode)
        service.createAssetDeliversAttributesForAll(data, callbackfn);
    else
        service.createAssetImplementsAttributesForAll(data, callbackfn);
}

function saveAttribute(data, desktop, attributeToEdit) {
    if (attributeToEdit === "assetDeliversAttribute") {
        let callbackfn = function (res, err) {
            if (res) {
                alert("Successfully Edited");
                let event = {"key": backing.event_type.edited_asset_delivers_attribute.key};
                propagateEvent(event);
                $("#popUp").addClass("dis-none");
                $("#saveData").hide();
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
        };
        if(!backing.isDirectMode)
            service.editAssetDeliversAttributes(data, callbackfn);
        else
            service.editAssetImplementsAttributes(data, callbackfn);
    }
    else if (attributeToEdit === "shieldElementAttribute") {
        service.editShieldElementAttributes(data, function (res, err) {
            if (res) {
                alert("Successfully Edited");
                let event = {"key": backing.event_type.edited_shield_element_attribute.key};
                propagateEvent(event);
                $("#popUp").addClass("dis-none");
                $("#saveData").hide();
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

}

function saveActivatedAssetElement(res, data) {
    data.elementId = res.elementId;
    data.coefficient = res.coefficient;
    data.description = res.description;
    data.fiveRatingDescription = res.fiveRatingDescription;
    data.fourRatingDescription = res.fourRatingDescription;
    data.name = res.name;
    data.oneRatingDescription = res.oneRatingDescription;
    data.threeRatingDescription = res.threeRatingDescription;
    data.twoRatingDescription = res.twoRatingDescription;
    let callbackfn = function (res, err) {
        if (res) {
            let event = {"key": backing.event_type.edited_asset_delivers_attribute.key};
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
    };
    if(!backing.isDirectMode)
        service.editAssetDeliversAttributes(data, callbackfn);
    else
        service.editAssetImplementsAttributes(data, callbackfn);
}

function saveActivatedShieldElement(res, dataToSave) {
    let data = dataToSave;
    data.elementId = res.elementId;
    data.coefficient = res.coefficient;
    data.description = res.description;
    data.fiveRatingDescription = res.fiveRatingDescription;
    data.fourRatingDescription = res.fourRatingDescription;
    data.name = res.name;
    data.oneRatingDescription = res.oneRatingDescription;
    data.threeRatingDescription = res.threeRatingDescription;
    data.twoRatingDescription = res.twoRatingDescription;

    service.editShieldElementAttributes(data, function (res, err) {
        if (res) {
            let event = {"key": backing.event_type.edited_shield_element_attribute.key};
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

function renderAssetAttributeLibraryView(res, viewName, uniqueId, data, isBiview) {
    let activeDesktop, viewClass, pers;
    let persId = data.perspectiveId;
    if (isBiview)
        viewClass = "biview";
    else
        viewClass = "singleview";
    activeDesktop = getActiveDesktop(isBiview);
    pers = getPerspectiveWithId(persId, isBiview);
    let element = backing.dictionary_of_unique_id_to_attr_object[pers.uniqueId];
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    let desktopId = activeDesktop.div_id;
    let str = "";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop associationViewDesktop\" view=\"" + viewClass + "\"persId =\"" + persId + "\" uniqueid=\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">" +
        "<span class=\"flaticon-attribute-library findSourceHotlink\" title=\"Show Source Hotlink\"></span>" +
        "<span class=\"panel-header\">ATTRIBUTE LIBRARY VIEW:" + objectTypeIcon + "" + pers.name.toUpperCase() + "</span>" +
        "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + viewClass + "CloseBtn\" id=\"closeAssociationView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>";
    str += "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>";
    str += "</div>";
    if (res && res.children.length > 0) {
        str += "<div class=\"attributeTableContainer\">" +
            "<div class=\"treeContainerAssociationView\">" +
            "<div class=\"" + viewClass + "createAttributeToLibrary createAttriToLib assetDeliversAttribute noBorder\" persId= \"" + persId + "\">+Create Attribute</div>" +
            "<table class=\"attributeLibraryTable\">";
        let columnSpan = 8;
        let attributes = res.children;
        for (let j = 0; j < attributes.length; j++) {
            str += "<tr>";
            str += "<td class=\"noBorder attributeName-td tooltip title=\"" + attributes[j].name + "\">" + attributes[j].name + "</td>";
            str += "<td class=\"noBorder editAttributeHotlink-td\">" +
                "<span class=\"ss-edit editAttributeLibrary assetDeliversAttribute\" title=\"Edit Attribute\" elementId=\"" + attributes[j].elementId + "\"></span></td>" +
                "<td class=\"noBorder deleteAttributeHotlink-td\">" +
                "<span class=\"ss-delete delete-element\" title=\"Delete Attribute\" elementId=\"" + attributes[j].elementId + "\" objectType=\"" + attributes[j].objectType + "\"></span></td>" +
                "<td class=\"noBorder ratingDescription-td\">" +
                "<div class=\"no-margin build-workbench__security-info__tooltip fleft on-top\">\n" +
                " <span class=\"icon icon-white r_ring tooltip-icon\">i</span>\n";
            if (j === 0)
                str += " <div class=\"info-tooltip tooltip-bottom\">\n";
            else
                str += " <div class=\"info-tooltip\">\n";
            str += " <div class=\"info-tooltip-text\">\n" +
                " <b>Rating Description:</b><br>\n" +
                " <ol>\n" +
                "<li>" + attributes[j].oneRatingDesc + "</li>\n" +
                "<li>" + attributes[j].twoRatingDesc + "</li>\n" +
                "<li>" + attributes[j].threeRatingDesc + "</li>\n" +
                "<li>" + attributes[j].fourRatingDesc + "</li>\n" +
                "<li>" + attributes[j].fiveRatingDesc + "</li>\n" +
                "</ol></div></div>\n" +
                "</div></td>" +
                "</tr>" +
                "<tr style=\"border-bottom: 1px solid #ededed;\"><td class=\"noBorder attribute-description\" colspan=\"" + columnSpan + "\"><span>Description: </span>" + attributes[j].description + "</td></tr>";
        }
        str += "</table>" +
            "</div></div>";
    }
    else {
        str += "<div class=\"attributeTableContainer\">" +
            "<div class=\"treeContainerAssociationView\">" +
            "<div class=\"" + viewClass + "createAttributeToLibrary createAttriToLib assetDeliversAttribute noBorder\" persId= \"" + persId + "\">+Create Attribute</div>" +
            "<span>No Attributes</span>" +
            "</div></div>";
    }
    str += "</div>";
    $("#" + desktopId).append(str);
}

function renderShieldAttributeLibraryView(res, viewName, uniqueId, data, isBiview) {
    let activeDesktop, viewClass, pers;
    let persId = data.perspectiveId;
    let shieldElementTypeId = data.shieldElementTypeId;
    if (isBiview)
        viewClass = "biview";
    else
        viewClass = "singleview";
    activeDesktop = getActiveDesktop(isBiview);
    pers = getPerspectiveWithId(persId, isBiview);
    let desktopId = activeDesktop.div_id;
    let element = backing.dictionary_of_unique_id_to_attr_object[pers.uniqueId];
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    let str = "";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop associationViewDesktop\" view=\"" + viewClass + "\"persId =\"" + persId + "\" uniqueid=\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">" +
        "<span class=\"flaticon-attribute-library findSourceHotlink\" title=\"Show Source Hotlink\"></span>" +
        "<span class=\"panel-header\">ATTRIBUTE LIBRARY VIEW:" + objectTypeIcon + "" + pers.name.toUpperCase() + "</span>" +
        "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + viewClass + "CloseBtn\" id=\"closeAssociationView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>";
    str += "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>";
    str += "</div>";
    if (res && res.children.length > 0) {
        str += "<div class=\"attributeTableContainer\">" +
            "<div class=\"" + viewClass + "createAttributeToLibrary createAttriToLib shieldElementAttribute noBorder\" persId= \"" + persId + "\" shieldElementTypeId=\"" + shieldElementTypeId + "\">+Create Attribute</div>" +
            "<div class=\"treeContainerAssociationView\">" +
            "<table class=\"attributeLibraryTable\">";
        let columnSpan = 8;
        let attributes = res.children;
        for (let j = 0; j < attributes.length; j++) {
            str += "<tr>";
            str += "<td class=\"noBorder attributeName-td tooltip title=\"" + attributes[j].name + "\">" + attributes[j].name + "</td>";
            str += "<td class=\"noBorder editAttributeHotlink-td\">" +
                "<span class=\"ss-edit editAttributeLibrary shieldElementAttribute\" title=\"Edit Attribute\" elementId=\"" + attributes[j].elementId + "\"></span></td>" +
                "<td class=\"noBorder deleteAttributeHotlink-td\">" +
                "<span class=\"ss-delete delete-element\" title=\"Delete Attribute\" elementId=\"" + attributes[j].elementId + "\" objectType=\"" + attributes[j].objectType + "\"></span></td>" +
                "<td class=\"noBorder ratingDescription-td\">" +
                "<div class=\"no-margin build-workbench__security-info__tooltip fleft on-top\">\n" +
                " <span class=\"icon icon-white r_ring tooltip-icon\">i</span>\n";
            if (j === 0)
                str += " <div class=\"info-tooltip tooltip-bottom\">\n";
            else
                str += " <div class=\"info-tooltip\">\n";
            str += " <div class=\"info-tooltip-text\">\n" +
                " <b>Rating Description:</b><br>\n" +
                " <ol>\n" +
                "<li>" + attributes[j].oneRatingDesc + "</li>\n" +
                "<li>" + attributes[j].twoRatingDesc + "</li>\n" +
                "<li>" + attributes[j].threeRatingDesc + "</li>\n" +
                "<li>" + attributes[j].fourRatingDesc + "</li>\n" +
                "<li>" + attributes[j].fiveRatingDesc + "</li>\n" +
                "</ol></div></div>\n" +
                "</div></td>" +
                "</tr>" +
                "<tr style=\"border-bottom: 1px solid #ededed;\"><td class=\"noBorder attribute-description\" colspan=\"" + columnSpan + "\"><span>Description: </span>" + attributes[j].description + "</td></tr>";
        }
        str += "</table>" +
            "</div></div>";
    }
    else {
        str += "<div class=\"attributeTableContainer\">" +
            "<div class=\"" + viewClass + "createAttributeToLibrary createAttriToLib shieldElementAttribute noBorder\" persId= \"" + persId + "\" shieldElementTypeId=\"" + shieldElementTypeId + "\">+Create Attribute</div>" +
            "<div class=\"treeContainerAssociationView\">" +
            "<span>No Attributes</span>" +
            "</div></div>";
    }
    str += "</div>";
    $("#" + desktopId).append(str);
}

function renderCreateAttributeLibraryPopUp(clickedElement, attributeToCreate, isBiview) {
    let str = "";
    let viewClass, shieldElementId;
    if (isBiview) {
        viewClass = "biview";
    }
    else {
        viewClass = "singleview";
    }
    let viewName = "popOverlay";
    let persId = clickedElement.attr("persId");
    if (attributeToCreate === "shieldElementAttribute")
        shieldElementId = clickedElement.attr("shieldElementTypeId");
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + viewClass + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    str += "<span class=\"panel-header\">CREATE ATTRIBUTE</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close tooltip tooltipstered close-btn closePopUp\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    if (attributeToCreate === "shieldElementAttribute") {
        str += "<span class=\"headerActionButton " + viewClass + "create-attribute-to-library " + attributeToCreate + "\" persId=\"" + persId + "\" shieldElementTypeId =\"" + shieldElementId + "\">CREATE</span>";
    }
    else {
        str += "<span class=\"headerActionButton " + viewClass + "create-attribute-to-library " + attributeToCreate + "\" persId=\"" + persId + "\">CREATE</span>";
    }
    str += "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">ATTRIBUTE DESCRIPTION:</label><textarea class=\"descriptionInput\"></textarea></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">1<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"oneRatingDescInput\" value=\"Very Ineffective\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">2<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"twoRatingDescInput\" value=\"Ineffective\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">3<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"threeRatingDescInput\" value=\"Somewhat Effective\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">4<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"fourRatingDescInput\" value=\"Effective\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">5<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"fiveRatingDescInput\" value=\"Very Effective\"></li>" +
        "</ul>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
    $("#" + viewName).find('input.nameInput').focus();
}

function renderEditAttributeLibraryPopUp(res, data, attributeToEdit) {
    let str = "";
    let viewClass;
    viewClass = "singleview";
    let viewName = "popOverlay";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + viewClass + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    str += "<span class=\"panel-header\">EDIT ATTRIBUTE</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close tooltip tooltipstered close-btn closePopUp\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"panel-header-container " + viewClass + "\">" +
        "<span class=\"headerActionButton save-attribute-library " + attributeToEdit + "\" attributeId =\"" + res.elementId + "\">SAVE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\" value=\"" + res.name + "\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">ATTRIBUTE DESCRIPTION:</label><textarea class=\"descriptionInput\">" + res.description + "</textarea></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">1<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"oneRatingDescInput\" value=\"" + res.oneRatingDescription + "\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">2<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"twoRatingDescInput\" value=\"" + res.twoRatingDescription + "\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">3<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"threeRatingDescInput\" value=\"" + res.threeRatingDescription + "\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">4<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"fourRatingDescInput\" value=\"" + res.fourRatingDescription + "\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">5<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"fiveRatingDescInput\" value=\"" + res.fiveRatingDescription + "\"></li>" +
        "</ul>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
    $("#" + viewName).find('input.nameInput').focus();
}

function createShieldElementAttributeLibrary(data) {
    service.createShieldElementLibraryAttribute(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            let event = {"key": backing.event_type.created_shield_element_attribute_library.key};
            propagateEvent(event);
            $("#popUp").addClass("dis-none");
            $("#saveData").hide();
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

function createAssetDeliversAttributeLibrary(data) {
    let callbackfn = function (res, err) {
        if (res) {
            alert("Successfully Added");
            let event = {"key": backing.event_type.created_asset_delivers_attribute_library.key};
            propagateEvent(event);
            $("#popUp").addClass("dis-none");
            $("#saveData").hide();
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
    };
    if(!backing.isDirectMode)
        service.createAssetLibraryAttribute(data, callbackfn);
    else
        service.createAssetImplementsLibraryAttribute(data, callbackfn);
}

function renderAddAttributePopUp(res, data, attributeToAdd, viewClass) {
    let str = "";
    let viewName = "popOverlay";
    let persId = data.perspectiveId;
    let elementId = data.linkId;
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + viewClass + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    if (attributeToAdd === "desktopShieldElementAttribute" || attributeToAdd === "desktopAssetDeliversAttribute")
        str += "<span class=\"panel-header\">ADD ATTRIBUTE FROM LIBRARY TO ALL RATEABLE OBJECTS</span>";
    else
        str += "<span class=\"panel-header\">ADD ATTRIBUTE FROM LIBRARY</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn closePopUp\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"panel-header-container " + viewClass + "\">" +
        "<div class=\"selectAllAttributeFromLibrary-wrapper\">" +
        "<span class=\"selectAllLibrary selectionFromLibrary\">SELECT ALL</span>" +
        "<span style=\"font-weight: bold; color: #000;\"> | </span>" +
        "<span class=\"deSelectAllLibrary selectionFromLibrary\">DE-SELECT ALL</span>" +
        "</div>" +
        "<span class=\"headerActionButton addAttributeFromLibrary " + attributeToAdd + "\" linkId=\"" + elementId + "\" persId=\"" + persId + "\">ADD</span>" +
        "</div>";
    if (res && res.children.length > 0) {
        str += "<div class=\"treeContainerAssociationView\">" +
            "<table class=\"attributeLibraryTable\">";
        let columnSpan = 8;
        let attributes = res.children;
        for (let j = 0; j < attributes.length; j++) {
            str += "<tr attributeId=\"" + attributes[j].elementId + "\" >";
            str += "<td rowspan=\"2\" class=\"noBorder checkbox-td\"><input type=\"checkbox\"></td><td colspan=\"7\" class=\"noBorder attributeName-td tooltip title=\"" + attributes[j].name + "\">" + attributes[j].name + "</td>";
            str += "<td class=\"noBorder ratingDescription-td\">" +
                "<div class=\"no-margin build-workbench__security-info__tooltip fleft on-top\">\n" +
                " <span class=\"icon icon-white r_ring tooltip-icon\">i</span>\n";
            if (j === 0)
                str += " <div class=\"info-tooltip tooltip-bottom\">\n";
            else
                str += " <div class=\"info-tooltip\">\n";
            str += " <div class=\"info-tooltip-text\">\n" +
                " <b>Rating Description:</b><br>\n" +
                " <ol>\n" +
                "<li>" + attributes[j].oneRatingDesc + "</li>\n" +
                "<li>" + attributes[j].twoRatingDesc + "</li>\n" +
                "<li>" + attributes[j].threeRatingDesc + "</li>\n" +
                "<li>" + attributes[j].fourRatingDesc + "</li>\n" +
                "<li>" + attributes[j].fiveRatingDesc + "</li>\n" +
                "</ol></div></div>\n" +
                "</div></td>" +
                "</tr>" +
                "<tr><td class=\"noBorder attribute-description\" colspan=\"" + columnSpan + "\"><span>Description: </span>" + attributes[j].description + "</td></tr>";
        }
        str += "</table>" +
            "</div>";
    }
    else {
        str += "<div class=\"treeContainerAssociationView\">" +
            "<spa class=\"emptyListClass\">No Attributes</span>" +
            "</div>";
    }
    if (attributeToAdd === "desktopShieldElementAttribute" || attributeToAdd === "desktopAssetDeliversAttribute")
        str += "<div class=\"attributeLibraryCheckBoxWrapper\">" +
            "<input type=\"checkbox\" class=\"attributeCheckBox\"/>" +
            "<label class=\"\" style=\"color:black;\">Replace All Existing Attributes</label>" +
            "</div>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
    $("#" + viewName).find('input.nameInput').focus();

}

function saveAttributeLibrary(data, desktop, attributeToEdit) {
    if (attributeToEdit === "assetDeliversAttribute") {
        let callbackfn = function (res, err) {
            if (res) {
                alert("Successfully Edited");
                let event = {"key": backing.event_type.edited_asset_delivers_attribute_library.key};
                propagateEvent(event);
                $("#popUp").addClass("dis-none");
                $("#saveData").hide();
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
        };
        if(!backing.isDirectMode)
            service.editAssetLibraryAttribute(data, callbackfn);
        else
            service.editAssetImplementsLibraryAttribute(data, callbackfn);
    }
    else if (attributeToEdit === "shieldElementAttribute") {
        service.editShieldElementLibraryAttribute(data, function (res, err) {
            if (res) {
                alert("Successfully Edited");
                let event = {"key": backing.event_type.edited_shield_element_attribute_library.key};
                propagateEvent(event);
                $("#popUp").addClass("dis-none");
                $("#saveData").hide();
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
}

function refreshTableInAssetLibrary(res, persId, view) {
    let str = "";
    if (res && res.children.length > 0) {
        str += "<div class=\"" + view + "createAttributeToLibrary createAttriToLib assetDeliversAttribute noBorder\" persId= \"" + persId + "\">+Create Attribute</div>" +
            "<table class=\"attributeLibraryTable\">";
        let columnSpan = 8;
        let attributes = res.children;
        for (let j = 0; j < attributes.length; j++) {
            str += "<tr>";
            str += "<td class=\"noBorder attributeName-td tooltip title=\"" + attributes[j].name + "\">" + attributes[j].name + "</td>";
            str += "<td class=\"noBorder editAttributeHotlink-td\">" +
                "<span class=\"ss-edit editAttributeLibrary assetDeliversAttribute\" title=\"Edit Attribute\" elementId=\"" + attributes[j].elementId + "\"></span></td>" +
                "<td class=\"noBorder deleteAttributeHotlink-td\">" +
                "<span class=\"ss-delete delete-element\" title=\"Delete Attribute\" elementId=\"" + attributes[j].elementId + "\" objectType=\"" + attributes[j].objectType + "\"></span></td>" +
                "<td class=\"noBorder ratingDescription-td\">" +
                "<div class=\"no-margin build-workbench__security-info__tooltip fleft on-top\">\n" +
                " <span class=\"icon icon-white r_ring tooltip-icon\">i</span>\n";
            if (j === 0)
                str += " <div class=\"info-tooltip tooltip-bottom\">\n";
            else
                str += " <div class=\"info-tooltip\">\n";
            str += " <div class=\"info-tooltip-text\">\n" +
                " <b>Rating Description:</b><br>\n" +
                " <ol>\n" +
                "<li>" + attributes[j].oneRatingDesc + "</li>\n" +
                "<li>" + attributes[j].twoRatingDesc + "</li>\n" +
                "<li>" + attributes[j].threeRatingDesc + "</li>\n" +
                "<li>" + attributes[j].fourRatingDesc + "</li>\n" +
                "<li>" + attributes[j].fiveRatingDesc + "</li>\n" +
                "</ol></div></div>\n" +
                "</div></td>" +
                "</tr>" +
                "<tr style=\"border-bottom: 1px solid #ededed;\"><td class=\"noBorder attribute-description\" colspan=\"" + columnSpan + "\"><span>Description: </span>" + attributes[j].description + "</td></tr>";
        }
        str += "</table>";
    }
    else {
        str += "<div class=\"" + view + "createAttributeToLibrary createAttriToLib assetDeliversAttribute noBorder\" persId= \"" + persId + "\">+Create Attribute</div>" +
            "<span>No Attributes</span>";
    }
    return str;
}

function refreshTableInShieldElementLibrary(res) {
    let str = "";
    if (res && res.children.length > 0) {
        str += "<table class=\"attributeLibraryTable\">";
        let columnSpan = 8;
        let attributes = res.children;
        for (let j = 0; j < attributes.length; j++) {
            str += "<tr>";
            str += "<td class=\"noBorder attributeName-td tooltip title=\"" + attributes[j].name + "\">" + attributes[j].name + "</td>";
            str += "<td class=\"noBorder editAttributeHotlink-td\">" +
                "<span class=\"ss-edit editAttributeLibrary shieldElementAttribute\" title=\"Edit Attribute\" elementId=\"" + attributes[j].elementId + "\"></span></td>" +
                "<td class=\"noBorder deleteAttributeHotlink-td\">" +
                "<span class=\"ss-delete delete-element\" title=\"Delete Attribute\" elementId=\"" + attributes[j].elementId + "\" objectType=\"" + attributes[j].objectType + "\"></span></td>" +
                "<td class=\"noBorder ratingDescription-td\">" +
                "<div class=\"no-margin build-workbench__security-info__tooltip fleft on-top\">\n" +
                " <span class=\"icon icon-white r_ring tooltip-icon\">i</span>\n";
            if (j === 0)
                str += " <div class=\"info-tooltip tooltip-bottom\">\n";
            else
                str += " <div class=\"info-tooltip\">\n";
            str += " <div class=\"info-tooltip-text\">\n" +
                " <b>Rating Description:</b><br>\n" +
                " <ol>\n" +
                "<li>" + attributes[j].oneRatingDesc + "</li>\n" +
                "<li>" + attributes[j].twoRatingDesc + "</li>\n" +
                "<li>" + attributes[j].threeRatingDesc + "</li>\n" +
                "<li>" + attributes[j].fourRatingDesc + "</li>\n" +
                "<li>" + attributes[j].fiveRatingDesc + "</li>\n" +
                "</ol></div></div>\n" +
                "</div></td>" +
                "</tr>" +
                "<tr style=\"border-bottom: 1px solid #ededed;\"><td class=\"noBorder attribute-description\" colspan=\"" + columnSpan + "\"><span>Description: </span>" + attributes[j].description + "</td></tr>";
        }
        str += "</table>";
    }
    else {
        str += "<span>No Attributes</span>";
    }
    return str;
}
