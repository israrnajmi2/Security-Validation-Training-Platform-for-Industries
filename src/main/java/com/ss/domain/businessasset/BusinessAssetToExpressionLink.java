package com.ss.domain.businessasset;

import com.ss.domain.sce.SecurityControlExpression;

import javax.persistence.*;

/**
 * Created by chandrakanth on 7/8/18.
 */

@Entity
@Table(name = "business_asset_to_expression_link")
public class BusinessAssetToExpressionLink {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "sce_fk", referencedColumnName = "id")
    private SecurityControlExpression sce;

    @ManyToOne
    @JoinColumn(name = "business_asset_fk", referencedColumnName = "id")
    private BusinessAsset businessAsset;

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

    public String getShallCould() {
        return shallCould;
    }

    public void setShallCould(String shallCould) {
        this.shallCould = shallCould;
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

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }

    public BusinessAsset getBusinessAsset() {
        return businessAsset;
    }

    public void setBusinessAsset(BusinessAsset businessAsset) {
        this.businessAsset = businessAsset;
    }
}
