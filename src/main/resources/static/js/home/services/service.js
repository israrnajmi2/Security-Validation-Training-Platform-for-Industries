service = {
    getAllUsers: function (data, handler) {
        processget(null, "users_roles/get_users_dv/" + data.showRoles, handler);
    },
    createUsers: function (data, handler) {
        process(data, "users_roles/create_user", handler);
    },
    deleteElement: function (data, handler) {
        processDelete(null, "delete/" + data.objectType + "/" + data.elementId, handler);
    },
    getDefaultShieldPrefs: function (data, handler) {
        processget(null, "shield/default_shield_prefs", handler);
    },
    saveDefaultShieldPrefs: function (shieldId, isDefault, handler) {
        process(null, `shield/default_shield_prefs/save/${isDefault}/${shieldId}`, handler);
    },
    saveLinkToPrefs: function (data, handler) {
        process(data, `shield/link_to_prefs/save`, handler);
    },
    getSchemaInfoForAllShieldsAndStandards: function (data, handler) {
        return processget(null, "shield/get_schema_info_of_all_shields_and_standards", handler);
    },
    getAllShieldElementTypesForAllShields: function (data, handler) {
        processget(null, "shield/get_all_shield_element_types_for_all_shields", handler);
    },
    getShieldsAndStandard: function (data, handler) {
        processget(null, "shield/get_shields_and_standards", handler);
    },
    getAllPerspectives: function (data, handler) {
        processget(null, "perspectives/get_all_perspectives", handler);
    },
    createPerspective: function (data, handler) {
        process(data, "perspectives/create_perspective", handler);
    },
    getPerspectiveInfo: function (data, handler) {
        processget(data, "perspectives/get_perspective_info/" + data, handler);
    },
    editPerspective: function (data, handler) {
        process(data, "perspectives/edit_perspective", handler);
    },
    getAssetLibraryAttributeInfo: function (data, handler) {
        processget(data, "attributelibrary/get_asset_delivers_library_attribute_info/" + data.assetDeliversLibraryAttributeId, handler);
    },
    getAssetImplementsLibraryAttributeInfo: function (data, handler) {
        processget(data, "attributelibrary/get_asset_implements_library_attribute_info/" + data.assetDeliversLibraryAttributeId, handler);
    },
    addAssetLibraryAttribute: function (data, handler) {
        process(data, "attributelibrary/add_asset_delivers_attributes_from_library", handler);
    },
    addAssetImplementsLibraryAttribute: function (data, handler) {
        process(data, "attributelibrary/add_asset_implements_attributes_from_library", handler);
    },
    getAllAssetLibraryAttribute: function (data, handler) {
        processget(data, "attributelibrary/get_all_asset_delivers_library_attributes/" + data.perspectiveId, handler);
    },
    getAllAssetImplementsLibraryAttribute: function (data, handler) {
        processget(data, "attributelibrary/get_all_asset_implements_library_attributes/" + data.perspectiveId, handler);
    },
    createAssetLibraryAttribute: function (data, handler) {
        process(data, "attributelibrary/create_asset_delivers_library_attribute", handler);
    },
    createAssetImplementsLibraryAttribute: function (data, handler) {
        process(data, "attributelibrary/create_asset_implements_library_attribute", handler);
    },
    editAssetLibraryAttribute: function (data, handler) {
        process(data, "attributelibrary/edit_asset_delivers_library_attribute", handler);
    },
    editAssetImplementsLibraryAttribute: function (data, handler) {
        process(data, "attributelibrary/edit_asset_implements_library_attribute", handler);
    },
    getAssetDeliversRulerTypeDv: function (data, handler) {
        process(data, "perspectives/get_asset_delivers_ruler_type_dv", handler);
    },
    getAssetImplementsRulerTypeDv: function (data, handler) {
        process(data, "perspectives/get_asset_implements_ruler_type_dv", handler);
    },
    getAssetDeliversAttributesRating: function (data, handler) {
        process(data, "perspectives/get_asset_delivers_attributes_and_ratings_for_given_perspectives", handler);
    },
    getAssetImplementsAttributesRating: function (data, handler) {
        process(data, "perspectives/get_asset_implements_attributes_and_ratings_for_given_perspectives", handler);
    },
    createAssetDeliversAttributes: function (data, handler) {
        process(data, "perspectives/create_asset_delivers_attribute", handler);
    },
    createAssetImplementsAttributes: function (data, handler) {
        process(data, "perspectives/create_asset_implements_attribute", handler);
    },
    createAssetDeliversAttributesForAll: function (data, handler) {
        process(data, "perspectives/create_asset_delivers_attribute_for_all_rateable_objects", handler);
    },
    createAssetImplementsAttributesForAll: function (data, handler) {
        process(data, "perspectives/create_asset_implements_attribute_for_all_rateable_objects", handler);
    },
    getAssetDeliversAttributesInfo: function (data, handler) {
        processget(data, "perspectives/get_asset_delivers_attribute_info/" + data.attributeId, handler);
    },
    getAssetImplementsAttributesInfo: function (data, handler) {
        processget(data, "perspectives/get_asset_implements_attribute_info/" + data.attributeId, handler);
    },
    editAssetDeliversAttributes: function (data, handler) {
        process(data, "perspectives/edit_asset_delivers_attribute", handler);
    },
    editAssetImplementsAttributes: function (data, handler) {
        process(data, "perspectives/edit_asset_implements_attribute", handler);
    },
    saveAttributeRating: function (data, handler) {
        process(data, "perspectives/save_asset_delivers_attribute_rating", handler);
    },
    saveAssetImplementsAttributeRating: function (data, handler) {
        process(data, "perspectives/save_asset_implements_attribute_rating", handler);
    },
    saveJustificationReason: function (data, handler) {
        process(data, "perspectives/save_justification_reason_for_asset_delivers_rating", handler);
    },
    saveAssetImplementsJustificationReason: function (data, handler) {
        process(data, "perspectives/save_justification_reason_for_asset_implements_rating", handler);
    },
    addShieldElementLibraryAttribute: function (data, handler) {
        process(data, "attributelibrary/add_shield_element_attributes_from_library", handler);
    },
    getAllShieldElementLibraryAttribute: function (data, handler) {
        processget(data, "attributelibrary/get_all_shield_element_library_attributes/" + data.perspectiveId, handler);
    },
    createShieldElementLibraryAttribute: function (data, handler) {
        process(data, "attributelibrary/create_shield_element_library_attribute", handler);
    },
    getShieldElementLibraryAttributeInfo: function (data, handler) {
        processget(data, "attributelibrary/get_shield_element_library_attribute_info/" + data.shieldElementLibraryAttributeId, handler);
    },
    editShieldElementLibraryAttribute: function (data, handler) {
        process(data, "attributelibrary/edit_shield_element_library_attribute", handler);
    },
    getShieldElementRulerTypeDv: function (data, handler) {
        process(data, "perspectives/get_shield_element_ruler_type_dv", handler);
    },
    getShieldElementAttributesAndRating: function (data, handler) {
        process(data, "perspectives/get_shield_element_rt_attributes_and_ratings_for_given_perspectives", handler);
    },
    createShieldElementAttributes: function (data, handler) {
        process(data, "perspectives/create_shield_element_rt_attribute", handler);
    },
    createShieldElementAttributesForAll: function (data, handler) {
        process(data, "perspectives/create_shield_element_rt_attribute_for_all_rateable_elements", handler);
    },
    getShieldElementAttributesInfo: function (data, handler) {
        processget(data, "perspectives/get_shield_element_attribute_info/" + data.attributeId, handler);
    },
    editShieldElementAttributes: function (data, handler) {
        process(data, "perspectives/edit_shield_element_attribute", handler);
    },
    saveShieldElementAttributeRating: function (data, handler) {
        process(data, "perspectives/save_shield_element_rt_attribute_rating", handler);
    },
    saveShieldElementAttributeJustification: function (data, handler) {
        process(data, "perspectives/save_justification_reason_for_shield_element_rating", handler);
    },
    createShield: function (data, handler) {
        process(data, "shield/create_shield", handler);
    },
    getShieldInfo: function (data, handler) {
        processget(data, "shield/get_shield_info/" + data, handler);
    },
    editShield: function (data, handler) {
        process(data, "shield/edit_shield", handler);
    },
    createShieldElementType: function (data, handler) {
        process(data, "shield/create_shield_element_type", handler);
    },
    getShieldElementTypeInfo: function (data, handler) {
        processget(data, "shield/get_shield_element_type_info/" + data, handler);
    },
    editShieldElementType: function (data, handler) {
        process(data, "shield/edit_shield_element_type", handler);
    },
    createStandard: function (data, handler) {
        process(data, "shield/create_standard", handler);
    },
    getShieldOfShieldType: function (data, handler) {
        processget(null, "shield/get_shields_of_shield_type", handler);
    },
    getAllowedLevels: function (data, handler) {
        processget(null, "shield/get_allowed_levels/" + data.shieldId, handler);
    },
    getLinkToPrefs: function (data, handler) {
        processget(null, `shield/link_to_prefs/${data.isDirect}/${data.shieldIdOne}/${data.objectTypeOne}`, handler);
    },
    getGroupsGivenMaxLevel: function (data, handler) {
        processget(null, "shield/get_shield_element_groups_given_max_level/" + data.shieldId + "/" + data.level, handler);
    },
    getGroupsOfShieldGivenMaxLevel: function (data, handler) {
        processget(null, "groups/get_shield_element_groups_given_max_level/" + data.shieldId + "/" + data.level, handler);
    },
    getShieldElementGroupInfo: function (data, handler) {
        processget(null, "groups/get_shield_element_group_info/" + data, handler);
    },
    getShieldOfStandardType: function (data, handler) {
        processget(null, "shield/get_shields_of_standard_type", handler);
    },
    getShieldOfThreatType: function (data, handler) {
        processget(null, "shield/get_shields_of_threat_type", handler);
    },
    
    getShieldDv: function (data, handler) {
        process(data, "shield/get_shield_dv", handler);
    },
    
    saveShieldDragAndDrop: function (data, handler) {
        process(data, "shield/save_shield_drag_and_drop", handler);
    },

    saveStandardShieldDragAndDrop: function (data, handler) {
        process(data, "shield/save_standard_shield_drag_and_drop", handler);
    },

    getSingleDataView: function (data, handler) {
        processget(null, "dataview/get_data_view/" + data.elementId + "/" + data.objectType + "/" + backing.isDirectMode, handler);
    },
    createShieldElement: function (data, handler) {
        process(data, "shield/create_shield_element", handler);
    },
    getShieldElementTypes: function (data, handler) {
        processget(data, "shield/get_shield_element_types/" + data, handler);
    },
    getTypesThatCanHaveCreateShieldElementHotlink: function (data, handler) {
        processget(null, "shield/get_types_that_can_have_create_shield_element_hotlink/" + data, handler);
    },
    getEditElementInfo: function (data, handler) {
        processget(null, "shield/get_shield_element_info/" + data, handler);
    },
    getElementInfoByLinkId: function (data, handler) {
        processget(null, "generic/get_element_info_of_link/" + data.linkId + "/" + data.linkType, handler);
    },
    saveEditElement: function (data, handler) {
        process(data, "shield/edit_shield_element", handler);
    },
    getExpressionView: function (data, handler) {
        processget(null, "sce/get_expression_view/" + data, handler);
    },
    getAssociationView: function (data, handler) {
        processget(null, "shield/get_fulfills_associations_for_shield_element/" + data.elementId, handler);
    },
    saveAssociation: function (data, handler) {
        process(data, "shield/save_expression_fulfills_associations_to_shield_element", handler);
    },
    getAssetsDvWithGroupApplied: function (data, handler) {
        process(data, "asset/get_assets_dv", handler);
    },
    createAssetElement: function (data, handler) {
        process(data, "asset/create_asset", handler);
    },
    getAllAssetGroups: function (data, handler) {
        processget(null, "asset/get_all_asset_groups", handler);
    },
    getAssetTypeAllowedLevels: function (data, handler) {
        processget(null, "assettype/get_allowed_levels_for_asset_type", handler);
    },
    getAssetTypeGroupsByMaxLevel: function (data, handler) {
        processget(null, "assettype/get_asset_type_groups_given_max_level/" + data.level, handler);
    },
    getAssetTypeDv: function (data, handler) {
        process(data, "assettype/get_asset_type_dv", handler);
    },
    saveAssetTypeDragAndDrop: function (data, handler) {
        process(data, "assettype/save_asset_type_drag_and_drop", handler);
    },

    createAssetTypeElement: function (data, handler) {
        process(data, "assettype/create_asset_type", handler);
    },
    createProviderElement: function (data, handler) {
        process(data, "provider/create_provider", handler);
    },
    getAllProviderGroups: function (data, handler) {
        processget(null, "provider/get_all_provider_groups", handler);
    },
    getProvidersDvWithOrWithoutAssetAndGroupApplied: function (data, handler) {
        process(data, "provider/get_providers_dv", handler);
    },

    saveProviderDragAndDrop: function (data, handler) {
        process(data, "provider/save_provider_drag_and_drop", handler);
    },
    saveBusinessProviderDragAndDrop: function (data, handler) {
        process(data, "provider/save_business_provider_drag_and_drop", handler);
    },
    createObjectiveParameterElement: function (data, handler) {
        process(data, "parameter/create_objective_parameter", handler);
    },
    getObjectiveParameterDv: function (data, handler) {
        processget(null, "parameter/get_objective_parameter_dv", handler);
    },
    createMethodParameterElement: function (data, handler) {
        process(data, "parameter/create_method_parameter", handler);
    },
    getMethodParameterDv: function (data, handler) {
        processget(null, "parameter/get_method_parameter_dv", handler);
    },
    createContentParameterElement: function (data, handler) {
        process(data, "parameter/create_content_parameter", handler);
    },
    getContentParameterDv: function (data, handler) {
        processget(null, "parameter/get_content_parameter_dv", handler);
    },
    createSubjectParameterElement: function (data, handler) {
        process(data, "parameter/create_subject_parameter", handler);
    },
    getSubjectParameterDv: function (data, handler) {
        processget(null, "parameter/get_subject_parameter_dv", handler);
    },
    getOrganizationalUnitDv: function (data, handler) {
        processget(null, "organizational_unit/get_organizational_unit_dv", handler);
    },
    getOrganizationalUnitDesktopDv: function (data, handler) {
        processget(null, "organizational_unit/get_organizational_unit_dv/" + data.showUsers, handler);
    },

    //added by Manish for organizational_unit save drag and drop
    saveDragAndDropOrganizationalUnit: function (data, handler) {
        process(data, "organizational_unit/save_organizational_unit_drag_and_drop", handler);
    },

    createOrganizationalElement: function (data, handler) {
        process(data, "organizational_unit/create_organizational_unit_parameter", handler);
    },
    createExpressionElement: function (data, handler) {
        process(data, "sce/create_expression", handler);
    },
    getAllExpressionGroups: function (data, handler) {
        processget(null, "sce/get_all_expression_groups", handler);
    },
    getExpressionDvWithGroupApplied: function (data, handler) {
        processget(null, "sce/get_expression_dv/" + data.expressionGroupId, handler);
    },
    getProtectedByAssociationsForAssetType: function (data, handler) {
        processget(null, "assettype/get_protected_by_associations_for_asset_type/" + data.assetTypeId, handler);
    },
    saveExpressionFulfillsAssociationsToAssetTypeElement: function (data, handler) {
        process(data, "assettype/save_expression_protected_by_associations_to_asset_type", handler);
    },
    getDropdownTwoOptionsForShieldStartingPoint: function (data, handler) {
        processget(null, "shield/get_dropdown_two_options_for_shield_starting_point/" + data.isDirectMode + "/" + data.elementObjectType, handler);
    },
    getShieldFullMapToOtherStartingPoint: function (data, handler) {
        process(data, "shield/get_shield_map_to_dropdown2_starting_point", handler);
    },

    saveClassificationMapModeDesktopDragAndDrop: function (data, handler) {
        process(data, "shield/save_classification_map_mode_desktop_drag_and_drop", handler);
    },

    saveThreatMapModeDesktopDragAndDrop: function (data, handler) {
        process(data, "shield/save_threat_map_mode_desktop_drag_and_drop", handler);
    },

    saveStandardMapModeDesktopDragAndDrop: function (data, handler) {
        process(data, "shield/save_standard_map_mode_desktop_drag_and_drop", handler);
    },

    getPivotDropdownContent: function (data, handler) {
        processget(null, "pivot/get_object_type_to_navigation_choices_mapping/" + backing.isDirectMode+"/"+data.elementId+"/"+data.objectType, handler);
    },
    getPivotSubTree: function (data, handler) {
        process(data, "pivot/get_pivot_subtree_dv", handler);
    },
    getDropdownTwoOptionsForAssetTypeStartingPoint: function (data, handler) {
        processget(null, "assettype/get_dropdown_three_options_for_asset_type_starting_point/" + data, handler);
    },
    getAssetTypeMapToOtherStartingPoint: function (data, handler) {
        process(data, "assettype/get_asset_type_analyze_mode_dv", handler);
    },

    saveAssetTypeAnalyzeModeDragAndDrop: function (data, handler) {
        process(data, "assettype/save_asset_type_analyze_mode_drag_and_drop", handler);
    },

    getDropdownTwoOptionsForAssetStartingPoint: function (data, handler) {
        processget(null, "asset/get_dropdown_two_options_for_asset_starting_point/" + data, handler);
    },
    getAssetMapToOtherStartingPoint: function (data, handler) {
        process(data, "asset/get_asset_analyze_mode_dv", handler);
    },
    saveAssetModeDragAndDrop: function (data, handler) {
        process(data, "asset/save_asset_mode_drag_and_drop", handler);
    },
    saveAssetAnalyzeModeDragAndDrop: function (data, handler) {
        process(data, "asset/save_asset_analyze_mode_drag_and_drop", handler);
    },

    getDeliversAssociationsForAsset: function (data, handler) {
        processget(null, "asset/get_delivers_associations_for_asset/" + data.assetId, handler);
    },
    saveExpressionFulfillsAssociationsToAssetElement: function (data, handler) {
        process(data, "asset/save_expression_delivered_by_associations_to_asset", handler);
    },
    getAssetElementInfo: function (data, handler) {
        processget(null, "asset/get_asset_info/" + data, handler);
    },
    editAssetElement: function (data, handler) {
        process(data, "asset/edit_asset", handler);
    },
    getAssetTypeInfo: function (data, handler) {
        processget(null, "assettype/get_asset_type_info/" + data, handler);
    },
    editAssetType: function (data, handler) {
        process(data, "assettype/edit_asset_type", handler);
    },
    getProviderInfo: function (data, handler) {
        processget(null, "provider/get_provider_info/" + data, handler);
    },
    editProvider: function (data, handler) {
        process(data, "provider/edit_provider", handler);
    },
    getOrganizationalUnitInfo: function (data, handler) {
        processget(null, "organizational_unit/get_organizational_unit_info/" + data, handler);
    },
    editOrganizationalUnit: function (data, handler) {
        process(data, "organizational_unit/edit_organizational_unit", handler);
    },
    getObjectiveParameterInfo: function (data, handler) {
        processget(null, "parameter/get_objective_parameter_info/" + data, handler);
    },
    editObjectiveParameter: function (data, handler) {
        process(data, "parameter/edit_objective_parameter", handler);
    },
    getMethodParameterInfo: function (data, handler) {
        processget(null, "parameter/get_method_parameter_info/" + data, handler);
    },
    editMethodParameter: function (data, handler) {
        process(data, "parameter/edit_method_parameter", handler);
    },
    getContentParameterInfo: function (data, handler) {
        processget(null, "parameter/get_content_parameter_info/" + data, handler);
    },
    editContentParameter: function (data, handler) {
        process(data, "parameter/edit_content_parameter", handler);
    },
    getSubjectParameterInfo: function (data, handler) {
        processget(null, "parameter/get_subject_parameter_info/" + data, handler);
    },
    editSubjectParameter: function (data, handler) {
        process(data, "parameter/edit_subject_parameter", handler);
    },
    getSceInfo: function (data, handler) {
        processget(null, "sce/get_expression_info//" + data, handler);
    },
    editExpression: function (data, handler) {
        process(data, "sce/edit_expression", handler);
    },
    getDropdownTwoOptionsForAnzExpressionStartingPoint: function (data, handler) {
        processget(null, "sce/get_dropdown_two_options_for_expression_starting_point", handler);
    },
    getExpressionAnalyzeModeDv: function (data, handler) {
        process(data, "sce/get_expression_analyze_mode_dv", handler);
    },
    getElementInfo: function (data, handler) {
        processget(null, "generic/get_element_info/" + data.elementId + "/" + data.objectType, handler);
    },
    createGroup: function (data, handler) {
        process(data, "groups/create_shield_element_group", handler);
    },
    editGroup: function (data, handler) {
        process(data, "groups/edit_shield_element_group", handler);
    },
    getDeliversByAssociationsForExpression: function (data, handler) {
        processget(null, "sce/get_delivered_by_associations_for_expression/" + data.elementId, handler);
    },
    saveExpressionFulfillsAssociationsToAssets: function (data, handler) {
        process(data, "sce/save_delivered_by_associations_for_expression", handler);
    },
    getProtectsAssociationsForExpression: function (data, handler) {
        processget(null, "sce/get_protects_associations_for_expression/" + data.elementId, handler);
    },
    saveProtectsAssociationsForExpression: function (data, handler) {
        process(data, "sce/save_protects_associations_for_expression", handler);
    },
    getShieldStdAssociationsForExpression: function (data, handler) {
        processget(null, "sce/get_fulfilled_by_associations_for_expression/" + data.expressionId + "/" + data.shieldId, handler);
    },
    saveShieldStdAssociationsForExpression: function (data, handler) {
        process(data, "sce/save_fulfilled_by_associations_for_expression", handler);
    },
    addShieldElementAttributesFromLibraryToAll: function (data, handler) {
        process(data, "attributelibrary/add_shield_element_attributes_from_library_to_all_rateable_objects", handler);
    },
    addAssetDeliversAttributesFromLibraryToAllRateableObjects: function (data, handler) {
        process(data, "attributelibrary/add_asset_delivers_attributes_from_library_to_all_rateable_objects", handler);
    },
    addAssetImplementsAttributesFromLibraryToAllRateableObjects: function (data, handler) {
        process(data, "attributelibrary/add_asset_implements_attributes_from_library_to_all_rateable_objects", handler);
    },
    editArtifact: function (data, handler) {
        process(data, "artifact/edit_artifact", handler);
    },
    getDirectShieldElementAssociationsForShieldElement: function (data, handler) {
        processget(null, "shield/get_direct_shield_element_associations_for_shield_element/" + data.elementId + "/" + data.selectedShield, handler);
    },
    getShieldsOfShieldTypeExcluding: function (data, handler) {
        processget(null, "shield/get_shields_of_shield_type_excluding/" + data.elementId, handler);
    },
    getShieldsOfStandardTypeExcluding: function (data, handler) {
        processget(null, "shield/get_shields_of_standard_type_excluding/" + data.elementId, handler);
    },
    getShieldsOfThreatTypeExcluding: function (data, handler) {
        processget(null, "shield/get_shields_of_threat_type_excluding/" + data.elementId, handler);
    },
    saveDirectElementsAssociations: function (data, handler) {
        process(data, "shield/save_direct_shield_element_associations_for_shield_element", handler);
    },
    getDirectAssetAssociationsForElement: function (data, handler) {
        processget(null, "shield/get_direct_asset_associations_for_shield_element/" + data.elementId, handler);
    },
    saveExpressionFulfillsAssociationsToShieldElement: function (data, handler) {
        process(data, "shield/save_direct_asset_associations_for_shield_element", handler);
    },
    getDirectShieldElementAssociationsForAsset: function (data, handler) {
        processget(null, "asset/get_direct_shield_element_associations_for_asset/" + data.elementId + "/" + data.selectedShield, handler);
    },
    saveDirectShieldElementAssociationsForAsset: function (data, handler) {
        process(data, "asset/save_direct_shield_element_associations_for_asset", handler);
    },
    getDirectAssetTypeAssociationsForElement: function (data, handler) {
        processget(null, "shield/get_direct_asset_type_associations_for_shield_element/" + data.elementId, handler);
    },
    saveDirectAssetTypeToShieldElementAssociations: function (data, handler) {
        process(data, "shield/save_direct_asset_type_associations_for_shield_element", handler);
    },
    getDirectShieldElementAssociationsForAssetType: function (data, handler) {
        processget(null, "assettype/get_direct_shield_element_associations_for_asset_type/" + data.elementId + "/" + data.selectedShield, handler);
    },
    saveDirectShieldElementAssociationsForAssetType: function (data, handler) {
        process(data, "assettype/save_direct_shield_element_associations_for_asset_type", handler);
    },
    createUser: function (data, handler) {
        process(data, "users_roles/create_user", handler);
    },
    getRolesDv: function (data, handler) {
        processget(null, "users_roles/get_roles_dv/" + data.showUsers, handler);
    },
    createRole: function (data, handler) {
        process(data, "users_roles/create_user_role", handler);
    },
    getHotlinkPermission: function (data, handler) {
        processget(null, "users_roles/get_core_hotlink_permissios/" + data.userRoleId, handler);
    },
    saveHotlinkPermission: function (data, handler) {
        process(data, "users_roles/save_core_hotlink_permissions", handler);
    },
    getAssetDeliversProjectionDv: function (data, handler) {
        process(data, "perspectives/get_asset_delivers_ruler_type_projection_dv", handler);
    },
    getAssetImplementsProjectionDv: function (data, handler) {
        process(data, "perspectives/get_asset_implements_ruler_type_projection_dv", handler);
    },
    getShieldElementProjectionDv: function (data, handler) {
        process(data, "perspectives/get_shield_element_ruler_type_projection_dv", handler);
    },
    getShieldsAndStandardsExcluding: function (data, handler) {
        processget(null, "shield/get_shields_and_standards_excluding/" + data.shieldId, handler);
    },
    getUserInfo: function (data, handler) {
        processget(null, "users_roles/get_user_info/" + data, handler);
    },
    editUser: function (data, handler) {
        process(data, "users_roles/edit_user", handler);
    },
    getRoleInfo: function (data, handler) {
        processget(null, "users_roles/get_user_role_info/" + data, handler);
    },
    editRole: function (data, handler) {
        process(data, "users_roles/edit_user_role", handler);
    },
    getLoggedInUserDetails: function (data, handler) {
        processget(null, "users_roles/get_logged_in_user_details", handler);
    },
    getGuidances: function (data, handler) {
        processget(null, "guidance_test_procedures/get_guidances/" + data.elementId, handler);
    },
    getGuidancesInfo: function (data, handler) {
        processget(null, "guidance_test_procedures/get_guidance_info/" + data.guidanceId, handler);
    },
    createGuidances: function (data, handler) {
        process(data, "guidance_test_procedures/create_guidance", handler);
    },
    saveGuidances: function (data, handler) {
        process(data, "guidance_test_procedures/edit_guidance", handler);
    },
    getSourcesDv: function (data, handler) {
        processget(null, "guidance_test_procedures/get_sources_dv", handler);
    },
    createSources: function (data, handler) {
        process(data, "guidance_test_procedures/create_source", handler);
    },
    getSourceInfo: function (data, handler) {
        processget(null, "guidance_test_procedures/get_source_info/" + data.sourceId, handler);
    },
    saveSource: function (data, handler) {
        process(data, "guidance_test_procedures/edit_source", handler);
    },
    getTestProcedures: function (data, handler) {
        processget(null, "guidance_test_procedures/get_test_procedures/" + data.elementId, handler);
    },
    getTestProceduresInfo: function (data, handler) {
        processget(null, "guidance_test_procedures/get_test_procedure_info/" + data.testProcedureId, handler);
    },
    createTestProcedures: function (data, handler) {
        process(data, "guidance_test_procedures/create_test_procedure", handler);
    },
    saveTestProcedures: function (data, handler) {
        process(data, "guidance_test_procedures/edit_test_procedure", handler);
    },
    getDoesHaveAssets: function (data, handler) {
        process(data, "asset/does_have_assets", handler);
    },
    canShowCreateFirstUser: function (data, handler) {
        processget(null, "users_roles/can_show_create_first_user", handler);
    },
    createFirstAdminUser: function (data, handler) {
        process(data, "users_roles/create_first_admin_user", handler);
    },
    resetPassword: function (data, handler) {
        process(data, "users_roles/reset_password", handler);
    },
    deleteAccount: function (data, handler) {
        processDelete(null, "users_roles/delete_account", handler);
    },
    editLoginUser: function (data, handler) {
        process(data, "users_roles/edit_logged_in_user_profile", handler);
    },
    getToolMode: function (data, handler) {
        processget(null, "users_roles/get_logged_in_user_tool_mode", handler);
    },
    getShieldOfBusinessType: function (data, handler) {
        processget(null, "shield/get_shields_of_business_type", handler);
    },
    createBusiness: function (data, handler) {
        process(data, "shield/create_business_framework", handler);
    },
    createThreatFramework: function (data, handler) {
        process(data, "shield/create_threat_framework", handler);
    },
    getAllBusinessAssetGroups: function (data, handler) {
        processget(null, "businessasset/get_all_asset_groups", handler);
    },
    getBusinessAssetsDvWithGroupApplied: function (data, handler) {
        process(data, "businessasset/get_assets_dv", handler);
    },
    getBusinessAssetTypeAllowedLevels: function (data, handler) {
        processget(null, "businessassettype/get_allowed_levels_for_asset_type", handler);
    },
    getBusinessAssetTypeGroupsByMaxLevel: function (data, handler) {
        processget(null, "businessassettype/get_asset_type_groups_given_max_level/" + data.level, handler);
    },
    getBusinessAssetTypeDv: function (data, handler) {
        process(data, "businessassettype/get_asset_type_dv", handler);
    },

    saveBusinessAssetTypeDragAndDrop: function (data, handler) {
        process(data, "businessassettype/save_business_asset_type_drag_and_drop", handler);
    },


    saveBusinessAssetTypeMapModeDragAndDrop: function (data, handler) {
        process(data, "businessassettype/save_business_asset_type_map_mode_drag_and_drop", handler);
    },

    saveBusinessAssetMapModeDragAndDrop: function (data, handler) {
        process(data, "businessasset/save_business_asset_map_mode_drag_and_drop", handler);
    },

    saveBusinessMapModeDragAndDrop: function (data, handler) {
        process(data, "businessasset/save_business_map_mode__drag_and_drop", handler);
    },

    getAllBusinessProviderGroups: function (data, handler) {
        processget(null, "businessprovider/get_all_provider_groups", handler);
    },
    getBusinessProvidersDvWithOrWithoutAssetAndGroupApplied: function (data, handler) {
        process(data, "businessprovider/get_providers_dv", handler);
    },
    createBusinessProviderElement: function (data, handler) {
        process(data, "businessprovider/create_provider", handler);
    },
    createBusinessAssetTypeElement: function (data, handler) {
        process(data, "businessassettype/create_asset_type", handler);
    },
    createBusinessAssetElement: function (data, handler) {
        process(data, "businessasset/create_asset", handler);
    },
    editBusinessProvider: function (data, handler) {
        process(data, "businessprovider/edit_provider", handler);
    },
    editBusinessAssetElement: function (data, handler) {
        process(data, "businessasset/edit_asset", handler);
    },
    editBusinessAssetType: function (data, handler) {
        process(data, "businessassettype/edit_asset_type", handler);
    },
    getBusinessAssetElementInfo: function (data, handler) {
        processget(null, "businessasset/get_asset_info/" + data, handler);
    },
    saveBusinessAssetModeDragAndDrop: function (data, handler) {
        process(data, "businessasset/save_business_asset_mode_drag_and_drop", handler);
    },
    getBusinessAssetTypeInfo: function (data, handler) {
        processget(null, "businessassettype/get_asset_type_info/" + data, handler);
    },
    getBusinessProviderInfo: function (data, handler) {
        processget(null, "businessprovider/get_provider_info/" + data, handler);
    },
    getDropdownTwoOptionsForBusinessAssetStartingPoint: function (data, handler) {
        processget(null, "businessasset/get_dropdown_two_options_for_asset_starting_point/" + data, handler);
    },
    getBusinessAssetMapToOtherStartingPoint: function (data, handler) {
        process(data, "businessasset/get_asset_analyze_mode_dv", handler);
    },
    getDropdownTwoOptionsForBusinessAssetTypeStartingPoint: function (data, handler) {
        processget(null, "businessassettype/get_dropdown_three_options_for_asset_type_starting_point/" + data, handler);
    },
    getBusinessAssetTypeMapToOtherStartingPoint: function (data, handler) {
        process(data, "businessassettype/get_asset_type_analyze_mode_dv", handler);
    },
    getDirectShieldElementAssociationsForBusinessAsset: function (data, handler) {
        processget(null, "businessasset/get_direct_shield_element_associations_for_asset/" + data.elementId + "/" + data.selectedShield, handler);
    },
    saveDirectShieldElementAssociationsForBusinessAsset: function (data, handler) {
        process(data, "businessasset/save_direct_shield_element_associations_for_asset", handler);
    },
    getDirectShieldElementAssociationsForBusinessAssetType: function (data, handler) {
        processget(null, "businessassettype/get_direct_shield_element_associations_for_asset_type/" + data.elementId + "/" + data.selectedShield, handler);
    },
    saveDirectShieldElementAssociationsForBusinessAssetType: function (data, handler) {
        process(data, "businessassettype/save_direct_shield_element_associations_for_asset_type", handler);
    },
    getDeliversAssociationsForBusinessAsset: function (data, handler) {
        processget(null, "businessasset/get_delivers_associations_for_asset/" + data.assetId, handler);
    },
    saveExpressionFulfillsAssociationsToBusinessAssetElement: function (data, handler) {
        process(data, "businessasset/save_expression_delivered_by_associations_to_asset", handler);
    },
    getProtectedByAssociationsForBusinessAssetType: function (data, handler) {
        processget(null, "businessassettype/get_protected_by_associations_for_asset_type/" + data.assetTypeId, handler);
    },
    saveExpressionFulfillsAssociationsToBusinessAssetTypeElement: function (data, handler) {
        process(data, "businessassettype/save_expression_protected_by_associations_to_asset_type", handler);
    },
    getDeliversByBusinessAssetAssociationsForExpression: function (data, handler) {
        processget(null, "sce/get_business_asset_associations_for_expression/" + data.elementId, handler);
    },
    saveExpressionFulfillsAssociationsToBusinessAssets: function (data, handler) {
        process(data, "sce/save_business_asset_associations_for_expression", handler);
    },
    getBusinessProtectsAssociationsForExpression: function (data, handler) {
        processget(null, "sce/get_business_asset_type_associations_for_expression/" + data.elementId, handler);
    },
    saveBusinessProtectsAssociationsForExpression: function (data, handler) {
        process(data, "sce/save_business_asset_type_associations_for_expression", handler);
    },
    getDirectBusinessAssetAssociationsForElement: function (data, handler) {
        processget(null, "shield/get_business_asset_associations_for_shield_element/" + data.elementId, handler);
    },
    saveExpressionFulfillsBusinessAssociationsToShieldElement: function (data, handler) {
        process(data, "shield/save_business_asset_associations_for_shield_element", handler);
    },
    getDirectBusinessAssetTypeAssociationsForElement: function (data, handler) {
        processget(null, "shield/get_business_asset_type_associations_for_shield_element/" + data.elementId, handler);
    },
    saveDirectBusinessAssetTypeToShieldElementAssociations: function (data, handler) {
        process(data, "shield/save_business_asset_type_associations_for_shield_element", handler);
    },
};