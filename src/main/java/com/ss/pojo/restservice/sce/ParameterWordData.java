package com.ss.pojo.restservice.sce;

import java.util.List;

public class ParameterWordData {
    private Integer id;
    private String leafWord;
    private Integer leafWordLevel;
    private List<ParameterChainWordData> parameterChain;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLeafWord() {
        return leafWord;
    }

    public void setLeafWord(String leafWord) {
        this.leafWord = leafWord;
    }

    public Integer getLeafWordLevel() {
        return leafWordLevel;
    }

    public void setLeafWordLevel(Integer leafWordLevel) {
        this.leafWordLevel = leafWordLevel;
    }

    public List<ParameterChainWordData> getParameterChain() {
        return parameterChain;
    }

    public void setParameterChain(List<ParameterChainWordData> parameterChain) {
        this.parameterChain = parameterChain;
    }
}
