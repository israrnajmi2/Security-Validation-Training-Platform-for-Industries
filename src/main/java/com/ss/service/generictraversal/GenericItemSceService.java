package com.ss.service.generictraversal;

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
import com.ss.domain.groups.SceGroupMember;
import com.ss.domain.parametertree.ContentParameterWord;
import com.ss.domain.parametertree.MethodParameterWord;
import com.ss.domain.parametertree.ObjectiveParameterWord;
import com.ss.domain.parametertree.SubjectParameterWord;
import com.ss.domain.sce.SceFulfillsShieldElement;
import com.ss.domain.sce.SecurityControlExpression;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.shieldclassification.ShieldRepository;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("GenericItemSceService")
public class GenericItemSceService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemShieldElementService genericItemShieldElementService;

    @Autowired
    private GenericItemAssetTypeService genericItemAssetTypeService;

    @Autowired
    private GenericItemAssetService genericItemAssetService;

    @Autowired
    private GenericItemObjectiveParameterWordService genericItemObjectiveParameterWordService;

    @Autowired
    private GenericItemContentParameterWordService genericItemContentParameterWordService;

    @Autowired
    private GenericItemSubjectParameterWordService genericItemSubjectParameterWordService;

    @Autowired
    private GenericItemMethodParameterWordService genericItemMethodParameterWordService;

    @Autowired
    private ShieldRepository shieldRepository;

    @Autowired
    private GenericItemSceGroupService genericItemSceGroupService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private GenericItemBusinessAssetTypeService genericItemBusinessAssetTypeService;

    @Autowired
    private GenericItemBusinessAssetService genericItemBusinessAssetService;

    public GenericItem buildGenericItemForSceWithFulfillsShieldElementLink(SceFulfillsShieldElement sceFulfillsShieldElement, SecurityControlExpression sce, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (sceFulfillsShieldElement == null)
            throw new ExecException("buildGenericItemForSceWithFulfillsShieldElementLink method : sceFulfillsShieldElement parameter is null");

        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(sce);
        genericItem.setLinkId(sceFulfillsShieldElement.getId());
        genericItem.setLinkType(ObjectTypeConstants.ELEMENT_TO_EXPRESSION_LINK);
        genericItem.setLinkName(LinkName.ELEMENT_TO_EXPRESSION);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        if (perspectiveGroupInfo.isRated()) {
            if (perspectiveGroupInfo.getRulerType().equals(RulerTypeConstants.SCE_FULFILLS_SHIELD_ELEMENT))
                genericItem.setRating(genericItemIndexCalculator.getRatingForSceFulfillsShieldElementLink(sceFulfillsShieldElement, perspectiveGroupInfo.getPerspectiveIds(), perspectiveGroupInfo.getDate()));
            else if (perspectiveGroupInfo.getRulerType().equals(RulerTypeConstants.SCE))
                genericItem.setRating(genericItemIndexCalculator.getRatingForSce(sce, perspectiveGroupInfo.getPerspectiveIds(), perspectiveGroupInfo.getDate()));
        }

        handleView(sce, viewDescriptor, genericItem, perspectiveGroupInfo);

        return genericItem;
    }

    public GenericItem buildGenericItemForSceWithBusinessAssetTypeToExpressionLink(BusinessAssetTypeToExpressionLink businessAssetTypeToExpressionLink, SecurityControlExpression sce, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (businessAssetTypeToExpressionLink == null)
            throw new ExecException("buildGenericItemForSceWithBusinessAssetTypeToExpressionLink method : businessAssetTypeToExpressionLink parameter is null");

        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(sce);
        genericItem.setLinkId(businessAssetTypeToExpressionLink.getId());
        genericItem.setLinkType(ObjectTypeConstants.BUSINESS_ASSET_TYPE_TO_EXPRESSION_LINK);
        genericItem.setLinkName(LinkName.BUSINESS_ASSET_TYPE_TO_EXPRESSION);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(sce, viewDescriptor, genericItem, perspectiveGroupInfo);

        return genericItem;
    }

    public GenericItem buildGenericItemForBusinessAssetToExpressionLink(BusinessAssetToExpressionLink businessAssetToExpressionLink, SecurityControlExpression sce, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (businessAssetToExpressionLink == null)
            throw new ExecException("buildGenericItemForBusinessAssetToExpressionLink method : BusinessAssetToExpressionLink parameter is null");

        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(sce);
        genericItem.setLinkId(businessAssetToExpressionLink.getId());
        genericItem.setLinkType(ObjectTypeConstants.BUSINESS_ASSET_TO_EXPRESSION_LINK);
        genericItem.setLinkName(LinkName.BUSINESS_ASSET_TO_EXPRESSION);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(sce, viewDescriptor, genericItem, perspectiveGroupInfo);

        return genericItem;
    }

    public GenericItem buildGenericItemForSceWithAssetTypeProtectedByLink(AssetTypeProtectedBySce assetTypeProtectedBySce, SecurityControlExpression sce, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (assetTypeProtectedBySce == null)
            throw new ExecException("buildGenericItemForSceWithAssetTypeProtectedByLink method : assetTypeProtectedBySce parameter is null");

        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(sce);
        genericItem.setLinkId(assetTypeProtectedBySce.getId());

        switch (assetTypeProtectedBySce.getShallCouldIs()) {
            case ProtectionType.COULD:
                genericItem.setLinkType(ObjectTypeConstants.ASSET_TYPE_TO_EXPRESSION_LINK_COULD);
                genericItem.setLinkName(LinkName.ASSET_TYPE_TO_EXPRESSION_COULD);
                break;
            /*case ProtectionType.IS:
                genericItem.setLinkTypeAttr(ObjectTypeConstants.ASSET_TYPE_IS_PROTECTED_BY_SCE_LINK);
                genericItem.setLinkNameAttr(LinkName.IS_PROTECTED_BY);
                break;*/
            case ProtectionType.SHALL:
                genericItem.setLinkType(ObjectTypeConstants.ASSET_TYPE_TO_EXPRESSION_LINK);
                genericItem.setLinkName(LinkName.ASSET_TYPE_TO_EXPRESSION);
                break;
            default:
                throw new ExecException("Unknown protection type for asset type " + assetTypeProtectedBySce.getShallCouldIs());
        }

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        if (perspectiveGroupInfo.isRated()) {
            switch (perspectiveGroupInfo.getRulerType()) {
                case RulerTypeConstants.ASSET_TYPE_COULD_BE_PROTECTED_BY_SCE:
                    genericItem.setRating(genericItemIndexCalculator.getRatingForAssetTypeCouldBeProtectedBySce(assetTypeProtectedBySce, perspectiveGroupInfo.getPerspectiveIds(), perspectiveGroupInfo.getDate()));
                    break;
                case RulerTypeConstants.ASSET_TYPE_SHALL_BE_PROTECTED_BY_SCE:
                    genericItem.setRating(genericItemIndexCalculator.getRatingForAssetTypeShallBeProtectedBySce(assetTypeProtectedBySce, perspectiveGroupInfo.getPerspectiveIds(), perspectiveGroupInfo.getDate()));
                    break;
                case RulerTypeConstants.SCE:
                    genericItem.setRating(genericItemIndexCalculator.getRatingForSce(sce, perspectiveGroupInfo.getPerspectiveIds(), perspectiveGroupInfo.getDate()));
            }
        }


        handleView(sce, viewDescriptor, genericItem, perspectiveGroupInfo);

        return genericItem;
    }

    public GenericItem buildGenericItemForSceWithAssetDeliversLink(AssetDeliversSce assetDeliversSce, SecurityControlExpression sce, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (assetDeliversSce == null)
            throw new ExecException("buildGenericItemForSceWithAssetDeliversLink method : assetDeliversSce parameter is null");

        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(sce);
        genericItem.setLinkId(assetDeliversSce.getId());

        switch (assetDeliversSce.getShallCould()) {
            case ProtectionType.COULD:
                genericItem.setLinkType(ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK_COULD);
                genericItem.setLinkName(LinkName.ASSET_TO_EXPRESSION_COULD);
                break;
            case ProtectionType.SHALL:
                genericItem.setLinkType(ObjectTypeConstants.ASSET_TO_EXPRESSION_LINK);
                genericItem.setLinkName(LinkName.ASSET_TO_EXPRESSION);
                break;
            default:
                throw new ExecException("Unknown protection type for asset type " + assetDeliversSce.getShallCould());
        }

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        if (perspectiveGroupInfo.isRated()) {
            if (perspectiveGroupInfo.getRulerType().equals(RulerTypeConstants.ASSET_DELIVERS_SCE))
                genericItem.setRating(genericItemIndexCalculator.getRatingForAssetDeliversSceLink(assetDeliversSce, perspectiveGroupInfo.getPerspectiveIds(), perspectiveGroupInfo.getDate()));
            else if (perspectiveGroupInfo.getRulerType().equals(RulerTypeConstants.SCE))
                genericItem.setRating(genericItemIndexCalculator.getRatingForSce(sce, perspectiveGroupInfo.getPerspectiveIds(), perspectiveGroupInfo.getDate()));
        }

        handleView(sce, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }


    public GenericItem buildGenericItemForSce(SecurityControlExpression sce, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(sce);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        if (perspectiveGroupInfo.isRated()) {
            if (perspectiveGroupInfo.getRulerType().equals(RulerTypeConstants.SCE))
                genericItem.setRating(genericItemIndexCalculator.getRatingForSce(sce, perspectiveGroupInfo.getPerspectiveIds(), perspectiveGroupInfo.getDate()));
        }

        handleView(sce, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    private void handleView(SecurityControlExpression sce, ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<GenericItem> children = new ArrayList<>();

        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            switch (viewDescriptor.getViewName()) {
                case GIView.OBJECTIVE_PARAMETER:
                    handleViewNameObjectiveParameterWord(sce, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.METHOD_PARAMETER:
                    handleViewNameMethodParameterWord(sce, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.CONTENT_PARAMETER:
                    handleViewNameContentParameterWord(sce, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.SUBJECT_PARAMETER:
                    handleViewNameSubjectParameterWord(sce, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ASSET_TYPE:
                    handleViewNameAssetType(sce, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.BUSINESS_ASSET_TYPE:
                    handleViewNameBusinessAssetType(sce, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ASSET:
                    handleViewNameAsset(sce, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.BUSINESS_ASSET:
                    handleViewNameBusinessAsset(sce, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.STANDARD_ELEMENT:
                case GIView.BUSINESS_ELEMENT:
                case GIView.THREAT_ELEMENT:
                case GIView.SHIELD_ELEMENT:
                    handleViewNameShieldElement(sce, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.SCE_GROUP:
                    handleViewNameSceGroup(sce, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("buildGenericItemForSceWithFulfillsShieldElementLink: unknown viewName " + viewDescriptor.getViewName() + " for SceFulfillsShieldElement");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
    }

    private void handleViewNameBusinessAssetType(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS)) {
            handleAllLinkedCaseForViewBusinessAssetType(sce, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.COULD_PROTECT)) {
            handleCouldProtectCaseForBusinessAssetType(sce, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.SHALL_PROTECT)) {
            handleShallProtectCaseForBusinessAssetType(sce, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("buildGenericItemForSce: viewName: business_asset_type : unknown selection mode " + viewDescriptor.getSelectionMode());
    }

    private void handleViewNameSceGroup(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<SceGroupMember> sceGroupMembers = sce.getSceGroupMembers();
        if (sceGroupMembers != null && (!sceGroupMembers.isEmpty())) {
            for (SceGroupMember sceGroupMember : sceGroupMembers) {
                if (sceGroupMember != null && (!sceGroupMember.isArchived()) && (sceGroupMember.isActivated())) {
                    SceGroup sceGroup = sceGroupMember.getSceGroup();
                    if (sceGroup != null && (!sceGroup.isArchived()))
                        children.add(genericItemSceGroupService.buildGenericItemForSceGroup(sceGroup, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameShieldElement(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS)) {
            handleAllLinkedCaseForViewShieldElement(sce, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS_FILTERED_BY_SHIELD_ID)) {
            handleAllLinkedByShieldIdCaseForViewShieldElement(sce, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("buildGenericItemForSceWithFulfillsShieldElementLink: viewName: shield_element: unknown selection mode " + viewDescriptor.getSelectionMode());
    }

    private void handleAllLinkedByShieldIdCaseForViewShieldElement(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (viewDescriptor.getShieldId() == null)
            throw new ExecException("buildGenericItemForSceWithFulfillsShieldElementLink: viewName: shield_element: selectionMode : all_linked_by_shield_id : shieldId is null in view descriptor");
        Shield shield = shieldRepository.findOne(viewDescriptor.getShieldId());
        if (shield == null || shield.isArchived())
            throw new ExecException("buildGenericItemForSceWithFulfillsShieldElementLink: viewName: shield_element: selectionMode : all_linked_by_shield_id : Shield with id " + viewDescriptor.getShieldId() + " not found");
        int shieldId = shield.getId();
        List<SceFulfillsShieldElement> sceFulfillsShieldElementList = sce.getSceFulfillsShieldElementList();
        if (sceFulfillsShieldElementList != null && (!sceFulfillsShieldElementList.isEmpty())) {
            for (SceFulfillsShieldElement sceFulfillsShieldElement : sceFulfillsShieldElementList) {
                if (sceFulfillsShieldElement != null && (!sceFulfillsShieldElement.isArchived())) {
                    ShieldElement shieldElement = sceFulfillsShieldElement.getShieldElement();
                    if (shieldElement != null && (!shieldElement.isArchived()) && shieldElement.getShield().getId().equals(shieldId))
                        children.add(genericItemShieldElementService.buildGenericItemForSceFulfillsShieldElement(sceFulfillsShieldElement, shieldElement, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleAllLinkedCaseForViewShieldElement(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<SceFulfillsShieldElement> sceFulfillsShieldElementList = sce.getSceFulfillsShieldElementList();
        if (sceFulfillsShieldElementList != null && (!sceFulfillsShieldElementList.isEmpty())) {
            for (SceFulfillsShieldElement sceFulfillsShieldElement : sceFulfillsShieldElementList) {
                if (sceFulfillsShieldElement != null && (!sceFulfillsShieldElement.isArchived())) {
                    ShieldElement shieldElement = sceFulfillsShieldElement.getShieldElement();
                    if (shieldElement != null && (!shieldElement.isArchived()))
                        children.add(genericItemShieldElementService.buildGenericItemForSceFulfillsShieldElement(sceFulfillsShieldElement, shieldElement, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameAsset(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS)) {
            handleAllLinkedCaseForViewAsset(sce, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.COULD_DELIVER)) {
            handleCouldDeliverCaseForAsset(sce, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.SHALL_DELIVER)) {
            handleShallDeliverCaseForAsset(sce, viewDescriptor, children, perspectiveGroupInfo);
        /*} else if (viewDescriptor.getSelectionMode().equals(GIMode.PROTECT)) {
            handleProtectCaseForAssetType(sce, viewDescriptor, children,perspectiveGroupInfo);*/
        } else
            throw new ExecException("buildGenericItemForSce: viewName: asset : unknown selection mode " + viewDescriptor.getSelectionMode());
    }

    private void handleViewNameBusinessAsset(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS)) {
            handleAllLinkedCaseForViewBusinessAsset(sce, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.COULD_DELIVER)) {
            handleCouldDeliverCaseForBusinessAsset(sce, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.SHALL_DELIVER)) {
            handleShallDeliverCaseForBusinessAsset(sce, viewDescriptor, children, perspectiveGroupInfo);
        } else
            throw new ExecException("buildGenericItemForSce: viewName: asset : unknown selection mode " + viewDescriptor.getSelectionMode());
    }

    private void handleShallDeliverCaseForAsset(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        //all assets that deliver sce
        List<AssetDeliversSce> assetDeliversSceList = sce.getAssetDeliversSceList();
        if (assetDeliversSceList != null && (!assetDeliversSceList.isEmpty())) {
            for (AssetDeliversSce assetDeliversSce : assetDeliversSceList) {
                if (assetDeliversSce != null && (!assetDeliversSce.isArchived()) && assetDeliversSce.getShallCould() != null && assetDeliversSce.getShallCould().equals(ProtectionType.SHALL)) {
                    Asset asset = assetDeliversSce.getAsset();
                    if (asset != null && (!asset.isArchived()))
                        children.add(genericItemAssetService.buildGenericItemForAssetWithDeliversSceLink(assetDeliversSce, asset, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleShallDeliverCaseForBusinessAsset(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        //all assets that deliver sce
        List<BusinessAssetToExpressionLink> businessAssetToExpressionLinks = sce.getBusinessAssetToExpressionLinks();
        if (businessAssetToExpressionLinks != null && (!businessAssetToExpressionLinks.isEmpty())) {
            for (BusinessAssetToExpressionLink businessAssetToExpressionLink : businessAssetToExpressionLinks) {
                if (businessAssetToExpressionLink != null && (!businessAssetToExpressionLink.isArchived()) && businessAssetToExpressionLink.getShallCould() != null && businessAssetToExpressionLink.getShallCould().equals(ProtectionType.SHALL)) {
                    BusinessAsset asset = businessAssetToExpressionLink.getBusinessAsset();
                    if (asset != null && (!asset.isArchived()))
                        children.add(genericItemBusinessAssetService.buildGenericItemForBusinessAssetToExpressionLink(businessAssetToExpressionLink, asset, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleCouldDeliverCaseForAsset(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        //all assets that deliver sce
        List<AssetDeliversSce> assetDeliversSceList = sce.getAssetDeliversSceList();
        if (assetDeliversSceList != null && (!assetDeliversSceList.isEmpty())) {
            for (AssetDeliversSce assetDeliversSce : assetDeliversSceList) {
                if (assetDeliversSce != null && (!assetDeliversSce.isArchived()) && assetDeliversSce.getShallCould() != null && assetDeliversSce.getShallCould().equals(ProtectionType.COULD)) {
                    Asset asset = assetDeliversSce.getAsset();
                    if (asset != null && (!asset.isArchived()))
                        children.add(genericItemAssetService.buildGenericItemForAssetWithDeliversSceLink(assetDeliversSce, asset, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleCouldDeliverCaseForBusinessAsset(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        //all assets that deliver sce
        List<BusinessAssetToExpressionLink> businessAssetToExpressionLinks = sce.getBusinessAssetToExpressionLinks();
        if (businessAssetToExpressionLinks != null && (!businessAssetToExpressionLinks.isEmpty())) {
            for (BusinessAssetToExpressionLink businessAssetToExpressionLink : businessAssetToExpressionLinks) {
                if (businessAssetToExpressionLink != null && (!businessAssetToExpressionLink.isArchived()) && businessAssetToExpressionLink.getShallCould() != null && businessAssetToExpressionLink.getShallCould().equals(ProtectionType.COULD)) {
                    BusinessAsset asset = businessAssetToExpressionLink.getBusinessAsset();
                    if (asset != null && (!asset.isArchived()))
                        children.add(genericItemBusinessAssetService.buildGenericItemForBusinessAssetToExpressionLink(businessAssetToExpressionLink, asset, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleAllLinkedCaseForViewAsset(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        //all assets that deliver sce
        List<AssetDeliversSce> assetDeliversSceList = sce.getAssetDeliversSceList();
        if (assetDeliversSceList != null && (!assetDeliversSceList.isEmpty())) {
            for (AssetDeliversSce assetDeliversSce : assetDeliversSceList) {
                if (assetDeliversSce != null && (!assetDeliversSce.isArchived())) {
                    Asset asset = assetDeliversSce.getAsset();
                    if (asset != null && (!asset.isArchived()))
                        children.add(genericItemAssetService.buildGenericItemForAssetWithDeliversSceLink(assetDeliversSce, asset, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleAllLinkedCaseForViewBusinessAsset(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        //all assets that deliver sce
        List<BusinessAssetToExpressionLink> businessAssetToExpressionLinks = sce.getBusinessAssetToExpressionLinks();
        if (businessAssetToExpressionLinks != null && (!businessAssetToExpressionLinks.isEmpty())) {
            for (BusinessAssetToExpressionLink businessAssetToExpressionLink : businessAssetToExpressionLinks) {
                if (businessAssetToExpressionLink != null && (!businessAssetToExpressionLink.isArchived())) {
                    BusinessAsset asset = businessAssetToExpressionLink.getBusinessAsset();
                    if (asset != null && (!asset.isArchived()))
                        children.add(genericItemBusinessAssetService.buildGenericItemForBusinessAssetToExpressionLink(businessAssetToExpressionLink, asset, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameAssetType(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        if (viewDescriptor.getSelectionMode() == null || viewDescriptor.getSelectionMode().equals(GIMode.ALL_LINKED_ELEMENTS)) {
            handleAllLinkedCaseForViewAssetType(sce, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.COULD_PROTECT)) {
            handleCouldProtectCaseForAssetType(sce, viewDescriptor, children, perspectiveGroupInfo);
        } else if (viewDescriptor.getSelectionMode().equals(GIMode.SHALL_PROTECT)) {
            handleShallProtectCaseForAssetType(sce, viewDescriptor, children, perspectiveGroupInfo);
        /*} else if (viewDescriptor.getSelectionMode().equals(GIMode.PROTECT)) {
            handleProtectCaseForAssetType(sce, viewDescriptor, children,perspectiveGroupInfo);*/
        } else
            throw new ExecException("buildGenericItemForSce: viewName: asset_type : unknown selection mode " + viewDescriptor.getSelectionMode());
    }

    private void handleShallProtectCaseForAssetType(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<AssetTypeProtectedBySce> assetTypeProtectedBySceList = sce.getAssetTypeProtectedBySceList();
        if (assetTypeProtectedBySceList != null && (!assetTypeProtectedBySceList.isEmpty())) {
            for (AssetTypeProtectedBySce assetTypeProtectedBySce : assetTypeProtectedBySceList) {
                if (assetTypeProtectedBySce != null && (!assetTypeProtectedBySce.isArchived()) && assetTypeProtectedBySce.getShallCouldIs().equals(ProtectionType.SHALL)) {
                    AssetType assetType = assetTypeProtectedBySce.getAssetType();
                    if (assetType != null && (!assetType.isArchived()))
                        children.add(genericItemAssetTypeService.buildGenericItemForAssetTypeWithProtectedBySceLink(assetTypeProtectedBySce, assetType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleShallProtectCaseForBusinessAssetType(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAssetTypeToExpressionLink> businessAssetTypeToExpressionLinks = sce.getBusinessAssetTypeToExpressionLinks();
        if (businessAssetTypeToExpressionLinks != null && (!businessAssetTypeToExpressionLinks.isEmpty())) {
            for (BusinessAssetTypeToExpressionLink businessAssetTypeToExpressionLink : businessAssetTypeToExpressionLinks) {
                if (businessAssetTypeToExpressionLink != null && (!businessAssetTypeToExpressionLink.isArchived()) && businessAssetTypeToExpressionLink.getShallCouldIs().equals(ProtectionType.SHALL)) {
                    BusinessAssetType assetType = businessAssetTypeToExpressionLink.getBusinessAssetType();
                    if (assetType != null && (!assetType.isArchived()))
                        children.add(genericItemBusinessAssetTypeService.buildGenericItemForBusinessAssetTypeToExpressionLink(businessAssetTypeToExpressionLink, assetType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleCouldProtectCaseForAssetType(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<AssetTypeProtectedBySce> assetTypeProtectedBySceList = sce.getAssetTypeProtectedBySceList();
        if (assetTypeProtectedBySceList != null && (!assetTypeProtectedBySceList.isEmpty())) {
            for (AssetTypeProtectedBySce assetTypeProtectedBySce : assetTypeProtectedBySceList) {
                if (assetTypeProtectedBySce != null && (!assetTypeProtectedBySce.isArchived()) && assetTypeProtectedBySce.getShallCouldIs().equals(ProtectionType.COULD)) {
                    AssetType assetType = assetTypeProtectedBySce.getAssetType();
                    if (assetType != null && (!assetType.isArchived()))
                        children.add(genericItemAssetTypeService.buildGenericItemForAssetTypeWithProtectedBySceLink(assetTypeProtectedBySce, assetType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleCouldProtectCaseForBusinessAssetType(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAssetTypeToExpressionLink> businessAssetTypeToExpressionLinks = sce.getBusinessAssetTypeToExpressionLinks();
        if (businessAssetTypeToExpressionLinks != null && (!businessAssetTypeToExpressionLinks.isEmpty())) {
            for (BusinessAssetTypeToExpressionLink businessAssetTypeToExpressionLink : businessAssetTypeToExpressionLinks) {
                if (businessAssetTypeToExpressionLink != null && (!businessAssetTypeToExpressionLink.isArchived()) && businessAssetTypeToExpressionLink.getShallCouldIs().equals(ProtectionType.COULD)) {
                    BusinessAssetType assetType = businessAssetTypeToExpressionLink.getBusinessAssetType();
                    if (assetType != null && (!assetType.isArchived()))
                        children.add(genericItemBusinessAssetTypeService.buildGenericItemForBusinessAssetTypeToExpressionLink(businessAssetTypeToExpressionLink, assetType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleAllLinkedCaseForViewAssetType(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<AssetTypeProtectedBySce> assetTypeProtectedBySceList = sce.getAssetTypeProtectedBySceList();
        if (assetTypeProtectedBySceList != null && (!assetTypeProtectedBySceList.isEmpty())) {
            for (AssetTypeProtectedBySce assetTypeProtectedBySce : assetTypeProtectedBySceList) {
                if (assetTypeProtectedBySce != null && (!assetTypeProtectedBySce.isArchived())) {
                    AssetType assetType = assetTypeProtectedBySce.getAssetType();
                    if (assetType != null && (!assetType.isArchived()))
                        children.add(genericItemAssetTypeService.buildGenericItemForAssetTypeWithProtectedBySceLink(assetTypeProtectedBySce, assetType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleAllLinkedCaseForViewBusinessAssetType(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<BusinessAssetTypeToExpressionLink> businessAssetTypeToExpressionLinks = sce.getBusinessAssetTypeToExpressionLinks();
        if (businessAssetTypeToExpressionLinks != null && (!businessAssetTypeToExpressionLinks.isEmpty())) {
            for (BusinessAssetTypeToExpressionLink businessAssetTypeToExpressionLink : businessAssetTypeToExpressionLinks) {
                if (businessAssetTypeToExpressionLink != null && (!businessAssetTypeToExpressionLink.isArchived())) {
                    BusinessAssetType assetType = businessAssetTypeToExpressionLink.getBusinessAssetType();
                    if (assetType != null && (!assetType.isArchived()))
                        children.add(genericItemBusinessAssetTypeService.buildGenericItemForBusinessAssetTypeToExpressionLink(businessAssetTypeToExpressionLink, assetType, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameSubjectParameterWord(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        //handle all linked subject parameter words
        SubjectParameterWord subjectParameterWord = sce.getSubjectParameterWord();
        if (subjectParameterWord != null && (!subjectParameterWord.isArchived())) {
            children.add(genericItemSubjectParameterWordService.buildGenericItemForSubjectParameterWord(subjectParameterWord, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }

    private void handleViewNameContentParameterWord(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        //handle all linked content parameter words
        ContentParameterWord contentParameterWord = sce.getContentParameterWord();
        if (contentParameterWord != null && (!contentParameterWord.isArchived())) {
            children.add(genericItemContentParameterWordService.buildGenericItemForContentParameterWord(contentParameterWord, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }

    private void handleViewNameMethodParameterWord(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        //handle all linked method parameter words
        MethodParameterWord methodParameterWord = sce.getMethodParameterWord();
        if (methodParameterWord != null && (!methodParameterWord.isArchived())) {
            children.add(genericItemMethodParameterWordService.buildGenericItemForMethodParameterWord(methodParameterWord, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }

    private void handleViewNameObjectiveParameterWord(SecurityControlExpression sce, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        //handle all linked
        ObjectiveParameterWord objectiveParameterWord = sce.getObjectiveParameterWord();
        if (objectiveParameterWord != null && (!objectiveParameterWord.isArchived())) {
            children.add(genericItemObjectiveParameterWordService.buildGenericItemForObjectiveParameterWord(objectiveParameterWord, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }
}
