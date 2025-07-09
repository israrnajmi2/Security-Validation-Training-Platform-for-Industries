package com.ss.domain.usermanagement;

import javax.persistence.*;

/**
 * Created by chandrakanth on 25/04/18.
 */

@Entity
@Table(name = "object_type_permissions")
public class CoreObjectTypePermissionsMap {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "role_fk", referencedColumnName = "id")
    private UserRole role;

    @ManyToOne
    @JoinColumn(name = "object_types_fk", referencedColumnName = "id")
    private ObjectTypeTable objectTypeTable;

    @ManyToOne
    @JoinColumn(name = "view_rules_fk", referencedColumnName = "id")
    private ViewRule viewRule;

    @Column(name = "can_create")
    private boolean canCreate;

    @Column(name = "can_edit")
    private boolean canEdit;

    @Column(name = "can_delete")
    private boolean canDelete;

    @Column(name = "can_dataview")
    private boolean canDataview;

    @Column(name = "is_view_none")
    private boolean isViewNone;

    @Column(name = "is_rule_based_if_false_view_all")
    private boolean isRuleBased;

    @Column(name = "is_archived")
    private boolean isArchived;

    public ViewRule getViewRule() {
        return viewRule;
    }

    public void setViewRule(ViewRule viewRule) {
        this.viewRule = viewRule;
    }

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

    public ObjectTypeTable getObjectTypeTable() {
        return objectTypeTable;
    }

    public void setObjectTypeTable(ObjectTypeTable objectTypeTable) {
        this.objectTypeTable = objectTypeTable;
    }

    public boolean isCanCreate() {
        return canCreate;
    }

    public void setCanCreate(boolean canCreate) {
        this.canCreate = canCreate;
    }

    public boolean isCanEdit() {
        return canEdit;
    }

    public void setCanEdit(boolean canEdit) {
        this.canEdit = canEdit;
    }

    public boolean isCanDelete() {
        return canDelete;
    }

    public void setCanDelete(boolean canDelete) {
        this.canDelete = canDelete;
    }

    public boolean isViewNone() {
        return isViewNone;
    }

    public void setViewNone(boolean viewNone) {
        isViewNone = viewNone;
    }

    public boolean isRuleBased() {
        return isRuleBased;
    }

    public void setRuleBased(boolean ruleBased) {
        isRuleBased = ruleBased;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }

    public boolean isCanDataview() {
        return canDataview;
    }

    public void setCanDataview(boolean canDataview) {
        this.canDataview = canDataview;
    }
}
