package com.ss.controller;

import com.ss.common.ExecException;
import com.ss.constants.*;
import com.ss.domain.asset.Asset;
import com.ss.domain.asset.AssetToShieldElementMap;
import com.ss.domain.asset.AssetType;
import com.ss.domain.asset.AssetTypeToShieldElementMap;
import com.ss.domain.businessasset.BusinessAsset;
import com.ss.domain.businessasset.BusinessAssetToShieldElementMap;
import com.ss.domain.businessasset.BusinessAssetType;
import com.ss.domain.businessasset.BusinessAssetTypeToShieldElementMap;
import com.ss.domain.groups.ShieldElementGroup;
import com.ss.domain.sce.SceFulfillsShieldElement;
import com.ss.domain.sce.SecurityControlExpression;
import com.ss.domain.shieldclassification.*;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.*;
import com.ss.pojo.restservice.sce.AssetDirectMappedToShieldElementSaveRequest;
import com.ss.pojo.restservice.sce.AssetTypeDirectMappedToShieldElementSaveRequest;
import com.ss.pojo.restservice.sce.ExpressionFulfillsMappingSaveRequest;
import com.ss.pojo.restservice.sce.ShieldElementMapToShieldElementAssociationsSaveRequest;
import com.ss.repository.asset.AssetRepository;
import com.ss.repository.asset.AssetToShieldElementMapRepository;
import com.ss.repository.asset.AssetTypeRepository;
import com.ss.repository.asset.AssetTypeToShieldElementMapRepository;
import com.ss.repository.businessasset.BusinessAssetRepository;
import com.ss.repository.businessasset.BusinessAssetToShieldElementMapRepository;
import com.ss.repository.businessasset.BusinessAssetTypeRepository;
import com.ss.repository.businessasset.BusinessAssetTypeToShieldElementMapRepository;
import com.ss.repository.groups.ShieldElementGroupRepository;
import com.ss.repository.sce.SceFulfillsShieldElementRepository;
import com.ss.repository.sce.SecurityControlExpressionRepository;
import com.ss.repository.shieldclassification.*;
import com.ss.repository.usermanagement.OrganizationalUnitRepository;
import com.ss.service.fullhierarchytraversal.helper.*;
import com.ss.service.permissions.PermissionCheckerService;
import com.ss.utils.*;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.interceptor.TransactionInterceptor;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@Transactional
@RequestMapping(value = "/rest/shield")
public class ShieldController {

    @Autowired
    private ShieldTypeRepository shieldTypeRepository;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private ShieldRepository shieldRepository;

    @Autowired
    private ShieldElementRepository shieldElementRepository;

    @Autowired
    private OrganizationalUnitRepository organizationalUnitRepository;

    @Autowired
    private ShieldFullHelper shieldFullHelper;

    @Autowired
    private SecurityControlExpressionRepository securityControlExpressionRepository;

    @Autowired
    private SceFulfillsShieldElementRepository sceFulfillsShieldElementRepository;

    @Autowired
    private GenericItemSubtreeHelper genericItemSubtreeHelper;

    @Autowired
    private ShieldElementTypeRepository shieldElementTypeRepository;

    @Autowired
    private DuplicateCheckingService duplicateCheckingService;

    @Autowired
    private ShieldElementToShieldElementMapRepository shieldElementToShieldElementMapRepository;

    @Autowired
    private AssetFullHelper assetFullHelper;

    @Autowired
    private AssetToShieldElementMapRepository assetToShieldElementMapRepository;

    @Autowired
    private AssetTypeToShieldElementMapRepository assetTypeToShieldElementMapRepository;

    @Autowired
    private AssetTypeFullHelper assetTypeFullHelper;

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private AssetTypeRepository assetTypeRepository;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    @Autowired
    private GetWithIdHelper getWithIdHelper;

    @Autowired
    private BusinessAssetFullHelper businessAssetFullHelper;

    @Autowired
    private BusinessAssetTypeFullHelper businessAssetTypeFullHelper;

    @Autowired
    private BusinessAssetToShieldElementMapRepository businessAssetToShieldElementMapRepository;

    @Autowired
    private BusinessAssetTypeToShieldElementMapRepository businessAssetTypeToShieldElementMapRepository;

    @Autowired
    private BusinessAssetRepository businessAssetRepository;

    @Autowired
    private BusinessAssetTypeRepository businessAssetTypeRepository;

    @Autowired
    private LinkNameHelper linkNameHelper;

    @Autowired
    private RefIdSuggestionUtil refIdSuggestionUtil;

    @Autowired
    private ShieldCreationHelperUtil shieldCreationHelperUtil;

    @Autowired
    private LinkToPrefsRepository linkToPrefsRepository;

    @Autowired
    private ShieldElementGroupRepository shieldElementGroupRepository;

    @RequestMapping(value = "/get_shields_and_standards", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getShieldsStandardsAndBusinessFrameworks() {
        List<ShieldType> shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.SHIELD);

        if (shieldTypes == null || shieldTypes.isEmpty()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.SHIELD + " not found", HttpStatus.NOT_FOUND);
        }

        ShieldType shieldType = null;

        for (ShieldType temp : shieldTypes) {
            if (temp != null && !temp.isArchived()) {
                shieldType = temp;
                break;
            }
        }
        if (shieldType == null) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.SHIELD + " not found", HttpStatus.NOT_FOUND);
        }

        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.SHIELD_ROOT);
        response.setElementId(0);
        List<Shield> shields = shieldType.getShieldList();
        List<GenericItem> children = new ArrayList<>();
        for (Shield shield : shields) {
            if (!shield.isArchived())
                children.add(genericItemPOJOBuilder.buildGenericPOJO(shield));
        }

        shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.STANDARD);

        if (shieldTypes == null || shieldTypes.isEmpty()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.STANDARD + " not found", HttpStatus.NOT_FOUND);
        }

        shieldType = null;

        for (ShieldType temp : shieldTypes) {
            if (temp != null && !temp.isArchived()) {
                shieldType = temp;
                break;
            }
        }
        if (shieldType == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.STANDARD + " not found", HttpStatus.NOT_FOUND);

        List<Shield> standards = shieldType.getShieldList();

        for (Shield standard : standards) {
            if (!standard.isArchived())
                children.add(genericItemPOJOBuilder.buildGenericPOJO(standard));
        }

        shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.BUSINESS);

        if (shieldTypes == null || shieldTypes.isEmpty()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.BUSINESS + " not found", HttpStatus.NOT_FOUND);
        }

        shieldType = null;

        for (ShieldType temp : shieldTypes) {
            if (temp != null && !temp.isArchived()) {
                shieldType = temp;
                break;
            }
        }
        if (shieldType == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.BUSINESS + " not found", HttpStatus.NOT_FOUND);

        List<Shield> businessFrameworks = shieldType.getShieldList();

        for (Shield bFramework : businessFrameworks) {
            if (!bFramework.isArchived())
                children.add(genericItemPOJOBuilder.buildGenericPOJO(bFramework));
        }

        shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.THREAT);

        if (shieldTypes == null || shieldTypes.isEmpty()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.THREAT + " not found", HttpStatus.NOT_FOUND);
        }

        shieldType = null;

        for (ShieldType temp : shieldTypes) {
            if (temp != null && !temp.isArchived()) {
                shieldType = temp;
                break;
            }
        }
        if (shieldType == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.THREAT + " not found", HttpStatus.NOT_FOUND);

        List<Shield> threatFrameworks = shieldType.getShieldList();

        for (Shield threatFramework : threatFrameworks) {
            if (!threatFramework.isArchived())
                children.add(genericItemPOJOBuilder.buildGenericPOJO(threatFramework));
        }


        response.setChildren(children);
        return new ResponseEntity(response, HttpStatus.OK);
    }


    @RequestMapping(value = "/get_shields_of_shield_type", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getShieldsOfShieldType() {
        List<ShieldType> shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.SHIELD);

        if (shieldTypes == null || shieldTypes.isEmpty()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.SHIELD + " not found", HttpStatus.NOT_FOUND);
        }

        ShieldType shieldType = null;

        for (ShieldType temp : shieldTypes) {
            if (temp != null && !temp.isArchived()) {
                shieldType = temp;
                break;
            }
        }
        if (shieldType == null) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.SHIELD + " not found", HttpStatus.NOT_FOUND);
        }

        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.SHIELD_ROOT);
        response.setElementId(0);
        List<Shield> shields = shieldType.getShieldList();
        List<GenericItem> children = new ArrayList<>();
        for (Shield shield : shields) {
            if (!shield.isArchived())
                children.add(genericItemPOJOBuilder.buildGenericPOJO(shield));
        }
        response.setChildren(children);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_shields_of_shield_type_excluding/{elementId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getShieldsOfShieldTypeExcluding(@PathVariable("elementId") Integer elementId) {
        ShieldElement shieldElement = shieldElementRepository.findOne(elementId);
        if (shieldElement == null || shieldElement.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element with id " + elementId + " not found", HttpStatus.NOT_FOUND);
        Integer excludeShieldId = shieldElement.getShield().getId();
        List<ShieldType> shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.SHIELD);

        if (shieldTypes == null || shieldTypes.isEmpty()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.SHIELD + " not found", HttpStatus.NOT_FOUND);
        }

        ShieldType shieldType = null;

        for (ShieldType temp : shieldTypes) {
            if (temp != null && !temp.isArchived()) {
                shieldType = temp;
                break;
            }
        }
        if (shieldType == null) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.SHIELD + " not found", HttpStatus.NOT_FOUND);
        }

        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.SHIELD_ROOT);
        response.setElementId(0);
        List<Shield> shields = shieldType.getShieldList();
        List<GenericItem> children = new ArrayList<>();
        for (Shield shield : shields) {
            if (!shield.isArchived() && !shield.getId().equals(excludeShieldId))
                children.add(genericItemPOJOBuilder.buildGenericPOJO(shield));
        }
        response.setChildren(children);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_shields_and_standards_excluding/{shieldId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getShieldsAndStandardsExcluding(@PathVariable("shieldId") Integer shieldId) {
        Shield excludeShield = shieldRepository.findOne(shieldId);
        if (excludeShield == null || excludeShield.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield with id " + shieldId + " not found", HttpStatus.NOT_FOUND);

        Integer excludeShieldId = excludeShield.getId();


        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.SHIELD_ROOT);
        response.setElementId(0);
        List<Shield> shields = shieldRepository.findByIsArchivedFalse();
        List<GenericItem> children = new ArrayList<>();
        for (Shield shield : shields) {
            if (!shield.getId().equals(excludeShieldId))
                children.add(genericItemPOJOBuilder.buildGenericPOJO(shield));
        }
        response.setChildren(children);
        return new ResponseEntity(response, HttpStatus.OK);
    }


    @RequestMapping(value = "/get_shields_of_standard_type", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getShieldsOfStandardType() {
        List<ShieldType> shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.STANDARD);

        if (shieldTypes == null || shieldTypes.isEmpty()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.STANDARD + " not found", HttpStatus.NOT_FOUND);
        }

        ShieldType shieldType = null;

        for (ShieldType temp : shieldTypes) {
            if (temp != null && !temp.isArchived()) {
                shieldType = temp;
                break;
            }
        }
        if (shieldType == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.STANDARD + " not found", HttpStatus.NOT_FOUND);

        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.SHIELD_ROOT);
        response.setElementId(0);
        List<Shield> standards = shieldType.getShieldList();
        List<GenericItem> children = new ArrayList<>();
        for (Shield standard : standards) {
            if (!standard.isArchived())
                children.add(genericItemPOJOBuilder.buildGenericPOJO(standard));
        }
        response.setChildren(children);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_shields_of_standard_type_excluding/{elementId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getShieldsOfStandardTypeExcluding(@PathVariable("elementId") Integer elementId) {

        ShieldElement shieldElement = shieldElementRepository.findOne(elementId);
        if (shieldElement == null || shieldElement.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element with id " + elementId + " not found", HttpStatus.NOT_FOUND);
        Integer excludeShieldId = shieldElement.getShield().getId();

        List<ShieldType> shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.STANDARD);

        if (shieldTypes == null || shieldTypes.isEmpty()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.STANDARD + " not found", HttpStatus.NOT_FOUND);
        }

        ShieldType shieldType = null;

        for (ShieldType temp : shieldTypes) {
            if (temp != null && !temp.isArchived()) {
                shieldType = temp;
                break;
            }
        }
        if (shieldType == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.STANDARD + " not found", HttpStatus.NOT_FOUND);

        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.SHIELD_ROOT);
        response.setElementId(0);
        List<Shield> standards = shieldType.getShieldList();
        List<GenericItem> children = new ArrayList<>();
        for (Shield standard : standards) {
            if (!standard.isArchived() && !standard.getId().equals(excludeShieldId))
                children.add(genericItemPOJOBuilder.buildGenericPOJO(standard));
        }
        response.setChildren(children);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_shields_of_threat_type", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getShieldsOfThreatType() {
        List<ShieldType> shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.THREAT);

        if (shieldTypes == null || shieldTypes.isEmpty()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.THREAT + " not found", HttpStatus.NOT_FOUND);
        }

        ShieldType shieldType = null;

        for (ShieldType temp : shieldTypes) {
            if (temp != null && !temp.isArchived()) {
                shieldType = temp;
                break;
            }
        }
        if (shieldType == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.THREAT + " not found", HttpStatus.NOT_FOUND);

        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.SHIELD_ROOT);
        response.setElementId(0);
        List<Shield> threatShields = shieldType.getShieldList();
        List<GenericItem> children = new ArrayList<>();
        for (Shield threatShield : threatShields) {
            if (!threatShield.isArchived())
                children.add(genericItemPOJOBuilder.buildGenericPOJO(threatShield));
        }
        response.setChildren(children);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_shields_of_threat_type_excluding/{elementId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getShieldsOfThreatTypeExcluding(@PathVariable("elementId") Integer elementId) {

        ShieldElement shieldElement = shieldElementRepository.findOne(elementId);
        if (shieldElement == null || shieldElement.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element with id " + elementId + " not found", HttpStatus.NOT_FOUND);
        Integer excludeShieldId = shieldElement.getShield().getId();

        List<ShieldType> shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.THREAT);

        if (shieldTypes == null || shieldTypes.isEmpty()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.THREAT + " not found", HttpStatus.NOT_FOUND);
        }

        ShieldType shieldType = null;

        for (ShieldType temp : shieldTypes) {
            if (temp != null && !temp.isArchived()) {
                shieldType = temp;
                break;
            }
        }
        if (shieldType == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.THREAT + " not found", HttpStatus.NOT_FOUND);

        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.SHIELD_ROOT);
        response.setElementId(0);
        List<Shield> threatShields = shieldType.getShieldList();
        List<GenericItem> children = new ArrayList<>();
        for (Shield threatShield : threatShields) {
            if (!threatShield.isArchived() && !threatShield.getId().equals(excludeShieldId))
                children.add(genericItemPOJOBuilder.buildGenericPOJO(threatShield));
        }
        response.setChildren(children);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_shields_of_business_type", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getShieldsOfBusinessType() {
        List<ShieldType> shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.BUSINESS);

        if (shieldTypes == null || shieldTypes.isEmpty()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.BUSINESS + " not found", HttpStatus.NOT_FOUND);
        }

        ShieldType shieldType = null;

        for (ShieldType temp : shieldTypes) {
            if (temp != null && !temp.isArchived()) {
                shieldType = temp;
                break;
            }
        }
        if (shieldType == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.BUSINESS + " not found", HttpStatus.NOT_FOUND);

        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.SHIELD_ROOT);
        response.setElementId(0);
        List<Shield> businessFrameworks = shieldType.getShieldList();
        List<GenericItem> children = new ArrayList<>();
        for (Shield bFramework : businessFrameworks) {
            if (!bFramework.isArchived())
                children.add(genericItemPOJOBuilder.buildGenericPOJO(bFramework));
        }
        response.setChildren(children);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_shields_of_business_type_excluding/{elementId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getShieldsOfBusinessTypeExcluding(@PathVariable("elementId") Integer elementId) {

        ShieldElement shieldElement = shieldElementRepository.findOne(elementId);
        if (shieldElement == null || shieldElement.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element with id " + elementId + " not found", HttpStatus.NOT_FOUND);
        Integer excludeShieldId = shieldElement.getShield().getId();

        List<ShieldType> shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.BUSINESS);

        if (shieldTypes == null || shieldTypes.isEmpty()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.BUSINESS + " not found", HttpStatus.NOT_FOUND);
        }

        ShieldType shieldType = null;

        for (ShieldType temp : shieldTypes) {
            if (temp != null && !temp.isArchived()) {
                shieldType = temp;
                break;
            }
        }
        if (shieldType == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.BUSINESS + " not found", HttpStatus.NOT_FOUND);

        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.SHIELD_ROOT);
        response.setElementId(0);
        List<Shield> businessFrameworks = shieldType.getShieldList();
        List<GenericItem> children = new ArrayList<>();
        for (Shield bFramework : businessFrameworks) {
            if (!bFramework.isArchived() && !bFramework.getId().equals(excludeShieldId))
                children.add(genericItemPOJOBuilder.buildGenericPOJO(bFramework));
        }
        response.setChildren(children);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_shield_element_types/{shieldId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getShieldElementTypes(@PathVariable("shieldId") Integer shieldId) {
        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_TYPE_ROOT);
        response.setElementId(0);


        Shield shield = shieldRepository.findOne(shieldId);
        if (shield == null || shield.isArchived())
            throw new ExecException("Shield with id : " + shieldId + " not found");

        List<ShieldElementType> shieldElementTypes = shield.getShieldElementTypeList();

        ShieldElementType levelOneElementType = getLevelOneElementType(shieldElementTypes);
        ShieldElementType elementType = levelOneElementType;

        List<GenericItem> children = new ArrayList<>();

        while (elementType != null) {

            GenericItem elementTypeGenericItem = genericItemPOJOBuilder.buildGenericPOJO(elementType);
            children.add(elementTypeGenericItem);
            elementType = getChildElementType(elementType);
        }

        response.setChildren(children);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_all_shield_element_types_for_all_shields", method = RequestMethod.GET)
    public Map<Integer, ElementTypeNameAndShieldDetails> getAllShieldElementTypes() {

        Map<Integer, ElementTypeNameAndShieldDetails> response = new HashedMap();
        List<ShieldElementType> shieldElementTypeList = shieldElementTypeRepository.findByIsArchivedFalse();
        if (shieldElementTypeList != null) {
            for (ShieldElementType shieldElementType : shieldElementTypeList) {
                ElementTypeNameAndShieldDetails value = new ElementTypeNameAndShieldDetails();
                value.setElementTypeId(shieldElementType.getId());
                value.setElementTypeName(shieldElementType.getName());
                Shield shield = shieldElementType.getShield();
                value.setShieldId(shield.getId());
                value.setShieldName(shield.getName());
                ShieldType shieldType = shield.getShieldType();
                value.setShieldTypeName(shieldType.getName());
                response.put(shieldElementType.getId(), value);
            }
        }
        return response;
    }

    @RequestMapping(value = "/get_shield_element_groups_given_max_level/{shieldId}/{level}", method = RequestMethod.GET)
    public ResponseEntity<List<GenericItem>> getShieldElementGroupsByMaxLevel(@PathVariable("shieldId") Integer shieldId, @PathVariable("level") Integer level) {
        Shield shield = shieldRepository.findOne(shieldId);
        if (shield == null || shield.isArchived())
            throw new ExecException("Shield with id : " + shieldId + " not found");

        List<ShieldElementType> shieldElementTypes = shield.getShieldElementTypeList();

        List<GenericItem> response = new ArrayList<>();

        if(level == 0) {
            // special case for cross level groups
            List<ShieldElementGroup> crossLevelGroups = shieldElementGroupRepository.findByLevelAndShieldIdAndShieldElementTypeIdAndIsArchivedFalse(0, shieldId, null);
            for (ShieldElementGroup shieldElementGroup : crossLevelGroups) {
                if (shieldElementGroup != null && !shieldElementGroup.isArchived()) {
                    response.add(genericItemPOJOBuilder.buildGenericPOJO(shieldElementGroup));
                }
            }
        }

        ShieldElementType levelOneElementType = getLevelOneElementType(shieldElementTypes);
        ShieldElementType elementType = levelOneElementType;
        while (elementType != null && (level == 0 || ((int) elementType.getLevel() <= level))) {

            List<ShieldElementGroup> shieldElementGroups = elementType.getShieldElementGroups();
            for (ShieldElementGroup shieldElementGroup : shieldElementGroups) {
                if (shieldElementGroup != null && !shieldElementGroup.isArchived())
                    response.add(genericItemPOJOBuilder.buildGenericPOJO(shieldElementGroup));
            }
            elementType = getChildElementType(elementType);
        }

        return new ResponseEntity(response, HttpStatus.OK);
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

    @RequestMapping(value = "/get_allowed_levels/{shieldId}", method = RequestMethod.GET)
    public List<LevelWithLabel> getAllowedLevels(@PathVariable("shieldId") Integer shieldId) {
        Shield shield = shieldRepository.findOne(shieldId);
        if (shield == null || shield.isArchived()) {
            throw new ExecException("Shield with id : " + shieldId + " not found");
        }

        List<ShieldElementType> shieldElementTypes = shield.getShieldElementTypeList();

        ShieldElementType levelOneElementType = getLevelOneElementType(shieldElementTypes);
        ShieldElementType elementType = levelOneElementType;
        List<LevelWithLabel> response = new ArrayList<>();
        while (elementType != null) {
            LevelWithLabel levelWithLabel = new LevelWithLabel();
            levelWithLabel.setLevel(elementType.getLevel());
            levelWithLabel.setLabel(elementType.getName());
            levelWithLabel.setElementTypeId(elementType.getId());
            response.add(levelWithLabel);
            elementType = getChildElementType(elementType);
        }

        return response;
    }

    private ShieldElementType getLevelOneElementType(List<ShieldElementType> shieldElementTypes) {
        for (ShieldElementType shieldElementType : shieldElementTypes) {
            if (shieldElementType.getLevel().equals(1))
                return shieldElementType;
        }
        return null;
    }

    @RequestMapping(value = "/get_shield_dv", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getShieldDvWithOrWithoutExpression(@RequestBody ShieldDvRequest shieldDvRequest) {
        if (shieldDvRequest.isShowExpression()) {
            ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.FULFILLS);
            return shieldFullHelper.getShieldFullWithDescriptor(shieldDvRequest.getShieldId(), shieldDvRequest.getShieldElementGroupId(), viewDescriptor, null, shieldDvRequest.getLevel());
        } else {
            return shieldFullHelper.getShieldFullWithDescriptor(shieldDvRequest.getShieldId(), shieldDvRequest.getShieldElementGroupId(), null, null, shieldDvRequest.getLevel());
        }
    }

   /* @RequestMapping(value = "/get_shield_subtree", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getShieldSubtree(@RequestBody ShieldSubtreeDvRequest shieldDvRequest) {

        if (shieldDvRequest.isShowExpression()) {
            ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.EXPRESSION_TO_ELEMENT);
            ResponseEntity<GenericItem> response = shieldFullHelper.getShieldFullWithDescriptor(shieldDvRequest.getShieldId(), shieldDvRequest.getShieldElementGroupId(), viewDescriptor, shieldDvRequest.getLevel());
            GenericItem genericItem = response.getBody();
            GenericItem requiredGenericItem = genericItemSubtreeHelper.findObject(genericItem, shieldDvRequest.getObjectType(), shieldDvRequest.getElementId());
            if (requiredGenericItem == null)
                return genericItemPOJOBuilder.buildGIErrorResponse("Parent item with id " + shieldDvRequest.getElementId() + " and object type " + shieldDvRequest.getObjectType() + " not found - may have been unmapped or deleted", HttpStatus.NOT_FOUND);
            return new ResponseEntity<>(requiredGenericItem, HttpStatus.OK);

        } else {
            ResponseEntity<GenericItem> response = shieldFullHelper.getShieldFullWithDescriptor(shieldDvRequest.getShieldId(), shieldDvRequest.getShieldElementGroupId(), null, shieldDvRequest.getLevel());
            GenericItem genericItem = response.getBody();
            GenericItem requiredGenericItem = genericItemSubtreeHelper.findObject(genericItem, shieldDvRequest.getObjectType(), shieldDvRequest.getElementId());
            if (requiredGenericItem == null)
                return genericItemPOJOBuilder.buildGIErrorResponse("Parent item with id " + shieldDvRequest.getElementId() + " and object type " + shieldDvRequest.getObjectType() + " not found - may have been unmapped or deleted", HttpStatus.NOT_FOUND);
            return new ResponseEntity<>(requiredGenericItem, HttpStatus.OK);
        }
    }*/

    @RequestMapping(value = "/get_shield_map_to_dropdown2_starting_point", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getShieldFullMapToOtherStartingPoint(@RequestBody ShieldMapRequestInfo shieldMapRequestInfo) {

        ViewDescriptor viewDescriptor = null;
        ViewDescriptor extraDescriptor = null;
        switch (shieldMapRequestInfo.getDropDownTwoStartingPoint()) {
            case ObjectTypeConstants.BUSINESS_ASSET_ROOT:
                if (shieldMapRequestInfo.isDirect()) {
                    viewDescriptor = new ViewDescriptor(GIView.DIRECT_BUSINESS_ASSET, GIMode.ALL_LINKED_ELEMENTS);
                } else {
                    if (shieldMapRequestInfo.isShowDirectLinksInExpressionMode()) {//viewDescriptor has to be same as direct
                        viewDescriptor = new ViewDescriptor(GIView.DIRECT_BUSINESS_ASSET, GIMode.ALL_LINKED_ELEMENTS);
                    }
                    //below shall be extra
                    if (shieldMapRequestInfo.getDropDownTwoProtectionType() == null || shieldMapRequestInfo.getDropDownTwoProtectionType().equals(ProtectionType.COULD_AND_SHALL)) {

                        extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.FULFILLS);
                        extraDescriptor.setNextLevel(new ViewDescriptor(GIView.BUSINESS_ASSET, GIMode.ALL_LINKED_ELEMENTS));

                    } else {
                        switch (shieldMapRequestInfo.getDropDownTwoProtectionType()) {
                            case ProtectionType.COULD:
                                extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.FULFILLS);
                                extraDescriptor.setNextLevel(new ViewDescriptor(GIView.BUSINESS_ASSET, GIMode.COULD_DELIVER));
                                break;
                            case ProtectionType.SHALL:
                                extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.FULFILLS);
                                extraDescriptor.setNextLevel(new ViewDescriptor(GIView.BUSINESS_ASSET, GIMode.SHALL_DELIVER));
                                break;
                            default: {
                                return genericItemPOJOBuilder.buildGIErrorResponse("Unknown protection type : " + shieldMapRequestInfo.getDropDownTwoProtectionType(), HttpStatus.BAD_REQUEST);
                            }
                        }
                    }
                }
                break;
            case ObjectTypeConstants.ASSET_ROOT:
                if (shieldMapRequestInfo.isDirect()) {
                    viewDescriptor = new ViewDescriptor(GIView.DIRECT_ASSET, GIMode.ALL_LINKED_ELEMENTS);
                } else {
                    if (shieldMapRequestInfo.isShowDirectLinksInExpressionMode()) {//viewDescriptor has to be same as direct
                        viewDescriptor = new ViewDescriptor(GIView.DIRECT_ASSET, GIMode.ALL_LINKED_ELEMENTS);
                    }
                    //below shall be extra
                    if (shieldMapRequestInfo.getDropDownTwoProtectionType() == null || shieldMapRequestInfo.getDropDownTwoProtectionType().equals(ProtectionType.COULD_AND_SHALL)) {

                        extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.FULFILLS);
                        extraDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET, GIMode.ALL_LINKED_ELEMENTS));

                    } else {
                        switch (shieldMapRequestInfo.getDropDownTwoProtectionType()) {
                            case ProtectionType.COULD:
                                extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.FULFILLS);
                                extraDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET, GIMode.COULD_DELIVER));
                                break;
                            case ProtectionType.SHALL:
                                extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.FULFILLS);
                                extraDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET, GIMode.SHALL_DELIVER));
                                break;
                            default: {
                                return genericItemPOJOBuilder.buildGIErrorResponse("Unknown protection type : " + shieldMapRequestInfo.getDropDownTwoProtectionType(), HttpStatus.BAD_REQUEST);
                            }
                        }
                    }
                }
                break;
            case ObjectTypeConstants.ASSET_TYPE_ROOT:
                if (shieldMapRequestInfo.isDirect()) {
                    viewDescriptor = new ViewDescriptor(GIView.DIRECT_ASSET_TYPE, GIMode.ALL_LINKED_ELEMENTS);
                } else {
                    if (shieldMapRequestInfo.isShowDirectLinksInExpressionMode()) {
                        viewDescriptor = new ViewDescriptor(GIView.DIRECT_ASSET_TYPE, GIMode.ALL_LINKED_ELEMENTS);
                    }
                    if (shieldMapRequestInfo.getDropDownTwoProtectionType() == null || shieldMapRequestInfo.getDropDownTwoProtectionType().equals(ProtectionType.COULD_AND_SHALL)) {

                        extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.FULFILLS);
                        extraDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET_TYPE, GIMode.ALL_LINKED_ELEMENTS));

                    } else {
                        switch (shieldMapRequestInfo.getDropDownTwoProtectionType()) {
                            case ProtectionType.COULD:
                                extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.FULFILLS);
                                extraDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET_TYPE, GIMode.COULD_PROTECT));
                                break;
                            case ProtectionType.SHALL:
                                extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.FULFILLS);
                                extraDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET_TYPE, GIMode.SHALL_PROTECT));
                                break;
                        /*case ProtectionType.IS:
                            viewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.EXPRESSION_TO_ELEMENT);
                            viewDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET_TYPE, GIMode.PROTECT));*/
                            default: {
                                return genericItemPOJOBuilder.buildGIErrorResponse("Unknown protection type : " + shieldMapRequestInfo.getDropDownTwoProtectionType(), HttpStatus.BAD_REQUEST);
                            }
                        }
                    }
                }
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE_ROOT:
                if (shieldMapRequestInfo.isDirect()) {
                    viewDescriptor = new ViewDescriptor(GIView.DIRECT_BUSINESS_ASSET_TYPE, GIMode.ALL_LINKED_ELEMENTS);
                } else {
                    if (shieldMapRequestInfo.isShowDirectLinksInExpressionMode()) {
                        viewDescriptor = new ViewDescriptor(GIView.DIRECT_BUSINESS_ASSET_TYPE, GIMode.ALL_LINKED_ELEMENTS);
                    }
                    if (shieldMapRequestInfo.getDropDownTwoProtectionType() == null || shieldMapRequestInfo.getDropDownTwoProtectionType().equals(ProtectionType.COULD_AND_SHALL)) {

                        extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.FULFILLS);
                        extraDescriptor.setNextLevel(new ViewDescriptor(GIView.BUSINESS_ASSET_TYPE, GIMode.ALL_LINKED_ELEMENTS));

                    } else {
                        switch (shieldMapRequestInfo.getDropDownTwoProtectionType()) {
                            case ProtectionType.COULD:
                                extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.FULFILLS);
                                extraDescriptor.setNextLevel(new ViewDescriptor(GIView.BUSINESS_ASSET_TYPE, GIMode.COULD_PROTECT));
                                break;
                            case ProtectionType.SHALL:
                                extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.FULFILLS);
                                extraDescriptor.setNextLevel(new ViewDescriptor(GIView.BUSINESS_ASSET_TYPE, GIMode.SHALL_PROTECT));
                                break;
                        /*case ProtectionType.IS:
                            viewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.EXPRESSION_TO_ELEMENT);
                            viewDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET_TYPE, GIMode.PROTECT));*/
                            default: {
                                return genericItemPOJOBuilder.buildGIErrorResponse("Unknown protection type : " + shieldMapRequestInfo.getDropDownTwoProtectionType(), HttpStatus.BAD_REQUEST);
                            }
                        }
                    }
                }
                break;
            case ObjectTypeConstants.SHIELD_ROOT:
                if (shieldMapRequestInfo.isDirect()) {
                    viewDescriptor = new ViewDescriptor(GIView.DIRECT_SHIELD_ELEMENT, GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID);
                    viewDescriptor.setShieldId(shieldMapRequestInfo.getDropDownTwoShieldId());
                } else {
                    if (shieldMapRequestInfo.isShowDirectLinksInExpressionMode()) {
                        viewDescriptor = new ViewDescriptor(GIView.DIRECT_SHIELD_ELEMENT, GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID);
                        viewDescriptor.setShieldId(shieldMapRequestInfo.getDropDownTwoShieldId());
                    }
                    extraDescriptor = new ViewDescriptor(GIView.SCE, GIMode.FULFILLS);
                    ViewDescriptor shieldElementDescriptor = new ViewDescriptor(GIView.SHIELD_ELEMENT, GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID);
                    shieldElementDescriptor.setShieldId(shieldMapRequestInfo.getDropDownTwoShieldId());
                    extraDescriptor.setNextLevel(shieldElementDescriptor);
                }
                break;
            default:
                return genericItemPOJOBuilder.buildGIErrorResponse("Unsupported. Cannot map Shield to   " + shieldMapRequestInfo.getDropDownTwoStartingPoint(), HttpStatus.BAD_REQUEST);
        }

        ResponseEntity<GenericItem> responseEntity = shieldFullHelper.getShieldFullWithDescriptor(shieldMapRequestInfo.getDropDownOneShieldId(), shieldMapRequestInfo.getDropDownOneGroupId(), viewDescriptor, extraDescriptor, shieldMapRequestInfo.getDropDownOneLevelOfInterest());
        GenericItem response = responseEntity.getBody();

        Shield shield = getWithIdHelper.getShield(shieldMapRequestInfo.getDropDownOneShieldId());
        if (shield.getShieldType().getName().equals(ShieldTypeConstants.SHIELD)) {
            response.setObjectType(ObjectTypeConstants.SHIELD);
            response.setElementId(shield.getId());
            response.setName(shield.getName());
        } else if (shield.getShieldType().getName().equals(ShieldTypeConstants.STANDARD)) {
            response.setObjectType(ObjectTypeConstants.STANDARD);
            response.setElementId(shield.getId());
            response.setName(shield.getName());
        } else if (shield.getShieldType().getName().equals(ShieldTypeConstants.BUSINESS)) {
            response.setObjectType(ObjectTypeConstants.BUSINESS_FRAMEWORK);
            response.setElementId(shield.getId());
            response.setName(shield.getName());
        } else if (shield.getShieldType().getName().equals(ShieldTypeConstants.THREAT)) {
            response.setObjectType(ObjectTypeConstants.THREAT_FRAMEWORK);
            response.setElementId(shield.getId());
            response.setName(shield.getName());
        } else {
            return genericItemPOJOBuilder.buildGIErrorResponse("Unknown Shield Type : " + shield.getShieldType().getName(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*@RequestMapping(value = "/get_shield_map_to_dropdown2_starting_point_subtree", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getShieldFullMapToOtherStartingPointSubtree(@RequestBody ShieldMapSubtreeRequestInfo subtreeRequestInfo) {

        ShieldMapRequestInfo shieldMapRequestInfo = new ShieldMapRequestInfo();

        shieldMapRequestInfo.setDropDownOneGroupId(subtreeRequestInfo.getDropDownOneGroupId());
        shieldMapRequestInfo.setDropDownOneLevelOfInterest(subtreeRequestInfo.getDropDownOneLevelOfInterest());
        shieldMapRequestInfo.setDropDownOneShieldId(subtreeRequestInfo.getDropDownOneShieldId());
        shieldMapRequestInfo.setDropDownTwoProtectionType(subtreeRequestInfo.getDropDownTwoProtectionType());
        shieldMapRequestInfo.setDropDownTwoShieldId(subtreeRequestInfo.getDropDownTwoShieldId());
        shieldMapRequestInfo.setDropDownTwoStartingPoint(subtreeRequestInfo.getDropDownTwoStartingPoint());

        ResponseEntity<GenericItem> response = getShieldFullMapToOtherStartingPoint(shieldMapRequestInfo);

        GenericItem genericItem = response.getBody();
        GenericItem requiredGenericItem = genericItemSubtreeHelper.findObject(genericItem, subtreeRequestInfo.getObjectType(), subtreeRequestInfo.getElementId());
        if (requiredGenericItem == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Parent item with id " + subtreeRequestInfo.getElementId() + " and object type " + subtreeRequestInfo.getObjectType() + " not found - may have been unmapped or deleted", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(requiredGenericItem, HttpStatus.OK);
    }*/

    private StartingPointOption getSecurityAssetTypeStartingPointOption(String elementObjectType) {
        StartingPointOption assetTypeShallStartingPointOption = new StartingPointOption();
        assetTypeShallStartingPointOption.setLabel("Security Asset Type");
        assetTypeShallStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_TYPE_ROOT);
        assetTypeShallStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.ASSET_TYPE);
        assetTypeShallStartingPointOption.setLinkTypeAttr(ObjectTypeConstants.ASSET_TYPE_TO_SHIELD_ELEMENT_LINK);
        assetTypeShallStartingPointOption.setLinkNameAttr(linkNameHelper.getLinkName(elementObjectType, ObjectTypeConstants.ASSET_TYPE));
        //assetTypeShallStartingPointOption.setProtectionType(ProtectionType.SHALL);
        return assetTypeShallStartingPointOption;
    }
    private StartingPointOption getSecurityAssetTypeStartingPointOptionExpression() {
        StartingPointOption assetTypeShallStartingPointOption = new StartingPointOption();
        assetTypeShallStartingPointOption.setLabel("Security Asset Type");
        assetTypeShallStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_TYPE_ROOT);
        assetTypeShallStartingPointOption.setProtectionType(ProtectionType.SHALL);
        assetTypeShallStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.ASSET_TYPE);
        assetTypeShallStartingPointOption.setLinkTypeAttr(ObjectTypeConstants.ASSET_TYPE_TO_EXPRESSION_LINK);
        assetTypeShallStartingPointOption.setLinkNameAttr(LinkName.EXPRESSION_TO_ASSET_TYPE);
        return assetTypeShallStartingPointOption;
    }

    private StartingPointOption getSecurityAssetStartingPointOption(String elementObjectType) {
        StartingPointOption assetStartingPointOption = new StartingPointOption();
        assetStartingPointOption.setLabel("Security Asset");
        assetStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_ROOT);
        assetStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.ASSET);
        assetStartingPointOption.setLinkTypeAttr(ObjectTypeConstants.ASSET_TO_SHIELD_ELEMENT_LINK);
        assetStartingPointOption.setLinkNameAttr(linkNameHelper.getLinkName(elementObjectType, ObjectTypeConstants.ASSET));
        //assetStartingPointOption.setProtectionType(ProtectionType.SHALL);
        return assetStartingPointOption;
    }

    private StartingPointOption getSecurityAssetStartingPointOptionExpression() {
        //asset shall
        StartingPointOption assetShallStartingPointOption = new StartingPointOption();
        assetShallStartingPointOption.setLabel("Security Asset");
        assetShallStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_ROOT);
        assetShallStartingPointOption.setProtectionType(ProtectionType.SHALL);
        assetShallStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.ASSET);
        assetShallStartingPointOption.setLinkTypeAttr(ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK);
        assetShallStartingPointOption.setLinkNameAttr(LinkName.EXPRESSION_TO_ASSET);
        return assetShallStartingPointOption;
    }

    private StartingPointOption getBusinessAssetStartingPointOption(String elementObjectType) {
        StartingPointOption businessAssetStartingPointOption = new StartingPointOption();
        businessAssetStartingPointOption.setLabel("Value Asset");
        businessAssetStartingPointOption.setStartingPoint(ObjectTypeConstants.BUSINESS_ASSET_ROOT);
        businessAssetStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.BUSINESS_ASSET);
        businessAssetStartingPointOption.setLinkTypeAttr(ObjectTypeConstants.BUSINESS_ASSET_TO_SHIELD_ELEMENT_LINK);
        businessAssetStartingPointOption.setLinkNameAttr(linkNameHelper.getLinkName(elementObjectType, ObjectTypeConstants.BUSINESS_ASSET));
        return businessAssetStartingPointOption;
    }

    private StartingPointOption getBusinessAssetStartingPointOptionExpression() {
        //asset shall
        StartingPointOption businessAssetShallStartingPointOption = new StartingPointOption();
        businessAssetShallStartingPointOption.setLabel("Value Asset");
        businessAssetShallStartingPointOption.setStartingPoint(ObjectTypeConstants.BUSINESS_ASSET_ROOT);
        businessAssetShallStartingPointOption.setProtectionType(ProtectionType.SHALL);
        businessAssetShallStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.BUSINESS_ASSET);
        businessAssetShallStartingPointOption.setLinkTypeAttr(ObjectTypeConstants.BUSINESS_ASSET_TO_EXPRESSION_LINK);
        businessAssetShallStartingPointOption.setLinkNameAttr(LinkName.EXPRESSION_TO_BUSINESS_ASSET);
        return businessAssetShallStartingPointOption;
    }

    private StartingPointOption getBusinessAssetTypeStartingPointOption(String elementObjectType) {
        StartingPointOption businessAssetTypeShallStartingPointOption = new StartingPointOption();
        businessAssetTypeShallStartingPointOption.setLabel("Value Asset Type");
        businessAssetTypeShallStartingPointOption.setStartingPoint(ObjectTypeConstants.BUSINESS_ASSET_TYPE_ROOT);
        businessAssetTypeShallStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.BUSINESS_ASSET_TYPE);
        businessAssetTypeShallStartingPointOption.setLinkTypeAttr(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_SHIELD_ELEMENT_LINK);
        businessAssetTypeShallStartingPointOption.setLinkNameAttr(linkNameHelper.getLinkName(elementObjectType, ObjectTypeConstants.BUSINESS_ASSET_TYPE));
        //assetTypeShallStartingPointOption.setProtectionType(ProtectionType.SHALL);
        return businessAssetTypeShallStartingPointOption;
    }
    private StartingPointOption getBusinessAssetTypeStartingPointOptionExpression() {
        //asset type shall
        StartingPointOption businessAssetTypeShallStartingPointOption = new StartingPointOption();
        businessAssetTypeShallStartingPointOption.setLabel("Value Asset Type");
        businessAssetTypeShallStartingPointOption.setStartingPoint(ObjectTypeConstants.BUSINESS_ASSET_TYPE_ROOT);
        businessAssetTypeShallStartingPointOption.setProtectionType(ProtectionType.SHALL);
        businessAssetTypeShallStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.BUSINESS_ASSET_TYPE);
        businessAssetTypeShallStartingPointOption.setLinkTypeAttr(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_EXPRESSION_LINK);
        businessAssetTypeShallStartingPointOption.setLinkNameAttr(LinkName.EXPRESSION_TO_BUSINESS_ASSET_TYPE);
        return businessAssetTypeShallStartingPointOption;
    }

    private List<StartingPointOption> getInternalFrameworksStartingPointOption(String elementObjectType, boolean isDirect) {
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
                    shieldOption.setShieldId(shield.getId());
                    shieldOption.setObjectTypeForIcon(ObjectTypeConstants.SHIELD);
                    if (isDirect) {
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.SHIELD_ELEMENT_TO_SHIELD_ELEMENT_LINK);
                        shieldOption.setLinkNameAttr(linkNameHelper.getLinkName(elementObjectType, ObjectTypeConstants.SHIELD_ELEMENT));
                    } else {
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK);
                        shieldOption.setLinkNameAttr(LinkName.EXPRESSION_TO_ELEMENT);
                    }
                    //if(isDirect)
                    shieldOption.setLabel(shield.getName());
                    response.add(shieldOption);
                }
            }
        }
        return response;
    }

    private List<StartingPointOption> getStandardFrameworksStartingPointOption(String elementObjectType, boolean isDirect) {
        List<StartingPointOption> response = new ArrayList<>();
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
                    shieldOption.setShieldId(standard.getId());
                    shieldOption.setObjectTypeForIcon(ObjectTypeConstants.STANDARD);
                    shieldOption.setLabel(standard.getName());
                    if (isDirect) {
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.SHIELD_ELEMENT_TO_SHIELD_ELEMENT_LINK);
                        shieldOption.setLinkNameAttr(linkNameHelper.getLinkName(elementObjectType, ObjectTypeConstants.STANDARD_ELEMENT));
                    } else {
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK);
                        shieldOption.setLinkNameAttr(LinkName.EXPRESSION_TO_ELEMENT);
                    }
                    response.add(shieldOption);
                }
            }
        }

        return response;
    }

    private List<StartingPointOption> getBusinessFrameworksStartingPointOption(String elementObjectType, boolean isDirect) {
        List<StartingPointOption> response = new ArrayList<>();
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
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.SHIELD_ELEMENT_TO_SHIELD_ELEMENT_LINK);
                        shieldOption.setLinkNameAttr(linkNameHelper.getLinkName(elementObjectType, ObjectTypeConstants.BUSINESS_CONTROL));
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

    private List<StartingPointOption> getThreatFrameworksStartingPointOption(String elementObjectType, boolean isDirect) {
        List<StartingPointOption> response = new ArrayList<>();
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
                        shieldOption.setLinkTypeAttr(ObjectTypeConstants.SHIELD_ELEMENT_TO_SHIELD_ELEMENT_LINK);
                        shieldOption.setLinkNameAttr(linkNameHelper.getLinkName(elementObjectType, ObjectTypeConstants.THREAT_ELEMENT));
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

    private List<StartingPointOption> primaryLinksOnlyForShieldElement() {
        String elementObjectType = ObjectTypeConstants.SHIELD_ELEMENT;
        List<StartingPointOption> response = new ArrayList<>();
        response.add(getSecurityAssetTypeStartingPointOption(elementObjectType));
        response.add(getSecurityAssetStartingPointOption(elementObjectType));
        response.add(getBusinessAssetTypeStartingPointOption(elementObjectType));
        response.add(getBusinessAssetStartingPointOption(elementObjectType));
        response.addAll(getInternalFrameworksStartingPointOption(elementObjectType, true));
        response.addAll(getStandardFrameworksStartingPointOption(elementObjectType, true));
        return response;
    }

    private List<StartingPointOption> primaryLinksOnlyForStandardElement() {
        String elementObjectType = ObjectTypeConstants.STANDARD_ELEMENT;
        List<StartingPointOption> response = new ArrayList<>();
        response.addAll(getInternalFrameworksStartingPointOption(elementObjectType, true));
        response.addAll(getStandardFrameworksStartingPointOption(elementObjectType, true));
        return response;
    }

    private List<StartingPointOption> primaryLinksOnlyForBusinessControl() {
        String elementObjectType = ObjectTypeConstants.BUSINESS_CONTROL;
        List<StartingPointOption> response = new ArrayList<>();
        response.add(getBusinessAssetTypeStartingPointOption(elementObjectType));
        response.add(getBusinessAssetStartingPointOption(elementObjectType));
        response.addAll(getBusinessFrameworksStartingPointOption(elementObjectType, true));
        return response;
    }

    private List<StartingPointOption> primaryLinksOnlyForThreatControl() {
        String elementObjectType = ObjectTypeConstants.THREAT_ELEMENT;
        List<StartingPointOption> response = new ArrayList<>();
        response.add(getBusinessAssetTypeStartingPointOption(elementObjectType));
        response.add(getBusinessAssetStartingPointOption(elementObjectType));
        response.addAll(getThreatFrameworksStartingPointOption(elementObjectType, true));
        return response;
    }

    //get dropdown 2 starting point options.
    @RequestMapping(value = "/get_dropdown_two_options_for_shield_starting_point/{isDirect}/{elementObjectType}", method = RequestMethod.GET)
    public List<StartingPointOption> getDropdownTwoOptionsForShieldStartingPoint(@PathVariable("isDirect") Boolean isDirect, @PathVariable("elementObjectType") String elementObjectType) {

        if (isDirect == null)
            throw new ExecException("Please pass isDirect parameter in request");

        boolean primaryLinksOnly = false;
        if (permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.SHOW_PRIMARY_LINKS_ONLY))
            primaryLinksOnly = true;

        List<StartingPointOption> response = new ArrayList<>();

        if (isDirect && primaryLinksOnly) {
            switch (elementObjectType) {
                case ObjectTypeConstants.SHIELD_ELEMENT:
                    return primaryLinksOnlyForShieldElement();
                case ObjectTypeConstants.STANDARD_ELEMENT:
                    return primaryLinksOnlyForStandardElement();
                case ObjectTypeConstants.BUSINESS_CONTROL:
                    return primaryLinksOnlyForBusinessControl();
                case ObjectTypeConstants.THREAT_ELEMENT:
                    return primaryLinksOnlyForThreatControl();
                default:
                    return response;
            }
        }

        if (isDirect) {
            switch (elementObjectType) {
                case ObjectTypeConstants.SHIELD_ELEMENT:
                    response.add(getSecurityAssetTypeStartingPointOption(elementObjectType));
                    response.add(getSecurityAssetStartingPointOption(elementObjectType));
                    response.add(getBusinessAssetTypeStartingPointOption(elementObjectType));
                    response.add(getBusinessAssetStartingPointOption(elementObjectType));
                    response.addAll(getInternalFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getStandardFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getBusinessFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getThreatFrameworksStartingPointOption(elementObjectType, isDirect));
                    return response;
                case ObjectTypeConstants.STANDARD_ELEMENT:
                    response.addAll(getInternalFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.add(getSecurityAssetTypeStartingPointOption(elementObjectType));
                    response.add(getSecurityAssetStartingPointOption(elementObjectType));
                    response.add(getBusinessAssetTypeStartingPointOption(elementObjectType));
                    response.add(getBusinessAssetStartingPointOption(elementObjectType));
                    response.addAll(getStandardFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getBusinessFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getThreatFrameworksStartingPointOption(elementObjectType, isDirect));
                    return response;
                case ObjectTypeConstants.BUSINESS_CONTROL:
                    response.addAll(getThreatFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.add(getBusinessAssetTypeStartingPointOption(elementObjectType));
                    response.add(getBusinessAssetStartingPointOption(elementObjectType));
                    response.add(getSecurityAssetTypeStartingPointOption(elementObjectType));
                    response.add(getSecurityAssetStartingPointOption(elementObjectType));
                    response.addAll(getInternalFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getStandardFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getBusinessFrameworksStartingPointOption(elementObjectType, isDirect));
                    return response;
                case ObjectTypeConstants.THREAT_ELEMENT:
                    response.add(getBusinessAssetTypeStartingPointOption(elementObjectType));
                    response.add(getBusinessAssetStartingPointOption(elementObjectType));
                    response.add(getSecurityAssetTypeStartingPointOption(elementObjectType));
                    response.add(getSecurityAssetStartingPointOption(elementObjectType));
                    response.addAll(getInternalFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getStandardFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getBusinessFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getThreatFrameworksStartingPointOption(elementObjectType, isDirect));
                    return response;
                default:
                    return response;
            }
        } else {
            switch (elementObjectType) {
                case ObjectTypeConstants.SHIELD_ELEMENT:
                    response.add(getSecurityAssetTypeStartingPointOptionExpression());
                    response.add(getSecurityAssetStartingPointOptionExpression());
                    response.add(getBusinessAssetTypeStartingPointOptionExpression());
                    response.add(getBusinessAssetStartingPointOptionExpression());
                    response.addAll(getInternalFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getStandardFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getBusinessFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getThreatFrameworksStartingPointOption(elementObjectType, isDirect));
                    return response;
                case ObjectTypeConstants.STANDARD_ELEMENT:
                    response.addAll(getInternalFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.add(getSecurityAssetTypeStartingPointOptionExpression());
                    response.add(getSecurityAssetStartingPointOptionExpression());
                    response.add(getBusinessAssetTypeStartingPointOptionExpression());
                    response.add(getBusinessAssetStartingPointOptionExpression());
                    response.addAll(getStandardFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getBusinessFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getThreatFrameworksStartingPointOption(elementObjectType, isDirect));
                    return response;
                case ObjectTypeConstants.BUSINESS_CONTROL:
                    response.addAll(getThreatFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.add(getSecurityAssetTypeStartingPointOptionExpression());
                    response.add(getSecurityAssetStartingPointOptionExpression());
                    response.add(getBusinessAssetTypeStartingPointOptionExpression());
                    response.add(getBusinessAssetStartingPointOptionExpression());
                    response.addAll(getInternalFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getStandardFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getBusinessFrameworksStartingPointOption(elementObjectType, isDirect));
                    return response;
                case ObjectTypeConstants.THREAT_ELEMENT:
                    response.add(getBusinessAssetTypeStartingPointOptionExpression());
                    response.add(getBusinessAssetStartingPointOptionExpression());
                    response.add(getSecurityAssetTypeStartingPointOptionExpression());
                    response.add(getSecurityAssetStartingPointOptionExpression());
                    response.addAll(getInternalFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getStandardFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getBusinessFrameworksStartingPointOption(elementObjectType, isDirect));
                    response.addAll(getThreatFrameworksStartingPointOption(elementObjectType, isDirect));
                    return response;
                default:
                    return response;
            }

           /* // asset could
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
        }
    }


    // get fulfills associations for shield element
    @RequestMapping(value = "/get_fulfills_associations_for_shield_element/{elementId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getFulfillsAssociationsForShieldElement(@PathVariable("elementId") Integer elementId) {

        GenericItem response = new GenericItem();
        ShieldElement shieldElement = shieldElementRepository.findOne(elementId);
        if (shieldElement == null || shieldElement.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Element with id " + elementId + " not found", HttpStatus.NOT_FOUND);
        }
        List<SceFulfillsShieldElement> sceFulfillsShieldElementList = shieldElement.getSceFulfillsShieldElementList();
        Set<Integer> mappedExpressions = new HashSet<>();

        if (sceFulfillsShieldElementList != null) {
            for (SceFulfillsShieldElement mapEntry : sceFulfillsShieldElementList) {
                if (mapEntry != null && !mapEntry.isArchived()) {
                    SecurityControlExpression sce = mapEntry.getSce();
                    if (sce != null && !sce.isArchived())
                        mappedExpressions.add(sce.getId());
                }
            }
        }

        List<SecurityControlExpression> sceList = securityControlExpressionRepository.findByIsArchivedFalse();

        List<GenericItem> childrenItems = new ArrayList<>();
        for (SecurityControlExpression sce : sceList) {
            GenericItem sceGenericItem = genericItemPOJOBuilder.buildGenericPOJO(sce);
            if (mappedExpressions.contains(sceGenericItem.getElementId())) {
                sceGenericItem.setFulfillsMapped(true);
            }
            childrenItems.add(sceGenericItem);
        }
        response.setElementId(0);
        response.setObjectType(ObjectTypeConstants.SCE_ROOT);
        //Collections.sort(childrenItems, new GenericItemAlphabetComparator());
        response.setChildren(childrenItems);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_direct_shield_element_associations_for_shield_element/{elementId}/{shieldId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getDirectShieldElementAssociationsForShieldElement(@PathVariable("elementId") Integer elementId, @PathVariable("shieldId") Integer shieldId) {

        Shield shield = shieldRepository.findOne(shieldId);
        if (shield == null || shield.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield with id " + shieldId + " not found", HttpStatus.NOT_FOUND);

        GenericItem response = new GenericItem();
        ShieldElement shieldElement = shieldElementRepository.findOne(elementId);
        if (shieldElement == null || shieldElement.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Element with id " + elementId + " not found", HttpStatus.NOT_FOUND);
        }
        /*
        List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapOneList = shieldElementToShieldElementMapRepository.findByShieldElementOneIdAndShieldElementTwoShieldId(shieldElementInFocus.getId(), request.getShieldId());
        List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapTwoList = shieldElementToShieldElementMapRepository.findByShieldElementTwoIdAndShieldElementOneShieldId(shieldElementInFocus.getId(), request.getShieldId());
        */
        //List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapListOne = shieldElement.getShieldElementToShieldElementMapListOne();
        List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapListOne = shieldElementToShieldElementMapRepository.findByShieldElementOneIdAndShieldElementTwoShieldId(shieldElement.getId(), shieldId);
        Set<Integer> mappedShieldElements = new HashSet<>();

        if (shieldElementToShieldElementMapListOne != null) {
            for (ShieldElementToShieldElementMap mapEntry : shieldElementToShieldElementMapListOne) {
                if (mapEntry != null && !mapEntry.isArchived()) {
                    ShieldElement shieldElementTwo = mapEntry.getShieldElementTwo();
                    if (shieldElementTwo != null && !shieldElementTwo.isArchived())
                        mappedShieldElements.add(shieldElementTwo.getId());
                }
            }
        }

        //List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapListTwo = shieldElement.getShieldElementToShieldElementMapListTwo();
        List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapListTwo = shieldElementToShieldElementMapRepository.findByShieldElementTwoIdAndShieldElementOneShieldId(shieldElement.getId(), shieldId);
        if (shieldElementToShieldElementMapListTwo != null) {
            for (ShieldElementToShieldElementMap mapEntry : shieldElementToShieldElementMapListTwo) {
                if (mapEntry != null && !mapEntry.isArchived()) {
                    ShieldElement shieldElementOne = mapEntry.getShieldElementOne();
                    if (shieldElementOne != null && !shieldElementOne.isArchived())
                        mappedShieldElements.add(shieldElementOne.getId());
                }
            }
        }

        ResponseEntity<GenericItem> shieldDvResponseEntity = shieldFullHelper.getShieldFullWithDescriptor(shieldId, 0, null, null, 0);

        //update each genericItem with setFulfilledTrue/false
        updateSetAssociationMappedForShieldElement(shieldDvResponseEntity.getBody(), mappedShieldElements);

        return shieldDvResponseEntity;
    }

    @RequestMapping(value = "/save_direct_shield_element_associations_for_shield_element", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveFulfilledByAssociationsForExpression(@RequestBody ShieldElementMapToShieldElementAssociationsSaveRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_DIRECT_ELEMENT_MAPTO_ELEMENT_ASSOCIATION))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        ShieldElement shieldElementInFocus = shieldElementRepository.findOne(request.getShieldElementId());
        if (shieldElementInFocus == null && shieldElementInFocus.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element with id " + request.getShieldElementId() + " not found", HttpStatus.NOT_FOUND);
        }

        if (request.getShieldId() == null || request.getShieldId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("shieldId cannot be null or 0; it is a mandatory field", HttpStatus.BAD_REQUEST);
        Shield shield = shieldRepository.findOne(request.getShieldId());
        if (shield == null || shield.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("shield with id " + request.getShieldId() + " not found", HttpStatus.NOT_FOUND);

        List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapOneList = shieldElementToShieldElementMapRepository.findByShieldElementOneIdAndShieldElementTwoShieldId(shieldElementInFocus.getId(), request.getShieldId());
        List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapTwoList = shieldElementToShieldElementMapRepository.findByShieldElementTwoIdAndShieldElementOneShieldId(shieldElementInFocus.getId(), request.getShieldId());
        List<Integer> newMappings = new ArrayList<>();
        newMappings.addAll(request.getAssociatedElements());

        Map<Integer, ShieldElementToShieldElementMap> elementIdToDirectShieldElementRecordMap = polulateMapOfElementIdToShieldElementDirectMap(shieldElementToShieldElementMapOneList, shieldElementToShieldElementMapTwoList);

        for (Integer elementId : request.getAssociatedElements()) {
            if (elementIdToDirectShieldElementRecordMap.get(elementId) != null) {
                ShieldElementToShieldElementMap mapRecord = elementIdToDirectShieldElementRecordMap.get(elementId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    ShieldElementToShieldElementMap returnValue = shieldElementToShieldElementMapRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to ShieldElementToShieldElementMap Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                }
                elementIdToDirectShieldElementRecordMap.remove(elementId);
            } else {
                ShieldElementToShieldElementMap shieldElementToShieldElementMap = new ShieldElementToShieldElementMap();
                shieldElementToShieldElementMap.setArchived(false);
                shieldElementToShieldElementMap.setDefault(false);
                ShieldElement shieldElement = shieldElementRepository.findOne(elementId);
                if (shieldElement == null || shieldElement.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Element with id " + elementId + " not found", HttpStatus.NOT_FOUND);
                shieldElementToShieldElementMap.setShieldElementOne(shieldElementInFocus);
                shieldElementToShieldElementMap.setShieldElementTwo(shieldElement);
                ShieldElementToShieldElementMap returnValue = shieldElementToShieldElementMapRepository.save(shieldElementToShieldElementMap);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to ShieldElementToShieldElementMap Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        for (Map.Entry<Integer, ShieldElementToShieldElementMap> entry : elementIdToDirectShieldElementRecordMap.entrySet()) {
            ShieldElementToShieldElementMap shieldElementToShieldElementMap = entry.getValue();
            if (!shieldElementToShieldElementMap.isArchived()) {
                shieldElementToShieldElementMap.setArchived(true);
                ShieldElementToShieldElementMap returnValue = shieldElementToShieldElementMapRepository.save(shieldElementToShieldElementMap);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to ShieldElementToShieldElementMap Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    private Map<Integer, ShieldElementToShieldElementMap> polulateMapOfElementIdToShieldElementDirectMap(List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapListOne, List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapListTwo) {
        Map<Integer, ShieldElementToShieldElementMap> map = new HashMap<>();
        for (ShieldElementToShieldElementMap shieldElementToShieldElementMap : shieldElementToShieldElementMapListOne) {
            ShieldElement shieldElement = shieldElementToShieldElementMap.getShieldElementTwo();
            if (shieldElement != null && !shieldElement.isArchived()) {
                if (map.get(shieldElement.getId()) != null) {
                    if (!shieldElementToShieldElementMap.isArchived()) {
                        map.put(shieldElement.getId(), shieldElementToShieldElementMap);
                    }

                } else {
                    map.put(shieldElement.getId(), shieldElementToShieldElementMap);
                }
            }
        }

        for (ShieldElementToShieldElementMap shieldElementToShieldElementMap : shieldElementToShieldElementMapListTwo) {
            ShieldElement shieldElement = shieldElementToShieldElementMap.getShieldElementOne();
            if (shieldElement != null && !shieldElement.isArchived()) {
                if (map.get(shieldElement.getId()) != null) {
                    if (!shieldElementToShieldElementMap.isArchived()) {
                        map.put(shieldElement.getId(), shieldElementToShieldElementMap);
                    }

                } else {
                    map.put(shieldElement.getId(), shieldElementToShieldElementMap);
                }
            }
        }
        return map;
    }

    private void updateSetAssociationMappedForShieldElement(GenericItem genericItem, Set<Integer> mappedShieldElements) {
        if (genericItem != null) {
            if ((genericItem.getObjectType().equals(ObjectTypeConstants.SHIELD_ELEMENT)
                    || genericItem.getObjectType().equals(ObjectTypeConstants.STANDARD_ELEMENT)
                    || genericItem.getObjectType().equals(ObjectTypeConstants.BUSINESS_CONTROL)
                    || genericItem.getObjectType().equals(ObjectTypeConstants.THREAT_ELEMENT))
                    && mappedShieldElements.contains(genericItem.getElementId()))
                genericItem.setAssociationMapped(true);
        }
        if (genericItem.getChildren() != null) {
            for (GenericItem child : genericItem.getChildren()) {
                updateSetAssociationMappedForShieldElement(child, mappedShieldElements);
            }
        }
    }

    @RequestMapping(value = "/get_direct_asset_associations_for_shield_element/{elementId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getDirectAssetAssociationsForElement(@PathVariable("elementId") Integer elementId) {

        ShieldElement shieldElement = shieldElementRepository.findOne(elementId);
        if (shieldElement == null || shieldElement.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Element with id " + elementId + " not found", HttpStatus.NOT_FOUND);
        }


        List<AssetToShieldElementMap> assetToShieldElementMapList = shieldElement.getAssetToShieldElementMapList();
        Set<Integer> mappedAssets = new HashSet<>();

        if (assetToShieldElementMapList != null) {
            for (AssetToShieldElementMap mapEntry : assetToShieldElementMapList) {
                if (mapEntry != null && !mapEntry.isArchived()) {
                    Asset asset = mapEntry.getAsset();
                    if (asset != null && !asset.isArchived()) {
                        mappedAssets.add(asset.getId());
                    }
                }
            }
        }

        ResponseEntity<GenericItem> assetDvResponseEntity = assetFullHelper.getAssetFullWithDescriptor(0, null, null);

        //update each genericItem with setProtectionType shall or could
        updateSetAssociationMappedForAsset(assetDvResponseEntity.getBody(), mappedAssets);

        return assetDvResponseEntity;
    }

    private void updateSetAssociationMappedForAsset(GenericItem genericItem, Set<Integer> mappedAssets) {
        if (genericItem != null) {
            if (genericItem.getObjectType().equals(ObjectTypeConstants.ASSET) && mappedAssets.contains(genericItem.getElementId()))
                genericItem.setAssociationMapped(true);
        }
        if (genericItem.getChildren() != null) {
            for (GenericItem child : genericItem.getChildren()) {
                updateSetAssociationMappedForAsset(child, mappedAssets);
            }
        }
    }

    @RequestMapping(value = "/get_business_asset_associations_for_shield_element/{elementId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getBusinessAssetAssociationsForElement(@PathVariable("elementId") Integer elementId) {

        ShieldElement shieldElement = shieldElementRepository.findOne(elementId);
        if (shieldElement == null || shieldElement.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Element with id " + elementId + " not found", HttpStatus.NOT_FOUND);
        }


        List<BusinessAssetToShieldElementMap> businessAssetToShieldElementMapList = shieldElement.getBusinessAssetToShieldElementMapList();
        Set<Integer> mappedAssets = new HashSet<>();

        if (businessAssetToShieldElementMapList != null) {
            for (BusinessAssetToShieldElementMap mapEntry : businessAssetToShieldElementMapList) {
                if (mapEntry != null && !mapEntry.isArchived()) {
                    BusinessAsset asset = mapEntry.getBusinessAsset();
                    if (asset != null && !asset.isArchived()) {
                        mappedAssets.add(asset.getId());
                    }
                }
            }
        }

        ResponseEntity<GenericItem> assetDvResponseEntity = businessAssetFullHelper.getAssetFullWithDescriptor(0, null, null);

        //update each genericItem with setProtectionType shall or could
        updateSetAssociationMappedForBusinessAsset(assetDvResponseEntity.getBody(), mappedAssets);

        return assetDvResponseEntity;
    }

    private void updateSetAssociationMappedForBusinessAsset(GenericItem genericItem, Set<Integer> mappedAssets) {
        if (genericItem != null) {
            if (genericItem.getObjectType().equals(ObjectTypeConstants.BUSINESS_ASSET) && mappedAssets.contains(genericItem.getElementId()))
                genericItem.setAssociationMapped(true);
        }
        if (genericItem.getChildren() != null) {
            for (GenericItem child : genericItem.getChildren()) {
                updateSetAssociationMappedForBusinessAsset(child, mappedAssets);
            }
        }
    }

    @RequestMapping(value = "/get_direct_asset_type_associations_for_shield_element/{elementId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getDirectAssetTypeAssociationsForElement(@PathVariable("elementId") Integer elementId) {

        ShieldElement shieldElement = shieldElementRepository.findOne(elementId);
        if (shieldElement == null || shieldElement.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Element with id " + elementId + " not found", HttpStatus.NOT_FOUND);
        }


        List<AssetTypeToShieldElementMap> assetTypeToShieldElementMapList = shieldElement.getAssetTypeToShieldElementMapList();
        Set<Integer> mappedAssetTypes = new HashSet<>();

        if (assetTypeToShieldElementMapList != null) {
            for (AssetTypeToShieldElementMap mapEntry : assetTypeToShieldElementMapList) {
                if (mapEntry != null && !mapEntry.isArchived()) {
                    AssetType assetType = mapEntry.getAssetType();
                    if (assetType != null && !assetType.isArchived()) {
                        mappedAssetTypes.add(assetType.getId());
                    }
                }
            }
        }

        ResponseEntity<GenericItem> assetTypeDvResponseEntity = assetTypeFullHelper.getAssetTypeFullWithDescriptor(0, null, null, 0);

        //update each genericItem with setProtectionType shall or could
        updateSetAssociationMappedForAssetType(assetTypeDvResponseEntity.getBody(), mappedAssetTypes);

        return assetTypeDvResponseEntity;
    }

    private void updateSetAssociationMappedForAssetType(GenericItem genericItem, Set<Integer> mappedAssetTypes) {
        if (genericItem != null) {
            if (genericItem.getObjectType().equals(ObjectTypeConstants.ASSET_TYPE) && mappedAssetTypes.contains(genericItem.getElementId()))
                genericItem.setAssociationMapped(true);
        }
        if (genericItem.getChildren() != null) {
            for (GenericItem child : genericItem.getChildren()) {
                updateSetAssociationMappedForAssetType(child, mappedAssetTypes);
            }
        }
    }

    @RequestMapping(value = "/get_business_asset_type_associations_for_shield_element/{elementId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getBusinessAssetTypeAssociationsForElement(@PathVariable("elementId") Integer elementId) {

        ShieldElement shieldElement = shieldElementRepository.findOne(elementId);
        if (shieldElement == null || shieldElement.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Element with id " + elementId + " not found", HttpStatus.NOT_FOUND);
        }


        List<BusinessAssetTypeToShieldElementMap> assetTypeToShieldElementMapList = shieldElement.getBusinessAssetTypeToShieldElementMapList();
        Set<Integer> mappedAssetTypes = new HashSet<>();

        if (assetTypeToShieldElementMapList != null) {
            for (BusinessAssetTypeToShieldElementMap mapEntry : assetTypeToShieldElementMapList) {
                if (mapEntry != null && !mapEntry.isArchived()) {
                    BusinessAssetType assetType = mapEntry.getBusinessAssetType();
                    if (assetType != null && !assetType.isArchived()) {
                        mappedAssetTypes.add(assetType.getId());
                    }
                }
            }
        }

        ResponseEntity<GenericItem> assetTypeDvResponseEntity = businessAssetTypeFullHelper.getAssetTypeFullWithDescriptor(0, null, null, 0);

        //update each genericItem with setProtectionType shall or could
        updateSetAssociationMappedForBusinessAssetType(assetTypeDvResponseEntity.getBody(), mappedAssetTypes);

        return assetTypeDvResponseEntity;
    }

    private void updateSetAssociationMappedForBusinessAssetType(GenericItem genericItem, Set<Integer> mappedAssetTypes) {
        if (genericItem != null) {
            if (genericItem.getObjectType().equals(ObjectTypeConstants.BUSINESS_ASSET_TYPE) && mappedAssetTypes.contains(genericItem.getElementId()))
                genericItem.setAssociationMapped(true);
        }
        if (genericItem.getChildren() != null) {
            for (GenericItem child : genericItem.getChildren()) {
                updateSetAssociationMappedForBusinessAssetType(child, mappedAssetTypes);
            }
        }
    }

    @RequestMapping(value = "/save_direct_asset_associations_for_shield_element", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveDirectAssetAssociationsToShieldElement(@RequestBody AssetDirectMappedToShieldElementSaveRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_DIRECT_ASSET_IMPLEMENTS_ELEMENT_ASSOCIATION))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        ShieldElement shieldElement = shieldElementRepository.findOne(request.getShieldElementId());
        if (shieldElement == null && shieldElement.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element with id " + request.getShieldElementId() + " not found", HttpStatus.NOT_FOUND);
        }
        List<AssetToShieldElementMap> assetToShieldElementMapList = shieldElement.getAssetToShieldElementMapList();

        Set<Integer> newMappings = new HashSet<>();
        newMappings.addAll(new HashSet(request.getAssociatedAssets()));

        Map<Integer, AssetToShieldElementMap> assetIdToAlreadyAssociatedDirectElementLinkRecordMap = polulateMapOfAssetIdToDirectElementLinkRecord(assetToShieldElementMapList);

        for (Integer assetId : request.getAssociatedAssets()) {
            if (assetIdToAlreadyAssociatedDirectElementLinkRecordMap.get(assetId) != null) {
                AssetToShieldElementMap mapRecord = assetIdToAlreadyAssociatedDirectElementLinkRecordMap.get(assetId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    AssetToShieldElementMap returnValue = assetToShieldElementMapRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetToShieldElementMap Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                }
                assetIdToAlreadyAssociatedDirectElementLinkRecordMap.remove(assetId);
            } else {
                AssetToShieldElementMap newAssetToShieldElementMapEntry = new AssetToShieldElementMap();
                newAssetToShieldElementMapEntry.setArchived(false);
                Asset asset = assetRepository.findOne(assetId);
                if (asset == null || asset.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Asset with id " + assetId + " not found", HttpStatus.NOT_FOUND);
                newAssetToShieldElementMapEntry.setShieldElement(shieldElement);
                newAssetToShieldElementMapEntry.setAsset(asset);
                newAssetToShieldElementMapEntry.setDefault(false);
                AssetToShieldElementMap returnValue = assetToShieldElementMapRepository.save(newAssetToShieldElementMapEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetToShieldElementMap Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


        for (Map.Entry<Integer, AssetToShieldElementMap> entry : assetIdToAlreadyAssociatedDirectElementLinkRecordMap.entrySet()) {
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

    private Map<Integer, AssetToShieldElementMap> polulateMapOfAssetIdToDirectElementLinkRecord(List<AssetToShieldElementMap> assetToShieldElementMapList) {
        Map<Integer, AssetToShieldElementMap> map = new HashMap<>();
        for (AssetToShieldElementMap assetToShieldElementMap : assetToShieldElementMapList) {
            Asset asset = assetToShieldElementMap.getAsset();
            if (asset != null && !asset.isArchived()) {
                if (map.get(asset.getId()) != null) {
                    if (!assetToShieldElementMap.isArchived()) {
                        map.put(asset.getId(), assetToShieldElementMap);
                    }
                } else {
                    map.put(asset.getId(), assetToShieldElementMap);
                }
            }
        }
        return map;
    }

    @RequestMapping(value = "/save_business_asset_associations_for_shield_element", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveBusinessAssetAssociationsToShieldElement(@RequestBody AssetDirectMappedToShieldElementSaveRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_BUSINESS_ASSET_TO_ELEMENT_ASSOCIATION))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        ShieldElement shieldElement = shieldElementRepository.findOne(request.getShieldElementId());
        if (shieldElement == null && shieldElement.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element with id " + request.getShieldElementId() + " not found", HttpStatus.NOT_FOUND);
        }
        List<BusinessAssetToShieldElementMap> assetToShieldElementMapList = shieldElement.getBusinessAssetToShieldElementMapList();

        Set<Integer> newMappings = new HashSet<>();
        newMappings.addAll(new HashSet(request.getAssociatedAssets()));

        Map<Integer, BusinessAssetToShieldElementMap> assetIdToAlreadyAssociatedDirectElementLinkRecordMap = polulateMapOfAssetIdToDirectElementLinkRecordForBusinessAsset(assetToShieldElementMapList);

        for (Integer assetId : request.getAssociatedAssets()) {
            if (assetIdToAlreadyAssociatedDirectElementLinkRecordMap.get(assetId) != null) {
                BusinessAssetToShieldElementMap mapRecord = assetIdToAlreadyAssociatedDirectElementLinkRecordMap.get(assetId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    BusinessAssetToShieldElementMap returnValue = businessAssetToShieldElementMapRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetToShieldElementMap Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                }
                assetIdToAlreadyAssociatedDirectElementLinkRecordMap.remove(assetId);
            } else {
                BusinessAssetToShieldElementMap newAssetToShieldElementMapEntry = new BusinessAssetToShieldElementMap();
                newAssetToShieldElementMapEntry.setArchived(false);
                BusinessAsset asset = businessAssetRepository.findOne(assetId);
                if (asset == null || asset.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Business Asset with id " + assetId + " not found", HttpStatus.NOT_FOUND);
                newAssetToShieldElementMapEntry.setShieldElement(shieldElement);
                newAssetToShieldElementMapEntry.setBusinessAsset(asset);
                newAssetToShieldElementMapEntry.setDefault(false);
                BusinessAssetToShieldElementMap returnValue = businessAssetToShieldElementMapRepository.save(newAssetToShieldElementMapEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetToShieldElementMap Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


        for (Map.Entry<Integer, BusinessAssetToShieldElementMap> entry : assetIdToAlreadyAssociatedDirectElementLinkRecordMap.entrySet()) {
            BusinessAssetToShieldElementMap assetToShieldElementMap = entry.getValue();
            if (!assetToShieldElementMap.isArchived()) {
                assetToShieldElementMap.setArchived(true);
                BusinessAssetToShieldElementMap returnValue = businessAssetToShieldElementMapRepository.save(assetToShieldElementMap);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetToShieldElementMap Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    private Map<Integer, BusinessAssetToShieldElementMap> polulateMapOfAssetIdToDirectElementLinkRecordForBusinessAsset(List<BusinessAssetToShieldElementMap> assetToShieldElementMapList) {
        Map<Integer, BusinessAssetToShieldElementMap> map = new HashMap<>();
        for (BusinessAssetToShieldElementMap assetToShieldElementMap : assetToShieldElementMapList) {
            BusinessAsset asset = assetToShieldElementMap.getBusinessAsset();
            if (asset != null && !asset.isArchived()) {
                if (map.get(asset.getId()) != null) {
                    if (!assetToShieldElementMap.isArchived()) {
                        map.put(asset.getId(), assetToShieldElementMap);
                    }
                } else {
                    map.put(asset.getId(), assetToShieldElementMap);
                }
            }
        }
        return map;
    }

    @RequestMapping(value = "/save_direct_asset_type_associations_for_shield_element", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveDirectAssetTypeToShieldElementAssociations(@RequestBody AssetTypeDirectMappedToShieldElementSaveRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_DIRECT_ASSET_TYPE_SECURED_BY_ELEMENT_ASSOCIATION))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        ShieldElement shieldElement = shieldElementRepository.findOne(request.getShieldElementId());
        if (shieldElement == null && shieldElement.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element with id " + request.getShieldElementId() + " not found", HttpStatus.NOT_FOUND);
        }
        List<AssetTypeToShieldElementMap> assetTypeToShieldElementMapList = shieldElement.getAssetTypeToShieldElementMapList();

        Set<Integer> newMappings = new HashSet<>();
        newMappings.addAll(new HashSet(request.getAssociatedAssetTypes()));

        Map<Integer, AssetTypeToShieldElementMap> assetTypeIdToAlreadyAssociatedDirectElementLinkRecordMap = polulateMapOfAssetTypeIdToDirectElementLinkRecord(assetTypeToShieldElementMapList);

        for (Integer assetTypeId : request.getAssociatedAssetTypes()) {
            if (assetTypeIdToAlreadyAssociatedDirectElementLinkRecordMap.get(assetTypeId) != null) {
                AssetTypeToShieldElementMap mapRecord = assetTypeIdToAlreadyAssociatedDirectElementLinkRecordMap.get(assetTypeId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    AssetTypeToShieldElementMap returnValue = assetTypeToShieldElementMapRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeToShieldElementMap Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                }
                assetTypeIdToAlreadyAssociatedDirectElementLinkRecordMap.remove(assetTypeId);
            } else {
                AssetTypeToShieldElementMap newAssetTypeToShieldElementMapEntry = new AssetTypeToShieldElementMap();
                newAssetTypeToShieldElementMapEntry.setArchived(false);
                AssetType assetType = assetTypeRepository.findOne(assetTypeId);
                if (assetType == null || assetType.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("AssetType with id " + assetTypeId + " not found", HttpStatus.NOT_FOUND);
                newAssetTypeToShieldElementMapEntry.setShieldElement(shieldElement);
                newAssetTypeToShieldElementMapEntry.setAssetType(assetType);
                newAssetTypeToShieldElementMapEntry.setDefault(false);
                AssetTypeToShieldElementMap returnValue = assetTypeToShieldElementMapRepository.save(newAssetTypeToShieldElementMapEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeToShieldElementMap Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


        for (Map.Entry<Integer, AssetTypeToShieldElementMap> entry : assetTypeIdToAlreadyAssociatedDirectElementLinkRecordMap.entrySet()) {
            AssetTypeToShieldElementMap assetTypeToShieldElementMap = entry.getValue();
            if (!assetTypeToShieldElementMap.isArchived()) {
                assetTypeToShieldElementMap.setArchived(true);
                AssetTypeToShieldElementMap returnValue = assetTypeToShieldElementMapRepository.save(assetTypeToShieldElementMap);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeToShieldElementMap Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    private Map<Integer, AssetTypeToShieldElementMap> polulateMapOfAssetTypeIdToDirectElementLinkRecord(List<AssetTypeToShieldElementMap> assetTypeToShieldElementMapList) {
        Map<Integer, AssetTypeToShieldElementMap> map = new HashMap<>();
        for (AssetTypeToShieldElementMap assetTypeToShieldElementMap : assetTypeToShieldElementMapList) {
            AssetType assetType = assetTypeToShieldElementMap.getAssetType();
            if (assetType != null && !assetType.isArchived()) {
                if (map.get(assetType.getId()) != null) {
                    if (!assetTypeToShieldElementMap.isArchived()) {
                        map.put(assetType.getId(), assetTypeToShieldElementMap);
                    }
                } else {
                    map.put(assetType.getId(), assetTypeToShieldElementMap);
                }
            }
        }
        return map;
    }

    @RequestMapping(value = "/save_business_asset_type_associations_for_shield_element", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveBusinessAssetTypeToShieldElementAssociations(@RequestBody AssetTypeDirectMappedToShieldElementSaveRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_BUSINESS_ASSET_TYPE_TO_ELEMENT_ASSOCIATION))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        ShieldElement shieldElement = shieldElementRepository.findOne(request.getShieldElementId());
        if (shieldElement == null && shieldElement.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element with id " + request.getShieldElementId() + " not found", HttpStatus.NOT_FOUND);
        }
        List<BusinessAssetTypeToShieldElementMap> assetTypeToShieldElementMapList = shieldElement.getBusinessAssetTypeToShieldElementMapList();

        Set<Integer> newMappings = new HashSet<>();
        newMappings.addAll(new HashSet(request.getAssociatedAssetTypes()));

        Map<Integer, BusinessAssetTypeToShieldElementMap> assetTypeIdToAlreadyAssociatedDirectElementLinkRecordMap = polulateMapOfAssetTypeIdToDirectElementLinkRecordForBusinessAssetType(assetTypeToShieldElementMapList);

        for (Integer assetTypeId : request.getAssociatedAssetTypes()) {
            if (assetTypeIdToAlreadyAssociatedDirectElementLinkRecordMap.get(assetTypeId) != null) {
                BusinessAssetTypeToShieldElementMap mapRecord = assetTypeIdToAlreadyAssociatedDirectElementLinkRecordMap.get(assetTypeId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    BusinessAssetTypeToShieldElementMap returnValue = businessAssetTypeToShieldElementMapRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetTypeToShieldElementMap Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                }
                assetTypeIdToAlreadyAssociatedDirectElementLinkRecordMap.remove(assetTypeId);
            } else {
                BusinessAssetTypeToShieldElementMap newAssetTypeToShieldElementMapEntry = new BusinessAssetTypeToShieldElementMap();
                newAssetTypeToShieldElementMapEntry.setArchived(false);
                BusinessAssetType assetType = businessAssetTypeRepository.findOne(assetTypeId);
                if (assetType == null || assetType.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Business AssetType with id " + assetTypeId + " not found", HttpStatus.NOT_FOUND);
                newAssetTypeToShieldElementMapEntry.setShieldElement(shieldElement);
                newAssetTypeToShieldElementMapEntry.setBusinessAssetType(assetType);
                newAssetTypeToShieldElementMapEntry.setDefault(false);
                BusinessAssetTypeToShieldElementMap returnValue = businessAssetTypeToShieldElementMapRepository.save(newAssetTypeToShieldElementMapEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetTypeToShieldElementMap Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


        for (Map.Entry<Integer, BusinessAssetTypeToShieldElementMap> entry : assetTypeIdToAlreadyAssociatedDirectElementLinkRecordMap.entrySet()) {
            BusinessAssetTypeToShieldElementMap assetTypeToShieldElementMap = entry.getValue();
            if (!assetTypeToShieldElementMap.isArchived()) {
                assetTypeToShieldElementMap.setArchived(true);
                BusinessAssetTypeToShieldElementMap returnValue = businessAssetTypeToShieldElementMapRepository.save(assetTypeToShieldElementMap);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetTypeToShieldElementMap Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    private Map<Integer, BusinessAssetTypeToShieldElementMap> polulateMapOfAssetTypeIdToDirectElementLinkRecordForBusinessAssetType(List<BusinessAssetTypeToShieldElementMap> assetTypeToShieldElementMapList) {
        Map<Integer, BusinessAssetTypeToShieldElementMap> map = new HashMap<>();
        for (BusinessAssetTypeToShieldElementMap assetTypeToShieldElementMap : assetTypeToShieldElementMapList) {
            BusinessAssetType assetType = assetTypeToShieldElementMap.getBusinessAssetType();
            if (assetType != null && !assetType.isArchived()) {
                if (map.get(assetType.getId()) != null) {
                    if (!assetTypeToShieldElementMap.isArchived()) {
                        map.put(assetType.getId(), assetTypeToShieldElementMap);
                    }
                } else {
                    map.put(assetType.getId(), assetTypeToShieldElementMap);
                }
            }
        }
        return map;
    }

    @RequestMapping(value = "/save_expression_fulfills_associations_to_shield_element", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveExpressionFulfillsAssociationsToShieldElement(@RequestBody ExpressionFulfillsMappingSaveRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_ELEMENT_FULFILLED_BY_EXPRESSION_ASSOCIATION))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        ShieldElement shieldElement = shieldElementRepository.findOne(request.getElementId());
        if (shieldElement == null && shieldElement.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Element with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);
        }
        List<SceFulfillsShieldElement> sceFulfillsShieldElementList = shieldElement.getSceFulfillsShieldElementList();

        List<Integer> newMappings = new ArrayList<>();
        newMappings.addAll(request.getAssociatedExpressions());

        Map<Integer, SceFulfillsShieldElement> expressionIdToFulfillsRecordMap = polulateMapOfExpressionIdToFulfillsRecord(sceFulfillsShieldElementList);

        for (Integer expressionId : request.getAssociatedExpressions()) {
            if (expressionIdToFulfillsRecordMap.get(expressionId) != null) {
                SceFulfillsShieldElement mapRecord = expressionIdToFulfillsRecordMap.get(expressionId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    SceFulfillsShieldElement returnValue = sceFulfillsShieldElementRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to SceFulfillsShieldElementMap Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                }
                expressionIdToFulfillsRecordMap.remove(expressionId);
            } else {
                SceFulfillsShieldElement newFulfillsEntry = new SceFulfillsShieldElement();
                newFulfillsEntry.setArchived(false);
                newFulfillsEntry.setDefault(false);
                SecurityControlExpression expression = securityControlExpressionRepository.findOne(expressionId);
                if (expression == null || expression.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Expression with id " + expressionId + " not found", HttpStatus.NOT_FOUND);
                newFulfillsEntry.setSce(expression);
                newFulfillsEntry.setShieldElement(shieldElement);
                SceFulfillsShieldElement returnValue = sceFulfillsShieldElementRepository.save(newFulfillsEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to SceFulfillsShieldElementMap Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        for (Map.Entry<Integer, SceFulfillsShieldElement> entry : expressionIdToFulfillsRecordMap.entrySet()) {
            SceFulfillsShieldElement sceFulfillsShieldElement = entry.getValue();
            if (!sceFulfillsShieldElement.isArchived()) {
                sceFulfillsShieldElement.setArchived(true);
                SceFulfillsShieldElement returnValue = sceFulfillsShieldElementRepository.save(sceFulfillsShieldElement);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to SceFulfillsShieldElementMap Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    private Map<Integer, SceFulfillsShieldElement> polulateMapOfExpressionIdToFulfillsRecord(List<SceFulfillsShieldElement> sceFulfillsShieldElementList) {
        Map<Integer, SceFulfillsShieldElement> map = new HashMap<>();
        for (SceFulfillsShieldElement fulfillsEntry : sceFulfillsShieldElementList) {
            SecurityControlExpression sce = fulfillsEntry.getSce();
            if (sce != null && !sce.isArchived()) {
                if (map.get(sce.getId()) != null) {
                    if (!fulfillsEntry.isArchived()) {
                        map.put(sce.getId(), fulfillsEntry);
                    }

                } else {
                    map.put(sce.getId(), fulfillsEntry);
                }
            }
        }
        return map;
    }

    @RequestMapping(value = "/create_shield", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createShield(@RequestBody CreateShieldRequest request) {

        /*
        create shield .. to check if I have permissions..
        Map<UserId, RoleId>
            will have to update this when user is created or role change happens. or when role is deleted
        Map<RoleId, <CorePermissions, MiscellaneousPermissions>> maintained in permissions checker service.. then things will work fine.
            Will have to update this whenever role permissions are modified. ! or when role is deleted.
         */
        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.SHIELD))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        Shield shield = new Shield();
        shield.setName(request.getName().trim());

        List<ShieldType> shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.SHIELD);

        if (shieldTypes == null || shieldTypes.isEmpty()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.SHIELD + " not found", HttpStatus.NOT_FOUND);
        }

        ShieldType shieldType = null;

        for (ShieldType temp : shieldTypes) {
            if (temp != null && !temp.isArchived()) {
                shieldType = temp;
                break;
            }
        }
        if (shieldType == null) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.SHIELD + " not found", HttpStatus.NOT_FOUND);
        }

        shield.setShieldType(shieldType);

        List<Shield> shieldsWithSameName = shieldRepository.findByNameAndShieldTypeIdAndIsArchivedFalse(request.getName().trim(), shieldType.getId());

        if (shieldsWithSameName != null && !shieldsWithSameName.isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield with name " + request.getName() + " already exist", HttpStatus.CONFLICT);

        shield.setArchived(false);
        shield.setAuthor(request.getAuthor());
        shield.setDefault(false);
        shield.setDescription(request.getDescription());
        shield.setVersion(request.getVersion());
        shield.setAcronym(request.getAcronym());

        shield = shieldRepository.save(shield);

        if (shield == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        // creating 7 levels by default.
        ShieldElementType parentShieldElementType = null;
        for(int i=1;i<=7;i++) {
            parentShieldElementType = shieldCreationHelperUtil.createShieldElementType("Level " + i, "", parentShieldElementType, true, shield);
        }

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shield);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    //get shield element info
    @RequestMapping(value = "/get_shield_info/{shieldId}", method = RequestMethod.GET)
    public ShieldInfo getShieldInfo(@PathVariable("shieldId") Integer shieldId) {

        Shield shield = shieldRepository.findOne(shieldId);
        if (shield == null || shield.isArchived())
            throw new ExecException("Shield with id " + shieldId + " not found");

        ShieldInfo response = new ShieldInfo();
        response.setDescription(shield.getDescription());
        response.setElementId(shield.getId());

        response.setName(shield.getName());

        response.setAuthor(shield.getAuthor());
        response.setVersion(shield.getVersion());
        response.setAcronym(shield.getAcronym());
        response.setShieldTypeId(shield.getShieldType().getId());
        response.setShieldTypeName(shield.getShieldType().getName());

        return response;
    }

    @RequestMapping(value = "/edit_shield", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editShield(@RequestBody EditShieldRequest request) {

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        if (request.getShieldTypeName() == null ||
                !(request.getShieldTypeName().equals(ShieldTypeConstants.SHIELD)
                        || request.getShieldTypeName().equals(ShieldTypeConstants.STANDARD)
                        || request.getShieldTypeName().equals(ShieldTypeConstants.BUSINESS)
                        || request.getShieldTypeName().equals(ShieldTypeConstants.THREAT))
        ) {
            return genericItemPOJOBuilder.buildGIErrorResponse("ShieldTypeName is mandatory field and must be one of " + ShieldTypeConstants.SHIELD + " (or) " + ShieldTypeConstants.STANDARD + " (or) " + ShieldTypeConstants.BUSINESS + " (or) " + ShieldTypeConstants.THREAT, HttpStatus.BAD_REQUEST);
        }

        List<ShieldType> shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(request.getShieldTypeName());
        if (shieldTypes == null || shieldTypes.size() == 0)
            return genericItemPOJOBuilder.buildGIErrorResponse("ShieldType with name " + request.getShieldTypeName() + " not found in database", HttpStatus.NOT_FOUND);

        ShieldType shieldType = shieldTypes.get(0);

        Shield shield = shieldRepository.findOne(request.getElementId());
        if (shield == null || shield.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        /*
        checking permissions
         */
        if (shield.getShieldType().getName().equals(ShieldTypeConstants.SHIELD)) {
            if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.SHIELD))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        } else if (shield.getShieldType().getName().equals(ShieldTypeConstants.STANDARD)) {
            if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.STANDARD))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        } else if (shield.getShieldType().getName().equals(ShieldTypeConstants.BUSINESS)) {
            if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.BUSINESS_FRAMEWORK))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        } else if (shield.getShieldType().getName().equals(ShieldTypeConstants.THREAT)) {
            if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.THREAT_FRAMEWORK))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        }


        List<Shield> shieldsWithSameName = shieldRepository.findByNameAndShieldTypeIdAndIsArchivedFalse(request.getName().trim(), shield.getShieldType().getId());

        if (shieldsWithSameName != null && !shieldsWithSameName.isEmpty()) {
            if (!shieldsWithSameName.get(0).getId().equals(request.getElementId()))
                return genericItemPOJOBuilder.buildGIErrorResponse("Shield with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }
        shield.setName(request.getName().trim());
        shield.setDescription(request.getDescription());

        shield.setVersion(request.getVersion());
        shield.setAuthor(request.getAuthor());

        shield.setAcronym(request.getAcronym());
        shield.setShieldType(shieldType);
        shield = shieldRepository.save(shield);

        if (shield == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shield);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_standard", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createStandard(@RequestBody CreateShieldRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.STANDARD))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        Shield shield = new Shield();
        shield.setName(request.getName().trim());

        List<ShieldType> shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.STANDARD);

        if (shieldTypes == null || shieldTypes.isEmpty()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.STANDARD + " not found", HttpStatus.NOT_FOUND);
        }

        ShieldType shieldType = null;

        for (ShieldType temp : shieldTypes) {
            if (temp != null && !temp.isArchived()) {
                shieldType = temp;
                break;
            }
        }
        if (shieldType == null) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.STANDARD + " not found", HttpStatus.NOT_FOUND);
        }

        shield.setShieldType(shieldType);

        List<Shield> shieldsWithSameName = shieldRepository.findByNameAndShieldTypeIdAndIsArchivedFalse(request.getName().trim(), shieldType.getId());

        if (shieldsWithSameName != null && !shieldsWithSameName.isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Standard with name " + request.getName() + " already exist", HttpStatus.CONFLICT);

        shield.setArchived(false);
        shield.setAuthor(request.getAuthor());
        shield.setDefault(false);
        shield.setDescription(request.getDescription());
        shield.setVersion(request.getVersion());
        shield.setAcronym(request.getAcronym());
        shield = shieldRepository.save(shield);

        if (shield == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Standard Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        // creating 7 levels by default.
        ShieldElementType parentShieldElementType = null;
        for(int i=1;i<=7;i++) {
            parentShieldElementType = shieldCreationHelperUtil.createShieldElementType("Level " + i, "", parentShieldElementType, true, shield);
        }

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shield);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_business_framework", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createBusinessFramework(@RequestBody CreateShieldRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.BUSINESS_FRAMEWORK))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        Shield shield = new Shield();
        shield.setName(request.getName().trim());

        List<ShieldType> shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.BUSINESS);

        if (shieldTypes == null || shieldTypes.isEmpty()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.BUSINESS + " not found", HttpStatus.NOT_FOUND);
        }

        ShieldType shieldType = null;

        for (ShieldType temp : shieldTypes) {
            if (temp != null && !temp.isArchived()) {
                shieldType = temp;
                break;
            }
        }
        if (shieldType == null) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.BUSINESS + " not found", HttpStatus.NOT_FOUND);
        }

        shield.setShieldType(shieldType);

        List<Shield> shieldsWithSameName = shieldRepository.findByNameAndShieldTypeIdAndIsArchivedFalse(request.getName().trim(), shieldType.getId());

        if (shieldsWithSameName != null && !shieldsWithSameName.isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Business Framework with name " + request.getName() + " already exist", HttpStatus.CONFLICT);

        shield.setArchived(false);
        shield.setAuthor(request.getAuthor());
        shield.setDefault(false);
        shield.setDescription(request.getDescription());
        shield.setVersion(request.getVersion());
        shield.setAcronym(request.getAcronym());
        shield = shieldRepository.save(shield);

        if (shield == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Business Framework Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        // creating 7 levels by default.
        ShieldElementType parentShieldElementType = null;
        for(int i=1;i<=7;i++) {
            parentShieldElementType = shieldCreationHelperUtil.createShieldElementType("Level " + i, "", parentShieldElementType, true, shield);
        }

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shield);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_threat_framework", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createThreatFramework(@RequestBody CreateShieldRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.THREAT_FRAMEWORK))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        Shield shield = new Shield();
        shield.setName(request.getName().trim());

        List<ShieldType> shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.THREAT);

        if (shieldTypes == null || shieldTypes.isEmpty()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.THREAT + " not found", HttpStatus.NOT_FOUND);
        }

        ShieldType shieldType = null;

        for (ShieldType temp : shieldTypes) {
            if (temp != null && !temp.isArchived()) {
                shieldType = temp;
                break;
            }
        }
        if (shieldType == null) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Type : " + ShieldTypeConstants.THREAT + " not found", HttpStatus.NOT_FOUND);
        }

        shield.setShieldType(shieldType);

        List<Shield> shieldsWithSameName = shieldRepository.findByNameAndShieldTypeIdAndIsArchivedFalse(request.getName().trim(), shieldType.getId());

        if (shieldsWithSameName != null && !shieldsWithSameName.isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Threat Framework with name " + request.getName() + " already exist", HttpStatus.CONFLICT);

        shield.setArchived(false);
        shield.setAuthor(request.getAuthor());
        shield.setDefault(false);
        shield.setDescription(request.getDescription());
        shield.setVersion(request.getVersion());
        shield.setAcronym(request.getAcronym());
        shield = shieldRepository.save(shield);

        if (shield == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Threat Framework Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        // creating 7 levels by default.
        ShieldElementType parentShieldElementType = null;
        for(int i=1;i<=7;i++) {
            parentShieldElementType = shieldCreationHelperUtil.createShieldElementType("Level " + i, "", parentShieldElementType, true, shield);
        }

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shield);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_shield_element_type", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createShieldElementType(@RequestBody CreateShieldElementTypeRequest request) {

        ShieldElementType shieldElementType = new ShieldElementType();
        shieldElementType.setName(request.getName().trim());

        shieldElementType.setArchived(false);
        shieldElementType.setDefault(false);
        shieldElementType.setDescription(request.getDescription());

        Shield shield = null;
        if (request.getParentElementTypeId() == null || request.getParentElementTypeId().equals(0)) {
            shieldElementType.setParentShieldElementType(null);
            shieldElementType.setLevel(1);
            shield = shieldRepository.findOne(request.getShieldId());
            if (shield == null || shield.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Shield with id " + request.getShieldId() + " not found", HttpStatus.NOT_FOUND);
            shieldElementType.setShield(shield);
        } else {
            ShieldElementType parentElementType = shieldElementTypeRepository.findOne(request.getParentElementTypeId());
            if (parentElementType == null || parentElementType.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("ElementType with id " + request.getParentElementTypeId() + " not found", HttpStatus.NOT_FOUND);
            shieldElementType.setParentShieldElementType(parentElementType);
            shieldElementType.setLevel(parentElementType.getLevel() + 1);
            shield = parentElementType.getShield();
            shieldElementType.setShield(shield);
        }

        /*
            permission check
         */
        if (shield.getShieldType().equals(ShieldTypeConstants.SHIELD)) {
            if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.SHIELD_ELEMENT_TYPE))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        } else if (shield.getShieldType().equals(ShieldTypeConstants.STANDARD)) {
            if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.STANDARD_ELEMENT_TYPE))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        } else if (shield.getShieldType().equals(ShieldTypeConstants.BUSINESS)) {
            if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.BUSINESS_CONTROL_TYPE))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        } else if (shield.getShieldType().equals(ShieldTypeConstants.THREAT)) {
            if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.THREAT_ELEMENT_TYPE))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        }

        //check for duplicate name
        List<ShieldElementType> elementTypesWithSameName = shieldElementTypeRepository.findByNameAndShieldIdAndIsArchivedFalse(request.getName().trim(), shield.getId());

        if (elementTypesWithSameName != null && !elementTypesWithSameName.isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Type with name " + request.getName() + " already exist", HttpStatus.CONFLICT);

        shieldElementType.setMappableToSce(request.isMappableToExpression());

        shieldElementType = shieldElementTypeRepository.save(shieldElementType);
        if (shieldElementType == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Type Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shieldElementType);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    //get shield element info
    @RequestMapping(value = "/get_shield_element_type_info/{shieldElementTypeId}", method = RequestMethod.GET)
    public ShieldElementTypeInfo getShieldElementTypeInfo(@PathVariable("shieldElementTypeId") Integer shieldElementTypeId) {

        ShieldElementType shieldElementType = shieldElementTypeRepository.findOne(shieldElementTypeId);
        if (shieldElementType == null || shieldElementType.isArchived())
            throw new ExecException("Element Type with id " + shieldElementTypeId + " not found");
        ShieldElementTypeInfo response = new ShieldElementTypeInfo();
        response.setDescription(shieldElementType.getDescription());

        response.setElementId(shieldElementType.getId());

        response.setName(shieldElementType.getName());

        ShieldElementType parentShieldElementType = shieldElementType.getParentShieldElementType();
        if (parentShieldElementType == null || parentShieldElementType.isArchived()) {
            response.setParentElementTypeId(0);
            response.setParentElementTypeName(null);
        } else {

            response.setParentElementTypeId(parentShieldElementType.getId());
            response.setParentElementTypeName(parentShieldElementType.getName());
        }

        Shield shield = shieldElementType.getShield();
        response.setShieldId(shield.getId());
        response.setShieldName(shield.getName());

        response.setMappableToExpression(shieldElementType.isMappableToSce());
        return response;
    }

    @RequestMapping(value = "/edit_shield_element_type", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editShieldElementType(@RequestBody EditShieldElementTypeRequest request) {
        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        ShieldElementType shieldElementType = shieldElementTypeRepository.findOne(request.getElementId());
        if (shieldElementType == null || shieldElementType.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Type with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        if (shieldElementType.getShield().getShieldType().getName().equals(ShieldTypeConstants.SHIELD)) {
            if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.SHIELD_ELEMENT_TYPE))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        } else if (shieldElementType.getShield().getShieldType().getName().equals(ShieldTypeConstants.STANDARD)) {
            if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.STANDARD_ELEMENT_TYPE))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        } else if (shieldElementType.getShield().getShieldType().getName().equals(ShieldTypeConstants.BUSINESS)) {
            if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.BUSINESS_CONTROL_TYPE))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        } else if (shieldElementType.getShield().getShieldType().getName().equals(ShieldTypeConstants.THREAT)) {
            if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.THREAT_ELEMENT_TYPE))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        }

        //check for duplicate name
        List<ShieldElementType> elementTypesWithSameName = shieldElementTypeRepository.findByNameAndShieldIdAndIsArchivedFalse(request.getName().trim(), shieldElementType.getShield().getId());


        if (elementTypesWithSameName != null && !elementTypesWithSameName.isEmpty()) {
            if (!elementTypesWithSameName.get(0).getId().equals(request.getElementId()))
                return genericItemPOJOBuilder.buildGIErrorResponse("Element Type with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }

        shieldElementType.setName(request.getName().trim());
        shieldElementType.setDescription(request.getDescription());
        shieldElementType.setMappableToSce(request.isMappableToExpression());

        shieldElementType = shieldElementTypeRepository.save(shieldElementType);

        if (shieldElementType == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Type Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shieldElementType);
        return new ResponseEntity(response, HttpStatus.OK);
    }


    @RequestMapping(value = "/create_shield_element", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createShieldElement(@RequestBody CreateShieldElementRequest request) {

        if (request.getShieldId() == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield id is null in the request", HttpStatus.BAD_REQUEST);

        Shield shield = shieldRepository.findOne(request.getShieldId());
        if (shield == null || shield.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield with id " + request.getShieldId() + " not found", HttpStatus.NOT_FOUND);

        if (shield.getShieldType().getName().equals(ShieldTypeConstants.SHIELD)) {
            if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.SHIELD_ELEMENT))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        } else if (shield.getShieldType().getName().equals(ShieldTypeConstants.STANDARD)) {
            if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.STANDARD_ELEMENT))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        } else if (shield.getShieldType().getName().equals(ShieldTypeConstants.BUSINESS)) {
            if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.BUSINESS_CONTROL))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        } else if (shield.getShieldType().getName().equals(ShieldTypeConstants.THREAT)) {
            if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.THREAT_ELEMENT))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        }

        ShieldElement shieldElement = new ShieldElement();

        shieldElement.setName(request.getName().trim());

        shieldElement.setDescription(request.getDescription());

        ShieldElement parentShieldElement = null;
        if (request.getParentElementId() != null && !request.getParentElementId().equals(0)) {
            parentShieldElement = shieldElementRepository.findOne(request.getParentElementId());
            if (parentShieldElement == null || parentShieldElement.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Parent element with id " + request.getParentElementId() + " not found", HttpStatus.NOT_FOUND);
        }

        shieldElement.setParentShieldElement(parentShieldElement);

        if (duplicateCheckingService.isDuplicateShieldElementName(shieldElement, shield)) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Element with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }

        ShieldElementType shieldElementType = null;
        if (parentShieldElement != null) {
            List<ShieldElementType> shieldElementTypes = parentShieldElement.getShieldElementType().getChildrenShieldElementTypeList();

            if (shieldElementTypes == null || shieldElementTypes.isEmpty())
                return genericItemPOJOBuilder.buildGIErrorResponse("Element with Element Type " + parentShieldElement.getShieldElementType().getName() + " cannot have children", HttpStatus.FORBIDDEN);

            for (ShieldElementType temp : shieldElementTypes) {
                if (temp != null && !temp.isArchived()) {
                    shieldElementType = temp;
                    break;
                }
            }
            if (shieldElementType == null)
                return genericItemPOJOBuilder.buildGIErrorResponse("Element with Element Type " + parentShieldElement.getShieldElementType().getName() + " cannot have children", HttpStatus.FORBIDDEN);


        } else {
            shieldElementType = getLevelOneElementType(shield.getShieldElementTypeList());
            if (shieldElementType == null || shieldElementType.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Level One Element Type Not found for shield with id " + request.getShieldId() + " ; not allowed to create child", HttpStatus.FORBIDDEN);

        }

        shieldElement.setShieldElementType(shieldElementType);
        OrganizationalUnit organizationalUnit = null;

        if (request.getOrganizationalUnitId() != null && !request.getOrganizationalUnitId().equals(0)) {
            organizationalUnit = organizationalUnitRepository.findOne(request.getOrganizationalUnitId());
            if (organizationalUnit == null)
                return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with id " + request.getOrganizationalUnitId() + " not found", HttpStatus.FORBIDDEN);
        }
        shieldElement.setOrganizationalUnit(organizationalUnit);
        shieldElement.setLevel(shieldElementType.getLevel());
        shieldElement.setDefault(false);
        shieldElement.setArchived(false);
        shieldElement.setShield(shieldElementType.getShield());
        shieldElement.setAbbreviation(request.getReferenceId());

        shieldElement = shieldElementRepository.save(shieldElement);

        if (shieldElement == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shieldElement);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/edit_shield_element", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editShieldElement(@RequestBody EditShieldElementRequest request) {
        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        ShieldElement shieldElement = shieldElementRepository.findOne(request.getElementId());
        if (shieldElement == null || shieldElement.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);


        if (shieldElement.getShield().getShieldType().getName().equals(ShieldTypeConstants.SHIELD)) {
            if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.SHIELD_ELEMENT))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        } else if (shieldElement.getShield().getShieldType().getName().equals(ShieldTypeConstants.STANDARD)) {
            if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.STANDARD_ELEMENT))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        } else if (shieldElement.getShield().getShieldType().getName().equals(ShieldTypeConstants.BUSINESS)) {
            if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.BUSINESS_CONTROL))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        } else if (shieldElement.getShield().getShieldType().getName().equals(ShieldTypeConstants.THREAT)) {
            if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.THREAT_ELEMENT))
                return genericItemPOJOBuilder.buildAccessDeniedResponse();
        }
        /*List<ShieldElement> shieldElementsWithSameName = shieldElementRepository.findByNameAndShieldIdAndIsArchivedFalse(request.getName().trim(), shieldElement.getShield().getId());

        if (shieldElementsWithSameName != null && !shieldElementsWithSameName.isEmpty()) {
            if (!shieldElementsWithSameName.get(0).getId().equals(request.getElementId()))
                return genericItemPOJOBuilder.buildGIErrorResponse("Element with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }*/
        shieldElement.setName(request.getName().trim());
        shieldElement.setDescription(request.getDescription());

        if (duplicateCheckingService.isDuplicateShieldElementName(shieldElement, shieldElement.getShield()))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element with name " + request.getName() + " already exist", HttpStatus.CONFLICT);

        if (request.getOrganizationalUnitId() != null && !request.getOrganizationalUnitId().equals(0)) {
            OrganizationalUnit obj = organizationalUnitRepository.findOne(request.getOrganizationalUnitId());
            if (obj == null && obj.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with id " + request.getOrganizationalUnitId() + " not found", HttpStatus.NOT_FOUND);
            shieldElement.setOrganizationalUnit(obj);
        } else
            shieldElement.setOrganizationalUnit(null);

        shieldElement.setAbbreviation(request.getReferenceId());

        shieldElement = shieldElementRepository.save(shieldElement);

        if (shieldElement == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shieldElement);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    //get shield element info
    @RequestMapping(value = "/get_shield_element_info/{shieldElementId}", method = RequestMethod.GET)
    public ShieldElementInfo getShieldElementInfo(@PathVariable("shieldElementId") Integer shieldElementId) {

        ShieldElement shieldElement = shieldElementRepository.findOne(shieldElementId);
        if (shieldElement == null || shieldElement.isArchived())
            throw new ExecException("Shield Element with id " + shieldElementId + " not found");
        ShieldElementInfo response = new ShieldElementInfo();
        response.setDescription(shieldElement.getDescription());
        response.setElementId(shieldElement.getId());

        ShieldElementType shieldElementType = shieldElement.getShieldElementType();
        response.setElementTypeId(shieldElementType.getId());
        response.setElementTypeName(shieldElementType.getName());

        response.setName(shieldElement.getName());

        OrganizationalUnit organizationalUnit = shieldElement.getOrganizationalUnit();
        if (organizationalUnit == null) {
            response.setOrganizationalUnitId(0);
            response.setOrganizationalUnitName(null);
        } else {
            response.setOrganizationalUnitId(organizationalUnit.getId());
            response.setOrganizationalUnitName(organizationalUnit.getName());
        }

        ShieldElement parentShieldElement = shieldElement.getParentShieldElement();
        if (parentShieldElement == null || parentShieldElement.isArchived()) {
            response.setParentElementId(0);
            response.setParentElementName(null);
        } else {

            response.setParentElementId(parentShieldElement.getId());
            response.setParentElementName(parentShieldElement.getName());
            ShieldElementType parentElementType = parentShieldElement.getShieldElementType();
            response.setParentElementTypeId(parentElementType.getId());
            response.setParentElementTypeName(parentElementType.getName());
        }

        response.setReferenceId(shieldElement.getAbbreviation());
        Shield shield = shieldElement.getShield();
        response.setShieldId(shield.getId());
        response.setShieldName(shield.getName());
        response.setRefIdSuggestion(refIdSuggestionUtil.getRefIdSuggestion(shieldElement, shield));
        return response;
    }

    @RequestMapping(value = "/get_types_that_can_have_create_shield_element_hotlink/{shieldId}", method = RequestMethod.GET)
    public ResponseEntity<List<CanHaveCreateChildShieldElementHotlink>> getTypesThatCanHaveCreateSEHotlink(@PathVariable("shieldId") Integer shieldId) {
        List<CanHaveCreateChildShieldElementHotlink> response = new ArrayList<>();

        Shield shield = shieldRepository.findOne(shieldId);
        if (shield == null || shield.isArchived())
            throw new ExecException("Shield with Id " + shield + " not found");

        ShieldType shieldType = shield.getShieldType();
        if (shieldType == null)
            throw new ExecException("Shield Type is null for shield with id " + shieldId);
        String shieldTypeName = shieldType.getName();
        if (shieldTypeName == null)
            throw new ExecException("Shield Type name is null for shield with id " + shieldId);
        String elementObjectType = null;
        String elementLabel = "";
        if (shieldTypeName.equals(ShieldTypeConstants.STANDARD)) {
            elementObjectType = ObjectTypeConstants.STANDARD_ELEMENT;
            elementLabel = "External Policy";
        } else if (shieldTypeName.equals(ShieldTypeConstants.SHIELD)) {
            elementObjectType = ObjectTypeConstants.SHIELD_ELEMENT;
            elementLabel = " Internal Policy";
        } else if (shieldTypeName.equals(ShieldTypeConstants.BUSINESS)) {
            elementObjectType = ObjectTypeConstants.BUSINESS_CONTROL;
            elementLabel = "Value Process";
        } else if (shieldTypeName.equals(ShieldTypeConstants.THREAT)) {
            elementObjectType = ObjectTypeConstants.THREAT_ELEMENT;
            elementLabel = "Threat Vector";
        } else
            throw new ExecException("Unknown Shield Type " + shieldTypeName);

        List<ShieldElementType> shieldElementTypes = shield.getShieldElementTypeList();

        ShieldElementType levelOne = null;
        if (shieldElementTypes != null && !shieldElementTypes.isEmpty()) {
            for (ShieldElementType elementType : shieldElementTypes) {
                if (elementType != null && !elementType.isArchived() && elementType.getLevel().equals(1)) {
                    levelOne = elementType;
                    break;
                }
            }
        }
        if (levelOne != null) {
            CanHaveCreateChildShieldElementHotlink root = new CanHaveCreateChildShieldElementHotlink();
            root.setObjectType(ObjectTypeConstants.SHIELD_ELEMENT_ROOT);
            //root.setCanHaveCreateChildShieldElementHotlink(true);
            //root.setLabel("Create Level 1 " + levelOne.getName() + " " + elementLabel);
            root.setLabel("Create Level 1 " + elementLabel);
            root.setChildElementType(levelOne.getName());
            response.add(root);
            ShieldElementType parentElementType = levelOne;
            ShieldElementType childElementType = getChildElementType(levelOne);
            while (childElementType != null) {
                CanHaveCreateChildShieldElementHotlink obj = new CanHaveCreateChildShieldElementHotlink();
                obj.setObjectType(elementObjectType);
                //obj.setCanHaveCreateChildShieldElementHotlink(true);
                obj.setShieldElementTypeId(parentElementType.getId());
                obj.setShieldElementTypeName(parentElementType.getName());
                obj.setLabel("Create Child " + childElementType.getName() + " " + elementLabel);
                obj.setChildElementType(childElementType.getName());
                response.add(obj);
                parentElementType = childElementType;
                childElementType = getChildElementType(parentElementType);
            }
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_schema_info_of_all_shields_and_standards", method = RequestMethod.GET)
    public ResponseEntity<ResponseObj> getSchemaInfoOfAllShieldsAndStandards() {
        ResponseObj responseObj = new ResponseObj();

        Map<Integer, ShieldSchema> shieldSchemaMap = new HashMap<>();
        Map<Integer, ElementTypeSchema> elementTypeSchemaMap = new HashMap<>();


        List<Shield> shields = shieldRepository.findByIsArchivedFalse();
        if (shields != null) {
            for (Shield shield : shields) {
                if (shield != null) {
                    ShieldSchema shieldSchema = new ShieldSchema();
                    List<Integer> elementTypeIds = new ArrayList<>();

                    List<ShieldElementType> shieldElementTypeList = shield.getShieldElementTypeList();
                    if (shieldElementTypeList != null) {
                        for (ShieldElementType shieldElementType : shieldElementTypeList) {
                            if (shieldElementType != null && !shieldElementType.isArchived()) {
                                elementTypeIds.add(shieldElementType.getId());
                                ElementTypeSchema elementTypeSchema = new ElementTypeSchema();
                                elementTypeSchema.setElementTypeName(shieldElementType.getName());
                                elementTypeSchema.setShieldId(shield.getId());
                                elementTypeSchema.setElementTypeId(shieldElementType.getId());
                                elementTypeSchema.setLevel(shieldElementType.getLevel());
                                elementTypeSchemaMap.put(shieldElementType.getId(), elementTypeSchema);
                            }
                        }
                    }
                    shieldSchema.setElementTypeIds(elementTypeIds);
                    shieldSchema.setShieldId(shield.getId());
                    shieldSchema.setShieldName(shield.getName());
                    shieldSchema.setShieldTypeName(shield.getShieldType().getName());
                    shieldSchema.setAcronym(shield.getAcronym());
                    shieldSchemaMap.put(shield.getId(), shieldSchema);
                }
            }
        }

        responseObj.setElementTypeInfoMap(elementTypeSchemaMap);
        responseObj.setShieldInfoMap(shieldSchemaMap);
        return new ResponseEntity<>(responseObj, HttpStatus.OK);
    }

    class ResponseObj {
        private Map<Integer, ShieldSchema> shieldInfoMap;
        private Map<Integer, ElementTypeSchema> elementTypeInfoMap;

        public Map<Integer, ShieldSchema> getShieldInfoMap() {
            return shieldInfoMap;
        }

        public void setShieldInfoMap(Map<Integer, ShieldSchema> shieldInfoMap) {
            this.shieldInfoMap = shieldInfoMap;
        }

        public Map<Integer, ElementTypeSchema> getElementTypeInfoMap() {
            return elementTypeInfoMap;
        }

        public void setElementTypeInfoMap(Map<Integer, ElementTypeSchema> elementTypeInfoMap) {
            this.elementTypeInfoMap = elementTypeInfoMap;
        }
    }

    class ShieldSchema {
        private Integer shieldId;
        private String shieldName;
        private String shieldTypeName;
        private List<Integer> elementTypeIds;
        private String acronym;

        public String getAcronym() {
            return acronym;
        }

        public void setAcronym(String acronym) {
            this.acronym = acronym;
        }

        public Integer getShieldId() {
            return shieldId;
        }

        public void setShieldId(Integer shieldId) {
            this.shieldId = shieldId;
        }

        public String getShieldName() {
            return shieldName;
        }

        public void setShieldName(String shieldName) {
            this.shieldName = shieldName;
        }

        public String getShieldTypeName() {
            return shieldTypeName;
        }

        public void setShieldTypeName(String shieldTypeName) {
            this.shieldTypeName = shieldTypeName;
        }

        public List<Integer> getElementTypeIds() {
            return elementTypeIds;
        }

        public void setElementTypeIds(List<Integer> elementTypeIds) {
            this.elementTypeIds = elementTypeIds;
        }
    }

    class ElementTypeSchema {
        private Integer shieldId;
        private String elementTypeName;
        private Integer elementTypeId;
        private Integer level;

        public Integer getLevel() {
            return level;
        }

        public void setLevel(Integer level) {
            this.level = level;
        }

        public Integer getElementTypeId() {
            return elementTypeId;
        }

        public void setElementTypeId(Integer elementTypeId) {
            this.elementTypeId = elementTypeId;
        }

        public Integer getShieldId() {
            return shieldId;
        }

        public void setShieldId(Integer shieldId) {
            this.shieldId = shieldId;
        }

        public String getElementTypeName() {
            return elementTypeName;
        }

        public void setElementTypeName(String elementTypeName) {
            this.elementTypeName = elementTypeName;
        }
    }

    //TODO ::  added by Manish for Drag and Drop
    @RequestMapping(value = "/save_shield_drag_and_drop", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveShieldDragAndDrop(@RequestBody @NotNull GenericItem genericItem){
        try {
            Shield shield = shieldRepository.findOne(genericItem.getShieldId());
            List<ShieldElementType> shieldElementTypeList = shield.getShieldElementTypeList();
            ShieldElementType parentShieldElementType = null;
            int maxLevel = 0;
            for(ShieldElementType shieldElementType : shieldElementTypeList) {
                if(shieldElementType.getLevel() > maxLevel) {
                    maxLevel = shieldElementType.getLevel();
                    parentShieldElementType = shieldElementType;
                }
            }
            if(maxLevel < 14) {
                for(int i=maxLevel+1;i<=10;i++) {
                    parentShieldElementType = shieldCreationHelperUtil.createShieldElementType("Level " + i, "", parentShieldElementType, true, shield);
                }
            }
            shieldElementRepository.fixSortOrderNullValues();
            shieldFullHelper.saveShieldDragAndDrop(genericItem,shield,null);
        }catch (IndexOutOfBoundsException e){
            TransactionInterceptor.currentTransactionStatus().setRollbackOnly();
            return genericItemPOJOBuilder.buildGIErrorResponse("Please update the level of selected framework", HttpStatus.OK);
        }catch (Exception ex){
            ex.printStackTrace();
            TransactionInterceptor.currentTransactionStatus().setRollbackOnly();
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Save to Database Failed", HttpStatus.OK);
        }
        GenericItem response=new GenericItem();
        response.setDescription("ok");
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/save_classification_map_mode_desktop_drag_and_drop", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveClassificationMapModeDesktopDragAndDrop(@RequestBody @NotNull GenericItem genericItem){
        try {
            if(null!=genericItem && !genericItem.getChildren().isEmpty()){
                genericItem.getChildren().forEach(item->{
                    shieldFullHelper.saveClassificationMapModeDesktopDragAndDrop(item,null);
                });
            }

        }catch(IndexOutOfBoundsException e){
            TransactionInterceptor.currentTransactionStatus().setRollbackOnly();
            return genericItemPOJOBuilder.buildGIErrorResponse("Please update the level of selected framework", HttpStatus.OK);
        }catch (Exception ex){
            TransactionInterceptor.currentTransactionStatus().setRollbackOnly();
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Save to database Failed", HttpStatus.OK);
        }
        GenericItem response=new GenericItem();
        response.setDescription("ok");
        return ResponseEntity.ok(response);
    }

    //TODO ::  added by Manish for Drag and Drop
    @RequestMapping(value = "/save_standard_shield_drag_and_drop", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveStandardShieldDragAndDrop(@RequestBody @NotNull GenericItem genericItem){
        try {
            if(null!=genericItem && !genericItem.getChildren().isEmpty()){
                Shield shield = shieldRepository.findOne(genericItem.getShieldId());
                genericItem.getChildren().forEach(item->{
                    shieldFullHelper.saveStandardShieldDragAndDrop(item,shield,null);
                });
            }
        }catch(IndexOutOfBoundsException e){
            TransactionInterceptor.currentTransactionStatus().setRollbackOnly();
            return genericItemPOJOBuilder.buildGIErrorResponse("Please update the level of selected framework", HttpStatus.OK);
        }catch (Exception ex){
            TransactionInterceptor.currentTransactionStatus().setRollbackOnly();
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Save to database Failed", HttpStatus.OK);
        }
        GenericItem response=new GenericItem();
        response.setDescription("ok");
        return ResponseEntity.ok(response);
    }


    @RequestMapping(value = "/save_standard_map_mode_desktop_drag_and_drop", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveStandardMapModeDesktopDragAndDrop(@RequestBody @NotNull GenericItem genericItem){
        try {
            if(null!=genericItem && !genericItem.getChildren().isEmpty()){
                Shield shield = shieldRepository.findOne(genericItem.getShieldId());
                genericItem.getChildren().forEach(item->{
                    shieldFullHelper.saveStandardMapModeDesktopDragAndDrop(item,shield,null);
                });
            }
        }catch(IndexOutOfBoundsException e){
            TransactionInterceptor.currentTransactionStatus().setRollbackOnly();
            return genericItemPOJOBuilder.buildGIErrorResponse("Please update the level of selected framework", HttpStatus.OK);
        }catch (Exception ex){
            TransactionInterceptor.currentTransactionStatus().setRollbackOnly();
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Save to database Failed", HttpStatus.OK);
        }
        GenericItem response=new GenericItem();
        response.setDescription("ok");
        return ResponseEntity.ok(response);
    }


    @RequestMapping(value = "/save_threat_map_mode_desktop_drag_and_drop", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveThreatMapModeDesktopDragAndDrop(@RequestBody @NotNull GenericItem genericItem){
        try {
            if(null!=genericItem && !genericItem.getChildren().isEmpty()){
                genericItem.getChildren().forEach(item->{
                    shieldFullHelper.saveThreatMapModeDesktopDragAndDrop(item,null);
                });
            }

        }catch(IndexOutOfBoundsException e){
            TransactionInterceptor.currentTransactionStatus().setRollbackOnly();
            return genericItemPOJOBuilder.buildGIErrorResponse("Please update the level of selected framework", HttpStatus.OK);
        }catch (Exception ex){
            TransactionInterceptor.currentTransactionStatus().setRollbackOnly();
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Save to database Failed", HttpStatus.OK);
        }
        GenericItem response=new GenericItem();
        response.setDescription("ok");
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/default_shield_prefs", method = RequestMethod.GET)
    public ResponseEntity<Map<String,Integer>> getDefaultShieldPreferences() {
        ResponseObj responseObj = new ResponseObj();
        List<ShieldType> shieldTypeList = shieldTypeRepository.findByIsArchivedFalse();
        Map<String,Integer> map = new HashedMap();
        shieldTypeList.forEach(shieldType -> {
            if(shieldType.getDefaultShield() != null)
                map.put(shieldType.getName(), shieldType.getDefaultShield().getId());
        });
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    class LinkPrefsPOJO {
        private Integer shieldId;
        private String objectType;

        public Integer getShieldId() {
            return shieldId;
        }

        public void setShieldId(Integer shieldId) {
            this.shieldId = shieldId;
        }

        public String getObjectType() {
            return objectType;
        }

        public void setObjectType(String objectType) {
            this.objectType = objectType;
        }
    }
    @RequestMapping(value = "/link_to_prefs/{isDirect}/{shieldIdOne}/{objectTypeOne}", method = RequestMethod.GET)
    public ResponseEntity<List<LinkPrefsPOJO>> getLinkToPrefs(@PathVariable("isDirect") Boolean isDirect, @PathVariable("shieldIdOne") Integer shieldIdOne, @PathVariable("objectTypeOne") String objectTypeOne) {
        List<LinkPrefsPOJO> linkToPrefsList = linkToPrefsRepository
                .findByIsDirectModeAndShieldIdOneAndObjectTypeOne(isDirect, shieldIdOne, objectTypeOne)
                .stream().map(linkPref -> {
                    LinkPrefsPOJO obj = new LinkPrefsPOJO();
                    obj.setShieldId(linkPref.getShieldIdTwo());
                    obj.setObjectType(linkPref.getObjectTypeTwo());
                    return obj;
                }).collect(Collectors.toList());
        linkToPrefsList.addAll(linkToPrefsRepository
                .findByIsDirectModeAndShieldIdTwoAndObjectTypeTwo(isDirect, shieldIdOne, objectTypeOne)
                .stream().map(linkPref -> {
                    LinkPrefsPOJO obj = new LinkPrefsPOJO();
                    obj.setShieldId(linkPref.getShieldIdOne());
                    obj.setObjectType(linkPref.getObjectTypeOne());
                    return obj;
                }).collect(Collectors.toList()));
        return new ResponseEntity<>(linkToPrefsList, HttpStatus.OK);
    }

    @RequestMapping(value = "/default_shield_prefs/save/{isDefault}/{shieldId}", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveLinkToPrefs(@PathVariable("isDefault") Boolean isDefault, @PathVariable("shieldId") Integer shieldId) {
        Shield shield = shieldRepository.findOne(shieldId);
        if (shield == null || shield.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield with id " + shieldId + " not found", HttpStatus.NOT_FOUND);

        ShieldType shieldType = shield.getShieldType();
        if(isDefault)
            shieldType.setDefaultShield(shield);
        else
            shieldType.setDefaultShield(null);
        shieldTypeRepository.save(shieldType);
        GenericItem response=new GenericItem();
        response.setDescription("ok");
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/link_to_prefs/save", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveLinkToPrefs(@RequestBody LinkToPrefsRequest request) {
        List<LinkToPrefs> linkToPrefsList = linkToPrefsRepository.
                findByIsDirectModeAndShieldIdOneAndObjectTypeOneAndShieldIdTwoAndObjectTypeTwo(
                        request.isDirectMode(),
                        request.getShieldIdOne(),
                        request.getObjectTypeOne(),
                        request.getShieldIdTwo(),
                        request.getObjectTypeTwo()
                );
        List<LinkToPrefs> linkToPrefsList1 = linkToPrefsRepository.
                findByIsDirectModeAndShieldIdOneAndObjectTypeOneAndShieldIdTwoAndObjectTypeTwo(
                        request.isDirectMode(),
                        request.getShieldIdTwo(),
                        request.getObjectTypeTwo(),
                        request.getShieldIdOne(),
                        request.getObjectTypeOne()
                );
        if(request.isRelated()) {
            if(linkToPrefsList.size() == 0 && linkToPrefsList1.size() == 0) {
                LinkToPrefs linkToPrefs = new LinkToPrefs();
                linkToPrefs.setShieldIdOne(request.getShieldIdOne());
                linkToPrefs.setObjectTypeOne(request.getObjectTypeOne());
                linkToPrefs.setShieldIdTwo(request.getShieldIdTwo());
                linkToPrefs.setObjectTypeTwo(request.getObjectTypeTwo());
                linkToPrefs.setDirectMode(request.isDirectMode());
                linkToPrefsRepository.save(linkToPrefs);
            }
        } else {
            Set<Integer> set = new HashSet<>();
            linkToPrefsList.forEach(item -> set.add(item.getId()));
            linkToPrefsList.addAll(linkToPrefsList1.stream().filter(item -> !set.contains(item.getId())).collect(Collectors.toList()));
            if(linkToPrefsList.size() != 0)
                linkToPrefsRepository.delete(linkToPrefsList);
        }
        GenericItem response=new GenericItem();
        response.setDescription("ok");
        return ResponseEntity.ok(response);
    }
}