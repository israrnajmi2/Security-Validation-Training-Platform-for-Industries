var liCount;

var renderSchemaDirectoryView = function (renderData, idOfParentDiv, view, viewName, isBiview) {
    $("#" + idOfParentDiv).empty();
    var strVar = "";
    if (renderData[ATTR.objectType].match(/_root$/)) {
        strVar += `<ul class="directoryViewUlE_root clearfix" hidden>\n`;
        strVar += `<li class="element_li_root" id="${idOfParentDiv}_${renderData.uniqueId}" uniqueId ="${renderData.uniqueId}">\n`;
    }
    else {
        strVar += `<ul class="directoryViewUlE clearfix" hidden>\n`;
        strVar += `<li class="element_li" id="${idOfParentDiv}_${renderData.uniqueId}" uniqueId ="${renderData.uniqueId}" >\n`;
    }
    strVar += `<div id="createSchemaLiContainer" class="directoryListItemContainer clearfix">\n`;
    if (renderData && renderData[ATTR.children] && renderData[ATTR.children].length > 0) {
        strVar += `<div class="whiteBgTriangle whiteBg">\n`;
        strVar += `<span class="triangle_active fleft"></span>\n`;
        strVar += `</div>\n`;
        strVar += `<span class="verticle_dotted_line-deactivate"></span>\n`;
    }
    else {
        strVar += `<span class="verticle_dotted_line-deactivate verticle_dotted_line-long"></span>\n`;
    }
    strVar += `<div class="r_conainer fleft">\n`;
    strVar += renderHotlinkInventoryDv(renderData, idOfParentDiv, view, viewName, true);
    strVar += `</div>\n`;
    strVar += `</div>`;
    if (renderData[ATTR.children]) {
        liCount = 0;
        strVar += renderSchemaChildren(renderData[ATTR.children], idOfParentDiv, view, viewName, isBiview);
    }
    strVar += `</li></ul>\n`;
    $("#" + idOfParentDiv).html(strVar);

    //added for drag and drop by Manish
    dragAndDropFun=getActiveDesktop(isBiview).utilsFunction.addDragAndDrop;
    if(dragAndDropFun){
        dragAndDropFun();
    }else{
        addDragAndDropCommon(isBiview);
    }
    highlightHotlinks(isBiview);
    $(".search-keyword").keyup();
};

//added for drag and drop by Manish
function addDragAndDropCommon(isBiView) {
    let selectorId=getActiveDesktopTreeSelectorId(isBiView);
    $("#"+selectorId).sortable({
        items : "li[id]",
        toleranceElement: '> div',
        dropOnEmpty: true,
        
        change: function(event, ui) {
            ui.placeholder.css({visibility: 'visible', border : '1px solid blue'});
          },
        update : function(event, ui) {
            updateTextOnDrop(event,ui,isBiView);
        }
    });
}

function updateTextOnDrop(event,ui,isBiView){

    ui.item.attr('isDragged', true);
    ui.item.find('li').each(function(){
        $(this).attr('isDragged', true);
    });

    showDragAndDropSaveBtn(isBiView);
    ui.item.find(".d-text").addClass("blink");
    setInterval(function() {
        $( ".blink" ).fadeToggle();
    }, 100);
}

function showDragAndDropSaveBtn(isBiView){
    let activeDesktop=getActiveDesktop(isBiView);
    let buttonId,cnclButtonId;
    if(isBiView){
        buttonId="bi_drag_and_drop_save_btn";
        cnclButtonId="bi_cncl_drag_and_drop_save_btn";
    }else{
        buttonId="drag_and_drop_save_btn";
        cnclButtonId="cncl_drag_and_drop_save_btn";
    }
    $("#"+activeDesktop.div_id).find('#'+buttonId).removeClass("dis-none");
    $("#"+activeDesktop.div_id).find('#'+cnclButtonId).removeClass("dis-none");
}

function hideDragAndDropSaveBtn(isBiView){
    let activeDesktop=getActiveDesktop(isBiView);
    let buttonId,cnclButtonId;
    if(isBiView){
        buttonId="bi_drag_and_drop_save_btn";
        cnclButtonId="bi_cncl_drag_and_drop_save_btn";
    }else{
        buttonId="drag_and_drop_save_btn";
        cnclButtonId="cncl_drag_and_drop_save_btn";
    }
    $("#"+activeDesktop.div_id).find('#'+buttonId).addClass("dis-none");
    $("#"+activeDesktop.div_id).find('#'+cnclButtonId).addClass("dis-none");
}

function getActiveDesktopTreeSelectorId(isBiView){
    let activeDesktop=getActiveDesktop(isBiView);
    if(isBiView){
        return "tree_"+activeDesktop.tree_container_id;
    }else{
        return "tree_"+activeDesktop.tree_container_id;
    }
}

//added by Manish for drag and drop
function getTreeDataForActiveDeskTop(isBiView){
    children = [];
    let selectorId=getActiveDesktopTreeSelectorId(isBiView);
    $("#"+selectorId).children("li").each(function () {
        var level = _recursiveItems(this,1);
        children.push(level);
    });

    return children;

    function _recursiveItems(item,nLevel) {
        let id = ($(item).attr('elementId'));
        let objectType = ($(item).attr('objectType'));
        let name = ($(item).attr('name'));
        let linkId = ($(item).attr('linkId'));
        let linkType = ($(item).attr('linkType'));
        let isDragged = ($(item).attr('isDragged'));

        if(isDragged){
            isDragged=true;
        }else{
            isDragged=false;
        }

        if (id) {
            let currentItem;
            if(linkId && linkType){
                currentItem = {"elementId" : id,objectType,name,"level":nLevel,linkId,linkType,"dragged":isDragged};
            }else{
                currentItem = {"elementId" : id,objectType,name,"level":nLevel,"dragged":isDragged};
            }
            
            if ($(item).children("ul").children("li").length > 0) {
                currentItem.children = [];
                $(item).children("ul").children("li").each(function() {
                    var level = _recursiveItems(this,nLevel+1);
                    currentItem.children.push(level);
                });
            }
            return currentItem;
        }
    }

}

var renderSchemaChildren = function (childrenArray, idOfParentDiv, view, viewName, isBiview) {
    function renderChild() {
        if (liCount === 1)
            strVar += " <li class=\"first_li element_li\" id=\"" + idOfParentDiv + "_" + childrenArray[i].uniqueId + "\" elementId = \"" + childrenArray[i].elementId +"\" objectType=\""+ childrenArray[i].objectType + "\" name=\""+ childrenArray[i].name + "\" uniqueId = \"" + childrenArray[i].uniqueId + "\">\n";
        else
            strVar += " <li class=\"element_li\" id=\"" + idOfParentDiv + "_" + childrenArray[i].uniqueId + "\" elementId = \"" + childrenArray[i].elementId +"\" objectType=\""+ childrenArray[i].objectType  + "\" name=\""+ childrenArray[i].name + "\" uniqueId = \"" + childrenArray[i].uniqueId + "\">\n";
        strVar += "<div class=\"directoryListItemContainer clearfix\">\n";
        if (childrenArray[i][ATTR.children] && childrenArray[i][ATTR.children].length > 0) {
            strVar += " <div class=\"whiteBgTriangle whiteBg\">\n";
            strVar += " <span class=\"triangle_active fleft\"></span>\n";
            strVar += " </div>\n";
            strVar += " <span class=\"verticle_dotted_line-deactivate\"></span>\n";
        }
        else {
            strVar += " <span class=\"verticle_dotted_line-deactivate verticle_dotted_line-long\"></span>\n";
        }
        strVar += " <div class=\"r_conainer\">\n";

        if (viewName === "anchorView") {
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview);
            strVar += renderTextOfDv(childrenArray[i]);
            strVar += haveArtifact(childrenArray[i]);
        }
        strVar += renderHotlinkInventoryDv(childrenArray[i], idOfParentDiv, view, viewName);
        if(childrenArray[i].indentationId)
            strVar += "<span class=\"indentation_number active\">"+ childrenArray[i].indentationId +"</span>";
        strVar += " </div>\n";
        strVar += " </div>";
        if (childrenArray[i][ATTR.children]) {
            strVar += renderSchemaChildren(childrenArray[i][ATTR.children], idOfParentDiv, view, viewName, isBiview);
        }
        strVar += "</li>\n";
    }

    if (!childrenArray)
        return "";
    else if (childrenArray.length === 0)
        return "";
    else {
        var strVar = "";
        liCount++;

        //added for drag and drop by Manish
        let isBiView = (view==="biview"?true : false);
        let treeId=getActiveDesktopTreeSelectorId(isBiView);
        hideDragAndDropSaveBtn(isBiView);

        strVar += " <ul id=\""+treeId+"\" class=\"directoryViewUlE clearfix\" hidden>\n";

        for (var i = 0; i < childrenArray.length; i++) {
            renderChild();
        }
        liCount--;
        strVar += "</ul>\n";
        $("#saveData").hide();
        return strVar;
    }
};

var renderDirectoryView = function (renderData, idOfParentDiv, view, viewName, isBiview) {
    var isAssocFull = false;
    var renderDirectoryUl = function () {
        var str = ""
        if (renderData[ATTR.objectType].match(/_root$/)) {
            str += " <ul class=\"directoryViewUlE_root clearfix\" hidden>\n";
            str += " <li class=\"element_li_root\" id=\"" + idOfParentDiv + "_" + renderData.uniqueId + "\" uniqueId =\"" + renderData.uniqueId + "\" >\n";
        }
        else {
            str += " <ul class=\"directoryViewUlE clearfix\" hidden>\n";
            str += " <li class=\"element_li\" id=\"" + idOfParentDiv + "_" + renderData.uniqueId + "\" uniqueId =\"" + renderData.uniqueId + "\" >\n";
        }
        str += " <div class=\"directoryListItemContainer clearfix\">\n";
        if (renderData && renderData[ATTR.children] && renderData[ATTR.children].length > 0) {
            if (viewName === "associationView") {
                str += " <div class=\"whiteBgInactiveTriangle whiteInactiveBg\">\n";
            }
            else {
                str += " <div class=\"whiteBgTriangle whiteBg\">\n";
            }
            str += " <span class=\"triangle_active fleft\"></span>\n";
            str += " </div>\n";
            str += " <span class=\"verticle_dotted_line-deactivate\"></span>\n";
        }
        else {
            str += " <span class=\"verticle_dotted_line-deactivate verticle_dotted_line-long\"></span>\n";
        }
        str += " <div class=\"r_conainer fleft\">\n";
        if (viewName === "dataView") {
            str += renderCircleOrSquareInventoryDv(renderData, isBiview, "", true);
            str += renderTextOfDataViewDv(renderData);
        }
        if (typeof (renderData.index) !== "undefined")
            str += renderIndexOfDvRoot(renderData, view);
        if (renderData[ATTR.objectType].match(/_root$/) === null) {
            str += renderCircleOrSquareInventoryDv(renderData, isBiview);
            str += renderTextOfDv(renderData, undefined, undefined, idOfParentDiv, isBiview);
        }
        else if (typeof (renderData.index) !== "undefined") {
            str += renderRootIconAndText(renderData, view);
        }
        if (idOfParentDiv === "asset_map_mode_desk_tree_container" || idOfParentDiv === "bi_asset_map_mode_desk_tree_container") {
            str += "<span style=\"color: #000\" title=\"Type: Security Asset\" class=\"flaticon-asset-element flaticon-elementType-root\"></span>";
            str += "<span class=\"npr_headng deactive_npr_heading d-text\">Security Asset</span>";
        }
        if (idOfParentDiv === "asset_type_map_mode_desk_tree_container" || idOfParentDiv === "bi_asset_type_map_mode_desk_tree_container") {
            str += "<span style=\"color: #000\" title=\"Type: Security Asset Type\" class=\"flaticon-asset-type-element flaticon-elementType-root\"></span>";
            str += "<span class=\"npr_headng deactive_npr_heading d-text\">Security Asset Type</span>";
        }
        if (idOfParentDiv === "business_asset_map_mode_desk_tree_container" || idOfParentDiv === "bi_business_asset_map_mode_desk_tree_container") {
            str += "<span style=\"color: #000\" title=\"Type: Value Asset\" class=\"flaticon-business-asset-element flaticon-elementType-root\"></span>";
            str += "<span class=\"npr_headng deactive_npr_heading d-text\">Value Asset</span>";
        }
        if (idOfParentDiv === "business_asset_type_map_mode_desk_tree_container" || idOfParentDiv === "bi_business_asset_type_map_mode_desk_tree_container") {
            str += "<span style=\"color: #000\" title=\"Type: Value Asset Type\" class=\"flaticon-business-asset-type-element flaticon-elementType-root\"></span>";
            str += "<span class=\"npr_headng deactive_npr_heading d-text\">Value Asset Type</span>";
        }
        str += renderHotlinkInventoryDv(renderData, idOfParentDiv, view, viewName, true, false);
        str += " </div>\n";
        str += " </div>";
        if (renderData[ATTR.children]) {
            str += renderChildren(renderData[ATTR.children], idOfParentDiv, view, viewName, isBiview, isAssocFull);
        }
        str += "</li>\n";
        str += "</ul>\n";
        return str;
    };
    var strVar = "";
    if (viewName === "associationView_full") {
        viewName = "associationView";
        isAssocFull = true;
    }
    else if (viewName === "protectionAssociationView_full") {
        viewName = "protectionAssociationView";
        isAssocFull = true;
    }
    else if (viewName === "assetAssociationView_full") {
        viewName = "assetAssociationView";
        isAssocFull = true;
    }
    else if (viewName === "anchorView_full") {
        viewName = "anchorView";
        isAssocFull = true;
    }

    strVar += renderDirectoryUl();
    $("#" + idOfParentDiv).html(strVar);

    //added for drag and drop by Manish
    let dragAndDropFun;
    let isBiView = (view==="biview"?true : false);
    hideDragAndDropSaveBtn(isBiView);
    dragAndDropFun=getActiveDesktop(isBiView).utilsFunction.addDragAndDrop;
    if(dragAndDropFun){
        dragAndDropFun();
    }else{
        addDragAndDropCommon(isBiView);
    }
   
    var innerDesktop = $("#" + idOfParentDiv).closest(".innerDesktop");
    highlightHotlinks(isBiview);
    innerDesktop.find(".search-keyword").keyup();
};

var renderChildren = function (childrenArray, idOfParentDiv, view, viewName, isBiview, isAssocFull) {
    function renderChild() {

        if(childrenArray[i].linkId && childrenArray[i].linkType){
            strVar += " <li class=\"element_li\" id=\"" + idOfParentDiv + "_" + childrenArray[i].uniqueId 
            +"\" elementId=\""+ childrenArray[i].elementId
            +"\" objectType=\""+ childrenArray[i].objectType 
            + "\" name=\""+ childrenArray[i].name
            + "\" linkId=\""+ childrenArray[i].linkId 
            + "\" linkType=\""+ childrenArray[i].linkType 
            + "\" uniqueId = \""+ childrenArray[i].uniqueId + "\">\n";
        }else{
            strVar += " <li class=\"element_li\" id=\"" + idOfParentDiv + "_" + childrenArray[i].uniqueId 
            +"\" elementId=\""+ childrenArray[i].elementId
            +"\" objectType=\""+ childrenArray[i].objectType 
            + "\" name=\""+ childrenArray[i].name
            + "\" uniqueId = \""+ childrenArray[i].uniqueId + "\">\n";
        }

        strVar += " <div class=\"directoryListItemContainer clearfix\">\n";
        if (childrenArray[i][ATTR.children] && childrenArray[i][ATTR.children].length > 0) {
            if (viewName === "associationView") {
                strVar += " <div class=\"whiteBgInactiveTriangle whiteInactiveBg\">\n";
            }
            else {
                strVar += " <div class=\"whiteBgTriangle whiteBg\">\n";
            }
            strVar += " <span class=\"triangle_active fleft\"></span>\n";
            strVar += " </div>\n";
            strVar += " <span class=\"verticle_dotted_line-deactivate\"></span>\n";
        }
        else {
            strVar += " <span class=\"verticle_dotted_line-deactivate verticle_dotted_line-long\"></span>\n";
        }
        strVar += " <div class=\"r_conainer\">\n";
        if (typeof (childrenArray[i].index) !== "undefined")
            strVar += renderIndexOfDv(childrenArray[i]);

        if (viewName === "dataView") {
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview, "", false);
            strVar += renderTextOfDataViewDv(childrenArray[i]);

        }
        else if (viewName === "associationView" && isAssocFull) {
            strVar += renderCheckMapWithDoubleState(childrenArray[i], "selectToMap");
            strVar += renderLabelForDv("shield_exp", view, isBiview);
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview, "", false);
            strVar += renderTextOfAssociationViewTable(childrenArray[i]);
        }
        else if (viewName === "associationView") {
            strVar += renderCheckMapWithDoubleState(childrenArray[i], "selectToMap");
            strVar += renderLabelForDv("shield_exp", view, isBiview);
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview, "", false);
            strVar += renderTextOfAssociationView(childrenArray[i]);
        }
        else if (viewName === "protectionAssociationView" && isAssocFull) {
            strVar += renderCheckMapWithTripleState(childrenArray[i], "selectToAssociationMap");
            strVar += renderLabelForDv("assetType_exp", view, isBiview);
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview, "", false);
            strVar += renderTextOfAssociationViewTable(childrenArray[i]);
        }
        else if (viewName === "protectionAssociationView") {
            strVar += renderCheckMapWithTripleState(childrenArray[i], "selectToAssociationMap");
            strVar += renderLabelForDv("assetType_exp", view, isBiview);
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview, "", false);
            strVar += renderTextOfAssociationView(childrenArray[i]);
        }
        else if (viewName === "assetAssociationView" && isAssocFull) {
            strVar += renderCheckMapWithTripleState(childrenArray[i], "selectToAssetAssociationMap");
            strVar += renderLabelForDv("asset_exp", view, isBiview);
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview, "", false);
            strVar += renderTextOfAssociationViewTable(childrenArray[i]);
        }
        else if (viewName === "assetAssociationView") {
            strVar += renderCheckMapWithTripleState(childrenArray[i], "selectToAssetAssociationMap");
            strVar += renderLabelForDv("asset_exp", view, isBiview);
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview, "", false);
            strVar += renderTextOfAssociationView(childrenArray[i]);
        }
        else if (viewName === "anchorView" && isAssocFull) {
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview);
            strVar += renderTextOfAssociationViewTable(childrenArray[i]);
        }
        else if (viewName === "anchorView") {
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview);
            strVar += renderTextOfDv(childrenArray[i], undefined, undefined, idOfParentDiv, isBiview);
            strVar += haveArtifact(childrenArray[i]);
        }
        else if (viewName === "groupView") {
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview);
            strVar += renderTextOfDv(childrenArray[i]);
        }
        else if (viewName === "expAssetAssociationView") {
            strVar += renderCheckMapWithTripleState(childrenArray[i], "selectExpAssetAssociationMap");
            strVar += renderLabelForDv("exp_asset", view, isBiview);
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview, "", false);
            strVar += renderTextOfDv(childrenArray[i]);
        }
        else if (viewName === "expAssetTypeAssociationView") {
            strVar += renderCheckMapWithTripleState(childrenArray[i], "selectExpAssetTypeAssociationMap");
            strVar += renderLabelForDv("exp_assetType", view, isBiview);
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview, "", false);
            strVar += renderTextOfDv(childrenArray[i]);
        }
        else if (viewName === "expShieldAssociationView") {
            strVar += renderCheckMapWithDoubleState(childrenArray[i], "selectExpShieldAssociationMap");
            strVar += renderLabelForDv("exp_shield", view, isBiview);
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview, "", false);
            strVar += renderTextOfDv(childrenArray[i]);
        }
        else if (viewName === "expStandardAssociationView") {
            strVar += renderCheckMapWithDoubleState(childrenArray[i], "selectExpStandardAssociationMap");
            strVar += renderLabelForDv("exp_shield", view, isBiview);
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview, "", false);
            strVar += renderTextOfDv(childrenArray[i]);
        }
        else if (viewName === "ExpressionView") {
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview);
            strVar += renderTextOfExpressionDv(childrenArray[i]);
        }
        else if (viewName === "directElementAssociationView") {
            strVar += renderCheckHotlinkForElementAssociation(childrenArray[i], "selectToDirectMap");
            strVar += renderLabelForDv("shield_shield", view, isBiview);
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview, "", false);
            strVar += renderTextOfDv(childrenArray[i]);
        }
        else if (viewName === "directAssetAssociationView") {
            strVar += renderCheckHotlinkForElementAssociation(childrenArray[i], "selectDirectAssetAssociationMap");
            strVar += renderLabelForDv("shield_asset", view, isBiview);
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview, "", false);
            strVar += renderTextOfDv(childrenArray[i]);
        }
        else if (viewName === "directAssetElementAssociationView") {
            strVar += renderCheckHotlinkForElementAssociation(childrenArray[i], "selectDirectAssetMap");
            strVar += renderLabelForDv("asset_shield", view, isBiview);
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview, "", false);
            strVar += renderTextOfDv(childrenArray[i]);
        }
        else if (viewName === "directAssetTypeAssociationView") {
            strVar += renderCheckHotlinkForElementAssociation(childrenArray[i], "selectDirectAssetTypeAssociationMap");
            strVar += renderLabelForDv("shield_assetType", view, isBiview);
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview, "", false);
            strVar += renderTextOfDv(childrenArray[i]);
        }
        else if (viewName === "directAssetTypeElementAssociationView") {
            strVar += renderCheckHotlinkForElementAssociation(childrenArray[i], "selectDirectAssetTypeMap");
            strVar += renderLabelForDv("assetType_shield", view, isBiview);
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview, "", false);
            strVar += renderTextOfDv(childrenArray[i]);
        }
        else if (viewName === "projectionView") {
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview, "ringView");
            strVar += renderTextOfDv(childrenArray[i], undefined, undefined, idOfParentDiv, isBiview);
        }
        else if (viewName === "guidanceView" || viewName === "testProcedureView" || viewName === "sourceView") {
            strVar += renderCircleOrSquareInventoryDv(childrenArray[i], isBiview);
            strVar += renderTextOfDv(childrenArray[i], undefined, undefined, idOfParentDiv, isBiview);
        }
        if (viewName === "associationView" || viewName === "protectionAssociationView" || viewName === "assetAssociationView") {
            strVar += "<div style=\"padding: 5px 0 0 9px; display: inline-block;\">";
            strVar += renderHotlinkInventoryDv(childrenArray[i], idOfParentDiv, view, viewName, false);
            strVar += "</div>";
        }
        else
            strVar += renderHotlinkInventoryDv(childrenArray[i], idOfParentDiv, view, viewName, false);
        if (viewName === "anchorView" && childrenArray[i].indentationId) {
            strVar += "<span class=\"indentation_number active\">"+ childrenArray[i].indentationId +"</span>";
        }
        strVar += " </div>";
        strVar += " </div>";
        if (childrenArray[i][ATTR.children]) {
            strVar += renderChildren(childrenArray[i][ATTR.children], idOfParentDiv, view, viewName, isBiview);
        }
        strVar += "</li>\n";
    }

    let strVar = "";
    if (!childrenArray)
        return "";
    else if (childrenArray.length === 0)
        return "";
    else {
        //added for drag and drop by Manish
        let treeId;
        if(view==="biview"){
            treeId=getActiveDesktopTreeSelectorId(true);
        }else{
            treeId=getActiveDesktopTreeSelectorId(false);
        }
        strVar += "<ul id=\""+treeId+"\" class=\"directoryViewUlE clearfix\" hidden>\n";

        for (var i = 0; i < childrenArray.length; i++) {
            renderChild();
        }
        strVar += "</ul>\n";
        $("#saveData").hide();
        return strVar;

    }
};

function haveArtifact(element) {
    let artifact, str = "";
    if (element.booleanFlags)
        artifact = getTrueOrFalse(element.booleanFlags, 2);
    if (artifact)
        str += `<sup class="flaticon-paper-clip haveArtifactIcon" title="Artifacts exist. See Dataview"></sup>`;
    return str;
}

function renderIndexOfDv(element) {
    let strVar = "";
    if (element.rating) {
        strVar += `<span class="directory-index-value">${element.rating.toFixed(2)}</span>`;
    }
    else
        strVar += `<span class="directory-index-value">${element.index.toFixed(2)}</span>`;
    return strVar;
}

function renderIndexOfDvRoot(element, view) {
    let strVar = "";
    if (element.index && element.index !== undefined)
        strVar += `<span class="directory-index-value" style="margin-right: 6px;">${element.index.toFixed(2)}</span>`;
    return strVar;
}

function renderRootIconAndText(element, view) {
    let activeDesktop, shield;
    let strVar = "";
    let isBiview = isBiViewOrNot(view);
    activeDesktop = getActiveDesktop(undefined, view);
    let desktopSelector = activeDesktop.selector;
    let shieldElementId = $("#" + desktopSelector.shield_dropdown_selected_id).attr("elementId");
    let color = getIconColor(element, isBiview);
    if (shieldElementId) {
        shield = backing.shield_schema_obj["shieldInfoMap"][shieldElementId];
        if (shield) {
            strVar += getIconForShieldStandardElement(shield, color, isBiview);
            strVar += `<span class="npr_headng deactive_npr_heading d-text">${shield.shieldName}</span>`;
        }
    }
    return strVar;
}


