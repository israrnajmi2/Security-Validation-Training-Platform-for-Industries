const objectTypeInScope = new TestUtil();

function handleSingleViewDesktop(utilFunction, desktop, changeRow) {
    let divId = desktop.div_id;
    $(".single-desktop").addClass("dis-none");
    if (changeRow) {
        modifyContainerHeight($("#" + desktop.anchor_div_id));
    }
    $("#" + divId).removeClass("dis-none");
    showHeader("singleview");
    if (desktop.isOpened === false) {
        desktop.isOpened = true;
        utilFunction();
    }
}

function handleShowShieldSchemaDesktopSingleViewCase() {
    let desktopUtil = new ShieldSchemaDesktopUtils();
    let desktop = backing.singleview.workspaces.cla_workspace.desktops.shield_schema_desktop;
    handleSingleViewDesktop(desktopUtil.getShieldsOfShieldType, desktop);
}

function handleShowClassificationMapModeDesktopSingleViewCase() {
    let desktopUtil = new ClassificationMapModeDesktopUtils();
    let desktop = backing.singleview.workspaces.cla_workspace.desktops.classification_map_mode_desktop;
    handleSingleViewDesktop(desktopUtil.getShieldStartingPoints, desktop);
}

function handleShowStandardSchemaDesktopSingleViewCase() {
    let desktopUtil = new StandardSchemaDesktopUtils();
    let desktop = backing.singleview.workspaces.std_workspace.desktops.standard_schema_desktop;
    handleSingleViewDesktop(desktopUtil.getShieldsOfShieldType, desktop);
}

function handleShowThreatSchemaDesktopSingleViewCase() {
    let desktopUtil = new ThreatSchemaDesktopUtils();
    let desktop = backing.singleview.workspaces.threat_workspace.desktops.threat_schema_desktop;
    handleSingleViewDesktop(desktopUtil.getShieldsOfShieldType, desktop);
}

function handleShowStandardMapModeDesktopSingleViewCase() {
    let desktopUtil = new StandardMapModeDesktopUtils();
    let desktop = backing.singleview.workspaces.std_workspace.desktops.standard_map_mode_desktop;
    handleSingleViewDesktop(desktopUtil.getShieldStartingPoints, desktop);
}

function handleShowThreatMapModeDesktopSingleViewCase() {
    let desktopUtil = new ThreatMapModeDesktopUtils();
    let desktop = backing.singleview.workspaces.threat_workspace.desktops.threat_map_mode_desktop;
    handleSingleViewDesktop(desktopUtil.getShieldStartingPoints, desktop);
}

function handleShowBusinessSchemaDesktopSingleViewCase() {
    let desktopUtil = new BusinessSchemaDesktopUtils();
    let desktop = backing.singleview.workspaces.business_workspace.desktops.business_schema_desktop;
    handleSingleViewDesktop(desktopUtil.getShieldsOfShieldType, desktop);
}

function handleShowBusinessMapModeDesktopSingleViewCase() {
    let desktopUtil = new BusinessMapModeDesktopUtils();
    let desktop = backing.singleview.workspaces.business_workspace.desktops.business_map_mode_desktop;
    handleSingleViewDesktop(desktopUtil.getShieldStartingPoints, desktop);
}

function handleShowRulerTypeDesktopSingleViewCase() {
    let desktopUtil = new RulerTypeDesktopUtils();
    let desktop = backing.singleview.workspaces.eval_workspace.desktops.ruler_type_desktop;
    handleSingleViewDesktop(desktopUtil.getShieldsOfShieldType, desktop);
}

function handleShowShieldElementRulerTypeDesktopSingleViewCase() {
    let desktopUtil = new ShieldElementRulerTypeDesktopUtils();
    let desktop = backing.singleview.workspaces.eval_workspace.desktops.shield_element_ruler_type_desktop;
    handleSingleViewDesktop(desktopUtil.getShieldsOfShieldType, desktop);
}

function handleShowAssetDesktopSingleViewCase() {
    let desktopUtil = new AssetDesktopUtils();
    let desktop = backing.singleview.workspaces.cla_workspace.desktops.asset_desktop;
    handleSingleViewDesktop(desktopUtil.getElementGroups, desktop);
}

function handleShowAssetMapModeDesktopSingleViewCase() {
    let desktopUtil = new AssetMapModeDesktopUtils();
    let desktop = backing.singleview.workspaces.cla_workspace.desktops.asset_map_mode_desktop;
    handleSingleViewDesktop(desktopUtil.getShieldStartingPoints, desktop);
}

function handleShowBusinessAssetMapModeDesktopSingleViewCase() {
    let desktopUtil = new BusinessAssetMapModeDesktopUtils();
    let desktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_map_mode_desktop;
    handleSingleViewDesktop(desktopUtil.getShieldStartingPoints, desktop);
}

function handleShowAssetTypeDesktopSingleViewCase() {
    let desktopUtil = new AssetTypeDesktopUtils();
    let desktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_desktop;
    handleSingleViewDesktop(desktopUtil.getAssetTypeAllowedLevels, desktop, true);
}

function handleShowBusinessAssetTypeDesktopSingleViewCase() {
    let desktopUtil = new BusinessAssetTypeDesktopUtils();
    let desktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_desktop;
    handleSingleViewDesktop(desktopUtil.getAssetTypeAllowedLevels, desktop, true);
}

function handleShowBusinessAssetTypeMapModeDesktopSingleViewCase() {
    let desktopUtil = new BusinessAssetTypeMapModeDesktopUtils();
    let desktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_type_map_mode_desktop;
    handleSingleViewDesktop(desktopUtil.getShieldStartingPoints, desktop);
}

function handleShowAssetTypeMapModeDesktopSingleViewCase() {
    let desktopUtil = new AssetTypeMapModeDesktopUtils();
    let desktop = backing.singleview.workspaces.cla_workspace.desktops.asset_type_map_mode_desktop;
    handleSingleViewDesktop(desktopUtil.getShieldStartingPoints, desktop);
}

function handleShowProviderDesktopSingleViewCase() {
    let desktopUtil = new ProviderDesktopUtils();
    let desktop = backing.singleview.workspaces.cla_workspace.desktops.provider_desktop;
    handleSingleViewDesktop(desktopUtil.getElementGroups, desktop);
}

function handleShowBusinessProviderDesktopSingleViewCase() {
    let desktopUtil = new BusinessProviderDesktopUtils();
    let desktop = backing.singleview.workspaces.business_workspace.desktops.business_provider_desktop;
    handleSingleViewDesktop(desktopUtil.getElementGroups, desktop);
}

function handleShowBusinessAssetDesktopSingleViewCase() {
    let desktopUtil = new BusinessAssetDesktopUtils();
    let desktop = backing.singleview.workspaces.business_workspace.desktops.business_asset_desktop;
    handleSingleViewDesktop(desktopUtil.getElementGroups, desktop);
}

function handleShowExpressionDesktopSingleViewCase() {
    let desktopUtil = new ExpressionDesktopUtils();
    let desktop = backing.singleview.workspaces.expression_workspace.desktops.expression_desktop;
    handleSingleViewDesktop(desktopUtil.getElementGroups, desktop);
}

function handleShowAnzExpressionDesktopSingleViewCase() {
    let desktopUtil = new AnzExpressionDesktopUtils();
    let desktop = backing.singleview.workspaces.expression_workspace.desktops.anz_expression_desktop;
    handleSingleViewDesktop(desktopUtil.getShieldStartingPoints, desktop);
}

function handleShowObjectiveParameterDesktopSingleViewCase() {
    let desktopUtil = new ObjectiveParameterDesktopUtils();
    let desktop = backing.singleview.workspaces.expression_workspace.desktops.objective_parameter_desktop;
    handleSingleViewDesktop(desktopUtil.getDirectoryView, desktop);

}

function handleShowMethodParameterDesktopSingleViewCase() {
    let desktopUtil = new MethodParameterDesktopUtils();
    let desktop = backing.singleview.workspaces.expression_workspace.desktops.method_parameter_desktop;
    handleSingleViewDesktop(desktopUtil.getDirectoryView, desktop);
}

function handleShowContentParameterDesktopSingleViewCase() {
    let desktopUtil = new ContentParameterDesktopUtils();
    let desktop = backing.singleview.workspaces.expression_workspace.desktops.content_parameter_desktop;
    handleSingleViewDesktop(desktopUtil.getDirectoryView, desktop);
}

function handleShowSubjectParameterDesktopSingleViewCase() {
    let desktopUtil = new SubjectParameterDesktopUtils();
    let desktop = backing.singleview.workspaces.expression_workspace.desktops.subject_parameter_desktop;
    handleSingleViewDesktop(desktopUtil.getDirectoryView, desktop);
}

function handleShowOrganisationalUnitDesktopSingleViewCase() {
    let desktopUtil = new OrganisationalUnitDesktopUtils();
    let desktop = backing.singleview.workspaces.administration_workspace.desktops.organisational_unit_desktop;
    handleSingleViewDesktop(desktopUtil.getDirectoryView, desktop);
}

function handleShowUsersSingleViewCase() {
    let desktopUtil = new UsersDesktopUtils();
    let desktop = backing.singleview.workspaces.administration_workspace.desktops.users_desktop;
    handleSingleViewDesktop(desktopUtil.getDirectoryView, desktop);
}

function handleShowRolesSingleViewCase() {
    let desktopUtil = new RolesDesktopUtils();
    let desktop = backing.singleview.workspaces.administration_workspace.desktops.roles_desktop;
    handleSingleViewDesktop(desktopUtil.getDirectoryView, desktop);
}

function handleBiViewDesktop(utilFunction, desktop) {
    let divId = desktop.div_id;
    //dis-none all desktop divs
    $(".bi-desktop").addClass("dis-none");
    //selected desktop remove class display-none
    $("#" + divId).removeClass("dis-none");
    showHeader("biview");
    if (desktop.isOpened === false) {
        desktop.isOpened = true;
        utilFunction();
    }
}

function handleShowShieldSchemaDesktopBiViewCase() {
    let desktopUtil = new BiviewShieldSchemaDesktopUtils();
    let desktop = backing.biview.workspaces.bi_cla_workspace.desktops.shield_schema_desktop;
    handleBiViewDesktop(desktopUtil.getShieldsOfShieldType, desktop);
}

function handleShowClassificationMapModeDesktopBiViewCase() {
    let desktopUtil = new BiviewClassificationMapModeDesktopUtils();
    let desktop = backing.biview.workspaces.bi_cla_workspace.desktops.classification_map_mode_desktop;
    handleBiViewDesktop(desktopUtil.getShieldStartingPoints, desktop);

}

function handleShowStandardSchemaDesktopBiViewCase() {
    let desktopUtil = new BiviewStandardSchemaDesktopUtils();
    let desktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_schema_desktop;
    handleBiViewDesktop(desktopUtil.getShieldsOfShieldType, desktop);
}

function handleShowThreatSchemaDesktopBiViewCase() {
    let desktopUtil = new BiviewThreatSchemaDesktopUtils();
    let desktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_schema_desktop;
    handleBiViewDesktop(desktopUtil.getShieldsOfShieldType, desktop);
}

function handleShowStandardMapModeDesktopBiViewCase() {
    let desktopUtil = new BiviewStdMapModeDesktopUtils();
    let desktop = backing.biview.workspaces.bi_std_workspace.desktops.standard_map_mode_desktop;
    handleBiViewDesktop(desktopUtil.getShieldStartingPoints, desktop);
}

function handleShowThreatMapModeDesktopBiViewCase() {
    let desktopUtil = new BiviewThreatMapModeDesktopUtils();
    let desktop = backing.biview.workspaces.bi_threat_workspace.desktops.threat_map_mode_desktop;
    handleBiViewDesktop(desktopUtil.getShieldStartingPoints, desktop);
}

function handleShowBusinessSchemaDesktopBiViewCase() {
    let desktopUtil = new BiviewBusinessSchemaDesktopUtils();
    let desktop = backing.biview.workspaces.bi_business_workspace.desktops.business_schema_desktop;
    handleBiViewDesktop(desktopUtil.getShieldsOfShieldType, desktop);
}

function handleShowBusinessMapModeDesktopBiViewCase() {
    let desktopUtil = new BiviewBusinessMapModeDesktopUtils();
    let desktop = backing.biview.workspaces.bi_business_workspace.desktops.business_map_mode_desktop;
    handleBiViewDesktop(desktopUtil.getShieldStartingPoints, desktop);
}

function handleShowRulerTypeDesktopBiViewCase() {
    let desktopUtil = new BiViewRulerTypeDesktopUtils();
    let desktop = backing.biview.workspaces.bi_eval_workspace.desktops.ruler_type_desktop;
    handleBiViewDesktop(desktopUtil.getShieldsOfShieldType, desktop);
}

function handleShowShieldElementRulerTypeDesktopBiViewCase() {
    let desktopUtil = new BiViewShieldElementRulerTypeDesktopUtils();
    let desktop = backing.biview.workspaces.bi_eval_workspace.desktops.shield_element_ruler_type_desktop;
    handleBiViewDesktop(desktopUtil.getShieldsOfShieldType, desktop);
}

function handleShowAssetDesktopBiViewCase() {
    let desktopUtil = new BiViewAssetDesktopUtils();
    let desktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_desktop;
    handleBiViewDesktop(desktopUtil.getElementGroups, desktop);
}

function handleShowAssetMapModeDesktopBiViewCase() {
    let desktopUtil = new BiViewAssetMapModeDesktopUtils();
    let desktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_map_mode_desktop;
    handleBiViewDesktop(desktopUtil.getShieldStartingPoints, desktop);
}

function handleShowAssetTypeDesktopBiViewCase() {
    let desktopUtil = new BiViewAssetTypeDesktopUtils();
    let desktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_desktop;
    handleBiViewDesktop(desktopUtil.getAssetTypeAllowedLevels, desktop);
}

function handleShowAssetTypeMapModeDesktopBiViewCase() {
    let desktopUtil = new BiViewAssetTypeMapModeDesktopUtils();
    let desktop = backing.biview.workspaces.bi_cla_workspace.desktops.asset_type_map_mode_desktop;
    handleBiViewDesktop(desktopUtil.getShieldStartingPoints, desktop);

}

function handleShowProviderDesktopBiViewCase() {
    let desktopUtil = new BiViewProviderDesktopUtils();
    let desktop = backing.biview.workspaces.bi_cla_workspace.desktops.provider_desktop;
    handleBiViewDesktop(desktopUtil.getElementGroups, desktop);
}

function handleShowBusinessAssetDesktopBiViewCase() {
    let desktopUtil = new BiViewBusinessAssetDesktopUtils();
    let desktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_desktop;
    handleBiViewDesktop(desktopUtil.getElementGroups, desktop);
}

function handleShowBusinessAssetMapModeDesktopBiViewCase() {
    let desktopUtil = new BiViewBusinessAssetMapModeDesktopUtils();
    let desktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_map_mode_desktop;
    handleBiViewDesktop(desktopUtil.getShieldStartingPoints, desktop);
}

function handleShowBusinessAssetTypeDesktopBiViewCase() {
    let desktopUtil = new BiViewBusinessAssetTypeDesktopUtils();
    let desktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_desktop;
    handleBiViewDesktop(desktopUtil.getAssetTypeAllowedLevels, desktop);
}

function handleShowBusinessAssetTypeMapModeDesktopBiViewCase() {
    let desktopUtil = new BiViewBusinessAssetTypeMapModeDesktopUtils();
    let desktop = backing.biview.workspaces.bi_business_workspace.desktops.business_asset_type_map_mode_desktop;
    handleBiViewDesktop(desktopUtil.getShieldStartingPoints, desktop);
}

function handleShowBusinessProviderDesktopBiViewCase() {
    let desktopUtil = new BiViewBusinessProviderDesktopUtils();
    let desktop = backing.biview.workspaces.bi_business_workspace.desktops.business_provider_desktop;
    handleBiViewDesktop(desktopUtil.getElementGroups, desktop);
}

function handleShowExpressionDesktopBiViewCase() {
    let desktopUtil = new BiViewExpressionDesktopUtils();
    let desktop = backing.biview.workspaces.bi_expression_workspace.desktops.expression_desktop;
    handleBiViewDesktop(desktopUtil.getElementGroups, desktop);
}

function handleShowAnzExpressionDesktopBiViewCase() {
    let desktopUtil = new BiViewAnzExpressionDesktopUtils();
    let desktop = backing.biview.workspaces.bi_expression_workspace.desktops.anz_expression_desktop;
    handleBiViewDesktop(desktopUtil.getShieldStartingPoints, desktop);
}

function handleShowObjectiveParameterDesktopBiViewCase() {
    let desktopUtil = new BiViewObjectiveParameterDesktopUtils();
    let desktop = backing.biview.workspaces.bi_expression_workspace.desktops.objective_parameter_desktop;
    handleBiViewDesktop(desktopUtil.getDirectoryView, desktop);
}

function handleShowMethodParameterDesktopBiViewCase() {
    let desktopUtil = new BiViewMethodParameterDesktopUtils();
    let desktop = backing.biview.workspaces.bi_expression_workspace.desktops.method_parameter_desktop;
    handleBiViewDesktop(desktopUtil.getDirectoryView, desktop);
}

function handleShowContentParameterDesktopBiViewCase() {
    let desktopUtil = new BiViewContentParameterDesktopUtils();
    let desktop = backing.biview.workspaces.bi_expression_workspace.desktops.content_parameter_desktop;
    handleBiViewDesktop(desktopUtil.getDirectoryView, desktop);
}

function handleShowSubjectParameterDesktopBiViewCase() {
    let desktopUtil = new BiViewSubjectParameterDesktopUtils();
    let desktop = backing.biview.workspaces.bi_expression_workspace.desktops.subject_parameter_desktop;
    handleBiViewDesktop(desktopUtil.getDirectoryView, desktop);
}

function handleShowOrganisationalUnitDesktopBiViewCase() {
    let desktopUtil = new BiViewOrganisationalUnitDesktopUtils();
    let desktop = backing.biview.workspaces.bi_administration_workspace.desktops.organisational_unit_desktop;
    handleBiViewDesktop(desktopUtil.getDirectoryView, desktop);
}

function handleShowUsersDesktopBiViewCase() {
    let desktopUtil = new BiViewUsersDesktopUtils();
    let desktop = backing.biview.workspaces.bi_administration_workspace.desktops.users_desktop;
    handleBiViewDesktop(desktopUtil.getDirectoryView, desktop);
}

function handleShowRolesDesktopBiViewCase() {
    let desktopUtil = new BiViewRolesDesktopUtils();
    let desktop = backing.biview.workspaces.bi_administration_workspace.desktops.roles_desktop;
    handleBiViewDesktop(desktopUtil.getDirectoryView, desktop);
}

function TestUtil() {

    function getAlreadyContainObjTypeWithLevel(keyValuePair, objectType, level) {
        let keys = Object.keys(keyValuePair);
        for (let i = 0; i < keys.length; i++) {
            let value = keyValuePair[keys[i]];
            if (value.objectType && value.level && value.objectType === objectType && value.level === level)
                return value.randomId;
        }
        return null;
    }

    function getAlreadyContainObjTypeAndElementTypeCombination(keyValuePair, objectType, shieldElementTypeId) {
        let keys = Object.keys(keyValuePair);
        for (let i = 0; i < keys.length; i++) {
            let value = keyValuePair[keys[i]];
            if (value.objectType && value.shieldElementTypeId && value.objectType === objectType && value.shieldElementTypeId === shieldElementTypeId)
                return value.randomId;
        }
        return null;
    }

    function getAlreadyContainLinkName(keyValuePair, linkName) {
        let keys = Object.keys(keyValuePair);
        for (let i = 0; i < keys.length; i++) {
            let value = keyValuePair[keys[i]];
            if (value.linkName && value.linkName === linkName)
                return value.randomId;
        }
        return null;
    }

    function getAlreadyContainObjType(keyValuePair, objectType) {
        let keys = Object.keys(keyValuePair);
        for (let i = 0; i < keys.length; i++) {
            let value = keyValuePair[keys[i]];
            if (value.objectType && value.objectType === objectType)
                return value.randomId;
        }
        return null;
    }

    function isFoundInArray(val, array) {
        for (let i = 0; i < array.length; i++) {
            if (val === array[i])
                return true;
        }
        return false;
    }

    function stringArrayUnion(array1, array2) {
        if (!array1 && !array2)
            return [];
        else if (!array1)
            return array2.slice();
        else if (!array2)
            return array1.slice();

        let array3 = array1.slice();
        for (let i = 0; i < array2.length; i++) {
            if (!isFoundInArray(array2[i], array3)) {
                array3.push(array2[i]);
            }
        }
        return array3;
    }

    function guidGenerator() {
        let S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    function processObjectTypeSetGeneration(res, keyValPair, hierarchyLevel) {
        let childrenPossibleChoices = [];
        if (res[ATTR.children]) {
            let length = res[ATTR.children].length;
            for (let i = 0; i < length; i++) {
                childrenPossibleChoices = stringArrayUnion(childrenPossibleChoices, processObjectTypeSetGeneration(res[ATTR.children][i], keyValPair, hierarchyLevel + 1));
            }
        }
        let currentObjects = [];
        if (res.objectType && !res.objectType.match(/_root$/) && res.objectType !== "standard" && res.objectType !== "shield" && res.objectType !== "threat" && res.objectType !== "b_framework") {
            if (res.objectType && res.shieldElementTypeId) {
                let elemTypeObjTypeCombinationRandomIdKey = getAlreadyContainObjTypeAndElementTypeCombination(keyValPair, res.objectType, res.shieldElementTypeId);
                if (elemTypeObjTypeCombinationRandomIdKey === null) {
                    let obj = {};
                    obj.objectType = res.objectType;
                    obj.shieldElementTypeId = res.shieldElementTypeId;
                    let elementLevel = LookupLevel(res.shieldElementTypeId);
                    let elementAcronym = LookupAcronym(res.shieldElementTypeId);
                    obj.label = `[${elementAcronym}] ` + backing.allShieldElementTypes[res.shieldElementTypeId].elementTypeName;
                    obj.randomId = guidGenerator();
                    obj.order = hierarchyLevel;
                    obj.isCustom = false;
                    if (obj.label) {
                        currentObjects.push(obj.randomId);
                        keyValPair[obj.randomId] = obj;
                    }
                }
                else {
                    let tempObj = keyValPair[elemTypeObjTypeCombinationRandomIdKey];
                    if (tempObj) {
                        currentObjects.push(elemTypeObjTypeCombinationRandomIdKey);
                        if (!tempObj.order || tempObj.order > hierarchyLevel)
                            tempObj.order = hierarchyLevel;
                    }
                }
                if (res.linkType && res.linkName) {
                    let linkTypeRandomIdKey = getAlreadyContainLinkName(keyValPair, res.linkName);
                    if (linkTypeRandomIdKey === null) {
                        let obj = {};
                        obj.linkType = res.linkType;
                        obj.linkName = res.linkName;
                        obj.label = res.linkName;
                        obj.isCustom = false;
                        obj.randomId = guidGenerator();
                        obj.order = hierarchyLevel;
                        if (obj.label) {
                            currentObjects.push(obj.randomId);
                            keyValPair[obj.randomId] = obj;
                        }
                    }
                    else {
                        let tempObj = keyValPair[linkTypeRandomIdKey];
                        if (tempObj) {
                            currentObjects.push(linkTypeRandomIdKey);
                            if (!tempObj.order || tempObj.order > hierarchyLevel)
                                tempObj.order = hierarchyLevel;
                        }
                    }
                }
            }
            else if (res.objectType) {
                let objectTypeRandomIdKey = getAlreadyContainObjType(keyValPair, res.objectType);
                if (objectTypeRandomIdKey === null) {
                    let obj = {};
                    obj.objectType = res.objectType;
                    obj.label = constants.objectTypLabels[obj.objectType];
                    obj.isCustom = false;
                    obj.randomId = guidGenerator();
                    obj.order = hierarchyLevel;

                    if (obj.label) {
                        currentObjects.push(obj.randomId);
                        keyValPair[obj.randomId] = obj;
                    }

                    if (res.objectType === constants.objectType.SCE) {
                        let obj = {};
                        obj.objectType = res.objectType;
                        obj.shieldElementTypeId = 1;
                        obj.label = "Expression Parameter - Security Technique";
                        obj.randomId = guidGenerator();
                        obj.isCustom = false;
                        obj.order = hierarchyLevel;
                        currentObjects.push(obj.randomId);
                        keyValPair[obj.randomId] = obj;

                        obj = {};
                        obj.objectType = res.objectType;
                        obj.shieldElementTypeId = 2;
                        obj.label = "Expression Parameter - Security Content";
                        obj.randomId = guidGenerator();
                        obj.isCustom = false;
                        obj.order = hierarchyLevel;
                        currentObjects.push(obj.randomId);
                        keyValPair[obj.randomId] = obj;

                        obj = {};
                        obj.objectType = res.objectType;
                        obj.shieldElementTypeId = 3;
                        obj.label = "Expression Parameter - Protected Content";
                        obj.randomId = guidGenerator();
                        obj.isCustom = false;
                        obj.order = hierarchyLevel;
                        currentObjects.push(obj.randomId);
                        keyValPair[obj.randomId] = obj;

                        obj = {};
                        obj.objectType = res.objectType;
                        obj.shieldElementTypeId = 4;
                        obj.label = "Expression Parameter - Protected Subject";
                        obj.randomId = guidGenerator();
                        obj.isCustom = false;
                        obj.order = hierarchyLevel;
                        currentObjects.push(obj.randomId);
                        keyValPair[obj.randomId] = obj;

                    }
                }
                else {
                    let tempObj = keyValPair[objectTypeRandomIdKey];
                    if (tempObj) {
                        currentObjects.push(objectTypeRandomIdKey);
                        if (!tempObj.order || tempObj.order > hierarchyLevel)
                            tempObj.order = hierarchyLevel;
                    }
                }

                if (res.level) {
                    let objectTypeWithLevelRandomIdKey = getAlreadyContainObjTypeWithLevel(keyValPair, res.objectType, res.level);
                    if (objectTypeWithLevelRandomIdKey === null) {
                        let obj = {};
                        obj.objectType = res.objectType;
                        obj.level = res.level;
                        obj.label = "L" + res.level + " " + constants.objectTypLabels[obj.objectType];
                        obj.randomId = guidGenerator();
                        obj.isCustom = false;
                        obj.order = hierarchyLevel;

                        if (obj.label) {
                            currentObjects.push(obj.randomId);
                            keyValPair[obj.randomId] = obj;
                        }
                    }
                    else {
                        let tempObj = keyValPair[objectTypeWithLevelRandomIdKey];
                        if (tempObj) {
                            currentObjects.push(objectTypeWithLevelRandomIdKey);
                            if (!tempObj.order || tempObj.order > hierarchyLevel)
                                tempObj.order = hierarchyLevel;
                        }
                    }
                }

                if (res.linkType && res.linkName) {
                    let linkTypeRandomIdKey = getAlreadyContainLinkName(keyValPair, res.linkName);
                    if (linkTypeRandomIdKey === null) {
                        let obj = {};
                        obj.linkType = res.linkType;
                        obj.linkName = res.linkName;
                        //obj.label = constants.objectTypLabels[res.linkType];
                        obj.label = res.linkName;
                        obj.randomId = guidGenerator();
                        obj.isCustom = false;
                        obj.order = hierarchyLevel;
                        if (obj.label) {
                            currentObjects.push(obj.randomId);
                            keyValPair[obj.randomId] = obj;
                        }
                    }
                    else {
                        let tempObj = keyValPair[linkTypeRandomIdKey];
                        if (tempObj) {
                            currentObjects.push(linkTypeRandomIdKey);
                            if (!tempObj.order || tempObj.order > hierarchyLevel)
                                tempObj.order = hierarchyLevel;
                        }
                    }
                }
            }
        }
        for (let i = 0; i < currentObjects.length; i++) {
            let obj1 = keyValPair[currentObjects[i]];
            obj1.possibleChildren = stringArrayUnion(obj1.possibleChildren, childrenPossibleChoices);
        }

        childrenPossibleChoices = stringArrayUnion(childrenPossibleChoices, currentObjects);
        return childrenPossibleChoices;
    }

    function processObjectTypeDropDownContent(res) {
        let keyValPair = {};
        processObjectTypeSetGeneration(res, keyValPair, 0);
        return keyValPair;
    }

    let testUtilObj = new Object();
    testUtilObj.processObjectTypeDropDownContent = processObjectTypeDropDownContent;
    return testUtilObj;
}
