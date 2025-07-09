package com.ss.controller;


import com.ss.common.ExecException;
import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.asset.Asset;
import com.ss.domain.asset.ProviderInfo;
import com.ss.domain.businessasset.BusinessAsset;
import com.ss.domain.businessasset.BusinessProvider;
import com.ss.domain.groups.ProviderGroup;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.helper.IdNameObject;
import com.ss.pojo.restservice.*;
import com.ss.repository.asset.AssetRepository;
import com.ss.repository.asset.ProviderInfoRepository;
import com.ss.repository.businessasset.BusinessAssetRepository;
import com.ss.repository.businessasset.BusinessProviderRepository;
import com.ss.repository.groups.ProviderGroupRepository;
import com.ss.repository.usermanagement.OrganizationalUnitRepository;
import com.ss.service.generictraversal.GenericItemProviderGroupService;
import com.ss.service.generictraversal.GenericItemProviderInfoService;
import com.ss.service.permissions.PermissionCheckerService;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import com.ss.utils.IdNameObjectConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.interceptor.TransactionInterceptor;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@Transactional
@RequestMapping(value = "/rest/provider")
public class ProviderController {

    @Autowired
    private GenericItemProviderInfoService genericItemProviderInfoService;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemProviderGroupService genericItemProviderGroupService;

    @Autowired
    private IdNameObjectConverter idNameObjectConverter;

    @Autowired
    private ProviderGroupRepository providerGroupRepository;

    @Autowired
    private ProviderInfoRepository providerInfoRepository;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private OrganizationalUnitRepository organizationalUnitRepository;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private BusinessProviderRepository businessProviderRepository;

    @Autowired
    private BusinessAssetRepository businessAssetRepository;

    @RequestMapping(value = "/get_providers_dv", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getProvidersDvWithOrWithoutAssetAndGroupApplied(@RequestBody ProviderDvRequest providerDvRequest) {

        List<IdNameObject> idNameObjects = null;
        if (providerDvRequest.getProviderGroupId() != null && !providerDvRequest.getProviderGroupId().equals(0)) {

            ProviderGroup providerGroup = providerGroupRepository.findOne(providerDvRequest.getProviderGroupId());
            if (providerGroup == null || providerGroup.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Provider Group with id : " + providerDvRequest.getProviderGroupId() + " not found", HttpStatus.NOT_FOUND);

            ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.PROVIDER, GIMode.ALL_LINKED_ELEMENTS);
            PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
            perspectiveGroupInfo.setRated(false);
            perspectiveGroupInfo.setGroupFoundAndIncludeAllChildren(true);
            GenericItem genericItem = genericItemProviderGroupService.buildGenericItemForProviderGroup(providerGroup, viewDescriptor, perspectiveGroupInfo);
            idNameObjects = idNameObjectConverter.convertOnlyTopLevel(genericItem.getChildren());
        }

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);
        perspectiveGroupInfo.setGroupItems(idNameObjects);

        ViewDescriptor extraViewDescriptor = null;
        if (providerDvRequest.isShowAsset()) {
            extraViewDescriptor = new ViewDescriptor(GIView.ASSET, GIMode.ALL_LINKED_ELEMENTS);
        }
        GenericItem providerRootGenericItem = handleProviderRoot(extraViewDescriptor, perspectiveGroupInfo);

        idNameObjectConverter.minifiedGenericItem(providerRootGenericItem);
        return new ResponseEntity(providerRootGenericItem, HttpStatus.OK);
    }

    public GenericItem handleProviderRoot(ViewDescriptor extraViewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        GenericItem genericItem = new GenericItem();
        genericItem.setObjectType(ObjectTypeConstants.PROVIDER_ROOT);
        genericItem.setName("");
        genericItem.setElementId(0);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        List<ProviderInfo> providers = providerInfoRepository.findByIsArchivedFalse();

        if (providers != null) {
            for (ProviderInfo providerInfo : providers) {
                if (providerInfo != null && !providerInfo.isArchived()) {
                    children.add(genericItemProviderInfoService.buildGenericItemForProviderInfo(providerInfo, extraViewDescriptor, perspectiveGroupInfo));
                }
            }
        }
        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
        return genericItem;

    }

    @RequestMapping(value = "/get_all_provider_groups", method = RequestMethod.GET)
    public ResponseEntity<List<GenericItem>> getAllAssetGroups() {

        List<GenericItem> response = new ArrayList<>();
        List<ProviderGroup> providerGroupList = providerGroupRepository.findByIsArchivedFalse();

        for (ProviderGroup providerGroup : providerGroupList) {
            if (providerGroup != null && !providerGroup.isArchived())
                response.add(genericItemPOJOBuilder.buildGenericPOJO(providerGroup));
        }

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_provider", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createProvider(@RequestBody CreateProviderRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.PROVIDER))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        ProviderInfo providerInfo = new ProviderInfo();

        providerInfo.setName(request.getName().trim());

        List<ProviderInfo> providerInfosWithSameName = providerInfoRepository.findByNameAndIsArchivedFalse(request.getName().trim());
        if (providerInfosWithSameName != null && !providerInfosWithSameName.isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Provider with name " + request.getName() + " already exist", HttpStatus.CONFLICT);

        providerInfo.setDescription(request.getDescription());


        OrganizationalUnit organizationalUnit = null;
        if (request.getOrganizationalUnitId() != null && !request.getOrganizationalUnitId().equals(0)) {
            organizationalUnit = organizationalUnitRepository.findOne(request.getOrganizationalUnitId());
            if (organizationalUnit == null || organizationalUnit.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with id " + request.getOrganizationalUnitId() + " not found", HttpStatus.BAD_REQUEST);
        }

        providerInfo.setArchived(false);
        providerInfo.setOrganizationalUnit(organizationalUnit);

        providerInfo = providerInfoRepository.save(providerInfo);

        if (providerInfo == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Provider Info Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(providerInfo);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/edit_provider", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editProvider(@RequestBody EditProviderInfoRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.PROVIDER))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        ProviderInfo providerInfo = providerInfoRepository.findOne(request.getElementId());
        if (providerInfo == null || providerInfo.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Provider with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        List<ProviderInfo> providersWithSameName = providerInfoRepository.findByNameAndIsArchivedFalse(request.getName().trim());

        if (providersWithSameName != null && !providersWithSameName.isEmpty()) {
            if (!providersWithSameName.get(0).getId().equals(request.getElementId()))
                return genericItemPOJOBuilder.buildGIErrorResponse("Provider with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }
        providerInfo.setName(request.getName().trim());
        providerInfo.setDescription(request.getDescription());

        if (request.getOrganizationalUnitId() != null && !request.getOrganizationalUnitId().equals(0)) {
            OrganizationalUnit obj = organizationalUnitRepository.findOne(request.getOrganizationalUnitId());
            if (obj == null && obj.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with id " + request.getOrganizationalUnitId() + " not found", HttpStatus.NOT_FOUND);
            providerInfo.setOrganizationalUnit(obj);
        } else
            providerInfo.setOrganizationalUnit(null);

        providerInfo = providerInfoRepository.save(providerInfo);

        if (providerInfo == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Provider Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(providerInfo);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    //get provider info
    @RequestMapping(value = "/get_provider_info/{providerId}", method = RequestMethod.GET)
    public ProviderInfoResponse getProviderInfoRestService(@PathVariable("providerId") Integer providerId) {

        ProviderInfo providerInfo = providerInfoRepository.findOne(providerId);
        if (providerInfo == null || providerInfo.isArchived())
            throw new ExecException("Provider with id " + providerId + " not found");

        ProviderInfoResponse response = new ProviderInfoResponse();
        response.setDescription(providerInfo.getDescription());
        response.setName(providerInfo.getName());
        response.setElementId(providerInfo.getId());

        OrganizationalUnit organizationalUnit = providerInfo.getOrganizationalUnit();
        if (organizationalUnit == null) {
            response.setOrganizationalUnitId(0);
            response.setOrganizationalUnitName(null);
        } else {
            response.setOrganizationalUnitId(organizationalUnit.getId());
            response.setOrganizationalUnitName(organizationalUnit.getName());
        }

        return response;
    }


    //TODO ::  added by Manish for Drag and Drop
    @RequestMapping(value = "/save_provider_drag_and_drop", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveProviderDragAndDrop(@RequestBody @NotNull GenericItem genericItem) {
        try {
            providerInfoRepository.fixSortOrderNullValues();
            genericItemPOJOBuilder.keepOnlyGivenObjectTypeInChildren(genericItem, ObjectTypeConstants.PROVIDER);
            if (null != genericItem && !genericItem.getChildren().isEmpty())
                saveProviderDragAndDropImpl(genericItem);
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

    @RequestMapping(value = "/save_business_provider_drag_and_drop", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveBusinessProviderDragAndDrop(@RequestBody @NotNull GenericItem genericItem) {
        try {
            businessProviderRepository.fixSortOrderNullValues();
            genericItemPOJOBuilder.keepOnlyGivenObjectTypeInChildren(genericItem, ObjectTypeConstants.BUSINESS_PROVIDER);
            if (null != genericItem && !genericItem.getChildren().isEmpty())
                saveBusinessProviderDragAndDropImpl(genericItem);
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

    private void saveProviderDragAndDropImpl(GenericItem genericItem) {
        List<GenericItem> children = genericItem.getChildren();
        int length = children.size();
        for(int i=0;i<length; i++) {
            GenericItem item = children.get(i);
            ProviderInfo provider = providerInfoRepository.findOne(item.getElementId());
            if(provider == null)
                throw new ExecException("Provider not found");
            if (item.getDragged()) {
                providerInfoRepository.flush();
                Integer order = provider.getSortOrder();
                if(length != 1) {
                    if(i == 0) {
                        GenericItem nextItem = children.get(i+1);
                        ProviderInfo nextProvider = providerInfoRepository.findOne(nextItem.getElementId());
                        int nextSortOrder = nextProvider.getSortOrder();
                        int currentSortOrder = provider.getSortOrder();
                        if(currentSortOrder < nextSortOrder) {
                            providerInfoRepository.decrementSortOrderGtLt(currentSortOrder, nextSortOrder);
                            order = nextSortOrder-1;
                        } else if(currentSortOrder > nextSortOrder) {
                            providerInfoRepository.incrementSortOrderGtLt(nextSortOrder-1, currentSortOrder);
                            order = nextSortOrder;
                        }
                    } else {
                        GenericItem prevItem = children.get(i-1);
                        ProviderInfo prevProvider = providerInfoRepository.findOne(prevItem.getElementId());
                        int prevSortOrder = prevProvider.getSortOrder();
                        int currentSortOrder = provider.getSortOrder();
                        if(currentSortOrder < prevSortOrder) {
                            providerInfoRepository.decrementSortOrderGtLt(currentSortOrder, prevSortOrder+1);
                            order = prevSortOrder;
                        } else if(currentSortOrder > prevSortOrder) {
                            providerInfoRepository.incrementSortOrderGtLt(prevSortOrder, currentSortOrder);
                            order = prevSortOrder + 1;
                        }
                    }
                }
                provider = providerInfoRepository.findOne(item.getElementId());
                provider.setSortOrder(order);
                providerInfoRepository.save(provider);
            }
        }
    }

    private void saveBusinessProviderDragAndDropImpl(GenericItem genericItem) {
        List<GenericItem> children = genericItem.getChildren();
        int length = children.size();
        for(int i=0;i<length; i++) {
            GenericItem item = children.get(i);
            BusinessProvider provider = businessProviderRepository.findOne(item.getElementId());
            if(provider == null)
                throw new ExecException("Provider not found");
            if (item.getDragged()) {
                businessProviderRepository.flush();
                Integer order = provider.getSortOrder();
                if(length != 1) {
                    if(i == 0) {
                        GenericItem nextItem = children.get(i+1);
                        BusinessProvider nextProvider = businessProviderRepository.findOne(nextItem.getElementId());
                        int nextSortOrder = nextProvider.getSortOrder();
                        int currentSortOrder = provider.getSortOrder();
                        if(currentSortOrder < nextSortOrder) {
                            businessProviderRepository.decrementSortOrderGtLt(currentSortOrder, nextSortOrder);
                            order = nextSortOrder-1;
                        } else if(currentSortOrder > nextSortOrder) {
                            businessProviderRepository.incrementSortOrderGtLt(nextSortOrder-1, currentSortOrder);
                            order = nextSortOrder;
                        }
                    } else {
                        GenericItem prevItem = children.get(i-1);
                        BusinessProvider prevProvider = businessProviderRepository.findOne(prevItem.getElementId());
                        int prevSortOrder = prevProvider.getSortOrder();
                        int currentSortOrder = provider.getSortOrder();
                        if(currentSortOrder < prevSortOrder) {
                            businessProviderRepository.decrementSortOrderGtLt(currentSortOrder, prevSortOrder+1);
                            order = prevSortOrder;
                        } else if(currentSortOrder > prevSortOrder) {
                            businessProviderRepository.incrementSortOrderGtLt(prevSortOrder, currentSortOrder);
                            order = prevSortOrder + 1;
                        }
                    }
                }
                provider = businessProviderRepository.findOne(item.getElementId());
                provider.setSortOrder(order);
                businessProviderRepository.save(provider);
            }
        }
    }

    /*private void saveProviderAssetDragAndDrop(GenericItem genericItem, ProviderInfo providerInfo) {
        if (null != genericItem && null != providerInfo && (genericItem.getObjectType().equalsIgnoreCase(ObjectTypeConstants.ASSET) ||
                genericItem.getObjectType().equalsIgnoreCase(ObjectTypeConstants.BUSINESS_ASSET))) {
            Asset asset = assetRepository.findOne(genericItem.getElementId());
            if (asset != null) {
                asset.setProviderInfo(providerInfo);
                asset.setModifiedDateTime(new Date());
                assetRepository.save(asset);
            }
        }
    }*/

    /*private void saveBusinessProviderAssetDragAndDrop(GenericItem genericItem, BusinessProvider providerInfo) {
        if (null != genericItem && null != providerInfo && (genericItem.getObjectType().equalsIgnoreCase(ObjectTypeConstants.ASSET) ||
                genericItem.getObjectType().equalsIgnoreCase(ObjectTypeConstants.BUSINESS_ASSET))) {
            BusinessAsset asset = businessAssetRepository.findOne(genericItem.getElementId());
            if (asset != null) {
                asset.setBusinessProvider(providerInfo);
                asset.setModifiedDateTime(new Date());
                businessAssetRepository.save(asset);
            }
        }
    }*/

}