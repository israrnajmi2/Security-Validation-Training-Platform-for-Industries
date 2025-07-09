package com.ss.pojo.restservice;

public class ProviderDvRequest {
    private Integer providerGroupId;
    private boolean showAsset;

    public Integer getProviderGroupId() {
        return providerGroupId;
    }

    public void setProviderGroupId(Integer providerGroupId) {
        this.providerGroupId = providerGroupId;
    }

    public boolean isShowAsset() {
        return showAsset;
    }

    public void setShowAsset(boolean showAsset) {
        this.showAsset = showAsset;
    }
}
