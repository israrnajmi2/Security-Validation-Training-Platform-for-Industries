package com.ss.domain.perspective;

import com.ss.domain.perspective.attribute.*;

import javax.persistence.*;
import java.util.List;

/**
 * Created by chandrakanth on 23/10/17.
 */

@Entity
@Table(name = "custom_perspective")
public class CustomPerspective {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "color")
    private String color;

    @Column(name = "is_archived")
    private boolean isArchived;

    @OneToMany(mappedBy = "customPerspective", targetEntity = AssetDeliversSceRTAttribute.class)
    private List<AssetDeliversSceRTAttribute> assetDeliversSceRTAttributeList;

    @OneToMany(mappedBy = "customPerspective", targetEntity = AssetImplementsElementRTAttribute.class)
    private List<AssetImplementsElementRTAttribute> assetImplementsElementRTAttributeList;

    @OneToMany(mappedBy = "customPerspective", targetEntity = AssetTypeProtectedBySceRTAttribute.class)
    private List<AssetTypeProtectedBySceRTAttribute> assetTypeProtectedBySceRTAttributeList;

    @OneToMany(mappedBy = "customPerspective", targetEntity = ShieldElementFulfilledBySceRTAttribute.class)
    private List<ShieldElementFulfilledBySceRTAttribute> shieldElementFulfilledBySceRTAttributeList;

    @OneToMany(mappedBy = "customPerspective", targetEntity = ShieldElementRTAttribute.class)
    private List<ShieldElementRTAttribute> shieldElementRTAttributeList;

    @OneToMany(mappedBy = "customPerspective", targetEntity = SceRTAttribute.class)
    private List<SceRTAttribute> sceRTAttributeList;

    @OneToMany(mappedBy = "customPerspective", targetEntity = SceRTLibraryAttribute.class)
    private List<SceRTLibraryAttribute> sceRTLibraryAttributeList;

    @OneToMany(mappedBy = "customPerspective", targetEntity = ShieldElementRTLibraryAttribute.class)
    private List<ShieldElementRTLibraryAttribute> shieldElementRTLibraryAttributeList;

    @OneToMany(mappedBy = "customPerspective", targetEntity = ShieldElementFulfilledBySceRTLibraryAttribute.class)
    private List<ShieldElementFulfilledBySceRTLibraryAttribute> shieldElementFulfilledBySceRTLibraryAttributeList;

    @OneToMany(mappedBy = "customPerspective", targetEntity = AssetTypeProtectedBySceRTLibraryAttribute.class)
    private List<AssetTypeProtectedBySceRTLibraryAttribute> assetTypeProtectedBySceRTLibraryAttributeList;

    @OneToMany(mappedBy = "customPerspective", targetEntity = AssetDeliversSceRTLibraryAttribute.class)
    private List<AssetDeliversSceRTLibraryAttribute> assetDeliversSceRTLibraryAttributeList;

    @OneToMany(mappedBy = "customPerspective", targetEntity = AssetImplementsElementRTLibraryAttribute.class)
    private List<AssetImplementsElementRTLibraryAttribute> assetImplementsElementRTLibraryAttributeList;

    public List<AssetImplementsElementRTAttribute> getAssetImplementsElementRTAttributeList() {
        return assetImplementsElementRTAttributeList;
    }

    public void setAssetImplementsElementRTAttributeList(List<AssetImplementsElementRTAttribute> assetImplementsElementRTAttributeList) {
        this.assetImplementsElementRTAttributeList = assetImplementsElementRTAttributeList;
    }

    public List<AssetImplementsElementRTLibraryAttribute> getAssetImplementsElementRTLibraryAttributeList() {
        return assetImplementsElementRTLibraryAttributeList;
    }

    public void setAssetImplementsElementRTLibraryAttributeList(List<AssetImplementsElementRTLibraryAttribute> assetImplementsElementRTLibraryAttributeList) {
        this.assetImplementsElementRTLibraryAttributeList = assetImplementsElementRTLibraryAttributeList;
    }

    public List<SceRTLibraryAttribute> getSceRTLibraryAttributeList() {
        return sceRTLibraryAttributeList;
    }

    public void setSceRTLibraryAttributeList(List<SceRTLibraryAttribute> sceRTLibraryAttributeList) {
        this.sceRTLibraryAttributeList = sceRTLibraryAttributeList;
    }

    public List<ShieldElementRTLibraryAttribute> getShieldElementRTLibraryAttributeList() {
        return shieldElementRTLibraryAttributeList;
    }

    public void setShieldElementRTLibraryAttributeList(List<ShieldElementRTLibraryAttribute> shieldElementRTLibraryAttributeList) {
        this.shieldElementRTLibraryAttributeList = shieldElementRTLibraryAttributeList;
    }

    public List<ShieldElementFulfilledBySceRTLibraryAttribute> getShieldElementFulfilledBySceRTLibraryAttributeList() {
        return shieldElementFulfilledBySceRTLibraryAttributeList;
    }

    public void setShieldElementFulfilledBySceRTLibraryAttributeList(List<ShieldElementFulfilledBySceRTLibraryAttribute> shieldElementFulfilledBySceRTLibraryAttributeList) {
        this.shieldElementFulfilledBySceRTLibraryAttributeList = shieldElementFulfilledBySceRTLibraryAttributeList;
    }

    public List<AssetTypeProtectedBySceRTLibraryAttribute> getAssetTypeProtectedBySceRTLibraryAttributeList() {
        return assetTypeProtectedBySceRTLibraryAttributeList;
    }

    public void setAssetTypeProtectedBySceRTLibraryAttributeList(List<AssetTypeProtectedBySceRTLibraryAttribute> assetTypeProtectedBySceRTLibraryAttributeList) {
        this.assetTypeProtectedBySceRTLibraryAttributeList = assetTypeProtectedBySceRTLibraryAttributeList;
    }

    public List<AssetDeliversSceRTLibraryAttribute> getAssetDeliversSceRTLibraryAttributeList() {
        return assetDeliversSceRTLibraryAttributeList;
    }

    public void setAssetDeliversSceRTLibraryAttributeList(List<AssetDeliversSceRTLibraryAttribute> assetDeliversSceRTLibraryAttributeList) {
        this.assetDeliversSceRTLibraryAttributeList = assetDeliversSceRTLibraryAttributeList;
    }

    public List<ShieldElementFulfilledBySceRTAttribute> getShieldElementFulfilledBySceRTAttributeList() {
        return shieldElementFulfilledBySceRTAttributeList;
    }

    public void setShieldElementFulfilledBySceRTAttributeList(List<ShieldElementFulfilledBySceRTAttribute> shieldElementFulfilledBySceRTAttributeList) {
        this.shieldElementFulfilledBySceRTAttributeList = shieldElementFulfilledBySceRTAttributeList;
    }

    public List<ShieldElementRTAttribute> getShieldElementRTAttributeList() {
        return shieldElementRTAttributeList;
    }

    public void setShieldElementRTAttributeList(List<ShieldElementRTAttribute> shieldElementRTAttributeList) {
        this.shieldElementRTAttributeList = shieldElementRTAttributeList;
    }

    public List<SceRTAttribute> getSceRTAttributeList() {
        return sceRTAttributeList;
    }

    public void setSceRTAttributeList(List<SceRTAttribute> sceRTAttributeList) {
        this.sceRTAttributeList = sceRTAttributeList;
    }

    public List<AssetDeliversSceRTAttribute> getAssetDeliversSceRTAttributeList() {
        return assetDeliversSceRTAttributeList;
    }

    public void setAssetDeliversSceRTAttributeList(List<AssetDeliversSceRTAttribute> assetDeliversSceRTAttributeList) {
        this.assetDeliversSceRTAttributeList = assetDeliversSceRTAttributeList;
    }

    public List<AssetTypeProtectedBySceRTAttribute> getAssetTypeProtectedBySceRTAttributeList() {
        return assetTypeProtectedBySceRTAttributeList;
    }

    public void setAssetTypeProtectedBySceRTAttributeList(List<AssetTypeProtectedBySceRTAttribute> assetTypeProtectedBySceRTAttributeList) {
        this.assetTypeProtectedBySceRTAttributeList = assetTypeProtectedBySceRTAttributeList;
    }

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

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
