package com.ss.domain.shieldclassification;

import javax.persistence.*;

/**
 * Created by chandrakanth on 6/4/18.
 */

@Entity
@Table(name = "shield_element_map_to_shield_element")
public class ShieldElementToShieldElementMap {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "shield_element_one_fk", referencedColumnName = "id")
    private ShieldElement shieldElementOne;

    @ManyToOne
    @JoinColumn(name = "shield_element_two_fk", referencedColumnName = "id")
    private ShieldElement shieldElementTwo;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Column(name = "is_default")
    private boolean isDefault;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ShieldElement getShieldElementOne() {
        return shieldElementOne;
    }

    public void setShieldElementOne(ShieldElement shieldElementOne) {
        this.shieldElementOne = shieldElementOne;
    }

    public ShieldElement getShieldElementTwo() {
        return shieldElementTwo;
    }

    public void setShieldElementTwo(ShieldElement shieldElementTwo) {
        this.shieldElementTwo = shieldElementTwo;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean aDefault) {
        isDefault = aDefault;
    }
}
