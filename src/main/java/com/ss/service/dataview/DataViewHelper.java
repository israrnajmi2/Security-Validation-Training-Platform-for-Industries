package com.ss.service.dataview;

import com.ss.common.ExecException;
import com.ss.constants.GIMode;
import com.ss.constants.GIView;
import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.artifact.Artifact;
import com.ss.domain.asset.*;
import com.ss.domain.businessasset.BusinessAsset;
import com.ss.domain.businessasset.BusinessAssetType;
import com.ss.domain.businessasset.BusinessProvider;
import com.ss.domain.groups.*;
import com.ss.domain.parametertree.ContentParameterWord;
import com.ss.domain.parametertree.MethodParameterWord;
import com.ss.domain.parametertree.ObjectiveParameterWord;
import com.ss.domain.parametertree.SubjectParameterWord;
import com.ss.domain.perspective.attribute.AssetDeliversSceRTAttribute;
import com.ss.domain.perspective.attribute.AssetImplementsElementRTAttribute;
import com.ss.domain.perspective.attribute.ShieldElementRTAttribute;
import com.ss.domain.perspective.rating.AssetDeliversSceRTRating;
import com.ss.domain.perspective.rating.AssetImplementsElementRTRating;
import com.ss.domain.perspective.rating.ShieldElementRTRating;
import com.ss.domain.sce.SecurityControlExpression;
import com.ss.domain.shieldclassification.*;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.domain.usermanagement.SphericUser;
import com.ss.domain.usermanagement.UserRole;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.helper.ViewNameWithModes;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.artifact.ArtifactRepository;
import com.ss.repository.asset.*;
import com.ss.repository.businessasset.BusinessAssetRepository;
import com.ss.repository.businessasset.BusinessAssetTypeRepository;
import com.ss.repository.businessasset.BusinessProviderRepository;
import com.ss.repository.groups.*;
import com.ss.repository.parametertree.ContentParameterWordRepository;
import com.ss.repository.parametertree.MethodParameterWordRepository;
import com.ss.repository.parametertree.ObjectiveParameterWordRepository;
import com.ss.repository.parametertree.SubjectParameterWordRepository;
import com.ss.repository.perspective.attribute.AssetDeliversSceRTAttributeRepository;
import com.ss.repository.perspective.attribute.AssetImplementsElementRTAttributeRepository;
import com.ss.repository.perspective.attribute.ShieldElementRTAttributeRepository;
import com.ss.repository.perspective.rating.AssetDeliversSceRTRatingRepository;
import com.ss.repository.perspective.rating.AssetImplementsElementRTRatingRepository;
import com.ss.repository.perspective.rating.ShieldElementRTRatingRepository;
import com.ss.repository.sce.SecurityControlExpressionRepository;
import com.ss.repository.shieldclassification.*;
import com.ss.repository.usermanagement.OrganizationalUnitRepository;
import com.ss.repository.usermanagement.SphericUserRepository;
import com.ss.repository.usermanagement.UserRoleRepository;
import com.ss.service.generictraversal.*;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("DataViewHelper")
public class DataViewHelper {
    @Autowired
    private DataViewHelperUtil dataViewHelperUtil;

    @Autowired
    private GenericItemShieldService genericItemShieldService;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private ShieldRepository shieldRepository;

    @Autowired
    private ShieldTypeRepository shieldTypeRepository;

    @Autowired
    private GenericItemShieldTypeService genericItemShieldTypeService;

    @Autowired
    private ShieldElementRepository shieldElementRepository;

    @Autowired
    private GenericItemShieldElementService genericItemShieldElementService;

    @Autowired
    private SecurityControlExpressionRepository securityControlExpressionRepository;

    @Autowired
    private GenericItemSceService genericItemSceService;

    @Autowired
    private OrganizationalUnitRepository organizationalUnitRepository;

    @Autowired
    private GenericItemOrganizationalUnitService genericItemOrganizationalUnitService;

    @Autowired
    private ObjectiveParameterWordRepository objectiveParameterWordRepository;

    @Autowired
    private GenericItemObjectiveParameterWordService genericItemObjectiveParameterWordService;

    @Autowired
    private MethodParameterWordRepository methodParameterWordRepository;

    @Autowired
    private GenericItemMethodParameterWordService genericItemMethodParameterWordService;

    @Autowired
    private GenericItemContentParameterWordService genericItemContentParameterWordService;

    @Autowired
    private ContentParameterWordRepository contentParameterWordRepository;

    @Autowired
    private SubjectParameterWordRepository subjectParameterWordRepository;

    @Autowired
    private GenericItemSubjectParameterWordService genericItemSubjectParameterWordService;

    @Autowired
    private AssetTypeRepository assetTypeRepository;

    @Autowired
    private GenericItemAssetTypeService genericItemAssetTypeService;

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private GenericItemAssetService genericItemAssetService;

    @Autowired
    private TechnicalSupportInfoRepository technicalSupportInfoRepository;

    @Autowired
    private GenericItemTechnicalSupportService genericItemTechnicalSupportService;

    @Autowired
    private ProviderInfoRepository providerInfoRepository;

    @Autowired
    private GenericItemProviderInfoService genericItemProviderInfoService;

    @Autowired
    private TechnicalSupportContactInfoRepository technicalSupportContactInfoRepository;

    @Autowired
    private GenericItemTechnicalSupportContactInfoService genericItemTechnicalSupportContactInfoService;

    @Autowired
    private ShieldElementGroupRepository shieldElementGroupRepository;

    @Autowired
    private GenericItemShieldElementGroupService genericItemShieldElementGroupService;

    @Autowired
    private SceGroupRepository sceGroupRepository;

    @Autowired
    private GenericItemSceGroupService genericItemSceGroupService;

    @Autowired
    private AssetGroupRepository assetGroupRepository;

    @Autowired
    private GenericItemAssetGroupService genericItemAssetGroupService;

    @Autowired
    private AssetTypeGroupRepository assetTypeGroupRepository;

    @Autowired
    private GenericItemAssetTypeGroupService genericItemAssetTypeGroupService;

    @Autowired
    private ProviderGroupRepository providerGroupRepository;

    @Autowired
    private GenericItemProviderGroupService genericItemProviderGroupService;

    @Autowired
    private NavigationChoicesHelperService navigationChoicesHelperService;

    @Autowired
    private ShieldElementTypeRepository shieldElementTypeRepository;

    @Autowired
    private GenericItemShieldElementTypeService genericItemShieldElementTypeService;

    @Autowired
    private ArtifactRepository artifactRepository;

    @Autowired
    private AssetDeliversSceRTAttributeRepository assetDeliversSceRTAttributeRepository;

    @Autowired
    private ShieldElementRTAttributeRepository shieldElementRTAttributeRepository;

    @Autowired
    private AssetDeliversSceRTRatingRepository assetDeliversSceRTRatingRepository;

    @Autowired
    private ShieldElementRTRatingRepository shieldElementRTRatingRepository;

    @Autowired
    private SphericUserRepository sphericUserRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private GenericItemSphericUserService genericItemSphericUserService;

    @Autowired
    private GenericItemUserRoleService genericItemUserRoleService;

    @Autowired
    private IngestSourceRepository ingestSourceRepository;

    @Autowired
    private TestProcedureRepository testProcedureRepository;

    @Autowired
    private GuidanceRepository guidanceRepository;

    @Autowired
    private GenericItemTestProcedureService genericItemTestProcedureService;

    @Autowired
    private GenericItemIngestSourceService genericItemIngestSourceService;

    @Autowired
    private GenericItemGuidanceService genericItemGuidanceService;

    @Autowired
    private BusinessAssetRepository businessAssetRepository;

    @Autowired
    private BusinessAssetTypeRepository businessAssetTypeRepository;

    @Autowired
    private BusinessProviderRepository businessProviderRepository;

    @Autowired
    private GenericItemBusinessAssetService genericItemBusinessAssetService;

    @Autowired
    private GenericItemBusinessAssetTypeService genericItemBusinessAssetTypeService;

    @Autowired
    private GenericItemBusinessProviderService genericItemBusinessProviderService;

    @Autowired
    private BusinessProviderGroupRepository businessProviderGroupRepository;

    @Autowired
    private GenericItemBusinessProviderGroupService genericItemBusinessProviderGroupService;

    @Autowired
    private BusinessAssetGroupRepository businessAssetGroupRepository;

    @Autowired
    private GenericItemBusinessAssetGroupService genericItemBusinessAssetGroupService;

    @Autowired
    private BusinessAssetTypeGroupRepository businessAssetTypeGroupRepository;

    @Autowired
    private GenericItemBusinessAssetTypeGroupService genericItemBusinessAssetTypeGroupService;

    @Autowired
    private AssetImplementsElementRTAttributeRepository assetImplementsElementRTAttributeRepository;

    @Autowired
    private AssetImplementsElementRTRatingRepository assetImplementsElementRTRatingRepository;

    public GenericItem getDataViewForShield(Integer elementId, String objectType, boolean isDirect) {

        Shield shield = shieldRepository.findOne(elementId);

        if (shield == null || shield.isArchived())
            throw new ExecException("Shield with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shield);
        List<GenericItem> children = new ArrayList<>();
        String VIEW_NAME = GIView.SHIELD;
        if(objectType.equals(ObjectTypeConstants.STANDARD))
            VIEW_NAME = GIView.STANDARD;
        else if(objectType.equals(ObjectTypeConstants.BUSINESS_FRAMEWORK))
            VIEW_NAME = GIView.BUSINESS;
        else if(objectType.equals(ObjectTypeConstants.THREAT_FRAMEWORK))
            VIEW_NAME = GIView.THREAT;
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(VIEW_NAME, getExcludeListForShield(), isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemShieldService.buildGenericItemForShield(shield, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }

        response.setChildren(children);

        return response;
    }

    private List<ViewNameWithModes> getExcludeListForShield() {

        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.SHIELD_ELEMENT_TYPE, new String[]{GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.STANDARD_ELEMENT_TYPE, new String[]{GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.STANDARD_ELEMENT, new String[]{GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.THREAT_ELEMENT_TYPE, new String[]{GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.THREAT_ELEMENT, new String[]{GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.BUSINESS_ELEMENT_TYPE, new String[]{GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.BUSINESS_ELEMENT, new String[]{GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS}));

        //home.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        //home.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }


    public GenericItem getDataViewForShieldType(Integer elementId, boolean isDirect) {
        ShieldType shieldType = shieldTypeRepository.findOne(elementId);

        if (shieldType == null || shieldType.isArchived())
            throw new ExecException("ShieldType with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shieldType);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.SHIELD_TYPE, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemShieldTypeService.buildGenericItemForShieldType(shieldType, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }

        response.setChildren(children);

        return response;

    }

    public GenericItem getDataViewForShieldElement(Integer elementId, String objectType, boolean isDirect) {
        ShieldElement shieldElement = shieldElementRepository.findOne(elementId);

        if (shieldElement == null || shieldElement.isArchived())
            throw new ExecException("Shield/Standard Element with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shieldElement);
        List<GenericItem> children = new ArrayList<>();
        String VIEW_NAME = GIView.SHIELD_ELEMENT;
        if(objectType.equals(ObjectTypeConstants.STANDARD_ELEMENT))
            VIEW_NAME = GIView.STANDARD_ELEMENT;
        else if(objectType.equals(ObjectTypeConstants.BUSINESS_CONTROL))
            VIEW_NAME = GIView.BUSINESS_ELEMENT;
        else if(objectType.equals(ObjectTypeConstants.THREAT_ELEMENT))
            VIEW_NAME = GIView.THREAT_ELEMENT;
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(VIEW_NAME, getExcludeListForShieldElement(), isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemShieldElementService.buildGenericItemForShieldElement(shieldElement, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }

        response.setChildren(children);

        return response;
    }

    private List<ViewNameWithModes> getExcludeListForShieldElement() {

        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.DIRECT_SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.STANDARD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.STANDARD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        //home.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        //home.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    public GenericItem getDataViewForSCE(Integer elementId, boolean isDirect) {
        SecurityControlExpression securityControlExpression = securityControlExpressionRepository.findOne(elementId);

        if (securityControlExpression == null || securityControlExpression.isArchived())
            throw new ExecException("Security Control Expression with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(securityControlExpression);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.SCE, getExcludeListForSce(), isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemSceService.buildGenericItemForSce(securityControlExpression, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                GenericItem newItem = new GenericItem();
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(newItem, viewDescriptor);
                newItem.setChildren(item.getChildren());
                children.add(newItem);
            }
        }

        response.setChildren(children);

        return response;
    }

    private List<ViewNameWithModes> getExcludeListForSce() {

        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    public GenericItem getDataViewForOrganizationalUnit(Integer elementId, boolean isDirect) {
        OrganizationalUnit organizationalUnit = organizationalUnitRepository.findOne(elementId);

        if (organizationalUnit == null || organizationalUnit.isArchived())
            throw new ExecException("Organizational Unit with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(organizationalUnit);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.ORGANIZATIONAL_UNIT, getExcludeListForOrganizationalUnit(), isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemOrganizationalUnitService.buildGenericItemForOrganizationalUnit(organizationalUnit, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    private List<ViewNameWithModes> getExcludeListForOrganizationalUnit() {

        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));

        return views;
    }

    public GenericItem getDataViewForObjectiveParameter(Integer elementId, boolean isDirect) {
        ObjectiveParameterWord objectiveParameterWord = objectiveParameterWordRepository.findOne(elementId);

        if (objectiveParameterWord == null || objectiveParameterWord.isArchived())
            throw new ExecException("Objective Parameter Word with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(objectiveParameterWord);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.OBJECTIVE_PARAMETER, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemObjectiveParameterWordService.buildGenericItemForObjectiveParameterWord(objectiveParameterWord, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForMethodParameter(Integer elementId, boolean isDirect) {
        MethodParameterWord methodParameterWord = methodParameterWordRepository.findOne(elementId);

        if (methodParameterWord == null || methodParameterWord.isArchived())
            throw new ExecException("Method Parameter Word with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(methodParameterWord);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.METHOD_PARAMETER, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemMethodParameterWordService.buildGenericItemForMethodParameterWord(methodParameterWord, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForContentParameter(Integer elementId, boolean isDirect) {
        ContentParameterWord contentParameterWord = contentParameterWordRepository.findOne(elementId);

        if (contentParameterWord == null || contentParameterWord.isArchived())
            throw new ExecException("Content Parameter Word with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(contentParameterWord);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.CONTENT_PARAMETER, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemContentParameterWordService.buildGenericItemForContentParameterWord(contentParameterWord, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForSubjectParameter(Integer elementId, boolean isDirect) {
        SubjectParameterWord subjectParameterWord = subjectParameterWordRepository.findOne(elementId);
        if (subjectParameterWord == null || subjectParameterWord.isArchived())
            throw new ExecException("Subject Parameter Word with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(subjectParameterWord);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.SUBJECT_PARAMETER, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemSubjectParameterWordService.buildGenericItemForSubjectParameterWord(subjectParameterWord, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForAssetType(Integer elementId, boolean isDirect) {
        AssetType assetType = assetTypeRepository.findOne(elementId);
        if (assetType == null || assetType.isArchived())
            throw new ExecException("Asset Type with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(assetType);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.ASSET_TYPE, getExcludeListForAssetType(), isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemAssetTypeService.buildGenericItemForAssetType(assetType, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    private List<ViewNameWithModes> getExcludeListForAssetType() {

        List<ViewNameWithModes> views = new ArrayList<>();

        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.SCE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.DIRECT_SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    public GenericItem getDataViewForAsset(Integer elementId, boolean isDirect) {
        Asset asset = assetRepository.findOne(elementId);
        if (asset == null || asset.isArchived())
            throw new ExecException("Asset with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(asset);
        List<GenericItem> children = new ArrayList<>();
        List<ViewNameWithModes> excludeList = getExcludeListForAsset();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.ASSET, getExcludeListForAsset(), isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemAssetService.buildGenericItemForAsset(asset, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    private List<ViewNameWithModes> getExcludeListForAsset() {

        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.DIRECT_SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        /*home.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.ASSET, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        home.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        home.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));*/
        return views;
    }

    public GenericItem getDataViewForTechnicalSupportPeople(Integer elementId, boolean isDirect) {
        TechnicalSupport technicalSupport = technicalSupportInfoRepository.findOne(elementId);
        if (technicalSupport == null || technicalSupport.isArchived())
            throw new ExecException("Technical Support with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(technicalSupport);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.TECHNICAL_SUPPORT_PEOPLE, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemTechnicalSupportService.buildGenericItemForTechnicalSupport(technicalSupport, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForProvider(Integer elementId, boolean isDirect) {

        ProviderInfo providerInfo = providerInfoRepository.findOne(elementId);
        if (providerInfo == null || providerInfo.isArchived())
            throw new ExecException("Provider Info with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(providerInfo);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.PROVIDER, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemProviderInfoService.buildGenericItemForProviderInfo(providerInfo, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;

    }

    public GenericItem getDataViewForTechnicalSupportContactInfo(Integer elementId, boolean isDirect) {
        TechnicalSupportContactInfo technicalSupportContactInfo = technicalSupportContactInfoRepository.findOne(elementId);
        if (technicalSupportContactInfo == null || technicalSupportContactInfo.isArchived())
            throw new ExecException("Technical Support Contact Info with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(technicalSupportContactInfo);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.TECHNICAL_SUPPORT_CONTACT_INFO, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemTechnicalSupportContactInfoService.buildGenericItemForTechnicalSupportContactInfo(technicalSupportContactInfo, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForShieldElementGroup(Integer elementId, boolean isDirect) {
        ShieldElementGroup shieldElementGroup = shieldElementGroupRepository.findOne(elementId);
        if (shieldElementGroup == null || shieldElementGroup.isArchived())
            throw new ExecException("Shield Element Group with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shieldElementGroup);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.SHIELD_ELEMENT_GROUP, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemShieldElementGroupService.buildGenericItemForShieldElementGroup(shieldElementGroup, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForSceGroup(Integer elementId, boolean isDirect) {
        SceGroup sceGroup = sceGroupRepository.findOne(elementId);
        if (sceGroup == null || sceGroup.isArchived())
            throw new ExecException("Security Control Expression Group with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(sceGroup);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.SCE_GROUP, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemSceGroupService.buildGenericItemForSceGroup(sceGroup, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForAssetGroup(Integer elementId, boolean isDirect) {
        AssetGroup assetGroup = assetGroupRepository.findOne(elementId);
        if (assetGroup == null || assetGroup.isArchived())
            throw new ExecException("Asset Group with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(assetGroup);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.ASSET_GROUP, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemAssetGroupService.buildGenericItemForAssetGroup(assetGroup, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForAssetTypeGroup(Integer elementId, boolean isDirect) {
        AssetTypeGroup assetTypeGroup = assetTypeGroupRepository.findOne(elementId);
        if (assetTypeGroup == null || assetTypeGroup.isArchived())
            throw new ExecException("Asset Type Group with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(assetTypeGroup);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.ASSET_TYPE_GROUP, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemAssetTypeGroupService.buildGenericItemForAssetTypeGroup(assetTypeGroup, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForProviderGroup(Integer elementId, boolean isDirect) {
        ProviderGroup providerGroup = providerGroupRepository.findOne(elementId);
        if (providerGroup == null || providerGroup.isArchived())
            throw new ExecException("Provider Group with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(providerGroup);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.PROVIDER_GROUP, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemProviderGroupService.buildGenericItemForProviderGroup(providerGroup, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForShieldElementType(Integer elementId, String objectType, boolean isDirect) {
        ShieldElementType shieldElementType = shieldElementTypeRepository.findOne(elementId);
        if (shieldElementType == null || shieldElementType.isArchived())
            throw new ExecException("Shield Element Type with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(shieldElementType);
        List<GenericItem> children = new ArrayList<>();
        String VIEW_NAME = GIView.SHIELD_ELEMENT_TYPE;
        if(objectType.equals(ObjectTypeConstants.STANDARD_ELEMENT_TYPE))
            VIEW_NAME = GIView.STANDARD_ELEMENT_TYPE;
        else if(objectType.equals(ObjectTypeConstants.BUSINESS_CONTROL_TYPE))
            VIEW_NAME = GIView.BUSINESS_ELEMENT_TYPE;
        else if(objectType.equals(ObjectTypeConstants.THREAT_ELEMENT_TYPE))
            VIEW_NAME = GIView.THREAT_ELEMENT_TYPE;
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(VIEW_NAME, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemShieldElementTypeService.buildGenericItemForShieldElementType(shieldElementType, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForArtifact(Integer elementId, boolean isDirect) {
        Artifact artifact = artifactRepository.findOne(elementId);
        if (artifact == null || artifact.isArchived())
            throw new ExecException("Artifact with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(artifact);
        List<GenericItem> children = new ArrayList<>();
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForAssetDeliversAttribute(Integer elementId, boolean isDirect) {
        AssetDeliversSceRTAttribute attribute = assetDeliversSceRTAttributeRepository.findOne(elementId);
        if (attribute == null || attribute.isArchived())
            throw new ExecException("Asset Delivers Attribute with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);
        List<GenericItem> children = new ArrayList<>();
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForShieldElementAttribute(Integer elementId, boolean isDirect) {
        ShieldElementRTAttribute attribute = shieldElementRTAttributeRepository.findOne(elementId);
        if (attribute == null || attribute.isArchived())
            throw new ExecException("Shield Element Attribute with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);
        List<GenericItem> children = new ArrayList<>();
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForAssetDeliversRating(Integer elementId, boolean isDirect) {
        AssetDeliversSceRTRating rating = assetDeliversSceRTRatingRepository.findOne(elementId);
        if (rating == null)
            throw new ExecException("Asset Delivers Rating with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(rating);
        List<GenericItem> children = new ArrayList<>();
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForShieldElementRating(Integer elementId, boolean isDirect) {
        ShieldElementRTRating rating = shieldElementRTRatingRepository.findOne(elementId);
        if (rating == null)
            throw new ExecException("Shield Element Rating with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(rating);
        List<GenericItem> children = new ArrayList<>();
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForSphericUser(Integer elementId, boolean isDirect) {
        SphericUser sphericUser = sphericUserRepository.findOne(elementId);
        if (sphericUser == null || sphericUser.isArchived())
            throw new ExecException("Spheric User with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(sphericUser);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.SPHERIC_USER, getExcludeListForSphericUser(), isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemSphericUserService.buildGenericItemForSphericUser(sphericUser, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    private List<ViewNameWithModes> getExcludeListForSphericUser() {

        List<ViewNameWithModes> views = new ArrayList<>();
        views.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.ROLES, new String[]{GIMode.ALL_LINKED_LEVEL_ONE_ELEMENTS}));

        //home.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.ASSET_TYPE, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        //home.add(navigationChoicesHelperService.createViewNameWithModeObj(GIView.SHIELD_ELEMENT, new String[]{GIMode.ALL_LINKED_ELEMENTS}));
        return views;
    }

    public GenericItem getDataViewForUserRole(Integer elementId, boolean isDirect) {
        UserRole userRole = userRoleRepository.findOne(elementId);
        if (userRole == null || userRole.isArchived())
            throw new ExecException("UserRole with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(userRole);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.ROLES, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemUserRoleService.buildGenericItemForUserRole(userRole, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForIngestSource(Integer elementId, boolean isDirect) {
        IngestSource ingestSource = ingestSourceRepository.findOne(elementId);
        if (ingestSource == null || ingestSource.isArchived())
            throw new ExecException("IngestSource with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(ingestSource);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.INGEST_SOURCE, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemIngestSourceService.buildGenericItemForIngestSource(ingestSource, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForGuidance(Integer elementId, boolean isDirect) {
        Guidance guidance = guidanceRepository.findOne(elementId);
        if (guidance == null || guidance.isArchived())
            throw new ExecException("Guidance with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(guidance);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.GUIDANCE, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemGuidanceService.buildGenericItemForGuidance(guidance, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForTestProcedure(Integer elementId, boolean isDirect) {
        TestProcedure testProcedure = testProcedureRepository.findOne(elementId);
        if (testProcedure == null || testProcedure.isArchived())
            throw new ExecException("TestProcedure with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(testProcedure);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.TEST_PROCEDURE, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemTestProcedureService.buildGenericItemForTestProcedure(testProcedure, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForBusinessProvider(Integer elementId, Boolean isDirect) {
        BusinessProvider providerInfo = businessProviderRepository.findOne(elementId);
        if (providerInfo == null || providerInfo.isArchived())
            throw new ExecException("Business Provider Info with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(providerInfo);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.BUSINESS_PROVIDER, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemBusinessProviderService.buildGenericItemForBusinessProvider(providerInfo, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForBusinessAssetType(Integer elementId, Boolean isDirect) {
        BusinessAssetType assetType = businessAssetTypeRepository.findOne(elementId);
        if (assetType == null || assetType.isArchived())
            throw new ExecException("Business Asset Type with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(assetType);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.BUSINESS_ASSET_TYPE, getExcludeListForAssetType(), isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemBusinessAssetTypeService.buildGenericItemForBusinessAssetType(assetType, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForBusinessAsset(Integer elementId, Boolean isDirect) {
        BusinessAsset asset = businessAssetRepository.findOne(elementId);
        if (asset == null || asset.isArchived())
            throw new ExecException("Business Asset with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(asset);
        List<GenericItem> children = new ArrayList<>();
        List<ViewNameWithModes> excludeList = getExcludeListForAsset();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.BUSINESS_ASSET, getExcludeListForAsset(), isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemBusinessAssetService.buildGenericItemForBusinessAsset(asset, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForBusinessProviderGroup(Integer elementId, Boolean isDirect) {
        BusinessProviderGroup providerGroup = businessProviderGroupRepository.findOne(elementId);
        if (providerGroup == null || providerGroup.isArchived())
            throw new ExecException("Business Provider Group with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(providerGroup);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.BUSINESS_PROVIDER_GROUP, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemBusinessProviderGroupService.buildGenericItemForBusinessProviderGroup(providerGroup, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForBusinessAssetGroup(Integer elementId, Boolean isDirect) {
        BusinessAssetGroup assetGroup = businessAssetGroupRepository.findOne(elementId);
        if (assetGroup == null || assetGroup.isArchived())
            throw new ExecException("Business Asset Group with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(assetGroup);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.BUSINESS_ASSET_GROUP, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemBusinessAssetGroupService.buildGenericItemForBusinessAssetGroup(assetGroup, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForBusinessAssetTypeGroup(Integer elementId, Boolean isDirect) {
        BusinessAssetTypeGroup assetTypeGroup = businessAssetTypeGroupRepository.findOne(elementId);
        if (assetTypeGroup == null || assetTypeGroup.isArchived())
            throw new ExecException("Business Asset Type Group with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(assetTypeGroup);
        List<GenericItem> children = new ArrayList<>();
        List<ViewDescriptor> viewDescriptors = dataViewHelperUtil.getDescriptorsForViewName(GIView.BUSINESS_ASSET_TYPE_GROUP, null, isDirect);

        PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
        perspectiveGroupInfo.setRated(false);

        for (ViewDescriptor viewDescriptor : viewDescriptors) {
            GenericItem item = genericItemBusinessAssetTypeGroupService.buildGenericItemForBusinessAssetTypeGroup(assetTypeGroup, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null && !item.getChildren().isEmpty()) {
                dataViewHelperUtil.updateObjectTypeAndNameBasedOnViewDescriptor(item, viewDescriptor);
                children.add(item);
            }
        }
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForAssetImplementsAttribute(Integer elementId, Boolean isDirect) {
        AssetImplementsElementRTAttribute attribute = assetImplementsElementRTAttributeRepository.findOne(elementId);
        if (attribute == null || attribute.isArchived())
            throw new ExecException("Asset Implements Attribute with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(attribute);
        List<GenericItem> children = new ArrayList<>();
        response.setChildren(children);
        return response;
    }

    public GenericItem getDataViewForAssetImplementsRating(Integer elementId, Boolean isDirect) {
        AssetImplementsElementRTRating rating = assetImplementsElementRTRatingRepository.findOne(elementId);
        if (rating == null)
            throw new ExecException("Asset Implements Element Rating with id " + elementId + " not found");

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(rating);
        List<GenericItem> children = new ArrayList<>();
        response.setChildren(children);
        return response;
    }
}
