package com.ss.controller;


import com.ss.common.ExecException;
import com.ss.constants.*;
import com.ss.domain.asset.AssetDeliversSce;
import com.ss.domain.asset.AssetToShieldElementMap;
import com.ss.domain.perspective.CustomPerspective;
import com.ss.domain.perspective.attribute.AssetDeliversSceRTAttribute;
import com.ss.domain.perspective.attribute.AssetImplementsElementRTAttribute;
import com.ss.domain.perspective.attribute.ShieldElementRTAttribute;
import com.ss.domain.perspective.rating.AssetDeliversSceRTRating;
import com.ss.domain.perspective.rating.AssetImplementsElementRTRating;
import com.ss.domain.perspective.rating.ShieldElementRTRating;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.shieldclassification.ShieldElementType;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.*;
import com.ss.repository.asset.AssetDeliversSceRepository;
import com.ss.repository.asset.AssetToShieldElementMapRepository;
import com.ss.repository.perspective.CustomPerspectiveRepository;
import com.ss.repository.perspective.attribute.AssetDeliversSceRTAttributeRepository;
import com.ss.repository.perspective.attribute.AssetImplementsElementRTAttributeRepository;
import com.ss.repository.perspective.attribute.ShieldElementRTAttributeRepository;
import com.ss.repository.perspective.rating.AssetDeliversSceRTRatingRepository;
import com.ss.repository.perspective.rating.AssetImplementsElementRTRatingRepository;
import com.ss.repository.perspective.rating.ShieldElementRTRatingRepository;
import com.ss.repository.shieldclassification.ShieldElementTypeRepository;
import com.ss.service.delete.DeleteHelperService;
import com.ss.service.fullhierarchytraversal.helper.ShieldFullHelper;
import com.ss.service.permissions.PermissionCheckerService;
import com.ss.service.projectionview.ProjectionHelperService;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import com.ss.utils.GenericItemSubtreeHelper;
import com.ss.utils.GetWithIdHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@Transactional
@RequestMapping(value = "/rest/perspectives")
public class PerspectivesController {

    @Autowired
    private CustomPerspectiveRepository customPerspectiveRepository;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

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
    private ShieldElementTypeRepository shieldElementTypeRepository;

    @Autowired
    private DeleteHelperService deleteHelperService;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    @Autowired
    private ProjectionHelperService projectionHelperService;

    @Autowired
    private ShieldController shieldController;

    @Autowired
    private AssetToShieldElementMapRepository assetToShieldElementMapRepository;

    @Autowired
    private AssetImplementsElementRTAttributeRepository assetImplementsElementRTAttributeRepository;

    @Autowired
    private AssetImplementsElementRTRatingRepository assetImplementsElementRTRatingRepository;

    @RequestMapping(value = "/get_all_perspectives", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getAllPerspectives() {
        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.PERSPECTIVE_ROOT);
        response.setElementId(0);

        List<GenericItem> children = new ArrayList<>();
        List<CustomPerspective> perspectives = customPerspectiveRepository.findByIsArchivedFalse();
        if (perspectives != null) {
            for (CustomPerspective perspective : perspectives) {
                children.add(genericItemPOJOBuilder.buildGenericPOJO(perspective));
            }
        }
        response.setChildren(children);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*@RequestMapping(value = "/create_expression", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createExpression(@RequestBody CreateExpressionRequest request) {

    }*/

    @RequestMapping(value = "/get_asset_delivers_ruler_type_dv", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getAssetDeliversRulerTypeDv(@RequestBody AssetDeliversDvRequest request) {

        ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.FULFILLS);
        viewDescriptor.setNextLevel(new ViewDescriptor(GIView.ASSET, GIMode.ALL_LINKED_ELEMENTS));

        ResponseEntity<GenericItem> responseEntity = shieldFullHelper.getShieldFullWithDescriptorPerspective(request.getShieldId(), request.getShieldElementGroupId(), viewDescriptor, null, request.getLevel(), RulerTypeConstants.ASSET_DELIVERS_SCE, request.getPerspectiveIds(), new Date());
        GenericItem response = responseEntity.getBody();

        Shield shield = getWithIdHelper.getShield(request.getShieldId());
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

    @RequestMapping(value = "/get_asset_implements_ruler_type_dv", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getAssetImplementsRulerTypeDv(@RequestBody AssetDeliversDvRequest request) {

        ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.DIRECT_ASSET, GIMode.ALL_LINKED_ELEMENTS);

        ResponseEntity<GenericItem> responseEntity = shieldFullHelper.getShieldFullWithDescriptorPerspective(request.getShieldId(), request.getShieldElementGroupId(), viewDescriptor, null, request.getLevel(), RulerTypeConstants.ASSET_IMPLEMENTS_ELEMENT, request.getPerspectiveIds(), new Date());
        GenericItem response = responseEntity.getBody();

        Shield shield = getWithIdHelper.getShield(request.getShieldId());
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

    @RequestMapping(value = "/get_asset_delivers_ruler_type_projection_dv", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getAssetDeliversRulerTypeProjectionDv(@RequestBody AssetDeliversProjectionDvRequest request) {

        AssetDeliversDvRequest assetDeliversDvRequest = new AssetDeliversDvRequest();
        assetDeliversDvRequest.setLevel(request.getLevel());
        assetDeliversDvRequest.setPerspectiveIds(request.getPerspectiveIds());
        assetDeliversDvRequest.setShieldElementGroupId(request.getShieldElementGroupId());
        assetDeliversDvRequest.setShieldId(request.getShieldId());
        ResponseEntity<GenericItem> responesEntity = getAssetDeliversRulerTypeDv(assetDeliversDvRequest);
        GenericItem assetDeliversPerspectiveDV = responesEntity.getBody();

        Map<Integer, Float> ratingsMap = projectionHelperService.getRatingsMap(assetDeliversPerspectiveDV, request.getShieldId(), request.getLevel());

        //get projection dv
        //same as projection shield map to source shield
        ShieldMapRequestInfo shieldMapRequestInfo = new ShieldMapRequestInfo();
        shieldMapRequestInfo.setDirect(true);
        shieldMapRequestInfo.setDropDownOneGroupId(request.getProjectionShieldElementGroupId());
        shieldMapRequestInfo.setDropDownOneLevelOfInterest(request.getProjectionLevel());
        shieldMapRequestInfo.setDropDownOneShieldId(request.getProjectionShieldId());
        shieldMapRequestInfo.setDropDownTwoProtectionType("");
        shieldMapRequestInfo.setDropDownTwoShieldId(request.getShieldId());
        shieldMapRequestInfo.setDropDownTwoStartingPoint(ObjectTypeConstants.SHIELD_ROOT);
        ResponseEntity<GenericItem> response = shieldController.getShieldFullMapToOtherStartingPoint(shieldMapRequestInfo);
        projectionHelperService.removeMappingsWithoutRatings(response.getBody(), ratingsMap);
        //apply index values and return.
        projectionHelperService.applyIndexValues(response.getBody(), ratingsMap);
        return response;
    }

    @RequestMapping(value = "/get_asset_implements_ruler_type_projection_dv", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getAssetImplementsRulerTypeProjectionDv(@RequestBody AssetDeliversProjectionDvRequest request) {

        AssetDeliversDvRequest assetDeliversDvRequest = new AssetDeliversDvRequest();
        assetDeliversDvRequest.setLevel(request.getLevel());
        assetDeliversDvRequest.setPerspectiveIds(request.getPerspectiveIds());
        assetDeliversDvRequest.setShieldElementGroupId(request.getShieldElementGroupId());
        assetDeliversDvRequest.setShieldId(request.getShieldId());
        ResponseEntity<GenericItem> responesEntity = getAssetImplementsRulerTypeDv(assetDeliversDvRequest);
        GenericItem assetImplementsPerspectiveDV = responesEntity.getBody();

        Map<Integer, Float> ratingsMap = projectionHelperService.getRatingsMap(assetImplementsPerspectiveDV, request.getShieldId(), request.getLevel());

        //get projection dv
        //same as projection shield map to source shield
        ShieldMapRequestInfo shieldMapRequestInfo = new ShieldMapRequestInfo();
        shieldMapRequestInfo.setDirect(true);
        shieldMapRequestInfo.setDropDownOneGroupId(request.getProjectionShieldElementGroupId());
        shieldMapRequestInfo.setDropDownOneLevelOfInterest(request.getProjectionLevel());
        shieldMapRequestInfo.setDropDownOneShieldId(request.getProjectionShieldId());
        shieldMapRequestInfo.setDropDownTwoProtectionType("");
        shieldMapRequestInfo.setDropDownTwoShieldId(request.getShieldId());
        shieldMapRequestInfo.setDropDownTwoStartingPoint(ObjectTypeConstants.SHIELD_ROOT);
        ResponseEntity<GenericItem> response = shieldController.getShieldFullMapToOtherStartingPoint(shieldMapRequestInfo);
        projectionHelperService.removeMappingsWithoutRatings(response.getBody(), ratingsMap);
        //apply index values and return.
        projectionHelperService.applyIndexValues(response.getBody(), ratingsMap);
        return response;
    }

    @RequestMapping(value = "/get_shield_element_ruler_type_dv", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getShieldElementRulerTypeDv(@RequestBody ShieldElementRTdvRequest request) {

        ResponseEntity<GenericItem> responseEntity = shieldFullHelper.getShieldFullWithDescriptorPerspective(request.getShieldId(), request.getShieldElementGroupId(), null, null, request.getLevel(), RulerTypeConstants.SHIELD_ELEMENT, request.getPerspectiveIds(), new Date());

        GenericItem response = responseEntity.getBody();

        Shield shield = getWithIdHelper.getShield(request.getShieldId());
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

    @RequestMapping(value = "/get_shield_element_ruler_type_projection_dv", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getShieldElementRulerTypeProjectionDv(@RequestBody ShieldElementRTProjectiondvRequest request) {

        ShieldElementRTdvRequest shieldElementRTdvRequest = new ShieldElementRTdvRequest();
        shieldElementRTdvRequest.setLevel(request.getLevel());
        shieldElementRTdvRequest.setPerspectiveIds(request.getPerspectiveIds());
        shieldElementRTdvRequest.setShieldElementGroupId(request.getShieldElementGroupId());
        shieldElementRTdvRequest.setShieldId(request.getShieldId());
        ResponseEntity<GenericItem> responesEntity = getShieldElementRulerTypeDv(shieldElementRTdvRequest);
        GenericItem assetDeliversPerspectiveDV = responesEntity.getBody();

        Map<Integer, Float> ratingsMap = projectionHelperService.getRatingsMap(assetDeliversPerspectiveDV, request.getShieldId(), request.getLevel());

        //get projection dv
        //same as projection shield map to source shield
        ShieldMapRequestInfo shieldMapRequestInfo = new ShieldMapRequestInfo();
        shieldMapRequestInfo.setDirect(true);
        shieldMapRequestInfo.setDropDownOneGroupId(request.getProjectionShieldElementGroupId());
        shieldMapRequestInfo.setDropDownOneLevelOfInterest(request.getProjectionLevel());
        shieldMapRequestInfo.setDropDownOneShieldId(request.getProjectionShieldId());
        shieldMapRequestInfo.setDropDownTwoProtectionType("");
        shieldMapRequestInfo.setDropDownTwoShieldId(request.getShieldId());
        shieldMapRequestInfo.setDropDownTwoStartingPoint(ObjectTypeConstants.SHIELD_ROOT);
        ResponseEntity<GenericItem> response = shieldController.getShieldFullMapToOtherStartingPoint(shieldMapRequestInfo);
        projectionHelperService.removeMappingsWithoutRatings(response.getBody(), ratingsMap);
        //apply index values and return.
        projectionHelperService.applyIndexValues(response.getBody(), ratingsMap);
        return response;
    }

    @RequestMapping(value = "/get_asset_delivers_ruler_type_dv_subtree", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getAssetDeliversRulerTypeDvSubtree(@RequestBody AssetDeliversDvSubtreeRequest subtreeRequestInfo) {
        AssetDeliversDvRequest request = new AssetDeliversDvRequest();
        request.setLevel(subtreeRequestInfo.getLevel());
        request.setPerspectiveIds(subtreeRequestInfo.getPerspectiveIds());
        request.setShieldElementGroupId(subtreeRequestInfo.getShieldElementGroupId());
        request.setShieldId(subtreeRequestInfo.getShieldId());

        ResponseEntity<GenericItem> response = getAssetDeliversRulerTypeDv(request);

        GenericItem genericItem = response.getBody();
        GenericItem requiredGenericItem = genericItemSubtreeHelper.findObject(genericItem, subtreeRequestInfo.getObjectType(), subtreeRequestInfo.getElementId());
        if (requiredGenericItem == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Parent item with id " + subtreeRequestInfo.getElementId() + " and object type " + subtreeRequestInfo.getObjectType() + " not found - may have been unmapped or deleted", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(requiredGenericItem, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_shield_element_ruler_type_dv_subtree", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getShieldElementRulerTypeDvSubtree(@RequestBody AssetDeliversDvSubtreeRequest subtreeRequestInfo) {
        ShieldElementRTdvRequest request = new ShieldElementRTdvRequest();
        request.setLevel(subtreeRequestInfo.getLevel());
        request.setPerspectiveIds(subtreeRequestInfo.getPerspectiveIds());
        request.setShieldElementGroupId(subtreeRequestInfo.getShieldElementGroupId());
        request.setShieldId(subtreeRequestInfo.getShieldId());

        ResponseEntity<GenericItem> response = getShieldElementRulerTypeDv(request);

        GenericItem genericItem = response.getBody();
        GenericItem requiredGenericItem = genericItemSubtreeHelper.findObject(genericItem, subtreeRequestInfo.getObjectType(), subtreeRequestInfo.getElementId());
        if (requiredGenericItem == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Parent item with id " + subtreeRequestInfo.getElementId() + " and object type " + subtreeRequestInfo.getObjectType() + " not found - may have been unmapped or deleted", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(requiredGenericItem, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_perspective", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createPerspective(@RequestBody CreatePerspectiveRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.PERSPECTIVE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        CustomPerspective perspective = new CustomPerspective();
        perspective.setName(request.getName().trim());

        List<CustomPerspective> perspectivesWithSameName = customPerspectiveRepository.findByNameAndIsArchivedFalse(request.getName().trim());

        if (perspectivesWithSameName != null && !perspectivesWithSameName.isEmpty()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with name  : " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }

        perspective.setArchived(false);

        perspective.setDescription(request.getDescription());
        perspective.setColor(request.getColor());


        perspective = customPerspectiveRepository.save(perspective);

        if (perspective == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(perspective);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/edit_perspective", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editPerspective(@RequestBody EditPerspectiveRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.PERSPECTIVE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        CustomPerspective customPerspective = customPerspectiveRepository.findOne(request.getElementId());
        if (customPerspective == null || customPerspective.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        List<CustomPerspective> perspectivesWithSameName = customPerspectiveRepository.findByNameAndIsArchivedFalse(request.getName().trim());

        if (perspectivesWithSameName != null && !perspectivesWithSameName.isEmpty()) {
            if (!perspectivesWithSameName.get(0).getId().equals(request.getElementId()))
                return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }
        customPerspective.setName(request.getName().trim());
        customPerspective.setDescription(request.getDescription());
        customPerspective.setColor(request.getColor());

        customPerspective = customPerspectiveRepository.save(customPerspective);

        if (customPerspective == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Perspective Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(customPerspective);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_asset_delivers_attribute", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createAssetDeliversRTAttribute(@RequestBody CreateAssetDeliversAttributeRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.ASSET_DELIVERS_ATTRIBUTE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        AssetDeliversSceRTAttribute attribute = new AssetDeliversSceRTAttribute();
        attribute.setName(request.getName().trim());
        attribute.setArchived(false);
        attribute.setActivated(true);

        AssetDeliversSce assetDeliversSce = null;
        if (request.getAssetDeliversLinkId() != null && !request.getAssetDeliversLinkId().equals(0)) {
            assetDeliversSce = assetDeliversSceRepository.findOne(request.getAssetDeliversLinkId());
            if (assetDeliversSce == null || assetDeliversSce.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Asset Delivers Sce Link with id " + request.getAssetDeliversLinkId() + " not found", HttpStatus.BAD_REQUEST);
        } else
            return genericItemPOJOBuilder.buildGIErrorResponse("AssetDelivers Link Id cannot be null or 0 in request, it is mandatory field", HttpStatus.BAD_REQUEST);
        attribute.setAssetDeliversSce(assetDeliversSce);

        CustomPerspective customPerspective = null;
        if (request.getPerspectiveId() != null && !request.getPerspectiveId().equals(0)) {
            customPerspective = customPerspectiveRepository.findOne(request.getPerspectiveId());
            if (customPerspective == null || customPerspective.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + request.getPerspectiveId() + " not found", HttpStatus.BAD_REQUEST);
        }
        attribute.setCustomPerspective(customPerspective);

        if (request.getCoefficient() != null)
            attribute.setCoefficient(request.getCoefficient());
        else
            attribute.setCoefficient(1f);

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

        attribute = assetDeliversSceRTAttributeRepository.save(attribute);

        if (attribute == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Delivers Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_asset_implements_attribute", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createAssetImplementsRTAttribute(@RequestBody CreateAssetImplementsAttributeRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.ASSET_IMPLEMENTS_ATTRIBUTE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        AssetImplementsElementRTAttribute attribute = new AssetImplementsElementRTAttribute();
        attribute.setName(request.getName().trim());
        attribute.setArchived(false);
        attribute.setActivated(true);

        AssetToShieldElementMap assetToShieldElementMap = null;
        if (request.getAssetImplementsElementLinkId() != null && !request.getAssetImplementsElementLinkId().equals(0)) {
            assetToShieldElementMap = assetToShieldElementMapRepository.findOne(request.getAssetImplementsElementLinkId());
            if (assetToShieldElementMap == null || assetToShieldElementMap.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements Element Link with id " + request.getAssetImplementsElementLinkId() + " not found", HttpStatus.BAD_REQUEST);
        } else
            return genericItemPOJOBuilder.buildGIErrorResponse("AssetImplements Link Id cannot be null or 0 in request, it is mandatory field", HttpStatus.BAD_REQUEST);
        attribute.setAssetToShieldElementMap(assetToShieldElementMap);

        CustomPerspective customPerspective = null;
        if (request.getPerspectiveId() != null && !request.getPerspectiveId().equals(0)) {
            customPerspective = customPerspectiveRepository.findOne(request.getPerspectiveId());
            if (customPerspective == null || customPerspective.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + request.getPerspectiveId() + " not found", HttpStatus.BAD_REQUEST);
        }
        attribute.setCustomPerspective(customPerspective);

        if (request.getCoefficient() != null)
            attribute.setCoefficient(request.getCoefficient());
        else
            attribute.setCoefficient(1f);

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

        attribute = assetImplementsElementRTAttributeRepository.save(attribute);

        if (attribute == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implemnets Element Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_asset_delivers_attribute_for_all_rateable_objects", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createAssetDeliversRTAttributeForAllRateableObjects(@RequestBody CreateAssetDeliversAttributeForAllRateableRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.ASSET_DELIVERS_ATTRIBUTE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

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

        List<AssetDeliversSce> assetDeliversSceList = assetDeliversSceRepository.findByIsArchivedFalse();

        for (AssetDeliversSce assetDeliversSce : assetDeliversSceList) {

            AssetDeliversSceRTAttribute attribute = new AssetDeliversSceRTAttribute();
            attribute.setName(request.getName().trim());
            attribute.setArchived(false);
            attribute.setActivated(true);

            attribute.setAssetDeliversSce(assetDeliversSce);

            attribute.setCustomPerspective(customPerspective);

            if (request.getCoefficient() != null)
                attribute.setCoefficient(request.getCoefficient());
            else
                attribute.setCoefficient(1f);

            if (request.getDescription() != null)
                attribute.setDescription(request.getDescription());
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

        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_asset_implements_attribute_for_all_rateable_objects", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createAssetImplementsRTAttributeForAllRateableObjects(@RequestBody CreateAssetDeliversAttributeForAllRateableRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.ASSET_IMPLEMENTS_ATTRIBUTE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

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

        List<AssetToShieldElementMap> assetToShieldElementMapList = assetToShieldElementMapRepository.findByIsArchivedFalse();

        for (AssetToShieldElementMap assetToShieldElementMap : assetToShieldElementMapList) {

            AssetImplementsElementRTAttribute attribute = new AssetImplementsElementRTAttribute();
            attribute.setName(request.getName().trim());
            attribute.setArchived(false);
            attribute.setActivated(true);

            attribute.setAssetToShieldElementMap(assetToShieldElementMap);

            attribute.setCustomPerspective(customPerspective);

            if (request.getCoefficient() != null)
                attribute.setCoefficient(request.getCoefficient());
            else
                attribute.setCoefficient(1f);

            if (request.getDescription() != null)
                attribute.setDescription(request.getDescription());
            else
                attribute.setDescription("");

            attribute.setOneRatingDescription(oneDesc);
            attribute.setTwoRatingDescription(twoDesc);
            attribute.setThreeRatingDescription(threeDesc);
            attribute.setFourRatingDescription(fourDesc);
            attribute.setFiveRatingDescription(fiveDesc);

            attribute = assetImplementsElementRTAttributeRepository.save(attribute);

            if (attribute == null)
                return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements Element Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_shield_element_rt_attribute", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createShieldElementRTAttribute(@RequestBody CreateShieldElementAttributeRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.SHIELD_ELEMENT_RT_ATTRIBUTE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        ShieldElementRTAttribute attribute = new ShieldElementRTAttribute();
        attribute.setName(request.getName().trim());
        attribute.setArchived(false);
        attribute.setActivated(true);

        ShieldElement shieldElement = getWithIdHelper.getShieldElement(request.getShieldElementId());

        attribute.setShieldElement(shieldElement);
        attribute.setShieldElementType(shieldElement.getShieldElementType());

        CustomPerspective customPerspective = null;
        if (request.getPerspectiveId() != null && !request.getPerspectiveId().equals(0)) {
            customPerspective = customPerspectiveRepository.findOne(request.getPerspectiveId());
            if (customPerspective == null || customPerspective.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + request.getPerspectiveId() + " not found", HttpStatus.BAD_REQUEST);
        }
        attribute.setCustomPerspective(customPerspective);

        if (request.getCoefficient() != null)
            attribute.setCoefficient(request.getCoefficient());
        else
            attribute.setCoefficient(1f);

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

        attribute = shieldElementRTAttributeRepository.save(attribute);

        if (attribute == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element RT Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_shield_element_rt_attribute_for_all_rateable_elements", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createShieldElementRTAttributeForAllRateableElements(@RequestBody CreateShieldElementAttributeForAllRateableRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.SHIELD_ELEMENT_RT_ATTRIBUTE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

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

        List<ShieldElement> shieldElementList = shieldElementType.getShieldElementList();
        if (shieldElementList != null) {
            for (ShieldElement shieldElement : shieldElementList) {
                if (!shieldElement.isArchived()) {
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

                    ShieldElementRTAttribute attribute = new ShieldElementRTAttribute();
                    attribute.setName(request.getName().trim());
                    attribute.setArchived(false);
                    attribute.setActivated(true);

                    attribute.setShieldElement(shieldElement);
                    attribute.setShieldElementType(shieldElementType);

                    attribute.setCustomPerspective(customPerspective);

                    if (request.getCoefficient() != null)
                        attribute.setCoefficient(request.getCoefficient());
                    else
                        attribute.setCoefficient(1f);

                    if (request.getDescription() != null)
                        attribute.setDescription(request.getDescription());
                    else
                        attribute.setDescription("");

                    attribute.setOneRatingDescription(oneDesc);
                    attribute.setTwoRatingDescription(twoDesc);
                    attribute.setThreeRatingDescription(threeDesc);
                    attribute.setFourRatingDescription(fourDesc);
                    attribute.setFiveRatingDescription(fiveDesc);

                    attribute = shieldElementRTAttributeRepository.save(attribute);

                    if (attribute == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element RT Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        }
        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/edit_asset_delivers_attribute", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editAssetDeliversAttribute(@RequestBody EditAssetDeliversAttributeRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.ASSET_DELIVERS_ATTRIBUTE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        AssetDeliversSceRTAttribute attribute = assetDeliversSceRTAttributeRepository.findOne(request.getElementId());
        if (attribute == null || attribute.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Delivers Attribute with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        attribute.setName(request.getName().trim());
        attribute.setDescription(request.getDescription());
        attribute.setActivated(request.isActivated());

        if (request.getCoefficient() != null)
            attribute.setCoefficient(request.getCoefficient());
        else
            attribute.setCoefficient(1f);

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


        attribute = assetDeliversSceRTAttributeRepository.save(attribute);

        if (attribute == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Delivers Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/edit_asset_implements_attribute", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editAssetImplementsAttribute(@RequestBody EditAssetDeliversAttributeRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.ASSET_IMPLEMENTS_ATTRIBUTE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        AssetImplementsElementRTAttribute attribute = assetImplementsElementRTAttributeRepository.findOne(request.getElementId());
        if (attribute == null || attribute.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements Attribute with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        attribute.setName(request.getName().trim());
        attribute.setDescription(request.getDescription());
        attribute.setActivated(request.isActivated());

        if (request.getCoefficient() != null)
            attribute.setCoefficient(request.getCoefficient());
        else
            attribute.setCoefficient(1f);

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


        attribute = assetImplementsElementRTAttributeRepository.save(attribute);

        if (attribute == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/edit_shield_element_attribute", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editShieldElementRTAttribute(@RequestBody EditShieldElementRTAttributeRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.SHIELD_ELEMENT_RT_ATTRIBUTE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        ShieldElementRTAttribute attribute = shieldElementRTAttributeRepository.findOne(request.getElementId());
        if (attribute == null || attribute.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element RT Attribute with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        attribute.setName(request.getName().trim());
        attribute.setDescription(request.getDescription());
        attribute.setActivated(request.isActivated());

        if (request.getCoefficient() != null)
            attribute.setCoefficient(request.getCoefficient());
        else
            attribute.setCoefficient(1f);

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


        attribute = shieldElementRTAttributeRepository.save(attribute);

        if (attribute == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element RT Attribute Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_asset_delivers_attributes_and_ratings_for_given_perspectives", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getAssetDeliversAttributesAndRatings(@RequestBody GetAssetDeliversAttributesAndRatingsRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.EVAL_VIEW))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getAssetDeliversLinkId() == null || request.getAssetDeliversLinkId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("AssetDelivers Link Id cannot be 0 or null in the request, it is mandatory field", HttpStatus.BAD_REQUEST);

        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.PERSPECTIVE_ROOT);
        response.setElementId(0);

        List<GenericItem> childrenPerspectives = new ArrayList<>();
        if (request.getPerspectiveIds() != null) {

            for (Integer perspectiveId : request.getPerspectiveIds()) {

                CustomPerspective perspective = customPerspectiveRepository.findOne(perspectiveId);
                if (perspective == null || perspective.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + perspectiveId + " not found", HttpStatus.NOT_FOUND);
                GenericItem perspectiveGenericItem = genericItemPOJOBuilder.buildGenericPOJO(perspective);
                float numerator = 0f;
                float count = 0;

                List<GenericItem> childrenAttributes = new ArrayList<>();
                List<AssetDeliversSceRTAttribute> attributes = perspective.getAssetDeliversSceRTAttributeList();

                if (attributes != null) {
                    for (AssetDeliversSceRTAttribute attribute : attributes) {
                        if (!attribute.isArchived() && attribute.getAssetDeliversSce() != null && !attribute.getAssetDeliversSce().isArchived()
                                && attribute.getAssetDeliversSce().getId().equals(request.getAssetDeliversLinkId())) {

                            GenericItem attributeGenericItem = genericItemPOJOBuilder.buildGenericPOJO(attribute);
                            List<AssetDeliversSceRTRating> ratings = attribute.getAssetDeliversSceRTRatingList();
                            Float coefficient = attribute.getCoefficient();
                            if (coefficient == null)
                                coefficient = 1f;

                            AssetDeliversSceRTRating rating = genericItemIndexCalculator.getClosestAssetDeliversRating(ratings, new Date());
                            if (rating == null) {
                                attributeGenericItem.setRatingId(0);
                                attributeGenericItem.setJustificationReason("");
                                attributeGenericItem.setRating(0f);
                            } else {
                                attributeGenericItem.setRatingId(rating.getId());
                                if (rating.getJustificationReason() != null)
                                    attributeGenericItem.setJustificationReason(rating.getJustificationReason());
                                else
                                    attributeGenericItem.setJustificationReason("");
                                if (rating.getRating() != null)
                                    attributeGenericItem.setRating(rating.getRating());
                                else
                                    attributeGenericItem.setRating(0f);
                                attributeGenericItem.setRatingObjectType(ObjectTypeConstants.ASSET_DELIVERS_ATTRIBUTE_RATING);
                            }
                            if (attribute.isActivated() && rating != null && rating.getRating() != null && !rating.getRating().equals(0) && coefficient != 0) {
                                numerator += ((coefficient * rating.getRating()) / 5);
                                count += coefficient;
                            }
                            childrenAttributes.add(attributeGenericItem);
                        }
                    }
                }

                if (count == 0)
                    perspectiveGenericItem.setIndex(0f);
                else {
                    float rating = numerator / count;
                    perspectiveGenericItem.setIndex(rating);
                }

                perspectiveGenericItem.setChildren(childrenAttributes);
                childrenPerspectives.add(perspectiveGenericItem);
            }
        }
        response.setChildren(childrenPerspectives);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_asset_implements_attributes_and_ratings_for_given_perspectives", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getAssetImplementsAttributesAndRatings(@RequestBody GetAssetImplementsAttributesAndRatingsRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.EVAL_VIEW))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getAssetImplementsLinkId() == null || request.getAssetImplementsLinkId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("AssetImplements Link Id cannot be 0 or null in the request, it is mandatory field", HttpStatus.BAD_REQUEST);

        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.PERSPECTIVE_ROOT);
        response.setElementId(0);

        List<GenericItem> childrenPerspectives = new ArrayList<>();
        if (request.getPerspectiveIds() != null) {

            for (Integer perspectiveId : request.getPerspectiveIds()) {

                CustomPerspective perspective = customPerspectiveRepository.findOne(perspectiveId);
                if (perspective == null || perspective.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + perspectiveId + " not found", HttpStatus.NOT_FOUND);
                GenericItem perspectiveGenericItem = genericItemPOJOBuilder.buildGenericPOJO(perspective);
                float numerator = 0f;
                float count = 0;

                List<GenericItem> childrenAttributes = new ArrayList<>();
                List<AssetImplementsElementRTAttribute> attributes = perspective.getAssetImplementsElementRTAttributeList();

                if (attributes != null) {
                    for (AssetImplementsElementRTAttribute attribute : attributes) {
                        if (!attribute.isArchived() && attribute.getAssetToShieldElementMap() != null && !attribute.getAssetToShieldElementMap().isArchived()
                                && attribute.getAssetToShieldElementMap().getId().equals(request.getAssetImplementsLinkId())) {

                            GenericItem attributeGenericItem = genericItemPOJOBuilder.buildGenericPOJO(attribute);
                            List<AssetImplementsElementRTRating> ratings = attribute.getAssetImplementsElementRTRatingList();
                            Float coefficient = attribute.getCoefficient();
                            if (coefficient == null)
                                coefficient = 1f;

                            AssetImplementsElementRTRating rating = genericItemIndexCalculator.getClosestAssetImplementsRating(ratings, new Date());
                            if (rating == null) {
                                attributeGenericItem.setRatingId(0);
                                attributeGenericItem.setJustificationReason("");
                                attributeGenericItem.setRating(0f);
                            } else {
                                attributeGenericItem.setRatingId(rating.getId());
                                if (rating.getJustificationReason() != null)
                                    attributeGenericItem.setJustificationReason(rating.getJustificationReason());
                                else
                                    attributeGenericItem.setJustificationReason("");
                                if (rating.getRating() != null)
                                    attributeGenericItem.setRating(rating.getRating());
                                else
                                    attributeGenericItem.setRating(0f);
                                attributeGenericItem.setRatingObjectType(ObjectTypeConstants.ASSET_IMPLEMENTS_ATTRIBUTE_RATING);
                            }
                            if (attribute.isActivated() && rating != null && rating.getRating() != null && !rating.getRating().equals(0) && coefficient != 0) {
                                numerator += ((coefficient * rating.getRating()) / 5);
                                count += coefficient;
                            }
                            childrenAttributes.add(attributeGenericItem);
                        }
                    }
                }

                if (count == 0)
                    perspectiveGenericItem.setIndex(0f);
                else {
                    float rating = numerator / count;
                    perspectiveGenericItem.setIndex(rating);
                }

                perspectiveGenericItem.setChildren(childrenAttributes);
                childrenPerspectives.add(perspectiveGenericItem);
            }
        }
        response.setChildren(childrenPerspectives);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_shield_element_rt_attributes_and_ratings_for_given_perspectives", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getShieldElementRTAttributesAndRatings(@RequestBody GetShieldElementRTAttributesAndRatingsRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.EVAL_VIEW))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getShieldElementId() == null || request.getShieldElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Id cannot be 0 or null in the request, it is mandatory field", HttpStatus.BAD_REQUEST);

        GenericItem response = new GenericItem();
        response.setObjectType(ObjectTypeConstants.PERSPECTIVE_ROOT);
        response.setElementId(0);

        List<GenericItem> childrenPerspectives = new ArrayList<>();
        if (request.getPerspectiveIds() != null) {

            for (Integer perspectiveId : request.getPerspectiveIds()) {

                CustomPerspective perspective = customPerspectiveRepository.findOne(perspectiveId);
                if (perspective == null || perspective.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Perspective with id " + perspectiveId + " not found", HttpStatus.NOT_FOUND);
                GenericItem perspectiveGenericItem = genericItemPOJOBuilder.buildGenericPOJO(perspective);
                float numerator = 0f;
                float count = 0;

                List<GenericItem> childrenAttributes = new ArrayList<>();
                List<ShieldElementRTAttribute> attributes = perspective.getShieldElementRTAttributeList();

                if (attributes != null) {
                    for (ShieldElementRTAttribute attribute : attributes) {
                        ShieldElement tempShieldElement = attribute.getShieldElement();
                        if (!attribute.isArchived() && tempShieldElement != null && !tempShieldElement.isArchived()
                                && tempShieldElement.getId().equals(request.getShieldElementId())) {

                            GenericItem attributeGenericItem = genericItemPOJOBuilder.buildGenericPOJO(attribute);
                            List<ShieldElementRTRating> ratings = attribute.getShieldElementRTRatingList();
                            Float coefficient = attribute.getCoefficient();
                            if (coefficient == null)
                                coefficient = 1f;

                            ShieldElementRTRating rating = genericItemIndexCalculator.getClosestShieldElementRating(ratings, new Date());
                            if (rating == null) {
                                attributeGenericItem.setRatingId(0);
                                attributeGenericItem.setJustificationReason("");
                                attributeGenericItem.setRating(0f);
                            } else {
                                attributeGenericItem.setRatingId(rating.getId());
                                if (rating.getJustificationReason() != null)
                                    attributeGenericItem.setJustificationReason(rating.getJustificationReason());
                                else
                                    attributeGenericItem.setJustificationReason("");
                                if (rating.getRating() != null)
                                    attributeGenericItem.setRating(rating.getRating());
                                else
                                    attributeGenericItem.setRating(0f);
                                attributeGenericItem.setRatingObjectType(ObjectTypeConstants.SHIELD_ELEMENT_RT_ATTRIBUTE_RATING);
                            }
                            if (attribute.isActivated() && rating != null && rating.getRating() != null && !rating.getRating().equals(0) && coefficient != 0) {
                                numerator += ((coefficient * rating.getRating()) / 5);
                                count += coefficient;
                            }
                            childrenAttributes.add(attributeGenericItem);
                        }
                    }
                }

                if (count == 0)
                    perspectiveGenericItem.setIndex(0f);
                else {
                    float rating = numerator / count;
                    perspectiveGenericItem.setIndex(rating);
                }

                perspectiveGenericItem.setChildren(childrenAttributes);
                childrenPerspectives.add(perspectiveGenericItem);
            }
        }
        response.setChildren(childrenPerspectives);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/save_asset_delivers_attribute_rating", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveAssetDeliversRating(@RequestBody SaveAssetDeliversAttributeRatingRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_ASSET_DELIVERS_EXPRESSION_RULER_TYPE_ATTRIBUTE_RATING))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        AssetDeliversSceRTAttribute attribute = null;
        if (request.getAssetDeliversAttributeId() == null || request.getAssetDeliversAttributeId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("AssetDelivers attribute id cannot be null or 0, it is mandatory field", HttpStatus.BAD_REQUEST);

        attribute = assetDeliversSceRTAttributeRepository.findOne(request.getAssetDeliversAttributeId());
        if (attribute == null || attribute.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Delivers Attribute with id " + request.getAssetDeliversAttributeId() + " not found", HttpStatus.BAD_REQUEST);

        AssetDeliversSceRTRating rating = new AssetDeliversSceRTRating();
        rating.setAssetDeliversSceRTAttribute(attribute);
        rating.setCreatedDateTime(new Date());
        if (request.getJustificationReason() != null)
            rating.setJustificationReason(request.getJustificationReason());
        else
            rating.setJustificationReason("");

        if (request.getRating() == null)
            rating.setRating(0f);
        else if (request.getRating().compareTo(0f) < 0 || request.getRating().compareTo(5f) > 0)
            return genericItemPOJOBuilder.buildGIErrorResponse("Rating value passed " + request.getRating() + "; must be equal to or between 0 to 5", HttpStatus.BAD_REQUEST);
        rating.setRating(request.getRating());

        rating = assetDeliversSceRTRatingRepository.save(rating);
        if (rating == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("AssetDelivers Rating Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(rating);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/save_asset_implements_attribute_rating", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveAssetImplementsRating(@RequestBody SaveAssetImplementsAttributeRatingRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_ASSET_IMPLEMENTS_ELEMENT_RULER_TYPE_ATTRIBUTE_RATING))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        AssetImplementsElementRTAttribute attribute = null;
        if (request.getAssetImplementsAttributeId() == null || request.getAssetImplementsAttributeId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("AssetImplements attribute id cannot be null or 0, it is mandatory field", HttpStatus.BAD_REQUEST);

        attribute = assetImplementsElementRTAttributeRepository.findOne(request.getAssetImplementsAttributeId());
        if (attribute == null || attribute.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements Attribute with id " + request.getAssetImplementsAttributeId() + " not found", HttpStatus.BAD_REQUEST);

        AssetImplementsElementRTRating rating = new AssetImplementsElementRTRating();
        rating.setAssetImplementsElementRTAttribute(attribute);
        rating.setCreatedDateTime(new Date());
        if (request.getJustificationReason() != null)
            rating.setJustificationReason(request.getJustificationReason());
        else
            rating.setJustificationReason("");

        if (request.getRating() == null)
            rating.setRating(0f);
        else if (request.getRating().compareTo(0f) < 0 || request.getRating().compareTo(5f) > 0)
            return genericItemPOJOBuilder.buildGIErrorResponse("Rating value passed " + request.getRating() + "; must be equal to or between 0 to 5", HttpStatus.BAD_REQUEST);
        rating.setRating(request.getRating());

        rating = assetImplementsElementRTRatingRepository.save(rating);
        if (rating == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("AssetImplements Rating Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(rating);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/save_shield_element_rt_attribute_rating", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveShieldElementRTRating(@RequestBody SaveShieldElementAttributeRatingRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_SHIELD_ELEMENT_RULER_TYPE_ATTRIBUTE_RATING))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        ShieldElementRTAttribute attribute = null;
        if (request.getShieldElementAttributeId() == null || request.getShieldElementAttributeId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element RT attribute id cannot be null or 0, it is mandatory field", HttpStatus.BAD_REQUEST);

        attribute = shieldElementRTAttributeRepository.findOne(request.getShieldElementAttributeId());
        if (attribute == null || attribute.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Attribute with id " + request.getShieldElementAttributeId() + " not found", HttpStatus.BAD_REQUEST);

        ShieldElementRTRating rating = new ShieldElementRTRating();
        rating.setShieldElementRTAttribute(attribute);
        rating.setCreatedDateTime(new Date());
        if (request.getJustificationReason() != null)
            rating.setJustificationReason(request.getJustificationReason());
        else
            rating.setJustificationReason("");

        if (request.getRating() == null)
            rating.setRating(0f);
        else if (request.getRating().compareTo(0f) < 0 || request.getRating().compareTo(5f) > 0)
            return genericItemPOJOBuilder.buildGIErrorResponse("Rating value passed " + request.getRating() + "; must be equal to or between 0 to 5", HttpStatus.BAD_REQUEST);
        rating.setRating(request.getRating());

        rating = shieldElementRTRatingRepository.save(rating);
        if (rating == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element RT Rating Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(rating);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/save_justification_reason_for_asset_delivers_rating", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveJustificationReasonForAssetDeliversRating(@RequestBody SaveJustificationReasonForAssetDeliversRating request) {

        AssetDeliversSceRTRating rating = null;
        if (request.getAssetDeliversRatingId() == null || request.getAssetDeliversRatingId().equals(0)) {
            if (request.getAssetDeliversAttributeId() == null || request.getAssetDeliversAttributeId().equals(0))
                return genericItemPOJOBuilder.buildGIErrorResponse("AssetDelivers attribute id cannot be null or 0, it is mandatory field", HttpStatus.BAD_REQUEST);

            AssetDeliversSceRTAttribute attribute = assetDeliversSceRTAttributeRepository.findOne(request.getAssetDeliversAttributeId());
            if (attribute == null || attribute.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("AssetDelivers attribute with id " + request.getAssetDeliversAttributeId() + " not found", HttpStatus.NOT_FOUND);

            rating = new AssetDeliversSceRTRating();
            rating.setRating(0f);
            rating.setCreatedDateTime(new Date());
            rating.setAssetDeliversSceRTAttribute(attribute);
        } else {
            rating = assetDeliversSceRTRatingRepository.findOne(request.getAssetDeliversRatingId());
            if (rating == null)
                return genericItemPOJOBuilder.buildGIErrorResponse("Asset Delivers rating with id " + request.getAssetDeliversRatingId() + " not found", HttpStatus.NOT_FOUND);
        }
        if (request.getJustificationReason() != null)
            rating.setJustificationReason(request.getJustificationReason());
        else
            rating.setJustificationReason("");

        rating = assetDeliversSceRTRatingRepository.save(rating);
        if (rating == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("AssetDelivers Rating Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(rating);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/save_justification_reason_for_asset_implements_rating", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveJustificationReasonForAssetImplementsRating(@RequestBody SaveJustificationReasonForAssetImplementsRating request) {

        AssetImplementsElementRTRating rating = null;
        if (request.getAssetImplementsRatingId() == null || request.getAssetImplementsRatingId().equals(0)) {
            if (request.getAssetImplementsAttributeId() == null || request.getAssetImplementsAttributeId().equals(0))
                return genericItemPOJOBuilder.buildGIErrorResponse("AssetImplements attribute id cannot be null or 0, it is mandatory field", HttpStatus.BAD_REQUEST);

            AssetImplementsElementRTAttribute attribute = assetImplementsElementRTAttributeRepository.findOne(request.getAssetImplementsAttributeId());
            if (attribute == null || attribute.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("AssetImplements attribute with id " + request.getAssetImplementsAttributeId() + " not found", HttpStatus.NOT_FOUND);

            rating = new AssetImplementsElementRTRating();
            rating.setRating(0f);
            rating.setCreatedDateTime(new Date());
            rating.setAssetImplementsElementRTAttribute(attribute);
        } else {
            rating = assetImplementsElementRTRatingRepository.findOne(request.getAssetImplementsRatingId());
            if (rating == null)
                return genericItemPOJOBuilder.buildGIErrorResponse("Asset Implements rating with id " + request.getAssetImplementsRatingId() + " not found", HttpStatus.NOT_FOUND);
        }
        if (request.getJustificationReason() != null)
            rating.setJustificationReason(request.getJustificationReason());
        else
            rating.setJustificationReason("");

        rating = assetImplementsElementRTRatingRepository.save(rating);
        if (rating == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("AssetImplements Rating Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(rating);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/save_justification_reason_for_shield_element_rating", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveJustificationReasonForShieldElementRating(@RequestBody SaveJustificationReasonForShieldElementRating request) {

        ShieldElementRTRating rating = null;
        if (request.getShieldElementRatingId() == null || request.getShieldElementRatingId().equals(0)) {
            if (request.getShieldElementAttributeId() == null || request.getShieldElementAttributeId().equals(0))
                return genericItemPOJOBuilder.buildGIErrorResponse("Shield ELement attribute id cannot be null or 0, it is mandatory field", HttpStatus.BAD_REQUEST);

            ShieldElementRTAttribute attribute = shieldElementRTAttributeRepository.findOne(request.getShieldElementAttributeId());
            if (attribute == null || attribute.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element attribute with id " + request.getShieldElementAttributeId() + " not found", HttpStatus.NOT_FOUND);

            rating = new ShieldElementRTRating();
            rating.setRating(0f);
            rating.setCreatedDateTime(new Date());
            rating.setShieldElementRTAttribute(attribute);
        } else {
            rating = shieldElementRTRatingRepository.findOne(request.getShieldElementRatingId());
            if (rating == null)
                return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element rating with id " + request.getShieldElementRatingId() + " not found", HttpStatus.NOT_FOUND);
        }
        if (request.getJustificationReason() != null)
            rating.setJustificationReason(request.getJustificationReason());
        else
            rating.setJustificationReason("");

        rating = shieldElementRTRatingRepository.save(rating);
        if (rating == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Rating Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(rating);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_asset_delivers_attribute_info/{attributeId}", method = RequestMethod.GET)
    public AssetDeliversAttributeInfo getAssetDeliversAttributeInfoRestService(@PathVariable("attributeId") Integer attributeId) {

        AssetDeliversSceRTAttribute attribute = assetDeliversSceRTAttributeRepository.findOne(attributeId);
        if (attribute == null || attribute.isArchived())
            throw new ExecException("Asset Delivers Attribute with id " + attributeId + " not found");

        AssetDeliversAttributeInfo response = new AssetDeliversAttributeInfo();
        response.setDescription(attribute.getDescription());
        response.setName(attribute.getName());
        response.setElementId(attribute.getId());

        response.setAssetDeliversLinkId(attribute.getAssetDeliversSce().getId());

        if (attribute.getCoefficient() == null)
            response.setCoefficient(1f);
        else
            response.setCoefficient(attribute.getCoefficient());
        response.setFiveRatingDescription(attribute.getFiveRatingDescription());
        response.setFourRatingDescription(attribute.getFourRatingDescription());
        response.setThreeRatingDescription(attribute.getThreeRatingDescription());
        response.setTwoRatingDescription(attribute.getTwoRatingDescription());
        response.setOneRatingDescription(attribute.getOneRatingDescription());

        response.setPerspectiveId(attribute.getCustomPerspective().getId());

        return response;
    }

    @RequestMapping(value = "/get_asset_implements_attribute_info/{attributeId}", method = RequestMethod.GET)
    public AssetImplementsAttributeInfo getAssetImplementsAttributeInfoRestService(@PathVariable("attributeId") Integer attributeId) {

        AssetImplementsElementRTAttribute attribute = assetImplementsElementRTAttributeRepository.findOne(attributeId);
        if (attribute == null || attribute.isArchived())
            throw new ExecException("Asset Implements Attribute with id " + attributeId + " not found");

        AssetImplementsAttributeInfo response = new AssetImplementsAttributeInfo();
        response.setDescription(attribute.getDescription());
        response.setName(attribute.getName());
        response.setElementId(attribute.getId());

        response.setAssetImplementsLinkId(attribute.getAssetToShieldElementMap().getId());

        if (attribute.getCoefficient() == null)
            response.setCoefficient(1f);
        else
            response.setCoefficient(attribute.getCoefficient());
        response.setFiveRatingDescription(attribute.getFiveRatingDescription());
        response.setFourRatingDescription(attribute.getFourRatingDescription());
        response.setThreeRatingDescription(attribute.getThreeRatingDescription());
        response.setTwoRatingDescription(attribute.getTwoRatingDescription());
        response.setOneRatingDescription(attribute.getOneRatingDescription());

        response.setPerspectiveId(attribute.getCustomPerspective().getId());

        return response;
    }

    @RequestMapping(value = "/get_shield_element_attribute_info/{attributeId}", method = RequestMethod.GET)
    public ShieldElementAttributeInfo getShieldElementAttributeInfoRestService(@PathVariable("attributeId") Integer attributeId) {

        ShieldElementRTAttribute attribute = shieldElementRTAttributeRepository.findOne(attributeId);
        if (attribute == null || attribute.isArchived())
            throw new ExecException("Shield Elemnet RT Attribute with id " + attributeId + " not found");

        ShieldElementAttributeInfo response = new ShieldElementAttributeInfo();
        response.setDescription(attribute.getDescription());
        response.setName(attribute.getName());
        response.setElementId(attribute.getId());

        ShieldElement shieldElement = attribute.getShieldElement();
        response.setShieldElementId(shieldElement.getId());
        response.setShieldElementName(shieldElement.getName());
        ShieldElementType shieldElementType = shieldElement.getShieldElementType();
        response.setShieldElementTypeId(shieldElementType.getId());
        response.setShieldElementTypeName(shieldElementType.getName());

        if (attribute.getCoefficient() == null)
            response.setCoefficient(1f);
        else
            response.setCoefficient(attribute.getCoefficient());
        response.setFiveRatingDescription(attribute.getFiveRatingDescription());
        response.setFourRatingDescription(attribute.getFourRatingDescription());
        response.setThreeRatingDescription(attribute.getThreeRatingDescription());
        response.setTwoRatingDescription(attribute.getTwoRatingDescription());
        response.setOneRatingDescription(attribute.getOneRatingDescription());

        response.setPerspectiveId(attribute.getCustomPerspective().getId());

        return response;
    }

    @RequestMapping(value = "/get_perspective_info/{perspectiveId}", method = RequestMethod.GET)
    public PerspectiveInfo getPerspectiveInfo(@PathVariable("perspectiveId") Integer perspectiveId) {

        CustomPerspective perspective = customPerspectiveRepository.findOne(perspectiveId);
        if (perspective == null || perspective.isArchived())
            throw new ExecException("Perspective with id " + perspectiveId + " not found");

        PerspectiveInfo response = new PerspectiveInfo();
        response.setDescription(perspective.getDescription());
        response.setName(perspective.getName());
        response.setElementId(perspective.getId());
        response.setColor(perspective.getColor());

        return response;
    }
}