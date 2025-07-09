package com.ss.pojo.helper;

public class UserTypeAndActiveRoleDetails {

    private boolean isRootUser;
    private Integer roleId;

    public boolean isRootUser() {
        return isRootUser;
    }

    public void setRootUser(boolean rootUser) {
        isRootUser = rootUser;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
}
