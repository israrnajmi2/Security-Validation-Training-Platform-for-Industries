package com.ss.domain.shieldclassification;

import javax.persistence.*;

/**
 * Created by chandrakanth on 17/05/18.
 */

@Entity
@Table(name = "guidances")
public class Guidance {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "shield_element_fk", referencedColumnName = "id")
    private ShieldElement shieldElement;

    @ManyToOne
    @JoinColumn(name = "source_fk", referencedColumnName = "id")
    private IngestSource ingestSource;

    @Column(name = "is_archived")
    private boolean isArchived;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ShieldElement getShieldElement() {
        return shieldElement;
    }

    public void setShieldElement(ShieldElement shieldElement) {
        this.shieldElement = shieldElement;
    }

    public IngestSource getIngestSource() {
        return ingestSource;
    }

    public void setIngestSource(IngestSource ingestSource) {
        this.ingestSource = ingestSource;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
