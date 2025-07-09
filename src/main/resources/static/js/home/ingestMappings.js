$(document).ready(function () {
    $(document).on("click", ".ingestMapping", function () {
        renderIngestMappingPopUp();
    });

    $(document).on("click", ".shield", function (e) {
        $('#saveData').show();
        let desktop = $(this).closest(".innerDesktop"), selectedId;
        desktop.find(".hierarchyDropDown").addClass("dis-none");
        let dropdownWrapper = $(this).closest(".create-shield-field");
        let dropdownId = dropdownWrapper.find(".shieldDropDown").attr("id");
        if (dropdownId === "popOverlayshieldOne")
            selectedId = desktop.find(".shieldTwo").attr("elementId");
        else
            selectedId = desktop.find(".shieldOne").attr("elementId");
        renderDropDownContent(dropdownId, selectedId);
        $('#saveData').hide();
        e.stopPropagation();
    });

    $(document).on("click", ".shieldDropDownSelector", function (e) {
        let dropdownWrapper = $(this).closest(".create-shield-field");
        dropdownWrapper.find(".shield").val($(this).html());
        let elementId = $(this).attr("elementId");
        dropdownWrapper.find(".shield").attr("elementId", elementId);
        dropdownWrapper.find(".shieldDropDown").addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".clearDirectory", function () {
        $(this).closest(".create-shield-field").children("input").val('');
        $(this).closest(".create-shield-field").children("input").attr("elementId", 0);
    });

    $(document).on("mouseleave", ".shieldDropDown", function () {
        $(this).addClass("dis-none");
    });

    $(document).on("click", ".replaceClick", function () {
        $(".replaceClick").removeClass("active");
        $(this).addClass("active");
    });

    $(document).on("click", ".createIngestMapping", function () {
        let desktop = $(this).closest(".innerDesktop");
        let data = {}, FileUploadPath, Extension;
        data.shieldOneId = desktop.find(".shieldOne").attr("elementId");
        data.shieldTwoId = desktop.find(".shieldTwo").attr("elementId");
        data.replaceExisting = desktop.find(".replaceClick.canDeliverYes").hasClass("active");

        if ((typeof data.shieldOneId === "undefined") || (data.shieldOneId == 0)) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof  data.shieldTwoId === "undefined") || (data.shieldTwoId == 0)) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof  data.replaceExisting === "undefined") || (data.replaceExisting === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if (desktop.find('.excelFileUpload')[0].files.length === 0) {
            alert("Please  choose file");
            return;
        }
        else {
            FileUploadPath = desktop.find('.excelFileUpload')[0].files[0].name;
            Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        }
        if (Extension === "xls" || Extension === "xlsx")
            desktop.find(".uploadFile").trigger("submit");
        else {
            alert("Please upload Excel file");
        }
    });

    $(document).on("submit", ".uploadFile", function (event) {
        let desktop = $(this).closest(".innerDesktop");
        let view = "singleview";
        $('#saveData').show();
        event.preventDefault(); // or return false, your choice

        let formData = new FormData();
        formData.append('file', desktop.find('.excelFileUpload')[0].files[0]);
        formData.append('shieldOneId', desktop.find('.shieldOne').attr("elementId"));
        formData.append('shieldTwoId', desktop.find(".shieldTwo").attr("elementId"));
        formData.append('replaceExisting', desktop.find(".replaceClick.canDeliverYes").hasClass("active"));

        $.ajax({
            url: "/rest/ingest/ingest_direct_interframework_mappings",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data, textStatus) {
                if (textStatus === 'success') {
                    let event = {"key": backing.event_type.modified_direct_element_element_association.key};
                    propagateEvent(event);
                    desktop.remove();
                    $("#popUp").addClass("dis-none");
                    renderCustomAlert(data, "Mappings Ingested", view);
                    $('#saveData').hide();
                }
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 0 || jqXHR === 302) {
                alert('Your session has ended due to inactivity after 10 minutes.\nPlease refresh this page, or close this window and log back in to system.');
            }
            if (jqXHR.status === 500) {
                alert('Please choose file');
            }
            else {
                alert('Unknown error returned while saving' + (typeof errorThrown === 'string' && errorThrown.trim().length > 0 ? ':\n' + errorThrown : ''));
            }
            $('#saveData').hide();

        });
        return false;
    });

});

function renderContent(json, id, selectedId) {
    let str = "<ul>";
    for (let i = 0; i < json.length; i++) {
        //if (selectedId != json[i].elementId)
            str += "<li class=\"shieldDropDownSelector\" elementId=\"" + json[i].elementId + "\">" + json[i].name + "</li>";
    }
    str += "</ul>";
    $("#" + id).html(str);
    $("#" + id).removeClass("dis-none");
}

function renderDropDownContent(dropdownId, selectedId) {
    service.getShieldsAndStandard(null, function (res, err) {
        if (res) {
            renderContent(res.children, dropdownId, selectedId);
        }
        else if (err) {
            errorHandler(err);
            $("#saveData").hide();
        }
    });
}

function renderIngestMappingPopUp() {
    let str = "";
    let viewName = "popOverlay";
    let viewClass = "popup";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + viewClass + "\" >" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    str += "<span class=\" flaticon-ingest-mapping headerMapIcon\"></span>";
    str += "<span class=\"panel-header\">INGEST MAPPINGS FROM EXCEL</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn closePopUp\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\">" +
        "<span class=\"headerActionButton  createIngestMapping\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label class=\"\">COLUMN 1 FRAMEWORK<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"shield shieldOne\" elementId = \"0\" readonly>" +
        "<div id=\"" + viewName + "shieldOne\" class=\"shieldDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearDirectory\">CLEAR</span>" +
        "</li>" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label class=\"\">COLUMN 2 FRAMEWORK<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"shield shieldTwo\"  elementId = \"0\" readonly>" +
        "<div id=\"" + viewName + "shieldTwo\" class=\"shieldDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearDirectory\">CLEAR</span>" +
        "</li>";
    str += "<form class=\"uploadFile\" style=\"width:100%\" method=\"POST\" enctype=\"multipart form-data\"><li class=\"create-shield-field\">" +
        "<label class=\"\">FILE TO INGEST MAPPING<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"excelFileUpload\" type=\"file\"></li></form>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">REPLACE EXISTING MAPPINGS<span style=\"color:#ec4c4c;\">*</span>:</label>" +
        "<span class=\"canDeliver\"><span class=\"canDeliverYes replaceClick active\">YES</span><span class=\"canDeliverNo replaceClick\">NO</span></span></li>";
    str += "</ul>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
}