function renderCustomAlert(res, msg, viewClass) {
    let str = "";
    let viewName = "popOverlay";
    str += "<div id=\"" + viewName + "\" class=\"innerDesktop childviewDesktop\" view=\"" + viewClass + "\">" +
        "<div class=\"panel-header-container " + viewClass + "\">";
    str += "<span class=\"panel-header\">" + msg + "</span>";
    str += "<span class=\"rgtnavdfstage_build_workbench_close tooltip tooltipstered close-btn closePopUp\" title=\"Close\">" +
        "<span class=\"ss-cancel\" style=\"font-size: 11px;\"></span>" +
        "</span>" +
        "</div><div class=\"alertMsgWrapper\"><div class=\"alertMsgHeading\">" + msg;
    let keysOfDebugInfo = Object.keys(res.debugInfo);
    if ((res.debugInfo[keysOfDebugInfo[0]] && res.debugInfo[keysOfDebugInfo[0]].length > 0) || (res.debugInfo[keysOfDebugInfo[1]] && res.debugInfo[keysOfDebugInfo[1]].length > 0) || (res.debugInfo[keysOfDebugInfo[2]] && res.debugInfo[keysOfDebugInfo[2]].length > 0))
        str += " with below ignored inconsistent excel entries";
    str += "</div>";
    if (res.debugInfo) {
        let keysOfDebugInfo = Object.keys(res.debugInfo);
        for (let i = 0; i < keysOfDebugInfo.length; i++) {
            if (res.debugInfo[keysOfDebugInfo[i]].length > 0) {
                str += "<div class=\"dataView-directoryView\">" +
                    "<div class=\"tree_structure_parent tree_structure_parent_dataView\">" +
                    "<ul class=\"directoryView_ringList clearfix directoryViewList directoryViewList_DV directoryViewUl\" " +
                    "id=\"" + viewName + "_dataView_" + i + "\"></ul>" +
                    "<div class=\"noSearchResults\" hidden>No Search Results</div>" +
                    "</div>" +
                    "</div>";
            }
        }
    }
    str += "</div></div>";
    $("#popUp").html(str);
    $("#popUp").removeClass("dis-none");
    renderD(res, viewName);
}

function renderD(res, viewName) {
    let keysOfDebugInfo = Object.keys(res.debugInfo);
    for (let i = 0; i < keysOfDebugInfo.length; i++) {
        if (res.debugInfo[keysOfDebugInfo[i]].length > 0) {
            let id = viewName + "_dataView_" + i;
            renderDirectoryViewForAlert(res.debugInfo[keysOfDebugInfo[i]], id, getHeading(i));
        }
    }
}

function getHeading(i) {
    if (i === 0)
        return "Rows with less than three columns";
    else if (i === 1)
        return "Rows with Invalid content";
    else if (i === 2)
        return "Rows without parent element (Orphaned Rows)";
    else return "";
}

function renderDirectoryViewForAlert(renderData, idOfParentDiv, Header) {
    let str = "";
    str += " <li class=\"element_li_root\">\n";
    str += " <div class=\"directoryListItemContainer clearfix\">\n";
    if (renderData && renderData.length > 0) {
        str += " <div class=\"whiteBgTriangle whiteBg\">\n";
        str += " <span class=\"triangle_active fleft\"></span>\n";
        str += " </div>\n";
        str += " <span class=\"verticle_dotted_line-deactivate\"></span>\n";
    }
    else {
        str += " <span class=\"verticle_dotted_line-deactivate verticle_dotted_line-long\"></span>\n";
    }
    str += " <div class=\"r_conainer fleft\">\n";
    str += "<span class=\"npr_headng deactive_npr_heading d-text\" style=\"font-weight: bold; color: #000;\">" + Header + "</span>\n";
    str += " </div></div>\n";
    str += " <ul class=\"directoryViewUlE clearfix\" hidden>\n";
    if (renderData) {
        for (let j = 0; j < renderData.length; j++) {
            str += " <li class=\"element_li\" uniqueId = \"" + renderData[j].uniqueId + "\">\n";
            str += " <div class=\"directoryListItemContainer clearfix\">\n";
            str += " <span class=\"verticle_dotted_line-deactivate verticle_dotted_line-long\"></span>\n";
            str += " <div class=\"r_conainer fleft\">\n";
            str += "<span class=\"npr_headng deactive_npr_heading d-text\">" + renderData[j] + "</span></div></div>";
            str += "</li>\n";
        }
    }
    str += "</ul>\n";
    str += "</li>";
    $("#popUp").find("#" + idOfParentDiv).html(str);
}
