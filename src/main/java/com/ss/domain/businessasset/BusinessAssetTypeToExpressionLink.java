package com.ss.domain.businessasset;

import com.ss.domain.sce.SecurityControlExpression;

import javax.persistence.*;

/**
 * Created by chandrakanth on 23/10/17.
 */

@Entity
@Table(name = "business_asset_type_to_expression_link")
public class BusinessAssetTypeToExpressionLink {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "sce_fk", referencedColumnName = "id")
    private SecurityControlExpression sce;

    @ManyToOne
    @JoinColumn(name = "business_asset_type_fk", referencedColumnName = "id")
    private BusinessAssetType businessAssetType;

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

    public BusinessAssetType getBusinessAssetType() {
        return businessAssetType;
    }

    public void setBusinessAssetType(BusinessAssetType businessAssetType) {
        this.businessAssetType = businessAssetType;
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
