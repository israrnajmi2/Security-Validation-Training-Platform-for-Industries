package com.ss.controller;

import com.ss.common.ExecException;
import com.ss.constants.*;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldType;
import com.ss.pojo.ViewDescriptorWithLabel;
import com.ss.pojo.helper.ViewNameWithModes;
import com.ss.pojo.restservice.GenericItem;
import com.ss.pojo.restservice.PivotRequest;
import com.ss.repository.shieldclassification.ShieldTypeRepository;
import com.ss.service.generictraversal.NavigationChoicesHelperService;
import com.ss.service.permissions.PermissionCheckerService;
import com.ss.service.pivot.PivotHelper;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Transactional
@RequestMapping(value = "/rest/pivot")
public class PivotController {

    @Autowired
    private ShieldTypeRepository shieldTypeRepository;

    @Autowired
    private NavigationChoicesHelperService navigationChoicesHelperService;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private PivotHelper pivotHelper;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    //get next subtree for a given element id and object type for given descriptor.
    @RequestMapping(value = "/get_pivot_subtree_dv", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getPivotSubTree(@RequestBody PivotRequest pivotRequest) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.PIVOT_VIEW))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (pivotRequest.getObjectType() == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Object Type in request is null", HttpStatus.BAD_REQUEST);

        if (pivotRequest.getElementId() == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id in request is null", HttpStatus.BAD_REQUEST);

        if (pivotRequest.getViewDescriptorWithLabel() == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id in request is null", HttpStatus.BAD_REQUEST);
        GenericItem response = pivotHelper.getSubtreeGenericItem(pivotRequest);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //get object type to next navigation options.
    @RequestMapping(value = "/get_object_type_to_navigation_choices_mapping/{isDirect}/{elementId}/{objectType}", method = RequestMethod.GET)
    public List<ViewDescriptorWithLabel> getObjectTypeToNavigationChoicesMapping(@PathVariable("isDirect") Boolean isDirect,@PathVariable("elementId") @NotNull Integer elementId, @PathVariable("objectType") @NotNull String objectType) {

        Map<String, List<ViewNameWithModes>> excludeList = getExcludeListForPivotView();

        List<ViewDescriptorWithLabel> viewDescriptors = new ArrayList<>();

        Map<String, List<ViewNameWithModes>> navigationChoices = navigationChoicesHelperService.getPossibleObjectTypeNavigationChoices();

        List<ViewNameWithModes> viewNameWithModesList = navigationChoices.get(objectType);
        if (objectType != null && viewNameWithModesList != null && !viewNameWithModesList.isEmpty()) {
            for (ViewNameWithModes viewNameWithModesItem : viewNameWithModesList) {
                String viewName = viewNameWithModesItem.getViewName();
                if (isDirect && (viewName.equals(GIView.SCE) || viewName.equals(GIView.SCE_GROUP))) {
                    continue;
                }
                if (viewNameWithModesItem.getSelectionModes() != null && !viewNameWithModesItem.getSelectionModes().isEmpty()) {
                    for (String mode : viewNameWithModesItem.getSelectionModes()) {
                        if (notInExcludeList(excludeList, objectType, viewName, mode)) {
                            if (mode.equals(GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID)) {
                                handleAllLinkedFilteredByShieldIdCase(viewDescriptors, viewName);

                            } else {
                                ViewDescriptorWithLabel viewDescriptor = new ViewDescriptorWithLabel(viewName, mode);
                                viewDescriptor.setLabel(getLabelForViewName(viewName, mode));
                                viewDescriptors.add(viewDescriptor);
                            }
                        }
                    }
                }
            }
        }

        List<ViewDescriptorWithLabel> newViewDescriptors = new ArrayList<>();
        // added by Manish to validate child
        Map<String, List<ViewDescriptorWithLabel>> mResponse = new HashMap<>();
        viewDescriptors.forEach(viewDescriptorWithLabel -> {
            PivotRequest pivotRequest=new PivotRequest();
            pivotRequest.setObjectType(objectType);
            pivotRequest.setElementId(elementId);
            pivotRequest.setViewDescriptorWithLabel(viewDescriptorWithLabel);
            GenericItem genericItem=null;
            try{
                genericItem = pivotHelper.getSubtreeGenericItem(pivotRequest);
            }catch (Exception e){}

            if(null!=genericItem && null!=genericItem.getChildren() && !genericItem.getChildren().isEmpty()) {
                newViewDescriptors.add(viewDescriptorWithLabel);
            }
        });
        ViewDescriptorWithLabel allVD = new ViewDescriptorWithLabel("all", isDirect ? "direct": "expression");
        allVD.setLabel("All");
        newViewDescriptors.add(0, allVD);
        return newViewDescriptors;
    }

    private Map<String, List<ViewNameWithModes>> getExcludeListForPivotView() {

        Map<String, List<ViewNameWithModes>> response = new HashMap<>();
        response.put(ObjectTypeConstants.SHIELD_ELEMENT, getExcludeListForShieldElement());
        response.put(ObjectTypeConstants.STANDARD_ELEMENT, getExcludeListForStandardElement());
        response.put(ObjectTypeConstants.BUSINESS_CONTROL, getExcludeListForBusinessElement());
        response.put(ObjectTypeConstants.THREAT_ELEMENT, getExcludeListForThreatElement());
        response.put(ObjectTypeConstants.ASSET, excludeDirectShieldElementAllLinked());
        response.put(ObjectTypeConstants.ASSET_TYPE, excludeDirectShieldElementAllLinked());
        response.put(ObjectTypeConstants.BUSINESS_ASSET, excludeDirectShieldElementAllLinked());
        response.put(ObjectTypeConstants.BUSINESS_ASSET_TYPE, excludeDirectShieldElementAllLinked());
        response.put(ObjectTypeConstants.SCE, getExcludeListForSce());
        return response;

    }

    private List<ViewNameWithModes> getExcludeListForSce() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    private List<ViewNameWithModes> excludeDirectShieldElementAllLinked() {
        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.DIRECT_SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }
    private List<ViewNameWithModes> getExcludeListForShieldElement() {

        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.DIRECT_SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        return views;
    }

    private List<ViewNameWithModes> getExcludeListForStandardElement() {

        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.STANDARD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.DIRECT_SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        return views;
    }

    private List<ViewNameWithModes> getExcludeListForBusinessElement() {

        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.BUSINESS_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.DIRECT_SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        return views;
    }

    private List<ViewNameWithModes> getExcludeListForThreatElement() {

        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.THREAT_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.DIRECT_SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        return views;
    }

    private boolean notInExcludeList(Map<String, List<ViewNameWithModes>> excludeList, String objectType, String viewName, String mode) {

        if (objectType != null) {
            List<ViewNameWithModes> viewNameWithModesList = excludeList.get(objectType);
            if (viewNameWithModesList != null) {
                for (ViewNameWithModes viewNameWithModes : viewNameWithModesList) {
                    if (viewNameWithModes != null) {
                        if (viewNameWithModes.getViewName() != null && viewName != null && viewNameWithModes.getViewName().equals(viewName)) {
                            List<String> selectionModes = viewNameWithModes.getSelectionModes();
                            if (selectionModes != null) {
                                for (String selectionMode : selectionModes) {
                                    if (selectionMode != null && mode != null && selectionMode.equals(mode))
                                        return false;
                                }
                            }
                        }
                    }
                }
            }
        }

        return true;
    }

    private void handleAllLinkedFilteredByShieldIdCase(List<ViewDescriptorWithLabel> viewDescriptors, String viewName) {
        //create a view descriptor for each shield & standard
        List<ShieldType> shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.SHIELD);
        if (shieldTypes == null || shieldTypes.isEmpty())
            throw new ExecException("Shield Type with Name \"Shield\"  not found ");
        ShieldType shieldType = null;
        for (ShieldType shieldType1 : shieldTypes) {
            if (shieldType1 != null && !shieldType1.isArchived()) {
                shieldType = shieldType1;
                break;
            }
        }
        if (shieldType == null)
            throw new ExecException("Shield Type with Name \"Shield\"  not found ");

        List<Shield> shields = shieldType.getShieldList();

        if (shields != null && !shields.isEmpty()) {
            for (Shield shield : shields) {
                if (shield != null && !shield.isArchived()) {
                    ViewDescriptorWithLabel viewDescriptor = new ViewDescriptorWithLabel();
                    viewDescriptor.setViewName(viewName);
                    viewDescriptor.setSelectionMode(GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID);
                    viewDescriptor.setShieldId(shield.getId());
                    if (viewName.equals(GIView.DIRECT_SHIELD_ELEMENT))
                        viewDescriptor.setLabel("Direct Linked " + shield.getName() + " Internal Policies");
                    else
                        viewDescriptor.setLabel("All Linked " + shield.getName() + " Internal Policies");
                    viewDescriptors.add(viewDescriptor);
                }
            }
        }

        //all standards
        List<ShieldType> standardTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.STANDARD);
        if (standardTypes == null || standardTypes.isEmpty())
            throw new ExecException("Shield Type with Name \"Shield\"  not found ");
        ShieldType standardType = null;
        for (ShieldType standardType1 : standardTypes) {
            if (standardType1 != null && !standardType1.isArchived()) {
                standardType = standardType1;
                break;
            }
        }
        if (standardType == null)
            throw new ExecException("Shield Type with Name \"Shield\"  not found ");

        List<Shield> standards = standardType.getShieldList();

        if (standards != null && !standards.isEmpty()) {
            for (Shield standard : standards) {
                if (standard != null && !standard.isArchived()) {
                    ViewDescriptorWithLabel viewDescriptor = new ViewDescriptorWithLabel();
                    viewDescriptor.setViewName(viewName);
                    viewDescriptor.setSelectionMode(GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID);
                    viewDescriptor.setShieldId(standard.getId());
                    if (viewName.equals(GIView.DIRECT_SHIELD_ELEMENT))
                        viewDescriptor.setLabel("Direct Linked " + standard.getName() + " External Policies");
                    else
                        viewDescriptor.setLabel("All Linked " + standard.getName() + " External Policies");
                    viewDescriptors.add(viewDescriptor);
                }
            }
        }

        //all business shields
        List<ShieldType> businessTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.BUSINESS);
        if (standardTypes == null || standardTypes.isEmpty())
            throw new ExecException("Shield Type with Name '"+ShieldTypeConstants.BUSINESS+"'  not found ");
        ShieldType businessType = null;
        for (ShieldType temp : businessTypes) {
            if (temp != null && !temp.isArchived()) {
                businessType = temp;
                break;
            }
        }
        if (businessType == null)
            throw new ExecException("Shield Type with Name "+ ShieldTypeConstants.BUSINESS +"  not found ");

        List<Shield> businessShields = businessType.getShieldList();

        if (businessShields != null && !businessShields.isEmpty()) {
            for (Shield businessShield : businessShields) {
                if (businessShield != null && !businessShield.isArchived()) {
                    ViewDescriptorWithLabel viewDescriptor = new ViewDescriptorWithLabel();
                    viewDescriptor.setViewName(viewName);
                    viewDescriptor.setSelectionMode(GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID);
                    viewDescriptor.setShieldId(businessShield.getId());
                    if (viewName.equals(GIView.DIRECT_SHIELD_ELEMENT))
                        viewDescriptor.setLabel("Direct Linked " + businessShield.getName() + " Value Processes");
                    else
                        viewDescriptor.setLabel("All Linked " + businessShield.getName() + " Value Processes");
                    viewDescriptors.add(viewDescriptor);
                }
            }
        }

        //all threat shields
        List<ShieldType> threatTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.THREAT);
        if (threatTypes == null || threatTypes.isEmpty())
            throw new ExecException("Shield Type with Name '"+ShieldTypeConstants.THREAT+"'  not found ");
        ShieldType threatType = null;
        for (ShieldType temp : threatTypes) {
            if (temp != null && !temp.isArchived()) {
                threatType = temp;
                break;
            }
        }
        if (threatType == null)
            throw new ExecException("Shield Type with Name "+ ShieldTypeConstants.THREAT +"  not found ");

        List<Shield> threatShields = threatType.getShieldList();

        if (threatShields != null && !threatShields.isEmpty()) {
            for (Shield threatShield : threatShields) {
                if (threatShield != null && !threatShield.isArchived()) {
                    ViewDescriptorWithLabel viewDescriptor = new ViewDescriptorWithLabel();
                    viewDescriptor.setViewName(viewName);
                    viewDescriptor.setSelectionMode(GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID);
                    viewDescriptor.setShieldId(threatShield.getId());
                    if (viewName.equals(GIView.DIRECT_SHIELD_ELEMENT))
                        viewDescriptor.setLabel("Direct Linked " + threatShield.getName() + " Threat Vectors");
                    else
                        viewDescriptor.setLabel("All Linked " + threatShield.getName() + " Threat Vectors");
                    viewDescriptors.add(viewDescriptor);
                }
            }
        }
    }

    private String getLabelForViewName(String viewName, String selectionMode) {
        switch (viewName) {
            case GIView.SHIELD:
                return PivotLabelConstants.SHIELD;
            case GIView.STANDARD:
                return PivotLabelConstants.STANDARD;
            case GIView.BUSINESS:
                return PivotLabelConstants.BUSINESS;
            case GIView.THREAT:
                return PivotLabelConstants.THREAT;
            case GIView.SHIELD_TYPE:
                return PivotLabelConstants.SHIELD_TYPE;
            case GIView.SHIELD_ELEMENT_TYPE:
                switch (selectionMode) {
                    case GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS:
                        return PivotLabelConstants.LEVEL_ONE_SHIELD_ELEMENT_TYPE;
                    case GIMode.ALL_LINKED_ELEMENTS:
                        return PivotLabelConstants.ALL_LINKED_SHIELD_ELEMNT_TYPE;
                    case GIMode.CHILDREN_ELEMENTS:
                        return PivotLabelConstants.CHILD_SHIELD_ELEMENT_TYPE;
                    case GIMode.PARENT_ELEMENT:
                        return PivotLabelConstants.PARENT_SHIELD_ELEMENT_TYPE;
                    default:
                        return PivotLabelConstants.SHIELD_ELEMENT_TYPE;
                }
            case GIView.STANDARD_ELEMENT_TYPE:
                switch (selectionMode) {
                    case GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS:
                        return PivotLabelConstants.LEVEL_ONE_STANDARD_ELEMENT_TYPE;
                    case GIMode.ALL_LINKED_ELEMENTS:
                        return PivotLabelConstants.ALL_LINKED_STANDARD_ELEMNT_TYPE;
                    case GIMode.CHILDREN_ELEMENTS:
                        return PivotLabelConstants.CHILD_STANDARD_ELEMENT_TYPE;
                    case GIMode.PARENT_ELEMENT:
                        return PivotLabelConstants.PARENT_STANDARD_ELEMENT_TYPE;
                    default:
                        return PivotLabelConstants.STANDARD_ELEMENT_TYPE;
                }
            case GIView.BUSINESS_ELEMENT_TYPE:
                switch (selectionMode) {
                    case GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS:
                        return PivotLabelConstants.LEVEL_ONE_BUSINESS_ELEMENT_TYPE;
                    case GIMode.ALL_LINKED_ELEMENTS:
                        return PivotLabelConstants.ALL_LINKED_BUSINESS_ELEMNT_TYPE;
                    case GIMode.CHILDREN_ELEMENTS:
                        return PivotLabelConstants.CHILD_BUSINESS_ELEMENT_TYPE;
                    case GIMode.PARENT_ELEMENT:
                        return PivotLabelConstants.PARENT_BUSINESS_ELEMENT_TYPE;
                    default:
                        return PivotLabelConstants.BUSINESS_ELEMENT_TYPE;
                }
            case GIView.THREAT_ELEMENT_TYPE:
                switch (selectionMode) {
                    case GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS:
                        return PivotLabelConstants.LEVEL_ONE_THREAT_ELEMENT_TYPE;
                    case GIMode.ALL_LINKED_ELEMENTS:
                        return PivotLabelConstants.ALL_LINKED_THREAT_ELEMNT_TYPE;
                    case GIMode.CHILDREN_ELEMENTS:
                        return PivotLabelConstants.CHILD_THREAT_ELEMENT_TYPE;
                    case GIMode.PARENT_ELEMENT:
                        return PivotLabelConstants.PARENT_THREAT_ELEMENT_TYPE;
                    default:
                        return PivotLabelConstants.THREAT_ELEMENT_TYPE;
                }
            case GIView.SHIELD_ELEMENT:
                switch (selectionMode) {
                    case GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS:
                        return PivotLabelConstants.LEVEL_ONE_SHIELD_ELEMENT;
                    case GIMode.ALL_LINKED_ELEMENTS:
                        return PivotLabelConstants.ALL_LINKED_SHIELD_ELEMNT;
                    case GIMode.PARENT_ELEMENT:
                        return PivotLabelConstants.PARENT_SHIELD_ELEMENT;
                    case GIMode.CHILDREN_ELEMENTS:
                        return PivotLabelConstants.CHILDREN_SHIELD_ELEMENT;
                    default:
                        return PivotLabelConstants.SHIELD_ELEMENT;
                }
            case GIView.STANDARD_ELEMENT:
                switch (selectionMode) {
                    case GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS:
                        return PivotLabelConstants.LEVEL_ONE_STANDARD_ELEMENT;
                    case GIMode.ALL_LINKED_ELEMENTS:
                        return PivotLabelConstants.ALL_LINKED_STANDARD_ELEMNT;
                    case GIMode.PARENT_ELEMENT:
                        return PivotLabelConstants.PARENT_STANDARD_ELEMENT;
                    case GIMode.CHILDREN_ELEMENTS:
                        return PivotLabelConstants.CHILDREN_STANDARD_ELEMENT;
                    default:
                        return PivotLabelConstants.STANDARD_ELEMENT;
                }
            case GIView.THREAT_ELEMENT:
                switch (selectionMode) {
                    case GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS:
                        return PivotLabelConstants.LEVEL_ONE_THREAT_ELEMENT;
                    case GIMode.ALL_LINKED_ELEMENTS:
                        return PivotLabelConstants.ALL_LINKED_THREAT_ELEMNT;
                    case GIMode.PARENT_ELEMENT:
                        return PivotLabelConstants.PARENT_THREAT_ELEMENT;
                    case GIMode.CHILDREN_ELEMENTS:
                        return PivotLabelConstants.CHILDREN_THREAT_ELEMENT;
                    default:
                        return PivotLabelConstants.THREAT_ELEMENT;
                }
            case GIView.BUSINESS_ELEMENT:
                switch (selectionMode) {
                    case GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS:
                        return PivotLabelConstants.LEVEL_ONE_BUSINESS_ELEMENT;
                    case GIMode.ALL_LINKED_ELEMENTS:
                        return PivotLabelConstants.ALL_LINKED_BUSINESS_ELEMNT;
                    case GIMode.PARENT_ELEMENT:
                        return PivotLabelConstants.PARENT_BUSINESS_ELEMENT;
                    case GIMode.CHILDREN_ELEMENTS:
                        return PivotLabelConstants.CHILDREN_BUSINESS_ELEMENT;
                    default:
                        return PivotLabelConstants.BUSINESS_ELEMENT;
                }
            case GIView.SCE:
                switch (selectionMode) {
                    case GIMode.COULD_PROTECT:
                        return PivotLabelConstants.COULD_BE_PROTECTED_BY_SCE;
                    case GIMode.SHALL_PROTECT:
                        return PivotLabelConstants.SHALL_BE_PROTECTED_BY_SCE;
                    case GIMode.COULD_DELIVER:
                        return PivotLabelConstants.SCE_THAT_COULD_BE_DELIVERED;
                    case GIMode.SHALL_DELIVER:
                        return PivotLabelConstants.SCE_THAT_SHALL_BE_DELIVERED;
                    case GIMode.FULFILLS:
                        return PivotLabelConstants.SCE_THAT_FULFILL;
                    case GIMode.PARAMETER_PART_OF_SCE:
                        return PivotLabelConstants.SCE_THAT_HAVE_PARAMETER_WORD;
                    default:
                        return PivotLabelConstants.SCE;
                }
            case GIView.OBJECTIVE_PARAMETER:
                switch (selectionMode) {
                    case GIMode.CHILDREN_ELEMENTS:
                        return PivotLabelConstants.CHILDREN_OBJECTIVE_PARAMETER;
                    case GIMode.PARENT_ELEMENT:
                        return PivotLabelConstants.PARENT_OBJECTIVE_PARAMETER;
                    default:
                        return PivotLabelConstants.OBJECTIVE_PARAMETER;
                }
            case GIView.METHOD_PARAMETER:
                switch (selectionMode) {
                    case GIMode.CHILDREN_ELEMENTS:
                        return PivotLabelConstants.CHILDREN_METHOD_PARAMETER;
                    case GIMode.PARENT_ELEMENT:
                        return PivotLabelConstants.PARENT_METHOD_PARAMETER;
                    default:
                        return PivotLabelConstants.METHOD_PARAMETER;
                }
            case GIView.CONTENT_PARAMETER:
                switch (selectionMode) {
                    case GIMode.CHILDREN_ELEMENTS:
                        return PivotLabelConstants.CHILDREN_CONTENT_PARAMETER;
                    case GIMode.PARENT_ELEMENT:
                        return PivotLabelConstants.PARENT_CONTENT_PARAMETER;
                    default:
                        return PivotLabelConstants.CONTENT_PARAMETER;
                }
            case GIView.SUBJECT_PARAMETER:
                switch (selectionMode) {
                    case GIMode.CHILDREN_ELEMENTS:
                        return PivotLabelConstants.CHILDREN_SUBJECT_PARAMETER;
                    case GIMode.PARENT_ELEMENT:
                        return PivotLabelConstants.PARENT_SUBJECT_PARAMETER;
                    default:
                        return PivotLabelConstants.SUBJECT_PARAMETER;
                }
            case GIView.ASSET_TYPE:
                switch (selectionMode) {
                    case GIMode.COULD_PROTECT:
                        return PivotLabelConstants.ASSET_TYPE_COULD_BE_PROTECTED;
                    case GIMode.SHALL_PROTECT:
                        return PivotLabelConstants.ASSET_TYPE_SHALL_BE_PROTECTED;
                    case GIMode.CHILDREN_ELEMENTS:
                        return PivotLabelConstants.CHILDREN_ASSET_TYPE;
                    case GIMode.PARENT_ELEMENT:
                        return PivotLabelConstants.PARENT_ASSET_TYPE;
                    default:
                        return PivotLabelConstants.ASSET_TYPE;
                }
            case GIView.BUSINESS_ASSET_TYPE:
                switch (selectionMode) {
                    case GIMode.COULD_PROTECT:
                        return PivotLabelConstants.EXPRESSION_TO_BUSINESS_ASSET_TYPE_COULD_LINK;
                    case GIMode.SHALL_PROTECT:
                        return PivotLabelConstants.EXPRESSION_TO_BUSINESS_ASSET_TYPE_LINK;
                    case GIMode.CHILDREN_ELEMENTS:
                        return PivotLabelConstants.CHILDREN_BUSINESS_ASSET_TYPE;
                    case GIMode.PARENT_ELEMENT:
                        return PivotLabelConstants.PARENT_BUSINESS_ASSET_TYPE;
                    default:
                        return PivotLabelConstants.BUSINESS_ASSET_TYPE;
                }
            case GIView.ASSET:
                switch (selectionMode) {
                    case GIMode.COULD_DELIVER:
                        return PivotLabelConstants.ASSET_THAT_COULD_DELIVER;
                    case GIMode.SHALL_DELIVER:
                        return PivotLabelConstants.ASSET_THAT_SHALL_DELIVER;
                    default:
                        return PivotLabelConstants.ASSET;
                }
            case GIView.BUSINESS_ASSET:
                switch (selectionMode) {
                    case GIMode.COULD_DELIVER:
                        return PivotLabelConstants.EXPRESSION_TO_BUSINESS_ASSET_COULD_LINK;
                    case GIMode.SHALL_DELIVER:
                        return PivotLabelConstants.EXPRESSION_TO_BUSINESS_ASSET_LINK;
                    default:
                        return PivotLabelConstants.BUSINESS_ASSET;
                }
            case GIView.TECHNICAL_SUPPORT_PEOPLE:
                return PivotLabelConstants.TECHNICAL_SUPPORT_PEOPLE;
            case GIView.PROVIDER:
                return PivotLabelConstants.PROVIDER;
            case GIView.BUSINESS_PROVIDER:
                return PivotLabelConstants.BUSINESS_PROVIDER;
            case GIView.TECHNICAL_SUPPORT_CONTACT_INFO:
                return PivotLabelConstants.TECHNICAL_SUPPORT_CONTACT_INFO;
            case GIView.ORGANIZATIONAL_UNIT:
                switch (selectionMode) {
                    case GIMode.CHILDREN_ELEMENTS:
                        return PivotLabelConstants.CHILDREN_ORGANIZATIONAL_UNIT;
                    case GIMode.PARENT_ELEMENT:
                        return PivotLabelConstants.PARENT_ORGANIZATIONAL_UNIT;
                    default:
                        return PivotLabelConstants.ORGANIZATIONAL_UNIT;
                }
            case GIView.SHIELD_ELEMENT_GROUP:
                return PivotLabelConstants.SHIELD_ELEMENT_GROUP;
            case GIView.SCE_GROUP:
                return PivotLabelConstants.SCE_GROUP;
            case GIView.ASSET_GROUP:
                return PivotLabelConstants.ASSET_GROUP;
            case GIView.BUSINESS_ASSET_GROUP:
                return PivotLabelConstants.BUSINESS_ASSET_GROUP;
            case GIView.ASSET_TYPE_GROUP:
                return PivotLabelConstants.ASSET_TYPE_GROUP;
            case GIView.BUSINESS_ASSET_TYPE_GROUP:
                return PivotLabelConstants.BUSINESS_ASSET_TYPE_GROUP;
            case GIView.PROVIDER_GROUP:
                return PivotLabelConstants.PROVIDER_GROUP;
            case GIView.BUSINESS_PROVIDER_GROUP:
                return PivotLabelConstants.BUSINESS_PROVIDER_GROUP;
            case GIView.DIRECT_ASSET:
                return PivotLabelConstants.DIRECT_ASSET;
            case GIView.DIRECT_BUSINESS_ASSET:
                return PivotLabelConstants.DIRECT_BUSINESS_ASSET;
            case GIView.DIRECT_ASSET_TYPE:
                return PivotLabelConstants.DIRECT_ASSET_TYPE;
            case GIView.DIRECT_BUSINESS_ASSET_TYPE:
                return PivotLabelConstants.DIRECT_BUSINESS_ASSET_TYPE;
            case GIView.DIRECT_SHIELD_ELEMENT:
                return PivotLabelConstants.DIRECT_SHIELD_ELEMENT;
            case GIView.SPHERIC_USER:
                return PivotLabelConstants.SPHERIC_USER;
            case GIView.ROLES:
                return PivotLabelConstants.ROLES;
            case GIView.APPROVED_ROLES:
                return PivotLabelConstants.APPROVED_ROLES;
            case GIView.PENDING_APPROVAL_ROLES:
                return PivotLabelConstants.APPROVAL_PENDING_ROLES;
            case GIView.TEST_PROCEDURE:
                return PivotLabelConstants.TEST_PROCEDURE;
            case GIView.INGEST_SOURCE:
                return PivotLabelConstants.INGEST_SOURCE;
            case GIView.GUIDANCE:
                return PivotLabelConstants.GUIDANCE;
            default:
                throw new ExecException("getLabelForViewName : unknown viewName " + viewName);
        }
    }
}
