package com.ss.service.generictraversal;

import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.constants.ObjectTypeConstants;
import com.ss.pojo.helper.ViewNameWithModes;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("NavigationChoicesHelperService")
public class NavigationChoicesHelperService {

    public Map<String, List<ViewNameWithModes>> getPossibleObjectTypeNavigationChoices() {
        Map<String, List<ViewNameWithModes>> map = new HashMap<>();
        map.put(ObjectTypeConstants.SHIELD_TYPE, getPossibleViewNavigationChoicesForShieldType());

        map.put(ObjectTypeConstants.SHIELD, getPossibleViewNavigationChoicesForShield());

        map.put(ObjectTypeConstants.STANDARD, getPossibleViewNavigationChoicesForStandard());

        map.put(ObjectTypeConstants.THREAT_FRAMEWORK, getPossibleViewNavigationChoicesForThreat());

        map.put(ObjectTypeConstants.BUSINESS_FRAMEWORK, getPossibleViewNavigationChoicesForBusiness());

        map.put(ObjectTypeConstants.SHIELD_ELEMENT_TYPE, getPossibleViewNavigationChoicesForShieldElementType());

        map.put(ObjectTypeConstants.STANDARD_ELEMENT_TYPE, getPossibleViewNavigationChoicesForStandardElementType());

        map.put(ObjectTypeConstants.THREAT_ELEMENT_TYPE, getPossibleViewNavigationChoicesForThreatElementType());

        map.put(ObjectTypeConstants.BUSINESS_CONTROL_TYPE, getPossibleViewNavigationChoicesForBusinessElementType());

        map.put(ObjectTypeConstants.SHIELD_ELEMENT, getPossibleViewNavigationChoicesForShieldElement());

        map.put(ObjectTypeConstants.STANDARD_ELEMENT, getPossibleViewNavigationChoicesForStandardElement());

        map.put(ObjectTypeConstants.THREAT_ELEMENT, getPossibleViewNavigationChoicesForThreatElement());

        map.put(ObjectTypeConstants.BUSINESS_CONTROL, getPossibleViewNavigationChoicesForBusinessElement());

        map.put(ObjectTypeConstants.SCE, getPossibleViewNavigationChoicesForSCE());

        map.put(ObjectTypeConstants.OBJECTIVE_PARAMETER, getPossibleViewNavigationChoicesForObjectiveParameter());

        map.put(ObjectTypeConstants.METHOD_PARAMETER, getPossibleViewNavigationChoicesForMethodParameter());

        map.put(ObjectTypeConstants.CONTENT_PARAMETER, getPossibleViewNavigationChoicesForContentParameter());

        map.put(ObjectTypeConstants.SUBJECT_PARAMETER, getPossibleViewNavigationChoicesForSubjectParameter());

        map.put(ObjectTypeConstants.ASSET_TYPE, getPossibleViewNavigationChoicesForAssetType());

        map.put(ObjectTypeConstants.ASSET, getPossibleViewNavigationChoicesForAsset());

        map.put(ObjectTypeConstants.TECHNICAL_SUPPORT_PEOPLE, getPossibleViewNavigationChoicesForTechnicalSupportPeople());

        map.put(ObjectTypeConstants.PROVIDER, getPossibleViewNavigationChoicesForProvider());

        map.put(ObjectTypeConstants.TECHNICAL_SUPPORT_CONTACT_INFO, getPossibleViewNavigationChoicesForTechnicalSupportContactInfo());

        map.put(ObjectTypeConstants.ORGANIZATIONAL_UNIT, getPossibleViewNavigationChoicesForOrganizationalUnit());

        map.put(ObjectTypeConstants.BUSINESS_ASSET, getPossibleViewNavigationChoicesForBusinessAsset());
        map.put(ObjectTypeConstants.BUSINESS_ASSET_TYPE, getPossibleViewNavigationChoicesForBusinessAssetType());
        map.put(ObjectTypeConstants.BUSINESS_PROVIDER, getPossibleViewNavigationChoicesForBusinessProvider());
        map.put(ObjectTypeConstants.BUSINESS_PROVIDER_GROUP, getPossibleViewNavigationChoicesForBusinessProviderGroup());
        map.put(ObjectTypeConstants.BUSINESS_ASSET_TYPE_GROUP, getPossibleViewNavigationChoicesForBusinessAssetTypeGroup());
        map.put(ObjectTypeConstants.BUSINESS_ASSET_GROUP, getPossibleViewNavigationChoicesForBusinessAssetGroup());

        //groups
        map.put(ObjectTypeConstants.SHIELD_ELEMENT_GROUP, getPossibleViewNavigationChoicesForShieldElementGroup());
        map.put(ObjectTypeConstants.SCE_GROUP, getPossibleViewNavigationChoicesForSceGroup());
        map.put(ObjectTypeConstants.ASSET_GROUP, getPossibleViewNavigationChoicesForAssetGroup());
        map.put(ObjectTypeConstants.ASSET_TYPE_GROUP, getPossibleViewNavigationChoicesForAssetTypeGroup());
        map.put(ObjectTypeConstants.PROVIDER_GROUP, getPossibleViewNavigationChoicesForProviderGroup());
        map.put(ObjectTypeConstants.USER, getPossibleViewNavigationChoicesForSphericUser());
        map.put(ObjectTypeConstants.USER_ROLE, getPossibleViewNavigationChoicesForUserRole());
        map.put(ObjectTypeConstants.TEST_PROCEDURE, getPossibleViewNavigationChoicesForTestProcedure());
        map.put(ObjectTypeConstants.GUIDANCE, getPossibleViewNavigationChoicesForGuidance());
        map.put(ObjectTypeConstants.INGEST_SOURCE, getPossibleViewNavigationChoicesForIngestSource());

        return map;
    }

    public Map<String, List<ViewNameWithModes>> getPossibleViewNavigationChoices() {
        Map<String, List<ViewNameWithModes>> map = new HashMap<>();
        map.put(GIView.SHIELD_TYPE, getPossibleViewNavigationChoicesForShieldType());

        map.put(GIView.SHIELD, getPossibleViewNavigationChoicesForShield());
        map.put(GIView.STANDARD, getPossibleViewNavigationChoicesForStandard());
        map.put(GIView.THREAT, getPossibleViewNavigationChoicesForThreat());
        map.put(GIView.BUSINESS, getPossibleViewNavigationChoicesForBusiness());

        map.put(GIView.SHIELD_ELEMENT_TYPE, getPossibleViewNavigationChoicesForShieldElementType());
        map.put(GIView.STANDARD_ELEMENT_TYPE, getPossibleViewNavigationChoicesForStandardElementType());
        map.put(GIView.BUSINESS_ELEMENT_TYPE, getPossibleViewNavigationChoicesForBusinessElementType());
        map.put(GIView.THREAT_ELEMENT_TYPE, getPossibleViewNavigationChoicesForThreatElementType());

        map.put(GIView.SHIELD_ELEMENT, getPossibleViewNavigationChoicesForShieldElement());
        map.put(GIView.STANDARD_ELEMENT, getPossibleViewNavigationChoicesForStandardElement());
        map.put(GIView.THREAT_ELEMENT, getPossibleViewNavigationChoicesForThreatElement());
        map.put(GIView.BUSINESS_ELEMENT, getPossibleViewNavigationChoicesForBusinessElement());

        map.put(GIView.SCE, getPossibleViewNavigationChoicesForSCE());

        map.put(GIView.OBJECTIVE_PARAMETER, getPossibleViewNavigationChoicesForObjectiveParameter());

        map.put(GIView.METHOD_PARAMETER, getPossibleViewNavigationChoicesForMethodParameter());

        map.put(GIView.CONTENT_PARAMETER, getPossibleViewNavigationChoicesForContentParameter());

        map.put(GIView.SUBJECT_PARAMETER, getPossibleViewNavigationChoicesForSubjectParameter());

        map.put(GIView.ASSET_TYPE, getPossibleViewNavigationChoicesForAssetType());

        map.put(GIView.ASSET, getPossibleViewNavigationChoicesForAsset());

        map.put(GIView.TECHNICAL_SUPPORT_PEOPLE, getPossibleViewNavigationChoicesForTechnicalSupportPeople());

        map.put(GIView.PROVIDER, getPossibleViewNavigationChoicesForProvider());

        map.put(GIView.TECHNICAL_SUPPORT_CONTACT_INFO, getPossibleViewNavigationChoicesForTechnicalSupportContactInfo());

        map.put(GIView.ORGANIZATIONAL_UNIT, getPossibleViewNavigationChoicesForOrganizationalUnit());

        //groups
        map.put(GIView.SHIELD_ELEMENT_GROUP, getPossibleViewNavigationChoicesForShieldElementGroup());
        map.put(GIView.SCE_GROUP, getPossibleViewNavigationChoicesForSceGroup());
        map.put(GIView.ASSET_GROUP, getPossibleViewNavigationChoicesForAssetGroup());
        map.put(GIView.ASSET_TYPE_GROUP, getPossibleViewNavigationChoicesForAssetTypeGroup());
        map.put(GIView.PROVIDER_GROUP, getPossibleViewNavigationChoicesForProviderGroup());

        map.put(GIView.SPHERIC_USER, getPossibleViewNavigationChoicesForSphericUser());
        map.put(GIView.ROLES, getPossibleViewNavigationChoicesForUserRole());
        map.put(GIView.INGEST_SOURCE, getPossibleViewNavigationChoicesForIngestSource());
        map.put(GIView.TEST_PROCEDURE, getPossibleViewNavigationChoicesForTestProcedure());
        map.put(GIView.GUIDANCE, getPossibleViewNavigationChoicesForGuidance());

        //business
        map.put(GIView.BUSINESS_ASSET, getPossibleViewNavigationChoicesForBusinessAsset());
        map.put(GIView.BUSINESS_ASSET_TYPE, getPossibleViewNavigationChoicesForBusinessAssetType());
        map.put(GIView.BUSINESS_PROVIDER, getPossibleViewNavigationChoicesForBusinessProvider());
        map.put(GIView.BUSINESS_PROVIDER_GROUP, getPossibleViewNavigationChoicesForBusinessProviderGroup());
        map.put(GIView.BUSINESS_ASSET_TYPE_GROUP, getPossibleViewNavigationChoicesForBusinessAssetTypeGroup());
        map.put(GIView.BUSINESS_ASSET_GROUP, getPossibleViewNavigationChoicesForBusinessAssetGroup());

        return map;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForIngestSource() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.TEST_PROCEDURE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.GUIDANCE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForGuidance() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.INGEST_SOURCE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForTestProcedure() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.INGEST_SOURCE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForProviderGroup() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.PROVIDER, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForBusinessProviderGroup() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.BUSINESS_PROVIDER, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForSphericUser() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.APPROVED_ROLES, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.PENDING_APPROVAL_ROLES, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.ROLES, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForUserRole() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.SPHERIC_USER, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        return views;
    }


    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForAssetTypeGroup() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForBusinessAssetTypeGroup() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.BUSINESS_ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForAssetGroup() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForBusinessAssetGroup() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.BUSINESS_ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForSceGroup() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForShieldElementGroup() {

        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForOrganizationalUnit() {

        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS, GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID}));
        views.add(createViewNameWithModeObj(GIView.PROVIDER, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.PARENT_ELEMENT, GIMode.CHILDREN_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.SCE_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.ASSET_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.ASSET_TYPE_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.PROVIDER_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(createViewNameWithModeObj(GIView.SPHERIC_USER, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForTechnicalSupportContactInfo() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.TECHNICAL_SUPPORT_PEOPLE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForProvider() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.TECHNICAL_SUPPORT_PEOPLE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.PROVIDER_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForBusinessProvider() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.BUSINESS_ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.BUSINESS_PROVIDER_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForTechnicalSupportPeople() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.TECHNICAL_SUPPORT_CONTACT_INFO, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.PROVIDER, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForAsset() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.PROVIDER, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SCE, new String[]{GIMode.ALL_LINKED_ELEMENTS, GIMode.SHALL_DELIVER, GIMode.COULD_DELIVER}));

        views.add(createViewNameWithModeObj(GIView.ASSET_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForBusinessAsset() {
        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(createViewNameWithModeObj(GIView.BUSINESS_ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.BUSINESS_PROVIDER, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SCE, new String[]{GIMode.ALL_LINKED_ELEMENTS, GIMode.SHALL_DELIVER, GIMode.COULD_DELIVER}));

        views.add(createViewNameWithModeObj(GIView.BUSINESS_ASSET_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForAssetType() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.ASSET_TYPE, new String[]{GIMode.CHILDREN_ELEMENTS, GIMode.PARENT_ELEMENT}));

        views.add(createViewNameWithModeObj(GIView.ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.ASSET_TYPE_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SCE, new String[]{GIMode.ALL_LINKED_ELEMENTS, GIMode.SHALL_PROTECT, GIMode.COULD_PROTECT}));

        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForBusinessAssetType() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.BUSINESS_ASSET_TYPE, new String[]{GIMode.CHILDREN_ELEMENTS, GIMode.PARENT_ELEMENT}));

        views.add(createViewNameWithModeObj(GIView.BUSINESS_ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.BUSINESS_ASSET_TYPE_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SCE, new String[]{GIMode.ALL_LINKED_ELEMENTS, GIMode.SHALL_PROTECT, GIMode.COULD_PROTECT}));

        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForSubjectParameter() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.SUBJECT_PARAMETER, new String[]{GIMode.CHILDREN_ELEMENTS, GIMode.PARENT_ELEMENT}));

        views.add(createViewNameWithModeObj(GIView.SCE, new String[]{GIMode.PARAMETER_PART_OF_SCE}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForContentParameter() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.CONTENT_PARAMETER, new String[]{GIMode.CHILDREN_ELEMENTS, GIMode.PARENT_ELEMENT}));

        views.add(createViewNameWithModeObj(GIView.SCE, new String[]{GIMode.PARAMETER_PART_OF_SCE}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForMethodParameter() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.METHOD_PARAMETER, new String[]{GIMode.CHILDREN_ELEMENTS, GIMode.PARENT_ELEMENT}));

        views.add(createViewNameWithModeObj(GIView.SCE, new String[]{GIMode.PARAMETER_PART_OF_SCE}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForObjectiveParameter() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.OBJECTIVE_PARAMETER, new String[]{GIMode.CHILDREN_ELEMENTS, GIMode.PARENT_ELEMENT}));

        views.add(createViewNameWithModeObj(GIView.SCE, new String[]{GIMode.PARAMETER_PART_OF_SCE}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForSCE() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.OBJECTIVE_PARAMETER, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.METHOD_PARAMETER, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.CONTENT_PARAMETER, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SUBJECT_PARAMETER, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SCE_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.SHALL_PROTECT, GIMode.COULD_PROTECT}));

        views.add(createViewNameWithModeObj(GIView.ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS, GIMode.SHALL_DELIVER, GIMode.COULD_DELIVER}));

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForShieldElement() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.SHIELD, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS, GIMode.PARENT_ELEMENT, GIMode.CHILDREN_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SCE, new String[]{GIMode.FULFILLS}));

        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.TEST_PROCEDURE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.GUIDANCE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_BUSINESS_ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_BUSINESS_ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));


        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForStandardElement() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.STANDARD, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.STANDARD_ELEMENT_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.STANDARD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS, GIMode.PARENT_ELEMENT, GIMode.CHILDREN_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SCE, new String[]{GIMode.FULFILLS}));

        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.TEST_PROCEDURE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.GUIDANCE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_BUSINESS_ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_BUSINESS_ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));


        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForThreatElement() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.THREAT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.THREAT_ELEMENT_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.THREAT_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS, GIMode.PARENT_ELEMENT, GIMode.CHILDREN_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SCE, new String[]{GIMode.FULFILLS}));

        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.TEST_PROCEDURE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.GUIDANCE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_BUSINESS_ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_BUSINESS_ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));


        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForBusinessElement() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.BUSINESS, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.BUSINESS_ELEMENT_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.BUSINESS_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS, GIMode.PARENT_ELEMENT, GIMode.CHILDREN_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SCE, new String[]{GIMode.FULFILLS}));

        views.add(createViewNameWithModeObj(GIView.ORGANIZATIONAL_UNIT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.TEST_PROCEDURE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.GUIDANCE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_BUSINESS_ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.DIRECT_BUSINESS_ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForShieldElementType() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.SHIELD, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT_TYPE, new String[]{GIMode.CHILDREN_ELEMENTS, GIMode.PARENT_ELEMENT}));

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForStandardElementType() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.STANDARD, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.STANDARD_ELEMENT_TYPE, new String[]{GIMode.CHILDREN_ELEMENTS, GIMode.PARENT_ELEMENT}));

        views.add(createViewNameWithModeObj(GIView.STANDARD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForBusinessElementType() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.BUSINESS, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.BUSINESS_ELEMENT_TYPE, new String[]{GIMode.CHILDREN_ELEMENTS, GIMode.PARENT_ELEMENT}));

        views.add(createViewNameWithModeObj(GIView.BUSINESS_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForThreatElementType() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.THREAT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.THREAT_ELEMENT_TYPE, new String[]{GIMode.CHILDREN_ELEMENTS, GIMode.PARENT_ELEMENT}));

        views.add(createViewNameWithModeObj(GIView.THREAT_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT_GROUP, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForShield() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.SHIELD_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForStandard() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.SHIELD_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.STANDARD_ELEMENT_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.STANDARD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForBusiness() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.SHIELD_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.BUSINESS_ELEMENT_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.BUSINESS_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForThreat() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.SHIELD_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.THREAT_ELEMENT_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS}));

        views.add(createViewNameWithModeObj(GIView.THREAT_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS,
                GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS}));

        return views;
    }

    private List<ViewNameWithModes> getPossibleViewNavigationChoicesForShieldType() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(createViewNameWithModeObj(GIView.SHIELD, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    public ViewNameWithModes createViewNameWithModeObj(String viewName, String[] modes) {
        ViewNameWithModes obj = new ViewNameWithModes();
        obj.setViewName(viewName);
        obj.setSelectionModes(Arrays.asList(modes));
        return obj;
    }
}
