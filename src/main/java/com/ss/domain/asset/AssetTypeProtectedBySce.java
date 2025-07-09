package com.ss.domain.asset;

import com.ss.domain.perspective.attribute.AssetTypeProtectedBySceRTAttribute;
import com.ss.domain.sce.SecurityControlExpression;

import javax.persistence.*;
import java.util.List;

/**
 * Created by chandrakanth on 23/10/17.
 */

@Entity
@Table(name = "asset_type_protected_by_sce")
public class AssetTypeProtectedBySce {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "sce_fk", referencedColumnName = "id")
    private SecurityControlExpression sce;

    @ManyToOne
    @JoinColumn(name = "asset_type_fk", referencedColumnName = "id")
    private AssetType assetType;

    /**
     * shall
     * could
     */
    @Column(name = "shall_or_could_or_is")
    private String shallCouldIs;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Column(name = "is_default")
    private boolean isDefault;

    @OneToMany(mappedBy = "assetTypeProtectedBySce", targetEntity = AssetTypeProtectedBySceRTAttribute.class)
    private List<AssetTypeProtectedBySceRTAttribute> assetTypeProtectedBySceRTAttributeList;

    public List<AssetTypeProtectedBySceRTAttribute> getAssetTypeProtectedBySceRTAttributeList() {
        return assetTypeProtectedBySceRTAttributeList;
    }

    public void setAssetTypeProtectedBySceRTAttributeList(List<AssetTypeProtectedBySceRTAttribute> assetTypeProtectedBySceRTAttributeList) {
        this.assetTypeProtectedBySceRTAttributeList = assetTypeProtectedBySceRTAttributeList;
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

    public AssetType getAssetType() {
        return assetType;
    }

    public void setAssetType(AssetType assetType) {
        this.assetType = assetType;
    }

    public String getShallCouldIs() {
        return shallCouldIs;
    }

    public void setShallCouldIs(String shallCouldIs) {
        this.shallCouldIs = shallCouldIs;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
