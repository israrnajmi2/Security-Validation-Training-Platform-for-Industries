package com.ss.domain.usermanagement;

import javax.persistence.*;

@Entity
@Table(name = "desktops")
public class SphericDesktop {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "key_name", nullable = false)
    private String keyName;

    @Column(name = "is_biview_side")
    private boolean isBiviewSide;

    @Column(name = "is_archived")
    private boolean isArchived;

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

    public String getKeyName() {
        return keyName;
    }

    public void setKeyName(String keyName) {
        this.keyName = keyName;
    }

    public boolean isBiviewSide() {
        return isBiviewSide;
    }

    public void setBiviewSide(boolean biviewSide) {
        isBiviewSide = biviewSide;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
