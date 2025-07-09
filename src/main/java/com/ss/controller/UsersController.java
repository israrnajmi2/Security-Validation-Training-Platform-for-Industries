package com.ss.controller;

import com.opencsv.CSVReader;
import com.ss.common.ExecException;
import com.ss.constants.*;
import com.ss.domain.usermanagement.*;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.helper.CoreHotlinksPOJO;
import com.ss.pojo.helper.MiscellaneousPermissionObjectPOJO;
import com.ss.pojo.helper.SphericPermissionsInMemory;
import com.ss.pojo.restservice.*;
import com.ss.repository.usermanagement.*;
import com.ss.service.delete.DeleteHelperService;
import com.ss.service.generictraversal.GenericItemSphericUserService;
import com.ss.service.generictraversal.GenericItemUserRoleService;
import com.ss.service.mail.MailSenderService;
import com.ss.service.permissions.PermissionCheckerService;
import com.ss.service.usermanagement.SpringDataUserDetailsService;
import com.ss.utils.DuplicateCheckingService;
import com.ss.utils.GenericItemPOJOBuilder;
import com.ss.utils.IngestShieldFromExcelService;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@Transactional
@RequestMapping(value = "/rest/users_roles")
public class UsersController {

    @Autowired
    private SphericUserRepository sphericUserRepository;

    /*@Autowired
    private BCryptPasswordEncoder passwordEncoder;
*/
    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private OrganizationalUnitRepository organizationalUnitRepository;

    @Autowired
    private SpringDataUserDetailsService springDataUserDetailsService;

    @Autowired
    private ApprovedUserRolesMapRepository approvedUserRolesMapRepository;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    @Autowired
    private DuplicateCheckingService duplicateCheckingService;

    @Autowired
    private CoreObjectTypePermissionsMapRepository coreObjectTypePermissionsMapRepository;

    @Autowired
    private MiscellaneousActionPermissionsMapRepository miscellaneousActionPermissionsMapRepository;

    @Autowired
    private MailSenderService mailSenderService;

    @Autowired
    private IngestShieldFromExcelService ingestShieldFromExcelService;

    @Autowired
    private GenericItemUserRoleService genericItemUserRoleService;

    @Autowired
    private GenericItemSphericUserService genericItemSphericUserService;

    @Autowired
    private DeleteHelperService deleteHelperService;

    @RequestMapping(value = "/get_logged_in_user_tool_mode", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getToolMode() {
        SphericUser sphericUser = permissionCheckerService.getLoggedInSphericUser();
        if (sphericUser == null || sphericUser.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Please Login. Logged in user not recognized", HttpStatus.BAD_REQUEST);
        if (sphericUser.isRootUser()) {
            GenericItem genericItem = new GenericItem();
            genericItem.setName(ToolModeConstants.BOTH_DIRECT_AND_EXPRESSION);
            return new ResponseEntity<>(genericItem, HttpStatus.OK);
        }
        UserRole activeRole = permissionCheckerService.getActiveRole(sphericUser);
        if (activeRole == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("No Active Role found for logged in user", HttpStatus.NOT_FOUND);
        GenericItem genericItem = new GenericItem();
        genericItem.setName(activeRole.getDirectExpressionOrBoth());
        return new ResponseEntity<>(genericItem, HttpStatus.OK);
    }

    @RequestMapping(value = "/can_show_create_first_user", method = RequestMethod.GET)
    public CanShowFirstUserResponse canShowCreateFirstUser() {
        CanShowFirstUserResponse response = new CanShowFirstUserResponse();

        String notActivatedMessage = "";
        List<SphericUser> userList = sphericUserRepository.findAll();
        for (SphericUser user : userList) {
            if (user != null && !user.isArchived() && !user.isRootUser()) {

                if (user.isActivated()) {
                    response.setShowCreateFirstUser(false);
                    return response;
                } else {
                    notActivatedMessage += "\n" + user.getEmail();
                }
            }
        }

        response.setShowCreateFirstUser(true);
        if (!notActivatedMessage.isEmpty())
            response.setMessage("Below users have pending email activation. If you create a new first user, below accounts will be invalidated" + notActivatedMessage);

        return response;
    }

    @RequestMapping(value = "/delete_account", method = RequestMethod.DELETE)
    public ResponseEntity<GenericItem> deleteAccount() {

        SphericUser sphericUser = permissionCheckerService.getLoggedInSphericUser();
        if (sphericUser != null) {
            if (sphericUser.getEmail().equals("root"))
                return genericItemPOJOBuilder.buildGIErrorResponse("Root Account cannot be deleted", HttpStatus.BAD_REQUEST);
            GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(sphericUser);
            deleteHelperService.deleteUser(sphericUser);
            return new ResponseEntity(genericItem, HttpStatus.OK);
        } else
            return genericItemPOJOBuilder.buildGIErrorResponse("Please login. Logged in user is not recognized", HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/get_users_dv/{showRoles}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getUsersDv(@PathVariable("showRoles") Boolean showRoles) {
        GenericItem response = new GenericItem();
        response.setElementId(0);
        response.setObjectType(ObjectTypeConstants.USER_ROOT);

        List<GenericItem> children = new ArrayList<>();
        List<SphericUser> userList = sphericUserRepository.findAll();
        for (SphericUser user : userList) {
            if (user != null && user.isActivated() && !user.isArchived() && !user.isRootUser()) {
                if (showRoles) {
                    ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.ROLES, GIMode.ALL_LINKED_ELEMENTS);
                    PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
                    perspectiveGroupInfo.setRated(false);
                    perspectiveGroupInfo.setGroupFoundAndIncludeAllChildren(true);
                    children.add(genericItemSphericUserService.buildGenericItemForSphericUser(user, viewDescriptor, perspectiveGroupInfo));
                } else
                    children.add(genericItemPOJOBuilder.buildGenericPOJO(user));
            }
        }

        response.setChildren(children);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_first_admin_user", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createFirstAdminUser(@RequestBody CreateFirstAdminUserRequest request) {
        CanShowFirstUserResponse canShowFirstUserResponse = canShowCreateFirstUser();

        if (canShowFirstUserResponse.getShowCreateFirstUser() == null || canShowFirstUserResponse.getShowCreateFirstUser() == false)
            return genericItemPOJOBuilder.buildGIErrorResponse("First user already exist", HttpStatus.BAD_REQUEST);

        if (request.getEmailId() == null || request.getEmailId().trim().isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Email Id is mandatory", HttpStatus.BAD_REQUEST);

        if (request.getPassword() == null || request.getPassword().trim().isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Password is mandatory", HttpStatus.BAD_REQUEST);

        if (request.getFirstName() == null || request.getFirstName().trim().isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("First Name is mandatory", HttpStatus.BAD_REQUEST);
        if (request.getLastName() == null || request.getLastName().trim().isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Last Name is mandatory", HttpStatus.BAD_REQUEST);


        UserRole role = userRoleRepository.findByNameAndIsArchivedFalse("ADMIN");
        if (role == null || role.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("ADMIN role not found", HttpStatus.NOT_FOUND);

        List<OrganizationalUnit> organizationalUnits = organizationalUnitRepository.findByIsArchivedFalse();
        if (organizationalUnits == null || organizationalUnits.isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("No Organizational Units Exist", HttpStatus.NOT_FOUND);
        OrganizationalUnit organizationalUnit = organizationalUnits.get(0);

        List<SphericUser> userList = sphericUserRepository.findByEmailAndIsActivatedTrueAndIsArchivedFalse(request.getEmailId().toLowerCase().trim());
        if (userList != null && !userList.isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Duplicate SphericUser " + request.getEmailId(), HttpStatus.CONFLICT);

        SphericUser user = new SphericUser();

        user.setEmail(request.getEmailId().toLowerCase().trim());
        user.setFirstName(request.getFirstName().trim());
        user.setLastName(request.getLastName().trim());
        //user.setRole(role);
        user.setActivated(true);
        user.setCreatedDatetime(new Date());
        user.setExpiryDatetime(null);
        user.setLocation(request.getLocation());
        user.setMobileNumber(request.getMobileNo());
        user.setOrganizationalUnit(organizationalUnit);
        user.setPassword(springDataUserDetailsService.getEncodedPassword(request.getPassword().trim()));
        user.setArchived(false);
        user.setDescription("");
        user.setValidationToken(null);
        user.setRootUser(false);
        //user.setRoleWaitingForApproval(null);
        user.setActiveRoleChangeDatetime(new Date());
        //user.setRoleChangeApproved(true);

        user = sphericUserRepository.save(user);

        if (user == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("SphericUser Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        //create approved users map record .. and make it active.
        ApprovedUserRolesMap approvedUserRolesMap = new ApprovedUserRolesMap();
        approvedUserRolesMap.setActive(true);
        approvedUserRolesMap.setArchived(false);
        approvedUserRolesMap.setRole(role);
        approvedUserRolesMap.setSphericUser(user);

        //save map record
        approvedUserRolesMap = approvedUserRolesMapRepository.save(approvedUserRolesMap);

        if (approvedUserRolesMap == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Approved User Role Map Save to Database failed", HttpStatus.INTERNAL_SERVER_ERROR);

        permissionCheckerService.updateUserAndActiveRole(user, role);

        //sendTestEmail(user.getEmail(), "Activation Email", "Please click this link to activate your account <a href=\"www.google.com\">activate</a>");
        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(user);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/reset_password", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> resetPassword(@RequestBody ResetPasswordRequest request) {

        //only logged in user can reset password

        SphericUser user = permissionCheckerService.getLoggedInSphericUser();

        if (request.getOldPassword() == null || request.getOldPassword().trim().isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("OldPassword is mandatory", HttpStatus.BAD_REQUEST);

        if (request.getNewPassword() == null || request.getNewPassword().trim().isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("NewPassword is mandatory", HttpStatus.BAD_REQUEST);


        if (user != null || !user.isArchived() || user.isActivated()) {

            if (!springDataUserDetailsService.isValidPassword(request.getOldPassword().trim(), user.getPassword())) {
                return genericItemPOJOBuilder.buildGIErrorResponse("Old Passwords don't match", HttpStatus.BAD_REQUEST);
            }
            user.setPassword(springDataUserDetailsService.getEncodedPassword(request.getNewPassword().trim()));

            user = sphericUserRepository.save(user);
            if (user == null)
                return genericItemPOJOBuilder.buildGIErrorResponse("SphericUser Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(user);
            return new ResponseEntity(response, HttpStatus.OK);
        } else {
            return genericItemPOJOBuilder.buildGIErrorResponse("Logged In User not recognized. Please Login", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/create_user", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createUser(@RequestBody CreateUserRequest request) {

        if (permissionCheckerService.isLoggedIn() && !permissionCheckerService.hasCreatePermission(ObjectTypeConstants.USER))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getEmailId() == null || request.getEmailId().trim().isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Email Id is mandatory", HttpStatus.BAD_REQUEST);

        if (request.getPassword() == null || request.getPassword().trim().isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Password is mandatory", HttpStatus.BAD_REQUEST);

        if (request.getFirstName() == null || request.getFirstName().trim().isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("First Name is mandatory", HttpStatus.BAD_REQUEST);
        if (request.getLastName() == null || request.getLastName().trim().isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Last Name is mandatory", HttpStatus.BAD_REQUEST);

        if (request.getRoleId() == null || request.getRoleId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Role Id is mandatory, cannot be zero", HttpStatus.BAD_REQUEST);
        if (request.getOrganizationalUnitId() == null || request.getOrganizationalUnitId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("OrganizationalUnit Id is mandatory, cannot be zero", HttpStatus.BAD_REQUEST);

        UserRole role = userRoleRepository.findOne(request.getRoleId());
        if (role == null || role.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Role with id " + request.getRoleId() + " not found", HttpStatus.NOT_FOUND);

        OrganizationalUnit organizationalUnit = organizationalUnitRepository.findOne(request.getOrganizationalUnitId());
        if (organizationalUnit == null || organizationalUnit.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with id " + request.getOrganizationalUnitId() + " not found", HttpStatus.NOT_FOUND);

        List<SphericUser> userList = sphericUserRepository.findByEmailAndIsActivatedTrueAndIsArchivedFalse(request.getEmailId().toLowerCase().trim());
        if (userList != null && !userList.isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Duplicate SphericUser " + request.getEmailId(), HttpStatus.CONFLICT);

        SphericUser user = new SphericUser();

        user.setEmail(request.getEmailId().toLowerCase().trim());
        user.setFirstName(request.getFirstName().trim());
        user.setLastName(request.getLastName().trim());
        //user.setRole(role);
        user.setActivated(true);
        user.setCreatedDatetime(new Date());
        user.setExpiryDatetime(null);
        user.setLocation(request.getLocation());
        user.setMobileNumber(request.getMobileNo());
        user.setOrganizationalUnit(organizationalUnit);
        user.setPassword(springDataUserDetailsService.getEncodedPassword(request.getPassword().trim()));
        user.setArchived(false);
        user.setDescription("");
        user.setValidationToken(null);
        user.setRootUser(false);
        //user.setRoleWaitingForApproval(null);
        user.setActiveRoleChangeDatetime(new Date());
        //user.setRoleChangeApproved(true);

        user = sphericUserRepository.save(user);

        if (user == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("SphericUser Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        //create approved users map record .. and make it active.
        ApprovedUserRolesMap approvedUserRolesMap = new ApprovedUserRolesMap();
        approvedUserRolesMap.setActive(true);
        approvedUserRolesMap.setArchived(false);
        approvedUserRolesMap.setRole(role);
        approvedUserRolesMap.setSphericUser(user);

        //save map record
        approvedUserRolesMap = approvedUserRolesMapRepository.save(approvedUserRolesMap);

        if (approvedUserRolesMap == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Approved User Role Map Save to Database failed", HttpStatus.INTERNAL_SERVER_ERROR);

        permissionCheckerService.updateUserAndActiveRole(user, role);

        //sendTestEmail(user.getEmail(), "Activation Email", "Please click this link to activate your account <a href=\"www.google.com\">activate</a>");
        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(user);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    public void sendTestEmail(String to, String subject, String message) {
        mailSenderService.send("chandrakanth@highpeaksw.com", "ninemuses123~one", to, subject, message);
    }

    @RequestMapping(value = "/edit_logged_in_user_profile", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editUser(@RequestBody EditLoggedInUserProfileRequest request) {
        SphericUser sphericUser = permissionCheckerService.getLoggedInSphericUser();

        if (sphericUser == null || sphericUser.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Logged in user not recognized. Please Login", HttpStatus.NOT_FOUND);

        if (sphericUser.getEmail().toLowerCase().equals("root"))
            return genericItemPOJOBuilder.buildGIErrorResponse("Root User Profile cannot be edited", HttpStatus.BAD_REQUEST);
        if (request.getOrganizationalUnitId() != null && !request.getOrganizationalUnitId().equals(0)) {
            OrganizationalUnit obj = organizationalUnitRepository.findOne(request.getOrganizationalUnitId());
            if (obj == null && obj.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with id " + request.getOrganizationalUnitId() + " not found", HttpStatus.NOT_FOUND);
            sphericUser.setOrganizationalUnit(obj);
        }

        sphericUser.setMobileNumber(request.getMobileNo());
        sphericUser.setLocation(request.getLocation());
        sphericUser.setLastName(request.getLastName());
        sphericUser.setFirstName(request.getFirstName());

        sphericUser = sphericUserRepository.save(sphericUser);

        if (sphericUser == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("User Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(sphericUser);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/edit_user", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editUser(@RequestBody EditUserRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.USER))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        SphericUser sphericUser = sphericUserRepository.findOne(request.getElementId());
        if (sphericUser == null || sphericUser.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("User with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        if (request.getOrganizationalUnitId() != null && !request.getOrganizationalUnitId().equals(0)) {
            OrganizationalUnit obj = organizationalUnitRepository.findOne(request.getOrganizationalUnitId());
            if (obj == null && obj.isArchived())
                return genericItemPOJOBuilder.buildGIErrorResponse("Organizational Unit with id " + request.getOrganizationalUnitId() + " not found", HttpStatus.NOT_FOUND);
            sphericUser.setOrganizationalUnit(obj);
        }

        sphericUser.setMobileNumber(request.getMobileNo());
        sphericUser.setLocation(request.getLocation());
        sphericUser.setLastName(request.getLastName());
        sphericUser.setFirstName(request.getFirstName());

        sphericUser = sphericUserRepository.save(sphericUser);

        if (sphericUser == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("User Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(sphericUser);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_user_info/{userId}", method = RequestMethod.GET)
    public SphericUserInfo getUserInfo(@PathVariable("userId") Integer userId) {

        SphericUser sphericUser = sphericUserRepository.findOne(userId);
        if (sphericUser == null || sphericUser.isArchived() || !sphericUser.isActivated())
            throw new ExecException("User with id " + userId + " not found");
        SphericUserInfo response = new SphericUserInfo();
        response.setDescription(sphericUser.getDescription());
        response.setFirstName(sphericUser.getFirstName());
        response.setLastName(sphericUser.getLastName());
        response.setElementId(sphericUser.getId());
        response.setEmail(sphericUser.getEmail());

        OrganizationalUnit organizationalUnit = sphericUser.getOrganizationalUnit();
        if (organizationalUnit == null) {
            throw new ExecException("Organizational Unit is null for this user");
        } else {
            response.setOrganizationalUnitId(organizationalUnit.getId());
            response.setOrganizationalUnitName(organizationalUnit.getName());
        }

        response.setLocation(sphericUser.getLocation());
        response.setMobileNo(sphericUser.getMobileNumber());
        return response;
    }

    @RequestMapping(value = "/get_roles_dv/{showUsers}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getRolesDv(@PathVariable("showUsers") Boolean showUsers) {
        GenericItem response = new GenericItem();
        response.setElementId(0);
        response.setObjectType(ObjectTypeConstants.USER_ROLE_ROOT);

        if (showUsers == null)
            showUsers = false;

        List<GenericItem> children = new ArrayList<>();
        List<UserRole> userRoleList = userRoleRepository.findAll();
        for (UserRole userRole : userRoleList) {
            if (userRole != null && !userRole.isArchived()) {

                if (showUsers) {
                    ViewDescriptor viewDescriptor = new ViewDescriptor(GIView.SPHERIC_USER, GIMode.ALL_LINKED_ELEMENTS);
                    PerspectiveGroupInfo perspectiveGroupInfo = new PerspectiveGroupInfo();
                    perspectiveGroupInfo.setRated(false);
                    perspectiveGroupInfo.setGroupFoundAndIncludeAllChildren(true);
                    children.add(genericItemUserRoleService.buildGenericItemForUserRole(userRole, viewDescriptor, perspectiveGroupInfo));
                } else
                    children.add(genericItemPOJOBuilder.buildGenericPOJO(userRole));
            }
        }

        response.setChildren(children);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/create_user_role", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createUserRole(@RequestBody CreateUserRoleRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.USER_ROLE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getName() == null || request.getName().trim().isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Name is mandatory", HttpStatus.BAD_REQUEST);


        UserRole role = new UserRole();

        role.setName(request.getName());
        role.setApprovalRequired(request.isApprovalRequired());
        role.setCanApprove(request.isCanApprove());
        role.setArchived(false);
        role.setCreatedDatetime(new Date());
        role.setDescription(request.getDescription());
        role.setDesktopsOfInterestModificationDatetime(new Date());
        role.setDirectExpressionOrBoth(request.getModeDirectExpressionOrBoth());
        role.setPermissionsModificationDatetime(new Date());

        if (duplicateCheckingService.isDuplicateRole(role))
            return genericItemPOJOBuilder.buildGIErrorResponse("Duplicate Role" + request.getName(), HttpStatus.CONFLICT);

        role = userRoleRepository.save(role);

        if (role == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("UserRole Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        permissionCheckerService.updateRolePermissions(role);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(role);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_user_role_info/{userRoleId}", method = RequestMethod.GET)
    public UserRoleInfo getUsreRoleInfo(@PathVariable("userRoleId") Integer userRoleId) {

        UserRole userRole = userRoleRepository.findOne(userRoleId);
        if (userRole == null || userRole.isArchived())
            throw new ExecException("UserRole with id " + userRoleId + " not found");
        UserRoleInfo response = new UserRoleInfo();
        response.setDescription(userRole.getDescription());
        response.setName(userRole.getName());
        response.setElementId(userRole.getId());
        response.setModeDirectExpressionOrBoth(userRole.getDirectExpressionOrBoth());
        response.setCanApprove(userRole.isCanApprove());
        response.setApprovalRequired(userRole.isApprovalRequired());

        return response;
    }

    @RequestMapping(value = "/edit_user_role", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editUserRole(@RequestBody EditUserRoleRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.USER_ROLE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        UserRole userRole = userRoleRepository.findOne(request.getElementId());
        if (userRole == null || userRole.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("UserRole with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        userRole.setName(request.getName());
        userRole.setDescription(request.getDescription());
        userRole.setDirectExpressionOrBoth(request.getModeDirectExpressionOrBoth());
        userRole.setApprovalRequired(request.isApprovalRequired());
        userRole.setCanApprove(request.isCanApprove());

        //todo validation and properly update permissions modification times
        userRole = userRoleRepository.save(userRole);

        if (userRole == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("UserRole Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(userRole);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_core_hotlink_permissios/{userRoleId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getCoreHotlinkPermissions(@PathVariable("userRoleId") Integer userRoleId) {

        if (userRoleId == null || userRoleId.equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Role Id is mandatory, cannot be zero", HttpStatus.BAD_REQUEST);

        UserRole role = userRoleRepository.findOne(userRoleId);
        if (role == null || role.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Role with id " + userRoleId + " not found", HttpStatus.NOT_FOUND);

        SphericPermissionsInMemory sphericPermissionsInMemory = permissionCheckerService.getSphericPermissionsInMemory(role);

        //CorePermissionsInMemory corePermissionsInMemory = sphericPermissionsInMemory.getCorePermissionsInMemory();

        GenericItem response = new GenericItem();
        response.setName("success");
        response.setDebugInfo(sphericPermissionsInMemory);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/save_core_hotlink_permissions", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> saveCoreHotlinkPermissions(@RequestBody SaveCoreHotlinkPermissionsRequest request) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_ROLE_PERMISSIONS))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getUserRoleId() == null || request.getUserRoleId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Role Id is mandatory, cannot be zero", HttpStatus.BAD_REQUEST);

        UserRole role = userRoleRepository.findOne(request.getUserRoleId());
        if (role == null || role.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Role with id " + request.getUserRoleId() + " not found", HttpStatus.NOT_FOUND);

        Map<String, CoreObjectTypePermissionsMap> objectTypeToCorePermissionRecordMap = permissionCheckerService.getObjectTypeToCorePermissionsRecordMap(role);

        if (request.getCorePermissionsInMemory() != null && request.getCorePermissionsInMemory().getObjectTypeToCoreHotlinksMap() != null) {
            for (Map.Entry<String, CoreHotlinksPOJO> entry : request.getCorePermissionsInMemory().getObjectTypeToCoreHotlinksMap().entrySet()) {
                String objectType = entry.getKey();
                CoreHotlinksPOJO coreHotlinksPOJO = entry.getValue();
                CoreObjectTypePermissionsMap coreObjectTypePermissionsMap = objectTypeToCorePermissionRecordMap.get(objectType);
                if (coreObjectTypePermissionsMap == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Unknown object type " + objectType, HttpStatus.BAD_REQUEST);

                coreObjectTypePermissionsMap.setCanEdit(coreHotlinksPOJO.isCanEdit());
                coreObjectTypePermissionsMap.setCanDelete(coreHotlinksPOJO.isCanDelete());
                coreObjectTypePermissionsMap.setCanCreate(coreHotlinksPOJO.isCanCreate());
                coreObjectTypePermissionsMap.setCanDataview(coreHotlinksPOJO.isCanDataview());

                coreObjectTypePermissionsMap = coreObjectTypePermissionsMapRepository.save(coreObjectTypePermissionsMap);

                if (coreObjectTypePermissionsMap == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("CoreObjectTypePermissionsMap Save to database failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        //save misc permissions map
        Map<String, MiscellaneousActionPermissionsMap> actionNameToMiscellaneousActionPermissionsRecordMap = permissionCheckerService.getActionNameToMiscellaneousActionPermissionRecordMap(role);
        if (request.getMiscellaneousPermissionsInMemory() != null && request.getMiscellaneousPermissionsInMemory().getMiscellaneousActionStateMap() != null) {
            for (Map.Entry<String, MiscellaneousPermissionObjectPOJO> entry : request.getMiscellaneousPermissionsInMemory().getMiscellaneousActionStateMap().entrySet()) {
                String actionName = entry.getKey();
                MiscellaneousPermissionObjectPOJO isPermittedState = entry.getValue();
                if (isPermittedState == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Miscellaneous Action State of action name " + actionName + " is null", HttpStatus.BAD_REQUEST);

                MiscellaneousActionPermissionsMap miscellaneousActionPermissionsMap = actionNameToMiscellaneousActionPermissionsRecordMap.get(actionName);
                if (miscellaneousActionPermissionsMap == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("Unknown miscellaneous action name " + actionName, HttpStatus.BAD_REQUEST);

                miscellaneousActionPermissionsMap.setPermitted(isPermittedState.isHavePermission());

                miscellaneousActionPermissionsMap = miscellaneousActionPermissionsMapRepository.save(miscellaneousActionPermissionsMap);

                if (miscellaneousActionPermissionsMap == null)
                    return genericItemPOJOBuilder.buildGIErrorResponse("MiscellaneousActionPermissionsMap Save to database failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        permissionCheckerService.updateRolePermissions(role);

        GenericItem response = new GenericItem();
        response.setName("success");
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/get_logged_in_user_details", method = RequestMethod.GET)
    public ResponseEntity<LoggedInUserInfo> getLoggedInUserDetails() {

        LoggedInUserInfo loggedInUserInfo = new LoggedInUserInfo();

        SphericUser sphericUser = permissionCheckerService.getLoggedInSphericUser();

        if (sphericUser == null) {
            loggedInUserInfo.setSphericUserInfo(null);
            loggedInUserInfo.setUserRoles(null);
            return new ResponseEntity<>(loggedInUserInfo, HttpStatus.NETWORK_AUTHENTICATION_REQUIRED);
        }
        SphericUserInfo userInfo = new SphericUserInfo();
        userInfo.setFirstName(sphericUser.getFirstName());
        userInfo.setDescription(sphericUser.getDescription());
        userInfo.setElementId(sphericUser.getId());
        userInfo.setLastName(sphericUser.getLastName());
        userInfo.setLocation(sphericUser.getLocation());
        userInfo.setMobileNo(sphericUser.getMobileNumber());
        userInfo.setEmail(sphericUser.getEmail());
        if (sphericUser.getOrganizationalUnit() != null) {
            userInfo.setOrganizationalUnitId(sphericUser.getOrganizationalUnit().getId());
            userInfo.setOrganizationalUnitName(sphericUser.getOrganizationalUnit().getName());
        }

        loggedInUserInfo.setSphericUserInfo(userInfo);
        if (!sphericUser.isRootUser()) {
            List<UserRoleInfoWithActive> userRoleInfoWithActiveList = permissionCheckerService.getRoles(sphericUser);
            loggedInUserInfo.setUserRoles(userRoleInfoWithActiveList);

        } else {
            loggedInUserInfo.setUserRoles(new ArrayList<>());
        }

        return new ResponseEntity<>(loggedInUserInfo, HttpStatus.OK);
    }

    @RequestMapping(value = "/convert_excel_to_proper_format", method = RequestMethod.GET)
    public void convertExcel() throws IOException {
        List<TempClass> result = new ArrayList<>();

        File file = new File("/home/chandrakanthn/under_process.txt");
        CSVReader reader = new CSVReader(new FileReader(file), '\t');

        String prevId = null;
        int count = 0;
        List<String[]> records = reader.readAll();
        for (int i = 0; i < records.size(); i++) {
            String[] record = records.get(i);
            if (record.length <= 2)
                continue;

            if (record[1].trim().equals("")) {
                printRecord(record);
                throw new ExecException("Name can never be null, name is null " + i + 1);
            }

            String id = record[0].trim();
            String name = record[1].trim();
            String description = "";
            if (record.length >= 3)
                description = record[2].trim();
            else
                description = "";

            if (id.equals("")) {
                if (prevId == null)
                    throw new ExecException("prev Id is null");
                count++;
                id = prevId + "." + count;
                result.add(createTempClass(id, name, ""));
                result.addAll(getNestedRecords(id, name, description));
            } else {
                result.add(createTempClass(id, name, description));
                prevId = id;
                count = 0;
            }
        }
        for (TempClass obj : result) {
            printTempClass(obj);
        }
    }

    private void printRecord(String[] record) {
        for (String col : record) {
            System.out.println(col);
        }
    }

    private void printTempClass(TempClass obj) {
        String description = obj.getDescription();
        if (description.equals(""))
            description = " ";
        /*if(description.length() > 30)
        {
            description = description.substring(0,31);
        }*/
        System.out.println(obj.getId() + "\t" + obj.getName() + "\t" + description);
    }

    private List<TempClass> getNestedRecords(String id, String name, String description) {
        String[] lines = description.split("\n+");
        List<TempClass> nestedObjects = new ArrayList<>();

        int count = 0;
        for (String line : lines) {
            line = line.trim();
            if (!line.equals("")) {
                count++;
                nestedObjects.add(createTempClass(id + "." + count, name + " " + count, line));
            }
        }
        return nestedObjects;
    }

    private TempClass createTempClass(String id, String name, String description) {
        TempClass obj = new TempClass();
        obj.setDescription(description);
        obj.setId(id);
        obj.setName(name);
        return obj;
    }

    @RequestMapping(value = "/test_pci", method = RequestMethod.GET)
    public void testPCI() throws IOException, InvalidFormatException {
        ingestShieldFromExcelService.populatePCI();
    }

    class TempClass {
        String id;
        String name;
        String description;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }
}
