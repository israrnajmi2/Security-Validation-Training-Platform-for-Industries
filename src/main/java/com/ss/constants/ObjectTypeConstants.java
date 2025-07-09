package com.ss.constants;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class ObjectTypeConstants {
    public static final Set<String> CONSTANTS_AS_ARRAY = new HashSet<>(Arrays.asList(new String[]{"threat_element", "threat_element_type", "threat", "asset_implements_library_attribute", "asset_implements_attribute_rating", "asset_implements_attribute", "business_provider_group_member", "business_asset_type_group_member", "business_asset_group_member", "shield_type", "shield", "shield_element_type", "shield_element", "standard_element", "standard_element_type", "standard", "b_control", "b_control_type", "b_framework", "sce", "organizational_unit", "objective_parameter_word", "method_parameter_word", "content_parameter_word", "subject_parameter_word", "asset_type", "asset", "business_asset_type", "business_asset", "technical_support_people", "provider_info", "business_provider", "technical_support_contact_info", "sce_fulfills_shield_element", "asset_type_could_be_protected_by_sce", "asset_type_shall_be_protected_by_sce", "asset_type_is_protected_by_sce", "business_asset_type_to_expression_link", "business_asset_type_to_expression_could_link", "asset_could_delivers_sce", "asset_shall_delivers_sce", "business_asset_to_expression_link", "business_asset_to_expression_could_link", "business_asset_to_shield_element_link", "direct_asset_to_shield_element_link", "direct_asset_type_to_shield_element_link", "business_asset_type_to_shield_element_link", "direct_shield_element_to_shield_element_link", "approved_user_role_link", "approval_pending_user_role_link", "shield_element_group", "sce_group", "asset_group", "asset_type_group", "provider_group", "business_asset_group", "business_asset_type_group", "business_provider_group", "shield_element_group_member", "sce_group_member", "asset_group_member", "asset_type_group_member", "provider_group_member", "perspective", "asset_delivers_attribute", "asset_delivers_attribute_rating", "asset_delivers_library_attribute", "shield_element_rt_attribute", "shield_element_rt_attribute_rating", "shield_element_library_attribute", "sce_rt_attribute", "sce_rt_attribute_rating", "sce_library_attribute", "sce_fulfills_shield_element_rt_attribute", "sce_fulfills_shield_element_rt_attribute_rating", "sce_fulfills_shield_element_library_attribute", "asset_type_protected_by_sce_rt_attribute", "asset_type_protected_by_sce_rt_attribute_rating", "asset_type_protected_by_sce_library_attribute", "artifact", "user", "role", "ingest_source", "test_procedure", "guidance"}));
    public static final String SHIELD_TYPE = "shield_type";
    public static final String SHIELD = "shield";
    public static final String SHIELD_ELEMENT_TYPE = "shield_element_type";
    public static final String SHIELD_ELEMENT = "shield_element";
    public static final String STANDARD_ELEMENT = "standard_element";
    public static final String STANDARD_ELEMENT_TYPE = "standard_element_type";
    public static final String STANDARD = "standard";
    public static final String BUSINESS_CONTROL = "b_control";
    public static final String BUSINESS_CONTROL_TYPE = "b_control_type";
    public static final String BUSINESS_FRAMEWORK = "b_framework";
    public static final String THREAT_ELEMENT = "threat_element";
    public static final String THREAT_ELEMENT_TYPE = "threat_element_type";
    public static final String THREAT_FRAMEWORK = "threat";

    public static final String SCE = "sce";
    public static final String ORGANIZATIONAL_UNIT = "organizational_unit";
    public static final String OBJECTIVE_PARAMETER = "objective_parameter_word";
    public static final String METHOD_PARAMETER = "method_parameter_word";
    public static final String CONTENT_PARAMETER = "content_parameter_word";
    public static final String SUBJECT_PARAMETER = "subject_parameter_word";
    public static final String ASSET_TYPE = "asset_type";
    public static final String ASSET = "asset";
    public static final String BUSINESS_ASSET_TYPE = "business_asset_type";
    public static final String BUSINESS_ASSET = "business_asset";
    public static final String TECHNICAL_SUPPORT_PEOPLE = "technical_support_people";
    public static final String PROVIDER = "provider_info";
    public static final String BUSINESS_PROVIDER = "business_provider";
    public static final String TECHNICAL_SUPPORT_CONTACT_INFO = "technical_support_contact_info";
    public static final String ELEMENT_TO_EXPRESSION_LINK = "sce_fulfills_shield_element";
    public static final String ASSET_TYPE_TO_EXPRESSION_LINK_COULD = "asset_type_could_be_protected_by_sce";
    public static final String ASSET_TYPE_TO_EXPRESSION_LINK = "asset_type_shall_be_protected_by_sce";
    public static final String BUSINESS_ASSET_TYPE_TO_EXPRESSION_LINK = "business_asset_type_to_expression_link";
    public static final String BUSINESS_ASSET_TYPE_TO_EXPRESSION_LINK_COULD = "business_asset_type_to_expression_could_link";
    public static final String ASSET_TO_EXPRESSION_LINK_COULD = "asset_could_delivers_sce";
    public static final String ASSET_TO_EXPRESSION_LINK = "asset_shall_delivers_sce";
    public static final String BUSINESS_ASSET_TO_EXPRESSION_LINK = "business_asset_to_expression_link";
    public static final String BUSINESS_ASSET_TO_EXPRESSION_LINK_COULD = "business_asset_to_expression_could_link";
    public static final String BUSINESS_ASSET_TO_SHIELD_ELEMENT_LINK = "business_asset_to_shield_element_link";
    public static final String ASSET_TO_SHIELD_ELEMENT_LINK = "direct_asset_to_shield_element_link";
    public static final String ASSET_TYPE_TO_SHIELD_ELEMENT_LINK = "direct_asset_type_to_shield_element_link";
    public static final String BUSINESS_ASSET_TYPE_TO_SHIELD_ELEMENT_LINK = "business_asset_type_to_shield_element_link";
    public static final String SHIELD_ELEMENT_TO_SHIELD_ELEMENT_LINK = "direct_shield_element_to_shield_element_link";
    public static final String APPROVED_USER_ROLE_LINK = "approved_user_role_link";
    public static final String APPROVAL_PENDING_USER_ROLE_LINK = "approval_pending_user_role_link";

    public static final String ASSET_TYPE_ROOT = "asset_type_root";
    public static final String BUSINESS_ASSET_TYPE_ROOT = "business_asset_type_root";
    public static final String OBJECTIVE_PARAMETER_ROOT = "objective_parameter_word_root";
    public static final String METHOD_PARAMETER_ROOT = "method_parameter_word_root";
    public static final String CONTENT_PARAMETER_ROOT = "content_parameter_word_root";
    public static final String SUBJECT_PARAMETER_ROOT = "subject_parameter_word_root";
    public static final String SCE_ROOT = "sce_root";
    public static final String SHIELD_TYPE_ROOT = "shield_type_root";
    public static final String ORGANIZATIONAL_UNIT_ROOT = "organizational_unit_root";
    public static final String SHIELD_ELEMENT_ROOT = "shield_element_root";
    //groups
    public static final String SHIELD_ELEMENT_GROUP = "shield_element_group";
    public static final String SCE_GROUP = "sce_group";
    public static final String ASSET_GROUP = "asset_group";
    public static final String ASSET_TYPE_GROUP = "asset_type_group";
    public static final String PROVIDER_GROUP = "provider_group";
    public static final String BUSINESS_ASSET_GROUP = "business_asset_group";
    public static final String BUSINESS_ASSET_TYPE_GROUP = "business_asset_type_group";
    public static final String BUSINESS_PROVIDER_GROUP = "business_provider_group";
    public static final String SHIELD_ELEMENT_GROUP_MEMBER = "shield_element_group_member";
    public static final String SCE_GROUP_MEMBER = "sce_group_member";
    public static final String ASSET_GROUP_MEMBER = "asset_group_member";
    public static final String ASSET_TYPE_GROUP_MEMBER = "asset_type_group_member";
    public static final String PROVIDER_GROUP_MEMBER = "provider_group_member";
    public static final String BUSINESS_ASSET_GROUP_MEMBER = "business_asset_group_member";
    public static final String BUSINESS_ASSET_TYPE_GROUP_MEMBER = "business_asset_type_group_member";
    public static final String BUSINESS_PROVIDER_GROUP_MEMBER = "business_provider_group_member";
    //roots
    public static final String ASSET_ROOT = "asset_root";
    public static final String BUSINESS_ASSET_ROOT = "business_asset_root";
    public static final String SHIELD_ROOT = "shield_root";
    public static final String SHIELD_ELEMENT_TYPE_ROOT = "shield_element_type_root";
    public static final String TECHNICAL_SUPPORT_PEOPLE_ROOT = "technical_support_people_root";
    public static final String PROVIDER_ROOT = "provider_root";
    public static final String BUSINESS_PROVIDER_ROOT = "business_provider_root";
    public static final String TECHNICAL_SUPPORT_CONTACT_INFO_ROOT = "technical_support_contact_info_root";

    public static final String SHIELD_ELEMENT_GROUP_ROOT = "shield_element_group_root";
    public static final String SCE_GROUP_ROOT = "sce_group_root";
    public static final String ASSET_GROUP_ROOT = "asset_group_root";
    public static final String ASSET_TYPE_GROUP_ROOT = "asset_type_group_root";
    public static final String PROVIDER_GROUP_ROOT = "provider_group_root";
    public static final String BUSINESS_ASSET_GROUP_ROOT = "business_asset_group_root";
    public static final String BUSINESS_ASSET_TYPE_GROUP_ROOT = "business_asset_type_group_root";
    public static final String BUSINESS_PROVIDER_GROUP_ROOT = "business_provider_group_root";

    public static final String PERSPECTIVE_ROOT = "perspective_root";
    public static final String PERSPECTIVE = "perspective";

    //asset delivers rt
    public static final String ASSET_DELIVERS_ATTRIBUTE_ROOT = "asset_delivers_attribute_root";
    public static final String ASSET_DELIVERS_ATTRIBUTE = "asset_delivers_attribute";
    public static final String ASSET_DELIVERS_ATTRIBUTE_RATING = "asset_delivers_attribute_rating";
    public static final String ASSET_DELIVERS_LIBRARY_ATTRIBUTE_ROOT = "asset_delivers_library_attribute_root";
    public static final String ASSET_DELIVERS_LIBRARY_ATTRIBUTE = "asset_delivers_library_attribute";

    //asset implements element rt
    public static final String ASSET_IMPLEMENTS_ATTRIBUTE_ROOT = "asset_implements_attribute_root";
    public static final String ASSET_IMPLEMENTS_ATTRIBUTE = "asset_implements_attribute";
    public static final String ASSET_IMPLEMENTS_ATTRIBUTE_RATING = "asset_implements_attribute_rating";
    public static final String ASSET_IMPLEMENTS_LIBRARY_ATTRIBUTE_ROOT = "asset_implements_library_attribute_root";
    public static final String ASSET_IMPLEMENTS_LIBRARY_ATTRIBUTE = "asset_implements_library_attribute";

    //shield element rt
    public static final String SHIELD_ELEMENT_RT_ATTRIBUTE_ROOT = "shield_element_rt_attribute_root";
    public static final String SHIELD_ELEMENT_RT_ATTRIBUTE = "shield_element_rt_attribute";
    public static final String SHIELD_ELEMENT_RT_ATTRIBUTE_RATING = "shield_element_rt_attribute_rating";
    public static final String SHIELD_ELEMENT_LIBRARY_ATTRIBUTE_ROOT = "shield_element_library_attribute_root";
    public static final String SHIELD_ELEMENT_LIBRARY_ATTRIBUTE = "shield_element_library_attribute";

    //sce rt
    public static final String SCE_RT_ATTRIBUTE_ROOT = "sce_rt_attribute_root";
    public static final String SCE_RT_ATTRIBUTE = "sce_rt_attribute";
    public static final String SCE_RT_ATTRIBUTE_RATING = "sce_rt_attribute_rating";
    public static final String SCE_LIBRARY_ATTRIBUTE_ROOT = "sce_library_attribute_root";
    public static final String SCE_LIBRARY_ATTRIBUTE = "sce_library_attribute";

    //sce fulfills shield element rt
    public static final String SCE_FULFILLS_SHIELD_ELEMENT_RT_ATTRIBUTE_ROOT = "sce_fulfills_shield_element_rt_attribute_root";
    public static final String SCE_FULFILLS_SHIELD_ELEMENT_RT_ATTRIBUTE = "sce_fulfills_shield_element_rt_attribute";
    public static final String SCE_FULFILLS_SHIELD_ELEMENT_RT_ATTRIBUTE_RATING = "sce_fulfills_shield_element_rt_attribute_rating";
    public static final String SCE_FULFILLS_SHIELD_ELEMENT_LIBRARY_ATTRIBUTE_ROOT = "sce_fulfills_shield_element_library_attribute_root";
    public static final String SCE_FULFILLS_SHIELD_ELEMENT_LIBRARY_ATTRIBUTE = "sce_fulfills_shield_element_library_attribute";

    //asset type protected by sce rt
    public static final String ASSET_TYPE_PROTECTED_BY_SCE_RT_ATTRIBUTE_ROOT = "asset_type_protected_by_sce_rt_attribute_root";
    public static final String ASSET_TYPE_PROTECTED_BY_SCE_RT_ATTRIBUTE = "asset_type_protected_by_sce_rt_attribute";
    public static final String ASSET_TYPE_PROTECTED_BY_SCE_RT_ATTRIBUTE_RATING = "asset_type_protected_by_sce_rt_attribute_rating";
    public static final String ASSET_TYPE_PROTECTED_BY_SCE_LIBRARY_ATTRIBUTE_ROOT = "asset_type_protected_by_sce_library_attribute_root";
    public static final String ASSET_TYPE_PROTECTED_BY_SCE_LIBRARY_ATTRIBUTE = "asset_type_protected_by_sce_library_attribute";

    public static final String ARTIFACT = "artifact";
    public static final String ARTIFACT_ROOT = "artifact_root";

    public static final String USER = "user";
    public static final String USER_ROOT = "user_root";

    public static final String USER_ROLE = "role";
    public static final String USER_ROLE_ROOT = "role_root";

    public static final String INGEST_SOURCE = "ingest_source";
    public static final String INGEST_SOURCE_ROOT = "ingest_source_root";

    public static final String TEST_PROCEDURE = "test_procedure";
    public static final String TEST_PROCEDURE_ROOT = "test_procedure_root";

    public static final String GUIDANCE = "guidance";
    public static final String GUIDANCE_ROOT = "guidance_root";
}
