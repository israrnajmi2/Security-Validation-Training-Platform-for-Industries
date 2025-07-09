package com.ss.domain.shieldclassification;

import javax.persistence.*;
import java.util.List;

/**
 * Created by chandrakanth on 17/05/18.
 */

@Entity
@Table(name = "source")
public class IngestSource {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "organization")
    private String organization;

    @Column(name = "is_archived")
    private boolean isArchived;

    @OneToMany(mappedBy = "ingestSource", targetEntity = Guidance.class)
    private List<Guidance> guidanceList;

    @OneToMany(mappedBy = "ingestSource", targetEntity = TestProcedure.class)
    private List<TestProcedure> testProcedureList;

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

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }

    public List<Guidance> getGuidanceList() {
        return guidanceList;
    }

    public void setGuidanceList(List<Guidance> guidanceList) {
        this.guidanceList = guidanceList;
    }

    public List<TestProcedure> getTestProcedureList() {
        return testProcedureList;
    }

    public void setTestProcedureList(List<TestProcedure> testProcedureList) {
        this.testProcedureList = testProcedureList;
    }
}
