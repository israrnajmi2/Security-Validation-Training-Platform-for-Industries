package com.ss.service.generictraversal;

import com.ss.common.ExecException;
import com.ss.constants.GIView;
import com.ss.constants.LinkName;
import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.usermanagement.*;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("GenericItemSphericUserService")
public class GenericItemSphericUserService {

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemUserRoleService genericItemUserRoleService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private GenericItemOrganizationalUnitService genericItemOrganizationalUnitService;

    public GenericItem buildGenericItemForPendingApprovalLink(ApprovalPendingUserRolesMap approvalPendingUserRolesMap, SphericUser sphericUser, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (approvalPendingUserRolesMap == null)
            throw new ExecException("buildGenericItemForPendingApprovalLink method : approvalPendingUserRolesMap parameter is null");
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(sphericUser);
        genericItem.setLinkId(approvalPendingUserRolesMap.getId());
        genericItem.setLinkType(ObjectTypeConstants.APPROVAL_PENDING_USER_ROLE_LINK);
        genericItem.setLinkName(LinkName.PENDING_APPROVAL);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(sphericUser, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    public GenericItem buildGenericItemForApprovedLink(ApprovedUserRolesMap approvedUserRolesMap, SphericUser sphericUser, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {

        if (approvedUserRolesMap == null)
            throw new ExecException("buildGenericItemForApprovedLink method : approvedUserRolesMap parameter is null");
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(sphericUser);
        genericItem.setLinkId(approvedUserRolesMap.getId());

        genericItem.setLinkType(ObjectTypeConstants.APPROVED_USER_ROLE_LINK);
        genericItem.setLinkName(LinkName.ROLE_ASSIGNED);


        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(sphericUser, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    public GenericItem buildGenericItemForSphericUser(SphericUser sphericUser, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
        //GenericItem pojo - special case.
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(sphericUser);
        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        handleView(sphericUser, viewDescriptor, genericItem, perspectiveGroupInfo);
        return genericItem;
    }

    private void handleView(SphericUser sphericUser, ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<GenericItem> children = new ArrayList<>();
        if (viewDescriptor != null && viewDescriptor.getViewName() != null) {
            switch (viewDescriptor.getViewName()) {
                case GIView.APPROVED_ROLES:
                    handleViewNameApprovedRoles(sphericUser, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.PENDING_APPROVAL_ROLES:
                    handleViewNamePendingApprovalRoles(sphericUser, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ROLES:
                    handleViewNameRoles(sphericUser, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                case GIView.ORGANIZATIONAL_UNIT:
                    handleViewNameOrganizationalUnit(sphericUser, viewDescriptor, children, perspectiveGroupInfo);
                    break;
                default:
                    throw new ExecException("buildGenericItemForSphericUser: unknown viewName " + viewDescriptor.getViewName() + " for SphericUser");
            }
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
    }

    private void handleViewNameApprovedRoles(SphericUser sphericUser, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ApprovedUserRolesMap> approvedUserRolesMapList = sphericUser.getApprovedUserRolesMapList();
        if (approvedUserRolesMapList != null) {
            for (ApprovedUserRolesMap approvedUserRolesMap : approvedUserRolesMapList) {
                if (approvedUserRolesMap != null && !approvedUserRolesMap.isArchived()) {
                    UserRole userRole = approvedUserRolesMap.getRole();
                    if (userRole != null && !userRole.isArchived())
                        children.add(genericItemUserRoleService.buildGenericItemForApprovedUserRoleLink(approvedUserRolesMap, userRole, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNamePendingApprovalRoles(SphericUser sphericUser, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        List<ApprovalPendingUserRolesMap> approvalPendingUserRolesMapList = sphericUser.getApprovalPendingUserRolesMapList();
        if (approvalPendingUserRolesMapList != null) {
            for (ApprovalPendingUserRolesMap approvalPendingUserRolesMap : approvalPendingUserRolesMapList) {
                if (approvalPendingUserRolesMap != null && !approvalPendingUserRolesMap.isArchived()) {
                    UserRole userRole = approvalPendingUserRolesMap.getRole();
                    if (userRole != null && !userRole.isArchived())
                        children.add(genericItemUserRoleService.buildGenericItemForApprovalPendingUserRoleLink(approvalPendingUserRolesMap, userRole, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
                }
            }
        }
    }

    private void handleViewNameRoles(SphericUser sphericUser, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        handleViewNameApprovedRoles(sphericUser, viewDescriptor, children, perspectiveGroupInfo);
        handleViewNamePendingApprovalRoles(sphericUser, viewDescriptor, children, perspectiveGroupInfo);
    }

    private void handleViewNameOrganizationalUnit(SphericUser sphericUser, ViewDescriptor viewDescriptor, List<GenericItem> children, PerspectiveGroupInfo perspectiveGroupInfo) {
        OrganizationalUnit organizationalUnit = sphericUser.getOrganizationalUnit();
        if (organizationalUnit != null && !organizationalUnit.isArchived()) {
            children.add(genericItemOrganizationalUnitService.buildGenericItemForOrganizationalUnit(organizationalUnit, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
        }
    }
}
