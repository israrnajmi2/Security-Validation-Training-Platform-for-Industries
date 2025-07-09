package com.ss.controller;


import com.ss.common.ExecException;
import com.ss.constants.*;
import com.ss.domain.asset.*;
import com.ss.domain.groups.AssetTypeGroup;
import com.ss.domain.sce.SecurityControlExpression;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.shieldclassification.ShieldType;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.*;
import com.ss.pojo.restservice.sce.AssetTypeToShieldElementAssociationsSaveRequest;
import com.ss.pojo.restservice.sce.ExpressionProtectedByMappingSaveRequest;
import com.ss.repository.asset.AssetRepository;
import com.ss.repository.asset.AssetTypeProtectedBySceRepository;
import com.ss.repository.asset.AssetTypeRepository;
import com.ss.repository.asset.AssetTypeToShieldElementMapRepository;
import com.ss.repository.groups.AssetTypeGroupRepository;
import com.ss.repository.sce.SecurityControlExpressionRepository;
import com.ss.repository.shieldclassification.ShieldElementRepository;
import com.ss.repository.shieldclassification.ShieldRepository;
import com.ss.repository.shieldclassification.ShieldTypeRepository;
import com.ss.repository.usermanagement.OrganizationalUnitRepository;
import com.ss.service.fullhierarchytraversal.helper.AssetTypeFullHelper;
import com.ss.service.fullhierarchytraversal.helper.ShieldFullHelper;
import com.ss.service.permissions.PermissionCheckerService;
import com.ss.utils.DuplicateCheckingService;
import com.ss.utils.GenericItemPOJOBuilder;
import com.ss.utils.GenericItemSubtreeHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.*;

@RestController
@Transactional
@RequestMapping(value = "/rest/assettype")
public class AssetTypeController {

    @Autowired
    private AssetTypeFullHelper assetTypeFullHelper;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private AssetTypeRepository assetTypeRepository;

    @Autowired
    private AssetTypeGroupRepository assetTypeGroupRepository;

    @Autowired
    private OrganizationalUnitRepository organizationalUnitRepository;

    @Autowired
    private SecurityControlExpressionRepository securityControlExpressionRepository;

    @Autowired
    private AssetTypeProtectedBySceRepository assetTypeProtectedBySceRepository;

    @Autowired
    private GenericItemSubtreeHelper genericItemSubtreeHelper;

    @Autowired
    private ShieldTypeRepository shieldTypeRepository;

    @Autowired
    private DuplicateCheckingService duplicateCheckingService;

    @Autowired
    private ShieldRepository shieldRepository;

    @Autowired
    private ShieldElementRepository shieldElementRepository;

    @Autowired
    private ShieldFullHelper shieldFullHelper;

    @Autowired
    private AssetTypeToShieldElementMapRepository assetTypeToShieldElementMapRepository;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    @Autowired
    private AssetRepository assetRepository;

    @RequestMapping(value = "/get_asset_type_dv", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getAssetTypeDv(@RequestBody AssetTypeDvRequest request) {
        if (request.isShowAsset() && request.isShowExpression()) {
            ViewDescriptor viewDescriptor = null;
            ViewDescriptor extraDescriptor1 = new ViewDescriptor(GIView.ASSET, GIMode.ALL_LINKED_ELEMENTS);
            if (request.getProtectionType() != null) {

                switch (request.getProtectionType()) {
                    case ProtectionType.COULD:
                        viewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.COULD_PROTECT);
                        return assetTypeFullHelper.getAssetTypeFullWithDescriptor(request.getAssetTypeGroupId(), viewDescriptor, extraDescriptor1, request.getLevel());
                    case ProtectionType.SHALL:
                        viewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.SHALL_PROTECT);
                        return assetTypeFullHelper.getAssetTypeFullWithDescriptor(request.getAssetTypeGroupId(), viewDescriptor, extraDescriptor1, request.getLevel());
                    case ProtectionType.COULD_AND_SHALL:
                        viewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.ALL_LINKED_ELEMENTS);
                        return assetTypeFullHelper.getAssetTypeFullWithDescriptor(request.getAssetTypeGroupId(), viewDescriptor, extraDescriptor1, request.getLevel());
                    default:
                        return genericItemPOJOBuilder.buildGIErrorResponse("Unknown protection type " + request.getProtectionType() + "; only supported protection types are " + ProtectionType.COULD + ", " + ProtectionType.SHALL + ", " + ProtectionType.COULD_AND_SHALL, HttpStatus.BAD_REQUEST);

                }
            } else {
                return genericItemPOJOBuilder.buildGIErrorResponse("Protection type is null in the request; only supported protection types are " + ProtectionType.COULD + ", " + ProtectionType.SHALL + ", " + ProtectionType.COULD_AND_SHALL, HttpStatus.BAD_REQUEST);
            }

        } else if (request.isShowExpression()) {
            ViewDescriptor viewDescriptor = null;
            if (request.getProtectionType() != null) {

                switch (request.getProtectionType()) {
                    case ProtectionType.COULD:
                        viewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.COULD_PROTECT);
                        return assetTypeFullHelper.getAssetTypeFullWithDescriptor(request.getAssetTypeGroupId(), viewDescriptor, null, request.getLevel());
                    case ProtectionType.SHALL:
                        viewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.SHALL_PROTECT);
                        return assetTypeFullHelper.getAssetTypeFullWithDescriptor(request.getAssetTypeGroupId(), viewDescriptor, null, request.getLevel());
                    case ProtectionType.COULD_AND_SHALL:
                        viewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.ALL_LINKED_ELEMENTS);
                        return assetTypeFullHelper.getAssetTypeFullWithDescriptor(request.getAssetTypeGroupId(), viewDescriptor, null, request.getLevel());
                    default:
                        return genericItemPOJOBuilder.buildGIErrorResponse("Unknown protection type " + request.getProtectionType() + "; only supported protection types are " + ProtectionType.COULD + ", " + ProtectionType.SHALL + ", " + ProtectionType.COULD_AND_SHALL, HttpStatus.BAD_REQUEST);

                }
            } else {
                return genericItemPOJOBuilder.buildGIErrorResponse("Protection type is null in the request; only supported protection types are " + ProtectionType.COULD + ", " + ProtectionType.SHALL + ", " + ProtectionType.COULD_AND_SHALL, HttpStatus.BAD_REQUEST);
            }
        } else if (request.isShowAsset()) {
            ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.ASSET, GIMode.ALL_LINKED_ELEMENTS);
            return assetTypeFullHelper.getAssetTypeFullWithDescriptor(request.getAssetTypeGroupId(), viewDescriptor, null, request.getLevel());
        } else {
            return assetTypeFullHelper.getAssetTypeFullWithDescriptor(request.getAssetTypeGroupId(), null, null, request.getLevel());
        }
    }

    @RequestMapping(value = "/get_asset_type_analyze_mode_dv_subtree", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getAssetTypeMapToOtherStartingPointSubtree(@RequestBody AssetTypeMapSubtreeRequestInfo subtreeRequestInfo) {
        AssetTypeMapRequestInfo assetTypeMapRequestInfo = new AssetTypeMapRequestInfo();

        assetTypeMapRequestInfo.setDropDownOneGroupId(subtreeRequestInfo.getDropDownOneGroupId());
        assetTypeMapRequestInfo.setDropDownOneLevelOfInterest(subtreeRequestInfo.getDropDownOneLevelOfInterest());
        assetTypeMapRequestInfo.setDropDownOneProtectionType(subtreeRequestInfo.getDropDownOneProtectionType());
        assetTypeMapRequestInfo.setDropDownTwoProtectionType(subtreeRequestInfo.getDropDownTwoProtectionType());
        assetTypeMapRequestInfo.setDropDownTwoShieldId(subtreeRequestInfo.getDropDownTwoShieldId());
        assetTypeMapRequestInfo.setDropDownTwoStartingPoint(subtreeRequestInfo.getDropDownTwoStartingPoint());

        ResponseEntity<GenericItem> response = getAssetTypeMapToOtherStartingPoint(assetTypeMapRequestInfo);

        GenericItem genericItem = response.getBody();
        GenericItem requiredGenericItem = genericItemSubtreeHelper.findObject(genericItem, subtreeRequestInfo.getObjectType(), subtreeRequestInfo.getElementId());
        if (requiredGenericItem == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Parent item with id " + subtreeRequestInfo.getElementId() + " and object type " + subtreeRequestInfo.getObjectType() + " not found - may have been unmapped or deleted", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(requiredGenericItem, HttpStatus.OK);
    }


    @RequestMapping(value = "/get_asset_type_analyze_mode_dv", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getAssetTypeMapToOtherStartingPoint(@RequestBody AssetTypeMapRequestInfo assetTypeMapRequestInfo) {

        ViewDescriptor viewDescriptor = null;
        ViewDescriptor extraDescriptor = null;
        //all linked , shall , could, protect.

        if (!assetTypeMapRequestInfo.isDirect()) {
            if (assetTypeMapRequestInfo.getDropDownOneProtectionType() == null || assetTypeMapRequestInfo.getDropDownOneProtectionType().equals(ProtectionType.COULD_AND_SHALL)) {

                extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.ALL_LINKED_ELEMENTS);

            } else {
                switch (assetTypeMapRequestInfo.getDropDownOneProtectionType()) {
                    case ProtectionType.COULD:
                        extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.COULD_PROTECT);
                        break;
                    case ProtectionType.SHALL:
                        extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.SHALL_PROTECT);
                        break;
                    default: {
                        return genericItemPOJOBuilder.buildGIErrorResponse("Unknown protection type : " + assetTypeMapRequestInfo.getDropDownOneProtectionType(), HttpStatus.BAD_REQUEST);
                    }
                }
            }
        }

        switch (assetTypeMapRequestInfo.getDropDownTwoStartingPoint()) {

            case ObjectTypeConstants.ASSET_ROOT:
                if (assetTypeMapRequestInfo.isDirect()) {
                    viewDescriptor = new ViewDescriptor(GIView.ASSET, GIMode.ALL_LINKED_ELEMENTS);
                } else {
                    if (assetTypeMapRequestInfo.getDropDownTwoProtectionType() == null || assetTypeMapRequestInfo.getDropDownTwoProtectionType().equals(ProtectionType.COULD_AND_SHALL)) {
                        extraDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET, GIMode.ALL_LINKED_ELEMENTS));

                    } else {
                        switch (assetTypeMapRequestInfo.getDropDownTwoProtectionType()) {
                            case ProtectionType.COULD:
                                extraDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET, GIMode.COULD_DELIVER));
                                break;
                            case ProtectionType.SHALL:
                                extraDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET, GIMode.SHALL_DELIVER));
                                break;
                            default: {
                                return genericItemPOJOBuilder.buildGIErrorResponse("Unknown protection type : " + assetTypeMapRequestInfo.getDropDownTwoProtectionType(), HttpStatus.BAD_REQUEST);
                            }
                        }
                    }
                }
                break;
            case ObjectTypeConstants.SHIELD_ROOT:
                if (assetTypeMapRequestInfo.getDropDownTwoShieldId() == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("drop down two shield id is null", HttpStatus.BAD_REQUEST);
                if (assetTypeMapRequestInfo.isDirect()) {
                    viewDescriptor = new ViewDescriptor(GIView.DIRECT_SHIELD_ELEMENT, GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID);
                    viewDescriptor.setShieldId(assetTypeMapRequestInfo.getDropDownTwoShieldId());
                } else {
                    if (assetTypeMapRequestInfo.isShowDirectLinksInExpressionMode()) {
                        viewDescriptor = new ViewDescriptor(GIView.DIRECT_SHIELD_ELEMENT, GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID);
                        viewDescriptor.setShieldId(assetTypeMapRequestInfo.getDropDownTwoShieldId());
                    }

                    ViewDescriptor shieldElementDescriptor = new ViewDescriptor(GIView.SHIELD_ELEMENT, GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID);
                    shieldElementDescriptor.setShieldId(assetTypeMapRequestInfo.getDropDownTwoShieldId());
                    extraDescriptor.setNextLevel(shieldElementDescriptor);
                }
                break;
            default:
                return genericItemPOJOBuilder.buildGIErrorResponse("Unsupported. Cannot map Shield to   " + assetTypeMapRequestInfo.getDropDownTwoStartingPoint(), HttpStatus.BAD_REQUEST);
        }

        return assetTypeFullHelper.getAssetTypeFullWithDescriptor(assetTypeMapRequestInfo.getDropDownOneGroupId(), viewDescriptor, extraDescriptor, assetTypeMapRequestInfo.getDropDownOneLevelOfInterest());

    }

    private List<StartingPointOption> primaryLinksOnlyOptions() {
        List<StartingPointOption> response = new ArrayList<>();
        //all shields
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
                    StartingPointOption shieldOption = new StartingPointOption();
                    shieldOption.setStartingPoint(ObjectTypeConstants.SHIELD_ROOT);
                    shieldOption.setObjectTypeForIcon(ObjectTypeConstants.SHIELD);
                    shieldOption.setShieldId(shield.getId());
                    shieldOption.setLabel(shield.getName());
                    shieldOption.setLinkTypeAttr(ObjectTypeConstants.ASSET_TYPE_TO_SHIELD_ELEMENT_LINK);
                    shieldOption.setLinkNameAttr(LinkName.SECURITY_ASSET_TYPE_TO_SHIELD_ELEMENT);
                    response.add(shieldOption);
                }
            }
        }
        return response;
    }

    //get dropdown 2 starting point options.
    @RequestMapping(value = "/get_dropdown_three_options_for_asset_type_starting_point/{isDirect}", method = RequestMethod.GET)
    public List<StartingPointOption> getDropdownTwoOptionsForAssetTypeStartingPoint(@PathVariable("isDirect") Boolean isDirect) {

        if (isDirect == null)
            throw new ExecException("Please pass isDirect parameter in request");

        boolean primaryLinksOnly = false;
        if (permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.SHOW_PRIMARY_LINKS_ONLY))
            primaryLinksOnly = true;

        if(isDirect && primaryLinksOnly) {
            return primaryLinksOnlyOptions();
        }

        List<StartingPointOption> response = new ArrayList<>();

        if (isDirect) {
            /*StartingPointOption assetShallStartingPointOption = new StartingPointOption();
            assetShallStartingPointOption.setLabel("Asset");
            assetShallStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_ROOT);
            assetShallStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.ASSET);
            //assetShallStartingPointOption.setProtectionType(ProtectionType.SHALL);
            response.add(assetShallStartingPointOption);*/
        } else {
            //asset shall
            /*StartingPointOption assetShallStartingPointOption = new StartingPointOption();
            assetShallStartingPointOption.setLabel("Shall be Delivered by Asset");
            assetShallStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_ROOT);
            assetShallStartingPointOption.setProtectionType(ProtectionType.SHALL);
            assetShallStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.ASSET);
            response.add(assetShallStartingPointOption);

            // asset could
            StartingPointOption assetStartingPointOption = new StartingPointOption();
            assetStartingPointOption.setLabel("Could be Delivered by Asset");
            assetStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_ROOT);
            assetStartingPointOption.setProtectionType(ProtectionType.COULD);
            assetStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.ASSET);
            response.add(assetStartingPointOption);

            //asset could shall
            StartingPointOption assetCouldShallStartingPointOption = new StartingPointOption();
            assetCouldShallStartingPointOption.setLabel("Could or Shall be Delivered by Asset");
            assetCouldShallStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_ROOT);
            assetCouldShallStartingPointOption.setProtectionType(ProtectionType.COULD_AND_SHALL);
            assetCouldShallStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.ASSET);
            response.add(assetCouldShallStartingPointOption);*/
        }

        //all shields
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
                    StartingPointOption shieldOption = new StartingPointOption();
                    shieldOption.setStartingPoint(ObjectTypeConstants.SHIELD_ROOT);
                    shieldOption.setObjectTypeForIcon(ObjectTypeConstants.SHIELD);
                    shieldOption.setShieldId(shield.getId());
                    //if (isDirect)
                    shieldOption.setLabel(shield.getName());
                    if (isDirect) {
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.ASSET_TYPE_TO_SHIELD_ELEMENT_LINK);
                        shieldOption.setLinkNameAttr(LinkName.SECURITY_ASSET_TYPE_TO_SHIELD_ELEMENT);
                    } else {
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK);
                        shieldOption.setLinkNameAttr(LinkName.EXPRESSION_TO_ELEMENT);
                    }
                    //else
                    //    shieldOption.setLabel("Fulfill " + shield.getName());
                    response.add(shieldOption);
                }
            }
        }

        //all standards
        List<ShieldType> standardTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.STANDARD);
        if (standardTypes == null || standardTypes.isEmpty())
            throw new ExecException("Shield Type with Name \"Standard\"  not found ");
        ShieldType standardType = null;
        for (ShieldType standardType1 : standardTypes) {
            if (standardType1 != null && !standardType1.isArchived()) {
                standardType = standardType1;
                break;
            }
        }
        if (standardType == null)
            throw new ExecException("Shield Type with Name \"Standard\"  not found ");

        List<Shield> standards = standardType.getShieldList();

        if (standards != null && !standards.isEmpty()) {
            for (Shield standard : standards) {
                if (standard != null && !standard.isArchived()) {
                    StartingPointOption shieldOption = new StartingPointOption();
                    shieldOption.setStartingPoint(ObjectTypeConstants.SHIELD_ROOT);
                    shieldOption.setObjectTypeForIcon(ObjectTypeConstants.STANDARD);
                    shieldOption.setShieldId(standard.getId());
                    //if (isDirect)
                    shieldOption.setLabel(standard.getName());
                    if (isDirect) {
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.ASSET_TYPE_TO_SHIELD_ELEMENT_LINK);
                        shieldOption.setLinkNameAttr(LinkName.SECURITY_ASSET_TYPE_TO_STANDARD_ELEMENT);
                    } else {
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK);
                        shieldOption.setLinkNameAttr(LinkName.EXPRESSION_TO_ELEMENT);
                    }
                    //else
                    //    shieldOption.setLabel("Fulfill " + standard.getName());
                    response.add(shieldOption);
                }
            }
        }

        //all business frameworks
        List<ShieldType> businessFrameworkTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.BUSINESS);
        if (businessFrameworkTypes == null || businessFrameworkTypes.isEmpty())
            throw new ExecException("Shield Type with Name \"" + ShieldTypeConstants.BUSINESS + "\"  not found ");
        ShieldType bFrameworkType = null;
        for (ShieldType temp : businessFrameworkTypes) {
            if (temp != null && !temp.isArchived()) {
                bFrameworkType = temp;
                break;
            }
        }
        if (bFrameworkType == null)
            throw new ExecException("Shield Type with Name \"" + ShieldTypeConstants.BUSINESS + "\"  not found ");

        List<Shield> bFrameworks = bFrameworkType.getShieldList();

        if (bFrameworks != null && !bFrameworks.isEmpty()) {
            for (Shield bFramework : bFrameworks) {
                if (bFramework != null && !bFramework.isArchived()) {
                    StartingPointOption shieldOption = new StartingPointOption();
                    shieldOption.setStartingPoint(ObjectTypeConstants.SHIELD_ROOT);
                    shieldOption.setObjectTypeForIcon(ObjectTypeConstants.BUSINESS_FRAMEWORK);
                    shieldOption.setShieldId(bFramework.getId());
                    //if (isDirect)
                    shieldOption.setLabel(bFramework.getName());
                    if (isDirect) {
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.ASSET_TYPE_TO_SHIELD_ELEMENT_LINK);
                        shieldOption.setLinkNameAttr(LinkName.SECURITY_ASSET_TYPE_TO_BUSINESS_ELEMENT);
                    } else {
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK);
                        shieldOption.setLinkNameAttr(LinkName.EXPRESSION_TO_ELEMENT);
                    }
                    //else
                    //    shieldOption.setLabel("Fulfill " + standard.getName());
                    response.add(shieldOption);
                }
            }
        }

        //all threat frameworks
        List<ShieldType> threatFrameworkTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.THREAT);
        if (threatFrameworkTypes == null || threatFrameworkTypes.isEmpty())
            throw new ExecException("Shield Type with Name \"" + ShieldTypeConstants.THREAT + "\"  not found ");
        ShieldType threatFrameworkType = null;
        for (ShieldType temp : threatFrameworkTypes) {
            if (temp != null && !temp.isArchived()) {
                threatFrameworkType = temp;
                break;
            }
        }
        if (threatFrameworkType == null)
            throw new ExecException("Shield Type with Name \"" + ShieldTypeConstants.THREAT + "\"  not found ");

        List<Shield> threatFrameworks = threatFrameworkType.getShieldList();

        if (threatFrameworks != null && !threatFrameworks.isEmpty()) {
            for (Shield threatFramework : threatFrameworks) {
                if (threatFramework != null && !threatFramework.isArchived()) {
                    StartingPointOption shieldOption = new StartingPointOption();
                    shieldOption.setStartingPoint(ObjectTypeConstants.SHIELD_ROOT);
                    shieldOption.setObjectTypeForIcon(ObjectTypeConstants.THREAT_FRAMEWORK);
                    shieldOption.setShieldId(threatFramework.getId());
                    //if (isDirect)
                    shieldOption.setLabel(threatFramework.getName());
                    if (isDirect) {
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.ASSET_TYPE_TO_SHIELD_ELEMENT_LINK);
                        shieldOption.setLinkNameAttr(LinkName.SECURITY_ASSET_TYPE_TO_THREAT_ELEMENT);
                    } else {
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK);
                        shieldOption.setLinkNameAttr(LinkName.EXPRESSION_TO_ELEMENT);
                    }
                    //else
                    //    shieldOption.setLabel("Fulfill " + standard.getName());
                    response.add(shieldOption);
                }
            }
        }

        return response;
    }

    @RequestMapping(value = "/get_allowed_levels_for_asset_type", method = RequestMethod.GET)
    public List<LevelWithLabel> getAllowedLevels() {
        List<LevelWithLabel> response = new ArrayList<>();

        Integer maxLevel = assetTypeRepository.getMaxLevel();

        if (maxLevel != null) {
            for (int i = 1; i <= maxLevel; i++) {
                LevelWithLabel levelWithLabel = new LevelWithLabel();
                levelWithLabel.setLevel(i);
                levelWithLabel.setLabel("");
                response.add(levelWithLabel);
            }
        }

        return response;
    }

    @RequestMapping(value = "/get_asset_type_groups_given_max_level/{level}", method = RequestMethod.GET)
    public ResponseEntity<List<GenericItem>> getAssetTypeGroupsByMaxLevel(@PathVariable("level") Integer level) {
        if (level == 0)
            level = assetTypeRepository.getMaxLevel();

        List<GenericItem> response = new ArrayList<>();
        if (level != null) {
            for (int i = 1; i <= level; i++) {
                List<AssetTypeGroup> assetTypeGroups = assetTypeGroupRepository.findByLevelAndIsArchivedFalse(i);

                for (AssetTypeGroup assetTypeGroup : assetTypeGroups) {
                    if (assetTypeGroup != null && !assetTypeGroup.isArchived())
                        response.add(genericItemPOJOBuilder.buildGenericPOJO(assetTypeGroup));
                }
            }
        }

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_asset_type", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createAssetType(@RequestBody CreateAssetTypeRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.ASSET_TYPE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        AssetType assetType = new AssetType();

        assetType.setName(request.getName().trim());
        /*List<AssetType> assetTypesWithSameName = assetTypeRepository.findByNameAndIsArchivedFalse(request.getName().trim());

        if (assetTypesWithSameName != null && !assetTypesWithSameName.isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type With Name " + request.getName() + " already exist", HttpStatus.CONFLICT);*/

        assetType.setDescription(request.getDescription());


        AssetType parentAssetType = null;
        if (request.getParentAssetTypeId() != null && !request.getParentAssetTypeId().equals(0)) {
            parentAssetType = assetTypeRepository.findOne(request.getParentAssetTypeId());
            if (parentAssetType == null || parentAssetType.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Parent Asset Type with id " + request.getParentAssetTypeId() + " not found", HttpStatus.BAD_REQUEST);
        }
        assetType.setParentAssetType(parentAssetType);

        if (duplicateCheckingService.isDuplicateAssetType(assetType)) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type With Name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }

        OrganizationalUnit organizationalUnit = null;
        if (request.getOrganizationalUnitId() != null && !request.getOrganizationalUnitId().equals(0)) {
            organizationalUnit = organizationalUnitRepository.findOne(request.getOrganizationalUnitId());
            if (organizationalUnit == null || organizationalUnit.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with id " + request.getOrganizationalUnitId() + " not found", HttpStatus.BAD_REQUEST);
        }

        assetType.setArchived(false);
        assetType.setCanDeliver(request.isCanDeliverExpression());
        assetType.setDefault(false);
        assetType.setDescription(assetType.getDescription());
        assetType.setName(request.getName());
        assetType.setOrganizationalUnit(organizationalUnit);
        if (parentAssetType != null)
            assetType.setLevel(parentAssetType.getLevel() + 1);
        else
            assetType.setLevel(1);

        assetType = assetTypeRepository.save(assetType);

        if (assetType == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(assetType);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/edit_asset_type", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editAssetType(@RequestBody EditAssetTypeRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.ASSET_TYPE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        AssetType assetType = assetTypeRepository.findOne(request.getElementId());
        if (assetType == null || assetType.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        /*List<AssetType> assetTypesWithSameName = assetTypeRepository.findByNameAndIsArchivedFalse(request.getName().trim());

        if (assetTypesWithSameName != null && !assetTypesWithSameName.isEmpty()) {
            if (!assetTypesWithSameName.get(0).getId().equals(request.getElementId()))
                return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }*/
        assetType.setName(request.getName().trim());
        assetType.setDescription(request.getDescription());

        if (duplicateCheckingService.isDuplicateAssetType(assetType)) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }

        if (request.getOrganizationalUnitId() != null && !request.getOrganizationalUnitId().equals(0)) {
            OrganizationalUnit obj = organizationalUnitRepository.findOne(request.getOrganizationalUnitId());
            if (obj == null && obj.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with id " + request.getOrganizationalUnitId() + " not found", HttpStatus.NOT_FOUND);
            assetType.setOrganizationalUnit(obj);
        } else
            assetType.setOrganizationalUnit(null);

        assetType.setCanDeliver(request.isCanDeliver());

        assetType = assetTypeRepository.save(assetType);

        if (assetType == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(assetType);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    //get asset type info
    @RequestMapping(value = "/get_asset_type_info/{assetTypeId}", method = RequestMethod.GET)
    public AssetTypeInfo getAssetTypeInfo(@PathVariable("assetTypeId") Integer assetTypeId) {

        AssetType assetType = assetTypeRepository.findOne(assetTypeId);
        if (assetType == null || assetType.isArchived())
            throw new ExecException("Asset Type with id " + assetTypeId + " not found");

        AssetTypeInfo response = new AssetTypeInfo();
        response.setDescription(assetType.getDescription());
        response.setName(assetType.getName());
        response.setElementId(assetType.getId());

        OrganizationalUnit organizationalUnit = assetType.getOrganizationalUnit();
        if (organizationalUnit == null) {
            response.setOrganizationalUnitId(0);
            response.setOrganizationalUnitName(null);
        } else {
            response.setOrganizationalUnitId(organizationalUnit.getId());
            response.setOrganizationalUnitName(organizationalUnit.getName());
        }

        response.setCanDeliver(assetType.isCanDeliver());
        AssetType parentAssetType = assetType.getParentAssetType();
        if (parentAssetType != null) {
            response.setParentAssetTypeId(parentAssetType.getId());
            response.setParentAssetTypeName(parentAssetType.getName());
        } else {
            response.setParentAssetTypeName(null);
            response.setParentAssetTypeId(0);
        }

        return response;
    }

    // get protected by association for asset type
    @RequestMapping(value = "/get_protected_by_associations_for_asset_type/{assetTypeId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getProtectedByAssociationsForAssetType(@PathVariable("assetTypeId") Integer assetTypeId) {

        GenericItem response = new GenericItem();
        AssetType assetType = assetTypeRepository.findOne(assetTypeId);
        if (assetType == null || assetType.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type with id " + assetTypeId + " not found", HttpStatus.NOT_FOUND);
        }
        List<AssetTypeProtectedBySce> assetTypeProtectedBySceList = assetType.getAssetTypeProtectedBySceList();
        Set<Integer> mappedCouldExpressions = new HashSet<>();
        Set<Integer> mappedShallExpressions = new HashSet<>();

        if (assetTypeProtectedBySceList != null) {
            for (AssetTypeProtectedBySce mapEntry : assetTypeProtectedBySceList) {
                if (mapEntry != null && !mapEntry.isArchived()) {
                    SecurityControlExpression sce = mapEntry.getSce();
                    if (sce != null && !sce.isArchived()) {
                        if (mapEntry.getShallCouldIs().equals(ProtectionType.COULD))
                            mappedCouldExpressions.add(sce.getId());
                        else if (mapEntry.getShallCouldIs().equals(ProtectionType.SHALL))
                            mappedShallExpressions.add(sce.getId());
                        else
                            throw new ExecException("Unknown protection type found in DB: " + mapEntry.getShallCouldIs());
                    }
                }
            }
        }

        List<SecurityControlExpression> sceList = securityControlExpressionRepository.findByIsArchivedFalse();

        List<GenericItem> childrenItems = new ArrayList<>();
        for (SecurityControlExpression sce : sceList) {
            GenericItem sceGenericItem = genericItemPOJOBuilder.buildGenericPOJO(sce);
            if (mappedCouldExpressions.contains(sceGenericItem.getElementId())) {
                sceGenericItem.setProtectionType(ProtectionType.COULD);
            } else if (mappedShallExpressions.contains(sceGenericItem.getElementId())) {
                sceGenericItem.setProtectionType(ProtectionType.SHALL);
            }
            childrenItems.add(sceGenericItem);
        }
        response.setElementId(0);
        response.setObjectType(ObjectTypeConstants.SCE_ROOT);
        //Collections.sort(childrenItems, new GenericItemAlphabetComparator());
        response.setChildren(childrenItems);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/save_expression_protected_by_associations_to_asset_type", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveExpressionFulfillsAssociationsToAssetType(@RequestBody ExpressionProtectedByMappingSaveRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_ASSET_TYPE_PROTECTED_BY_EXPRESSION_ASSOCIATION))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        AssetType assetType = assetTypeRepository.findOne(request.getElementId());
        if (assetType == null && assetType.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);
        }
        List<AssetTypeProtectedBySce> assetTypeProtectedBySceList = assetType.getAssetTypeProtectedBySceList();

        Set<Integer> newMappings = new HashSet<>();
        newMappings.addAll(new HashSet(request.getAssociatedCouldExpressions()));
        newMappings.addAll(new HashSet(request.getAssociatedShallExpressions()));

        Map<Integer, AssetTypeProtectedBySce> expressionIdToAlreadyAssociatedProtectedByRecordMap = polulateMapOfExpressionIdToProtectedByRecord(assetTypeProtectedBySceList);

        for (Integer expressionId : request.getAssociatedCouldExpressions()) {
            if (expressionIdToAlreadyAssociatedProtectedByRecordMap.get(expressionId) != null) {
                AssetTypeProtectedBySce mapRecord = expressionIdToAlreadyAssociatedProtectedByRecordMap.get(expressionId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    mapRecord.setShallCouldIs(ProtectionType.COULD);
                    AssetTypeProtectedBySce returnValue = assetTypeProtectedBySceRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeProtectedBySce Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                } else {
                    if (!mapRecord.getShallCouldIs().equals(ProtectionType.COULD)) {
                        mapRecord.setShallCouldIs(ProtectionType.COULD);
                        AssetTypeProtectedBySce returnValue = assetTypeProtectedBySceRepository.save(mapRecord);
                        if (returnValue == null)
                            return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeProtectedBySce Failed", HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }
                expressionIdToAlreadyAssociatedProtectedByRecordMap.remove(expressionId);
            } else {
                AssetTypeProtectedBySce newAssetTypeCouldBeProtectedByEntry = new AssetTypeProtectedBySce();
                newAssetTypeCouldBeProtectedByEntry.setArchived(false);
                SecurityControlExpression expression = securityControlExpressionRepository.findOne(expressionId);
                if (expression == null || expression.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Expression with id " + expressionId + " not found", HttpStatus.NOT_FOUND);
                newAssetTypeCouldBeProtectedByEntry.setSce(expression);
                newAssetTypeCouldBeProtectedByEntry.setAssetType(assetType);
                newAssetTypeCouldBeProtectedByEntry.setShallCouldIs(ProtectionType.COULD);
                AssetTypeProtectedBySce returnValue = assetTypeProtectedBySceRepository.save(newAssetTypeCouldBeProtectedByEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeProtectedBySce Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        for (Integer expressionId : request.getAssociatedShallExpressions()) {
            if (expressionIdToAlreadyAssociatedProtectedByRecordMap.get(expressionId) != null) {
                AssetTypeProtectedBySce mapRecord = expressionIdToAlreadyAssociatedProtectedByRecordMap.get(expressionId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    mapRecord.setShallCouldIs(ProtectionType.SHALL);
                    AssetTypeProtectedBySce returnValue = assetTypeProtectedBySceRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeProtectedBySce Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                } else {
                    if (!mapRecord.getShallCouldIs().equals(ProtectionType.SHALL)) {
                        mapRecord.setShallCouldIs(ProtectionType.SHALL);
                        AssetTypeProtectedBySce returnValue = assetTypeProtectedBySceRepository.save(mapRecord);
                        if (returnValue == null)
                            return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeProtectedBySce Failed", HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }
                expressionIdToAlreadyAssociatedProtectedByRecordMap.remove(expressionId);
            } else {
                AssetTypeProtectedBySce newAssetTypeShallBeProtectedByEntry = new AssetTypeProtectedBySce();
                newAssetTypeShallBeProtectedByEntry.setArchived(false);
                SecurityControlExpression expression = securityControlExpressionRepository.findOne(expressionId);
                if (expression == null || expression.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Expression with id " + expressionId + " not found", HttpStatus.NOT_FOUND);
                newAssetTypeShallBeProtectedByEntry.setSce(expression);
                newAssetTypeShallBeProtectedByEntry.setAssetType(assetType);
                newAssetTypeShallBeProtectedByEntry.setShallCouldIs(ProtectionType.SHALL);
                AssetTypeProtectedBySce returnValue = assetTypeProtectedBySceRepository.save(newAssetTypeShallBeProtectedByEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeProtectedBySce Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


        for (Map.Entry<Integer, AssetTypeProtectedBySce> entry : expressionIdToAlreadyAssociatedProtectedByRecordMap.entrySet()) {
            AssetTypeProtectedBySce assetTypeProtectedBySce = entry.getValue();
            if (!assetTypeProtectedBySce.isArchived()) {
                assetTypeProtectedBySce.setArchived(true);
                AssetTypeProtectedBySce returnValue = assetTypeProtectedBySceRepository.save(assetTypeProtectedBySce);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeProtectedBySce Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    private Map<Integer, AssetTypeProtectedBySce> polulateMapOfExpressionIdToProtectedByRecord(List<AssetTypeProtectedBySce> assetTypeProtectedBySceList) {
        Map<Integer, AssetTypeProtectedBySce> map = new HashMap<>();
        for (AssetTypeProtectedBySce assetTypeProtectedBySce : assetTypeProtectedBySceList) {
            SecurityControlExpression sce = assetTypeProtectedBySce.getSce();
            if (sce != null && !sce.isArchived()) {
                if (map.get(sce.getId()) != null) {
                    if (!assetTypeProtectedBySce.isArchived()) {
                        map.put(sce.getId(), assetTypeProtectedBySce);
                    }
                } else {
                    map.put(sce.getId(), assetTypeProtectedBySce);
                }
            }
        }
        return map;
    }

    @RequestMapping(value = "/get_asset_type_subtree_dv", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getAssetTypeSubtreeDv(@RequestBody AssetTypeSubtreeDvRequest request) {

        AssetTypeDvRequest assetTypeDvRequest = new AssetTypeDvRequest();
        assetTypeDvRequest.setAssetTypeGroupId(request.getAssetTypeGroupId());
        assetTypeDvRequest.setLevel(request.getLevel());
        assetTypeDvRequest.setProtectionType(request.getProtectionType());
        assetTypeDvRequest.setShowAsset(request.isShowAsset());
        assetTypeDvRequest.setShowExpression(request.isShowExpression());
        ResponseEntity<GenericItem> response = getAssetTypeDv(assetTypeDvRequest);

        GenericItem genericItem = response.getBody();
        GenericItem requiredGenericItem = genericItemSubtreeHelper.findObject(genericItem, request.getObjectType(), request.getElementId());
        if (requiredGenericItem == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Parent item with id " + request.getElementId() + " and object type " + request.getObjectType() + " not found - may have been unmapped or deleted", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(requiredGenericItem, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_direct_shield_element_associations_for_asset_type/{assetTypeId}/{shieldId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getDirectShieldElementAssociationsForAssetType(@PathVariable("assetTypeId") Integer assetTypeId, @PathVariable("shieldId") Integer shieldId) {

        Shield shield = shieldRepository.findOne(shieldId);
        if (shield == null || shield.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield with id " + shieldId + " not found", HttpStatus.NOT_FOUND);

        GenericItem response = new GenericItem();
        AssetType assetType = assetTypeRepository.findOne(assetTypeId);
        if (assetType == null || assetType.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("AssetType with id " + assetTypeId + " not found", HttpStatus.NOT_FOUND);
        }
        //List<AssetTypeToShieldElementMap> assetTypeToShieldElementMapList = assetType.getAssetTypeToShieldElementMapList();
        List<AssetTypeToShieldElementMap> assetTypeToShieldElementMapList = assetTypeToShieldElementMapRepository.findByAssetTypeIdAndShieldElementShieldId(assetTypeId, shieldId);
        Set<Integer> mappedShieldElements = new HashSet<>();

        if (assetTypeToShieldElementMapList != null) {
            for (AssetTypeToShieldElementMap mapEntry : assetTypeToShieldElementMapList) {
                if (mapEntry != null && !mapEntry.isArchived()) {
                    ShieldElement shieldElementTwo = mapEntry.getShieldElement();
                    if (shieldElementTwo != null && !shieldElementTwo.isArchived())
                        mappedShieldElements.add(shieldElementTwo.getId());
                }
            }
        }

        ResponseEntity<GenericItem> shieldDvResponseEntity = shieldFullHelper.getShieldFullWithDescriptor(shieldId, 0, null, null, 0);

        //update each genericItem with setFulfilledTrue/false
        updateSetAssociationMappedForShieldElement(shieldDvResponseEntity.getBody(), mappedShieldElements);

        return shieldDvResponseEntity;
    }

    private void updateSetAssociationMappedForShieldElement(GenericItem genericItem, Set<Integer> mappedShieldElements) {
        if (genericItem != null) {
            if ((genericItem.getObjectType().equals(ObjectTypeConstants.SHIELD_ELEMENT) || genericItem.getObjectType().equals(ObjectTypeConstants.STANDARD_ELEMENT) || genericItem.getObjectType().equals(ObjectTypeConstants.BUSINESS_CONTROL) || genericItem.getObjectType().equals(ObjectTypeConstants.THREAT_ELEMENT)) && mappedShieldElements.contains(genericItem.getElementId()))
                genericItem.setAssociationMapped(true);
        }
        if (genericItem.getChildren() != null) {
            for (GenericItem child : genericItem.getChildren()) {
                updateSetAssociationMappedForShieldElement(child, mappedShieldElements);
            }
        }
    }

    @RequestMapping(value = "/save_direct_shield_element_associations_for_asset_type", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveDirectShieldElementAssociationsForAssetType(@RequestBody AssetTypeToShieldElementAssociationsSaveRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_DIRECT_ASSET_TYPE_SECURED_BY_ELEMENT_ASSOCIATION))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        AssetType assetTypeInFocus = assetTypeRepository.findOne(request.getAssetTypeId());
        if (assetTypeInFocus == null && assetTypeInFocus.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type with id " + request.getAssetTypeId() + " not found", HttpStatus.NOT_FOUND);
        }

        if (request.getShieldId() == null || request.getShieldId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("shieldId cannot be null or 0; it is a mandatory field", HttpStatus.BAD_REQUEST);

        Shield shield = shieldRepository.findOne(request.getShieldId());
        if (shield == null || shield.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("shield with id " + request.getShieldId() + " not found", HttpStatus.NOT_FOUND);

        //List<AssetTypeToShieldElementMap> assetTypeToShieldElementMapList = assetTypeInFocus.getAssetTypeToShieldElementMapList();
        List<AssetTypeToShieldElementMap> assetTypeToShieldElementMapList = assetTypeToShieldElementMapRepository.findByAssetTypeIdAndShieldElementShieldId(assetTypeInFocus.getId(), shield.getId());
        List<Integer> newMappings = new ArrayList<>();
        newMappings.addAll(request.getAssociatedElements());

        Map<Integer, AssetTypeToShieldElementMap> elementIdToDirectShieldElementRecordMap = polulateMapOfElementIdToAssetTypeShieldElementDirectMap(assetTypeToShieldElementMapList);

        for (Integer elementId : request.getAssociatedElements()) {
            if (elementIdToDirectShieldElementRecordMap.get(elementId) != null) {
                AssetTypeToShieldElementMap mapRecord = elementIdToDirectShieldElementRecordMap.get(elementId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    AssetTypeToShieldElementMap returnValue = assetTypeToShieldElementMapRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeToShieldElementMap Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                }
                elementIdToDirectShieldElementRecordMap.remove(elementId);
            } else {
                AssetTypeToShieldElementMap assetToShieldElementMap = new AssetTypeToShieldElementMap();
                assetToShieldElementMap.setArchived(false);
                assetToShieldElementMap.setDefault(false);
                ShieldElement shieldElement = shieldElementRepository.findOne(elementId);
                if (shieldElement == null || shieldElement.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Element with id " + elementId + " not found", HttpStatus.NOT_FOUND);
                assetToShieldElementMap.setAssetType(assetTypeInFocus);
                assetToShieldElementMap.setShieldElement(shieldElement);
                AssetTypeToShieldElementMap returnValue = assetTypeToShieldElementMapRepository.save(assetToShieldElementMap);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeToShieldElementMap Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        for (Map.Entry<Integer, AssetTypeToShieldElementMap> entry : elementIdToDirectShieldElementRecordMap.entrySet()) {
            AssetTypeToShieldElementMap assetToShieldElementMap = entry.getValue();
            if (!assetToShieldElementMap.isArchived()) {
                assetToShieldElementMap.setArchived(true);
                AssetTypeToShieldElementMap returnValue = assetTypeToShieldElementMapRepository.save(assetToShieldElementMap);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeToShieldElementMap Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    private Map<Integer, AssetTypeToShieldElementMap> polulateMapOfElementIdToAssetTypeShieldElementDirectMap(List<AssetTypeToShieldElementMap> assetTypeToShieldElementMapList) {
        Map<Integer, AssetTypeToShieldElementMap> map = new HashMap<>();
        for (AssetTypeToShieldElementMap assetTypeToShieldElementMap : assetTypeToShieldElementMapList) {
            ShieldElement shieldElement = assetTypeToShieldElementMap.getShieldElement();
            if (shieldElement != null && !shieldElement.isArchived()) {
                if (map.get(shieldElement.getId()) != null) {
                    if (!assetTypeToShieldElementMap.isArchived()) {
                        map.put(shieldElement.getId(), assetTypeToShieldElementMap);
                    }

                } else {
                    map.put(shieldElement.getId(), assetTypeToShieldElementMap);
                }
            }
        }
        return map;
    }

    //TODO ::  added by Manish for Drag and Drop
    @RequestMapping(value = "/save_asset_type_drag_and_drop", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveAssetTypeDragAndDrop(@RequestBody @NotNull GenericItem genericItem) {
        try {
            assetTypeRepository.fixSortOrderNullValues();
            genericItemPOJOBuilder.keepOnlyGivenObjectTypeInChildren(genericItem, ObjectTypeConstants.ASSET_TYPE);
            saveAssetTypeDragAndDropImpl(genericItem, null);
        } catch (IndexOutOfBoundsException e) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Please update the level of selected framework", HttpStatus.OK);
        } catch (Exception ex) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Save to database Failed", HttpStatus.OK);
        }
        GenericItem response = new GenericItem();
        response.setDescription("ok");
        return ResponseEntity.ok(response);
    }

    private void saveAssetTypeDragAndDropImpl(GenericItem genericItem, AssetType parentAssetType) {
        List<GenericItem> children = genericItem.getChildren();
        if(children != null && children.size() != 0) {
            int childrenSize = children.size();
            for (int i = 0; i < childrenSize; i++) {
                GenericItem item = children.get(i);
                AssetType assetType = assetTypeRepository.findOne(item.getElementId());
                if(assetType == null)
                    throw new ExecException("Asset Type not found");
                if(item.getDragged()) {
                    assetTypeRepository.flush();
                    Integer order = assetType.getSortOrder();
                    if(childrenSize != 1) {
                        if(i == 0) {
                            GenericItem nextItem = children.get(i+1);
                            AssetType nextAssetType = assetTypeRepository.findOne(nextItem.getElementId());
                            int nextSortOrder = nextAssetType.getSortOrder();
                            int currentSortOrder = assetType.getSortOrder();
                            if(currentSortOrder < nextSortOrder) {
                                assetTypeRepository.decrementSortOrderGtLt(currentSortOrder, nextSortOrder);
                                order = nextSortOrder-1;
                            } else if(currentSortOrder > nextSortOrder) {
                                assetTypeRepository.incrementSortOrderGtLt(nextSortOrder-1, currentSortOrder);
                                order = nextSortOrder;
                            }
                        } else {
                            GenericItem prevItem = children.get(i-1);
                            AssetType prevAssetType = assetTypeRepository.findOne(prevItem.getElementId());
                            int prevSortOrder = prevAssetType.getSortOrder();
                            int currentSortOrder = assetType.getSortOrder();
                            if(currentSortOrder < prevSortOrder) {
                                assetTypeRepository.decrementSortOrderGtLt(currentSortOrder, prevSortOrder+1);
                                order = prevSortOrder;
                            } else if(currentSortOrder > prevSortOrder) {
                                assetTypeRepository.incrementSortOrderGtLt(prevSortOrder, currentSortOrder);
                                order = prevSortOrder + 1;
                            }
                        }
                    }
                    assetType.setSortOrder(order);
                    assetType.setLevel(parentAssetType != null ? parentAssetType.getLevel() + 1 : 1);
                    assetType.setParentAssetType(parentAssetType);
                    assetType.setModifiedDateTime(new Date());
                    assetType = assetTypeRepository.save(assetType);
                }
                if(item.getChildren() != null && item.getChildren().size() != 0)
                    saveAssetTypeDragAndDropImpl(item, assetType);
            }
        }
    }


    @RequestMapping(value = "/save_asset_type_analyze_mode_drag_and_drop", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveAssetTypeAnalyzeModeDragAndDrop(@RequestBody @NotNull GenericItem genericItem) {
        try {
            // save asset type only
            if (null != genericItem && !genericItem.getChildren().isEmpty()) {
                genericItem.getChildren().forEach(item -> {
                    // level 1 set parent to null
                    saveAssetTypeAnalyzeModeDragAndDrop(item, null);
                });
            }
        }catch(IndexOutOfBoundsException e){
            return genericItemPOJOBuilder.buildGIErrorResponse("Please update the level of selected framework", HttpStatus.OK);
        }catch (Exception ex){
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Save to database Failed", HttpStatus.OK);
        }
        GenericItem response=new GenericItem();
        response.setDescription("ok");
        return ResponseEntity.ok(response);
    }

    private  void saveAssetTypeAnalyzeModeDragAndDrop(GenericItem genericItem,AssetType parentAssetType){
        if (null != genericItem && null != genericItem.getElementId() && null != genericItem.getObjectType() && genericItem.getObjectType().equalsIgnoreCase(ObjectTypeConstants.ASSET_TYPE)) {
            AssetType assetType = assetTypeRepository.findOne(genericItem.getElementId());
            // check if no change
            assetType.setLevel(genericItem.getLevel());
            assetType.setParentAssetType(parentAssetType);
            assetType.setModifiedDateTime(new Date());
            assetTypeRepository.save(assetType);

            if (null != genericItem.getChildren() && !genericItem.getChildren().isEmpty()) {
                genericItem.getChildren().forEach(item -> {
                    if (null != item && item.getObjectType().equalsIgnoreCase(ObjectTypeConstants.ASSET_TYPE)) {
                        saveAssetTypeAnalyzeModeDragAndDrop(item, assetType);
                    } else if (null != item && item.getObjectType().equalsIgnoreCase(ObjectTypeConstants.SHIELD_ELEMENT)
                            && null != item.getLinkId() && item.getLinkType().equalsIgnoreCase(ObjectTypeConstants.ASSET_TYPE_TO_SHIELD_ELEMENT_LINK)) {
                        //1. direct_asset_type_to_shield_element_link
                        AssetTypeToShieldElementMap assetTypeToShieldElementMap = assetTypeToShieldElementMapRepository.findOne(item.getLinkId());
                        // check if any link changed
                        if (assetTypeToShieldElementMap != null && !assetTypeToShieldElementMap.getAssetType().getId().equals(assetType.getId())) {
                            assetTypeToShieldElementMap.setAssetType(assetType);
                            assetTypeToShieldElementMapRepository.save(assetTypeToShieldElementMap);
                        }
                    }
                });
            }
        }
    }

}