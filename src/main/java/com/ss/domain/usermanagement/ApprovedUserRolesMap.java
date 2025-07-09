package com.ss.domain.usermanagement;

import javax.persistence.*;

/**
 * Created by chandrakanth on 26/04/18.
 */

@Entity
@Table(name = "approved_users_roles_map")
public class ApprovedUserRolesMap {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_role_fk", referencedColumnName = "id")
    private UserRole role;

    @ManyToOne
    @JoinColumn(name = "users_fk", referencedColumnName = "id")
    private SphericUser sphericUser;

    @Column(name = "is_active")
    private boolean isActive;

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

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
