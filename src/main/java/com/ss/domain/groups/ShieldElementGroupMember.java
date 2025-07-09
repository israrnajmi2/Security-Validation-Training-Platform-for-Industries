package com.ss.domain.groups;

import com.ss.domain.shieldclassification.ShieldElement;

import javax.persistence.*;

@Entity
@Table(name = "shield_element_group_members")
public class ShieldElementGroupMember {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "shield_element_fk", referencedColumnName = "id")
    private ShieldElement shieldElement;

    @ManyToOne
    @JoinColumn(name = "shield_element_group_fk", referencedColumnName = "id")
    private ShieldElementGroup shieldElementGroup;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Column(name = "is_activated")
    private boolean isActivated;

    public boolean isActivated() {
        return isActivated;
    }

    public void setActivated(boolean activated) {
        isActivated = activated;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ShieldElement getShieldElement() {
        return shieldElement;
    }

    public void setShieldElement(ShieldElement shieldElement) {
        this.shieldElement = shieldElement;
    }

    public ShieldElementGroup getShieldElementGroup() {
        return shieldElementGroup;
    }

    public void setShieldElementGroup(ShieldElementGroup shieldElementGroup) {
        this.shieldElementGroup = shieldElementGroup;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
