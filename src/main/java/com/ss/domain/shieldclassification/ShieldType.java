package com.ss.domain.shieldclassification;

import javax.persistence.*;
import java.util.List;

/**
 * Created by chandrakanth on 23/10/17.
 */

@Entity
@Table(name = "shield_type")
public class ShieldType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "is_archived")
    private boolean isArchived;

    @ManyToOne
    @JoinColumn(name = "default_shield_fk", referencedColumnName = "id")
    private Shield defaultShield;

    @OneToMany(mappedBy = "shieldType", targetEntity = Shield.class)
    private List<Shield> shieldList;

    public List<Shield> getShieldList() {
        return shieldList;
    }

    public void setShieldList(List<Shield> shieldList) {
        this.shieldList = shieldList;
    }

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

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }

    public Shield getDefaultShield() {
        return defaultShield;
    }

    public void setDefaultShield(Shield defaultShield) {
        this.defaultShield = defaultShield;
    }
}
