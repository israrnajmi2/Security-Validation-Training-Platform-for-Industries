$(document).ready(function () {
    $(document).on("click", ".restrictedSearch", function () {
        let desktop = $(this).closest(".innerDesktop");
        $(this).toggleClass("opacityDull");
        desktop.find(".search-keyword").keyup();
    });

    $(document).on("click", ".customSearchSelector", function () {
        let desktop = $(this).closest(".innerDesktop");
        let $customSearchSelector = desktop.find(".customSearchSelector");
        let $customSearchObjectElementType = desktop.find(".custom_searchObject_elementType");
        $customSearchSelector.removeClass("active");
        $(this).addClass("active");
        if ($(this).hasClass("allSearch")) {
            $customSearchObjectElementType.addClass("dis-none");
            desktop.find(".searchDrop").addClass("dis-none");
        }
        else if ($(this).hasClass("haveSearch")) {
            $customSearchObjectElementType.removeClass("dis-none");
            desktop.find(".searchDrop").removeClass("dis-none");
        }
        else if ($(this).hasClass("noSearch")) {
            $customSearchObjectElementType.removeClass("dis-none");
            desktop.find(".searchDrop").removeClass("dis-none");
        }
        desktop.find(".search-keyword").keyup();
    });

    $(document).on("click", ".clearSearch", function (e) {
        let desktop = $(this).closest(".innerDesktop");
        let desktopId = desktop.attr("id");
        let biWorkspace, biDesktop, activeBiDesktop, singleWorkspace, singleDesktop, activeSingleDesktop,
            activeDesktopDivId;

        if (backing.is_bi_view_active) {
            biWorkspace = backing.biview.active_workspace_keyname;
            biDesktop = backing.biview.active_desktop.keyname;
            activeBiDesktop = getBiActiveDesktop(biWorkspace, biDesktop);
            singleWorkspace = backing.singleview.active_workspace_keyname;
            singleDesktop = backing.singleview.active_desktop.keyname;
            activeSingleDesktop = getSingleActiveDesktop(singleWorkspace, singleDesktop);
        }
        else {
            singleWorkspace = backing.singleview.active_workspace_keyname;
            singleDesktop = backing.singleview.active_desktop.keyname;
            activeSingleDesktop = getSingleActiveDesktop(singleWorkspace, singleDesktop);
        }
        $(this).addClass("active");
        /*desktop.find(".restrictedSearch").trigger("click");*/
        desktop.find(".searchObject_elementType").removeAttr("randomId");
        desktop.find(".searchObject_elementType").html("");
        desktop.find(".searchObject_elementType").parent().find(".searchIcon").addClass("opacityDull");
        desktop.find(".searchObject_minIndex").html("0.0");
        desktop.find(".searchObject_maxIndex").html("1.0");
        desktop.find(".custom_searchObject_elementType").removeAttr("randomId");
        desktop.find(".custom_searchObject_elementType").closest(".desktop-selector-container").addClass("dis-none");
        desktop.find(".search-keyword").val("");
        desktop.find(".customSearchSelector").removeClass("active");
        desktop.find(".allSearch").addClass("active");
        if (activeSingleDesktop && activeSingleDesktop.anchor_div_id === desktopId) {
            activeDesktopDivId = $("#" + activeSingleDesktop.anchor_div_id);
        }
        else if (activeBiDesktop && activeBiDesktop.anchor_div_id === desktopId) {
            activeDesktopDivId = $("#" + activeBiDesktop.anchor_div_id);
        }
        else activeDesktopDivId = desktop;
        modifyContainerHeight(activeDesktopDivId);
        desktop.find(".search-keyword").keyup();
    });

    $(document).on("keyup", ".search-keyword", function (e) {
        let desktop = $(this).closest(".innerDesktop");
        let searchFilterObject, customSearchFilterObject;
        let isOneOfHaveNoSelected = false;
        let isHave = false;
        let filterObjectType, filterElementTypeId, filterLabel, filterLinkType;
        let searchFilterItem = desktop.find(".searchObject_elementType");
        let customSearchFilterItem = desktop.find(".custom_searchObject_elementType");
        let lowIndex = desktop.find(".searchObject_minIndex").html();
        let highIndex = desktop.find(".searchObject_maxIndex").html();
        if (desktop.find(".haveSearch").hasClass("active")) {
            isOneOfHaveNoSelected = true;
            isHave = true;
        }
        else if (desktop.find(".noSearch").hasClass("active")) {
            isOneOfHaveNoSelected = true;
        }

        if (searchFilterItem && searchFilterItem.attr("randomId")) {
            let randomId = searchFilterItem.attr("randomId");
            searchFilterObject = backing.dictionary_of_unique_id_to_attr_object[randomId];
            filterElementTypeId = searchFilterObject.shieldElementTypeId;
            filterObjectType = searchFilterObject.objectType;
            filterLinkType = searchFilterObject.linkType;
        }
        if (isOneOfHaveNoSelected && customSearchFilterItem && customSearchFilterItem.attr("randomId")) {
            let randomId = customSearchFilterItem.attr("randomId");
            customSearchFilterObject = backing.dictionary_of_unique_id_to_attr_object[randomId];
        }
        filterLabel = searchFilterItem.html();
        if (!$(this).parent().find(".desktop-search-wrapper").find(".restrictedSearch").hasClass("opacityDull")) {
            var searchKeyWord = $(this).val().trim().toLowerCase();
            if (searchKeyWord === "" && !filterObjectType && !filterElementTypeId && !filterLinkType) {
                if ((!lowIndex && !highIndex) || (lowIndex && highIndex && lowIndex === "0.0" && highIndex === "1.0")) {
                    desktop.find(".element_li").attr("style", "display: block;");
                    desktop.find(".directoryViewUlE").each(function () {
                        $(this).attr("style", "display:block;");
                        $(this).show();
                    });
                    desktop.find('.dir_highlight').each(function () {
                        $(this).replaceWith($(this).html());
                    });
                    return;
                }
            }
            $("#saveData").show();

            desktop.find(".directoryViewUlE").attr("style", "display: none;");
            desktop.find(".element_li").attr("style", "display: block;");

            desktop.find(".whiteBgTriangle").each(function () {
                var spanElement = $(this).find("span:first");
                spanElement.attr("style", "display:block;");
                spanElement.attr("class", "triangle_active fleft");
            });

            desktop.find('.dir_highlight').each(function () {
                $(this).replaceWith($(this).html());
            });

            desktop.find(".element_li").each(function (e) {
                var uniqueId = $(this).attr("uniqueId");
                var element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
                var elementLiObj = $(this);
                var typeMatch = true;
                var textMatch = true;
                $(this).children(".directoryListItemContainer").find(".d-text").each(function (e) {

                    var dtext = $(this);
                    let typeParamsFromUI = {};
                    typeParamsFromUI = {
                        "isOneOfHaveNoSelected": isOneOfHaveNoSelected,
                        "isHave": isHave
                    };
                    if (searchFilterObject) {
                        typeParamsFromUI["custom"] = searchFilterObject.isCustom;
                        typeParamsFromUI["objectType"] = searchFilterObject.objectType;
                        typeParamsFromUI["linkType"] = searchFilterObject.linkType;
                        typeParamsFromUI["shieldElementTypeId"] = searchFilterObject.shieldElementTypeId;
                        typeParamsFromUI["level"] = searchFilterObject.level;
                        typeParamsFromUI["linkName"] = searchFilterObject.linkName;
                    }
                    if (customSearchFilterObject) {
                        typeParamsFromUI["childCustom"] = customSearchFilterObject.isCustom;
                        typeParamsFromUI["childObjectType"] = customSearchFilterObject.objectType;
                        typeParamsFromUI["childShieldElementTypeId"] = customSearchFilterObject.shieldElementTypeId;
                        typeParamsFromUI["childLinkType"] = customSearchFilterObject.linkType;
                        typeParamsFromUI["childLevel"] = customSearchFilterObject.level;
                        typeParamsFromUI["childLinkName"] = customSearchFilterObject.linkName;

                    }

                    if (searchFilterObject || customSearchFilterObject) {
                        typeMatch = doesTypeMatch(element, elementLiObj, dtext, typeParamsFromUI);
                    }
                    if (!typeParamsFromUI.custom)
                        textMatch = searchForMatch(element, searchKeyWord, typeParamsFromUI.objectType, typeParamsFromUI.shieldElementTypeId);
                    var extra = true;//extraFilterMatch(dtext, backing.searchElements.extraFilter);
                    //var IndexMatch =true;
                    if (lowIndex && highIndex)
                        var IndexMatch = searchForIndexMatch(element, lowIndex, highIndex);
                    else
                        var IndexMatch = true;
                    if (typeMatch && textMatch && IndexMatch && extra) {

                        //all parent li's display:block, all parent bg_triangle display:block & triangle_active
                        $(this).parent().parents(".element_li").each(function () {
                            $(this).attr("style", "display:block;");
                            $(this).children(".directoryListItemContainer").each(function () {
                                $(this).children(".whiteBgTriangle").each(function () {
                                    $(this).attr("style", "display:block;");
                                    var spanE = $(this).find("span:first");
                                    spanE.attr("style", "display:block;");
                                    spanE.attr("class", "triangle_active fleft");
                                });

                            });

                        });
                        //current bg_traingle display:none
                        $(this).closest(".directoryListItemContainer").each(function () {
                            $(this).children(".whiteBgTriangle").each(function () {
                                $(this).attr("style", "display:none;");
                                var spanE1 = $(this).find("span:first");
                                spanE1.attr("style", "display:none;");
                                spanE1.attr("class", "triangle_deactive fleft");
                            });

                        });
                        //all parent ul's display:block
                        $(this).parents(".directoryViewUlE").each(function () {
                            $(this).attr("style", "display:block;");
                        });
                        var high = false;
                        if (typeParamsFromUI.objectType || typeParamsFromUI.shieldElementTypeId || lowIndex || typeParamsFromUI.linkType)
                            high = true;
                        //find first dtext and highlight
                        if (element.objectType === constants.objectType.SCE) {
                            if (filterElementTypeId) {
                                if (filterElementTypeId === 1) {
                                    if ($(this).hasClass("param1") && element.odosChain) {
                                        if ($(this).hasClass("assoParam")) {
                                            $(this).html(createChainHighlightAssoc(element.odosChain, searchKeyWord, high));
                                        }
                                        else
                                            $(this).html(createChainHighlight(element.odosChain, searchKeyWord, high));
                                    }
                                }
                                else if (filterElementTypeId === 2) {
                                    if ($(this).hasClass("param2") && element.mdosChain) {
                                        if ($(this).hasClass("assoParam")) {
                                            $(this).html(createChainHighlightAssoc(element.mdosChain, searchKeyWord, high));
                                        }
                                        else
                                            $(this).html(createChainHighlight(element.mdosChain, searchKeyWord, high));
                                    }
                                }
                                else if (filterElementTypeId === 3) {
                                    if ($(this).hasClass("param3") && element.cdosChain) {
                                        if ($(this).hasClass("assoParam")) {
                                            $(this).html(createChainHighlightAssoc(element.cdosChain, searchKeyWord, high));
                                        }
                                        else
                                            $(this).html(createChainHighlight(element.cdosChain, searchKeyWord, high));
                                    }
                                }
                                else if (filterElementTypeId === 4) {
                                    if ($(this).hasClass("param4") && element.sdosChain) {
                                        if ($(this).hasClass("assoParam")) {
                                            $(this).html(createChainHighlightAssoc(element.sdosChain, searchKeyWord, high));
                                        }
                                        else
                                            $(this).html(createChainHighlight(element.sdosChain, searchKeyWord, high));
                                    }
                                }

                            }
                            else {
                                if (filterLabel === "security_control_expression") {
                                    high = true;
                                }
                                if ($(this).hasClass("param1") && element.odosChain) {
                                    if ($(this).hasClass("assoParam")) {
                                        $(this).html(createChainHighlightAssoc(element.odosChain, searchKeyWord, high));
                                    }
                                    else
                                        $(this).html(createChainHighlight(element.odosChain, searchKeyWord, high));
                                }
                                else if ($(this).hasClass("param2") && element.mdosChain) {
                                    if ($(this).hasClass("assoParam")) {
                                        $(this).html(createChainHighlightAssoc(element.mdosChain, searchKeyWord, high));
                                    }
                                    else
                                        $(this).html(createChainHighlight(element.mdosChain, searchKeyWord, high));
                                }
                                else if ($(this).hasClass("param3") && element.cdosChain) {
                                    if ($(this).hasClass("assoParam")) {
                                        $(this).html(createChainHighlightAssoc(element.cdosChain, searchKeyWord, high));
                                    }
                                    else
                                        $(this).html(createChainHighlight(element.cdosChain, searchKeyWord, high));
                                }
                                else if ($(this).hasClass("param4") && element.sdosChain) {
                                    if ($(this).hasClass("assoParam")) {
                                        $(this).html(createChainHighlightAssoc(element.sdosChain, searchKeyWord, high));
                                    }
                                    else
                                        $(this).html(createChainHighlight(element.sdosChain, searchKeyWord, high));
                                }
                            }

                        }
                        else {
                            var keyWordLength = searchKeyWord.length;
                            var directoryText = $(this).text();
                            if (keyWordLength > 0) {
                                let keyWordIndex = $(this).text().toLowerCase().indexOf(searchKeyWord);
                                if(keyWordIndex > -1) {
                                    let directoryTextLength = directoryText.length;
                                    let html = "";
                                    html += directoryText.substring(0, keyWordIndex);
                                    html += "<span class=\"dir_highlight\">" + directoryText.substring(keyWordIndex, keyWordIndex + keyWordLength) + "</span>";
                                    html += directoryText.substring(directoryText.substring(0, keyWordIndex).length + keyWordLength, directoryTextLength);
                                    $(this).html(html);
                                }
                                var dummy = $(this).children().eq(0).find(".directory-index-value").text();
                                if (dummy != "") {
                                    let htmlForIndex = "<span class=\"dir_highlight\">" + dummy + "</span>";
                                    $(this).children().eq(0).find(".directory-index-value").html(htmlForIndex);
                                }
                                let refIdElement = $(this).parent().find(".d-text-refId");
                                let refIdText = refIdElement.text();
                                if (refIdText != "") {
                                    keyWordIndex = refIdText.toLowerCase().indexOf(searchKeyWord);
                                    if(keyWordIndex > -1) {
                                        let refIdTextLength = refIdText.length;
                                        let html = "";
                                        html += refIdText.substring(0, keyWordIndex);
                                        html += "<span class=\"dir_highlight\">" + refIdText.substring(keyWordIndex, keyWordIndex + keyWordLength) + "</span>";
                                        html += refIdText.substring(refIdText.substring(0, keyWordIndex).length + keyWordLength, refIdTextLength);
                                        refIdElement.html(html);
                                    }
                                }
                            }
                            else if (keyWordLength === 0 && high) {
                                var html = "";
                                html += "<span class=\"dir_highlight\">" + directoryText + "</span>";
                                $(this).html(html);

                                var dummy = $(this).children().eq(0).find(".directory-index-value").text();
                                if (dummy != "") {
                                    var htmlForIndex = "<span class=\"dir_highlight\">" + dummy + "</span>";
                                    $(this).children().eq(0).find(".directory-index-value").html(htmlForIndex);
                                }
                            }
                        }
                    }
                    else {
                        $(this).closest(".element_li").attr("style", "display:none");
                    }
                });
            });
            $('#saveData').hide();
        }
        else if ($(this).parent().find(".desktop-search-wrapper").find(".restrictedSearch").hasClass("opacityDull")) {
            var searchKeyWord = $(this).val().trim().toLowerCase();
            if (searchKeyWord === "" && !filterElementTypeId && !filterObjectType && !filterLinkType) {
                if ((!lowIndex && !highIndex) || (lowIndex && highIndex && lowIndex === "0.0" && highIndex === "1.0")) {
                    desktop.find(".directoryViewUlE").each(function () {
                        $(this).attr("style", "display:block;");
                        $(this).show();
                        $(this).closest(".directoryListItemContainer").each(function () {
                            $(this).children(".whiteBgTriangle").each(function () {
                                $(this).attr("style", "display:block;");
                                var spanElement = $(this).find("span:first");
                                spanElement.attr("style", "display:block;");
                                spanElement.attr("class", "triangle_active fleft");
                            });
                        });
                    });

                    desktop.find('.dir_highlight').each(function () {
                        $(this).replaceWith($(this).html());
                    });
                    return;
                }
            }
            $("#saveData").show();
            desktop.find(".directoryViewUlE").attr("style", "display: none;");
            desktop.find(".element_li").attr("style", "display: block;");

            desktop.find(".whiteBgTriangle").each(function () {
                $(this).attr("style", "display:block;");
                var spanElement = $(this).find("span:first");
                spanElement.attr("style", "display:block;");
                spanElement.attr("class", "triangle_deactive fleft");
            });

            desktop.find('.dir_highlight').each(function () {
                $(this).replaceWith($(this).html());
            });

            desktop.find(".element_li").each(function (e) {
                var uniqueId = $(this).attr("uniqueId");
                var element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
                var elementLiObj = $(this);
                let typeMatch = true;
                let textMatch = true;
                $(this).children(".directoryListItemContainer").find(".d-text").each(function (e) {
                    var dtext = $(this);
                    let typeParamsFromUI = {};
                    typeParamsFromUI = {
                        "isOneOfHaveNoSelected": isOneOfHaveNoSelected,
                        "isHave": isHave
                    };
                    if (searchFilterObject) {
                        typeParamsFromUI["custom"] = searchFilterObject.isCustom;
                        typeParamsFromUI["objectType"] = searchFilterObject.objectType;
                        typeParamsFromUI["linkType"] = searchFilterObject.linkType;
                        typeParamsFromUI["shieldElementTypeId"] = searchFilterObject.shieldElementTypeId;
                        typeParamsFromUI["level"] = searchFilterObject.level;
                        typeParamsFromUI["linkName"] = searchFilterObject.linkName;
                    }
                    if (customSearchFilterObject) {
                        typeParamsFromUI["childCustom"] = customSearchFilterObject.isCustom;
                        typeParamsFromUI["childObjectType"] = customSearchFilterObject.objectType;
                        typeParamsFromUI["childShieldElementTypeId"] = customSearchFilterObject.shieldElementTypeId;
                        typeParamsFromUI["childLinkType"] = customSearchFilterObject.linkType;
                        typeParamsFromUI["childLevel"] = customSearchFilterObject.level;
                        typeParamsFromUI["childLinkName"] = customSearchFilterObject.linkName;
                    }
                    if (searchFilterObject || customSearchFilterObject) {
                        typeMatch = doesTypeMatch(element, elementLiObj, dtext, typeParamsFromUI);
                    }
                    if (!typeParamsFromUI.custom)
                        textMatch = searchForMatch(element, searchKeyWord, typeParamsFromUI.objectType, typeParamsFromUI.shieldElementTypeId);
                    var extra = true;//extraFilterMatch(dtext, backing.searchElements.extraFilter);
                    if (lowIndex && highIndex)
                        var IndexMatch = searchForIndexMatch(element, lowIndex, highIndex);
                    else
                        var IndexMatch = true;
                    if (typeMatch && textMatch && IndexMatch && extra) {
                        //all parent bg_traingels active
                        $(this).parent().parents(".element_li").each(function () {
                            $(this).children(".directoryListItemContainer").each(function () {
                                $(this).children(".whiteBgTriangle").each(function () {
                                    var spanE = $(this).find("span:first");
                                    spanE.attr("class", "triangle_active fleft");
                                });

                            });
                        });
                        $(this).closest(".directoryListItemContainer").each(function () {
                            $(this).children(".whiteBgTriangle").each(function () {
                                $(this).attr("style", "display:block;");
                                var spanE1 = $(this).find("span:first");
                                spanE1.attr("style", "display:block;");
                                spanE1.attr("class", "triangle_deactive fleft");
                            });

                        });
                        $(this).parent().parents(".element_li_root").each(function () {
                            $(this).children(".directoryListItemContainer").each(function () {
                                $(this).children(".whiteBgTriangle").each(function () {
                                    var spanE = $(this).find("span:first");
                                    spanE.attr("class", "triangle_active fleft");
                                });

                            });
                        });
                        //all parent ul's display:block
                        $(this).parents(".directoryViewUlE").each(function () {
                            $(this).attr("style", "display:block;");
                        });

                        if (typeParamsFromUI.objectType || typeParamsFromUI.shieldElementTypeId || typeParamsFromUI.linkType || lowIndex)
                            var high = true;
                        //find first dtext and highlight
                        if (element.objectType === constants.objectType.SCE) {

                            if (filterElementTypeId) {
                                if (filterElementTypeId == 1) {
                                    if ($(this).hasClass("param1") && element.odosChain) {
                                        if ($(this).hasClass("assoParam")) {
                                            $(this).html(createChainHighlightAssoc(element.odosChain, searchKeyWord, high));
                                        }
                                        else
                                            $(this).html(createChainHighlight(element.odosChain, searchKeyWord, high));
                                    }
                                }
                                else if (filterElementTypeId == 2) {
                                    if ($(this).hasClass("param2") && element.mdosChain) {
                                        if ($(this).hasClass("assoParam")) {
                                            $(this).html(createChainHighlightAssoc(element.mdosChain, searchKeyWord, high));
                                        }
                                        else
                                            $(this).html(createChainHighlight(element.mdosChain, searchKeyWord, high));
                                    }
                                }
                                else if (filterElementTypeId == 3) {
                                    if ($(this).hasClass("param3") && element.cdosChain) {
                                        if ($(this).hasClass("assoParam")) {
                                            $(this).html(createChainHighlightAssoc(element.cdosChain, searchKeyWord, high));
                                        }
                                        else
                                            $(this).html(createChainHighlight(element.cdosChain, searchKeyWord, high));
                                    }
                                }
                                else if (filterElementTypeId == 4) {
                                    if ($(this).hasClass("param4") && element.sdosChain) {
                                        if ($(this).hasClass("assoParam")) {
                                            $(this).html(createChainHighlightAssoc(element.sdosChain, searchKeyWord, high));
                                        }
                                        else
                                            $(this).html(createChainHighlight(element.sdosChain, searchKeyWord, high));
                                    }
                                }

                            }
                            else {
                                if (filterLabel === "security_control_expression") {
                                    high = true;
                                }
                                if ($(this).hasClass("param1") && element.odosChain) {
                                    if ($(this).hasClass("assoParam")) {
                                        $(this).html(createChainHighlightAssoc(element.odosChain, searchKeyWord, high));
                                    }
                                    else
                                        $(this).html(createChainHighlight(element.odosChain, searchKeyWord, high));
                                }
                                else if ($(this).hasClass("param2") && element.mdosChain) {
                                    if ($(this).hasClass("assoParam")) {
                                        $(this).html(createChainHighlightAssoc(element.mdosChain, searchKeyWord, high));
                                    }
                                    else
                                        $(this).html(createChainHighlight(element.mdosChain, searchKeyWord, high));
                                }
                                else if ($(this).hasClass("param3") && element.cdosChain) {
                                    if ($(this).hasClass("assoParam")) {
                                        $(this).html(createChainHighlightAssoc(element.cdosChain, searchKeyWord, high));
                                    }
                                    else
                                        $(this).html(createChainHighlight(element.cdosChain, searchKeyWord, high));
                                }
                                else if ($(this).hasClass("param4") && element.sdosChain) {
                                    if ($(this).hasClass("assoParam")) {
                                        $(this).html(createChainHighlightAssoc(element.sdosChain, searchKeyWord, high));
                                    }
                                    else
                                        $(this).html(createChainHighlight(element.sdosChain, searchKeyWord, high));
                                }
                            }

                        }
                        else {
                            var keyWordLength = searchKeyWord.length;
                            var directoryText = $(this).text();
                            if (keyWordLength > 0) {
                                var keyWordIndex = $(this).text().toLowerCase().indexOf(searchKeyWord);
                                if(keyWordIndex > -1) {
                                    var directoryTextLength = directoryText.length;
                                    var html = "";
                                    html += directoryText.substring(0, keyWordIndex);
                                    html += "<span class=\"dir_highlight\">" + directoryText.substring(keyWordIndex, keyWordIndex + keyWordLength) + "</span>";
                                    html += directoryText.substring(directoryText.substring(0, keyWordIndex).length + keyWordLength, directoryTextLength);
                                    $(this).html(html);
                                }
                                var dummy = $(this).children().eq(0).find(".directory-index-value").text();
                                if (dummy != "") {
                                    var htmlForIndex = "<span class=\"dir_highlight\">" + dummy + "</span>";
                                    $(this).children().eq(0).find(".directory-index-value").html(htmlForIndex);
                                }
                                let refIdElement = $(this).parent().find(".d-text-refId");
                                let refIdText = refIdElement.text();
                                if (refIdText != "") {
                                    keyWordIndex = refIdText.toLowerCase().indexOf(searchKeyWord);
                                    if(keyWordIndex > -1) {
                                        let refIdTextLength = refIdText.length;
                                        let html = "";
                                        html += refIdText.substring(0, keyWordIndex);
                                        html += "<span class=\"dir_highlight\">" + refIdText.substring(keyWordIndex, keyWordIndex + keyWordLength) + "</span>";
                                        html += refIdText.substring(refIdText.substring(0, keyWordIndex).length + keyWordLength, refIdTextLength);
                                        refIdElement.html(html);
                                    }
                                }
                            }
                            else if (keyWordLength === 0 && high) {
                                var html = "";
                                html += "<span class=\"dir_highlight\">" + directoryText + "</span>";
                                $(this).html(html);

                                var dummy = $(this).children().eq(0).find(".directory-index-value").text();
                                if (dummy != "") {
                                    var htmlForIndex = "<span class=\"dir_highlight\">" + dummy + "</span>";
                                    $(this).children().eq(0).find(".directory-index-value").html(htmlForIndex);
                                }
                            }
                        }
                    }
                });
            });
            $('#saveData').hide();
        }
    });

    $(document).on("click", ".restrictedSearchBox", function (e) {
        let desktop = $(this).closest(".innerBlock");
        $(this).toggleClass("opacityDull");
        desktop.find(".searchBox").keyup();
    });

    $(document).on("click", ".clearSearchBox", function (e) {
        let desktop = $(this).closest(".innerBlock");
        $(this).addClass("active");
        desktop.find(".searchBox").val("");
        desktop.find(".searchBox").keyup();
    });

    $(document).on("keyup", ".searchBox", function (e) {
        let desktop = $(this).closest(".innerBlock");
        if (!$(this).parent().find(".desktop-search-wrapper").find(".restrictedSearchBox").hasClass("opacityDull")) {
            $("#saveData").show();
            desktop.find(".directoryViewUlE").attr("style", "display: none;");
            desktop.find(".element_li").attr("style", "display: block;");

            desktop.find(".whiteBgTriangle").each(function () {
                let spanElement = $(this).find("span:first");
                spanElement.attr("style", "display:block;");
                spanElement.attr("class", "triangle_deactive fleft");
            });

            desktop.find('.dir_highlight').each(function () {
                $(this).replaceWith($(this).html());
            });
            var searchKeyWord = $(this).val().trim().toLowerCase();
            desktop.find(".element_li").each(function (e) {
                $(this).find(".d-text").each(function (e) {

                    let dtext = $(this);
                    let textMatch = searchForMatchInExpression(dtext, searchKeyWord, desktop);
                    let extra = true;//extraFilterMatch(dtext, backing.searchElements.extraFilter);
                    let IndexMatch = true;
                    if (textMatch && IndexMatch && extra) {
                        //all parent li's display:block, all parent bg_triangle display:block & triangle_active
                        $(this).parent().parents(".element_li").each(function () {
                            $(this).attr("style", "display:block;");
                            $(this).children(".directoryListItemContainer").each(function () {
                                $(this).children(".whiteBgTriangle").each(function () {
                                    $(this).attr("style", "display:block;");
                                    let spanE = $(this).find("span:first");
                                    spanE.attr("style", "display:block;");
                                    spanE.attr("class", "triangle_active fleft");
                                });

                            });

                        });

                        //current bg_traingle display:none
                        $(this).closest(".directoryListItemContainer").each(function () {
                            $(this).children(".whiteBgTriangle").each(function () {
                                $(this).attr("style", "display:none;");
                                let spanE1 = $(this).find("span:first");
                                spanE1.attr("style", "display:none;");
                                spanE1.attr("class", "triangle_deactive fleft");
                            });

                        });
                        //all parent ul's display:block
                        $(this).parents(".directoryViewUlE").each(function () {
                            $(this).attr("style", "display:block;");
                        });
                        //find first dtext and highlight
                        let keyWordLength = searchKeyWord.length;
                        let directoryText = $(this).text();
                        if (keyWordLength > 0) {
                            let keyWordIndex = $(this).text().toLowerCase().indexOf(searchKeyWord);
                            let directoryTextLength = directoryText.length;
                            let html = "";
                            html += directoryText.substring(0, keyWordIndex);
                            html += "<span class=\"dir_highlight\">" + directoryText.substring(keyWordIndex, keyWordIndex + keyWordLength) + "</span>";
                            html += directoryText.substring(directoryText.substring(0, keyWordIndex).length + keyWordLength, directoryTextLength);
                            $(this).html(html);

                            let dummy = $(this).children().eq(0).find(".directory-index-value").text();
                            if (dummy != "") {
                                let htmlForIndex = "<span class=\"dir_highlight\">" + dummy + "</span>";
                                $(this).children().eq(0).find(".directory-index-value").html(htmlForIndex);
                            }

                        }
                    }
                    else {
                        $(this).closest(".element_li").attr("style", "display:none");
                    }
                });
            });
            $('#saveData').hide();
        }
        else if ($(this).parent().find(".desktop-search-wrapper").find(".restrictedSearchBox").hasClass("opacityDull")) {
            $("#saveData").show();

            desktop.find(".directoryViewUlE").attr("style", "display: none;");
            desktop.find(".element_li").attr("style", "display: block;");

            desktop.find(".whiteBgTriangle").each(function () {
                $(this).attr("style", "display:block;");
                var spanElement = $(this).find("span:first");
                spanElement.attr("style", "display:block;");
                spanElement.attr("class", "triangle_deactive fleft");
            });

            desktop.find('.dir_highlight').each(function () {
                $(this).replaceWith($(this).html());
            });
            let searchKeyWord = $(this).val().trim().toLowerCase();
            desktop.find(".element_li").each(function (e) {
                $(this).find(".d-text").each(function (e) {
                    let dtext = $(this);
                    let textMatch = searchForMatchInExpression(dtext, searchKeyWord, desktop);
                    let extra = true;//extraFilterMatch(dtext, backing.searchElements.extraFilter);
                    let IndexMatch = true;
                    if (textMatch && IndexMatch && extra) {
                        //all parent bg_traingels active
                        $(this).parent().parents(".element_li").each(function () {
                            $(this).children(".directoryListItemContainer").each(function () {
                                $(this).children(".whiteBgTriangle").each(function () {
                                    let spanE = $(this).find("span:first");
                                    spanE.attr("class", "triangle_active fleft");
                                });

                            });

                        });
                        //all parent ul's display:block
                        $(this).parents(".directoryViewUlE").each(function () {
                            $(this).attr("style", "display:block;");
                        });
                        //find first dtext and highlight
                        let keyWordLength = searchKeyWord.length;
                        let directoryText = $(this).text();
                        if (keyWordLength > 0) {
                            let keyWordIndex = $(this).text().toLowerCase().indexOf(searchKeyWord);
                            let directoryTextLength = directoryText.length;
                            let html = "";
                            html += directoryText.substring(0, keyWordIndex);
                            html += "<span class=\"dir_highlight\">" + directoryText.substring(keyWordIndex, keyWordIndex + keyWordLength) + "</span>";
                            html += directoryText.substring(directoryText.substring(0, keyWordIndex).length + keyWordLength, directoryTextLength);
                            $(this).html(html);
                            let dummy = $(this).children().eq(0).find(".directory-index-value").text();
                            if (dummy != "") {
                                let htmlForIndex = "<span class=\"dir_highlight\">" + dummy + "</span>";
                                $(this).children().eq(0).find(".directory-index-value").html(htmlForIndex);
                            }

                        }
                    }
                });
            });
            $('#saveData').hide();
        }
    });
});

var searchForMatch = function (element, searchKeyWord, filterObjectType, filterElementTypeId) {
    function searchForMatchInText(text, searchKeyWord) {
        let index = -1;
        if (text)
            index = text.toLowerCase().indexOf(searchKeyWord);
        if (searchKeyWord === "") {
            return true;
        }
        if (index >= 0)
            return true;
        else
            return false;
    }

    function searchMatchInChain(chain, searchKeyWord) {
        if (chain) {
            for (let i = 0; i < chain.length; i++) {
                let paramName = chain[i].name;
                var isMatchFound = searchForMatchInText(paramName, searchKeyWord);
                if (isMatchFound) {
                    return true;
                }
            }
        }
        return false;
    }

    if (element) {
        let acronym;
        let {shieldElementTypeId, name, refId, objectType, odosChain, mdosChain, cdosChain, sdosChain} = element;
        let elementText = name;
        if (shieldElementTypeId) {
            acronym = LookupAcronym(shieldElementTypeId);
        }
        if (acronym && acronym !== null && acronym.length > 0 && refId)
            elementText += ` [${acronym.toUpperCase()}: ${refId}]`;
        else if (acronym && acronym !== null && acronym.length > 0)
            elementText += `[${acronym.toUpperCase()}]`;
        else if (refId)
            elementText += `[${refId}]`;

        let elementElementTypeId = shieldElementTypeId;
        let elementObjectType = objectType;
        if (elementObjectType === constants.objectType.SCE) {
            if (!filterObjectType || (filterObjectType === constants.objectType.SCE)) {
                if (filterElementTypeId) {
                    if (filterElementTypeId == 1) {
                        if (odosChain) {
                            return searchMatchInChain(odosChain, searchKeyWord);
                        }
                    }
                    else if (filterElementTypeId == 2) {
                        if (mdosChain) {
                            return searchMatchInChain(mdosChain, searchKeyWord);
                        }
                    }
                    else if (filterElementTypeId == 3) {
                        if (cdosChain) {
                            return searchMatchInChain(cdosChain, searchKeyWord);
                        }
                    }
                    else if (filterElementTypeId == 4) {
                        if (sdosChain) {
                            return searchMatchInChain(sdosChain, searchKeyWord);
                        }
                    }
                }
                else {
                    let isFound = false;
                    if (odosChain) {
                        isFound = searchMatchInChain(odosChain, searchKeyWord);
                        if (isFound) {
                            return true;
                        }
                    }
                    if (mdosChain) {
                        isFound = searchMatchInChain(mdosChain, searchKeyWord);
                        if (isFound) {
                            return true;
                        }
                    }
                    if (cdosChain) {
                        isFound = searchMatchInChain(cdosChain, searchKeyWord);
                        if (isFound) {
                            return true;
                        }
                    }
                    if (sdosChain) {
                        isFound = searchMatchInChain(sdosChain, searchKeyWord);
                        if (isFound) {
                            return true;
                        }
                    }
                    return false;
                }

            }
        }
        else {
            if (filterObjectType && elementElementTypeId) {
                if ((filterObjectType === elementObjectType) && (filterElementTypeId === elementElementTypeId)) {
                    return searchForMatchInText(elementText, searchKeyWord);
                }
            }
            else if (!filterObjectType || (filterObjectType === elementObjectType)) {
                return searchForMatchInText(elementText, searchKeyWord);
            }
        }
    }
}

function searchForIndexMatch(element, lowIndex, highIndex) {
    let a = 0;
    if (element && (element.index > 0)) {
        a = element.index;
    }
    else if (element && (element.rating > 0)) {
        a = element.rating;
    }
    if (parseFloat(a) >= parseFloat(lowIndex) && parseFloat(a) <= parseFloat(highIndex))
        return true;
    else
        return false;
}

function searchForMatchInExpression(dText, searchKeyWord) {
    let a = dText.text().toLowerCase().indexOf(searchKeyWord);
    if (searchKeyWord === "") {
        return true;
    }
    if (a >= 0)
        return true;
    else
        return false;

}

/*search */
function doesTypeMatchCustomFalseCaseInAnyChild(children, obj) {

    if (children) {
        var len = children.length;
        for (var i = 0; i < len; i++) {
            if (doesTypeMatchCustomFalseCase(children[i], obj))
                return true;
            else if (doesTypeMatchCustomFalseCaseInAnyChild(children[i].children, obj))
                return true;
        }
    }

    return false;
}

function doesTypeMatchCustomTrueCaseForAnyChild(elementLi, dtext, reqParams, childObjectType) {
    return false;
}

function doesChildHaveTypeMatch(element, elementLi, dtext, reqParams) {
    if (typeof reqParams.isHave !== 'undefined' && typeof reqParams.childCustom !== 'undefined') {
        if (!reqParams.childCustom) {
            obj = {};
            obj.objectType = reqParams.childObjectType;
            obj.linkType = reqParams.childLinkType;
            obj.shieldElementTypeId = reqParams.childShieldElementTypeId;
            obj.level = reqParams.childLevel;
            obj.linkName = reqParams.childLinkName;
            //check all children for match customFalseCase
            if (doesTypeMatchCustomFalseCaseInAnyChild(element.children, obj))
                return true;
        }
        else {
            if (reqParams.childObjectType) {
                if (doesTypeMatchCustomTrueCaseForAnyChild(elementLi, dtext, reqParams.childObjectType))
                    return true;
            }
            else
                console.log("childObjectType must be defined for childCustom true");
        }
    }
    else
        console.log("either of isHave, childCustom is undefined");
    return false;
}

function doesTypeMatch(element, elementLi, dtext, completeTypeParams) {
    if (!element || !elementLi || !completeTypeParams || !dtext) {
        console.log("In doesTypeMatch function arguments -- some of the arguments are undefined");
        return false;
    }
    let reqParams = completeTypeParams;
    if (typeof reqParams.custom === 'undefined') {
        console.log("In doesTypeMatch function custom is undefined..");
        return false;
    }

    if (!reqParams.custom) {
        var obj = {};
        obj.objectType = reqParams.objectType;
        obj.linkType = reqParams.linkType;
        obj.linkName = reqParams.linkName;
        obj.shieldElementTypeId = reqParams.shieldElementTypeId;
        obj.level = reqParams.level;
        if (doesTypeMatchCustomFalseCase(element, obj)) {
            if (typeof reqParams.isOneOfHaveNoSelected !== 'undefined' && reqParams.isOneOfHaveNoSelected && typeof reqParams.isHave !== 'undefined') {
                if (reqParams.isHave) {
                    return doesChildHaveTypeMatch(element, elementLi, dtext, reqParams);
                }
                else {
                    if (doesChildHaveTypeMatch(element, elementLi, dtext, reqParams))
                        return false;
                    else
                        return true;
                }
            }
            else
                return true;
        }

    }
    else {
        if (reqParams.objectType) {
            if (doesTypeMatchCustomTrueCase(elementLi, dtext, reqParams.objectType)) {
                if (typeof reqParams.isOneOfHaveNoSelected !== 'undefined' && reqParams.isOneOfHaveNoSelected && typeof reqParams.isHave !== 'undefined') {
                    if (reqParams.isHave) {
                        return doesChildHaveTypeMatch(element, elementLi, dtext, reqParams);
                    }
                    else {
                        if (doesChildHaveTypeMatch(element, elementLi, dtext, reqParams))
                            return false;
                        else
                            return true;
                    }
                }
                else
                    return true;
            }
        }
    }
    return false;
}

function doesTypeMatchCustomTrueCase(elementLi, dtext, styleObjectTypeConstant) {
    let custom = false;
    switch (styleObjectTypeConstant) {
        case "selected":
            if (elementLi.find(".checkbox-map:first").hasClass("flaticon-arrow")) {
                custom = true;
            }
            break;
        case "not_selected":
            if (elementLi.find(".checkbox-map:first").hasClass("flaticon-unlink")) {
                custom = true;
            }
            break;
        case "shall_selected":
            if (elementLi.find(".checkbox-map:first").hasClass("flaticon-gps")) {
                custom = true;
            }
            break;
        case "could_selected":
            if (elementLi.find(".checkbox-map:first").hasClass("flaticon-unchecked-asset")) {
                custom = true;
            }
            break;
        case "unsaved":
            if (elementLi.find(".checkbox-map:first").hasClass("iconShadow")) {
                custom = true;
            }
            break;
    }
    return custom;
}

function doesTypeMatchCustomFalseCase(element, typeParamsObj) {
    if (!element || !typeParamsObj)
        console.log("In doesTypeMatchCustomFalseCase function arguments - either of element, typeParamsObj is undefined in arguments.");

    if (typeParamsObj.objectType && typeParamsObj.shieldElementTypeId) {
        if (element.objectType === constants.objectType.SCE) {
            if (typeParamsObj.shieldElementTypeId == 1) {
                if (element.odosChain)
                    return true;
            }
            else if (typeParamsObj.shieldElementTypeId == 2) {
                if (element.mdosChain)
                    return true;
            } else if (typeParamsObj.shieldElementTypeId == 3) {
                if (element.cdosChain)
                    return true;

            } else if (typeParamsObj.shieldElementTypeId == 4) {
                if (element.sdosChain)
                    return true;
            }
        }
        else if (element.objectType === typeParamsObj.objectType && element.shieldElementTypeId === typeParamsObj.shieldElementTypeId)
            return true;

    }
    else if (typeParamsObj.objectType && typeParamsObj.level) {
        if (element.objectType && element.level && element.objectType === typeParamsObj.objectType && element.level === typeParamsObj.level)
            return true;
    }
    else if (typeParamsObj.objectType) {
        if (element.objectType && element.objectType === typeParamsObj.objectType)
            return true;

    }
    else if (typeParamsObj.linkType && typeParamsObj.linkName) {
        if (element.linkName && element.linkName === typeParamsObj.linkName || doesAnyElementHaveLinkName(element.children, typeParamsObj.linkName))
            return true;
    }
    else
        return true;

    return false;
}

function doesAnyElementHaveLinkName(children, linkName) {
    if (children) {
        for (var i = 0; i < children.length; i++) {
            if (children[i] && children[i].linkName && children[i].linkName === linkName)
                return true;
        }
    }
    return false;
}