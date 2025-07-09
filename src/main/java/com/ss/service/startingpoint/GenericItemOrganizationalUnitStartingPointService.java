//package com.ss.service.startingpoint;
//
//import com.ss.constants.ObjectTypeConstants;
//import com.ss.domain.usermanagement.OrganizationalUnit;
//import com.ss.pojo.PerspectiveGroupInfo;
//import com.ss.pojo.ViewDescriptor;
//import com.ss.pojo.restservice.GenericItem;
//import com.ss.repository.asset.AssetRepository;
//import com.ss.repository.usermanagement.OrganizationalUnitRepository;
//import com.ss.service.generictraversal.GenericItemOrganizationalUnitService;
//import com.ss.utils.GenericItemIndexCalculator;
//import com.ss.utils.GenericItemPOJOBuilder;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service("GenericItemOrganizationalUnitStartingPointService")
//public class GenericItemOrganizationalUnitStartingPointService {
//
//    @Autowired
//    private GenericItemPOJOBuilder genericItemPOJOBuilder;
//
//    @Autowired
//    private AssetRepository assetRepository;
//
//    @Autowired
//    private OrganizationalUnitRepository organizationalUnitRepository;
//
//    @Autowired
//    private GenericItemOrganizationalUnitService genericItemOrganizationalUnitService;
//
//    @Autowired
//    private GenericItemIndexCalculator genericItemIndexCalculator;
//
//    public GenericItem buildGenericItemForOrganizationalUnitStartingPoint(ViewDescriptor viewDescriptor, PerspectiveGroupInfo perspectiveGroupInfo) {
//        //GenericItem pojo - special case.
//        GenericItem genericItem = genericItemPOJOBuilder.buildGenericPOJO(ObjectTypeConstants.ORGANIZATIONAL_UNIT_ROOT);
//        handleView(viewDescriptor, genericItem, perspectiveGroupInfo);
//        return genericItem;
//    }
//
//    private void handleView(ViewDescriptor viewDescriptor, GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo) {
//
//        List<GenericItem> children = new ArrayList<>();
//        List<OrganizationalUnit> levelOneOrganizationalUnits = organizationalUnitRepository.findByLevelAndIsArchivedFalse(1);
//        if (levelOneOrganizationalUnits != null && (!levelOneOrganizationalUnits.isEmpty())) {
//            for (OrganizationalUnit levelOneOU : levelOneOrganizationalUnits) {
//                children.add(genericItemOrganizationalUnitService.buildGenericItemForOrganizationalUnit(levelOneOU, viewDescriptor.getNextLevel(), perspectiveGroupInfo));
//            }
//        }
//        genericItemIndexCalculator.applyGroupSetChildrenAndCalculateIndexFooter(genericItem, perspectiveGroupInfo, children);
//    }
//}
