$(document).ready(function () {
    $(document).on("click", ".createArtifact", function (e) {
        let desktop = $(this).closest(".innerDesktop");
        let src_id = $(this).closest(".innerDesktop").attr("id");
        let ratingDataView = desktop.attr("ratingDataView");
        let uniqueId = desktop.attr("uniqueId");
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let childviewDivId = backing.view_type.create_artifact_view.name + "_" + src_id;
        let view = desktop.attr("view"), isBiviewSide;
        if (view === "singleview") {
            isBiviewSide = false;
        }
        else if (view === "biview") {
            isBiviewSide = true;
        }
        //check for space in screen
        let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_artifact_view.key);
        if (!haveSpaceToOpenView) {
            return;
        }
        //check view is opened before
        let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiviewSide);
        if (isViewOpenedBefore) {
            return;
        }
        createScenarioViewOpenedFromView(childviewDivId, src_id, src_id, backing.view_type.create_artifact_view.key, "Create Element: " + element.name, uniqueId, isBiviewSide);
        renderCreateArtifact(childviewDivId, view, element, ratingDataView);
        repositionViews(isBiviewSide);
        e.stopPropagation();
    });

    $(document).on("click", ".saveArtifact", function () {
        let desktop = $(this).closest(".innerDesktop");
        let data = {};
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        else if (desktop.find('.fileUpload')[0].files.length === 0) {
            alert("Please  choose file");
            return;
        }
        desktop.find(".uploadFormInView").trigger("submit");
    });

    $(document).on("click", ".saveEditedArtifact", function () {
        $('#saveData').show();
        let desktop = $(this).closest(".innerDesktop");
        let uniqueId = desktop.attr("uniqueId");
        let ratingDataView = desktop.attr("ratingDataView");
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let view = desktop.attr("view");
        let viewId = desktop.attr("id");
        let data = {};
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        if (ratingDataView === "true")
            data.elementId = element[ATTR.ratingId];
        else
            data.elementId = element[ATTR.elementId];
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        service.editArtifact(data, function (res, err) {
            if (res) {
                (view === "singleview") ? closeViewUpdateOpenedViews(viewId, false) : closeViewUpdateOpenedViews(viewId, true);
                let event = {"key": backing.event_type.edit_artifact.key};
                propagateEvent(event);
                $('#saveData').hide();
            }
            else if (err) {
                errorHandler(err);
            }
        });
    });

    $(document).on("submit", ".uploadFormInView", function (event) {
        let desktop = $(this).closest(".innerDesktop");
        let uniqueId = desktop.attr("uniqueId");
        let id = desktop.attr("id");
        let view = desktop.attr("view");
        let ratingDataView = desktop.attr("ratingDataView");
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        $('#saveData').show();
        event.preventDefault();
        let formData = new FormData();
        formData.append('file', desktop.find('.fileUpload')[0].files[0]);
        formData.append('name', desktop.find('.nameInput').val().trim());
        formData.append('description', desktop.find(".descriptionInput").val().trim());
        if (ratingDataView === "true") {
            formData.append('objectType', element.ratingObjectType);
            formData.append('elementId', element.ratingId);
        }
        else {
            formData.append('objectType', element.objectType);
            formData.append('elementId', element.elementId);
        }
        $.ajax({
            url: "/rest/artifact/create_artifact",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data, textStatus) {
                if (textStatus === 'success') {
                    (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
                    let event = {"key": backing.event_type.create_artifact.key};
                    propagateEvent(event);
                    $('#saveData').hide();
                }
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 0 || jqXHR == 302) {
                alert('Your session has ended due to inactivity after 10 minutes.\nPlease refresh this page, or close this window and log back in to system.');
            }
            if (jqXHR.status === 500) {
                alert('Please choose file');
            }
            else {
                alert('Unknown error returned while saving' + (typeof errorThrown == 'string' && errorThrown.trim().length > 0 ? ':\n' + errorThrown : ''));
            }
            $('#saveData').hide();

        });
        return false;
    });

    $(document).on("click", ".edit-artifact-element", function (e) {
        $("#saveData").show();
        let desktop = $(this).closest(".innerDesktop");
        let src_id = $(this).closest(".innerDesktop").attr("id");
        let ratingDataView = desktop.attr("ratingDataView");
        let src_hotlinkId = $(this).attr("id");
        let uniqueId = $(this).attr("uniqueId");
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let childviewDivId = backing.view_type.edit_artifact_view.name + "_" + src_hotlinkId;
        let view = desktop.attr("view"), isBiviewSide;
        if (view === "singleview")
            isBiviewSide = false;
        else if (view === "biview")
            isBiviewSide = true;
        //check for space in screen
        let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.edit_artifact_view.key);
        if (!haveSpaceToOpenView) {
            return;
        }

        //check view is opened before
        let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiviewSide);
        if (isViewOpenedBefore) {
            return;
        }
        let data = {};
        data.elementId = element[ATTR.elementId];
        data.name = element[ATTR.name];
        data.description = element[ATTR.description];
        createScenarioViewOpenedFromView(childviewDivId, src_id, src_hotlinkId, backing.view_type.edit_artifact_view.key, "Edit Element: " + element.name, uniqueId, isBiviewSide);
        renderEditArtifact(childviewDivId, view, element, ratingDataView);
        repositionViews(isBiviewSide);
        $("#saveData").hide();
        e.stopPropagation();
    });

});

function renderCreateArtifact(viewName, view, element,uniqueId, ratingDataView) {
    let str = "";
    let isBiview;
    if (view === "singleview")
        isBiview = false;
    else if (view === "biview")
        isBiview = true;
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true, ratingDataView);
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + element.uniqueId + "\" ratingDataView=\"" + ratingDataView + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"flaticon-add-attribute dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    if (element.name)
        str += "<span class=\"panel-header\">CREATE ARTIFACT: " + objectTypeIcon + "" + element.name.toUpperCase() + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton saveArtifact\">CREATE</span>" +
        "</div>" +
        "<form class=\"uploadFormInView\" style=\"width:100%\" method=\"POST\" enctype=\"multipart/form-data\">" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"/></li>" +
        "<li class=\"create-shield-field\">" +
        //"<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"></textarea></div></li>" +
        "<label class=\"\">DESCRIPTION:</label><textarea class=\"descriptionInput\"></textarea></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>FILE TO UPLOAD<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"fileUpload\" type=\"file\"/>" +
        "</li>" +
        "</ul>" +
        "</form>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    
}

function renderEditArtifact(viewName, view, element,uniqueId, ratingDataView) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true, ratingDataView);
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + element.uniqueId + "\" ratingDataView=\"" + ratingDataView + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"flaticon-add-attribute dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    if (element.name)
        str += "<span class=\"panel-header\">EDIT ARTIFACT: " + objectTypeIcon + "" + element.name.toUpperCase() + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton saveEditedArtifact\">SAVE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\" value=\"" + element.name + "\"/></li>" +
        "<li class=\"create-shield-field\">" +
        //"<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\">" +  element.description + "</textarea></div></li>" +
          "<label class=\"\">DESCRIPTION:</label><textarea class=\"descriptionInput\">" + element.description + "</textarea></li>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
}