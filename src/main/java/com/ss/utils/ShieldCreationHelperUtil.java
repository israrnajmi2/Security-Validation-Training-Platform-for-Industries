package com.ss.utils;

import com.ss.common.ExecException;
import com.ss.constants.ShieldTypeConstants;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.shieldclassification.ShieldElementType;
import com.ss.domain.shieldclassification.ShieldType;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.pojo.restservice.CreateShieldRequest;
import com.ss.repository.shieldclassification.ShieldElementRepository;
import com.ss.repository.shieldclassification.ShieldElementTypeRepository;
import com.ss.repository.shieldclassification.ShieldRepository;
import com.ss.repository.shieldclassification.ShieldTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ShieldCreationHelperUtil")
public class ShieldCreationHelperUtil {

    @Autowired
    private ShieldTypeRepository shieldTypeRepository;

    @Autowired
    private ShieldRepository shieldRepository;

    @Autowired
    private DuplicateCheckingService duplicateCheckingService;

    @Autowired
    private ShieldElementRepository shieldElementRepository;

    @Autowired
    private ShieldElementTypeRepository shieldElementTypeRepository;

    public Shield createShield(CreateShieldRequest request, String shieldTypeParam) {

        Shield shield = new Shield();
        shield.setName(request.getName().trim());

        List<ShieldType> shieldTypes = null;
        if (shieldTypeParam == null)
            throw new ExecException("Shield Type passed is null");
        if (shieldTypeParam.equals(ShieldTypeConstants.SHIELD)) {
            shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.SHIELD);

            if (shieldTypes == null || shieldTypes.isEmpty()) {
                throw new ExecException("Shield Type : " + ShieldTypeConstants.SHIELD + " not found");
            }
        } else if (shieldTypeParam.equals(ShieldTypeConstants.STANDARD)) {
            shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.STANDARD);

            if (shieldTypes == null || shieldTypes.isEmpty()) {
                throw new ExecException("Shield Type : " + ShieldTypeConstants.STANDARD + " not found");
            }
        } else if (shieldTypeParam.equals(ShieldTypeConstants.BUSINESS)) {
            shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.BUSINESS);

            if (shieldTypes == null || shieldTypes.isEmpty()) {
                throw new ExecException("Shield Type : " + ShieldTypeConstants.BUSINESS + " not found");
            }
        } else if (shieldTypeParam.equals(ShieldTypeConstants.THREAT)) {
            shieldTypes = shieldTypeRepository.findByNameAndIsArchivedFalse(ShieldTypeConstants.THREAT);

            if (shieldTypes == null || shieldTypes.isEmpty()) {
                throw new ExecException("Shield Type : " + ShieldTypeConstants.THREAT + " not found");
            }
        }

        ShieldType shieldType = null;

        for (ShieldType temp : shieldTypes) {
            if (temp != null && !temp.isArchived()) {
                shieldType = temp;
                break;
            }
        }
        if (shieldType == null) {
            if (shieldTypeParam.equals(ShieldTypeConstants.SHIELD))
                throw new ExecException("Shield Type : " + ShieldTypeConstants.SHIELD + " not found");
            else if (shieldTypeParam.equals(ShieldTypeConstants.STANDARD))
                throw new ExecException("Shield Type : " + ShieldTypeConstants.STANDARD + " not found");
            else if (shieldTypeParam.equals(ShieldTypeConstants.BUSINESS))
                throw new ExecException("Shield Type : " + ShieldTypeConstants.BUSINESS + " not found");
            else if (shieldTypeParam.equals(ShieldTypeConstants.THREAT))
                throw new ExecException("Shield Type : " + ShieldTypeConstants.THREAT + " not found");
            else
                throw new ExecException("Unknown shield type " + shieldTypeParam);
        }

        shield.setShieldType(shieldType);

        List<Shield> shieldsWithSameName = shieldRepository.findByNameAndShieldTypeIdAndIsArchivedFalse(request.getName().trim(), shieldType.getId());

        if (shieldsWithSameName != null && !shieldsWithSameName.isEmpty())
            throw new ExecException("Shield with name " + request.getName() + " already exist");

        shield.setArchived(false);
        shield.setAuthor(request.getAuthor());
        shield.setDefault(false);
        shield.setDescription(request.getDescription());
        shield.setVersion(request.getVersion());
        shield.setAcronym(request.getAcronym());
        shield = shieldRepository.save(shield);

        if (shield == null)
            throw new ExecException("Shield Save to Database Failed");

        return shield;
    }

    public ShieldElementType createShieldElementType(String name, String description, ShieldElementType parentElementType, boolean isMappable, Shield shield) {

        ShieldElementType shieldElementType = new ShieldElementType();
        shieldElementType.setName(name);

        shieldElementType.setArchived(false);
        shieldElementType.setDefault(false);
        shieldElementType.setDescription(description);
        if (parentElementType == null)
            shieldElementType.setLevel(1);
        else
            shieldElementType.setLevel(parentElementType.getLevel() + 1);
        shieldElementType.setParentShieldElementType(parentElementType);
        shieldElementType.setShield(shield);


        //check for duplicate name
        List<ShieldElementType> elementTypesWithSameName = shieldElementTypeRepository.findByNameAndShieldIdAndIsArchivedFalse(name, shield.getId());

        if (elementTypesWithSameName != null && !elementTypesWithSameName.isEmpty())
            throw new ExecException("Element Type with name " + name + " already exist");

        shieldElementType.setMappableToSce(isMappable);

        shieldElementType = shieldElementTypeRepository.save(shieldElementType);
        if (shieldElementType == null)
            throw new ExecException("Element Type Save to Database Failed");

        return shieldElementType;
    }

    public ShieldElement createShieldElement(String name, String description, String referenceId, ShieldElement parentShieldElement, OrganizationalUnit organizationalUnit, Shield shield) {

        ShieldElement shieldElement = new ShieldElement();

        shieldElement.setName(name);

        shieldElement.setDescription(description);

        shieldElement.setParentShieldElement(parentShieldElement);

        /*if (duplicateCheckingService.isDuplicateShieldElementName(shieldElement, shield)) {
            throw new ExecException("Element with name " + name + " already exist");
        }*/

        ShieldElementType shieldElementType = null;
        if (parentShieldElement != null) {

            List<ShieldElementType> shieldElementTypes = shieldElementTypeRepository.findByShieldIdAndLevelAndIsArchivedFalse(shield.getId(), parentShieldElement.getLevel() + 1);
            //parentShieldElement.getShieldElementType().getChildrenShieldElementTypeList();

            if (shieldElementTypes == null || shieldElementTypes.isEmpty()) {
                shieldElementType = createShieldElementType("Level " + (parentShieldElement.getShieldElementType().getLevel() + 1), "", parentShieldElement.getShieldElementType(), true, shield);
            } else {

                for (ShieldElementType temp : shieldElementTypes) {
                    if (temp != null && !temp.isArchived()) {
                        shieldElementType = temp;
                        break;
                    }
                }
                if (shieldElementType == null)
                    shieldElementType = createShieldElementType("Level " + (parentShieldElement.getShieldElementType().getLevel() + 1), "", parentShieldElement.getShieldElementType(), true, shield);
            }
        } else {
            shieldElementType = getLevelOneElementType(shieldElementTypeRepository.findByShieldIdAndLevelAndIsArchivedFalse(shield.getId(), 1));

            /*if (shieldElementType == null || shieldElementType.isArchived())
                throw new ExecException("Level One Element Type Not found for shield with id " + shield.getId() + " ; not allowed to create child");*/
            if (shieldElementType == null || shieldElementType.isArchived()) {
                shieldElementType = createShieldElementType("Level 1", "", null, true, shield);
            }

        }

        shieldElement.setShieldElementType(shieldElementType);

        shieldElement.setOrganizationalUnit(organizationalUnit);
        shieldElement.setLevel(shieldElementType.getLevel());
        shieldElement.setDefault(false);
        shieldElement.setArchived(false);
        shieldElement.setShield(shieldElementType.getShield());
        shieldElement.setAbbreviation(referenceId);

        shieldElement = shieldElementRepository.save(shieldElement);

        if (shieldElement == null)
            throw new ExecException("Shield Element Save to Database Failed");

        return shieldElement;
    }

    private ShieldElementType getLevelOneElementType(List<ShieldElementType> shieldElementTypes) {
        if (shieldElementTypes != null)
            for (ShieldElementType shieldElementType : shieldElementTypes) {
                if (shieldElementType.getLevel().equals(1))
                    return shieldElementType;
            }
        return null;
    }
}
