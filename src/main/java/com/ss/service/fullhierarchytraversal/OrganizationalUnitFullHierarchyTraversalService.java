package com.ss.service.fullhierarchytraversal;

import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.ViewDescriptor;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.parametertree.ObjectiveParameterWordRepository;
import com.ss.repository.usermanagement.OrganizationalUnitRepository;
import com.ss.service.generictraversal.GenericItemOrganizationalUnitService;
import com.ss.utils.GenericItemIndexCalculator;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("OrganizationalUnitFullHierarchyTraversalService")
public class OrganizationalUnitFullHierarchyTraversalService {

    @Autowired
    private ObjectiveParameterWordRepository objectiveParameterWordRepository;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GenericItemOrganizationalUnitService genericItemOrganizationalUnitService;

    @Autowired
    private GenericItemIndexCalculator genericItemIndexCalculator;

    @Autowired
    private OrganizationalUnitRepository organizationalUnitRepository;

    public GenericItem buildGenericItemForOrganizationalUnitRootFullWithDescriptor(ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo, Integer level) {
        GenericItem genericItem = new GenericItem();
        genericItem.setObjectType(ObjectTypeConstants.ORGANIZATIONAL_UNIT_ROOT);
        genericItem.setName("");
        genericItem.setElementId(0);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        List<OrganizationalUnit> organizationalUnits = organizationalUnitRepository.findByLevelAndIsArchivedFalse(1);

        for (OrganizationalUnit organizationalUnit : organizationalUnits) {
            if (organizationalUnit != null && !organizationalUnit.isArchived() && (level == 0 || (int) organizationalUnit.getLevel() <= level))
                children.add(buildGenericItemForOrganizationalUnitWithDescriptor(organizationalUnit, viewDescriptor, perspectiveGroupInfo, level));
        }

        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
        return genericItem;
    }

    private GenericItem buildGenericItemForOrganizationalUnitWithDescriptor(OrganizationalUnit organizationalUnit, ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo, Integer level) {
        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(organizationalUnit);

        perspectiveGroupInfo = genericItemPOJOBuilder.handleIsIncludedInGroup(perspectiveGroupInfo, genericItem);

        List<GenericItem> children = new ArrayList<>();

        if (level == 0 || organizationalUnit.getLevel().equals(level)) {//expression links or applying extra view descriptor
            GenericItem item = genericItemOrganizationalUnitService.buildGenericItemForOrganizationalUnit(organizationalUnit, viewDescriptor, perspectiveGroupInfo);
            if (item.getChildren() != null)
                children.addAll(item.getChildren());
        }

        if (level == 0 || (int) organizationalUnit.getLevel() < level) {
            List<OrganizationalUnit> childrenOrganizationalUnits = organizationalUnit.getChildrenOrganizationalUnits();

            if (childrenOrganizationalUnits != null) {
                for (OrganizationalUnit child : childrenOrganizationalUnits) {
                    children.add(buildGenericItemForOrganizationalUnitWithDescriptor(child, viewDescriptor, perspectiveGroupInfo, level));
                }
            }
        }
        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);

        return genericItem;
    }
}