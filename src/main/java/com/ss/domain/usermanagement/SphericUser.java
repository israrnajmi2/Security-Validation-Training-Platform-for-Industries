package com.ss.domain.usermanagement;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
public class SphericUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "description")
    private String description;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "location")
    private String location;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "validation_token")
    private String validationToken;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "recent_active_role_change_datetime")
    private Date activeRoleChangeDatetime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "expiry_datetime")
    private Date expiryDatetime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_datetime")
    private Date createdDatetime;

    @Column(name = "is_activated")
    private boolean isActivated;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Column(name = "is_root_user")
    private boolean isRootUser;

    @ManyToOne
    @JoinColumn(name = "organizational_unit_fk", referencedColumnName = "id")
    private OrganizationalUnit organizationalUnit;

    @OneToMany(mappedBy = "sphericUser", targetEntity = ApprovedUserRolesMap.class)
    private List<ApprovedUserRolesMap> approvedUserRolesMapList;

    @OneToMany(mappedBy = "sphericUser", targetEntity = ApprovalPendingUserRolesMap.class)
    private List<ApprovalPendingUserRolesMap> approvalPendingUserRolesMapList;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public OrganizationalUnit getOrganizationalUnit() {
        return organizationalUnit;
    }

    public void setOrganizationalUnit(OrganizationalUnit organizationalUnit) {
        this.organizationalUnit = organizationalUnit;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getValidationToken() {
        return validationToken;
    }

    public void setValidationToken(String validationToken) {
        this.validationToken = validationToken;
    }

    public Date getActiveRoleChangeDatetime() {
        return activeRoleChangeDatetime;
    }

    public void setActiveRoleChangeDatetime(Date activeRoleChangeDatetime) {
        this.activeRoleChangeDatetime = activeRoleChangeDatetime;
    }

    public Date getExpiryDatetime() {
        return expiryDatetime;
    }

    public void setExpiryDatetime(Date expiryDatetime) {
        this.expiryDatetime = expiryDatetime;
    }

    public Date getCreatedDatetime() {
        return createdDatetime;
    }

    public void setCreatedDatetime(Date createdDatetime) {
        this.createdDatetime = createdDatetime;
    }

    public boolean isActivated() {
        return isActivated;
    }

    public void setActivated(boolean activated) {
        isActivated = activated;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }

    public boolean isRootUser() {
        return isRootUser;
    }

    public void setRootUser(boolean rootUser) {
        isRootUser = rootUser;
    }

    public List<ApprovedUserRolesMap> getApprovedUserRolesMapList() {
        return approvedUserRolesMapList;
    }

    public void setApprovedUserRolesMapList(List<ApprovedUserRolesMap> approvedUserRolesMapList) {
        this.approvedUserRolesMapList = approvedUserRolesMapList;
    }

    public List<ApprovalPendingUserRolesMap> getApprovalPendingUserRolesMapList() {
        return approvalPendingUserRolesMapList;
    }

    public void setApprovalPendingUserRolesMapList(List<ApprovalPendingUserRolesMap> approvalPendingUserRolesMapList) {
        this.approvalPendingUserRolesMapList = approvalPendingUserRolesMapList;
    }
}
