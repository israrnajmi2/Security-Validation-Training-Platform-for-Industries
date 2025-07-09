package com.ss.domain.asset;

import com.ss.domain.perspective.attribute.AssetDeliversSceRTAttribute;
import com.ss.domain.sce.SecurityControlExpression;

import javax.persistence.*;
import java.util.List;

/**
 * Created by chandrakanth on 23/10/17.
 */

@Entity
@Table(name = "asset_delivers_sce")
public class AssetDeliversSce {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "sce_fk", referencedColumnName = "id")
    private SecurityControlExpression sce;

    @ManyToOne
    @JoinColumn(name = "asset_fk", referencedColumnName = "id")
    private Asset asset;

    @Column(name = "is_archived")
    private boolean isArchived;

    /**
     * shall
     * could
     */
    @Column(name = "is_shall_or_could")
    private String shallCould;

    @Column(name = "is_default")
    private boolean isDefault;

    @OneToMany(mappedBy = "assetDeliversSce", targetEntity = AssetDeliversSceRTAttribute.class)
    private List<AssetDeliversSceRTAttribute> assetDeliversSceRTAttributeList;

    public String getShallCould() {
        return shallCould;
    }

    public void setShallCould(String shallCould) {
        this.shallCould = shallCould;
    }

    public List<AssetDeliversSceRTAttribute> getAssetDeliversSceRTAttributeList() {
        return assetDeliversSceRTAttributeList;
    }

    public void setAssetDeliversSceRTAttributeList(List<AssetDeliversSceRTAttribute> assetDeliversSceRTAttributeList) {
        this.assetDeliversSceRTAttributeList = assetDeliversSceRTAttributeList;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean aDefault) {
        isDefault = aDefault;
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

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
