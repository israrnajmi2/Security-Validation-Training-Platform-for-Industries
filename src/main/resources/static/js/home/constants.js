const constants = {};
const ATTR = {
    "elementId": "elementId",
    "name": "name",
    "description": "description",
    "chain": "chain",
    "linkId": "linkId",
    "linkName": "linkName",
    "linkType": "linkType",
    "odosTree": "odosTree",
    "mdosTree": "mdosTree",
    "cdosTree": "cdosTree",
    "sdosTree": "sdosTree",
    "odosWord": "odosWord",
    "odosChain": "odosChain",
    "odosElementId": "odosElementId",
    "odosLevel": "odosLevel",
    "mdosWord": "mdosWord",
    "mdosChain": "mdosChain",
    "mdosElementId": "mdosElementId",
    "mdosLevel": "mdosLevel",
    "cdosWord": "cdosWord",
    "cdosChain": "cdosChain",
    "cdosElementId": "cdosElementId",
    "cdosLevel": "cdosLevel",
    "sdosWord": "sdosWord",
    "sdosChain": "sdosChain",
    "sdosElementId": "sdosElementId",
    "sdosLevel": "sdosLevel",
    "shieldTypeName": "shieldTypeName",
    "shieldTypeId": "shieldTypeId",
    "shieldName": "shieldName",
    "shieldId": "shieldId",
    "shieldElementTypeName": "shieldElementTypeName",
    "shieldElementTypeId": "shieldElementTypeId",
    "isMappableToSce": "isMappableToSce",
    "isDefaultElement": "isDefaultElement",
    "children": "children",
    "author": "author",
    "version": "version",
    "level": "level",
    "objectType": "objectType",
    "orgUnitName": "orgUnitName",
    "orgUnitId": "orgUnitId",
    "providerName": "providerName",
    "index": "index",
    "rating": "rating",
    "isGroupItemFound": "isGroupItemFound",
    "label": "label",
    "ratingObjectType": "ratingObjectType",
    "ratingId": "ratingId"
};
constants.directModeLabels = {
    "asset_root": "Implemented by",
    "asset_type_root": "Secures",
    "shield_root": "Mapped To"
};
constants.labels = {
    "asset_root": "Delivered by",
    "asset_type_root": "Protects",
    "shield_root": "Fulfills"
};
constants.association_labels = {
    "asset_shield": "Implements",
    "assetType_shield": "Secured By",
    "shield_asset": "Implemented By",
    "shield_assetType": "Secures",
    "shield_shield": "Related To",
    "exp_asset": "Delivered By",
    "exp_assetType": "Protects",
    "exp_shield": "Fulfills",
    "asset_exp": "Delivers",
    "assetType_exp": "Protected By",
    "shield_exp": "Fulfilled By"
};
constants.viewSize = {
    "QUARTER": "quarter",
    "HORIZONTAL_HALF": "horizontal_half",
    "VERTICAL_HALF": "vertical_half"
};
constants.ToolMode = {
    "DIRECT": "direct",
    "EXPRESSION": "expression",
    "BOTH DIRECT AND EXPRESSION": "both_direct_and_expression"
};
constants.objectType = {
    "SHIELD": "shield",
    "SHIELD_TYPE": "shield_type",
    "SHIELD_ELEMENT_TYPE": "shield_element_type",
    "STANDARD_ELEMENT_TYPE": "standard_element_type",
    "THREAT_ELEMENT_TYPE": "threat_element_type",
    "SHIELD_ELEMENT": "shield_element",
    "STANDARD": "standard",
    "THREAT": "threat",
    "STANDARD_ELEMENT": "standard_element",
    "THREAT_ELEMENT": "threat_element",
    "BUSINESS": "b_framework",
    "BUSINESS_CONTROL_TYPE": "b_control_type",
    "BUSINESS_CONTROL": "b_control",
    "SCE": "sce",
    "ORGANIZATIONAL_UNIT": "organizational_unit",
    "OBJECTIVE_PARAMETER": "objective_parameter_word",
    "METHOD_PARAMETER": "method_parameter_word",
    "CONTENT_PARAMETER": "content_parameter_word",
    "SUBJECT_PARAMETER": "subject_parameter_word",
    "ASSET_TYPE": "asset_type",
    "ASSET": "asset",
    "BUSINESS_ASSET_TYPE": "business_asset_type",
    "BUSINESS_ASSET": "business_asset",
    "TECHNICAL_SUPPORT_PEOPLE": "technical_support_people",
    "PROVIDER": "provider_info",
    "BUSINESS_PROVIDER": "business_provider",
    "TECHNICAL_SUPPORT_CONTACT_INFO": "technical_support_contact_info",
    "SCE_FULFILLS_SHIELD_ELEMENT_LINK": "sce_fulfills_shield_element",
    "ASSET_TYPE_COULD_BE_PROTECTED_BY_SCE_LINK": "asset_type_could_be_protected_by_sce",
    "ASSET_TYPE__SHALL_BE_PROTECTED_BY_SCE_LINK": "asset_type_shall_be_protected_by_sce",
    "ASSET_TYPE_IS_PROTECTED_BY_SCE_LINK": "asset_type_is_protected_by_sce",
    "ASSET_DELIVERS_SCE_LINK": "asset_delivers_sce",
    "ASSET_DELIVERS_ATTRIBUTE": "asset_delivers_attribute",
    "SHIELD_ELEMENT_ATTRIBUTE": "shield_element_rt_attribute",
    "ASSET_DELIVERS_LIBRARY_ATTRIBUTE": "asset_delivers_library_attribute",
    "SHIELD_ELEMENT_LIBRARY_ATTRIBUTE": "shield_element_library_attribute",
    "ARTIFACT": "artifact",
    "USER": "user",
    "ROLE": "role",
    "GUIDANCE": "guidance",
    "TEST_PROCEDURE": "test_procedure",
    "SOURCE": "ingest_source",
    "ASSET_TYPE_ROOT": "asset_type_root",
    "BUSINESS_ASSET_TYPE_ROOT": "business_asset_type_root",
    "OBJECTIVE_PARAMETER_ROOT": "objective_parameter_word_root",
    "METHOD_PARAMETER_ROOT": "method_parameter_word_root",
    "CONTENT_PARAMETER_ROOT": "content_parameter_word_root",
    "SUBJECT_PARAMETER_ROOT": "subject_parameter_word_root",
    "SCE_ROOT": "sce_root",
    "SHIELD_TYPE_ROOT": "shield_type_root",
    "ORGANIZATIONAL_UNIT_ROOT": "organizational_unit_root",
    "USER_ROOT": "user_root",
    "ROLE_ROOT": "role_root",
    "SHIELD_ELEMENT_ROOT": "shield_element_root",
//groups
    "SHIELD_ELEMENT_GROUP": "shield_element_group",
    "SCE_GROUP": "sce_group",
    "ASSET_GROUP": "asset_group",
    "ASSET_TYPE_GROUP": "asset_type_group",
    "PROVIDER_GROUP": "provider_group",
    //roots
    "ASSET_ROOT": "asset_root",
    "BUSINESS_ASSET_ROOT": "business_asset_root",
    "SHIELD_ROOT": "shield_root",
    "SHIELD_ELEMENT_TYPE_ROOT": "shield_element_type_root",
    "TECHNICAL_SUPPORT_PEOPLE_ROOT": "technical_support_people_root",
    "SHIELD_ELEMENT_GROUP_ROOT": "shield_element_group_root",
    "SCE_GROUP_ROOT": "sce_group_root",
    "ASSET_GROUP_ROOT": "asset_group_root",
    "ASSET_TYPE_GROUP_ROOT": "asset_type_group_root",
    "PROVIDER_GROUP_ROOT": "provider_group_root",
    "TECHNICAL_SUPPORT_CONTACT_INFO_ROOT": "technical_support_contact_info_root",
    "PROVIDER_ROOT": "provider_root",
    "BUSINESS_PROVIDER_ROOT": "business_provider_root",
    "PERSPECTIVE": "perspective"
};
constants.objectTypLabels = {
    "shield": "Internal Framework",
    "shield_type": "Framework Type",
    "shield_element_type": " Internal Policy Type",
    "shield_element": " Internal Policy",
    "standard": "External Framework",
    "threat": "Threat Framework",
    "standard_type": "External Type",
    "threat_type": "Threat Type",
    "standard_element_type": "External Policy Type",
    "threat_element_type": "Threat Vector Type",
    "standard_element": "External Policy",
    "threat_element": "Threat Vector",
    "b_framework": "Value Process Framework",
    "b_control_type": "Value Process Type",
    "b_control": "Value Process",
    "sce": "Security Control Expression",
    "organizational_unit": "Organizational Unit",
    "objective_parameter_word": "Security Technique Parameter",
    "method_parameter_word": "Security Content Parameter",
    "content_parameter_word": "Protected Content Parameter",
    "subject_parameter_word": "Protected Subject Parameter",
    "business_asset_type": "Value Asset Type",
    "business_asset": "Value Asset",
    "asset_type": "Security Asset Type",
    "asset": "Security Asset",
    "technical_support_people": "Technical Support People",
    "provider_info": "Security Provider",
    "business_provider": "Value Provider",
    "technical_support_contact_info": "Technical Support Contact Info",
    "sce_fulfills_shield_element": "Expression Fulfills Control Link",
    "asset_type_could_be_protected_by_sce": "Asset Type Could Be Protected By Expression Link",
    "asset_type_shall_be_protected_by_sce": "Asset Type Protected By Expression Link",
    "asset_type_is_protected_by_sce": "Asset Type Is Protected By Expression Link",
    "asset_could_delivers_sce": "Asset Could Deliver Expression Link",
    "asset_shall_delivers_sce": "Asset Delivers Expression Link",
    "direct_asset_to_shield_element_link": "Asset Implements Control Link",
    "direct_asset_type_to_shield_element_link": "Asset Type Secured By Control Link",
    "direct_shield_element_to_shield_element_link": "Control Mapped To Control Link",
    "asset_delivers_attribute": "Asset Delivers Expression Attribute",
    "role": "Role",
    "user": "User",
    "guidance": "Guidance",
    "test_procedure": "Test Procedure",
    "source": "Source",
    /*"ASSET_ROOT = "asset_root": "ASSET_ROOT = "asset_root";*/
    "asset_type_root": "Asset Type",
    "objective_parameter_word_root": "Objective Parameter",
    "method_parameter_word_root": "Method Parameter",
    "content_parameter_word_root": "Content Parameter",
    "subject_parameter_word_root": "Subject Parameter",
    "sce_root": "Expression",
    "shield_type_root": "shield_type_root",
    "organizational_unit_root": "Organizational Unit",
    "shield_element_root": "shield_element_root",
//groups
    "shield_element_group": "Control Group",
    "sce_group": "Expression Group",
    "asset_group": "Asset Group",
    "asset_type_group": "Asset Type Group",
    "provider_group": "Provider Group",
    //roots
    "asset_root": "Asset Root",
    "shield_root": "shield_root",
    "shield_element_type_root": "shield_element_type_root",
    "technical_support_people_root": "technical_support_people_root",
    "shield_element_group_root": "shield_element_group_root",
    "sce_group_root": "sce_group_root",
    "asset_group_root": "asset_group_root",
    "asset_type_group_root": "asset_type_group_root",
    "provider_group_root": "provider_group_root",
    "technical_support_contact_info_root": "technical_support_contact_info_root",
    "provider_root": "provider_root",
    "role_root": "Role",
    "user_root": "User",
    "perspective": "Perspective"

};
constants.rulerTypes = {
    "ASSET_DELIVERS_SCE": "asset_delivers_sce_ruler_type",
    "ASSET_TYPE_COULD_BE_PROTECTED_BY_SCE": "asset_type_could_be_protected_by_sce_ruler_type",
    "ASSET_TYPE_SHALL_BE_PROTECTED_BY_SCE": "asset_type_shall_be_protected_by_sce_ruler_type",
    "ASSET_TYPE_IS_PROTECTED_BY_SCE": "asset_type_is_protected_by_sce_ruler_type",
    "SCE_FULFILLS_SHIELD_ELEMENT": "sce_fulfills_shield_element_ruler_type",
    "SCE": "sce_ruler_type",
    "SHIELD_ELEMENT": "shield_element_ruler_type"
};
constants.showProtectionTypeLabel = {
    "SHOW COULD BE": "could",
    "SHOW SHALL BE": "shall",
    "SHOW COULD AND SHALL BE": "could_and_shall",
    "DO NOT SHOW": "do_not_show"
};
constants.showAssetProtectionTypeLabel = {
    "SHOW COULD": "could",
    "SHOW SHALL": "shall",
    "SHOW COULD AND SHALL": "could_and_shall",
    "DO NOT SHOW": "do_not_show"
};
constants.protectionTypeForAT = {
    "shall": {
        "key": "shall"
    },
    "could": {
        "key": "could"
    }
};
constants.directShieldLinkType = {
    "ASSET": "direct_asset_to_shield_element_link",
    "ASSET_TYPE": "direct_asset_type_to_shield_element_link",
    "SHIELD": "direct_shield_element_to_shield_element_link"
};
constants.association_css_style = {
    "shield_selected": {
        "key": "shield_selected",
        "label": "Selected",
        "objectType": "selected",
        "randomId": "shield_selected",
        "possibleChildren": [],
        "isCustom": true,
    },
    "shield_not_selected": {
        "key": "shield_not_selected",
        "label": "Not Selected",
        "objectType": "not_selected",
        "randomId": "shield_not_selected",
        "possibleChildren": [],
        "isCustom": true,
    },
    "asset_shall_selected": {
        "key": "asset_shall_selected",
        "label": "Shall Selected",
        "objectType": "shall_selected",
        "randomId": "asset_shall_selected",
        "possibleChildren": [],
        "isCustom": true,
    },
    "asset_could_selected": {
        "key": "asset_could_selected",
        "label": "Could Selected",
        "objectType": "could_selected",
        "randomId": "asset_could_selected",
        "possibleChildren": [],
        "isCustom": true,
    },
    "asset_selected": {
        "key": "asset_selected",
        "label": "Selected",
        "objectType": "selected",
        "randomId": "asset_selected",
        "possibleChildren": [],
        "isCustom": true,
    },
    "asset_not_selected": {
        "key": "asset_not_selected",
        "label": "Not Selected",
        "objectType": "not_selected",
        "randomId": "asset_not_selected",
        "possibleChildren": [],
        "isCustom": true,
    },
    "asset_type_shall_selected": {
        "key": "asset_type_shall_selected",
        "label": "Shall Selected",
        "objectType": "shall_selected",
        "randomId": "asset_type_shall_selected",
        "possibleChildren": [],
        "isCustom": true,
    },
    "asset_type_selected": {
        "key": "asset_type_selected",
        "label": "Selected",
        "objectType": "selected",
        "randomId": "asset_type_selected",
        "possibleChildren": [],
        "isCustom": true,
    },
    "asset_type_could_selected": {
        "key": "asset_type_could_selected",
        "label": "Could Selected",
        "objectType": "could_selected",
        "randomId": "asset_type_could_selected",
        "possibleChildren": [],
        "isCustom": true,
    },
    "asset_type_not_selected": {
        "key": "asset_type_not_selected",
        "label": "Not Selected",
        "objectType": "not_selected",
        "randomId": "asset_type_not_selected",
        "possibleChildren": [],
        "isCustom": true,
    },
    "unsaved": {
        "key": "unsaved",
        "label": "Unsaved or Modified Changes",
        "objectType": "unsaved",
        "randomId": "unsaved",
        "possibleChildren": [],
        "isCustom": true,
    },
};
backing.view_type = {
    "direct_asset_type_element_association_view": {
        "id": "dATEAV",
        "key": "direct_asset_type_element_association_view",
        "name": "DirectAssetTypeElementAssociationView",
        "priority": 3,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": direct_asset_type_element_association_view_event_handler
    },
    "direct_asset_type_association_view": {
        "id": "dATAV",
        "key": "direct_asset_type_association_view",
        "name": "DirectAssetTypeAssociationView",
        "priority": 3,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": direct_asset_type_association_view_event_handler
    },
    "direct_asset_element_association_view": {
        "id": "dAEAV",
        "key": "direct_asset_element_association_view",
        "name": "DirectAssetElementAssociationView",
        "priority": 3,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": direct_asset_element_association_view_event_handler
    },
    "direct_asset_association_view": {
        "id": "dAAV",
        "key": "direct_asset_association_view",
        "name": "DirectAssetAssociationView",
        "priority": 3,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": direct_asset_association_view_event_handler
    },
    "direct_shield_association_view": {
        "id": "dSAV",
        "key": "direct_shield_association_view",
        "name": "DirectShieldAssociationView",
        "priority": 3,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": direct_shield_association_view_event_handler
    },
    "evaluationview": {
        "id": "evalv",
        "key": "evaluationview",
        "name": "EvaluationView",
        "priority": 3,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": evaluationview_event_handler
    },
    "dataview": {
        "id": "datv",
        "key": "dataview",
        "name": "dataview",
        "priority": 3,
        "minimal": constants.viewSize.QUARTER,
        "eventCalled": false,
        "eventHandler": dataview_event_handler
    },
    "create_shield_element_view": {
        "id": "csev",
        "key": "create_shield_element_view",
        "name": "createShieldElementView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": create_shield_element_view_event_handler
    },
    "create_asset_element_view": {
        "id": "caev",
        "key": "create_asset_element_view",
        "name": "createAssetElementView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": create_asset_element_view_event_handler
    },
    "create_asset_type_element_view": {
        "id": "catev",
        "key": "create_asset_type_element_view",
        "name": "createAssetTypeElementView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": create_asset_type_element_view_event_handler
    },
    "create_objective_element_view": {
        "id": "cobjev",
        "key": "create_objective_element_view",
        "name": "createObjectiveElementView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": create_objective_element_view_event_handler
    },
    "create_method_element_view": {
        "id": "cmev",
        "key": "create_method_element_view",
        "name": "createMethodElementView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": create_method_element_view_event_handler
    },
    "create_subject_element_view": {
        "id": "csubev",
        "key": "create_subject_element_view",
        "name": "createSubjectElementView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": create_subject_element_view_event_handler
    },
    "create_content_element_view": {
        "id": "cconev",
        "key": "create_content_element_view",
        "name": "createContentElementView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": create_content_element_view_event_handler
    },
    "create_provider_element_view": {
        "id": "cpev",
        "key": "create_provider_element_view",
        "name": "createProviderElementView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": create_provider_element_view_event_handler
    },
    "create_organizationalunit_element_view": {
        "id": "couev",
        "key": "create_organizationalunit_element_view",
        "name": "createOrganizationalUnitView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": create_organizationalunit_element_view_event_handler
    },
    "edit_shield_element_view": {
        "id": "esev",
        "key": "edit_shield_element_view",
        "name": "editElementView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": edit_shield_element_view_event_handler
    },
    "edit_asset_element_view": {
        "id": "eaev",
        "key": "edit_asset_element_view",
        "name": "editAssetElementView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": edit_asset_element_view_event_handler
    },
    "edit_asset_type_element_view": {
        "id": "eatev",
        "key": "edit_asset_type_element_view",
        "name": "editAssetTypeElementView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": edit_asset_type_element_view_event_handler
    },
    "edit_provider_element_view": {
        "id": "epev",
        "key": "edit_provider_element_view",
        "name": "editProviderElementView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": edit_provider_element_view_event_handler
    },
    "edit_organizationalunit_element_view": {
        "id": "epev",
        "key": "edit_organizationalunit_element_view",
        "name": "editOrganizationalUnitView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": edit_organizationalunit_element_view_event_handler
    },
    "edit_subject_element_view": {
        "id": "esubev",
        "key": "edit_subject_element_view",
        "name": "editSubjectView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": edit_subject_element_view_event_handler
    },
    "edit_objective_element_view": {
        "id": "eobjev",
        "key": "edit_objective_element_view",
        "name": "editObjectiveView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": edit_objective_element_view_event_handler
    },
    "edit_method_element_view": {
        "id": "emetev",
        "key": "edit_method_element_view",
        "name": "editMethodView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": edit_method_element_view_event_handler
    },
    "edit_content_element_view": {
        "id": "econev",
        "key": "edit_content_element_view",
        "name": "editContentView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": edit_content_element_view_event_handler
    },
    "expressionview": {
        "id": "expv",
        "key": "expressionview",
        "name": "expressionView",
        "priority": 3,
        "minimal": constants.viewSize.HORIZONTAL_HALF,
        "eventHandler": expressionview_event_handler
    },
    "association_view": {
        "id": "assov",
        "key": "association_view",
        "name": "associationView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": association_view_event_handler
    },
    "protection_association_view": {
        "id": "protection_assov",
        "key": "protection_association_view",
        "name": "protectionAssociationView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": protection_association_view_event_handler
    },
    "pivot_view": {
        "id": "pv",
        "key": "pivot_view",
        "name": "pivotView",
        "priority": 3,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": pivot_view_event_handler
    },
    "asset_association_view": {
        "id": "asset_assov",
        "key": "asset_association_view",
        "name": "assetAssociationView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": asset_association_view_event_handler
    },
    "create_expression_view": {
        "id": "cexpv",
        "key": "create_expression_view",
        "name": "createExpressionView",
        "priority": 2,
        "minimal": constants.viewSize.HORIZONTAL_HALF,
        "eventHandler": create_expression_view_event_handler
    },
    "edit_expression_view": {
        "id": "eexpv",
        "key": "edit_expression_view",
        "name": "editExpressionView",
        "priority": 2,
        "minimal": constants.viewSize.HORIZONTAL_HALF,
        "eventHandler": edit_expression_view_event_handler
    },
    "ring_view": {
        "id": "rv",
        "key": "ring_view",
        "name": "ringView",
        "priority": 2,
        "minimal": constants.viewSize.VERTICAL_HALF,
        "eventHandler": ring_view_event_handler
    },
    "group_ring_view": {
        "id": "grv",
        "key": "group_ring_view",
        "name": "group_ring_view",
        "priority": 2,
        "minimal": constants.viewSize.VERTICAL_HALF,
        "eventHandler": group_ring_view_event_handler
    },
    "create_attribute_view": {
        "id": "createAttr",
        "key": "create_attribute_view",
        "name": "createAttributeView",
        "priority": 2,
        "minimal": constants.viewSize.HORIZONTAL_HALF,
        "eventHandler": edit_expression_view_event_handler
    },
    "edit_attribute": {
        "id": "eexpv",
        "key": "edit_expression_view",
        "name": "editExpressionView",
        "priority": 2,
        "minimal": constants.viewSize.HORIZONTAL_HALF,
        "eventHandler": edit_expression_view_event_handler
    },
    "asset_attribute_library_view": {
        "id": "attrLib",
        "key": "asset_attribute_library_view",
        "name": "attributeLibraryView",
        "priority": 3,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": asset_attribute_library_view_event_handler
    },
    "shield_attribute_library_view": {
        "id": "attrLib",
        "key": "shield_attribute_library_view",
        "name": "attributeLibraryView",
        "priority": 3,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": shield_attribute_library_view_event_handler
    },
    "create_groups": {
        "id": "cg",
        "key": "create_groups",
        "name": "createGroups",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": create_group_event_handler
    },
    "edit_groups": {
        "id": "editg",
        "key": "edit_groups",
        "name": "editGroups",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": edit_group_event_handler
    },
    "exp_asset_association_view": {
        "id": "expAssetAssc",
        "key": "exp_asset_association_view",
        "name": "expAssetAssociationView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": modify_expression_asset_association_event_handler
    },
    "exp_assetType_association_view": {
        "id": "expAssetTypeAssc",
        "key": "exp_assetType_association_view",
        "name": "expAssetTypeAssociationView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": modify_expression_asset_type_association_event_handler
    },
    "exp_shield_association_view": {
        "id": "expShieldAssc",
        "key": "exp_shield_association_view",
        "name": "expShieldAssociationView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": modify_expression_shield_association_event_handler
    },
    "exp_standard_association_view": {
        "id": "expStandardAssc",
        "key": "exp_standard_association_view",
        "name": "expStandardAssociationView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": modify_expression_standard_association_event_handler
    },
    "exp_threat_association_view": {
        "id": "expThreatAssc",
        "key": "exp_threat_association_view",
        "name": "expThreatAssociationView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": modify_expression_threat_association_event_handler
    },
    "create_artifact_view": {
        "id": "carti",
        "key": "create_artifact_view",
        "name": "createArtifactView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": create_artifact_event_handler
    },
    "edit_artifact_view": {
        "id": "earti",
        "key": "edit_artifact_view",
        "name": "editArtifactView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": modify_artifact_event_handler
    },
    "create_user_view": {
        "id": "createusr",
        "key": "create_user_view",
        "name": "createUserView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": create_user_event_handler
    },
    "create_role_view": {
        "id": "createrole",
        "key": "create_role_view",
        "name": "createRoleView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": create_role_event_handler
    },
    "permission_view": {
        "id": "permiView",
        "key": "permission_view",
        "name": "permissionView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": permission_view_event_handler
    },
    "projection_view": {
        "id": "projView",
        "key": "projection_view",
        "name": "projectionView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": projection_view_event_handler
    },
    "edit_user_view": {
        "id": "editUsr",
        "key": "edit_user_view",
        "name": "editUserView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": edit_user_view_event_handler
    },
    "edit_role_view": {
        "id": "editRole",
        "key": "edit_role_view",
        "name": "editRoleView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "eventHandler": edit_role_view_event_handler
    },
    "guidance_view": {
        "id": "guidance",
        "key": "guidance_view",
        "name": "guidanceView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "label": "Guidance View",
        "eventCalled": false,
        "eventHandler": guidance_view_event_handler,
        "icon": "flaticon-guidance"
    },
    "create_guidance_view": {
        "id": "createguidance",
        "key": "create_guidance_view",
        "name": "createGuidanceView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
    },
    "edit_guidance_view": {
        "id": "editguidance",
        "key": "edit_guidance_view",
        "name": "editGuidanceView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
    },
    "test_procedure_view": {
        "id": "testPro",
        "key": "test_procedure_view",
        "name": "testProcedureView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "label": "Test Procedure View",
        "eventCalled": false,
        "eventHandler": test_procedure_view_event_handler,
        "icon": "flaticon-test-procedure"
    },
    "create_test_procedure_view": {
        "id": "createtestPro",
        "key": "create_test_procedure_view",
        "name": "createTestProcedureView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
    },
    "edit_test_procedure_view": {
        "id": "edittestPro",
        "key": "edit_test_procedure_view",
        "name": "editTestProcedureView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
    },
    "source_view": {
        "id": "source",
        "key": "source_view",
        "name": "sourceView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
        "label": "Source View",
        "eventHandler": source_view_event_handler,
        "icon": "flaticon-source"
    },
    "create_source_view": {
        "id": "createsource",
        "key": "create_source_view",
        "name": "createSourceView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
    },
    "edit_source_view": {
        "id": "editsource",
        "key": "edit_source_view",
        "name": "editSourceView",
        "priority": 2,
        "minimal": constants.viewSize.QUARTER,
    },

};
backing.event_type = {
    "deleted_business_control": {
        "key": "deleted_business_control"
    },
    "created_business_element_type": {
        "key": "created_business_element_type"
    },
    "created_Business": {
        "key": "created_Business"
    },
    "modified_direct_asset_type_element_association": {
        "key": "modified_direct_asset_type_element_association"
    },
    "modified_direct_asset_element_association": {
        "key": "modified_direct_asset_element_association"
    },
    "modified_direct_element_element_association": {
        "key": "modified_direct_element_element_association"
    },
    "modified_spheric_mode": {
        "key": "modified_spheric_mode"
    },
    "create_artifact": {
        "key": "create_artifact"
    },
    "edit_artifact": {
        "key": "edit_artifact"
    },
    "added_asset_delivers_attribute_library": {
        "key": "added_asset_delivers_attribute_library"
    },
    "added_shield_element_attribute_library": {
        "key": "added_shield_element_attribute_library"
    },
    "deleted_shield_element_attribute": {
        "key": "deleted_shield_element_attribute"
    },
    "deleted_asset_delivers_attribute": {
        "key": "deleted_asset_delivers_attribute"
    },
    "deleted_element": {
        "key": "deleted_element"
    },
    "deleted_asset_element": {
        "key": "deleted_asset_element"
    },
    "deleted_asset_type_element": {
        "key": "deleted_asset_type_element"
    },
    "deleted_provider_element": {
        "key": "deleted_provider_element"
    },
    "deleted_organizationalUnit_element": {
        "key": "deleted_organizationalUnit_element"
    },
    "deleted_objectiveParameter_element": {
        "key": "deleted_objectiveParameter_element"
    },
    "deleted_methodParameter_element": {
        "key": "deleted_methodParameter_element"
    },
    "deleted_contentParameter_element": {
        "key": "deleted_contentParameter_element"
    },
    "deleted_subjectParameter_element": {
        "key": "deleted_subjectParameter_element"
    },
    "deleted_shield": {
        "key": "deleted_shield"
    },
    "deleted_shield_element": {
        "key": "deleted_shield_element"
    },
    "deleted_standard_element": {
        "key": "deleted_standard_element"
    },
    "deleted_threat_element": {
        "key": "deleted_threat_element"
    },
    "deleted_shield_element_type": {
        "key": "deleted_shield_element_type"
    },
    "deleted_standard": {
        "key": "deleted_standard"
    },
    "deleted_threat": {
        "key": "deleted_threat"
    },
    "deleted_standard_element_type": {
        "key": "deleted_standard_element_type"
    },
    "deleted_threat_element_type": {
        "key": "deleted_threat_element_type"
    },
    "deleted_expression": {
        "key": "deleted_expression"
    },
    "deleted_perspective": {
        "key": "deleted_perspective"
    },
    "deleted_asset_delivers_attribute_library": {
        "key": "deleted_asset_delivers_attribute_library"
    },
    "deleted_shield_element_attribute_library": {
        "key": "deleted_shield_element_attribute_library"
    },
    "created_asset_delivers_attribute": {
        "key": "created_asset_delivers_attribute"
    },
    "created_shield_element_attribute": {
        "key": "created_shield_element_attribute"
    },
    "created_shield": {
        "key": "created_shield_element_type"
    },
    "created_standard": {
        "key": "created_standard"
    },
    "created_threat": {
        "key": "created_threat"
    },
    "created_shield_element_type": {
        "key": "created_shield_element_type"
    },
    "created_standard_element_type": {
        "key": "created_standard_element_type"
    },
    "created_threat_element_type": {
        "key": "created_threat_element_type"
    },
    "created_shield_element": {
        "key": "created_shield_element"
    },
    "created_asset_element": {
        "key": "created_asset_element"
    },
    "created_asset_type_element": {
        "key": "created_asset_type_element"
    },
    "created_expression": {
        "key": "created_expression"
    },
    "created_objectiveParameter_element": {
        "key": "created_objectiveParameter_element"
    },
    "created_methodParameter_element": {
        "key": "created_methodParameter_element"
    },
    "created_subjectParameter_element": {
        "key": "created_subjectParameter_element"
    },
    "created_contentParameter_element": {
        "key": "created_contentParameter_element"
    },
    "created_provider_element": {
        "key": "created_provider_element"
    },
    "created_organizationalunit_element": {
        "key": "created_organizationalunit_element"
    },
    "created_perspective": {
        "key": "created_perspective"
    },
    "created_asset_delivers_attribute_library": {
        "key": "created_asset_delivers_attribute_library"
    },
    "created_shield_element_attribute_library": {
        "key": "created_shield_element_attribute_library"
    },
    "edited_shield_element_attribute": {
        "key": "edited_shield_element_attribute"
    },
    "edited_asset_delivers_attribute": {
        "key": "edited_asset_delivers_attribute"
    },
    "edited_shield": {
        "key": "edited_shield"
    },
    "edited_shield_element_type": {
        "key": "edited_shield_element_type"
    },
    "edited_shield_element": {
        "key": "edited_shield_element"
    },
    "edited_asset_element": {
        "key": "edited_asset_element"
    },
    "edited_asset_type_element": {
        "key": "edited_asset_type_element"
    },
    "edited_provider_element": {
        "key": "edited_provider_element"
    },
    "edited_organizationalunit_element": {
        "key": "edited_organizationalunit_element"
    },
    "edited_expression": {
        "key": "edited_expression"
    },
    "edited_subjectParameter_element": {
        "key": "edited_subjectParameter_element"
    },
    "edited_objectiveParameter_element": {
        "key": "edited_objectiveParameter_element"
    },
    "edited_methodParameter_element": {
        "key": "edited_methodParameter_element"
    },
    "edited_contentParameter_element": {
        "key": "edited_contentParameter_element"
    },
    "edited_perspective": {
        "key": "edited_perspective"
    },
    "modified_shield_element_association": {
        "key": "modified_shield_element_association"
    },
    "modified_protection_association": {
        "key": "modified_protection_association"
    },
    "modified_asset_association": {
        "key": "modified_asset_association"
    },
    "edited_asset_delivers_rating": {
        "key": "edited_asset_delivers_rating"
    },
    "edited_asset_delivers_rating_justification_reason": {
        "key": "edited_asset_delivers_rating_justification_reason"
    },
    "edited_shield_element_attribute_rating": {
        "key": "edited_shield_element_attribute_rating"
    },
    "edited_shield_element_rating_justification_reason": {
        "key": "edited_shield_element_rating_justification_reason"
    },
    "asset_delivers_singleview_perspective_selection_changed": {
        "key": "asset_delivers_singleview_perspective_selection_changed"
    },
    "perspective_selection_changed_singleview": {
        "key": "perspective_selection_changed_singleview"
    },
    "perspective_selection_changed_biview": {
        "key": "perspective_selection_changed_biview"
    },
    "composite_color_change_single": {
        "key": "composite_color_change_single"
    },
    "composite_color_change_biview": {
        "key": "composite_color_change_single"
    },
    "edited_asset_delivers_attribute_library": {
        "key": "edited_asset_delivers_attribute_library"
    },
    "edited_shield_element_attribute_library": {
        "key": "edited_shield_element_attribute_library"
    },
    "edited_shield_element_group": {
        "key": "edited_shield_element_group"
    },
    "created_shield_element_group": {
        "key": "created_shield_element_group"
    },
    "deleted_shield_element_group": {
        "key": "deleted_shield_element_group"
    },
    "created_user": {
        "key": "created_user"
    },
    "created_role": {
        "key": "created_role"
    },
    "edited_user": {
        "key": "edited_user"
    },
    "edited_role": {
        "key": "edited_role"
    },
    "deleted_user": {
        "key": "deleted_user"
    },
    "deleted_role": {
        "key": "deleted_role"
    },
    "selector_change": {
        "key": "selector_change"
    },
    "created_guidances": {
        "key": "created_guidances"
    },
    "created_test_procedure": {
        "key": "created_test_procedure"
    },
    "create_source": {
        "key": "create_source"
    },
    "protection_standard_selected": {
        "key": "protection_standard_selected"
    },
    "protection_threat_selected": {
        "key": "protection_threat_selected"
    },
    "protection_shield_selected": {
        "key": "protection_shield_selected"
    }
};
backing.object_type = {
    "shield_element": {
        "key": "shield_element",
        "icon": "flaticon-shield-element",
    },
    "shield": {
        "key": "shield",
        "icon": "flaticon-shield-workspace",
    },
    "shield_element_type": {
        "key": "shield_element_type",
        "icon": "flaticon-shield-element-type",
    },
    "shield_element_group": {
        "key": "shield_element_group",
        "icon": "flaticon-shield-element-type",
    },
    "standard": {
        "key": "standard",
        "icon": "flaticon-standard-workspace",
    },
    "threat": {
        "key": "threat",
        "icon": "flaticon-threat-workspace",
    },
    "standard_element_type": {
        "key": "standard_element_type",
        "icon": "flaticon-standard-element-type",
    },
    "threat_element_type": {
        "key": "threat_element_type",
        "icon": "flaticon-threat-element-type",
    },
    "b_framework": {
        "key": "b_framework",
        "icon": "flaticon-business-workspace",
    },
    "b_control": {
        "key": "b_control",
        "icon": "flaticon-business-element",
    },
    "b_control_type": {
        "key": "b_control_type",
        "icon": "flaticon-business-element-type",
    },
    "standard_element_group": {
        "key": "standard_element_group",
        "icon": "flaticon-standard-element-type",
    },
    "threat_element_group": {
        "key": "threat_element_group",
        "icon": "flaticon-threat-element-type",
    },
    "standard_element": {
        "key": "standard_element",
        "icon": "flaticon-standard-element",
    },
    "threat_element": {
        "key": "threat_element",
        "icon": "flaticon-threat-control",
    },
    "asset_type": {
        "key": "asset_type",
        "icon": "flaticon-asset-type-element",
    },
    "asset": {
        "key": "asset",
        "icon": "flaticon-asset-element",
    },
    "provider_info": {
        "key": "provider_info",
        "icon": "flaticon-provider-element",
    },
    "business_asset_type": {
        "key": "business_asset_type",
        "icon": "flaticon-business-asset-type-element",
    },
    "business_asset": {
        "key": "business_asset",
        "icon": "flaticon-business-asset-element",
    },
    "business_provider": {
        "key": "business_provider",
        "icon": "flaticon-business-provider-element",
    },
    "objective_parameter_word": {
        "key": "objective_parameter_word",
        "icon": "flaticon-objective-element",
    },
    "content_parameter_word": {
        "key": "content_parameter_word",
        "icon": "flaticon-content-element-new-white",
    },
    "subject_parameter_word": {
        "key": "subject_parameter_word",
        "icon": "flaticon-protected-element",
    },
    "method_parameter_word": {
        "key": "method_parameter_word",
        "icon": "flaticon-method-element-new-white",
    },
    "artifact": {
        "key": "artifact",
        "icon": "ss-evidence",
    },
    "perspective": {
        "key": "perspective",
        "icon": "flaticon-perspective-attributes",
    },
    "asset_delivers_attribute": {
        "key": "asset_delivers_attribute",
        "icon": "flaticon-perspective-attributes",
    },
    "asset_implements_attribute": {
        "key": "asset_implements_attribute",
        "icon": "flaticon-perspective-attributes",
    },
    "shield_element_rt_attribute": {
        "key": "shield_element_rt_attribute",
        "icon": "flaticon-perspective-attributes",
    },
    "organizational_unit": {
        "key": "organizational_unit",
        "icon": "flaticon-organisational-element",
    },
    "role": {
        "key": "role",
        "icon": "flaticon-active-role",
    },
    "user": {
        "key": "user",
        "icon": "flaticon-user",
    },
    "guidance": {
        "key": "guidance",
        "icon": "flaticon-guidance",
    },
    "test_procedure": {
        "key": "test_procedure",
        "icon": "flaticon-test-procedure",
    },
    "ingest_source": {
        "key": "ingest_source",
        "icon": "flaticon-source",
    },
    "sce": {
        "key": "sce",
        "icon": "flaticon-expression-element",
    }
};

constants.linkNames = {
    "ELEMENT_TO_EXPRESSION": "fulfilled by",
    "ASSET_TYPE_TO_EXPRESSION": "protected by",
    "ASSET_TO_EXPRESSION": "delivers",
    "EXPRESSION_TO_ASSET": "delivered by",
    "ELEMENT_MAP_TO_ELEMENT": "related to",
    "EXPRESSION_TO_ELEMENT": "fulfills",
    "ASSET_TO_ELEMENT": "is implemented by"
};


constants.richTextOptions={

    // text formatting
    bold: true,
    italic: true,
    underline: true,
  
    // text alignment
    leftAlign: false,
    centerAlign: false,
    rightAlign: false,
    justify: false,
  
    // lists
    ol: false,
    ul: false,
  
    // title
    heading: false,
  
    // fonts
    fonts: false,
    fontList: 
    ["Arial",
      "Arial Black",
      "Helvetica",
      "Lucida Console",
      "Tahoma"
    ],
    fontColor: true,
    fontSize: true,
  
    // link
    urls: false,
  
    // tables
    table: false,
  
    // code
    removeStyles: true,
  
    // colors
    colors: [],
  
     // uploads
    imageUpload: false,
    fileUpload: false,
    videoEmbed:false,
    code:false,



    // dev settings
    useSingleQuotes: false,
    height: 250,
    heightPercentage: 100,
    id: "",
    class: "",
    useParagraph: false,
    maxlength: 0,
    useTabForNext: true,
  
    // callback function after init
    callback: undefined,
  
  };