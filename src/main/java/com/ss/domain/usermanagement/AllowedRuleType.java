package com.ss.domain.usermanagement;

import javax.persistence.*;

/**
 * Created by chandrakanth on 26/04/18.
 */

@Entity
@Table(name = "allowed_rule_types")
public class AllowedRuleType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "object_types_fk", referencedColumnName = "id")
    private ObjectTypeTable objectTypeTable;

    @ManyToOne
    @JoinColumn(name = "rule_type_fk", referencedColumnName = "id")
    private ViewRuleType viewRuleType;


    @Column(name = "is_archived")
    private boolean isArchived;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ObjectTypeTable getObjectTypeTable() {
        return objectTypeTable;
    }

    public void setObjectTypeTable(ObjectTypeTable objectTypeTable) {
        this.objectTypeTable = objectTypeTable;
    }

    public ViewRuleType getViewRuleType() {
        return viewRuleType;
    }

    public void setViewRuleType(ViewRuleType viewRuleType) {
        this.viewRuleType = viewRuleType;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
