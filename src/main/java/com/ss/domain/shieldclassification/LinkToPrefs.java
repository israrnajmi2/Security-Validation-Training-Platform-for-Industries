package com.ss.domain.shieldclassification;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "link_to_prefs")
public class LinkToPrefs {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "shield_id_one")
    private Integer shieldIdOne;

    @Column(name = "object_type_one", nullable = false)
    private String objectTypeOne;

    @Column(name = "shield_id_two")
    private Integer shieldIdTwo;

    @Column(name = "object_type_two", nullable = false)
    private String objectTypeTwo;

    @Column(name = "is_direct_mode")
    private boolean isDirectMode;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_dt")
    private Date createDt;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getShieldIdOne() {
        return shieldIdOne;
    }

    public void setShieldIdOne(Integer shieldIdOne) {
        this.shieldIdOne = shieldIdOne;
    }

    public String getObjectTypeOne() {
        return objectTypeOne;
    }

    public void setObjectTypeOne(String objectTypeOne) {
        this.objectTypeOne = objectTypeOne;
    }

    public Integer getShieldIdTwo() {
        return shieldIdTwo;
    }

    public void setShieldIdTwo(Integer shieldIdTwo) {
        this.shieldIdTwo = shieldIdTwo;
    }

    public String getObjectTypeTwo() {
        return objectTypeTwo;
    }

    public void setObjectTypeTwo(String objectTypeTwo) {
        this.objectTypeTwo = objectTypeTwo;
    }

    public boolean isDirectMode() {
        return isDirectMode;
    }

    public void setDirectMode(boolean directMode) {
        isDirectMode = directMode;
    }

    public Date getCreateDt() {
        return createDt;
    }

    public void setCreateDt(Date createDt) {
        this.createDt = createDt;
    }
}
