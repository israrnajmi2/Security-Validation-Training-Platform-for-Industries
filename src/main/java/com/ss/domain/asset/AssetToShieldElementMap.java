package com.ss.domain.asset;

import com.ss.domain.perspective.attribute.AssetImplementsElementRTAttribute;
import com.ss.domain.shieldclassification.ShieldElement;

import javax.persistence.*;
import java.util.List;

/**
 * Created by chandrakanth on 6/4/18.
 */

@Entity
@Table(name = "asset_shield_element_map")
public class AssetToShieldElementMap {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "asset_fk", referencedColumnName = "id")
    private Asset asset;

    @ManyToOne
    @JoinColumn(name = "shield_element_fk", referencedColumnName = "id")
    private ShieldElement shieldElement;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Column(name = "is_default")
    private boolean isDefault;

    @OneToMany(mappedBy = "assetToShieldElementMap", targetEntity = AssetImplementsElementRTAttribute.class)
    private List<AssetImplementsElementRTAttribute> assetImplementsElementRTAttributes;

    public List<AssetImplementsElementRTAttribute> getAssetImplementsElementRTAttributes() {
        return assetImplementsElementRTAttributes;
    }

    public void setAssetImplementsElementRTAttributes(List<AssetImplementsElementRTAttribute> assetImplementsElementRTAttributes) {
        this.assetImplementsElementRTAttributes = assetImplementsElementRTAttributes;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
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

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean aDefault) {
        isDefault = aDefault;
    }
}
