serviceFunctions = {
    getElementInfo: function (callback, data) {
        service.getElementInfo(data, function (res, err) {
            if (!res) {
                if (err && err.status === 409) {
                    alert(err.responseJSON.errorMessage);
                }
                else {
                    errorHandler(err);
                }
                $("#saveData").hide();
            } else {
                callback(res);
            }
        });
    },
    getDefaultShieldPrefs: function (callback) {
        service.getDefaultShieldPrefs(null, function (res, err) {
            if (!res) {
                if (err && err.status === 409) {
                    alert(err.responseJSON.errorMessage);
                }
                else {
                    errorHandler(err);
                }
                $("#saveData").hide();
            } else {
                callback(res);
            }
        });
    },
    saveDefaultShieldPrefs: function (shieldId, isDefault, callback) {
        service.saveDefaultShieldPrefs(shieldId, isDefault, function (res, err) {
            if (!res) {
                if (err && err.status === 409) {
                    alert(err.responseJSON.errorMessage);
                }
                else {
                    errorHandler(err);
                }
                $("#saveData").hide();
            } else {
                callback(res);
            }
        });
    },
    saveLinkToPrefs: function (data, callback) {
        service.saveLinkToPrefs(data, function (res, err) {
            if (!res) {
                if (err && err.status === 409) {
                    alert(err.responseJSON.errorMessage);
                }
                else {
                    errorHandler(err);
                }
                $("#saveData").hide();
            } else {
                callback(res);
            }
        });
    },
    getLinkToPrefs: function (data, callback) {
        service.getLinkToPrefs(data, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
            } else {
                callback(res);
            }
        });
    },
    getAllShieldAndStandardSchema: function (callback, data) {
        service.getSchemaInfoForAllShieldsAndStandards(null, function (res, err) {
            if (!res) {
                if (err && err.status === 409) {
                    alert(err.responseJSON.errorMessage);
                }
                else {
                    errorHandler(err);
                }
                $("#saveData").hide();
            } else {
                backing.shield_schema_obj = res;
                if (callback)
                    callback(data);
            }
        });
    },
    getShieldOfShieldType: function (callback) {
        function getShield() {
            service.getShieldOfShieldType(null, function (res, err) {
                if (!res) {
                    if (err) errorHandler(err);
                } else {
                    callback(res);
                }
            });
        }

        if (backing.shield_schema_obj === null) {
            serviceFunctions.getAllShieldAndStandardSchema(getShield);
        }
        else {
            getShield();
        }
    },
    getShieldOfBusinessType: function (callback) {
        service.getShieldOfBusinessType(null, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
            } else {
                callback(res);
            }
        });
    },
    getShieldOfStandardType: function (callback) {
        service.getShieldOfStandardType(null, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
            } else {
                callback(res);
            }
        });
    },
    getShieldOfThreatType: function (callback) {
        service.getShieldOfThreatType(null, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
            } else {
                callback(res);
            }
        });
    },
    getShieldsAndStandard: function (callback) {
        service.getShieldsAndStandard(null, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
                $("#saveData").hide();
            } else {
                callback(res);
            }
        });
    },
    getShieldsAndStandardsExcluding: function (data, callback) {
        service.getShieldsAndStandardsExcluding(data, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
                $("#saveData").hide();
            } else {
                callback(res);
            }
        });
    },
    getAllowedLevels: function (data, callback) {
        service.getAllowedLevels(data, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
            } else {
                callback(res);
            }
        });
    },
    getAssetTypeAllowedLevels: function (callback) {
        service.getAssetTypeAllowedLevels(null, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
            } else {
                callback(res);
            }
        });
    },
    getBusinessAssetTypeAllowedLevels: function (callback) {
        service.getBusinessAssetTypeAllowedLevels(null, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
            } else {
                callback(res);
            }
        });
    },
    getGroupsOfShieldGivenMaxLevel: function (data, callback) {
        service.getGroupsOfShieldGivenMaxLevel(data, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
            } else {
                callback(res);
            }
        });
    },
    getGroupsGivenMaxLevel: function (data, callback) {
        service.getGroupsGivenMaxLevel(data, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
            } else {
                callback(res);
            }
        });
    },
    getAllAssetGroups: function (callback) {
        service.getAllAssetGroups(null, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
            } else {
                callback(res);
            }
        });
    },
    getAllBusinessAssetGroups: function (callback) {
        service.getAllBusinessAssetGroups(null, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
            } else {
                callback(res);
            }
        });
    },
    getAssetTypeGroupsByMaxLevel: function (data, callback) {
        service.getAssetTypeGroupsByMaxLevel(data, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
            } else {
                callback(res);
            }
        });
    },
    getBusinessAssetTypeGroupsByMaxLevel: function (data, callback) {
        service.getBusinessAssetTypeGroupsByMaxLevel(data, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
            } else {
                callback(res);
            }
        });
    },
    getAllProviderGroups: function (callback) {
        service.getAllProviderGroups(null, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
            } else {
                callback(res);
            }
        });
    },
    getAllBusinessProviderGroups: function (callback) {
        service.getAllBusinessProviderGroups(null, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
            } else {
                callback(res);
            }
        });
    },
    getAllExpressionGroups: function (callback) {
        service.getAllExpressionGroups(null, function (res, err) {
            if (!res) {
                if (err) errorHandler(err);
            } else {
                callback(res);
            }
        });
    },
    getDropdownTwoOptionsForShieldStartingPoint: function (elementObjectType, callback) {
        service.getDropdownTwoOptionsForShieldStartingPoint({isDirectMode: backing.isDirectMode, elementObjectType: elementObjectType}, function (res, err) {
            if (res) {
                callback(res);
            } else if (err)
                errorHandler(err);
        });
    },
    getDropdownTwoOptionsForAssetStartingPoint: function (callback) {
        service.getDropdownTwoOptionsForAssetStartingPoint(backing.isDirectMode, function (res, err) {
            if (res) {
                callback(res);
            } else if (err)
                errorHandler(err);
        });
    },
    getDropdownTwoOptionsForBusinessAssetStartingPoint: function (callback) {
        service.getDropdownTwoOptionsForBusinessAssetStartingPoint(backing.isDirectMode, function (res, err) {
            if (res) {
                callback(res);
            } else if (err)
                errorHandler(err);
        });
    },
    getDropdownTwoOptionsForAssetTypeStartingPoint: function (callback) {
        service.getDropdownTwoOptionsForAssetTypeStartingPoint(backing.isDirectMode, function (res, err) {
            if (res) {
                callback(res);
            } else if (err)
                errorHandler(err);
        });
    },
    getDropdownTwoOptionsForBusinessAssetTypeStartingPoint: function (callback) {
        service.getDropdownTwoOptionsForBusinessAssetTypeStartingPoint(backing.isDirectMode, function (res, err) {
            if (res) {
                callback(res);
            } else if (err)
                errorHandler(err);
        });
    },
    getDropdownTwoOptionsForAnzExpressionStartingPoint: function (callback) {
        service.getDropdownTwoOptionsForAnzExpressionStartingPoint(backing.isDirectMode, function (res, err) {
            if (res) {
                callback(res);
            } else if (err)
                errorHandler(err);
        });
    }
};