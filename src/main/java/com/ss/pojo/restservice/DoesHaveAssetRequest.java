package com.ss.pojo.restservice;

import java.util.List;

public class DoesHaveAssetRequest {

    private boolean isDirect;
    private List<String> exclamationSeparatedElementIdObjectTypeList;

    public boolean isDirect() {
        return isDirect;
    }

    public void setDirect(boolean direct) {
        isDirect = direct;
    }

    public List<String> getExclamationSeparatedElementIdObjectTypeList() {
        return exclamationSeparatedElementIdObjectTypeList;
    }

    public void setExclamationSeparatedElementIdObjectTypeList(List<String> exclamationSeparatedElementIdObjectTypeList) {
        this.exclamationSeparatedElementIdObjectTypeList = exclamationSeparatedElementIdObjectTypeList;
    }
}
