package com.ss.domain.usermanagement;

import javax.persistence.*;

/**
 * Created by chandrakanth on 25/04/18.
 */

@Entity
@Table(name = "miscellaneous_action_permissions")
public class MiscellaneousActionPermissionsMap {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_role_fk", referencedColumnName = "id")
    private UserRole role;

    @ManyToOne
    @JoinColumn(name = "miscellaneous_actions_fk", referencedColumnName = "id")
    private MiscellaneousAction miscellaneousAction;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Column(name = "is_permitted")
    private boolean isPermitted;

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

    public MiscellaneousAction getMiscellaneousAction() {
        return miscellaneousAction;
    }

    public void setMiscellaneousAction(MiscellaneousAction miscellaneousAction) {
        this.miscellaneousAction = miscellaneousAction;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }

    public boolean isPermitted() {
        return isPermitted;
    }

    public void setPermitted(boolean permitted) {
        isPermitted = permitted;
    }
}
