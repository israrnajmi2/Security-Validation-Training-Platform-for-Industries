package com.ss.pojo.restservice.sce;

public class SceData {
    private Integer id;
    private ParameterWordData objective;
    private ParameterWordData method;
    private ParameterWordData content;
    private ParameterWordData subject;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ParameterWordData getObjective() {
        return objective;
    }

    public void setObjective(ParameterWordData objective) {
        this.objective = objective;
    }

    public ParameterWordData getMethod() {
        return method;
    }

    public void setMethod(ParameterWordData method) {
        this.method = method;
    }

    public ParameterWordData getContent() {
        return content;
    }

    public void setContent(ParameterWordData content) {
        this.content = content;
    }

    public ParameterWordData getSubject() {
        return subject;
    }

    public void setSubject(ParameterWordData subject) {
        this.subject = subject;
    }
}

