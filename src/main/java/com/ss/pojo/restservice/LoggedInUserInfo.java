package com.ss.pojo.restservice;

import java.util.List;

public class LoggedInUserInfo {

    private SphericUserInfo sphericUserInfo;

    private List<UserRoleInfoWithActive> userRoles;

    public SphericUserInfo getSphericUserInfo() {
        return sphericUserInfo;
    }

    public void setSphericUserInfo(SphericUserInfo sphericUserInfo) {
        this.sphericUserInfo = sphericUserInfo;
    }

    public List<UserRoleInfoWithActive> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<UserRoleInfoWithActive> userRoles) {
        this.userRoles = userRoles;
    }
}
