package com.ss.domain.usermanagement;

import javax.persistence.*;

/**
 * Created by chandrakanth on 26/04/18.
 */

@Entity
@Table(name = "desktops_of_interest")
public class DesktopsOfInterestMap {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_role_fk", referencedColumnName = "id")
    private UserRole role;

    @ManyToOne
    @JoinColumn(name = "desktops_fk", referencedColumnName = "id")
    private SphericDesktop sphericDesktop;

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

    public SphericDesktop getSphericDesktop() {
        return sphericDesktop;
    }

    public void setSphericDesktop(SphericDesktop sphericDesktop) {
        this.sphericDesktop = sphericDesktop;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
