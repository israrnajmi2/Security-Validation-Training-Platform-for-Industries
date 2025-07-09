package com.ss.controller;


import com.ss.common.ExecException;
import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.groups.ShieldElementGroup;
import com.ss.domain.groups.ShieldElementGroupMember;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.shieldclassification.ShieldElementType;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.pojo.restservice.CreateShieldElementGroupRequest;
import com.ss.pojo.restservice.EditShieldElementGroupRequest;
import com.ss.pojo.restservice.GenericItem;
import com.ss.pojo.restservice.ShieldElementGroupInfo;
import com.ss.repository.asset.AssetDeliversSceRepository;
import com.ss.repository.asset.AssetRepository;
import com.ss.repository.asset.AssetTypeRepository;
import com.ss.repository.asset.ProviderInfoRepository;
import com.ss.repository.groups.AssetGroupRepository;
import com.ss.repository.groups.ShieldElementGroupMemberRepository;
import com.ss.repository.groups.ShieldElementGroupRepository;
import com.ss.repository.sce.SecurityControlExpressionRepository;
import com.ss.repository.shieldclassification.ShieldRepository;
import com.ss.repository.shieldclassification.ShieldTypeRepository;
import com.ss.repository.usermanagement.OrganizationalUnitRepository;
import com.ss.service.delete.DeleteHelperService;
import com.ss.service.fullhierarchytraversal.helper.AssetFullHelper;
import com.ss.service.generictraversal.GenericItemAssetGroupService;
import com.ss.service.generictraversal.GenericItemAssetService;
import com.ss.service.permissions.PermissionCheckerService;
import com.ss.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RestController
@Transactional
@RequestMapping(value = "/rest/groups")
public class GroupsController {

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
    private ShieldElementGroupRepository shieldElementGroupRepository;

    @Autowired
    private ShieldElementGroupMemberRepository shieldElementGroupMemberRepository;

    @Autowired
    private GetWithIdHelper getWithIdHelper;

    @Autowired
    private ShieldRepository shieldRepository;

    @Autowired
    private DuplicateCheckingService duplicateCheckingService;

    @Autowired
    private DeleteHelperService deleteHelperService;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    @RequestMapping(value = "/get_shield_element_groups_given_max_level/{shieldId}/{level}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getShieldElementGroupsByMaxLevel(@PathVariable("shieldId") Integer shieldId, @PathVariable("level") Integer level) {
        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_GROUP_ROOT);
        response.setElementId(0);
        Shield shield = shieldRepository.findOne(shieldId);
        if (shield == null || shield.isArchived())
            throw new ExecException("Shield with id : " + shieldId + " not found");

        List<ShieldElementType> shieldElementTypes = shield.getShieldElementTypeList();

        List<GenericItem> elementTypeGenericItemList = new ArrayList<>();
        if(level == 0) {
            // special case for cross level groups
            GenericItem elementTypeGenericItem = genericItemPOJOBuilder.buildLevelZeroGenericPOJOForShieldElementType(shield);
            List<GenericItem> childrenGroups = new ArrayList<>();
            List<ShieldElementGroup> crossLevelGroups = shieldElementGroupRepository.findByLevelAndShieldIdAndShieldElementTypeIdAndIsArchivedFalse(0, shieldId, null);
            for (ShieldElementGroup shieldElementGroup : crossLevelGroups) {
                if (shieldElementGroup != null && !shieldElementGroup.isArchived()) {
                    GenericItem childGroupGenericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElementGroup);
                    List<GenericItem> childrenGroupMembers = new ArrayList<>();
                    List<ShieldElementGroupMember> shieldElementGroupMembers = shieldElementGroup.getShieldElementGroupMembers();
                    if (shieldElementGroupMembers != null) {
                        for (ShieldElementGroupMember shieldElementGroupMember : shieldElementGroupMembers) {
                            if (!shieldElementGroupMember.isArchived())
                                childrenGroupMembers.add(genericItemPOJOBuilder.buildGenericPOJO(shieldElementGroupMember.getShieldElement()));
                        }
                    }
                    childGroupGenericItem.setChildren(childrenGroupMembers);
                    childrenGroups.add(childGroupGenericItem);
                }
            }
            elementTypeGenericItem.setChildren(childrenGroups);
            elementTypeGenericItemList.add(elementTypeGenericItem);
        }

        ShieldElementType levelOneElementType = getLevelOneElementType(shieldElementTypes);
        ShieldElementType elementType = levelOneElementType;
        while (elementType != null && (level == 0 || ((int) elementType.getLevel() <= level))) {
            GenericItem elementTypeGenericItem = genericItemPOJOBuilder.buildGenericPOJO(elementType);
            List<GenericItem> childrenGroups = new ArrayList<>();
            List<ShieldElementGroup> shieldElementGroups = elementType.getShieldElementGroups();
            for (ShieldElementGroup shieldElementGroup : shieldElementGroups) {
                if (shieldElementGroup != null && !shieldElementGroup.isArchived()) {
                    GenericItem childGroupGenericItem = genericItemPOJOBuilder.buildGenericPOJO(shieldElementGroup);
                    List<GenericItem> childrenGroupMembers = new ArrayList<>();
                    List<ShieldElementGroupMember> shieldElementGroupMembers = shieldElementGroup.getShieldElementGroupMembers();
                    if (shieldElementGroupMembers != null) {
                        for (ShieldElementGroupMember shieldElementGroupMember : shieldElementGroupMembers) {
                            if (!shieldElementGroupMember.isArchived())
                                childrenGroupMembers.add(genericItemPOJOBuilder.buildGenericPOJO(shieldElementGroupMember.getShieldElement()));
                        }
                    }
                    childGroupGenericItem.setChildren(childrenGroupMembers);
                    childrenGroups.add(childGroupGenericItem);
                }
            }
            elementTypeGenericItem.setChildren(childrenGroups);
            elementTypeGenericItemList.add(elementTypeGenericItem);
            elementType = getChildElementType(elementType);
        }
        response.setChildren(elementTypeGenericItemList);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    private ShieldElementType getLevelOneElementType(List<ShieldElementType> shieldElementTypes) {
        for (ShieldElementType shieldElementType : shieldElementTypes) {
            if (shieldElementType.getLevel().equals(1))
                return shieldElementType;
        }
        return null;
    }

    private ShieldElementType getChildElementType(ShieldElementType elementType) {
        List<ShieldElementType> elementTypeList = elementType.getChildrenShieldElementTypeList();
        if (elementTypeList != null && !elementTypeList.isEmpty()) {
            for (ShieldElementType elementType1 : elementTypeList) {
                if (elementType1 != null && !elementType1.isArchived())
                    return elementType1;
            }
        }
        return null;
    }

    @RequestMapping(value = "/create_shield_element_group", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createAsset(@RequestBody CreateShieldElementGroupRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.SHIELD_ELEMENT_GROUP))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        ShieldElementGroup shieldElementGroup = new ShieldElementGroup();

        shieldElementGroup.setName(request.getName().trim());
        shieldElementGroup.setDescription(request.getDescription());

        ShieldElementType shieldElementType = getWithIdHelper.getShieldElementType(request.getShieldElementTypeId());
        if(shieldElementType != null) {
            shieldElementGroup.setShieldElementType(shieldElementType);
            shieldElementGroup.setLevel(shieldElementType.getLevel());
        } else {
            shieldElementGroup.setShieldElementType(null);
            shieldElementGroup.setLevel(0);
        }
        Shield shield = getWithIdHelper.getShield(request.getShieldId());
        shieldElementGroup.setShield(shield);

        if (duplicateCheckingService.isDuplicateShieldElementGroup(shieldElementGroup))
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Group with Name " + request.getName() + " already exist", HttpStatus.CONFLICT);

        OrganizationalUnit organizationalUnit = null;
        if (request.getOrganizationalUnitId() != null && !request.getOrganizationalUnitId().equals(0)) {
            organizationalUnit = organizationalUnitRepository.findOne(request.getOrganizationalUnitId());
            if (organizationalUnit == null || organizationalUnit.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with id " + request.getOrganizationalUnitId() + " not found", HttpStatus.NOT_FOUND);
        }
        shieldElementGroup.setArchived(false);
        shieldElementGroup.setOrganizationalUnit(organizationalUnit);

        List<ShieldElement> shieldElements = getShieldElementsOfSameLevel(request.getGroupMemberShieldElementIds(), shieldElementType);

        shieldElementGroup = shieldElementGroupRepository.save(shieldElementGroup);

        if (shieldElementGroup == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Group Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shieldElementGroup);

        for (ShieldElement shieldElement : shieldElements) {
            ShieldElementGroupMember shieldElementGroupMember = new ShieldElementGroupMember();
            shieldElementGroupMember.setActivated(true);
            shieldElementGroupMember.setArchived(false);
            shieldElementGroupMember.setShieldElement(shieldElement);
            shieldElementGroupMember.setShieldElementGroup(shieldElementGroup);

            shieldElementGroupMember = shieldElementGroupMemberRepository.save(shieldElementGroupMember);

            if (shieldElementGroupMember == null)
                return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Group Member Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity(response, HttpStatus.OK);
    }

    private List<ShieldElement> getShieldElementsOfSameLevel(List<Integer> groupMemberShieldElementIds, ShieldElementType shieldElementType) {
        List<ShieldElement> response = new ArrayList<>();
        if (groupMemberShieldElementIds == null || groupMemberShieldElementIds.isEmpty())
            return response;

        for (Integer elementId : groupMemberShieldElementIds) {
            ShieldElement shieldElement = getWithIdHelper.getShieldElement(elementId);
            if (shieldElementType != null && !shieldElement.getShieldElementType().getId().equals(shieldElementType.getId()))
                throw new ExecException("All group members must be of same level; element with id " + elementId + " belongs to a different level; Exprected Level " + shieldElementType.getLevel()
                        + " ; found level " + shieldElement.getLevel());
            response.add(shieldElement);
        }
        return response;
    }

    @RequestMapping(value = "/edit_shield_element_group", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editShieldElementGroup(@RequestBody EditShieldElementGroupRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.SHIELD_ELEMENT_GROUP))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        ShieldElementGroup shieldElementGroup = shieldElementGroupRepository.findOne(request.getElementId());
        if (shieldElementGroup == null || shieldElementGroup.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Group with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        shieldElementGroup.setName(request.getName().trim());
        shieldElementGroup.setDescription(request.getDescription());

        if (duplicateCheckingService.isDuplicateShieldElementGroup(shieldElementGroup))
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Group with name " + request.getName() + " already exist", HttpStatus.CONFLICT);

        if (request.getOrganizationalUnitId() != null && !request.getOrganizationalUnitId().equals(0)) {
            OrganizationalUnit obj = organizationalUnitRepository.findOne(request.getOrganizationalUnitId());
            if (obj == null && obj.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with id " + request.getOrganizationalUnitId() + " not found", HttpStatus.NOT_FOUND);
            shieldElementGroup.setOrganizationalUnit(obj);
        } else
            shieldElementGroup.setOrganizationalUnit(null);

        shieldElementGroup = shieldElementGroupRepository.save(shieldElementGroup);

        if (shieldElementGroup == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Group Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        saveEditedGroupMembers(shieldElementGroup, request.getGroupMemberShieldElementIds(), shieldElementGroup.getShieldElementType());

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shieldElementGroup);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    private void saveEditedGroupMembers(ShieldElementGroup shieldElementGroup, List<Integer> groupMemberShieldElementIds, ShieldElementType shieldElementType) {
        List<ShieldElementGroupMember> existingGroupMembers = shieldElementGroup.getShieldElementGroupMembers();
        List<ShieldElementGroupMember> toDeleteFromExisting = new ArrayList<>();
        List<Integer> commonIds = new ArrayList<>();

        for (ShieldElementGroupMember groupMember : existingGroupMembers) {
            if (!groupMember.isArchived()) {
                if (!groupMemberShieldElementIds.contains(groupMember.getShieldElement().getId()))
                    toDeleteFromExisting.add(groupMember);
                else
                    commonIds.add(groupMember.getShieldElement().getId());
            }
        }
        for (ShieldElementGroupMember groupMember : toDeleteFromExisting) {
            deleteHelperService.deleteShieldElementGroupMember(groupMember);
        }

        for (Integer newMappingElementId : groupMemberShieldElementIds) {
            if (!commonIds.contains(newMappingElementId)) {
                ShieldElement shieldElement = getWithIdHelper.getShieldElement(newMappingElementId);
                if (shieldElementType != null && !shieldElement.getShieldElementType().getId().equals(shieldElementType.getId()))
                    throw new ExecException("Shield element members must all be of same level- " + shieldElementType.getLevel() + "; but found shield element of level -" + shieldElement.getLevel());
                //create new record & save.
                ShieldElementGroupMember shieldElementGroupMember = new ShieldElementGroupMember();
                shieldElementGroupMember.setActivated(true);
                shieldElementGroupMember.setArchived(false);
                shieldElementGroupMember.setShieldElement(shieldElement);
                shieldElementGroupMember.setShieldElementGroup(shieldElementGroup);

                shieldElementGroupMember = shieldElementGroupMemberRepository.save(shieldElementGroupMember);

                if (shieldElementGroupMember == null)
                    throw new ExecException("Shield Element Group Member Save to Database Failed");
            }
        }
    }

    @RequestMapping(value = "/get_shield_element_group_info/{shieldElementGroupId}", method = RequestMethod.GET)
    public ShieldElementGroupInfo getShieldElementGroupInfo(@PathVariable("shieldElementGroupId") Integer shieldElementGroupId) {

        ShieldElementGroup shieldElementGroup = shieldElementGroupRepository.findOne(shieldElementGroupId);
        if (shieldElementGroup == null || shieldElementGroup.isArchived())
            throw new ExecException("Shield Element Group with id " + shieldElementGroup + " not found");

        ShieldElementGroupInfo response = new ShieldElementGroupInfo();
        response.setDescription(shieldElementGroup.getDescription());
        response.setElementId(shieldElementGroup.getId());
        response.setName(shieldElementGroup.getName());
        response.setLevel(shieldElementGroup.getLevel());
        if (shieldElementGroup.getOrganizationalUnit() != null) {
            OrganizationalUnit organizationalUnit = shieldElementGroup.getOrganizationalUnit();
            response.setOrganizationalUnitId(organizationalUnit.getId());
            response.setOrganizationalUnitName(organizationalUnit.getName());
        } else {
            response.setOrganizationalUnitName("");
            response.setOrganizationalUnitId(0);
        }
        if(shieldElementGroup.getShieldElementType() != null) {
            response.setShieldElementTypeId(shieldElementGroup.getShieldElementType().getId());
            response.setShieldElementTypeName(shieldElementGroup.getShieldElementType().getName());
        }

        List<ShieldElementGroupMember> groupMembers = shieldElementGroup.getShieldElementGroupMembers();

        List<Integer> shieldElementGroupMemberIds = new ArrayList<>();
        if (groupMembers != null) {
            for (ShieldElementGroupMember shieldElementGroupMember : groupMembers) {
                if (!shieldElementGroupMember.isArchived())
                    shieldElementGroupMemberIds.add(shieldElementGroupMember.getShieldElement().getId());
            }
        }

        response.setShieldElementGroupMemberIds(shieldElementGroupMemberIds);
        return response;
    }
}