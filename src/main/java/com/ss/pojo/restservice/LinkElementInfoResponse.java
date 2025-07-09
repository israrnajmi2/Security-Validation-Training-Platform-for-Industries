package com.ss.pojo.restservice;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class LinkElementInfoResponse {

    private Integer linkId;
    private String linkName;
    private String linkType;

    private GenericItem expression;
    private GenericItem directPeerOne;
    private GenericItem otherPeer;

    private String errorMessage;

    public GenericItem getDirectPeerOne() {
        return directPeerOne;
    }

    public void setDirectPeerOne(GenericItem directPeerOne) {
        this.directPeerOne = directPeerOne;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public Integer getLinkId() {
        return linkId;
    }

    public void setLinkId(Integer linkId) {
        this.linkId = linkId;
    }

    public String getLinkName() {
        return linkName;
    }

    public void setLinkName(String linkName) {
        this.linkName = linkName;
    }

    public String getLinkType() {
        return linkType;
    }

    public void setLinkType(String linkType) {
        this.linkType = linkType;
    }

    public GenericItem getExpression() {
        return expression;
    }

    public void setExpression(GenericItem expression) {
        this.expression = expression;
    }

    public GenericItem getOtherPeer() {
        return otherPeer;
    }

    public void setOtherPeer(GenericItem otherPeer) {
        this.otherPeer = otherPeer;
    }
}
