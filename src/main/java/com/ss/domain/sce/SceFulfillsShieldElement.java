package com.ss.domain.sce;

import com.ss.domain.perspective.attribute.ShieldElementFulfilledBySceRTAttribute;
import com.ss.domain.shieldclassification.ShieldElement;

import javax.persistence.*;
import java.util.List;

/**
 * Created by chandrakanth on 23/10/17.
 */

@Entity
@Table(name = "sce_fulfills_shield_element")
public class SceFulfillsShieldElement {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "sce_fk", referencedColumnName = "id")
    private SecurityControlExpression sce;

    @ManyToOne
    @JoinColumn(name = "shield_element_fk", referencedColumnName = "id")
    private ShieldElement shieldElement;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Column(name = "is_default")
    private boolean isDefault;

    @OneToMany(mappedBy = "sceFulfillsShieldElement", targetEntity = ShieldElementFulfilledBySceRTAttribute.class)
    private List<ShieldElementFulfilledBySceRTAttribute> shieldElementFulfilledBySceRTAttributeList;

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean aDefault) {
        isDefault = aDefault;
    }

    public List<ShieldElementFulfilledBySceRTAttribute> getShieldElementFulfilledBySceRTAttributeList() {
        return shieldElementFulfilledBySceRTAttributeList;
    }

    public void setShieldElementFulfilledBySceRTAttributeList(List<ShieldElementFulfilledBySceRTAttribute> shieldElementFulfilledBySceRTAttributeList) {
        this.shieldElementFulfilledBySceRTAttributeList = shieldElementFulfilledBySceRTAttributeList;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public SecurityControlExpression getSce() {
        return sce;
    }

    public void setSce(SecurityControlExpression sce) {
        this.sce = sce;
    }

    public ShieldElement getShieldElement() {
        return shieldElement;
    }

    public void setShieldElement(ShieldElement shieldElement) {
        this.shieldElement = shieldElement;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
