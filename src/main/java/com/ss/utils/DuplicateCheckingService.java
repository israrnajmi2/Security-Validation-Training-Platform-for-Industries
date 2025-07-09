package com.ss.utils;

import com.ss.common.ExecException;
import com.ss.domain.asset.AssetType;
import com.ss.domain.businessasset.BusinessAssetType;
import com.ss.domain.groups.ShieldElementGroup;
import com.ss.domain.parametertree.ContentParameterWord;
import com.ss.domain.parametertree.MethodParameterWord;
import com.ss.domain.parametertree.ObjectiveParameterWord;
import com.ss.domain.parametertree.SubjectParameterWord;
import com.ss.domain.perspective.attribute.AssetDeliversSceRTLibraryAttribute;
import com.ss.domain.perspective.attribute.AssetImplementsElementRTLibraryAttribute;
import com.ss.domain.perspective.attribute.ShieldElementRTLibraryAttribute;
import com.ss.domain.shieldclassification.IngestSource;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.domain.usermanagement.UserRole;
import com.ss.repository.asset.*;
import com.ss.repository.businessasset.BusinessAssetTypeRepository;
import com.ss.repository.groups.*;
import com.ss.repository.parametertree.ContentParameterWordRepository;
import com.ss.repository.parametertree.MethodParameterWordRepository;
import com.ss.repository.parametertree.ObjectiveParameterWordRepository;
import com.ss.repository.parametertree.SubjectParameterWordRepository;
import com.ss.repository.perspective.CustomPerspectiveRepository;
import com.ss.repository.perspective.attribute.AssetDeliversSceRTAttributeRepository;
import com.ss.repository.perspective.attribute.AssetDeliversSceRTLibraryAttributeRepository;
import com.ss.repository.perspective.attribute.AssetImplementsElementRTLibraryAttributeRepository;
import com.ss.repository.perspective.attribute.ShieldElementRTLibraryAttributeRepository;
import com.ss.repository.sce.SecurityControlExpressionRepository;
import com.ss.repository.shieldclassification.*;
import com.ss.repository.usermanagement.OrganizationalUnitRepository;
import com.ss.repository.usermanagement.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("DuplicateCheckingService")
public class DuplicateCheckingService {

    @Autowired
    private ShieldRepository shieldRepository;

    @Autowired
    private ShieldTypeRepository shieldTypeRepository;

    @Autowired
    private ShieldElementTypeRepository shieldElementTypeRepository;

    @Autowired
    private ShieldElementRepository shieldElementRepository;

    @Autowired
    private SecurityControlExpressionRepository securityControlExpressionRepository;

    @Autowired
    private OrganizationalUnitRepository organizationalUnitRepository;

    @Autowired
    private ObjectiveParameterWordRepository objectiveParameterWordRepository;

    @Autowired
    private MethodParameterWordRepository methodParameterWordRepository;

    @Autowired
    private ContentParameterWordRepository contentParameterWordRepository;

    @Autowired
    private SubjectParameterWordRepository subjectParameterWordRepository;

    @Autowired
    private AssetTypeRepository assetTypeRepository;

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private TechnicalSupportInfoRepository technicalSupportInfoRepository;

    @Autowired
    private ProviderInfoRepository providerInfoRepository;

    @Autowired
    private TechnicalSupportContactInfoRepository technicalSupportContactInfoRepository;

    @Autowired
    private ShieldElementGroupRepository shieldElementGroupRepository;

    @Autowired
    private SceGroupRepository sceGroupRepository;

    @Autowired
    private AssetGroupRepository assetGroupRepository;

    @Autowired
    private AssetTypeGroupRepository assetTypeGroupRepository;

    @Autowired
    private ProviderGroupRepository providerGroupRepository;

    @Autowired
    private CustomPerspectiveRepository customPerspectiveRepository;

    @Autowired
    private AssetDeliversSceRTAttributeRepository assetDeliversSceRTAttributeRepository;

    @Autowired
    private AssetDeliversSceRTLibraryAttributeRepository assetDeliversSceRTLibraryAttributeRepository;

    @Autowired
    private ShieldElementRTLibraryAttributeRepository shieldElementRTLibraryAttributeRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private IngestSourceRepository ingestSourceRepository;

    @Autowired
    private BusinessAssetTypeRepository businessAssetTypeRepository;

    @Autowired
    private AssetImplementsElementRTLibraryAttributeRepository assetImplementsElementRTLibraryAttributeRepository;


    public boolean isDuplicateShieldElementName(ShieldElement shieldElement, Shield shield) {
        String name = shieldElement.getName();
        if (name == null || name.trim().isEmpty())
            throw new ExecException("Name of element cannot be null or empty string");

        name = name.toLowerCase().trim();
        ShieldElement parentShieldElement = shieldElement.getParentShieldElement();

        List<ShieldElement> elementsWithInParentAndWithInLevel = new ArrayList<>();
        if (parentShieldElement == null) {
            elementsWithInParentAndWithInLevel = shieldElementRepository.findByShieldIdAndParentShieldElementIdAndIsArchivedFalse(shield.getId(), null);

        } else {
            elementsWithInParentAndWithInLevel = shieldElementRepository.findByShieldIdAndParentShieldElementIdAndIsArchivedFalse(shield.getId(), parentShieldElement.getId());
        }

        if (elementsWithInParentAndWithInLevel != null) {
            for (ShieldElement temp : elementsWithInParentAndWithInLevel) {
                if (temp.getName().toLowerCase().trim().equals(name)
                        && (shieldElement.getId() == null || !shieldElement.getId().equals(temp.getId())))
                    return true;
            }
        }
        return false;
    }

    public boolean isDuplicateAssetType(AssetType assetType) {
        String name = assetType.getName();
        if (name == null || name.trim().isEmpty())
            throw new ExecException("Name of asset type cannot be null or empty string");
        name = name.toLowerCase().trim();
        AssetType parentAssetType = assetType.getParentAssetType();
        List<AssetType> elementsWithInParentAndWithInLevel = new ArrayList<>();
        if (parentAssetType == null) {
            elementsWithInParentAndWithInLevel = assetTypeRepository.findByLevelAndIsArchivedFalse(1);

        } else {
            elementsWithInParentAndWithInLevel = parentAssetType.getChildrenAssetTypeList();
        }

        if (elementsWithInParentAndWithInLevel != null) {
            for (AssetType temp : elementsWithInParentAndWithInLevel) {
                if (!temp.isArchived() && temp.getName().toLowerCase().trim().equals(name)
                        && (assetType.getId() == null || !assetType.getId().equals(temp.getId())))
                    return true;
            }
        }
        return false;
    }

    public boolean isDuplicateOrganizationalUnit(OrganizationalUnit organizationalUnit) {
        String name = organizationalUnit.getName();
        if (name == null || name.trim().isEmpty())
            throw new ExecException("Name of organizational unit cannot be null or empty string");
        name = name.toLowerCase().trim();
        OrganizationalUnit parentOrganizationalUnit = organizationalUnit.getParentOrganizationalUnit();
        List<OrganizationalUnit> elementsWithInParentAndWithInLevel = new ArrayList<>();
        if (parentOrganizationalUnit == null) {
            elementsWithInParentAndWithInLevel = organizationalUnitRepository.findByLevelAndIsArchivedFalse(1);

        } else {
            elementsWithInParentAndWithInLevel = parentOrganizationalUnit.getChildrenOrganizationalUnits();
        }

        if (elementsWithInParentAndWithInLevel != null) {
            for (OrganizationalUnit temp : elementsWithInParentAndWithInLevel) {
                if (!temp.isArchived() && temp.getName().toLowerCase().trim().equals(name)
                        && (organizationalUnit.getId() == null || !organizationalUnit.getId().equals(temp.getId())))
                    return true;
            }
        }
        return false;
    }

    public boolean isDuplicateObjectiveParamter(ObjectiveParameterWord parameterWord) {
        String name = parameterWord.getWord();
        if (name == null || name.trim().isEmpty())
            throw new ExecException("Name of paramter cannot be null or empty string");
        name = name.toLowerCase().trim();
        ObjectiveParameterWord parentParameterWord = parameterWord.getParentObjectiveParameterWord();
        List<ObjectiveParameterWord> elementsWithInParentAndWithInLevel = new ArrayList<>();
        if (parentParameterWord == null) {
            elementsWithInParentAndWithInLevel = objectiveParameterWordRepository.findByLevelAndIsArchivedFalse(1);

        } else {
            elementsWithInParentAndWithInLevel = parentParameterWord.getChildrenObjectiveParameterWordList();
        }

        if (elementsWithInParentAndWithInLevel != null) {
            for (ObjectiveParameterWord temp : elementsWithInParentAndWithInLevel) {
                if (!temp.isArchived() && temp.getWord().toLowerCase().trim().equals(name)
                        && (parameterWord.getId() == null || !parameterWord.getId().equals(temp.getId())))
                    return true;
            }
        }
        return false;
    }

    public boolean isDuplicateMethodParameter(MethodParameterWord parameterWord) {
        String name = parameterWord.getWord();
        if (name == null || name.trim().isEmpty())
            throw new ExecException("Name of paramter cannot be null or empty string");
        name = name.toLowerCase().trim();
        MethodParameterWord parentParameterWord = parameterWord.getParentMethodParameterWord();
        List<MethodParameterWord> elementsWithInParentAndWithInLevel = new ArrayList<>();
        if (parentParameterWord == null) {
            elementsWithInParentAndWithInLevel = methodParameterWordRepository.findByLevelAndIsArchivedFalse(1);

        } else {
            elementsWithInParentAndWithInLevel = parentParameterWord.getChildrenMethodParameterWordList();
        }

        if (elementsWithInParentAndWithInLevel != null) {
            for (MethodParameterWord temp : elementsWithInParentAndWithInLevel) {
                if (!temp.isArchived() && temp.getWord().toLowerCase().trim().equals(name)
                        && (parameterWord.getId() == null || !parameterWord.getId().equals(temp.getId())))
                    return true;
            }
        }
        return false;
    }

    public boolean isDuplicateContentParamter(ContentParameterWord parameterWord) {
        String name = parameterWord.getWord();
        if (name == null || name.trim().isEmpty())
            throw new ExecException("Name of paramter cannot be null or empty string");
        name = name.toLowerCase().trim();
        ContentParameterWord parentParameterWord = parameterWord.getParentContentParameterWord();
        List<ContentParameterWord> elementsWithInParentAndWithInLevel = new ArrayList<>();
        if (parentParameterWord == null) {
            elementsWithInParentAndWithInLevel = contentParameterWordRepository.findByLevelAndIsArchivedFalse(1);

        } else {
            elementsWithInParentAndWithInLevel = parentParameterWord.getChildrenContentParameterWordList();
        }

        if (elementsWithInParentAndWithInLevel != null) {
            for (ContentParameterWord temp : elementsWithInParentAndWithInLevel) {
                if (!temp.isArchived() && temp.getWord().toLowerCase().trim().equals(name)
                        && (parameterWord.getId() == null || !parameterWord.getId().equals(temp.getId())))
                    return true;
            }
        }
        return false;
    }

    public boolean isDuplicateSubjectParameter(SubjectParameterWord parameterWord) {
        String name = parameterWord.getWord();
        if (name == null || name.trim().isEmpty())
            throw new ExecException("Name of paramter cannot be null or empty string");
        name = name.toLowerCase().trim();
        SubjectParameterWord parentParameterWord = parameterWord.getParentSubjectParameterWord();
        List<SubjectParameterWord> elementsWithInParentAndWithInLevel = new ArrayList<>();
        if (parentParameterWord == null) {
            elementsWithInParentAndWithInLevel = subjectParameterWordRepository.findByLevelAndIsArchivedFalse(1);

        } else {
            elementsWithInParentAndWithInLevel = parentParameterWord.getChildrenSubjectParameterWordList();
        }

        if (elementsWithInParentAndWithInLevel != null) {
            for (SubjectParameterWord temp : elementsWithInParentAndWithInLevel) {
                if (!temp.isArchived() && temp.getWord().toLowerCase().trim().equals(name)
                        && (parameterWord.getId() == null || !parameterWord.getId().equals(temp.getId())))
                    return true;
            }
        }
        return false;
    }

    public boolean isDuplicateAssetDeliversLibraryAttribute(AssetDeliversSceRTLibraryAttribute attribute) {
        String name = attribute.getName();
        if (name == null || name.trim().isEmpty())
            throw new ExecException("Name of Asset Delivers Library Attribute cannot be null or empty string");
        name = name.toLowerCase().trim();

        List<AssetDeliversSceRTLibraryAttribute> libraryAttributes = assetDeliversSceRTLibraryAttributeRepository.findByCustomPerspectiveIdAndIsArchivedFalse(attribute.getCustomPerspective().getId());
        for (AssetDeliversSceRTLibraryAttribute libraryAttribute : libraryAttributes) {
            if (!libraryAttribute.isArchived() && libraryAttribute.getName() != null && libraryAttribute.getName().toLowerCase().trim().equals(name)
                    && (attribute.getId() == null || !attribute.getId().equals(libraryAttribute.getId())))
                return true;
        }
        return false;
    }

    public boolean isDuplicateAssetImplementsLibraryAttribute(AssetImplementsElementRTLibraryAttribute attribute) {
        String name = attribute.getName();
        if (name == null || name.trim().isEmpty())
            throw new ExecException("Name of Asset Implements Library Attribute cannot be null or empty string");
        name = name.toLowerCase().trim();

        List<AssetImplementsElementRTLibraryAttribute> libraryAttributes = assetImplementsElementRTLibraryAttributeRepository.findByCustomPerspectiveIdAndIsArchivedFalse(attribute.getCustomPerspective().getId());
        for (AssetImplementsElementRTLibraryAttribute libraryAttribute : libraryAttributes) {
            if (!libraryAttribute.isArchived() && libraryAttribute.getName() != null && libraryAttribute.getName().toLowerCase().trim().equals(name)
                    && (attribute.getId() == null || !attribute.getId().equals(libraryAttribute.getId())))
                return true;
        }
        return false;
    }

    public boolean isDuplicateShieldElementLibraryAttribute(ShieldElementRTLibraryAttribute attribute) {
        String name = attribute.getName();
        if (name == null || name.trim().isEmpty())
            throw new ExecException("Name of Shield Element Library Attribute cannot be null or empty string");
        name = name.toLowerCase().trim();

        List<ShieldElementRTLibraryAttribute> libraryAttributes = shieldElementRTLibraryAttributeRepository.findByCustomPerspectiveIdAndShieldElementTypeIdAndIsArchivedFalse(attribute.getCustomPerspective().getId(),
                attribute.getShieldElementType().getId());
        //List<ShieldElementRTLibraryAttribute> libraryAttributes = null;
        for (ShieldElementRTLibraryAttribute libraryAttribute : libraryAttributes) {
            if (!libraryAttribute.isArchived() && libraryAttribute.getName() != null && libraryAttribute.getName().toLowerCase().trim().equals(name)
                    && (attribute.getId() == null || !attribute.getId().equals(libraryAttribute.getId())))
                return true;
        }
        return false;
    }

    public boolean isDuplicateShieldElementGroup(ShieldElementGroup shieldElementGroup) {
        String name = shieldElementGroup.getName();
        if (name == null || name.trim().isEmpty())
            throw new ExecException("Name of Shield Element Group cannot be null or empty string");
        name = name.toLowerCase().trim();

        Integer elementTypeId = null;
        if(shieldElementGroup.getShieldElementType() != null) {
            elementTypeId = shieldElementGroup.getShieldElementType().getId();
        }
        List<ShieldElementGroup> groupsByElementType = shieldElementGroupRepository.findByShieldElementTypeIdAndIsArchivedFalse(elementTypeId);

        for (ShieldElementGroup groupObject : groupsByElementType) {
            if (!groupObject.isArchived() && groupObject.getName() != null && groupObject.getName().toLowerCase().trim().equals(name)
                    && (shieldElementGroup.getId() == null || !shieldElementGroup.getId().equals(groupObject.getId())))
                return true;
        }
        return false;
    }

    public boolean isDuplicateRole(UserRole role) {
        String name = role.getName();
        if (name == null || name.trim().isEmpty())
            throw new ExecException("Name of UserRole cannot be null or empty string");
        name = name.toLowerCase().trim();

        List<UserRole> userRoles = userRoleRepository.findAll();

        for (UserRole userRole : userRoles) {
            if (!userRole.isArchived() && userRole.getName() != null && userRole.getName().toLowerCase().trim().equals(name)
                    && (role.getId() == null || !role.getId().equals(userRole.getId())))
                return true;
        }
        return false;
    }

    public boolean isDuplicateIngestSource(IngestSource source) {
        String name = source.getName();
        if (name == null || name.trim().isEmpty())
            throw new ExecException("Name of Source cannot be null or empty string");
        name = name.toLowerCase().trim();

        List<IngestSource> sources = ingestSourceRepository.findAll();

        for (IngestSource sourceObject : sources) {
            if (!sourceObject.isArchived() && sourceObject.getName() != null && sourceObject.getName().toLowerCase().trim().equals(name)
                    && (source.getId() == null || !source.getId().equals(sourceObject.getId())))
                return true;
        }
        return false;
    }

    public boolean isDuplicateBusinessAssetType(BusinessAssetType assetType) {
        String name = assetType.getName();
        if (name == null || name.trim().isEmpty())
            throw new ExecException("Name of asset type cannot be null or empty string");
        name = name.toLowerCase().trim();
        BusinessAssetType parentAssetType = assetType.getParentBusinessAssetType();
        List<BusinessAssetType> elementsWithInParentAndWithInLevel = new ArrayList<>();
        if (parentAssetType == null) {
            elementsWithInParentAndWithInLevel = businessAssetTypeRepository.findByLevelAndIsArchivedFalse(1);

        } else {
            elementsWithInParentAndWithInLevel = parentAssetType.getChildrenBusinessAssetTypeList();
        }

        if (elementsWithInParentAndWithInLevel != null) {
            for (BusinessAssetType temp : elementsWithInParentAndWithInLevel) {
                if (!temp.isArchived() && temp.getName().toLowerCase().trim().equals(name)
                        && (assetType.getId() == null || !assetType.getId().equals(temp.getId())))
                    return true;
            }
        }
        return false;
    }
}
