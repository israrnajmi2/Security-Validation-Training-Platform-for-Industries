package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIView;
import com.ss.constants.LinkName;
import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.usermanagement.ApprovalPendingUserRolesMap;
import com.ss.domain.usermanagement.ApprovedUserRolesMap;
import com.ss.domain.usermanagement.SphericUser;
import com.ss.domain.usermanagement.UserRole;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("GenericItemUserRoleService")
public class GenericItemUserRoleService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemSphericUserService genericItemSphericUserService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private GenericItemOrganizationalUnitService genericItemOrganizationalUnitService;


    public GenericItem buildGenericItemForApprovedUserRoleLink(ApprovedUserRolesMap approvedUserRolesMap, UserRole userRole, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (approvedUserRolesMap == null)
            throw new ExecException("buildGenericItemForApprovedUserRoleLink method : approvedUserRolesMap parameter is null");
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(userRole);
        genericItem.setLinkId(approvedUserRolesMap.getId());

        genericItem.setLinkType(ObjectTypeConstants.APPROVED_USER_ROLE_LINK);
        genericItem.setLinkName(LinkName.APPROVED);


        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(userRole, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    public GenericItem buildGenericItemForApprovalPendingUserRoleLink(ApprovalPendingUserRolesMap approvalPendingUserRolesMap, UserRole userRole, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (approvalPendingUserRolesMap == null)
            throw new ExecException("buildGenericItemForApprovalPendingUserRoleLink method : approvalPendingUserRolesMap parameter is null");
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(userRole);
        genericItem.setLinkId(approvalPendingUserRolesMap.getId());
        genericItem.setLinkType(ObjectTypeConstants.APPROVAL_PENDING_USER_ROLE_LINK);
        genericItem.setLinkName(LinkName.PENDING_APPROVAL);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(userRole, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    public GenericItem buildGenericItemForUserRole(UserRole userRole, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(userRole);
        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(userRole, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    private void handleView(UserRole userRole, ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<GenericItem> children = new ArrayList<>();

        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {

            switch (viewDescriptor.getViewName()) {
                case GIView.SPHERIC_USER:
                    handleViewNameSphericUser(userRole, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("GenericItemAssetService: unknown viewName " + viewDescriptor.getViewName() + " for Asset");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
    }

    private void handleViewNameSphericUser(UserRole userRole, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {

        approvedRoute(userRole, viewDescriptor, children, perspectiveGroupInfo);
        pendingApprovalRoute(userRole, viewDescriptor, children, perspectiveGroupInfo);
    }

    private void pendingApprovalRoute(UserRole userRole, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ApprovalPendingUserRolesMap> approvalPendingUserRolesMapList = userRole.getApprovalPendingUserRolesMapList();
        if (approvalPendingUserRolesMapList != null) {
            for (ApprovalPendingUserRolesMap approvalPendingUserRolesMap : approvalPendingUserRolesMapList) {
                if (approvalPendingUserRolesMap != null && !approvalPendingUserRolesMap.isArchived()) {
                    SphericUser sphericUser = approvalPendingUserRolesMap.getSphericUser();
                    if (sphericUser != null && !sphericUser.isArchived() && sphericUser.isActivated())
                        children.add(genericItemSphericUserService.buildGenericItemForPendingApprovalLink(approvalPendingUserRolesMap, sphericUser, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void approvedRoute(UserRole userRole, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ApprovedUserRolesMap> approvedUserRolesMapList = userRole.getApprovedUserRolesMapList();
        if (approvedUserRolesMapList != null) {
            for (ApprovedUserRolesMap approvedUserRolesMap : approvedUserRolesMapList) {
                if (approvedUserRolesMap != null && !approvedUserRolesMap.isArchived()) {
                    SphericUser sphericUser = approvedUserRolesMap.getSphericUser();
                    if (sphericUser != null && !sphericUser.isArchived() && sphericUser.isActivated())
                        children.add(genericItemSphericUserService.buildGenericItemForApprovedLink(approvedUserRolesMap, sphericUser, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }
}
