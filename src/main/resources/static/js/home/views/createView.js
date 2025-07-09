$(document).ready(function () {
    $(document).on("click", ".singleview-add-child", function (e) {
        renderCreateView($(this), false);
        e.stopPropagation();
    });

    $(document).on("click", ".biview-add-child", function (e) {
        renderCreateView($(this), true);
        e.stopPropagation();
    });

    $(document).on("click", ".single-expression-add-child", function (e) {
        renderEditViewForSecElement($(this), false);
        e.stopPropagation();
    });

    $(document).on("click", ".biview-expression-add-child", function (e) {
        renderEditViewForSecElement($(this), true);
        e.stopPropagation();
    });

    /* create shield events starts here*/
    $(document).on("click", ".createShield", function () {
        let side = $(this).closest(".innerDesktop").attr("side"), viewClass;
        if (side === "left")
            viewClass = "singleview";
        else
            viewClass = "biview";
        renderCreateShieldPopUp(viewClass);
    });

    $(document).on("click", ".createShieldFromExcelImport", function () {
        let side = $(this).closest(".innerDesktop").attr("side"), viewClass;
        if (side === "left")
            viewClass = "singleview";
        else
            viewClass = "biview";
        renderCreateShieldPopUp(viewClass, true);
    });

    $(document).on("click", ".closePopUp", function () {
        $("#popUp").addClass("dis-none");
    });

    $(document).on("click", ".create-shield", function () {
        let data = {};
        let desktop = $(this).closest(".innerDesktop");
        let isIngestCreate = desktop.attr("isIngestCreate");
        let FileUploadPath, Extension;
        let acronym = desktop.find(".acronymInput").val().trim(),
            name = desktop.find(".nameInput").val().trim(),
            description = desktop.find(".descriptionInput").val().trim(),
            author = desktop.find(".authorInput").val().trim(),
            version = desktop.find(".versionInput").val().trim();
        if ((typeof name === "undefined") || (name === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof  author === "undefined") || (author === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof  acronym === "undefined") || (acronym === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof  version === "undefined") || (version === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if (isIngestCreate === "true") {
            if (desktop.find('.excelFileUpload')[0].files.length === 0) {
                alert("Please  choose file");
                return;
            }
            else {
                FileUploadPath = desktop.find('.excelFileUpload')[0].files[0].name;
                Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
            }
        }
        if (isIngestCreate === "true") {
            if (Extension === "xls" || Extension === "xlsx")
                desktop.find(".uploadExcelFileInView").trigger("submit");
            else {
                alert("Please upload Excel file");
            }
        }
        else {
            data = {"acronym": acronym, "name": name, "author": author, "description": description, "version": version};
            createShieldOrStandard(data, desktop, true); // true: create shield
        }
    });

    $(document).on("submit", ".uploadExcelFileInView", function (event) {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");

        function callback(data) {
            let event = {"key": backing.event_type.created_shield.key};
            propagateEvent(event);
            desktop.remove();
            getAllShieldElementTypes();
            $("#popUp").addClass("dis-none");
            renderCustomAlert(data, "Shield Ingested Successfully", view);
            $('#saveData').hide();
        }

        $('#saveData').show();
        event.preventDefault();
        let formData = new FormData();
        formData.append('file', desktop.find('.excelFileUpload')[0].files[0]);
        formData.append('name', desktop.find('.nameInput').val().trim());
        formData.append('description', desktop.find(".descriptionInput").val().trim());
        formData.append('author', desktop.find(".authorInput").val().trim());
        formData.append('version', desktop.find(".versionInput").val().trim());
        formData.append('acronym', desktop.find(".acronymInput").val().trim());
        $.ajax({
            url: "/rest/ingest/ingest_shield_from_excel",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data, textStatus) {
                if (textStatus === 'success') {
                    serviceFunctions.getAllShieldAndStandardSchema(callback, data);
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
    /*create shield ends here */

    /*create shield element type starts here */
    $(document).on("click", ".createElementType", function () {
        let side = $(this).closest(".innerDesktop").attr("side"), viewClass;
        if (side === "left")
            viewClass = "singleview";
        else
            viewClass = "biview";
        let view = $(this).attr("view");
        renderCreateShieldElementTypePopUp(view, viewClass);
    });

    $(document).on("click", ".closePopUp", function () {
        $("#popUp").addClass("dis-none");
    });

    $(document).on("click", ".mappableToExpressionClick", function () {
        $(".mappableToExpressionClick").removeClass("active");
        $(this).addClass("active");
    });

    $(document).on("click", ".create-shield-element-type", function () {
        let desktop = $(this).closest(".innerDesktop");
        let desktopId, viewClass, view;
        if (desktop.find(".panel-header-container").hasClass("singleview")) {
            view = desktop.attr("view");
            viewClass = "singleview";
            if (view === "shieldSchema") {
                desktopId = "sh_sch_desk_directory_view";
            } else if (view === "standardSchema") {
                desktopId = "std_sch_desk_directory_view";
            } else if (view === "BusinessSchema") {
                desktopId = "business_sch_desk_directory_view";
            } else if (view === "threatSchema") {
                desktopId = "threat_sch_desk_directory_view";
            }
        }
        else {
            view = desktop.attr("view");
            viewClass = "biview";
            if (view === "shieldSchema") {
                desktopId = "bi_sh_sch_desk_directory_view";
            } else if (view === "standardSchema") {
                desktopId = "bi_std_sch_desk_directory_view";
            } else if (view === "BusinessSchema") {
                desktopId = "bi_business_sch_desk_directory_view";
            } else if (view === "threatSchema") {
                desktopId = "bi_threat_sch_desk_directory_view";
            }
        }
        let data = {};
        let destopQuery = $("#" + desktopId);
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.mappableToExpression = true;
        data.parentElementTypeId = destopQuery.find(".tree_structure_parent_schema").find(".createElementType").prev().attr("elementId") ? destopQuery.find(".tree_structure_parent_schema").find(".createElementType").prev().attr("elementId") : 0;
        data.shieldId = destopQuery.find(".shieldSelector").attr("elementId") ? destopQuery.find(".shieldSelector").attr("elementId") : 0;
        let selectedShield = destopQuery.find(".shieldSelector");
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        createShieldElementType(data, desktop, selectedShield, view, viewClass);
    });
    /*create shield element type ends here */

    /* create standard events starts here*/
    $(document).on("click", ".createStandard", function () {
        let side = $(this).closest(".innerDesktop").attr("side"), viewClass;
        if (side === "left")
            viewClass = "singleview";
        else
            viewClass = "biview";
        renderCreateStandardPopUp(viewClass);
    });

    $(document).on("click", ".createStandardFromIngestFile", function () {
        let side = $(this).closest(".innerDesktop").attr("side"), viewClass;
        if (side === "left")
            viewClass = "singleview";
        else
            viewClass = "biview";
        renderCreateStandardPopUp(viewClass, true);
    });

    $(document).on("click", ".create-standard", function () {
        let desktop = $(this).closest(".innerDesktop");
        let isIngestCreate = desktop.attr("isIngestCreate");
        let data = {}, FileUploadPath, Extension;
        data.acronym = desktop.find(".acronymInput").val().trim();
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.author = desktop.find(".authorInput").val().trim();
        data.version = desktop.find(".versionInput").val().trim();

        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof  data.author === "undefined") || (data.author === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof  data.acronym === "undefined") || (data.acronym === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof  data.version === "undefined") || (data.version === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if (isIngestCreate === "true") {
            if (desktop.find('.excelFileUpload')[0].files.length === 0) {
                alert("Please  choose file");
                return;
            }
            else {
                FileUploadPath = desktop.find('.excelFileUpload')[0].files[0].name;
                Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
            }
        }
        if (isIngestCreate === "true") {
            if (Extension === "xls" || Extension === "xlsx")
                desktop.find(".uploadExcelFileForStandard").trigger("submit");
            else {
                alert("Please upload Excel file");
            }
        }
        else
            createShieldOrStandard(data, desktop, false); // false :create standard
    });

    $(document).on("submit", ".uploadExcelFileForStandard", function (event) {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");

        function callback(data) {
            let event = {"key": backing.event_type.created_shield.key};
            propagateEvent(event);
            getAllShieldElementTypes();
            desktop.remove();
            $("#popUp").addClass("dis-none");
            renderCustomAlert(data, "Standard Ingested Successfully", view);
            $('#saveData').hide();
        }

        $('#saveData').show();
        event.preventDefault();
        let formData = new FormData();
        formData.append('file', desktop.find('.excelFileUpload')[0].files[0]);
        formData.append('name', desktop.find('.nameInput').val().trim());
        formData.append('description', desktop.find(".descriptionInput").val().trim());
        formData.append('author', desktop.find(".authorInput").val().trim());
        formData.append('version', desktop.find(".versionInput").val().trim());
        formData.append('acronym', desktop.find(".acronymInput").val().trim());
        $.ajax({
            url: "/rest/ingest/ingest_standard_from_excel",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data, textStatus) {
                if (textStatus === 'success') {
                    serviceFunctions.getAllShieldAndStandardSchema(callback, data);
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

    /*create standard ends here */

    /* create business events starts here*/
    $(document).on("click", ".createBusinessFramework", function () {
        let side = $(this).closest(".innerDesktop").attr("side"), viewClass;
        if (side === "left")
            viewClass = "singleview";
        else
            viewClass = "biview";
        renderCreateBusinessPopUp(viewClass);
    });

    $(document).on("click", ".createBusinessFrameworkFromIngestFile", function () {
        let side = $(this).closest(".innerDesktop").attr("side"), viewClass;
        if (side === "left")
            viewClass = "singleview";
        else
            viewClass = "biview";
        renderCreateBusinessPopUp(viewClass, true);
    });

    $(document).on("click", ".create-Business", function () {
        let desktop = $(this).closest(".innerDesktop");
        let isIngestCreate = desktop.attr("isIngestCreate");
        let data = {}, FileUploadPath, Extension;
        data.acronym = desktop.find(".acronymInput").val().trim();
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.author = desktop.find(".authorInput").val().trim();
        data.version = desktop.find(".versionInput").val().trim();

        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof  data.author === "undefined") || (data.author === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof  data.acronym === "undefined") || (data.acronym === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof  data.version === "undefined") || (data.version === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if (isIngestCreate === "true") {
            if (desktop.find('.excelFileUpload')[0].files.length === 0) {
                alert("Please  choose file");
                return;
            }
            else {
                FileUploadPath = desktop.find('.excelFileUpload')[0].files[0].name;
                Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
            }
        }
        if (isIngestCreate === "true") {
            if (Extension === "xls" || Extension === "xlsx")
                desktop.find(".uploadExcelFileForBusiness").trigger("submit");
            else {
                alert("Please upload Excel file");
            }
        }
        else
            createBusiness(data, desktop);
    });

    $(document).on("submit", ".uploadExcelFileForBusiness", function (event) {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");

        function callback(data) {
            let event = {"key": backing.event_type.created_Business.key};
            propagateEvent(event);
            getAllShieldElementTypes();
            desktop.remove();
            $("#popUp").addClass("dis-none");
            renderCustomAlert(data, "Business Framework Ingested Successfully", view);
            $('#saveData').hide();
        }

        $('#saveData').show();
        event.preventDefault();
        let formData = new FormData();
        formData.append('file', desktop.find('.excelFileUpload')[0].files[0]);
        formData.append('name', desktop.find('.nameInput').val().trim());
        formData.append('description', desktop.find(".descriptionInput").val().trim());
        formData.append('author', desktop.find(".authorInput").val().trim());
        formData.append('version', desktop.find(".versionInput").val().trim());
        formData.append('acronym', desktop.find(".acronymInput").val().trim());
        $.ajax({
            url: "/rest/ingest/ingest_business_framework_from_excel",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data, textStatus) {
                if (textStatus === 'success') {
                    serviceFunctions.getAllShieldAndStandardSchema(callback, data);
                }
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 0 || jqXHR === 302) {
                alert('Your session has ended due to inactivity after 10 minutes.\nPlease refresh this page, or close this window and log back in to system.');
            } else if (jqXHR.status === 500 && jqXHR.responseJSON.message) {
                alert(jqXHR.responseJSON.message);
            } else {
                alert('Unknown error returned while saving' + (typeof errorThrown === 'string' && errorThrown.trim().length > 0 ? ':\n' + errorThrown : ''));
            }
            $('#saveData').hide();

        });
        return false;
    });
    /*create business ends here */

    /* create standard events starts here*/
    $(document).on("click", ".createThreat", function () {
        let side = $(this).closest(".innerDesktop").attr("side"), viewClass;
        if (side === "left")
            viewClass = "singleview";
        else
            viewClass = "biview";
        renderCreateThreatPopUp(viewClass);
    });

    $(document).on("click", ".createThreatFromIngestFile", function () {
        let side = $(this).closest(".innerDesktop").attr("side"), viewClass;
        if (side === "left")
            viewClass = "singleview";
        else
            viewClass = "biview";
        renderCreateThreatPopUp(viewClass, true);
    });

    $(document).on("click", ".create-threat", function () {
        let desktop = $(this).closest(".innerDesktop");
        let isIngestCreate = desktop.attr("isIngestCreate");
        let data = {}, FileUploadPath, Extension;
        data.acronym = desktop.find(".acronymInput").val().trim();
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.author = desktop.find(".authorInput").val().trim();
        data.version = desktop.find(".versionInput").val().trim();

        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof  data.author === "undefined") || (data.author === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof  data.acronym === "undefined") || (data.acronym === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof  data.version === "undefined") || (data.version === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if (isIngestCreate === "true") {
            if (desktop.find('.excelFileUpload')[0].files.length === 0) {
                alert("Please  choose file");
                return;
            }
            else {
                FileUploadPath = desktop.find('.excelFileUpload')[0].files[0].name;
                Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
            }
        }
        if (isIngestCreate === "true") {
            if (Extension === "xls" || Extension === "xlsx")
                desktop.find(".uploadExcelFileForThreat").trigger("submit");
            else {
                alert("Please upload Excel file");
            }
        }
        else
            createThreatFramework(data, desktop, false); // false :create standard
    });

    $(document).on("submit", ".uploadExcelFileForThreat", function (event) {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");

        function callback(data) {
            let event = {"key": backing.event_type.created_threat.key};
            propagateEvent(event);
            getAllShieldElementTypes();
            desktop.remove();
            $("#popUp").addClass("dis-none");
            renderCustomAlert(data, "Threat Framework Ingested Successfully", view);
            $('#saveData').hide();
        }

        $('#saveData').show();
        event.preventDefault();
        let formData = new FormData();
        formData.append('file', desktop.find('.excelFileUpload')[0].files[0]);
        formData.append('name', desktop.find('.nameInput').val().trim());
        formData.append('description', desktop.find(".descriptionInput").val().trim());
        formData.append('author', desktop.find(".authorInput").val().trim());
        formData.append('version', desktop.find(".versionInput").val().trim());
        formData.append('acronym', desktop.find(".acronymInput").val().trim());
        $.ajax({
            url: "/rest/ingest/ingest_threat_from_excel",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data, textStatus) {
                if (textStatus === 'success') {
                    serviceFunctions.getAllShieldAndStandardSchema(callback, data);
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

    /*create standard ends here */

    $(document).on("click", ".create-child", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let isBiView = isBiViewOrNot(view);
        let activeDesktop = getActiveDesktop(isBiView);
        let viewId = desktop.attr("id");
        let currentOpenedView = getCurrentOpenedView(activeDesktop, viewId);
        //let hotlinkId = currentOpenedView.source_hotlink_id;
        let uniqueId = currentOpenedView.uniqueId;
        let parentDivId = currentOpenedView.source_view_div_id;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let data = {};
        data.shieldId = $("#" + parentDivId).find(".shieldSelector").attr("elementId");
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.organizationalUnitId = (desktop.find(".organisationalDirectory").attr("elementId")) ? desktop.find(".organisationalDirectory").attr("elementId") : 0;
        data.parentElementId = element[ATTR.elementId];
        data.referenceId = desktop.find(".referenceInput").val().trim();
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        } else if ((typeof data.referenceId === "undefined") || (data.referenceId === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        createChild(data, viewId, view, desktop);
    });

    /* create asset Element events starts here*/
    $(document).on("click", ".create-asset-child", function () {
        let desktop = $(this).closest(".innerDesktop");
        let isBusiness = (desktop.attr("isBusiness") === "true");
        let view = desktop.attr("view");
        let viewId = desktop.attr("id");
        let data = {};
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
        /*else if ((typeof data.providerId === "undefined") || (data.providerId === "")) {
            alert("Please fill all mandatory fields");
            return;
        }*/
        createAssetChild(data, viewId, view, desktop, isBusiness);
    });
    /* create asset Element events ends here*/

    /* create asset Type Element events starts here*/
    $(document).on("click", ".create-assetType-child", function () {
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
        data.parentAssetTypeId = element[ATTR.elementId];
        data.canDeliverExpression = true;
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        createAssetTypeChild(data, viewId, view, desktop, isBusiness);
    });

    $(document).on("click", ".canDeliverClick", function () {
        $(".canDeliverClick").removeClass("active");
        $(this).addClass("active");
    });
    /* create asset Type Element events ends here*/

    /* create provider Element events starts here*/
    $(document).on("click", ".create-provider-child", function () {
        let desktop = $(this).closest(".innerDesktop");
        let isBusiness = (desktop.attr("isBusiness") === "true");
        let view = desktop.attr("view");
        let viewId = desktop.attr("id");
        let data = {};
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.organizationalUnitId = (desktop.find(".organisationalDirectory").attr("elementId")) ? desktop.find(".organisationalDirectory").attr("elementId") : 0;
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }

        createProviderChild(data, viewId, view, desktop, isBusiness);
    });
    /* create provider Element events ends here*/

    /* create Organizational Child Element events starts here*/
    $(document).on("click", ".create-organizational-child", function () {
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
        data.parentOrganizationalUnitId = (desktop.find(".organizationalParent").attr("elementId")) ? desktop.find(".organizationalParent").attr("elementId") : 0;
        data.parentElementId = element[ATTR.elementId] ? element[ATTR.elementId] : 0;
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        createOrganizationalChild(data, viewId, view, desktop);
    });
    /* create Organizational Element events ends here*/

    /* create objectiveChild events starts here*/
    $(document).on("click", ".create-objective-child", function () {
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
        data.parentParameterId = element[ATTR.elementId];
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        createObjectiveChild(data, viewId, view, desktop);
    });
    /* create objectiveChild events ends here*/

    /* create MethodChild events starts here*/
    $(document).on("click", ".create-method-child", function () {
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
        data.parentParameterId = element[ATTR.elementId];
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        createMethodChild(data, viewId, view, desktop);
    });
    /* create MethodChild events ends here*/

    /* create content Child events starts here*/
    $(document).on("click", ".create-content-child", function () {
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
        data.parentParameterId = element[ATTR.elementId];
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        createContentChild(data, viewId, view, desktop);
    });
    /* create content child events ends here*/

    /* create subjective Child events starts here*/
    $(document).on("click", ".create-subject-child", function () {
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
        data.parentParameterId = element[ATTR.elementId];
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        createSubjectChild(data, viewId, view, desktop);
    });
    /* create subjective Child events ends here*/

    /* create sce Child events starts here*/
    $(document).on("click", ".create-sce-child", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let viewId = desktop.attr("id");
        let data = {};
        data.description = desktop.find(".descriptionInput").val().trim();
        data.objectiveParameterId = desktop.find(".ObjectiveContainer").find(".selected").attr("id");
        data.contentParameterId = desktop.find(".ContentContainer").find(".selected").attr("id");
        data.methodParameterId = desktop.find(".MethodContainer").find(".selected").attr("id");
        data.subjectParameterId = desktop.find(".SubjectContainer").find(".selected").attr("id");
        if ((typeof data.objectiveParameterId === "undefined") || (data.objectiveParameterId === "")) {
            alert("Security Technology Parameter is mandatory");
            return;
        }
        createSceChild(data, viewId, view, desktop);
    });

    $(document).on("click", ".create_new_sce_with_copy", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let viewId = desktop.attr("id");
        let data = {};
        data.description = desktop.find(".descriptionInput").val().trim();
        data.objectiveParameterId = desktop.find(".ObjectiveContainer").find(".selected").attr("id");
        data.contentParameterId = desktop.find(".ContentContainer").find(".selected").attr("id");
        data.methodParameterId = desktop.find(".MethodContainer").find(".selected").attr("id");
        data.subjectParameterId = desktop.find(".SubjectContainer").find(".selected").attr("id");
        if ((typeof data.objectiveParameterId === "undefined") || (data.objectiveParameterId === "")) {
            alert("Objective Parameter is mandatory");
            return;
        }
        createSceChild(data, viewId, view, desktop);
    });

    $(document).on("click", ".expressionChildViewText", function (e) {
        let desktop = $(this).closest(".expViewWrapper");
        desktop.find(".d-text").removeClass("active selected");

        $(this).addClass("selected");
        $(this).parents(".element_li").each(function () {
            $(this).children(".directoryListItemContainer").find(".d-text").addClass("active");
        });
        getSelectedString($(this).closest(".innerBlock").attr("id"));
        e.stopPropagation();
    });

    $(document).on("click", ".expressionClear", function (e) {
        let desktop = $(this).closest(".expViewWrapper");
        $(this).closest(".innerBlock").children("div.expressionViewHeader").children(".selectedName").html("");
        desktop.find(".d-text").removeClass("active selected");
        e.stopPropagation();
    });
    /* create sce Child events ends here*/

    /*create perspective starts here*/
    $(document).on("click", ".createPerspective", function () {
        let side = $(this).closest(".innerDesktop").attr("side"), view;
        if (side === "left")
            view = "singleview";
        else
            view = "biview";
        renderPerspectivePopUp(view);
    });

    $(document).on("click", ".create-perspective", function () {
        let desktop = $(this).closest(".innerDesktop");
        let data = {};
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.color = desktop.find(".colorInput").val();
        if ((typeof data.name === "undefined") || (data.name === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        createPerspective(data, desktop);
    });
    /*create perspective ends here*/

    $(document).on("click", ".create-user-child", function () {
        let minNumberofChars = 8;
        let regularExpression = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let viewId = desktop.attr("id");
        let data = {};
        let phoneno = /^[- +()]*[0-9][- +()0-9]*$/;
        data.emailId = desktop.find(".emailInput").val().trim();
        data.password = desktop.find(".passwordInput").val().trim();
        data.firstName = desktop.find(".firstNameInput").val().trim();
        data.lastName = desktop.find(".lastNameInput").val().trim();
        data.location = desktop.find(".location").val().trim();
        data.mobileNo = desktop.find(".mobileNo").val().trim();
        data.organizationalUnitId = desktop.find(".organisationalDirectory").attr("elementId");
        data.roleId = desktop.find(".roleDirectory").attr("elementId");
        if ((typeof data.firstName === "undefined") || (data.firstName === "") || (typeof data.lastName === "undefined") || (data.lastName === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        else if ((typeof data.emailId === "undefined") || (data.emailId === "") || (typeof data.password === "undefined") || (data.password === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        else if (data.password.length < minNumberofChars || !regularExpression.test(data.password)) {
            alert("password should contain at least one Uppercase, one lowercase, one number and one special character");
            return;
        }
        else if ((typeof data.organizationalUnitId === "undefined") || (data.organizationalUnitId === "") || (typeof data.roleId === "undefined") || (data.roleId === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        else if (data.mobileNo !== "" && data.mobileNo.match(phoneno) === null) {
            alert("Please enter valid mobile number");
            return;
        }
        else if (validateEmail(data.emailId))
            createUserChild(data, viewId, view, desktop);
        else {
            alert("Invalid Email Address");
        }
    });

    $(document).on("click", ".create-role-child", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let viewId = desktop.attr("id");
        let data = {};
        data.name = desktop.find(".nameInput").val().trim();
        data.description = desktop.find(".descriptionInput").val().trim();
        data.modeDirectExpressionOrBoth = desktop.find(".toolSelected").attr("elementId");
        data.approvalRequired = desktop.find(".isApprovalReqClick.canDeliverYes").hasClass("active") ? true : false;
        data.canApprove = desktop.find(".canApproveClick.canDeliverYes").hasClass("active") ? true : false;
        if ((typeof data.name === "undefined") || (data.name === "") || (typeof data.modeDirectExpressionOrBoth === "undefined") || (data.modeDirectExpressionOrBoth === "")) {
            alert("Please fill all mandatory fields");
            return;
        }
        else createRolesChild(data, viewId, view, desktop);
    });

    $(document).on("click", ".isApprovalReqClick", function () {
        $(".isApprovalReqClick").removeClass("active");
        $(this).addClass("active");
    });

    $(document).on("click", ".canApproveClick", function () {
        $(".canApproveClick").removeClass("active");
        $(this).addClass("active");
    });
});

function renderCreateView(selector, isBiview) {
    let desktop = selector.closest(".innerDesktop");
    let src_hotlinkId = selector.attr("id");
    let uniqueId = selector.attr("uniqueId");
    let label = selector.attr("title");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let objectType = selector.attr("elementType");
    let data = {}, childviewDivId, viewClass;
    let activeDesktop = getActiveDesktop(isBiview);
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
    if (isBiview)
        viewClass = "biview";
    else
        viewClass = "singleview";
    let name;
    if (element[ATTR.name])
        name = label + " : " + element[ATTR.name];
    else
        name = label;
    switch (objectType) {
        case constants.objectType.ASSET_ROOT:
        case constants.objectType.BUSINESS_ASSET_ROOT: {
            let isBusiness = (objectType === constants.objectType.BUSINESS_ASSET_ROOT) ? true : false;
            childviewDivId = backing.view_type.create_asset_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_asset_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_asset_element_view.key, name, uniqueId, isBiview);
            let providerData = {};
            data.assetTypeGroupId = 0;
            data.level = 0;
            data.protectionType = "do_not_show";
            data.showExpression = false;
            data.showAsset = false;
            providerData.showAsset = false;
            providerData.providerGroupId = 0;
            renderCreateAssetElementView(providerData, data, childviewDivId, viewClass, element, objectType, uniqueId, label, isBusiness);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        case constants.objectType.ASSET_TYPE_ROOT:
        case constants.objectType.BUSINESS_ASSET_TYPE_ROOT: {
            let isBusiness = (objectType === constants.objectType.BUSINESS_ASSET_TYPE_ROOT) ? true : false;
            childviewDivId = backing.view_type.create_asset_type_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_asset_type_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_asset_type_element_view.key, name, uniqueId, isBiview);
            renderCreateAssetTypeElementView(childviewDivId, viewClass, element, objectType, uniqueId, label, isBusiness);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        case constants.objectType.ASSET_TYPE:
        case constants.objectType.BUSINESS_ASSET_TYPE: {
            let isBusiness = (objectType === constants.objectType.BUSINESS_ASSET_TYPE) ? true : false;
            childviewDivId = backing.view_type.create_asset_type_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_asset_type_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_asset_type_element_view.key, name, uniqueId, isBiview);
            renderCreateAssetTypeElementView(childviewDivId, viewClass, element, objectType, uniqueId, label, isBusiness);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        case constants.objectType.PROVIDER:
        case constants.objectType.BUSINESS_PROVIDER: {
            let isBusiness = (objectType === constants.objectType.BUSINESS_PROVIDER) ? true : false;
            childviewDivId = backing.view_type.create_provider_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_provider_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_provider_element_view.key, name, uniqueId, isBiview);
            renderCreateProviderElementView(childviewDivId, viewClass, element, objectType, uniqueId, label, isBusiness);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        case constants.objectType.PROVIDER_ROOT:
        case constants.objectType.BUSINESS_PROVIDER_ROOT: {
            let isBusiness = (objectType === constants.objectType.BUSINESS_PROVIDER_ROOT) ? true : false;
            childviewDivId = backing.view_type.create_provider_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_provider_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_provider_element_view.key, name, uniqueId, isBiview);
            renderCreateProviderElementView(childviewDivId, viewClass, element, objectType, uniqueId, label, isBusiness);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        case constants.objectType.ORGANIZATIONAL_UNIT: {
            childviewDivId = backing.view_type.create_organizationalunit_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_organizationalunit_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_organizationalunit_element_view.key, name, uniqueId, isBiview);
            renderCreateOrganizationalUnitElementView(childviewDivId, viewClass, element, objectType, uniqueId, label);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        case constants.objectType.ORGANIZATIONAL_UNIT_ROOT: {
            childviewDivId = backing.view_type.create_organizationalunit_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_organizationalunit_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_organizationalunit_element_view.key, name, uniqueId, isBiview);
            renderCreateOrganizationalUnitElementView(childviewDivId, viewClass, element, objectType, uniqueId, label);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        case constants.objectType.OBJECTIVE_PARAMETER: {
            childviewDivId = backing.view_type.create_objective_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_objective_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_objective_element_view.key, name, uniqueId, isBiview);
            renderCreateObjectiveParameterElementView(childviewDivId, viewClass, element, objectType, uniqueId, label);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        case constants.objectType.OBJECTIVE_PARAMETER_ROOT: {
            childviewDivId = backing.view_type.create_objective_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_objective_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_objective_element_view.key, name, uniqueId, isBiview);
            renderCreateObjectiveParameterElementView(childviewDivId, viewClass, element, objectType, uniqueId, label);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        case constants.objectType.METHOD_PARAMETER: {
            childviewDivId = backing.view_type.create_method_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_method_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);

            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_method_element_view.key, name, uniqueId, isBiview);
            renderCreateMethodParameterElementView(childviewDivId, viewClass, element, objectType, uniqueId, label);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        case constants.objectType.METHOD_PARAMETER_ROOT: {
            childviewDivId = backing.view_type.create_method_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_method_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_method_element_view.key, name, uniqueId, isBiview);
            renderCreateMethodParameterElementView(childviewDivId, viewClass, element, objectType, uniqueId, label);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        case constants.objectType.CONTENT_PARAMETER: {
            childviewDivId = backing.view_type.create_content_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_content_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_content_element_view.key, name, uniqueId, isBiview);
            renderCreateContentParameterElementView(childviewDivId, viewClass, element, objectType, uniqueId, label);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        case constants.objectType.CONTENT_PARAMETER_ROOT: {
            childviewDivId = backing.view_type.create_content_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_content_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_content_element_view.key, name, uniqueId, isBiview);
            renderCreateContentParameterElementView(childviewDivId, viewClass, element, objectType, uniqueId, label);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        case constants.objectType.SUBJECT_PARAMETER: {
            childviewDivId = backing.view_type.create_subject_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_subject_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);

            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_subject_element_view.key, name, uniqueId, isBiview);
            renderCreateSubjectParameterElementView(childviewDivId, viewClass, element, objectType, uniqueId, label);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        case constants.objectType.SUBJECT_PARAMETER_ROOT: {
            childviewDivId = backing.view_type.create_subject_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_subject_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_subject_element_view.key, name, uniqueId, isBiview);
            renderCreateSubjectParameterElementView(childviewDivId, viewClass, element, objectType, uniqueId, label);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        case constants.objectType.SCE_ROOT: {
            let desktopId = desktop.attr("id");
            let elementType = selector.attr("elementType");
            let childviewDivId = backing.view_type.create_expression_view.name + "_" + src_hotlinkId;
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
            if (active_desktop_directory_view_id === desktopId)
                createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_expression_view.key, label, uniqueId, isBiview);
            else
                createScenarioViewOpenedFromView(childviewDivId, desktopId, src_hotlinkId, backing.view_type.create_expression_view.key, label, uniqueId, isBiview);

            renderCreateSceElementView(childviewDivId, viewClass, element, elementType, uniqueId, label);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        case constants.objectType.USER_ROOT: {
            let desktopId = desktop.attr("id");
            let elementType = selector.attr("elementType");
            let childviewDivId = backing.view_type.create_user_view.name + "_" + src_hotlinkId;
            //check for space in screen
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_user_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            //check view is opened before
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            if (active_desktop_directory_view_id === desktopId)
                createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_user_view.key, label, uniqueId, isBiview);
            else
                createScenarioViewOpenedFromView(childviewDivId, desktopId, src_hotlinkId, backing.view_type.create_user_view.key, label, uniqueId, isBiview);

            renderCreateUserView(childviewDivId, viewClass, element, elementType, uniqueId, label);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        case constants.objectType.ROLE_ROOT: {
            let desktopId = desktop.attr("id");
            let elementType = selector.attr("elementType");
            let childviewDivId = backing.view_type.create_role_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_role_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            if (active_desktop_directory_view_id === desktopId)
                createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_role_view.key, label, uniqueId, isBiview);
            else
                createScenarioViewOpenedFromView(childviewDivId, desktopId, src_hotlinkId, backing.view_type.create_role_view.key, label, uniqueId, isBiview);

            renderCreateRoleView(childviewDivId, viewClass, element, elementType, uniqueId, label);
            repositionViews(isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
        }
        default:
            childviewDivId = backing.view_type.create_shield_element_view.name + "_" + src_hotlinkId;
            let haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.create_shield_element_view.key);
            if (!haveSpaceToOpenView) {
                return;
            }
            let isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(childviewDivId, isBiview);
            if (isViewOpenedBefore) {
                return;
            }
            createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_shield_element_view.key, name, uniqueId, isBiview);
            renderCreateShieldElement(childviewDivId, viewClass, element, objectType, uniqueId, label, isBiview);
            highlightSourceAndView(childviewDivId, isBiview);
            break;
    }


}

function renderEditViewForSecElement(selector, isBiview) {
    $("#saveData").show();
    let desktopId = selector.closest(".innerDesktop").attr("id");
    let src_hotlinkId = selector.attr("id");
    let uniqueId = selector.attr("uniqueId");
    let label = selector.attr("title");
    let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
    let elementType = selector.attr("elementType");
    let childviewDivId = backing.view_type.create_shield_element_view.name + "_" + src_hotlinkId;
    let activeDesktop = getActiveDesktop(isBiview);
    let active_desktop_directory_view_id = activeDesktop.anchor_div_id;
    let viewClass;
    if (isBiview)
        viewClass = "biview";
    else
        viewClass = "singleview";
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
    if (active_desktop_directory_view_id === desktopId)
        createScenarioViewOpenedFromAnchorSingleCase(childviewDivId, active_desktop_directory_view_id, src_hotlinkId, backing.view_type.create_expression_view.key, label, uniqueId, isBiview);
    else
        createScenarioViewOpenedFromView(childviewDivId, desktopId, src_hotlinkId, backing.view_type.create_expression_view.key, label, uniqueId, isBiview);

    renderCreateSceElementView(childviewDivId, viewClass, element, elementType, uniqueId, label);
}

function createShieldOrStandard(data, desktop, isShield) {
    $("#saveData").show();

    function callbackShield() {
        getAllShieldElementTypes();
        let event = {"key": backing.event_type.created_shield.key};
        propagateEvent(event);
        desktop.remove();
        $("#popUp").addClass("dis-none");
        $("#saveData").hide();
    }

    function callbackStd() {
        getAllShieldElementTypes();
        let event = {"key": backing.event_type.created_standard.key};
        propagateEvent(event);
        desktop.remove();
        $("#popUp").addClass("dis-none");
        $("#saveData").hide();
    }

    if (isShield) {
        service.createShield(data, function (res, err) {
            if (res) {
                alert("Successfully Added");
                serviceFunctions.getAllShieldAndStandardSchema(callbackShield);
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
    else {
        service.createStandard(data, function (res, err) {
            if (res) {
                alert("Successfully Added");
                serviceFunctions.getAllShieldAndStandardSchema(callbackStd);
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

function createBusiness(data, desktop) {
    $("#saveData").show();

    function callbackStd() {
        getAllShieldElementTypes();
        let event = {"key": backing.event_type.created_Business.key};
        propagateEvent(event);
        desktop.remove();
        $("#popUp").addClass("dis-none");
        $("#saveData").hide();
    }

    service.createBusiness(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            serviceFunctions.getAllShieldAndStandardSchema(callbackStd);
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

function createThreatFramework(data, desktop) {
    $("#saveData").show();

    function callbackThreat() {
        getAllShieldElementTypes();
        let event = {"key": backing.event_type.created_threat.key};
        propagateEvent(event);
        desktop.remove();
        $("#popUp").addClass("dis-none");
        $("#saveData").hide();
    }

    service.createThreatFramework(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            serviceFunctions.getAllShieldAndStandardSchema(callbackThreat);
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

function createShieldElementType(data, desktop, selectedShield, view, viewClass) {

    function callbackCreateShieldElement() {
        if (viewClass === "singleview") {
            if (view === "shieldSchema") {
                getAllShieldElementTypes();
                let shieldSchemaDesktopUtil = new ShieldSchemaDesktopUtils();
                shieldSchemaDesktopUtil.shieldSelectorClick(selectedShield);
                let event = {"key": backing.event_type.created_shield_element_type.key};
                propagateEvent(event);
            } else if (view === "standardSchema") {
                getAllShieldElementTypes();
                let standardSchemaDesktopUtil = new StandardSchemaDesktopUtils();
                standardSchemaDesktopUtil.shieldSelectorClick(selectedShield);
                let event = {"key": backing.event_type.created_standard_element_type.key};
                propagateEvent(event);
            } else if (view === "BusinessSchema") {
                getAllShieldElementTypes();
                let businessSchemaDesktopUtil = new BusinessSchemaDesktopUtils();
                businessSchemaDesktopUtil.shieldSelectorClick(selectedShield);
                let event = {"key": backing.event_type.created_business_element_type.key};
                propagateEvent(event);
            } else if (view === "threatSchema") {
                getAllShieldElementTypes();
                let businessSchemaDesktopUtil = new ThreatSchemaDesktopUtils();
                businessSchemaDesktopUtil.shieldSelectorClick(selectedShield);
                let event = {"key": backing.event_type.created_threat_element_type.key};
                propagateEvent(event);
            }
        } else {
            if (view === "shieldSchema") {
                getAllShieldElementTypes();
                let shieldSchemaDesktopUtil = new BiviewShieldSchemaDesktopUtils();
                shieldSchemaDesktopUtil.shieldSelectorClick(selectedShield);
                let event = {"key": backing.event_type.created_shield_element_type.key};
                propagateEvent(event);

            } else if (view === "standardSchema") {
                getAllShieldElementTypes();
                let standardSchemaDesktopUtil = new BiviewStandardSchemaDesktopUtils();
                standardSchemaDesktopUtil.shieldSelectorClick(selectedShield);
                let event = {"key": backing.event_type.created_standard_element_type.key};
                propagateEvent(event);
            } else if (view === "BusinessSchema") {
                getAllShieldElementTypes();
                let businessSchemaDesktopUtil = new BiviewBusinessSchemaDesktopUtils();
                businessSchemaDesktopUtil.shieldSelectorClick(selectedShield);
                let event = {"key": backing.event_type.created_business_element_type.key};
                propagateEvent(event);
            } else if (view === "threatSchema") {
                getAllShieldElementTypes();
                let standardSchemaDesktopUtil = new BiviewThreatSchemaDesktopUtils();
                standardSchemaDesktopUtil.shieldSelectorClick(selectedShield);
                let event = {"key": backing.event_type.created_threat_element_type.key};
                propagateEvent(event);
            }
        }

        desktop.remove();
        $("#popUp").addClass("dis-none");
        $("#saveData").hide();
    }

    $("#saveData").show();
    service.createShieldElementType(data, function (res, err) {
        if (res) {
            serviceFunctions.getAllShieldAndStandardSchema(callbackCreateShieldElement);
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

function createChild(data, viewId, view, desktop) {
    $("#saveData").show();
    service.createShieldElement(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            let event = {"key": backing.event_type.created_shield_element.key};
            propagateEvent(event);
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

function createAssetChild(data, viewId, view, desktop, isBusiness) {
    $("#saveData").show();
    let renderFunction = (isBusiness) ? service.createBusinessAssetElement : service.createAssetElement;
    renderFunction(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            let event = {"key": backing.event_type.created_asset_element.key};
            propagateEvent(event);
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

function createAssetTypeChild(data, viewId, view, desktop, isBusiness) {
    $("#saveData").show();
    let renderFunction = (isBusiness) ? service.createBusinessAssetTypeElement : service.createAssetTypeElement;
    renderFunction(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            let event = {"key": backing.event_type.created_asset_type_element.key};
            propagateEvent(event);
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

function createProviderChild(data, viewId, view, desktop, isBusiness) {
    $("#saveData").show();
    let renderFunction = (isBusiness) ? service.createBusinessProviderElement : service.createProviderElement;
    renderFunction(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            let event = {"key": backing.event_type.created_provider_element.key};
            propagateEvent(event);
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

function createOrganizationalChild(data, viewId, view, desktop) {
    $("#saveData").show();
    service.createOrganizationalElement(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            let event = {"key": backing.event_type.created_organizationalunit_element.key};
            propagateEvent(event);
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

function createObjectiveChild(data, viewId, view, desktop) {
    $("#saveData").show();
    service.createObjectiveParameterElement(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            service.getObjectiveParameterDv(null, function (res, err) {
                if (res) {
                    backing.objectiveParameterDv = res;
                    generateUniqueIdAndParentLink(backing.objectiveParameterDv, id, null);
                    let event = {"key": backing.event_type.created_objectiveParameter_element.key};
                    propagateEvent(event);
                }
                else if (err) {
                    $("#saveData").hide();
                }
            });
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

function createMethodChild(data, viewId, view, desktop) {
    $("#saveData").show();
    service.createMethodParameterElement(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            service.getMethodParameterDv(null, function (res, err) {
                if (res) {
                    backing.methodParameterDv = res;
                    generateUniqueIdAndParentLink(backing.methodParameterDv, id, null);
                    let event = {"key": backing.event_type.created_methodParameter_element.key};
                    propagateEvent(event);
                }
                else if (err) {
                    $("#saveData").hide();
                }
            });
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

function createContentChild(data, viewId, view, desktop) {
    $("#saveData").show();
    service.createContentParameterElement(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            service.getContentParameterDv(null, function (res, err) {
                if (res) {
                    backing.contentParameterDv = res;
                    generateUniqueIdAndParentLink(backing.contentParameterDv, id, null);
                    let event = {"key": backing.event_type.created_contentParameter_element.key};
                    propagateEvent(event);
                }
                else if (err) {
                    $("#saveData").hide();
                }
            });
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

function createSubjectChild(data, viewId, view, desktop) {
    $("#saveData").show();
    service.createSubjectParameterElement(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            service.getSubjectParameterDv(null, function (res, err) {
                if (res) {
                    backing.subjectParameterDv = res;
                    generateUniqueIdAndParentLink(backing.subjectParameterDv, id, null);
                    let event = {"key": backing.event_type.created_subjectParameter_element.key};
                    propagateEvent(event);

                }
                else if (err) {
                    $("#saveData").hide();
                }
            });
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

function createSceChild(data, viewId, view, desktop) {
    $("#saveData").show();
    service.createExpressionElement(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            let event = {"key": backing.event_type.created_expression.key};
            propagateEvent(event);
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

function createPerspective(data) {
    service.createPerspective(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            let event = {"key": backing.event_type.created_perspective.key};
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

function createUserChild(data, viewId, view, desktop) {
    $("#saveData").show();
    service.createUsers(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            let event = {"key": backing.event_type.created_user.key};
            propagateEvent(event);
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

function createRolesChild(data, viewId, view, desktop) {
    $("#saveData").show();
    service.createRole(data, function (res, err) {
        if (res) {
            alert("Successfully Added");
            let id = desktop.attr("id");
            desktop.remove();
            (view === "singleview") ? closeViewUpdateOpenedViews(id, false) : closeViewUpdateOpenedViews(id, true);
            let event = {"key": backing.event_type.created_role.key};
            propagateEvent(event);
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

function renderCreateShieldElement(childviewDivId, view, element, objectType, uniqueId, label, isbiviewSide) {
    if (element.elementId !== 0) {
        service.getEditElementInfo(element.elementId, function (res, err) {
            if (res) {
                renderCreateShieldElementView(childviewDivId, view, element, objectType, uniqueId, label, res);
                repositionViews(isbiviewSide);
            }
            else if (err) {

            }
        });
    }
    else {
        renderCreateShieldElementView(childviewDivId, view, element, objectType, uniqueId, label);
        repositionViews(isbiviewSide);
    }
}

function renderCreateShieldElementView(viewName, view, element, elementType, uniqueId, label, elementInfo) {
    let str = "";
    let parentElementName = "NA";
    let parentElementType = "NA";
    let Type = (elementType) ? elementType : "NA";
    let refIdSuggestion = "";
    if (elementInfo) {
        parentElementName = (elementInfo.name) ? elementInfo.name : "NA";
        parentElementType = (elementInfo.elementTypeName) ? elementInfo.elementTypeName : "NA";
        if(elementInfo.refIdSuggestion)
            refIdSuggestion = elementInfo.refIdSuggestion;
    }
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    let headerName = getViewHeaderName(element);
    let shieldName = ($("#" + activeDesktop.selector.shield_dropdown_selected_id).text()) ? $("#" + activeDesktop.selector.shield_dropdown_selected_id).text() : "NA";

    str += `<div id="${viewName}" class="innerDesktop childviewDesktop" view="${view}"  uniqueId ="${uniqueId}" shieldName ="${shieldName}">` +
        `<div class="panel-header-container ${view}">` +
        `<span class="flaticon-add-attribute dataViewIcon findSourceHotlink" title="Show Source Hotlink"></span>`;
    str += `<span class="panel-header">${label.toUpperCase()} : ${objectTypeIcon} <span class="viewHeaderName" title="${headerName.toUpperCase()}">${headerName.toUpperCase()}</span></span>`;
    str += `<span class="rgtnavdfstage_build_workbench_close tooltip tooltipstered close-btn ${view}CloseBtn" id="closeCreateShieldElementView${desktopId}">` +
        `<span class="ss-cancel" style="font-size: 11px;"></span>` +
        `</span>` +
        `<span class="flaticon-fullscreen expandView ResizingIcon fright"></span>` +
        `<span class="flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none"></span>` +
        `<span class="fright flaticon-refresh-button refreshButton"></span>` +
        `</div>` +
        `<div class="desktop-selector-container ${view}">` +
        `<span class="headerActionButton create-child">CREATE</span>` +
        `</div>` +
        `<ul class="create-shield-element-container">` +
        `<li class="create-shield-field">` +
        `<label class=\"\">FRAMEWORK:</label><input class="uneditable shieldName" value="${shieldName}" readonly></li>` +
        `<li class="create-shield-field">` +
        `<label class=\"\">PARENT CONTROL NAME:</label><input class="uneditable parentName" value="${parentElementName}" readonly/></li>` +
        `<li class="create-shield-field">` +
        `<label>PARENT CONTROL TYPE:</label><input class="uneditable parentType" value="${parentElementType}" readonly/></li>` +
        `<li class="create-shield-field">` +
        `<label>NAME<span style="color:#ec4c4c;">*</span>:</label><textarea class="nameInput"></textarea></li>` +
        `<li class="create-shield-field">` +
        `<label>DESCRIPTION:</label><div class="editorTextArea"><textarea id="createDescriptionInput${uniqueId}" name="descriptionInput${uniqueId}" class="descriptionInput"></textarea></div></li>` +
        //  `<label>DESCRIPTION:</label><textarea class="descriptionInput"></textarea></li>` +
        `<li class="create-shield-field">` +
        `<label>CONTROL TYPE:</label><input class="uneditable childType" value="${Type}" readonly></li>` +
        `<li class="create-shield-field">` +
        `<label>DESCRIPTIVE ID<span style="color:#ec4c4c;">*</span>:</label><input class="referenceInput" value="${refIdSuggestion}"></li>` +
        `<li class="create-shield-field" style="position: relative;">` +
        `<label>ORGANIZATIONAL UNIT:</label><input class="organisationalDirectory hierarchySelected" readonly>` +
        `<div id="${viewName}org" class="hierarchyDropDown organisationalDirectoryDropDown dis-none"></div>` +
        `<span class="actionButton clearOrgDirectory">CLEAR</span>`;
    "</li>" +
    "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);

     // added by Manish for Rich Text Editor
     applyRichTextEditorById("createDescriptionInput"+uniqueId);
     
    
    $("#" + viewName).find('input.nameInput').focus();
    getDataForOrgUnit(viewName);
}

function renderCreateShieldPopUp(viewClass, isIngestCreate) {
    let str = "";
    let viewName = "popOverlay";
    let createClass = "create-shield";
    //let uniqueId=Date.now(); 

    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + viewClass + "\" isIngestCreate=\"" + isIngestCreate + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    str += "<span class=\"panel-header\">CREATE INTERNAL FRAMEWORK</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close tooltip tooltipstered close-btn closePopUp\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\">" +
        "<span class=\"headerActionButton " + createClass + "\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label>ACRONYM<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"acronymInput\" maxlength=\"25\" style=\"text-transform:uppercase\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>AUTHOR<span style=\"color:#ec4c4c;\">*</span>:</label><textarea class=\"authorInput\"></textarea></li>" +
        "<li class=\"create-shield-field\">" +
        //"<label>DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"createDescriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"></textarea></div></li>" +
       "<label>DESCRIPTION:</label><input class=\"descriptionInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>VERSION<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"versionInput\"></li>";
    if (isIngestCreate === true)
        str += "<form class=\"uploadExcelFileInView\" style=\"width:100%\" method=\"POST\" enctype=\"multipart form-data\"><li class=\"create-shield-field\">" +
            "<label>FILE TO UPLOAD<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"excelFileUpload\" type=\"file\"></li></form>";
    str += "</ul>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
    $("#" + viewName).find('input.nameInput').focus();
    //applyRichTextEditorById("createDescriptionInput"+uniqueId);
}

function renderCreateShieldElementTypePopUp(view, viewClass) {
    let headerLabel = "CREATE CONTROL TYPE";
    let activeDesktop = getActiveDesktop(undefined, viewClass);
    let activeDesktopKey = activeDesktop.key;
    //let uniqueId=Date.now(); 

    if (activeDesktopKey === "shield_schema_desktop" || activeDesktopKey === "standard_schema_desktop" || activeDesktopKey === "threat_schema_desktop" || activeDesktopKey === "business_schema_desktop") {
        switch(activeDesktopKey) {
            case "shield_schema_desktop":
                headerLabel = "CREATE INTERNAL POLICY TYPE";
                break;
            case "standard_schema_desktop":
                headerLabel = "CREATE EXTERNAL POLICY TYPE";
                break;
            case "threat_schema_desktop":
                headerLabel = "CREATE THREAT VECTOR TYPE";
                break;
            case "business_schema_desktop":
                headerLabel = "CREATE VALUE PROCESS TYPE";
                break;
        }
    }
    let str = "";
    let viewName = "popOverlay";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    str += "<span class=\"panel-header\">" + headerLabel + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close tooltip tooltipstered close-btn closePopUp\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\">" +
        "<span class=\"headerActionButton create-shield-element-type\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label>NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
       // "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"createDescriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"></textarea></div></li>" ;
         "<label>DESCRIPTION:</label><input class=\"descriptionInput\"></li>";
    str += "</ul>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
    $("#" + viewName).find('input.nameInput').focus();
    //applyRichTextEditorById("createDescriptionInput"+uniqueId);
}

function renderCreateStandardPopUp(viewClass, isIngestCreate) {
    let str = "";
    let viewName = "popOverlay";
    let createClass = "create-standard";
    //let uniqueId=Date.now();

    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + viewClass + "\" isIngestCreate=\"" + isIngestCreate + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    str += "<span class=\"panel-header\">CREATE EXTERNAL FRAMEWORK</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close tooltip tooltipstered close-btn closePopUp\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\">" +
        "<span class=\"headerActionButton " + createClass + "\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label>ACRONYM<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"acronymInput\" maxlength=\"25\" style=\"text-transform:uppercase\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>AUTHOR<span style=\"color:#ec4c4c;\">*</span>:</label><textarea class=\"authorInput\"></textarea></li>" +
        "<li class=\"create-shield-field\">" +
        //"<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"createDescriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"></textarea></div></li>" +
         "<label>DESCRIPTION:</label><input class=\"descriptionInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>VERSION<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"versionInput\"></li>";
    if (isIngestCreate === true)
        str += "<form class=\"uploadExcelFileForStandard\" style=\"width:100%\" method=\"POST\" enctype=\"multipart form-data\"><li class=\"create-shield-field\">" +
            "<label>FILE TO UPLOAD<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"excelFileUpload\" type=\"file\"></li></form>";
    str += "</ul>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
    $("#" + viewName).find('input.nameInput').focus();
    //applyRichTextEditorById("createDescriptionInput"+uniqueId);
}

function renderCreateThreatPopUp(viewClass, isIngestCreate) {
    let str = "";
    let viewName = "popOverlay";
    let createClass = "create-threat";
    //let uniqueId=Date.now(); 

    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + viewClass + "\" isIngestCreate=\"" + isIngestCreate + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    str += "<span class=\"panel-header\">CREATE THREAT FRAMEWORK</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close tooltip tooltipstered close-btn closePopUp\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\">" +
        "<span class=\"headerActionButton " + createClass + "\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label>ACRONYM<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"acronymInput\" maxlength=\"25\" style=\"text-transform:uppercase\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>AUTHOR<span style=\"color:#ec4c4c;\">*</span>:</label><textarea class=\"authorInput\"></textarea></li>" +
        "<li class=\"create-shield-field\">" +
        
        //"<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"createDescriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"></textarea></div></li>"+
         "<label>DESCRIPTION:</label><input class=\"descriptionInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>VERSION<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"versionInput\"></li>";
    if (isIngestCreate === true)
        str += "<form class=\"uploadExcelFileForThreat\" style=\"width:100%\" method=\"POST\" enctype=\"multipart form-data\"><li class=\"create-shield-field\">" +
            "<label>FILE TO UPLOAD<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"excelFileUpload\" type=\"file\"></li></form>";
    str += "</ul>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
    $("#" + viewName).find('input.nameInput').focus();
    //applyRichTextEditorById("createDescriptionInput"+uniqueId);
}

function renderCreateBusinessPopUp(viewClass, isIngestCreate) {
    let str = "";
    let viewName = "popOverlay";
    let createClass = "create-Business";
    //let uniqueId=Date.now(); 

    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + viewClass + "\" isIngestCreate=\"" + isIngestCreate + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    str += "<span class=\"panel-header\">CREATE BUSINESS FRAMEWORK</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close tooltip tooltipstered close-btn closePopUp\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\">" +
        "<span class=\"headerActionButton " + createClass + "\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label>ACRONYM<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"acronymInput\" maxlength=\"25\" style=\"text-transform:uppercase\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>AUTHOR<span style=\"color:#ec4c4c;\">*</span>:</label><textarea class=\"authorInput\"></textarea></li>" +
        "<li class=\"create-shield-field\">" +
        //"<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"createDescriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"></textarea></div></li>"+
         "<label>DESCRIPTION:</label><input class=\"descriptionInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>VERSION<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"versionInput\"></li>";
    if (isIngestCreate === true)
        str += "<form class=\"uploadExcelFileForBusiness\" style=\"width:100%\" method=\"POST\" enctype=\"multipart form-data\"><li class=\"create-shield-field\">" +
            "<label>FILE TO UPLOAD<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"excelFileUpload\" type=\"file\"></li></form>";
    str += "</ul>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
    $("#" + viewName).find('input.nameInput').focus();
    //applyRichTextEditorById("createDescriptionInput"+uniqueId);
}

function renderCreateAssetElementView(providerData, data, viewName, view, element, elementType, uniqueId, label, isBusiness) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview, "", true);
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\" isBusiness=\"" + isBusiness + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"flaticon-add-attribute dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
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
        "<span class=\"headerActionButton create-asset-child\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label>NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"createDescriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"></textarea></div></li>"+
        // "<label>DESCRIPTION:</label><textarea class=\"descriptionInput\"></textarea></li>" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label>ASSET TYPE<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"assetTypeHierarchy hierarchySelected\" readonly>" +
        "<div id=\"" + viewName + "assetTypeHierarchy\" class=\"assetTypeHierarchyDropDown hierarchyDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearAssetTypeHierarchy\">CLEAR</span></li>" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label>PROVIDER<span style=\"color:#ec4c4c;\"></span>:</label><input class=\"providerHierarchy hierarchySelected\" readonly>" +
        "<div id=\"" + viewName + "providerHierarchy\" class=\"providerHierarchyDropDown hierarchyDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearProviderHierarchy\">CLEAR</span>" +
        "</li>" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label>ORGANIZATIONAL UNIT:</label><input class=\"organisationalDirectory hierarchySelected\" readonly>" +
        "<div id=\"" + viewName + "org\" class=\"organisationalDirectoryDropDown hierarchyDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearOrgDirectory\">CLEAR</span>" +
        "</li>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    getDataForAssetTypeHierarchy(data, viewName, "", isBusiness);
    getDataForProviderHierarchy(providerData, viewName, "", isBusiness);
    getDataForOrgUnit(viewName);
    applyRichTextEditorById("createDescriptionInput"+uniqueId);

}

function renderCreateAssetTypeElementView(viewName, view, element, elementType, uniqueId, label, isBusiness) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview);
    let parentAssetType = (element.name) ? element.name : "NA";
    let parentElementId = (element.elementId) ? element.elementId : 0;
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\" isBusiness=\"" + isBusiness + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"flaticon-add-attribute dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
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
        "<span class=\"headerActionButton create-assetType-child\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label>PARENT ASSET TYPE:</label><input class=\"uneditable parentAssetType\" value=\"" + parentAssetType + "\" elementId =\"" + parentElementId + "\" readonly></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"createDescriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"></textarea></div></li>"+
        // "<label>DESCRIPTION:</label><textarea class=\"descriptionInput\"></textarea></li>" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label>ORGANIZATIONAL UNIT:</label><input class=\"organisationalDirectory hierarchySelected\" readonly>" +
        "<div id=\"" + viewName + "org\" class=\"organisationalDirectoryDropDown hierarchyDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearOrgDirectory\">CLEAR</span>" +
        "</li>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    getDataForOrgUnit(viewName);
    applyRichTextEditorById("createDescriptionInput"+uniqueId);
}

function renderCreateProviderElementView(viewName, view, element, elementType, uniqueId, label, isBusiness) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview);
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\" isBusiness=\"" + isBusiness + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"flaticon-add-attribute dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    if (element.name)
        str += "<span class=\"panel-header\">" + label.toUpperCase() + ": " + objectTypeIcon + "" + element.name.toUpperCase() + "</span>";
    else
        str += "<span class=\"panel-header\">" + label.toUpperCase() + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\" title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton create-provider-child\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label>NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"createDescriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"></textarea></div></li>"+
        //   "<label>DESCRIPTION:</label><textarea class=\"descriptionInput\"></textarea></li>" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label>ORGANIZATIONAL UNIT:</label><input class=\"organisationalDirectory hierarchySelected\" readonly>" +
        "<div id=\"" + viewName + "org\" class=\"organisationalDirectoryDropDown hierarchyDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearOrgDirectory\">CLEAR</span>"
    "</li>" +
    "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    getDataForOrgUnit(viewName);
    applyRichTextEditorById("createDescriptionInput"+uniqueId);
}

function renderCreateOrganizationalUnitElementView(viewName, view, element, elementType, uniqueId, label) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview);
    let parentElementName = (element.name) ? element.name : "NA";
    let parentElementId = (element.elementId) ? element.elementId : 0;
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"flaticon-add-attribute dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    if (element.name)
        str += "<span class=\"panel-header\">" + label.toUpperCase() + ": " + objectTypeIcon + "" + element.name.toUpperCase() + "</span>";
    else
        str += "<span class=\"panel-header\">" + label.toUpperCase() + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\"  title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\"  title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton create-organizational-child\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label>PARENT ORGANIZATIONAL UNIT:</label><input class=\"organizationalParent uneditable\" value=\"" + parentElementName + "\" elementId =\"" + parentElementId + "\" readonly></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"createDescriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"></textarea></div></li>"+
          //"<label>DESCRIPTION:</label><textarea class=\"descriptionInput\"></textarea></li>" +
        "</li>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    applyRichTextEditorById("createDescriptionInput"+uniqueId);
}

function renderCreateObjectiveParameterElementView(viewName, view, element, elementType, uniqueId, label) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview);
    let parentElementName = (element.name) ? element.name : "NA";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"flaticon-add-attribute dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    if (element.name)
        str += "<span class=\"panel-header\">" + label.toUpperCase() + ": " + objectTypeIcon + "" + element.name.toUpperCase() + "</span>";
    else
        str += "<span class=\"panel-header\">" + label.toUpperCase() + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\"  title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton create-objective-child\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label>PARENT PARAMETER:</label><input class=\"uneditable parentParameter\" value=\"" + parentElementName + "\" readonly></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"createDescriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"></textarea></div></li>"+
        // "<label>DESCRIPTION:</label><textarea class=\"descriptionInput\"></textarea>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    getDataForOrgUnit(viewName);
    applyRichTextEditorById("createDescriptionInput"+uniqueId);
}

function renderCreateMethodParameterElementView(viewName, view, element, elementType, uniqueId, label) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview);
    let parentElementName = (element.name) ? element.name : "NA";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"flaticon-add-attribute dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
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
        "<span class=\"headerActionButton create-method-child\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label>PARENT PARAMETER:</label><input class=\"uneditable parentParameter\" value=\"" + parentElementName + "\" readonly></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"createDescriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"></textarea></div></li>"+
     
        //"<label>DESCRIPTION:</label><textarea class=\"descriptionInput\"></textarea></li>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    getDataForOrgUnit(viewName);
    applyRichTextEditorById("createDescriptionInput"+uniqueId);
}

function renderCreateContentParameterElementView(viewName, view, element, elementType, uniqueId, label) {
    let str = "";
    let isBiview;
    if (view === "singleview")
        isBiview = false;
    else if (view === "biview")
        isBiview = true;
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview);
    let parentElementName = (element.name) ? element.name : "NA";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"flaticon-add-attribute dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
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
        "<span class=\"headerActionButton create-content-child\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label>PARENT PARAMETER:</label><input class=\"uneditable parentParameter\" value=\"" + parentElementName + "\" readonly></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"createDescriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"></textarea></div></li>"+
     
        // "<label>DESCRIPTION:</label><textarea class=\"descriptionInput\"></textarea></li>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    getDataForOrgUnit(viewName);
    applyRichTextEditorById("createDescriptionInput"+uniqueId);
}

function renderCreateSubjectParameterElementView(viewName, view, element, elementType, uniqueId, label) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview);
    let parentElementName = (element.name) ? element.name : "NA";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"flaticon-add-attribute dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
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
        "<span class=\"headerActionButton create-subject-child\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label>PARENT PARAMETER:</label><input class=\"uneditable parentParameter\" value=\"" + parentElementName + "\" readonly></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"createDescriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"></textarea></div></li>"+
        // "<label>DESCRIPTION:</label><textarea class=\"descriptionInput\"></textarea></li>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('input.nameInput').focus();
    getDataForOrgUnit(viewName);
    applyRichTextEditorById("createDescriptionInput"+uniqueId);
}

function renderSceElementView(viewName, view, element, elementType, uniqueId, label) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview);
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"flaticon-add-attribute dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
    if (element.name) {
        str += "<span class=\"panel-header\">" + label.toUpperCase() + ": " + objectTypeIcon + "" + element.name.toUpperCase() + "</span>";
    }
    else {
        str += "<span class=\"panel-header\">" + label.toUpperCase() + "</span>";
    }
    str += "<span class=\"rgtnavdfstage_build_workbench_close close-btn " + view + "CloseBtn\" id=\"closeCreateShieldElementView" + desktopId + "\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "<span class=\"flaticon-fullscreen expandView ResizingIcon fright\" title=\"Full Screen\"></span>" +
        "<span class=\"flaticon-collapsing-four-arrows-interface-button-symbol collapseView ResizingIcon fright dis-none\"  title=\"Default Screen\"></span>" +
        "<span class=\"fright flaticon-refresh-button refreshButton\" title=\"Refresh\"></span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + view + "\">" +
        "<span class=\"headerActionButton create-sce-child\">CREATE</span>" +
        "</div>" +
        "<div class=\"create-shield-element-container-expressionView\">" +
        "<ul><li class=\"create-shield-field\">" +
        "<label style=\"width: 10%;\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"createDescriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"></textarea></div></li></ul>";
     
        //"<label style=\"width: 10%;\">DESCRIPTION:</label><textarea class=\"descriptionInput expressionDesc\"></textarea></li></ul>";
    str += "<div class=\"expViewContainer\">";
    str += renderIndividualExpression(backing.objectiveParameterDv.children, isBiview, viewName + "odosChain", "Security Technique", "Objective", activeDesktop, true);
    str += renderIndividualExpression(backing.methodParameterDv.children, isBiview, viewName + "mdosChain", "Security Content", "Method", activeDesktop, true);
    str += renderIndividualExpression(backing.contentParameterDv.children, isBiview, viewName + "cdosChain", "Protected Content", "Content", activeDesktop, true);
    str += renderIndividualExpression(backing.subjectParameterDv.children, isBiview, viewName + "sdosChain", "Protected Subject", "Subject", activeDesktop, true);
    str += "</div></div>";
    str += "</div>";
    $("#" + desktopId).append(str);
    $("#" + viewName).find('textarea:first').focus();
    repositionViews(isBiview);
    highlightSourceAndView(viewName, isBiview);
    applyRichTextEditorById("createDescriptionInput"+uniqueId);
}

function renderCreateSceElementView(viewName, view, element, elementType, uniqueId, label) {
    getParameterExpressionDv(viewName, view, element, elementType, uniqueId, label);
}

function renderCreateUserView(viewName, view, element, elementType, uniqueId, label) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview);
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"flaticon-add-attribute dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
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
        "<span class=\"headerActionButton create-user-child\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label>FIRST NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"firstNameInput\"/></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>LAST NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"lastNameInput\"/></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>EMAIL-ID<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"emailInput\"/></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>PASSWORD<span style=\"color:#ec4c4c;\">*</span>:</label><input type=\"password\" class=\"passwordInput\"/></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>LOCATION:</label><input class=\"location\"/></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>MOBILE NO:</label><input type=\"tel\" class=\"mobileNo\"/></li>" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label>ORGANIZATIONAL UNIT<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"organisationalDirectory hierarchySelected\" readonly/>" +
        "<div id=\"" + viewName + "org\" class=\"organisationalDirectoryDropDown hierarchyDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearOrgDirectory\">CLEAR</span></li>" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label>ROLE<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"roleDirectory hierarchySelected\" readonly/>" +
        "<div id=\"" + viewName + "roles\" class=\"roleDirectoryDropDown hierarchyDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearOrgDirectory\">CLEAR</span></li>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    getDataForOrgUnit(viewName);
    getDataForRoles(viewName)
}

function renderCreateRoleView(viewName, view, element, elementType, uniqueId, label) {
    let str = "";
    let isBiview = isBiViewOrNot(view);
    let activeDesktop = getActiveDesktop(isBiview);
    let desktopId = activeDesktop.div_id;
    let objectTypeIcon = renderCircleOrSquareInventoryDv(element, isBiview);
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + view + "\"  uniqueId =\"" + uniqueId + "\">" +
        "<div class=\"panel-header-container " + view + "\">" +
        "<span class=\"flaticon-add-attribute dataViewIcon findSourceHotlink\" title=\"Show Source Hotlink\"></span>";
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
        "<span class=\"headerActionButton create-role-child\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label>NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label class=\"\">DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"createDescriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\"></textarea></div></li>" +
        // "<label>DESCRIPTION:</label><input class=\"descriptionInput\"></li>" +
        "<li class=\"create-shield-field\" style=\"position: relative;\">" +
        "<label>TOOL MODE<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"toolSelected\" readonly>" +
        "<div id=\"" + viewName + "toolMode\" class=\"toolModeDropDown dis-none\"></div>" +
        "<span class=\"actionButton clearToolSelected\">CLEAR</span></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>IS APPROVAL REQUIRED<span class=\"flaticon-help helpIcon\">" +
        "<span class=\"helpText\">Is admin approval required if any user requests to assign this role</span>" +
        "</span><span style=\"color:#ec4c4c;\">*</span>:</label>" +
        "<span class=\"canDeliver\"><span class=\"canDeliverYes isApprovalReqClick active\">YES</span><span class=\"canDeliverNo isApprovalReqClick\">NO</span></span></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>CAN APPROVE<span class=\"flaticon-help helpIcon\">" +
        "<span class=\"helpText\">Can user with this role approve \"role assignment requests \"</span>" +
        " </span><span style=\"color:#ec4c4c;\">*</span>:</label>" +
        "<span class=\"canDeliver\"><span class=\"canDeliverYes canApproveClick active\">YES</span><span class=\"canDeliverNo canApproveClick\">NO</span></span></li>" +
        "</ul>";
    str += "</div>";
    $("#" + desktopId).append(str);
    getToolModes(viewName);
    applyRichTextEditorById("createDescriptionInput"+uniqueId);
}

function renderPerspectivePopUp(viewClass) {
    let str = "";
    let viewName = "popOverlay";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + viewClass + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    str += "<span class=\"panel-header\">CREATE PERSPECTIVE</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close tooltip tooltipstered close-btn closePopUp\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div>" +
        "<div class=\"desktop-selector-container " + viewClass + "\">" +
        "<span class=\"headerActionButton create-perspective\">CREATE</span>" +
        "</div>" +
        "<ul class=\"create-shield-element-container\">" +
        "<li class=\"create-shield-field\">" +
        "<label>NAME<span style=\"color:#ec4c4c;\">*</span>:</label><input class=\"nameInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        /*"<label>DESCRIPTION:</label><div class=\"editorTextArea\"><textarea id=\"descriptionInput" + uniqueId + "\" name=\"descriptionInput" + uniqueId + "\" class=\"descriptionInput\">" + res.description + "</textarea></div></li>" +*/
        "<label>DESCRIPTION:</label><input class=\"descriptionInput\"></li>" +
        "<li class=\"create-shield-field\">" +
        "<label>COLOR:</label><input class=\"colorInput\" type=\"color\"></li>" +
        "</ul>";
    str += "</div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
}

function getParameterExpressionDv(viewName, view, element, elementType, uniqueId, label) {
    function objectiveParameterDvForExpression(viewName, view, element, elementType, uniqueId, label) {
        service.getObjectiveParameterDv(null, function (res, err) {
            if (res) {
                backing.objectiveParameterDv = res;
                methodParameterDvForExpression(viewName, view, element, elementType, uniqueId, label);
                $("#saveData").hide();
            }
            else if (err) {
                $("#saveData").hide();
                errorHandler(err);
            }
        });
    }

    function methodParameterDvForExpression(viewName, view, element, elementType, uniqueId, label) {
        service.getMethodParameterDv(null, function (res, err) {
            if (res) {
                backing.methodParameterDv = res;
                contentParameterDvForExpression(viewName, view, element, elementType, uniqueId, label);
                $("#saveData").hide();
            }
            else if (err) {
                $("#saveData").hide();
                errorHandler(err);
            }
        });
    }

    function contentParameterDvForExpression(viewName, view, element, elementType, uniqueId, label) {
        service.getContentParameterDv(null, function (res, err) {
            if (res) {
                backing.contentParameterDv = res;
                subjectParameterDvForExpression(viewName, view, element, elementType, uniqueId, label);
                $("#saveData").hide();
            }
            else if (err) {
                $("#saveData").hide();
                errorHandler(err);
            }
        });
    }

    function subjectParameterDvForExpression(viewName, view, element, elementType, uniqueId, label) {
        service.getSubjectParameterDv(null, function (res, err) {
            if (res) {
                backing.subjectParameterDv = res;
                renderSceElementView(viewName, view, element, elementType, uniqueId, label);
                $("#saveData").hide();
            }
            else if (err) {
                $("#saveData").hide();
                errorHandler(err);
            }
        });
    }

    objectiveParameterDvForExpression(viewName, view, element, elementType, uniqueId, label);
}