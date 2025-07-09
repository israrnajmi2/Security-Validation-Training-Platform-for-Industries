package com.ss.constants;

/**
 * created by chandrakanth on 29/10/17
 */


public class LinkName {

    //Expression Links
    public static final String ELEMENT_TO_EXPRESSION = "fulfilled by";
    public static final String EXPRESSION_TO_ELEMENT = "fulfills";

    public static final String ASSET_TO_EXPRESSION_COULD = "could deliver";
    public static final String ASSET_TO_EXPRESSION = "delivers";
    public static final String EXPRESSION_TO_ASSET_COULD = "could be delivered by";
    public static final String EXPRESSION_TO_ASSET = "delivered by";

    public static final String EXPRESSION_TO_ASSET_TYPE_COULD = "could protect";
    public static final String EXPRESSION_TO_ASSET_TYPE = "protects";
    public static final String ASSET_TYPE_TO_EXPRESSION_COULD = "could be protected by";
    public static final String ASSET_TYPE_TO_EXPRESSION = "protected by";

    public static final String BUSINESS_ASSET_TYPE_TO_EXPRESSION = "protected by";
    public static final String EXPRESSION_TO_BUSINESS_ASSET_TYPE = "protects";
    public static final String BUSINESS_ASSET_TYPE_TO_EXPRESSION_COULD = "could be protected by";
    public static final String EXPRESSION_TO_BUSINESS_ASSET_TYPE_COULD = "could protect";

    public static final String BUSINESS_ASSET_TO_EXPRESSION = "delivers";
    public static final String EXPRESSION_TO_BUSINESS_ASSET = "delivered by";
    public static final String BUSINESS_ASSET_TO_EXPRESSION_COULD = "could deliver";
    public static final String EXPRESSION_TO_BUSINESS_ASSET_COULD = "could be delivered by";

    //Direct Links
    /*public static final String ASSET_TO_ELEMENT = "implements";
    public static final String BUSINESS_ASSET_TO_SHIELD_ELEMENT = "implements";*/

    public static final String SECURITY_ASSET_TO_SHIELD_ELEMENT = "implements";
    public static final String SECURITY_ASSET_TO_STANDARD_ELEMENT = "delivers requirements of";
    public static final String SECURITY_ASSET_TO_BUSINESS_ELEMENT = "delivers protection to";
    public static final String SECURITY_ASSET_TO_THREAT_ELEMENT = "mitigates";

    public static final String BUSINESS_ASSET_TO_SHIELD_ELEMENT = "is policy protected by";
    public static final String BUSINESS_ASSET_TO_STANDARD_ELEMENT = "is in scope of";
    public static final String BUSINESS_ASSET_TO_BUSINESS_ELEMENT = "enables";
    public static final String BUSINESS_ASSET_TO_THREAT_ELEMENT = "is threatened by";

    /*public static final String ELEMENT_TO_ASSET = "implemented by";
    public static final String SHIELD_ELEMENT_TO_BUSINESS_ASSET = "implemented by";*/

    public static final String SHIELD_ELEMENT_TO_SECURITY_ASSET = "is implemented by";
    public static final String STANDARD_ELEMENT_TO_SECURITY_ASSET = "governs";
    public static final String BUSINESS_ELEMENT_TO_SECURITY_ASSET = "is protected by";
    public static final String THREAT_ELEMENT_TO_SECURITY_ASSET = "is mitigated by";

    public static final String SHIELD_ELEMENT_TO_BUSINESS_ASSET = "policy protects";
    public static final String STANDARD_ELEMENT_TO_BUSINESS_ASSET = "governs";
    public static final String BUSINESS_ELEMENT_TO_BUSINESS_ASSET = "is enabled by";
    public static final String THREAT_ELEMENT_TO_BUSINESS_ASSET = "threatens";

    /*public static final String ASSET_TYPE_TO_ELEMENT = "secured by";
    public static final String BUSINESS_ASSET_TYPE_TO_SHIELD_ELEMENT = "secured by";*/

    public static final String SECURITY_ASSET_TYPE_TO_SHIELD_ELEMENT = "implements";
    public static final String SECURITY_ASSET_TYPE_TO_STANDARD_ELEMENT = "delivers requirements of";
    public static final String SECURITY_ASSET_TYPE_TO_BUSINESS_ELEMENT = "delivers protection to";
    public static final String SECURITY_ASSET_TYPE_TO_THREAT_ELEMENT = "mitigates";

    public static final String BUSINESS_ASSET_TYPE_TO_SHIELD_ELEMENT = "is policy protected by";
    public static final String BUSINESS_ASSET_TYPE_TO_STANDARD_ELEMENT = "is in scope of";
    public static final String BUSINESS_ASSET_TYPE_TO_BUSINESS_ELEMENT = "enables";
    public static final String BUSINESS_ASSET_TYPE_TO_THREAT_ELEMENT = "is threatened by";


    /*public static final String ELEMENT_TO_ASSET_TYPE = "secures";
    public static final String SHIELD_ELEMENT_TO_BUSINESS_ASSET_TYPE = "secures";*/

    public static final String SHIELD_ELEMENT_TO_SECURITY_ASSET_TYPE = "is implemented by";
    public static final String STANDARD_ELEMENT_TO_SECURITY_ASSET_TYPE = "governs";
    public static final String BUSINESS_ELEMENT_TO_SECURITY_ASSET_TYPE = "is protected by";
    public static final String THREAT_ELEMENT_TO_SECURITY_ASSET_TYPE = "is mitigated by";

    public static final String SHIELD_ELEMENT_TO_BUSINESS_ASSET_TYPE = "policy protects";
    public static final String STANDARD_ELEMENT_TO_BUSINESS_ASSET_TYPE = "governs";
    public static final String BUSINESS_ELEMENT_TO_BUSINESS_ASSET_TYPE = "is enabled by";
    public static final String THREAT_ELEMENT_TO_BUSINESS_ASSET_TYPE = "threatens";

    /*public static final String ELEMENT_MAP_TO_ELEMENT = "related to";*/

    public static final String SHIELD_ELEMENT_TO_SHIELD_ELEMENT = "is related to";
    public static final String SHIELD_ELEMENT_TO_STANDARD_ELEMENT = "validates";
    public static final String SHIELD_ELEMENT_TO_BUSINESS_ELEMENT = "policy protects";
    public static final String SHIELD_ELEMENT_TO_THREAT_ELEMENT = "manages";

    public static final String STANDARD_ELEMENT_TO_SHIELD_ELEMENT = "is validated by";
    public static final String STANDARD_ELEMENT_TO_STANDARD_ELEMENT = "is related to";
    public static final String STANDARD_ELEMENT_TO_BUSINESS_ELEMENT = "governs";
    public static final String STANDARD_ELEMENT_TO_THREAT_ELEMENT = "governs";

    public static final String BUSINESS_ELEMENT_TO_SHIELD_ELEMENT = "is policy protected by";
    public static final String BUSINESS_ELEMENT_TO_STANDARD_ELEMENT = "is in scope of";
    public static final String BUSINESS_ELEMENT_TO_BUSINESS_ELEMENT = "is related to";
    public static final String BUSINESS_ELEMENT_TO_THREAT_ELEMENT = "is threatened by";

    public static final String THREAT_ELEMENT_TO_SHIELD_ELEMENT = "is managed by";
    public static final String THREAT_ELEMENT_TO_STANDARD_ELEMENT = "is in scope of";
    public static final String THREAT_ELEMENT_TO_BUSINESS_ELEMENT = "threatens";
    public static final String THREAT_ELEMENT_TO_THREAT_ELEMENT = "is related to";

    //Miscellaneous Links
    public static final String APPROVED = "approved";
    public static final String PENDING_APPROVAL = "pending approval";
    public static final String ROLE_ASSIGNED = "assigned to";
}
