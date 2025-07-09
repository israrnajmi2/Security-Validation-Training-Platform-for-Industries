package com.ss.controller;


import com.ss.common.ExecException;
import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.CreateOrganizationalUnitRequest;
import com.ss.pojo.restservice.EditOrganizationalUnitRequest;
import com.ss.pojo.restservice.GenericItem;
import com.ss.pojo.restservice.OrganizationalUnitInfo;
import com.ss.repository.usermanagement.OrganizationalUnitRepository;
import com.ss.service.fullhierarchytraversal.helper.OrganizationalUnitFullHelper;
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

@RestController
@Transactional
@RequestMapping(value = "/rest/organizational_unit")
public class OrganizationalUnitController {

    @Autowired
    private OrganizationalUnitFullHelper organizationalUnitFullHelper;

    @Autowired
    private OrganizationalUnitRepository organizationalUnitRepository;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemSubtreeHelper genericItemSubtreeHelper;

    @Autowired
    private DuplicateCheckingService duplicateCheckingService;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    @RequestMapping(value = "/get_organizational_unit_dv", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getOrganizationalUnitDvWithoutShowUsers() {

        return organizationalUnitFullHelper.getOrganizationalUnitFullWithDescriptor(null, null);

    }

    @RequestMapping(value = "/get_organizational_unit_dv/{showUsers}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getOrganizationalUnitDv(@PathVariable("showUsers") Boolean showUsers) {
        if (showUsers != null && showUsers) {
            ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.SPHERIC_USER, GIMode.ALL_LINKED_ELEMENTS);
            viewDescriptor.setNextLevel(new ViewDescriptor(GIView.ROLES, GIMode.ALL_LINKED_ELEMENTS));
            return organizationalUnitFullHelper.getOrganizationalUnitFullWithDescriptor(viewDescriptor, null);
        } else {
            return organizationalUnitFullHelper.getOrganizationalUnitFullWithDescriptor(null, null);
        }
    }

    @RequestMapping(value = "/create_organizational_unit_parameter", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createSubjectParameter(@RequestBody CreateOrganizationalUnitRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.ORGANIZATIONAL_UNIT))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        OrganizationalUnit organizationalUnit = new OrganizationalUnit();

        organizationalUnit.setName(request.getName().trim());
        /*List<OrganizationalUnit> organizationalUnitsWithSameName = organizationalUnitRepository.findByNameAndIsArchivedFalse(request.getName().trim());
        if (organizationalUnitsWithSameName != null && !organizationalUnitsWithSameName.isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with name " + request.getName() + " already exist", HttpStatus.CONFLICT);*/

        organizationalUnit.setDescription(request.getDescription());


        OrganizationalUnit parentOrganizationalUnit = null;
        if (request.getParentOrganizationalUnitId() != null && !request.getParentOrganizationalUnitId().equals(0)) {
            parentOrganizationalUnit = organizationalUnitRepository.findOne(request.getParentOrganizationalUnitId());
            if (parentOrganizationalUnit == null || parentOrganizationalUnit.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Parent Organizational Unit with id " + request.getParentOrganizationalUnitId() + " not found", HttpStatus.BAD_REQUEST);
        }

        organizationalUnit.setArchived(false);
        if (parentOrganizationalUnit != null)
            organizationalUnit.setLevel(parentOrganizationalUnit.getLevel() + 1);
        else
            organizationalUnit.setLevel(1);
        organizationalUnit.setParentOrganizationalUnit(parentOrganizationalUnit);
        if (duplicateCheckingService.isDuplicateOrganizationalUnit(organizationalUnit)) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }

        organizationalUnit = organizationalUnitRepository.save(organizationalUnit);

        if (organizationalUnit == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(organizationalUnit);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_organizational_unit_subtree_dv/{objectType}/{elementId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getOrganizationalUnitSubtreeDv(@PathVariable("objectType") String objectType, @PathVariable("elementId") Integer elementId) {

        ResponseEntity<GenericItem> response = organizationalUnitFullHelper.getOrganizationalUnitFullWithDescriptor(null, null);

        GenericItem genericItem = response.getBody();
        GenericItem requiredGenericItem = genericItemSubtreeHelper.findObject(genericItem, objectType, elementId);
        if (requiredGenericItem == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Parent item with id " + elementId + " and object type " + objectType + " not found - may have been unmapped or deleted", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(requiredGenericItem, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_organizational_unit_info/{organizationalUnitId}", method = RequestMethod.GET)
    public OrganizationalUnitInfo getOrganizationalUnitInfo(@PathVariable("organizationalUnitId") Integer organizationalUnitId) {

        OrganizationalUnit organizationalUnit = organizationalUnitRepository.findOne(organizationalUnitId);
        if (organizationalUnit == null || organizationalUnit.isArchived())
            throw new ExecException("Organizational Unit with id " + organizationalUnitId + " not found");

        OrganizationalUnitInfo response = new OrganizationalUnitInfo();
        response.setDescription(organizationalUnit.getDescription());
        response.setName(organizationalUnit.getName());
        response.setElementId(organizationalUnit.getId());

        OrganizationalUnit parentOrganizationalUnit = organizationalUnit.getParentOrganizationalUnit();
        if (parentOrganizationalUnit == null) {
            response.setParentOrganizationalUnitId(0);
            response.setParentOrganizationalUnitName(null);
        } else {
            response.setParentOrganizationalUnitId(parentOrganizationalUnit.getId());
            response.setParentOrganizationalUnitName(parentOrganizationalUnit.getName());
        }
        return response;
    }

    @RequestMapping(value = "/edit_organizational_unit", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editOrganizationalUnit(@RequestBody EditOrganizationalUnitRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.ORGANIZATIONAL_UNIT))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        OrganizationalUnit organizationalUnit = organizationalUnitRepository.findOne(request.getElementId());
        if (organizationalUnit == null || organizationalUnit.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        /*List<OrganizationalUnit> organizationalUnitsWithSameName = organizationalUnitRepository.findByNameAndIsArchivedFalse(request.getName().trim());

        if (organizationalUnitsWithSameName != null && !organizationalUnitsWithSameName.isEmpty()) {
            if (!organizationalUnitsWithSameName.get(0).getId().equals(request.getElementId()))
                return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }*/
        organizationalUnit.setName(request.getName().trim());
        organizationalUnit.setDescription(request.getDescription());

        if (duplicateCheckingService.isDuplicateOrganizationalUnit(organizationalUnit)) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }

        organizationalUnit = organizationalUnitRepository.save(organizationalUnit);

        if (organizationalUnit == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(organizationalUnit);
        return new ResponseEntity(response, HttpStatus.OK);
    }

}