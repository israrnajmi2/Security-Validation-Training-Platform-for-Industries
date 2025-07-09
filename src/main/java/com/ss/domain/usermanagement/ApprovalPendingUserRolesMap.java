package com.ss.domain.usermanagement;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by chandrakanth on 26/04/18.
 */

@Entity
@Table(name = "approval_pending_users_roles_map")
public class ApprovalPendingUserRolesMap {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_role_waiting_for_approval_fk", referencedColumnName = "id")
    private UserRole role;

    @ManyToOne
    @JoinColumn(name = "users_fk", referencedColumnName = "id")
    private SphericUser sphericUser;

    @Column(name = "validation_token")
    private String validationToken;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "approval_request_datetime")
    private Date requestDatetime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "request_expiry_datetime")
    private Date expiryDatetime;

    @Column(name = "is_archived")
    private boolean isArchived;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public SphericUser getSphericUser() {
        return sphericUser;
    }

    public void setSphericUser(SphericUser sphericUser) {
        this.sphericUser = sphericUser;
    }

    public String getValidationToken() {
        return validationToken;
    }

    public void setValidationToken(String validationToken) {
        this.validationToken = validationToken;
    }

    public Date getRequestDatetime() {
        return requestDatetime;
    }

    public void setRequestDatetime(Date requestDatetime) {
        this.requestDatetime = requestDatetime;
    }

    public Date getExpiryDatetime() {
        return expiryDatetime;
    }

    public void setExpiryDatetime(Date expiryDatetime) {
        this.expiryDatetime = expiryDatetime;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
