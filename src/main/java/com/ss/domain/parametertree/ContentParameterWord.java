package com.ss.domain.parametertree;

import com.ss.domain.sce.SecurityControlExpression;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by chandrakanth on 23/10/17.
 * In UI - we are calling this "Protected Content"
 */

@Entity
@Table(name = "content_parameter_tree")
public class ContentParameterWord {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "word", nullable = false)
    private String word;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "dos_parent_fk", referencedColumnName = "id")
    private ContentParameterWord parentContentParameterWord;

    @Column(name = "dos_level")
    private Integer level;

    @Column(name = "is_archived")
    private boolean isArchived;

    @Column(name = "is_default")
    private boolean isDefault;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_datetime")
    private Date modifiedDateTime;

    @OneToMany(mappedBy = "parentContentParameterWord", targetEntity = ContentParameterWord.class)
    private List<ContentParameterWord> childrenContentParameterWordList;

    @OneToMany(mappedBy = "contentParameterWord", targetEntity = SecurityControlExpression.class)
    private List<SecurityControlExpression> securityControlExpressionList;

    public Date getModifiedDateTime() {
        return modifiedDateTime;
    }

    public void setModifiedDateTime(Date modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean aDefault) {
        isDefault = aDefault;
    }

    public List<ContentParameterWord> getChildrenContentParameterWordList() {
        return childrenContentParameterWordList;
    }

    public void setChildrenContentParameterWordList(List<ContentParameterWord> childrenContentParameterWordList) {
        this.childrenContentParameterWordList = childrenContentParameterWordList;
    }

    public List<SecurityControlExpression> getSecurityControlExpressionList() {
        return securityControlExpressionList;
    }

    public void setSecurityControlExpressionList(List<SecurityControlExpression> securityControlExpressionList) {
        this.securityControlExpressionList = securityControlExpressionList;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ContentParameterWord getParentContentParameterWord() {
        return parentContentParameterWord;
    }

    public void setParentContentParameterWord(ContentParameterWord parentContentParameterWord) {
        this.parentContentParameterWord = parentContentParameterWord;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }
}
