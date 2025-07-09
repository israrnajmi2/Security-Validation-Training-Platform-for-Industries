package com.ss.service.dataview;

import com.ss.common.ExecException;
import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.constants.ObjectTypeConstants;
import com.ss.constants.ShieldTypeConstants;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.shieldclassification.ShieldType;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.helper.ViewNameWithModes;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.shieldclassification.ShieldRepository;
import com.ss.service.generictraversal.NavigationChoicesHelperService;
import com.ss.utils.GetWithIdHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service("DataViewHelperUtil")
public class DataViewHelperUtil {
    @Autowired
    private NavigationChoicesHelperService navigationChoicesHelperService;

    @Autowired
    private ShieldRepository shieldRepository;

    @Autowired
    private GetWithIdHelper getWithIdHelper;


    public void updateObjectTypeAndNameBasedOnViewDescriptor(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getViewName()) {
            case GIView.THREAT:
            case GIView.STANDARD:
            case GIView.BUSINESS:
            case GIView.SHIELD:
                handleShieldViewNameCase(item, viewDescriptor);
                break;
            case GIView.SHIELD_TYPE:
                handleShieldTypeViewNameCase(item, viewDescriptor);
                break;
            case GIView.SHIELD_ELEMENT_TYPE:
                handleShieldElementTypeViewNameCase(item, viewDescriptor);
                break;
            case GIView.STANDARD_ELEMENT_TYPE:
                handleStandardElementTypeViewNameCase(item, viewDescriptor);
                break;
            case GIView.THREAT_ELEMENT_TYPE:
                handleThreatElementTypeViewNameCase(item, viewDescriptor);
                break;
            case GIView.BUSINESS_ELEMENT_TYPE:
                handleBusinessElementTypeViewNameCase(item, viewDescriptor);
                break;
            case GIView.SHIELD_ELEMENT:
                handleShieldElementViewNameCase(item, viewDescriptor);
                break;
            case GIView.STANDARD_ELEMENT:
                handleStandardElementViewNameCase(item, viewDescriptor);
                break;
            case GIView.THREAT_ELEMENT:
                handleThreatElementViewNameCase(item, viewDescriptor);
                break;
            case GIView.BUSINESS_ELEMENT:
                handleBusinessElementViewNameCase(item, viewDescriptor);
                break;
            case GIView.SCE:
                handleSceViewNameCase(item, viewDescriptor);
                break;
            case GIView.OBJECTIVE_PARAMETER:
                handleObjectiveParameterViewNameCase(item, viewDescriptor);
                break;
            case GIView.METHOD_PARAMETER:
                handleMethodParameterViewNameCase(item, viewDescriptor);
                break;
            case GIView.CONTENT_PARAMETER:
                handleContentParameterViewNameCase(item, viewDescriptor);
                break;
            case GIView.SUBJECT_PARAMETER:
                handleSubjectParameterViewNameCase(item, viewDescriptor);
                break;
            case GIView.ASSET_TYPE:
                handleAssetTypeViewNameCase(item, viewDescriptor);
                break;
            case GIView.ASSET:
                handleAssetViewNameCase(item, viewDescriptor);
                break;
            case GIView.TECHNICAL_SUPPORT_PEOPLE:
                handleTechnicalSupportPeopleViewNameCase(item, viewDescriptor);
                break;
            case GIView.PROVIDER:
                handleProviderViewNameCase(item, viewDescriptor);
                break;
            case GIView.TECHNICAL_SUPPORT_CONTACT_INFO:
                handleTechnicalSupportContactInfoViewNameCase(item, viewDescriptor);
                break;
            case GIView.ORGANIZATIONAL_UNIT:
                handleOrganizationalUnitViewNameCase(item, viewDescriptor);
                break;

            //groups
            case GIView.SHIELD_ELEMENT_GROUP:
                handleShieldElementGroupViewNameCase(item, viewDescriptor);
                break;
            case GIView.SCE_GROUP:
                handleSceGroupViewNameCase(item, viewDescriptor);
                break;
            case GIView.ASSET_GROUP:
                handleAssetGroupViewNameCase(item, viewDescriptor);
                break;
            case GIView.ASSET_TYPE_GROUP:
                handleAssetTypeGroupViewNameCase(item, viewDescriptor);
                break;
            case GIView.PROVIDER_GROUP:
                handleProviderGroupViewNameCase(item, viewDescriptor);
                break;
            case GIView.DIRECT_SHIELD_ELEMENT:
                handleDirectShieldElementViewNameCase(item, viewDescriptor);
                break;
            case GIView.DIRECT_ASSET:
                handleDirectAssetViewNameCase(item, viewDescriptor);
                break;
            case GIView.DIRECT_ASSET_TYPE:
                handleDirectAssetTypeViewNameCase(item, viewDescriptor);
                break;
            case GIView.SPHERIC_USER:
                handleSphericUserViewNameCase(item, viewDescriptor);
                break;
            case GIView.ROLES:
                handleRolesViewNameCase(item, viewDescriptor);
                break;
            case GIView.APPROVED_ROLES:
                handleApprovedRolesViewNameCase(item, viewDescriptor);
                break;
            case GIView.PENDING_APPROVAL_ROLES:
                handlePendingApprovalRolesViewNameCase(item, viewDescriptor);
                break;
            case GIView.TEST_PROCEDURE:
                handleTestProcedureViewNameCase(item, viewDescriptor);
                break;
            case GIView.GUIDANCE:
                handleGuidanceViewNameCase(item, viewDescriptor);
                break;
            case GIView.INGEST_SOURCE:
                handleIngestSourceViewNameCase(item, viewDescriptor);
                break;
            case GIView.BUSINESS_ASSET:
                handleBusinessAssetViewNameCase(item, viewDescriptor);
                break;
            case GIView.BUSINESS_ASSET_TYPE:
                handleBusinessAssetTypeViewNameCase(item, viewDescriptor);
                break;
            case GIView.BUSINESS_PROVIDER:
                handleBusinessProviderViewNameCase(item, viewDescriptor);
                break;
            case GIView.BUSINESS_ASSET_GROUP:
                handleBusinessAssetGroupViewNameCase(item, viewDescriptor);
                break;
            case GIView.BUSINESS_ASSET_TYPE_GROUP:
                handleBusinessAssetTypeGroupViewNameCase(item, viewDescriptor);
                break;
            case GIView.BUSINESS_PROVIDER_GROUP:
                handleBusinessProviderGroupViewNameCase(item, viewDescriptor);
                break;
            case GIView.DIRECT_BUSINESS_ASSET:
                handleDirectBusinessAssetViewNameCase(item, viewDescriptor);
                break;
            case GIView.DIRECT_BUSINESS_ASSET_TYPE:
                handleDirectBusinessAssetTypeViewNameCase(item, viewDescriptor);
                break;
            default:
                throw new ExecException("Unknown View name : " + viewDescriptor.getViewName());
        }

    }

    private void handleDirectBusinessAssetTypeViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("All Direct Linked Value Asset Types");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.DIRECT_BUSINESS_ASSET_TYPE);
        }
        item.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_TYPE_ROOT);
    }

    private void handleDirectBusinessAssetViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("All Direct Linked Value Assets");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.DIRECT_BUSINESS_ASSET);
        }
        item.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_ROOT);
    }

    private void handleBusinessProviderGroupViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Value Provider Groups");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.BUSINESS_PROVIDER_GROUP);
        }
        item.setObjectType(ObjectTypeConstants.BUSINESS_PROVIDER_GROUP_ROOT);
    }

    private void handleBusinessAssetTypeGroupViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Value Asset Type Groups");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.BUSINESS_ASSET_TYPE_GROUP);
        }
        item.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_TYPE_GROUP_ROOT);
    }

    private void handleBusinessAssetGroupViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Value Asset Groups");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.BUSINESS_ASSET_GROUP);
        }
        item.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_GROUP_ROOT);
    }

    private void handleBusinessProviderViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Value Provider (also referred to as Business Vendor)");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.BUSINESS_PROVIDER);
        }
        item.setObjectType(ObjectTypeConstants.BUSINESS_PROVIDER_ROOT);
    }

    private void handleBusinessAssetViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("All Linked Value Assets");
                break;
            case GIMode.SHALL_DELIVER:
                item.setName("Value Assets that deliver Expression");
                break;
            case GIMode.COULD_DELIVER:
                item.setName("Assets that could deliver Expression");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.BUSINESS_ASSET_TYPE);
        }
        item.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_ROOT);
    }

    private void handleBusinessAssetTypeViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Value Asset Type");
                break;
            case GIMode.CHILDREN_ELEMENTS:
                item.setName("Children Value Asset Types");
                break;
            case GIMode.PARENT_ELEMENT:
                item.setName("Parent Value Asset Type");
                break;
            case GIMode.SHALL_PROTECT:
                item.setName("Value Asset Type that are protected by Expression");
                break;
            case GIMode.COULD_PROTECT:
                item.setName("Asset Type that could be protected by Expression");
                break;
            /*case GIMode.PROTECT:
                item.setName("Asset Type protected by Expression");
                break;*/
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.BUSINESS_ASSET_TYPE);
        }
        item.setObjectType(ObjectTypeConstants.BUSINESS_ASSET_TYPE_ROOT);

    }

    private void handleTestProcedureViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Test Procedure");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.TEST_PROCEDURE);
        }
        item.setObjectType(ObjectTypeConstants.TEST_PROCEDURE_ROOT);
    }

    private void handleGuidanceViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Guidance");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.GUIDANCE);
        }
        item.setObjectType(ObjectTypeConstants.GUIDANCE_ROOT);
    }

    private void handleIngestSourceViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Source");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.INGEST_SOURCE);
        }
        item.setObjectType(ObjectTypeConstants.INGEST_SOURCE_ROOT);
    }

    private void handlePendingApprovalRolesViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Approval Pending Roles");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.PENDING_APPROVAL_ROLES);
        }
        item.setObjectType(ObjectTypeConstants.USER_ROLE_ROOT);
    }

    private void handleApprovedRolesViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Approved Roles");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.APPROVED_ROLES);
        }
        item.setObjectType(ObjectTypeConstants.USER_ROLE_ROOT);
    }

    private void handleRolesViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Roles");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.ROLES);
        }
        item.setObjectType(ObjectTypeConstants.USER_ROLE_ROOT);
    }

    private void handleSphericUserViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Users");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.SPHERIC_USER);
        }
        item.setObjectType(ObjectTypeConstants.USER_ROOT);
    }

    private void handleDirectAssetTypeViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("All Direct Linked Security Asset Types");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.DIRECT_ASSET_TYPE);
        }
        item.setObjectType(ObjectTypeConstants.ASSET_TYPE_ROOT);
    }

    private void handleDirectAssetViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("All Direct Linked Assets");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.DIRECT_ASSET);
        }
        item.setObjectType(ObjectTypeConstants.ASSET_ROOT);
    }

    private void handleDirectShieldElementViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("All Direct Linked");
                break;
            case GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID:
                Shield shield = shieldRepository.findOne(viewDescriptor.getShieldId());
                if (shield == null || shield.isArchived())
                    throw new ExecException("Shield with id " + viewDescriptor.getShieldId() + " not found");

                if (shield != null && !shield.isArchived()) {
                    ShieldType shieldType = shield.getShieldType();
                    if (shieldType != null && !shieldType.isArchived()) {
                        if (shieldType.getName().equals(ShieldTypeConstants.SHIELD))
                            item.setName("All Direct Linked " + shield.getName() + " Internal Policies");
                        else if (shieldType.getName().equals(ShieldTypeConstants.STANDARD))
                            item.setName("All Direct Linked " + shield.getName() + " External Policies");
                        else if (shieldType.getName().equals(ShieldTypeConstants.BUSINESS))
                            item.setName("All Direct Linked " + shield.getName() + " Value Processes");
                        else if (shieldType.getName().equals(ShieldTypeConstants.THREAT))
                            item.setName("All Direct Linked " + shield.getName() + " Threat Vectors");
                        else
                            throw new ExecException("Unknown shield type " + shieldType.getName());
                    } else {
                        throw new ExecException("ShieldType not found for shield with id " + shield.getId());
                    }
                } else
                    throw new ExecException("Shield not found for shield element with id " + item.getElementId());
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.DIRECT_SHIELD_ELEMENT);
        }
        item.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_ROOT);
    }

    private void handleProviderGroupViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Provider Groups");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.PROVIDER_GROUP);
        }
        item.setObjectType(ObjectTypeConstants.PROVIDER_GROUP_ROOT);
    }

    private void handleAssetTypeGroupViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Asset Type Groups");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.ASSET_TYPE_GROUP);
        }
        item.setObjectType(ObjectTypeConstants.ASSET_TYPE_GROUP_ROOT);
    }

    private void handleAssetGroupViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Asset Groups");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.ASSET_GROUP);
        }
        item.setObjectType(ObjectTypeConstants.ASSET_GROUP_ROOT);
    }

    private void handleSceGroupViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Expression Groups");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.SCE_GROUP);
        }
        item.setObjectType(ObjectTypeConstants.SCE_GROUP_ROOT);
    }

    private void handleShieldElementGroupViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Groups");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.SHIELD_ELEMENT_GROUP);
        }
        item.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_GROUP_ROOT);
    }

    private void handleOrganizationalUnitViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Organizational Unit");
                break;
            case GIMode.CHILDREN_ELEMENTS:
                item.setName("Children Organizational Unit");
                break;
            case GIMode.PARENT_ELEMENT:
                item.setName("Parent Organizational Unit");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.ORGANIZATIONAL_UNIT);
        }
        item.setObjectType(ObjectTypeConstants.ORGANIZATIONAL_UNIT_ROOT);

    }

    private void handleTechnicalSupportContactInfoViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Technical Support Contact");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.TECHNICAL_SUPPORT_CONTACT_INFO);
        }
        item.setObjectType(ObjectTypeConstants.TECHNICAL_SUPPORT_CONTACT_INFO_ROOT);
    }

    private void handleProviderViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Provider (also referred to as Vendor)");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.PROVIDER);
        }
        item.setObjectType(ObjectTypeConstants.PROVIDER_ROOT);
    }

    private void handleTechnicalSupportPeopleViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Technical Support People");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.TECHNICAL_SUPPORT_PEOPLE);
        }
        item.setObjectType(ObjectTypeConstants.TECHNICAL_SUPPORT_PEOPLE_ROOT);
    }

    private void handleAssetViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("All Linked Assets");
                break;
            case GIMode.SHALL_DELIVER:
                item.setName("Assets that shall deliver Expression");
                break;
            case GIMode.COULD_DELIVER:
                item.setName("Assets that could deliver Expression");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.ASSET_TYPE);
        }
        item.setObjectType(ObjectTypeConstants.ASSET_ROOT);
    }

    private void handleAssetTypeViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Security Asset Type");
                break;
            case GIMode.CHILDREN_ELEMENTS:
                item.setName("Children Security Asset Types");
                break;
            case GIMode.PARENT_ELEMENT:
                item.setName("Parent Security Asset Type");
                break;
            case GIMode.SHALL_PROTECT:
                item.setName("Security Asset Type that shall be protected by Expression");
                break;
            case GIMode.COULD_PROTECT:
                item.setName("Security Asset Type that could be protected by Expression");
                break;
            /*case GIMode.PROTECT:
                item.setName("Asset Type protected by Expression");
                break;*/
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.ASSET_TYPE);
        }
        item.setObjectType(ObjectTypeConstants.ASSET_TYPE_ROOT);
    }

    private void handleMethodParameterViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Security Content Parameter");
                break;
            case GIMode.CHILDREN_ELEMENTS:
                item.setName("Children Security Contents");
                break;
            case GIMode.PARENT_ELEMENT:
                item.setName("Parent Security Content");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.METHOD_PARAMETER);
        }
        item.setObjectType(ObjectTypeConstants.METHOD_PARAMETER_ROOT);
    }

    private void handleContentParameterViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Protected Content Parameter");
                break;
            case GIMode.CHILDREN_ELEMENTS:
                item.setName("Children Protected Content Parameters");
                break;
            case GIMode.PARENT_ELEMENT:
                item.setName("Parent Protected Content Parameter");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.CONTENT_PARAMETER);
        }
        item.setObjectType(ObjectTypeConstants.CONTENT_PARAMETER_ROOT);
    }

    private void handleSubjectParameterViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Protected Subject Parameter");
                break;
            case GIMode.CHILDREN_ELEMENTS:
                item.setName("Children Protected Subject Parameters");
                break;
            case GIMode.PARENT_ELEMENT:
                item.setName("Parent Protected Subject Parameter");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.SUBJECT_PARAMETER);
        }
        item.setObjectType(ObjectTypeConstants.SUBJECT_PARAMETER_ROOT);
    }

    private void handleObjectiveParameterViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Security Technique Parameter");
                break;
            case GIMode.CHILDREN_ELEMENTS:
                item.setName("Children Security Technique Parameters");
                break;
            case GIMode.PARENT_ELEMENT:
                item.setName("Parent Security Technique Parameter");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.OBJECTIVE_PARAMETER);
        }
        item.setObjectType(ObjectTypeConstants.OBJECTIVE_PARAMETER_ROOT);
    }

    private void handleSceViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("All Linked Expressions");
                break;
            case GIMode.SHALL_DELIVER:
                item.setName("Expressions that shall be delivered by Asset");
                break;
            case GIMode.COULD_DELIVER:
                item.setName("Expressions that could be  delivered by Asset");
                break;
            case GIMode.SHALL_PROTECT:
                item.setName("Expressions that shall protect Asset Type");
                break;
            case GIMode.COULD_PROTECT:
                item.setName("Expressions that could protect Asset Type");
                break;
            /*case GIMode.PROTECT:
                item.setName("Expressions that protect Asset Type");
                break;*/
            case GIMode.PARAMETER_PART_OF_SCE:
                item.setName("Expressions that has Parameter as part of it");
                break;
            case GIMode.FULFILLS:
                item.setName("Expressions that fulfill the Element");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.SCE);
        }
        item.setObjectType(ObjectTypeConstants.SCE_ROOT);
    }

    private void handleShieldElementViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {

        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("All Linked Internal Policies");
                break;
            case GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID:
                Shield shield = shieldRepository.findOne(viewDescriptor.getShieldId());
                if (shield == null || shield.isArchived())
                    throw new ExecException("Shield with id " + viewDescriptor.getShieldId() + " not found");
                item.setName("All Linked " + shield.getName() + "  Internal Policies");
                break;
            case GIMode.CHILDREN_ELEMENTS:
                item.setName("Children Internal Policies");
                break;
            case GIMode.PARENT_ELEMENT:
                item.setName("Parent Internal Policy");
                break;
            case GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS:
                item.setName("Level One Internal Policies");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.SHIELD_ELEMENT);
        }
        item.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_ROOT);
    }

    private void handleStandardElementViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {

        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("All Linked External Policies");
                break;
            case GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID:
                Shield shield = shieldRepository.findOne(viewDescriptor.getShieldId());
                if (shield == null || shield.isArchived())
                    throw new ExecException("Shield with id " + viewDescriptor.getShieldId() + " not found");
                item.setName("All Linked " + shield.getName() + "  External Policies");
                break;
            case GIMode.CHILDREN_ELEMENTS:
                item.setName("Children External Policies");
                break;
            case GIMode.PARENT_ELEMENT:
                item.setName("Parent External Policy");
                break;
            case GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS:
                item.setName("Level One External Policies");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.STANDARD_ELEMENT);
        }
        item.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_ROOT);
    }

    private void handleBusinessElementViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {

        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("All Linked Value Processes");
                break;
            case GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID:
                Shield shield = shieldRepository.findOne(viewDescriptor.getShieldId());
                if (shield == null || shield.isArchived())
                    throw new ExecException("Shield with id " + viewDescriptor.getShieldId() + " not found");
                item.setName("All Linked " + shield.getName() + "  Value Processes");
                break;
            case GIMode.CHILDREN_ELEMENTS:
                item.setName("Children Value Processes");
                break;
            case GIMode.PARENT_ELEMENT:
                item.setName("Parent Value Process");
                break;
            case GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS:
                item.setName("Level One Value Processes");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.BUSINESS_ELEMENT);
        }
        item.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_ROOT);
    }

    private void handleThreatElementViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {

        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("All Linked Threat Vectors");
                break;
            case GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID:
                Shield shield = shieldRepository.findOne(viewDescriptor.getShieldId());
                if (shield == null || shield.isArchived())
                    throw new ExecException("Shield with id " + viewDescriptor.getShieldId() + " not found");
                item.setName("All Linked " + shield.getName() + "  Threat Vectors");
                break;
            case GIMode.CHILDREN_ELEMENTS:
                item.setName("Children Threat Vectors");
                break;
            case GIMode.PARENT_ELEMENT:
                item.setName("Parent Threat Vector");
                break;
            case GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS:
                item.setName("Level One Threat Vectors");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.THREAT_ELEMENT);
        }
        item.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_ROOT);
    }

    private void handleShieldElementTypeViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Internal Policy Type");
                break;
            case GIMode.CHILDREN_ELEMENTS:
                item.setName("Child Internal Policy");
                break;
            case GIMode.PARENT_ELEMENT:
                item.setName("Parent Internal Policy");
                break;
            case GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS:
                item.setName("Level One Internal Policy");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.SHIELD_ELEMENT_TYPE);
        }
        item.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_TYPE_ROOT);
    }

    private void handleStandardElementTypeViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("External Policy Type");
                break;
            case GIMode.CHILDREN_ELEMENTS:
                item.setName("Child External Policy Type");
                break;
            case GIMode.PARENT_ELEMENT:
                item.setName("Parent External Policy Type");
                break;
            case GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS:
                item.setName("Level One External Policy Type");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.STANDARD_ELEMENT_TYPE);
        }
        item.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_TYPE_ROOT);
    }

    private void handleBusinessElementTypeViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Value Process Type");
                break;
            case GIMode.CHILDREN_ELEMENTS:
                item.setName("Child Value Process Type");
                break;
            case GIMode.PARENT_ELEMENT:
                item.setName("Parent Value Process Type");
                break;
            case GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS:
                item.setName("Level One Value Process Type");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.BUSINESS_ELEMENT_TYPE);
        }
        item.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_TYPE_ROOT);
    }

    private void handleThreatElementTypeViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Threat Vector Type");
                break;
            case GIMode.CHILDREN_ELEMENTS:
                item.setName("Child Threat Vector Type");
                break;
            case GIMode.PARENT_ELEMENT:
                item.setName("Parent Threat Vector Type");
                break;
            case GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS:
                item.setName("Level One Threat Vector Type");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.THREAT_ELEMENT_TYPE);
        }
        item.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_TYPE_ROOT);
    }

    private void handleShieldTypeViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                item.setName("Framework Type");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.SHIELD_TYPE);
        }
        item.setObjectType(ObjectTypeConstants.SHIELD_TYPE_ROOT);
    }

    private void handleShieldViewNameCase(GenericItem item, ViewDescriptor viewDescriptor) {
        switch (viewDescriptor.getSelectionMode()) {
            case GIMode.ALL_LINKED_ELEMENTS:
                if ((item.getObjectType().equals(ObjectTypeConstants.SHIELD_ELEMENT) || item.getObjectType().equals(ObjectTypeConstants.STANDARD_ELEMENT) || item.getObjectType().equals(ObjectTypeConstants.BUSINESS_CONTROL) || item.getObjectType().equals(ObjectTypeConstants.THREAT_ELEMENT)) && item.getElementId() != null) {
                    ShieldElement shieldElement = getWithIdHelper.getShieldElement(item.getElementId());
                    Shield shield = shieldElement.getShield();
                    if (shield != null && !shield.isArchived()) {
                        ShieldType shieldType = shield.getShieldType();
                        if (shieldType != null && !shieldType.isArchived()) {
                            if (shieldType.getName().equals(ShieldTypeConstants.SHIELD))
                                item.setName("Internal Framework Name");
                            else if (shieldType.getName().equals(ShieldTypeConstants.STANDARD))
                                item.setName("External Framework Name");
                            else if (shieldType.getName().equals(ShieldTypeConstants.BUSINESS))
                                item.setName("Business Framework Name");
                            else if (shieldType.getName().equals(ShieldTypeConstants.THREAT))
                                item.setName("Threat Framework Name");
                            else
                                throw new ExecException("Unknown shield type " + shieldType.getName());
                        } else {
                            throw new ExecException("ShieldType not found for shield with id " + shield.getId());
                        }
                    } else
                        throw new ExecException("Shield not found for shield element with id " + item.getElementId());

                } else
                    item.setName("Framework");
                break;
            default:
                throw new ExecException("Unknown selection mode " + viewDescriptor.getSelectionMode() + " for view name " + GIView.SHIELD);
        }
        item.setObjectType(ObjectTypeConstants.SHIELD_ROOT);
    }

    public List<ViewDescriptor> getDescriptorsForViewName(String viewName, List<ViewNameWithModes> excludeList, boolean isDirect) {

        Map<String, List<ViewNameWithModes>> map = navigationChoicesHelperService.getPossibleViewNavigationChoices();
        List<ViewNameWithModes> viewNameWithModesList = map.get(viewName);

        List<ViewDescriptor> response = new ArrayList<>();

        for (ViewNameWithModes viewNameWithMode : viewNameWithModesList) {
            if (isDirect && (viewNameWithMode.getViewName().equals(GIView.SCE) || viewNameWithMode.getViewName().equals(GIView.SCE_GROUP)))
                continue;
            if (viewNameWithMode.getSelectionModes() != null) {
                for (String selectionMode : viewNameWithMode.getSelectionModes()) {

                    if ((viewNameWithMode.getViewName().equals(GIView.SHIELD_ELEMENT) || viewNameWithMode.getViewName().equals(GIView.DIRECT_SHIELD_ELEMENT)) && selectionMode.equals(GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID)) {
                        List<Shield> shieldList = shieldRepository.findByIsArchivedFalse();
                        for (Shield shield : shieldList) {
                            ViewDescriptor vdc = convertToViewDescriptorShieldIdCase(viewNameWithMode.getViewName(), selectionMode, shield.getId(), shield.getName());
                            if (notInExcludeList(vdc, excludeList))
                                response.add(vdc);
                        }
                    } else {
                        ViewDescriptor vdc = convertToViewDescriptor(viewNameWithMode.getViewName(), selectionMode);
                        if (notInExcludeList(vdc, excludeList))
                            response.add(vdc);
                    }

                }
            }
        }
        return response;
    }

    private boolean notInExcludeList(ViewDescriptor vdc, List<ViewNameWithModes> excludeList) {

        if (excludeList != null && vdc != null && vdc.getViewName() != null) {
            for (ViewNameWithModes excludeItem : excludeList) {
                if (excludeItem.getViewName().equals(vdc.getViewName())) {
                    List<String> excludeSelectionModes = excludeItem.getSelectionModes();
                    if (excludeSelectionModes != null) {
                        for (String excludeSelectionMode : excludeSelectionModes) {
                            if (excludeSelectionMode.equals(vdc.getSelectionMode()))
                                return false;
                        }
                    }
                }
            }
        }

        return true;
    }

    private ViewDescriptor convertToViewDescriptorShieldIdCase(String viewName, String selectionMode, Integer shieldId, String shieldName) {
        ViewDescriptor vdc = new ViewDescriptor();
        vdc.setViewName(viewName);
        vdc.setSelectionMode(selectionMode);
        vdc.setShieldId(shieldId);
        vdc.setNextLevel(null);
        return vdc;
    }

    private ViewDescriptor convertToViewDescriptor(String viewName, String selectionMode) {
        ViewDescriptor vdc = new ViewDescriptor();
        vdc.setViewName(viewName);
        vdc.setSelectionMode(selectionMode);
        vdc.setNextLevel(null);
        vdc.setShieldId(null);
        return vdc;
    }
}
