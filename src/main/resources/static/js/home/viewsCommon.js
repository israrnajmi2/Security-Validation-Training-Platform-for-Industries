$(document).ready(function () {
    $(document).on("click", ".hierarchySelected", function (e) {
        let $this = $(this);
        let closestContainer = $this.closest(".create-shield-field");
        $(".hierarchyDropDown").addClass("dis-none");
        closestContainer.find(".hierarchyDropDown").removeClass("dis-none");
        e.stopPropagation();
    });

    $(document).click(function (e) {
        if (e.target.className !== 'hierarchyDropDown') {
            $(".hierarchyDropDown").addClass('dis-none');
        }
        if (e.target.className !== 'toolModeDropDown') {
            $(".toolModeDropDown").addClass("dis-none")
        }
        if (e.target.className !== 'desktop-selector-dropdown-content') {
            $(".desktop-selector-dropdown-content").addClass("dis-none");
        }
        if (e.target.className !== 'viewsDropDownContent') {
            $(".viewsDropDownContent").addClass("dis-none");
        }
    });

    $(document).on("click", ".frameWorkSelector", function (e) {
        frameWorkDropDown_selector($(this), "frameWork", "frameWorkDropDown");
        e.stopPropagation();
    });

    $(document).on("click", ".orgUnitSelector", function (e) {
        hierarchyDropDown_selector($(this), "organisationalDirectory", "organisationalDirectoryDropDown");
        e.stopPropagation();
    });

    $(document).on("click", ".assetTypeHierarchySelector", function (e) {
        hierarchyDropDown_selector($(this), "assetTypeHierarchy", "assetTypeHierarchyDropDown");
        e.stopPropagation();
    });

    $(document).on("click", ".providerHierarchySelector", function (e) {
        hierarchyDropDown_selector($(this), "providerHierarchy", "providerHierarchyDropDown");
        e.stopPropagation();
    });

    $(document).on("click", ".rolesSelector", function (e) {
        let desktop = $(this).closest(".innerDesktop");
        desktop.find(".roleDirectoryDropDown").find(".d-text").removeClass("active");
        $(this).children(".d-text").addClass("active");
        desktop.find(".roleDirectory").val($(this).children(".d-text").html().replace(/&amp;/g, '&'));
        let elementId = $(this).attr("elementId");
        desktop.find(".roleDirectory").attr("elementId", elementId);
        desktop.find(".roleDirectoryDropDown").addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".toolSelected", function (e) {
        let desktop = $(this).closest(".innerDesktop");
        desktop.find(".hierarchyDropDown").addClass("dis-none");
        desktop.find(".toolModeDropDown").removeClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".toolModeSelector", function (e) {
        let desktop = $(this).closest(".innerDesktop");
        desktop.find(".toolModeDropDown").find(".toolModeSelector").removeClass("active");
        $(this).addClass("active");
        desktop.find(".toolSelected").val($(this).html());
        let elementId = $(this).attr("elementId");
        desktop.find(".toolSelected").attr("elementId", elementId);
        desktop.find(".toolModeDropDown").addClass("dis-none");
        e.stopPropagation();
    });

    $(document).on("click", ".clearOrgDirectory, .clearAssetTypeHierarchy, .clearProviderHierarchy", function () {
        clearInput_Dehighlight("hierarchyDropDown", $(this));
    });

    $(document).on("click", ".clearToolSelected", function () {
        clearInput_Dehighlight("toolModeSelector", $(this));
    });

    $(document).on("click", ".modeColumnChange", function () {
        let desktop = $(this).closest(".innerDesktop");
        let elementTypeList = desktop.find(".elementTypeList");
        let treeStructure = desktop.find(".treeStructure");
        $(this).toggleClass("active");
        desktop.find(".indentation_number").toggleClass("active");
        elementTypeList.toggleClass("dis-none");
        treeStructure.toggleClass("tree_structure_parent_schema");
        treeStructure.toggleClass("tree_structure_parent");
    });
});

function hierarchyDropDown_selector($this, directory, dropdown) {
    let desktop = $this.closest(".innerDesktop");
    desktop.find("." + dropdown).find(".d-text").removeClass("active");
    $this.children(".d-text").addClass("active");
    if (directory === "organisationalDirectory") {
        desktop.find("." + directory).val($this.children(".d-text").html().replace(/&amp;/g, '&'));
    }
    else {
        desktop.find("." + directory).val($this.children(".d-text").html());
    }
    let elementId = $this.attr("elementId");
    desktop.find("." + directory).attr("elementId", elementId);
    desktop.find("." + dropdown).addClass("dis-none");
}

function frameWorkDropDown_selector($this, directory, dropdown) {
    let desktop = $this.closest(".innerDesktop");
    desktop.find(".frameWorkSelector").removeClass("active");
    $this.addClass("active");
    desktop.find("." + directory).val($this.html());
    let elementId = $this.attr("id");
    desktop.find("." + directory).attr("elementId", elementId);
    desktop.find("." + dropdown).addClass("dis-none");
}

function clearInput_Dehighlight(dropdown, selector) {
    let $createField = selector.closest(".create-shield-field");
    if (dropdown === "hierarchyDropDown") {
        $createField.find("." + dropdown).find(".d-text").removeClass("active");
    }
    else if (dropdown === "toolModeSelector") {
        $createField.find("." + dropdown).removeClass("active");
    }
    $createField.children("input").val('')
        .attr("elementId", 0);
}

function sortAssociationForThreeTypesMap(selector, mapClass, renderFunction, expand) {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
    let desktop = selector.closest(".innerDesktop");
    let id = desktop.attr("id");
    let view = desktop.attr("view");
    let checkElementArray = {};
    if (view === "singleview") {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);

    }
    else if (view === "biview") {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);

    }
    let index = getIndexOfOpenedViewFromPassedOpenedViews(desktop.attr("id"), activeDesktop.opened_views);
    let associationRes = activeDesktop.opened_views[index].associationRes;
    $("#" + id + " ." + mapClass).each(function () {
        if ($(this).hasClass("flaticon-arrow") && $(this).hasClass("partialSelection"))
            checkElementArray[$(this).attr("id")] = "partialSelection";
        else if ($(this).hasClass("flaticon-arrow"))
            checkElementArray[$(this).attr("id")] = "flaticon-arrow";
        else if ($(this).hasClass("flaticon-unlink"))
            checkElementArray[$(this).attr("id")] = "flaticon-unlink";
    });
    if (selector.hasClass("unSortAss")) {
        selector.removeClass("unSortAss");
        sortChildrenAlphbetically(associationRes);
    }
    else {
        selector.addClass("unSortAss");
        sortChildrenInOriginalOrder(associationRes);
    }
    renderFunction(associationRes, id, view, expand);
    let checkKeys = Object.keys(checkElementArray);
    for (let i = 0; i <= checkKeys.length; i++) {
        let queryId = $("#" + id);
        if (queryId.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").hasClass(checkElementArray[checkKeys[i]]))
            queryId.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map " + mapClass + " " + checkElementArray[checkKeys[i]]);
        else
            queryId.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map iconShadow " + mapClass + " " + checkElementArray[checkKeys[i]]);
        if (checkElementArray[checkKeys[i]] === "partialSelection")
            queryId.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").addClass("flaticon-arrow");
    }
}

function sortAssociationForTwoTypesMap(selector, mapClass, renderFunction, expand) {
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
    let desktop = selector.closest(".innerDesktop");
    let id = desktop.attr("id");
    let view = desktop.attr("view");
    if (view === "singleview") {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
    }
    else if (view === "biview") {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
    }
    let checkElementArray = {};
    $("#" + id + " ." + mapClass).each(function () {
        if ($(this).hasClass("flaticon-arrow")) {
            checkElementArray[$(this).attr("id")] = "flaticon-arrow";
        }
        else if ($(this).hasClass("flaticon-unlink"))
            checkElementArray[$(this).attr("id")] = "flaticon-unlink";
    });
    let index = getIndexOfOpenedViewFromPassedOpenedViews(id, activeDesktop.opened_views);
    if (selector.hasClass("unSortAss")) {
        selector.removeClass("unSortAss");
        sortChildrenAlphbetically(activeDesktop.opened_views[index].associationRes);
    }
    else {
        selector.addClass("unSortAss");
        sortChildrenInOriginalOrder(activeDesktop.opened_views[index].associationRes);
    }
    renderFunction(activeDesktop.opened_views[index].associationRes, id, view, expand);
    let checkKeys = Object.keys(checkElementArray);
    for (let i = 0; i <= checkKeys.length; i++) {
        let queryId = $("#" + id);
        if (queryId.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").hasClass(checkElementArray[checkKeys[i]]))
            queryId.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map " + mapClass + " " + checkElementArray[checkKeys[i]]);
        else
            queryId.find(".checkbox-map[id = \"" + checkKeys[i] + "\"]").attr("class", "checkbox-map iconShadow " + mapClass + " " + checkElementArray[checkKeys[i]]);
    }
}

function getSelectionIconOfMap(element, checkbox) {
    checkbox.removeClass("iconShadow");
    if (checkbox.hasClass("flaticon-arrow")) {
        checkbox.removeClass("flaticon-arrow");
        checkbox.addClass("flaticon-unlink");
    }
    else if (checkbox.hasClass("flaticon-unlink")) {
        checkbox.removeClass("flaticon-unlink");
        checkbox.addClass("flaticon-arrow");
    }
    if ((element.associationMapped && element.associationMapped === true) || (element.fulfillsMapped && element.fulfillsMapped === true)) {
        if (checkbox.hasClass("flaticon-unlink"))
            checkbox.addClass("iconShadow");
    }
    else {
        if (checkbox.hasClass("flaticon-arrow"))
            checkbox.addClass("iconShadow");
    }
}

function getSelectionIcon(element, item) {
    item.removeClass("iconShadow");
    if (item.hasClass("flaticon-unlink")) {
        item.removeClass("flaticon-unlink");
        item.addClass("flaticon-arrow");
    }
    else if (item.hasClass("flaticon-arrow")) {
        item.removeClass("flaticon-arrow");
        item.addClass("flaticon-unlink");
    }
    if (element.protectionType && element.protectionType === "shall") {
        if (item.hasClass("flaticon-unlink") || (item.hasClass("flaticon-arrow")))
            item.addClass("iconShadow");
    }
    else {
        if (item.hasClass("flaticon-arrow") || (item.hasClass("flaticon-arrow") && item.hasClass("partialSelection")))
            if (item.hasClass("flaticon-arrow") || (item.hasClass("flaticon-arrow")))
                item.addClass("iconShadow");
    }
}

function renderDirectoryViewForOrgUnit(renderData, idOfParentDiv, isBiview, selectedOrgId) {
    let strVar = "";
    if (renderData[ATTR.children]) {
        strVar += renderChildrenForOrgUnit(renderData[ATTR.children], idOfParentDiv, isBiview, selectedOrgId);
    }
    else {
        strVar += "<span class=\"npr_headng deactive_npr_heading d-text\">Empty List</span>\n";
    }
    $("#" + idOfParentDiv + "org").html(strVar);
}

function renderChildrenForOrgUnit(childrenArray, idOfParentDiv, isBiview, selectedOrgId) {
    function renderChild() {
        strVar += " <li class=\"element_li\">\n";
        strVar += " <div class=\"directoryListItemContainer clearfix\">\n";
        if (childrenArray[i][ATTR.children] && childrenArray[i][ATTR.children].length > 0) {
            strVar += " <div class=\"whiteBgTriangle whiteBg\">\n";
            strVar += " <span class=\"triangle_active fleft\"></span>\n";
            strVar += " </div>\n";
            strVar += " <span class=\"verticle_dotted_line-deactivate\"></span>\n";
        }
        else {
            strVar += " <span class=\"verticle_dotted_line-deactivate verticle_dotted_line-long\"></span>\n";
        }
        strVar += " <div class=\"r_conainer fleft orgUnitSelector hierarchySelector\" elementId =\"" + childrenArray[i].elementId + "\">\n";
        strVar += renderTextOfDv(childrenArray[i], false, selectedOrgId);
        strVar += " </div>\n";
        strVar += " </div>";
        if (childrenArray[i][ATTR.children]) {
            strVar += renderChildrenForOrgUnit(childrenArray[i][ATTR.children], idOfParentDiv, isBiview, selectedOrgId);
        }
        strVar += "</li>\n";
    }

    if (!childrenArray)
        return "";
    else if (childrenArray.length === 0)
        return "";
    else {
        var strVar = "";
        strVar += " <ul class=\"directoryViewUlE clearfix\" hidden>\n";
        for (var i = 0; i < childrenArray.length; i++) {
            renderChild();
        }
        strVar += "</ul>\n";
        $("#saveData").hide();
        return strVar;

    }
}

function getDataForOrgUnit(deskId, selectedOrgId) {
    this.desktopId = deskId;
    service.getOrganizationalUnitDv(null, function (res, err) {
        if (res) {
            sortChildrenAlphbetically(res);
            renderDirectoryViewForOrgUnit(res, this.desktopId, false, selectedOrgId);
            if (selectedOrgId) {
                let desktopId = $("#" + this.desktopId);
                desktopId.find(".organisationalDirectoryDropDown").find(".d-text").each(function () {
                    if ($(this).hasClass("active")) {
                        desktopId.find(".organisationalDirectory").attr("elementId", $(this).attr("id"));
                        desktopId.find(".organisationalDirectory").val($(this).html().replace(/&amp;/g, '&'));
                    }
                });
            }
        }
        else if (err) {
            errorHandler(err);
        }
    });
}

function getDataForFramework(deskId, selectedShield) {
    let str = "<ul>";
    let frameWorks = [
        {
            "key": "Shield",
            "label": "Internal Framework"
        },
        {
            "key": "Standard",
            "label": "External Framework"
        },
        {
            "key": "BusinessFrameworks",
            "label": "Business Framework"
        },
        {
            "key": "Threat",
            "label": "Threat Framework"
        }
    ];
    let i;
    for (i = 0; i < frameWorks.length; i++) {
        if(frameWorks[i].key === selectedShield)
            str += "<li class=\"frameWorkSelector active\" id=\"" + frameWorks[i].key + "\">" + frameWorks[i].label + "</li>";
        else
            str += "<li class=\"frameWorkSelector\" id=\"" + frameWorks[i].key + "\">" + frameWorks[i].label + "</li>";
    }
    str += "</ul>";
    $("#" + deskId + "frameWork").html(str);
    if (selectedShield) {
        let desktopId = $("#" + deskId);
        desktopId.find(".frameWorkSelector").each(function () {
            if ($(this).hasClass("active")) {
                desktopId.find(".frameWork").attr("elementId", $(this).attr("id"));
                desktopId.find(".frameWork").val($(this).html());
            }
        });
    }
}

function renderDirectoryViewForRoles(renderData, idOfParentDiv, isBiview, selectedOrgId, label) {
    let strVar = "";
    if (renderData[ATTR.children]) {
        strVar += renderChildrenForRoles(renderData[ATTR.children], idOfParentDiv, isBiview, selectedOrgId, label);
    }
    else {
        strVar += "<span class=\"npr_headng deactive_npr_heading d-text\">Empty List</span>\n";
    }
    $("#" + idOfParentDiv + label).html(strVar);
}

function renderChildrenForRoles(childrenArray, idOfParentDiv, isBiview, selectedOrgId, label) {
    function renderChild() {
        strVar += " <li class=\"element_li\">\n";
        strVar += " <div class=\"directoryListItemContainer clearfix\">\n";
        if (childrenArray[i][ATTR.children] && childrenArray[i][ATTR.children].length > 0) {
            strVar += " <div class=\"whiteBgTriangle whiteBg\">\n";
            strVar += " <span class=\"triangle_active fleft\"></span>\n";
            strVar += " </div>\n";
            strVar += " <span class=\"verticle_dotted_line-deactivate\"></span>\n";
        }
        else {
            strVar += " <span class=\"verticle_dotted_line-deactivate verticle_dotted_line-long\"></span>\n";
        }
        strVar += `<div class="r_conainer fleft ${label}Selector hierarchySelector" elementId ="${childrenArray[i].elementId}">\n`;
        strVar += renderTextOfDv(childrenArray[i], false, selectedOrgId);
        strVar += " </div>\n";
        strVar += " </div>";
        if (childrenArray[i][ATTR.children]) {
            strVar += renderChildrenForOrgUnit(childrenArray[i][ATTR.children], idOfParentDiv, isBiview, selectedOrgId);
        }
        strVar += "</li>\n";
    }

    if (!childrenArray)
        return "";
    else if (childrenArray.length === 0)
        return "";
    else {
        var strVar = "";
        strVar += " <ul class=\"directoryViewUlE clearfix\" hidden>\n";
        for (var i = 0; i < childrenArray.length; i++) {
            renderChild();
        }
        strVar += "</ul>\n";
        $("#saveData").hide();
        return strVar;

    }
}

function getDataForRoles(deskId, selectedOrgId) {
    this.desktopId = deskId;
    let data = {"showUsers": false};
    service.getRolesDv(data, function (res, err) {
        if (res) {
            sortChildrenAlphbetically(res);
            renderDirectoryViewForRoles(res, this.desktopId, false, selectedOrgId, "roles");
            if (selectedOrgId) {
                let desktopId = $("#" + this.desktopId);
                desktopId.find(".roleDirectoryDropDown").find(".d-text").each(function () {
                    if ($(this).hasClass("active")) {
                        desktopId.find(".roleDirectory").attr("elementId", $(this).attr("id"));
                        desktopId.find(".roleDirectory").val($(this).html().replace(/&amp;/g, '&'));
                    }
                });
            }
        }
        else if (err) {
            errorHandler(err);
        }
    });
}

function getDataForSourceDropDown(deskId, selectedOrgId) {
    this.desktopId = deskId;
    service.getSourcesDv(null, function (res, err) {
        if (res) {
            sortChildrenAlphbetically(res);
            renderDirectoryViewForRoles(res, this.desktopId, false, selectedOrgId, "source");
            if (selectedOrgId) {
                let desktopId = $("#" + this.desktopId);
                desktopId.find(".sourceDirectoryDropDown").find(".d-text").each(function () {
                    if ($(this).hasClass("active")) {
                        desktopId.find(".sourceDirectory").attr("elementId", $(this).attr("id"));
                        desktopId.find(".sourceDirectory").val($(this).html().replace(/&amp;/g, '&'));
                    }
                });
            }
        }
        else if (err) {
            errorHandler(err);
        }
    });
}


function getToolModes(desktopId, selectedTool) {
    let selectors = ["DIRECT", "EXPRESSION", "BOTH DIRECT AND EXPRESSION"];
    let str = "<ul>";
    for (let i = 0; i < selectors.length; i++) {
        str += "<li class=\"toolModeSelector\" elementId=\"" + constants.ToolMode[selectors[i]] + "\">" + selectors[i] + "</li>";
        if (constants.ToolMode[selectors[i]] === selectedTool) {
            $("#" + desktopId).find(".toolSelected").val(selectors[i]);
            $("#" + desktopId).find(".toolSelected").attr("elementId", selectedTool)
        }
    }
    str += "</ul>";
    $("#" + desktopId + "toolMode").html(str);
}

function renderDirectoryViewForAssetTypeHierarchy(renderData, idOfParentDiv, isBiview, selectedAssetTypeId) {
    let strVar = "";
    if (renderData[ATTR.children]) {
        strVar += renderChildrenForAssetDirectory(renderData[ATTR.children], idOfParentDiv, isBiview, selectedAssetTypeId);
    }
    else {
        strVar += "<span class=\"npr_headng deactive_npr_heading d-text\">Empty List</span>\n";
    }
    $("#" + idOfParentDiv + "assetTypeHierarchy").html(strVar);
}

function renderChildrenForAssetDirectory(childrenArray, idOfParentDiv, isBiview, selectedAssetTypeId) {
    function renderChild() {
        strVar += " <li class=\"element_li\">\n";
        strVar += " <div class=\"directoryListItemContainer clearfix\">\n";
        if (childrenArray[i][ATTR.children] && childrenArray[i][ATTR.children].length > 0) {
            strVar += " <div class=\"whiteBgTriangle whiteBg\">\n";
            strVar += " <span class=\"triangle_active fleft\"></span>\n";
            strVar += " </div>\n";
            strVar += " <span class=\"verticle_dotted_line-deactivate\"></span>\n";
        }
        else {
            strVar += " <span class=\"verticle_dotted_line-deactivate verticle_dotted_line-long\"></span>\n";
        }
        strVar += " <div class=\"r_conainer fleft assetTypeHierarchySelector hierarchySelector\" elementId =\"" + childrenArray[i].elementId + "\">\n";
        strVar += renderTextOfDv(childrenArray[i], false, selectedAssetTypeId);
        strVar += " </div>\n";
        strVar += " </div>";
        if (childrenArray[i][ATTR.children]) {
            strVar += renderChildrenForAssetDirectory(childrenArray[i][ATTR.children], idOfParentDiv, isBiview, selectedAssetTypeId);
        }
        strVar += "</li>\n";
    }

    if (!childrenArray)
        return "";
    else if (childrenArray.length === 0)
        return "";
    else {
        var strVar = "";
        strVar += " <ul class=\"directoryViewUlE clearfix\" hidden>\n";
        for (var i = 0; i < childrenArray.length; i++) {
            renderChild();
        }
        strVar += "</ul>\n";
        $("#saveData").hide();
        return strVar;

    }
}

function getDataForAssetTypeHierarchy(data, deskId, selectedAssetTypeId, isBusiness) {
    this.desktopId = deskId;
    let renderFunction = (isBusiness) ? service.getBusinessAssetTypeDv : service.getAssetTypeDv;
    renderFunction(data, function (res, err) {
        if (res) {
            sortChildrenAlphbetically(res);
            renderDirectoryViewForAssetTypeHierarchy(res, this.desktopId, false, selectedAssetTypeId);
            if (selectedAssetTypeId) {
                let desktopId = $("#" + this.desktopId);
                desktopId.find(".assetTypeHierarchyDropDown").find(".d-text").each(function () {
                    if ($(this).hasClass("active")) {
                        desktopId.find(".assetTypeHierarchy").attr("elementId", $(this).attr("id"));
                        desktopId.find(".assetTypeHierarchy").val($(this).html());
                    }
                });
            }
        }
        else if (err) {
            errorHandler(err);
        }
    })
}

function renderDirectoryViewForProviderHierarchy(renderData, idOfParentDiv, isBiview, selectedProviderId) {
    let strVar = "";
    if (renderData[ATTR.children]) {
        strVar += renderChildrenForProviderDirectoy(renderData[ATTR.children], idOfParentDiv, isBiview, selectedProviderId);
    }
    else {
        strVar += "<span class=\"npr_headng deactive_npr_heading d-text\">Empty List</span>\n";
    }
    $("#" + idOfParentDiv + "providerHierarchy").html(strVar);
}

function renderChildrenForProviderDirectoy(childrenArray, idOfParentDiv, isBiview, selectedProviderId) {
    function renderChild() {
        strVar += " <li class=\"element_li\">\n";
        strVar += " <div class=\"directoryListItemContainer clearfix\">\n";
        if (childrenArray[i][ATTR.children] && childrenArray[i][ATTR.children].length > 0) {
            strVar += " <div class=\"whiteBgTriangle whiteBg\">\n";
            strVar += " <span class=\"triangle_active fleft\"></span>\n";
            strVar += " </div>\n";
            strVar += " <span class=\"verticle_dotted_line-deactivate\"></span>\n";
        }
        else {
            strVar += " <span class=\"verticle_dotted_line-deactivate verticle_dotted_line-long\"></span>\n";
        }
        strVar += " <div class=\"r_conainer fleft providerHierarchySelector hierarchySelector\" elementId =\"" + childrenArray[i].elementId + "\">\n";
        strVar += renderTextOfDv(childrenArray[i], false, selectedProviderId);
        strVar += " </div>\n";
        strVar += " </div>";
        if (childrenArray[i][ATTR.children]) {
            strVar += renderChildrenForProviderDirectoy(childrenArray[i][ATTR.children], idOfParentDiv, isBiview, selectedProviderId);
        }
        strVar += "</li>\n";
    }

    if (!childrenArray)
        return "";
    else if (childrenArray.length === 0)
        return "";
    else {
        var strVar = "";
        strVar += " <ul class=\"directoryViewUlE clearfix\" hidden>\n";
        for (var i = 0; i < childrenArray.length; i++) {
            renderChild();
        }
        strVar += "</ul>\n";
        $("#saveData").hide();
        return strVar;

    }
}

function getDataForProviderHierarchy(data, deskId, selectedProviderId, isBusiness) {
    this.desktopId = deskId;
    let renderFunction = (isBusiness) ? service.getBusinessProvidersDvWithOrWithoutAssetAndGroupApplied : service.getProvidersDvWithOrWithoutAssetAndGroupApplied;
    renderFunction(data, function (res, err) {
        if (res) {
            sortChildrenAlphbetically(res);
            renderDirectoryViewForProviderHierarchy(res, this.desktopId, false, selectedProviderId);
            if (selectedProviderId) {
                let desktopId = $("#" + this.desktopId);
                desktopId.find(".providerHierarchyDropDown").find(".d-text").each(function () {
                    if ($(this).hasClass("active")) {
                        desktopId.find(".providerHierarchy").attr("elementId", $(this).attr("id"));
                        desktopId.find(".providerHierarchy").val($(this).html());
                    }
                });
            }
        }
        else if (err) {
            errorHandler(err);
        }
    })
}

function validateEmail(emailId) {
    let filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(emailId)) {
        return true;
    }
    else {
        return false;
    }
}

function getViewHeaderName(element) {
    let acronym, headerName = "", str = "";
    let {refId, shieldElementTypeId, name} = element;
    if (element.objectType === "sce") {
        let strObj = combineChainElements(element);
        headerName = strObj.oStr + "  |  " + strObj.mStr + "  |  " + strObj.cStr + "  |  " + strObj.sStr;
    }
    else {
        if (shieldElementTypeId) {
            acronym = LookupAcronym(shieldElementTypeId);
        }
        if (name) {
            headerName = name.toUpperCase();
        }
        if (acronym && acronym !== null && acronym.length > 0 && refId)
            headerName += ` [${acronym.toUpperCase()}: ${refId}]`;
        else if (acronym && acronym !== null && acronym.length > 0)
            headerName += `[${acronym.toUpperCase()}]`;
        else if (refId)
            headerName += `[${refId}]`;
    }
    return headerName;
}

function appendingAsChildobject(oldObject, childrenObject) {
    let newObj = Object.assign({}, oldObject);
    if (newObj.linkType)
        delete newObj.linkType;
    if (newObj.linkName)
        delete newObj.linkName;
    if (newObj.linkId)
        delete newObj.linkId;

    newObj.children = childrenObject.children;
    return newObj;
}