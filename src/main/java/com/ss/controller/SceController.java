package com.ss.controller;

import com.ss.common.ExecException;
import com.ss.constants.*;
import com.ss.domain.asset.Asset;
import com.ss.domain.asset.AssetDeliversSce;
import com.ss.domain.asset.AssetType;
import com.ss.domain.asset.AssetTypeProtectedBySce;
import com.ss.domain.businessasset.BusinessAsset;
import com.ss.domain.businessasset.BusinessAssetToExpressionLink;
import com.ss.domain.businessasset.BusinessAssetType;
import com.ss.domain.businessasset.BusinessAssetTypeToExpressionLink;
import com.ss.domain.groups.SceGroup;
import com.ss.domain.parametertree.ContentParameterWord;
import com.ss.domain.parametertree.MethodParameterWord;
import com.ss.domain.parametertree.ObjectiveParameterWord;
import com.ss.domain.parametertree.SubjectParameterWord;
import com.ss.domain.sce.SceFulfillsShieldElement;
import com.ss.domain.sce.SecurityControlExpression;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.shieldclassification.ShieldType;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.helper.IdNameObject;
import com.ss.pojo.restservice.*;
import com.ss.pojo.restservice.sce.ExpressionDeliveredByAssetMappingSaveRequest;
import com.ss.pojo.restservice.sce.ExpressionProtectsAssetTypeMappingSaveRequest;
import com.ss.pojo.restservice.sce.ShieldElementFulfilledByExpressionMappingSaveRequest;
import com.ss.repository.asset.AssetDeliversSceRepository;
import com.ss.repository.asset.AssetRepository;
import com.ss.repository.asset.AssetTypeProtectedBySceRepository;
import com.ss.repository.asset.AssetTypeRepository;
import com.ss.repository.businessasset.BusinessAssetRepository;
import com.ss.repository.businessasset.BusinessAssetToExpressionLinkRepository;
import com.ss.repository.businessasset.BusinessAssetTypeRepository;
import com.ss.repository.businessasset.BusinessAssetTypeToExpressionLinkRepository;
import com.ss.repository.groups.SceGroupRepository;
import com.ss.repository.parametertree.ContentParameterWordRepository;
import com.ss.repository.parametertree.MethodParameterWordRepository;
import com.ss.repository.parametertree.ObjectiveParameterWordRepository;
import com.ss.repository.parametertree.SubjectParameterWordRepository;
import com.ss.repository.sce.SceFulfillsShieldElementRepository;
import com.ss.repository.sce.SecurityControlExpressionRepository;
import com.ss.repository.shieldclassification.ShieldElementRepository;
import com.ss.repository.shieldclassification.ShieldRepository;
import com.ss.repository.shieldclassification.ShieldTypeRepository;
import com.ss.service.fullhierarchytraversal.helper.*;
import com.ss.service.generictraversal.GenericItemSceGroupService;
import com.ss.service.generictraversal.GenericItemSceService;
import com.ss.service.permissions.PermissionCheckerService;
import com.ss.utils.ExpressionViewHelper;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import com.ss.utils.IdNameObjectConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.*;

@RestController
@Transactional
@RequestMapping(value = "/rest/sce")
public class SceController {

    @Autowired
    private SecurityControlExpressionRepository securityControlExpressionRepository;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private SceGroupRepository sceGroupRepository;

    @Autowired
    private GenericItemSceGroupService genericItemSceGroupService;

    @Autowired
    private IdNameObjectConverter idNameObjectConverter;

    @Autowired
    private GenericItemSceService genericItemSceService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private ObjectiveParameterWordRepository objectiveParameterWordRepository;

    @Autowired
    private MethodParameterWordRepository methodParameterWordRepository;

    @Autowired
    private ContentParameterWordRepository contentParameterWordRepository;

    @Autowired
    private SubjectParameterWordRepository subjectParameterWordRepository;

    @Autowired
    private ExpressionViewHelper expressionViewHelper;

    @Autowired
    private ShieldTypeRepository shieldTypeRepository;

    @Autowired
    private ShieldFullHelper shieldFullHelper;

    @Autowired
    private SceFulfillsShieldElementRepository sceFulfillsShieldElementRepository;

    @Autowired
    private ShieldElementRepository shieldElementRepository;

    @Autowired
    private AssetFullHelper assetFullHelper;

    @Autowired
    private AssetDeliversSceRepository assetDeliversSceRepository;

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private AssetTypeFullHelper assetTypeFullHelper;

    @Autowired
    private AssetTypeRepository assetTypeRepository;

    @Autowired
    private AssetTypeProtectedBySceRepository assetTypeProtectedBySceRepository;

    @Autowired
    private ShieldRepository shieldRepository;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    @Autowired
    private BusinessAssetFullHelper businessAssetFullHelper;

    @Autowired
    private BusinessAssetToExpressionLinkRepository businessAssetToExpressionLinkRepository;

    @Autowired
    private BusinessAssetRepository businessAssetRepository;

    @Autowired
    private BusinessAssetTypeFullHelper businessAssetTypeFullHelper;

    @Autowired
    private BusinessAssetTypeToExpressionLinkRepository businessAssetTypeToExpressionLinkRepository;

    @Autowired
    private BusinessAssetTypeRepository businessAssetTypeRepository;

    @RequestMapping(value = "/get_expression_view/{sceId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getExpressionView(@PathVariable("sceId") Integer sceId) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.EXPRESSION_VIEW))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        GenericItem response = new GenericItem();

        SecurityControlExpression sce = securityControlExpressionRepository.findOne(sceId);
        if (sce == null || sce.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Security Control Expression with id " + sceId + " not found", HttpStatus.NOT_FOUND);

        response = expressionViewHelper.getExpressionView(sce);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_expression_dv/{expressionGroupId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getExpressionDvWithGroupApplied(@PathVariable("expressionGroupId") Integer expressionGroupId) {

        List<IdNameObject> idNameObjects = null;
        if (expressionGroupId != null && !expressionGroupId.equals(0)) {

            SceGroup sceGroup = sceGroupRepository.findOne(expressionGroupId);
            if (sceGroup == null || sceGroup.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Expression Group with id : " + expressionGroupId + " not found", HttpStatus.NOT_FOUND);

            ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.SCE, GIMode.ALL_LINKED_ELEMENTS);
            PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
            perspectiveGroupInfo.setRated(false);
            perspectiveGroupInfo.setGroupFoundAndIncludeAllChildren(true);
            GenericItem genericItem = genericItemSceGroupService.buildGenericItemForSceGroup(sceGroup, viewDescriptor, perspectiveGroupInfo);
            idNameObjects = idNameObjectConverter.convertOnlyTopLevel(genericItem.getChildren());
        }

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);
        perspectiveGroupInfo.setGroupItems(idNameObjects);

        ViewDescriptor extraViewDescriptor = null;

        GenericItem expressionRootGenericItem = handleExpressionRoot(extraViewDescriptor, perspectiveGroupInfo);

        idNameObjectConverter.minifiedGenericItem(expressionRootGenericItem);
        return new ResponseEntity(expressionRootGenericItem, HttpStatus.OK);
    }

    public GenericItem handleExpressionRoot(ViewDescriptor extraViewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        GenericItem genericItem = new GenericItem();
        genericItem.setObjectType(ObjectTypeConstants.SCE_ROOT);
        genericItem.setName("");
        genericItem.setElementId(0);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        List<SecurityControlExpression> sceList = securityControlExpressionRepository.findByIsArchivedFalse();

        if (sceList != null) {
            for (SecurityControlExpression sce : sceList) {
                if (sce != null && !sce.isArchived()) {
                    children.add(genericItemSceService.buildGenericItemForSce(sce, extraViewDescriptor, perspectiveGroupInfo));
                }
            }
        }
        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
        return genericItem;

    }

    @RequestMapping(value = "/create_expression", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createExpression(@RequestBody CreateExpressionRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.SCE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        SecurityControlExpression expression = new SecurityControlExpression();

        expression.setDescription(request.getDescription());

        if (request.getObjectiveParameterId() == null || request.getObjectiveParameterId().equals(0)) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Objective Parameter is mandatory for creating expression; it cannot be null or zero", HttpStatus.BAD_REQUEST);
        }


        ObjectiveParameterWord objectiveParameterWord = objectiveParameterWordRepository.findOne(request.getObjectiveParameterId());
        if (objectiveParameterWord == null || objectiveParameterWord.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Objective Parameter with id " + request.getObjectiveParameterId() + " not found", HttpStatus.BAD_REQUEST);


        MethodParameterWord methodParameterWord = null;
        if (request.getMethodParameterId() != null && !request.getMethodParameterId().equals(0)) {
            methodParameterWord = methodParameterWordRepository.findOne(request.getMethodParameterId());
            if (methodParameterWord == null || methodParameterWord.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Method Parameter with id " + request.getMethodParameterId() + " not found", HttpStatus.BAD_REQUEST);
        }

        ContentParameterWord contentParameterWord = null;
        if (request.getContentParameterId() != null && !request.getContentParameterId().equals(0)) {
            contentParameterWord = contentParameterWordRepository.findOne(request.getContentParameterId());
            if (contentParameterWord == null || contentParameterWord.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Content Parameter with id " + request.getContentParameterId() + " not found", HttpStatus.BAD_REQUEST);
        }

        SubjectParameterWord subjectParameterWord = null;
        if (request.getSubjectParameterId() != null && !request.getSubjectParameterId().equals(0)) {
            subjectParameterWord = subjectParameterWordRepository.findOne(request.getSubjectParameterId());
            if (subjectParameterWord == null || subjectParameterWord.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Subject Parameter with id " + request.getSubjectParameterId() + " not found", HttpStatus.BAD_REQUEST);
        }

        Integer tempOdosId = null, tempMdosId = null, tempCdosId = null, tempSdosId = null;
        tempOdosId = objectiveParameterWord.getId();
        if (methodParameterWord != null)
            tempMdosId = methodParameterWord.getId();
        if (contentParameterWord != null)
            tempCdosId = contentParameterWord.getId();
        if (subjectParameterWord != null)
            tempSdosId = subjectParameterWord.getId();
        //check for duplicate expression case
        List<SecurityControlExpression> scesWithSameParameters = securityControlExpressionRepository.findByObjectiveParameterWordIdAndMethodParameterWordIdAndContentParameterWordIdAndSubjectParameterWordIdAndIsArchivedFalse(tempOdosId, tempMdosId, tempCdosId, tempSdosId);

        if (scesWithSameParameters != null && !scesWithSameParameters.isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Expression with selected Parameters already exist", HttpStatus.CONFLICT);

        expression.setArchived(false);
        expression.setContentParameterWord(contentParameterWord);
        expression.setDefault(false);
        expression.setMethodParameterWord(methodParameterWord);
        expression.setObjectiveParameterWord(objectiveParameterWord);
        expression.setSubjectParameterWord(subjectParameterWord);

        expression = securityControlExpressionRepository.save(expression);

        if (expression == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Security Control Expression Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(expression);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_expression_info/{expressionId}", method = RequestMethod.GET)
    public ExpressionInfo getShieldElementInfo(@PathVariable("expressionId") Integer expressionId) {

        SecurityControlExpression sce = securityControlExpressionRepository.findOne(expressionId);
        if (sce == null || sce.isArchived())
            throw new ExecException("Expression with id " + expressionId + " not found");
        ExpressionInfo response = new ExpressionInfo();
        response.setDescription(sce.getDescription());
        response.setElementId(sce.getId());
        ContentParameterWord contentParameterWord = sce.getContentParameterWord();
        if (contentParameterWord == null)
            response.setContentParameterId(0);
        else
            response.setContentParameterId(contentParameterWord.getId());
        SubjectParameterWord subjectParameterWord = sce.getSubjectParameterWord();
        if (subjectParameterWord == null)
            response.setSubjectParameterId(0);
        else
            response.setSubjectParameterId(subjectParameterWord.getId());
        MethodParameterWord methodParameterWord = sce.getMethodParameterWord();
        if (methodParameterWord == null)
            response.setMethodParameterId(0);
        else
            response.setMethodParameterId(methodParameterWord.getId());
        ObjectiveParameterWord objectiveParameterWord = sce.getObjectiveParameterWord();
        if (objectiveParameterWord == null)
            response.setObjectiveParameterId(0);
        else
            response.setObjectiveParameterId(objectiveParameterWord.getId());

        return response;
    }

    @RequestMapping(value = "/edit_expression", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editExpression(@RequestBody EditExpressionRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.SCE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getObjectiveParameterId() == null || request.getObjectiveParameterId().equals(0)) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Objective Parameter is mandatory for creating expression; it cannot be null or zero", HttpStatus.BAD_REQUEST);
        }

        SecurityControlExpression expression = securityControlExpressionRepository.findOne(request.getElementId());

        if (expression == null || expression.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Expression with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);


        Integer tempOdosId = null, tempMdosId = null, tempCdosId = null, tempSdosId = null;
        tempOdosId = request.getObjectiveParameterId();
        if (request.getMethodParameterId() != null && !request.getMethodParameterId().equals(0))
            tempMdosId = request.getMethodParameterId();
        if (request.getContentParameterId() != null && !request.getContentParameterId().equals(0))
            tempCdosId = request.getContentParameterId();
        if (request.getSubjectParameterId() != null && !request.getSubjectParameterId().equals(0))
            tempSdosId = request.getSubjectParameterId();

        //check for duplicate expression case
        List<SecurityControlExpression> scesWithSameParameters = securityControlExpressionRepository.findByObjectiveParameterWordIdAndMethodParameterWordIdAndContentParameterWordIdAndSubjectParameterWordIdAndIsArchivedFalse(tempOdosId, tempMdosId, tempCdosId, tempSdosId);

        if (scesWithSameParameters != null && !scesWithSameParameters.isEmpty()) {
            if (!scesWithSameParameters.get(0).getId().equals(request.getElementId()))
                return genericItemPOJOBuilder.buildGIErrorResponse("Expression with selected Parameters already exist", HttpStatus.CONFLICT);
        }

        expression.setDescription(request.getDescription());

        ObjectiveParameterWord objectiveParameterWord = objectiveParameterWordRepository.findOne(request.getObjectiveParameterId());
        if (objectiveParameterWord == null || objectiveParameterWord.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Objective Parameter with id " + request.getObjectiveParameterId() + " not found", HttpStatus.BAD_REQUEST);


        MethodParameterWord methodParameterWord = null;
        if (request.getMethodParameterId() != null && !request.getMethodParameterId().equals(0)) {
            methodParameterWord = methodParameterWordRepository.findOne(request.getMethodParameterId());
            if (methodParameterWord == null || methodParameterWord.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Method Parameter with id " + request.getMethodParameterId() + " not found", HttpStatus.BAD_REQUEST);
        }

        ContentParameterWord contentParameterWord = null;
        if (request.getContentParameterId() != null && !request.getContentParameterId().equals(0)) {
            contentParameterWord = contentParameterWordRepository.findOne(request.getContentParameterId());
            if (contentParameterWord == null || contentParameterWord.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Content Parameter with id " + request.getContentParameterId() + " not found", HttpStatus.BAD_REQUEST);
        }

        SubjectParameterWord subjectParameterWord = null;
        if (request.getSubjectParameterId() != null && !request.getSubjectParameterId().equals(0)) {
            subjectParameterWord = subjectParameterWordRepository.findOne(request.getSubjectParameterId());
            if (subjectParameterWord == null || subjectParameterWord.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Subject Parameter with id " + request.getSubjectParameterId() + " not found", HttpStatus.BAD_REQUEST);
        }

        expression.setArchived(false);
        expression.setContentParameterWord(contentParameterWord);
        expression.setDefault(false);
        expression.setMethodParameterWord(methodParameterWord);
        expression.setObjectiveParameterWord(objectiveParameterWord);
        expression.setSubjectParameterWord(subjectParameterWord);

        expression = securityControlExpressionRepository.save(expression);

        if (expression == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Security Control Expression Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(expression);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_all_expression_groups", method = RequestMethod.GET)
    public ResponseEntity<List<GenericItem>> getAllExpressionGroups() {

        List<GenericItem> response = new ArrayList<>();
        List<SceGroup> sceGroupList = sceGroupRepository.findByIsArchivedFalse();

        for (SceGroup sceGroup : sceGroupList) {
            if (sceGroup != null && !sceGroup.isArchived())
                response.add(genericItemPOJOBuilder.buildGenericPOJO(sceGroup));
        }

        return new ResponseEntity(response, HttpStatus.OK);
    }

    //get dropdown 2 starting point options.
    @RequestMapping(value = "/get_dropdown_two_options_for_expression_starting_point", method = RequestMethod.GET)
    public List<StartingPointOption> getDropdownTwoOptionsForExpressionStartingPoint() {

        List<StartingPointOption> response = new ArrayList<>();

        //asset shall
        StartingPointOption assetShallStartingPointOption = new StartingPointOption();
        assetShallStartingPointOption.setLabel("Security Asset");
        assetShallStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_ROOT);
        assetShallStartingPointOption.setProtectionType(ProtectionType.SHALL);
        assetShallStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.ASSET);
        assetShallStartingPointOption.setLinkTypeAttr(ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK);
        assetShallStartingPointOption.setLinkNameAttr(LinkName.EXPRESSION_TO_ASSET);
        response.add(assetShallStartingPointOption);

        /*// asset could
        StartingPointOption assetStartingPointOption = new StartingPointOption();
        assetStartingPointOption.setLabel("Could be Delivered by Asset");
        assetStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_ROOT);
        assetStartingPointOption.setProtectionType(ProtectionType.COULD);
        response.add(assetStartingPointOption);

        //asset could shall
        StartingPointOption assetCouldShallStartingPointOption = new StartingPointOption();
        assetCouldShallStartingPointOption.setLabel("Could or Shall be Delivered by Asset");
        assetCouldShallStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_ROOT);
        assetCouldShallStartingPointOption.setProtectionType(ProtectionType.COULD_AND_SHALL);
        response.add(assetCouldShallStartingPointOption);*/

        StartingPointOption businessAssetShallStartingPointOption = new StartingPointOption();
        businessAssetShallStartingPointOption.setLabel("Value Asset");
        businessAssetShallStartingPointOption.setStartingPoint(ObjectTypeConstants.BUSINESS_ASSET_ROOT);
        businessAssetShallStartingPointOption.setProtectionType(ProtectionType.SHALL);
        businessAssetShallStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.BUSINESS_ASSET);
        businessAssetShallStartingPointOption.setLinkTypeAttr(ObjectTypeConstants.BUSINESS_ASSET_TO_EXPRESSION_LINK);
        businessAssetShallStartingPointOption.setLinkNameAttr(LinkName.EXPRESSION_TO_BUSINESS_ASSET);
        response.add(businessAssetShallStartingPointOption);


        //asset type shall
        StartingPointOption assetTypeShallStartingPointOption = new StartingPointOption();
        assetTypeShallStartingPointOption.setLabel("Security Asset Type");
        assetTypeShallStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_TYPE_ROOT);
        assetTypeShallStartingPointOption.setProtectionType(ProtectionType.SHALL);
        assetTypeShallStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.ASSET_TYPE);
        assetTypeShallStartingPointOption.setLinkTypeAttr(ObjectTypeConstants.ASSET_TYPE_TO_EXPRESSION_LINK);
        assetTypeShallStartingPointOption.setLinkNameAttr(LinkName.EXPRESSION_TO_ASSET_TYPE);
        response.add(assetTypeShallStartingPointOption);

        /*//asset type could
        StartingPointOption assetTypeCouldStartingPointOption = new StartingPointOption();
        assetTypeCouldStartingPointOption.setLabel("Could Protect Asset Type");
        assetTypeCouldStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_TYPE_ROOT);
        assetTypeCouldStartingPointOption.setProtectionType(ProtectionType.COULD);
        response.add(assetTypeCouldStartingPointOption);

        //asset type could and shall
        StartingPointOption assetTypeCouldAndShallStartingPointOption = new StartingPointOption();
        assetTypeCouldAndShallStartingPointOption.setLabel("Could or Shall Protect Asset Type");
        assetTypeCouldAndShallStartingPointOption.setStartingPoint(ObjectTypeConstants.ASSET_TYPE_ROOT);
        assetTypeCouldAndShallStartingPointOption.setProtectionType(ProtectionType.COULD_AND_SHALL);
        response.add(assetTypeCouldAndShallStartingPointOption);*/

        //asset type shall
        StartingPointOption businessAssetTypeShallStartingPointOption = new StartingPointOption();
        businessAssetTypeShallStartingPointOption.setLabel("Value Asset Type");
        businessAssetTypeShallStartingPointOption.setStartingPoint(ObjectTypeConstants.BUSINESS_ASSET_TYPE_ROOT);
        businessAssetTypeShallStartingPointOption.setProtectionType(ProtectionType.SHALL);
        businessAssetTypeShallStartingPointOption.setObjectTypeForIcon(ObjectTypeConstants.BUSINESS_ASSET_TYPE);
        businessAssetTypeShallStartingPointOption.setLinkTypeAttr(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_EXPRESSION_LINK);
        businessAssetTypeShallStartingPointOption.setLinkNameAttr(LinkName.EXPRESSION_TO_BUSINESS_ASSET_TYPE);
        response.add(businessAssetTypeShallStartingPointOption);

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
                    shieldOption.setLabel(shield.getName());
                    shieldOption.setObjectTypeForIcon(ObjectTypeConstants.SHIELD);

                    shieldOption.setLinkTypeAttr(ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK);
                    shieldOption.setLinkNameAttr(LinkName.EXPRESSION_TO_ELEMENT);
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
                    shieldOption.setShieldId(standard.getId());
                    shieldOption.setLabel(standard.getName());
                    shieldOption.setObjectTypeForIcon(ObjectTypeConstants.STANDARD);
                    shieldOption.setLinkTypeAttr(ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK);
                    shieldOption.setLinkNameAttr(LinkName.EXPRESSION_TO_ELEMENT);
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
                    shieldOption.setLinkTypeAttr(ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK);
                    shieldOption.setLinkNameAttr(LinkName.EXPRESSION_TO_ELEMENT);
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
                    shieldOption.setLinkTypeAttr(ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK);
                    shieldOption.setLinkNameAttr(LinkName.EXPRESSION_TO_ELEMENT);
                    //else
                    //    shieldOption.setLabel("Fulfill " + standard.getName());
                    response.add(shieldOption);
                }
            }
        }

        return response;
    }

    @RequestMapping(value = "/get_expression_analyze_mode_dv", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> getExpressionAnalyzeModeDv(@RequestBody ExpressionMapRequestInfo expressionMapRequestInfo) {

        ViewDescriptor viewDescriptor = null;
        switch (expressionMapRequestInfo.getDropDownTwoStartingPoint()) {
            case ObjectTypeConstants.ASSET_ROOT:
                if (expressionMapRequestInfo.getDropDownTwoProtectionType() == null || expressionMapRequestInfo.getDropDownTwoProtectionType().equals(ProtectionType.COULD_AND_SHALL)) {

                    viewDescriptor = new ViewDescriptor(GIView.ASSET, GIMode.ALL_LINKED_ELEMENTS);

                } else {
                    switch (expressionMapRequestInfo.getDropDownTwoProtectionType()) {
                        case ProtectionType.COULD:
                            viewDescriptor = new ViewDescriptor(GIView.ASSET, GIMode.COULD_DELIVER);
                            break;
                        case ProtectionType.SHALL:
                            viewDescriptor = new ViewDescriptor(GIView.ASSET, GIMode.SHALL_DELIVER);
                            break;
                        default: {
                            return genericItemPOJOBuilder.buildGIErrorResponse("Unknown protection type : " + expressionMapRequestInfo.getDropDownTwoProtectionType(), HttpStatus.BAD_REQUEST);
                        }
                    }
                }
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_ROOT:
                if (expressionMapRequestInfo.getDropDownTwoProtectionType() == null || expressionMapRequestInfo.getDropDownTwoProtectionType().equals(ProtectionType.COULD_AND_SHALL)) {

                    viewDescriptor = new ViewDescriptor(GIView.BUSINESS_ASSET, GIMode.ALL_LINKED_ELEMENTS);

                } else {
                    switch (expressionMapRequestInfo.getDropDownTwoProtectionType()) {
                        case ProtectionType.COULD:
                            viewDescriptor = new ViewDescriptor(GIView.BUSINESS_ASSET, GIMode.COULD_DELIVER);
                            break;
                        case ProtectionType.SHALL:
                            viewDescriptor = new ViewDescriptor(GIView.BUSINESS_ASSET, GIMode.SHALL_DELIVER);
                            break;
                        default: {
                            return genericItemPOJOBuilder.buildGIErrorResponse("Unknown protection type : " + expressionMapRequestInfo.getDropDownTwoProtectionType(), HttpStatus.BAD_REQUEST);
                        }
                    }
                }
                break;
            case ObjectTypeConstants.ASSET_TYPE_ROOT:
                if (expressionMapRequestInfo.getDropDownTwoProtectionType() == null || expressionMapRequestInfo.getDropDownTwoProtectionType().equals(ProtectionType.COULD_AND_SHALL)) {

                    viewDescriptor = new ViewDescriptor(GIView.ASSET_TYPE, GIMode.ALL_LINKED_ELEMENTS);

                } else {
                    switch (expressionMapRequestInfo.getDropDownTwoProtectionType()) {
                        case ProtectionType.COULD:
                            viewDescriptor = new ViewDescriptor(GIView.ASSET_TYPE, GIMode.COULD_PROTECT);
                            break;
                        case ProtectionType.SHALL:
                            viewDescriptor = new ViewDescriptor(GIView.ASSET_TYPE, GIMode.SHALL_PROTECT);
                            break;
                        default: {
                            return genericItemPOJOBuilder.buildGIErrorResponse("Unknown protection type : " + expressionMapRequestInfo.getDropDownTwoProtectionType(), HttpStatus.BAD_REQUEST);
                        }
                    }
                }
                break;
            case ObjectTypeConstants.BUSINESS_ASSET_TYPE_ROOT:
                if (expressionMapRequestInfo.getDropDownTwoProtectionType() == null || expressionMapRequestInfo.getDropDownTwoProtectionType().equals(ProtectionType.COULD_AND_SHALL)) {

                    viewDescriptor = new ViewDescriptor(GIView.BUSINESS_ASSET_TYPE, GIMode.ALL_LINKED_ELEMENTS);

                } else {
                    switch (expressionMapRequestInfo.getDropDownTwoProtectionType()) {
                        case ProtectionType.COULD:
                            viewDescriptor = new ViewDescriptor(GIView.BUSINESS_ASSET_TYPE, GIMode.COULD_PROTECT);
                            break;
                        case ProtectionType.SHALL:
                            viewDescriptor = new ViewDescriptor(GIView.BUSINESS_ASSET_TYPE, GIMode.SHALL_PROTECT);
                            break;
                        default: {
                            return genericItemPOJOBuilder.buildGIErrorResponse("Unknown protection type : " + expressionMapRequestInfo.getDropDownTwoProtectionType(), HttpStatus.BAD_REQUEST);
                        }
                    }
                }
                break;
            case ObjectTypeConstants.SHIELD_ROOT:
                viewDescriptor = new ViewDescriptor(GIView.SHIELD_ELEMENT, GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID);
                viewDescriptor.setShieldId(expressionMapRequestInfo.getDropDownTwoShieldId());
                break;
            default:
                return genericItemPOJOBuilder.buildGIErrorResponse("Unsupported. Cannot map Shield to   " + expressionMapRequestInfo.getDropDownTwoStartingPoint(), HttpStatus.BAD_REQUEST);
        }

        List<IdNameObject> idNameObjects = null;
        if (expressionMapRequestInfo.getDropDownOneGroupId() != null && !expressionMapRequestInfo.getDropDownOneGroupId().equals(0)) {

            SceGroup sceGroup = sceGroupRepository.findOne(expressionMapRequestInfo.getDropDownOneGroupId());
            if (sceGroup == null || sceGroup.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Expression Group with id : " + expressionMapRequestInfo.getDropDownOneGroupId() + " not found", HttpStatus.NOT_FOUND);

            ViewDescriptor viewDescriptor1 = new ViewDescriptor(GIView.SCE, GIMode.ALL_LINKED_ELEMENTS);
            PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
            perspectiveGroupInfo.setRated(false);
            perspectiveGroupInfo.setGroupFoundAndIncludeAllChildren(true);
            GenericItem genericItem = genericItemSceGroupService.buildGenericItemForSceGroup(sceGroup, viewDescriptor1, perspectiveGroupInfo);
            idNameObjects = idNameObjectConverter.convertOnlyTopLevel(genericItem.getChildren());
        }

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);
        perspectiveGroupInfo.setGroupItems(idNameObjects);

        GenericItem expressionRootGenericItem = handleExpressionRoot(viewDescriptor, perspectiveGroupInfo);

        idNameObjectConverter.minifiedGenericItem(expressionRootGenericItem);
        return new ResponseEntity(expressionRootGenericItem, HttpStatus.OK);

    }

    // get protected by association for asset type
    @RequestMapping(value = "/get_fulfilled_by_associations_for_expression/{expressionId}/{shieldId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getFulfilledByAssociationsForExpression(@PathVariable("expressionId") Integer expressionId, @PathVariable("shieldId") Integer shieldId) {

        GenericItem response = new GenericItem();
        SecurityControlExpression securityControlExpression = securityControlExpressionRepository.findOne(expressionId);
        if (securityControlExpression == null || securityControlExpression.isArchived()) {
            throw new ExecException("Expression with id " + expressionId + " not found");
        }

        if (shieldId == null || shieldId.equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("shieldId cannot be null or 0; it is a mandatory field", HttpStatus.BAD_REQUEST);
        Shield shield = shieldRepository.findOne(shieldId);
        if (shield == null || shield.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("shieldId with id " + shieldId + " not found", HttpStatus.NOT_FOUND);

        List<SceFulfillsShieldElement> sceFulfillsShieldElementList = sceFulfillsShieldElementRepository.findBySceIdAndShieldElementShieldId(securityControlExpression.getId(), shieldId);

        //List<SceFulfillsShieldElement> sceFulfillsShieldElementList = securityControlExpression.getSceFulfillsShieldElementList();
        Set<Integer> mappedShieldElements = new HashSet<>();

        if (sceFulfillsShieldElementList != null) {
            for (SceFulfillsShieldElement mapEntry : sceFulfillsShieldElementList) {
                if (mapEntry != null && !mapEntry.isArchived()) {
                    ShieldElement shieldElement = mapEntry.getShieldElement();
                    if (shieldElement != null && !shieldElement.isArchived())
                        mappedShieldElements.add(shieldElement.getId());
                }
            }
        }

        ResponseEntity<GenericItem> shieldDvResponseEntity = shieldFullHelper.getShieldFullWithDescriptor(shieldId, 0, null, null, 0);

        //update each genericItem with setFulfilledTrue/false
        updateSetFulfilled(shieldDvResponseEntity.getBody(), mappedShieldElements);

        return shieldDvResponseEntity;
    }

    private void updateSetFulfilled(GenericItem genericItem, Set<Integer> mappedShieldElements) {
        if (genericItem != null) {
            if ((genericItem.getObjectType().equals(ObjectTypeConstants.SHIELD_ELEMENT) || genericItem.getObjectType().equals(ObjectTypeConstants.STANDARD_ELEMENT) || genericItem.getObjectType().equals(ObjectTypeConstants.BUSINESS_CONTROL) || genericItem.getObjectType().equals(ObjectTypeConstants.THREAT_ELEMENT)) && mappedShieldElements.contains(genericItem.getElementId()))
                genericItem.setFulfillsMapped(true);
        }
        if (genericItem.getChildren() != null) {
            for (GenericItem child : genericItem.getChildren()) {
                updateSetFulfilled(child, mappedShieldElements);
            }
        }
    }

    @RequestMapping(value = "/save_fulfilled_by_associations_for_expression", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveFulfilledByAssociationsForExpression(@RequestBody ShieldElementFulfilledByExpressionMappingSaveRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_ELEMENT_FULFILLED_BY_EXPRESSION_ASSOCIATION))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        SecurityControlExpression securityControlExpression = securityControlExpressionRepository.findOne(request.getExpressionId());
        if (securityControlExpression == null && securityControlExpression.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Expression with id " + request.getExpressionId() + " not found", HttpStatus.NOT_FOUND);
        }

        if (request.getShieldId() == null || request.getShieldId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("shieldId cannot be null or 0; it is a mandatory field", HttpStatus.BAD_REQUEST);
        Shield shield = shieldRepository.findOne(request.getShieldId());
        if (shield == null || shield.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("shieldId with id " + request.getShieldId() + " not found", HttpStatus.NOT_FOUND);

        List<SceFulfillsShieldElement> sceFulfillsShieldElementList = sceFulfillsShieldElementRepository.findBySceIdAndShieldElementShieldId(securityControlExpression.getId(), request.getShieldId());

        List<Integer> newMappings = new ArrayList<>();
        newMappings.addAll(request.getAssociatedElements());

        Map<Integer, SceFulfillsShieldElement> elementIdToFulfillsRecordMap = polulateMapOfElementIdToFulfillsRecord(sceFulfillsShieldElementList);

        for (Integer elementId : request.getAssociatedElements()) {
            if (elementIdToFulfillsRecordMap.get(elementId) != null) {
                SceFulfillsShieldElement mapRecord = elementIdToFulfillsRecordMap.get(elementId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    SceFulfillsShieldElement returnValue = sceFulfillsShieldElementRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to SceFulfillsShieldElementMap Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                }
                elementIdToFulfillsRecordMap.remove(elementId);
            } else {
                SceFulfillsShieldElement newFulfillsEntry = new SceFulfillsShieldElement();
                newFulfillsEntry.setArchived(false);
                newFulfillsEntry.setDefault(false);
                ShieldElement shieldElement = shieldElementRepository.findOne(elementId);
                if (shieldElement == null || shieldElement.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Element with id " + elementId + " not found", HttpStatus.NOT_FOUND);
                newFulfillsEntry.setSce(securityControlExpression);
                newFulfillsEntry.setShieldElement(shieldElement);
                SceFulfillsShieldElement returnValue = sceFulfillsShieldElementRepository.save(newFulfillsEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to SceFulfillsShieldElementMap Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        for (Map.Entry<Integer, SceFulfillsShieldElement> entry : elementIdToFulfillsRecordMap.entrySet()) {
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

    private Map<Integer, SceFulfillsShieldElement> polulateMapOfElementIdToFulfillsRecord(List<SceFulfillsShieldElement> sceFulfillsShieldElementList) {
        Map<Integer, SceFulfillsShieldElement> map = new HashMap<>();
        for (SceFulfillsShieldElement fulfillsEntry : sceFulfillsShieldElementList) {
            ShieldElement shieldElement = fulfillsEntry.getShieldElement();
            if (shieldElement != null && !shieldElement.isArchived()) {
                if (map.get(shieldElement.getId()) != null) {
                    if (!fulfillsEntry.isArchived()) {
                        map.put(shieldElement.getId(), fulfillsEntry);
                    }

                } else {
                    map.put(shieldElement.getId(), fulfillsEntry);
                }
            }
        }
        return map;
    }

    // get delivers association for asset
    @RequestMapping(value = "/get_delivered_by_associations_for_expression/{expressionId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getDeliversByAssociationsForExpression(@PathVariable("expressionId") Integer expressionId) {

        SecurityControlExpression securityControlExpression = securityControlExpressionRepository.findOne(expressionId);
        if (securityControlExpression == null || securityControlExpression.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Security Control Expression with id " + expressionId + " not found", HttpStatus.NOT_FOUND);
        }
        List<AssetDeliversSce> assetDeliversSceList = securityControlExpression.getAssetDeliversSceList();
        Set<Integer> mappedCouldAssets = new HashSet<>();
        Set<Integer> mappedShallAssets = new HashSet<>();

        if (assetDeliversSceList != null) {
            for (AssetDeliversSce mapEntry : assetDeliversSceList) {
                if (mapEntry != null && !mapEntry.isArchived()) {
                    Asset asset = mapEntry.getAsset();
                    if (asset != null && !asset.isArchived()) {
                        if (mapEntry.getShallCould().equals(ProtectionType.COULD))
                            mappedCouldAssets.add(asset.getId());
                        else if (mapEntry.getShallCould().equals(ProtectionType.SHALL))
                            mappedShallAssets.add(asset.getId());
                        else
                            throw new ExecException("Unknown protection type found in DB: " + mapEntry.getShallCould());
                    }
                }
            }
        }

        ResponseEntity<GenericItem> assetDvResponseEntity = assetFullHelper.getAssetFullWithDescriptor(0, null, null);

        //update each genericItem with setProtectionType shall or could
        updateSetDeliveredByType(assetDvResponseEntity.getBody(), mappedCouldAssets, mappedShallAssets);

        return assetDvResponseEntity;
    }

    /*todo */
    @RequestMapping(value = "/get_business_asset_associations_for_expression/{expressionId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getBusinessAssetAssociationsForExpression(@PathVariable("expressionId") Integer expressionId) {

        SecurityControlExpression securityControlExpression = securityControlExpressionRepository.findOne(expressionId);
        if (securityControlExpression == null || securityControlExpression.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Security Control Expression with id " + expressionId + " not found", HttpStatus.NOT_FOUND);
        }
        List<BusinessAssetToExpressionLink> businessAssetToExpressionLinks = securityControlExpression.getBusinessAssetToExpressionLinks();
        Set<Integer> mappedCouldAssets = new HashSet<>();
        Set<Integer> mappedShallAssets = new HashSet<>();

        if (businessAssetToExpressionLinks != null) {
            for (BusinessAssetToExpressionLink mapEntry : businessAssetToExpressionLinks) {
                if (mapEntry != null && !mapEntry.isArchived()) {
                    BusinessAsset asset = mapEntry.getBusinessAsset();
                    if (asset != null && !asset.isArchived()) {
                        if (mapEntry.getShallCould().equals(ProtectionType.COULD))
                            mappedCouldAssets.add(asset.getId());
                        else if (mapEntry.getShallCould().equals(ProtectionType.SHALL))
                            mappedShallAssets.add(asset.getId());
                        else
                            throw new ExecException("Unknown protection type found in DB: " + mapEntry.getShallCould());
                    }
                }
            }
        }

        ResponseEntity<GenericItem> assetDvResponseEntity = businessAssetFullHelper.getAssetFullWithDescriptor(0, null, null);

        //update each genericItem with setProtectionType shall or could
        updateSetDeliveredByTypeForBusinessAsset(assetDvResponseEntity.getBody(), mappedCouldAssets, mappedShallAssets);

        return assetDvResponseEntity;
    }

    private void updateSetDeliveredByTypeForBusinessAsset(GenericItem genericItem, Set<Integer> mappedCouldAssets, Set<Integer> mappedShallAssets) {
        if (genericItem != null) {
            if (genericItem.getObjectType().equals(ObjectTypeConstants.BUSINESS_ASSET)) {
                if (mappedCouldAssets.contains(genericItem.getElementId()))
                    genericItem.setProtectionType(ProtectionType.COULD);
                else if (mappedShallAssets.contains(genericItem.getElementId()))
                    genericItem.setProtectionType(ProtectionType.SHALL);
            }
        }
        if (genericItem.getChildren() != null) {
            for (GenericItem child : genericItem.getChildren()) {
                updateSetDeliveredByTypeForBusinessAsset(child, mappedCouldAssets, mappedShallAssets);
            }
        }
    }

    private void updateSetDeliveredByType(GenericItem genericItem, Set<Integer> mappedCouldAssets, Set<Integer> mappedShallAssets) {
        if (genericItem != null) {
            if (genericItem.getObjectType().equals(ObjectTypeConstants.ASSET)) {
                if (mappedCouldAssets.contains(genericItem.getElementId()))
                    genericItem.setProtectionType(ProtectionType.COULD);
                else if (mappedShallAssets.contains(genericItem.getElementId()))
                    genericItem.setProtectionType(ProtectionType.SHALL);
            }
        }
        if (genericItem.getChildren() != null) {
            for (GenericItem child : genericItem.getChildren()) {
                updateSetDeliveredByType(child, mappedCouldAssets, mappedShallAssets);
            }
        }
    }

    @RequestMapping(value = "/save_delivered_by_associations_for_expression", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveDeliveredByAssociationsForExpression(@RequestBody ExpressionDeliveredByAssetMappingSaveRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_ASSET_DELIVERS_EXPRESSION_ASSOCIATION))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        SecurityControlExpression securityControlExpression = securityControlExpressionRepository.findOne(request.getExpressionId());
        if (securityControlExpression == null && securityControlExpression.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Expression with id " + request.getExpressionId() + " not found", HttpStatus.NOT_FOUND);
        }
        List<AssetDeliversSce> assetDeliversSceList = securityControlExpression.getAssetDeliversSceList();

        Set<Integer> newMappings = new HashSet<>();
        newMappings.addAll(new HashSet(request.getAssociatedCouldAssets()));
        newMappings.addAll(new HashSet(request.getAssociatedShallAssets()));

        Map<Integer, AssetDeliversSce> assetIdToAlreadyAssociatedDeliversRecordMap = polulateMapOfAssetIdToDeliversRecord(assetDeliversSceList);

        for (Integer assetId : request.getAssociatedCouldAssets()) {
            if (assetIdToAlreadyAssociatedDeliversRecordMap.get(assetId) != null) {
                AssetDeliversSce mapRecord = assetIdToAlreadyAssociatedDeliversRecordMap.get(assetId);
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
                assetIdToAlreadyAssociatedDeliversRecordMap.remove(assetId);
            } else {
                AssetDeliversSce newAssetCouldDeliverSceEntry = new AssetDeliversSce();
                newAssetCouldDeliverSceEntry.setArchived(false);
                Asset asset = assetRepository.findOne(assetId);
                if (asset == null || asset.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Asset with id " + assetId + " not found", HttpStatus.NOT_FOUND);
                newAssetCouldDeliverSceEntry.setSce(securityControlExpression);
                newAssetCouldDeliverSceEntry.setAsset(asset);
                newAssetCouldDeliverSceEntry.setShallCould(ProtectionType.COULD);
                AssetDeliversSce returnValue = assetDeliversSceRepository.save(newAssetCouldDeliverSceEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetDeliversSce Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        for (Integer assetId : request.getAssociatedShallAssets()) {
            if (assetIdToAlreadyAssociatedDeliversRecordMap.get(assetId) != null) {
                AssetDeliversSce mapRecord = assetIdToAlreadyAssociatedDeliversRecordMap.get(assetId);
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
                assetIdToAlreadyAssociatedDeliversRecordMap.remove(assetId);
            } else {
                AssetDeliversSce newAssetShallDeliverSceEntry = new AssetDeliversSce();
                newAssetShallDeliverSceEntry.setArchived(false);
                Asset asset = assetRepository.findOne(assetId);
                if (asset == null || asset.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Asset with id " + assetId + " not found", HttpStatus.NOT_FOUND);
                newAssetShallDeliverSceEntry.setSce(securityControlExpression);
                newAssetShallDeliverSceEntry.setAsset(asset);
                newAssetShallDeliverSceEntry.setShallCould(ProtectionType.SHALL);
                AssetDeliversSce returnValue = assetDeliversSceRepository.save(newAssetShallDeliverSceEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetDeliversSce Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


        for (Map.Entry<Integer, AssetDeliversSce> entry : assetIdToAlreadyAssociatedDeliversRecordMap.entrySet()) {
            AssetDeliversSce assetDeliversSce = entry.getValue();
            if (!assetDeliversSce.isArchived()) {
                assetDeliversSce.setArchived(true);
                AssetDeliversSce returnValue = assetDeliversSceRepository.save(assetDeliversSce);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetDeliversSce Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    private Map<Integer, AssetDeliversSce> polulateMapOfAssetIdToDeliversRecord(List<AssetDeliversSce> assetDeliversSceList) {
        Map<Integer, AssetDeliversSce> map = new HashMap<>();
        for (AssetDeliversSce assetDeliversSce : assetDeliversSceList) {
            Asset asset = assetDeliversSce.getAsset();
            if (asset != null && !asset.isArchived()) {
                if (map.get(asset.getId()) != null) {
                    if (!assetDeliversSce.isArchived()) {
                        map.put(asset.getId(), assetDeliversSce);
                    }
                } else {
                    map.put(asset.getId(), assetDeliversSce);
                }
            }
        }
        return map;
    }

    @RequestMapping(value = "/save_business_asset_associations_for_expression", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveBusinessAssetAssociationsForExpression(@RequestBody ExpressionDeliveredByAssetMappingSaveRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_BUSINESS_ASSET_TO_EXPRESSION_ASSOCIATION))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        SecurityControlExpression securityControlExpression = securityControlExpressionRepository.findOne(request.getExpressionId());
        if (securityControlExpression == null && securityControlExpression.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Expression with id " + request.getExpressionId() + " not found", HttpStatus.NOT_FOUND);
        }
        List<BusinessAssetToExpressionLink> businessAssetToExpressionLinks = securityControlExpression.getBusinessAssetToExpressionLinks();

        Set<Integer> newMappings = new HashSet<>();
        newMappings.addAll(new HashSet(request.getAssociatedCouldAssets()));
        newMappings.addAll(new HashSet(request.getAssociatedShallAssets()));

        Map<Integer, BusinessAssetToExpressionLink> assetIdToAlreadyAssociatedAssetExpressionLinkRecordMap = polulateMapOfAssetIdToDeliversRecordForBusinessAsset(businessAssetToExpressionLinks);

        for (Integer assetId : request.getAssociatedCouldAssets()) {
            if (assetIdToAlreadyAssociatedAssetExpressionLinkRecordMap.get(assetId) != null) {
                BusinessAssetToExpressionLink mapRecord = assetIdToAlreadyAssociatedAssetExpressionLinkRecordMap.get(assetId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    mapRecord.setShallCould(ProtectionType.COULD);
                    BusinessAssetToExpressionLink returnValue = businessAssetToExpressionLinkRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetToExpressionLink Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                } else {
                    if (!mapRecord.getShallCould().equals(ProtectionType.COULD)) {
                        mapRecord.setShallCould(ProtectionType.COULD);
                        BusinessAssetToExpressionLink returnValue = businessAssetToExpressionLinkRepository.save(mapRecord);
                        if (returnValue == null)
                            return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetToExpressionLink Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }
                assetIdToAlreadyAssociatedAssetExpressionLinkRecordMap.remove(assetId);
            } else {
                BusinessAssetToExpressionLink newAssetCouldDeliverSceEntry = new BusinessAssetToExpressionLink();
                newAssetCouldDeliverSceEntry.setArchived(false);
                BusinessAsset asset = businessAssetRepository.findOne(assetId);
                if (asset == null || asset.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Asset with id " + assetId + " not found", HttpStatus.NOT_FOUND);
                newAssetCouldDeliverSceEntry.setSce(securityControlExpression);
                newAssetCouldDeliverSceEntry.setBusinessAsset(asset);
                newAssetCouldDeliverSceEntry.setShallCould(ProtectionType.COULD);
                BusinessAssetToExpressionLink returnValue = businessAssetToExpressionLinkRepository.save(newAssetCouldDeliverSceEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetToExpressionLink Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        for (Integer assetId : request.getAssociatedShallAssets()) {
            if (assetIdToAlreadyAssociatedAssetExpressionLinkRecordMap.get(assetId) != null) {
                BusinessAssetToExpressionLink mapRecord = assetIdToAlreadyAssociatedAssetExpressionLinkRecordMap.get(assetId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    mapRecord.setShallCould(ProtectionType.SHALL);
                    BusinessAssetToExpressionLink returnValue = businessAssetToExpressionLinkRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetToExpressionLink Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                } else {
                    if (!mapRecord.getShallCould().equals(ProtectionType.SHALL)) {
                        mapRecord.setShallCould(ProtectionType.SHALL);
                        BusinessAssetToExpressionLink returnValue = businessAssetToExpressionLinkRepository.save(mapRecord);
                        if (returnValue == null)
                            return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetToExpressionLink Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }
                assetIdToAlreadyAssociatedAssetExpressionLinkRecordMap.remove(assetId);
            } else {
                BusinessAssetToExpressionLink newAssetShallDeliverSceEntry = new BusinessAssetToExpressionLink();
                newAssetShallDeliverSceEntry.setArchived(false);
                BusinessAsset asset = businessAssetRepository.findOne(assetId);
                if (asset == null || asset.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Business Asset with id " + assetId + " not found", HttpStatus.NOT_FOUND);
                newAssetShallDeliverSceEntry.setSce(securityControlExpression);
                newAssetShallDeliverSceEntry.setBusinessAsset(asset);
                newAssetShallDeliverSceEntry.setShallCould(ProtectionType.SHALL);
                BusinessAssetToExpressionLink returnValue = businessAssetToExpressionLinkRepository.save(newAssetShallDeliverSceEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetDeliversSce Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


        for (Map.Entry<Integer, BusinessAssetToExpressionLink> entry : assetIdToAlreadyAssociatedAssetExpressionLinkRecordMap.entrySet()) {
            BusinessAssetToExpressionLink businessAssetToExpressionLink = entry.getValue();
            if (!businessAssetToExpressionLink.isArchived()) {
                businessAssetToExpressionLink.setArchived(true);
                BusinessAssetToExpressionLink returnValue = businessAssetToExpressionLinkRepository.save(businessAssetToExpressionLink);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetToExpressionLink Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    private Map<Integer, BusinessAssetToExpressionLink> polulateMapOfAssetIdToDeliversRecordForBusinessAsset(List<BusinessAssetToExpressionLink> businessAssetToExpressionLinks) {
        Map<Integer, BusinessAssetToExpressionLink> map = new HashMap<>();
        for (BusinessAssetToExpressionLink businessAssetToExpressionLink : businessAssetToExpressionLinks) {
            BusinessAsset asset = businessAssetToExpressionLink.getBusinessAsset();
            if (asset != null && !asset.isArchived()) {
                if (map.get(asset.getId()) != null) {
                    if (!businessAssetToExpressionLink.isArchived()) {
                        map.put(asset.getId(), businessAssetToExpressionLink);
                    }
                } else {
                    map.put(asset.getId(), businessAssetToExpressionLink);
                }
            }
        }
        return map;
    }


    // get delivers association for asset
    @RequestMapping(value = "/get_protects_associations_for_expression/{expressionId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getProtectsAssociationsForExpression(@PathVariable("expressionId") Integer expressionId) {

        SecurityControlExpression securityControlExpression = securityControlExpressionRepository.findOne(expressionId);
        if (securityControlExpression == null || securityControlExpression.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Security Control Expression with id " + expressionId + " not found", HttpStatus.NOT_FOUND);
        }
        List<AssetTypeProtectedBySce> assetTypeProtectedBySceList = securityControlExpression.getAssetTypeProtectedBySceList();
        Set<Integer> mappedCouldAssetTypes = new HashSet<>();
        Set<Integer> mappedShallAssetTypes = new HashSet<>();

        if (assetTypeProtectedBySceList != null) {
            for (AssetTypeProtectedBySce mapEntry : assetTypeProtectedBySceList) {
                if (mapEntry != null && !mapEntry.isArchived()) {
                    AssetType assetType = mapEntry.getAssetType();
                    if (assetType != null && !assetType.isArchived()) {
                        if (mapEntry.getShallCouldIs().equals(ProtectionType.COULD))
                            mappedCouldAssetTypes.add(assetType.getId());
                        else if (mapEntry.getShallCouldIs().equals(ProtectionType.SHALL))
                            mappedShallAssetTypes.add(assetType.getId());
                        else
                            throw new ExecException("Unknown protection type found in DB: " + mapEntry.getShallCouldIs());
                    }
                }
            }
        }

        ResponseEntity<GenericItem> assetTypeDvResponseEntity = assetTypeFullHelper.getAssetTypeFullWithDescriptor(0, null, null, 0);

        //update each genericItem with setProtectionType shall or could
        updateSetProtectsType(assetTypeDvResponseEntity.getBody(), mappedCouldAssetTypes, mappedShallAssetTypes);

        return assetTypeDvResponseEntity;
    }

    private void updateSetProtectsType(GenericItem genericItem, Set<Integer> mappedCouldAssetTypes, Set<Integer> mappedShallAssetTypes) {
        if (genericItem != null) {
            if (genericItem.getObjectType().equals(ObjectTypeConstants.ASSET_TYPE)) {
                if (mappedCouldAssetTypes.contains(genericItem.getElementId()))
                    genericItem.setProtectionType(ProtectionType.COULD);
                else if (mappedShallAssetTypes.contains(genericItem.getElementId()))
                    genericItem.setProtectionType(ProtectionType.SHALL);
            }
        }
        if (genericItem.getChildren() != null) {
            for (GenericItem child : genericItem.getChildren()) {
                updateSetProtectsType(child, mappedCouldAssetTypes, mappedShallAssetTypes);
            }
        }
    }

    @RequestMapping(value = "/get_business_asset_type_associations_for_expression/{expressionId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getBusinessAssetTypeAssociationsForExpression(@PathVariable("expressionId") Integer expressionId) {

        SecurityControlExpression securityControlExpression = securityControlExpressionRepository.findOne(expressionId);
        if (securityControlExpression == null || securityControlExpression.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Security Control Expression with id " + expressionId + " not found", HttpStatus.NOT_FOUND);
        }
        List<BusinessAssetTypeToExpressionLink> businessAssetTypeToExpressionLinks = securityControlExpression.getBusinessAssetTypeToExpressionLinks();
        Set<Integer> mappedCouldAssetTypes = new HashSet<>();
        Set<Integer> mappedShallAssetTypes = new HashSet<>();

        if (businessAssetTypeToExpressionLinks != null) {
            for (BusinessAssetTypeToExpressionLink mapEntry : businessAssetTypeToExpressionLinks) {
                if (mapEntry != null && !mapEntry.isArchived()) {
                    BusinessAssetType assetType = mapEntry.getBusinessAssetType();
                    if (assetType != null && !assetType.isArchived()) {
                        if (mapEntry.getShallCouldIs().equals(ProtectionType.COULD))
                            mappedCouldAssetTypes.add(assetType.getId());
                        else if (mapEntry.getShallCouldIs().equals(ProtectionType.SHALL))
                            mappedShallAssetTypes.add(assetType.getId());
                        else
                            throw new ExecException("Unknown protection type found in DB: " + mapEntry.getShallCouldIs());
                    }
                }
            }
        }

        ResponseEntity<GenericItem> assetTypeDvResponseEntity = businessAssetTypeFullHelper.getAssetTypeFullWithDescriptor(0, null, null, 0);

        //update each genericItem with setProtectionType shall or could
        updateSetProtectsTypeForBusinessAssetType(assetTypeDvResponseEntity.getBody(), mappedCouldAssetTypes, mappedShallAssetTypes);

        return assetTypeDvResponseEntity;
    }

    private void updateSetProtectsTypeForBusinessAssetType(GenericItem genericItem, Set<Integer> mappedCouldAssetTypes, Set<Integer> mappedShallAssetTypes) {
        if (genericItem != null) {
            if (genericItem.getObjectType().equals(ObjectTypeConstants.BUSINESS_ASSET_TYPE)) {
                if (mappedCouldAssetTypes.contains(genericItem.getElementId()))
                    genericItem.setProtectionType(ProtectionType.COULD);
                else if (mappedShallAssetTypes.contains(genericItem.getElementId()))
                    genericItem.setProtectionType(ProtectionType.SHALL);
            }
        }
        if (genericItem.getChildren() != null) {
            for (GenericItem child : genericItem.getChildren()) {
                updateSetProtectsTypeForBusinessAssetType(child, mappedCouldAssetTypes, mappedShallAssetTypes);
            }
        }
    }

    @RequestMapping(value = "/save_protects_associations_for_expression", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveProtectsAssociationsForExpression(@RequestBody ExpressionProtectsAssetTypeMappingSaveRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_ASSET_TYPE_PROTECTED_BY_EXPRESSION_ASSOCIATION))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        SecurityControlExpression securityControlExpression = securityControlExpressionRepository.findOne(request.getExpressionId());
        if (securityControlExpression == null && securityControlExpression.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Expression with id " + request.getExpressionId() + " not found", HttpStatus.NOT_FOUND);
        }
        List<AssetTypeProtectedBySce> assetTypeProtectedBySceList = securityControlExpression.getAssetTypeProtectedBySceList();

        Set<Integer> newMappings = new HashSet<>();
        newMappings.addAll(new HashSet(request.getAssociatedCouldAssetTypes()));
        newMappings.addAll(new HashSet(request.getAssociatedShallAssetTypes()));

        Map<Integer, AssetTypeProtectedBySce> assetTypeIdToAlreadyAssociatedProtectedByRecordMap = polulateMapOfAssetTypeIdToProtectedByRecord(assetTypeProtectedBySceList);

        for (Integer assetTypeId : request.getAssociatedCouldAssetTypes()) {
            if (assetTypeIdToAlreadyAssociatedProtectedByRecordMap.get(assetTypeId) != null) {
                AssetTypeProtectedBySce mapRecord = assetTypeIdToAlreadyAssociatedProtectedByRecordMap.get(assetTypeId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    mapRecord.setShallCouldIs(ProtectionType.COULD);
                    AssetTypeProtectedBySce returnValue = assetTypeProtectedBySceRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeProtectedBySce Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                } else {
                    if (!mapRecord.getShallCouldIs().equals(ProtectionType.COULD)) {
                        mapRecord.setShallCouldIs(ProtectionType.COULD);
                        AssetTypeProtectedBySce returnValue = assetTypeProtectedBySceRepository.save(mapRecord);
                        if (returnValue == null)
                            return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeProtectedBySce Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }
                assetTypeIdToAlreadyAssociatedProtectedByRecordMap.remove(assetTypeId);
            } else {
                AssetTypeProtectedBySce newAssetTypeCouldBeProtectedBySceEntry = new AssetTypeProtectedBySce();
                newAssetTypeCouldBeProtectedBySceEntry.setArchived(false);
                AssetType assetType = assetTypeRepository.findOne(assetTypeId);
                if (assetType == null || assetType.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type with id " + assetTypeId + " not found", HttpStatus.NOT_FOUND);
                newAssetTypeCouldBeProtectedBySceEntry.setSce(securityControlExpression);
                newAssetTypeCouldBeProtectedBySceEntry.setAssetType(assetType);
                newAssetTypeCouldBeProtectedBySceEntry.setShallCouldIs(ProtectionType.COULD);
                AssetTypeProtectedBySce returnValue = assetTypeProtectedBySceRepository.save(newAssetTypeCouldBeProtectedBySceEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeProtectedBySce Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        for (Integer assetTypeId : request.getAssociatedShallAssetTypes()) {
            if (assetTypeIdToAlreadyAssociatedProtectedByRecordMap.get(assetTypeId) != null) {
                AssetTypeProtectedBySce mapRecord = assetTypeIdToAlreadyAssociatedProtectedByRecordMap.get(assetTypeId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    mapRecord.setShallCouldIs(ProtectionType.SHALL);
                    AssetTypeProtectedBySce returnValue = assetTypeProtectedBySceRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeProtectedBySce Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                } else {
                    if (!mapRecord.getShallCouldIs().equals(ProtectionType.SHALL)) {
                        mapRecord.setShallCouldIs(ProtectionType.SHALL);
                        AssetTypeProtectedBySce returnValue = assetTypeProtectedBySceRepository.save(mapRecord);
                        if (returnValue == null)
                            return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeProtectedBySce Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }
                assetTypeIdToAlreadyAssociatedProtectedByRecordMap.remove(assetTypeId);
            } else {
                AssetTypeProtectedBySce newAssetTypeShallBeProtectedBySceEntry = new AssetTypeProtectedBySce();
                newAssetTypeShallBeProtectedBySceEntry.setArchived(false);
                AssetType assetType = assetTypeRepository.findOne(assetTypeId);
                if (assetType == null || assetType.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type with id " + assetTypeId + " not found", HttpStatus.NOT_FOUND);
                newAssetTypeShallBeProtectedBySceEntry.setSce(securityControlExpression);
                newAssetTypeShallBeProtectedBySceEntry.setAssetType(assetType);
                newAssetTypeShallBeProtectedBySceEntry.setShallCouldIs(ProtectionType.SHALL);
                AssetTypeProtectedBySce returnValue = assetTypeProtectedBySceRepository.save(newAssetTypeShallBeProtectedBySceEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to AssetTypeProtectedBySce Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


        for (Map.Entry<Integer, AssetTypeProtectedBySce> entry : assetTypeIdToAlreadyAssociatedProtectedByRecordMap.entrySet()) {
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

    private Map<Integer, AssetTypeProtectedBySce> polulateMapOfAssetTypeIdToProtectedByRecord(List<AssetTypeProtectedBySce> assetTypeProtectedBySceList) {
        Map<Integer, AssetTypeProtectedBySce> map = new HashMap<>();
        for (AssetTypeProtectedBySce assetTypeProtectedBySce : assetTypeProtectedBySceList) {
            AssetType assetType = assetTypeProtectedBySce.getAssetType();
            if (assetType != null && !assetType.isArchived()) {
                if (map.get(assetType.getId()) != null) {
                    if (!assetTypeProtectedBySce.isArchived()) {
                        map.put(assetType.getId(), assetTypeProtectedBySce);
                    }
                } else {
                    map.put(assetType.getId(), assetTypeProtectedBySce);
                }
            }
        }
        return map;
    }

    @RequestMapping(value = "/save_business_asset_type_associations_for_expression", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveBusinessAssetTypeAssociationsForExpression(@RequestBody ExpressionProtectsAssetTypeMappingSaveRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_BUSINESS_ASSET_TYPE_TO_EXPRESSION_ASSOCIATION))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        SecurityControlExpression securityControlExpression = securityControlExpressionRepository.findOne(request.getExpressionId());
        if (securityControlExpression == null && securityControlExpression.isArchived()) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Expression with id " + request.getExpressionId() + " not found", HttpStatus.NOT_FOUND);
        }
        List<BusinessAssetTypeToExpressionLink> businessAssetTypeToExpressionLinks = securityControlExpression.getBusinessAssetTypeToExpressionLinks();

        Set<Integer> newMappings = new HashSet<>();
        newMappings.addAll(new HashSet(request.getAssociatedCouldAssetTypes()));
        newMappings.addAll(new HashSet(request.getAssociatedShallAssetTypes()));

        Map<Integer, BusinessAssetTypeToExpressionLink> assetTypeIdToAlreadyAssociatedProtectedByRecordMap = polulateMapOfAssetTypeIdToBusinessAssetTypeExpressionLinkRecord(businessAssetTypeToExpressionLinks);

        for (Integer assetTypeId : request.getAssociatedCouldAssetTypes()) {
            if (assetTypeIdToAlreadyAssociatedProtectedByRecordMap.get(assetTypeId) != null) {
                BusinessAssetTypeToExpressionLink mapRecord = assetTypeIdToAlreadyAssociatedProtectedByRecordMap.get(assetTypeId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    mapRecord.setShallCouldIs(ProtectionType.COULD);
                    BusinessAssetTypeToExpressionLink returnValue = businessAssetTypeToExpressionLinkRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetTypeToExpressionLink Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                } else {
                    if (!mapRecord.getShallCouldIs().equals(ProtectionType.COULD)) {
                        mapRecord.setShallCouldIs(ProtectionType.COULD);
                        BusinessAssetTypeToExpressionLink returnValue = businessAssetTypeToExpressionLinkRepository.save(mapRecord);
                        if (returnValue == null)
                            return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetTypeToExpressionLink Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }
                assetTypeIdToAlreadyAssociatedProtectedByRecordMap.remove(assetTypeId);
            } else {
                BusinessAssetTypeToExpressionLink newAssetTypeCouldBeProtectedBySceEntry = new BusinessAssetTypeToExpressionLink();
                newAssetTypeCouldBeProtectedBySceEntry.setArchived(false);
                BusinessAssetType assetType = businessAssetTypeRepository.findOne(assetTypeId);
                if (assetType == null || assetType.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type with id " + assetTypeId + " not found", HttpStatus.NOT_FOUND);
                newAssetTypeCouldBeProtectedBySceEntry.setSce(securityControlExpression);
                newAssetTypeCouldBeProtectedBySceEntry.setBusinessAssetType(assetType);
                newAssetTypeCouldBeProtectedBySceEntry.setShallCouldIs(ProtectionType.COULD);
                BusinessAssetTypeToExpressionLink returnValue = businessAssetTypeToExpressionLinkRepository.save(newAssetTypeCouldBeProtectedBySceEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetTypeToExpressionLink Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        for (Integer assetTypeId : request.getAssociatedShallAssetTypes()) {
            if (assetTypeIdToAlreadyAssociatedProtectedByRecordMap.get(assetTypeId) != null) {
                BusinessAssetTypeToExpressionLink mapRecord = assetTypeIdToAlreadyAssociatedProtectedByRecordMap.get(assetTypeId);
                if (mapRecord.isArchived()) {
                    mapRecord.setArchived(false);
                    mapRecord.setShallCouldIs(ProtectionType.SHALL);
                    BusinessAssetTypeToExpressionLink returnValue = businessAssetTypeToExpressionLinkRepository.save(mapRecord);
                    if (returnValue == null)
                        return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetTypeToExpressionLink Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);

                } else {
                    if (!mapRecord.getShallCouldIs().equals(ProtectionType.SHALL)) {
                        mapRecord.setShallCouldIs(ProtectionType.SHALL);
                        BusinessAssetTypeToExpressionLink returnValue = businessAssetTypeToExpressionLinkRepository.save(mapRecord);
                        if (returnValue == null)
                            return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetTypeToExpressionLink Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }
                assetTypeIdToAlreadyAssociatedProtectedByRecordMap.remove(assetTypeId);
            } else {
                BusinessAssetTypeToExpressionLink newAssetTypeShallBeProtectedBySceEntry = new BusinessAssetTypeToExpressionLink();
                newAssetTypeShallBeProtectedBySceEntry.setArchived(false);
                BusinessAssetType assetType = businessAssetTypeRepository.findOne(assetTypeId);
                if (assetType == null || assetType.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Asset Type with id " + assetTypeId + " not found", HttpStatus.NOT_FOUND);
                newAssetTypeShallBeProtectedBySceEntry.setSce(securityControlExpression);
                newAssetTypeShallBeProtectedBySceEntry.setBusinessAssetType(assetType);
                newAssetTypeShallBeProtectedBySceEntry.setShallCouldIs(ProtectionType.SHALL);
                BusinessAssetTypeToExpressionLink returnValue = businessAssetTypeToExpressionLinkRepository.save(newAssetTypeShallBeProtectedBySceEntry);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetTypeToExpressionLink Table Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


        for (Map.Entry<Integer, BusinessAssetTypeToExpressionLink> entry : assetTypeIdToAlreadyAssociatedProtectedByRecordMap.entrySet()) {
            BusinessAssetTypeToExpressionLink businessAssetTypeToExpressionLink = entry.getValue();
            if (!businessAssetTypeToExpressionLink.isArchived()) {
                businessAssetTypeToExpressionLink.setArchived(true);
                BusinessAssetTypeToExpressionLink returnValue = businessAssetTypeToExpressionLinkRepository.save(businessAssetTypeToExpressionLink);
                if (returnValue == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Save to BusinessAssetTypeToExpressionLink Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity<GenericItem>(response, HttpStatus.OK);
    }

    private Map<Integer, BusinessAssetTypeToExpressionLink> polulateMapOfAssetTypeIdToBusinessAssetTypeExpressionLinkRecord(List<BusinessAssetTypeToExpressionLink> businessAssetTypeToExpressionLinks) {
        Map<Integer, BusinessAssetTypeToExpressionLink> map = new HashMap<>();
        for (BusinessAssetTypeToExpressionLink assetTypeProtectedBySce : businessAssetTypeToExpressionLinks) {
            BusinessAssetType assetType = assetTypeProtectedBySce.getBusinessAssetType();
            if (assetType != null && !assetType.isArchived()) {
                if (map.get(assetType.getId()) != null) {
                    if (!assetTypeProtectedBySce.isArchived()) {
                        map.put(assetType.getId(), assetTypeProtectedBySce);
                    }
                } else {
                    map.put(assetType.getId(), assetTypeProtectedBySce);
                }
            }
        }
        return map;
    }
}