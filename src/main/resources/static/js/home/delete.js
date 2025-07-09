$(document).ready(function () {
    $(document).on("click", ".delete-element", function (e) {
        let uniqueId = $(this).attr("uniqueId");
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let data = {};
        let shouldDelete;
        if (element) {
            data.elementId = element[ATTR.elementId];
            data.objectType = element[ATTR.objectType];
            shouldDelete = confirm("Are you sure you want to delete?\n\nAll its dependent and children elements will be deleted if you proceed.");
        }
        else {
            shouldDelete = confirm("Are you sure you want to delete?");
            data.elementId = $(this).attr("elementId");
            data.objectType = $(this).attr("objectType");
        }
        if (shouldDelete) {
            $("#saveData").show();
            service.deleteElement(data, function (res, err) {
                if (res) {
                    alert("Deleted Successfully");
                    let event = getEventOfGivenObjectType(data.objectType);
                    propagateEvent(event);
                    delete backing.dictionary_of_unique_id_to_attr_object[uniqueId];
                    $("#saveData").hide();
                }
                else if (err) {
                    errorHandler(err);
                    $("#saveData").hide();
                }
            });
        }
        e.stopPropagation()
    });

    $(document).on("click", ".unmap-element", function (e) {
        let uniqueId = $(this).attr("uniqueId");
        let element = backing.dictionary_of_unique_id_to_attr_object[uniqueId];
        let data = {};
        let shouldDelete;
        if (element) {
            data.elementId = element[ATTR.linkId];
            data.objectType = element[ATTR.linkType];
            shouldDelete = confirm("Are you sure you want to remove association?");
        }
        else {
            return;
        }
        if (shouldDelete) {
            $("#saveData").show();
            service.deleteElement(data, function (res, err) {
                if (res) {
                    alert("Associations Removed");
                    let event = {"key": backing.event_type.modified_shield_element_association.key};
                    propagateEvent(event);
                    $("#saveData").hide();
                }
                else if (err) {
                    errorHandler(err);
                    $("#saveData").hide();
                }
            });
        }
        e.stopPropagation()
    });
});

function getEventOfGivenObjectType(objectType) {
    switch (objectType) {
        case constants.objectType.ASSET_DELIVERS_ATTRIBUTE: {
            return {"key": "deleted_asset_delivers_attribute"};
        }
        case constants.objectType.ASSET: {
            return {"key": "deleted_asset_element"};
        }
        case constants.objectType.ASSET_TYPE: {
            return {"key": "deleted_asset_type_element"};
        }
        case constants.objectType.PROVIDER: {
            return {"key": "deleted_provider_element"};
        }
        case constants.objectType.ORGANIZATIONAL_UNIT: {
            return {"key": "deleted_organizationalUnit_element"};
        }
        case constants.objectType.OBJECTIVE_PARAMETER: {
            return {"key": "deleted_objectiveParameter_element"};
        }
        case constants.objectType.METHOD_PARAMETER: {
            return {"key": "deleted_methodParameter_element"};
        }
        case constants.objectType.CONTENT_PARAMETER: {
            return {"key": "deleted_contentParameter_element"};
        }
        case constants.objectType.SUBJECT_PARAMETER: {
            return {"key": "deleted_subjectParameter_element"};
        }
        case constants.objectType.SHIELD:
        case constants.objectType.STANDARD:
        case constants.objectType.THREAT:
        case constants.objectType.BUSINESS: {
            return {"key": "deleted_shield"};
        }
        case constants.objectType.SHIELD_ELEMENT: {
            return {"key": "deleted_shield_element"};
        }
        case constants.objectType.SHIELD_ELEMENT_TYPE:
        case constants.objectType.STANDARD_ELEMENT_TYPE:
        case constants.objectType.THREAT_ELEMENT_TYPE:
        case constants.objectType.BUSINESS_CONTROL_TYPE: {
            return {"key": "deleted_shield_element_type"};
        }
        case constants.objectType.BUSINESS_CONTROL: {
            return {"key": "deleted_business_control"};
        }
        case constants.objectType.PERSPECTIVE: {
            return {"key": "deleted_perspective"};
        }
        case constants.objectType.SCE: {
            return {"key": "deleted_expression"};
        }
        case constants.objectType.ASSET_DELIVERS_LIBRARY_ATTRIBUTE: {
            return {"key": "deleted_asset_delivers_library_attribute"};
        }
        case constants.objectType.SHIELD_ELEMENT_ATTRIBUTE: {
            return {"key": "deleted_shield_element_attribute"};
        }
        case constants.objectType.SHIELD_ELEMENT_LIBRARY_ATTRIBUTE: {
            return {"key": "deleted_shield_element_library_attribute"};
        }
        case constants.objectType.SHIELD_ELEMENT_GROUP: {
            return {"key": "deleted_shield_element_group"};
        }
        case constants.objectType.STANDARD_ELEMENT: {
            return {"key": "deleted_standard_element"};
        }
        case constants.objectType.THREAT_ELEMENT: {
            return {"key": "deleted_threat_element"};
        }
        case constants.objectType.USER: {
            return {"key": "deleted_user"};
        }
        case constants.objectType.ROLE: {
            return {"key": "deleted_role"};
        }
        default: {
            return {"key": "deleted_element"};
        }
    }
}