package com.ss.controller;


import com.ss.common.ExecException;
import com.ss.constants.*;
import com.ss.domain.asset.*;
import com.ss.domain.groups.AssetGroup;
import com.ss.domain.sce.SecurityControlExpression;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.shieldclassification.ShieldType;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.helper.IdNameObject;
import com.ss.pojo.restservice.*;
import com.ss.pojo.restservice.sce.AssetToShieldElementAssociationsSaveRequest;
import com.ss.pojo.restservice.sce.ExpressionProtectedByMappingSaveRequest;
import com.ss.repository.asset.*;
import com.ss.repository.groups.AssetGroupRepository;
import com.ss.repository.sce.SecurityControlExpressionRepository;
import com.ss.repository.shieldclassification.ShieldElementRepository;
import com.ss.repository.shieldclassification.ShieldRepository;
import com.ss.repository.shieldclassification.ShieldTypeRepository;
import com.ss.repository.usermanagement.OrganizationalUnitRepository;
import com.ss.service.fullhierarchytraversal.helper.AssetFullHelper;
import com.ss.service.fullhierarchytraversal.helper.ShieldFullHelper;
import com.ss.service.generictraversal.GenericItemAssetGroupService;
import com.ss.service.generictraversal.GenericItemAssetService;
import com.ss.service.permissions.PermissionCheckerService;
import com.ss.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.interceptor.TransactionInterceptor;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.*;

@RestController
@Transactional
@RequestMapping(value = "/rest/asset")
public class AssetController {

    @Autowired
    private GenericItemAssetService genericItemAssetService;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemAssetGroupService genericItemAssetGroupService;

    @Autowired
    private IdNameObjectConverter idNameObjectConverter;

    @Autowired
    private AssetGroupRepository assetGroupRepository;

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private AssetTypeRepository assetTypeRepository;

    @Autowired
    private ProviderInfoRepository providerInfoRepository;

    @Autowired
    private OrganizationalUnitRepository organizationalUnitRepository;

    @Autowired
    private GenericItemSubtreeHelper genericItemSubtreeHelper;

    @Autowired
    private ShieldTypeRepository shieldTypeRepository;

    @Autowired
    private AssetFullHelper assetFullHelper;

    @Autowired
    private SecurityControlExpressionRepository securityControlExpressionRepository;

    @Autowired
    private AssetDeliversSceRepository assetDeliversSceRepository;

    @Autowired
    private ShieldRepository shieldRepository;

    @Autowired
    private ShieldElementRepository shieldElementRepository;

    @Autowired
    private ShieldFullHelper shieldFullHelper;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    @Autowired
    private AssetToShieldElementMapRepository assetToShieldElementMapRepository;

    @Autowired
    private HaveAssetCheckingService haveAssetCheckingService;

    @RequestMapping(value = "/does_have_assets", method = RequestMethod.POST)
    public Map<String, Boolean> getAssetsDvWithGroupApplied(@RequestBody DoesHaveAssetRequest request) {

        Map<String, Boolean> response = new HashMap<>();

        for (String entry : request.getExclamationSeparatedElementIdObjectTypeList()) {
            String[] splits = entry.split("!");
            if (splits.length != 2) {
                throw new ExecException("ExclamationSeparatedElementIdObjectType in request " + entry + " is invalid");
            }
            Integer elementId = Integer.parseInt(splits[0]);
            String objectType = splits[1].trim();
            try {
                response.put(entry, haveAssetCheckingService.isHaveAssetIgnore(elementId, objectType, request.isDirect()));
            } catch (ExecException execException) {
                response.put(entry, false);
            }
        }

        return response;
    }


    @RequestMapping(value = "/get_assets_dv", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getAssetsDvWithGroupApplied(@RequestBody AssetDvRequest request) {

        List<IdNameObject> idNameObjects = null;
        if (request.getAssetGroupId() != null && !request.getAssetGroupId().equals(0)) {

            AssetGroup assetGroup = assetGroupRepository.findOne(request.getAssetGroupId());
            if (assetGroup == null || assetGroup.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Asset Group with id : " + request.getAssetGroupId() + " not found", HttpStatus.NOT_FOUND);

            ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.ASSET, GIMode.ALL_LINKED_ELEMENTS);
            PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
            perspectiveGroupInfo.setRated(false);
            perspectiveGroupInfo.setGroupFoundAndIncludeAllChildren(true);
            GenericItem genericItem = genericItemAssetGroupService.buildGenericItemForAssetGroup(assetGroup, viewDescriptor, perspectiveGroupInfo);
            idNameObjects = idNameObjectConverter.convertOnlyTopLevel(genericItem.getChildren());
        }

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);
        perspectiveGroupInfo.setGroupItems(idNameObjects);

        ViewDescriptor extraViewDescriptor = null;
        if (request.isShowExpression()) {
            if (request.getProtectionType() == null)
                return genericItemPOJOBuilder.buildGIErrorResponse("protection type is null in the request; only supported protection types are " + ProtectionType.COULD + ", " + ProtectionType.SHALL + ", " + ProtectionType.COULD_AND_SHALL, HttpStatus.BAD_REQUEST);
            switch (request.getProtectionType()) {
                case ProtectionType.COULD:
                    extraViewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.COULD_DELIVER);
                    break;
                case ProtectionType.SHALL:
                    extraViewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.SHALL_DELIVER);
                    break;
                case ProtectionType.COULD_AND_SHALL:
                    extraViewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.ALL_LINKED_ELEMENTS);
                    break;
                default:
                    return genericItemPOJOBuilder.buildGIErrorResponse("Unknown protection type " + request.getProtectionType() + "; only supported protection types are " + ProtectionType.COULD + ", " + ProtectionType.SHALL + ", " + ProtectionType.COULD_AND_SHALL, HttpStatus.BAD_REQUEST);
            }

        }
        GenericItem assetRootGenericItem = handleAssetRoot(extraViewDescriptor, perspectiveGroupInfo);

        idNameObjectConverter.minifiedGenericItem(assetRootGenericItem);
        return new ResponseEntity(assetRootGenericItem, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_assets_subtree_dv", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getAssetsSubtreeDvWithGroupApplied(@RequestBody AssetSubtreeDvRequest assetSubtreeDvRequest) {

        List<IdNameObject> idNameObjects = null;
        if (assetSubtreeDvRequest.getAssetGroupId() != null && !assetSubtreeDvRequest.getAssetGroupId().equals(0)) {

            AssetGroup assetGroup = assetGroupRepository.findOne(assetSubtreeDvRequest.getAssetGroupId());
            if (assetGroup == null || assetGroup.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Asset Group with id : " + assetSubtreeDvRequest.getAssetGroupId() + " not found", HttpStatus.NOT_FOUND);

            ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.ASSET, GIMode.ALL_LINKED_ELEMENTS);
            PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
            perspectiveGroupInfo.setRated(false);
            perspectiveGroupInfo.setGroupFoundAndIncludeAllChildren(true);
            GenericItem genericItem = genericItemAssetGroupService.buildGenericItemForAssetGroup(assetGroup, viewDescriptor, perspectiveGroupInfo);
            idNameObjects = idNameObjectConverter.convertOnlyTopLevel(genericItem.getChildren());
        }

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);
        perspectiveGroupInfo.setGroupItems(idNameObjects);

        ViewDescriptor extraViewDescriptor = null;
        if (assetSubtreeDvRequest.isShowExpression()) {
            switch (assetSubtreeDvRequest.getProtectionType()) {
                case ProtectionType.COULD:
                    extraViewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.COULD_DELIVER);
                    break;
                case ProtectionType.SHALL:
                    extraViewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.SHALL_DELIVER);
                    break;
                case ProtectionType.COULD_AND_SHALL:
                    extraViewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.ALL_LINKED_ELEMENTS);
                    break;
                default:
                    return genericItemPOJOBuilder.buildGIErrorResponse("Unknown protection type " + assetSubtreeDvRequest.getProtectionType() + "; only supported protection types are " + ProtectionType.COULD + ", " + ProtectionType.SHALL + ", " + ProtectionType.COULD_AND_SHALL, HttpStatus.BAD_REQUEST);
            }
        }
        GenericItem assetRootGenericItem = handleAssetRoot(extraViewDescriptor, perspectiveGroupInfo);

        idNameObjectConverter.minifiedGenericItem(assetRootGenericItem);

        GenericItem requiredGenericItem = genericItemSubtreeHelper.findObject(assetRootGenericItem, assetSubtreeDvRequest.getObjectType(), assetSubtreeDvRequest.getElementId());

        if (requiredGenericItem == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Parent item with id " + assetSubtreeDvRequest.getElementId() + " and object type " + assetSubtreeDvRequest.getObjectType() + " not found - may have been unmapped or deleted", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(requiredGenericItem, HttpStatus.OK);
    }

    public GenericItem handleAssetRoot(ViewDescriptor extraViewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        GenericItem genericItem = new GenericItem();
        genericItem.setObjectType(ObjectTypeConstants.ASSET_ROOT);
        genericItem.setName("");
        genericItem.setElementId(0);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        List<Asset> assets = assetRepository.findByIsArchivedFalse();

        if (assets != null) {
            for (Asset asset : assets) {
                if (asset != null && !asset.isArchived()) {
                    children.add(genericItemAssetService.buildGenericItemForAsset(asset, extraViewDescriptor, perspectiveGroupInfo));
                }
            }
        }
        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
        return genericItem;

    }

    @RequestMapping(value = "/get_all_asset_groups", method = RequestMethod.GET)
    public ResponseEntity<List<GenericItem>> getAllAssetGroups() {

        List<GenericItem> response = new ArrayList<>();
        List<AssetGroup> assetGroupList = assetGroupRepository.findByIsArchivedFalse();

        for (AssetGroup assetGroup : assetGroupList) {
            if (assetGroup != null && !assetGroup.isArchived())
                response.add(genericItemPOJOBuilder.buildGenericPOJO(assetGroup));
        }

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_asset", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createAsset(@RequestBody CreateAssetRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.ASSET))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        Asset asset = new Asset();

        asset.setName(request.getName().trim());

        List<Asset> assetsWithSameName = assetRepository.findByNameAndIsArchivedFalse(request.getName().trim());
        if (assetsWithSameName != null && !assetsWithSameName.isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset with Name " + request.getName() + " already exist", HttpStatus.CONFLICT);

        asset.setDescription(request.getDescription());

        if (request.getAssetTypeId() == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("assetTypeId is null in the request", HttpStatus.BAD_REQUEST);

        AssetType assetType = assetTypeRepository.findOne(request.getAssetTypeId());
        if (assetType == null || assetType.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type with id " + request.getAssetTypeId() + " not found", HttpStatus.BAD_REQUEST);

        ProviderInfo providerInfo = null;
        if (request.getProviderId() != null && !request.getProviderId().equals(0)) {
            providerInfo = providerInfoRepository.findOne(request.getProviderId());
            if (providerInfo == null || providerInfo.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Provider with id " + request.getProviderId() + " not found", HttpStatus.BAD_REQUEST);
        }

        OrganizationalUnit organizationalUnit = null;
        if (request.getOrganizationalUnitId() != null && !request.getOrganizationalUnitId().equals(0)) {
            organizationalUnit = organizationalUnitRepository.findOne(request.getOrganizationalUnitId());
            if (organizationalUnit == null || organizationalUnit.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with id " + request.getOrganizationalUnitId() + " not found", HttpStatus.BAD_REQUEST);
        }

        asset.setArchived(false);
        asset.setAssetType(assetType);
        asset.setOrganizationalUnit(organizationalUnit);
        asset.setProviderInfo(providerInfo);

        asset = assetRepository.save(asset);

        if (asset == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(asset);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/edit_asset", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editAsset(@RequestBody EditAssetRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.ASSET))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        Asset asset = assetRepository.findOne(request.getElementId());
        if (asset == null || asset.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        List<Asset> assetsWithSameName = assetRepository.findByNameAndIsArchivedFalse(request.getName().trim());

        if (assetsWithSameName != null && !assetsWithSameName.isEmpty()) {
            if (!assetsWithSameName.get(0).getId().equals(request.getElementId()))
                return genericItemPOJOBuilder.buildGIErrorResponse("Asset with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }
        asset.setName(request.getName().trim());
        asset.setDescription(request.getDescription());

        if (request.getOrganizationalUnitId() != null && !request.getOrganizationalUnitId().equals(0)) {
            OrganizationalUnit obj = organizationalUnitRepository.findOne(request.getOrganizationalUnitId());
            if (obj == null && obj.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with id " + request.getOrganizationalUnitId() + " not found", HttpStatus.NOT_FOUND);
            asset.setOrganizationalUnit(obj);
        } else
            asset.setOrganizationalUnit(null);

        if (request.getAssetTypeId() == null || request.getAssetTypeId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type Id in request cannot be null or 0. It is mandatory field", HttpStatus.BAD_REQUEST);
        AssetType assetType = assetTypeRepository.findOne(request.getAssetTypeId());
        if (assetType == null || assetType.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type with id " + request.getAssetTypeId() + " not found", HttpStatus.NOT_FOUND);
        asset.setAssetType(assetType);

        ProviderInfo providerInfo = null;
        if (request.getProviderId() != null && !request.getProviderId().equals(0)) {
            providerInfo = providerInfoRepository.findOne(request.getProviderId());
            if (providerInfo == null || providerInfo.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Provider with id " + request.getProviderId() + " not found", HttpStatus.NOT_FOUND);
        }
        asset.setProviderInfo(providerInfo);
        asset = assetRepository.save(asset);

        if (asset == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(asset);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    //get asset info
    @RequestMapping(value = "/get_asset_info/{assetId}", method = RequestMethod.GET)
    public AssetInfo getAssetInfo(@PathVariable("assetId") Integer assetId) {

        Asset asset = assetRepository.findOne(assetId);
        if (asset == null || asset.isArchived())
            throw new ExecException("Asset with id " + assetId + " not found");
        AssetInfo response = new AssetInfo();
        response.setDescription(asset.getDescription());
        response.setName(asset.getName());
        response.setElementId(asset.getId());

        OrganizationalUnit organizationalUnit = asset.getOrganizationalUnit();
        if (organizationalUnit == null) {
            response.setOrganizationalUnitId(0);
            response.setOrganizationalUnitName(null);
        } else {
            response.setOrganizationalUnitId(organizationalUnit.getId());
            response.setOrganizationalUnitName(organizationalUnit.getName());
        }


        AssetType assetType = asset.getAssetType();
        if (assetType == null || assetType.isArchived()) {
            throw new ExecException("Asset Type for Asset " + asset.getName() + " is null");
            /*response.setAssetTypeId(0);
            response.setAssetTypeName(null);*/
        } else {
            response.setAssetTypeId(assetType.getId());
            response.setAssetTypeName(assetType.getName());
        }

        ProviderInfo providerInfo = asset.getProviderInfo();
        if (providerInfo == null || providerInfo.isArchived()) {
            // throw new ExecException("Provider for Asset " + asset.getName() + " is null");
            /*response.setAssetTypeId(0);
            response.setAssetTypeName(null);*/
        } else {
            response.setProviderId(providerInfo.getId());
            response.setProviderName(providerInfo.getName());
        }

        return response;
    }

    @RequestMapping(value = "/get_asset_analyze_mode_dv_subtree", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getAssetMapToOtherStartingPointSubtree(@RequestBody AssetMapSubtreeRequestInfo subtreeRequestInfo) {

        AssetMapRequestInfo assetMapRequestInfo = new AssetMapRequestInfo();

        assetMapRequestInfo.setDropDownOneGroupId(subtreeRequestInfo.getDropDownOneGroupId());
        assetMapRequestInfo.setDropDownOneProtectionType(subtreeRequestInfo.getDropDownOneProtectionType());
        assetMapRequestInfo.setDropDownTwoProtectionType(subtreeRequestInfo.getDropDownTwoProtectionType());
        assetMapRequestInfo.setDropDownTwoShieldId(subtreeRequestInfo.getDropDownTwoShieldId());
        assetMapRequestInfo.setDropDownTwoStartingPoint(subtreeRequestInfo.getDropDownTwoStartingPoint());

        ResponseEntity<GenericItem> response = getAssetMapToOtherStartingPoint(assetMapRequestInfo);
        GenericItem genericItem = response.getBody();
        GenericItem requiredGenericItem = genericItemSubtreeHelper.findObject(genericItem, subtreeRequestInfo.getObjectType(), subtreeRequestInfo.getElementId());
        if (requiredGenericItem == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Parent item with id " + subtreeRequestInfo.getElementId() + " and object type " + subtreeRequestInfo.getObjectType() + " not found - may have been unmapped or deleted", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(requiredGenericItem, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_asset_analyze_mode_dv", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getAssetMapToOtherStartingPoint(@RequestBody AssetMapRequestInfo assetMapRequestInfo) {

        ViewDescriptor viewDescriptor = null;
        ViewDescriptor extraDescriptor = null;
        //all linked , shall , could, protect.

        if (!assetMapRequestInfo.isDirect()) {
            if (assetMapRequestInfo.getDropDownOneProtectionType() == null || assetMapRequestInfo.getDropDownOneProtectionType().equals(ProtectionType.COULD_AND_SHALL)) {

                extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.ALL_LINKED_ELEMENTS);

            } else {
                switch (assetMapRequestInfo.getDropDownOneProtectionType()) {
                    case ProtectionType.COULD:
                        extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.COULD_DELIVER);
                        break;
                    case ProtectionType.SHALL:
                        extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.SHALL_DELIVER);
                        break;
                    default: {
                        return genericItemPOJOBuilder.buildGIErrorResponse("Unknown protection type : " + assetMapRequestInfo.getDropDownOneProtectionType(), HttpStatus.BAD_REQUEST);
                    }
                }
            }
        }

        switch (assetMapRequestInfo.getDropDownTwoStartingPoint()) {

            case ObjectTypeConstants.ASSET_ROOT:
                if (assetMapRequestInfo.isDirect())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Unsupported. Cannot map Asset to   " + assetMapRequestInfo.getDropDownTwoStartingPoint(), HttpStatus.BAD_REQUEST);

                if (assetMapRequestInfo.getDropDownTwoProtectionType() == null || assetMapRequestInfo.getDropDownTwoProtectionType().equals(ProtectionType.COULD_AND_SHALL)) {
                    extraDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET, GIMode.ALL_LINKED_ELEMENTS));

                } else {
                    switch (assetMapRequestInfo.getDropDownTwoProtectionType()) {
                        case ProtectionType.COULD:
                            extraDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET, GIMode.COULD_DELIVER));
                            break;
                        case ProtectionType.SHALL:
                            extraDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET, GIMode.SHALL_DELIVER));
                            break;
                        default: {
                            return genericItemPOJOBuilder.buildGIErrorResponse("Unknown protection type : " + assetMapRequestInfo.getDropDownTwoProtectionType(), HttpStatus.BAD_REQUEST);
                        }
                    }
                }
                break;
            case ObjectTypeConstants.ASSET_TYPE_ROOT:
                if (assetMapRequestInfo.isDirect()) {
                    viewDescriptor = new ViewDescriptor(GIView.ASSET_TYPE, GIMode.ALL_LINKED_ELEMENTS);
                } else {
                    if (assetMapRequestInfo.getDropDownTwoProtectionType() == null || assetMapRequestInfo.getDropDownTwoProtectionType().equals(ProtectionType.COULD_AND_SHALL)) {

                        extraDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET_TYPE, GIMode.ALL_LINKED_ELEMENTS));

                    } else {
                        switch (assetMapRequestInfo.getDropDownTwoProtectionType()) {
                            case ProtectionType.COULD:
                                extraDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET_TYPE, GIMode.COULD_PROTECT));
                                break;
                            case ProtectionType.SHALL:
                                extraDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET_TYPE, GIMode.SHALL_PROTECT));
                                break;
                            default: {
                                return genericItemPOJOBuilder.buildGIErrorResponse("Unknown protection type : " + assetMapRequestInfo.getDropDownTwoProtectionType(), HttpStatus.BAD_REQUEST);
                            }
                        }
                    }
                }
                break;
            case ObjectTypeConstants.SHIELD_ROOT:
                if (assetMapRequestInfo.getDropDownTwoShieldId() == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("drop down two shield id is null", HttpStatus.BAD_REQUEST);
                if (assetMapRequestInfo.isDirect()) {
                    viewDescriptor = new ViewDescriptor(GIView.DIRECT_SHIELD_ELEMENT, GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID);
                    viewDescriptor.setShieldId(assetMapRequestInfo.getDropDownTwoShieldId());
                } else {
                    if (assetMapRequestInfo.isShowDirectLinksInExpressionMode()) {
                        viewDescriptor = new ViewDescriptor(GIView.DIRECT_SHIELD_ELEMENT, GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID);
                        viewDescriptor.setShieldId(assetMapRequestInfo.getDropDownTwoShieldId());
                    }

                    ViewDescriptor shieldElementDescriptor = new ViewDescriptor(GIView.SHIELD_ELEMENT, GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID);
                    shieldElementDescriptor.setShieldId(assetMapRequestInfo.getDropDownTwoShieldId());
                    extraDescriptor.setNextLevel(shieldElementDescriptor);
                }
                break;
            default:
                return genericItemPOJOBuilder.buildGIErrorResponse("Unsupported. Cannot map Asset to   " + assetMapRequestInfo.getDropDownTwoStartingPoint(), HttpStatus.BAD_REQUEST);
        }


        return assetFullHelper.getAssetFullWithDescriptor(assetMapRequestInfo.getDropDownOneGroupId(), viewDescriptor, extraDescriptor);

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
                    shieldOption.setLinkTypeAttr(ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK);
                    shieldOption.setLinkNameAttr(LinkName.SECURITY_ASSET_TO_SHIELD_ELEMENT);
                    response.add(shieldOption);
                }
            }
        }
        return response;
    }

    //get dropdown 2 starting point options.
    @RequestMapping(value = "/get_dropdown_two_options_for_asset_starting_point/{isDirect}", method = RequestMethod.GET)
    public List<StartingPointOption> getDropdownTwoOptionsForAssetStartingPoint(@PathVariable("isDirect") Boolean isDirect) {
        if (isDirect == null)
            throw new ExecException("Please pass isDirect parameter in request");

        boolean primaryLinksOnly = false;
        if (permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.SHOW_PRIMARY_LINKS_ONLY))
            primaryLinksOnly = true;

        if(isDirect && primaryLinksOnly) {
            return primaryLinksOnlyOptions();
        }

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
                    //if (isDirect)
                    shieldOption.setLabel(shield.getName());
                    if (isDirect) {
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK);
                        shieldOption.setLinkNameAttr(LinkName.SECURITY_ASSET_TO_SHIELD_ELEMENT);
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
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK);
                        shieldOption.setLinkNameAttr(LinkName.SECURITY_ASSET_TO_STANDARD_ELEMENT);
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
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK);
                        shieldOption.setLinkNameAttr(LinkName.SECURITY_ASSET_TO_BUSINESS_ELEMENT);
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
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK);
                        shieldOption.setLinkNameAttr(LinkName.SECURITY_ASSET_TO_THREAT_ELEMENT);
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

        if (!isDirect) {
            /*//asset type shall
            StartingPointOption assetTypeShallStartingPointOption = new StartingPointOption();
            assetTypeShallStartingPointOption.setLabel("Asset Type");
            assetTypeShallStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_TYPE_ROOT);
            assetTypeShallStartingPointOption.setProtectionType(ProtectionType.SHALL);
            assetTypeShallStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.ASSET_TYPE);
            response.add(assetTypeShallStartingPointOption); */
            /*//asset type could
            StartingPointOption assetTypeCouldStartingPointOption = new StartingPointOption();
            assetTypeCouldStartingPointOption.setLabel("Could Protect Asset Type");
            assetTypeCouldStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_TYPE_ROOT);
            assetTypeCouldStartingPointOption.setProtectionType(ProtectionType.COULD);
            assetTypeCouldStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.ASSET_TYPE);
            response.add(assetTypeCouldStartingPointOption);

            //asset type could and shall
            StartingPointOption assetTypeCouldAndShallStartingPointOption = new StartingPointOption();
            assetTypeCouldAndShallStartingPointOption.setLabel("Could or Shall Protect Asset Type");
            assetTypeCouldAndShallStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_TYPE_ROOT);
            assetTypeCouldAndShallStartingPointOption.setProtectionType(ProtectionType.COULD_AND_SHALL);
            assetTypeCouldAndShallStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.ASSET_TYPE);
            response.add(assetTypeCouldAndShallStartingPointOption);*/

            /*//asset shall
            StartingPointOption assetShallStartingPointOption = new StartingPointOption();
            assetShallStartingPointOption.setLabel("Asset");
            assetShallStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_ROOT);
            assetShallStartingPointOption.setProtectionType(ProtectionType.SHALL);
            assetShallStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.ASSET);
            response.add(assetShallStartingPointOption); */
            /*// asset could
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
        } else {
            /*StartingPointOption assetTypeShallStartingPointOption = new StartingPointOption();
            assetTypeShallStartingPointOption.setLabel("Asset Type");
            assetTypeShallStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_TYPE_ROOT);
            assetTypeShallStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.ASSET_TYPE);
            //assetTypeShallStartingPointOption.setProtectionType(ProtectionType.SHALL);
            response.add(assetTypeShallStartingPointOption);*/
        }
        return response;
    }

    // get delivers association for asset
    @RequestMapping(value = "/get_delivers_associations_for_asset/{assetId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getDeliversAssociationsForAsset(@PathVariable("assetId") Integer assetId) {

        GenericItem response = new GenericItem();
        Asset asset = assetRepository.findOne(assetId);
        if (asset == null || asset.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset with id " + assetId + " not found", HttpStatus.NOT_FOUND);
        }
        List<AssetDeliversSce> assetDeliversSceList = asset.getAssetDeliversSceList();
        Set<Integer> mappedCouldExpressions = new HashSet<>();
        Set<Integer> mappedShallExpressions = new HashSet<>();

        if (assetDeliversSceList != null) {
            for (AssetDeliversSce mapEntry : assetDeliversSceList) {
                if (mapEntry != null && !mapEntry.isArchived()) {
                    SecurityControlExpression sce = mapEntry.getSce();
                    if (sce != null && !sce.isArchived()) {
                        if (mapEntry.getShallCould().equals(ProtectionType.COULD))
                            mappedCouldExpressions.add(sce.getId());
                        else if (mapEntry.getShallCould().equals(ProtectionType.SHALL))
                            mappedShallExpressions.add(sce.getId());
                        else
                            throw new ExecException("Unknown protection type found in DB: " + mapEntry.getShallCould());
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

    @RequestMapping(value = "/save_expression_delivered_by_associations_to_asset", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveExpressionFulfillsAssociationsToShieldElement(@RequestBody ExpressionProtectedByMappingSaveRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_ASSET_DELIVERS_EXPRESSION_ASSOCIATION))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        Asset asset = assetRepository.findOne(request.getElementId());
        if (asset == null && asset.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);
        }
        List<AssetDeliversSce> assetDeliversSceList = asset.getAssetDeliversSceList();

        Set<Integer> newMappings = new HashSet<>();
        newMappings.addAll(new HashSet(request.getAssociatedCouldExpressions()));
        newMappings.addAll(new HashSet(request.getAssociatedShallExpressions()));

        Map<Integer, AssetDeliversSce> expressionIdToAlreadyAssociatedProtectedByRecordMap = polulateMapOfExpressionIdToProtectedByRecord(assetDeliversSceList);

        for (Integer expressionId : request.getAssociatedCouldExpressions()) {
            if (expressionIdToAlreadyAssociatedProtectedByRecordMap.get(expressionId) != null) {
                AssetDeliversSce mapRecord = expressionIdToAlreadyAssociatedProtectedByRecordMap.get(expressionId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    mapRecord.setShallCould(ProtectionType.COULD);
                    AssetDeliversSce returnValue = assetDeliversSceRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetDeliversSce Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                } else {
                    if (!mapRecord.getShallCould().equals(ProtectionType.COULD)) {
                        mapRecord.setShallCould(ProtectionType.COULD);
                        AssetDeliversSce returnValue = assetDeliversSceRepository.save(mapRecord);
                        if (returnValue == null)
                            return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetDeliversSce Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }
                expressionIdToAlreadyAssociatedProtectedByRecordMap.remove(expressionId);
            } else {
                AssetDeliversSce newAssetCouldDeliverSceEntry = new AssetDeliversSce();
                newAssetCouldDeliverSceEntry.setArchived(false);
                SecurityControlExpression expression = securityControlExpressionRepository.findOne(expressionId);
                if (expression == null || expression.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Expression with id " + expressionId + " not found", HttpStatus.NOT_FOUND);
                newAssetCouldDeliverSceEntry.setSce(expression);
                newAssetCouldDeliverSceEntry.setAsset(asset);
                newAssetCouldDeliverSceEntry.setShallCould(ProtectionType.COULD);
                AssetDeliversSce returnValue = assetDeliversSceRepository.save(newAssetCouldDeliverSceEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetDeliversSce Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        for (Integer expressionId : request.getAssociatedShallExpressions()) {
            if (expressionIdToAlreadyAssociatedProtectedByRecordMap.get(expressionId) != null) {
                AssetDeliversSce mapRecord = expressionIdToAlreadyAssociatedProtectedByRecordMap.get(expressionId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    mapRecord.setShallCould(ProtectionType.SHALL);
                    AssetDeliversSce returnValue = assetDeliversSceRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetDeliversSce Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                } else {
                    if (!mapRecord.getShallCould().equals(ProtectionType.SHALL)) {
                        mapRecord.setShallCould(ProtectionType.SHALL);
                        AssetDeliversSce returnValue = assetDeliversSceRepository.save(mapRecord);
                        if (returnValue == null)
                            return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetDeliversSce Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }
                expressionIdToAlreadyAssociatedProtectedByRecordMap.remove(expressionId);
            } else {
                AssetDeliversSce newAssetShallDeliverEntry = new AssetDeliversSce();
                newAssetShallDeliverEntry.setArchived(false);
                SecurityControlExpression expression = securityControlExpressionRepository.findOne(expressionId);
                if (expression == null || expression.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Expression with id " + expressionId + " not found", HttpStatus.NOT_FOUND);
                newAssetShallDeliverEntry.setSce(expression);
                newAssetShallDeliverEntry.setAsset(asset);
                newAssetShallDeliverEntry.setShallCould(ProtectionType.SHALL);
                AssetDeliversSce returnValue = assetDeliversSceRepository.save(newAssetShallDeliverEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetDeliversSce Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


        for (Map.Entry<Integer, AssetDeliversSce> entry : expressionIdToAlreadyAssociatedProtectedByRecordMap.entrySet()) {
            AssetDeliversSce assetTypeProtectedBySce = entry.getValue();
            if (!assetTypeProtectedBySce.isArchived()) {
                assetTypeProtectedBySce.setArchived(true);
                AssetDeliversSce returnValue = assetDeliversSceRepository.save(assetTypeProtectedBySce);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetDeliversSce Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    private Map<Integer, AssetDeliversSce> polulateMapOfExpressionIdToProtectedByRecord(List<AssetDeliversSce> assetDeliversSceList) {
        Map<Integer, AssetDeliversSce> map = new HashMap<>();
        for (AssetDeliversSce assetDeliversSce : assetDeliversSceList) {
            SecurityControlExpression sce = assetDeliversSce.getSce();
            if (sce != null && !sce.isArchived()) {
                if (map.get(sce.getId()) != null) {
                    if (!assetDeliversSce.isArchived()) {
                        map.put(sce.getId(), assetDeliversSce);
                    }
                } else {
                    map.put(sce.getId(), assetDeliversSce);
                }
            }
        }
        return map;
    }

    @RequestMapping(value = "/get_direct_shield_element_associations_for_asset/{assetId}/{shieldId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getDirectShieldElementAssociationsForAsset(@PathVariable("assetId") Integer assetId, @PathVariable("shieldId") Integer shieldId) {

        Shield shield = shieldRepository.findOne(shieldId);
        if (shield == null || shield.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield with id " + shieldId + " not found", HttpStatus.NOT_FOUND);

        GenericItem response = new GenericItem();
        Asset asset = assetRepository.findOne(assetId);
        if (asset == null || asset.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset with id " + assetId + " not found", HttpStatus.NOT_FOUND);
        }
        //List<AssetToShieldElementMap> assetToShieldElementMapList = asset.getAssetToShieldElementMapList();
        List<AssetToShieldElementMap> assetToShieldElementMapList = assetToShieldElementMapRepository.findByAssetIdAndShieldElementShieldIdAndIsArchivedFalse(assetId, shieldId);
        Set<Integer> mappedShieldElements = new HashSet<>();

        if (assetToShieldElementMapList != null) {
            for (AssetToShieldElementMap mapEntry : assetToShieldElementMapList) {
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

    @RequestMapping(value = "/save_direct_shield_element_associations_for_asset", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveDirectShieldElementAssociationsForAsset(@RequestBody AssetToShieldElementAssociationsSaveRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_DIRECT_ASSET_IMPLEMENTS_ELEMENT_ASSOCIATION))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        Asset assetInFocus = assetRepository.findOne(request.getAssetId());
        if (assetInFocus == null && assetInFocus.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset with id " + request.getAssetId() + " not found", HttpStatus.NOT_FOUND);
        }

        if (request.getShieldId() == null || request.getShieldId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("shieldId cannot be null or 0; it is a mandatory field", HttpStatus.BAD_REQUEST);

        Shield shield = shieldRepository.findOne(request.getShieldId());
        if (shield == null || shield.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("shield with id " + request.getShieldId() + " not found", HttpStatus.NOT_FOUND);

        //List<AssetToShieldElementMap> assetToShieldElementMapList = assetInFocus.getAssetToShieldElementMapList();
        List<AssetToShieldElementMap> assetToShieldElementMapList = assetToShieldElementMapRepository.findByAssetIdAndShieldElementShieldIdAndIsArchivedFalse(assetInFocus.getId(), shield.getId());
        List<Integer> newMappings = new ArrayList<>();
        newMappings.addAll(request.getAssociatedElements());

        Map<Integer, AssetToShieldElementMap> elementIdToDirectShieldElementRecordMap = polulateMapOfElementIdToAssetShieldElementDirectMap(assetToShieldElementMapList);

        for (Integer elementId : request.getAssociatedElements()) {
            if (elementIdToDirectShieldElementRecordMap.get(elementId) != null) {
                AssetToShieldElementMap mapRecord = elementIdToDirectShieldElementRecordMap.get(elementId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    AssetToShieldElementMap returnValue = assetToShieldElementMapRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetToShieldElementMap Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                }
                elementIdToDirectShieldElementRecordMap.remove(elementId);
            } else {
                AssetToShieldElementMap assetToShieldElementMap = new AssetToShieldElementMap();
                assetToShieldElementMap.setArchived(false);
                assetToShieldElementMap.setDefault(false);
                ShieldElement shieldElement = shieldElementRepository.findOne(elementId);
                if (shieldElement == null || shieldElement.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Element with id " + elementId + " not found", HttpStatus.NOT_FOUND);
                assetToShieldElementMap.setAsset(assetInFocus);
                assetToShieldElementMap.setShieldElement(shieldElement);
                AssetToShieldElementMap returnValue = assetToShieldElementMapRepository.save(assetToShieldElementMap);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetToShieldElementMap Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        for (Map.Entry<Integer, AssetToShieldElementMap> entry : elementIdToDirectShieldElementRecordMap.entrySet()) {
            AssetToShieldElementMap assetToShieldElementMap = entry.getValue();
            if (!assetToShieldElementMap.isArchived()) {
                assetToShieldElementMap.setArchived(true);
                AssetToShieldElementMap returnValue = assetToShieldElementMapRepository.save(assetToShieldElementMap);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetToShieldElementMap Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    private Map<Integer, AssetToShieldElementMap> polulateMapOfElementIdToAssetShieldElementDirectMap(List<AssetToShieldElementMap> assetToShieldElementMapList) {
        Map<Integer, AssetToShieldElementMap> map = new HashMap<>();
        for (AssetToShieldElementMap assetToShieldElementMap : assetToShieldElementMapList) {
            ShieldElement shieldElement = assetToShieldElementMap.getShieldElement();
            if (shieldElement != null && !shieldElement.isArchived()) {
                if (map.get(shieldElement.getId()) != null) {
                    if (!assetToShieldElementMap.isArchived()) {
                        map.put(shieldElement.getId(), assetToShieldElementMap);
                    }

                } else {
                    map.put(shieldElement.getId(), assetToShieldElementMap);
                }
            }
        }
        return map;
    }

    //TODO ::  added by Manish for Drag and Drop
    @RequestMapping(value = "/save_asset_mode_drag_and_drop", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveAssetModeDragAndDrop(@RequestBody @NotNull GenericItem genericItem) {
        try {
            assetRepository.fixSortOrderNullValues();
            if (null != genericItem && !genericItem.getChildren().isEmpty())
                saveAssetModeDragAndDropImpl(genericItem);
        } catch (IndexOutOfBoundsException e) {
            TransactionInterceptor.currentTransactionStatus().setRollbackOnly();
            return genericItemPOJOBuilder.buildGIErrorResponse("Please update the level of selected framework", HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
            TransactionInterceptor.currentTransactionStatus().setRollbackOnly();
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Save to database Failed", HttpStatus.OK);
        }
        GenericItem response = new GenericItem();
        response.setDescription("ok");
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/save_asset_analyze_mode_drag_and_drop", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveAssetAnalyzeModeDragAndDrop(@RequestBody @NotNull GenericItem genericItem) {
        try {
            if (null != genericItem && !genericItem.getChildren().isEmpty()) {
                genericItem.getChildren().forEach(item -> {
                    // level 1 set parent to null
                    saveAssetAnalyzeModeDragAndDrop(item, null);
                });
            }
        } catch (IndexOutOfBoundsException e) {
            TransactionInterceptor.currentTransactionStatus().setRollbackOnly();
            return genericItemPOJOBuilder.buildGIErrorResponse("Please update the level of selected framework", HttpStatus.OK);
        } catch (Exception ex) {
            TransactionInterceptor.currentTransactionStatus().setRollbackOnly();
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Save to database Failed", HttpStatus.OK);
        }
        GenericItem response = new GenericItem();
        response.setDescription("ok");
        return ResponseEntity.ok(response);
    }

    private void saveAssetModeDragAndDropImpl(GenericItem genericItem) {
        List<GenericItem> children = genericItem.getChildren();
        int length = children.size();
        for(int i=0;i<length; i++) {
            GenericItem item = children.get(i);
            Asset asset = assetRepository.findOne(item.getElementId());
            if(asset == null)
                throw new ExecException("Asset not found");
            if (item.getDragged()) {
                assetRepository.flush();
                Integer order = asset.getSortOrder();
                if(length != 1) {
                    if(i == 0) {
                        GenericItem nextItem = children.get(i+1);
                        Asset nextAsset = assetRepository.findOne(nextItem.getElementId());
                        int nextSortOrder = nextAsset.getSortOrder();
                        int currentSortOrder = asset.getSortOrder();
                        if(currentSortOrder < nextSortOrder) {
                            assetRepository.decrementSortOrderGtLt(currentSortOrder, nextSortOrder);
                            order = nextSortOrder-1;
                        } else if(currentSortOrder > nextSortOrder) {
                            assetRepository.incrementSortOrderGtLt(nextSortOrder-1, currentSortOrder);
                            order = nextSortOrder;
                        }
                    } else {
                        GenericItem prevItem = children.get(i-1);
                        Asset prevAsset = assetRepository.findOne(prevItem.getElementId());
                        int prevSortOrder = prevAsset.getSortOrder();
                        int currentSortOrder = asset.getSortOrder();
                        if(currentSortOrder < prevSortOrder) {
                            assetRepository.decrementSortOrderGtLt(currentSortOrder, prevSortOrder+1);
                            order = prevSortOrder;
                        } else if(currentSortOrder > prevSortOrder) {
                            assetRepository.incrementSortOrderGtLt(prevSortOrder, currentSortOrder);
                            order = prevSortOrder + 1;
                        }
                    }
                }
                asset = assetRepository.findOne(item.getElementId());
                asset.setSortOrder(order);
                assetRepository.save(asset);
            }
        }
    }

    private void saveAssetAnalyzeModeDragAndDrop(GenericItem genericItem, Asset parentAsset) {
        if (null != genericItem && null != genericItem.getElementId() && genericItem.getObjectType().equalsIgnoreCase(ObjectTypeConstants.ASSET)) {
            Asset asset = assetRepository.findOne(genericItem.getElementId());
            if (asset != null && null != genericItem.getChildren() && !genericItem.getChildren().isEmpty()) {
                genericItem.getChildren().forEach(item -> {
                    if (null != item && item.getObjectType().equalsIgnoreCase(ObjectTypeConstants.SHIELD_ELEMENT)) {
                        ShieldElement shieldElement = shieldElementRepository.findOne(item.getElementId());

                        // save direct_asset_to_shield_element_link
                        if (null != shieldElement && null != item.getLinkId() && item.getLinkType().equalsIgnoreCase(ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK)) {
                            AssetToShieldElementMap assetToShieldElementMap = assetToShieldElementMapRepository.findOne(item.getLinkId());
                            if (null != assetToShieldElementMap && !assetToShieldElementMap.getAsset().getId().equals(asset.getId())) {
                                assetToShieldElementMap.setAsset(asset);
                                assetToShieldElementMapRepository.save(assetToShieldElementMap);
                            }
                        }
                    }
                });
            }
        }
    }

}