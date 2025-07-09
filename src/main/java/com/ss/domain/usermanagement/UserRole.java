package com.ss.domain.usermanagement;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "user_roles")
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "mode_direct_expression_or_both", nullable = false)
    private String directExpressionOrBoth;

    @Column(name = "is_approval_required")
    private boolean isApprovalRequired;

    @Column(name = "can_approve")
    private boolean canApprove;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "recent_permissions_modification_datetime")
    private Date permissionsModificationDatetime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "recent_desktops_of_interest_modification_datetime")
    private Date desktopsOfInterestModificationDatetime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_datetime")
    private Date createdDatetime;

    @OneToMany(mappedBy = "role", targetEntity = CoreObjectTypePermissionsMap.class)
    private List<CoreObjectTypePermissionsMap> coreObjectTypePermissionsMapList;

    @OneToMany(mappedBy = "role", targetEntity = ApprovedUserRolesMap.class)
    private List<ApprovedUserRolesMap> approvedUserRolesMapList;

    @OneToMany(mappedBy = "role", targetEntity = ApprovalPendingUserRolesMap.class)
    private List<ApprovalPendingUserRolesMap> approvalPendingUserRolesMapList;

    @OneToMany(mappedBy = "role", targetEntity = MiscellaneousActionPermissionsMap.class)
    private List<MiscellaneousActionPermissionsMap> miscellaneousActionPermissionsMapList;

    @OneToMany(mappedBy = "role", targetEntity = DesktopsOfInterestMap.class)
    private List<DesktopsOfInterestMap> desktopsOfInterestMapList;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public String getDirectExpressionOrBoth() {
        return directExpressionOrBoth;
    }

    public void setDirectExpressionOrBoth(String directExpressionOrBoth) {
        this.directExpressionOrBoth = directExpressionOrBoth;
    }

    public boolean isApprovalRequired() {
        return isApprovalRequired;
    }

    public void setApprovalRequired(boolean approvalRequired) {
        isApprovalRequired = approvalRequired;
    }

    public boolean isCanApprove() {
        return canApprove;
    }

    public void setCanApprove(boolean canApprove) {
        this.canApprove = canApprove;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }

    public Date getPermissionsModificationDatetime() {
        return permissionsModificationDatetime;
    }

    public void setPermissionsModificationDatetime(Date permissionsModificationDatetime) {
        this.permissionsModificationDatetime = permissionsModificationDatetime;
    }

    public Date getDesktopsOfInterestModificationDatetime() {
        return desktopsOfInterestModificationDatetime;
    }

    public void setDesktopsOfInterestModificationDatetime(Date desktopsOfInterestModificationDatetime) {
        this.desktopsOfInterestModificationDatetime = desktopsOfInterestModificationDatetime;
    }

    public Date getCreatedDatetime() {
        return createdDatetime;
    }

    public void setCreatedDatetime(Date createdDatetime) {
        this.createdDatetime = createdDatetime;
    }

    public List<CoreObjectTypePermissionsMap> getCoreObjectTypePermissionsMapList() {
        return coreObjectTypePermissionsMapList;
    }

    public void setCoreObjectTypePermissionsMapList(List<CoreObjectTypePermissionsMap> coreObjectTypePermissionsMapList) {
        this.coreObjectTypePermissionsMapList = coreObjectTypePermissionsMapList;
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

    public List<MiscellaneousActionPermissionsMap> getMiscellaneousActionPermissionsMapList() {
        return miscellaneousActionPermissionsMapList;
    }

    public void setMiscellaneousActionPermissionsMapList(List<MiscellaneousActionPermissionsMap> miscellaneousActionPermissionsMapList) {
        this.miscellaneousActionPermissionsMapList = miscellaneousActionPermissionsMapList;
    }

    public List<DesktopsOfInterestMap> getDesktopsOfInterestMapList() {
        return desktopsOfInterestMapList;
    }

    public void setDesktopsOfInterestMapList(List<DesktopsOfInterestMap> desktopsOfInterestMapList) {
        this.desktopsOfInterestMapList = desktopsOfInterestMapList;
    }
}