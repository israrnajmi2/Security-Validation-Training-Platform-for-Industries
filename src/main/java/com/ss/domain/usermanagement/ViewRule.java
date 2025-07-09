package com.ss.domain.usermanagement;

import javax.persistence.*;

/**
 * Created by chandrakanth on 26/04/18.
 */

@Entity
@Table(name = "view_rules")
public class ViewRule {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "element_id")
    private Integer elementId;

    @ManyToOne
    @JoinColumn(name = "next_view_rule_fk", referencedColumnName = "id")
    private ViewRule nextViewRule;

    @ManyToOne
    @JoinColumn(name = "rule_type_fk", referencedColumnName = "id")
    private ViewRuleType viewRuleType;

    @Column(name = "include_parent_chain")
    private boolean includeParentChain;

    @Column(name = "include_children")
    private boolean includeChildren;

    @Column(name = "is_archived")
    private boolean isArchived;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getElementId() {
        return elementId;
    }

    public void setElementId(Integer elementId) {
        this.elementId = elementId;
    }

    public ViewRule getNextViewRule() {
        return nextViewRule;
    }

    public void setNextViewRule(ViewRule nextViewRule) {
        this.nextViewRule = nextViewRule;
    }

    public ViewRuleType getViewRuleType() {
        return viewRuleType;
    }

    public void setViewRuleType(ViewRuleType viewRuleType) {
        this.viewRuleType = viewRuleType;
    }

    public boolean isIncludeParentChain() {
        return includeParentChain;
    }

    public void setIncludeParentChain(boolean includeParentChain) {
        this.includeParentChain = includeParentChain;
    }

    public boolean isIncludeChildren() {
        return includeChildren;
    }

    public void setIncludeChildren(boolean includeChildren) {
        this.includeChildren = includeChildren;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
