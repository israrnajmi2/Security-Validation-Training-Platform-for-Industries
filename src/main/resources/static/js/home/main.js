base_epoch_seconds = (new Date().getTime())/1000;
function prin(...str) {
    // uncomment below when needed to debug
    // console.log(((new Date().getTime())/1000) - base_epoch_seconds, ...str);
}
backing = {
    "shield_schema_obj": null,
    "isDirectMode": true,
    "allShieldElementTypes": {},
    "is_bi_view_active": false,
    "dictionary_of_unique_id_to_attr_object": {},
    "dictionary_of_unique_id_to_pers_object": {},
    "pivot_li_id_to_option_dict": {},
    "singleview": {},
    "biview": {}
};
let openParallelBiView=false;
var eventTypeUtils = new EventTypeUtils();

$(document).ready(function () {
    setHeaderLabel();
    getAllShieldElementTypes();
    initialSelection();

    $(document).on("click", ".rulerimg", function (e) {
        const modal = document.createElement("div");
        modal.setAttribute("class", "ruler-img-modal");
        //add the modal to the main section or the parent element
        document.querySelector("body").append(modal);
        //adding image to modal
        const newImage = document.createElement("img");
        newImage.setAttribute("src", "images/ComplexRulerImg.svg");
        //creating the close button
        const closeBtn = document.createElement("span");
        closeBtn.setAttribute("class", "ruler-img-closeBtn");
        closeBtn.innerHTML="x";
        //close function
        closeBtn.onclick = () => {
            modal.remove();
        };
        modal.append(newImage, closeBtn);
    });

    $(document).on("click", ".highlight-item-hotlink", function (e) {
        $(this).closest(".r_conainer").toggleClass("gold-background");
        e.stopPropagation();
    });

    $(document).on("click", ".expandDv", function (e) {
        let $li = $(this).closest("li");
        $li.find(".whiteBgTriangle").find("span:first").attr("class", "triangle_active fleft");
        $li.find("ul.directoryViewUlE").show();
        e.stopPropagation();
    });
    $(document).on("click", ".collapseDv", function (e) {
        let $whiteTriangle = $(this).closest("li").children(".directoryListItemContainer").children(".whiteBgTriangle").find("span:first");
        let $childLi = $(this).closest("li").find("ul.directoryViewUlE").children("li");
        if ($whiteTriangle.hasClass("triangle_deactive"))
            $(this).closest("li").find("ul.directoryViewUlE").show();
        $whiteTriangle.attr("class", "triangle_active fleft");
        $childLi.children(".directoryListItemContainer").children(".whiteBgTriangle").find("span:first").attr("class", "triangle_deactive fleft");
        $childLi.children("ul.directoryViewUlE").hide();
        e.stopPropagation();
    });

    $(document).on("contextmenu", ".d-text", function (e) {
        e.stopPropagation();
        e.preventDefault();
        console.log("on click of d-text");
        let parentLiElement = $(this).closest(".directoryListItemContainer");
        let descriptionElement = parentLiElement.find(".d-description");
        if(descriptionElement.length) {
            descriptionElement.remove();
        } else {
            let firstElement = parentLiElement.find('span[uniqueId]').first();
            if(firstElement && firstElement.attr("uniqueid")) {
                let uniqueId = firstElement.attr("uniqueid");
                let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
                let data = {};
                data.elementId = element[ATTR.elementId];
                data.objectType = element[ATTR.objectType];

                service.getSingleDataView(data, function (res, err) {
                    console.log(res, 'description res');
                    if(err) {
                        console.error(err);
                        return;
                    }
                    let description = "No Description Provided"
                    if(res && res.description) {
                        description = res.description;
                    }
                    parentLiElement.find(".d-description").remove();
                    parentLiElement.append(`<div class="d-description"><pre>${description}</pre></div>`);
                });
            }
        }
    });

    $(document).on("click", ".element_li .flaticon-expression-element", function (e) {
        let desktop = $(this).closest(".innerDesktop");
        let uniqueId = $(this).closest("li").attr("uniqueId");
        let str;
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let associationCollapsed = $(this).closest(".r_conainer").find(".associationCollapsed");
        if (associationCollapsed.hasClass("expand")) {
            associationCollapsed.removeClass("expand");
            str = renderTextOfAssociationView(element, undefined, true);
            associationCollapsed.html(str);
        }
        else if (associationCollapsed) {
            associationCollapsed.addClass("expand");
            str = renderTextOfAssociationViewTable(element, undefined, true);
            associationCollapsed.html(str);
        }
        desktop.find(".search-keyword").keyup();
        if (!$(this).hasClass("subscriptIcon")) {
            e.stopPropagation();
        }

    });

    $(document).on("click", ".biView", function () {
        let activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        let activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        let activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
        $(this).toggleClass("active");
        if (backing.is_bi_view_active) {
            openParallelBiView=true;
            $("#bi-content-wrapper").toggleClass("dis-none");
            $("#single-content-wrapper").toggleClass("singleView-desktop");
            activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
            activeDesktopKeyname = backing.biview.active_desktop.keyname;
            activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
            let keys = Object.keys(activeDesktop.opened_views);
            for (let i = 0; i < keys.length; i++) {
                closeViewUpdateOpenedViews(keys[i], true)
            }
            backing.is_bi_view_active = false;
            repositionViews(false);
            applyEventsToActiveScreens();
        }
        else {
            openParallelBiView=true;
            backing.is_bi_view_active = true;
            initialBiviewSelection();
            repositionViews(false);
            applyEventsToActiveScreens();
        }
    });

    $(document).on("click", ".related-framework-action", function (e) {
        let innerDesktop = $(this).closest(".innerDesktop");
        let activeDesktop = getActiveDesktop(undefined, innerDesktop.attr("side"));

        // populate data and i am done... wwwwoooo
        const data = {};
        data.shieldIdOne = 0;
        if(activeDesktop.key == "classification_map_mode_desktop" || activeDesktop.key == "bi_classification_map_mode_desktop") {
            data.shieldIdOne = parseInt($(`#${activeDesktop.selector.shield_dropdown_selected_id}`).attr("elementId"));
            data.objectTypeOne = "shield";
        } else if (activeDesktop.key == "standard_map_mode_desktop" || activeDesktop.key == "bi_standard_map_mode_desktop") {
            data.shieldIdOne = parseInt($(`#${activeDesktop.selector.shield_dropdown_selected_id}`).attr("elementId"));
            data.objectTypeOne = "standard";
        } else if (activeDesktop.key == "business_map_mode_desktop" || activeDesktop.key == "bi_business_map_mode_desktop") {
            data.shieldIdOne = parseInt($(`#${activeDesktop.selector.shield_dropdown_selected_id}`).attr("elementId"));
            data.objectTypeOne = "b_framework";
        } else if (activeDesktop.key == "threat_map_mode_desktop" || activeDesktop.key == "bi_threat_map_mode_desktop") {
            data.shieldIdOne = parseInt($(`#${activeDesktop.selector.shield_dropdown_selected_id}`).attr("elementId"));
            data.objectTypeOne = "threat";
        } else if (activeDesktop.key == "asset_type_map_mode_desktop" || activeDesktop.key == "bi_asset_type_map_mode_desktop") {
            data.objectTypeOne = "asset_type";
        } else if (activeDesktop.key == "asset_map_mode_desktop" || activeDesktop.key == "bi_asset_map_mode_desktop") {
            data.objectTypeOne = "asset";
        } else if (activeDesktop.key == "business_asset_type_map_mode_desktop" || activeDesktop.key == "bi_business_asset_type_map_mode_desktop") {
            data.objectTypeOne = "business_asset_type";
        } else if (activeDesktop.key == "business_asset_map_mode_desktop" || activeDesktop.key == "bi_business_asset_map_mode_desktop") {
            data.objectTypeOne = "business_asset";
        } else if (activeDesktop.key == "anz_expression_desktop" || activeDesktop.key == "bi_anz_expression_desktop") {
              data.objectTypeOne = "sce";
        } else {
            console.log("Error: Calling save linktoprefs in unimplemented desktop", activeDesktop.key);
            return;
        }
        const $dropdownTwoFlagLi = $(this).parent('li');
        data.shieldIdTwo = 0;
        try {
            data.shieldIdTwo = parseInt($dropdownTwoFlagLi.attr("shieldId"));
        } catch(err) {}
        data.objectTypeTwo = $dropdownTwoFlagLi.attr("objectType");
        data.related = $(this).hasClass("related-framework-action-active") ? false : true;

        data.directMode = backing.isDirectMode;
        serviceFunctions.saveLinkToPrefs(data, () => {
            const dropDownTwoContent = $(`#${activeDesktop.selector.expression_dropdown_id}`);
            fetchAndApplyLinkToPreferences(dropDownTwoContent, activeDesktop, () => {})
        });
        e.stopPropagation();
    });

    $(document).on("click", ".default-framework-action", function (e) {
        let innerDesktop = $(this).closest(".innerDesktop");
        let activeDesktop = getActiveDesktop(undefined, innerDesktop.attr("side"))
        serviceFunctions.saveDefaultShieldPrefs($(this).attr("shieldId"), $(this).hasClass("default-framework-action-active") ? false : true, () => {
            const dropDownContent = $(`#${activeDesktop.selector.shield_dropdown_id}`);
            fetchAndApplyShieldDefaultsOnHtml(dropDownContent, activeDesktop, () => {});
        });
        e.stopPropagation();
    });

    $(document).on("click", ".directoryListItemContainer", function (e) {
        if ($(this).closest("li").children("ul:first").length !== 0) {
            let $whiteBgTriangle = $(this).find(".whiteBgTriangle").find("span:first");
            if ($whiteBgTriangle.hasClass("triangle_deactive")) {
                $whiteBgTriangle.attr("class", "triangle_active fleft");
            }
            else {
                $whiteBgTriangle.attr("class", "triangle_deactive fleft");
            }
        }
        else {
            e.stopPropagation();
        }
        $(this).closest("li").children("ul:first").toggle('medium');

    });

    $("#createSchemaLiContainer").unbind("click");

    $(document).on("click", ".singleviewCloseBtn,.biviewCloseBtn", function () {
        let innerDesktop = $(this).closest(".innerDesktop");
        let id = innerDesktop.attr("id");
        innerDesktop.remove();
        if ($(this).hasClass("singleviewCloseBtn")) {
            closeViewUpdateOpenedViews(id, false);
        }
        else if ($(this).hasClass("biviewCloseBtn")) {
            closeViewUpdateOpenedViews(id, true);
        }
    });
    $(document).on("click", "#alertBox", function () {
        $(".alertBoxWrapper").removeClass("active").addClass("dis-none");
    });

    // slider starts here
    var move = "42px";
    $(".leftArrow").click(function (e) {
        let sliderLimit, view;
        let move = "45px";
        let innerDesktop = $(this).closest(".innerDesktop");
        let activeDesktop = getActiveDesktop(undefined, innerDesktop.attr("side")),
            left_arrow = activeDesktop.selector.perspective_left_slider_arrow,
            right_arrow = activeDesktop.selector.perspective_right_slider_arrow;
        sliderLimit = -((activeDesktop.perspectivesCount - 3) * 40);
        view = $("#" + activeDesktop.selector.perspective_slider_id);
        let currentLeftPosition = parseInt(view.css("left"));
        if (currentLeftPosition >= sliderLimit) view.stop(false, true).animate({left: "-=" + move}, {duration: 400});
        setTimeout(function () {
            let currentRightPosition = parseInt(view.css("right"));
            currentLeftPosition = parseInt(view.css("left"));
            if (currentLeftPosition !== 0) {
                $(`#${right_arrow}`).removeClass("dis-none");
            }
            if (currentRightPosition > 0) {
                $(`#${left_arrow}`).addClass("dis-none");
                return;
            }
        }, 450);
        e.stopPropagation();
    });

    $(".rightArrow").click(function (e) {
        let innerDesktop = $(this).closest(".innerDesktop");
        let activeDesktop = getActiveDesktop(undefined, innerDesktop.attr("side")),
            left_arrow = activeDesktop.selector.perspective_left_slider_arrow,
            right_arrow = activeDesktop.selector.perspective_right_slider_arrow;
        let move = "45px";
        let view = $("#" + activeDesktop.selector.perspective_slider_id);
        let currentLeftPosition = parseInt(view.css("left"));
        if (currentLeftPosition < 0) view.stop(false, true).animate({left: "+=" + move}, {duration: 400});
        setTimeout(function () {
            currentLeftPosition = parseInt(view.css("left"));
            let currentRightPosition = parseInt(view.css("right"));
            if (currentLeftPosition === 0) {
                $(`#${right_arrow}`).addClass("dis-none");
            }
            if (currentRightPosition >= 0) {
                $(`#${left_arrow}`).removeClass("dis-none");
                return;
            }
        }, 450);
        e.stopPropagation();
    });

    $(document).on("mouseenter", ".tree_structure_parent_schema .elementListItem", function () {
        $(this).find(".elementListItemLabel").addClass("elementListItemLabelwithmaxWidth");
    });
    $(document).on("mouseleave", ".tree_structure_parent_schema .elementListItem", function () {
        $(this).find(".elementListItemLabel").removeClass("elementListItemLabelwithmaxWidth");
    });
    //slider ends here
    $(document).on("click", ".deskAddAttributeForAll", function () {
        let desktop = $(this).closest(".innerDesktop");
        let view = getSingleOrBiView(desktop.attr("side"));
        if ($(this).hasClass("desktopShieldElementAttribute")) {
            renderCreateAttributePopUp($(this), "desktopShieldElementAttribute", view);
        }
        else if ($(this).hasClass("desktopAssetDeliversAttribute")) {
            renderCreateAttributePopUp($(this), "desktopAssetDeliversAttribute", view);
        }
    });

    $(document).on("change", ".attributeCheckBox", function () {
        if ($(this).prop('checked')) {
            let msg = confirm("This action will delete all existing attributes and and their associated ratings. Do you want to proceed?");
            if (msg === true)
                $(this).attr("checked");
            else
                $(this).removeAttr("checked");
        }
        else {
        }
    });

    $(document).on("click", ".deskAttributeLibrary", function (e) {
        $("#saveData").show();
        let src_hotlinkId = $(this).attr("id");
        let src_id = $(this).closest(".innerDesktop").attr("id");
        let desktop = $(this).closest(".innerDesktop");
        let view = desktop.attr("view");
        let attributeLibraryViewDivId, haveSpaceToOpenView, isViewOpenedBefore;
        let isBiview = isBiViewOrNot(view);
        if ($(this).hasClass("desktopShieldElementAttribute")) {
            attributeLibraryViewDivId = backing.view_type.shield_attribute_library_view.name + "_" + src_hotlinkId;
            //check for space in screen
            haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.shield_attribute_library_view.key);
            if (!haveSpaceToOpenView) {
                $("#saveData").hide();
                return;
            }
            //check view is opened before
            isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(attributeLibraryViewDivId, isBiview);

        }
        else if ($(this).hasClass("desktopAssetDeliversAttribute")) {
            attributeLibraryViewDivId = backing.view_type.asset_attribute_library_view.name + "_" + src_hotlinkId;
            //check for space in screen
            haveSpaceToOpenView = checkIfViewCanOpen(backing.view_type.asset_attribute_library_view.key);
            if (!haveSpaceToOpenView) {
                $("#saveData").hide();
                return;
            }
            //check view is opened before
            isViewOpenedBefore = checkIfViewIsOpenedAlreadyAndUpdateMinimizedViews(attributeLibraryViewDivId, isBiview);
        }

        if (isViewOpenedBefore) {
            $("#saveData").hide();
            return;
        }
        let uniqueId = $(this).attr("uniqueid");
        let activeDesktop = getActiveDesktop(isBiview);
        let data = {};
        let perspectiveSelected = getPerspectiveInSelection(isBiview);
        data.perspectiveId = perspectiveSelected.selectedPerspective.elementId;

        if ($(this).hasClass("desktopShieldElementAttribute")) {
            data.shieldElementTypeId = $("#" + activeDesktop.selector.level_dropdown_selected_id).attr("elementtypeid");
            service.getAllShieldElementLibraryAttribute(data, function (res, err) {
                if (res) {
                    generateUniqueIdAndParentLink(res, "attributeLibraryView", null);
                    renderShieldAttributeLibraryView(res, attributeLibraryViewDivId, res.uniqueId, data, isBiview);
                    createScenarioViewOpenedFromAnchorSingleCase(attributeLibraryViewDivId, src_id, src_hotlinkId, backing.view_type.shield_attribute_library_view.key, "Attribute Library: ", uniqueId, isBiview);
                    $("#saveData").hide();
                    repositionViews(isBiview);
                }
                else if (err) {
                    $("#saveData").hide();
                }
            });
        }
        else if ($(this).hasClass("desktopAssetDeliversAttribute")) {
            let callbackfn = function (res, err) {
                if (res) {
                    generateUniqueIdAndParentLink(res, "attributeLibraryView", null);
                    renderAssetAttributeLibraryView(res, attributeLibraryViewDivId, res.uniqueId, data, isBiview);
                    createScenarioViewOpenedFromAnchorSingleCase(attributeLibraryViewDivId, src_id, src_hotlinkId, backing.view_type.asset_attribute_library_view.key, "Attribute Library: ", uniqueId, isBiview);
                    $("#saveData").hide();
                    repositionViews(isBiview);
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

        e.stopPropagation();
    });
    $(document).on("click", ".searchWithMappedElements", function (e) {
        let desktop = getDesktopDetails($(this));
        let isProjection = ($(this).attr("isProjection") === "true") ? true : false;
        if ($(this).attr("staticMap") === "true")
            searchWithMappedElements(desktop, true, isProjection);
        else
            searchWithMappedElements(desktop, false, isProjection);
        e.stopPropagation();
    });
    $(document).on("click", ".showCheckBoxItem", function (e) {
        let desktop = getDesktopDetails($(this));
        showCheckBoxItem(desktop.activeDesktop);
        e.stopPropagation();
    });
    $(document).on("change", ".assetCheckbox", function (e) {
        let checkbox = $(this).closest(".desktop-selector-dropdown").find(".showCheckBoxItem");
        if (this.checked) {
            checkbox.removeClass("dis-none");
        }
        else {
            checkbox.addClass("dis-none");
        }
    });

});

function CompareUtil() {
    var obj = new Object();

    function alphaticCompareOfGenericItem(o1, o2) {
        var ot1 = "";
        var ot2 = "";
        let lt1 = undefined;
        let lt2 = undefined;
        var name1 = "";
        var name2 = "";
        if (o1) {
            if (o1.objectType)
                ot1 = o1.objectType.trim().toLowerCase();
            name1 = getName(o1);
            if (o1.linkType)
                lt1 = o1.linkType.trim().toLowerCase();
        }
        if (o2) {
            if (o2.objectType)
                ot2 = o2.objectType.trim().toLowerCase();
            name2 = getName(o2);
            if (o2.linkType)
                lt2 = o2.linkType.trim().toLowerCase();
        }
        if(lt1 && lt2) {
            if(lt1 == lt2)
                return name1.localeCompare(name2);
            return lt1.localeCompare(lt2);
        } else if (lt1) {
            return -1;
        } else if (lt2) {
            return 1;
        }
        if (ot1 === ot2)
            return name1.localeCompare(name2);
        else if (ot1 === constants.objectType.SCE)
            return -1;
        else if (ot2 === constants.objectType.SCE)
            return 1;
        else return ot1.localeCompare(ot2);
    }

    function originalOrderingCompareOfGenericItem(o1, o2) {
        var ot1 = "";
        var ot2 = "";
        let lt1 = undefined;
        let lt2 = undefined;
        let linkId1 = 0;
        let linkId2 = 0;
        var elementId1 = 0;
        var elementId2 = 0;
        let sortOrder1 = 0;
        let sortOrder2 = 0;
        if (o1) {
            if (o1.objectType)
                ot1 = o1.objectType.trim().toLowerCase();
            if (o1.elementId)
                elementId1 = o1.elementId;
            if (o1.linkType)
                lt1 = o1.linkType.trim().toLowerCase();
            if (o1.linkId)
                linkId1 = o1.linkId;
            if (o1.sortOrder)
                sortOrder1 = o1.sortOrder;
            else
                sortOrder1 = o1.elementId;
        }
        if (o2) {
            if (o2.objectType)
                ot2 = o2.objectType.trim().toLowerCase();
            if (o2.elementId)
                elementId2 = o2.elementId;
            if (o2.linkType)
                lt2 = o2.linkType.trim().toLowerCase();
            if (o2.linkId)
                linkId2 = o2.linkId;
            if (o2.sortOrder)
                sortOrder2 = o2.sortOrder;
            else
                sortOrder2 = o2.elementId;
        }

        if(lt1 && lt2) {
            if(lt1 == lt2)
                return localeCompareForNumbers(sortOrder1, sortOrder2);
            return lt1.localeCompare(lt2);
        } else if (lt1) {
            return -1;
        } else if (lt2) {
            return 1;
        }

        if (ot1 === ot2)
            return localeCompareForNumbers(sortOrder1, sortOrder2);
        else if (ot1 === constants.objectType.SCE)
            return -1;
        else if (ot2 === constants.objectType.SCE)
            return 1;
        else return ot1.localeCompare(ot2);
    }

    function localeCompareForNumbers(a, b) {
        if (a > b) return 1;
        else if (a < b) return -1;
        else return 0;
    }

    function getName(genericItem) {
        if (genericItem.objectType && (genericItem.objectType === constants.objectType.SCE))
            return getExpressionName(genericItem);
        else if (genericItem.name)
            return genericItem.name.trim().toLowerCase();
        return "";
    }

    function getExpressionName(genericItem) {
        var expressionName = "";
        if (!genericItem.odosChain)
            return expressionName;
        expressionName += getChainAsString(genericItem.odosChain);
        if (!genericItem.mdosChain)
            return expressionName;
        expressionName += getChainAsString(genericItem.mdosChain);
        if (!genericItem.cdosChain)
            return expressionName;
        expressionName += getChainAsString(genericItem.cdosChain);
        if (!genericItem.sdosChain)
            return expressionName;
        expressionName += getChainAsString(genericItem.sdosChain);
        return expressionName;
    }

    function getChainAsString(chain) {
        var chainAsName = "";
        if (chain) {
            for (var i = 0; i < chain.length; i++) {
                if (chain[i].name)
                    chainAsName += chain[i].name;
            }
        }
        return chainAsName;
    }

    obj.alphaticCompareOfGenericItem = alphaticCompareOfGenericItem;
    obj.originalOrderingCompareOfGenericItem = originalOrderingCompareOfGenericItem;
    return obj;
}

var compareUtil = CompareUtil();

function sortChildrenAlphbetically(res) {
    if (res.children) {
        res.children.sort(compareUtil.alphaticCompareOfGenericItem);
        for (let i = 0; i < res.children.length; i++) {
            sortChildrenAlphbetically(res.children[i]);
        }
    }
}

function sortChildrenInOriginalOrder(res) {
    if (res.children) {
        res.children.sort(compareUtil.originalOrderingCompareOfGenericItem);
        for (let i = 0; i < res.children.length; i++) {
            sortChildrenInOriginalOrder(res.children[i]);
        }
    }
}

function propagateEvent(event) {
    appendToAllEventQueues(event);
    applyEventsToActiveScreens();
}

function propagateEventForAssetDeliversRulerType(event) {
    appendToAllEventQueues(event);
    applyEventsToActiveScreens();
}

function generateUniqueIdForPersAttribute(res, idOfParent) {
    res.uniqueId = createIdForElement(res[ATTR.elementId], res[ATTR.objectType], idOfParent);
    backing.dictionary_of_unique_id_to_pers_object[res.uniqueId] = res;
    if (res[ATTR.children]) {
        let length = res[ATTR.children].length;
        for (let i = 0; i < length; i++) {
            generateUniqueIdAndParentLink(res[ATTR.children][i], res.uniqueId, res);
        }
    }
}

function generateUniqueIdAndParentLink(res, idOfParent, parentObj, indentationId = "") {
    res.uniqueId = createIdForElement(res[ATTR.elementId], res[ATTR.objectType], idOfParent);
    res.parentItem = parentObj;
    res.indentationId = indentationId;
    backing.dictionary_of_unique_id_to_attr_object[res.uniqueId] = res;
    if (res[ATTR.children]) {
        res[ATTR.children].sort(compareUtil.originalOrderingCompareOfGenericItem);
        let length = res[ATTR.children].length;
        for (let i = 0; i < length; i++) {
            let childIndentationId = `${i+1}`;
            if(indentationId != "")
                childIndentationId = `${indentationId}.${childIndentationId}`;
            generateUniqueIdAndParentLink(res[ATTR.children][i], res.uniqueId, res, childIndentationId);
        }
    }
}

function generateUniqueIdAndParentLinkDropDown(res, idOfParent, parentObj) {
    if (res && res.length > 0) {
        for (let i = 0; i < res.length; i++) {
            res[i].uniqueId = createIdForElement(res[i][ATTR.elementId], res[i][ATTR.objectType], idOfParent);
            res[i].parentItem = parentObj;
            backing.dictionary_of_unique_id_to_attr_object[res[i].uniqueId] = res[i];
            if (res[i][ATTR.children] && res[i][ATTR.children].length > 0) {
                let length = res[i][ATTR.children].length;
                for (let j = 0; j < length; j++) {
                    generateUniqueIdAndParentLink(res[i][ATTR.children][j], res[i].uniqueId, res[i]);
                }
            }
        }
    }
}

function addToDictionary(objects) {
    $.each(objects, function (key, value) {
        backing.dictionary_of_unique_id_to_attr_object[key] = value;
    });
}

function createIdForElement(elementId, objectType, idOfParent) {
    return elementId + "_" + objectType + "_" + idOfParent;
}

function generateUniqueIdAndParentLinkForSubtree(children, uniqueIdOfParent, parentObj) {
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        child.uniqueId = createIdForElement(child[ATTR.elementId], child[ATTR.objectType], uniqueIdOfParent);
        child.parentItem = parentObj;
        backing.dictionary_of_unique_id_to_attr_object[child.uniqueId] = child;
        if (child.children)
            generateUniqueIdAndParentLinkForSubtree(child.children, child.uniqueId, child);
    }
}

function LookupShieldId(shieldElementTypeId) {
    let shieldId;
    let backingVar = backing.shield_schema_obj.elementTypeInfoMap[shieldElementTypeId];
    if (backingVar && (backingVar.shieldId !== undefined)) {
        shieldId = backingVar.shieldId;
    }
    return shieldId;
}

function LookupLevel(shieldElementTypeId) {
    if(shieldElementTypeId == 0)
        return 0;
    let backingVar = backing.shield_schema_obj.elementTypeInfoMap[shieldElementTypeId];
    return (backingVar && backingVar.level !== undefined) ? backingVar.level : "";
}

function LookupAcronym(shieldElementTypeId) {
    let backingVar = backing.shield_schema_obj.elementTypeInfoMap[shieldElementTypeId];
    let shieldId = backingVar.shieldId;
    let backingShield = backing.shield_schema_obj.shieldInfoMap[shieldId];
    if (backingShield.acronym === null || backingShield.acronym === undefined) {
        return "";
    }
    else {
        return backingShield.acronym;
    }
}

function canHaveCreateHotlinkElement(element, view) {
    let objct = null;
    let activeDesktop;
    activeDesktop = getActiveDesktop(undefined, view);
    if (activeDesktop.canHaveCreateShieldElementHotlink && activeDesktop.canHaveCreateShieldElementHotlink !== null) {
        $.each(activeDesktop.canHaveCreateShieldElementHotlink, function (key, obj) {
            if (element.objectType === obj.objectType) {
                let match = true;
                if (obj.shieldElementTypeId) {
                    if (element.shieldElementTypeId) {
                        if (element.shieldElementTypeId != obj.shieldElementTypeId)
                            match = false;
                    }
                    else
                        match = false;
                }
                if (match) {
                    objct = obj;
                    return;
                }
                else {
                    return;
                }
            }
        });
    }
    return objct;
}

function errorHandler(err) {
    $("#saveData").hide();
    $(".alertBoxWrapper").removeClass("dis-none").addClass("active");
    let str;
    if (err.status === 401) {
        str = "Unauthorized";
        $("#popUp").children().remove();
        $("#popUp").addClass("dis-none");
    }
    else if (err.status === 200 || err.status === 0) {
        str = "Session Expired";
        window.location.href = "/login";
    } else {
        str = "ERROR";
    }
    $("#alertMsg").html(str);
}

backing.RingViewIcons = {
    "flaticon-shield-element": "",
    "flaticon-standard-element": "",
    "flaticon-threat-control": "",
    "flaticon-asset-type-element": "",
    "flaticon-asset-element": "",
    "flaticon-provider-element": "",
    "flaticon-objective-element": "",
    "flaticon-content-element-new-white": "",
    "flaticon-protected-element": "",
    "flaticon-method-element-new-white": "",
    "flaticon-organisational-element": "",
    "flaticon-expression-element": "",
    "flaticon-business-element": "",
    "flaticon-user": "",
    "flaticon-active-role": "",
    "flaticon-business-asset-element": "",
    "flaticon-business-asset-type-element": "",
    "flaticon-business-provider-element": "",
};

function getStyle(className) {
    var classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
    for (var x = 0; x < classes.length; x++) {
        if (classes[x].selectorText == className) {
            return JSON.parse(classes[x].style.content);
        }
    }
}

function getRingViewIcons() {
    let keys = Object.keys(backing.RingViewIcons);
    for (let i = 0; i < keys.length; i++) {
        backing.RingViewIcons[keys[i]] = getStyle("." + keys[i] + "::before")
    }
}

// added by manish for handling error msg for drag and drop
function errorMsgHandler(err) {
    $("#saveData").hide();
    $(".alertBoxWrapper").removeClass("dis-none").addClass("active");
    let str;
    if (err.errorMessage){
        str= err.errorMessage;
    } else {
        str = "ERROR : Unable to save the data";
    }
    $("#alertMsg").html(str);
}

getRingViewIcons();


//added by Manish for Rich Text Editor
function applyRichTextEditorById(id){
    $('#'+id).cazary({
        commands: "FULL",
    });
    $(".editorTextArea").find("div:first").css('width', '100%');
    $(".editorTextArea").find("iframe:first").css('height', '100%');
}

