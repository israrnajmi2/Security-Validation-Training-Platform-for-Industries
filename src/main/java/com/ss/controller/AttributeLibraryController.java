package com.ss.controller;


import com.ss.common.ExecException;
import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.asset.AssetDeliversSce;
import com.ss.domain.asset.AssetToShieldElementMap;
import com.ss.domain.perspective.CustomPerspective;
import com.ss.domain.perspective.attribute.*;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.shieldclassification.ShieldElementType;
import com.ss.pojo.restservice.*;
import com.ss.repository.asset.AssetDeliversSceRepository;
import com.ss.repository.asset.AssetToShieldElementMapRepository;
import com.ss.repository.perspective.CustomPerspectiveRepository;
import com.ss.repository.perspective.attribute.*;
import com.ss.repository.perspective.rating.AssetDeliversSceRTRatingRepository;
import com.ss.repository.perspective.rating.ShieldElementRTRatingRepository;
import com.ss.repository.shieldclassification.ShieldElementRepository;
import com.ss.repository.shieldclassification.ShieldElementTypeRepository;
import com.ss.service.delete.DeleteHelperService;
import com.ss.service.fullhierarchytraversal.helper.ShieldFullHelper;
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
@RequestMapping(value = "/rest/attributelibrary")
public class AttributeLibraryController {

    @Autowired
    private CustomPerspectiveRepository customPerspectiveRepository;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private AssetDeliversSceRTLibraryAttributeRepository assetDeliversSceRTLibraryAttributeRepository;

    @Autowired
    private AssetDeliversSceRTAttributeRepository assetDeliversSceRTAttributeRepository;

    @Autowired
    private AssetDeliversSceRTRatingRepository assetDeliversSceRTRatingRepository;

    @Autowired
    private ShieldFullHelper shieldFullHelper;

    @Autowired
    private AssetDeliversSceRepository assetDeliversSceRepository;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private GenericItemSubtreeHelper genericItemSubtreeHelper;

    @Autowired
    private GetWithIdHelper getWithIdHelper;

    @Autowired
    private ShieldElementRTAttributeRepository shieldElementRTAttributeRepository;

    @Autowired
    private ShieldElementRTRatingRepository shieldElementRTRatingRepository;

    @Autowired
    private DuplicateCheckingService duplicateCheckingService;

    @Autowired
    private ShieldElementTypeRepository shieldElementTypeRepository;

    @Autowired
    private ShieldElementRTLibraryAttributeRepository shieldElementRTLibraryAttributeRepository;

    @Autowired
    private ShieldElementRepository shieldElementRepository;

    @Autowired
    private DeleteHelperService deleteHelperService;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    @Autowired
    private AssetImplementsElementRTLibraryAttributeRepository assetImplementsElementRTLibraryAttributeRepository;

    @Autowired
    private AssetToShieldElementMapRepository assetToShieldElementMapRepository;

    @Autowired
    private AssetImplementsElementRTAttributeRepository assetImplementsElementRTAttributeRepository;

    /**
     * get all asset delivers library attributes for a perspective
     *
     * @param perspectiveId
     * @return list of library attributes
     */
    @RequestMapping(value = "/get_all_asset_delivers_library_attributes/{perspectiveId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getAllAssetDeliversLibraryAttributes(@PathVariable("perspectiveId") Integer perspectiveId) {

        if (perspectiveId == null || perspectiveId.equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective Id cannot be 0 or null in the request, it is mandatory field", HttpStatus.BAD_REQUEST);

        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.PERSPECTIVE_ROOT);
        response.setElementId(0);

        CustomPerspective perspective = customPerspectiveRepository.findOne(perspectiveId);

        if (perspective == null || perspective.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + perspectiveId + " not found", HttpStatus.NOT_FOUND);

        List<AssetDeliversSceRTLibraryAttribute> libraryAttributes = perspective.getAssetDeliversSceRTLibraryAttributeList();

        List<GenericItem> childrenAttributes = new ArrayList<>();

        if (libraryAttributes != null) {
            for (AssetDeliversSceRTLibraryAttribute libraryAttribute : libraryAttributes) {
                if (!libraryAttribute.isArchived()) {
                    childrenAttributes.add(genericItemPOJOBuilder.buildGenericPOJO(libraryAttribute));
                }
            }
        }
        response.setChildren(childrenAttributes);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * get all asset implements library attributes for a perspective
     *
     * @param perspectiveId
     * @return list of library attributes
     */
    @RequestMapping(value = "/get_all_asset_implements_library_attributes/{perspectiveId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getAllAssetImplementsLibraryAttributes(@PathVariable("perspectiveId") Integer perspectiveId) {

        if (perspectiveId == null || perspectiveId.equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective Id cannot be 0 or null in the request, it is mandatory field", HttpStatus.BAD_REQUEST);

        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.PERSPECTIVE_ROOT);
        response.setElementId(0);

        CustomPerspective perspective = customPerspectiveRepository.findOne(perspectiveId);

        if (perspective == null || perspective.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + perspectiveId + " not found", HttpStatus.NOT_FOUND);

        List<AssetImplementsElementRTLibraryAttribute> libraryAttributes = perspective.getAssetImplementsElementRTLibraryAttributeList();

        List<GenericItem> childrenAttributes = new ArrayList<>();

        if (libraryAttributes != null) {
            for (AssetImplementsElementRTLibraryAttribute libraryAttribute : libraryAttributes) {
                if (!libraryAttribute.isArchived()) {
                    childrenAttributes.add(genericItemPOJOBuilder.buildGenericPOJO(libraryAttribute));
                }
            }
        }
        response.setChildren(childrenAttributes);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * get all shield element library attributes for a perspective
     *
     * @param perspectiveId
     * @return list of library attributes
     */
    @RequestMapping(value = "/get_all_shield_element_library_attributes/{perspectiveId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getAllShieldElementLibraryAttributes(@PathVariable("perspectiveId") Integer perspectiveId) {

        if (perspectiveId == null || perspectiveId.equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective Id cannot be 0 or null in the request, it is mandatory field", HttpStatus.BAD_REQUEST);

        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.PERSPECTIVE_ROOT);
        response.setElementId(0);

        CustomPerspective perspective = customPerspectiveRepository.findOne(perspectiveId);

        if (perspective == null || perspective.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + perspectiveId + " not found", HttpStatus.NOT_FOUND);

        List<ShieldElementRTLibraryAttribute> libraryAttributes = perspective.getShieldElementRTLibraryAttributeList();

        List<GenericItem> childrenAttributes = new ArrayList<>();

        if (libraryAttributes != null) {
            for (ShieldElementRTLibraryAttribute libraryAttribute : libraryAttributes) {
                if (!libraryAttribute.isArchived()) {
                    childrenAttributes.add(genericItemPOJOBuilder.buildGenericPOJO(libraryAttribute));
                }
            }
        }
        response.setChildren(childrenAttributes);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * get asset deivers sce library attribute info
     *
     * @param assetDeliversLibraryAttributeId
     * @return
     */
    @RequestMapping(value = "/get_asset_delivers_library_attribute_info/{assetDeliversLibraryAttributeId}", method = RequestMethod.GET)
    public AssetDeliversLibraryAttributeInfo getAssetDeliversLibraryAttributeInfo(@PathVariable("assetDeliversLibraryAttributeId") Integer assetDeliversLibraryAttributeId) {

        AssetDeliversSceRTLibraryAttribute libraryAttribute = assetDeliversSceRTLibraryAttributeRepository.findOne(assetDeliversLibraryAttributeId);
        if (libraryAttribute == null || libraryAttribute.isArchived())
            throw new ExecException("Asset Delivers Library Attribute with id " + assetDeliversLibraryAttributeId + " not found");
        AssetDeliversLibraryAttributeInfo response = new AssetDeliversLibraryAttributeInfo();
        response.setDescription(libraryAttribute.getDescription());
        response.setName(libraryAttribute.getName());
        response.setElementId(libraryAttribute.getId());

        response.setOneRatingDescription(libraryAttribute.getOneRatingDescription());
        response.setTwoRatingDescription(libraryAttribute.getTwoRatingDescription());
        response.setThreeRatingDescription(libraryAttribute.getThreeRatingDescription());
        response.setFourRatingDescription(libraryAttribute.getFourRatingDescription());
        response.setFiveRatingDescription(libraryAttribute.getFiveRatingDescription());
        response.setPerspectiveId(libraryAttribute.getCustomPerspective().getId());
        response.setPerspectiveName(libraryAttribute.getCustomPerspective().getName());
        return response;
    }

    /**
     * get asset implements sce library attribute info
     *
     * @param assetImplementsLibraryAttributeId
     * @return
     */
    @RequestMapping(value = "/get_asset_implements_library_attribute_info/{assetImplementsLibraryAttributeId}", method = RequestMethod.GET)
    public AssetDeliversLibraryAttributeInfo getAssetImplementsLibraryAttributeInfo(@PathVariable("assetImplementsLibraryAttributeId") Integer assetImplementsLibraryAttributeId) {

        AssetImplementsElementRTLibraryAttribute libraryAttribute = assetImplementsElementRTLibraryAttributeRepository.findOne(assetImplementsLibraryAttributeId);
        if (libraryAttribute == null || libraryAttribute.isArchived())
            throw new ExecException("Asset Implements Library Attribute with id " + assetImplementsLibraryAttributeId + " not found");
        AssetDeliversLibraryAttributeInfo response = new AssetDeliversLibraryAttributeInfo();
        response.setDescription(libraryAttribute.getDescription());
        response.setName(libraryAttribute.getName());
        response.setElementId(libraryAttribute.getId());

        response.setOneRatingDescription(libraryAttribute.getOneRatingDescription());
        response.setTwoRatingDescription(libraryAttribute.getTwoRatingDescription());
        response.setThreeRatingDescription(libraryAttribute.getThreeRatingDescription());
        response.setFourRatingDescription(libraryAttribute.getFourRatingDescription());
        response.setFiveRatingDescription(libraryAttribute.getFiveRatingDescription());
        response.setPerspectiveId(libraryAttribute.getCustomPerspective().getId());
        response.setPerspectiveName(libraryAttribute.getCustomPerspective().getName());
        return response;
    }

    /**
     * get shield element library attribute info
     *
     * @param shieldElementLibraryAttributeId
     * @return
     */
    @RequestMapping(value = "/get_shield_element_library_attribute_info/{shieldElementLibraryAttributeId}", method = RequestMethod.GET)
    public ShieldElementLibraryAttributeInfo getShieldElementLibraryAttributeInfo(@PathVariable("shieldElementLibraryAttributeId") Integer shieldElementLibraryAttributeId) {

        ShieldElementRTLibraryAttribute libraryAttribute = shieldElementRTLibraryAttributeRepository.findOne(shieldElementLibraryAttributeId);
        if (libraryAttribute == null || libraryAttribute.isArchived())
            throw new ExecException("Shield Element Library Attribute with id " + shieldElementLibraryAttributeId + " not found");
        ShieldElementLibraryAttributeInfo response = new ShieldElementLibraryAttributeInfo();
        response.setDescription(libraryAttribute.getDescription());
        response.setName(libraryAttribute.getName());
        response.setElementId(libraryAttribute.getId());

        response.setOneRatingDescription(libraryAttribute.getOneRatingDescription());
        response.setTwoRatingDescription(libraryAttribute.getTwoRatingDescription());
        response.setThreeRatingDescription(libraryAttribute.getThreeRatingDescription());
        response.setFourRatingDescription(libraryAttribute.getFourRatingDescription());
        response.setFiveRatingDescription(libraryAttribute.getFiveRatingDescription());
        response.setPerspectiveId(libraryAttribute.getCustomPerspective().getId());
        response.setPerspectiveName(libraryAttribute.getCustomPerspective().getName());
        response.setShieldElementTypeId(libraryAttribute.getShieldElementType().getId());
        response.setShieldElementTypeName(libraryAttribute.getShieldElementType().getName());
        return response;
    }

    /**
     * create asset delivers library attribute for a perspective
     *
     * @param request
     * @return created library attribute
     */
    @RequestMapping(value = "/create_asset_delivers_library_attribute", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createAssetDeliversRTLibraryAttribute(@RequestBody CreateAssetDeliversLibraryAttributeRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.ASSET_DELIVERS_LIBRARY_ATTRIBUTE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        AssetDeliversSceRTLibraryAttribute attribute = new AssetDeliversSceRTLibraryAttribute();
        attribute.setName(request.getName().trim());
        attribute.setArchived(false);

        if (request.getPerspectiveId() == null || request.getPerspectiveId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("perspective Id cannot be null or 0; it is a mandatory field", HttpStatus.BAD_REQUEST);

        CustomPerspective customPerspective = customPerspectiveRepository.findOne(request.getPerspectiveId());
        if (customPerspective == null || customPerspective.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + request.getPerspectiveId() + " not found", HttpStatus.BAD_REQUEST);

        attribute.setCustomPerspective(customPerspective);

        if (duplicateCheckingService.isDuplicateAssetDeliversLibraryAttribute(attribute))
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Delivers Library attribute with name " + attribute.getName() + " already exist for Perspective with id " + request.getPerspectiveId(), HttpStatus.CONFLICT);


        if (request.getDescription() != null)
            attribute.setDescription(request.getDescription());
        else
            attribute.setDescription("");

        String oneDesc = "", twoDesc = "", threeDesc = "", fourDesc = "", fiveDesc = "";

        if (request.getOneRatingDescription() != null)
            oneDesc = request.getOneRatingDescription();
        if (request.getTwoRatingDescription() != null)
            twoDesc = request.getTwoRatingDescription();
        if (request.getThreeRatingDescription() != null)
            threeDesc = request.getThreeRatingDescription();
        if (request.getFourRatingDescription() != null)
            fourDesc = request.getFourRatingDescription();
        if (request.getFiveRatingDescription() != null)
            fiveDesc = request.getFiveRatingDescription();

        attribute.setOneRatingDescription(oneDesc);
        attribute.setTwoRatingDescription(twoDesc);
        attribute.setThreeRatingDescription(threeDesc);
        attribute.setFourRatingDescription(fourDesc);
        attribute.setFiveRatingDescription(fiveDesc);

        attribute = assetDeliversSceRTLibraryAttributeRepository.save(attribute);

        if (attribute == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Delivers Library Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * create asset implements library attribute for a perspective
     *
     * @param request
     * @return created library attribute
     */
    @RequestMapping(value = "/create_asset_implements_library_attribute", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createAssetImplementsRTLibraryAttribute(@RequestBody CreateAssetDeliversLibraryAttributeRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.ASSET_IMPLEMENTS_LIBRARY_ATTRIBUTE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        AssetImplementsElementRTLibraryAttribute attribute = new AssetImplementsElementRTLibraryAttribute();
        attribute.setName(request.getName().trim());
        attribute.setArchived(false);

        if (request.getPerspectiveId() == null || request.getPerspectiveId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("perspective Id cannot be null or 0; it is a mandatory field", HttpStatus.BAD_REQUEST);

        CustomPerspective customPerspective = customPerspectiveRepository.findOne(request.getPerspectiveId());
        if (customPerspective == null || customPerspective.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + request.getPerspectiveId() + " not found", HttpStatus.BAD_REQUEST);

        attribute.setCustomPerspective(customPerspective);

        if (duplicateCheckingService.isDuplicateAssetImplementsLibraryAttribute(attribute))
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements Library attribute with name " + attribute.getName() + " already exist for Perspective with id " + request.getPerspectiveId(), HttpStatus.CONFLICT);


        if (request.getDescription() != null)
            attribute.setDescription(request.getDescription());
        else
            attribute.setDescription("");

        String oneDesc = "", twoDesc = "", threeDesc = "", fourDesc = "", fiveDesc = "";

        if (request.getOneRatingDescription() != null)
            oneDesc = request.getOneRatingDescription();
        if (request.getTwoRatingDescription() != null)
            twoDesc = request.getTwoRatingDescription();
        if (request.getThreeRatingDescription() != null)
            threeDesc = request.getThreeRatingDescription();
        if (request.getFourRatingDescription() != null)
            fourDesc = request.getFourRatingDescription();
        if (request.getFiveRatingDescription() != null)
            fiveDesc = request.getFiveRatingDescription();

        attribute.setOneRatingDescription(oneDesc);
        attribute.setTwoRatingDescription(twoDesc);
        attribute.setThreeRatingDescription(threeDesc);
        attribute.setFourRatingDescription(fourDesc);
        attribute.setFiveRatingDescription(fiveDesc);

        attribute = assetImplementsElementRTLibraryAttributeRepository.save(attribute);

        if (attribute == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements Library Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * create shield element library attribute for a perspective
     *
     * @param request
     * @return created library attribute
     */
    @RequestMapping(value = "/create_shield_element_library_attribute", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createShieldElementRTLibraryAttribute(@RequestBody CreateShieldElementLibraryAttributeRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.SHIELD_ELEMENT_LIBRARY_ATTRIBUTE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        ShieldElementRTLibraryAttribute attribute = new ShieldElementRTLibraryAttribute();
        attribute.setName(request.getName().trim());
        attribute.setArchived(false);

        if (request.getPerspectiveId() == null || request.getPerspectiveId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective Id cannot be null or 0; it is a mandatory field", HttpStatus.BAD_REQUEST);
        CustomPerspective customPerspective = customPerspectiveRepository.findOne(request.getPerspectiveId());
        if (customPerspective == null || customPerspective.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + request.getPerspectiveId() + " not found", HttpStatus.NOT_FOUND);
        attribute.setCustomPerspective(customPerspective);

        if (request.getShieldElementTypeId() == null || request.getShieldElementTypeId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield element type Id cannot be null or 0; it is a mandatory field", HttpStatus.BAD_REQUEST);
        ShieldElementType shieldElementType = shieldElementTypeRepository.findOne(request.getShieldElementTypeId());
        if (shieldElementType == null || shieldElementType.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("shield element type with id " + request.getShieldElementTypeId() + " not found", HttpStatus.NOT_FOUND);
        attribute.setShieldElementType(shieldElementType);

        if (duplicateCheckingService.isDuplicateShieldElementLibraryAttribute(attribute))
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Library attribute with name " + attribute.getName() + " already exist for Perspective with id " + request.getPerspectiveId(), HttpStatus.CONFLICT);


        if (request.getDescription() != null)
            attribute.setDescription(request.getDescription());
        else
            attribute.setDescription("");

        String oneDesc = "", twoDesc = "", threeDesc = "", fourDesc = "", fiveDesc = "";

        if (request.getOneRatingDescription() != null)
            oneDesc = request.getOneRatingDescription();
        if (request.getTwoRatingDescription() != null)
            twoDesc = request.getTwoRatingDescription();
        if (request.getThreeRatingDescription() != null)
            threeDesc = request.getThreeRatingDescription();
        if (request.getFourRatingDescription() != null)
            fourDesc = request.getFourRatingDescription();
        if (request.getFiveRatingDescription() != null)
            fiveDesc = request.getFiveRatingDescription();

        attribute.setOneRatingDescription(oneDesc);
        attribute.setTwoRatingDescription(twoDesc);
        attribute.setThreeRatingDescription(threeDesc);
        attribute.setFourRatingDescription(fourDesc);
        attribute.setFiveRatingDescription(fiveDesc);

        attribute = shieldElementRTLibraryAttributeRepository.save(attribute);

        if (attribute == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element RT Library Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * edit asset delivers library attribute
     *
     * @param request
     * @return edited attribute
     */
    @RequestMapping(value = "/edit_asset_delivers_library_attribute", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editAssetDeliversLibraryAttribute(@RequestBody EditLibraryAttributeRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.ASSET_DELIVERS_LIBRARY_ATTRIBUTE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        AssetDeliversSceRTLibraryAttribute attribute = assetDeliversSceRTLibraryAttributeRepository.findOne(request.getElementId());
        if (attribute == null || attribute.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Delivers Library Attribute with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        attribute.setName(request.getName().trim());
        attribute.setDescription(request.getDescription());

        if (duplicateCheckingService.isDuplicateAssetDeliversLibraryAttribute(attribute))
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Delivers Library attribute with name " + attribute.getName() + " already exist for Perspective with id " + attribute.getCustomPerspective().getId(), HttpStatus.CONFLICT);

        if (request.getDescription() != null)
            attribute.setDescription(request.getDescription());
        else
            attribute.setDescription("");

        String oneDesc = "", twoDesc = "", threeDesc = "", fourDesc = "", fiveDesc = "";

        if (request.getOneRatingDescription() != null)
            oneDesc = request.getOneRatingDescription();
        if (request.getTwoRatingDescription() != null)
            twoDesc = request.getTwoRatingDescription();
        if (request.getThreeRatingDescription() != null)
            threeDesc = request.getThreeRatingDescription();
        if (request.getFourRatingDescription() != null)
            fourDesc = request.getFourRatingDescription();
        if (request.getFiveRatingDescription() != null)
            fiveDesc = request.getFiveRatingDescription();

        attribute.setOneRatingDescription(oneDesc);
        attribute.setTwoRatingDescription(twoDesc);
        attribute.setThreeRatingDescription(threeDesc);
        attribute.setFourRatingDescription(fourDesc);
        attribute.setFiveRatingDescription(fiveDesc);

        attribute = assetDeliversSceRTLibraryAttributeRepository.save(attribute);

        if (attribute == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Delivers Library Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * edit asset implements library attribute
     *
     * @param request
     * @return edited attribute
     */
    @RequestMapping(value = "/edit_asset_implements_library_attribute", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editAssetImplementsLibraryAttribute(@RequestBody EditLibraryAttributeRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.ASSET_IMPLEMENTS_LIBRARY_ATTRIBUTE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        AssetImplementsElementRTLibraryAttribute attribute = assetImplementsElementRTLibraryAttributeRepository.findOne(request.getElementId());
        if (attribute == null || attribute.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements Library Attribute with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        attribute.setName(request.getName().trim());
        attribute.setDescription(request.getDescription());

        if (duplicateCheckingService.isDuplicateAssetImplementsLibraryAttribute(attribute))
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements Library attribute with name " + attribute.getName() + " already exist for Perspective with id " + attribute.getCustomPerspective().getId(), HttpStatus.CONFLICT);

        if (request.getDescription() != null)
            attribute.setDescription(request.getDescription());
        else
            attribute.setDescription("");

        String oneDesc = "", twoDesc = "", threeDesc = "", fourDesc = "", fiveDesc = "";

        if (request.getOneRatingDescription() != null)
            oneDesc = request.getOneRatingDescription();
        if (request.getTwoRatingDescription() != null)
            twoDesc = request.getTwoRatingDescription();
        if (request.getThreeRatingDescription() != null)
            threeDesc = request.getThreeRatingDescription();
        if (request.getFourRatingDescription() != null)
            fourDesc = request.getFourRatingDescription();
        if (request.getFiveRatingDescription() != null)
            fiveDesc = request.getFiveRatingDescription();

        attribute.setOneRatingDescription(oneDesc);
        attribute.setTwoRatingDescription(twoDesc);
        attribute.setThreeRatingDescription(threeDesc);
        attribute.setFourRatingDescription(fourDesc);
        attribute.setFiveRatingDescription(fiveDesc);

        attribute = assetImplementsElementRTLibraryAttributeRepository.save(attribute);

        if (attribute == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements Library Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * edit shield element library attribute
     *
     * @param request
     * @return edited shield element library attribute
     */
    @RequestMapping(value = "/edit_shield_element_library_attribute", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editShieldElementLibraryAttribute(@RequestBody EditLibraryAttributeRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.SHIELD_ELEMENT_LIBRARY_ATTRIBUTE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        ShieldElementRTLibraryAttribute attribute = shieldElementRTLibraryAttributeRepository.findOne(request.getElementId());
        if (attribute == null || attribute.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Library Attribute with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        attribute.setName(request.getName().trim());
        attribute.setDescription(request.getDescription());

        if (duplicateCheckingService.isDuplicateShieldElementLibraryAttribute(attribute))
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Library attribute with name " + attribute.getName() + " already exist for Perspective with id " + attribute.getCustomPerspective().getId(), HttpStatus.CONFLICT);

        if (request.getDescription() != null)
            attribute.setDescription(request.getDescription());
        else
            attribute.setDescription("");

        String oneDesc = "", twoDesc = "", threeDesc = "", fourDesc = "", fiveDesc = "";

        if (request.getOneRatingDescription() != null)
            oneDesc = request.getOneRatingDescription();
        if (request.getTwoRatingDescription() != null)
            twoDesc = request.getTwoRatingDescription();
        if (request.getThreeRatingDescription() != null)
            threeDesc = request.getThreeRatingDescription();
        if (request.getFourRatingDescription() != null)
            fourDesc = request.getFourRatingDescription();
        if (request.getFiveRatingDescription() != null)
            fiveDesc = request.getFiveRatingDescription();

        attribute.setOneRatingDescription(oneDesc);
        attribute.setTwoRatingDescription(twoDesc);
        attribute.setThreeRatingDescription(threeDesc);
        attribute.setFourRatingDescription(fourDesc);
        attribute.setFiveRatingDescription(fiveDesc);

        attribute = shieldElementRTLibraryAttributeRepository.save(attribute);

        if (attribute == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Library Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * add asset delivers attributes from library to "perspective & assetdeliverslinkid combination"
     *
     * @param request
     * @return return success (or) throw exception on failure
     */
    @RequestMapping(value = "/add_asset_delivers_attributes_from_library", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> addAssetDeliversAttributesFromLibrary(@RequestBody AddAssetDeliversAttributesFromLibraryRequest request) {
        if (request.getPerspectiveId() == null || request.getPerspectiveId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        if (request.getAssetDeliversLinkId() == null || request.getAssetDeliversLinkId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Delivers Link Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        AssetDeliversSce assetDeliversSce = null;
        if (request.getAssetDeliversLinkId() != null && !request.getAssetDeliversLinkId().equals(0)) {
            assetDeliversSce = assetDeliversSceRepository.findOne(request.getAssetDeliversLinkId());
            if (assetDeliversSce == null || assetDeliversSce.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Asset Delivers Sce Link with id " + request.getAssetDeliversLinkId() + " not found", HttpStatus.BAD_REQUEST);
        } else
            return genericItemPOJOBuilder.buildGIErrorResponse("AssetDelivers Link Id cannot be null or 0 in request, it is mandatory field", HttpStatus.BAD_REQUEST);


        CustomPerspective customPerspective = null;
        if (request.getPerspectiveId() != null && !request.getPerspectiveId().equals(0)) {
            customPerspective = customPerspectiveRepository.findOne(request.getPerspectiveId());
            if (customPerspective == null || customPerspective.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + request.getPerspectiveId() + " not found", HttpStatus.BAD_REQUEST);
        }

        List<AssetDeliversSceRTLibraryAttribute> libraryAttributes = new ArrayList<>();
        if (request.getLibraryAttributeIdsList() != null) {
            for (Integer libraryAttributeId : request.getLibraryAttributeIdsList()) {
                AssetDeliversSceRTLibraryAttribute libraryAttribute = assetDeliversSceRTLibraryAttributeRepository.findOne(libraryAttributeId);
                if (libraryAttribute == null || libraryAttribute.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Asset Delivers Library Attribute with id " + libraryAttributeId + " not found", HttpStatus.NOT_FOUND);
                libraryAttributes.add(libraryAttribute);
            }
        }
        for (AssetDeliversSceRTLibraryAttribute libraryAttribute : libraryAttributes) {
            AssetDeliversSceRTAttribute attribute = new AssetDeliversSceRTAttribute();
            attribute.setName(libraryAttribute.getName());
            attribute.setArchived(false);
            attribute.setActivated(true);
            attribute.setAssetDeliversSce(assetDeliversSce);
            attribute.setCustomPerspective(customPerspective);
            attribute.setCoefficient(1f);

            if (libraryAttribute.getDescription() != null)
                attribute.setDescription(libraryAttribute.getDescription());
            else
                attribute.setDescription("");

            String oneDesc = "", twoDesc = "", threeDesc = "", fourDesc = "", fiveDesc = "";

            if (libraryAttribute.getOneRatingDescription() != null)
                oneDesc = libraryAttribute.getOneRatingDescription();
            if (libraryAttribute.getTwoRatingDescription() != null)
                twoDesc = libraryAttribute.getTwoRatingDescription();
            if (libraryAttribute.getThreeRatingDescription() != null)
                threeDesc = libraryAttribute.getThreeRatingDescription();
            if (libraryAttribute.getFourRatingDescription() != null)
                fourDesc = libraryAttribute.getFourRatingDescription();
            if (libraryAttribute.getFiveRatingDescription() != null)
                fiveDesc = libraryAttribute.getFiveRatingDescription();

            attribute.setOneRatingDescription(oneDesc);
            attribute.setTwoRatingDescription(twoDesc);
            attribute.setThreeRatingDescription(threeDesc);
            attribute.setFourRatingDescription(fourDesc);
            attribute.setFiveRatingDescription(fiveDesc);

            attribute = assetDeliversSceRTAttributeRepository.save(attribute);

            if (attribute == null)
                return genericItemPOJOBuilder.buildGIErrorResponse("Asset Delivers Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    /**
     * add asset implements attributes from library to "perspective & assetdeliverslinkid combination"
     *
     * @param request
     * @return return success (or) throw exception on failure
     */
    @RequestMapping(value = "/add_asset_implements_attributes_from_library", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> addAssetImplementsAttributesFromLibrary(@RequestBody AddAssetImplementsAttributesFromLibraryRequest request) {
        if (request.getPerspectiveId() == null || request.getPerspectiveId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        if (request.getAssetImplementsElementLinkId() == null || request.getAssetImplementsElementLinkId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements Link Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        AssetToShieldElementMap assetToShieldElementMap = null;
        if (request.getAssetImplementsElementLinkId() != null && !request.getAssetImplementsElementLinkId().equals(0)) {
            assetToShieldElementMap = assetToShieldElementMapRepository.findOne(request.getAssetImplementsElementLinkId());
            if (assetToShieldElementMap == null || assetToShieldElementMap.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements Element Link with id " + request.getAssetImplementsElementLinkId() + " not found", HttpStatus.BAD_REQUEST);
        } else
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements Link Id cannot be null or 0 in request, it is mandatory field", HttpStatus.BAD_REQUEST);

        CustomPerspective customPerspective = null;
        if (request.getPerspectiveId() != null && !request.getPerspectiveId().equals(0)) {
            customPerspective = customPerspectiveRepository.findOne(request.getPerspectiveId());
            if (customPerspective == null || customPerspective.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + request.getPerspectiveId() + " not found", HttpStatus.BAD_REQUEST);
        }

        List<AssetImplementsElementRTLibraryAttribute> libraryAttributes = new ArrayList<>();
        if (request.getLibraryAttributeIdsList() != null) {
            for (Integer libraryAttributeId : request.getLibraryAttributeIdsList()) {
                AssetImplementsElementRTLibraryAttribute libraryAttribute = assetImplementsElementRTLibraryAttributeRepository.findOne(libraryAttributeId);
                if (libraryAttribute == null || libraryAttribute.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements Library Attribute with id " + libraryAttributeId + " not found", HttpStatus.NOT_FOUND);
                libraryAttributes.add(libraryAttribute);
            }
        }
        for (AssetImplementsElementRTLibraryAttribute libraryAttribute : libraryAttributes) {
            AssetImplementsElementRTAttribute attribute = new AssetImplementsElementRTAttribute();
            attribute.setName(libraryAttribute.getName());
            attribute.setArchived(false);
            attribute.setActivated(true);
            attribute.setAssetToShieldElementMap(assetToShieldElementMap);
            attribute.setCustomPerspective(customPerspective);
            attribute.setCoefficient(1f);

            if (libraryAttribute.getDescription() != null)
                attribute.setDescription(libraryAttribute.getDescription());
            else
                attribute.setDescription("");

            String oneDesc = "", twoDesc = "", threeDesc = "", fourDesc = "", fiveDesc = "";

            if (libraryAttribute.getOneRatingDescription() != null)
                oneDesc = libraryAttribute.getOneRatingDescription();
            if (libraryAttribute.getTwoRatingDescription() != null)
                twoDesc = libraryAttribute.getTwoRatingDescription();
            if (libraryAttribute.getThreeRatingDescription() != null)
                threeDesc = libraryAttribute.getThreeRatingDescription();
            if (libraryAttribute.getFourRatingDescription() != null)
                fourDesc = libraryAttribute.getFourRatingDescription();
            if (libraryAttribute.getFiveRatingDescription() != null)
                fiveDesc = libraryAttribute.getFiveRatingDescription();

            attribute.setOneRatingDescription(oneDesc);
            attribute.setTwoRatingDescription(twoDesc);
            attribute.setThreeRatingDescription(threeDesc);
            attribute.setFourRatingDescription(fourDesc);
            attribute.setFiveRatingDescription(fiveDesc);

            attribute = assetImplementsElementRTAttributeRepository.save(attribute);

            if (attribute == null)
                return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    /**
     * add asset delivers attributes from library to all rateable objects
     *
     * @param request
     * @return success (or) throw exception on failure
     */
    @RequestMapping(value = "/add_asset_delivers_attributes_from_library_to_all_rateable_objects", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> addAssetDeliversAttributesFromLibraryToAllRateableObjects(@RequestBody AddAssetDeliversAttributesFromLibraryToAllRequest request) {

        CustomPerspective customPerspective = null;
        if (request.getPerspectiveId() != null && !request.getPerspectiveId().equals(0)) {
            customPerspective = customPerspectiveRepository.findOne(request.getPerspectiveId());
            if (customPerspective == null || customPerspective.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + request.getPerspectiveId() + " not found", HttpStatus.BAD_REQUEST);
        }

        if (request.isReplaceAllExistingAttributes()) {
            //delete all existing asset delivers attributes
            List<AssetDeliversSceRTAttribute> assetDeliversSceRTAttributeList = customPerspective.getAssetDeliversSceRTAttributeList();
            for (AssetDeliversSceRTAttribute attributeToBeDeleted : assetDeliversSceRTAttributeList) {
                deleteHelperService.deleteAssetDeliversSceRTAttribute(attributeToBeDeleted);
            }
        }

        List<AssetDeliversSceRTLibraryAttribute> libraryAttributes = new ArrayList<>();
        if (request.getLibraryAttributeIdsList() != null) {
            for (Integer libraryAttributeId : request.getLibraryAttributeIdsList()) {
                AssetDeliversSceRTLibraryAttribute libraryAttribute = assetDeliversSceRTLibraryAttributeRepository.findOne(libraryAttributeId);
                if (libraryAttribute == null || libraryAttribute.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Asset Delivers Library Attribute with id " + libraryAttributeId + " not found", HttpStatus.NOT_FOUND);
                libraryAttributes.add(libraryAttribute);
            }
        }

        for (AssetDeliversSceRTLibraryAttribute libraryAttribute : libraryAttributes) {

            String oneDesc = "", twoDesc = "", threeDesc = "", fourDesc = "", fiveDesc = "";

            if (libraryAttribute.getOneRatingDescription() != null)
                oneDesc = libraryAttribute.getOneRatingDescription();
            if (libraryAttribute.getTwoRatingDescription() != null)
                twoDesc = libraryAttribute.getTwoRatingDescription();
            if (libraryAttribute.getThreeRatingDescription() != null)
                threeDesc = libraryAttribute.getThreeRatingDescription();
            if (libraryAttribute.getFourRatingDescription() != null)
                fourDesc = libraryAttribute.getFourRatingDescription();
            if (libraryAttribute.getFiveRatingDescription() != null)
                fiveDesc = libraryAttribute.getFiveRatingDescription();

            List<AssetDeliversSce> assetDeliversSceList = assetDeliversSceRepository.findByIsArchivedFalse();

            for (AssetDeliversSce assetDeliversSce : assetDeliversSceList) {

                AssetDeliversSceRTAttribute attribute = new AssetDeliversSceRTAttribute();
                attribute.setName(libraryAttribute.getName());
                attribute.setArchived(false);
                attribute.setActivated(true);
                attribute.setAssetDeliversSce(assetDeliversSce);
                attribute.setCustomPerspective(customPerspective);
                attribute.setCoefficient(1f);

                if (libraryAttribute.getDescription() != null)
                    attribute.setDescription(libraryAttribute.getDescription());
                else
                    attribute.setDescription("");

                attribute.setOneRatingDescription(oneDesc);
                attribute.setTwoRatingDescription(twoDesc);
                attribute.setThreeRatingDescription(threeDesc);
                attribute.setFourRatingDescription(fourDesc);
                attribute.setFiveRatingDescription(fiveDesc);

                attribute = assetDeliversSceRTAttributeRepository.save(attribute);

                if (attribute == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Asset Delivers Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    /**
     * add asset implements attributes from library to all rateable objects
     *
     * @param request
     * @return success (or) throw exception on failure
     */
    @RequestMapping(value = "/add_asset_implements_attributes_from_library_to_all_rateable_objects", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> addAssetImplementsAttributesFromLibraryToAllRateableObjects(@RequestBody AddAssetDeliversAttributesFromLibraryToAllRequest request) {

        CustomPerspective customPerspective = null;
        if (request.getPerspectiveId() != null && !request.getPerspectiveId().equals(0)) {
            customPerspective = customPerspectiveRepository.findOne(request.getPerspectiveId());
            if (customPerspective == null || customPerspective.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + request.getPerspectiveId() + " not found", HttpStatus.BAD_REQUEST);
        }

        if (request.isReplaceAllExistingAttributes()) {
            //delete all existing asset delivers attributes
            List<AssetImplementsElementRTAttribute> assetImplementsElementRTAttributeList = customPerspective.getAssetImplementsElementRTAttributeList();
            for (AssetImplementsElementRTAttribute attributeToBeDeleted : assetImplementsElementRTAttributeList) {
                deleteHelperService.deleteAssetImplementsElementRTAttribute(attributeToBeDeleted);
            }
        }

        List<AssetImplementsElementRTLibraryAttribute> libraryAttributes = new ArrayList<>();
        if (request.getLibraryAttributeIdsList() != null) {
            for (Integer libraryAttributeId : request.getLibraryAttributeIdsList()) {
                AssetImplementsElementRTLibraryAttribute libraryAttribute = assetImplementsElementRTLibraryAttributeRepository.findOne(libraryAttributeId);
                if (libraryAttribute == null || libraryAttribute.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements Library Attribute with id " + libraryAttributeId + " not found", HttpStatus.NOT_FOUND);
                libraryAttributes.add(libraryAttribute);
            }
        }

        for (AssetImplementsElementRTLibraryAttribute libraryAttribute : libraryAttributes) {

            String oneDesc = "", twoDesc = "", threeDesc = "", fourDesc = "", fiveDesc = "";

            if (libraryAttribute.getOneRatingDescription() != null)
                oneDesc = libraryAttribute.getOneRatingDescription();
            if (libraryAttribute.getTwoRatingDescription() != null)
                twoDesc = libraryAttribute.getTwoRatingDescription();
            if (libraryAttribute.getThreeRatingDescription() != null)
                threeDesc = libraryAttribute.getThreeRatingDescription();
            if (libraryAttribute.getFourRatingDescription() != null)
                fourDesc = libraryAttribute.getFourRatingDescription();
            if (libraryAttribute.getFiveRatingDescription() != null)
                fiveDesc = libraryAttribute.getFiveRatingDescription();

            List<AssetToShieldElementMap> assetToShieldElementMapList = assetToShieldElementMapRepository.findByIsArchivedFalse();

            for (AssetToShieldElementMap assetToShieldElementMap : assetToShieldElementMapList) {

                AssetImplementsElementRTAttribute attribute = new AssetImplementsElementRTAttribute();
                attribute.setName(libraryAttribute.getName());
                attribute.setArchived(false);
                attribute.setActivated(true);
                attribute.setAssetToShieldElementMap(assetToShieldElementMap);
                attribute.setCustomPerspective(customPerspective);
                attribute.setCoefficient(1f);

                if (libraryAttribute.getDescription() != null)
                    attribute.setDescription(libraryAttribute.getDescription());
                else
                    attribute.setDescription("");

                attribute.setOneRatingDescription(oneDesc);
                attribute.setTwoRatingDescription(twoDesc);
                attribute.setThreeRatingDescription(threeDesc);
                attribute.setFourRatingDescription(fourDesc);
                attribute.setFiveRatingDescription(fiveDesc);

                attribute = assetImplementsElementRTAttributeRepository.save(attribute);

                if (attribute == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    /**
     * add shield element attributes from library to "perspective & shield element combination"
     *
     * @param request
     * @return return success (or) throw error on failure
     */
    @RequestMapping(value = "/add_shield_element_attributes_from_library", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> addShieldElementAttributesFromLibrary(@RequestBody AddShieldElementAttributesFromLibraryRequest request) {
        if (request.getPerspectiveId() == null || request.getPerspectiveId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        ShieldElement shieldElement = null;
        if (request.getShieldElementId() != null && !request.getShieldElementId().equals(0)) {
            shieldElement = shieldElementRepository.findOne(request.getShieldElementId());
            if (shieldElement == null || shieldElement.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element with id " + request.getShieldElementId() + " not found", HttpStatus.BAD_REQUEST);
        } else
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Id cannot be null or 0 in request, it is mandatory field", HttpStatus.BAD_REQUEST);


        CustomPerspective customPerspective = null;
        if (request.getPerspectiveId() != null && !request.getPerspectiveId().equals(0)) {
            customPerspective = customPerspectiveRepository.findOne(request.getPerspectiveId());
            if (customPerspective == null || customPerspective.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + request.getPerspectiveId() + " not found", HttpStatus.BAD_REQUEST);
        }

        List<ShieldElementRTLibraryAttribute> libraryAttributes = new ArrayList<>();
        if (request.getLibraryAttributeIdsList() != null) {
            for (Integer libraryAttributeId : request.getLibraryAttributeIdsList()) {
                ShieldElementRTLibraryAttribute libraryAttribute = shieldElementRTLibraryAttributeRepository.findOne(libraryAttributeId);
                if (libraryAttribute == null || libraryAttribute.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Library Attribute with id " + libraryAttributeId + " not found", HttpStatus.NOT_FOUND);
                libraryAttributes.add(libraryAttribute);
            }
        }
        for (ShieldElementRTLibraryAttribute libraryAttribute : libraryAttributes) {
            ShieldElementRTAttribute attribute = new ShieldElementRTAttribute();
            attribute.setName(libraryAttribute.getName());
            attribute.setArchived(false);
            attribute.setActivated(true);
            attribute.setShieldElement(shieldElement);
            attribute.setCustomPerspective(customPerspective);
            attribute.setShieldElementType(shieldElement.getShieldElementType());
            attribute.setCoefficient(1f);

            if (libraryAttribute.getDescription() != null)
                attribute.setDescription(libraryAttribute.getDescription());
            else
                attribute.setDescription("");

            String oneDesc = "", twoDesc = "", threeDesc = "", fourDesc = "", fiveDesc = "";

            if (libraryAttribute.getOneRatingDescription() != null)
                oneDesc = libraryAttribute.getOneRatingDescription();
            if (libraryAttribute.getTwoRatingDescription() != null)
                twoDesc = libraryAttribute.getTwoRatingDescription();
            if (libraryAttribute.getThreeRatingDescription() != null)
                threeDesc = libraryAttribute.getThreeRatingDescription();
            if (libraryAttribute.getFourRatingDescription() != null)
                fourDesc = libraryAttribute.getFourRatingDescription();
            if (libraryAttribute.getFiveRatingDescription() != null)
                fiveDesc = libraryAttribute.getFiveRatingDescription();

            attribute.setOneRatingDescription(oneDesc);
            attribute.setTwoRatingDescription(twoDesc);
            attribute.setThreeRatingDescription(threeDesc);
            attribute.setFourRatingDescription(fourDesc);
            attribute.setFiveRatingDescription(fiveDesc);

            attribute = shieldElementRTAttributeRepository.save(attribute);

            if (attribute == null)
                return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/add_shield_element_attributes_from_library_to_all_rateable_objects", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> addShieldElementAttributesFromLibraryToAll(@RequestBody AddShieldElementAttributesFromLibraryToAllRequest request) {

        if (request.getPerspectiveId() == null || request.getPerspectiveId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective id cannot be 0 or null; it is a mandatory field", HttpStatus.BAD_REQUEST);

        CustomPerspective customPerspective = customPerspectiveRepository.findOne(request.getPerspectiveId());
        if (customPerspective == null || customPerspective.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + request.getPerspectiveId() + " not found", HttpStatus.BAD_REQUEST);

        if (request.getShieldElementTypeId() == null || request.getShieldElementTypeId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("ElementTypeId cannot be 0 or null; it is a mandatory field", HttpStatus.BAD_REQUEST);
        ShieldElementType shieldElementType = shieldElementTypeRepository.findOne(request.getShieldElementTypeId());
        if (shieldElementType == null || shieldElementType.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Type with id " + request.getShieldElementTypeId() + " not found", HttpStatus.BAD_REQUEST);

        if (request.isReplaceAllExistingAttributes()) {
            //delete all shield element rt attributes of passed (perspective and element type combination)
            List<ShieldElementRTAttribute> attributesToBeDeleted = shieldElementRTAttributeRepository.findByShieldElementTypeIdAndCustomPerspectiveId(shieldElementType.getId(), customPerspective.getId());
            for (ShieldElementRTAttribute attributeToBeDeleted : attributesToBeDeleted) {
                deleteHelperService.deleteShieldElementRTAttribute(attributeToBeDeleted);
            }
        }

        List<ShieldElementRTLibraryAttribute> libraryAttributes = new ArrayList<>();
        if (request.getLibraryAttributeIdsList() != null) {
            for (Integer libraryAttributeId : request.getLibraryAttributeIdsList()) {
                ShieldElementRTLibraryAttribute libraryAttribute = shieldElementRTLibraryAttributeRepository.findOne(libraryAttributeId);
                if (libraryAttribute == null || libraryAttribute.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Library Attribute with id " + libraryAttributeId + " not found", HttpStatus.NOT_FOUND);
                libraryAttributes.add(libraryAttribute);
            }
        }

        List<ShieldElement> shieldElementList = shieldElementType.getShieldElementList();
        if (shieldElementList != null) {

            for (ShieldElementRTLibraryAttribute libraryAttribute : libraryAttributes) {

                String oneDesc = "", twoDesc = "", threeDesc = "", fourDesc = "", fiveDesc = "";

                if (libraryAttribute.getOneRatingDescription() != null)
                    oneDesc = libraryAttribute.getOneRatingDescription();
                if (libraryAttribute.getTwoRatingDescription() != null)
                    twoDesc = libraryAttribute.getTwoRatingDescription();
                if (libraryAttribute.getThreeRatingDescription() != null)
                    threeDesc = libraryAttribute.getThreeRatingDescription();
                if (libraryAttribute.getFourRatingDescription() != null)
                    fourDesc = libraryAttribute.getFourRatingDescription();
                if (libraryAttribute.getFiveRatingDescription() != null)
                    fiveDesc = libraryAttribute.getFiveRatingDescription();

                for (ShieldElement shieldElement : shieldElementList) {

                    if (!shieldElement.isArchived()) {
                        ShieldElementRTAttribute attribute = new ShieldElementRTAttribute();
                        attribute.setName(libraryAttribute.getName());
                        attribute.setArchived(false);
                        attribute.setActivated(true);
                        attribute.setShieldElement(shieldElement);
                        attribute.setCustomPerspective(customPerspective);
                        attribute.setShieldElementType(shieldElement.getShieldElementType());
                        attribute.setCoefficient(1f);

                        if (libraryAttribute.getDescription() != null)
                            attribute.setDescription(libraryAttribute.getDescription());
                        else
                            attribute.setDescription("");

                        attribute.setOneRatingDescription(oneDesc);
                        attribute.setTwoRatingDescription(twoDesc);
                        attribute.setThreeRatingDescription(threeDesc);
                        attribute.setFourRatingDescription(fourDesc);
                        attribute.setFiveRatingDescription(fiveDesc);

                        attribute = shieldElementRTAttributeRepository.save(attribute);

                        if (attribute == null)
                            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);
                    }

                }
            }
        }
        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);

    }
}