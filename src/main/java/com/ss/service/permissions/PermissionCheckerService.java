package com.ss.service.permissions;

import com.ss.common.ExecException;
import com.ss.constants.MiscellaneousActionConstants;
import com.ss.domain.usermanagement.*;
import com.ss.pojo.helper.*;
import com.ss.pojo.restservice.UserRoleInfoWithActive;
import com.ss.repository.usermanagement.*;
import com.ss.service.delete.DeleteHelperService;
import com.ss.utils.GetWithIdHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("PermissionCheckerService")
public class PermissionCheckerService {

    private Map<String, UserTypeAndActiveRoleDetails> emailIdToUserRoleDetailsMap = new HashMap<>();

    private Map<Integer, SphericPermissionsInMemory> roleIdToPermissionsObjectMap = new HashMap<>();

    @Autowired
    private SphericUserRepository sphericUserRepository;

    @Autowired
    private CoreObjectTypePermissionsMapRepository coreObjectTypePermissionsMapRepository;

    @Autowired
    private ObjectTypeTableRepository objectTypeTableRepository;

    @Autowired
    private DeleteHelperService deleteHelperService;

    @Autowired
    private GetWithIdHelper getWithIdHelper;

    @Autowired
    private MiscellaneousActionRepository miscellaneousActionRepository;

    @Autowired
    private MiscellaneousActionPermissionsMapRepository miscellaneousActionPermissionsMapRepository;

    public boolean hasCreatePermission(String objectType) {
        if (isRootUser())
            return true;
        CoreHotlinksPOJO coreHotlinksPOJO = getCoreHotlinksPOJO(objectType);
        if (coreHotlinksPOJO == null)
            return false;
        return coreHotlinksPOJO.isCanCreate();
    }

    public boolean hasEditPermission(String objectType) {
        if (isRootUser())
            return true;
        CoreHotlinksPOJO coreHotlinksPOJO = getCoreHotlinksPOJO(objectType);
        if (coreHotlinksPOJO == null)
            return false;
        return coreHotlinksPOJO.isCanEdit();
    }

    public boolean hasDeletePermission(String objectType) {
        if (isRootUser())
            return true;
        CoreHotlinksPOJO coreHotlinksPOJO = getCoreHotlinksPOJO(objectType);
        if (coreHotlinksPOJO == null)
            return false;
        return coreHotlinksPOJO.isCanDelete();
    }

    public boolean hasDataviewPermission(String objectType) {
        if (isRootUser())
            return true;

        if (objectType.endsWith("rating"))
            return true;
        CoreHotlinksPOJO coreHotlinksPOJO = getCoreHotlinksPOJO(objectType);
        if (coreHotlinksPOJO == null)
            return false;
        return coreHotlinksPOJO.isCanDataview();
    }

    public boolean haveMiscellaneousPermission(String actionNameConstant) {
        if (isRootUser()) {
            if(actionNameConstant.equals(MiscellaneousActionConstants.SHOW_PRIMARY_LINKS_ONLY))
                return false;
            return true;
        }
        SphericPermissionsInMemory sphericPermissionsInMemory = getSphericPermissionsInMemoryForLoggedInUser();
        if (sphericPermissionsInMemory == null)
            throw new ExecException("Cannot get SphericPermissions.. one general reason could be no role assigned to the logged in user");
        MiscellaneousPermissionsInMemory miscellaneousPermissionsInMemory = sphericPermissionsInMemory.getMiscellaneousPermissionsInMemory();
        Map<String, MiscellaneousPermissionObjectPOJO> miscellaneousActionStateMap = miscellaneousPermissionsInMemory.getMiscellaneousActionStateMap();
        MiscellaneousPermissionObjectPOJO isPermittedState = miscellaneousActionStateMap.get(actionNameConstant);
        if (isPermittedState == null)
            return false;
        return isPermittedState.isHavePermission();
    }

    private boolean isRootUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        UserTypeAndActiveRoleDetails userTypeAndActiveRoleDetails = emailIdToUserRoleDetailsMap.get(email);
        if (userTypeAndActiveRoleDetails == null) {
            SphericUser sphericUser = getLoggedInSphericUser();
            UserRole userRole = updateUserTypeRoleDetailsAndReturnUserRole(sphericUser);
        }
        userTypeAndActiveRoleDetails = emailIdToUserRoleDetailsMap.get(email);
        if (userTypeAndActiveRoleDetails == null)
            throw new ExecException("User Details cannot be resolved for whatever unknown reason");
        return userTypeAndActiveRoleDetails.isRootUser();
    }

    private CoreHotlinksPOJO getCoreHotlinksPOJO(String objectType) {
        SphericPermissionsInMemory sphericPermissionsInMemory = getSphericPermissionsInMemoryForLoggedInUser();
        if (sphericPermissionsInMemory == null)
            throw new ExecException("Cannot get SphericPermissions.. one general reason could be no role assigned to the logged in user");
        CorePermissionsInMemory corePermissionsInMemory = sphericPermissionsInMemory.getCorePermissionsInMemory();
        Map<String, CoreHotlinksPOJO> objectTypeToCoreHotlinksMap = corePermissionsInMemory.getObjectTypeToCoreHotlinksMap();
        CoreHotlinksPOJO coreHotlinksPOJO = objectTypeToCoreHotlinksMap.get(objectType);
        return coreHotlinksPOJO;
    }

    public boolean isLoggedIn() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth.getName().equals("anonymousUser"))
            return false;
        return true;
    }

    public SphericUser getLoggedInSphericUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        if (email == null)
            return null;
        if (auth.getName().equals("anonymousUser"))
            return null;
        List<SphericUser> sphericUserList = sphericUserRepository.findByEmailAndIsActivatedTrueAndIsArchivedFalse(email);
        if (sphericUserList == null || sphericUserList.isEmpty())
            throw new ExecException("User with email " + email + " not found");
        SphericUser sphericUser = sphericUserList.get(0);
        return sphericUser;
    }

    private SphericPermissionsInMemory getSphericPermissionsInMemoryForLoggedInUser() {

        SphericUser sphericUser = getLoggedInSphericUser();

        UserTypeAndActiveRoleDetails userTypeAndActiveRoleDetails = emailIdToUserRoleDetailsMap.get(sphericUser.getEmail());


        if (userTypeAndActiveRoleDetails == null) {
            updateUserTypeRoleDetailsAndReturnUserRole(sphericUser);
        }

        userTypeAndActiveRoleDetails = emailIdToUserRoleDetailsMap.get(sphericUser.getEmail());

        if (userTypeAndActiveRoleDetails.getRoleId() == null)
            throw new ExecException("RoleId details could not be resolved for user with email- for some unknown reason");

        SphericPermissionsInMemory sphericPermissionsInMemory = roleIdToPermissionsObjectMap.get(userTypeAndActiveRoleDetails.getRoleId());

        if (sphericPermissionsInMemory == null) {
            UserRole userRole = getWithIdHelper.getUserRole(userTypeAndActiveRoleDetails.getRoleId());
            sphericPermissionsInMemory = updateAndReturnSphericPermissionDetails(userRole);
        }

        if (sphericPermissionsInMemory == null)
            throw new ExecException("SphericPermissions cannot be resolved for role with id " + userTypeAndActiveRoleDetails.getRoleId() + " for some unknown reason");

        return sphericPermissionsInMemory;
    }

    public SphericPermissionsInMemory getSphericPermissionsInMemory(UserRole userRole) {
        if (userRole == null || userRole.isArchived())
            throw new ExecException("Passed User Role is null or archived");

        SphericPermissionsInMemory sphericPermissionsInMemory = roleIdToPermissionsObjectMap.get(userRole.getId());

        if (sphericPermissionsInMemory == null) {
            sphericPermissionsInMemory = updateAndReturnSphericPermissionDetails(userRole);
        }

        if (sphericPermissionsInMemory == null)
            throw new ExecException("SphericPermissions cannot be resolved for role with id " + userRole.getId() + " for some unknown reason");

        return sphericPermissionsInMemory;
    }

    private UserRole updateUserTypeRoleDetailsAndReturnUserRole(SphericUser sphericUser) {

        UserTypeAndActiveRoleDetails userTypeAndActiveRoleDetails = new UserTypeAndActiveRoleDetails();
        if (sphericUser.isRootUser())
            userTypeAndActiveRoleDetails.setRootUser(true);
        else
            userTypeAndActiveRoleDetails.setRootUser(false);

        UserRole userRole = getActiveRole(sphericUser);
        if (userRole == null && !sphericUser.isRootUser())
            throw new ExecException("Active Role not found for user with email " + sphericUser.getEmail());

        if (userRole == null && sphericUser.isRootUser())
            userTypeAndActiveRoleDetails.setRoleId(null);
        else
            userTypeAndActiveRoleDetails.setRoleId(userRole.getId());

        emailIdToUserRoleDetailsMap.put(sphericUser.getEmail(), userTypeAndActiveRoleDetails);
        return userRole;
    }

    private SphericPermissionsInMemory updateAndReturnSphericPermissionDetails(UserRole userRole) {
        if (userRole == null)
            throw new ExecException("Passed UserRole Object is null");
        SphericPermissionsInMemory sphericPermissionsInMemory = new SphericPermissionsInMemory();
        CorePermissionsInMemory corePermissionsInMemory = buildCorePermissionsInMemory(userRole);
        MiscellaneousPermissionsInMemory miscellaneousPermissionsInMemory = buildMiscellaneousPermissionsInMemory(userRole);
        sphericPermissionsInMemory.setCorePermissionsInMemory(corePermissionsInMemory);
        sphericPermissionsInMemory.setMiscellaneousPermissionsInMemory(miscellaneousPermissionsInMemory);
        roleIdToPermissionsObjectMap.put(userRole.getId(), sphericPermissionsInMemory);
        return sphericPermissionsInMemory;
    }

    private CorePermissionsInMemory buildCorePermissionsInMemory(UserRole userRole) {
        CorePermissionsInMemory corePermissionsInMemory = new CorePermissionsInMemory();
        Map<String, CoreObjectTypePermissionsMap> objectTypeToCorePermissionsRecoredMap = getObjectTypeToCorePermissionsRecordMap(userRole);
        Map<String, CoreHotlinksPOJO> objectTypesToCoreHotlinksMap = getObjectTypeToCoreHotlinksMap(objectTypeToCorePermissionsRecoredMap);
        corePermissionsInMemory.setObjectTypeToCoreHotlinksMap(objectTypesToCoreHotlinksMap);
        return corePermissionsInMemory;
    }

    private Map<String, CoreHotlinksPOJO> getObjectTypeToCoreHotlinksMap(Map<String, CoreObjectTypePermissionsMap> objectTypeToCorePermissionsRecoredMap) {
        Map<String, CoreHotlinksPOJO> response = new LinkedHashMap<>();

        if (objectTypeToCorePermissionsRecoredMap != null) {
            for (Map.Entry<String, CoreObjectTypePermissionsMap> entry : objectTypeToCorePermissionsRecoredMap.entrySet()) {
                String objectType = entry.getKey();
                CoreObjectTypePermissionsMap value = entry.getValue();

                CoreHotlinksPOJO coreHotlinksPOJO = new CoreHotlinksPOJO();
                coreHotlinksPOJO.setCanCreate(value.isCanCreate());
                coreHotlinksPOJO.setCanDataview(value.isCanDataview());
                coreHotlinksPOJO.setCanDelete(value.isCanDelete());
                coreHotlinksPOJO.setCanEdit(value.isCanEdit());
                coreHotlinksPOJO.setObjectTypeLabel(value.getObjectTypeTable().getLabel());
                response.put(objectType, coreHotlinksPOJO);
            }
        }
        return response;
    }

    public Map<String, CoreObjectTypePermissionsMap> getObjectTypeToCorePermissionsRecordMap(UserRole userRole) {
        List<CoreObjectTypePermissionsMap> coreObjectTypePermissionsMapList = userRole.getCoreObjectTypePermissionsMapList();

        Map<String, CoreObjectTypePermissionsMap> interimMap = new HashMap<>();
        if (coreObjectTypePermissionsMapList != null) {
            for (CoreObjectTypePermissionsMap coreObjectTypePermissionsMap : coreObjectTypePermissionsMapList) {
                if (coreObjectTypePermissionsMap.isArchived()) {
                    deleteHelperService.deleteCoreObjectTypePermissionsMap(coreObjectTypePermissionsMap);
                    continue;
                }

                ObjectTypeTable objectTypeTable = coreObjectTypePermissionsMap.getObjectTypeTable();
                if (objectTypeTable.isArchived()) {
                    deleteHelperService.deleteCoreObjectTypePermissionsMap(coreObjectTypePermissionsMap);
                    continue;
                }

                CoreObjectTypePermissionsMap coreObjectTypePermissionsMap1 = interimMap.get(objectTypeTable.getName());
                if (coreObjectTypePermissionsMap1 != null)
                    deleteHelperService.deleteCoreObjectTypePermissionsMap(coreObjectTypePermissionsMap);
                else
                    interimMap.put(objectTypeTable.getName(), coreObjectTypePermissionsMap);
            }
        }
        Map<String, CoreObjectTypePermissionsMap> response = new LinkedHashMap<>();
        List<ObjectTypeTable> objectTypeRecords = objectTypeTableRepository.findByIsArchivedFalse();

        for (ObjectTypeTable objectTypeTable : objectTypeRecords) {
            if (objectTypeTable != null && objectTypeTable.getName() != null) {
                CoreObjectTypePermissionsMap coreObjectTypePermissionsMap = interimMap.get(objectTypeTable.getName());
                if (coreObjectTypePermissionsMap == null) {
                    coreObjectTypePermissionsMap = createNewDefaultCoreObjectTypePermissionsMapRecord(userRole, objectTypeTable);
                }
                response.put(objectTypeTable.getName(), coreObjectTypePermissionsMap);
            }
        }
        return response;
    }

    private CoreObjectTypePermissionsMap createNewDefaultCoreObjectTypePermissionsMapRecord(UserRole userRole, ObjectTypeTable objectTypeTable) {
        CoreObjectTypePermissionsMap coreObjectTypePermissionsMap = new CoreObjectTypePermissionsMap();
        coreObjectTypePermissionsMap.setArchived(false);
        coreObjectTypePermissionsMap.setCanCreate(false);
        coreObjectTypePermissionsMap.setCanDataview(false);
        coreObjectTypePermissionsMap.setCanDelete(false);
        coreObjectTypePermissionsMap.setCanEdit(false);
        coreObjectTypePermissionsMap.setObjectTypeTable(objectTypeTable);
        coreObjectTypePermissionsMap.setRole(userRole);
        coreObjectTypePermissionsMap.setRuleBased(false);
        coreObjectTypePermissionsMap.setViewNone(false);
        coreObjectTypePermissionsMap.setViewRule(null);

        coreObjectTypePermissionsMap = coreObjectTypePermissionsMapRepository.save(coreObjectTypePermissionsMap);
        if (coreObjectTypePermissionsMap == null)
            throw new ExecException("CoreObjectTypePermissionsMap - Save to Database failed");
        return coreObjectTypePermissionsMap;
    }

    private MiscellaneousPermissionsInMemory buildMiscellaneousPermissionsInMemory(UserRole userRole) {
        MiscellaneousPermissionsInMemory miscellaneousPermissionsInMemory = new MiscellaneousPermissionsInMemory();

        Map<String, MiscellaneousActionPermissionsMap> actionNameToMiscellaneousActionPremissionRecordMap = getActionNameToMiscellaneousActionPermissionRecordMap(userRole);
        Map<String, MiscellaneousPermissionObjectPOJO> miscellaneousActionsStateMap = getActionNameActiveStateMap(actionNameToMiscellaneousActionPremissionRecordMap);

        miscellaneousPermissionsInMemory.setMiscellaneousActionStateMap(miscellaneousActionsStateMap);
        return miscellaneousPermissionsInMemory;
    }

    public Map<String, MiscellaneousActionPermissionsMap> getActionNameToMiscellaneousActionPermissionRecordMap(UserRole userRole) {
        List<MiscellaneousActionPermissionsMap> miscellaneousActionPermissionsMapList = userRole.getMiscellaneousActionPermissionsMapList();

        Map<String, MiscellaneousActionPermissionsMap> interimMap = new HashMap<>();
        if (miscellaneousActionPermissionsMapList != null) {
            for (MiscellaneousActionPermissionsMap miscellaneousActionPermissionsMap : miscellaneousActionPermissionsMapList) {
                if (miscellaneousActionPermissionsMap.isArchived()) {
                    deleteHelperService.deleteMiscellaneousActionPermissionMap(miscellaneousActionPermissionsMap);
                    continue;
                }

                MiscellaneousAction miscellaneousAction = miscellaneousActionPermissionsMap.getMiscellaneousAction();
                if (miscellaneousAction.isArchived()) {
                    deleteHelperService.deleteMiscellaneousActionPermissionMap(miscellaneousActionPermissionsMap);
                    continue;
                }

                MiscellaneousActionPermissionsMap miscellaneousActionPermissionsMap1 = interimMap.get(miscellaneousAction.getName());
                if (miscellaneousActionPermissionsMap1 != null)
                    deleteHelperService.deleteMiscellaneousActionPermissionMap(miscellaneousActionPermissionsMap);
                else
                    interimMap.put(miscellaneousAction.getName(), miscellaneousActionPermissionsMap);
            }
        }
        Map<String, MiscellaneousActionPermissionsMap> response = new LinkedHashMap<>();
        List<MiscellaneousAction> miscellaneousActionRecords = miscellaneousActionRepository.findByIsArchivedFalse();

        for (MiscellaneousAction miscellaneousAction : miscellaneousActionRecords) {
            if (miscellaneousAction != null && miscellaneousAction.getName() != null) {
                MiscellaneousActionPermissionsMap miscellaneousActionPermissionsMap = interimMap.get(miscellaneousAction.getName());
                if (miscellaneousActionPermissionsMap == null) {
                    miscellaneousActionPermissionsMap = createNewDefaultMiscellaneousActionPermissionsMapRecord(userRole, miscellaneousAction);
                }
                response.put(miscellaneousAction.getName(), miscellaneousActionPermissionsMap);
            }
        }
        return response;
    }

    private MiscellaneousActionPermissionsMap createNewDefaultMiscellaneousActionPermissionsMapRecord(UserRole userRole, MiscellaneousAction miscellaneousAction) {
        MiscellaneousActionPermissionsMap miscellaneousActionPermissionsMap = new MiscellaneousActionPermissionsMap();
        miscellaneousActionPermissionsMap.setArchived(false);
        miscellaneousActionPermissionsMap.setRole(userRole);
        miscellaneousActionPermissionsMap.setMiscellaneousAction(miscellaneousAction);

        miscellaneousActionPermissionsMap = miscellaneousActionPermissionsMapRepository.save(miscellaneousActionPermissionsMap);
        if (miscellaneousActionPermissionsMap == null)
            throw new ExecException("MiscellaneousActionPermissionsMap - Save to Database failed");
        return miscellaneousActionPermissionsMap;
    }

    private Map<String, MiscellaneousPermissionObjectPOJO> getActionNameActiveStateMap(Map<String, MiscellaneousActionPermissionsMap> objectTypeToMiscellaneousActionPremissionRecordMap) {
        Map<String, MiscellaneousPermissionObjectPOJO> response = new LinkedHashMap<>();

        if (objectTypeToMiscellaneousActionPremissionRecordMap != null) {
            for (Map.Entry<String, MiscellaneousActionPermissionsMap> entry : objectTypeToMiscellaneousActionPremissionRecordMap.entrySet()) {
                String actionName = entry.getKey();
                MiscellaneousActionPermissionsMap value = entry.getValue();

                MiscellaneousPermissionObjectPOJO objectPOJO = new MiscellaneousPermissionObjectPOJO();
                objectPOJO.setObjectTypeLabel(value.getMiscellaneousAction().getLabel());
                if (value.isPermitted()) {
                    objectPOJO.setHavePermission(true);
                    response.put(actionName, objectPOJO);
                } else {
                    objectPOJO.setHavePermission(false);
                    response.put(actionName, objectPOJO);
                }
            }
        }
        return response;
    }

    public UserRole getActiveRole(SphericUser sphericUser) {
        if (sphericUser == null)
            throw new ExecException("User object passed is null");
        List<ApprovedUserRolesMap> approvedUserRolesMapList = sphericUser.getApprovedUserRolesMapList();
        if (approvedUserRolesMapList == null || approvedUserRolesMapList.isEmpty())
            return null;
        for (ApprovedUserRolesMap approvedUserRolesMap : approvedUserRolesMapList) {
            if (approvedUserRolesMap != null && !approvedUserRolesMap.isArchived() && approvedUserRolesMap.isActive()) {
                UserRole userRole = approvedUserRolesMap.getRole();
                if (userRole != null && !userRole.isArchived())
                    return userRole;
            }
        }
        return null;
    }

    public List<UserRoleInfoWithActive> getRoles(SphericUser sphericUser) {
        if (sphericUser == null)
            throw new ExecException("User object passed is null");

        List<UserRoleInfoWithActive> response = new ArrayList<>();
        List<ApprovedUserRolesMap> approvedUserRolesMapList = sphericUser.getApprovedUserRolesMapList();
        if (approvedUserRolesMapList != null) {
            for (ApprovedUserRolesMap approvedUserRolesMap : approvedUserRolesMapList) {
                if (approvedUserRolesMap != null && !approvedUserRolesMap.isArchived()) {
                    UserRole userRole = approvedUserRolesMap.getRole();
                    if (userRole != null && !userRole.isArchived()) {
                        UserRoleInfoWithActive obj = new UserRoleInfoWithActive();
                        obj.setActive(approvedUserRolesMap.isActive());
                        obj.setApproved(true);
                        obj.setDescription(userRole.getDescription());
                        obj.setElementId(userRole.getId());
                        obj.setName(userRole.getName());
                        response.add(obj);
                    }
                }
            }
        }

        List<ApprovalPendingUserRolesMap> approvalPendingUserRolesMapList = sphericUser.getApprovalPendingUserRolesMapList();
        if (approvalPendingUserRolesMapList != null) {
            for (ApprovalPendingUserRolesMap approvalPendingUserRolesMap : approvalPendingUserRolesMapList) {
                if (approvalPendingUserRolesMap != null && !approvalPendingUserRolesMap.isArchived()) {
                    UserRole userRole = approvalPendingUserRolesMap.getRole();
                    if (userRole != null && !userRole.isArchived()) {
                        UserRoleInfoWithActive obj = new UserRoleInfoWithActive();
                        obj.setActive(false);
                        obj.setApproved(false);
                        obj.setDescription(userRole.getDescription());
                        obj.setElementId(userRole.getId());
                        obj.setName(userRole.getName());
                        response.add(obj);
                    }
                }
            }
        }

        return response;
    }

    public void updateUserAndActiveRole(SphericUser user, UserRole role) {
        if (emailIdToUserRoleDetailsMap.get(user.getEmail()) == null) {
            UserTypeAndActiveRoleDetails userTypeAndActiveRoleDetails = new UserTypeAndActiveRoleDetails();
            userTypeAndActiveRoleDetails.setRootUser(user.isRootUser());
            if (user.isRootUser()) {
                if (role == null)
                    userTypeAndActiveRoleDetails.setRoleId(null);
                else
                    userTypeAndActiveRoleDetails.setRoleId(role.getId());
            } else {
                if (role == null)
                    throw new ExecException("Role is null for user with id " + user.getId());
                userTypeAndActiveRoleDetails.setRoleId(role.getId());
            }
            emailIdToUserRoleDetailsMap.put(user.getEmail(), userTypeAndActiveRoleDetails);
        } else {
            UserTypeAndActiveRoleDetails userTypeAndActiveRoleDetails = emailIdToUserRoleDetailsMap.get(user.getEmail());
            if (role == null)
                throw new ExecException("Role is null");
            userTypeAndActiveRoleDetails.setRoleId(role.getId());
            emailIdToUserRoleDetailsMap.put(user.getEmail(), userTypeAndActiveRoleDetails);
        }
    }

    public void updateRolePermissions(UserRole role) {
        if (role == null)
            throw new ExecException("Role is null");
        updateAndReturnSphericPermissionDetails(role);
    }
}
