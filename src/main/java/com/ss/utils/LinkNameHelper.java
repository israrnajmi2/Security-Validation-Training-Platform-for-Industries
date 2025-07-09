package com.ss.utils;

import com.ss.constants.LinkName;
import com.ss.constants.ObjectTypeConstants;
import com.ss.constants.ShieldTypeConstants;
import com.ss.domain.shieldclassification.ShieldElement;
import org.springframework.stereotype.Service;

@Service("LinkNameHelper")
public class LinkNameHelper {

    public String getObjectTypeForElement(ShieldElement shieldElement) {
        String shieldTypeName = shieldElement.getShield().getShieldType().getName();
        switch(shieldTypeName) {
            case ShieldTypeConstants.SHIELD:
                return ObjectTypeConstants.SHIELD_ELEMENT;
            case ShieldTypeConstants.STANDARD:
                return ObjectTypeConstants.STANDARD_ELEMENT;
            case ShieldTypeConstants.BUSINESS:
                return ObjectTypeConstants.BUSINESS_CONTROL;
            case ShieldTypeConstants.THREAT:
                return ObjectTypeConstants.THREAT_ELEMENT;
        }
        return "";
    }

    public String getLinkName(String objectType1, String objectType2) {
        switch (objectType1) {
            case ObjectTypeConstants.SHIELD_ELEMENT:
                return getLinkNameForShieldElement(objectType2);
            case ObjectTypeConstants.STANDARD_ELEMENT:
                return getLinkNameForStandardElement(objectType2);
            case ObjectTypeConstants.BUSINESS_CONTROL:
                return getLinkNameForBusinessElement(objectType2);
            case ObjectTypeConstants.THREAT_ELEMENT:
                return getLinkNameForThreatElement(objectType2);
            case ObjectTypeConstants.ASSET_TYPE:
                return getLinkNameForSecurityAssetType(objectType2);
            case ObjectTypeConstants.ASSET:
                return getLinkNameForSecurityAsset(objectType2);
            case ObjectTypeConstants.BUSINESS_ASSET:
                return getLinkNameForBusinessAsset(objectType2);
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE:
                return getLinkNameForBusinessAssetType(objectType2);
        }
        return "";
    }

    private String getLinkNameForShieldElement(String objectType2) {
        switch (objectType2) {
            case ObjectTypeConstants.SHIELD_ELEMENT:
                return LinkName.SHIELD_ELEMENT_TO_SHIELD_ELEMENT;
            case ObjectTypeConstants.STANDARD_ELEMENT:
                return LinkName.SHIELD_ELEMENT_TO_STANDARD_ELEMENT;
            case ObjectTypeConstants.BUSINESS_CONTROL:
                return LinkName.SHIELD_ELEMENT_TO_BUSINESS_ELEMENT;
            case ObjectTypeConstants.THREAT_ELEMENT:
                return LinkName.SHIELD_ELEMENT_TO_THREAT_ELEMENT;
            case ObjectTypeConstants.ASSET_TYPE:
                return LinkName.SHIELD_ELEMENT_TO_SECURITY_ASSET_TYPE;
            case ObjectTypeConstants.ASSET:
                return LinkName.SHIELD_ELEMENT_TO_SECURITY_ASSET;
            case ObjectTypeConstants.BUSINESS_ASSET:
                return LinkName.SHIELD_ELEMENT_TO_BUSINESS_ASSET;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE:
                return LinkName.SHIELD_ELEMENT_TO_BUSINESS_ASSET_TYPE;
        }
        return "";
    }

    private String getLinkNameForStandardElement(String objectType2) {
        switch (objectType2) {
            case ObjectTypeConstants.SHIELD_ELEMENT:
                return LinkName.STANDARD_ELEMENT_TO_SHIELD_ELEMENT;
            case ObjectTypeConstants.STANDARD_ELEMENT:
                return LinkName.STANDARD_ELEMENT_TO_STANDARD_ELEMENT;
            case ObjectTypeConstants.BUSINESS_CONTROL:
                return LinkName.STANDARD_ELEMENT_TO_BUSINESS_ELEMENT;
            case ObjectTypeConstants.THREAT_ELEMENT:
                return LinkName.STANDARD_ELEMENT_TO_THREAT_ELEMENT;
            case ObjectTypeConstants.ASSET_TYPE:
                return LinkName.STANDARD_ELEMENT_TO_SECURITY_ASSET_TYPE;
            case ObjectTypeConstants.ASSET:
                return LinkName.STANDARD_ELEMENT_TO_SECURITY_ASSET;
            case ObjectTypeConstants.BUSINESS_ASSET:
                return LinkName.STANDARD_ELEMENT_TO_BUSINESS_ASSET;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE:
                return LinkName.STANDARD_ELEMENT_TO_BUSINESS_ASSET_TYPE;
        }
        return "";
    }

    private String getLinkNameForBusinessElement(String objectType2) {
        switch (objectType2) {
            case ObjectTypeConstants.SHIELD_ELEMENT:
                return LinkName.BUSINESS_ELEMENT_TO_SHIELD_ELEMENT;
            case ObjectTypeConstants.STANDARD_ELEMENT:
                return LinkName.BUSINESS_ELEMENT_TO_STANDARD_ELEMENT;
            case ObjectTypeConstants.BUSINESS_CONTROL:
                return LinkName.BUSINESS_ELEMENT_TO_BUSINESS_ELEMENT;
            case ObjectTypeConstants.THREAT_ELEMENT:
                return LinkName.BUSINESS_ELEMENT_TO_THREAT_ELEMENT;
            case ObjectTypeConstants.ASSET_TYPE:
                return LinkName.BUSINESS_ELEMENT_TO_SECURITY_ASSET_TYPE;
            case ObjectTypeConstants.ASSET:
                return LinkName.BUSINESS_ELEMENT_TO_SECURITY_ASSET;
            case ObjectTypeConstants.BUSINESS_ASSET:
                return LinkName.BUSINESS_ELEMENT_TO_BUSINESS_ASSET;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE:
                return LinkName.BUSINESS_ELEMENT_TO_BUSINESS_ASSET_TYPE;
        }
        return "";
    }

    private String getLinkNameForThreatElement(String objectType2) {
        switch (objectType2) {
            case ObjectTypeConstants.SHIELD_ELEMENT:
                return LinkName.THREAT_ELEMENT_TO_SHIELD_ELEMENT;
            case ObjectTypeConstants.STANDARD_ELEMENT:
                return LinkName.THREAT_ELEMENT_TO_STANDARD_ELEMENT;
            case ObjectTypeConstants.BUSINESS_CONTROL:
                return LinkName.THREAT_ELEMENT_TO_BUSINESS_ELEMENT;
            case ObjectTypeConstants.THREAT_ELEMENT:
                return LinkName.THREAT_ELEMENT_TO_THREAT_ELEMENT;
            case ObjectTypeConstants.ASSET_TYPE:
                return LinkName.THREAT_ELEMENT_TO_SECURITY_ASSET_TYPE;
            case ObjectTypeConstants.ASSET:
                return LinkName.THREAT_ELEMENT_TO_SECURITY_ASSET;
            case ObjectTypeConstants.BUSINESS_ASSET:
                return LinkName.THREAT_ELEMENT_TO_BUSINESS_ASSET;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE:
                return LinkName.THREAT_ELEMENT_TO_BUSINESS_ASSET_TYPE;
        }
        return "";
    }

    private String getLinkNameForSecurityAssetType(String objectType2) {
        switch (objectType2) {
            case ObjectTypeConstants.SHIELD_ELEMENT:
                return LinkName.SECURITY_ASSET_TYPE_TO_SHIELD_ELEMENT;
            case ObjectTypeConstants.STANDARD_ELEMENT:
                return LinkName.SECURITY_ASSET_TYPE_TO_STANDARD_ELEMENT;
            case ObjectTypeConstants.BUSINESS_CONTROL:
                return LinkName.SECURITY_ASSET_TYPE_TO_BUSINESS_ELEMENT;
            case ObjectTypeConstants.THREAT_ELEMENT:
                return LinkName.SECURITY_ASSET_TYPE_TO_THREAT_ELEMENT;
        }
        return "";
    }

    private String getLinkNameForSecurityAsset(String objectType2) {
        switch (objectType2) {
            case ObjectTypeConstants.SHIELD_ELEMENT:
                return LinkName.SECURITY_ASSET_TO_SHIELD_ELEMENT;
            case ObjectTypeConstants.STANDARD_ELEMENT:
                return LinkName.SECURITY_ASSET_TO_STANDARD_ELEMENT;
            case ObjectTypeConstants.BUSINESS_CONTROL:
                return LinkName.SECURITY_ASSET_TO_BUSINESS_ELEMENT;
            case ObjectTypeConstants.THREAT_ELEMENT:
                return LinkName.SECURITY_ASSET_TO_THREAT_ELEMENT;
        }
        return "";
    }

    private String getLinkNameForBusinessAssetType(String objectType2) {
        switch (objectType2) {
            case ObjectTypeConstants.SHIELD_ELEMENT:
                return LinkName.BUSINESS_ASSET_TYPE_TO_SHIELD_ELEMENT;
            case ObjectTypeConstants.STANDARD_ELEMENT:
                return LinkName.BUSINESS_ASSET_TYPE_TO_STANDARD_ELEMENT;
            case ObjectTypeConstants.BUSINESS_CONTROL:
                return LinkName.BUSINESS_ASSET_TYPE_TO_BUSINESS_ELEMENT;
            case ObjectTypeConstants.THREAT_ELEMENT:
                return LinkName.BUSINESS_ASSET_TYPE_TO_THREAT_ELEMENT;
        }
        return "";
    }

    private String getLinkNameForBusinessAsset(String objectType2) {
        switch (objectType2) {
            case ObjectTypeConstants.SHIELD_ELEMENT:
                return LinkName.BUSINESS_ASSET_TO_SHIELD_ELEMENT;
            case ObjectTypeConstants.STANDARD_ELEMENT:
                return LinkName.BUSINESS_ASSET_TO_STANDARD_ELEMENT;
            case ObjectTypeConstants.BUSINESS_CONTROL:
                return LinkName.BUSINESS_ASSET_TO_BUSINESS_ELEMENT;
            case ObjectTypeConstants.THREAT_ELEMENT:
                return LinkName.BUSINESS_ASSET_TO_THREAT_ELEMENT;
        }
        return "";
    }
}
