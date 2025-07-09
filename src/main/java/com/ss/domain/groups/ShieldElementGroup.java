package com.ss.domain.groups;

import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElementType;
import com.ss.domain.usermanagement.OrganizationalUnit;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "shield_element_group")
public class ShieldElementGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "level", nullable = false)
    private Integer level;

    @ManyToOne
    @JoinColumn(name = "shield_fk", referencedColumnName = "id")
    private Shield shield;

    @ManyToOne
    @JoinColumn(name = "shield_element_type_fk", referencedColumnName = "id")
    private ShieldElementType shieldElementType;

    @Column(name = "is_archived")
    private boolean isArchived;

    @ManyToOne
    @JoinColumn(name = "organizational_unit_fk", referencedColumnName = "id")
    private OrganizationalUnit organizationalUnit;

    @OneToMany(mappedBy = "shieldElementGroup", targetEntity = ShieldElementGroupMember.class)
    private List<ShieldElementGroupMember> shieldElementGroupMembers;

    public List<ShieldElementGroupMember> getShieldElementGroupMembers() {
        return shieldElementGroupMembers;
    }

    public void setShieldElementGroupMembers(List<ShieldElementGroupMember> shieldElementGroupMembers) {
        this.shieldElementGroupMembers = shieldElementGroupMembers;
    }

    public OrganizationalUnit getOrganizationalUnit() {
        return organizationalUnit;
    }

    public void setOrganizationalUnit(OrganizationalUnit organizationalUnit) {
        this.organizationalUnit = organizationalUnit;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Shield getShield() {
        return shield;
    }

    public void setShield(Shield shield) {
        this.shield = shield;
    }

    public ShieldElementType getShieldElementType() {
        return shieldElementType;
    }

    public void setShieldElementType(ShieldElementType shieldElementType) {
        this.shieldElementType = shieldElementType;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
