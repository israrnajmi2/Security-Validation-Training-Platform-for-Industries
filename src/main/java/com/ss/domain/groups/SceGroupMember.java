package com.ss.domain.groups;

import com.ss.domain.sce.SecurityControlExpression;

import javax.persistence.*;

@Entity
@Table(name = "sce_group_members")
public class SceGroupMember {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "sce_fk", referencedColumnName = "id")
    private SecurityControlExpression sce;

    @ManyToOne
    @JoinColumn(name = "sce_group_fk", referencedColumnName = "id")
    private SceGroup sceGroup;

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

    public SecurityControlExpression getSce() {
        return sce;
    }

    public void setSce(SecurityControlExpression sce) {
        this.sce = sce;
    }

    public SceGroup getSceGroup() {
        return sceGroup;
    }

    public void setSceGroup(SceGroup sceGroup) {
        this.sceGroup = sceGroup;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
