function renderTextOfDv(element, IsExpressionChildView, selectedId, idOfParentDiv, isBiview) {
    let objectType = element[ATTR.objectType];
    let returnHtml;
    switch (objectType) {
        case constants.objectType.SCE: {
            returnHtml = renderTextOfAssociationView(element, IsExpressionChildView);
            break;
        }
        case constants.objectType.OBJECTIVE_PARAMETER: {
            returnHtml = getDtextForParameters(element, IsExpressionChildView, selectedId, element[ATTR.odosLevel]);
            break;
        }
        case constants.objectType.METHOD_PARAMETER: {
            returnHtml = getDtextForParameters(element, IsExpressionChildView, selectedId, element[ATTR.mdosLevel]);
            break;
        }
        case constants.objectType.CONTENT_PARAMETER: {
            returnHtml = getDtextForParameters(element, IsExpressionChildView, selectedId, element[ATTR.cdosLevel]);
            break;
        }
        case constants.objectType.SUBJECT_PARAMETER: {
            returnHtml = getDtextForParameters(element, IsExpressionChildView, selectedId, element[ATTR.sdosLevel]);
            break;
        }
        case constants.objectType.SHIELD: {
            returnHtml = getDtextForGeneral(element);
            break;
        }
        case constants.objectType.SHIELD_TYPE: {
            returnHtml = getDtextForGeneral(element);
            break;
        }
        case constants.objectType.SHIELD_ELEMENT_TYPE: {
            returnHtml = getDtextForGeneral(element);
            break;
        }
        case constants.objectType.SHIELD_ELEMENT: {
            returnHtml = getDtextForShieldElement(element, isBiview);
            break;
        }
        case constants.objectType.STANDARD_ELEMENT: {
            returnHtml = getDtextForShieldElement(element, isBiview);
            break;
        }
        case constants.objectType.THREAT_ELEMENT: {
            returnHtml = getDtextForShieldElement(element, isBiview);
            break;
        }
        case constants.objectType.BUSINESS_CONTROL: {
            returnHtml = getDtextForShieldElement(element, isBiview);
            break;
        }
        case constants.objectType.ASSET_TYPE:
        case constants.objectType.BUSINESS_ASSET_TYPE: {
            returnHtml = getDtextForAssetType(element, selectedId, idOfParentDiv, isBiview);
            break;
        }
        case constants.objectType.ASSET:
        case constants.objectType.BUSINESS_ASSET: {
            returnHtml = getDtextForAsset(element, idOfParentDiv, isBiview);
            break;
        }
        case constants.objectType.TECHNICAL_SUPPORT_PEOPLE: {
            returnHtml = getDtextForGeneral(element);
            break;
        }
        case constants.objectType.PROVIDER:
        case constants.objectType.BUSINESS_PROVIDER: {
            returnHtml = getDtextForGeneral(element, selectedId);
            break;
        }
        case constants.objectType.TECHNICAL_SUPPORT_CONTACT_INFO: {
            returnHtml = getDtextForGeneral(element);
            break;
        }
        case constants.objectType.SCE_FULFILLS_SHIELD_ELEMENT_LINK: {
            returnHtml = getDtextForGeneral(element);
            break;
        }
        case constants.objectType.ASSET_TYPE_PROTECTED_BY_SCE_LINK: {
            returnHtml = getDtextForGeneral(element);
            break;
        }
        case constants.objectType.ASSET_DELIVERS_SCE_LINK: {
            returnHtml = getDtextForGeneral(element);
            break;
        }
        default: {
            returnHtml = getDtextForGeneral(element, selectedId);
        }
    }
    return returnHtml;

}

function renderTextOfAssociationView(element, IsExpressionChildView, expandCollapse) {
    function associationString(strObj) {
        let str = "";
        str += "<span class=\"d-text param1\" title=\"Type: " + constants.objectTypLabels["objective_parameter_word"] + " [" + strObj.oChainStr + "]\">" + strObj.oStr + "</span><span class=\"dtext-pipe\"> |</span>" +
            "<span class=\"d-text param2\" title=\"Type: " + constants.objectTypLabels["method_parameter_word"] + " [" + strObj.mChainStr + "]\">" + strObj.mStr + "</span><span class=\"dtext-pipe\"> |</span>" +
            "<span class=\"d-text param3\" title=\"Type: " + constants.objectTypLabels["content_parameter_word"] + " [" + strObj.cChainStr + "]\">" + strObj.cStr + "</span><span class=\"dtext-pipe\"> |</span>" +
            "<span class=\"d-text param4\" title=\"Type: " + constants.objectTypLabels["subject_parameter_word"] + " [" + strObj.sChainStr + "]\">" + strObj.sStr + "</span></span>\n";
        return str;
    }

    let strObj = combineChainElements(element);
    let str = "";
    let color = {};
    color.border = "#000";
    color.bg = "#000";
    color.text = "#000";
    if (IsExpressionChildView) {
        if (element.linkName) {
            str += `<span class="flaticon-arrow fleft" ></span><span class="npr_headng deactive_npr_heading expressionChildViewText" style ="font-style: italic;"><span class="linkDtext" >-${element.linkName}</span>`;
            str += "<span class=\"tooltip flaticon-unmap directory-text-icon unmap-element\"\" uniqueId = \"" + element.uniqueId + "\" title =\"Disassociate\" elementType=\"" + element.objectType + "\" style=\"float:left;margin-top:0\"></span>";
            str += getIconForSce(false, element.objectType, color, element.name, element.level, false);
            str += "<span class=\"associationCollapsed fleft\" style=\"color: #535353;font-weight: bold;\">";
            str += associationString(strObj);
            str += "</span></span>";
            return str;
        }
        else {
            str += "<span class=\"npr_headng deactive_npr_heading expressionChildViewText\" style =\"font-style: italic\">";
            str += "<span class=\"associationCollapsed fleft\">";
            str += associationString(strObj);
            str += "</span></span>";
            return str;
        }
    }
    else if (expandCollapse) {
        str += associationString(strObj);
        return str;
    }
    else {
        if (element.linkName) {
            str += "<span class=\"flaticon-arrow fleft\" ></span><span class=\"npr_headng deactive_npr_heading\" style =\"font-style: italic;\">";
            if (element.linkType && showVerticalLine(element)) {
                str += `<span class="linkDtextVerticalLine"></span><span class="linkDtext">${element.linkName}</span>`;
            }
            else {
                str += `<span class="linkDtext">${element.linkName}</span>`;
            }
            str += "<span class=\"tooltip flaticon-unmap directory-text-icon unmap-element\" uniqueId = \"" + element.uniqueId + "\" title =\"Disassociate\" elementType=\"" + element.objectType + "\" style=\"float:left;margin-top:0\"></span>";
            str += getIconForSce(false, element.objectType, color, element.name, element.level, false);
            str += "<span class=\"associationCollapsed fleft\" style=\"color: #535353;font-weight: bold;\">";
            str += associationString(strObj);
            str += "</span></span>";
            return str;
        }
        else {
            str += "<span class=\"npr_headng deactive_npr_heading\" style =\"font-style: italic\">";
            str += "<span class=\"associationCollapsed fleft\">";
            str += associationString(strObj);
            str += "</span></span>";
            return str;
        }
    }

}

function renderTextOfAssociationViewTable(element, IsExpressionChildView, expandCollapse) {
    function associationString(strObj) {
        let str = "";
        str += "<div><span class=\"d-text-label d-text\">perform</span><span class=\"d-text param1 assoParam\" title=\"Type: " + constants.objectTypLabels["objective_parameter_word"] + " [" + strObj.oChainStr + "]\">" + strObj.oChainStr + "</span></div>" +
            "<div><span class=\"d-text-label d-text\">using</span><span class=\"d-text param2 assoParam\" title=\"Type: " + constants.objectTypLabels["method_parameter_word"] + " [" + strObj.mChainStr + "]\">" + strObj.mChainStr + "</span></div>" +
            "<div><span><span class=\"d-text-label d-text\">to protect</span></span><span class=\"d-text param3 assoParam\" title=\"Type: " + constants.objectTypLabels["content_parameter_word"] + " [" + strObj.cChainStr + "]\">" + strObj.cChainStr + "</span></div>" +
            "<div><span class=\"d-text-label d-text\">on</span></span><span class=\"d-text param4 assoParam\" title=\"Type: " + constants.objectTypLabels["subject_parameter_word"] + " [" + strObj.sChainStr + "]\">" + strObj.sChainStr + "</span></div>";
        return str;
    }

    let strObj = combineChainElements(element);
    let str = "";
    if (IsExpressionChildView) {
        if (element.linkName) {
            str += "<span class=\"flaticon-arrow fleft\" ></span><span class=\"npr_headng deactive_npr_heading expressionChildViewText\" style =\"font-style: italic\">" +
                `<span class="linkDtext" >-${element.linkName}</span>`;
            str += "<span class=\"associationCollapsed expand fleft\" style=\"color: #535353;font-weight: bold;\">";
            str += associationString(strObj);
            str += "</span></span>";
            return str;
        }
        else {
            str += "<span class=\"npr_headng deactive_npr_heading expressionChildViewText\" style =\"font-style: italic\">";
            str += "<span class=\"associationCollapsed expand fleft\">";
            str += associationString(strObj);
            str += "</span></span>";
            return str;
        }
    }
    else if (expandCollapse) {
        str += associationString(strObj);
        return str;

    }
    else {
        if (element.linkName) {
            str += "<span class=\"flaticon-arrow fleft\" ></span><span class=\"npr_headng deactive_npr_heading assocView\" style =\"font-style: italic\">";
            if (element.linkType && showVerticalLine(element)) {
                str += `<span class="linkDtextVerticalLine"></span><span class="linkDtext">${element.linkName}</span>`;
            }
            else {
                str += `<span class="linkDtext">${element.linkName}</span>`;
            }
            str += "<span class=\"associationCollapsed expand fleft\" style=\"color: #535353;font-weight: bold;\">";
            str += associationString(strObj);
            str += "</span></span>";
            return str;
        }
        else {
            str += "<span class=\"npr_headng deactive_npr_heading assocView\" style =\"font-style: italic\">";
            str += "<span class=\"associationCollapsed expand fleft\">";
            str += associationString(strObj);
            str += "</span></span>";
            return str;
        }
    }
}

function createChainHighlight(element, searchKeyWord, high) {
    function getHighlightString(text, searchKeyWord, high) {
        let keyWordLength = searchKeyWord.length;
        let keyWordIndex = text.toLowerCase().indexOf(searchKeyWord);
        if (keyWordLength > 0 && keyWordIndex >= 0) {
            let directoryTextLength = text.length;
            let html = "";
            let temp = text.substring(0, keyWordIndex);
            html += temp;
            html += "<span class=\"dir_highlight\">" + text.substring(keyWordIndex, keyWordIndex + keyWordLength) + "</span>";
            html += text.substring(temp.length + keyWordLength, directoryTextLength);
            return html;
        }
        if (keyWordLength === 0 && high && keyWordIndex >= 0) {
            let html = "";
            html += "<span class=\"dir_highlight\">" + text + "</span>";
            return html;
        }
        else {
            return text;
        }
    }

    function getHighlightForColon(elements, searchKeyWord) {
        let last = (elements.length - 1);
        let isMatched = false;
        if (searchKeyWord.length > 0) {
            for (let i = 1; i < last; i++) {
                let keyWordIndex = elements[i].name.toLowerCase().indexOf(searchKeyWord);
                if (keyWordIndex >= 0) {
                    isMatched = true;
                    break;
                }
            }
        }
        if (isMatched) {
            return "<span class=\"dir_highlight\">..</span>";
        }
        return "..";
    }

    let length = element.length;
    let strVar = "";
    if (length === 1) {
        strVar = getHighlightString(element[0].name, searchKeyWord, high);
    }
    else if (length === 2) {
        strVar = getHighlightString(element[0].name, searchKeyWord, high) + " : " + getHighlightString(element[1].name, searchKeyWord, high);
    }
    else {
        strVar = getHighlightString(element[0].name, searchKeyWord, high);
        strVar += getHighlightForColon(element, searchKeyWord, high);
        strVar += getHighlightString(element[length - 1].name, searchKeyWord, high);
    }
    return strVar;
}

function createChainHighlightAssoc(element, searchKeyWord, high) {
    function getHighlightString(text, searchKeyWord, high) {
        let keyWordLength = searchKeyWord.length;
        let keyWordIndex = text.toLowerCase().indexOf(searchKeyWord);
        if (keyWordLength > 0 && keyWordIndex >= 0) {
            let directoryTextLength = text.length;
            let html = "";
            let temp = text.substring(0, keyWordIndex);
            html += temp;
            html += "<span class=\"dir_highlight\">" + text.substring(keyWordIndex, keyWordIndex + keyWordLength) + "</span>";
            html += text.substring(temp.length + keyWordLength, directoryTextLength);
            return html;
        }
        if (keyWordLength === 0 && high && keyWordIndex >= 0) {
            let html = "";
            html += "<span class=\"dir_highlight\">" + text + "</span>";
            return html;
        }
        else {
            return text;
        }
    }

    let length = element.length;
    let strVar = "";
    if (length > 1) {
        for (let i = 0; i < element.length; i++) {
            strVar += getHighlightString(element[i].name, searchKeyWord, high);
            if (i < element.length - 1) {
                strVar += " : ";
            }
        }
    }
    else if (length === 1) {
        strVar += getHighlightString(element[0].name, searchKeyWord, high);
    }
    return strVar;
}

function combineChainElements(element) {
    let str = "";
    let oStr = "";
    let oChainStr = "";
    let mStr = "";
    let mChainStr = "";
    let cStr = "";
    let cChainStr = "";
    let sStr = "";
    let sChainStr = "";
    let fullStr = "";

    function createChain(element) {
        let length = element.length;
        let strVar = "";
        if (length > 2) {
            strVar = element[0].name + ".." + element[length - 1].name;
        }
        else if (length === 1) {
            strVar = element[0].name;
        }
        else if (length === 2) {
            strVar = element[0].name + " : " + element[1].name;
        }
        return strVar;
    }

    function createChainString(element) {
        let chainStr = "";
        for (let i = 0; i < element.length; i++) {
            chainStr += element[i].name;
            if (i < (element.length - 1)) {
                chainStr += " : ";
            }
        }
        return chainStr;

    }

    if (element.odosChain && element.odosChain.length >= 1) {
        oStr += createChain(element.odosChain);
        oChainStr += createChainString(element.odosChain);
    }
    else {
        oStr += "NA";
        oChainStr += "NA";
    }
    if (element.mdosChain && element.mdosChain.length >= 1) {
        mStr += createChain(element.mdosChain);
        mChainStr += createChainString(element.mdosChain);
    }
    else {
        mStr += "NA";
        mChainStr += "NA";
    }
    if (element.cdosChain && element.cdosChain.length >= 1) {
        cStr += createChain(element.cdosChain);
        cChainStr += createChainString(element.cdosChain);
    }
    else {
        cStr += "NA";
        cChainStr += "NA";
    }
    if (element.sdosChain && element.sdosChain.length >= 1) {
        sStr += createChain(element.sdosChain);
        sChainStr += createChainString(element.sdosChain);
    }
    else {
        sStr += "NA";
        sChainStr += "NA";
    }
    str += oStr + "   |   " + mStr + "   |   " + cStr + "   |   " + sStr;
    fullStr += oChainStr + "   |   " + mChainStr + "   |   " + cChainStr + "   |   " + sChainStr;
    let strObj = {
        str: str,
        oStr: oStr,
        oChainStr: oChainStr,
        cStr: cStr,
        cChainStr: cChainStr,
        mStr: mStr,
        mChainStr: mChainStr,
        sStr: sStr,
        sChainStr: sChainStr,
        fullStr: fullStr
    };

    return strObj;
}

function renderTextOfDataViewDv(element) {
    let objectType = element[ATTR.objectType];
    if (objectType.endsWith("_root")) {
        return getDtextForGeneralDataView(element);
    }
    else {
        return renderTextOfDv(element);
    }
}

function getDtextForGeneralDataView(element) {
    return "<span class=\"npr_headng deactive_npr_heading d-text\" style=\"font-weight: bold; color: #535353;\" id=\"" + element[ATTR.elementId] + "\">" + element[ATTR.name] + "</span>\n";
}

function getDtextForGeneral(element, selectedOrgId) {
    let str = "";
    let elementAcronym;
    let activeClass = "", source;
    if (selectedOrgId && selectedOrgId === element.elementId) {
        activeClass = "active";
    }
    str += `<span class="npr_headng deactive_npr_heading d-text ${activeClass}" id="${element[ATTR.elementId]}">${element[ATTR.name]}`;
    if (typeof (element.sourceName) != "undefined") {
        source = (element.sourceName === "") ? "Default" : element.sourceName;
        str += `<span> [${source}]</span>`;
    }
    str += `</span>`;
    if (element && element.refId) {
            if (element.shieldElementTypeId) {
                elementAcronym = LookupAcronym(element.shieldElementTypeId);
            }
            if (elementAcronym && elementAcronym !== null && elementAcronym.length > 0)
                str += `<span class="d-text-refId"> [${elementAcronym.toUpperCase()}: ${element.refId}]</span>`;
            else
                str += `<span class="d-text-refId"> [${element.refId}]</span>`;
        }
    return str;
}

function getDtextForShieldElement(element, isBiview) {
    let str = "";
    let elementAcronym, isGroupElement = false, activeClass = "";
    let color;
    if (element.index || element.rating || element.index >= 0 || element.rating >= 0) {
        color = getIconColor(element, isBiview);
    }
    else {
        color = {};
        color.border = "#000";
        color.bg = "#000";
        color.text = "#000";
    }
    if (element.booleanFlags)
        isGroupElement = getTrueOrFalse(element.booleanFlags, 1);
    if (isGroupElement)
        activeClass = "groupHighLight";
    if (element.linkName) {
        if (element.refId && element.refId.trim() !== "") {
            str += `<span class="flaticon-arrow fleft" ></span><span class="npr_headng deactive_npr_heading" style ="font-style: italic">`;
            if (element.linkType && showVerticalLine(element)) {
                str += `<span class="linkDtextVerticalLine"></span><span class="linkDtext">${element.linkName}</span>`;
            }
            else {
                str += `<span class="linkDtext">${element.linkName}</span>`;
            }
            str += `<span class="tooltip flaticon-unmap directory-text-icon unmap-element" uniqueId = "${element.uniqueId}" title ="Disassociate" elementType="${element.objectType}"></span>`;
            str += getIconForElement(element.objectType, color, element, "flaticon-fontSize12", false);
            if (element.shieldElementTypeId) {
                elementAcronym = LookupAcronym(element.shieldElementTypeId);
            }
            if (elementAcronym && elementAcronym !== null && elementAcronym.length > 0)
                str += `<span class="d-text" id="${element[ATTR.elementId]}" style="color: #535353;font-weight: bold;">${element[ATTR.name]}</span><span class="d-text-refId"> [${elementAcronym.toUpperCase()}: ${element.refId}]</span></span>\n`;
            else
                str += `<span class="d-text" id="${element[ATTR.elementId]}" style="color: #535353;font-weight: bold;">${element[ATTR.name]}</span><span class="d-text-refId"> [${element.refId}]</span></span>\n`;
            return str;
        }
        str += `<span class="flaticon-arrow fleft" ></span><span class="npr_headng deactive_npr_heading" style ="font-style: italic">`;
        if (element.linkType && showVerticalLine(element)) {
            str += `<span class="linkDtextVerticalLine"></span><span class="linkDtext">${element.linkName}</span>`;
        }
        else {
            str += `<span class="linkDtext">${element.linkName}</span>`;
        }
        str += `<span class="tooltip flaticon-unmap directory-text-icon unmap-element" uniqueId = "${element.uniqueId}" title ="Disassociate" elementType="${element.objectType}"></span>`;
        str += getIconForElement(element.objectType, color, element, "flaticon-fontSize12", false);
        str += `<span class="d-text" id="${element[ATTR.elementId]}" style="color: #535353;font-weight: bold;">${element[ATTR.name]}</span></span>\n`;
        return str;
    }
    else {
        if (element.refId && element.refId.trim() !== "") {
            if (element.shieldElementTypeId) {
                elementAcronym = LookupAcronym(element.shieldElementTypeId);
            }
            if (elementAcronym && elementAcronym !== null && elementAcronym.length > 0)
                return `<span class="npr_headng deactive_npr_heading d-text ${activeClass}" id="${element[ATTR.elementId]}" shieldElementTypeId="${element.shieldElementTypeId}">${element[ATTR.name]}</span><span class="d-text-refId"> [${elementAcronym.toUpperCase()}: ${element.refId}]</span></span>\n`;
            else
                return `<span class="npr_headng deactive_npr_heading d-text ${activeClass}" id="${element[ATTR.elementId]}" shieldElementTypeId="${element.shieldElementTypeId}">${element[ATTR.name]}</span><span class="d-text-refId"> [${element.refId}]</span></span>\n`;
        }
        return `<span class="npr_headng deactive_npr_heading d-text ${activeClass}" id="${element[ATTR.elementId]}" shieldElementTypeId="${element.shieldElementTypeId}">${element[ATTR.name]}</span>\n`;
    }
}

function getDtextForAsset(element, idOfParentDiv, isBiview) {
    let str = "";
    let color;
    if (element.index || element.rating || element.index >= 0 || element.rating >= 0) {
        color = getIconColor(element, isBiview);
    }
    else {
        color = {};
        color.border = "#000";
        color.bg = "#000";
        color.text = "#000";
    }
    if (element.linkName) {
        str += "<span class=\"flaticon-arrow fleft\" ></span><span class=\"npr_headng deactive_npr_heading\" style =\"font-style: italic\">";
        if (element.linkType && showVerticalLine(element)) {
            str += `<span class="linkDtextVerticalLine"></span><span class="linkDtext">${element.linkName}</span>`;
        }
        else {
            str += `<span class="linkDtext">${element.linkName}</span>`;
        }
        str += renderEvaluationHotlink(element, idOfParentDiv, isBiview);
        str += "<span class=\"tooltip flaticon-unmap directory-text-icon unmap-element\" uniqueId = \"" + element.uniqueId + "\" title =\"Disassociate\" elementType=\"" + element.objectType + "\"></span>";
        str += getIconForElement(element.objectType, color, element, "flaticon-elementType", false);
        str += "<span class=\"d-text\" id=\"" + element[ATTR.elementId] + "\" style=\"color: #535353;font-weight: bold;\">" + element[ATTR.name] + "</span></span>\n";
        return str;
    }
    else {
        return "<span class=\"npr_headng deactive_npr_heading d-text\" id=\"" + element[ATTR.elementId] + "\">" + element[ATTR.name] + "</span>\n";
    }
}

function getDtextForAssetType(element, selectedId, idOfParentDiv, isBiview) {
    let str = "", isActive = "";
    let color;
    if (element.index || element.rating || element.index >= 0 || element.rating >= 0) {
        color = getIconColor(element, isBiview);
    }
    else {
        color = {};
        color.border = "#000";
        color.bg = "#000";
        color.text = "#000";
    }
    if (selectedId && element.elementId === selectedId) {
        isActive = "active";
    }
    if (element.linkName) {
        str += `<span class="flaticon-arrow fleft"></span><span class="npr_headng deactive_npr_heading" style ="font-style: italic">`;
        if (element.linkType && showVerticalLine(element)) {
            str += `<span class="linkDtextVerticalLine"></span><span class="linkDtext">${element.linkName}</span>`;
        }
        else {
            str += `<span class="linkDtext">${element.linkName}</span>`;
        }
        str += `<span class="tooltip flaticon-unmap directory-text-icon unmap-element" uniqueId = "${element.uniqueId}" title ="Disassociate" elementType="${element.objectType}"></span>`;
        str += renderEvaluationHotlink(element, idOfParentDiv, isBiview);
        str += getIconForElement(element.objectType, color, element, "flaticon-elementType", false);
        str += `<span class="d-text ${isActive}" id="${element[ATTR.elementId]}" style="color: #535353;font-weight: bold;">${element[ATTR.name]}</span></span>\n`;
        return str;
    }
    else {
        return `<span class="npr_headng deactive_npr_heading d-text ${isActive}" id="${element[ATTR.elementId]}">${element[ATTR.name]}</span>\n`;
    }
}

function renderTextOfExpressionDv(element) {
    return "<span class=\"npr_headng deactive_npr_heading d-text\" id=\"" + element[ATTR.elementId] + "\">" + element.name + "</span>\n";
}

function getDtextForParameters(element, IsExpressionChildView, selectedId, parameterLevel) {
    function helperFuncton(expressionChildViewText = "", selected = "", active = "") {
        if (typeof parameterLevel !== "undefined")
            return `<span class="npr_headng deactive_npr_heading d-text ${expressionChildViewText} ${selected} ${active}" id="${element[ATTR.elementId]}">${element[ATTR.name]}<sub class="boldSubscript">${parameterLevel}</sub></span>\n`;
        else
            return `<span class="npr_headng deactive_npr_heading d-text ${expressionChildViewText} ${selected} ${active}" id=${element[ATTR.elementId]}>${element[ATTR.name]}</span>\n`;
    }

    if (element.elementId === selectedId) {
        if (IsExpressionChildView) {
            //helperFuncton(element,parameterLevel,expressionChildViewText,selected,active);
            return helperFuncton("expressionChildViewText", "selected", "active");
        }
        else {
            return helperFuncton();
        }
    }
    else {
        if (IsExpressionChildView) {
            return helperFuncton("expressionChildViewText");
        }
        else {
            return helperFuncton();
        }
    }
}

function renderCircleOrSquareInventoryDv(element, isBiview, ringView, isHeader, ratingDataView) {
    let objectType = (element[ATTR.objectType]) ? element[ATTR.objectType] : element.objectTypeForIcon;
    let returnHtml = "";
    let type;
    let color = {};
    if (isHeader === true) {
        color = {};
        color.border = "#000";
        color.bg = "#000";
        color.text = "#000";
    }
    else
        color = getIconColor(element, isBiview, ringView);
    if (objectType && objectType.endsWith("_root")) {
        return "<span></span>";
    }
    else if (ratingDataView) {
        return getIconForElement(objectType, color, undefined, "flaticon-elementType");
    }
    else {
        switch (objectType) {
            case constants.objectType.SHIELD: {
                returnHtml = getIconForElement(objectType, color, element, "flaticon-fontSize10");
                break;
            }
            case constants.objectType.SHIELD_ELEMENT: {
                type = "Type : Shield Element";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-fontSize12", element.linkName, isHeader);
                break;
            }
            case constants.objectType.SHIELD_ELEMENT_TYPE: {
                type = "Type : Shield Element Type";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-fontSize12");
                break;
            }
            case constants.objectType.STANDARD: {
                returnHtml = getIconForElement(objectType, color, element, "flaticon-fontSize10");
                break;
            }
            case constants.objectType.STANDARD_ELEMENT_TYPE: {
                type = "Type : Standard Element Type";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-fontSize12");
                break;
            }
            case constants.objectType.STANDARD_ELEMENT: {
                type = "Type : Standard Element";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-fontSize12", element.linkName, isHeader);
                break;
            }
            case constants.objectType.THREAT: {
                type = "Type : Threat Framework";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-fontSize10");
                break;
            }
            case constants.objectType.THREAT_ELEMENT_TYPE: {
                type = "Type : Threat Vector Type";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-fontSize12");
                break;
            }
            case constants.objectType.THREAT_ELEMENT: {
                type = "Type : Threat Vector";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-fontSize12", element.linkName, isHeader);
                break;
            }
            case constants.objectType.BUSINESS: {
                type = "Type : Value Process Framework";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-fontSize10");
                break;
            }
            case constants.objectType.BUSINESS_CONTROL: {
                type = "Type : Value Process";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-fontSize12", element.linkName, isHeader);
                break;
            }
            case constants.objectType.BUSINESS_CONTROL_TYPE: {
                type = "Type : Value Process Type";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-fontSize12");
                break;
            }
            case constants.objectType.OBJECTIVE_PARAMETER: {
                type = "Type : Objective Parameter";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-fontSize11");
                break;
            }
            case constants.objectType.METHOD_PARAMETER: {
                type = "Type : Method Parameter";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-fontSize11");
                break;
            }
            case constants.objectType.CONTENT_PARAMETER: {
                type = "Type : Content Paramter";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-fontSize11");
                break;
            }
            case constants.objectType.SUBJECT_PARAMETER: {
                type = "Type : Subject Paramter";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-fontSize10");
                break;
            }
            case constants.objectType.ORGANIZATIONAL_UNIT: {
                type = "Type : Organizational Unit";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-fontSize11");
                break;
            }
            case constants.objectType.ASSET_TYPE:
            case constants.objectType.BUSINESS_ASSET_TYPE: {
                type = "Type : Asset Type";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-elementType", element.linkName, isHeader);
                break;
            }
            case constants.objectType.ASSET:
            case constants.objectType.BUSINESS_ASSET: {
                type = "Type : Asset";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-elementType", element.linkName, isHeader);
                break;
            }
            case constants.objectType.PROVIDER:
            case constants.objectType.BUSINESS_PROVIDER: {
                type = "Type : Provider";
                returnHtml = getIconForElement(objectType, color, element, "flaticon-elementType");
                break;
            }
            case constants.objectType.SCE: {
                type = "Type : SCE";
                var strVar = combineChainElements(element);
                returnHtml = getIconForSce(isHeader, objectType, color, strVar.fullStr, element.level, element.linkName);
                break;
            }
            case constants.objectType.PERSPECTIVE: {
                type = "Type : Perspective";
                returnHtml = getIconForElement(objectType, color, undefined, "perspectiveIcon");
                break;
            }
            case constants.objectType.ARTIFACT: {
                type = "Type : artifact";
                returnHtml = getIconForArtifact(objectType, color, element);
                break;
            }
            case constants.objectType.ASSET_DELIVERS_ATTRIBUTE:
            case constants.objectType.SHIELD_ELEMENT_ATTRIBUTE: {
                type = "Type : Perspective_attribute";
                returnHtml = getIconForElement(objectType, color, undefined, "flaticon-elementType");
                break;
            }
            case constants.objectType.ROLE: {
                type = "Type : Role";
                returnHtml = getIconForElement(objectType, color, undefined, "flaticon-elementType");
                break;
            }
            case constants.objectType.USER: {
                type = "Type : User";
                returnHtml = getIconForElement(objectType, color, undefined, "flaticon-fontSize11");
                break;
            }
            case constants.objectType.GUIDANCE: {
                type = "Type : Guidance";
                returnHtml = getIconForElement(objectType, color, undefined, "flaticon-elementType");
                break;
            }
            case constants.objectType.TEST_PROCEDURE: {
                type = "Type : Test Procedure";
                returnHtml = getIconForElement(objectType, color, undefined, "flaticon-elementType");
                break;
            }
            case constants.objectType.SOURCE: {
                type = "Type : Source";
                returnHtml = getIconForElement(objectType, color, undefined, "flaticon-elementType");
                break;
            }
            default: {
                returnHtml = "<span></span>";
            }
        }
        return returnHtml;
    }
}

const getIconForElement = function (objectType, color, element, classParam, isHavingLink, isHeader) {
    let elementLevel = "", elementAcronym = "";
    if (element) {
        elementLevel = (element.level !== undefined) ? element.level : "";
        if (element.shieldElementTypeId) {
            elementLevel = LookupLevel(element.shieldElementTypeId);
            elementAcronym = LookupAcronym(element.shieldElementTypeId);
        }
    }
    if (!isHavingLink) {
        if (color)
            return `<span style="color: ${color.bg}" title="Type: ${constants.objectTypLabels[objectType]}" class="${backing.object_type[objectType].icon} ${classParam} tooltip tooltipstered levelNum" levelNum="${elementLevel}"></span>`;
        return `<span title="Type: ${constants.objectTypLabels[objectType]}" class="${backing.object_type[objectType].icon} ${classParam} tooltip tooltipstered levelNum"  levelNum="${elementLevel}"></span>`;
    }
    else if (isHeader) {
        if (color)
            return `<span style="color: ${color.bg}" title="Type: ${constants.objectTypLabels[objectType]}" class="${backing.object_type[objectType].icon} ${classParam} tooltip tooltipstered levelNum" levelNum="${elementLevel}"></span>`;
        return `<span title="Type: ${constants.objectTypLabels[objectType]}" class="${backing.object_type[objectType].icon} ${classParam} tooltip tooltipstered levelNum"  levelNum="${elementLevel}"></span>`;
    }
    else {
        return `<span></span>`;
    }

};

const getIconForShieldStandardElement = function (element, color) {
    let classParam = "flaticon-fontSize11";
    if (element.shieldTypeName === "Shield") {
        return `<span style="color: ${color.bg}" title="Type: ${constants.objectTypLabels["shield"]}" class="${backing.object_type["shield"].icon} ${classParam} tooltip tooltipstered levelNum"></span>`;
    }
    else if (element.shieldTypeName === "Standard") {
        return `<span style="color: ${color.bg}" title="Type: ${constants.objectTypLabels["standard"]}" class="${backing.object_type["standard"].icon} ${classParam} tooltip tooltipstered levelNum"></span>`;
    }
    else if (element.shieldTypeName === "BusinessFrameworks") {
        return `<span style="color: ${color.bg}" title="Type: ${constants.objectTypLabels["threat"]}" class="${backing.object_type["threat"].icon} ${classParam} tooltip tooltipstered levelNum"></span>`;
    }
    else if (element.shieldTypeName === "Threat") {
        return `<span style="color: ${color.bg}" title="Type: ${constants.objectTypLabels["b_framework"]}" class="${backing.object_type["b_framework"].icon} ${classParam} tooltip tooltipstered levelNum"></span>`;
    }
    else {
        return `<span></span>`;
    }
};

const getIconForArtifact = function (objectType, color, element) {
    if (color)
        return "<a style=\"color:" + color.bg + "\" title=\"" + element.fileName + "\" class=\"flaticon-file-download\" href=\"/rest/artifact/download/" + element.elementId + "\"></a>";

    return "<a title=\"" + element.fileName + "\" class=\"flaticon-file-download\" href=\"/rest/artifact/download/" + element.elementId + "\"></span>";
};

const getIconForSce = function (isHeader, objectType, color, name, level, isHavingLink) {
    let elementLevel;
    if (!isHavingLink || isHeader === true) {
        if (level !== undefined)
            elementLevel = level;
        else
            elementLevel = "";
        if (isHeader === true) {
            if (color)
                return "<span style=\"color:" + color.bg + "\" title=\"Type: " + constants.objectTypLabels[objectType] + " [" + name + "]\" class=\"flaticon-expression-element flaticon-fontSize11 tooltip tooltipstered levelNum\" levelNum=\"" + elementLevel + "\"></span>";

            return "<span title=\"Type: " + constants.objectTypLabels[objectType] + "\" class=\"flaticon-expression-element flaticon-fontSize11 tooltip tooltipstered levelNum\" levelNum=\"" + elementLevel + "\"></span>";

        }
        else {
            if (color)
                return "<span style=\"color:" + color.bg + "\" title=\"Type: " + constants.objectTypLabels[objectType] + " [" + name + "]\" class=\"flaticon-expression-element flaticon-fontSize11 tooltip tooltipstered levelNum fleft\" levelNum=\"" + elementLevel + "\"></span>";

            return "<span title=\"Type: " + constants.objectTypLabels[objectType] + "\" class=\"flaticon-expression-element flaticon-fontSize11 tooltip tooltipstered levelNum fleft\" levelNum=\"" + elementLevel + "\"></span>";
        }
    }
    else {
        return `<span></span>`;
    }
};

const renderLabelForDv = function (associationType, view, isBiview) {
    let label = constants.association_labels[associationType];
    if (!associationType.includes('exp')) {
        let activeDesktop = getActiveDesktop(isBiview, view);
        let activeDesktopKey = activeDesktop.key;
        if (activeDesktopKey === "classification_map_mode_desktop"
        || activeDesktopKey === "standard_map_mode_desktop"
        || activeDesktopKey === "business_map_mode_desktop"
        || activeDesktopKey === "threat_map_mode_desktop"
        || activeDesktopKey === "asset_type_map_mode_desktop"
        || activeDesktopKey === "asset_map_mode_desktop"
        || activeDesktopKey === "business_asset_type_map_mode_desktop"
        || activeDesktopKey === "business_asset_map_mode_desktop") {
            let objectType1 = "";
            switch (activeDesktopKey) {
                case "classification_map_mode_desktop":
                    objectType1 = backing.object_type.shield_element.key;
                    break;
                case "standard_map_mode_desktop":
                    objectType1 = backing.object_type.standard_element.key;
                    break;
                case "business_map_mode_desktop":
                    objectType1 = backing.object_type.b_control.key;
                    break;
                case "threat_map_mode_desktop":
                    objectType1 = backing.object_type.threat_element.key;
                    break;
                case "asset_type_map_mode_desktop":
                    objectType1 = backing.object_type.asset_type.key;
                    break;
                case "asset_map_mode_desktop":
                    objectType1 = backing.object_type.asset.key;
                    break;
                case "business_asset_type_map_mode_desktop":
                    objectType1 = backing.object_type.business_asset_type.key;
                    break;
                case "business_asset_map_mode_desktop":
                    objectType1 = backing.object_type.business_asset.key;
                    break;
            }
            let protectionTypeSelector = $("#" + activeDesktop.selector.expression_dropdown_selected_id).attr("objectType");
            let objectType2 = "";
            switch (protectionTypeSelector) {
                case "asset" :
                    objectType2 = backing.object_type.asset.key;
                    break;
                case "business_asset" : {
                    objectType2 = backing.object_type.business_asset.key;
                    break;
                }
                case "asset_type":
                    objectType2 = backing.object_type.asset_type.key;
                    break;
                case "business_asset_type" : { //linkToAssetType Hotlink for circle
                    objectType2 = backing.object_type.business_asset_type.key;
                    break;
                }
                case "shield": { //linkToInternalControl Hotlink for circle
                    objectType2 = backing.object_type.shield_element.key;
                    break;
                }
                case "standard": { //linkToExternalControl hotlink for circle
                    objectType2 = backing.object_type.standard_element.key;
                    break;
                }
                case "b_framework": { //linkToExternalControl hotlink for circle
                    objectType2 = backing.object_type.b_control.key;
                    break;
                }
                case "threat": { //linkToExternalControl hotlink for circle
                    objectType2 = backing.object_type.threat_element.key;
                    break;
                }
            }
            if (objectType1 && objectType2) {
                label = getLinkName(objectType1, objectType2);
            }
        }
    }
    return `<span class="linkDtext">${label}</span>\n`;
};

function brightness(r, g, b) {
    return (r * 299 + g * 587 + b * 114) / 1000
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getContrastColor(color) {
    let hexBg = hexToRgb(color);
    let br;
    if (hexBg)
        br = brightness(hexBg.r, hexBg.g, hexBg.b);
    if (br < 123) {
        return "#fff";
    }
    else {
        return "#000";
    }
}

function getIconColor(obj, isBiview, isRingView) {
    let color = {};
    let perspectiveColor, perspectiveSelected;
    let activeWorkspaceKeyname, activeDesktopKeyname, activeDesktop;
    if (isBiview) {
        activeWorkspaceKeyname = backing.biview.active_workspace_keyname;
        activeDesktopKeyname = backing.biview.active_desktop.keyname;
        activeDesktop = getBiActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
    }
    else {
        activeWorkspaceKeyname = backing.singleview.active_workspace_keyname;
        activeDesktopKeyname = backing.singleview.active_desktop.keyname;
        activeDesktop = getSingleActiveDesktop(activeWorkspaceKeyname, activeDesktopKeyname);
    }
    if (isRingView === "ringView" || activeWorkspaceKeyname === "eval_workspace" || activeWorkspaceKeyname === "bi_eval_workspace") {
        if (obj.index || obj.rating || obj.index >= 0 || obj.rating >= 0) {
            let index = 0;
            if (obj.index > 0) {
                index = obj.index;
            }
            else if (obj.rating > 0) {
                index = obj.rating;
            }
            if ($("#" + activeDesktop.anchor_div_id).find(".desktop-perspective-selector-container .compositePerspectiveSelection").hasClass("active")) {
                perspectiveColor = $("#" + activeDesktop.anchor_div_id).find(".desktop-perspective-selector-container .compositeColorPicker").val();
            }
            else {
                perspectiveSelected = getPerspectiveInSelection(isBiview);
                perspectiveColor = perspectiveSelected.selectedPerspective.color;
            }
            if (index === 0) {
                color.border = "#000";
                color.bg = "#A6A6A6";
                color.text = "#fff";
                return color;
            }
            else {
                let percent = (1 - (index).toFixed(1));
                let f = parseInt(perspectiveColor.slice(1), 16), t = percent < 0 ? 0 : 255,
                    p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
                color.border = "#000";
                if (activeDesktop.trafficModeSelection === true)
                    color.bg = getFillColorForTrafficMode(obj);
                else
                    color.bg = "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
                color.text = getContrastColor(color.bg);

                return color;
            }
        }
        else if (activeWorkspaceKeyname === "eval_workspace" || activeWorkspaceKeyname === "bi_eval_workspace") {
            color.border = "#000";
            color.bg = "#000";
            color.text = "#fff";
            return color;
        }
    }
    else {
        color.border = "#000";
        color.bg = "#000";
        color.text = "#000";
        return color;
    }
}
