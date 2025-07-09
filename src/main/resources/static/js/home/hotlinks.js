function createHotlink(idOfParentDiv, element, view, label, viewName, isRoot) {
    let childHotlink = view + "-add-child";
    if (viewName === "anchorView" && isRoot && idOfParentDiv !== "asset_type_map_mode_desk_tree_container" && idOfParentDiv !== "asset_map_mode_desk_tree_container" && idOfParentDiv !== "bi_asset_type_map_mode_desk_tree_container" && idOfParentDiv !== "bi_asset_map_mode_desk_tree_container") {
        return " <span id = \"" + idOfParentDiv + "_" + backing.view_type.create_shield_element_view.id + "_" + element.uniqueId + "\" uniqueId =\"" + element.uniqueId + "\" title= \"Create " + label + "\" elementType=\"" + element.objectType + "\" class=\"tooltip createRootText " + childHotlink + "\">+ Create " + label + "</span>";
    }
    else if (viewName === "anchorView" && !isRoot) {
        return " <span id = \"" + idOfParentDiv + "_" + backing.view_type.create_shield_element_view.id + "_" + element.uniqueId + "\" uniqueId =\"" + element.uniqueId + "\" title= \"Create Child " + label + "\" elementType=\"" + element.objectType + "\" class=\"tooltip flaticon-add-attribute directory-text-icon " + childHotlink + "\"></span>";
    }
    else if (viewName === "CreateOrEditExpressionView") {
        if (isRoot)
            return " <span id = \"" + idOfParentDiv + "_" + backing.view_type.create_shield_element_view.id + "_" + element.uniqueId + "\" uniqueId =\"" + element.uniqueId + "\" title= \"Create " + label + "\" elementType=\"" + element.objectType + "\" class=\"tooltip createRootText " + childHotlink + "\">+ Create " + label + "</span>";
        else
            return " <span id = \"" + idOfParentDiv + "_" + backing.view_type.create_shield_element_view.id + "_" + element.uniqueId + "\" uniqueId =\"" + element.uniqueId + "\" title= \"Create Child " + label + "\" elementType=\"" + element.objectType + "\" class=\"tooltip flaticon-add-attribute directory-text-icon " + childHotlink + "\"></span>";
    }
    return "";
}

var renderHotlinkForDesktop = function (base_objectType, base_objectType_root, element, idOfParentDiv, view, viewName, activeDesktop, isRoot, isAnalysisDesktop, isdropDown) {
    let strVar = "";
    let childHotlinkObject = {};
    let level;
    let {objectType, uniqueId, elementId, shieldElementTypeId} = element;
    if ((objectType === "shield_element" || objectType === "standard_element" || objectType === "threat_element" || objectType === "b_control" || objectType === "sce_root") && shieldElementTypeId) {
        level = LookupLevel(shieldElementTypeId);
    }
    if ((objectType === "asset" || objectType === "asset_type")) {
        level = element.level;
    }
    let editHotlink = view + "-edit-element";
    let deleteHotlink = "delete-element";
    let activeDesktopKey = activeDesktop.key;
    let viewType = backing.view_type;
    let guidanceHotlink = view + "-guidance-view";
    let testProcedureHotlink = view + "-testProcedure-view";
    let selectedShield = $("#" + activeDesktop.selector.shield_dropdown_selected_id).attr("elementId");
    let selectedlevel = $("#" + activeDesktop.selector.level_dropdown_selected_id).attr("elementId");
    let protectionTypeSelector = $("#" + activeDesktop.selector.expression_dropdown_selected_id).attr("objectType");
    if (viewName === "anchorView" && (objectType === constants.objectType.SHIELD || objectType === constants.objectType.STANDARD || objectType === constants.objectType.BUSINESS || objectType === constants.objectType.THREAT) && isdropDown === false) {
        let ringViewHotlink = "root-ring-view";
        strVar += " <span id = \"" + idOfParentDiv + "_" + viewType.ring_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"class=\"tooltip flaticon-shape directory-text-icon " + ringViewHotlink + "\" title=\"Ring View\" elementType=\"" + objectType + "\"></span>";
    } else if (
        viewName === "anchorView"
        && objectType && !objectType.match(/_root$/)
        && !objectType.match(/_framework$/)
        && objectType !== constants.objectType.SHIELD
        && objectType !== constants.objectType.STANDARD
        && objectType !== constants.objectType.BUSINESS
        && objectType !== constants.objectType.THREAT
        && objectType !== constants.objectType.STANDARD_ELEMENT_TYPE
        && objectType !== constants.objectType.SHIELD_ELEMENT_TYPE
        && objectType !== constants.objectType.BUSINESS_CONTROL_TYPE
        && objectType !== constants.objectType.THREAT_ELEMENT_TYPE
        && objectType !== constants.objectType.PERSPECTIVE
        && activeDesktopKey !== "users_desktop" && (activeDesktopKey !== "roles_desktop")
    ) {
        let ringViewHotlink = view + "-ring-view";
        strVar += " <span id = \"" + idOfParentDiv + "_" + viewType.ring_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"class=\"tooltip flaticon-shape directory-text-icon " + ringViewHotlink + "\" title=\"Ring View\" elementType=\"" + objectType + "\"></span>";
    }
    // if (!isAnalysisDesktop && (base_objectType === objectType || base_objectType_root === objectType)) {
    // commented below line to show hotlinks edit/delete mainly in all desktops.
    //if (base_objectType === objectType || base_objectType_root === objectType) {
        childHotlinkObject = canHaveCreateHotlinkElement(element, view);
        if (childHotlinkObject && childHotlinkObject !== null) {
            let childHotlink = view + "-add-child";
            if (viewName === "anchorView" && isRoot && activeDesktopKey !== "ruler_type_desktop" && activeDesktopKey !== "shield_element_ruler_type_desktop" && !activeDesktop.header_name.match(/Analysis$/)) {
                strVar += " <span id = \"" + idOfParentDiv + "_" + viewType.create_shield_element_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\" title=\"" + childHotlinkObject.label + "\" elementType=\"" + childHotlinkObject.childElementType + "\" class=\"tooltip createRootText " + childHotlink + "\">+ " + childHotlinkObject.label + "</span>";
            }
            else if (viewName === "anchorView" && activeDesktopKey !== "ruler_type_desktop" && activeDesktopKey !== "shield_element_ruler_type_desktop" && !isRoot) {
                strVar += " <span id = \"" + idOfParentDiv + "_" + viewType.create_shield_element_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\" title=\"" + childHotlinkObject.label + "\" elementType=\"" + childHotlinkObject.childElementType + "\" class=\"tooltip flaticon-add-attribute directory-text-icon " + childHotlink + "\"></span>";
            }
        }
        else {
            switch (objectType) {
                case constants.objectType.ASSET_ROOT :
                    strVar += createHotlink(idOfParentDiv, element, view, "Security Asset", viewName, isRoot);
                    break;
                case constants.objectType.BUSINESS_ASSET_ROOT :
                    strVar += createHotlink(idOfParentDiv, element, view, "Value Asset", viewName, isRoot);
                    break;
                case constants.objectType.ASSET_TYPE:
                    strVar += createHotlink(idOfParentDiv, element, view, "Security Asset Type", viewName, isRoot);
                    break;
                case constants.objectType.BUSINESS_ASSET_TYPE:
                    strVar += createHotlink(idOfParentDiv, element, view, "Value Asset Type", viewName, isRoot);
                    break;
                case constants.objectType.ASSET_TYPE_ROOT:
                    strVar += createHotlink(idOfParentDiv, element, view, "Level 1 Security Asset Type", viewName, isRoot);
                    break;
                case constants.objectType.BUSINESS_ASSET_TYPE_ROOT:
                    strVar += createHotlink(idOfParentDiv, element, view, "Level 1 Value Asset Type", viewName, isRoot);
                    break;
                case constants.objectType.PROVIDER_ROOT:
                    strVar += createHotlink(idOfParentDiv, element, view, "Provider", viewName, isRoot);
                    break;
                case constants.objectType.BUSINESS_PROVIDER_ROOT:
                    strVar += createHotlink(idOfParentDiv, element, view, "Value Provider", viewName, isRoot);
                    break;
                case constants.objectType.ORGANIZATIONAL_UNIT_ROOT:
                    strVar += createHotlink(idOfParentDiv, element, view, "Level 1 Organizational Unit", viewName, isRoot);
                    break;
                case constants.objectType.USER_ROOT:
                    strVar += createHotlink(idOfParentDiv, element, view, "User", viewName, isRoot);
                    break;
                case constants.objectType.ROLE_ROOT:
                    strVar += createHotlink(idOfParentDiv, element, view, "Role", viewName, isRoot);
                    break;
                case constants.objectType.ORGANIZATIONAL_UNIT:
                    strVar += createHotlink(idOfParentDiv, element, view, "Organizational Unit", viewName, isRoot);
                    break;
                case constants.objectType.OBJECTIVE_PARAMETER_ROOT:
                    strVar += createHotlink(idOfParentDiv, element, view, "Level 1 Security Technique", viewName, isRoot);
                    break;
                case constants.objectType.OBJECTIVE_PARAMETER:
                    strVar += createHotlink(idOfParentDiv, element, view, "Security Technique", viewName, isRoot);
                    break;
                case constants.objectType.METHOD_PARAMETER:
                    strVar += createHotlink(idOfParentDiv, element, view, "Security Content", viewName, isRoot);
                    break;
                case constants.objectType.METHOD_PARAMETER_ROOT:
                    strVar += createHotlink(idOfParentDiv, element, view, "Level 1 Security Content", viewName, isRoot);
                    break;
                case constants.objectType.CONTENT_PARAMETER:
                    strVar += createHotlink(idOfParentDiv, element, view, "Protected Content", viewName, isRoot);
                    break;
                case constants.objectType.CONTENT_PARAMETER_ROOT:
                    strVar += createHotlink(idOfParentDiv, element, view, "Level 1 Protected Content", viewName, isRoot);
                    break;
                case constants.objectType.SUBJECT_PARAMETER:
                    strVar += createHotlink(idOfParentDiv, element, view, "Protected Subject", viewName, isRoot);
                    break;
                case constants.objectType.SUBJECT_PARAMETER_ROOT:
                    strVar += createHotlink(idOfParentDiv, element, view, "Level 1 Protected Subject", viewName, isRoot);
                    break;
                case constants.objectType.SCE_ROOT:
                    strVar += createHotlink(idOfParentDiv, element, view, "Expression", viewName, isRoot);
                    break;
            }
        }
        if (!objectType.match(/_root$/) && activeDesktopKey !== "shield_element_ruler_type_desktop" && viewName === "anchorView") {
            if (activeDesktopKey === "roles_desktop") {
                strVar += `<span id = "${idOfParentDiv}_${viewType.permission_view.id}_${uniqueId}" uniqueId ="${uniqueId}" class="tooltip flaticon-role-workspace directory-text-icon ${view}-permission-view" title="Permission View"></span>`;
            }
            /*if (activeDesktopKey === "shield_schema_desktop" || activeDesktopKey === "standard_schema_desktop" || activeDesktopKey === "business_schema_desktop" || activeDesktopKey === "threat_schema_desktop") {
                strVar += `<span id = "${idOfParentDiv}_${viewType.guidance_view.id}_${uniqueId}" uniqueId ="${uniqueId}" class="tooltip flaticon-guidance directory-text-icon ${guidanceHotlink}" title="Guidance View"></span>`;
                strVar += `<span id = "${idOfParentDiv}_${viewType.test_procedure_view.id}_${uniqueId}" uniqueId ="${uniqueId}" class="tooltip flaticon-test-procedure directory-text-icon ${testProcedureHotlink}" title="Test Procedure View"></span>`;
            }*/
            if (viewName === "ExpressionView" || viewName === "CreateOrEditExpressionView") {
                let editHotlink = view + "-edit-element";
                strVar += " <span id = \"" + idOfParentDiv + "_" + viewType.edit_shield_element_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"class=\"tooltip ss-edit directory-text-icon " + editHotlink + "\" title=\"Edit View\" elementType=\"" + objectType + "\"></span>";
            }
            else if (objectType === "sce") {
                editHotlink = view + "-expression-edit-element";
                strVar += " <span id = \"" + idOfParentDiv + "_" + viewType.edit_shield_element_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"class=\"tooltip ss-edit directory-text-icon " + editHotlink + "\" title=\"Edit View\" elementType=\"" + objectType + "\"></span>";
            }
            else {
                strVar += ` <span id = "${idOfParentDiv}_${viewName}_${uniqueId}edit" uniqueId ="${uniqueId}" class= "tooltip ss-edit directory-text-icon ${editHotlink}" title="Edit View" elementType="${objectType}"></span>`;
            }
            strVar += `<span id = "${idOfParentDiv}_${uniqueId}delete" uniqueId ="${uniqueId}" class="tooltip ss-delete directory-text-icon ${deleteHotlink}" title="Delete View" elementType="${objectType}"></span>`;
        }
    //}
    if (objectType === "artifact") {
        let deleteHotlink = "delete-element";
        let editHotlink = "edit-artifact-element";
        strVar += " <span id = \"" + idOfParentDiv + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"class=\"tooltip ss-delete directory-text-icon " + deleteHotlink + "\" title=\"Delete View\" elementType=\"" + objectType + "\"></span>";
        strVar += " <span id = \"" + idOfParentDiv + "_" + viewType.edit_artifact_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"class=\"tooltip ss-edit directory-text-icon " + editHotlink + "\" title=\"Edit View\" elementType=\"" + objectType + "\"></span>";
    }
    if (isdropDown) {
        strVar += ` <span id = "${idOfParentDiv}_${viewName}_${uniqueId}edit" uniqueId ="${uniqueId}" class= "tooltip ss-edit directory-text-icon ${editHotlink}" title="Edit View" elementType="${objectType}"></span>`;
        strVar += `<span id = "${idOfParentDiv}_${uniqueId}delete" uniqueId ="${uniqueId}" class="tooltip ss-delete directory-text-icon ${deleteHotlink}" title="Delete View" elementType="${objectType}"></span>`;
        if(objectType == "shield" || objectType == "standard" || objectType == "b_framework" || objectType == "threat")
            strVar += `<span class="directory-text-icon downloadExcel" shieldId ="${elementId}" title=\"Export\"><a class="flaticon-file-download directory-text-icon downloadExcel" href="/rest/ingest/export_as_excel/${elementId}"></a></span>`;
    }
    else if (viewName === "schemaView" && (objectType === "shield_element_type" || objectType === "standard_element_type" || objectType === "b_control_type" || objectType === "threat_element_type")) {
        strVar += ` <span id = "${idOfParentDiv}_${viewName}_${uniqueId}edit" uniqueId ="${uniqueId}" class= "tooltip ss-edit directory-text-icon ${editHotlink}" title="Edit View" elementType="${objectType}"></span>`;
        strVar += `<span id = "${idOfParentDiv}_${uniqueId}delete" uniqueId ="${uniqueId}" class="tooltip ss-delete directory-text-icon ${deleteHotlink}" title="Delete View" elementType="${objectType}"></span>`;
    }
    else if (objectType === constants.objectType.PERSPECTIVE) {
        strVar += ` <span id = "${idOfParentDiv}_${viewName}_${uniqueId}edit" uniqueId ="${uniqueId}" class= "tooltip ss-edit directory-text-icon ${editHotlink}" title="Edit View" elementType="${objectType}"></span>`;
        strVar += `<span id = "${idOfParentDiv}_${uniqueId}delete" uniqueId ="${uniqueId}" class="tooltip ss-delete directory-text-icon ${deleteHotlink}" title="Delete View" elementType="${objectType}"></span>`;
    }
    else if (viewName === "guidanceView" || viewName === "testProcedureView" || viewName === "sourceView") {
        let editHotlink = view + "-" + viewName + "-edit-element";
        let deleteHotlink = "delete-element";
        let createText;
        if (viewName === "sourceView") {
            createText = "Source";
        }
        else if (viewName === "guidanceView") {
            createText = "Guidance";
        }
        else if (viewName === "testProcedureView") {
            createText = "Test Procedure";
        }
        if (isRoot !== undefined && isRoot === true) {
            let childHotlink = viewName + "-add-child";
            return `<span id = "${idOfParentDiv}_${viewName}_${uniqueId}" uniqueId ="${uniqueId}" title= "Create ${createText}" elementType="${objectType}" class="tooltip createRootText ${childHotlink}">+ Create ${createText}</span>`;
        }
        strVar += " <span id = \"" + idOfParentDiv + "_" + viewName + "_" + uniqueId + "edit\" uniqueId =\"" + uniqueId + "\"class=\"tooltip ss-edit directory-text-icon " + editHotlink + "\" title=\"Edit View\" elementType=\"" + objectType + "\"></span>";
        strVar += " <span id = \"" + idOfParentDiv + "__" + uniqueId + "delete\" uniqueId =\"" + uniqueId + "\"class=\"tooltip ss-delete directory-text-icon " + deleteHotlink + "\" title=\"Delete View\" elementType=\"" + objectType + "\"></span>";
    }
    else if (viewName === "groupView" && !objectType.match(/_root$/)) {
        let editHotlink = view + "-edit-element";
        if (objectType !== constants.objectType.SHIELD_ELEMENT_TYPE && (activeDesktopKey !== "users_desktop"))
            strVar += " <span id = \"" + idOfParentDiv + "_" + viewType.edit_shield_element_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"class=\"tooltip ss-edit directory-text-icon " + editHotlink + "\" title=\"Edit View\" elementType=\"" + objectType + "\"></span>";
        strVar += " <span id = \"" + idOfParentDiv + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"class=\"tooltip ss-delete directory-text-icon " + deleteHotlink + "\" title=\"Delete View\" elementType=\"" + objectType + "\"></span>";
    }
    if (isAnalysisDesktop && viewName === "anchorView") {
        if (activeDesktopKey === "classification_map_mode_desktop" || activeDesktopKey === "standard_map_mode_desktop" || activeDesktopKey === "business_map_mode_desktop" || activeDesktopKey === "threat_map_mode_desktop") {
            let elementShieldId = LookupShieldId(shieldElementTypeId);
            if (backing.isDirectMode) {
                if ((objectType === "shield_element" || objectType === "standard_element" || objectType === "b_control" || objectType === "threat_element") && (elementShieldId === parseInt(selectedShield)) && ((parseInt(selectedlevel) === 0) || (parseInt(selectedlevel) === level))) {
                    switch (protectionTypeSelector) {
                        case "asset" :
                        case "business_asset" : {
                            let directAssetAssociationLink = view + "-direct-asset-association-view";
                            strVar += ` <span objectType = "${protectionTypeSelector}" id = "${idOfParentDiv}_${viewType.direct_asset_association_view.id}_${uniqueId}" uniqueId = "${uniqueId}"  class="tooltip flaticon-arrow directory-text-icon ${directAssetAssociationLink}" title="Link to Asset"><span class="${backing.object_type[protectionTypeSelector].icon} subscriptIcon"></span></span>`;
                            break;
                        }
                        case "asset_type":
                        case "business_asset_type" : { //linkToAssetType Hotlink for circle
                            let directAssetTypeAssociationLink = view + "-direct-asset-type-association-view";
                            strVar += `<span objectType = "${protectionTypeSelector}" id = "${idOfParentDiv}_${viewType.direct_asset_type_association_view.id}_${uniqueId}" uniqueId = "${uniqueId}"  class="tooltip flaticon-arrow directory-text-icon ${directAssetTypeAssociationLink}" title="Link to AssetType"><span class="${backing.object_type[protectionTypeSelector].icon} subscriptIcon"></span></span>`;
                            break;
                        }
                        case "shield": { //linkToInternalControl Hotlink for circle
                            let directElementAssociationLink = view + "-direct-element-association-view";
                            strVar += `<span objectType = "shield_element" id = "${idOfParentDiv}_${viewType.direct_shield_association_view.id}_${uniqueId}" uniqueId ="${uniqueId}"   class="tooltip flaticon-arrow directory-text-icon ${directElementAssociationLink}" title="Link to  Internal Policies"><span class="flaticon-shield-element subscriptIcon"></span></span>`;
                            break;
                        }
                        case "standard": { //linkToExternalControl hotlink for circle
                            let directElementAssociationLink = view + "-direct-element-association-view";
                            strVar += `<span objectType = "standard_element" id = "${idOfParentDiv}_Standard_${viewType.direct_shield_association_view.id}_${uniqueId}" uniqueId ="${uniqueId}"   class="tooltip flaticon-arrow directory-text-icon ${directElementAssociationLink}" title="Link to External Policies"><span class="flaticon-standard-element subscriptIcon"></span></span>`;
                            break;
                        }
                        case "b_framework": { //linkToExternalControl hotlink for circle
                            let directElementAssociationLink = view + "-direct-element-association-view";
                            strVar += `<span objectType = "b_control" id = "${idOfParentDiv}_business_${viewType.direct_shield_association_view.id}_${uniqueId}" uniqueId ="${uniqueId}"   class="tooltip flaticon-arrow directory-text-icon ${directElementAssociationLink}" title="Link to Value Processes"><span class="flaticon-business-element subscriptIcon"></span></span>`;
                            break;
                        }
                        case "threat": { //linkToExternalControl hotlink for circle
                            let directElementAssociationLink = view + "-direct-element-association-view";
                            strVar += `<span objectType = "threat_element" id = "${idOfParentDiv}_Threat_${viewType.direct_shield_association_view.id}_${uniqueId}" uniqueId ="${uniqueId}"   class="tooltip flaticon-arrow directory-text-icon ${directElementAssociationLink}" title="Link to Threat Vectors"><span class="flaticon-threat-control subscriptIcon"></span></span>`;
                            break;
                        }
                    }
                }
            }
            else if (!backing.DirectMode) {
                if ((objectType === "shield_element" || objectType === "standard_element" || objectType === "b_control" || objectType === "threat_element") && (elementShieldId === parseInt(selectedShield)) && ((parseInt(selectedlevel) === 0) || (parseInt(selectedlevel) === level)))//show linkToExpression hotlink for circle
                {
                    let associationHotlink = view + "-association-view";
                    strVar += `<span id = "${idOfParentDiv}_${viewType.association_view.id}_${uniqueId}" uniqueId ="${uniqueId}" class="tooltip flaticon-arrow directory-text-icon ${associationHotlink}" title="Link to Expression"><span class="flaticon-expression-element subscriptIcon"></span></span>`;
                }
                else if (objectType === "sce") {
                    switch (protectionTypeSelector) {
                        case "asset" :
                        case "business_asset" : { //linkToAsset Hotlink for expression
                            let expAssetAssociationLink = view + "-expAsset-association-view";
                            strVar += " <span objectType = \"" + protectionTypeSelector + "\" id = \"" + idOfParentDiv + "_" + viewType.exp_asset_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"  sceId =\"" + elementId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + expAssetAssociationLink + "\"title=\"Link to Asset\"><span class=\"" + backing.object_type[protectionTypeSelector].icon + " subscriptIcon\"></span></span>";
                            break;
                        }
                        case "asset_type":
                        case "business_asset_type" : { //linkToAssetType Hotlink for exp
                            let expAssetTypeAssociationLink = view + "-expAssetType-association-view";
                            strVar += " <span objectType = \"" + protectionTypeSelector + "\" id = \"" + idOfParentDiv + "_" + viewType.exp_assetType_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"  sceId =\"" + elementId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + expAssetTypeAssociationLink + "\"title=\"Link to AssetType\"><span class=\"" + backing.object_type[protectionTypeSelector].icon + " subscriptIcon\"></span></span>";
                            break;
                        }
                        case "shield": { //linkToInternalControl Hotlink for expre
                            let expShieldAssociationLink = view + "-expShield-association-view";
                            strVar += " <span objectType = \"shield_element\" id = \"" + idOfParentDiv + "_" + viewType.exp_shield_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"  sceId =\"" + elementId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + expShieldAssociationLink + "\"title=\"Link to  Internal Policies\"><span class=\"flaticon-shield-element subscriptIcon\"></span></span>";
                            break;
                        }
                        case "standard": { //linkToExternalControl hotlink for express
                            let expStandardAssociationLink = view + "-expStandard-association-view";
                            strVar += " <span objectType = \"standard_element\" id = \"" + idOfParentDiv + "_" + viewType.exp_standard_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"  sceId =\"" + elementId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + expStandardAssociationLink + "\"title=\"Link to External Policies\"><span class=\"flaticon-standard-element subscriptIcon\"></span></span>";
                            break;
                        }
                        case "b_framework": { //linkToExternalControl hotlink for express
                            let expStandardAssociationLink = view + "-expStandard-association-view";
                            strVar += " <span objectType = \"b_control\" id = \"" + idOfParentDiv + "_Business_" + viewType.exp_standard_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"  sceId =\"" + elementId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + expStandardAssociationLink + "\"title=\"Link to Value Processes\"><span class=\"flaticon-business-element subscriptIcon\"></span></span>";
                            break;
                        }
                        case "threat": { //linkToExternalControl hotlink for express
                            let expStandardAssociationLink = view + "-expStandard-association-view";
                            strVar += " <span objectType = \"threat_element\" id = \"" + idOfParentDiv + "_Threat_" + viewType.exp_threat_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"  sceId =\"" + elementId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + expStandardAssociationLink + "\"title=\"Link to Threat Vectors\"><span class=\"flaticon-threat-control subscriptIcon\"></span></span>";
                            break;
                        }
                    }
                }
            }
        }
        else if (activeDesktopKey === "asset_type_map_mode_desktop" || activeDesktopKey === "asset_map_mode_desktop" || activeDesktopKey === "business_asset_type_map_mode_desktop" || activeDesktopKey === "business_asset_map_mode_desktop") {
            if (backing.isDirectMode) {
                if (objectType === "asset" || objectType === "business_asset") {
                    switch (protectionTypeSelector) {
                        case "shield": { //     case "shield": linkToInternalControl Hotlink for square
                            let directElementAssociationLink = view + "-direct-asset-element-association-view";
                            strVar += " <span elementObjectType = \"" + objectType + "\" objectType = \"shield_element\" id = \"" + idOfParentDiv + "_" + viewType.direct_asset_element_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"   class=\"tooltip flaticon-arrow directory-text-icon " + directElementAssociationLink + "\"title=\"Link to  Internal Policies\"><span class=\"flaticon-shield-element subscriptIcon\"></span></span>";
                            break;
                        }
                        case "standard": { //     case "standard": linkToExternalControl hotlink for square
                            let directElementAssociationLink = view + "-direct-asset-element-association-view";
                            strVar += " <span elementObjectType = \"" + objectType + "\" objectType = \"standard_element\" id = \"" + idOfParentDiv + "_Standard_" + viewType.direct_asset_element_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"   class=\"tooltip flaticon-arrow directory-text-icon " + directElementAssociationLink + "\"title=\"Link to External Policies\"><span class=\"flaticon-standard-element subscriptIcon\"></span></span>";
                            break;
                        }
                        case "b_framework": { //     case "standard": linkToExternalControl hotlink for square
                            let directElementAssociationLink = view + "-direct-asset-element-association-view";
                            strVar += " <span elementObjectType = \"" + objectType + "\" objectType = \"b_control\" id = \"" + idOfParentDiv + "_Business_" + viewType.direct_asset_element_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"   class=\"tooltip flaticon-arrow directory-text-icon " + directElementAssociationLink + "\"title=\"Link to Value Processes\"><span class=\"flaticon-business-element subscriptIcon\"></span></span>";
                            break;
                        }
                        case "threat": { //     case "standard": linkToExternalControl hotlink for square
                            let directElementAssociationLink = view + "-direct-asset-element-association-view";
                            strVar += " <span elementObjectType = \"" + objectType + "\" objectType = \"threat_element\" id = \"" + idOfParentDiv + "_Threat_" + viewType.direct_asset_element_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"   class=\"tooltip flaticon-arrow directory-text-icon " + directElementAssociationLink + "\"title=\"Link to Threat Vectors\"><span class=\"flaticon-threat-control subscriptIcon\"></span></span>";
                            break;
                        }

                    }
                }
                else if ((objectType === "asset_type" || objectType === "business_asset_type") && ((parseInt(selectedlevel) === 0) || (parseInt(selectedlevel) === level))) {
                    switch (protectionTypeSelector) {
                        case "shield": { //     case "shield": linkToInternalControl Hotlink for square
                            let directAssetTypeElementAssociationLink = view + "-direct-asset-type-element-association-view";
                            strVar += " <span elementObjectType = \"" + objectType + "\" objectType = \"shield_element\" id = \"" + idOfParentDiv + "_" + viewType.direct_asset_type_element_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"   class=\"tooltip flaticon-arrow directory-text-icon " + directAssetTypeElementAssociationLink + "\"title=\"Link to  Internal Policies\"><span class=\"flaticon-shield-element subscriptIcon\"></span></span>";
                            break;
                        }
                        case "standard": { //     case "standard": linkToExternalControl hotlink for square
                            let directAssetTypeElementAssociationLink = view + "-direct-asset-type-element-association-view";
                            strVar += " <span elementObjectType = \"" + objectType + "\" objectType = \"standard_element\" id = \"" + idOfParentDiv + "_Standard_" + viewType.direct_asset_type_element_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"   class=\"tooltip flaticon-arrow directory-text-icon " + directAssetTypeElementAssociationLink + "\"title=\"Link to External Policies\"><span class=\"flaticon-standard-element subscriptIcon\"></span></span>";
                            break;
                        }
                        case "b_framework": { //     case "standard": linkToExternalControl hotlink for square
                            let directAssetTypeElementAssociationLink = view + "-direct-asset-type-element-association-view";
                            strVar += " <span elementObjectType = \"" + objectType + "\" objectType = \"b_control\" id = \"" + idOfParentDiv + "_Business_" + viewType.direct_asset_type_element_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"   class=\"tooltip flaticon-arrow directory-text-icon " + directAssetTypeElementAssociationLink + "\"title=\"Link to Value Processes\"><span class=\"flaticon-business-element subscriptIcon\"></span></span>";
                            break;
                        }
                        case "threat": { //     case "standard": linkToExternalControl hotlink for square
                            let directAssetTypeElementAssociationLink = view + "-direct-asset-type-element-association-view";
                            strVar += " <span elementObjectType = \"" + objectType + "\" objectType = \"threat_element\" id = \"" + idOfParentDiv + "_Threat_" + viewType.direct_asset_type_element_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"   class=\"tooltip flaticon-arrow directory-text-icon " + directAssetTypeElementAssociationLink + "\"title=\"Link to Threat Vectors\"><span class=\"flaticon-threat-control subscriptIcon\"></span></span>";
                            break;
                        }
                    }
                }
            }
            else if (backing.isDirectMode === false) {
                if (objectType === "asset" || objectType === "business_asset") {
                    //show linkToExpression hotlink for square
                    let assetAssociationHotlink = view + "-asset-association-view";
                    strVar += " <span elementObjectType=\"" + objectType + "\" id = \"" + idOfParentDiv + "_" + viewType.asset_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + assetAssociationHotlink + "\" title=\"Link to Expression\"><span class=\"flaticon-expression-element subscriptIcon\"></span></span>";
                }
                else if ((objectType === "asset_type" || objectType === "business_asset_type") && ((parseInt(selectedlevel) === 0) || (parseInt(selectedlevel) === level))) {
                    let protectionAssociationHotlink = view + "-protection-association-view";
                    strVar += " <span elementObjectType=\"" + objectType + "\" id = \"" + idOfParentDiv + "_" + viewType.protection_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + protectionAssociationHotlink + "\" title=\"Link to Expression\"><span class=\"flaticon-expression-element subscriptIcon\"></span></span>";

                }
                else if (objectType === "sce") {
                    switch (protectionTypeSelector) {
                        case "shield": //linkToInternalControl Hotlink for expre
                        {
                            let expShieldAssociationLink = view + "-expShield-association-view";
                            strVar += " <span id = \"" + idOfParentDiv + "_" + viewType.exp_shield_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"  sceId =\"" + elementId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + expShieldAssociationLink + "\"title=\"Link to  Internal Policies\"><span class=\"flaticon-shield-element subscriptIcon\"></span></span>";
                            break;
                        }

                        case "standard": //linkToExternalControl hotlink for express
                        {
                            let expStandardAssociationLink = view + "-expStandard-association-view";
                            strVar += " <span id = \"" + idOfParentDiv + "_" + viewType.exp_standard_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"  sceId =\"" + elementId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + expStandardAssociationLink + "\"title=\"Link to External Policies\"><span class=\"flaticon-standard-element subscriptIcon\"></span></span>";
                            break;
                        }
                        case "threat": //linkToExternalControl hotlink for express
                        {
                            let expStandardAssociationLink = view + "-expStandard-association-view";
                            strVar += " <span id = \"" + idOfParentDiv + "_Threat_" + viewType.exp_standard_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"  sceId =\"" + elementId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + expStandardAssociationLink + "\"title=\"Link to Threat Vectors\"><span class=\"flaticon-threat-control subscriptIcon\"></span></span>";
                            break;
                        }
                        case "b_framework": //linkToExternalControl hotlink for express
                        {
                            let expStandardAssociationLink = view + "-expStandard-association-view";
                            strVar += " <span id = \"" + idOfParentDiv + "_Business_" + viewType.exp_standard_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"  sceId =\"" + elementId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + expStandardAssociationLink + "\"title=\"Link to Value Processes\"><span class=\"flaticon-business-element subscriptIcon\"></span></span>";
                            break;
                        }
                    }

                }
            }
        }
        else if (activeDesktopKey === "anz_expression_desktop") {
            if (backing.isDirectMode === false) {
                if (objectType === "sce") {
                    switch (protectionTypeSelector) {
                        case "asset" :
                        case "business_asset"://linkToAsset Hotlink for square
                        {
                            let expAssetAssociationLink = view + "-expAsset-association-view";
                            strVar += " <span objectType = \"" + protectionTypeSelector + "\" id = \"" + idOfParentDiv + "_" + viewType.exp_asset_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"  sceId =\"" + elementId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + expAssetAssociationLink + "\"title=\"Link to Asset\"><span class=\"" + backing.object_type[protectionTypeSelector].icon + "  subscriptIcon\"></span></span>";
                            break;
                        }
                        case "asset_type":
                        case "business_asset_type"://linkToAssetType Hotlink for square
                        {
                            let expAssetTypeAssociationLink = view + "-expAssetType-association-view";
                            strVar += " <span objectType = \"" + protectionTypeSelector + "\" id = \"" + idOfParentDiv + "_" + viewType.exp_assetType_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"  sceId =\"" + elementId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + expAssetTypeAssociationLink + "\"title=\"Link to AssetType\"><span class=\"" + backing.object_type[protectionTypeSelector].icon + "  subscriptIcon\"></span></span>";

                            break;
                        }
                        case "shield": //linkToInternalControl Hotlink for expre
                        {
                            let expShieldAssociationLink = view + "-expShield-association-view";
                            strVar += " <span id = \"" + idOfParentDiv + "_" + viewType.exp_shield_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"  sceId =\"" + elementId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + expShieldAssociationLink + "\"title=\"Link to  Internal Policies\"><span class=\"flaticon-shield-element subscriptIcon\"></span></span>";
                            break;
                        }
                        case "standard": {
                            let expStandardAssociationLink = view + "-expStandard-association-view";
                            strVar += " <span id = \"" + idOfParentDiv + "_" + viewType.exp_standard_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"  sceId =\"" + elementId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + expStandardAssociationLink + "\"title=\"Link to External Policies\"><span class=\"flaticon-standard-element subscriptIcon\"></span></span>";
                            break;
                        }
                        case "b_framework"://linkToExternalControl hotlink for express
                        {
                            let expStandardAssociationLink = view + "-expStandard-association-view";
                            strVar += " <span id = \"" + idOfParentDiv + "_Business_" + viewType.exp_standard_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"  sceId =\"" + elementId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + expStandardAssociationLink + "\"title=\"Link to Value Processes\"><span class=\"flaticon-business-element subscriptIcon\"></span></span>";
                            break;
                        }
                        case "threat": {
                            let expStandardAssociationLink = view + "-expStandard-association-view";
                            strVar += " <span id = \"" + idOfParentDiv + "_Threat_" + viewType.exp_standard_association_view.id + "_" + uniqueId + "\" uniqueId =\"" + uniqueId + "\"  sceId =\"" + elementId + "\" class=\"tooltip flaticon-arrow directory-text-icon " + expStandardAssociationLink + "\"title=\"Link to Threat Vectors\"><span class=\"flaticon-threat-control subscriptIcon\"></span></span>";
                            break;
                        }
                    }
                }
            }
        }
    }
    if(!isdropDown)
        strVar += `<span id = "${idOfParentDiv}_${uniqueId}highlightItem" uniqueId ="${uniqueId}" class="tooltip flaticon-show-map directory-text-icon highlight-item-hotlink" title="Highlight" elementType="${objectType}"></span>`;
    return strVar;
}
var renderHotlinkInventoryDv = function (element, idOfParentDiv, view, viewName, isRoot, isdropDown) {
    let strVar = "";
    let activeDesktop, activeDesktopKey;
    let {linkName, linkType, objectType, uniqueId, elementId, shieldElementTypeId} = element;
    let viewType = backing.view_type;
    activeDesktop = getActiveDesktop(undefined, view);
    activeDesktopKey = activeDesktop.key;

    if (!element.linkName && element[ATTR.objectType] && (element.linkType === "asset_could_delivers_sce" || element.linkType === "asset_shall_delivers_sce")) {
        if (activeDesktop.key === "ruler_type_desktop" && viewName === "anchorView") {
            if (view) {
                var evaluationHotlink = view + "-evaluation-view";
            }
            strVar += " <span id = \"" + idOfParentDiv + "_" + backing.view_type.evaluationview.id + "_" + element.uniqueId + "\" uniqueId =\"" + element.uniqueId + "\" class=\"tooltip flaticon-ruler directory-text-icon " + evaluationHotlink + "\" style=\"visibility: visible;\" title=\"Evaluation View\"></span>";
        }
    }
    let elementTypeIdToCompare = parseInt($("#" + activeDesktop.selector.level_dropdown_selected_id).attr("elementTypeId"));
    if (element[ATTR.objectType] && (element.shieldElementTypeId === elementTypeIdToCompare) && viewName === "anchorView") {
        if (activeDesktop.key === "shield_element_ruler_type_desktop") {
            if (view) {
                var evaluationHotlink = view + "-shield-element-evaluation-view";
            }
            strVar += " <span id = \"" + idOfParentDiv + "_" + backing.view_type.evaluationview.id + "_" + element.uniqueId + "\" uniqueId =\"" + element.uniqueId + "\" class=\"tooltip flaticon-ruler directory-text-icon " + evaluationHotlink + "\" style=\"visibility: visible;\" title=\"Evaluation View\"></span>";
        }
    }
    if (objectType && !objectType.match(/_root$/) && (objectType !== "perspective")) {
        let dataviewHotlink = view + "-data-view";
        let pivotviewHotlink = view + "-pivot-view";
        strVar += `<span id = "${idOfParentDiv}_${viewType.dataview.id}_${uniqueId}" uniqueId = "${uniqueId}" class="tooltip flaticon-open-in-tab-2 directory-text-icon ${dataviewHotlink}" title="Data View"></span>`;
        if (objectType !== "artifact") {
            strVar += `<span id = "${idOfParentDiv}_${viewType.pivot_view.id}_${uniqueId}" uniqueId ="${uniqueId}" class="tooltip flaticon-axis-arrows directory-text-icon ${pivotviewHotlink}" title=" Pivot View"></span>`;
        }
    }
    if (viewName === "anchorView" && objectType && objectType === "sce") {
        let expressionViewHotlink = view + "-expression-view";
        strVar += `<span id = "${idOfParentDiv}_${viewType.expressionview.id}_${uniqueId}" uniqueId = "${uniqueId}" sceId = "${element.elementId}" class="tooltip flaticon-open-tab-2 directory-text-icon ${expressionViewHotlink}" title="Expression View"></span>`;
    }
    switch (activeDesktopKey) {
        case "organisational_unit_desktop" : {
            strVar += renderHotlinkForDesktop("organizational_unit", "organizational_unit_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot);
            break;
        }
        case "roles_desktop": {
            strVar += renderHotlinkForDesktop("role", "role_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot);
            break;
        }
        case "users_desktop": {
            strVar += renderHotlinkForDesktop("user", "user_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot);
            break;
        }
        case "shield_schema_desktop" : {
            strVar += renderHotlinkForDesktop("shield_element", "shield_element_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot, undefined, isdropDown);
            break;
        }
        case "classification_map_mode_desktop": {
            strVar += renderHotlinkForDesktop("shield_element", "shield_element_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot, true, isdropDown);
            break;
        }
        case "standard_schema_desktop" : {
            strVar += renderHotlinkForDesktop("standard_element", "shield_element_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot, undefined, isdropDown);
            break;
        }
        case "standard_map_mode_desktop": {
            strVar += renderHotlinkForDesktop("standard_element", "shield_element_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot, true, isdropDown);
            break;
        }
        case "threat_schema_desktop" : {
            strVar += renderHotlinkForDesktop("threat_element", "shield_element_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot, undefined, isdropDown);
            break;
        }
        case "threat_map_mode_desktop": {
            strVar += renderHotlinkForDesktop("threat_element", "shield_element_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot, true, isdropDown);
            break;
        }
        case "business_schema_desktop" : {
            strVar += renderHotlinkForDesktop("b_control", "shield_element_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot, undefined, isdropDown);
            break;
        }
        case "business_map_mode_desktop": {
            strVar += renderHotlinkForDesktop("b_control", "shield_element_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot, true, isdropDown);
            break;
        }
        case "shield_element_ruler_type_desktop" : {
            strVar += renderHotlinkForDesktop("shield_element", "shield_element_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot, undefined, isdropDown);
            break;
        }
        case "ruler_type_desktop": {
            strVar += renderHotlinkForDesktop("role", "role_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot, undefined, isdropDown);
            break;
        }
        case "provider_desktop": {
            strVar += renderHotlinkForDesktop("provider_info", "provider_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot);
            break;
        }
        case "asset_type_desktop" : {
            strVar += renderHotlinkForDesktop("asset_type", "asset_type_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot);
            break;
        }
        case "business_provider_desktop": {
            strVar += renderHotlinkForDesktop("business_provider", "business_provider_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot);
            break;
        }
        case "business_asset_type_desktop" : {
            strVar += renderHotlinkForDesktop("business_asset_type", "business_asset_type_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot);
            break;
        }
        case "asset_type_map_mode_desktop": {
            strVar += renderHotlinkForDesktop("asset_type", "asset_type_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot, true, isdropDown);
            break;
        }
        case "business_asset_type_map_mode_desktop": {
            strVar += renderHotlinkForDesktop("business_asset_type", "business_asset_type_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot, true, isdropDown);
            break;
        }
        case "asset_desktop": {
            strVar += renderHotlinkForDesktop("asset", "asset_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot);
            break;
        }
        case "business_asset_desktop": {
            strVar += renderHotlinkForDesktop("business_asset", "business_asset_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot);
            break;
        }
        case "asset_map_mode_desktop" : {
            strVar += renderHotlinkForDesktop("asset", "asset_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot, true, isdropDown);
            break;
        }
        case "business_asset_map_mode_desktop" : {
            strVar += renderHotlinkForDesktop("business_asset", "business_asset_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot, true, isdropDown);
            break;
        }
        case "expression_desktop": {
            strVar += renderHotlinkForDesktop("sce", "sce_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot);
            break;
        }
        case "anz_expression_desktop": {
            strVar += renderHotlinkForDesktop("sce", "sce_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot, true, isdropDown);
            break;
        }
        case "objective_parameter_desktop" : {
            strVar += renderHotlinkForDesktop("objective_parameter_word", "objective_parameter_word_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot);
            break;
        }
        case "method_parameter_desktop": {
            strVar += renderHotlinkForDesktop("method_parameter_word", "method_parameter_word_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot);
            break;
        }
        case "subject_parameter_desktop": {
            strVar += renderHotlinkForDesktop("subject_parameter_word", "subject_parameter_word_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot);
            break;
        }
        case "content_parameter_desktop": {
            strVar += renderHotlinkForDesktop("content_parameter_word", "content_parameter_word_root", element, idOfParentDiv, view, viewName, activeDesktop, isRoot);
            break;
        }
    }
    if (element.children && element.children.length >= 0 && viewName !== "dataView" && viewName !== "RingView") {
        let depth = calculateDepth(element);
        if (depth > 1)
            strVar += " <span class=\"flaticon-fullscreen directory-text-icon expandDv\" title=\"Expand Full Subtree\"></span> <span class=\"flaticon-collapsing-four-arrows-interface-button-symbol directory-text-icon collapseDv\" title=\"Collapse Full Subtree\"></span>";
    }
    return strVar;
};

function renderEvaluationHotlink(element, idOfParentDiv, isBiview) {
    let strVar = "", evaluationHotlink;
    let activeDesktop = getActiveDesktop(isBiview);
    let view = getSingleOrBiView(isBiview);
    if (element[ATTR.objectType] && (element.linkType === "asset_could_delivers_sce"
        || element.linkType === "asset_shall_delivers_sce")
        && !backing.isDirectMode) {
        if (activeDesktop.key === "ruler_type_desktop") {
            if (view) {
                evaluationHotlink = view + "-evaluation-view";
            }
            strVar += " <span id = \"" + idOfParentDiv + "_" + backing.view_type.evaluationview.id + "_" + element.uniqueId + "\" uniqueId =\"" + element.uniqueId + "\" class=\"tooltip flaticon-ruler directory-text-icon " + evaluationHotlink + "\" style=\"visibility: visible\" title=\"Evaluation View\"></span>";
        }
    }
    if (element[ATTR.objectType]
        && element.linkType === "direct_asset_to_shield_element_link"
        && backing.isDirectMode) {
        if (activeDesktop.key === "ruler_type_desktop") {
            if (view) {
                evaluationHotlink = view + "-evaluation-view";
            }
            strVar += " <span id = \"" + idOfParentDiv + "_" + backing.view_type.evaluationview.id + "_" + element.uniqueId + "\" uniqueId =\"" + element.uniqueId + "\" class=\"tooltip flaticon-ruler directory-text-icon " + evaluationHotlink + "\" style=\"visibility: visible\" title=\"Evaluation View\"></span>";
        }
    }
    let elementTypeIdToCompare = parseInt($("#" + activeDesktop.selector.level_dropdown_selected_id).attr("elementTypeId"));
    if (element[ATTR.objectType] && (element.shieldElementTypeId === elementTypeIdToCompare)) {
        if (activeDesktop.key === "shield_element_ruler_type_desktop") {
            if (view) {
                evaluationHotlink = view + "-shield-element-evaluation-view";
            }
            strVar += " <span id = \"" + idOfParentDiv + "_" + backing.view_type.evaluationview.id + "_" + element.uniqueId + "\" uniqueId =\"" + element.uniqueId + "\" class=\"tooltip flaticon-ruler directory-text-icon " + evaluationHotlink + "\" style=\"visibility: visible\" title=\"Evaluation View\"></span>";
        }
    }
    return strVar;
}

function highlightHotlinkForGivenHotlinkIds(children_views, isBiview) {
    let idsOfViewsToClose = [];
    if (children_views) {
        let hotlinkIds = Object.keys(children_views);
        for (let i = 0; i < hotlinkIds.length; i++) {
            if ($("#" + hotlinkIds[i]).length != 0) {
                if (children_views[hotlinkIds[i]].match(/^ringView_/) === null) {
                    $("#" + hotlinkIds[i]).addClass("active");
                    $("#" + hotlinkIds[i]).closest(".r_conainer").find(".d-text").addClass("active");
                }
            }
            else {
                idsOfViewsToClose.push(children_views[hotlinkIds[i]]);
            }
        }
    }
    for (let i = 0; i < idsOfViewsToClose.length; i++) {
        if ($("#" + idsOfViewsToClose[i]))
            closeViewUpdateOpenedViews(idsOfViewsToClose[i], isBiview);
    }
}

function highlightHotlinks(isBiview) {
    let activeDesktop = getActiveDesktop(isBiview);
    let backingview = isBiview ? backing.biview : backing.singleview;
    highlightHotlinkForGivenHotlinkIds(backingview.active_desktop.children_views, isBiview);
    let opened_views = activeDesktop.opened_views;
    if (opened_views) {
        for (let i = 0; i < opened_views.length; i++) {
            if ($("#" + opened_views[i].div_id).length != 0) {
                if (opened_views[i].view_type !== "ring_view")
                    highlightHotlinkForGivenHotlinkIds(opened_views[i].children_views, isBiview);
            }
        }
    }
}

var renderCheckHotlinkForElementAssociation = function (element, classParam) {
    let strVar = "";
    if (element.associationMapped === true) {
        strVar += `<span id ="${element.elementId}" uniqueId ="${element.uniqueId}" class="flaticon-arrow ${classParam} checkbox-map"><span class="tooltip dis-none"></span></span>`;
    }
    else {
        strVar += `<span id ="${element.elementId}" uniqueId ="${element.uniqueId}" class="flaticon-unlink ${classParam} checkbox-map"><span class="tooltip dis-none"></span></span>`;
    }
    return strVar;
}

var renderCheckMapWithTripleState = function (element, classParam) {
    let strVar = "";
    if (!element.protectionType) {
        strVar += `<span id ="${element.elementId}" uniqueId ="${element.uniqueId}" class="flaticon-unlink ${classParam} checkbox-map"><span class="tooltip dis-none"></span></span>`;
    }
    else if (element.protectionType === "shall") {
        strVar += `<span id = "${element.elementId}" uniqueId ="${element.uniqueId}" class="flaticon-arrow ${classParam} checkbox-map"><span class="tooltip dis-none"></span></span>`;
    }
    else if (element.protectionType === "could") {
        strVar += `<span id = "${element.elementId}" uniqueId ="${element.uniqueId}" class="flaticon-unlink iconShadow ${classParam} checkbox-map"><span class="tooltip dis-none"></span></span>`;
    }
    return strVar;
}

var renderCheckMapWithDoubleState = function (element, classParam) {
    let strVar = "";
    if (element.fulfillsMapped) {
        strVar += `<span id ="${element.elementId}" uniqueId ="${element.uniqueId}" class="flaticon-arrow ${classParam} checkbox-map"><span class="tooltip dis-none"></span></span>`;
    }
    else {
        strVar += `<span id ="${element.elementId}" uniqueId ="${element.uniqueId}" class="flaticon-unlink ${classParam} checkbox-map"><span class="tooltip dis-none"></span></span>`;
    }
    return strVar;
}
