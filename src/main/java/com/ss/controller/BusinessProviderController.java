package com.ss.controller;


import com.ss.common.ExecException;
import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.businessasset.BusinessProvider;
import com.ss.domain.groups.BusinessProviderGroup;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.helper.IdNameObject;
import com.ss.pojo.restservice.*;
import com.ss.repository.businessasset.BusinessProviderRepository;
import com.ss.repository.groups.BusinessProviderGroupRepository;
import com.ss.repository.usermanagement.OrganizationalUnitRepository;
import com.ss.service.generictraversal.GenericItemBusinessProviderGroupService;
import com.ss.service.generictraversal.GenericItemBusinessProviderService;
import com.ss.service.permissions.PermissionCheckerService;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import com.ss.utils.IdNameObjectConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RestController
@Transactional
@RequestMapping(value = "/rest/businessprovider")
public class BusinessProviderController {

    @Autowired
    private GenericItemBusinessProviderService genericItemBusinessProviderService;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemBusinessProviderGroupService genericItemBusinessProviderGroupService;

    @Autowired
    private IdNameObjectConverter idNameObjectConverter;

    @Autowired
    private BusinessProviderGroupRepository businessProviderGroupRepository;

    @Autowired
    private BusinessProviderRepository businessProviderRepository;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private OrganizationalUnitRepository organizationalUnitRepository;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    @RequestMapping(value = "/get_providers_dv", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getProvidersDvWithOrWithoutAssetAndGroupApplied(@RequestBody ProviderDvRequest providerDvRequest) {

        List<IdNameObject> idNameObjects = null;
        if (providerDvRequest.getProviderGroupId() != null && !providerDvRequest.getProviderGroupId().equals(0)) {

            BusinessProviderGroup providerGroup = businessProviderGroupRepository.findOne(providerDvRequest.getProviderGroupId());
            if (providerGroup == null || providerGroup.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Provider Group with id : " + providerDvRequest.getProviderGroupId() + " not found", HttpStatus.NOT_FOUND);

            ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.BUSINESS_PROVIDER, GIMode.ALL_LINKED_ELEMENTS);
            PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
            perspectiveGroupInfo.setRated(false);
            perspectiveGroupInfo.setGroupFoundAndIncludeAllChildren(true);
            GenericItem genericItem = genericItemBusinessProviderGroupService.buildGenericItemForBusinessProviderGroup(providerGroup, viewDescriptor, perspectiveGroupInfo);
            idNameObjects = idNameObjectConverter.convertOnlyTopLevel(genericItem.getChildren());
        }

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);
        perspectiveGroupInfo.setGroupItems(idNameObjects);

        ViewDescriptor extraViewDescriptor = null;
        if (providerDvRequest.isShowAsset()) {
            extraViewDescriptor = new ViewDescriptor(GIView.BUSINESS_ASSET, GIMode.ALL_LINKED_ELEMENTS);
        }
        GenericItem providerRootGenericItem = handleProviderRoot(extraViewDescriptor, perspectiveGroupInfo);

        idNameObjectConverter.minifiedGenericItem(providerRootGenericItem);
        return new ResponseEntity(providerRootGenericItem, HttpStatus.OK);
    }

    public GenericItem handleProviderRoot(ViewDescriptor extraViewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        GenericItem genericItem = new GenericItem();
        genericItem.setObjectType(ObjectTypeConstants.BUSINESS_PROVIDER_ROOT);
        genericItem.setName("");
        genericItem.setElementId(0);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        List<BusinessProvider> providers = businessProviderRepository.findByIsArchivedFalse();

        if (providers != null) {
            for (BusinessProvider providerInfo : providers) {
                if (providerInfo != null && !providerInfo.isArchived()) {
                    children.add(genericItemBusinessProviderService.buildGenericItemForBusinessProvider(providerInfo, extraViewDescriptor, perspectiveGroupInfo));
                }
            }
        }
        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
        return genericItem;

    }

    @RequestMapping(value = "/get_all_provider_groups", method = RequestMethod.GET)
    public ResponseEntity<List<GenericItem>> getAllAssetGroups() {

        List<GenericItem> response = new ArrayList<>();
        List<BusinessProviderGroup> providerGroupList = businessProviderGroupRepository.findByIsArchivedFalse();

        for (BusinessProviderGroup providerGroup : providerGroupList) {
            if (providerGroup != null && !providerGroup.isArchived())
                response.add(genericItemPOJOBuilder.buildGenericPOJO(providerGroup));
        }

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_provider", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createProvider(@RequestBody CreateProviderRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.BUSINESS_PROVIDER))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        BusinessProvider providerInfo = new BusinessProvider();

        providerInfo.setName(request.getName().trim());

        List<BusinessProvider> providerInfosWithSameName = businessProviderRepository.findByNameAndIsArchivedFalse(request.getName().trim());
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

        providerInfo = businessProviderRepository.save(providerInfo);

        if (providerInfo == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Provider Info Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(providerInfo);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/edit_provider", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editProvider(@RequestBody EditProviderInfoRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.BUSINESS_PROVIDER))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        BusinessProvider providerInfo = businessProviderRepository.findOne(request.getElementId());
        if (providerInfo == null || providerInfo.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Provider with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        List<BusinessProvider> providersWithSameName = businessProviderRepository.findByNameAndIsArchivedFalse(request.getName().trim());

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

        providerInfo = businessProviderRepository.save(providerInfo);

        if (providerInfo == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Provider Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(providerInfo);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    //get provider info
    @RequestMapping(value = "/get_provider_info/{providerId}", method = RequestMethod.GET)
    public ProviderInfoResponse getProviderInfoRestService(@PathVariable("providerId") Integer providerId) {

        BusinessProvider providerInfo = businessProviderRepository.findOne(providerId);
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
}